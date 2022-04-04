/*
 Copyright (c) 2016, BrightPoint Consulting, Inc.

 MIT LICENSE:

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 IN THE SOFTWARE.
 */

// @version 1.1.54



/**
 * The weighted tree renders hierarchical data in an expandable tree format where both branch width and node radius represent data parameters.
 * @class
 * @constructor
 * @param {DOMElement} parent - Container element that will render the component.
 *
 * @fires node_refresh
 * @fires data_prepped
 *
 * @example
 *
 * var myData = [
 *  node {
 *      propertyA: 10,
 *      propertyB: 20,
 *      propertyC: 30,
 *      name: 'myNode1'
 *      values: [
 *          node {...},
 *          node {...},
 *          node {...}
 *      ]
 *  },
 *  node {...}
 * ]
 *
 * var viz = vizuly.weighted_tree()
 *   .data(myData)
 *   .children('values')
 *   .value('propertyA')  //Used for radius of nodes and thickness of branches
 *   .label('name');      //Used for node labels
 *
 *
 */
vizuly.viz.weighted_tree = function (parent, imagePath) {

    // This is the object that provides pseudo "protected" properties that the vizuly.viz function helps create
    var scope={};
    var imagePath = imagePath;
    /** @lends vizuly.viz.weighted_tree */
    var properties = {
        /**
         * Hierarchal nested array of nodes to be rendered.
         * @type {Array}
         */
        "data" : null,
        /**
         * Margins between tree and border of container
         * @type {Object}
         * @default  {top:'5%', bottom:'5%', left:'8%', right:'10%'}
         */
        "margin" : {
            "top": "10%",
            "bottom" : "5%",
            "left" : "8%",
            "right" : "7%"
        },
        /**
         * width of tree in pixels
         * @type {Number}
         */
        "width": 600,
        /**
         * height of tree in pixels
         * @type {Number}
         * @default 600
         */
        "height": 600,
        /**
         * object property that is a unique identifier for a given node.
         * @type {String}
         */
        "key" : null,
        /**
         * Tree layout that will be used.  You can pass in a different tree layout, or modify this one on the fly.
         * @type {d3.layout.tree}
         * @default d3.layout.tree
         */
        "tree" : d3.tree(),
        /**
         * object property for nested child array
         * @type {String}
         */
        "children" : null,
        /**
         * time(in milliseconds) of any animated transitions like the opening/closing of tree branches.
         * @type {Number}
         */
        "duration": 500,
        /**
         * object property for value representing node radius and branch thickness
         * @type {String}
         * @default 600
         */
        "value" : null,
        /**
         * dynamic function that returns the appropriate label for a given node.
         * @type {Function}
         * @default  function (d,i) { return d; }
         */
        "label" : labelFunction,
        /**
         * Determines vertical node spacing as a percentage of total height;
         * @type {Number}
         * @default -1 will use automatic spacing;
         */
        "branchPadding": -1,
        /**
         * Determines horizontal node spacing as a percentage of total width;
         * @type {Number}
         * @default -1 will use automatic spacing;
         */
        "fixedSpan" : -1

    };

    var labelFunction = function (d,i) { 
        return d; 
    };

    //Create our viz and type it
    var viz=vizuly.core.component(parent,scope,properties,['node_refresh','data_prepped']);
    viz.type="viz.chart.weighted_tree";

    var dataIsDirty=true;
    var refreshNeeded=false;
    viz.on("data_change.internal",onDataChanged);


    //Measurements
    var size;                               // Holds the 'size' variable as defined in viz.util.size()
    var tree = scope.tree;                  // Tree layout
    var nodeScale = d3.scaleSqrt();        // Scale used for node radius
    var root,nodes;                         // Data storage for display tree
    var depthSpan;                          // Width to use for horizontal span - can be fixed (scope.fixedSpan) or dynamically sized by viz.width
    var maxDepth;                           // Deepest level of tree
    var maxValues={};                       // Maximum value for a given tree level - needed to calc node radius
    var minValues={};                       // Minimum value for a give tree level - needed to calc node radius

    function diagonal (d)  {
      return "M" + d.source.y + "," + d.source.x
          + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
          + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
          + " " + d.target.y + "," + d.target.x;
    }

    //Used to calc our node radius for each node based on min/max values per depth.
    var  nodeRadius = function (node) {
        // //Set max size/2 for root node.
        // if (node.depth == 0) return nodeScale.range()[1]/2;
        // nodeScale.domain([minValues[node.depth],maxValues[node.depth]]);
        // return nodeScale(scope.value(node));
        var MAX_WIDTH=7,MIN_WIDTH=1;
        var _lineWidth=((node.data.totalInp||0)*MAX_WIDTH)/100;
        return (_lineWidth<MIN_WIDTH)?MIN_WIDTH:_lineWidth;
    }


    //These are all d3.selection objects we use to insert and update svg elements into
    var svg, g,background, plot, plotBackground, linkPlot, nodePlot, defs;

    initialize();

    // Here we set up all of our svg layout elements using a 'vz-XX' class namespace.  This routine is only called once
    // These are all place holder groups for the invidual data driven display elements.   We use these to do general
    // sizing and margin layout.  The all are referenced as D3 selections.


    // This is called once at initial object creation and sets up the appropriate SVG container elements.
    function initialize() {

        scope.selection.attr("class","vz-weighted_tree-viz");
        svg = scope.selection.append("svg").attr("id", scope.id).style("overflow","visible").attr("class","vizuly vz-weighted_tree-viz");
        scope.selection.style('height', '100%');
        defs = vizuly.core.util.getDefs(viz);
        background = svg.append("rect").attr("class","vz-background");
        g = svg.append("g").attr("class","vz-weighted_tree-viz");
        plot = g.append("g").attr("class","vz-weighted_tree-plot");
        plotBackground = plot.append("rect").attr("class","vz-plot-background");
        linkPlot = plot.append("g").attr("class","vz-weighted_tree-link-plot");
        uttPlot = plot.append("g").attr("class", "vz-weighted_tree-utterance-plot");
        nodePlot = plot.append("g").attr("class","vz-weighted_tree-node-plot");

        // Tell everyone we are done initializing
       // scope.dispatch.initialize();

        scope.dispatch.call('initialize');
    }


    // This function performs any measurement or layout calcuations prior to making any updates to the SVG element
    function measure(dataClickId, dataVals) {

        // Call our validate routine and make sure all component properties have been set
       
       // viz.validate();

        // Get our size based on height, width, and margin
        size = vizuly.core.util.size(scope.margin, scope.width, scope.height);

        // Transpose dimensions because we are projecting from left to right versus top to bottom
        tree.size([size.height,size.width]);

        // Each time the data changes we need to prep data and other settings for tree layout
        if (dataIsDirty==true || refreshNeeded) {
            refreshData();
            if (dataIsDirty==true) {
                function collapse(d) {
                    if (d.children) {
                        d._children = d.children;
                        d._children.forEach(collapse);
                        d.children = null;
                    }
                }
                if(!dataClickId && !dataVals) {
                    root.children.forEach(collapse);
                }
            }
            // Let anyone know we have just prepped data (themes, etc may need to adjust settings)
            dataIsDirty = false;
            refreshNeeded = false;
            //scope.selection.selectAll(".vz-weighted_tree-node").remove();
        }

        //We dynamically size based on how many first level nodes we have
        var scale;
        if (scope.branchPadding == -1) {
           scale = Math.min(size.height,size.width)/scope.children(scope.data).length;
        }
        else {
           scale = Math.min(size.height,size.width)*scope.branchPadding;
        }

        nodeScale.range([1.5,scale/2]);

        tree.nodeSize([scale,0]);

        depthSpan = (scope.fixedSpan > 0) ? scope.fixedSpan : size.width/(maxDepth+1);

        //Set max/min values
        for (var i=1; i < maxDepth+1; i++) {
            var vals = nodes.filter(
                function (d) { 
                    return d.depth == i;
                });
            maxValues[i] = NaN;
            minValues[i] = NaN;
        }

        // Tell everyone we are done making our measurements
        scope.dispatch.call('measure');

    }

    // Re sorts and measures tree layout based on current data hiearachy.
    // Should be called from *viz.update(true)* whenever data structure has changed
    function refreshData() {

            function setChildren(node) {
                if (scope.children(node)) {
                    if (!node._children) {
                        node.children = scope.children(node);
                        node.children.forEach(function (d) {
                            //Set these from parent node
                            d.x0 = node.x;
                            d.y0 = node.y;
                            setChildren(d);
                        });
                    }
                }
            }

            maxDepth = 0;
            setChildren(scope.data);

            root = scope.data;
            root.x0 = 0;
            root.y0 = 0;
            var utters;
            if(root.utterances) {
                var uttChildren = {};
                uttChildren.children = root.utterances;
                uttChildren.x0 = 0;
                uttChildren.y0 = 0;
                var uttRoot = d3.hierarchy(uttChildren);
                tree(uttRoot);
                utters = uttRoot.descendants().reverse();
            }

            var treeRoot = d3.hierarchy(root);
            tree(treeRoot);
            nodes  = treeRoot.descendants().reverse();
           // nodes = tree.nodes(root).reverse();
           //CCC
            var dataNodes = [];
            for(var j=0; j<nodes.length; j++) {
                dataNodes[j] = nodes[j].data;
                dataNodes[j].depth = nodes[j].depth;
                dataNodes[j].parent = nodes[j].parent?nodes[j].parent.data:null;
                if(nodes[j].data.name === 'Users' || nodes[j].data.name === 'Sessions') {
                    dataNodes[j].x = 0;
                    dataNodes[j].y = 0;                   
                }
                else {
                    dataNodes[j].x = nodes[j].x;
                    dataNodes[j].y = nodes[j].y;
                }
            }


           //maxDepth = nodes[0].depth;
           
            dataNodes.forEach(function (node,ind) {
                if (node.depth == 0) 
                    return;
                if (!maxValues[node.depth]) {
                    maxValues[node.depth]=-Infinity;
                    minValues[node.depth]=Infinity;
                }
                maxDepth = Math.max(maxDepth,node.depth)
            });
            if(utters) {
                dataNodes[dataNodes.length-1].utterances = utters;
            }
            scope.dispatch.call('data_prepped');
    }

    function onDataChanged() {
        dataIsDirty=true;

    }


    // The update function is the primary function that is called when we want to render the visualiation based on
    // all of its set properties.  A developer can change properties of the components and it will not show on the screen
    // until the update function is called
    function update(refresh, dataClickId, dataVals) {

        // Call measure each time before we update to make sure all our our layout properties are set correctly
        measure(dataClickId, dataVals);

        if(!dataClickId) {
        // Layout all of our primary SVG d3 elements.
            svg.attr("width", scope.width+150).attr("height", scope.height+80);
            background.attr("width", scope.width).attr("height", scope.height);
            plot.style("width",size.width).style("height",size.height).attr("transform","translate(" + size.left + "," + (size.top + 20 + size.height/2) + ")");
        }

        function returnClickedNode(id, dataCom) {
            for(var i=0; i<dataCom.length; i++) {
                if(dataCom[i].id === id) {
                    return dataCom[i];
                }
            }
            for(i=0; i<dataCom.length; i++) {
                if(dataCom[i].values) {
                    if(returnClickedNode(id, dataCom[i].values) !== null) {
                        return returnClickedNode(id, dataCom[i].values);
                    }
                }
            }
            return null;
        }
        
        if(dataClickId && dataVals) {
            var clickData = returnClickedNode(dataClickId, dataVals);
            var transCoords = $('[node_id='+dataClickId.replace(/:/g, '-')+']').parent().attr('transform');
            var transX = Number(transCoords.slice(transCoords.indexOf('(')+1, transCoords.indexOf(',')));
            var transY = Number(transCoords.slice(transCoords.indexOf(',')+1, transCoords.indexOf(')')));
            clickData.x = transY;
            clickData.y = transX;
            updateNode(clickData);          
        }
        else {
            updateNode(root);
        }

        // We make a call to render the root node
    }




    // This function takes a given node and expands its children within the tree.  It gets called each time a user toggles a node.
    function updateNode(rootNode) {
        var utterances = root.utterances;
        var utterancesLinks = [];
        var updatedUtterances = root.updatedUtterances
        var treeRoot = d3.hierarchy(root);
        tree(treeRoot);
        var nodes  = treeRoot.descendants().reverse();
        var lastNode = nodes.pop();
        nodes.reverse().push(lastNode);
        var links = treeRoot.links();
        var heightNodes = null;
        positionNodes(rootNode,nodes);
        // positionNodes(null, utterances);
        var rootNde = nodes[nodes.length - 1];
        var xSour = rootNde.y - 16.5;
        var ySour = rootNde.x - 20;
        var plotTranslateX = null;
        
        if(utterances && utterances.length > 1) {
/*            if(!utterances.completed) {
                positionUtterances(utterances);
            }*/
            for(var i=0; i<utterances.length-1; i++) {
                for(var j=0; j<nodes.length-1; j++) {
                    if(nodes[j].data.id === utterances[i].data.morphedNodeId) {
                        utterances[i].data.xDest = nodes[j].x;
                        utterances[i].data.yDest = nodes[j].y + 350;
                        utterances[i].linkedNodeIndex = j;
                        nodes[j].isLinkedToUtterances = true;
                        break;
                    }
                }
            } 
            var others = nodes.filter(function(val){
                if(val.data.id) {
                    return val.data.id.indexOf('others-') === 0;
                }
            });
            if(others && others[0]) {
                utterances.forEach(function(val) {
                    if(!val.data.hasOwnProperty('xDest') && !val.data.hasOwnProperty('yDest')) {
                        val.data.xDest = others[0].x;
                        val.data.yDest = others[0].y + 350;
                        val.linkedNodeIndex = nodes.length;
                    }
                });      
            }

            for(var i=0; i<updatedUtterances.length; i++) {
                for(var j=0; j<utterances.length; j++) {
                    if(updatedUtterances[i][0].nodeId === utterances[j].data.nodeId) {
                        utterances[j].groupedCount = updatedUtterances[i].length;
                    }
                }
            }
            var lastRootUtt = utterances.pop();
            utterances.reverse();
            utterances.push(lastRootUtt);
/*            utterances.sort(function(a, b){
                return a.linkedNodeIndex - b.linkedNodeIndex;
            });*/

            positionUtterances(utterances);
            updateUtterancesCoords();
        }

        function positionUtterances (utteranceNodes) {
            var totalHeight = 0; //10+124+10
            for(var i=0; i<updatedUtterances.length; i++) {
                if(updatedUtterances[i].length>2) {
                    totalHeight = totalHeight + 130;
                }
                else if(updatedUtterances[i].length > 1) {
                    totalHeight = totalHeight + 90;
                }
                else {
                    totalHeight = totalHeight + 50;
                }
            }
            // var totalHeight = totalUtterances * 45.475; //45.4734
            if(!utteranceNodes.completed) {
                utteranceNodes.forEach(function(d,i){
                    if(i === utteranceNodes.length - 1) {
                        d.x = utteranceNodes[i-1].x + 50;
                    }
                    if(i !== 0 && i !== utteranceNodes.length - 1) {
                        if(utteranceNodes[i-1].groupedCount > 2) {
                            d.x = utteranceNodes[i-1].x + 130;
                        }
                        else if(utteranceNodes[i-1].groupedCount > 1) {
                            d.x = utteranceNodes[i-1].x + 90;
                        }
                        else {
                            d.x = utteranceNodes[i-1].x + 50;
                        }
                    }
                });                
            }

            // totalHeight = totalHeight + 70;

            // Figuure out our total height of current display
            var minY=d3.min(utteranceNodes,function (d) {
                if(d.depth !== 0) {
                    return d.x;
                }
            });                              // min y position
            var maxY=d3.max(utteranceNodes,function (d) { 
                if(d.depth !== 0) {
                    return d.x;
                }
            });          
           // var screenHeight = document.querySelector('#viz_container .vizuly.vz-weighted_tree-viz').getAttribute('height');
            var h = Math.abs(maxY - minY);
            // var distFromOrigin = minY + h/2.1;

            var distFromOrigin = 0;
            if(heightNodes < totalHeight) {
                distFromOrigin = minY + heightNodes/2;
                // var distFromOrigin = minY + h/2;
                utteranceNodes.forEach(function(d){
                    // d.x = d.x - distFromOrigin - 40 + ySour;
                    d.x = d.x - distFromOrigin + ySour;
                    d.y = 200;
                });
            }
            else {
                // distFromOrigin = minY + heightNodes/2;
                var distFromOrigin = minY + h/2;
                utteranceNodes.forEach(function(d){
                    // d.x = d.x - distFromOrigin - 40 + ySour;
                    d.x = d.x - distFromOrigin + ySour;
                    d.y = 200;
                });
            }




            if(heightNodes < totalHeight) {
                //plotTranslateX = utteranceNodes[utteranceNodes.length-2].x;
                // var translateX = (totalHeight/2) + 200;
                svg
                .transition().duration(scope.duration)
                .attr("height",totalHeight + 500);
                //plot.attr('transform', 'translate('+ size.left + "," + Math.abs(totalHeight/1.9) + ")");
            }
            utteranceNodes.completed = true;
        }

        function updateUtterancesCoords() {
            var countMore3 = 0;
            var count3 = 0;
            var count1 = 0;

            for(var i=0; i<utterances.length-1; i++) {
                var id = utterances[i].data.nodeId;
                for(var j=0; j<updatedUtterances.length;j++) {
                    if(updatedUtterances[j][0].nodeId === id) {
                        if(updatedUtterances[j-1] && updatedUtterances[j-1].length == 1) {
                            count1++;
                            updatedUtterances[j].x = utterances[i].x - countMore3 * 15 - count3*5 + count1*5;
                        }
                        else if(updatedUtterances[j-1] && updatedUtterances[j-1].length == 3) {
                            count3++;
                            updatedUtterances[j].x = utterances[i].x - countMore3 * 15 - count3*5 + count1*5;
                        }
                        else if(updatedUtterances[j-1] && updatedUtterances[j-1].length > 3) {
                            countMore3++;
                            updatedUtterances[j].x = utterances[i].x - countMore3 * 15 - count3*5 + count1*5;
                        }
                        else {
                            updatedUtterances[j].x = utterances[i].x - countMore3*15 - count3*5 + count1*5;
                        }
                        updatedUtterances[j].y = utterances[i].y - 30;
                        updatedUtterances[j].depth = utterances[i].depth;
                        updatedUtterances[j].height = utterances[i].height;
                        updatedUtterances[j].parent = utterances[i].parent;
                        updatedUtterances[j].xDest = utterances[i].data.xDest;
                        updatedUtterances[j].yDest = utterances[i].data.yDest;
                        // updatedUtterances[j].prePercentage = utterances[i].data.prePercentage;
                        updatedUtterances[j].clubbedGroups = true;
                        break;
                    }
                }
            }

            for(var i=0; i<updatedUtterances.length; i++) {
                var prePercentage = 0;
                for(var j=0; j<updatedUtterances[i].length; j++) {
                    prePercentage = prePercentage + updatedUtterances[i][j].prePercentage;
                }
                updatedUtterances[i].prePercentage = prePercentage;
            }

            for(i=0; i<nodes.length-1; i++) {
                var id = nodes[i].data.id;
                var temp = {};
                for(j=0; j<updatedUtterances.length;j++) {
                    for(var k=0; k<updatedUtterances[j].length; k++) {
                        if(id && id.indexOf('others-') === 0 && updatedUtterances[j][k].addedToOthers) {
                            temp.source = {};
                            temp.target = {};
                            temp.source.x = updatedUtterances[j].x;
                            temp.source.y = updatedUtterances[j].y + 6;
                            temp.target.x = nodes[i].x;
                            temp.target.y = nodes[i].y + 344;
                            utterancesLinks.push(temp);
                            break;
                        }
                        else if(updatedUtterances[j][k].morphedNodeId === id){
                            temp.source = {};
                            temp.target = {};
                            if(updatedUtterances[j].length == 2) {
                                temp.source.x = updatedUtterances[j].x + 20;
                            }
                            else if (updatedUtterances[j].length > 2) {
                                temp.source.x = updatedUtterances[j].x + 40;
                            }
                            else {
                                temp.source.x = updatedUtterances[j].x;
                            }
                            temp.source.y = updatedUtterances[j].y + 6;
                            temp.target.x = nodes[i].x;
                            temp.target.y = nodes[i].y + 344;
                            nodes[i].isLinkedToUtterances = true;
                            utterancesLinks.push(temp);
                        }
                    }
                }
            }


/*            for(var i=0; i<utterances.length-1; i++) {
                var id = utterances[i].data.nodeId;
                var temp = {};
                for(var j=0; j<updatedUtterances.length;j++) {
                    for(var k=0; k<updatedUtterances[j].length; k++) {
                        if(updatedUtterances[j][k].nodeId === id) {
                            temp.source = {};
                            temp.target = {};
                            temp.source.x = utterances[j].x;
                            temp.source.y = utterances[j].y;
                            temp.target.x = utterances[i].data.xDest;
                            temp.target.y = utterances[i].data.yDest;
                            utterancesLinks.push(temp);
                        }
                    }
                }
            }*/


        }


        // uttPlot = uttPlot.attr('transform',"translate(-109,-279.8)");
        var utterance = uttPlot.selectAll(".vz-weighted_tree-utterance-plot")
                .data(updatedUtterances || []);



        // Repositions nodes according to layout
        function positionNodes(rootNode,nodes) {

            // Figuure out our total height of current display
            var minY=d3.min(nodes,function (d) { 
                return d.x
            });                              // min y position
            var maxY=d3.max(nodes,function (d) { 
                return d.x
            });                              // max y position
            var maxX=d3.max(nodes,function (d) {
                return d.depth 
            }) * depthSpan;              // max x position
            var h = Math.max(scope.height,maxY - minY + size.top);   // calc height
            var w = Math.max(scope.width,maxX + scope.width *.2 + size.left + 400);               // calc width;

            // if the span between minY and maxY is less than the total height, but maxY + half the height is MORE than the total height
            // we need to make the height bigger.  i.e.  If expanded node is below the root node and it expands beyond the bottom of the screen.
            if (size.height/2 + maxY > h) h = size.height/2 + maxY + tree.nodeSize()[0];
            
            heightNodes = h;
            h = h+400;
            svg.attr("height",h + "px").attr("width",w + "px");
              /*  .transition().duration(scope.duration)
                .attr("height",h + "px").attr("width",w + "px");
*/
            //Now determine how far above the fold this minY is
            var offsetY = Math.max(0,-minY  - size.height/2) + tree.nodeSize()[0]/2;

            // Normalize for fixed-depth.
            nodes.forEach(function(d) {
                // if (tree.nodeSize()) d.x= d.x + size.height/2;
                if(d.depth == 0) {
                    d.y = d.depth * depthSpan
                }
                else {
                    d.y = d.depth * depthSpan - 160;
                }
                //Adjust y position to accomodate offset
                d.x = d.x + offsetY - tree.nodeSize()[0];
                d.data.x = d.data.x + offsetY - tree.nodeSize()[0];
            });            


            if(rootNode === null) {
                return;
            }

            //Scroll to position of the rootNode node.
            if(rootNode !== null) {
                scrollTop(rootNode.x);
            }
        }

        function getnodeBorderColor(d) {

            if(d.data.type === 'nothandled') {
                return '#ffb0b6';
            }
            else if(d.data.type === 'intent' || d.data.type === 'others'  || d.data.name.toLowerCase() === 'faq' || d.data.name.toLowerCase() === 'help' || d.data.type == 'smalltalk') {
                return '#d0e3ff';
            }
            else if(d.depth === 0) {
                return '#253348';
            }
            else {
                return '#b6dfb2';
                // return '#8a959f';
            }
        }

        // Enter any new nodes at the parent's previous position.
        function getnodeBgColor(d){
            // if(d.data.type === 'smalltalk') {
            //     return '#e9eaec';
            // }
            if(d.data.type === 'nothandled') {
                return '#ffdcdc';
            }
            else if(d.data.type === 'intent' || d.data.type === 'others'  || d.data.name.toLowerCase() === 'faq' || d.data.name.toLowerCase() === 'help' || d.data.type == 'smalltalk') {
                return '#e7f0ff';
            }
            else if(d.depth === 0) {
                return '#07377F';
            }
            else {
                return '#d1efce';
                // return '#8a959f';
            }
        }

        var nodeClickHandle = function(that, d, i) {
            scope.dispatch.call('click', that, d, i);
        }

        d3.selectAll(".vz-weighted_tree-utterance-plot").html('');


        var utteranceEnter = utterance.enter().append('g')
            .attr('class', function(d,i) {
                return 'vz-weighted_tree-utterance vz-weighted_tree-utterance-'+d[0].utteranceId;
            });

        var utterancesLinksD = uttPlot.selectAll(".vz-weighted_tree-utterance-path")
                .data(utterancesLinks || []);

        utterancesLinksD.enter().append('path')
            .attr("class",  function (d) { 
                return "vz-weighted_utt-link-further";
            })
            .attr("d", function(d) {
                var y = d.source.x + 20;
                var x = d.source.y + 140;
                var o = {x: y, y: x};
                var xtar = d.target.x;
                var ytar = d.target.y - 50;
                var tar = {x: xtar, y: ytar};
                return diagonal({source: o, target: tar});
            })
            .style('display', function(d) {
                if(d.depth === 0) {
                    return 'none';
                }
                else {
                    return 'block';
                }
            })
            .style('stroke', '#8a959f')
            .style('stroke-opacity', '0.2')
            .style("stroke-linecap", "round")
            .style("stroke-width", "2");
        utterance.exit().remove();

        utterancesLinksD.enter().append('path')
            .attr("class",  function (d) { 
                return "vz-weighted_utt-link-further";
            })
            .attr("d", function(d) {
                var y = d.source.x + 20;
                var x = d.source.y + 140;
                var o = {x: y, y: x};
                var xtar = d.target.x;
                var ytar = d.target.y - 50;
                var tar = {x: xtar, y: ytar};
                return diagonal({source: o, target: tar});
            })
            .style('display', function(d) {
                if(d.depth === 0) {
                    return 'none';
                }
                else {
                    return 'block';
                }
            })
            .style('stroke', '#8a959f')
            .style('stroke-opacity', '0.2')
            .style("stroke-linecap", "round")
            .style("stroke-width", "2");

        // Update the nodes…
        var node = nodePlot.selectAll(".vz-weighted_tree-node")
            .data(nodes, function(d) { 
                return d.vz_tree_id || (d.vz_tree_id = scope.key(d)); 
            });


        var nodeEnter = node.enter().append("g")
            .attr("class", function (d) { 
                if(d.vz_tree_id && d.vz_tree_id.replace(/:/g, '-').indexOf('others-') === 0) {
                    return "vz-weighted_tree-node vz-id-others-0"
                }
                else if(d.vz_tree_id) {
                    return "vz-weighted_tree-node vz-id-" + d.vz_tree_id.replace(/:/g, '-');
                }
                else {
                    return 'vz-weighted_tree-node session-root-node';
                }
            })
            .attr('node_type', function(d){
                if(d.data.type === 'agentTransfer') {
                    return 'agentTransfer';
                }
            })
            .attr("transform", function(d) {
                var y = d.y0 ? d.y0 : rootNode.y;
                var x = d.x0 ? d.x0 : rootNode.x;
                return "translate(" + y + "," + x + ")";
             })
            .on("click",  function (d,i) { 
                nodeClickHandle(this,d,i);
                //scope.dispatch.click(this,d,i) 
            })
            .on("dblclick", function (d,i) { 
                //scope.dispatch.dblclick(this,d,i) 
                scope.dispatch.call('dblclick', this, d, i);
            })
            .on("mouseout", function (d,i) { 
                //scope.dispatch.mouseout(this,d,i) 
                scope.dispatch.call('mouseout', d3.event, this, d, i);
            });
                     var _preTag=nodeEnter.append('g')
            .attr("display",canPreTagShow);

       _preTag.append("rect")
            .attr("class", "vz-weighted_tree-node-pre-percent")
            .style("cursor", function(d){
                // if(d.data.type !== 'message') {
                //     return 'pointer';
                // }
                return 'pointer';
            })
            .attr('node_id', function(d){
                return d.data.id?d.data.id.replace(/:/g, '-'):'';
            })
            .attr('para_id', function(d) {
                return d.data.originalId;
            })
            .attr('node_name', function(d) {
                return d.data.name;
            })
            .attr('node_type', function(d) {
                return d.data.type;
            })
            .style("fill", "#07377F")
            .attr("width", "30")
            .attr("height", "15")
            .attr("x", function (d) { return -45 })
            .attr("y", function (d) { return -8 })
            .attr("rx", 5)
            .attr("ry", 5);

        
        _preTag.append("text")
            .attr("x", function (d) { return -30})
            .attr("y", function (d) { return 3 })
            .attr("text-anchor", 'middle')
            .style("pointer-events","none")
            .attr("font-size","10")
            .style("fill",'#fff')
            .text(function(d) {
                return (d.data.totalInp||0)+'%'; 
            });    
                
            if(root.hasOwnProperty('utterances') && root.utterances.length) {
                _preTag.append("image")
                  .attr("xlink:href", imagePath.triangle)
                  .attr('class', 'img-triangle')
                  .attr('display', function(d) {
                    if(d.data.depth === 1 && (d.isLinkedToUtterances || d.data.id === 'others-0')) {
                        return 'block'
                    }
                    return 'none';
                  })
                .attr("x", function (d) { return -59 })
                .attr("y", function (d) { return -8 })
                .attr("width", 15)
                .attr("height", 17);
            }
        
         //post percentage 
        function getPostTagColor(d) {
            return '#8a959f';
            // if ((d.count || 0) >=70) {
            //     return "#f24028";
            // } else {
            //     return "#f7822e";
            // }
        }
        function canTagShow(d) {
            if ((d.depth || 0) <1 || d.data.dropout === "0") {
                return "none";
            } else {
                return "block";
            }
        }           
         var _postTag=nodeEnter.append('g')
         .attr("display",canTagShow);

        
         _postTag.append("rect")
         .attr("class", ".vz-weighted_tree-node-post-percent-bg")
         .style("cursor", "pointer")
         .style("fill", getPostTagColor)
         .attr("width", "30")
         .attr("height", "15")
         .attr('display', function(d) {
            if(d.data.hasOwnProperty('dropout') && d.data.dropout !== 0) {
                return 'block';
            }
            else {
                return 'none';
            }
         })
         .attr("x", function (d) { return 132})
         .attr("y", function (d) { return -8 })
         .attr("rx", 6)
         .attr("ry", 6);

         _postTag.append("text")
         .attr("class", ".post-percent-text")
         .attr("x", function (d) { return 148})
         .attr("y", function (d) { return 3 })
         .attr("text-anchor", 'middle')
         .style("pointer-events","none")
         .attr("font-size","10")
         .style("fill",'#fff')
         .attr('display', function(d) {
            if(d.data.hasOwnProperty('dropout') && d.data.dropout !== 0) {
                return 'block';
            }
            else {
                return 'none';
            }
         })
         .text(function(d) { 
            return (d.data.dropout||0)+'%'; 
          });    
         
        setTimeout(function(){
            d3.select('.vz-weighted_tree-node.vz-id-others-0').insert("rect", '#others-0')
                .style("cursor","pointer")
                .style("fill",'#d0e3ff')
                .attr("width",'135')
                .attr("height","40")
                .attr('node_id', function(d){
                    return d.data.id?d.data.id.replace(/:/g, '-'):'';
                })
                .attr("rx","5")
                .attr("ry","5") 
                .attr("x", function(d) { return -8.5 })
                .attr("y", function(d) { return -18 });

    

            d3.selectAll('g[node_type=agentTransfer]').append('g')
                .attr('class', 'agent-node-caret-down')
                .attr('transform', 'translate(25,-28)')
                .append('text')
                .attr('font-family', 'FontAwesome')
                .attr('font-size', '12px')
                .attr('x', '-6')
                .attr('y', '4.25')
                .text(function(d) { return '\uf0d7' })
               
            d3.selectAll('g[node_type=agentTransfer]').append('rect')
                .attr('x', '-30')
                .attr('y', '-60')
                .attr('width', '100')
                .attr('height', '30')
                .style('opacity', '1')
                .attr('rx', '5')
                .attr('ry', '5')
                .attr('class', 'agent-node-rec')
                .style('fill', '#26344a');  

            d3.selectAll('g[node_type=agentTransfer]').append('text')
                .attr('x', '-15')
                .attr('y', '-40')
                .attr('rx', '5')
                .attr('ry', '5')
                .attr('class', 'agent-node-tex')
                .style('fill', '#ffffff')
                .text(function(d){
                    return 'Agent Node';
                });

            d3.selectAll('g[node_type=agentTransfer]').append('rect')
                .attr('x', '-14')
                .attr('y', '-19')
                .attr('width', '24')
                .attr('height', '38')
                .style('opacity', '1')
                .style('fill', '#76818e');

            d3.selectAll('g[node_type=agentTransfer]').append("svg:image")
                .attr('x', '-10')
                .attr('y', '-9')
                .attr('class', 'agent-viz-node')
                .attr('width', 15)
                .attr('height', 15)
                .attr("xlink:href", imagePath.agentTransfer);
        }, 800);


        nodeEnter.append("rect")
            .attr("class","vz-weighted_tree-node-rect")
            .attr('id', function(d){
                if(d.data.type === 'others') {
                    return 'others-0';
                }
            })
            .style("cursor", function(d){
                if(d.data.dropout == 100 || (d.data.parent && d.data.parent.hasOwnProperty('endOfDialog'))) {
                    return 'default';
                }                
                else  {
                    return 'pointer';
                }
            })
            .style("fill",getnodeBgColor)
            .attr("width",function(d){
                if(d.depth === 0) {
                    return 80;
                }
                else {
                    return 150;
                }
            })
            .attr('stroke', getnodeBorderColor)
            .attr('stroke-width', '1')
            .attr("height","36")
            .attr('node_id', function(d){
                return d.data.id?d.data.id.replace(/:/g, '-'):'';
            })
            .attr("rx","5")
            .attr("ry","5") 
            .attr("x", function(d) { return -16.5 })
            .attr("y", function(d) { return -20 })
            .on("mouseover", function (d,i) { 
                scope.dispatch.call('mouseover', d3.event, this, d, i);
            });

        

            nodeEnter.append("text")
            .attr("dx", function(d){
                if(d.depth === 0) {
                    return 22;
                }
                else if(d.data.type === 'intent' || d.data.name.toLowerCase() === 'smalltalk' 
                || d.data.name.toLowerCase() === 'faq' || d.data.name.toLowerCase() === 'help' || d.data.type === 'nothandled') {
                    return 55;
                }
                else if (d.data.type === 'agentTransfer'){  
                    return 65;
                }
                else {
                    return 55;
                }
            })
            .attr("dy",function(d) { 
                return '0.2em'; 
            })
            .attr('class', function(d){
                return 'sF-node-text'
            })
            .attr("text-anchor", function(d) { return d.children || d._children ? "middle" : "middle"; })
            .style("pointer-events","none")
            .attr("font-size", function(d){
                if(d.depth === 0) {
                    return '16px';
                }
                else {
                    return '14px';
                }
            })
            .attr("font-weight", function(d) {
                return "normal";   
            })
            .attr("font-family","Inter")
            .style("fill",function(d){
                if(d.data.type === 'smalltalk') {
                    return '#07377f';//'#26344a';
                }
                else if(d.data.type === 'nothandled') {
                    return '#07377f';//'#ff001f';
                }
                else if(d.depth === 0) {
                    return '#fff';
                }
                return '#07377F';
            })
            .text(function(d){
                return scope.label(d);
            });

        nodeEnter.append('g')
        .attr('transform', 'translate(180,3)')
        .append('text')
        .attr('class', function(d) {
            return 'node-loading fa-spin-fast';
        })
        .attr('id', function(d) {
            return d.data.id?d.data.id.replace(/:/g, '-'):"";
        })
        .attr('font-family', 'FontAwesome')
        .attr('font-size', '12px')
        .attr('x', '-6')
        .attr('y', '4.25')
        .text(function(d) { return '\uf1ce' });

        utteranceEnter.append("path")
            .attr("class",  function (d) { 
                return "vz-weighted_utt-link";
            })
            .attr("d", function(d) {
                var y = d.x;
                var x = d.y;
                var o = {x: y, y: x-70};
                if(d.length == 2) {
                    o.x +=20;
                }
                else if(d.length > 2) {
                    o.x +=40;
                }
                return diagonal({source: {x: ySour, y: xSour}, target: o});
            })
            .style('display', function(d) {
                if(d.depth === 0) {
                    return 'none';
                }
                else {
                    return 'block';
                }
            })
            .style("stroke-linecap", "round")
            .style("stroke-width", function(d) {
                if(d.prePercentage === 100) {
                    return 10;
                }
                else if(d.prePercentage > -1 && d.prePercentage < 21) {
                    return 5;    
                }
                else {
                    return d.prePercentage/4;
                }
            })
            .attr('transform', 'translate(40, 20)');



/*        utteranceEnter.append("path")
            .attr("class",  function (d) { 
                return "vz-weighted_utt-link-further";
            })
            .attr("d", function(d) {
                var y = d.x + 20;
                var x = d.y + 140;
                var o = {x: y, y: x};
                // var xtar = d.data.xDest;
                // var ytar = d.data.yDest - 50;
                var xtar = d.xDest;
                var ytar = d.yDest - 50;
                var tar = {x: xtar, y: ytar};
                return diagonal({source: o, target: tar});
            })
            .style('display', function(d) {
                if(d.depth === 0) {
                    return 'none';
                }
                else {
                    return 'block';
                }
            })
            .style("stroke-linecap", "round")
            .style("stroke-width", "2");*/

   var _preUtteranceTag = utteranceEnter.append('g')

       _preUtteranceTag.append("rect")
            .attr("class", "vz-weighted_utterances-node-pre-percent")
            .style("fill", "#07377F")
            .attr("width", "30")
            .attr("height", "15")
            .attr('display', function(d) {
                if(d.depth == 0) {
                    return 'none';
                }
            })
            .attr("x", function (d) { return d.y-30 })
            .attr("y", function (d) { 
                if(d.length == 2) {
                    return d.x+30;
                }
                else if(d.length > 2) {
                    return d.x+50;
                }
                return d.x+15;
            })
            .attr('rx', 6)
            .attr('rx', 6);


        utteranceEnter.append("rect")
            .attr("class","vz-weighted_tree-utterance-rect")
            .style("fill","#e5e8ec")
            // .attr('stroke', '#4a90e2')
            .attr("width",function(d){
                if(d.depth === 0) {
                    return 0;
                }
                else {
                    return 150;
                }
            })
            .attr("height",function(d){
                if(d.length === 1){
                    return 44;
                }
                else if(d.length === 2) {
                    return 80;
                }
                else {
                    if(d.length == 3) {
                        return 115;
                    }
                    else {
                        return 105;
                    }
                }
            })
            .attr("rx","5")
            .attr("ry","5")
            .attr("x", function(d) { 
                if(d.depth === 0) {
                    return xSour;
                }
                else {
                    return d.y - 4;
                }
            })
            .attr("y", function(d) { 
                if(d.depth === 0) {
                    return ySour;
                }
                else {
                    return d.x;
                }
            })

        utteranceEnter.append("rect")
            .style("cursor","pointer")
            .style("fill",'#dde1e4')
            .attr("width",'130')
            .attr("height","23")
            .attr('stroke', '#dde1e4')
            .attr("rx","5")
            .attr("ry","5") 
            .attr("x", function(d) { return d.y + 11; })
            .attr("y", function(d) { return d.x + 9; });


        utteranceEnter.append("rect")
            .style("cursor","pointer")
            .style("fill",'#bfc5ca')
            .attr("width",'130')
            .attr("height","25")
            .attr('stroke', '#dde1e4')
            .attr("rx","5")
            .attr("ry","5") 
            .attr("x", function(d) { return d.y + 8; })
            .attr("y", function(d) { return d.x + 8; });


        utteranceEnter.append("rect")
            .attr('class', 'vz-weighted_tree-utterance-text-white-rect')
            .style("cursor","pointer")
            .style("fill",'#fff')
            .attr("width",'130')
            .attr("height","30")
            .attr('stroke', '#dde1e4')
            .attr("rx","5")
            .attr("ry","5") 
            .attr("x", function(d) { return d.y + 5; })
            .attr("y", function(d) { return d.x + 7; })


        utteranceEnter.append("text")
            .attr("class","vz-weighted_tree-utterance-text")
            .attr("dx", function(d){
                return d.y + 15;                
            })
            .attr("dy",function(d) { 
                return d.x + 25;
            })
            .attr("font-size", function(d){
                return '12px';
            })
            .attr("font-weight", function(d) {
                return "normal";   
            })
            .attr("font-family","Inter")
            .attr('font-style', 'normal')
            .attr('cursor', 'pointer')
            .style("fill",'#26344a')
            .text(function(d) {
                if(d[0] && d[0].utterance && d[0].utterance.length > 16) {
                    return d[0].utterance.slice(0, 14) + '...' + ' ('+d[0].count+')';
                }
                else if(d[0] && d[0].utterance) {
                    return d[0].utterance + ' (' + d[0].count + ')';   
                }
                else {
                    return '';
                }
            })

        utteranceEnter.append("rect")
            .attr('class', 'transparent-rect')
            .style("cursor","pointer")
            .style("fill",'transparent')
            .attr("width",'130')
            .attr("height","30")
            .attr('stroke', '#dde1e4')
            .attr("rx","5")
            .attr("ry","5") 
            .attr("x", function(d) { return d.y + 5; })
            .attr("y", function(d) { return d.x + 7; })
            .on("click", function (d,i) { 
                scope.dispatch.call('click', this, d[0], i);
            }).on("mouseover", function (d,i) { 
                //scope.dispatch.mouseover(this,d,i) 
                scope.dispatch.call('mouseover', d3.event, this, d[0], i);
            })
            .on("mouseout", function (d,i) { 
                //scope.dispatch.mouseout(this,d,i) 
                scope.dispatch.call('mouseout', d3.event, this, d, i);
            });

        utteranceEnter.append("rect")
            .style("cursor","pointer")
            .style("fill",'#dde1e4')
            .attr("width",'130')
            .attr("height","23")
            .attr('stroke', '#dde1e4')
            .attr("rx","5")
            .attr("ry","5") 
            .attr('display', function(d){
                if(d.length > 1) {
                    return 'block';
                }
                else {
                    return 'none'
                }
            })
            .attr("x", function(d) { return d.y + 11; })
            .attr("y", function(d) { return d.x + 45; });


        utteranceEnter.append("rect")
            .style("cursor","pointer")
            .style("fill",'#bfc5ca')
            .attr("width",'130')
            .attr("height","25")
            .attr('stroke', '#dde1e4')
            .attr("rx","5")
            .attr("ry","5") 
            .attr('display', function(d){
                if(d.length > 1) {
                    return 'block';
                }
                else {
                    return 'none'
                }
            })
            .attr("x", function(d) { return d.y + 8; })
            .attr("y", function(d) { return d.x + 44; });


        utteranceEnter.append("rect")
            .style("cursor","pointer")
            .attr('class', 'vz-weighted_tree-utterance-text-white-rect')
            .style("fill",'#fff')
            .attr("width",'130')
            .attr("height","30")
            .attr('stroke', '#dde1e4')
            .attr("rx","5")
            .attr("ry","5")
            .attr('display', function(d){
                if(d.length > 1) {
                    return 'block';
                }
                else {
                    return 'none'
                }
            })
            .attr("x", function(d) { return d.y + 5; })
            .attr("y", function(d) { return d.x + 43; });


        utteranceEnter.append("text")
            .attr("class","vz-weighted_tree-utterance-text")
            .attr("dx", function(d){
                return d.y + 15;
            })
            .attr("dy",function(d) {
                return d.x + 61;
            })
            .attr("font-size", function(d){
                return '12px';
            })
            .attr("font-weight", function(d) {
                return "normal";   
            })
            .attr("font-family","Inter")
            .attr('cursor', 'pointer')
            .attr('display', function(d){
                if(d.length > 1) {
                    return 'block';
                }
                else {
                    return 'none'
                }
            })
            .style("fill",'#26344a')
            .text(function(d) {
                if(d[1] && d[1].utterance && d[1].utterance.length > 16) {
                    return d[1].utterance.slice(0, 14) + '...' + ' (' + d[1].count + ')';
                }
                else if(d[1] && d[1].utterance) {
                    return d[1].utterance + ' (' + d[1].count + ')';   
                }
                else {
                    return '';
                }
            });


        utteranceEnter.append("rect")
            .style("cursor","pointer")
            .attr('class', 'transparent-rect')
            .style("fill",'transparent')
            .attr("width",'130')
            .attr("height","30")
            .attr('stroke', '#dde1e4')
            .attr("rx","5")
            .attr("ry","5")
            .attr('display', function(d){
                if(d.length > 1) {
                    return 'block';
                }
                else {
                    return 'none'
                }
            })
            .attr("x", function(d) { return d.y + 5; })
            .attr("y", function(d) { return d.x + 43; })
            .on("click", function (d,i) { 
                scope.dispatch.call('click', this, d[1], i);
            }).on("mouseover", function (d,i) { 
                //scope.dispatch.mouseover(this,d,i) 
                scope.dispatch.call('mouseover', d3.event, this, d[1], i);
            })
            .on("mouseout", function (d,i) { 
                //scope.dispatch.mouseout(this,d,i) 
                scope.dispatch.call('mouseout', d3.event, this, d, i);
            });


        utteranceEnter.append("rect")
            .style("cursor","pointer")
            .style("fill",'#dde1e4')
            .attr("width",'130')
            .attr("height","23")
            .attr('stroke', '#dde1e4')
            .attr("rx","5")
            .attr("ry","5") 
            .attr('display', function(d){
                if(d.length == 3) {
                    return 'block';
                }
                else {
                    return 'none'
                }
            })
            .attr("x", function(d) { return d.y + 11; })
            .attr("y", function(d) { return d.x + 77; });


        utteranceEnter.append("rect")
            .style("cursor","pointer")
            .style("fill",'#bfc5ca')
            .attr("width",'130')
            .attr("height","25")
            .attr('stroke', '#dde1e4')
            .attr("rx","5")
            .attr("ry","5") 
            .attr('display', function(d){
                if(d.length == 3) {
                    return 'block';
                }
                else {
                    return 'none'
                }
            })
            .attr("x", function(d) { return d.y + 8; })
            .attr("y", function(d) { return d.x + 80; });


        utteranceEnter.append("rect")
            .style("cursor","pointer")
            .attr('class', 'vz-weighted_tree-utterance-text-white-rect')
            .style("fill",'#fff')
            .attr("width",'130')
            .attr("height","30")
            .attr('stroke', '#dde1e4')
            .attr("rx","5")
            .attr("ry","5")
            .attr('display', function(d){
                if(d.length == 3) {
                    return 'block';
                }
                else {
                    return 'none'
                }
            })
            .attr("x", function(d) { return d.y + 5; })
            .attr("y", function(d) { return d.x + 79; });


        utteranceEnter.append("text")
            .attr("class","vz-weighted_tree-utterance-text")
            .attr("dx", function(d){
                return d.y + 15;
            })
            .attr("dy",function(d) {
                return d.x + 97;
            })
            .attr("font-size", function(d){
                return '12px';
            })
            .attr("font-weight", function(d) {
                return "normal";   
            })
            .attr("font-family","Inter")
            .attr('font-style', 'normal')
            .attr('cursor', 'pointer')
            .attr('display', function(d){
                if(d.length == 3) {
                    return 'block';
                }
                else {
                    return 'none'
                }
            })
            .style("fill",'#26344a')
            .text(function(d) {
                if(d[2] && d[2].utterance && d[2].utterance.length > 16) {
                    return d[2].utterance.slice(0, 14) + '...' + ' (' + d[2].count + ')';
                }
                else if(d[2] && d[2].utterance) {
                    return d[2].utterance + ' (' + d[2].count + ')';   
                }
                else {
                    return '';
                }
            });

        utteranceEnter.append("rect")
            .style("cursor","pointer")
            .attr('class', 'transparent-rect')
            .style("fill",'transparent')
            .attr("width",'130')
            .attr("height","30")
            .attr('stroke', '#dde1e4')
            .attr("rx","5")
            .attr("ry","5")
            .attr('display', function(d){
                if(d.length == 3) {
                    return 'block';
                }
                else {
                    return 'none'
                }
            })
            .attr("x", function(d) { return d.y + 5; })
            .attr("y", function(d) { return d.x + 79; })
            .on("click", function (d,i) { 
                scope.dispatch.call('click', this, d[2], i);
            }).on("mouseover", function (d,i) { 
                //scope.dispatch.mouseover(this,d,i) 
                scope.dispatch.call('mouseover', d3.event, this, d[2], i);
            })
            .on("mouseout", function (d,i) { 
                //scope.dispatch.mouseout(this,d,i) 
                scope.dispatch.call('mouseout', d3.event, this, d, i);
            });


        utteranceEnter.append("text")
            .attr("class","vz-weighted_tree-utterance-text")
            .attr("dx", function(d){
                return d.y + 35;
            })
            .attr("dy",function(d) { 
                return d.x + 93;
            })
            .attr("font-size", function(d){
                return '12px';
            })
            .attr("font-weight", function(d) {
                return "normal";   
            })
            .attr("font-family","Inter")
            .attr('font-style', 'normal')
            .attr('cursor', 'pointer')
            .attr('display', function(d){
                if(d.length > 2) {
                    return 'block';
                }
                else {
                    return 'none'
                }
            })
            .attr('display', function(d) {
                if(d.length > 3) {
                    return 'block';
                }
                else {
                    return 'none';
                }
            })
            .style("fill",'#8a959f')
            .text(function(d) {
                return '+ '+(d.length-2)+' more';
            }).on("click", function (d,i) { 
                scope.dispatch.call('click', this, d, i);
            });



        
            _preUtteranceTag.append("text")
            .attr("x", function (d) { return d.y-16})
            .attr("y", function (d) { 
                if(d.length == 2) {
                    return d.x+41;
                }
                else if(d.length > 2) {
                    return d.x+61;
                }
                return d.x+26;
            })
            .attr("text-anchor", 'middle')
            .style("pointer-events","none")
            .attr("font-size","10")
            .style("fill",'#fff')
            .attr('display', function(d) {
                if(d.depth == 0) {
                    return 'none';
                }
            })
            .text(function(d) {
                var totalCount = 0;
                d.forEach(function(val){
                    totalCount = totalCount + val.count;
                });
                return totalCount;
/*                if(d.prePercentage) {
                    d.prePercentage = Number.parseInt(d.prePercentage);
                }
                return (d.prePercentage||1)+'%'; */

            });    
            



         //pre percentage   
         function canPreTagShow(d) {
            if ((d.depth || 0) <1) {
                return "none";
            } else {
                return "block";
            }
        } 

      

         if(root.hasOwnProperty('utterances') && root.utterances.length) {
            linkPlot.attr('transform', 'translate(346, 0)');
         }
         else {
            linkPlot.attr('transform', 'translate(50, 0)');
         }

        // Update the links…
        var link = linkPlot.selectAll(".vz-weighted_tree-link")
            .data(links, function(d) { 
                return d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-'); 
            });

        // Enter any new links at the parent's previous position.
        link.enter().append("path")
            .attr("class",  function (d) { 
                if(d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-').indexOf('others-') === 0) {
                    return "vz-weighted_tree-link vz-id-others-0";
                }
                else {
                    return "vz-weighted_tree-link vz-id-" + d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-');
                }
            })
            .attr("d", function(d) {
                var y = d.target.y0 ? d.target.y0 : rootNode.y;
                var x = d.target.x0 ? d.target.x0 : rootNode.x;
                var o = {x: x, y: y};
                return diagonal({source: o, target: o});
            })
            .style('display', function(d) {
                if(d.source.depth === 0 && root.hasOwnProperty('utterances') && root.utterances.length) {
                    return 'none';
                }
                else {
                    return 'block';
                }
            })
            .on("mouseover", function (d,i) { 
                //scope.dispatch.mouseover(this,d,i) 
                scope.dispatch.call('mouseover', d3.event, this, d, i);
            })
            .on("mouseout", function (d,i) { 
                //scope.dispatch.mouseout(this,d,i) 
                scope.dispatch.call('mouseout', d3.event, this, d, i);
            })
            .style("stroke-linecap", "round");


        link.enter().append('circle')
            .attr('class', function(d) {
                return 'oval-path-' + d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-') + ' oval-path';
            })
            .attr('targetNodeId', function(d) {
                return d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-');
            })
            .attr('r', '10')
            .attr('cy', function(d,i) {
                return (d.source.x + d.target.x)/2;
            })
            .attr('cx', function(d, i) {
                if(d.target.data.hasOwnProperty('transitionType')) {
                    if(root.hasOwnProperty('utterances') && root.utterances.length) {
                        return (d.source.y + d.target.y)/2 + 42;
                    }   
                    return (d.source.y + d.target.y)/2 - 8;
                }
                else {
                    if(root.hasOwnProperty('utterances') && root.utterances.length) {
                        return (d.source.y + d.target.y)/2 + 50;
                    }   
                    return (d.source.y + d.target.y)/2;                    
                }
            }).on("mouseover", function (d,i) { 
                //scope.dispatch.mouseover(this,d,i) 
                scope.dispatch.call('mouseover', d3.event, this, d, i);
            })
            .on("mouseout", function (d,i) { 
                //scope.dispatch.mouseout(this,d,i) 
                scope.dispatch.call('mouseout', d3.event, this, d, i);
            });

            link.enter().append('circle')
            .attr('class', function(d) {
                return 'interrupt-' + d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-') + ' interrupt-path';
            })
            .attr('targetNodeId', function(d) {
                return d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-');
            })
            .style('fill', '#009ea9')
            .style('fill-opacity', '1')
            .style('display', function(d) {
                if(d.target.data.hasOwnProperty('transitionType')) {
                    return 'inline';
                }
                else {
                    return 'none';
                }
            })
            .attr('cursor', 'pointer')
            .attr('r', '10')
            .attr('cy', function(d,i) {
                return (d.source.x + d.target.x)/2;
            })
            .attr('cx', function(d, i) {
                if(d.target.data.transitions && d.target.data.transitions.length !== 0) {
                    if(root.hasOwnProperty('utterances') && root.utterances.length) {
                        return (d.source.y + d.target.y)/2 + 58;
                    }
                    return (d.source.y + d.target.y)/2 + 8;
                }
                else {
                    if(root.hasOwnProperty('utterances') && root.utterances.length) {
                        return (d.source.y + d.target.y)/2 + 50;
                    }
                    return (d.source.y + d.target.y)/2;   
                }
            }).on("mouseover", function (d,i) { 
                //scope.dispatch.mouseover(this,d,i) 
                scope.dispatch.call('mouseover', d3.event, this, d, i);
            })
            .on("mouseout", function (d,i) { 
                //scope.dispatch.mouseout(this,d,i) 
                scope.dispatch.call('mouseout', d3.event, this, d, i);
            });

            link.enter().append("image")
              .attr("xlink:href", imagePath.transition)
              .attr('class', function(d) {
                    return 'img-hold-' + d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-') + ' img-hold';
                })
                .style('display', function(d) {
                    if(d.target.data.hasOwnProperty('transitionType')) {
                        return 'inline';
                    }
                    else {
                        return 'none';
                    }
                })
              .attr("x", function(d, i) {
                    if(d.target.data.transitions && d.target.data.transitions.length !== 0) {
                        if(root.hasOwnProperty('utterances') && root.utterances.length) {
                            return ((d.source.y + d.target.y)/2) + 53;
                        }
                        return ((d.source.y + d.target.y)/2) + 3;
                    }
                    else {
                        if(root.hasOwnProperty('utterances') && root.utterances.length) {
                            return ((d.source.y + d.target.y)/2) + 45;
                        }
                        return ((d.source.y + d.target.y)/2) - 5;
                    }
                })
              .attr("y", function(d,i) {
                    return ((d.source.x + d.target.x)/2) - 5;
                })
              .attr('cursor', 'pointer')
              .attr("width", 11)
              .attr("height", 11);


        link.enter().append('text')
            .attr('class', function(d) {
                return 'circle-link-' + d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-') + ' circle-link';
            })
            .attr('targetNodeId', function(d) {
                return d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-');
            })
            .attr('font-family', 'FontAwesome')
                .attr('font-size', '12px')
                .attr('y', function(d, i){
                    return (d.source.x + d.target.x)/2 + 5;
                })
                .attr('x', function(d, i){
                    if(d.target.data.hasOwnProperty('transitionType')) {
                        if(root.hasOwnProperty('utterances') && root.utterances.length) {
                            return (d.source.y + d.target.y)/2 + 36;
                        }               
                        return (d.source.y + d.target.y)/2 - 14;  
                    }
                    else {
                        if(root.hasOwnProperty('utterances') && root.utterances.length) {
                            return (d.source.y + d.target.y)/2 + 44;
                        }               
                        return (d.source.y + d.target.y)/2 - 6;  
                    }
                })
                .text(function(d) { return "\uf0c1" }); 

       var linkSmallCircle = link.enter().append('circle')
            .attr('class', function(d) {
                return 'oval-small-path-' + d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-') + ' oval-small-path';
            })
            .attr('targetNodeId', function(d) {
                return d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-');
            })
            .attr('r', '4')
            .attr('cy', function(d,i) {
                return (d.source.x + d.target.x)/2;
            })
            .attr('cx', function(d, i) {
                if(d.target.data.hasOwnProperty('transitionType')) {
                    if(root.hasOwnProperty('utterances') && root.utterances.length) {
                        return (d.source.y + d.target.y)/2 + 42;
                    }
                    else {
                        return (d.source.y + d.target.y)/2 - 8;
                    }
                }
                else {
                    if(root.hasOwnProperty('utterances') && root.utterances.length) {
                        return (d.source.y + d.target.y)/2 + 50;
                    }
                    else {
                        return (d.source.y + d.target.y)/2;
                    }
                }

            })
            .attr('path-on-hover', function(d) {
                if(d.target.data.transitions && d.target.data.transitions.length !== 0) {
                    var pathSave = '';
                    for(var i=0; i<d.target.data.transitions.length; i++) {
                        if(d.target.data.transitions.length > 1) {
                            pathSave = pathSave + '<span class="pathSession">Path ' + (i+1) + '</span> <br/> ';
                        }
                        for(var j=0; j<d.target.data.transitions[i].path.length; j++) {
                            if(j !== d.target.data.transitions[i].path.length-1) {
                                pathSave = pathSave + d.target.data.transitions[i].path[j].name + '(' + d.target.data.transitions[i].path[j].type + ')' +'--> ';
                            }
                            else {
                                pathSave = pathSave + d.target.data.transitions[i].path[j].name + '(' + d.target.data.transitions[i].path[j].type + ')';
                            }
                        }
                    }
                    return pathSave;
                }
            })
            .style("cursor","pointer")
//            .style('display', 'block')
            .attr('display', function(d) {
                if(d.target.data.transitions && d.target.data.transitions.length !== 0) {
                    return 'block';
                }
                else {
                    return 'none';
                }
            }).on("mouseover", function (d,i) { 
                //scope.dispatch.mouseover(this,d,i) 
                scope.dispatch.call('mouseover', d3.event, this, d, i);
            });


        //Before we fire transition we hit update so any external styles can take effect before we transition.
        scope.dispatch.call('update');

        node = d3.selectAll('.vz-weighted_tree-node-plot .vz-weighted_tree-node')
                    .data(nodes, function(d) { 
                        return d.vz_tree_id || (d.vz_tree_id = scope.key(d)); 
                    });
        // Transition nodes to their new position.
        var nodeUpdate = node.transition();

        endUpdate(nodeUpdate,function () { 
            scope.dispatch.call('node_refresh')
        });

        nodeUpdate
            //.duration(scope.duration)
            .attr("transform", function(d) { 
                if(d.vz_tree_id) {
                    var y = d.y;
                    if(root.hasOwnProperty('utterances') && root.utterances.length) {
                        y = d.y + 350;
                    }
                    return "translate(" + y + "," + d.x + ")"; 
                }
                else {
                    return "translate(" + d.y + "," + d.x + ")"; 
                }
            });

        nodeUpdate.select("circle")
            .attr("r", function (d) { return nodeRadius(d)});

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit()
          .transition()
         .duration(scope.duration)
            .attr("transform", function(d) {
                d.x0=null;
                d.y0=null;
                var rootNodeX = rootNode.y;
                if(root.hasOwnProperty('utterances') && root.utterances.length) {
                    var rootNodeX = rootNode.y + 350;
                }
                var rootNodeY = rootNode.x + 30;
                return "translate(" + rootNodeX + "," + rootNodeY + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text");

        link._groups = d3.selectAll('.vz-weighted_tree-link')._groups;
      //  link._groups = d3.selectAll('.oval-path')._groups.concat(d3.selectAll('.vz-weighted_tree-link')._groups);
        // Transition links to their new position.
        link
            //.transition().duration(scope.duration)
            .attr("d", diagonal)
            .style("stroke-width",function (d) {
                return nodeRadius(d.target)*2;
            });

        var pathST = [];
        d3.selectAll('.vz-weighted_tree-link').each(function(d, i){
            pathST[i] = {
                'sourceX': d.source.x,
                'sourceY': d.source.y,
                'targetX': d.target.x,
                'targetY': d.target.y
            };
        });

        d3.selectAll('.oval-small-path').attr('cy', function(d, i) {
            return (pathST[i].sourceX + pathST[i].targetX) / 2;
        }).attr('cx', function(d, i) {
            if(d.target.data.hasOwnProperty('transitionType')) {
                if(root.hasOwnProperty('utterances') && root.utterances.length) {
                    return (pathST[i].sourceY + pathST[i].targetY) / 2 + 42;
                }
                return (pathST[i].sourceY + pathST[i].targetY) / 2 - 8;
            }
            else {
                if(root.hasOwnProperty('utterances') && root.utterances.length) {
                    return (pathST[i].sourceY + pathST[i].targetY) / 2 + 50;
                }
                return (pathST[i].sourceY + pathST[i].targetY) / 2;
            }
        }).style("cursor","pointer");


        d3.selectAll('.oval-path').attr('cy', function(d, i) {
            return (pathST[i].sourceX + pathST[i].targetX) / 2;
        }).attr('cx', function(d, i) {
            if(d.target.data.hasOwnProperty('transitionType')) {
                if(root.hasOwnProperty('utterances') && root.utterances.length) {
                    return ((pathST[i].sourceY + pathST[i].targetY) / 2) + 42;
                }            
                return (pathST[i].sourceY + pathST[i].targetY) / 2 - 8;
            }
            else {
                if(root.hasOwnProperty('utterances') && root.utterances.length) {
                    return ((pathST[i].sourceY + pathST[i].targetY) / 2) + 50;
                }            
                return (pathST[i].sourceY + pathST[i].targetY) / 2;
            }
        });
        try {
            d3.selectAll('.interrupt-path').attr('cy', function(d, i) {
                return (pathST[i].sourceX + pathST[i].targetX) / 2;
            }).attr('cx', function(d, i) {
                if(d.target.data.transitions && d.target.data.transitions.length !== 0) {
                    if(root.hasOwnProperty('utterances') && root.utterances.length) {
                        return ((pathST[i].sourceY + pathST[i].targetY) / 2) + 58;
                    }
                    return (pathST[i].sourceY + pathST[i].targetY) / 2 + 8;
                }
                else {
                    if(root.hasOwnProperty('utterances') && root.utterances.length) {
                        return ((pathST[i].sourceY + pathST[i].targetY) / 2) + 50;
                    }
                    return (pathST[i].sourceY + pathST[i].targetY) / 2;                    
                }

            }).attr('path-on-hover', function(d) {
                return '<p>New task initiated and previous task went on hold</p>'
            });

            d3.selectAll('.img-hold').attr('y', function(d, i) {
                return ((pathST[i].sourceX + pathST[i].targetX) / 2) - 5;
            }).attr('x', function(d, i) {
                if(d.target.data.transitions && d.target.data.transitions.length !== 0) {
                    if(root.hasOwnProperty('utterances') && root.utterances.length) {
                        return ((pathST[i].sourceY + pathST[i].targetY) / 2) + 53;
                    }
                    return ((pathST[i].sourceY + pathST[i].targetY) / 2) + 3;
                }
                else {
                    if(root.hasOwnProperty('utterances') && root.utterances.length) {
                        return ((pathST[i].sourceY + pathST[i].targetY) / 2) + 45;
                    }
                    return ((pathST[i].sourceY + pathST[i].targetY) / 2) - 5;
                }
            });      

        }
        catch(e) {
            console.log(e);
        }

        d3.selectAll('.circle-link').attr('y', function(d, i) {
            return (pathST[i].sourceX + pathST[i].targetX) / 2 + 5;
        }).attr('x', function(d, i) {
            if(d.target.data.hasOwnProperty('transitionType')) {
                if(root.hasOwnProperty('utterances') && root.utterances.length) {
                    return ((pathST[i].sourceY + pathST[i].targetY) / 2) + 37;
                }
                return (pathST[i].sourceY + pathST[i].targetY) / 2 - 13;                
            }
            else  {
                if(root.hasOwnProperty('utterances') && root.utterances.length) {
                    return ((pathST[i].sourceY + pathST[i].targetY) / 2) + 45;
                }
                return (pathST[i].sourceY + pathST[i].targetY) / 2 - 5;                  
            }
        }).attr('path-on-hover', function(d) {
            if(d.target.data.transitions && d.target.data.transitions.length !== 0) {
                var pathSave = '';
                for(var i=0; i<d.target.data.transitions.length; i++) {
                    if(d.target.data.transitions.length > 1) {
                        pathSave = pathSave + '<span class="pathSession">Path ' + (i+1) + '</span>';
                    }                    
                    for(var j=0; j<d.target.data.transitions[i].path.length; j++) {
                        if(j !== d.target.data.transitions[i].path.length-1) {
                            pathSave = pathSave + d.target.data.transitions[i].path[j].name + '(' + d.target.data.transitions[i].path[j].type + ')' + ' --> ';
                        }
                        else {
                            pathSave = pathSave + d.target.data.transitions[i].path[j].name + '(' + d.target.data.transitions[i].path[j].type + ')';
                        }
                    }
                }
                return pathSave;
            }
        }).style("cursor","pointer")
        .on("mouseover", function (d,i) { 
            //scope.dispatch.mouseover(this,d,i) 
            scope.dispatch.call('mouseover', d3.event, this, d, i);
        })
        .on("mouseout", function (d,i) { 
            //scope.dispatch.mouseout(this,d,i) 
            scope.dispatch.call('mouseout', d3.event, this, d, i);
        });


        // Transition exiting nodes to the parent's new position.
        link.exit()
        .transition().duration(scope.duration)
                .attr("d", function(d) {
                    var smallC = '.oval-small-path-' + d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-');
                    var bigC = '.oval-path-' + d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-');
                    var textC = '.circle-link-' + d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-');
                    var interruptC = '.interrupt-' + d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-');
                    var imgHold = '.img-hold-' + d.target.vz_tree_id.replace(/\s/g ,"").replace(/:/g, '-');
                    $(smallC).remove();
                    $(bigC).remove();
                    $(textC).remove();
                    $(interruptC).remove();
                    $(imgHold).remove();
                    var o = {x: rootNode.x, y: rootNode.y};
                    return diagonal({source: o, target: o});
                })
                .remove();


    }




    // Fired after all transitions for tree are complete
    function endUpdate(transition, callback) {
        var n = 0;
        transition
            .each(function() { 
                ++n; 
            })
            .on("end", function() { 
                if (!--n)
                    callback.apply(this, arguments); 
            });
}

    // Scrolls to the top measure provided
    function scrollTop(top) {
        scope.selection.transition().duration(scope.duration)
            .tween("scrolltween", scrollTopTween(top));

        function scrollTopTween(scrollTop) {
            return function() {
                var i = d3.interpolateNumber(this.scrollTop, scrollTop);
                return function(t) { this.scrollTop = i(t); };
            };
        }
    }

    // Toggles node.
    function toggleNode(d) {
        if (d.children) {
           // d._children = d.children;
            delete d.values;
            d.children = null;
            if(d.parent === null) {
                delete d.utterances;
            }
        } else {
            d.children = d._children;
            d._children = null;
        }
        updateNode(d);
    }

    /**
     *
     *
     *  This is will re-render our component
     *  @param {Boolean} refresh - Passing in a "TRUE" value will also refresh all data.
     *  @memberof vizuly.viz.weighted_tree
     */
    viz.update = function (refresh, dataClickId, dataVals) {
        if (refresh == true) refreshNeeded=true;
        update(refresh, dataClickId, dataVals);
        return viz;
    };

    /**
     *
     * Called to expand or collapse node
     * @param {Object} d - Datum of node to expand or collapse
     * @memberof vizuly.viz.weighted_tree
     */
    viz.toggleNode = function (d) {
        toggleNode(d);
    };


    return viz;

};