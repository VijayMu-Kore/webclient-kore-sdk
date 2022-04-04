(function(ng){

    var _nobotsForm = ng.module("bt-forms");

    _nobotsForm.directive("team", function(){
        return {
            restrict: "EA",
            templateUrl: window.appConfig.TMPLT_PRE_PATH + "js/lazycomponents/team/team.html",
            controller: "teamCtrl"
        };
    });

    _nobotsForm.controller("teamCtrl", ["$scope", function($scope){
       
    }]);
           

})(angular);