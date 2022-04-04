(function (ng) {

    var _botsForm = ng.module("bt-forms");

    _botsForm.directive("botsForm", function () {
        return {
            restrict: "EA",
            templateUrl: window.appConfig.TMPLT_PRE_PATH + "js/lazycomponents/bots-form/bots-form.html",
            controller: "botsFormCtrl"
        };
    });

    _botsForm.controller("botsFormCtrl", ["$scope", "$rootScope", "$applicationService", "env_conf", "$workflowService", "BTSeedDataService", "BTStreamsService", "$q", "security", "builderUtility","$window","accessControlService",'$timeout','shortcutKeys','interactiveHelp','botUtil','i18n', 'navigator', 'mixPanel',
        function ($scope, $rootScope, $applicationService, env_conf,  $workflowService, BTSeedDataService, BTStreamsService, $q, security, builderUtility,$window,accessControlService,$timeout,shortcutKeys,interactiveHelp,botUtil,i18n,navigator,mixPanel) {
            var stream = null;
            $scope.showContent = true;
            $scope.seeAll = true;
            $scope.sortLoading = false;
            $scope.botsSortOrFilterObj = {
                filterBy:i18n.i18nString('allBots'),
                sortBy:'name',
                sortDate: i18n.i18nString('botName')
            };
            $scope.allBotsLabel = i18n.i18nString('allBots');
            $scope.createdLabel = i18n.i18nString('createdDate');
            $scope.searchedBots = [];
            var isBotSearchMode = false;
            $scope.botModel = {};
            $scope.botsView={};
            $scope.botsView.yourBots = 'tile';
            $scope.botsView.sharedBots = 'tile';
            $scope.botsView.sharedBotsSort = 'name';
            $scope.botsView.yourBotsSort = 'name';
            $scope.botModel.botSearchQuery = "";
            $scope.callbacks.showSolutionBotSetup = false;
            $scope.solutionBotIcon = window.appConfig.CONTEXT_PATH + '/img/shared-bot.svg';
            $scope.inheritedBotIcon = window.appConfig.CONTEXT_PATH + '/img/inherited-bot.svg';
            $scope.sampleBotIcon = window.appConfig.CONTEXT_PATH + '/img/botStatusIcons/sample-bot.svg'; 
            $scope.shareTwoIcon = window.appConfig.CONTEXT_PATH + '/img/botStatusIcons/share-2.svg'; 
            $scope.universalBotIcon = window.appConfig.CONTEXT_PATH + '/img/botStatusIcons/universal-bot.svg'; 
            $scope.shareBotIcon = window.appConfig.CONTEXT_PATH + '/img/share-2.svg';
            $scope.brokenImage = window.appConfig.CONTEXT_PATH + '/assets/images/brokenImage.png';
            $scope.brokenImageSmall = env_conf['context-url']+'/assets/images/brokenImageSmall.png';
            $scope.listViewIcon = env_conf['context-url']+'/assets/icons/listViewIcon.svg';
            $scope.tileViewIcon = env_conf['context-url']+'/assets/icons/tileViewIcon.svg';
            $scope.sortIconAZ = env_conf['context-url']+'/assets/icons/sortIconAZ.svg';
            $scope.sortIconZA = env_conf['context-url']+'/assets/icons/sortIconZA.svg';
            $scope.caretDownWhit = env_conf['context-url']+'/assets/icons/caretDownWhit.svg';
            $scope.caretDown = env_conf['context-url']+'/assets/icons/caretDown.svg';
            $scope.helpIcon = env_conf['context-url']+'/assets/icons/helpIcon.svg';
            $scope.searchIconGray = env_conf['context-url']+'/assets/icons/searchIconGray.svg';
            $scope.exclamationCircleRed = env_conf['context-url']+'/assets/icons/exclamationCircle-Red.svg';
            $scope.exclamationCircleOrange = env_conf['context-url']+'/assets/icons/exclamationCircle-Orange.svg';
            $scope.closeStoreIcon = env_conf['context-url']+'/assets/icons-new/close/close-dark.svg';
            $scope.botStoresImg = env_conf['context-url']+'/assets/images/botStores-img.png';
            $scope.botStoresIcon = env_conf['context-url']+'/assets/icons/botStores-icon.svg';
            $scope.iconHome = env_conf['context-url']+'/assets/home/icon-home.svg';
            $scope.iconDocument = env_conf['context-url']+'/assets/home/icon-document.svg';
            $scope.iconImport = env_conf['context-url']+'/assets/home/icon-import.svg';
            $scope.iconRobot = env_conf['context-url']+'/assets/home/icon-robot.svg';
            $scope.fullModalCallback = {};
            $scope.orderType = '-name';
            var hideList = [];
            var selectedAccount = $workflowService.selectedAccount();
            var applicationControl = $applicationService.userInfo().appControls;
            var result = _.find(applicationControl.associatedAccounts,{accountId:selectedAccount.accountId});
            $scope.obj.canCreateBot = result.canCreateBot;  
            $scope.iframeLoadingStore = true;
            $scope.published = i18n.i18nString('constants.states_published');
            $scope.inDevelopment = i18n.i18nString('constants.states_inProgress');
            $scope.storeImage = env_conf['context-url']+'/assets/icons-new/newbot/start-store.svg';
            $scope.importBotImage = env_conf['context-url']+'/assets/icons-new/newbot/import-bot.svg';
            $scope.showBanner = true;
            $scope.contentTypes = [
                {
                    "id": "standardbot",
                    "name":  i18n.i18nString('standard_name'),
                    "description":  i18n.i18nString('standard_desc'),
                    "path": "",
                    "type": "default",
                    "show": false
                },
                {
                    "id":"browsebotsamples",
                    "name":i18n.i18nString('start_store'),
                    "description":i18n.i18nString('start_desc'),
                    "path":"",
                    "type":"browsebotsamples",
                    "imgUrl":env_conf['context-url']+'/assets/home/icon-home.svg',
                    "show":true
                },
                {
                    "id": "importbot",
                    "name": i18n.i18nString('import_name'),
                    "description": i18n.i18nString('import_desc'),
                    "path": "",
                    "imgUrl": env_conf['context-url']+'/assets/home/icon-import.svg',
                    "type": "default",
                    "show": true
                },
                {
                    "id": "browsesmartbot",
                    "name":  i18n.i18nString('smart_name'),
                    "description":i18n.i18nString('smart_desc'),
                    "path": '',
                    "imgUrl": env_conf['context-url']+'/assets/home/icon-document.svg',
                    "type": "browsesmartbot",
                    "show": !selectedAccount.accountType
                },
                {
                    "id": "newbot",
                    "name":i18n.i18nString('new_bot_name'),
                    "description":i18n.i18nString('new_bot_desc'),
                    "path": "",
                    "imgUrl":env_conf['context-url']+'/assets/home/icons-robot.svg',
                    "type": "",
                    "show": true
                }
    
            ];
            $timeout(function (){
                $('[data-toggle="popover"]').popover(); 
            },100);
            $scope.modeObject = {};
            $scope.onModeSelected = function(botType){
                $scope.botType = botType;
                 $scope.initializeCreateBot = true;
                 $scope.fullModalCallback.openFullPageModal(null,botType,"standard_bot");
             };
             $scope.closeModeSelectorModal = function () {
                $scope.modeObject.selectedMode = "";
            };
            $scope.lanchStore = function(){
                mixPanel.postEvent('Launch Botstore');
                $scope.loadStore();
            };
            $scope.loadStore = function(){
                $scope.loadingStore = true;
                $scope.$emit('updateStoreIframeSrc');
                $timeout(function(){
                    $scope.iframeLoadingStore = false;
                },500);
            };
            $scope.closeBanner = function(){
                $scope.showBanner = false;
                $('.jumbotron').removeClass('bannerNopadding');
            };
		   $scope.modeObject.selectedMode = "";
            $scope.selectMode = function (selectedMode, contentType) {
                if (selectedMode === 'universalbot') {
                    var allStreams = $workflowService.streamsAll();
                    if (allStreams.length && allStreams.length > 1) {
                        var employeeBots = _.filter(allStreams, { 'purpose': 'employee' });
                        var customerBots = _.filter(allStreams, { 'purpose': 'customer' });
                        if (employeeBots.length < 2 && customerBots.length < 2) {
                            NotificationService.notify( i18n.i18nString('standard_notify'), "warning");
                            return;
                        }
                    } else {
                        NotificationService.notify( i18n.i18nString('standard_notify'), "warning");
                        return;
                    }
                }
    
                if (selectedMode === 'browsebotsamples') {
                    $scope.message = {
                    action: 'initialCallDetail',
                    userId: $applicationService.userInfo().userId,
                    loadBot:'reloadBotstore'
                    };
                    document.getElementById('storeFrame').contentWindow.postMessage($scope.message, '*');
                    //$scope.fullModalCallback.openFullPageModal(2, "createBot");
                    mixPanel.postEvent('Launch Botstore');
                    $scope.loadStore();
                }
                else if(selectedMode === 'browsesmartbot'){
                                $scope.fullModalCallback.openFullPageModal(5, "createBot");
                            } else {
                    $workflowService.streamType(selectedMode);
                    if (contentType && contentType.id === 'importbot') {
                        selectedMode = "importbot";
                    }
                    $scope.modeObject.selectedMode = selectedMode;
                    $scope.onModeSelected(selectedMode);
                    $scope.closeModeSelectorModal();
                }
    
            };
            $scope.closeModeSelectorModal = function () {
                $scope.modeObject.selectedMode = "";
            };
            $scope.switchView= function(botsType,viewType){
            $scope.botsView[botsType]=viewType;
            };
            $scope.allBotsCopy = $workflowService.cloneData($scope.allBots);
            $scope.applyFilter= function(type,noSortValue){
                if(!noSortValue){
                $scope.sortLoading = true;
                }
                localStorage.setItem('botSortValue',type);
            var getSortTypeValue = localStorage.getItem('sortType');
            if(getSortTypeValue == "BotName"){
                $scope.setSortValue = i18n.i18nString('botName');
            }else if(getSortTypeValue == "BotOwnerName"){
                $scope.setSortValue= i18n.i18nString('botOwnerName');
            }else if (getSortTypeValue == "createdDate") {
                $scope.setSortValue= i18n.i18nString('createdDate');
            }else if (getSortTypeValue == "ModifiedDate") {
            $scope.setSortValue=i18n.i18nString('modifiedDate');
            }
           var filteredBots = [];
           if(type == "myBots"){
            $scope.botsSortOrFilterObj = {
                filterBy: i18n.i18nString('myBots'),
                sortDate: $scope.setSortValue
            };
        }else if(type == "sharedBots"){
            $scope.botsSortOrFilterObj = {
                filterBy: i18n.i18nString('sharedBots'),
                sortDate: $scope.setSortValue
            };
        }else if(type == "allBots"){
            $scope.botsSortOrFilterObj = {
                filterBy: i18n.i18nString('allBots'),
                sortDate: $scope.setSortValue
            };
        }
           $timeout(function(){
            if(type == "myBots"){
                filteredBots= _.filter($scope.allBotsCopy,function(bot){
                    return !bot.isShared;
                });
            }else if(type == "sharedBots"){
                filteredBots= _.filter($scope.allBotsCopy,function(bot){
                    return bot.isShared;
                });
            }else if(type == "allBots"){
                 filteredBots= $scope.allBotsCopy;
            }
            $scope.sortLoading = false;
            if(filteredBots.length > 200){
                $scope.allBots = filteredBots;
            }else{
                $scope.allBots = filteredBots;
            }
        });
            };
            $scope.sortTaskList= function (sortType) {
                localStorage.setItem('sortType',sortType);
                var getsortType = localStorage.getItem('sortType');
                var getbotSortValue= localStorage.getItem('botSortValue');
                if(getbotSortValue == "myBots"){
                    $scope.botFilterValue = i18n.i18nString('myBots');
                }else if(getbotSortValue == "sharedBots"){
                    $scope.botFilterValue = i18n.i18nString('sharedBots');
                }else if(getbotSortValue == "allBots"){
                    $scope.botFilterValue =  i18n.i18nString('allBots');
                }
                if(getsortType){
                   sortType= getsortType;
                }
                if(sortType == "BotName"){
                    $scope.botsSortOrFilterObj = {
                        sortDate: i18n.i18nString('botName'),
                        filterBy: $scope.botFilterValue
                    };
                    if ($scope.orderType == 'name') {
                        $scope.orderType = '-name';
                    } else {
                        $scope.orderType = 'name';
                    }
                }
                else if(sortType == "BotOwnerName"){
                    $scope.botsSortOrFilterObj = {
                        sortDate: i18n.i18nString('botOwnerName'),
                        filterBy: $scope.botFilterValue
                    };
                    if($scope.orderType == 'createdBy.emailId'){
                        $scope.orderType = '-createdBy.emailId';
                    } else {
                        $scope.orderType = 'createdBy.emailId';
                    }
                }
                // else if(sortType == "TotalTasks"){
                //     $scope.botsSortOrFilterObj = {
                //         sortDate: i18n.i18nString('totalTasks')
                //     };
                //     if($scope.orderType == '-totalTaskCount'){
                //         $scope.orderType = 'totalTaskCount';
                //     } else {
                //         $scope.orderType = '-totalTaskCount';
                //     }
                // }
               else if (sortType == "createdDate") {
                    $scope.botsSortOrFilterObj = {
                        sortDate: i18n.i18nString('createdDate'),
                        filterBy: $scope.botFilterValue
                    };
                        $scope.orderType = '-createdOn';
                }
               else if (sortType == "ModifiedDate") {
                    $scope.botsSortOrFilterObj = {
                        sortDate: i18n.i18nString('modifiedDate'),
                        filterBy: $scope.botFilterValue
                    };
                        $scope.orderType = '-lastModifiedOn';
                }else if(sortType == "name"){
                    if ($scope.orderType == 'name') {
                        $scope.botsView.yourBotsSort = "-name";
                        $scope.orderType = '-name';
                    } else {
                        $scope.botsView.yourBotsSort = "name";
                        $scope.orderType = 'name';
                    }
                }
            };
            var getbotSortValue= localStorage.getItem('botSortValue');
            if(getbotSortValue == "undefined"){
              localStorage.setItem('botSortValue', "allBots");
                getbotSortValue = localStorage.getItem('botSortValue');
            }
            $scope.applyFilter(getbotSortValue,true);
            var getsortType = localStorage.getItem('sortType');
            if (getsortType == "undefined") {
                localStorage.setItem('sortType', "BotName");
                getsortType = localStorage.getItem('sortType');
            }
             $scope.sortTaskList(getsortType);
            $scope.selectOrChangeBot  = function(e,bot,state){
                var botstate = state || 'indevelopment';
                 $scope.callbacks.changeFilterval(botstate);
                $scope.doAction('bot',bot);
            };
            $scope.callbacks.selectOrChangeBot = function(bot,state){
                var botstate = state || 'indevelopment';
                 $scope.callbacks.changeFilterval(botstate);
                $scope.doAction('bot',bot);
            };
            $scope.callbacks.selectOrChangeBotLanguage = function(bot,language){
                //$scope.callbacks.changeFilterval('indevelopment'); /** commented this line since we need to restore state on language switch */
                $scope.doAction('bot',bot,language);
            };
            var _selectOrChangeBotDestroy=$rootScope.$on("selectOrChangeBot",$scope.selectOrChangeBot);
            var selectBotEvent = $rootScope.$on('createNewBot',function(e) {
                $scope.modeObject.selectedMode = "";
                $scope.onModeSelected();
            });
            $scope.$on('$destroy', function () {
                if(_selectOrChangeBotDestroy){
                    _selectOrChangeBotDestroy();
                }
                if(selectBotEvent){
                    selectBotEvent();
                }
            });
            function warnWrongBotTypeSelected(data, language,_currTopic) {
                var message = "<p><i class='fa fa-exclamation-circle fa-2x' aria-hidden='true' style='color: #009dac;'></i></p>"+ i18n.i18nString('product_tour')+"";
                window.bootbox.dialog({
                    message: message,
                    title: "",
                    className: "alert-modal",
                    buttons: {
                        main: {
                            label:  i18n.i18nString('cancel'),
                            className: "btn closeCancel",
                            callback: angular.noop
                        }, yes: {
                            label:  i18n.i18nString('yes'),
                            className: "btn-primary",
                            callback: function () {
                                inline_manual_player.deactivate(_currTopic);
                                viewBotDeatils(data, language);
                            }
                        }

                    },
                    onEscape: false,
                    closeButton: false
                });
            }
            var _botClickActivate = true;//flag to avoid blank page when double click on bot in bots listing
            $scope.doAction = function (category, data, language) {

                if (_botClickActivate) {
                    _botClickActivate = false;
                    $timeout(function () {
                        _botClickActivate = true;
                    }, 1000);
                    switch (category) {
                        case "bot":
                              if (data.type === 'universalbot') {
                                if (window.inline_manual_player) {
                                    var _currTopic = inline_manual_player.getCurrentTopic();
                                    if($scope.builderNavigator && $scope.builderNavigator.currentNavigationObj && ($scope.builderNavigator.currentNavigationObj.selectedMenuItem === 'botImportExport')) {
                                        _currTopic = null; //temporary fix 
                                    }
                                    if (_currTopic) {
                                        if (_currTopic === interactiveHelp.topicHelpMap.BOT_WALK_THROUGH) {
                                           warnWrongBotTypeSelected(data, language,_currTopic);
                                            return false;
                                        }
                                    }
                                }
                            }
                            viewBotDeatils(data, language);
                            break;
                    }
                }
            };

            $scope.clearSearch = function(){
                isBotSearchMode = false;
                $scope.searchedBots = [];
            };
            $scope.searchBots = function(){
                $timeout(function (){
                    $('[data-toggle="popover"]').popover(); 
                },100);
                if(!$scope.botModel.botSearchQuery){
                    $scope.clearSearch(); 
                    return;
                }
                
                if($scope.botModel.botSearchQuery.length >= 1){
                    isBotSearchMode = true;
                    $scope.searchedBots = _.filter($scope.allBots, function(bot){
                        return bot.name && bot.name.toLowerCase().indexOf($scope.botModel.botSearchQuery.toLowerCase()) !== -1;
                    });
                }
                
            };

            $scope.clearBotSearch = function() {
                $scope.botModel.botSearchQuery  = "";
                $scope.clearSearch();
            };

            $scope.isBotSearchMode = function(){
                return isBotSearchMode;
            };


            $scope.toggleBots = function() {
                $scope.seeAll=!$scope.seeAll;
                $(".botToggle").slideToggle();
            };
            
            $scope.getTrailWarningMsg=function(bot){
                if (botUtil.isExpired(bot)) {
                    if (bot.license.billingType === 'paid') {
                        return i18n.i18nString('billing_type_paid');                              
                    }else if (bot.license.billingType === 'free'){
                        return i18n.i18nString('billing_type_free', {planName: bot.license.planName});
                    }
                }
                var pU=botUtil.percentageSessionsUsed(bot);
                if (pU !== undefined) {
                    if (pU >= 100) {
                        if (bot.license.billingType === 'paid') {
                            return  i18n.i18nString('botConsumed',{dyn:pU});
                        } else {
                            return i18n.i18nString('billing_type_free', {planName: bot.license.planName});
                        }

                    } else {//from 80-100%
                        bot.aboutToExpire = true;
                        if (bot.license.billingType === 'paid') {
                            return i18n.i18nString('botUsageLimit',{dyn:pU});
                        } else {
                            return i18n.i18nString('bot_notworking');
                        }

                    }

                } else {
                    return "";
                }
            };
            $scope.isEcomEnabled = function () {
                return applicationControl.isBillingEnabled || false;
            };
            $scope.canShowEcomWarning = function (bot) {
                return applicationControl.isBillingEnabled && ($workflowService.selectedAccount().accountType === 1) && (botUtil.isExpired(bot) || botUtil.isTrialAboutToExpire(bot) || botUtil.isPaidAboutToExpire(bot));
            };
            
            $scope.getTasksCount = function(bot){
                var count = 0;
                var _taskCount = 0;
                var panelsCount = 0;
                var widgetsCount = 0;
                var formsCount  = 0;
                if(bot.type == "universalbot"){
                    bot.configuredBots = bot.configuredBots || [];
                    bot.awaitingApprovalBots = bot.awaitingApprovalBots || [];
                    bot.publishedBots = bot.publishedBots || [];
                    count = ([].concat(bot.configuredBots, bot.awaitingApprovalBots, bot.publishedBots) || []).length;
                    var botString = count > 1 ? i18n.i18nString('constants.bots'): i18n.i18nString('constants.label');
                    return count ? count+" "+botString : i18n.i18nString('no_bots');
                }
                if(bot.taskCounts && bot.taskCounts['smalltalks']){
                    var _smallTalkCounts = _.filter(bot.taskCounts.smalltalks,function(task){
                        return (task.state == 'configured') || (task.state == 'awaitingApproval') || (task.state == 'rejected');
                    });
                    if(_smallTalkCounts.length){
                        _smallTalkCounts.forEach(function(countItem){
                            _taskCount = formsCount + countItem.count;
                        });
                    }
                }
                if(bot.taskCounts && bot.taskCounts['forms']){
                    var _formsCount = _.filter(bot.taskCounts.forms,function(task){
                        return (task.state == 'configured') || (task.state == 'awaitingApproval') || (task.state == 'rejected');
                    });
                    if(_formsCount.length){
                        _formsCount.forEach(function(countItem){
                            formsCount = formsCount + countItem.count;
                        });
                    }
                }
                if(bot.taskCounts && bot.taskCounts['widgets']){
                    var _widgetsCount = _.filter(bot.taskCounts.widgets,function(task){
                        return (task.state == 'configured') || (task.state == 'awaitingApproval') || (task.state == 'rejected');
                    }); // can show only configured since they are always present once published //
                    if(_widgetsCount.length){
                        _widgetsCount.forEach(function(countItem){
                            widgetsCount = widgetsCount + countItem.count;
                        });
                    }
                }
                if(bot.taskCounts && bot.taskCounts['panels']){
                    var _panelsCount = _.filter(bot.taskCounts.panels,function(task){
                        return (task.state == 'configured') || (task.state == 'awaitingApproval') || (task.state == 'rejected');
                    }); // can show only configured since they are always present once published //
                    if(_panelsCount.length){
                        _panelsCount.forEach(function(countItem){
                            panelsCount = panelsCount + countItem.count;
                        });
                    }
                }
                var arr_actionsCount = _.pluck(bot.taskCounts.actions, "count");
                var arr_alertsCount = _.pluck(bot.taskCounts.alerts, "count");
                var arr_dialogsCount = _.pluck(bot.taskCounts.dialogs, "count");
                var arr_ktasksCount = _.pluck(bot.taskCounts.ktasks, "count");
                var arr_smallTalkCount = _taskCount;
                var arr_formsCount = formsCount;
                var arr_panelsCount = panelsCount;
                var arr_widgetsCount = widgetsCount;
                if(arr_ktasksCount && arr_ktasksCount.length && ( ((arr_ktasksCount[0]) >= 1) || ((arr_ktasksCount[0]) >= 1) ) ){ 
                    arr_ktasksCount = 1;
                } else if( typeof arr_ktasksCount === 'string' && arr_ktasksCount >= 1) {
                    arr_ktasksCount = 1;
                }
                if(arr_smallTalkCount >= 1){
                    arr_smallTalkCount = 1;
                }
                var arr_totalTasksCount = [].concat(arr_actionsCount, arr_alertsCount, arr_dialogsCount, arr_ktasksCount,arr_smallTalkCount,arr_panelsCount,arr_widgetsCount,arr_formsCount);
                count = _.reduce(arr_totalTasksCount, function(memo, num) { return memo + num;}, 0);

                var taskString = count > 1 ? i18n.i18nString('tasks') : i18n.i18nString('task');
                    bot.totalTaskCount = count;

                return count ? count+" "+taskString : i18n.i18nString('no_tasks_name');

            };

            function mapSupportedLanguages() {
                // var seedData = $workflowService.seedData();
                // return _.compact(_.map(seedData.supportedLanguages, function (lang) {
                //     if (_.indexOf($scope.callbacks.streamData.supportedLanguages, lang.value) !== -1) {
                //         return lang;
                //     }
                // }));
                 var availableLanguages = $workflowService.cloneData($workflowService.seedData().supportedLanguages);
                $scope.configuredLanguages = $workflowService.selectedStream().languageConfigurations;
                if($scope.configuredLanguages){
                    $scope.languages = _.filter(availableLanguages,function(lan){
                           if($scope.configuredLanguages[lan.value] && $scope.configuredLanguages[lan.value].hasOwnProperty('enabled'))
                               {
                                   lan.enabled = $scope.configuredLanguages[lan.value]['enabled'];
                                   return lan;
                                    
                             }
                         });
                    return $scope.languages;
                }
                
                
            }

            var resetAdvConfigs = function(){
                $workflowService.configurationList([]);
                $workflowService.savedConfigurationsList([]);
                $workflowService.registerSliders([]);
               
            };
           var viewBotDeatils = function (data,language) {
             var _botInfo = {
                streamId:data._id,
                BotName:data.name,
                BotLanguage:language || data.defaultLanguage,
             };
             mixPanel.postEvent('Open Bot',_botInfo);
                stream = $workflowService.selectedStream(data);
                if(language){
                    $workflowService.currentLanguage(language);
                }else{
                    $workflowService.currentLanguage(data.defaultLanguage);
                }
                resetAdvConfigs();
                 BTStreamsService.getBTStream(data._id).then(function (res) {
                     if($scope.allBots && $scope.allBots.length){
                        var selectedStreamIndex = _.findIndex($scope.allBots,{_id:res.data._id});
                        if(selectedStreamIndex >-1) {
                            stream = $scope.allBots[selectedStreamIndex];
                            $scope.allBots.splice(selectedStreamIndex,1);
                            $scope.allBots.unshift(stream);
                        }
                     }
                     var permissionStreamData = $workflowService.selectedStream(res.data);
                     navigator.prepareNavigationTree();
                     shortcutKeys.updateStreamData(res.data);
                     $scope.callbacks.streamData = permissionStreamData;
                     $scope.supportedLanguages = mapSupportedLanguages();
                    $workflowService.supportedLanguages($scope.supportedLanguages);
                    if(stream && stream.type === 'universalbot' && !language){
                        $workflowService.universalModalShowStatus(false);
                    }

                    $scope.callbacks.supportedLanguages = $scope.supportedLanguages;
                    var seedDataNLUSupportedLanguages = $workflowService.seedData().nluSupportedLanguages;
                    var multiLingualConfigurations = $workflowService.selectedStream().multiLingualConfigurations;
                    if(multiLingualConfigurations){
                    _.forEach($scope.callbacks.supportedLanguages,function(lang){
                        if(multiLingualConfigurations[lang.value] && multiLingualConfigurations[lang.value].nluLanguage){
                            _.forEach(seedDataNLUSupportedLanguages,function(eachNlu){
                                if(eachNlu.value === multiLingualConfigurations[lang.value].nluLanguage){
                                    lang.nluLanguage = eachNlu.name;
                                }
                            });
                        }
                    });
                }
                    $scope.callbacks.showView("botDetailsForm");
                            }, function (err) {
                                $scope.callbacks.showView("botDetailsForm");
                                if(err && err.data && err.data.errors && err.data.errors[0] && err.data.errors[0].msg) {
                                    NotificationService.notify(err.data.errors[0].msg, "error");
                                }
                            });
                
            };
            $scope.callbacks.loadStore = $scope.loadStore;
            $scope.loaded=function(){
                  $scope.$emit('homeDirectivesLoaded');
            };
            $scope.callbacks.viewBotDeatils = viewBotDeatils;
            $scope.fullModalCallback.triggerLoadStore = $scope.loadStore;
            
            // if($scope.resumingBuilder){
            //     $scope.callbacks.showView("botDetailsForm")
            // }

        }]);

})(angular);