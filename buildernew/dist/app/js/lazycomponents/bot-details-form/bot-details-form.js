(function (ng) {

    var _botsForm = ng.module("bt-forms");

    _botsForm.directive("botDetailsForm", function () {
        return {
            restrict: "EA",
            templateUrl: window.appConfig.TMPLT_PRE_PATH + "js/lazycomponents/bot-details-form/bot-details-form.html",
            controller: "botDetailsFormCtrl"
        };
    });

    _botsForm.controller("botDetailsFormCtrl", ["$scope", "env_conf", "$rootScope", "$interval", "$applicationService", "$workflowService", "BTSeedDataService", "BTStreamsService", "BTAlertsService", "BTActionsService", "BTFlowtaskService", "$q", "security", "flowsUtil", "$timeout", "TimerNotification", "builderUtility", "$modal", "$route", "BTIdpService",'NotificationService','BTParamMapService','jsValidator','uuid4','AppsDataService','botOntologyService','accessControlService','channelsConfig','uuid','navigator','shortcutKeys','interactiveHelp','botUtil','localstore','$element','i18n', 'mixPanel','$util',
        function ($scope, env_conf, $rootScope, $interval, $applicationService, $workflowService, BTSeedDataService, BTStreamsService, BTAlertsService, BTActionsService, BTFlowtaskService, $q, security, flowsUtil, $timeout, TimerNotification, builderUtility, $modal, $route, BTIdpService,NotificationService,BTParamMapService,jsValidator, uuid4,AppsDataService,botOntologyService,accessControlService,channelsConfig,uuid,navigator,shortcutKeys,interactiveHelp,botUtil,localstore,$element,i18n ,mixPanel,$util) {
            $scope.getAllAccessRights = function(accessId){//hight priority//
                if(accessId){
                    $scope.accessRights = accessControlService.getAccessRight(accessId);
                    // $scope.childAccessRights = accessControlService.getAccessRight('BOTBUILDER_NATURAL_LANGUAGE');
                }
                return $scope.accessRights;
            };
            $scope.searchDialogQuery = '';
            $scope.searchObj = {
                searchDialogQuery:'',
                searchFaqQuery:'',
                searchStoryQuery:''
            };
            $scope.upgradeDialogCb = {};
            $scope.selectedDialogForUpgrade = null;
            $scope.firstTimeLoad = true;
            $scope.callbacks.getAllAccessRights = $scope.getAllAccessRights;
            $scope.getAccessRight = function(feature){
                $scope.accessRight = accessControlService.getAccessRight(feature);
            };
            $scope.openGroup = function(group){
                $scope.fullModalCallback.openFullPageModal(1,'smallTalk');
                $scope.fullModalCallback.setGroup(group);
            };

            $scope.createNewGroup = function(group){
                $scope.fullModalCallback.openFullPageModal(1,'smallTalk');
                $scope.fullModalCallback.createGroup(group);
            };
            $scope.builderNavigator = navigator;
            $scope.uiFormCreateObj = {
                'name':'',
                'displayName':'',
                 'discription':'',
                'type':'regular'};
            $scope.allowPinning =  true;
            $scope.uiForms=[];
            $scope.currentFlowTask = {};
            $scope.showNavPopover = {};
            $scope.manage_var_cb = {};
            $scope.manage_var_alert_cb = {};
            $scope.manage_var_inf_cb = {};
            $scope.manage_var_action_cb = {};
            $scope.manage_var_small_talk_cb = {};
            $scope.manage_var_cb.flagName = 'dialog';
            $scope.manage_var_alert_cb.flagName = 'alert';
            $scope.manage_var_inf_cb.flagName = 'information';
            $scope.manage_var_action_cb.flagName = 'action';
            $scope.manage_var_small_talk_cb.flagName = 'smallTalk';
            $scope.manage_var_cb.addedNamespaces = [];
            $scope.savingLabel= i18n.i18nString('saving');
            $scope.save= i18n.i18nString('save');
            $scope.savingtask=i18n.i18nString('saving');
            $scope.clone=i18n.i18nString('clone');
            $scope.utterances_label = i18n.i18nString('utterences_label');
            $scope.utterance_label = i18n.i18nString('utterence_label');
            $scope.openImportSlider = false;
            $scope.emendEntitySliderOpen = false;
            $scope.manageVarEnable = false;
            $scope.manageVarAlertEnable = false;
            $scope.manageVarInfEnable = false;
            $scope.manageVarActionEnable = false;
            $scope.manageVarSmallTalkEnable = false;
            $scope.allowNamespace = $workflowService.selectedStream().enableNameSpace;
            $scope.nlp_details = i18n.i18nString('nl_details');
            $scope.fromSmart =  JSON.parse(window.localStorage.getItem("previousState")).smartassist;// $workflowService.kgDataFromKora().fromSmart;
            $scope.fromWorkbench = $workflowService.kgDataFromKora().fromWorkbench;
            var storyBoardSupported = ['default','sample'];
            $scope.createTestCaseConfig = {};
            $scope.conversationTestingCb = {};
            $scope.tokenName = "";
            $scope.recordExceedLimit = {
                botMsg: 0,
                userMsg: 0,
                totalTestSteps: 0
            };
//          HANDLED IN PREVIOUS SCREEN                
//            if (inline_manual_player) {
//                var _currTopic = inline_manual_player.getCurrentTopic();
//                if (_currTopic) {
//                    if (_currTopic === interactiveHelp.topicHelpMap.BOT_WALK_THROUGH && $scope.isUniversalBot()) {
//                        inline_manual_player.deactivate(_currTopic);
//                    }
//                }
//            }
            // $timeout(function () {
            //     if (!$rootScope.koreUserInfo.isBotsOnboarded) {
            //         //check for active inline manual flow ex.. create dialog,create alert and create kg             
            //         if (window.inline_manual_player && !inline_manual_player.getCurrentTopic()) {
            //             $rootScope.$emit('startTourGuide');
            //         }
            //     }
            // }, 400);
            var selectedAccount = $workflowService.selectedAccount();
            var applicationControl = $applicationService.userInfo().appControls;
            var result = _.find(applicationControl.associatedAccounts,{accountId:selectedAccount.accountId});
            var userId = $applicationService.userInfo().userId;
            var streamId = $workflowService.selectedStream()._id;
            $scope.obj.canCreateBot = result.canCreateBot;
            $scope.getAllAccessRights();
            var knowledgeExNames = [];
            var _selectedStream = $workflowService.selectedStream();
            if(_selectedStream['isSmalltalkMigrated'] === undefined){
               $scope.showNoMigrate  = false; 
           }
           $scope.savingdialogtask=false;
            $scope.botDetails={};
            var _loggerInstance = {};
            $scope.amendEntity = {}; 
            $scope.update = {};
            $scope.botSelectionView = false;
            $scope.linkView = {};
            $scope.ub1Callback = {};
            $scope.botDetails={};
            $scope.newFileId = "";
            var newAddExtDetails = {};
            $rootScope.currSelectedBot={};
            $scope.allTasksSortedData = {};
            $scope.deletedTaskList = [];
            $scope.pannels = [];
             $scope.amendEntityOptions = {
                        continueFromAmendedNode: i18n.i18nString('re-execute_dialog'),
                        continueFromCurrentNode: i18n.i18nString('re_execute_currdialog'),
                        
                    };
            //Header toggle related//
            if(!$workflowService.selectedStreamState()){
                $workflowService.selectedStreamState('indevelopment');
            }
            if($workflowService.builderResumeState){
                $scope.botDetails.builderState = $workflowService.builderResumeState();
            }
            $scope.urlOb = {
                extract: ""
            };
            $scope.kgView = {
                'type': 'tile'
            };
            $scope.listViewIcon = env_conf['context-url']+'/assets/icons/listViewIcon.svg';
            $scope.tileViewIcon = env_conf['context-url']+'/assets/icons/tileViewIcon.svg';   
            $scope.small = env_conf['context-url']+'/assets/smalltalk/small.svg'; 
            $scope.bulbicon= env_conf['context-url']+'/assets/images/24x29-bulbicon.png';     
            $scope.ellipsisDark = env_conf['context-url']+'/assets/icons/ellipsisDark.svg';
            $scope.searchIconGray = env_conf['context-url']+'/assets/icons/searchIconGray.svg'; 
            $scope.emptyState = env_conf['context-url'] + '/img/emptyImgNew.svg';  
            $scope.emptyStateSmallTalk = env_conf['context-url'] + '/assets/icons/empty-illustration.svg';
            $scope.betaIcon = env_conf['context-url'] + '/assets/icons/betaIcon.svg';
            $scope.betaIconWhite = env_conf['context-url'] + '/assets/icons/betaIcon-white.svg';
            $scope.faClose = env_conf['context-url']+'/assets/icons/fa-close.svg';
            $scope.chevronRight = env_conf['context-url']+'/assets/icons-new/chevron/chevron-right-gray.svg';
            $scope.plusIcon = env_conf['context-url']+'/assets/icons-new/add-plus/add-green.svg';
            $scope.unlinkIcon = env_conf['context-url']+'/assets/icons-new/unlink/unlink-1.png';
            $scope.ellipsisIcon = env_conf['context-url']+'/assets/icons-new/ellipsis/overflow-2.svg';
            $scope.infoGray = env_conf['context-url']+'/assets/icons-new/info/info-gray.svg';
            $scope.infoGraySmall = env_conf['context-url']+'/assets/icons/info-small.svg';
            $scope.assetsPath = env_conf['context-url'];
            $scope.license = {};
            $scope.notificationEnabled = false;
            $scope.trainShow = false;
            $scope.trainStatus = {'success': false,'failed': false,'saving': true};
            $scope.editTrain = {};
            $scope.botDetails.streamState = $workflowService.selectedStreamState();
            var streamTimer;
            $scope.updateStreamState = function(evn,streamState) {
            $scope.switchingState = true;
            $scope.botDetails.streamState = $workflowService.selectedStreamState();
            $scope.botDetails.streamState = streamState;

            if($scope.getPermissionMode){
                $scope.getPermissionMode();
            }
            $scope.migrationJourney = {
                showUpgrade: false
            };
            $scope.mapTasksBasedOnState();
            if($scope.reloadPanel){
                $scope.reloadPanel();
            } else {
                if(streamTimer){
                    streamTimer();
                }
                streamTimer = $timeout(function(){
                    $scope.switchingState = false;
                },100); 
            }
            };
            $scope.colapseAccordians =function(){
                $("#rightNavAccordian .collapse.in").collapse('hide');
            };
            $scope.rightNavAccordianEvents = function() {
                $("#rightNavAccordian .collapse").off('hide.bs.collapse').on('hide.bs.collapse', function(event){
                    $(event.currentTarget).parent().removeClass('active');
                });
                $("#rightNavAccordian .collapse").off('shown.bs.collapse').on('shown.bs.collapse', function(event){
                    // $("#rightNavAccordian .panel-default").removeClass('active');
                    if(!$(event.currentTarget).parent().hasClass('active')){
                        $(event.currentTarget).parent().addClass('active');
                     }
                });
            };
            $scope.callbacks.rightNavAccordianEvents = $scope.rightNavAccordianEvents;
            $scope.openOntologyModel = function (noClose) {


                function proceedToOpenOntology() {
                    openModalByClass(".ontology-form");
                    $scope.canShowontology = true;
                    if(_loggerInstance && !_loggerInstance.isRecording){
                       if ($('.kore-chat-window') && $('.kore-chat-window').length && !$('.kore-chat-window').hasClass('minimize')) {
                        $('.kore-chat-window .minimize-btn').trigger('click');
                    } 
                    }
                   // $scope.botDetailsCb.faqSearchQuery = 'what';//$workflowService.storeSearchQry().searchQry;
                   // $scope.botDetailsCb.getFaqsByKnowledge("", false);
                }

                if (!noClose) {
                    $scope.fullModalCallback.closeFullPageModal();
                    proceedToOpenOntology();
                } else {
                    $scope.lockTask($scope.knowledgeTasks[0], prepareTimer, "knowledgeTask")
                        .then(function (res) {
                            proceedToOpenOntology();
                        }, function (err) {

                        });
                }
            };
            $scope.onFlowDialogClosed = function (reload) {
                getFlowTasks($workflowService.selectedStream()._id); //get latest dialog after closing manage components for updates if any//
                $scope.activeEntityFlow = null;
                if (!isEleVisible("#termsConditions")) {
                    $("body").removeClass("modal-open");
                }
                builderUtility.rmBTModalOpenClass();
                closeModalByClass('.flowtask-create-form');
                $scope.fullModalCallback.closeFullPageModal();
                if (reload) {
                    loadAllTasks();
                    // openDialogTaskAccordion();
                }
            };
            $scope.fullModalCallback = $.extend(($scope.fullModalCallback || {}), { // safer method
				openOntologyModel: $scope.openOntologyModel,
				onFlowDialogClosed: $scope.onFlowDialogClosed
			});
             // Register and get a handle to the listener
            var btstreamUpdatelistener = $rootScope.$on('updateStreamState',$scope.updateStreamState);
            // Unregister
            

            $scope.dragDropIcon = window.appConfig.CONTEXT_PATH + '/assets/images/import.png';
            // To get Logger Instance
            var loggerInstance =  $scope.$on('loggerInstance',function(events,instance){
                _loggerInstance = instance;
                $scope.callbacks._loggerInstance = instance;
            });
            var accessRights;
            $scope.showFile = {
                'url':''
            };
            $scope.getAccessRights = function(componentId,innerMenuItem){
                accessRights = accessControlService.getAccessRight(componentId);
                if(innerMenuItem.id === 'intelligence' && $scope.stream.type === 'universalbot'){
                    delete innerMenuItem._dependencyid;
                }
                if(innerMenuItem.id=='botSummary'){
                    return "FULL";
                }
                if (innerMenuItem._dependencyid && innerMenuItem._dependencyid.length && accessRights == 'NO') {
                        for (var i in innerMenuItem._dependencyid) {
                            if(accessControlService.getAccessRight(innerMenuItem._dependencyid[i]) === 'NO') {
                                continue;
                            }else{
                                accessRights =  accessControlService.getAccessRight(innerMenuItem._dependencyid[i]);
                            }
                        }
    
                    }
                return accessRights;
            };

            //END--Header toggle related //
            
            var _userInfo = $applicationService.userInfo();
            var flowtaskId = null;
            $scope.importModal={};
            $scope.stream = $workflowService.selectedStream(); 
            
            //$workflowService.selectedAccount().accountType = 1 it is  online / paid
            if (applicationControl.isBillingEnabled && $workflowService.selectedAccount().accountType === 1) {
                var _percentageUsed;
                if (botUtil.isExpired($scope.stream)) {
                    if ($scope.stream.license.billingType === 'paid') {
                        $scope.showEcomWarn = true;
                        $scope.trailLimitMsg = i18n.i18nString('billing_type_paid');
                    } else if ($scope.stream.license.billingType === 'free') {
                        $scope.showEcomWarn = true;
                        $scope.trailLimitMsg = i18n.i18nString('billing_type_free', {planName: $scope.stream.license.planName});
                    }

                } else if (botUtil.isTrialAboutToExpire($scope.stream)) {
                    $scope.showEcomWarn = true;
                    _percentageUsed = botUtil.percentageSessionsUsed($scope.stream);
                    $scope.trailPercentageUsed = Math.round(_percentageUsed * 100) / 100;
                    $scope.trailLimitMsg = i18n.i18nString('upgrade_details',{trailPercentageUsed:$scope.trailPercentageUsed});                
                }else if (botUtil.isPaidAboutToExpire($scope.stream)) {
                    $scope.showEcomWarn = true;
                    _percentageUsed = botUtil.percentageSessionsUsed($scope.stream);
                    $scope.trailPercentageUsed = Math.round(_percentageUsed * 100) / 100;
                    if (_percentageUsed >= 100) {
                        $scope.trailLimitMsg = i18n.i18nString('consumed_percent',{trailPercentageUsed:$scope.trailPercentageUsed});
                    } else {
                        //80-100
                        $scope.trailLimitMsg = i18n.i18nString('consumed_limit',{trailPercentageUsed:$scope.trailPercentageUsed});
                    }
                }
            }
            
            $scope.hideTrailWarn = function () {
                $scope.showEcomWarn = false;
            };
            
            
            
            var hideList = [];
                    if($workflowService.kgDataFromKora().fromWorkbench || $scope.fromWorkbench){
                        $scope.stream.permissions['BOTBUILDER_PUBLISH_BOT'] = ['NO']; // publish
                        $scope.stream.permissions['BOTBUILDER_DASHBOARD'] = ['NO']; // dashboards
                        $scope.stream.permissions['BOTBUILDER_CUSTOM_DASHBOARDS'] = ['NO']; // dashboards
                        $scope.stream.permissions['BOTBUILDER_CHANNELS'] = ['NO']; // channels
                        $scope.stream.permissions['BOTBUILDER_APPS_AND_SCOPES'] = ['NO'];
                        $scope.stream.permissions['BOTBUILDER_BOT_IMPORT'] = ['NO']; //bot management
                        $scope.stream.permissions['BOTBUILDER_BATCH_TESTING'] = ['NO']; // testing
                        $scope.stream.permissions['BOTBUILDER_BOT_DEVELOPERS'] = ['NO']; 
                        $scope.stream.permissions['BOTBUILDER_EXTENSIONS'] = ['NO']; 
                        $scope.stream.permissions['BOTBUILDER_BOT_SETTINGS'] = ['NO']; 
                        $scope.stream.permissions['BOTBUILDER_BOT_DEVELOPERS'] = ['NO']; 
                    }
                  if($scope.stream && $scope.stream.permissions){
                    accessControlService.setPermissions($scope.stream.permissions);
                  }else if($scope.callbacks && $scope.callbacks.streamData && $scope.callbacks.streamData.permissions){
                    accessControlService.setPermissions($scope.callbacks.streamData.permissions);
                  }
                  var _permisions=accessControlService.getPermissions();  
                    angular.forEach(_permisions,function(component,index){
                    $('body').removeClass(component._id);    
                    if(component.NO){
                     hideList.push(component._id);
                   }
                });
                $scope.hidePermissionList = hideList;
                
                $('body').addClass(hideList);
            $rootScope.currSelectedBot = $workflowService.selectedStream();
            $scope.callbacks.botSelected($rootScope.currSelectedBot);
            $workflowService.streamType($scope.stream.type || 'taskbot');
            $scope.assetsBase = env_conf['assets-url'];
            $scope.tmpltPrePath=$scope.$root.tmpltPrePath;
            $scope.menuIconPath = $scope.assetsBase+"images/left-menu-img/";
            $scope.chatIcon = $scope.assetsBase+"images/left-menu-img/chatIcon.svg";
            $scope.homeIcon = $scope.assetsBase+"images/left-menu-img/home-gray.svg";
            var downloadFilesList = [
                $scope.assetsBase + "files/KGExtractSample_1.pdf",
                $scope.assetsBase + "files/KGExtractSample_2.pdf",
                $scope.assetsBase + "files/KGExtractSample_3.pdf"
            ];
            $scope.bulbIcon = window.appConfig.CONTEXT_PATH+'/assets/images/24x29-bulbicon.png';
            $scope.closeArrow = env_conf['context-url']+'/assets/landingImages/closeCross.png';
            $scope.backArrowGray = env_conf['context-url']+'/assets/icons/back-arrow-white.svg';
            $scope.importDoneIcon = window.appConfig.CONTEXT_PATH + '/assets/images/import-success.png';
            $scope.extractionLink = window.appConfig.CONTEXT_PATH + '/assets/icons/kcExtractionIcon.svg';
            $scope.closeCross = window.appConfig.CONTEXT_PATH + '/assets/icons/closeCross.png';
            $scope.importFailed = window.appConfig.CONTEXT_PATH + '/assets/images/wentwrong.png';
            $scope.trashIcon = window.appConfig.CONTEXT_PATH + '/assets/icons/trashIcon.svg';
            $scope.failedWarning = window.appConfig.CONTEXT_PATH + '/assets/icons/failedWarning.svg';
            $scope.listViewIconGreen = env_conf['context-url']+'/assets/icons/listViewIconGreen.svg';
            $scope.tileViewIconGreen = env_conf['context-url']+'/assets/icons/tileViewIconGreen.svg';  
            $scope.export = env_conf['context-url']+'/assets/kg/export.svg'; 
            $scope.file = env_conf['context-url']+'/assets/kg/file.svg'; 
            $scope.import = env_conf['context-url']+'/assets/kg/import.svg'; 
            $scope.url = env_conf['context-url']+'/assets/kg/url.svg'; 
            $scope.iconContextPath = env_conf['context-url'] + '/img';
            $scope.greenGear = env_conf['context-url']+'/assets/icons-new/gear/gear-green.svg'; 
            $scope.emptyStateIcon = env_conf['context-url'] + '/assets/empty-state-images/k-folder.png';
            $scope.emptyStateIcon_dialog_empty = env_conf['context-url'] + '/assets/empty-state-images/empty-dialog-task.png';
            $scope.extractQnaCount = '';
            $scope.deletedSmallTalkNodes = [];
            // $scope.settingsDropdownIcon = $scope.assetsBase+"icons/gear.svg";
            // $scope.lock = $scope.assetsBase+"icons/lock.svg";
            // $scope.lockHover = $scope.assetsBase+"icons/lockHover.svg";
            $scope.enableProceed = true;
            $scope.aceEditorCallback = {};
            $scope.flowtaskDialogSettingsCB = {};
            $scope.flowtaskDialogSettingsCB.show = false;
            $scope.autotrainData = {};
            $scope.autotrainData.enableAutoUtteranceAddition = false;
            $scope.totalProgress = 0;
            $scope.extracting = {
                'urlFile': true
            };
           // $scope.openAnalysisReport = false;
            var scriptNodeEditorModal = false;
            $scope.authorizationCallback = {};
            $scope.sortedDailogData = {
                published: [],
                indevelopment: []
            };
            $scope.sortedAlertsData = {
                published: [],
                indevelopment: []
            };
            $scope.sortedActionData = {
                published: [],
                indevelopment: []
            };
            $scope.sortedKGData = {
                published: [],
                indevelopment: []
            };
            $scope.sortedInformationData = {
                published: [],
                indevelopment: []
            };
            $scope.sortedUiFormsData = {
                published: [],
                indevelopment: []
            };
            $scope.error = {
                'msg': ''
            };
            $scope.sdkCallback = { isFromSettings: true };
            $scope.changeLogCallback = {};
            $scope.userShareCallback = {};
            $scope.userImportCallback = {};
            $scope.variableMngtCallback = {};
            $scope.asIVRCallback = {};
            $scope.asCallback = {};
            $scope.gsCallback = {};
            $scope.msCallback= {};
            $scope.bssCallback = {};
            $scope.lmmCallback = {};
            $scope.defaultDailogdata=[];
            $scope.isHelpLinkClicked = false;
            $scope.openLInkedTaskSliderCB = {'open':false};
            $scope.bot = {};
            $scope.importStep = 1;
            $scope.bot.importType = "fullImport";
            $scope.openManageInterruptions = {};
            $scope.openType = "";
            $scope.knowledgeExtractCallback = {};
            $scope.kgExtNewCallback = {};
            $scope.smallTalkCb = {};
            $scope.kgExtractId = "";
            $scope.botDetailsCb = {};
            $scope.botVersionCb = {};
            $scope.knowledgeExtractList = [];
            $scope.emptyBlock = [];
            $scope.orderType='-lMod';
            $scope.defaultSortingLast = true;
            $scope.defaultSortingName = false;
            $scope.defaultSortingStatus = false;
            $scope.extract = {
                'name': ''
            };
            $scope.group = {};
            $scope.pdfTypeParams = {
                fileId: '',
                type: '',
                listData: '',
                kgExtNewCallback: ''
            };
            //$scope.hidePermissionCopy = $scope.callbacks.hidePermissionList;
            $scope.changeBotLanguage = function (language, reload,checkForDisabled) {
                if(!language.enabled && checkForDisabled && $workflowService.selectedStreamState() === 'indevelopment' ){
                    $scope.currentLanguage = language.value;
                    $workflowService.currentLanguage(language.value);
                    $scope.callbacks.currentLanguage = $scope.currentLanguage;
                    //arabic language
                    if($scope.currentLanguage === 'ar'){
                        $('body').attr("direction",'rtl');
                    }else{
                        $('body').attr("direction",'ltr');
                    }
                    $element.find('#notifyLang').addClass('show').removeClass('fade');
                    return;
                }
                $rootScope.$emit('botTestEnd');
                $scope.currentLanguage = language.value?language.value:language;
                $workflowService.currentLanguage($scope.currentLanguage);
                $scope.callbacks.currentLanguage = $scope.currentLanguage;
                //arabic language
                if($scope.currentLanguage === 'ar'){
                    $('body').attr("direction",'rtl');
                }else{
                    $('body').attr("direction",'ltr');
                }
                if (reload) {
                    if( $scope.callbacks && $scope.callbacks.selectOrChangeBotLanguage){
                        $scope.callbacks.selectOrChangeBotLanguage($workflowService.selectedStream(),$scope.currentLanguage);
                    }else{
                        $scope.selectBot($workflowService.selectedStream(),$scope.currentLanguage);
                    }
                   
                }
            };
             var _selectedLanguage = $workflowService.currentLanguage() || $scope.stream.defaultLanguage;
            $scope.customKg = {
                'state': 'configured'
            };
            $scope.changeBotLanguage(_selectedLanguage);
            $scope.showContent = true;
            var _tasksCollection = null;

            $scope.variableMngtCallback = {};
            $scope.modeSelectorCallback = {};
            //fetchLinkedBots();

            $scope.closeLangModal = function(){
                $element.find('#notifyLang').addClass('fade').removeClass('show');
                $scope.changeBotLanguage($scope.currentLanguage,true);
            };

            $scope.moveForward = function(stepNo) {
                $scope.importStep = stepNo;
                if (stepNo == 1) {
                    $scope.removeFile();
                }
            };
            $scope.goToStep = function(stepNo) {
                //$scope.error.mess = "";
                if (stepNo == 1) {
                    $scope.moveForward(stepNo);
                    //$scope.isSelectedProceed = false;
                }
            };

            $scope.redirectSmart = function() {
                if(window.location.hostname.indexOf('uat') === 0) {
                    window.open($rootScope.resolveHostUrl() + "smartassist/config/usecases", '_self');
                }
                else {
                    window.open($rootScope.resolveHostUrl() + "smartassist/usecases", '_self');
                }
            };

            $scope.moveForwardStatus = function(status){
                if(status === 'initial'){
                  $scope.importing = 'initial';
                  $scope.removeSmallTalkFile();
                }
            };

            $scope.goToStepStatus = function(status){
                 $scope.importing = status;
                 $scope.moveForwardStatus(status);
            };

            $scope.initDragDropFile = function () {
                (function(window) {
                    $scope.importStep = 1;
                    function triggerCallback(e, callback) {
                        if (!callback || typeof callback !== 'function') {
                            return;
                        }
                        var files;
                        if (e.dataTransfer) {
                            files = e.dataTransfer.files;
                        } else if (e.target) {
                            files = e.target.files;
                        }
                        callback.call(null, files);
                    }

                    function makeDroppable(ele, callback) {
                        if (ele.find('[type="file"]').length > 0) {
                            return;
                        }
                        var input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('multiple', true);
                        input.style.display = 'none';
                        input.id = "fileInputID";
                        input.addEventListener('change', function(e) {
                            triggerCallback(e, callback);
                        });
                        ele = ele[0];
                        ele.appendChild(input);
                        ele.addEventListener('dragover', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            ele.classList.add('dragover');
                        });

                        ele.addEventListener('dragleave', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            ele.classList.remove('dragover');
                        });

                        ele.addEventListener('drop', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            ele.classList.remove('dragover');
                            triggerCallback(e, callback);
                        });

                        $('#kGTemplateExtractBrowse').on('click', function() {
                            input.value = null;
                            input.click();
                        });
                    }
                    window.makeDroppable = makeDroppable;
                })(window);
                (function(window) {
                    window.makeDroppable($('.fileDropContainerKG'), function(files) {
                 //       console.log(files);
                        $scope.uploadJSONFile(files[0]);
                    });
                })(window);
            };



            $scope.modeSelectorCallback.onModeSelected = function (selectedMode) {
                $scope.openBotChooser(selectedMode);
            };
            function getTextEncoded(name) {
                if(name){
                   return name.replace(/</g, '&lt;').replace(/>/g, '&gt;'); 
                }else{
                   return '';
                }
            }
            $scope.openModeSelector = function () {
                if ($scope.isEligibleForPublishing() && $scope._constants_.config.ENABLE_UNIVERSAL_BOT) {
                    console.log("onmodeselcore");
                } else {
                    $scope.openBotChooser("taskbot");
                }
            };
            $scope.sortTaskList = function (sortType) {
                if (sortType == "nameSort") {
                    $scope.defaultSortingLast = false;
                    $scope.defaultSortingStatus = false;
                    $scope.defaultSortingDesc = false;
                    if (!$scope.orderType || !$scope.defaultSortingName) {
                        $scope.orderType = 'name';
                        $scope.defaultSortingName = true;
                    } else if ($scope.orderType == 'name') {
                        $scope.orderType = '-name';
                        $scope.defaultSortingName = true;
                    } else if ($scope.orderType == '-name') {
                        $scope.orderType = null;
                        $scope.defaultSortingName = false;
                    }
                }
                if (sortType == "descSort") {
                    $scope.defaultSortingName = false;
                    $scope.defaultSortingLast = false;
                    $scope.defaultSortingStatus = false;
                    if (!$scope.orderType || !$scope.defaultSortingDesc) {
                        $scope.orderType = 'shortDesc';
                        $scope.defaultSortingDesc = true;
                    } else
                        if ($scope.orderType == 'shortDesc') {
                            $scope.orderType = '-shortDesc';
                            $scope.defaultSortingDesc = true;
                        } else if ($scope.orderType == '-shortDesc') {
                            $scope.orderType = null;
                            $scope.defaultSortingDesc = false;
                        }
                }
                if (sortType == "statusSort") {
                    $scope.defaultSortingName = false;
                    $scope.defaultSortingDesc = false;
                    $scope.defaultSortingLast = false;

                    if (!$scope.orderType || !$scope.defaultSortingStatus) {
                        $scope.orderType = 'state';
                        $scope.defaultSortingStatus = true;
                    } else
                        if ($scope.orderType == 'state') {
                            $scope.orderType = '-state';
                            $scope.defaultSortingStatus = true;
                        } else if ($scope.orderType == '-state') {
                            $scope.orderType = null;
                            $scope.defaultSortingStatus = false;
                        }
                }
                if (sortType == "datesSort") {
                    $scope.defaultSortingName = false;
                    $scope.defaultSortingDesc = false;

                    $scope.defaultSortingStatus = false;
                    if (!$scope.orderType || !$scope.defaultSortingLast) {
                        $scope.orderType = 'lMod';
                        $scope.defaultSortingLast = true;
                    } else if ($scope.orderType == 'lMod') {
                        $scope.orderType = '-lMod';
                        $scope.defaultSortingLast = true;
                    } else if ($scope.orderType == '-lMod') {
                        $scope.orderType = null;
                        $scope.defaultSortingLast = false;
                    }
                }
            };
            $scope.openBotChooser = function (botType) {
                $scope.bottype = botType;
                //  $scope.bottype = 'taskbot';
                $scope.initializeCreateBot = true;
                openModalByClass('.stream-create-form');
            };

            $scope.delExtraction = function(kEdata, e) {
              e.stopPropagation();
              NotificationService.confirm({
                heading: i18n.i18nString('delete_extractions'),
                headerClass: 'confirmationHeader',
                msg       : i18n.i18nString('confirm_delete',{kEdata:kEdata.name}),
                successCb : function() {
                  BTStreamsService.kgKeDelete(kEdata.streamId, kEdata._id)
                    .then(function(res){
                        BTStreamsService.kgHistory($workflowService.selectedStream()._id)
                            .then(function(res) {
                              $scope.knowledgeExtractList = $workflowService.cloneData(res.data.metaqnas);
                              if($scope.knowledgeExtractList.length === 0) {
                                $scope.extracting.urlFile = true;
                                $scope.showFile.url = "";
                              }
                              var numbOfEmptBlcks = (5 -$scope.knowledgeExtractList.length % 5) % 5;
                              $scope.emptyBlock = [];
                              if(numbOfEmptBlcks !== 0) {
                                for(var i=0; i < numbOfEmptBlcks; i++) {
                                    $scope.emptyBlock[i] = {};
                                }
                              }
                              if(res.data.metaqnas && res.data.metaqnas.length !== 0) {
                                  knowledgeExNames = [];
                                  for(var j=0; j < res.data.metaqnas.length; j++) {
                                    knowledgeExNames[j] = res.data.metaqnas[j].name;
                                  }
                              }
                              else if(res.data.metaqnas.length === 0){
                                knowledgeExNames = [];
                              }
                            }, function(err) {

                            });
                        $scope.showFile.url = ""; 
                        $scope.extracting.urlFile = true;
                        NotificationService.notify( i18n.i18nString('success_deleted'), 'success');
                    }, function(err){

                    });
                },
                failCb    : function() {
                  //NotificationService.notify("Knowledge Extraction not deleted", 'success');
                },
                isModal   : true,
                btnTexts  : {
                  success : i18n.i18nString('ok'),
                  fail    : i18n.i18nString('cancel')
                }
              });        
            };

            $scope.onCancelBotCreation = function () {
                $scope.initializeCreateBot = false;
                closeModalByClass('.stream-create-form');
            };
            $scope.closeExtracts = function() {
                $scope.showFile.url="";
                $scope.importStep = 1;
            };
            $scope.knowledgeExtractCallback.closeExtractSlider = function() {
                $scope.openType = "";
                $timeout(function() {
                    $scope.modalSlider.close("#knowledge-extract-slider");
                }, 500);
            };
            $scope.closeAmendSlider = function(){
                $scope.modalSlider.close("#amendEntityDialog");
            };
            $scope.knowledgeExtractCallback.setKgExtractId = function(id) {
                $scope.kgExtractId = id;
            };

            $scope.kgExtractReview = function() {
                $scope.importStep = 1;
                $scope.fileName = '';
            };

            $scope.kgExtractUrlReview = function() {
                $scope.totalProgress = 0;
                $scope.importStep = 1;
                $scope.isSelectedProceed = false;
            };

            $scope.kgExtractRev = function() {
                $scope.openKgExtractTwo(newAddExtDetails);
            };

            $scope.stream.isPublishedBot = false;

            var updateBotDataEvent =  $scope.$on("updateBotData", function(evt, options){
                updateBotData(options);
            });
          
            $scope.removeFile = function() {
                $scope.fileName = "";
                $scope.urlOb.extract = "";
                $scope.extract.name = "";
            };
            $scope.switchView= function(viewType){
                $scope.kgView.type=viewType;
                $timeout(function(){
                    attachPopover();
                }, 100);
            };
            function updateBotData(options) {
                switch (options.updateKey) {
                    case "bot":
                        $scope.stream = options.value;
                        $rootScope.currSelectedBot = options.value;
                        $rootScope.currSelectedBot = $workflowService.cloneData(options.value);
                        $scope.callbacks.botSelected($rootScope.currSelectedBot);
                        $scope.changeBotLanguage($scope.stream.defaultLanguage);
                        $workflowService.selectedStreamState('indevelopment');
                        break;
                    default:
                        $scope.stream[options.updateKey] = options.value;
                }

                // $scope.stream = _.merge($workflowService.selectedStream(), $scope.stream);
                $workflowService.selectedStream($scope.stream);
                $scope.callbacks.showSolutionBotSetup = isSolutionBot();
                $scope.showSolutionBotSetup = isSolutionBot();
                 
            }


            function TasksCollection() {

                this.dialogTasks = [];
                this.alertTasks = [];
                this.actionTasks = [];
                this.informationTasks = [];
                this.knowledgeTasks = [];
                this.mappingTasks = [];
                this.allTasks = [];

            }


            TasksCollection.prototype.setTasks = function (taskType, data) {

                var _tasks = [];
                switch (taskType) {
                    case 'allTasks':
                        this[taskType] = [].concat(this.dialogTasks, this.alertTasks, this.actionTasks, this.informationTasks);
                        break;
                    case 'actions':
                        _tasks = mapChildTaskToParentTask(data);
                        break;
                    default:
                        _tasks = mapChildTaskToParentTask(data);
                        this[taskType] = _tasks;
                        $scope[taskType] = _tasks;

                }

            };

            TasksCollection.prototype.getTasks = function (taskType) {
                return this[taskType];
            };

            
            $scope.languageDropdow =function(e){
                e.stopPropagation();
            };

            $scope.isUniversalBot = function () {
                return $scope.stream.type === 'universalbot';
            };
            
            $scope.setCallbacks = function () {
                $scope.callbacks.saveBtnCallbacks = {
                    'generalSettings':$scope.gsCallback,
                    'manageSessions':$scope.msCallback,
                    'botStoreSettings':$scope.bssCallback,
                    'ivrSettings':$scope.asIVRCallback,
                    'advancedSettings':$scope.asCallback,
                    // 'languageManagement':$scope.lmmCallback,
                };
                var linkedbotsIndex = $scope.rightPannelMenu.menuItems['linkedBots'];
                if(linkedbotsIndex>-1){
                   $scope.rightPannelMenu[linkedbotsIndex].hide=!$scope.isUniversalBot();
                }
            };

            $scope.canShowMenuItem = function(menuType,truthy){
                if(menuType=='dashboard'){
                    return true;
                }
                if($scope.stream.type==='taskbot'){
                    $scope.stream.type='default';
                }
                if(menuType=='storyboard'&& (storyBoardSupported.indexOf($scope.stream.type) == -1)){
                    return false;
                }
               // var list_notInUniversalBot = ["dashboard", "botTasks"];
               if(truthy){
                return false;
               }
               //else{
                // var list_notInUniversalBot = ["botTasks"];  // merged linked bots menu into bot tasks sub menu along with small talk //
                // if($scope.isUniversalBot() && $.inArray(menuType,list_notInUniversalBot) !== -1){
                //     return false;
                // }else 
                // if(!$scope.isUniversalBot() && menuType == 'linkedBots'){
                //     return false;
                //}

                if(($scope.showSolutionBotSetup && $workflowService.selectedStream().sbStreamId) && (menuType == "publish")){
                    return false;
                }
            };

            $scope.callbacks.setSaveCallbacks = $scope.setCallbacks;
            $scope.sideBar = {};

            $scope.rightPannelMenu = navigator.rightPannelMenu;
            function scrollToEle(element){
                var _PanelEle = $(element);
                    if (_PanelEle) {
                        var _container = _PanelEle.closest('.ps-container');
                        if (_container && _container.offset()) {
                            var _scrollHeight = _PanelEle.offset().top - _container.offset().top + _container.scrollTop();
                            _container.animate({
                                scrollTop: _scrollHeight
                            }, 'slow');
                        }
                    }
            }
            $scope.availableActions = {
                inProgress: {
                    view: true,
                    edit: true,
                    editbasic: false,
                    clone: false,
                    upgrade: false,
                    map: false,
                    versions: false,
                    delete: true
                },
                configured: {
                    view: true,
                    edit: true,
                    editbasic: false,
                    clone: true,
                    upgrade: false,
                    map: false,
                    versions: false,
                    delete: true,
                    logs: true
                },
                upgradeInProgress: {
                    view: true,
                    edit: true,
                    editbasic: false,
                    clone: false,
                    upgrade: false,
                    map: false,
                    versions: false,
                    delete: true
                },
                published: {
                    view: true,
                    edit: false,
                    editbasic: true,
                    clone: true,
                    upgrade: true,
                    map: true,
                    versions: true,
                    delete: false,
                    command: true,
                    logs: true,
                    unpublish: true
                },
                awaitingApproval: {
                    view: true,
                    edit: true,
                    editbasic: false,
                    clone: true,
                    upgrade: false,
                    map: false,
                    versions: false,
                    delete: true,
                    recall: true
                },
                rejected: {
                    view: true,
                    edit: true,
                    editbasic: false,
                    clone: true,
                    upgrade: false,
                    map: false,
                    versions: false,
                    delete: true
                },
                suspended: {
                    view: true,
                    edit: false,
                    editbasic: true,
                    clone: true,
                    upgrade: true,
                    map: false,
                    versions: true
                }
            };


            $scope.isSelectedLanguageApproved = function (task) {
                if ($.inArray($workflowService.currentLanguage(), (task.approvedLanguages || [])) !== -1) {
                    if(task.approvedLanguages && task.approvedLanguages.length!== $scope.stream.supportedLanguages.length && task.state!=='published'){
                        return false;
                    }
                    return true;
                }

                return false;
            };

            function getDialogTaskName(dialogtasks , refId) {
                var _selectedTask = dialogtasks.filter(function (task) {
                    return task.refId === refId;
                });
                if (_selectedTask[0]) {
                    return _selectedTask[0].name;
                }
                return "";
            }
            $scope.deleteStoryScene =  function(scene){
                var deletScene =  function(){
                    BTStreamsService.deleteScene($workflowService.selectedStream()._id,scene._id)
                    .then(function(res) {
                        var sceneIndex =  _.findIndex($scope.scenes,{_id:scene._id});
                        $scope.scenes.splice(sceneIndex,1);
                        NotificationService.alertNotify(i18n.i18nString('deleted'), i18n.i18nString('scene_delete'), "success");
                    },function(err){
                        NotificationService.alertNotify(i18n.i18nString('delete_failure'), err.data.errors[0].msg, "error");
                 });
                };
                NotificationService.alert(i18n.i18nString('delete_confirm') + i18n.i18nString('mock_scene'), deletScene, arguments,'',undefined,i18n.i18nString('confirm'));
            };
            $scope.deleteWorkflow = function (entity, type) {
                if(type === 'flowtask' && entity.followUpIntents && entity.followUpIntents.length) {
                    var allDialogTasksWithChildren =$workflowService.cloneData($scope.dialogTasks);
                    allDialogTasksWithChildren.forEach(function (task) {
                        if (task.state.toLowerCase() !== 'suspended' || task.state.toLowerCase() !== 'rejected') {
                            if (task.child) {
                                allDialogTasksWithChildren = allDialogTasksWithChildren.concat(task.child);
                            } else {
                                allDialogTasksWithChildren.push(task);
                            }
                        }
                    });
                    // fetching names for linked task ID's
                    var linkedTasks = '';
                    entity.followUpIntents.forEach(function(linked_task,index){
                        if(index > 0) {
                            linkedTasks += ', ';
                        }
                        linkedTasks += getDialogTaskName(allDialogTasksWithChildren,linked_task.refId);
                    });
                    linkedTasks+= entity.followUpIntents.length>1 ? i18n.i18nString('tasks_label') : i18n.i18nString('task_label') ;
                    NotificationService.alertNotify(i18n.i18nString('deletion_failed'),i18n.i18nString('task_delete_failure',{dyn:linkedTasks}), "error");
                }
                else {
                    var entityType = (type === 'action') ? (entity.isReport ? $scope._constants_.report : $scope._constants_.action) : (type === 'flowtask') ? i18n.i18nString('dialog_task') : i18n.i18nString('alert');
                    entityType = (type === "knowledgeTask") ? $scope._constants_.knowledge : entityType;
                    entityType = (type === "uiForm") ? i18n.i18nString('uiForm'):entityType;
                    prepareEventTasks();
                    if((type === 'flowtask') && entity && $scope.eventLinkedTasks[entity.refId]) {
                        NotificationService.alert(i18n.i18nString('task_associated_event'), deleteWorkflow, arguments,'',undefined,i18n.i18nString('confirm'));
                     } else{
                        NotificationService.alert(i18n.i18nString('delete_confirm') + entityType, deleteWorkflow, arguments,'',undefined,i18n.i18nString('confirm'));
                     }
                   
                }
            };

            $scope.kgHistApi = function(){
                BTStreamsService.kgHistory($workflowService.selectedStream()._id)
                .then(function(res) {
                  $scope.knowledgeExtractList = $workflowService.cloneData(res.data.metaqnas);
                  var numbOfEmptBlcks = (5 -$scope.knowledgeExtractList.length % 5) % 5;
                  $scope.showFile.url = '';
                  $scope.emptyBlock = [];
                  if(numbOfEmptBlcks !== 0) {
                    for(var i=0; i < numbOfEmptBlcks; i++) {
                        $scope.emptyBlock[i] = {};
                    }
                  }                  
                  if(res.data.metaqnas && res.data.metaqnas.length !== 0) {
                      for(var j=0; j < res.data.metaqnas.length; j++) {
                        knowledgeExNames[j] = res.data.metaqnas[j].name;
                      }
                  }
                  if(res.data.metaqnas.length && res.data.metaqnas.filter(function(v){return v.status === 'inProgress';}).length !== 0) {
                    $scope.startKgPolling();
                  }
                }, function(err) {

                });
            };

            function deleteWorkflow(entity, type) {
                var entityType = (type === 'action') ? (entity.isReport ? $scope._constants_.report : $scope._constants_.action) : (type === 'flowtask') ? 'Dialog Task' : 'Alert';
                entityType = (type === "knowledgeTask") ? $scope._constants_.knowledge : entityType;
                if (type === "uiForm") {
                    $q.all([BTStreamsService.deleteBotUiFormById($workflowService.selectedStream()._id,entity._id)])
                        .then(function (res) {
                            NotificationService.alertNotify(i18n.i18nString('deleted'), i18n.i18nString('ui_form_delete'), "success");
                            var eventInfo = {
                                "streamId":$workflowService.selectedStream()._id,
                                "BotName":$workflowService.selectedStream().name,
                                "BotLanguage":$workflowService.currentLanguage(),
                                "Level":"Engagement L3",
                                "Category":"Engagement L3",
                                "Sub Category":"Digital Tasks - Digital Forms",
                            };
                            mixPanel.postEvent('Digital Tasks - Digital Form Deleted',eventInfo);
                            getForms($workflowService.selectedStream()._id);
                        }, function (err) {
                            NotificationService.alertNotify(i18n.i18nString('delete_failure'), err.data.errors[0].msg, "error");
                        });
                }
                if (type === "alert") {
                    $q.all([BTAlertsService.deleteBTAlert(entity._id)])
                        .then(function (res) {
                            NotificationService.alertNotify(i18n.i18nString('deleted'), i18n.i18nString('alerttask_delete'), "success");
                            getAlerts($workflowService.selectedStream()._id);
                            getMappings($workflowService.selectedStream()._id);
                        }, function (err) {
                            NotificationService.alertNotify(i18n.i18nString('delete_failure'), err.data.errors[0].msg, "error");
                        });
                } else if (type === "action") {
                    $q.all([BTActionsService.deleteBTAction(entity._id)])
                        .then(function (res) {
                            NotificationService.alertNotify(i18n.i18nString('delete_entitytype',{dyn:entityType}), "success");
                            getActions($workflowService.selectedStream()._id);
                            getMappings($workflowService.selectedStream()._id);
                        }, function (err) {
                            NotificationService.alertNotify(i18n.i18nString('delete_failure'), err.data.errors[0].msg, "error");
                        });
                } else if (type === "knowledgeTask") {
                    $q.all([BTStreamsService.deleteKnowledgeTask($applicationService.userInfo().userId, entity._id)])
                        .then(function (res) {
                            NotificationService.alertNotify(i18n.i18nString('delete_entitytype',{dyn:entityType}), "success");
                            $scope.trainBot();
                            getKnowledgeTasks($workflowService.selectedStream()._id);
                        }, function (err) {
                            NotificationService.alertNotify(i18n.i18nString('delete_failure'), err.data.errors[0].msg, "error");
                        });
                } else if (type === "flowtask") {
                    $q.all([BTFlowtaskService.deleteFlowtask($workflowService.selectedStream()._id, entity._id)])
                        .then(function (res) {
                            NotificationService.alertNotify(i18n.i18nString('deleted'), i18n.i18nString('delete_entitytype',{dyn:entityType}), "success");
                            getFlowTasks($workflowService.selectedStream()._id);
                        }, function (err) {
                            NotificationService.alertNotify(i18n.i18nString('delete_failure'), err.data.errors[0].msg, "error");
                        });
                }
            }

            $scope.exportDialog = function (flowtaskId,flowtask) {
                function startExport(){
                    flowtaskid = flowtaskId;
                    if(flowtask && flowtask.followUpIntents && flowtask.followUpIntents.length > 0){
                             $('.export-dialog-modal').modal('show');
                    }
                    else{
    
                        BTFlowtaskService.exportDialog($workflowService.selectedStream()._id, flowtaskId).then(function (res) {
                        writeAndDownloadDialog(res.data.name + ".json", JSON.stringify(res.data));
    
                        });
                    }
                }
             function cancleExport(){
                 return;
             }
             function checkBoxCb(checkValue){
               console.log(checkValue);
               $scope._constants_.updateDownloadPopUppreferance(checkValue);
             }
             if($scope._constants_.config.showDownloadPopUps){
              NotificationService.userConfirm($scope._constants_.downloadPopUpMsg, [startExport, cancleExport], {okText: i18n.i18nString('confirm'),checkBox:{'enable':true,'checkBoxCb':checkBoxCb}}, "", undefined,i18n.i18nString('export_dialog'));  
             }else{
                startExport();
             }



              

            };
            $scope.canelExportDialog = function(){
                 $('.export-dialog-modal').modal('hide');
            };

            $scope.startExportDialog = function(){
                 $('.export-dialog-modal').modal('hide');
                 BTFlowtaskService.exportDialog($workflowService.selectedStream()._id, flowtaskid).then(function (res) {
                    writeAndDownloadDialog(res.data.name + ".json", JSON.stringify(res.data));

                    });
            };



            $scope.showExportDeprication = function(flowtaskId,flowtask){
                $element.find('#depricationExportModal').removeClass('fade').addClass('show');
                $scope.currentFlowTask = flowtask;
             };

            $scope.cancelExportDeprication = function(){
                $element.find('#depricationExportModal').removeClass('show').addClass('fade');
             };

             $scope.proceedExport = function(){
                $element.find('#depricationExportModal').removeClass('show').addClass('fade');
                $scope.exportDialog($scope.currentFlowTask._id,$scope.currentFlowTask);
                $scope.currentFlowTask = {};
            };

            function writeAndDownloadDialog(filename, data) {

                if (navigator.msSaveBlob) {
                    var blob = new Blob([data], { type: 'data:text/plain;charset=utf-8' });
                    return window.navigator.msSaveOrOpenBlob(blob, filename);
                } else {
                    var element = document.createElement('a');
                    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(data));
                    element.setAttribute('download', filename);

                    element.style.display = 'none';
                    document.body.appendChild(element);

                    element.click();

                    document.body.removeChild(element);
                }
            }

            $scope.getAvailability = function (state, action) {
                if($scope.availableActions[state] && $scope.availableActions[state][action]) { return $scope.availableActions[state][action]; }
                else { return false; }
            };

            $scope.isCollapsed = function (ele) {
                return $(ele).hasClass("collapsed") && !$scope.isHelpLinkClicked;
            };

             var resetAdvConfigs = function(){
                $workflowService.configurationList([]);
                $workflowService.savedConfigurationsList([]);
                $workflowService.registerSliders([]);
               
            };
            $scope.updatePinnedMenus = function(menu, remove) {
                var menuId = menu.id;
                if(remove){
                   delete $scope.builderNavigator.pinnedItems[menuId];
                } else {
                    $scope.builderNavigator.pinnedItems[menuId] = true;
                }
                var payload= {
                    "tabs": []
                };
                var tabObj = {};
                $.each($scope.builderNavigator.pinnedItems, function(menu,value) {
                    var tab = $scope.builderNavigator.navigationTree.menuItem[menu];
                   if(!tabObj[tab]) {
                    tabObj[tab] = {
                        tabId:tab.tab,
                        components:[]
                    };
                   }
                   var menuTemp = {
                     id:menu
                   };
                   tabObj[tab].components.push(menuTemp);
                });
                $.each(tabObj,function(key,val){
                    payload.tabs.push(val);
                });
                BTStreamsService.updatePinnedMenus($applicationService.userInfo().userId,payload).then(function (res) {
                  $scope.getPinnedMenus = res.data;
                  var _botInfo = {
                    "streamId":$workflowService.selectedStream()._id,
                    "BotName":$workflowService.selectedStream().name,
                    "BotLanguage":$workflowService.currentLanguage(),
                    "Menu Name":menu,
                    "Category":"Navigation",
                    "Sub Category":"Pin Menus",
                    "Level":"Engagement L3",
                 };
                 var event='';
                    if(remove){
                    event =  "Unpinned a Menu";
                    } else {
                        event =  "Pinned a Menu";
                    }
                    if(event){
                        mixPanel.postEvent(event,_botInfo);
                    }
                  NotificationService.notify('Pinning updated successfully','success');
                  $scope.builderNavigator.preparePinnedMenu($scope.getPinnedMenus,true);
                  console.log($scope.getPinnedMenus);
                }, function (err) {
                    NotificationService.notify('Failed to update pinning','errror');
                });
            };
            $scope.selectBot = function (bot,language,state) {
                if($scope.callbacks && $scope.callbacks.selectOrChangeBot){
                    $scope.callbacks.selectOrChangeBot(bot,state);
                }else{
                    localStorage.removeItem("previousState");
                    var botstate = state || 'indevelopment';
                    $scope.callbacks.changeFilterval(botstate);
                    stream = $workflowService.selectedStream(bot);
                    if(language){
                        $workflowService.currentLanguage(language);
                    }else{
                        $workflowService.currentLanguage(bot.defaultLanguage);
                    }
                     BTStreamsService.getBTStream(bot._id).then(function (res) {
                         var permissionStreamData = $workflowService.selectedStream(res.data);
                         $scope.builderNavigator.prepareNavigationTree();
                        $scope.callbacks.streamData = permissionStreamData;
                        resetAdvConfigs();
                        shortcutKeys.updateStreamData(res.data);
                        $scope.callbacks.showView("botDetailsForm");
                        $scope.$emit("streamUpdate");
                                }, function (err) {
                                    $scope.callbacks.showView("botDetailsForm");
                                    NotificationService.notify(err.data.errors[0].msg, "error");
                                });
                }
            };
            $scope.switchBot=function(e,botData){
                $scope.selectBot(botData);
            };
            var selectBotDestroy=$rootScope.$on("selectBot",$scope.switchBot);
                $scope.deleteIDP = function(idpID) {

                        $scope.idpTodelete = idpID;
                        NotificationService.alert(i18n.i18nString('delete_idp'),deleteIDPByID,arguments,'',undefined,i18n.i18nString('confirm'));



                    };


                    var deleteIDPByID = function(idpID) {
                        BTIdpService.deleteIdp($scope.idpTodelete,$workflowService.selectedStream()._id).then(function(res){
                            $scope.btcallback.loadIDPList();
                        }, function(error){
                            if(error.data && error.data.errors.length){
                                NotificationService.notify(error.data.errors[0].msg, "error");
                            }

                        });
                    };

            function hasSampleBotPermission() {
                if ($scope.stream.type === 'sample' && !$scope.isWorkFlowAdmin()) {
                    NotificationService.notify(i18n.i18nString('sample_bot_permission'));
                    return false;
                } else {
                    return true;
                }
            }
            $scope.searchQry = {};
            $scope.gSearch = {};
            $scope.gSearchCb = {};
            $scope.callbacks.selectType = function(pathName) {
                switch(pathName) {
                    case i18n.i18nString('ddval_entity'):
                        $scope.gSearch.showType('entitysynonyms');  
                        break;
                    case i18n.i18nString('ddval_synonyms'):
                    case i18n.i18nString('synonyms_label'):
                        $scope.gSearch.showType('botsynonyms');  
                        break;
                    case i18n.i18nString('ddval_intent'):
                        $scope.gSearch.showType('intentPatterns');
                        break;
                    case i18n.i18nString('ddval_pattern'):
                        $scope.gSearch.showType('entityPatterns');
                        break;
                    case i18n.i18nString('statements'):
                        $scope.searchQry.showType({type: i18n.i18nString('statements')}, true);
                        break;
                    case i18n.i18nString('questions'):
                        $scope.searchQry.showType({type: i18n.i18nString('questions')}, true);
                        break;
                    case i18n.i18nString('error_warnings'):
                        $scope.searchQry.showType({type: i18n.i18nString('error_warnings')}, true);
                        break;
                    case i18n.i18nString('queries'):
                        $scope.searchQry.showType({type: i18n.i18nString('queries')}, true);
                        break;
                    case i18n.i18nString('choices'):
                        $scope.searchQry.showType({type: i18n.i18nString('choices')}, true);
                        break;
                    case i18n.i18nString('greeting'):
                        $scope.searchQry.showType({type: i18n.i18nString('greeting')}, true);
                        break;
                    case i18n.i18nString('Auto_trained_label'):
                        $scope.gSearchCb.showUtteranceInternalHeader('auto');
                        break;
                }
            };
            $scope.formsObj={};
            $scope.callbacks.appendSearchInDialogs = function(qry) {
                $scope.formsObj.searchUiForms = qry;
                if($scope.callbacks.resetGSearchText){
                    $scope.callbacks.resetGSearchText();
                }
            };

            $scope.callbacks.appendSearchQry = function(searchQryInfo) {
                if(searchQryInfo.navigateTo === i18n.i18nString('constants.flowTasks') || (searchQryInfo.navigateTo === 'dialogTasks')) {
                    $scope.searchObj.searchDialogQuery = searchQryInfo.searchQry; 
                }
                else if((searchQryInfo.navigateTo === i18n.i18nString('ddval_standard') || (searchQryInfo.navigateTo === 'standardResponses')) && $scope.searchQry && $scope.searchQry.appendSearch) {
                    $scope.searchQry.appendSearch(searchQryInfo.searchQry);
                }
                else if(searchQryInfo.navigateTo === i18n.i18nString('ddval_entity') || searchQryInfo.navigateTo === i18n.i18nString('ddval_synonyms') || searchQryInfo.navigateTo === i18n.i18nString('synonyms_label')) {
                    $scope.gSearch.text = searchQryInfo.searchQry;
                }
                else if((searchQryInfo.navigateTo === i18n.i18nString('ddval_intent') || searchQryInfo.navigateTo === i18n.i18nString('ddval_pattern'))) {
                    $scope.gSearch.search = searchQryInfo.searchQry;
                }
            };
            $scope.setSubMenuToOpen=function(innerMenuItem){
                $scope.subMenuSelected = innerMenuItem;
                $scope.setRightpanel(null,innerMenuItem);
            };
            /* Callback from ContainmentMetrics to redirect */
            var containmentMetricsIframeEvent =  $rootScope.$on("containmentMetricsIframeEvent", function (e,formEvent) {
                $scope.setSubMenuToOpen('manageSessions');
            });
            /* Callback from PerformanceMetrics to redirect */
            var performanceMetricsIframeEvent =  $rootScope.$on("performanceMetricsIframeEvent", function (e,formEvent) {
                console.log(formEvent.payload);
                if(formEvent.payload) {
                    $scope.setSubMenuToOpen('metrics');
                }
            });
            $scope.navigateTo= function(tab,menu,resetNavigator,triggerSlider) {
                if( resetNavigator){
                    $scope.stream = $workflowService.selectedStream();
                    navigator.prepareNavigationTree();
                }
                $scope.setRightpanel(tab,menu);
                if(triggerSlider){
                    var triggerEvent = {
                        eventName :"intent",
                        name :"Intent not Identified",
                        triggerId:"INTENT_UNIDENTIFIED_EVENT"
                    };
                    $workflowService.storeSearchQry(triggerEvent);
                }else{
                    $workflowService.storeSearchQry({});
                }
            };
            if($scope.builderNavigator){
                $scope.builderNavigator.navigateTo = $scope.navigateTo.navigateTo;
            }
            $scope.getDefaultTab = function(menuItem){
              var defaultTab = 'botSummary';
              if($scope.builderNavigator.navigationTree.permitedMenuItems.tabMenu[menuItem]){
                defaultTab = $scope.builderNavigator.navigationTree.permitedMenuItems.tabMenu[menuItem];
              } else { // this else is not necessary //
                    var tab = $scope.builderNavigator.currentNavigationObj.selectedTab;
                                var menuComponents = $scope.builderNavigator.tabMenuItems[menuItem];
                                if($scope.builderNavigator.tabComponents && $scope.builderNavigator.tabComponents[menuItem] && $scope.builderNavigator.tabComponents[menuItem].length>1) {
                                    menuItem = $scope.builderNavigator.tabComponents[menuItem][0].component;
                                menuComponents = $scope.builderNavigator.tabMenuItems[menuItem];
                                }
                                if(menuComponents && menuComponents.length){
                                    $.each(menuComponents,function(i,menu){
                                        if(!defaultTab){
                                            defaultTab = menu.id;
                                        }
                                    });
                                }
              }
             
            
              return defaultTab;
            };
            $scope.menuFilter = function(component){
                var showMenu = true;
                if(!component.showMenu || !($scope.rightPanel && $scope.rightPanel.innerRightPanel && $scope.rightPanel.innerRightPanel.canShow(component.id))){
                    showMenu = false;
                }
                return showMenu;
            };
            $scope.setRightpanel = function(menu,panel) {
                if (panel){
                    $scope.rightPanel.innerRightPanel.showView(panel);
                } else {
                    var selectedMenu = menu || $scope.builderNavigator.currentNavigationObj.selectedMenuItem;
                    var defaultTab = $scope.getDefaultTab(selectedMenu);
                    $scope.rightPanel.innerRightPanel.showView(defaultTab);
                }
            };
            $scope.setSubTabToOpen = function(menu,tab){
                $scope.rightPanel.innerRightPanel.showView(menu,null,tab);
            };
            $scope.preparePublishPage = function (cb) {
                $scope.allTasksforPublish = [];
                $scope.allTasksSelected = {
                    selectAllPanelTasks:true
                };
                if(prepareUniversalBotPublishData && $scope.isUniversalBot()) {
                    $scope.loadingPublishComponents=true;
                     if($scope.stream.universalBotVersion === 1 || !$scope.stream.universalBotVersion){
                          $scope.allBotsSelected={
                                isSelected :false
                            };   
                        }else if($scope.stream.universalBotVersion === 2){
                              $scope.allBotsSelected={
                                isSelected :true
                            };  
                        }
                    BTStreamsService.getBTStream($scope.stream._id).then(function (res) {
                        $workflowService.selectedStream(res.data);
                        prepareUniversalBotPublishData();
                        $scope.loadingPublishComponents=false;
                    },function(){
                    prepareUniversalBotPublishData();
                    $scope.loadingPublishComponents=false;
                    });
                    $rootScope.$broadcast('reloadTasks', 'flowTask');
                    fetchSmallTalkData();
                    getBotPanelsForPublish();
                    if(!checkForChannels()){
                        $scope.startStopPanelLoading();
                        return;
                    }
                    if($scope.botDetails.streamState==='published'){
                         NotificationService.notify(i18n.i18nString('publish_page'), 'warning');
                         $scope.startStopPanelLoading();
                         return;
                    } 
                    cb();
                }
                if($workflowService.selectedStream().isDeflect) {
                    BTStreamsService.getDeploymentStatus($workflowService.selectedStream()._id)
                        .then(function(res){
                            if(res.data.setup.incoming && res.data.setup.outgoing) {
                                cb();
                            } else {
                                NotificationService.notify('Please setup incoming and outgoing setup in smartassist bot before publishing', 'warning');
                                $scope.startStopPanelLoading();
                                return;
                            }
                        }, function(err){
                            try {
                                if(err.error.message) {
                                  NotificationService.notify(err.error.message, 'error');
                                } else {
                                  NotificationService.notify(err.error.errors[0].msg, 'error');
                                }
                              } catch(e) {
                                NotificationService.notify("Failed to fetch the deployment status", 'error');
                            }
                            return;
                        });
                } else {
                    if(!checkForChannels()){
                        $scope.startStopPanelLoading();
                        return;
                    }
                    if(!hasSampleBotPermission()){
                        $scope.startStopPanelLoading();
                         return;
                    }
                    if($scope.botDetails.streamState==='published'){
                        $scope.startStopPanelLoading();
                         NotificationService.notify(i18n.i18nString('publish_page'), 'warning');
                         return;
                    }   
                    cb();
                }
            };
            $scope.callbacks.preparePublishPage = $scope.preparePublishPage;
            $scope.showActivType = function (activeType,ignoreLocal,cb,ubMessage,noLoading,formDom) {
                
            };
            
            var focusTimeout;
            $scope.mainSearchDomEvents = function(){
                focusTimeout =  setTimeout(function() {
                    clearTimeout(focusTimeout);
                    $('#koreGlobalSearchDropdown').off('show.bs.dropdown').on('show.bs.dropdown', function () {
                        $scope.tSearch.text= '';
                    });
                    $('#koreGlobalSearchDropdown').off('shown.bs.dropdown').on('shown.bs.dropdown', function () {
                        focusTimeout  =  setTimeout(function() {
                            $('.gSearchInput').focus();
                        });
                    });
                    $('#koreBotSearchDropdown').off('hide.bs.dropdown').on('hide.bs.dropdown', function () {
                        $scope.botmeta.botSearchInput = '';
                    });
                    $('#koreBotSearchDropdown').off('shown.bs.dropdown').on('shown.bs.dropdown', function () {
                       setTimeout(function() {
                            $('.botSearchInput').focus();
                        });
                    });
                },1000);
            };
            $scope.mainSearchDomEvents();
            function bindEvents(){
                
                //to avoid inlinemanual backdrop close click
                $('body').off("click.inmplayer-backdrop-step").on('click.inmplayer-backdrop-step', function (evt) {
                    if ($(evt.target).hasClass("inmplayer-backdrop-step")) {
                        evt.stopPropagation();
                        evt.stopImmediatePropagation();
                        return false;
                    }
                });
                $(document).off("click.botsearch").on('click.botsearch', function(evt){
					if ($(evt.target).hasClass("botSearchInput")) {
						return;
					}
                    // $(".botDropdown").find(".dropdown-menu").removeClass("botlistdropdown");
                    $(".botDropdown").find(".botSearchInput").val("");
                    $scope.$emit("clearBotDropdownSearch");
				});
                           
                $timeout(function(){
                    if($(".innerLeft").is(":visible")){
                        $(".innerLeft").scrollTop(0);
                    }
                }, 500);

            }
            $scope.anyTaskAvailable = function () {
                // return ($scope.alertTasks.length || $scope.actionTasks.length || $scope.informationTasks.length || $scope.dialogTasks.length || $scope.knowledgeTasks.length || $scope.mappingTasks.length);
                return true;
            };

            $scope.isTaskAvailable = function (taskName) {
                return $scope[taskName].length > 0;
            };

//              $scope.data = [
//                {
//                  'nodeId': uuid.v4(),
//                  'label': getTextEncoded($scope.stream.name),
//                  'class': 'bgblack',
//                  'level': 'l0',
//                  'parent': [],
//                  'synonyms': [],
//                  'nodes': []
//                  //  'isRoot': true,
//                  //  'streamId': $scope.stream._id
//                }
//              ];


            function load(){
                $rootScope.$broadcast('reloadTasks', "flowTask");
//                    $scope.$emit("loadBots", $workflowService.selectedStream(), 'botTasks');
                }

               var _flowtaskDialogSettingsCB = {};
                _flowtaskDialogSettingsCB.updateFlowData = function (flowData) {
                    $scope.flowtaskObj = flowData;
                };
                var _updateflowtask = function (flowtask) {
//                    var index = $scope.dialogTasks.findIndex( record => record._id === flowtask._id );
                var index;
                $.each($scope.dialogTasksByState, function (i, task) {
//                    if (task.child && task.child.length) {
//                        if (flowtask._id === task.child[0]._id) {
//                            index = i;
//                            $scope.dialogTasksByState[index].child[0] = flowtask;
//                        $scope.openManageInterruptions.dialogObj = $scope.dialogTasksByState[index].child[0];
//                        $scope.openManageInterruptions.dialogTasks = $scope.dialogTasksByState;
//                        $scope.openManageInterruptions.currFlowTask = $scope.dialogTasksByState[index].child[0];
//                            return false;
//                        }
//                    } else {
                        if (flowtask._id === task._id) {
                            index = i;
                            $scope.dialogTasksByState[index] = flowtask;
                        $scope.openManageInterruptions.dialogObj = $scope.dialogTasksByState[index];
                        $scope.openManageInterruptions.dialogTasks = $scope.dialogTasks;
                        $scope.openManageInterruptions.currFlowTask = $scope.dialogTasksByState[index];
                            return false;
                        }
//                    }

                });


            };
                var _updateFollowUpIntents = function (flowtask,followUpIntents) {
                    var index;
                   $.each($scope.dialogTasksByState,function(i,task){
//                       if (task.child && task.child.length) { // child structure removed
//                        if (flowtask._id === task.child[0]._id) {
//                            index = i;
//                            $scope.dialogTasksByState[index].child[0].followUpIntents = followUpIntents;
//                            $scope.openManageInterruptions.dialogObj = $scope.dialogTasksByState[index].child[0];
//                            $scope.openManageInterruptions.dialogTasks = $scope.dialogTasksByState;
//                            $scope.openManageInterruptions.currFlowTask = $scope.dialogTasksByState[index].child[0];
//                            return false;
//                        }
//                    } else {
                        if (flowtask._id === task._id) {
                            index = i;
                            $scope.dialogTasksByState[index].followUpIntents = followUpIntents;
                            $scope.openManageInterruptions.dialogObj = $scope.dialogTasksByState[index];
                            $scope.openManageInterruptions.dialogTasks = $scope.dialogTasksByState;
                            $scope.openManageInterruptions.currFlowTask = $scope.dialogTasksByState[index];
                            return false;
                        }
//                    }
                    });

                };
                $scope.openDialogSettings = function (flowtask) {
                    $scope.flowtaskDialogSettingsCB.show = true;
                    $scope.flowtaskDialogSettingsCB.dialogObj = flowtask;
                    $scope.flowtaskDialogSettingsCB.cb = _flowtaskDialogSettingsCB;
                    $scope.flowtaskDialogSettingsCB.load = load;
                    $scope.flowtaskDialogSettingsCB.callFrom = "menu";
                    $scope.flowtaskDialogSettingsCB.viewMode = flowtask.state === "published" ? true : false;
                    setTimeout(function(){
                        $('.dialogSettingsForm').modal("show");
                        $scope.flowtaskDialogSettingsCB.init();
                    },200);

                    /*$modal.open({
                        templateUrl: window.appConfig.TMPLT_PRE_PATH + 'js/forms/dialog-settings/dialog-settings.html',
                        controller: 'DialogSettings',
                        resolve: {
                            config: function () {
                                return {
                                    "dialogObj":flowtask,
                                    cb: _flowtaskDialogSettingsCB,
                                    load: load
                                };
                            }
                        }
                    });*/
                };

                  $scope.openDialogLinkedTask = function (flowtask) {
                        $scope.openLInkedTaskSliderCB.open=true;
                        $scope.openLInkedTaskSliderCB.dialogTasksByState = $scope.dialogTasksByState;
                        $scope.openLInkedTaskSliderCB.currFlowTask = flowtask;
                        setTimeout(function () {
                          $scope.openLInkedTaskSliderCB.processDialogTasks();
                          $(".linkedTasks").modal("show");
                          $scope.openLInkedTaskSliderCB.viewMode = flowtask.state === "published" ? true : false;
                        },200);
                    };
              $scope.openManageInterruptions = function (flowtask,fromDialogTask) {
                  if(fromDialogTask){
                    flowtask =  _.find($scope.dialogTasksByState,{_id:flowtask._id});
                  }
                $scope.sliderStep = 1;
                $scope.showSteps = true;
                $scope.openManageInterruptions.viewMode = false;
                $scope.openManageInterruptions.dialogObj = flowtask;
                $scope.openManageInterruptions.updateDialog =  _updateflowtask;
                $scope.openManageInterruptions.updateFollowUpIntents =  _updateFollowUpIntents;
                $scope.openManageInterruptions.dialogTasks= $scope.dialogTasks;
                $scope.openManageInterruptions.currFlowTask = flowtask;
                setTimeout(function () {
                     $scope.openManageInterruptions.viewMode = flowtask.state === "published" ? true : false;
                     
                     if ((($scope.stream.state==="setup") && ($scope.stream.sbStreamId)) || !flowtask.editable) {
                        $scope.openManageInterruptions.viewMode = true;
                    }
                    $scope.modalSlider.open("#manageInteruptions");
                }, 500);
            };
            $scope.fullModalCallback.openManageInterruptions = $scope.openManageInterruptions;
            $scope.fullModalCallback.openDialogSettings = $scope.openDialogSettings;
            $scope.enableManageVariable = function(dialog) {
                $scope.manage_var_cb._id = dialog._id;
                $scope.manage_var_cb.addedNamespaces = dialog.vNameSpace || [];
                $scope.manage_var_cb.subHeading = dialog.name;
                $scope.manage_var_cb.state = dialog.state;
                $scope.manage_var_cb.updateDialogNamespace = function(list) {
                    dialog.vNameSpace = list;
                };
                $scope.manage_var_cb.payloadExtend = _.pick(dialog, 'name', 'visibility');
                $scope.manageVarEnable = true;
                setTimeout(function(){
                    $scope.modalSlider.open("#manageVarNamespace");
                }, 500);
            };

            $scope.manageVarNamespaceAlertOpen = function(alert) {
                $scope.manageVarAlertEnable = true;
                $scope.manage_var_alert_cb._id = alert._id;
                $scope.manage_var_alert_cb.addedNamespaces = alert.vNameSpace || [];
                $scope.manage_var_alert_cb.state = alert.state != 'published'?'configured':'published';
                $scope.manage_var_alert_cb.updatedAlertNamespace = function(list) {
                    alert.vNameSpace = list;
                };
                $scope.manage_var_alert_cb.subHeading = alert.name;
                setTimeout(function(){
                    $scope.modalSlider.open('#manageVarNamespaceAlert');
                }, 200);
            };

            $scope.manageVarSmallSlider = function(smallTalk) {
                $scope.manageVarSmallTalkEnable = true;
                $scope.manage_var_small_talk_cb._id = smallTalk.groupId;
                $scope.manage_var_small_talk_cb.addedNamespaces = smallTalk.vNameSpace || [];
                $scope.manage_var_small_talk_cb.subHeading = smallTalk.groupName;
                $scope.manage_var_small_talk_cb.state = $workflowService.selectedStreamState() != 'published'?'configured':'published';
                $scope.manage_var_small_talk_cb.updateSmallNamespace = function(list) {
                    smallTalk.vNameSpace = list;
                };
                setTimeout(function(){
                    $scope.modalSlider.open('#manageVarNamespaceSmallTalk');
                }, 200);
            };

            $scope.manageVarActionOpen = function(action) {
                $scope.manageVarActionEnable = true;
                $scope.manage_var_action_cb._id = action._id;
                $scope.manage_var_action_cb.subHeading = action.name;
                $scope.manage_var_action_cb.addedNamespaces = action.vNameSpace || [];
                $scope.manage_var_action_cb.state = action.state != 'published'?'configured':'published';
                $scope.manage_var_action_cb.updateActionNamespace = function(list) {
                    action.vNameSpace = list;
                };
                setTimeout(function(){
                    $scope.modalSlider.open('#manageVarNamespaceAction');
                }, 200);
            };

            $scope.manageVarNameInfSlider = function(information) {
                $scope.manageVarInfEnable = true;
                $scope.manage_var_inf_cb._id = information._id;
                $scope.manage_var_inf_cb.subHeading = information.name;
                $scope.manage_var_inf_cb.addedNamespaces = information.vNameSpace || [];
                $scope.manage_var_inf_cb.state = information.state != 'published'?'configured':'published';
                $scope.manage_var_inf_cb.updateInformationNamespace = function(list) {
                    information.vNameSpace = list;
                };
                setTimeout(function(){
                    $scope.modalSlider.open('#manageVarNamespaceInf');
                }, 200);
            };

            $scope.amendEntityDialog = function(flowtask){
                $scope.emendEntitySliderOpen = true;
                $scope.amendEntity.flowtask = flowtask;
                $scope.viewMode = flowtask.state === "published" ? true : false;
                $scope.amendEntity.flowtask.amendConfig = flowtask.amendConfig || {};
                if($scope.amendEntity.flowtask.amendConfig && $scope.amendEntity.flowtask.amendConfig.priority === undefined){
                    $scope.amendEntity.flowtask.amendConfig = {
                        priority : 'bot'
                    };
                }
                if($scope.amendEntity.flowtask.amendConfig && $scope.amendEntity.flowtask.amendConfig.enabled){
                   $scope.amendEntity.flowtask.amendConfig.allowHidden = $scope.amendEntity.flowtask.amendConfig.hasOwnProperty('allowHidden')?$scope.amendEntity.flowtask.amendConfig.allowHidden:false;
                }
                $scope.amendEntity.streamData = $workflowService.selectedStream();
                $scope.modalSlider.open("#amendEntityDialog");
            };
            $scope.fullModalCallback.amendEntityDialog = $scope.amendEntityDialog;
            $scope.getComponent = function(flowtask){
                $scope.nodeObjCount={};
                $scope.component={};
                BTFlowtaskService.getFlowtaskComponents($workflowService.selectedStream()._id,flowtask._id).then(function (res) {
                        if (res && res.data) {
                            $.each(res.data, function (k, component) {
                                $scope.component[component._id]=component;
                            });
                            $.each( flowtask.nodes, function (k, nodeele) {
                                if(!$scope.nodeObjCount[nodeele.componentId]){
                                    $scope.nodeObjCount[nodeele.componentId] ={'count':0};
                                     $scope.nodeObjCount[nodeele.componentId][nodeele.nodeId]=$scope.nodeObjCount[nodeele.componentId].count;
                                }
                                  $scope.nodeObjCount[nodeele.componentId].count = $scope.nodeObjCount[nodeele.componentId].count+1;
                                  $scope.nodeObjCount[nodeele.componentId][nodeele.nodeId]= $scope.nodeObjCount[nodeele.componentId].count;
                                  nodeele.count = $scope.nodeObjCount[nodeele.componentId].count;
                              });
                        }
                    });
            };
            
            $scope.amendEntityDialog = function(flowtask){
                $scope.emendEntitySliderOpen = true;
                $scope.amendEntity.flowtask = flowtask;
                $scope.viewMode = flowtask.state === "published" ? true : false;
                $scope.amendEntity.flowtask.amendConfig = flowtask.amendConfig || {};
                if($scope.amendEntity.flowtask.amendConfig && $scope.amendEntity.flowtask.amendConfig.priority === undefined){
                    $scope.amendEntity.flowtask.amendConfig = {
                        priority : 'bot'
                    };
                }
                if($scope.amendEntity.flowtask.amendConfig && $scope.amendEntity.flowtask.amendConfig.enabled){
                   $scope.amendEntity.flowtask.amendConfig.allowHidden = $scope.amendEntity.flowtask.amendConfig.hasOwnProperty('allowHidden')?$scope.amendEntity.flowtask.amendConfig.allowHidden:false;
                }
                if($scope.amendEntity.flowtask.amendConfig.postAmend === 'jumpToSpecificNode'){
                    $scope.getComponent(flowtask);
                }
                $scope.amendEntity.streamData = $workflowService.selectedStream();
                $scope.amendServerCopy = $workflowService.cloneData($scope.amendEntity);
                $scope.modalSlider.open("#amendEntityDialog");
            };
           
            $scope.setDefault = function(){
                    if($scope.amendServerCopy.flowtask.amendConfig.priority === 'task'){
                         if($scope.amendEntity.flowtask.amendConfig.enabled === undefined){
                            $scope.amendEntity.flowtask.amendConfig.enabled = false;
                        }else{
                            $scope.amendEntity.flowtask = $workflowService.cloneData($scope.amendServerCopy.flowtask);
                        }

                    }else{
                          if($scope.amendEntity.flowtask.amendConfig.enabled === undefined){
                            $scope.amendEntity.flowtask.amendConfig.enabled = false;
                        }
                    }
                    
                
            
            };
            $scope.setDefaultPriority = function(){
               if($scope.amendEntity.flowtask.amendConfig.postAmend === undefined){
                  $scope.amendEntity.flowtask.amendConfig.postAmend = 'continueFromAmendedNode';
               }
            };
            function prepareData(){
                if($scope.amendEntity.flowtask.amendConfig.enabled){
                    $scope.amendEntity.flowtask.amendConfig.allowHidden = $scope.amendEntity.flowtask.amendConfig.allowHidden?$scope.amendEntity.flowtask.amendConfig.allowHidden:false;
                }
               if($scope.amendEntity.flowtask.amendConfig.enabled === false){
                        delete $scope.amendEntity.flowtask.amendConfig.postAmend;
                        delete $scope.amendEntity.flowtask.amendConfig.allowHidden;
                        delete $scope.amendEntity.flowtask.amendConfig.skipShownMessages;
                        delete $scope.amendEntity.flowtask.amendConfig.clearDownstreamEntities;
                    }else if($scope.amendEntity.flowtask.amendConfig.postAmend === 'continueFromCurrentNode' || $scope.amendEntity.flowtask.amendConfig.postAmend === 'jumpToSpecificNode'){
                         delete $scope.amendEntity.flowtask.amendConfig.skipShownMessages;
                         delete $scope.amendEntity.flowtask.amendConfig.clearDownstreamEntities;
                    }
            }
            $scope.saveAmendSettings = function(){
                 prepareData();
                 var _params = {};
                        _params.streamId = $workflowService.selectedStream()._id;
                        _params.name = $scope.amendEntity.flowtask.name;
                        _params.shortDesc = $scope.amendEntity.flowtask.shortDesc;
                        _params.visibility =  $scope.amendEntity.flowtask.visibility;
                        _params.amendConfig = $scope.amendEntity.flowtask.amendConfig;
                 BTFlowtaskService.updateFlowtask($workflowService.selectedStream()._id, $scope.amendEntity.flowtask._id,_params).then(function (res) {
                    if (res && res.data) {
                        NotificationService.notify(i18n.i18nString('notify_amend'), 'success');
                        $workflowService.flowtaskInfo(res.data);
                        $scope.amendEntity.flowtask = res.data;
                        $scope.closeAmendSlider();
                    }
                });
                 
            };

            $scope.openKgExtraction = function ($event) {
                $event.stopPropagation();
                $scope.openType = 'file';
                if($scope.knowledgeTasks && $scope.knowledgeTasks.length !== 0) {
                    var kgStatusConfigured = $scope.knowledgeTasks.filter(function(v){
                        return v.state === 'configured';
                    })[0];
                    $workflowService.taskEditInfo(kgStatusConfigured);
                }
                $timeout(function(){
                    $scope.modalSlider.open("#knowledge-extract-slider");
                    $scope.knowledgeExtractCallback.initDragDropFile();
                },200);
            };
            $scope.knowledgeExtractCallback.goBackFromKgList = function() {
                $(".kg-extraction-form").modal('hide');
                $scope.isKgExtractionList = false;
            };
            $scope.kgExtNewCallback.goBackFromOntoNew = function() {
                getKnowledgeTasks();
                $('.kg-extraction-form-two').modal('hide');
                $scope.isKgExtractTwo = false;
            };

            function startImportProgress() {
                progressInterval = setInterval(function () {
                    if ($scope.totalProgress > 90) {
                        $scope.totalProgress = 90;
                    }
                    $scope.totalProgress += 0.1;
                }, 250);
            }

            $scope.openKgExtractTwo = function(listData) {
                var fileExtension;
                if(listData && listData.fileName) {
                    fileExtension = listData.fileName.replace(/^.*\./, '');
                } else if(listData && listData.name) {
                    fileExtension = listData.name.replace(/^.*\./, '');
                } else {
                    fileExtension = listData.name.replace(/^.*\./, '') || '';
                }
                listData.fileExtension = fileExtension;
                if(listData.status === 'success') {
                    if(listData.fileUrl) {
                        $scope.kgExtNewCallback.fileUrlLink = listData.fileUrl;
                    }
                    else {
                        $scope.kgExtNewCallback.fileUrlLink = null;
                    }
                    if(listData.qnaAddedCount === 0 && fileExtension === 'pdf') { // No Q's added KG to show Annotate option
                        listData.pdfType = true;
                    }
                    openModalByClass(".kg-extraction-form-two");
                    $scope.isKgExtractTwo = true;
                    if ($('.kore-chat-window') && $('.kore-chat-window').length && !$('.kore-chat-window').hasClass('minimize')) {
                        $('.kore-chat-window .minimize-btn').trigger('click');
                    }
                    $scope.kgExtNewCallback.init(listData);
                    var eventInfo = {
                        "streamId":$workflowService.selectedStream()._id,
                        "BotName":$workflowService.selectedStream().name,
                        "BotLanguage":$workflowService.currentLanguage(),
                        "Level":"Engagement L2",
                        "Category":"Engagement L2",
                        "Sub Category":"Conversation - Knowledge Graph",
                     };
                    mixPanel.postEvent('Conversation - Enter Review and Add',eventInfo);
                }
                else if(listData.status === 'inProgress') { 
                  NotificationService.notify(i18n.i18nString('kg_extract_progress'), "error");
                }
                else if(listData.status === "failed" && fileExtension === "pdf") {
                    $scope.failedAnnotion(listData); // redirect to annotool
                 }
                else {
                   NotificationService.notify(i18n.i18nString('kg_request_failure'), "error");
                }
            };
            $scope.knowledgeExtractCallback.openKgExtractList = function(){
                openModalByClass(".kg-extraction-form");
                if($scope.knowledgeTasks && $scope.knowledgeTasks.length !== 0) {
                    var kgStatusConfigured = $scope.knowledgeTasks.filter(function(v){
                        return v.state === 'configured';
                    })[0];
                    $workflowService.taskEditInfo(kgStatusConfigured);
                }
                 $scope.isKgExtractionList = true;
                if ($('.kore-chat-window') && $('.kore-chat-window').length && !$('.kore-chat-window').hasClass('minimize')) {
                    $('.kore-chat-window .minimize-btn').trigger('click');
                }
            };
            $scope.onInterruptsCancel= function(){
                $scope.sliderStep= null;
                $scope.showSteps = false;
                $scope.modalSlider.close("#manageInteruptions");
                $(".builderMaincontainer").removeClass("bt-modal-open");
                $(".builderMaincontainer").removeClass("modal-open");
            };

            $scope.updateInterruptsStep = function (event,stepNo) {
                 if (stepNo) {
                    $timeout(function () {
                        $scope.sliderStep = stepNo;
                    });
                }
            };
            $scope.stepUpdate = function (step) {
                $scope.$emit("updateInterruptsStep", step);
            };
            var updateInterruptsStepevent = $scope.$on("updateInterruptsStep", $scope.updateInterruptsStep);

                $scope.isEligibleForAuthorization = function () {
                    return true;//$scope.stream.type !== 'universalbot';
                };

                $scope.isEligibleForSdkConf = function () {
                    return $scope.stream.type !== 'universalbot';
                };

                $scope.isEligibleToManageBot = function (stream) {
                    var createdBy = _.isObject(stream.createdBy) ? stream.createdBy._id : stream.createdBy;
                    return $rootScope.isManaged && $applicationService.userInfo().userId === createdBy && $scope.stream.type !== 'universalbot';
                };

                 $scope.isEligibleToDelete = function (task) {
                    if (task && !(task.state === "published" || task.state === 'suspended')) {
                        return true;
                    } else {
                        return $rootScope.wfAdmin;
                    }
                };
                
                $scope.isEligibleToShare = function () {
                    return $rootScope.isManaged;
                };

                $scope.storeActiveFlowTask = function(flowtask) {
                    $scope.activeFlowTask = flowtask;
                    $scope.openImportSlider = true;
                    $scope.taskname = flowtask.name.charAt(0).toUpperCase() + flowtask.name.slice(1);
                    $scope.importDialogHeader = i18n.i18nString('import_dialog_desc');
                    $scope.modalSlider.open("#importSliderMain");
                };

                // $scope.isModalOpen = function(){
                //     if($(".modal-open").is(":visible") || $(".flowTaskForm.pageFlow").is(":visible")){
                //         return true;
                //     }
                //     return false;
                // };

            $scope.importObj = {};
            $scope.importObj.importDialog = null;
             $scope.readDialog = function () {
                 if(!$scope.importObj.importDialog){
                        return;
                    }
                    $scope.importedDialogName = $scope.importObj.importDialog.name;
                    if ($scope.importedDialogName) {
                        var _ext = $scope.importedDialogName.substring($scope.importedDialogName.lastIndexOf('.'));
                        if (_ext !== '.json') {
                            NotificationService.notify(i18n.i18nString('upload_json'), "error");
                            $scope.fileExtensionError = true;
                            return;
                        } else {
                            $scope.fileExtensionError = false;
                            $scope.dialogRequiredError = false;
                        }
                    }

                    var reader = new FileReader();
                    reader.readAsText($scope.importObj.importDialog);

                    reader.onload = function (e) {
                        var data = reader.result;
                        if(!data || data && !data.length){
                            NotificationService.notify(i18n.i18nString('upload_valid'), "error");
                            $scope.fileEmptyError = true;
                        }
                        else{
                            $scope.fileEmptyError = false;
                        }
                        $scope.importedDialogData = data;
                    };
                    //angular.element("#importFile").val("");
                };

                $scope.changeEvent = function(event){
                    event.target.value = "";
                };

                $scope.confirmImport = function () {
                    if (!$scope.importedDialogData) {
                        $scope.dialogRequiredError = true;
                        NotificationService.notify(i18n.i18nString('dialog_file_req'), "error");
                        return;
                    }
                    $scope.isWorkProgress = true;
                    $scope.loaderMessage = "Importing...";
                    var _currFlowtaskID = $scope.activeFlowTask._id;
                    if($scope.activeFlowTask.state === 'published' || $scope.activeFlowTask.state === 'suspended') {
                        _currFlowtaskID = $scope.activeFlowTask.child[0]._id;
                    }
                    BTFlowtaskService.importDialog($workflowService.selectedStream()._id, _currFlowtaskID, $scope.importedDialogData,$scope.bot).then(function (res) {
                        $scope.doneImporting = true;
                        $workflowService.flowtaskInfo(res.data);
                        $scope.flowtaskObj = res.data;
                        $scope.importModalTitle = i18n.i18nString('successsful');
                        $scope.connections = getConnections(res.data.nodes);
                        $scope.importDialogHeader =i18n.i18nString('dialog_backup_success') ;
                        $scope.importResults = i18n.i18nString('analyzing_file',{length:$scope.flowtaskObj.nodes.length}) + i18n.i18nString('analyzing_file_desc',{connections_length: $scope.connections.length});
                        $scope.isWorkProgress = false;
                        $scope.loaderMessage = i18n.i18nString('working');
                        $scope.displayMode = 'edit';
                        //$('#flowtask_imports').modal('hide');
                    }, function (error) {
                        $scope.doneImporting = true;
                        var _msg = error.data.errors[0].msg;
                        $scope.importDialogHeader = i18n.i18nString('dialog_backup_failure');
                        $scope.importResults = _msg;
                        $scope.isWorkProgress = false;
                        $scope.loaderMessage = i18n.i18nString('working');
                        $scope.importModalTitle = i18n.i18nString('failed');
                        NotificationService.notify(_msg, 'error');
                    });
                };

                function getConnections (data) {
                    var transitions = _.flatten(_.pluck(data, 'transitions'));
                    return _.filter(transitions, function (each){
                        return (each.default !== "end" && !_.isEmpty(each.default)) || _.isUndefined(each.default);
                    });
                }

            $scope.finishImporting = function () {
                $scope.doneImporting = false;
                $scope.importedDialogName = undefined;
                $scope.importedDialogData = undefined;
                $scope.importObj.importDialog = undefined;
                $scope.importDialogHeader = i18n.i18nString('import_dialog_desc');
                $scope.importModalTitle = i18n.i18nString('a_dialog');
                $scope.fileExtensionError = false;
                //$('#flowtask_imports').modal('hide');
                $scope.modalSlider.close("#importSliderMain");
                loadAllTasks();
            };

            $scope.cancelImporting = function () {
                $scope.doneImporting = false;
                $scope.importedDialogName = undefined;
                $scope.importedDialogData = undefined;
                $scope.importObj.importDialog = undefined;
                $scope.importDialogHeader = i18n.i18nString('import_dialog_desc');
                $scope.importModalTitle = i18n.i18nString('a_dialog');
                $scope.fileExtensionError = false;
                //$('#flowtask_imports').modal('hide');
                $scope.modalSlider.close("#importSliderMain");
                //loadAllTasks();
            };

            var _isInCAP = false;

            function isInMarket(tasks) {

                var _allTasks = [].concat($scope.alertTasks, $scope.actionTasks, $scope.dialogTasks);

                _isInCAP = _.findIndex(_allTasks, { 'state': 'configured' }) !== -1 ? true : false;
                _isInCAP = _.findIndex(_allTasks, { 'state': 'published' }) !== -1 ? true : _isInCAP;
                _isInCAP = _.findIndex(_allTasks, { 'state': 'awaitingApproval' }) !== -1 ? true : _isInCAP;

                // $workflowService.isInCAP(_isInCAP); this is handled using stream data in workflowservices stream data

                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i].state === 'published' || tasks[i].state === 'suspended' || tasks[i].state === 'awaitingApproval') {
                        $scope.stream = $workflowService.selectedStream();
                        $scope.stream.isInMarket = true;
                        $workflowService.selectedStream($scope.stream);
                        break;
                    }
                }
                for (var j = 0; j < tasks.length; j++) {
                    if (tasks[j].state === 'published' || tasks[j].state === 'suspended') {
                        $workflowService.publishedOrSuspended(true);
                        break;
                    } else {
                        $workflowService.publishedOrSuspended(false);
                    }
                }

                for (var k = 0; k < tasks.length; k++) {
                    if (tasks[k].state === 'published') {
                        $workflowService.isTaskPublished(true);
                        return;
                    } else {
                        $workflowService.isTaskPublished(false);
                    }
                }
            }

            var canAccessService = function () {
                var _allTasks = [].concat($scope.alertTasks, $scope.actionTasks, $scope.dialogTasks, $scope.informationTasks);
                var _accessStatesArray = ["configured", "published", "awaitingApproval", "rejected"];
                $scope.getAllAccessRights();
                /**
                 * code to check all child task
                 */
                var _allChildTasks = _.pluck(_allTasks, 'child') || [];
                _allChildTasks = _.filter(_allChildTasks, function (data) { return data !== undefined; }) || [];
                _allChildTasks = _.flatten(_allChildTasks || []);
                /**
                 * end of child tasks
                 */
                _allTasks = [].concat(_allTasks, _allChildTasks);
                var _canAccessService;
                if($scope.knowledgeTasks && $scope.knowledgeTasks.length > 0){
                    _canAccessService = true;
                }else if($scope.accessRights === 'NO' || $scope.childAccessRights === 'NO'){
                    _canAccessService = true;
                }

                if (_canAccessService) {
                    updateShowTestBot(_canAccessService);
                    return;
                }

                function updateCanAccessService(index) {
                    _canAccessService = _.findIndex(_allTasks, { 'state': _accessStatesArray[index] }) !== -1 ? true : _canAccessService;
                    index = index + 1;
                    if (!_canAccessService && index < _accessStatesArray.length) {
                        updateCanAccessService(index);
                    }
                }

                updateCanAccessService(0);
                updateShowTestBot(_canAccessService);
            };

            var updateShowTestBot = function (_canAccessService) {
                $scope.showTestBot = _canAccessService;
            };

            $scope.releaseLock = function (type, entity, hideMsg) {
                return BTStreamsService.releaseLock(entity._id)
                    .then(function (res) {
                        $rootScope.$broadcast('reloadTasks', type);
                        if (!hideMsg) {
                            NotificationService.notify(i18n.i18nString('release_lock_success',{dyn:entity.name}), 'success');
                        }
                    }, function (err) {
                        if (!hideMsg) {
                            NotificationService.notify(i18n.i18nString('release_lock_failure',{dyn:entity.name}), 'error');
                        }
                        return $q.reject({ data: { 'error': i18n.i18nString('lock_release_failed') } });
                    });
            };

            function triggerTaskLockReleasing() {

                var userId = _userInfo.userId;


                var callReleaseLock = function (tasks, taskType) {

                    var proceedToReleaseLock = function (resourceObject) {
                        if (resourceObject && resourceObject.lock && resourceObject.lock.lockkey) {
                            if (resourceObject.lock.userId == userId) {
                                if (taskType === "flow") {
                                    resourceObject._id = resourceObject.mapId;
                                }
                                $scope.releaseLock(taskType, resourceObject, true);
                                TimerNotification.removeTimer(resourceObject._id);
                                delete resourceObject.lock;
                            }
                        }
                    };

                    $.each(tasks, function(i, task){
                        proceedToReleaseLock(task);
                        $.each((task.child || []), function (i, childTask) {
                            proceedToReleaseLock(childTask);
                        });
                    });



                };

                var _allTasks = [
                    {
                        tasks: $scope.alertTasks,
                        taskType: "alert"
                    }, {
                        tasks: $scope.actionTasks,
                        taskType: "action"
                    }, {
                        tasks: $scope.informationTasks,
                        taskType: "action"
                    }, {
                        tasks: $scope.mappingTasks,
                        taskType: "flow"
                    }, {
                        tasks: $scope.knowledgeTasks,
                        taskType: "knowledgeTask"
                    }
                ];

                _allTasks.map(function (taskObject) {
                    callReleaseLock(taskObject.tasks, taskObject.taskType);
                });

                if ($scope.stream.lock && $scope.stream.lock.lockkey) {
                    $scope.releaseLock('bot', $scope.stream, true);
                }

            }

            $scope.isEligibleToReleaseLock = function (userId) {
                    return $applicationService.userInfo().userId === userId;
                };

            function getMappings(id) {
                var deferred = $q.defer();
                $scope.loadingFlows = true;
                $scope.mappingTasks = [];
                BTStreamsService.getMappings(id)
                    .then(function (res) {
                        var _alertMappings = $workflowService.cloneData(res.data);
                        //triggerTaskLockReleasing();
                        _alertMappings = _alertMappings.map(function (mapping) {
                            mapping.actionName = mapping.actionName ? builderUtility.textToHtml(mapping.actionName) : '';
                            mapping.actionStream = mapping.actionStream ? builderUtility.textToHtml(mapping.actionStream) : '';
                            mapping.alertName = mapping.alertName ? builderUtility.textToHtml(mapping.alertName) : '';
                            mapping.alertStream = mapping.alertStream ? builderUtility.textToHtml(mapping.alertStream) : '';
                            return mapping;
                        });

                        $scope.mappingTasks = $scope.mappingTasks.concat(_alertMappings);
                        $scope.mappingTasks = flowsUtil.arrangeFlows($scope.mappingTasks);
                        //$scope.loadingFlows=false;
                        deferred.resolve(res);
                    },function(error){
                        if (+error.status === 403) {
                            deferred.resolve({data: []});
                        } else {
                            deferred.reject(error);
                        }
                    });
                return deferred.promise;
            }
            function getAlertDialogMappings(id) {
                var deferred = $q.defer();
                $scope.loadingFlows = true;
                BTStreamsService.getAlertDialogMappings(id)
                    .then(function (res) {
                        var _dialogMappings = $workflowService.cloneData(res.data);
                        triggerTaskLockReleasing();
                        _dialogMappings = _dialogMappings.map(function (mapping) {
                            mapping.sourceResourceName = mapping.sourceResourceName ? builderUtility.textToHtml(mapping.sourceResourceName) : '';
                            mapping.targetResourceName = mapping.targetResourceName ? builderUtility.textToHtml(mapping.targetResourceName) : '';
                            return mapping;
                        });
                        $scope.mappingTasks = $scope.mappingTasks.concat(_dialogMappings);
                        $scope.mappingTasks = flowsUtil.arrangeFlows($scope.mappingTasks);
                        if(taskToresume && taskToresume.resuming && taskToresume.taskType=='flows'){
                            var flowData =  _.find($scope.mappingTasks,{_id:taskToresume.taskId});
                            if(flowData){
                                $scope.editMapping(flowData);
                            }
                            $timeout(function () {
                                taskToresume.resuming = false;
                                $scope.resumingBuilder = false;
                            },5000);// in case somthing fails in tasks or task not found,closing reload frame//
                            }
                        $scope.loadingFlows = false;
                        deferred.resolve(res);
                    });
                return deferred.promise;
            }
            function getAlerts(id) {
                if (!id) {
                    return;
                }
                var deferred = $q.defer();
                $scope.alertTasks = $scope.alertTasks || [];
                $scope.loadingAlerts = true;
                BTAlertsService.getAlerts(id)
                    .then(function (res) {
                        if(typeof(res.data) === 'string'){
                            res.data = [];
                       } 

                        $scope.allAlerts  =  res.data;
                        $scope.alertTasks = $workflowService.cloneData(res.data);
                        mapChildTaskToParentTask($scope.alertTasks,'alertTasks');
                        _tasksCollection.setTasks("alertTasks", res.data);
                        updateBotDetailsOnTaskBasis($scope.alertTasks, "alertTasks");
                        $scope.loadingAlerts = false;
                        deferred.resolve(res); 
                        if($scope.callbacks && $scope.callbacks.prepareGSearchData) {
                            $scope.callbacks.prepareGSearchData();
                        }
                    }, function (err) {
                        if (+err.status === 403) {
                            deferred.resolve({data: []});
                        } else {
                            NotificationService.notify(i18n.i18nString('alerts_loading'), "error");
                            $scope.alertTasks = [];
                        }
                    });

                return deferred.promise;
            }

            function filterDeleted(tasks){
                if($scope.botDetails.streamState === 'indevelopment'){
                   tasks =  _.filter(tasks,function(task){
                         if(!task.isDeleted){
                            return task;
                        }

                    });
                }
                return tasks;
            }


            var updateBotDetailsOnTaskBasis = function (tasks, taskType, prepareOrUpdateMaps) {
                var hasPublishedTask = false;
                $rootScope.hasPublishedAlerts = _.find(tasks, function (task) {
                    return (task.state == 'published' || task.state == 'awaitingApproval');
                }) && true;
                canAccessService();
                var _tempTasksList;
                if(prepareOrUpdateMaps){
                 _tempTasksList = filterDeleted(mapChildTaskToParentTask(tasks,taskType));
                }else{
                 _tempTasksList = filterDeleted(mapChildTaskToParentTask(tasks));
                }
                isInMarket(_tempTasksList);
                $workflowService[taskType](_tempTasksList);
                triggerTaskLockReleasing();
            };

            

            var insertOrUpdateTaskDestroy= $rootScope.$on("insertOrUpdateTask", function (event, taskType, taskObject, isNewTask) {
                if (taskType === "flowTask") {
                    $scope.workingTaskType = "";
                }
                $scope.updateTasks(taskType, taskObject, isNewTask);
            });


            $scope.updateTasks = function (taskType, taskObject, isNewTask) {
                $rootScope.$broadcast('reloadTasks', taskType);
                $scope.$broadcast("resetCreateConditions");
            };

            function fetchSmallTalkData(){
                 BTStreamsService.getSmallTalk($scope.stream._id).then(function(response){
                        $scope.smallTalkData = response.data;
                        angular.forEach($scope.smallTalkData,function(task){
                            if(task && task.state === 'published' && task.isDeleted){
                                $scope.deletedTaskList = $scope.deletedTaskList.concat({'taskName':task.name,'type':'Small Talk','language':task.language,'_id':'smallTalk'});
                            }
                            if(task && task.state === 'published' && task.isDeletedNodes){
                                $scope.deletedSmallTalkNodes.push(task);
                            }
                        });
                    });
            }


            var reloadAppsEvent  = $scope.$on('reloadTasks', function (evt, type) {
                if (type == 'alert') {
                    getAlerts($workflowService.selectedStream()._id);
                } else if (type == 'action' || type == 'report') {
                    getActions($workflowService.selectedStream()._id);
                } else if (type == 'knowledgeTask') {
                    getKnowledgeTasks($workflowService.selectedStream()._id);
                }  else if (type == 'uiForms') {
                    getForms($workflowService.selectedStream()._id);
                } else if (type == 'flowTask') {
                    getFlowTasks($workflowService.selectedStream()._id).then(function(){
                        prepareDefautDialogData($scope.dialogTasks);
                    });
                }
            });
            var upadteTaskDataEvent = $scope.$on('upadteTaskData', function (evt, type,upgradedTask) {
                if (type == 'alert') {
                    $scope.alertTasks.push(upgradedTask);
                    $scope.alertTasks = $workflowService.cloneData($scope.alertTasks);
                        _tasksCollection.setTasks("alertTasks", $scope.alertTasks);
                        updateBotDetailsOnTaskBasis($scope.alertTasks, "alertTasks");
                } else if (type == 'action' || type == 'report') {
                    var actions = $scope.informationTasks.concat($scope.actionTasks);
                     actions.push(actions);
                     actions = $workflowService.cloneData(actions);
                    var _actionTasks = [], _informationTasks = [];
                    actions.map(function (val) {
                        if (val.isReport) {
                            _informationTasks.push(val);
                        } else {
                            _actionTasks.push(val);
                        }
                    });
                    $scope.informationTasks = _informationTasks;
                    $workflowService.informationTasks($scope.informationTasks);
                    $scope.actionTasks = _actionTasks;
                    updateBotDetailsOnTaskBasis(actions, "actionTasks");
                } else if (type == 'knowledgeTask') {
                        $scope.knowledgeTasks.push(upgradedTask);
                        $scope.knowledgeTasks = $workflowService.cloneData($scope.knowledgeTasks);
                        updateBotDetailsOnTaskBasis($scope.knowledgeTasks, "knowledgeTasks");
                } else if (type == 'flowTask') {
                    if(!$scope.dialogTasks){
                        $scope.dialogTasks = [];
                    }
                        $scope.dialogTasks.push(upgradedTask);
                        mapChildTaskToParentTask($workflowService.cloneData($scope.dialogTasks), "dialogTasks");
                        prepareDefautDialogData($scope.dialogTasks);
                }
            });
            $scope.isNotAParentOf = function (mapping) {
                return !mapping.parentOf;
            };

            function getActions(id) {
                if (!id) {
                    return;
                }
                var deferred = $q.defer();
                $scope.informationTasks = $scope.informationTasks || [];
                $scope.actionTasks = $scope.actionTasks || [];
               
                $scope.loadingActions = true;
                BTActionsService.getActions(id)
                    .then(function (res) {
                        $scope.allActions = res.data;
                        var actions = res.data;
                        if(typeof(res.data) === 'string'){
                            res.data = [];
                       } 
                    
                        var _actionTasks = [], _informationTasks = [];
                        actions.map(function (val) {
                            if (val.isReport) {
                                _informationTasks.push(val);
                            } else {
                                _actionTasks.push(val);
                            }
                        });
                        $scope.informationTasks = _informationTasks;
                         mapChildTaskToParentTask($scope.informationTasks,'informationTasks');
                        $workflowService.informationTasks($scope.informationTasks);
                        $scope.actionTasks = _actionTasks;
                        mapChildTaskToParentTask($scope.actionTasks,'actionTasks');
                        updateBotDetailsOnTaskBasis(actions, "actionTasks");
                        deferred.resolve(res);
                        $scope.loadingActions = false;     
                        if($scope.callbacks && $scope.callbacks.prepareGSearchData) {
                            $scope.callbacks.prepareGSearchData();
                        }
                    }, function (error) {
                        if (+error.status === 403) {
                            deferred.resolve({data: []});
                        } else {
                            // NotificationService.notify(i18n.i18nString('actions_loading'), "error");
                            $scope.actionTasks = [];
                            $scope.informationTasks = [];
                        }
                    });
                return deferred.promise;
            }
            getActions($workflowService.selectedStream()._id);
            function convertToString(approvedLanguages) {
                if (!approvedLanguages || !approvedLanguages.length) {
                    return "";
                }
                return approvedLanguages.length <= 2 ? approvedLanguages.join(", ") : approvedLanguages[0] + ", " + approvedLanguages[1] + "<span class='ovalcountcircle'>+" + (approvedLanguages.length - 2) + "</span>";
            }
            function prepareDefautDialogData(dialogs){
                $scope.defaultDailogdata= $workflowService.cloneData(dialogs) || [];
                 $.each(dialogs, function (i, dailog) {
                if(dailog.child && dailog.child.length){
                            $.each(dailog.child, function (i, child) {
                            $scope.defaultDailogdata.push(child);
                        });
                    }
                });


//                $scope.defaultDialogs.map(function (dialog) {
//                            dialog.approvedLanguages = $workflowService.cloneData(dialog.approvedLanguagesCopy);
//                            dialog.approvedLangString = convertToString(dialog.approvedLanguages);
//                            if (dialog._selected) {
//                                if ($scope.streamPublishInfo.published) {
//                                    dialog.namespaceTo = $scope.streamPublishInfo.visibility && $scope.streamPublishInfo.visibility.namespace;
//                                }
//                                $scope.tasks.push($workflowService.cloneData(dialog));
//                            }
//                        });
               
                $scope.defaultDialogs = $scope.defaultDailogdata.filter(function (dialog) {
                                    dialog.supportedLanguages = _.map(_.union($scope.stream.supportedLanguages, (dialog.approvedLanguages || [])), function (each){
                                        // return {selected: true, value: each};
                                        var slObject = {};
                                        dialog.approvedLanguages = dialog.approvedLanguages || [];
                                        if(dialog && dialog.approvedLanguages && dialog.approvedLanguages.length ===  0){
                                            slObject.selected = true;
                                        }
                                        else{
                                            slObject.selected = false;
                                        }
                                        if(_.indexOf(dialog.approvedLanguages, each) !== -1){
                                            slObject.selected = true;
                                            slObject.disable = true;
                                        }

                                         slObject.value =  each;

                                        return slObject;
                                    });

                                    dialog.supportedLanguages = _.sortBy(dialog.supportedLanguages, 'selected');
                                    if(dialog.supportedLanguages && dialog.supportedLanguages.length ===  1){

                                           dialog.supportedLanguages[0].disable = true;
                                        }

                                    dialog.approvedLanguagesCopy = [];
                                    dialog.supportedLanguages = dialog.supportedLanguages || [];
                                    _.map(dialog.supportedLanguages, function (lang){
                                         if(lang.selected){
                                             dialog.approvedLanguagesCopy.push(lang.value);
                                            }
                                    });
                                    dialog.approvedLanguages = $workflowService.cloneData(dialog.approvedLanguagesCopy);
                                    dialog.approvedLangString = convertToString(dialog.approvedLanguagesCopy);
                                    return dialog.state === "configured" || dialog.state === "rejected";
                                });
                                //check for unpublished
                                if ($scope.stream.visibility && $scope.stream.visibility.namespace === 'private') {
                                    $scope.firstDefaultDialogPubish=true;
                                    if ($scope.defaultDialogs && $scope.defaultDialogs.length) {
                                        $scope.defaultDialogs[0]._selected = true;
                                    }
                                }
            }
            function getDialogTasks(id, taskId) {
                var allDialogTasks = [];
                if (!allDialogTasks.length) {
                    BTFlowtaskService.getFlowtaks(id)
                        .then(function (res) {
                            if (res && res.data) {
                                allDialogTasks = res.data;
                                _.forEach(allDialogTasks, function (task) {
                                    if (task.refId && task.refId === taskId) {
                                        $scope.task_name = task.name;
                                        $scope.showProTipDefaultDialog = true;
                                    }
                                });
                            }
                        }, function (err) {

                        });
                }
            }
            function prepareEventTasks(){
                $scope.eventLinkedTasks = {};
              var events =  $workflowService.selectedStream().botEvents;
              if(events && Object.keys(events).length) {
                $.each(events,function(event,value) {
                    if(value && value.task) {
                        $scope.eventLinkedTasks[value.task] = true; 
                    }
                });
              }
            }
            function getFlowTasks(id) {
                prepareEventTasks();
                var deferred = $q.defer();
                $scope.dialogTasks = $scope.dialogTasks || [];
                BTFlowtaskService.getFlowtaks(id)
                    .then(function (res) {
                  if(typeof(res.data) === 'string'){
                            res.data = [];
                        }
                           var dialogTasks = [];
                           try {
                            $scope.dialogTasks = JSON.parse(JSON.stringify(res.data));
                            dialogTasks = JSON.parse(JSON.stringify(res.data));
                           } catch (err){
                            $scope.dialogTasks = res.data;
                           }
                        mapChildTaskToParentTask($scope.dialogTasks,'dialogTasks');
                        $workflowService.dialogTasks(mapChildTaskToParentTask(dialogTasks));
                        $workflowService.dialogTasksByState($scope.dialogTasksByState);
                        updateBotDetailsOnTaskBasis($scope.dialogTasks, "dialogTasks");
                        $scope.showProTipDefaultDialog = false;
                        if ($workflowService.selectedStream() && $workflowService.selectedStream().botEvents && $workflowService.selectedStream().botEvents["INTENT_UNIDENTIFIED"]) {
                            $scope.botEventsIntent = $workflowService.selectedStream().botEvents["INTENT_UNIDENTIFIED"];
                            var allBots = [];
                            if($scope.botEventsIntent.linkedBotStreamId){
                                getDialogTasks($scope.botEventsIntent.linkedBotStreamId, $scope.botEventsIntent.task);
                            }
                            if($workflowService.selectedStream().configuredBots && $workflowService.selectedStream().configuredBots.length){
                            allBots.push($workflowService.selectedStream().configuredBots);
                            }
                            if($workflowService.selectedStream().publishedBots && $workflowService.selectedStream().publishedBots.length){
                            allBots.push($workflowService.selectedStream().publishedBots);
                            }
                            _.forEach(allBots, function (allBot) {
                                _.forEach(allBot, function (bot) {
                                    if (bot._id === $scope.botEventsIntent.linkedBotStreamId) {
                                        $scope.linkedbot_name = bot.botName;
                                        $scope.showProTipDefaultDialog = true;
                                    }
                                });
                            });
                        }
                        deferred.resolve(res); 
                        $scope.getLicenseInfo();
                    }, function (err) {
                            if (err.status === 403) {
                                deferred.resolve({data: []});
                            } else {
                                $scope.dialogTasks = [];
                            } 
                    });
                return deferred.promise;
            }

            function getKnowledgeTasks() {
                var deferred = $q.defer();
                $scope.knowledgeTasks = $scope.knowledgeTasks || [];
                $scope.loadingKnowledge = true;
                $scope.kgHistApi();
                var requestData = { "streamId": $workflowService.selectedStream()._id };
                BTStreamsService.getAllKtsList(_userInfo.userId, requestData)
                .then(function (res) {
                        if(typeof(res.data) === 'string'){
                            res.data = [];
                       }
                       $workflowService.knowledgeTasks(res.data);
                       $scope.botDetailsCb.knowledgetasksList =   res.data;
                       $scope.knowledgeTasks = res.data;
                       if($workflowService.storeSearchQry().userSearchQueryFlag) {
                        $workflowService.taskEditInfo(res.data[0]);
                        var botState = $scope.botDetails.streamState || $workflowService.selectedStreamState();
                        if(botState=="indevelopment"){
                            botState = 'configured';  
                        }
                        identified_task=_.find($scope.knowledgeTasks,{state:botState});
                            if(identified_task){
                                if(botState=='configured'){
                                        $scope.callbacks.editWorkflow(identified_task,'knowledgeTask');
                                }
                                if(botState=='published'){
                                    $scope.callbacks.viewWorkflow(identified_task,'knowledgeTask');
                                }
                            }
                            
                       }

                        // mapChildTaskToParentTask($scope.knowledgeTasks,'knowledgeTasks');
                        updateBotDetailsOnTaskBasis($scope.knowledgeTasks, "knowledgeTasks",true);
                        $scope.loadingKnowledge = false;
                        deferred.resolve(res);
                        $scope.ontologyView = false;
                        $timeout(function(){
                            attachPopover();
                        }, 100);

                        // $scope.knowledgeExtractCallback.knowledgeTaskShare = $workflowService.cloneData($scope.knowledgeTasks); // did not find any referance in project using this scope value // 
                    }, function (err) {
                            if (+err.status === 403) {
                                deferred.resolve({data: []});
                            } else {
                                NotificationService.notify(i18n.i18nString('kg_laoding'), "error");
                                $scope.knowledgeTasks = [];
                                $scope.loadingKnowledge = false;
                            }
                    });
                return deferred.promise;
            }
            $scope.scenes = [];
            function getScenes(id){
                if (!id) {
                    return;
                }
                var deferred = $q.defer();
                $scope.loadingScenes =  true;
                BTStreamsService.getScenes(id).then(function (res) {
                    $scope.scenes = _.filter(res.data.scenes,function(scene){
                        return !scene.dialogRefId;
                    });
                    $scope.loadingScenes =  false;
                    deferred.resolve(res);
                },function(err){
                    deferred.reject(err);
                    $scope.loadingScenes =  false;
                });
                return deferred.promise;
            }
            $scope.getKnowledgeTasks = getKnowledgeTasks;
            
            $scope.botDetailsCb.getKnowledgeTasksOnto = function() {
                getKnowledgeTasks();
            };

            $scope.knowledgeExtractCallback.getKgTasksOnto = function() {
                getKnowledgeTasks();
            };

            $scope.kgExtNewCallback.getKnowledgeTasksKgOnto = function() {
                getKnowledgeTasks();
            };

             $scope.importOnto = function(e){
                e.preventDefault();
                e.stopPropagation();
               
                if($scope.knowledgeTasks && $scope.knowledgeTasks.length){
                   getNodesLockStatus($scope.importModal.openModal, true); 
                }else{
                    $scope.importModal.openModal();
                }
                
              };
      $scope.botDetailsCb.exportOntology = function (fileType) {
        function startExport(){
        var payload = {
            "exportType": fileType,
            "streamId": $workflowService.selectedStream()._id,
            "knowledgeTaskId": $scope.knowledgeTasksByState[0]._id,
            "getFileId":true
          };
          var eventInfo = {
            "Level":"Engagement L2",
            "Category":"Engagement L2",
            "Sub Category":"Conversation - Knowledge Graph",
            "Knowledge export source":(fileType || '').replace('.','').toUpperCase(),
          };
          mixPanel.postEvent('Conversation - Knowledge graph exported',eventInfo);
          var fileName = getTextEncoded($workflowService.selectedStream().name);
          botOntologyService.exportOntology(_userInfo.userId, payload).then(function (res) {
            NotificationService.notify(i18n.i18nString('kg_export'),"success");
            $rootScope.$broadcast('getProgressDockStatus');
            $timeout(function(){
                $scope.$broadcast('startTimer');
            },300);
            // var data = fileType === "json" ? JSON.stringify(res.data) : res.data;
            // writeAndDownloadOntology(fileName + "." + fileType, data);
          }, function (err) {
            if (err && err.data && err.data.errors[0]) {
                if(err.data.errors[0].code == 403){
                    NotificationService.notify(err.data.errors[0].msg, "error");
                }else{
                    NotificationService.notify(i18n.i18nString('kg_failure'), "error");
                }
              
            }
          });
  
          $('.rightOptions .dropdown').removeClass('open');
        }
       
     function cancleExport(){
         return;
     }
     function checkBoxCb(checkValue){
       console.log(checkValue);
       $scope._constants_.updateDownloadPopUppreferance(checkValue);
     }
     if($scope.stream && $scope.stream.confidenceConfigs && $scope.stream.confidenceConfigs[1] && $scope.stream.confidenceConfigs[1]['useBotSynonyms']){
             $scope.fileType = fileType;
             $element.find('#kgExportConfirmation').removeClass('fade').addClass('show');
     }else{
          if($scope._constants_.config.showDownloadPopUps){
          NotificationService.userConfirm($scope._constants_.downloadPopUpMsg, [startExport, cancleExport], {okText:i18n.i18nString('confirm') ,checkBox:{'enable':true,'checkBoxCb':checkBoxCb}}, "", undefined,i18n.i18nString('export_kg'));  
         }else{
            startExport();
         }
     }
   

      };
      $scope.closeKgConfirmation = function(){
          function startExport(){
        var payload = {
            "exportType": $scope.fileType,
            "streamId": $workflowService.selectedStream()._id,
            "knowledgeTaskId": $scope.knowledgeTasksByState[0]._id,
            "getFileId":true
          };
          var fileName = getTextEncoded($workflowService.selectedStream().name);
          botOntologyService.exportOntology(_userInfo.userId, payload).then(function (res) {
            NotificationService.notify(i18n.i18nString('kg_export'),"success");
            $rootScope.$broadcast('getProgressDockStatus');
            $timeout(function(){
                $scope.$broadcast('startTimer');
            },300);
            // var data = fileType === "json" ? JSON.stringify(res.data) : res.data;
            // writeAndDownloadOntology(fileName + "." + fileType, data);
          }, function (err) {
            if (err && err.data && err.data.errors[0]) {
                if(err.data.errors[0].code == 403){
                    NotificationService.notify(err.data.errors[0].msg, "error");
                }else{
                    NotificationService.notify(i18n.i18nString('kg_failure'), "error");
                }
              
            }
          });
  
          $('.rightOptions .dropdown').removeClass('open');
        }
       
     function cancleExport(){
         return;
     }
     function checkBoxCb(checkValue){
       console.log(checkValue);
       $scope._constants_.updateDownloadPopUppreferance(checkValue);
     }
         $element.find('#kgExportConfirmation').removeClass('show').addClass('fade');
         if($scope._constants_.config.showDownloadPopUps){
              NotificationService.userConfirm($scope._constants_.downloadPopUpMsg, [startExport, cancleExport], {okText: i18n.i18nString('confirm'),checkBox:{'enable':true,'checkBoxCb':checkBoxCb}}, "", undefined,i18n.i18nString('export_kg'));  
             }else{
                startExport();
             }
      };
     

      $scope.showHideExp = function() { 
        if($('.knowledgeCollection .taskCount') && $('.knowledgeCollection .taskCount')[0] && $('.knowledgeCollection .taskCount')[0].innerText.match(/\d+/) !== null) {
            return Number($('.knowledgeCollection .taskCount')[0].innerText.match(/\d+/)[0]) > 0;
        }
        else {
            return false;
        }
      };


      function writeAndDownloadOntology(filename, data) {

        if (navigator.msSaveBlob) {
          var blob = new Blob([data], { type: 'data:text/plain;charset=utf-8' });
          return window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          var element = document.createElement('a');
          element.setAttribute('href', 'data:application/' + filename.split(".")[1] + ';charset=utf-8,' + encodeURIComponent(data));
          element.setAttribute('download', filename);

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
        }
      }

      function getNodesLockStatus(callbackMethod, showToast){
        botOntologyService.getNodesLockStatus(_userInfo.userId, $scope.knowledgeTasksByState[0]._id)
        .then(function(res){
              var values = _.values(res.data);
              var isResourceLocked = _.indexOf(values, true) !== -1 ? true : false;
              if(isResourceLocked){
                if(showToast){
                  NotificationService.notify(i18n.i18nString('nodes_lock_status'), "error");
                }else{
                  NotificationService.confirmDialog(i18n.i18nString('nodes_lock_status'), $scope.getKTData, { okText: i18n.i18nString('ok'), noCancelBtn: true });
                }
              }else{
                callbackMethod();
              }
        }, function(err){


        });
      }
              $scope.mapTasksBasedOnState= function() {
                $scope.dialogTasksByState = $scope.sortedDailogData[$scope.botDetails.streamState];
                $scope.alertTasksByState = $scope.sortedAlertsData[$scope.botDetails.streamState];
                $scope.actionTasksByState = $scope.sortedActionData[$scope.botDetails.streamState];
                $scope.informationTasksByState =$scope.sortedInformationData[$scope.botDetails.streamState];
                $scope.knowledgeTasksByState = $scope.sortedKGData[$scope.botDetails.streamState];
                $scope.uiFormsByState = $scope.sortedUiFormsData[$scope.botDetails.streamState];
                updateKgCounts();
                $workflowService.dialogTasksByState($scope.dialogTasksByState); // for internal dialog switching //
            };
            var taskToresume={};
            if( $scope.resumingBuilder && $scope.botDetails && $scope.botDetails.builderState && $scope.botDetails.builderState.selectedTaskId){
                if($scope.botDetails.builderState.selectedTaskId && $scope.botDetails.builderState.selectedTaskType){
                   taskToresume={
                       taskType:  $scope.botDetails.builderState.selectedTaskType,
                       taskId:$scope.botDetails.builderState.selectedTaskId,
                       resuming : $scope.resumingBuilder,
                       taskReloadInProgress:false
                   };
                }else{
                    taskToresume={};
                }
             }else{
                taskToresume={};
             }
            
            function mapChildTaskToParentTask(tasks, type) {

                if (type === 'dialogTasks') {
                    $scope.sortedDailogData = {
                        published: [],
                        indevelopment: []
                    };
                    $scope.sortedConversationDialogs = {
                        published: [],
                        indevelopment: []
                    };
                }
                if (type === 'alertTasks') {
                    $scope.sortedAlertsData = {
                        published: [],
                        indevelopment: []
                    };
                }
                if (type === 'actionTasks') {
                    $scope.sortedActionData = {
                        published: [],
                        indevelopment: []
                    };
                }
                if (type === 'knowledgeTasks') {
                    $scope.sortedKGData = {
                        published: [],
                        indevelopment: []
                    };
                }
                if (type === 'informationTasks') {
                    $scope.sortedInformationData = {
                        published: [],
                        indevelopment: []
                    };
                }
                if(type === 'smallTalk'){
                    $scope.sortedSmallTalkData = {
                        published:[],
                        indevelopment:[]
                    };
                }
                if(type === 'uiForms'){
                    $scope.sortedUiFormsData = {
                        published:[],
                        indevelopment:[]
                    };
                }
                var parentTasks = [];
                var childTasks = [];
                $.each(tasks, function (i, task) {
                       if(taskToresume && taskToresume.resuming  && taskToresume.taskId && !taskToresume.taskReloadInProgress){
                        
                          if(task._id==taskToresume.taskId){
                             taskToresume.taskData = task;
                             if(taskToresume && taskToresume.taskId && taskToresume.taskData ){
                                
                                if ((taskToresume.taskData.state === 'published' || taskToresume.taskData.state === 'suspended' || !taskToresume.taskData.editable) && taskToresume.taskData.taskType !== 'knowledgeTask' ) {
                                    taskToresume.taskReloadInProgress = true;
                                    $scope.viewWorkflow(taskToresume.taskData, taskToresume.taskType);
                                } else if((taskToresume.taskData.state === 'published' || taskToresume.taskData.state === 'suspended') && taskToresume.taskData.taskType == 'knowledgeTask'){
                                    taskToresume.taskReloadInProgress = true;
                                    $scope.viewWorkflow(taskToresume.taskData, taskToresume.taskType);
                                }else{
                                    taskToresume.taskReloadInProgress = true;
                                    $scope.editWorkflow(taskToresume.taskData, taskToresume.taskType);
                                }
                                $timeout(function () {
                                    taskToresume.resuming = false;
                                    $scope.resumingBuilder = false;
                                },5000);// in case somthing fails in tasks or task not found,closing reload frame//
                               }
                          }
                       }
                    if (task && task.name) {
                        task.name = builderUtility.textToHtml(task.name);
                    }
                    if (task && task.shortDesc) {
                        task.shortDesc = builderUtility.textToHtml(task.shortDesc);
                    }

                    if (task.parentId) {
                        childTasks.push(task);
                    } else {
                        parentTasks.push(task);
                    }
                    if ((task.state == "published" && !task.parentId) || task.state == "suspended") {
                        if (type === 'dialogTasks') {
                            $scope.sortedDailogData.published.push(task);
                        }
                        if (type === 'alertTasks') {
                            $scope.sortedAlertsData.published.push(task);
                        }
                        if (type === 'actionTasks') {
                            $scope.sortedActionData.published.push(task);
                        }
                        if (type === 'informationTasks') {
                            $scope.sortedInformationData.published.push(task);
                        }
                        if (type === 'knowledgeTasks') {
                            $scope.sortedKGData.published.push(task);
                        }
                        if(type === 'smallTalk'){
                            $scope.sortedSmallTalkData.published.push(task);
                        }
                        if(type === 'uiForms'){
                            $scope.sortedUiFormsData.published.push(task);
                        }
                    } else { // add task updated in else part if the the task data will always have configured and published copy //
                        if(type === 'uiForms'){
                            $scope.sortedUiFormsData.indevelopment.push(task); 
                        }
                    }
                });
                
               var combinedrray =[];
               combinedrray = childTasks;
               var kgAppend = false;
                parentTasks = parentTasks.map(function (parentTask) {
                    childTasks.map(function (childTask) {
                        if ((parentTask._id === childTask.parentId)) {

                            parentTask.isParent = true;

                            parentTask.child = [];

                            var _childTaskObj = childTask;
                            _childTaskObj.parent = $workflowService.cloneData(parentTask);
                            parentTask.child.push($workflowService.cloneData(_childTaskObj));

                        }
                    });
                    if(!parentTask.isParent && !parentTask.isDeleted){
                        if(type != 'knowledgeTasks') { combinedrray.push(parentTask); }
                        else {
                            if((parentTask.state === 'awaitingApproval' || parentTask.state === 'rejected' || parentTask.state ==='configured') && combinedrray.length === 0) { combinedrray.push(parentTask); }
                            else { kgAppend = true; }
                        } 
                    }
                    return parentTask;
                });
                if (type) {
                    if (type === 'dialogTasks') {

                        $scope.sortedDailogData.indevelopment = combinedrray;
                        $scope.allTasksSortedData[type] = $scope.sortedDailogData;
                        $scope.dialogTasksByState = $scope.sortedDailogData[$scope.botDetails.streamState];
                        $workflowService.dialogTasksByState($scope.sortedDailogData);
                    }
                    if (type === 'alertTasks') {
                        $scope.sortedAlertsData.indevelopment = combinedrray;
                        $scope.allTasksSortedData[type] = $scope.sortedAlertsData;
                        $scope.alertTasksByState = $scope.sortedAlertsData[$scope.botDetails.streamState];
                        $workflowService.alertTasksByState($scope.alertTasksByState);
                    }
                    if (type === 'actionTasks') {
                        $scope.sortedActionData.indevelopment = combinedrray;
                        $scope.allTasksSortedData[type] = $scope.sortedActionData;
                        $scope.actionTasksByState = $scope.sortedActionData[$scope.botDetails.streamState];
                        $workflowService.actionTasksByState($scope.actionTasksByState);
                    }
                    if (type === 'informationTasks') {
                        $scope.sortedInformationData.indevelopment = combinedrray;
                        $scope.allTasksSortedData[type] = $scope.sortedInformationData;
                        $scope.informationTasksByState = $scope.sortedInformationData[$scope.botDetails.streamState];
                        $workflowService.informationTasksByState($scope.informationTasksByState);
                    }
                    if (type === 'knowledgeTasks') {
                        $scope.sortedKGData.indevelopment = combinedrray;
                        $scope.allTasksSortedData[type] = $scope.sortedKGData;
                        $scope.knowledgeTasksByState = $scope.sortedKGData[$scope.botDetails.streamState];
                        $scope.botDetailsCb.knowledgeTasksByState = $scope.knowledgeTasksByState;
                        $workflowService.knowledgeTasksByState($scope.knowledgeTasksByState);
                        updateKgCounts();
                        if(kgAppend && combinedrray.length > 0) { parentTasks.push(combinedrray[0]); }
                    }
                    if (type === 'uiForms') {
                        $scope.allTasksSortedData[type] = $scope.sortedUiFormsData;
                        $scope.uiFormsByState = $scope.sortedUiFormsData[$scope.botDetails.streamState];
                        $workflowService.uiFormsTasksByState($scope.sortedUiFormsData);
                    }
                   
                }
                // if(type === 'dialogTasks'){
                //     prepareConversationDialogs();
                // }
                $workflowService.allTasksSortedData($scope.allTasksSortedData);
                $scope.loadingDialogsTemplate=false;
                return parentTasks;
            }
            function prepareConversationDialogs(){
                var conversationDialogsByState = _.filter($scope.dialogTasksByState,function(dialog){
                    return dialog.sceneRefId;
                });
                var conversationDialogs = _.filter($scope.dialogs,function(dialog){
                    return dialog.sceneRefId;
                });
                $scope.conversationDialogsByState = conversationDialogsByState || [];
                $scope.conversationDialogs = conversationDialogs || [];
            }
            function updateKgCounts() {
                if ($scope.knowledgeTasksByState.length !== 0) {
                    q = $scope.knowledgeTasksByState[0].faqCount;
                    t = $scope.knowledgeTasksByState[0].taxonomy.filter(function(val){
                        return !val.hasOwnProperty('deleted') && !val.deleted;
                    }).length;
                    c = $scope.knowledgeTasksByState[0].traitCount;
                    updateNumbersQTC(q,t,c);   
                }
            }

            var hasUnPublishedNodes = function(task){
                var _hasUnPublishedNodes = true; // ontologywill always hav an configured copy
                var ontologyNodes = task.taxonomy || [];
                var rootNode = _.find(ontologyNodes, function(node){
                            node._selected = true;
                            return (!node.parent || !node.parent.length);
                });
                var primaryNodes = _.filter(ontologyNodes, function(node){
                    node._selected = true;
                    return node.parent && node.parent.length && node.parent[0] == rootNode.nodeId && node.faqCount && !isNodePublished(node,task);
                });

                if((primaryNodes || []).length > 0){
                    _hasUnPublishedNodes = true;
                }

                if(!task.publishRoot && task.faqCount){
                    _hasUnPublishedNodes = true;
                }

                if(!task.faqCount){
                    _hasUnPublishedNodes = false;
                }


                return _hasUnPublishedNodes;
            };


            var isNodePublished = function(term, task){
                var _nodesToPublish = task.nodesToPublish;
                if($.inArray(term.nodeId, _nodesToPublish) !== -1){
                    return true;
                }

                return false;

            };


            $scope.publishViews = {};


            Object.defineProperty($scope.publishViews, 'initialView', {
                get: function () {

                    var value = false;
                    $scope.publishViews.hasPublishedTasks = false;
                    $scope.publishViews.newTasksCount = 0;
                    $scope.publishViews.upgradeCount = 0;
                    $scope.publishViews.message = "";



                    var _allTasks = [].concat($scope.alertTasks || [], $scope.actionTasks || [], $scope.dialogTasks || [], $scope.informationTasks || [], $scope.knowledgeTasks || $scope.knowledgeTasks || $scope.smallTalkTasks || []);


                    _allTasks.map(function (task) {

                        if (task.state === "configured" && !task.hasOwnProperty("taxonomy")) {
                            value = true;
                            $scope.publishViews.newTasksCount++;
                        }

                        if ((task.state === "awaitingApproval" || task.state === "configured") && task.taxonomy && hasUnPublishedNodes(task)) {
                            value = true;
                            $scope.publishViews.newTasksCount++;
                        }

                        if (task.state === "published" || task.state === "awaitingApproval") {
                            $scope.publishViews.hasPublishedTasks = true;
                        }


                        (task.child || [])
                            .map(function (child) {

                                if (child.state === "configured") {
                                    value = true;
                                    $scope.publishViews.upgradeCount++;
                                }

                                if (child.state === "awaitingApproval" && child.taxonomy && hasUnPublishedNodes(child)) {
                                    value = true;
                                    $scope.publishViews.upgradeCount++;
                                }

                                if (child.state === "published" || child.state === "awaitingApproval") {
                                    $scope.publishViews.hasPublishedTasks = true;
                                }

                            });

                    });

                    $scope.publishViews.message = ($scope.publishViews.upgradeCount > 0 || $scope.publishViews.newTasksCount > 0) ?
                        ($scope.publishViews.upgradeCount > 0 && $scope.publishViews.upgradeCount > 0) ?
                            " (" + getSingleorPluralMessage($scope.publishViews.upgradeCount, " upgrade ") +
                            " , " + getSingleorPluralMessage($scope.publishViews.newTasksCount, " new ") + " )"
                            : $scope.publishViews.upgradeCount > 0 ?
                                " (" + getSingleorPluralMessage($scope.publishViews.upgradeCount, " upgrade ") + "  )" : " ( " + getSingleorPluralMessage($scope.publishViews.newTasksCount, " new ") + " )" : "";
                    return !value && $scope.isEligibleForPublishing();

                },
                set: angular.noop,
                enumerable: true,
                configurable: true
            });

            Object.defineProperty($scope.publishViews, 'botPublish', {
                get: function () {
                    return $rootScope.wfAdmin && !$scope.publishViews.initialView && $scope.stream.type !== 'solution' && !$scope.publishViews.hasPublishedTasks;
                },
                set: angular.noop,
                enumerable: true,
                configurable: true
            });

            Object.defineProperty($scope.publishViews, 'solutionBotPublish', {
                get: function () {
                    return !$scope.publishViews.initialView && !$scope.publishViews.botPublish && $scope.isEligibleForPublishing() && $scope.stream.type === 'solution' && $scope.stream.type !== 'sample';
                },
                set: angular.noop,
                enumerable: true,
                configurable: true
            });

            Object.defineProperty($scope.publishViews, 'standardBotPublish', {
                get: function () {
                    return !$scope.publishViews.initialView && !$scope.publishViews.botPublish && $scope.isEligibleForPublishing() && $scope.stream.type !== 'solution' && $scope.stream.type !== 'sample';
                },
                set: angular.noop,
                enumerable: true,
                configurable: true
            });

            Object.defineProperty($scope.publishViews, 'sampleBotPublish', {
                get: function () {
                    return !$scope.publishViews.initialView && $scope.isEligibleForPublishing() && $scope.isWorkFlowAdmin() && $scope.stream.type === 'sample';
                },
                set: angular.noop,
                enumerable: true,
                configurable: true
            });

            function getSingleorPluralMessage(count, type) {
                return count > 1 ? count + " " + type + " tasks" : count + " " + type + " task";
            }

            $scope.isEligibleForPublishing = function () {
                $scope.eligibleForPublishing = $rootScope.isManaged || $rootScope.wfAdmin;
                return $scope.eligibleForPublishing;
            };

            $scope.isWorkFlowAdmin = function () {
                $scope.isWFAdmin = $rootScope.wfAdmin;
                return $scope.isWFAdmin;
            };

            var onTaskEditEvent = $rootScope.$on("onedittask", function (event, entity, type) {
                $scope.editWorkflow(entity, type, "", true);
            });

            var switchDialogTaskEditEvent = $scope.$on("switchDialogTaskEdit", function(evt, editdialogTask, callback){
                 if (!(editdialogTask.state === 'published' || editdialogTask.state === 'suspended')) {
                     $scope.editWorkflow1(editdialogTask, "flowtaskEdit", callback);
                 } else {
                     $scope.viewWorkflow1(editdialogTask, "flowtaskView", callback);
                 }
        		});

            $scope.editWorkflow1 = function (entity, type, callback) {
                $scope.botDetails.streamState =  $workflowService.selectedStreamState();
                $scope.workingTaskType = type;
                $scope.lockTask(entity, prepareTimer, type, callback)
                .then(function (res) {
                    triggerEdit1();
                    callback.success();
                }, function (err) {
                    if(type=='knowledgeTask'){
                        triggerEdit1();
                    }
                });
                function triggerEdit1() {
                    if (type !== "knowledgeTask") {
                        if (type === "flowtaskEdit") {
                            loader = NotificationService.loader(i18n.i18nString('please_wait'));
                        } else {
                            $scope.$emit("showStatusLoader", true);
                        }
                    }
                        loader();
                        NotificationService.removeLoader();
                        entity.taskType = "flowTask";
                        $workflowService.taskEditInfo(entity);
                        $workflowService.flowtaskInfo(entity);
                        entity.editComponentLockInView = true;
                        $workflowService.taskMode("edit");
                }
            };

            $scope.viewWorkflow1 = function (entity, type, callback) {
                $scope.botDetails.streamState =  $workflowService.selectedStreamState();
                    loader = NotificationService.loader(i18n.i18nString('please_wait'));
                    loader();
                    $scope.workingTaskType = type;
                    entity.taskType = "flowTask";
                    entity.editComponentLockInView = true;
                    $workflowService.taskEditInfo(entity);
                    $workflowService.flowtaskInfo(entity);
                    $workflowService.taskMode("view");
                    callback.success();
            };

            $scope.checkDockStatus = function(){
                $scope.progressBridge.cb();
                $scope.progressBridge.timer();
            };

            $scope.editWorkflow = function (entity, type, isFromUpgrade, isFromCreation) {
                if(type==='flowtaskEdit' && entity.sceneRefId && $util.isIE11OrEarlier()){
                    $util.showUnSupportedBrowserWarningForDialog();
                    return false;
                }
                $scope.botDetails.streamState =  $workflowService.selectedStreamState();
                $scope.setUpLocalStorageFortask(type,entity);
                $scope.workingTaskType = type;
                $scope.lockTask(entity, prepareTimer, type)
                .then(function (res) {
                    triggerEdit();
                }, function (err) {
                    if(type=='knowledgeTask'){
                        triggerEdit();
                    }
                });
                function triggerEdit() {
                    if (type !== "knowledgeTask" && !isFromUpgrade) {
                        if (type === "flowtaskEdit" || !isFromCreation) {
                            NotificationService.removeLoader();
                            loader = NotificationService.loader(i18n.i18nString('please_wait'));
                        } else {
                            $scope.$emit("showStatusLoader", true);
                        }

                    }
                    $scope.initiateWorkflowCreation(type, true);
                    if (type === "alert") {
                        $workflowService.alertInfo(entity);
                        $q.all([BTAlertsService.getMPAlert(entity._id), BTAlertsService.getBTAlert(entity._id)]).then(function (res) {
                            $workflowService.alertInfo(res[1].data);
                            res[1].data.taskType = type;
                            $workflowService.taskEditInfo(res[1].data);
                            $workflowService.taskMode("edit");
                            $workflowService.mpAlertInfo(res[0].data);
                            $workflowService.currentStep(3);
                            if (!isFromCreation && !$scope.resumingBuilder) {
                                loader();
                            }
                            $scope.$emit("showStatusLoader", false);
                            NotificationService.removeLoader();
                            $timeout(function () {
                                $rootScope.$emit("updateEditTask", true);
                            });
                            $scope.fullModalCallback.openFullPageModal(3);
                        }, function (err) {
                            NotificationService.notify(i18n.i18nString('error_msg'), "error");
                            $workflowService.mpAlertInfo({});
                            $workflowService.alertInfo({});
                            if (!isFromCreation) {
                                loader();
                            }
                            $scope.$emit("showStatusLoader", false);
                            NotificationService.removeLoader();
                        });
                    } else if (type === "action") {
                        $q.all([BTActionsService.getBTAction(entity._id), BTActionsService.getMPAction(entity._id)]).then(function (res) {
                            $workflowService.actionInfo(res[0].data);
                            $workflowService.mpActionInfo(res[1].data);
                            res[0].data.taskType = type;
                            $workflowService.taskEditInfo(res[0].data);
                            $workflowService.taskMode("edit");
                            $workflowService.currentStep(3);
                            if (!isFromCreation && !$scope.resumingBuilder) {
                                loader();
                            }
                            $scope.$emit("showStatusLoader", false);
                            NotificationService.removeLoader();
                            $timeout(function () {
                                $rootScope.$emit("updateEditTask", true);
                            });
                            $scope.fullModalCallback.openFullPageModal(3);
                        }, function (err) {
                            NotificationService.notify(i18n.i18nString('error_msg'), "error");
                            $workflowService.mpActionInfo({});
                            $workflowService.actionInfo({});
                            if (!isFromCreation) {
                                loader();
                            }

                            $scope.$emit("showStatusLoader", false);
                            NotificationService.removeLoader();
                        });
                    } else if (type === "knowledgeTask") {
                        $.each($workflowService.knowledgeTasks(), function (i, knowledge) {
                            if (knowledge._id === entity._id) {

                                // knowledge.taskType = "knowledgeTask";
                                $workflowService.taskEditInfo(knowledge);
                                $workflowService.taskMode("edit");
                                $timeout(function () {
                                    $rootScope.$emit("updateEditTask", true);
                                });
                                // $scope.fullModalCallback.openFullPageModal(3);

                                $scope.openOntologyModel();
                               // $scope.checkDockStatus(); /* uncomment once dock status is required on knowledge collection tab */
                                return;
                            }

                             if(knowledge.child && knowledge.child.length > 0){
                                var childKnowledge = knowledge.child[0];
                                if (childKnowledge._id === entity._id) {

                                    $workflowService.taskEditInfo(childKnowledge);
                                    $workflowService.taskMode("edit");
                                    $timeout(function () {
                                        $rootScope.$emit("updateEditTask", true);
                                    });
                                    $scope.openOntologyModel();
                                    return;
                                }
                            }
                        });
                    } else if (type === "flowtaskEdit") {
                        loader = NotificationService.loader(i18n.i18nString('please_wait'));
                        NotificationService.removeLoader();
                        entity.taskType = "flowTask";
                        $workflowService.taskEditInfo(entity);
                        $workflowService.flowtaskInfo(entity);
                        entity.editComponentLockInView = true;
                        $workflowService.taskMode("edit");
                        $timeout(function () {
                            $rootScope.$emit("updateEditTask", true);
                        });
                        $scope.fullModalCallback.openFullPageModal(3);
                        var _botInfo = {
                            "streamId":$workflowService.selectedStream()._id,
                            "BotName":$workflowService.selectedStream().name,
                            "BotLanguage":$workflowService.currentLanguage(),
                            "Dialog Name":entity.name,
                            "Dialog Version":(entity && entity.sceneRefId)?'V2':'V1',
                            "Category":"Engagement L1",
                            "Sub Category":"Conversation - Dialog Task",
                            "Event Description":"New dialog task is created using the old Dialog Builder",
                            "Level":"Engagement L1",
                            "Dialog source":"Modify"
                         };
                         mixPanel.postEvent('Conversation - Initiate Dialog Task',_botInfo);
                    } 

                }

            };
            $scope.openuiForms = function(formData,mode){
                 $scope.formEdit = formData;
                 $workflowService.taskEditInfo(formData);
                 if(mode==='testFlow'){
                    $scope.fullModalCallback.openFullPageModal(null,'uiFormsTest',null);
                 }else if(mode==='branding'){
                    $scope.fullModalCallback.openFullPageModal(null,'uiFormsBranding',null);
                 }else{
                    $scope.fullModalCallback.openFullPageModal(null,'uiForms',null);
                 }
            };
            //cloning dialog //
            $scope.flowTaskToClone = null;
            $scope.cloneThisDialog = function(){
                $scope.savingdialogtask=true;
                var cloneCallback = function(){
                 $scope.cancelCloning();
                };
                if($scope.cloneDialog){ // can be removed later //
                    $scope.cloneDialog(cloneCallback,$scope.flowTaskToClone);
                }else if($scope.callbacks.cloneDialog){
                    $scope.callbacks.cloneDialog(cloneCallback,$scope.flowTaskToClone);
                }
            };
            $scope.openCloneDialogModel = function (flowtask){
                $scope.savingdialogtask=false;
                 $scope.flowTaskToClone = {
                    _id:flowtask._id
                 };
                 $timeout(function() {
                    $scope.modalSlider.open("#dialogCreate");
                }, 500);
            };
            $scope.cancelCloning = function(){
                $scope.modalSlider.close("#dialogCreate");
                $timeout(function() {
                    $scope.flowTaskToClone = null;
                }, 500);  
            };
             //cloning dialog //
            $scope.callbacks.checkForLoggerInstance = function(formtype){
                $scope.formtype = formtype;
                $('#recordInProgress').modal('show');
                return;
            };
           $scope.setUpLocalStorageFortask =function(type,task){
            var localPath = window.localStorage.getItem("previousState");
            localPath = JSON.parse(localPath);
            if(localPath){
                localPath.selectedTaskType = type;
                localPath.selectedTaskId = task._id;
                window.localStorage.setItem("previousState",JSON.stringify(localPath));
            }
           };
             $scope.viewWorkflow = function (entity, type , locked) {
                if(type==='flowtaskView' && entity.sceneRefId && $util.isIE11OrEarlier()){
                    $util.showUnSupportedBrowserWarningForDialog();
                    return false;
                }
                $scope.botDetails.streamState =  $workflowService.selectedStreamState();
                $scope.setUpLocalStorageFortask(type,entity);
                  if($('body').find('.kore-chat-window').length > 0 && type === 'flowtaskView'){
                    if(_loggerInstance && _loggerInstance.isRecording){
                        $scope.callbacks.checkForLoggerInstance();
                        $scope.taskInfo = entity;
                        $scope.taskAction = type;
                        $scope.label = "viewworkflow";
                        return;
                    }
                }

                if (type !== "knowledgeTask") {
                    NotificationService.removeLoader();
                    loader = NotificationService.loader(i18n.i18nString('please_wait'));
                }
                $scope.initiateWorkflowCreation(type, true);
                if (type === "alert") {
                    $workflowService.alertInfo(entity);
                    $q.all([BTAlertsService.getMPAlert(entity._id), BTAlertsService.getBTAlert(entity._id)]).then(function (res) {
                        $workflowService.mpAlertInfo(res[0].data);
                        $workflowService.alertInfo(res[1].data);
                        res[1].data.taskType = type;
                        $workflowService.taskEditInfo(res[1].data);
                        $workflowService.taskMode("view");
                        $workflowService.currentStep(3);
                        loader();
                        $timeout(function () {
                            $rootScope.$emit("updateEditTask", true);
                        });

                        $scope.fullModalCallback.openFullPageModal(3);
                    }, function (err) {
                        NotificationService.notify(i18n.i18nString('error_msg'), "error");
                        $workflowService.mpAlertInfo({});
                        $workflowService.alertInfo({});
                        loader();
                    });
                } else if (type === "action" || type === "report") {
                    $q.all([BTActionsService.getBTAction(entity._id), BTActionsService.getMPAction(entity._id)]).then(function (res) {
                        $workflowService.actionInfo(res[0].data);
                        $workflowService.mpActionInfo(res[1].data);
                        res[0].data.taskType = type;
                        $workflowService.taskEditInfo(res[0].data);
                        $workflowService.taskMode("view");
                        $workflowService.currentStep(3);
                        loader();
                        $timeout(function () {
                            $rootScope.$emit("updateEditTask", true);
                        });

                        $scope.fullModalCallback.openFullPageModal(3);
                    }, function (err) {
                        NotificationService.notiy(i18n.i18nString('error_msg'), "error");
                        $workflowService.mpActionInfo({});
                        $workflowService.actionInfo({});
                        loader();
                    });
                } else if (type === "knowledgeTask") {

                    // $.each($workflowService.knowledgeTasks(), function (i, knowledge) {
                    //     if (knowledge._id === entity._id) {

                    //         knowledge.taskType = "knowledgeTask";
                    //         $workflowService.taskEditInfo(knowledge);
                    //         $workflowService.taskMode("view");
                    //         $timeout(function () {
                    //             $rootScope.$emit("updateEditTask", true);
                    //         });

                    //         $scope.fullModalCallback.openFullPageModal(3);
                    //     }
                    // });

                     $.each($workflowService.knowledgeTasks(), function (i, knowledge) {
                            if (knowledge._id === entity._id) {

                                $workflowService.taskEditInfo(knowledge);
                                $workflowService.taskMode("view");
                                $timeout(function () {
                                    $rootScope.$emit("updateEditTask", true);
                                });
                                $scope.openOntologyModel();
                                return;
                            }

                            if(knowledge.child && knowledge.child.length > 0){
                                var childKnowledge = knowledge.child[0];
                                if (childKnowledge._id === entity._id) {

                                    $workflowService.taskEditInfo(childKnowledge);
                                    $workflowService.taskMode("view");
                                    $timeout(function () {
                                        $rootScope.$emit("updateEditTask", true);
                                    });
                                    $scope.openOntologyModel();
                                    return;
                                }
                            }
                        });

                }
                else if (type === "flowtaskView") {
                    loader();
                    $scope.workingTaskType = type;
                    $workflowService.flowtaskInfo(entity);
                    entity.taskType = "flowTask";
                    if(locked){
                     entity.editComponentLockInView = true;
                    }else{
                     entity.editComponentLockInView = false;
                    }
                    $workflowService.taskEditInfo(entity);
                    $workflowService.flowtaskInfo(entity);
                    $workflowService.taskMode("view");
                    $timeout(function () {
                        $rootScope.$emit("updateEditTask", true);
                    });
                    $scope.fullModalCallback.openFullPageModal(3);
                    var _botInfo = {
                        "streamId":$workflowService.selectedStream()._id,
                        "BotName":$workflowService.selectedStream().name,
                        "BotLanguage":$workflowService.currentLanguage(),
                        "Dialog Name":entity.name,
                        "Dialog Version":(entity && entity.sceneRefId)?'V2':'V1',
                        "Category":"Engagement L1",
                        "Sub Category":"Conversation - Dialog Task",
                        "Event Description":"New dialog task is created using the old Dialog Builder",
                        "Level":"Engagement L1",
                        "Dialog source":"View"
                     };
                     mixPanel.postEvent('Conversation - Initiate Dialog Task',_botInfo);
                }
            };

            $scope.recallWorkflow = function (entity, type) {
                    NotificationService.alert(i18n.i18nString('recall_workflow'), recallTask, { okText: i18n.i18nString('continue'), cancelText: i18n.i18nString('cancel')},'',undefined,i18n.i18nString('confirm'));
                    function recallTask() {
                        if (type === "alert") {

                            BTAlertsService.configured(entity._id).then(function (res) {
                                getAlerts($workflowService.selectedStream()._id);
                            }, function (err) {
                                NotificationService.notify(err.data.errors[0].msg, "error");
                            });
                        } else if (type === "action") {

                            BTActionsService.configured(entity._id).then(function (res) {
                                getActions($workflowService.selectedStream()._id);
                            }, function (err) {
                                NotificationService.notify(err.data.errors[0].msg, "error");
                            });
                        }
                        else if (type === "flowtask") {
                            BTFlowtaskService.recallFlowtask($workflowService.selectedStream()._id, entity._id).then(function (res) {
                                getFlowTasks($workflowService.selectedStream()._id);
                                if($workflowService.selectedStream().type==='universalbot'){
                                    $scope.$emit("loadBots",$scope.stream);
                                }
                            }, function (err) {
                                NotificationService.notify(err.data.errors[0].msg, "error");
                            });
                        }
                    }
                };
            $scope.bindNotificationClick =  function(){
                $("#noty_topCenter_layout_container").off('click').on('click','.viewThisTask',function(){
                    $timeout(function(){
                        $('.cancleUserConfirm').click();
                        if($scope.currentUpgradeType === 'dialog'){
                                 $scope.viewWorkflow($scope.currentUpgrade, 'flowtaskView');
                                 $rootScope.$emit("updateEditTask", true);
                            }else{
                            $scope.viewWorkflow($scope.currentUpgrade, $scope.currentUpgradeType);
                        }
                    });
                    
                });
            };
            
            
            
            
            
            $scope.editOrViewWorkflow = function (taskInfo, taskAction) {
                if(taskAction==='dialog' && taskInfo.sceneRefId && $util.isIE11OrEarlier()){
                    $util.showUnSupportedBrowserWarningForDialog();
                    return false;
                }
                $scope.botDetails.streamState =  $workflowService.selectedStreamState();
                if($('body').find('.kore-chat-window').length > 0){
                    if(_loggerInstance && _loggerInstance.isRecording && taskAction !== 'knowledgeTask'){
                    $('#recordInProgress').modal('show');
                    $scope.taskInfo = taskInfo;
                    $scope.taskAction = taskAction;
                    $scope.label = "editworkflow";
                    return;
                    }
                }
                
                
                function upgradeTask(){
                    $scope.upgradeWorkflow(taskInfo, taskAction);
                }
                function cancel(){
                    return;
                }
                if(taskInfo.state==='published' && !taskInfo.parentId && $scope.botDetails.streamState==='indevelopment' && taskInfo.editable){
                    if(taskAction === "dialog"){
                        taskAction = "flowtaskView";
                    }
                    $scope.currentUpgrade = taskInfo;
                    $scope.currentUpgradeType = taskAction;
                    NotificationService.userConfirm(i18n.i18nString('userconfirm_publish')+'</br>'+i18n.i18nString('upgrade_permission')+'</br><br></br><span class="grayInfoText">'+i18n.i18nString('alternatively')+'</br><span class="marginLeft5 bthelpLinksTextcolor pointer-hand viewThisTask">'+i18n.i18nString('view_publish_version')+'</span></span>', [upgradeTask, cancel], {okText: i18n.i18nString('upgrade') ,addHtmlContent:true}, "", undefined, i18n.i18nString('confirm_proceed'));   
                    setTimeout(function(){
                        $scope.bindNotificationClick();
                    },100);
                }else{
                    if (taskAction === "dialog") {
                    if (taskInfo.state === 'published' || taskInfo.state === 'suspended' || !taskInfo.editable) {
                        taskAction = "flowtaskView";
                        $scope.viewWorkflow(taskInfo, taskAction, true);

                    } else {
                        taskAction = "flowtaskEdit";
                        $scope.editWorkflow(taskInfo, taskAction, true);
                    }
                } /*else if (taskAction === "knowledgeTask") {
                    $scope.editWorkflow(taskInfo, taskAction);
                } */else {
                    if ((taskInfo.state === 'published' || taskInfo.state === 'suspended' || !taskInfo.editable) && taskAction !== 'knowledgeTask' ) {
                        $scope.viewWorkflow(taskInfo, taskAction);
                    } else {

                        $scope.editWorkflow(taskInfo, taskAction);
                    }
                }
                }
            };

            $scope.setDisplayTabId = function (id) {
                // fix for minimise sdk
                if ($('.kore-chat-window') && $('.kore-chat-window').length && !$('.kore-chat-window').hasClass('minimize')) {
                    $('.kore-chat-window .minimize-btn').trigger('click');
                }
                if (!$(id).hasClass('in')) {
                    $scope.displayTabId = id;
                } else {
                    $scope.displayTabId = "";
                }

                if (id == '#synonyms' || id == "#patterns") {
                    $scope.displayTabId = id;
                }
            };

            function prepareTimer(timerConfig, entity, taskType) {

                var types = {
                    'a': "action",
                    "l": "alert",
                    "s": "bot",
                    "z": "flow",
                };

                var entityTypes = {
                    'a': "task",
                    "l": "task",
                    "s": "bot",
                    "z": "flow"
                };
                var type = taskType === "knowledgeTask" ? "knowledgeTask" : types[entity._id[0]];
                    type = taskType === "widget" ? "widget" : types[entity._id[0]];
                    type = taskType === "panel" ? "panel" : types[entity._id[0]];
                var config = {};
                var entityType = taskType === "knowledgeTask" ? "task" : entityTypes[entity._id[0]];
                entityType = taskType === "widget" ? "task" : entityTypes[entity._id[0]];
                entityType = taskType === "panel" ? "task" : entityTypes[entity._id[0]];

                config.context = {
                    time: timerConfig.lockCreatedTime,
                    expiry: timerConfig.locktime,
                    task: timerConfig.resourceId,
                    lockkey: timerConfig.lockkey,
                    userId: timerConfig.userId,
                    islocked: timerConfig.islocked,
                    lockCreatedTime: timerConfig.lockCreatedTime
                };

                config.warning = {
                    msg: $scope._constants_.timerMsgs.warning.replace(/{task}/g, entity.name).replace(/{type}/g, entityType),
                    actions: {
                        success: warningSuccessCb,
                        failure: warningCancelCb
                    },
                    arguments: {
                        success: [],
                        failure: []
                    },
                    btnText: {
                        success: i18n.i18nString('extend'),
                        failure: i18n.i18nString('close')
                    }
                };

                config.expiry = {
                    msg: $scope._constants_.timerMsgs.expiry.replace(/{task}/g, entity.name).replace(/{type}/g, entityType),
                    actions: {
                        success: expirySuccessCb,
                        failure: expiryCancelCb
                    },
                    arguments: {
                        success: [],
                        failure: []
                    },
                    btnText: {
                        success: i18n.i18nString('extend'),
                        failure: i18n.i18nString('lang')
                    }
                };

                function warningSuccessCb() {
                    this._stages.expiry = true;
                    entity.lock = entity.lock ? entity.lock : {};
                    entity.lock.locktime = true;
                    $scope.lockTask(entity, prepareTimer);
                }

                function warningCancelCb() { }

                function expirySuccessCb() {
                    this._stages.expiry = true;
                    entity.lock = entity.lock ? entity.lock : {};
                    entity.lock.locktime = true;
                    $scope.lockTask(entity, prepareTimer);
                }

                function expiryCancelCb() {
                    $scope.releaseLock(type, entity);
                }

                return config;

            }

            $scope.initiateWorkflowCreation = function (type, navigate) {

                $workflowService.workflowType(type);
                $workflowService.mpAlertInfo({});
                $workflowService.alertInfo({});
                $workflowService.actionInfo({});
                $workflowService.mpActionInfo({});
                $workflowService.currentStep(3);
                $workflowService.alertData({});
                $workflowService.authData({});
                $workflowService.requestData({});
                $workflowService.responseData({});
                $workflowService.settingsData({});
            };


            $scope.navigateToPage = function (pageId) {
                // fix for minimise sdk
                if ($('.kore-chat-window') && $('.kore-chat-window').length && !$('.kore-chat-window').hasClass('minimize')) {
                    $('.kore-chat-window .minimize-btn').trigger('click');
                }
                switch (pageId) {
                    case 0:
                        $scope.showUtterances();
                        break;
                    case 1:
                        $workflowService.nlpText('');
                        $workflowService.nlpStream($scope.stream);
                        openModalByClass('.wf-form');
                        break;
                    case 2:
                        $workflowService.nlpText('');
                        $workflowService.nlpStream($scope.stream);
                        $location.path(window.appConfig.CONTEXT_PATH + "/patterns/" + $scope.stream._id);
                        break;
                    case 3:
                        openModalByClass('.standard-responses-form');
                        break;
                    case 4:
                        $scope.showBatchTesting();
                        break;
                }
            };

            $scope.openModalByClass = openModalByClass;
            function openModalByClass(modalClass) {
                $(modalClass).modal("show");
            }


            $scope.canShowUtterances = false;
            $scope.showUtterances = function () {
                openModalByClass('.utterances-form');
                $scope.canShowUtterances = true;
            };

            $scope.canShowBatchTesting = false;
            $scope.showBatchTesting = function () {
                openModalByClass(".batchtesting-form");
                $scope.canShowBatchTesting = true;
            };

            $scope.canShowontology = false;

               $scope.$on("openOntology", function(){
                    $scope.openOntologyModel(true);
                });


                $scope.updateSolutionBotSetup = function(value){
                    $scope.showSolutionBotSetup = value;
                };


            $scope.setCurrentTab = function (tabId) {
                $(".myTabs").scrollTop(0);
                $scope.displayTabId = "";
                if ($scope.showSolutionBotSetup && $scope.stream.sbStreamId) {
                    return;
                }
                $scope.navigateTabIndex = tabId;
                $(tabId).addClass("active").siblings().removeClass("active");
                if (tabId === ".settings-pane") {
                    $scope.showSettingsPane = true;
                } else {
                    $scope.showSettingsPane = false;
                }

                $workflowService.navigateTabIndex(tabId);
                // $(".panel-heading").addClass("collapsed");
                // $('.panel-collapse.in').collapse('hide');
                // if (tabId === ".tasks-pane") {
                //     openDialogTaskAccordion();
                // }
                $scope.defaultDialogExpanded = false;
            };
 
            $scope.showTrainBot = function (log) {
                $scope.fullModalCallback.openFullPageModal(3, "trainBot");
                $workflowService.nlpTrainInput({});
            };


            $scope.closeVersionModal = function () {
                $scope.activeTask = null;
                $scope.dialogMode = null;
                closeModalByClass('.version-form');
            };
            $scope.enableOrDisableTryMode = function (mode, accountED, index) {
                //$scope.updateTryMode(!mode);
                if (!mode && $scope.authInfo && (!accountED || !accountED.length || $accountED[0].status !== "active")) {
                    $scope.testIdp(index);
                } else {
                    $scope.updateTryMode(!mode, index);
                }
            };

            $scope.updateTryMode = function (enable, indexParam) {
                var payLoad = {
                    "canTryOut": enable
                };
                BTStreamsService.updateTryMode($scope.stream._id, payLoad).then(function (res) {
                    console.log(res);
                    $scope.isTryModeUpdated = true;
                    $scope.stream.canTryOut = enable;
                }, function (err) {
                    console.log(err);
                });

            };

            function getApps() {
                $scope.loadingApps = true;
                $q.all([AppsDataService.getAppsList($workflowService.selectedStream()._id), AppsDataService.getBotsList()])
                    .then(function (res) {
                        $scope.loadingApps = false;
                        if (res[1] && res[1].data) {
                            $scope.avalSreams = res[1].data;
                            //$scope.apps=[];
                        } else {
                            $scope.avalSreams = [];//Todo has to handle error case
                        }

                        if (res[0] && res[0].data && res[0].data.apps) {
                            $scope.apps = res[0].data.apps;
                            //$scope.apps=[];
                        } else {
                            $scope.apps = [];//Todo has to handle error case
                        }
                    }, function (err) {
                        $scope.loadingApps = false;
                        NotificationService.alertNotify(i18n.i18nString('get_apps'));
                    });
            }

            var appCreatedEvent = $rootScope.$on('app.created', function (event, args) {
                getApps();
            });

            var appUpdatedEvent =  $rootScope.$on('app.updated', function (event, args) {
                getApps();
            });

            $scope.triggerAppCreation = function triggerAppCreation() {
                $scope.selectView('apps');
                $scope.createApp();
            };

            $scope.createApp = function () {


                $modal.open({
                    templateUrl: window.appConfig.TMPLT_PRE_PATH + 'js/modules/bt-app-create/bt-app-create.html',
                    controller: 'BTAppCreateCtrl',
                    windowClass: 'modal-kr',
                    resolve: {
                        avalSreams: function () {
                            return $scope.avalSreams;
                        }, config: function () {
                            return { type: 'Create' };
                        }
                    }
                });

            };
            $scope.editApp = function (app) {
                $modal.open({
                    templateUrl: window.appConfig.TMPLT_PRE_PATH + 'js/modules/bt-app-create/bt-app-create.html',
                    controller: 'BTAppCreateCtrl',
                    windowClass: 'modal-kr',
                    resolve: {
                        avalSreams: function () {
                            return $scope.avalSreams;
                        }, config: function () {
                            return {
                                type: 'Edit',
                                app: app
                            };
                        }
                    }
                });

            };

            $scope.viewApp = function (app) {
                $modal.open({
                    templateUrl: window.appConfig.TMPLT_PRE_PATH + 'js/modules/bt-app-view/bt-app-view.html',
                    controller: 'BTAppViewCtrl',
                    windowClass: 'modal-kr',
                    resolve: {
                        config: function () {
                            return {
                                type: 'View',
                                app: app
                            };
                        }
                    }
                });

            };

            $scope.deleteApp = function (app) {

                function deleteAppRequest() {
                    var svcname = 'bt.apps.delete';
                    if ($applicationService.userInfo().appControls && $applicationService.userInfo().appControls.isManaged) {
                        svcname = 'bt.org.apps.delete';
                    }
                    $translator.translate(svcname, { appId: app.clientId ,streamId:$workflowService.selectedStream()._id}, {}).then(
                        function (res) {
                            if (res && res.status === 200) {
                                getApps();
                                NotificationService.notify(i18n.i18nString('app_deleted'), 'success', 1500);
                            } else {
                                // alert(i18n.i18nString('error_alert'));
                                NotificationService.notify(i18n.i18nString('error_alert'),'error');
                            }

                        }, function (errRes) {
                            // alert(i18n.i18nString('error_alert'));
                            if(errRes && errRes.data && errRes.data.errors.length){
                                NotificationService.notify( errRes.data.errors[0].msg, 'error');
                         }else{
                            NotificationService.notify(i18n.i18nString('error_alert'),'error');
                         }
                        }
                    );
                }

                NotificationService.alert(i18n.i18nString('delete_app_desc'),
                    deleteAppRequest, [true],'',undefined,i18n.i18nString('confirm'));

            };

            function closeModalByClass(modalClass) {
                $timeout(function () {
                    if (!isEleVisible("#termsConditions")) {
                        $("body").removeClass("modal-open");
                    }
                    builderUtility.rmBTModalOpenClass();
                });
                $(modalClass).modal('hide');
                if (modalClass === '.utterances-form') {
                    $(document).off("click.entity");
                    $scope.canShowUtterances = false;
                }
                if (modalClass === '.batchtesting-form') {
                    $scope.canShowBatchTesting = false;
                }

                if (modalClass === '.ontology-form') {
                    $rootScope.$emit('restrictSideHover', true);
                    $scope.canShowontology = false;
                    $("body").removeClass("ontologymodalopen");
                    getKnowledgeTasks($scope.stream._id);
                }
            }
            $scope.closeModalByClass = closeModalByClass;

            $scope.botDetailsCb.closeModalOnto = function(modalClass) {
                closeModalByClass(modalClass);
            };

            $scope.goBack = function (modalClass) {
                closeModalByClass(modalClass);
                $(".panel-heading").addClass("collapsed");
                $('.panel-collapse.in').collapse('hide');
            };
            $scope.resetDisplayTabID = function () {
                $scope.displayTabId = "";
            };

            function isEleVisible(element) {
                return $(element).is(":visible");
            }

            $scope.showCantPublishWarning = function () {
                NotificationService.confirmDialog(i18n.i18nString('show_publish_warning'), function () { }, { okText: i18n.i18nString('ok'), noCancelBtn: true });
            };


            $scope.isPublicBot = function () {
                var streamData = $scope.stream;
                return (streamData.visibility && streamData.visibility.namespace === "public" && $rootScope.isManaged && !$rootScope.wfAdmin);
            };

            $scope.publishStandardBot = function publishStandardBot() {



                if ($scope.isPublicBot()) {
                    $scope.showCantPublishWarning();
                    return;
                }

                checkForChannels(triggerPublish);

                function triggerPublish() {
                    $scope.publishBot = true;
                    $scope.stream.publishType = "standardbot";
                    openModalByClass('.bot-publish-form');

                }

            };

             $scope.publishSmartBot = function publishSmartBot() {

                    if($scope.isPublicBot()){
                        $scope.showCantPublishWarning();
                        return;
                    }

                    checkForChannels(triggerPublish);

                    function triggerPublish() {
                        $('.panel-collapse.in').collapse('hide');
                        $('.panel-heading').addClass("collapsed");
                        $scope.publishBot = true;
                        $workflowService.selectedStream().publishType = "smartbot";
                        openModalByClass('.bot-publish-form');
                    }

                };

                $scope.publishSampleBot = function publishSampleBot() {
                    checkForChannels(triggerPublish);

                    function triggerPublish() {
                        $('.panel-collapse.in').collapse('hide');
                        $('.panel-heading').addClass("collapsed");
                        $scope.publishBot = true;
                        $workflowService.selectedStream().publishType = "samplebot";
                        openModalByClass('.bot-publish-form');
                    }

                };

            $scope.botExportCB = function () {

            };

            $scope.exporBot = function () {
                // $modal.open({
                //     templateUrl: window.appConfig.TMPLT_PRE_PATH + 'js/modules/bt-export/bt-exportBot.html',
                //     controller: 'BTExportBotCtrl',
                //     backdrop: 'static',
                //     windowClass: 'bt-dialog-exportBot modal-kr',
                //     resolve: {
                //         config: function () {
                //             return {
                //                 botExportCB: $scope.botExportCB

                //             };
                //         }
                //     }
                // });
            };

            function checkForChannels(callback) {
                function goToChannelTab (){
                $scope.navigateTo(null,'channels');
                }
                
                var _channels = [];
                $scope.stream = $workflowService.selectedStream();
                var hasConfiguredChannels = false;
                _duplicateChannels = $workflowService.cloneData($scope.stream.channels);
                var nonConfiguredWebhooks = [];
                
                _channels = _.filter(_duplicateChannels, function (channelObject) {
                    if(channelObject.type.startsWith('ivr') && channelObject.type !== 'ivrVoice' && !channelObject.app){
                         if(channelObject.enable){
                            nonConfiguredWebhooks.push(channelObject);
                         }
                        return false;
                    }else{
                        if(channelObject.enable){
                            hasConfiguredChannels = true;
                        }
                        return channelObject.enable;
                    }
                });

                function continuePublish(){
                    $scope.overRidechannelConfig = true;
                    $scope.navigateTo(null,'publish');
                    $scope.overRidechannelConfig = false;
                }


                _channels = _.filter(_duplicateChannels, function (channelObject) {
                    return channelObject.enable;
                });

                if(_channels.length == 1 && _channels[0].type === 'rcs' && _channels[0].state !== 'readyToTest') {
                    _channels.pop();
                }

                var msg = i18n.i18nString('bot_usage_desc');

                if( nonConfiguredWebhooks && nonConfiguredWebhooks.length && !$scope.overRidechannelConfig){
                    msg = '<div><div>"'+i18n.i18nString('channels_publish')+'"<div> <br><ul>';
                    $.each(nonConfiguredWebhooks,function(i,channel){
                        msg = msg + '<li>'+ channel.displayName + '</li>';
                    });
                    msg = msg +'</ul></div>';
                    NotificationService.confirmDialog(msg, [goToChannelTab,continuePublish],{ okText: i18n.i18nString('go_channels'), cancelText:i18n.i18nString('continue_publish')  ,addHtmlContent:true,noCancelBtn:!hasConfiguredChannels});
                }else{
                    if (!(_.isArray(_channels) && _channels.length > 0)) {
                        NotificationService.notify(msg, 'warning');
                        if($scope.startStopPanelLoading){
                            $scope.startStopPanelLoading();
                        }
                    } else {
                        if(callback){
                            callback();
                        }else{
                            return true;
                        }
                    }
                }
            }

            $scope.launchMigrationTool = function () {
                var activeUser = localstore.getAuthData().currentAccount;
                activeUser.environment = window.location.hostname;
                var _encryptedUserDetails = "#" + base64.encode(JSON.stringify(activeUser));
                // var _link = window.location.protocol +'//'+ window.location.hostname + ':3002/#/login/' + _encryptedUserDetails;
                var _link = 'http://52.86.255.9/#/login/' + _encryptedUserDetails;

                window.open(_link, '_blank');

            };

            $scope.isChatWindowOpen = function () {
                return $(".kore-chat-window").is(":visible");
            };

             $scope.showInProgressModal = function(){
                $('#recordInProgress').modal('show');     
            };

                
            $scope.closeInProgressModal = function(taskInfo,taskAction,formtype,stream){
                $('#recordInProgress').modal('hide');
                if(taskInfo && taskAction && $scope.label === 'editworkflow'){
                    var openDialog = $scope.callbacks.modeOfAccess === "VIEW"?$scope.viewWorkflow(taskInfo,taskAction):$scope.editOrViewWorkflow(taskInfo,taskAction);
                }else if(taskInfo && taskAction && $scope.label === 'viewworkflow'){
                    $scope.viewWorkflow(taskInfo,taskAction);
                }else if(formtype === 'botsForm'){
                    setTimeout(function(){
                        $scope.callbacks._loggerInstance.isRecording = false;
                        $scope.callbacks.showView(formtype);
                    },500);
                    
                    
                }else if(!_.isEmpty(stream) && $scope.rightPanelView === 'deleteBot'){
                   $scope.deleteStream(stream);
                }
                 $scope.taskInfo = {};
                 $scope.taskAction = '';
                 $scope.formtype = '';
                 $scope.rightPanelView = '';
                 $rootScope.isConversationTesting = false;
               
            };
            $scope.toolTipFocusedObj = {};
            $scope.showNavPopoverFun = function(menu,menuComponent){
                if(!menu.tooltip){
                    $scope.clearPopOversforNav();
                    $(".navLinks").popover('hide');
                    $scope.showNavPopover.id = menuComponent+menu.id;
                    $scope.showNavPopover.hovered = null;
                    return;
                }
                $scope.initPopover(menu,menuComponent);
                $scope.showNavPopover.id = menuComponent+menu.id;
                $(".navLinks").popover('hide');
                $scope.showNavPopover.hovered = null;
                $scope.clearPopOversforNav();
                $scope.toolTipFocusedObj.timer = setTimeout(function(){
                    if($scope.showNavPopover.id === menuComponent+menu.id) {
                        // $scope.showNavPopover.hovered = null;
                      $("#popOverEvent_"+menuComponent+menu.id).popover('show');
                    }
                },500);
            };
            $scope.hideNavPopover = function(menu,menuComponent) {
                clearTimeout($scope.toolTipFocusedObj.timer);
                setTimeout(function(e){
                if(!$scope.showNavPopover.hovered) {
                        $("#popOverEvent_"+menuComponent+menu.id).popover('hide');
                }
               },300);
            };
            $scope.clearPopOversforNav  =  function(){
                $(".navLinks").popover('hide');
                clearTimeout($scope.toolTipFocusedObj.timer);
            };
            $scope.initPopover = function(menu,menuComponent) {
                if(!menu.tooltip){
                  return;
                }
                var popoverContent = '#menuPopoverContent_'+menuComponent+menu.id;
                var popOverClass = 'menuPopoverContent_'+menuComponent+menu.id;
                // setTimeout(function(){
                    if($("#popOverEvent_"+menuComponent+menu.id) && $("#popOverEvent_"+menuComponent+menu.id).popover){
                        $("#popOverEvent_"+menuComponent+menu.id).popover('destroy');
                    }
                    $("#popOverEvent_"+menuComponent+menu.id).popover({
                        html: true,
                        trigger: 'manual',
                        placement:'auto',
                        container:'body',
                        content: function () {
                            return $(popoverContent).html();
                        }
                    }).data('bs.popover')
                    .tip()
                    .addClass('leftNavpopOver ' + popOverClass);
                    setTimeout(function(){
                        $("#popOverEvent_"+menuComponent+menu.id).off('shown.bs.popover').on('shown.bs.popover', function (e) {
                            $('.'+popOverClass).off('mouseenter').on('mouseenter',function(e){
                                $scope.showNavPopover.hovered = menuComponent+menu.id;
                            });
                            $('.'+popOverClass+' .menuHelpLink').off('click').on('click',function(e){
                                var helpid = e.currentTarget.id;
                                if(helpid && $rootScope.helpLinks[helpid]) {
                                    $rootScope.redirectToLink(helpid);
                                }
                            });
                            $('.'+popOverClass).off('mouseleave').on('mouseleave',function(e){
                                $scope.showNavPopover.hovered =  null;
                                $(".navLinks").popover('hide');
                            });
                        });
                    },100);
                // },100);      
            };
            $scope.confirmCloseProgressModal = function(){
                if($('.talkToBot').hasClass('minimized-bot')){
                  $('.talkToBot').removeClass('minimized-bot');  
                }
                $rootScope.$emit('closeProgressModal');

            };

            $scope.showDownloadModal = function(){
                var msgInfo = {
                    botMsg: 0,
                    userMsg: 0,
                    totalTestSteps: 0
                };
                var isFormNode = false;
                var inputs = [], outputs = [];
                if(!$rootScope.recordedChatData) {
                    NotificationService.notify("Atleast few recorded chat data is required for creating test case", 'warning');
                    return;
                }
                if($rootScope.recordedChatData) {
                    var chatData = JSON.parse($rootScope.recordedChatData) || [];
                    if(chatData && chatData.testCases && chatData.testCases.length > 0) { // test steps greate than 890
                        chatData.testCases.forEach(function(msg) {
                            inputs = inputs.concat(msg.messages); // user message total
                            if(msg && msg.messages) {
                                msg.messages.forEach(function(bot) {
                                    outputs = outputs.concat(bot.outputs);// bot message total
                                    if(bot && bot.event && bot.event === "Form_Node") {
                                        isFormNode = true; // check for Form node is exist then stop flow
                                    }
                                });
                            }
                        });
                        msgInfo.botMsg = inputs.length;
                        msgInfo.userMsg = outputs.length; // usre message total
                        msgInfo.totalTestSteps = chatData.testCases.length;
                        $scope.recordExceedLimit = msgInfo;
                    }
                }
                if(msgInfo.totalTestSteps > 890) {
                    $('#sizeLimitReachedModal').modal('show');
                } else {
                    if(isFormNode) {
                        NotificationService.notify("We currently do not support testing of Digital Forms through Conversation Testing module.", 'error');
                        $scope.discardDownloadModal();
                        return;
                    } else {
                        $('#recordStop').modal('show');
                    }
                }
               
            };

            $scope.closeDownloadModal = function(){
                $rootScope.$emit('closeDownloadModal');
                _loggerInstance.isRecording = true;
                $('#recordStop').modal('hide');
            };

            $scope.closeSizeLimitModal = function(){
                $rootScope.$emit('closeDownloadModal');
                $rootScope.$emit('botTestEnd');
                _loggerInstance.isRecording = true;
                $('#sizeLimitReachedModal').modal('hide');
                $rootScope.$emit('closeDownloadModal');
            };


            $scope.discardDownloadModal = function(){
                $rootScope.$emit('closeDownloadModal');
                _loggerInstance.isRecording = false;
                $rootScope.$emit('stopRecording');
                $rootScope.$emit('botTestEnd');                
                $('#recordStop').modal('hide');
                $scope.createTestCaseConfig.createTestCaseFlag = false;
                $rootScope.isConversationTesting = false;
            };
           
            $scope.createTestCase = function(){
                setTimeout(function(){
                    $('#recordStop').modal('hide');
                    if($rootScope.manageTestCaseModal) {
                        $rootScope.manageTestCaseModal('create');
                    }
                },200);
                $timeout(function(){
                    $rootScope.$emit('botTestEnd');
                    return;
                },0);
            };

            $scope.downloadChatJson = function(){
                $rootScope.$emit('downloadChatJson');
                setTimeout(function(){
                    $('#recordStop').modal('hide');
                },200);
                $timeout(function(){
                    $rootScope.$emit('botTestEnd');
                    return;
                },0);
               
            };

            function addMinimize(){
                $timeout(function(){
                    $rootScope.$emit('minimizeBot');
                    return;
                },0);
                
            }

            $scope.createNewToken = function() {
                var payload = {
                    tokenName: $scope.tokenName
                };
                BTStreamsService.createtestcase($scope.streamId, payload)
                    .then(function (res) {
                        NotificationService.notify("New Token created successfully", 'success');
                        $scope.closeCreateTokenModal();
                        $scope.tokenName = "";
                    }, function (err) {
                        if (err && err.data && err.data.errors) {
                            NotificationService.notify(err.data.errors[0].msg, 'error');
                        } else {
                            NotificationService.notify('Something went wrong!!', 'error');
                        }
                    });
                
            };
            $scope.openCreateTokenModal = function() {
                $("#newTokenCreation").modal("show");
            };
            $scope.closeCreateTokenModal = function() {
                $("#newTokenCreation").modal("hide");
            };



            $scope.initiateChatBot = function initiateChatBot() {
                var _userInfo= $applicationService.userInfo();
                var minimizeBot = $('.talkToBot').hasClass('minimized-bot')?addMinimize():$scope.resetDebugConsole();
                // canAccessService();
                if ($scope.showTestBot || ($scope.stream._taskCounts && $scope.stream._taskCounts.totalTasksInUse) || ($scope.stream.type === 'universalbot' && ($scope.linkedBots && $scope.linkedBots.length > 0))) { // temperory condition override till summary page is built and we have access to task count//
                     if(!$('.talkToBot').hasClass('minimized-bot')){
                        $rootScope.$emit('botTestStart', $scope.stream, undefined, $scope.pushDebugInfo, debugConsoleTrigger, null, $scope.pushHistoryInfo,recordProgress,recordStop,_userInfo);
                     }
                     setDomPropToDebugConsole();
                } else {
                    if ($scope.stream.type === "universalbot") {
                        NotificationService.notify(i18n.i18nString('one_linkedbot'), "warning");
                        return;
                    }
                    NotificationService.notify(i18n.i18nString('development_task'), "warning");
                }
            };

            var _element = $("#debugConsoleRT");


            var setDomPropToDebugConsole = function () {
                $timeout(function () {
                    $('#debugConsoleRT .flowTaskDebugConsolePanel').draggable({
                        handle: ".nav.nav-tabs",
                        containment: "document",
                        cancel: ".minimized"
                    }).resizable({
                        containment: "document",
                        minWidth: 574,
                        maxWidth: 800,
                        minHeight: 400,
                        handles: "e, s, se",
                        stop: onDebugResizeStop,
                        resize: function (event, ui) {
                            var _minimized = ui.size.width < 800;
                            var _ele = $(event.target).find('.toggleDebugConsolePanelSize');
                            if (_ele) {
                                _ele.toggleClass('fa-compress', !_minimized);
                                _ele.toggleClass('fa-expand', _minimized);
                            }
                        }
                    });
                });
            };

            function onDebugResizeStop(e, u) {
                $scope.isDebugResized++;
            }

            function recordMinimize(){
                
                $('#minimizeFlow').modal('show');   
                $('.talkToBot').addClass('minimized-bot');
                return;
                
            }

            $scope.closeMinimizeModal = function(){
              $('#minimizeFlow').modal('hide');   
            };

            $scope.confirmCloseMinimizeModal = function(){
                _loggerInstance.isRecording = false;
                $('.record-stop').removeClass('record-stop').addClass('record-btn');
                $('.minimize-btn').click();
                $('#minimizeFlow').modal('hide'); 
                $scope.closeDebugConsolePanel();
            };


            function debugConsoleTrigger(e) {

                if (e.event === 'debugClick') {
                    $scope.openDebugConsole();
                } else if (e.event === 'minimizeClick') {
                    $scope.isDebugMinimized = $scope.isDebugConsolePanelOpened;
                    if(_loggerInstance && _loggerInstance.isRecording){
                        $scope.isRecordingDebug = $scope.isDebugConsolePanelOpened;
                        recordMinimize();
                    }else{
                      $scope.closeDebugConsolePanel();  
                    }
                    
                    
                    
                } else if (e.event === 'maximizeClick') {
                    if ($scope.isDebugMinimized || $scope.isRecordingDebug) {
                        $scope.openDebugConsole();
                        $scope.isDebugMinimized = false;
                        $scope.isRecordingDebug = false;
                    }
                } else if (e.event === 'resetClick') {
                    $scope.resetDebugConsole();
                    return;
                } else if (e.event === 'closeClick') {
                    $scope.closeDebugConsolePanel();
                    $scope.resetDebugConsole();
                    $scope.closeInProgressModal($scope.taskInfo,$scope.taskAction,$scope.formtype,$scope.stream);
                    $scope.closeDownloadModal();
                    _loggerInstance.isRecording = false;
                    //$scope.minimized  = false;
                    if($('.talkToBot').hasClass('minimized-bot')){
                      $('.talkToBot').removeClass('minimized-bot');  
                    }
                    $rootScope.isConversationTesting = false;
                    return;
                }

            }


            function recordProgress(e){
                if(e.event === 'closeClick'){
                    $scope.showInProgressModal();    
                }
            }

            $scope.stopDoubleReload = true;
            function recordStop(e){
                if(e.event === 'recordStop'){
                    if(_loggerInstance && _loggerInstance.getData) {
                        var chatData = JSON.stringify(_loggerInstance.getData());
                        $rootScope.recordedChatData = chatData;
                        if($scope.stopDoubleReload) {
                            $scope.stopDoubleReload = false;
                            setTimeout(function() {
                                $scope.stopDoubleReload = true;
                            }, 2000);
                            $scope.showDownloadModal();
                        }
                    }
                }
            }

            $scope.resetDebugConsole = function () {
                $scope.debugInfo = [];
                //$scope.debugInfo =[{debugTitle:"Reach to dialog to start the log..."}];

                $scope.debugContext = '';
                $scope.debugRaw = {};
                $scope.nlTraceData = '';
            };

/*            $scope.newKgAddedClick = function() {
                $timeout(function(){
                    $('.newKgAdded').trigger('click');
                }, 150);
            };
*/

            $scope.openDebugConsole = function () {
                $scope.isDebugConsolePanelOpened = true;
                $timeout(function () {
                    var _ele = _element.find('.flowTaskDebugConsolePanel');

                    //if ($(_ele.selector).offset().left < 0) {
                    //    $(_ele.selector).css('left', '0px').css('top', '-56px');
                    //} else {
                    if((window.innerWidth - 550) < 800){
                        var _calculatedWidth = window.innerWidth - 550;
                        $(_ele).css('left', '0px').css('top', '58px').css('width', _calculatedWidth+'px');
                    }
                    else {
                        $(_ele).css('left', '0px').css('top', '58px').css('width', '800px');
                    }
                    //}
                    $scope.showNlTraceInitContent();
                });
            };

            var emptySpace = String.fromCharCode(160);


            var getSpaceByCount = function (count) {
                var tempEmptySpace = "";
                for (var i = 0; i < count; i++) {
                    tempEmptySpace = tempEmptySpace + emptySpace;
                }

                return tempEmptySpace;
            };

            $scope.showNlTraceInitContent = function () {
                $scope.nlTrace = [i18n.i18nString('initailizing'), ""];
                $scope.nlTrace.push(i18n.i18nString('tasks_loaded'));
                var taskList = [].concat(($scope.alertTAsks||[]), ($scope.actionTasks || []), ($scope.dailogTasks||[]));

                var types = {
                    'a': "Action",
                    "l": "Alert"
                };

                var getTaskTypeByID = function (taskid) {
                    var taskType = types[taskid[0]];

                    if (!taskType) {
                        if (taskid.indexOf("dg-") !== -1) {
                            taskType = "Dialog";
                        }
                    }

                    return (taskType || "");
                };

                var getTaskName = function (taskData) {

                    if (taskData.state !== 'published' && taskData.state !== "suspended" && taskData.state !== "rejected" && $workflowService.selectedStream().visibility.namespace !== 'private') {
                        return taskData.name + "   @development";
                    }

                    return taskData.name;

                };



                $.each(taskList, function (i, task) {
                    $scope.nlTrace.push(getSpaceByCount(10) + "" + getTaskTypeByID(task._id) + " Task   '" + getTaskName(task) + "'   " + (task.version || ''));
                    if (task.isParent) {
                        var childTask = task.child[0];
                        $scope.nlTrace.push(getSpaceByCount(10) + "" + getTaskTypeByID(childTask._id) + " Task   '" + getTaskName(childTask) + "'   " + (childTask.version || ''));
                    }
                });

                $.each($scope.knowledgeTasks, function (i, knowledgeData) {
                    $scope.nlTrace.push(getSpaceByCount(10) + "Knowledge Task   '" + knowledgeData.name + "'   " + (knowledgeData.version || ''));
                });



                $scope.nlTrace.push(i18n.i18nString('task_loading'));
                $scope.nlTrace.push(i18n.i18nString('ready_utterance'));


            };

            var _scoringArray = [
                "taskNameAnalysis",
                "penaltyScoring",
                "bonusScoring",
                "wordScoring"
            ];

            var _keysToExclude = ["activityType", "debugTitle", "foundInSentence"];
            function pushHistory(debug) {
                $scope.debugInfo = $scope.debugInfo || [];
                var node = debug.history;
                var _timeStamp = "";
                if (node.debugTitle) {
                    $scope.debugInfo.push(node);
                } node.timestampFormated = moment(node.timestamp).local().format('MM-DD-YYYY  HH:mm:ss.SSS');//ddd MMM DD YYYY HH:mm:ss


                $timeout(function () {
                    var _debugLogDiv = $('.debug-log-body .log-console-body');
                    if (_debugLogDiv) {
                        _debugLogDiv.scrollTop(_debugLogDiv[0].scrollHeight);
                    }
                }, 300);
            }
            $scope.pushHistoryInfo = function (debug) {
                pushHistory(debug);
            };

            $scope.pushDebugInfo = function (debug) {
                if(debug.NLAnalysis && !_.isEmpty(debug.NLAnalysis)) {
                    $scope.nlTraceData = debug.NLAnalysis || "";
                }
                var tempDebug = $workflowService.cloneData(debug);
                /*if (tempDebug.NLAnalysis) {

                    $scope.nlTraceData = [];
                    $scope.nlTraceData.push({ type: 'String', title: ' > NL analysis', value: "" });
                    var recObjNL = function (spaceToAdd, obj) {
                        var initSpace = spaceToAdd;
                        if (Object.keys(obj).length > 0) {
                            $.each(obj, function (k, tempObj) {
                                if (tempObj !== undefined) {
                                    if (tempObj && tempObj.constructor === Object) {
                                        $scope.nlTraceData.push({ type: 'Object', title: initSpace + ' > ' + k, value: '' });
                                        recObjNL(initSpace + getSpaceByCount(8), tempObj);
                                    } else if (tempObj && tempObj.constructor === Array) {
                                        $scope.nlTraceData.push({ type: 'Array', title: initSpace + ' > ' + k, value: '' });
                                        recObjNL(initSpace + getSpaceByCount(8), tempObj);
                                    } else {
                                        if ($.inArray(k, _keysToExclude) === -1) {
                                            $scope.nlTraceData.push({ type: 'String', title: initSpace + k, value: tempObj });
                                        }
                                    }
                                }
                            });
                        } else {
                            if ($.inArray(obj, _keysToExclude) === -1) {
                                $scope.nlTraceData.push({ type: 'String', title: initSpace + '---', value: '---' });
                            }
                        }
                    };

                    $.each(tempDebug.NLAnalysis, function (i, nlAnalalysis) {
                        if (nlAnalalysis && Object.keys(nlAnalalysis).length > 0) {
                            $.each(nlAnalalysis, function (k, obj) {
                                if (obj && k !== 'history') {
                                    if (obj.constructor === Object) {

                                        if ($.inArray(k, _scoringArray) !== -1) {
                                            $scope.nlTraceData.push({ type: 'Object', title: ' > ' + k + "" + getSpaceByCount(2) + "(" + obj.debugTitle.slice(obj.debugTitle.indexOf(":") + 2) + ")", value: '' });
                                        } else {
                                            $scope.nlTraceData.push({ type: 'Object', title: ' > ' + k, value: '' });
                                        }

                                        recObjNL(getSpaceByCount(10), obj);
                                    } else if (obj.constructor === Array) {
                                        $scope.nlTraceData.push({ type: 'Array', title: ' > ' + k, value: '' });
                                        recObjNL(getSpaceByCount(10), obj);
                                    } else {
                                        if ($.inArray(k, _keysToExclude) === -1) {
                                            $scope.nlTraceData.push({ type: 'String', title: ' > ' + k, value: obj, noChild: true });
                                        }

                                    }
                                } else if (obj === 0) {
                                    if ($.inArray(k, _keysToExclude) === -1) {
                                        $scope.nlTraceData.push({ type: 'String', title: k, value: obj });
                                    }

                                } else if (obj === null || obj === undefined) {
                                    if ($.inArray(k, _keysToExclude) === -1) {
                                        $scope.nlTraceData.push({ type: 'String', title: k, value: 'null' });
                                    }
                                }
                            });
                        }
                    });



                    // $scope.nlTrace.push("> NL analysis:");
                    // $scope.nlTrace.push(tempDebug.NLAnalysis || []);

                    //pushHistory(debug);
                }*/
                if (tempDebug.type === 'contextUpdate') {
                    debug = debug.context || {};
                    $scope.debugRaw = debug;
                    $scope.debugContext = debug;
                }
                if (tempDebug.type === 'contextUpdate' && tempDebug.context.scriptErrorMeta) {
                    $scope.validateJs(tempDebug);
                }
                $timeout(function () {
                    $scope.$digest();
                }, 350);
            };
            $scope.options = {
                mode: 'view',
                ace: window.ace
            };

            function getConnectorsList() {
                BTIdpService.connectors()
                    .then(function (res) {
                        $scope.connectors = res.data;
                        $workflowService.botConnectors($workflowService.cloneData(res.data));
                    }, function (err) {
                        $scope.connectors = [];
                    });

            }
                getConnectorsList();

            function scriptDefinition(contextData) {
                var bfOffset=0;
                if(contextData.contextData.botFunctions){
                    bfOffset=contextData.contextData.botFunctions.split(/\r\n|\r|\n/).length;
                }
                var contextCopy = $workflowService.cloneData(contextData);
                var code = contextData.contextData.code.body;
                $scope.scriptObj = code.trim();//.substring(2, code.length - 2);
                $scope.error = contextData.error.message + " at " + (contextData.error.lineno - 9-bfOffset) + ":" + contextData.error.colno;
                $scope.scriptNodeErrorHelp = i18n.i18nString('succesfully_script',{dyn:$scope.scriptNodeName});
                delete contextCopy.contextData.contextForResolution.scriptErrorMeta;
                $scope.contextObject = contextCopy.contextData.contextForResolution;
                scriptNodeEditorModal = true;
                $timeout(function(){$('debug-console-panel .fa.fa-window-minimize.toggleMinMax').click();
                openModalByClass('.script-node-edit-form');},100);
                // $timeout(function(){ $scope.updatePerfectScrollbar($(".modalPerfectScroll"));});
                // $(".modalPerfectScroll").scrollTop(0);
            }

            $scope.saveScript = function () {
                if ($scope.invalidScript) {
                    NotificationService.notify(i18n.i18nString('save_script'), 'error');
                    return;
                }
                $scope.saveInProgress = true;
                BTFlowtaskService.getComponents($scope.contextData.botInfo.taskBotId, $scope.contextData.context.scriptErrorMeta.componentId).then(function (res) {
                    var _component = res && res.data;
                    var _payload = {};

                    if ($scope.contextData.context.scriptErrorMeta.messageTemplateId) {
                        var _scriptPosition = 'message';
                        if ($scope.contextData.context.scriptErrorMeta.msgTemplateIdType === 'error') {
                            _scriptPosition = 'errorMessage';
                        }
                        var _channel = _.find(_component[_scriptPosition], {_id: $scope.contextData.context.scriptErrorMeta.messageTemplateId});
                        _channel.text = encodeJS($scope.scriptObj);
                        _payload[_scriptPosition] = _component[_scriptPosition];
                        _payload[_scriptPosition] = _payload[_scriptPosition].map(function (channel) {
                            return {
                                channel: channel.channel,
                                text: channel.text,
                                type: channel.type,
                                _id: channel._id
                            };
                        });
                        //_payload.name=_component.name;
                    } else {
                        _payload.script = encodeJS($scope.scriptObj);
                    }


                    saveToServer(_payload);
                    $scope.contextData = undefined;
//
                },
                        function (error) {
                            $scope.saveInProgress = false;
                            if (error && error.data && error.data.errors) {
                                var _msg = error.data.errors[0].msg;
                                NotificationService.notify(_msg, 'error');
                            } else if (error.errors && _.isArray(error)) {
                                var msg = error.errors[0].msg;
                                NotificationService.notify(msg, 'error');
                            } else {
                                NotificationService.notify(i18n.i18nString('error_handle'), 'error');
                            }
                        });

            };
            function encodeJS(_obj) {
                return encodeURIComponent(_obj);
            }
            function decodeJS(_obj) {
                return decodeURIComponent(_obj);
            }

            $scope.closeModal = function () {
                $scope.contextData = undefined;
                scriptNodeEditorModal = false;
                closeModalByClass('.script-node-edit-form');
            };

            function saveToServer(_payload) {
                $scope.saveInProgress = true;
                var _streamId = $scope.contextData.botInfo.taskBotId,
                        _componentId = $scope.contextData.context.scriptErrorMeta.componentId;


                BTFlowtaskService.updateComponent(_streamId, _componentId, _payload).then(function (res) {
                    if (res && res.data) {
                        BTFlowtaskService.getComponents(_streamId, _componentId).then(function (res) {
                            if (res && res.data) {
                                $rootScope.$broadcast('update node info', res.data);
                                $scope.closeModal();
                            }
                        });

                    }
                    $scope.saveInProgress = false;
                }, function (error) {
                    if (error && error.data && error.data.errors) {
                        var _msg = error.data.errors[0].msg;
                        NotificationService.notify(_msg, 'error');
                    } else if (error.errors && _.isArray(error)) {
                        var msg = error.errors[0].msg;
                        NotificationService.notify(msg, 'error');
                    } else {
                        NotificationService.notify(i18n.i18nString('save_script_error'), 'error');
                    }
                    $scope.saveInProgress = false;
                });
            }
            function IsBroswerIE() {
                var ua = window.navigator.userAgent;
                var msie = ua.indexOf("MSIE ");

                if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
                {
                    return true;
                }
                else  // If another browser, return 0
                {
                    return false;
                }
                return false;
            }
            function resolveLodashTemplates(data){
                    var context = {
                        context: data.contextForResolution,
                        DateUtil: data.dateTimeFields,
                        rrule: window.RRule,
                        moment: window.moment
                    };
                    var fields = data.code;
                    var result={};
                    var code;
                    Object.keys(fields).map(function(key){

                        if(typeof(fields[key]) !== "string"){
                            result[key] = fields[key];
                            return;
                        }

                       var _mergeScript = '';
                       if (data.botFunctions) {
                           _mergeScript = data.botFunctions + fields[key];
                       } else {
                           _mergeScript = fields[key];
                       }

                        _.templateSettings = {
                            escape : /<%-([\s\S]+?)%>/g,
                            evaluate : /<%([\s\S]+?)%>/g,
                            interpolate : /<%=([\s\S]+?)%>/g
                        };

                        code = _.template(_mergeScript)(context);

                        _.templateSettings = {
                            escape : /<%-([\s\S]+?)%>/g,
                            evaluate : /<%([\s\S]+?)%>/g,
                            interpolate : /\{\{(.+?)\}\}/g
                        };

                        code = _.template(code)(context);

                        result[key] = _.template(code)(context);

                        _.templateSettings = {
                            escape : /<%-([\s\S]+?)%>/g,
                            evaluate : /<%([\s\S]+?)%>/g,
                            interpolate : /<%=([\s\S]+?)%>/g
                        };

                    });
                    return result;
                }
            function validateJs(contextData){
                                var showToast = true;

                                if ((!$scope._constants_.config.showScriptNodeError) || (contextData && contextData.context && contextData.context.scriptErrorMeta && contextData.context.scriptErrorMeta.templateType === 'basic')) {
                                    return;
                                }
                                if(contextData && contextData.context.scriptErrorMeta.codeToBeRes.body){
                                    var _code=contextData.context.scriptErrorMeta.codeToBeRes.body;
                                    _code=_code.replace('<%','').replace('%>','');
                                    if (_code.indexOf('/**botScriptsDelimiter*/') > -1) {
                                        _code = _code.substr(_code.indexOf('/**botScriptsDelimiter*/') + 24, _code.length);

                                        contextData.context.scriptErrorMeta.codeToBeRes.body =_code;
                                    }
                                                          }
                                if (!contextData) {
                                    $scope.contextData.context.scriptErrorMeta.codeToBeRes.body = "" + $scope.scriptObj + "";
                                } else {
                                    showToast = false;
                                    $scope.contextData = $workflowService.cloneData(contextData);
                                }
                                var data = {};
                                $scope.scriptNodeName = $scope.contextData.context.scriptErrorMeta.componentName;
                                $scope.errNodeType = $scope.contextData.context.scriptErrorMeta.componentType;
                                if ($scope.contextData.context) {
                                    data.contextForResolution = $scope.contextData.context;
                                }

                                if ($scope.contextData.context && $scope.contextData.context.scriptErrorMeta && $scope.contextData.context.scriptErrorMeta.contextForRes.dateTimeFields) {
                                    data.dateTimeFields = $scope.contextData.context.scriptErrorMeta.contextForRes.dateTimeFields;
                                }

                                if ($scope.contextData.context.scriptErrorMeta) {
                                    data.code = $scope.contextData.context.scriptErrorMeta.codeToBeRes;
                                }

                                if (contextData && contextData.botFunctions) {
                                    data.botFunctions = contextData.botFunctions;
                                } else {
                                    data.botFunctions = $scope.contextData.botFunctions;
                                }

                                if (IsBroswerIE()) {
                                    try {
                                        var res = resolveLodashTemplates(data);
                                        $scope.showError = false;
                                        NotificationService.notify(i18n.i18nString('script_success'), "success");
                                    } catch (err) {
                                        if (err.message && err.stack) {
                                            var errLineNumberStr = err.stack.split('\n')[1];
                                            errLineNumberStr = errLineNumberStr.split(':');
                                            var customErrObj = {'message': err.name + " : " + err.message, 'lineno': parseInt(errLineNumberStr[1]) + 2, 'colno': parseInt(errLineNumberStr[2])};
                                            $scope.showError = true;
                                            if (showToast) {
                                                NotificationService.notify(i18n.i18nString('script_error'), "error");
                                            }
                                            scriptDefinition({contextData: data, error: customErrObj});
                                        }
                                    }
                                } else {
                                    (function (data) {
                                        jsValidator.getError(data)
                                                .then(function (res) {
                                                    $scope.showError = false;
                                                    NotificationService.notify(i18n.i18nString('script_success'), "success");
                                                }, function (err) {
                                                    $scope.showError = true;
                                                    if (showToast) {
                                                        NotificationService.notify(i18n.i18nString('script_error'), "error");
                                                    }
                                                    scriptDefinition({contextData: data, error: err});
                                                });
                                    }(data));
                                }


            }
            $scope.validateJs = function (contextData) {
                if (contextData) {
                    BTStreamsService.getBotFunctions($workflowService.selectedStream()._id)
                            .then(function (res) {
                                if (res.data && res.data.length && res.data[0].fileURL) {
                                    BTStreamsService.getUrl(res.data[0].fileURL).then(function (res) {
                                        contextData.botFunctions = res.data;
                                        validateJs(contextData);

                                    }, function (err) {
                                        validateJs(contextData);
                                        console.log("Failed getting bot functions file");
                                    });
                                }else{
                                    validateJs(contextData); 
                                }
                               

                            }, function (errRes) {
                                validateJs(contextData);
                                console.log("Failed getting bot functions");
                            });
                } else {
                    validateJs(contextData);
                }


            };

            $scope.aceEditorCallback.onBlur = function (editor) {
                if (_.filter(editor.getSession().getAnnotations(), {type: 'error'}).length) {
                    $scope.invalidScript = true;
                } else {
                    $scope.invalidScript = false;
                }
            };

            $(document).on('show.bs.modal', '.modal', function (event) {
                if (scriptNodeEditorModal) {
                    var zIndex = 1040 + (10 * $('.modal:visible').length);
                    $(this).css('z-index', zIndex);
                    setTimeout(function () {
                        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
                    }, 0);
                }
            });

            var validateScriptEvent =  $rootScope.$on('validate script', function (e, data) {
                $scope.validateJs(data);
            });

            $scope.closeDebugConsolePanel = function () {
                $scope.isDebugConsolePanelOpened = false;
                var _ele = _element.find('.flowTaskDebugConsolePanel');
                $timeout(function () {
                    $(_ele.selector).css('width', '');
                }, 500);

            };

            $scope.onCloseBotPublishDialog = function onCloseBotPublishDialog(mode) {
                closeModalByClass('.bot-publish-form');
                $scope.publishBot = false;
                if (mode) {
                    loadAllTasks();
                }
            };

            $scope.isDefaultDialogExpanded = function (ele) {
                $scope.defaultDialogExpanded = $(ele).hasClass("collapsed");
            };


            $scope.lockTask = function lockTask(entity, prepareTimer, type, callback) {
                TimerNotification.removeTimer(entity._id);
                return BTStreamsService.createLock(entity._id)
                    .then(function (res) {
                        var config = res.data;
                        config.lockCreatedTime = new Date(config.locktime);
                        config.locktime = new Date(config.locktime);
                        config.locktime.setMinutes(config.locktime.getMinutes() + $scope._constants_.timerTimeoutInMinutes);
                        TimerNotification.registerTimer(prepareTimer(config, entity, type));
                        return;
                    }, function (err) {
                        if(type !== "knowledgeTask"){
                            showLockErrorMessage(err.data, err);
                            if(callback){
                                callback.failure();
                            }
                        }
                        return $q.reject(err);
                    });
            };
            var lockTaskEvent = $scope.$on("lockTaskEvent", function(eve,taskInfo,type,callback){
                $scope.lockTask(taskInfo,prepareTimer,type,callback).then(function(){
                    if(callback && callback.success){
                        callback.success();
                    } 
                });
            });
            $scope.viewActionLogs = function (action) {
                $scope.dialogMode = 'logs';
                openModalDialog(action, 'action');
            };

            $scope.viewAlertLogs = function (alert) {
                $scope.dialogMode = 'logs';
                openModalDialog(alert, 'alert');
            };

            $scope.editMapping = function (entity, type, id) {
                if (entity.mapId) {
                    entity._id = entity.mapId;
                    entity.name = entity.alertName + " " + entity.actionName;
                }
                else {// for dialog flow mapping
                    entity._id = entity._id;
                    entity.name = entity.sourceResourceName + " " + entity.targetResourceName;
                }
                $scope.setUpLocalStorageFortask('flows',entity);
                $scope.lockTask(entity, prepareTimer)
                    .then(function () {
                        $scope.activeEntityFlow = entity;
                        entity.taskType = "flows";
                        //openModalByClass('.flowtask-create-form');
                        $workflowService.taskEditInfo(entity);
                        $workflowService.taskMode("edit");
                        $timeout(function () {
                            $rootScope.$emit("updateEditTask", true);
                        });

                        $scope.fullModalCallback.openFullPageModal(3);
                    }, function (err) {

                    });

            };

            $scope.mapWorkflows = function (entity, type) {
                $scope.showMapping = true;
                try {
                    $scope.activeEntityFlow =   JSON.parse(JSON.stringify(entity));
                } catch(err) {
                    $scope.activeEntityFlow = entity;
                }
                $scope.activeEntityFlow.taskType = type;
                openModalByClass('.flowtask-create-form');
            };

            $scope.deleteMapping = function (entity, index) {
                NotificationService.alert(i18n.i18nString('flow_delete'), deleteMapping, arguments,'',undefined,i18n.i18nString('confirm'));
            };

            function deleteMapping(entity, index) {
                if (entity.mapId) {
                    BTParamMapService.deleteMappedAlertAction(entity.mapId).then(function (res) {
                        NotificationService.alertNotify(i18n.i18nString('deleted'), i18n.i18nString('flow_success'), "success");
                        if($scope.mappingTasks){
                           $scope.mappingTasks.splice(index, 1);
                        }
                        if (entity.parentOf || entity.parentMapId) {
                            loadAllTasks();
                        }
                    }, function (err) {
                        NotificationService.alertNotify(i18n.i18nString('flow_failure'), "error");
                    });
                }
                else {
                    BTParamMapService.deleteMappedAlertDialog(entity._id).then(function (res) {
                        NotificationService.alertNotify(i18n.i18nString('deleted'), i18n.i18nString('flow_success'), "success");
                        if($scope.mappingTasks){
                           $scope.mappingTasks.splice(index, 1);
                        }
                        if (entity.parentOf || entity.parentMapId) {
                            loadAllTasks();
                        }
                    }, function (err) {
                        NotificationService.alertNotify(i18n.i18nString('flow_failure'), "error");
                    });
                }
            }


            $scope.command = {
                context: {},
                data: {}
            };


            $scope.manageCommands = function (action) {
                $scope.command.context = {
                    actionId: action._id,
                    streamId: action.streamId,
                    show: {
                        _createSlash: true
                    },
                    hidecheckbox: true
                };
                $scope.command.data = {};
                $scope.enableCommands = true;
                $timeout(function () {
                    openModalByClass('.slashcommands');
                    ($scope.command.context.getSlashCommands || angular.noop)();
                });
            };

            $scope.exitCommand = function () {
                closeModalByClass('.slashcommands');
                $timeout(function () {
                    $scope.enableCommands = false;
                }, 100);
            };

            $scope.saveCommand = function (isValid, form) {

                if (!isValid) {
                    form_util.touch(form);
                    return;
                }

                $scope.command.saving = true;
                var errorMsg = i18n.i18nString('cmd_save');

                if ($scope.command.context.createSlashCommand) {
                    $scope.command.context.createSlashCommand()
                        .then(function (res) {
                            NotificationService.notify(i18n.i18nString('cmd_Save_success'), 'success');
                            $scope.command.saving = false;
                            $scope.exitCommand();
                        }, function (err) {
                            var error = (err.data && err.data.errors && err.data.errors[0] && err.data.errors[0].msg) || errorMsg;
                            NotificationService.notify(error, 'error');
                            $scope.command.saving = false;
                        });
                }

            };

            $scope.cloneWorkflow = function (entity, type) {
                if (type === "alert") {
                    BTAlertsService.cloneBTAlert(entity._id).then(function (res) {
                        getAlerts($scope.stream._id);
                    }, function (err) {
                        NotificationService.notify(err.data.errors[0].msg, "error");
                    });
                } else if (type === "action") {
                    BTActionsService.cloneBTAction(entity._id).then(function (res) {
                        getActions($scope.stream._id);
                    }, function (err) {
                        NotificationService.notify(err.data.errors[0].msg, "error");
                    });
                }
            };

            $scope.workflowHistory = function (entity, type) {
                $scope.dialogMode = 'version';
                openModalDialog(entity, type);
            };


           

            function showLockErrorMessage(error, full) {
                try {
                    error = error.errors;
                    var msg = _.isArray(error) ? error[0].msg :i18n.i18nString('some_thing_wrong_label') ;
                    NotificationService.notify(msg, 'error');
                } catch (ex) {
                    console.log(ex);
                }

            }

            function openModalDialog(entity, type) {
                $scope.activeTask = entity;
                $scope.activeTask.taskType = type;
                openModalByClass('.version-form');
            }
            $scope.upgradeWorkflow = function (entity, type) {
                if(type==='dialog' || type==='flowtaskView'){
                    type = 'flowtask';
                }
                loader = NotificationService.loader(i18n.i18nString('please_wait'));
                if (type === "alert") {
                    BTAlertsService.upgradeBTAlert(entity._id).then(function (res) {
                        BTAlertsService.upgradeMPAlert(entity._id, res.data._id).then(function (res) {
                            $scope.editWorkflow(res.data, type, true);
                            loader();
                            getMappings($workflowService.selectedStream()._id);
                            getAlertDialogMappings($workflowService.selectedStream()._id);
                        }, function (err) {
                            loader();
                            NotificationService.notify(err.data.errors[0].msg, "error");
                        });
                    }, function (err) {
                        loader();
                        NotificationService.notify(err.data.errors[0].msg, "error");
                    });
                } else if (type === "action") {
                    BTActionsService.upgradeBTAction(entity._id).then(function (res) {
                        BTActionsService.upgradeMPAction(entity._id, res.data._id).then(function (res) {
                            $scope.editWorkflow(res.data, type, true);
                            loader();
                            getMappings($workflowService.selectedStream()._id);
                            getAlertDialogMappings($workflowService.selectedStream()._id);
                        }, function (err) {
                            loader();
                            NotificationService.notify(err.data.errors[0].msg, "error");
                        });
                    }, function (err) {
                        loader();
                        NotificationService.notify(err.data.errors[0].msg, "error");
                    });
                } else if (type === "flowtask") {
                    BTFlowtaskService.upgradeFlowtask($workflowService.selectedStream()._id, entity._id).then(function (res) {
                        entity.child=[];
                        entity.child.push(res.data);
                        $.each($scope.dialogTasks,function(i,task){
                            if(task._id == res.data.parentId){
                                 task.child=[];
                                 task.child.push(res.data);
                                 return false;
                            }
                        });
                        $workflowService.dialogTasks($scope.dialogTasks);
                        $scope.editWorkflow(res.data, 'flowtaskEdit', true);
                        loader();
                    }, function (err) {
                        loader();
                        NotificationService.notify(err.data.errors[0].msg, "error");
                    });
                }
            };

            var loadAllTasks = function () {
                $(".modal-backdrop").remove();
                $scope.loadingAllTasks = true;
                $scope.stream = $workflowService.selectedStream();
                var serverAccessRights = accessControlService.getServerDependency('BOTBUILDER_TASKS');
                $scope.getAllAccessRights();
                if($scope.accessRights !== 'NO' || serverAccessRights){
                          getStream($workflowService.selectedStream()
                            ).then(function (res) {
                                channelsConfig.getDynamicChannels(res.data);
                                $scope.loadingAllTasks = false;
                                $scope._allTasks = [].concat($scope.alertTasks, $scope.actionTasks, $scope.dialogTasks, $scope.informationTasks);
                               $scope.callbacks.prepareGSearchData();
                                $scope.callbacks.allTasks = $scope._allTasks;
                                console.log($scope.publishViews.initialView);
                            }, function (error) {
                                $scope.loadingAllTasks = false;
                            });
                }else {
                    $scope.loadingAllTasks = false; 
                    canAccessService();   
                }
            };
            /** USED TO SET DEFAULT ACTIVE **/
            function getKeyByValue(object, value) {
                if(value=='defaultConversation' || value=='intelligence'){
                    value = 'training';
                }
                if(value=='sessionFlow' || value=='metrics'){
                    value = 'analyze';
                }
                for(var key in object) {
                    if(object[key] === value) {
                        return key;
                    }
                }
              }
            var _defaultActiveOrder = {"BOTBUILDER_TASKS":"botTasks",
                                       "BOTBUILDER_DASHBOARD":"botDashboard",
                                       "BOTBUILDER_NATURAL_LANGUAGE":"training",
                                       "Test_Train":"testTrain",
                                       "BOTBUILDER_CHANNELS":"channels",
                                       "BOTBUILDER_EXTENSIONS":"agents",
                                       "BOTBUILDER_PUBLISH_BOT":"publish",
                                       "BOTBUILDER_BOT_ANALYTICS":"analyze",
                                       "BOTBUILDER_BOT_SETTINGS":"configurations",
                                       "BOTBUILDER_KNOWLEDGE_GRAPH":$scope.stream.type !== 'universalbot'?"botTasks":"nl",                                      
                                       "BOTBUILDER_BATCH_TESTING":"batchTesting",
                                       "BOTBUILDER_BOT_DEVELOPERS":"management",
                                       "BOTBUILDER_BOT_IMPORT":"management",
                                       "BOTBUILDER_STORYBOARD":'storyboard',
                                    //    "BOTBUILDER_BOT_ANALYTICS":'customDashboard',
                                       

                                    };
            var _defaultkeys = ["BOTBUILDER_TASKS","BOTBUILDER_KNOWLEDGE_GRAPH","BOTBUILDER_DASHBOARD","BOTBUILDER_NATURAL_LANGUAGE","BOTBUILDER_BATCH_TESTING","Test_Train",
                                "BOTBUILDER_CHANNELS","BOTBUILDER_EXTENSIONS","BOTBUILDER_PUBLISH_BOT","BOTBUILDER_BOT_ANALYTICS","BOTBUILDER_BOT_SETTINGS","BOTBUILDER_BOT_DEVELOPERS","BOTBUILDER_BOT_IMPORT"];
            var getDefaultActive = function(){
                var active = "botSummary";
                //to checj for permision to reload from history//
                var redirectFromHistory = false;
                if($scope.botDetails && $scope.botDetails.builderState && $scope.botDetails.builderState.path && $scope.resumingBuilder){
                    var localActiveMenuPermissionKey =   getKeyByValue(_defaultActiveOrder,$scope.botDetails.builderState.path[1]);
                    if($scope.botDetails.builderState.path[1] === 'customDashboard'){ // temperory fix, need to interchnage _defaultActiveOrder key values to support multiple rules for panels //selectOrChangeBot
                        localActiveMenuPermissionKey = 'BOTBUILDER_DASHBOARD' ;
                    }
                    if($scope.botDetails.builderState.path[1] === 'containmentDashboard'){ // temperory fix, need to interchnage _defaultActiveOrder key values to support multiple rules for panels //selectOrChangeBot
                        localActiveMenuPermissionKey = 'BOTBUILDER_DASHBOARD' ;
                    }
                    var localActiveSubMenuPermissionKey = null;
                    if($scope.botDetails.builderState.path[2] && $scope.botDetails.builderState.path[2] !== ''){
                         localActiveSubMenuPermissionKey = navigator.tabPermisionList[$scope.botDetails.builderState.path[2]];
                    }
                    if(localActiveMenuPermissionKey && ($scope.hidePermissionList.indexOf(localActiveMenuPermissionKey) === -1)){
                        active = $scope.botDetails.builderState.path[1];
                        redirectFromHistory = true;
                      }else if(localActiveSubMenuPermissionKey &&  ($scope.hidePermissionList.indexOf(localActiveSubMenuPermissionKey) === -1)){
                        active = $scope.botDetails.builderState.path[1];
                        redirectFromHistory = true;
                     }else{
                        $scope.botDetails.builderState.path[2] = "";
                     }
                   
                } 
                //ends here//
                // if(!redirectFromHistory){
                //     for (var order in _defaultkeys){
                //         if($scope.hidePermissionList.indexOf(_defaultkeys[order]) === -1){
                //                active =  _defaultActiveOrder[_defaultkeys[order]]; 
                //                break;
                //         }
                //   }
                // }
                 return active;
            };

            var init = function () {
                _tasksCollection = new TasksCollection();
            };

            $scope.isEligibleForDeleteBot = function (stream) {
                var createdBy = _.isObject(stream.createdBy) ? stream.createdBy._id : stream.createdBy;
                if ($scope.stream.type === 'universalbot') {
                    return $applicationService.userInfo().userId === createdBy && ($scope.stream.universalBotState === 'awaitingApproval' || $scope.stream.universalBotState === 'configured'||$scope.stream.universalBotState === 'rejected');
                } else {
                    return $applicationService.userInfo().userId === createdBy;
                }
            };

            $scope.deleteStream = function (stream,view) {
                if(_loggerInstance && _loggerInstance.isRecording){
                       $scope.stream = stream;
                       $scope.rightPanelView = view;
                       $scope.callbacks.checkForLoggerInstance();
                }else{
                    var tempMess = $workflowService.selectedStream().isDeflect?NotificationService.alert(i18n.i18nString('delete_deflect_bot'), deleteStream, arguments,'',undefined,i18n.i18nString('confirm')):NotificationService.alert(i18n.i18nString('delete_stream'), deleteStream, arguments,'',undefined,i18n.i18nString('confirm'));
                }
            };
           var triggerHelpLinkUpdateEvent =  $scope.$on("triggerHelpLinkUpdate", function () {
                $scope.isHelpLinkClicked = true;
                $timeout(function () {
                    $scope.isHelpLinkClicked = false;
                });
            });

            $scope.isCollapsed = function (ele) {
                return $(ele).hasClass("collapsed") && !$scope.isHelpLinkClicked;
            };


            function deleteStream(stream) {
                $q.all([BTStreamsService.deleteBTStream(stream._id)])
                    .then(function (res) {
                            BTStreamsService.getStreams()
                                    .then(function (res) {
                                        $workflowService.streamsAll(res.data);
                                    });
                        NotificationService.alertNotify(i18n.i18nString('deleted'), i18n.i18nString('deleted_bot'), "success");
                        $scope.callbacks.showView('botsForm');
                        builderUtility.rmBTModalOpenClass();
                        if (!isEleVisible("#termsConditions")) {
                            builderUtility.rmBTModalOpenClass();
                        }
                    }, function (err) {

                        NotificationService.alertNotify(i18n.i18nString('delete_failure'), err.data ? err.data.errors[0].msg :i18n.i18nString('some_thing_wrong_label') , "error");
                    });
            }


            $scope.isWorkFlowAdmin = function () {
                $scope.isWFAdmin = $rootScope.wfAdmin;
                return $scope.isWFAdmin;
            };

               function saveBotStream(_payload) {
                    BTStreamsService.editStream($scope.stream._id, _payload).then(function (res) {
                        $scope.stream = _.merge($scope.stream,res.data);
                        $workflowService.selectedStream($workflowService.cloneData($scope.stream));
                        NotificationService.notify(i18n.i18nString('settings_saved'), 'success');
                    }, function (error) {
                        if (error && error.data && error.data.errors) {
                            var _msg = error.data.errors[0].msg;
                            NotificationService.notify(_msg, 'error');
                        } else if (error.errors && _.isArray(error)) {
                            var msg = error.errors[0].msg;
                            NotificationService.notify(msg, 'error');
                        } else {
                            NotificationService.notify(i18n.i18nString('error_handle'), 'error');
                        }
                    });
                }
                $scope.saveAutoTrainMLStatus = function() {
                    var _payload = {enableAutoUtteranceAddition:$scope.autotrainData.enableAutoUtteranceAddition};
                    saveBotStream(_payload);
                };

            function getUserSessionContext() {
                BTStreamsService.getSessions($workflowService.selectedStream()._id)
                    .then(function (res) {
                        if (res && res.data) {
                            $workflowService.contextData(res.data);
                        }
                    },
                    function (err) {
                    });
            }
            function getBotDiscription(streamId){
                var _allBots = $workflowService.streamsAll();
                var bot = _.find(_allBots, {'_id': streamId});
                if(bot){
                    return bot.description;
                }else{
                    return '';
                }
                
            }

            function updateBotStates(result){
                if ($scope.botDetails.streamState=='indevelopment') {
                            var confBot,publishedBot,inclBot,inclPublishedBot,_trainUtterancesBot,_invocationNamesBot;
                            $scope.linkedBots = [];
                            $scope.configuredBots = result.configuredBots.map(function (bot) {
                                bot.state = 'linked';
                                bot.discription = getBotDiscription(bot._id);
                                if($scope.botDetails.streamState === 'indevelopment'){
                                    confBot = _.find(result.fallbackConfiguredBots,{'_id':bot._id});
                                    if(confBot){
                                        bot.preferredBotStatus = true;
                                    }else{
                                        bot.preferredBotStatus = false;
                                    }
                                    inclBot =_.find(result.inclusiveConfiguredBots,{'_id':bot._id});
                                    if(inclBot){
                                        bot.inclusiveBot = true;
                                    }else{
                                        bot.inclusiveBot = false;
                                    }
                                    _trainUtterancesBot = _.find(result.linkedBotUtterances,{'id':bot._id});
                                    if(_trainUtterancesBot){
                                        bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                    }
                                    _invocationNamesBot = result.invocationNames && result.invocationNames[bot._id];
                                    if(_invocationNamesBot && _invocationNamesBot.length){
                                        bot.invocationNames =_invocationNamesBot;
                                    }
                                }else if($scope.botDetails.streamState === 'published'){
                                    confBot = _.find(result.fallbackPublishedBot,{'_id':bot._id});
                                    if(confBot){
                                        bot.preferredBotStatus = true;
                                    }else{
                                        bot.preferredBotStatus = false;
                                    }
                                    inclBot =_.find(result.inclusivePublishedBots,{'_id':bot._id});
                                    if(inclBot){
                                        bot.inclusiveBot = true;
                                    }else{
                                        bot.inclusiveBot = false;
                                    }
                                     _trainUtterancesBot = _.find(result.linkedBotUtterances,{'id':bot._id});
                                    if(_trainUtterancesBot){
                                        bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                    }
                                    _invocationNamesBot = result.invocationNames && result.invocationNames[bot._id];
                                    if(_invocationNamesBot && _invocationNamesBot.length){
                                        bot.invocationNames =_invocationNamesBot;
                                    }
                                }
                                
                                return bot;
                            });
                            $scope.linkedBots = $scope.linkedBots.concat($scope.configuredBots);
                            

                            $scope.awaitingApprovalBots = result.awaitingApprovalBots.map(function (bot) {
                                bot.state = 'awaitingApproval';
                                return bot;
                            });
                            $scope.linkedBots = $scope.linkedBots.concat(result.awaitingApprovalBots);
                            $scope.configuredLinkedBots = $workflowService.cloneData($scope.linkedBots);

                            
                            if(result.upgradedBots){
                              $scope.upgradedBots = result.upgradedBots.map(function(bot){
                                bot.state = 'linked';
                                bot.discription = getBotDiscription(bot._id);
                                if($scope.botDetails.streamState === 'indevelopment'){
                                    confBot = _.find(result.fallbackConfiguredBots,{'_id':bot._id});
                                    if(confBot){
                                        bot.preferredBotStatus = true;
                                    }else{
                                        bot.preferredBotStatus = false;
                                    }
                                    inclBot =_.find(result.inclusiveConfiguredBots,{'_id':bot._id});
                                    if(inclBot){
                                        bot.inclusiveBot = true;
                                    }else{
                                        bot.inclusiveBot = false;
                                    }
                                     _trainUtterancesBot = _.find(result.linkedBotUtterances,{'id':bot._id});
                                    if(_trainUtterancesBot){
                                        bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                    }
                                    _invocationNamesBot = result.invocationNames && result.invocationNames[bot._id];
                                    if(_invocationNamesBot && _invocationNamesBot.length){
                                        bot.invocationNames =_invocationNamesBot;
                                    }
                                }else if($scope.botDetails.streamState === 'published'){
                                    confBot = _.find(result.fallbackPublishedBot,{'_id':bot._id});
                                    if(confBot){
                                        bot.preferredBotStatus = true;
                                    }else{
                                        bot.preferredBotStatus = false;
                                    }
                                    inclBot =_.find(result.inclusivePublishedBots,{'_id':bot._id});
                                    if(inclBot){
                                        bot.inclusiveBot = true;
                                    }else{
                                        bot.inclusiveBot = false;
                                    }
                                     _trainUtterancesBot = _.find(result.linkedBotUtterances,{'id':bot._id});
                                    if(_trainUtterancesBot){
                                        bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                    }
                                    _invocationNamesBot = result.invocationNames && result.invocationNames[bot._id];
                                    if(_invocationNamesBot && _invocationNamesBot.length){
                                        bot.invocationNames =_invocationNamesBot;
                                    }
                                }
                                return bot;
                            });

                                            

                            $scope.linkedBots = $scope.linkedBots.concat($scope.upgradedBots);   
                            }
                           
                            if(result.rejectedBots){
                                $scope.rejectedBots = result.rejectedBots.map(function(bot){
                                bot.state = 'rejected';
                                bot.discription = getBotDiscription(bot._id);
                                 if($scope.botDetails.streamState === 'indevelopment'){
                                        confBot = _.find(result.fallbackConfiguredBots,{'_id':bot._id});
                                        if(confBot){
                                            bot.preferredBotStatus = true;
                                        }else{
                                            bot.preferredBotStatus = false;
                                        }
                                        inclBot =_.find(result.inclusiveConfiguredBots,{'_id':bot._id});
                                        if(inclBot){
                                            bot.inclusiveBot = true;
                                        }else{
                                            bot.inclusiveBot = false;
                                        }
                                        _trainUtterancesBot = _.find(result.linkedBotUtterances,{'id':bot._id});
                                        if(_trainUtterancesBot){
                                            bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                        }
                                        _invocationNamesBot = result.invocationNames && result.invocationNames[bot._id];
                                        if(_invocationNamesBot && _invocationNamesBot.length){
                                            bot.invocationNames =_invocationNamesBot;
                                        }
                                    }else if($scope.botDetails.streamState === 'published'){
                                        confBot = _.find(result.fallbackPublishedBot,{'_id':bot._id});
                                        if(confBot){
                                            bot.preferredBotStatus = true;
                                        }else{
                                            bot.preferredBotStatus = false;
                                        }
                                        inclBot =_.find(result.inclusivePublishedBots,{'_id':bot._id});
                                        if(inclBot){
                                            bot.inclusiveBot = true;
                                        }else{
                                            bot.inclusiveBot = false;
                                        }
                                         _trainUtterancesBot = _.find(result.linkedBotUtterances,{'id':bot._id});
                                        if(_trainUtterancesBot){
                                            bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                        }
                                        _invocationNamesBot = result.invocationNames && result.invocationNames[bot._id];
                                        if(_invocationNamesBot && _invocationNamesBot.length){
                                            bot.invocationNames =_invocationNamesBot;
                                        }
                                    }
                                return bot;
                            });

                            $scope.linkedBots = $scope.linkedBots.concat($scope.rejectedBots);   
                            }
                            
                            if(result.unpublishedBots){
                                $scope.unpublishedBots = result.unpublishedBots.map(function(bot){
                                bot.state = 'unlinked';
                                return bot;
                            });

                                //$scope.linkedBots = $scope.linkedBots.concat($scope.unpublishedBots);
                                $scope.upgradedUnpublishBots = $scope.unpublishedBots.concat($scope.upgradedBots,$scope.awaitingApprovalBots,$scope.rejectedBots);   
                            }
                            $scope.panels = [];
                            $scope.panels_label             =  i18n.i18nString( 'panels_label');
                            $scope.publishedBots = result.publishedBots.filter(function (bot) {
                                if(!_.filter($scope.upgradedUnpublishBots,{'_id':bot._id}).length){
                                    bot.state = 'published';
                                     publishedBot = _.find(result.fallbackConfiguredBots,{'_id':bot._id});
                                        if(publishedBot){
                                            bot.preferredBotStatus = true;
                                        }else{
                                            bot.preferredBotStatus = false;
                                        }
                                    inclPublishedBot =_.find(result.inclusiveConfiguredBots,{'_id':bot._id});
                                    if(inclPublishedBot){
                                        bot.inclusiveBot = true;
                                    }else{
                                        bot.inclusiveBot = false;
                                    }
                                     _trainUtterancesBot = _.find(result.linkedBotUtterances,{'id':bot._id});
                                    if(_trainUtterancesBot){
                                        bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                    }
                                    _invocationNamesBot = result.invocationNames && result.invocationNames[bot._id];
                                    if(_invocationNamesBot && _invocationNamesBot.length){
                                        bot.invocationNames =_invocationNamesBot;
                                    }
                                    return bot;
                              
                                }
                                
                            });
                            $scope.linkedBots = $scope.linkedBots.concat($scope.publishedBots);
                           // $scope.callbacks.linkedBots = $scope.linkedBots;

                    }else if($scope.botDetails.streamState=='published'){
                         $scope.publishedBots = result.publishedBots.map(function (bot) {
                                bot.state = 'published';
                                publishedBot = _.find(result.fallbackPublishedBots,{'_id':bot._id});
                                    if(publishedBot){
                                        bot.preferredBotStatus = true;
                                    }else{
                                        bot.preferredBotStatus = false;
                                    }
                                 inclPublishedBot = _.find(result.inclusivePublishedBots,{'_id':bot._id});
                                    if(inclPublishedBot){
                                        bot.preferredBotStatus = true;
                                    }else{
                                        bot.preferredBotStatus = false;
                                    }
                                     _trainUtterancesBot = _.find(result.linkedBotUtterances,{'id':bot._id});
                                    if(_trainUtterancesBot){
                                        bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                    }
                                    _invocationNamesBot = result.invocationNames && result.invocationNames[bot._id];
                                    if(_invocationNamesBot && _invocationNamesBot.length){
                                        bot.invocationNames =_invocationNamesBot;
                                    }
                                
                             
                                return bot;
                            });
                         $scope.publishedLinkedBots = $scope.publishedBots;
                         $scope.linkedBots = $scope.linkedBots.concat($scope.stream.publishedBots);
                    }  
            }


            function fetchLinkedBots(linkBots) {
                $scope.stream = $workflowService.selectedStream();
                 $scope.linkedBots = [];
                if($scope.stream['universalBotVersion'] === 2){
                   if(linkBots){
                        $scope.linkedBots = linkBots;
                    }else{
                         if ($scope.stream.type === 'universalbot' && $scope.botDetails.streamState=='indevelopment') {
                            var confBot,publishedBot,inclBot,inclPublishedBot,_trainUtterancesBot,_invocationNamesBot;
                            $scope.configuredBots = $scope.stream.configuredBots.map(function (bot) {
                                var language ;
                                language = localStorage.getItem('queryParamLang');
                                if(language){
                                    bot.displayState = i18n.i18nString('linked');
                                }
                                bot.state = 'linked';
                                bot.discription = getBotDiscription(bot._id);
                                var fallbackConfBot;
                                if($scope.botDetails.streamState === 'indevelopment'){
                                    confBot = _.find($scope.stream.fallbackConfiguredBots,{'_id':bot._id});
                                    if(confBot){
                                        bot.preferredBotStatus = true;
                                    }else{
                                        bot.preferredBotStatus = false;
                                    }
                                    inclBot =_.find($scope.stream.inclusiveConfiguredBots,{'_id':bot._id});
                                    if(inclBot){
                                        bot.inclusiveBot = true;
                                    }else{
                                        bot.inclusiveBot = false;
                                    }
                                    _trainUtterancesBot = _.find($scope.stream.linkedBotUtterances,{'id':bot._id});
                                    if(_trainUtterancesBot){
                                        bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                    }
                                    _invocationNamesBot = $scope.stream.invocationNames && $scope.stream.invocationNames[bot._id];
                                    if(_invocationNamesBot && _invocationNamesBot.length){
                                        bot.invocationNames =_invocationNamesBot;
                                    }
                                }else if($scope.botDetails.streamState === 'published'){
                                    confBot = _.find($scope.stream.fallbackPublishedBot,{'_id':bot._id});
                                    if(confBot){
                                        bot.preferredBotStatus = true;
                                    }else{
                                        bot.preferredBotStatus = false;
                                    }
                                    inclBot =_.find($scope.stream.inclusivePublishedBots,{'_id':bot._id});
                                    if(inclBot){
                                        bot.inclusiveBot = true;
                                    }else{
                                        bot.inclusiveBot = false;
                                    }
                                     _trainUtterancesBot = _.find($scope.stream.linkedBotUtterances,{'id':bot._id});
                                    if(_trainUtterancesBot){
                                        bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                    }
                                    _invocationNamesBot = $scope.stream.invocationNames && $scope.stream.invocationNames[bot._id];
                                    if(_invocationNamesBot && _invocationNamesBot.length){
                                        bot.invocationNames =_invocationNamesBot;
                                    }

                                }
                                
                                return bot;
                            });
                            $scope.linkedBots = $scope.linkedBots.concat($scope.configuredBots);
                            

                            $scope.awaitingApprovalBots = $scope.stream.awaitingApprovalBots.map(function (bot) {
                                bot.state = 'awaitingApproval';
                                bot.discription = getBotDiscription(bot._id);
                                if($scope.botDetails.streamState === 'indevelopment'){
                                    confBot = _.find($scope.stream.fallbackConfiguredBots,{'_id':bot._id});
                                    if(confBot){
                                        bot.preferredBotStatus = true;
                                    }else{
                                        bot.preferredBotStatus = false;
                                    }
                                    inclBot =_.find($scope.stream.inclusiveConfiguredBots,{'_id':bot._id});
                                        if(inclBot){
                                            bot.inclusiveBot = true;
                                        }else{
                                            bot.inclusiveBot = false;
                                        }
                                    _trainUtterancesBot = _.find($scope.stream.linkedBotUtterances,{'id':bot._id});
                                    if(_trainUtterancesBot){
                                        bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                    }
                                    _invocationNamesBot = $scope.stream.invocationNames && $scope.stream.invocationNames[bot._id];
                                    if(_invocationNamesBot && _invocationNamesBot.length){
                                        bot.invocationNames =_invocationNamesBot;
                                    }
                                }else if($scope.botDetails.streamState === 'published'){
                                    confBot = _.find($scope.stream.fallbackPublishedBot,{'_id':bot._id});
                                    if(confBot){
                                        bot.preferredBotStatus = true;
                                    }else{
                                        bot.preferredBotStatus = false;
                                    }
                                    inclBot =_.find($scope.stream.inclusivePublishedBots,{'_id':bot._id});
                                    if(inclBot){
                                        bot.inclusiveBot = true;
                                    }else{
                                        bot.inclusiveBot = false;
                                    }
                                    _trainUtterancesBot = _.find($scope.stream.linkedBotUtterances,{'id':bot._id});
                                    if(_trainUtterancesBot){
                                        bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                    }
                                    _invocationNamesBot = $scope.stream.invocationNames && $scope.stream.invocationNames[bot._id];
                                    if(_invocationNamesBot && _invocationNamesBot.length){
                                        bot.invocationNames =_invocationNamesBot;
                                    }
                                }
                                return bot;
                            });
                            $scope.linkedBots = $scope.linkedBots.concat($scope.stream.awaitingApprovalBots);
                            $scope.configuredLinkedBots = $workflowService.cloneData($scope.linkedBots);
                 

                            
                            if($scope.stream.upgradedBots){
                                   $scope.upgradedBots = $scope.stream.upgradedBots.map(function(bot){
                                    bot.state = 'linked';
                                    bot.discription = getBotDiscription(bot._id);
                                    if($scope.botDetails.streamState === 'indevelopment'){
                                        confBot = _.find($scope.stream.fallbackConfiguredBots,{'_id':bot._id});
                                        if(confBot){
                                            bot.preferredBotStatus = true;
                                        }else{
                                            bot.preferredBotStatus = false;
                                        }
                                        inclBot =_.find($scope.stream.inclusiveConfiguredBots,{'_id':bot._id});
                                            if(inclBot){
                                                bot.inclusiveBot = true;
                                            }else{
                                                bot.inclusiveBot = false;
                                            }
                                        _trainUtterancesBot = _.find($scope.stream.linkedBotUtterances,{'id':bot._id});
                                        if(_trainUtterancesBot){
                                            bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                        }
                                        _invocationNamesBot = $scope.stream.invocationNames && $scope.stream.invocationNames[bot._id];
                                        if(_invocationNamesBot && _invocationNamesBot.length){
                                            bot.invocationNames =_invocationNamesBot;
                                        }
                                    }else if($scope.botDetails.streamState === 'published'){
                                        confBot = _.find($scope.stream.fallbackPublishedBot,{'_id':bot._id});
                                        if(confBot){
                                            bot.preferredBotStatus = true;
                                        }else{
                                            bot.preferredBotStatus = false;
                                        }
                                        inclBot =_.find($scope.stream.inclusivePublishedBots,{'_id':bot._id});
                                        if(inclBot){
                                            bot.inclusiveBot = true;
                                        }else{
                                            bot.inclusiveBot = false;
                                        }
                                         _trainUtterancesBot = _.find($scope.stream.linkedBotUtterances,{'id':bot._id});
                                        if(_trainUtterancesBot){
                                            bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                        }
                                        _invocationNamesBot = $scope.stream.invocationNames && $scope.stream.invocationNames[bot._id];
                                        if(_invocationNamesBot && _invocationNamesBot.length){
                                            bot.invocationNames =_invocationNamesBot;
                                        }
                                    }
                                    return bot;
                                }); 
                                $scope.linkedBots = $scope.linkedBots.concat($scope.upgradedBots);
                            }


                            

                           
                            if($scope.stream.rejectedBots){
                                 $scope.rejectedBots = $scope.stream.rejectedBots.map(function(bot){
                                    bot.state = 'rejected';
                                    bot.discription = getBotDiscription(bot._id);
                                    if($scope.botDetails.streamState === 'indevelopment'){
                                        confBot = _.find($scope.stream.fallbackConfiguredBots,{'_id':bot._id});
                                        if(confBot){
                                            bot.preferredBotStatus = true;
                                        }else{
                                            bot.preferredBotStatus = false;
                                        }
                                        inclBot =_.find($scope.stream.inclusiveConfiguredBots,{'_id':bot._id});
                                        if(inclBot){
                                            bot.inclusiveBot = true;
                                        }else{
                                            bot.inclusiveBot = false;
                                        }
                                         _trainUtterancesBot = _.find($scope.stream.linkedBotUtterances,{'id':bot._id});
                                        if(_trainUtterancesBot){
                                            bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                        }
                                        _invocationNamesBot = $scope.stream.invocationNames && $scope.stream.invocationNames[bot._id];
                                        if(_invocationNamesBot && _invocationNamesBot.length){
                                            bot.invocationNames =_invocationNamesBot;
                                        }
                                    }else if($scope.botDetails.streamState === 'published'){
                                        confBot = _.find($scope.stream.fallbackPublishedBot,{'_id':bot._id});
                                        if(confBot){
                                            bot.preferredBotStatus = true;
                                        }else{
                                            bot.preferredBotStatus = false;
                                        }
                                        inclBot =_.find($scope.stream.inclusivePublishedBots,{'_id':bot._id});
                                        if(inclBot){
                                            bot.inclusiveBot = true;
                                        }else{
                                            bot.inclusiveBot = false;
                                        }
                                         _trainUtterancesBot = _.find($scope.stream.linkedBotUtterances,{'id':bot._id});
                                        if(_trainUtterancesBot){
                                            bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                        }
                                        _invocationNamesBot = $scope.stream.invocationNames && $scope.stream.invocationNames[bot._id];
                                        if(_invocationNamesBot && _invocationNamesBot.length){
                                            bot.invocationNames =_invocationNamesBot;
                                        }
                                    }
                                    return bot;
                                });
                                $scope.linkedBots = $scope.linkedBots.concat($scope.rejectedBots);
                            }
                           

                            if($scope.stream.unpublishedBots){
                                $scope.unpublishedBots = $scope.stream.unpublishedBots.map(function(bot){
                                bot.state = 'unlinked';
                                return bot;
                            });

                            //$scope.linkedBots = $scope.linkedBots.concat($scope.unpublishedBots);
                            $scope.upgradedUnpublishBots = $scope.unpublishedBots.concat($scope.upgradedBots,$scope.awaitingApprovalBots,$scope.rejectedBots);
                            }
                            
                            

                            $scope.publishedBots = $scope.stream.publishedBots.filter(function (bot) {
                                if(!_.filter($scope.upgradedUnpublishBots,{'_id':bot._id}).length){
                                    bot.state = 'published';
                                     publishedBot = _.find($scope.stream.fallbackConfiguredBots,{'_id':bot._id});
                                        if(publishedBot){
                                            bot.preferredBotStatus = true;
                                        }else{
                                            bot.preferredBotStatus = false;
                                        }
                                         _trainUtterancesBot = _.find($scope.stream.linkedBotUtterances,{'id':bot._id});
                                        if(_trainUtterancesBot){
                                            bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                        }
                                        _invocationNamesBot = $scope.stream.invocationNames && $scope.stream.invocationNames[bot._id];
                                        if(_invocationNamesBot && _invocationNamesBot.length){
                                            bot.invocationNames =_invocationNamesBot;
                                        }
                                    inclPublishedBot = _.find($scope.stream.inclusiveConfiguredBots,{'_id':bot._id});
                                    if(inclPublishedBot){
                                            bot.inclusiveBot = true;
                                        }else{
                                            bot.inclusiveBot = false;
                                        }
                                         _trainUtterancesBot = _.find($scope.stream.linkedBotUtterances,{'id':bot._id});
                                        if(_trainUtterancesBot){
                                            bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                        }
                                        _invocationNamesBot = $scope.stream.invocationNames && $scope.stream.invocationNames[bot._id];
                                        if(_invocationNamesBot && _invocationNamesBot.length){
                                            bot.invocationNames =_invocationNamesBot;
                                        }
                                        if(!bot.botName){
                                        var allBots = $workflowService.streamsAll();
                                        var standardBot = _.find(allBots, {'_id': bot._id});
                                        if(standardBot && standardBot.name) {
                                            bot.botName = standardBot.name;
                                        }
                                        }
                                    return bot;
                              
                                }
                                
                            });
                            $scope.linkedBots = $scope.linkedBots.concat($scope.publishedBots);
                           // $scope.callbacks.linkedBots = $scope.linkedBots;

                    }else if($scope.stream.type === 'universalbot' && $scope.botDetails.streamState=='published'){
                         $scope.publishedBots = $scope.stream.publishedBots.map(function (bot) {
                                bot.state = 'published';
                                publishedBot = _.find($scope.stream.fallbackPublishedBots,{'_id':bot._id});
                                    if(publishedBot){
                                        bot.preferredBotStatus = true;
                                    }else{
                                        bot.preferredBotStatus = false;
                                    }
                                     _trainUtterancesBot = _.find($scope.stream.linkedBotUtterances,{'id':bot._id});
                                        if(_trainUtterancesBot){
                                            bot.trainUtterances = _trainUtterancesBot.trainingUtterances;
                                        }
                                        _invocationNamesBot = $scope.stream.invocationNames && $scope.stream.invocationNames[bot._id];
                                        if(_invocationNamesBot && _invocationNamesBot.length){
                                            bot.invocationNames =_invocationNamesBot;
                                        }
                                inclPublishedBot = _.find($scope.stream.inclusivePublishedBots,{'_id':bot._id});
                                    if(inclPublishedBot){
                                            bot.inclusiveBot = true;
                                        }else{
                                            bot.inclusiveBot = false;
                                        }
                                         _trainUtterancesBot = _.find($scope.stream.linkedBotUtterances,{'id':bot._id});
                                        if(_trainUtterancesBot){
                                            bot.trainUtterances =_trainUtterancesBot.trainingUtterances;
                                        }
                                        _invocationNamesBot =  $scope.stream.invocationNames && $scope.stream.invocationNames[bot._id];
                                        if(_invocationNamesBot && _invocationNamesBot.length){
                                            bot.invocationNames =_invocationNamesBot;
                                        }
                                    return bot;
                            });
                         $scope.publishedLinkedBots = $scope.publishedBots;
                         $scope.linkedBots = $scope.linkedBots.concat($scope.publishedLinkedBots);
                    }  
                       
                      
                }
                 
                }else{
                    if ($scope.stream.type === 'universalbot') { 
                        $scope.linkedBots = [];
                        $scope.configuredBots = $scope.stream.configuredBots.map(function (bot) {
                            bot.state = 'linked';
                            bot.discription = getBotDiscription(bot._id);
                            return bot;
                        });
                        $scope.linkedBots = $scope.linkedBots.concat($scope.configuredBots);
                        

                        $scope.awaitingApprovalBots = $scope.stream.awaitingApprovalBots.map(function (bot) {
                            bot.state = 'awaitingApproval';
                            return bot;
                        });
                        $scope.linkedBots = $scope.linkedBots.concat($scope.stream.awaitingApprovalBots);
                        $scope.configuredLinkedBots = $workflowService.cloneData($scope.linkedBots);

                        $scope.publishedBots = $scope.stream.publishedBots.map(function (bot) {
                            bot.state = 'published';
                            return bot;
                        });
                        $scope.publishedLinkedBots = $scope.publishedBots;
                        $scope.linkedBots = $scope.linkedBots.concat($scope.stream.publishedBots);
                        $scope.callbacks.linkedBots = $scope.linkedBots;
                    } 
                }
               
            
                   
               
            }

            $scope.fetchLinkBots = fetchLinkedBots;
           


            function fetchUnlinkBots(unlinkBots){
                if(unlinkBots){
                     $scope.selectedStream = $workflowService.selectedStream();
                     $scope.streamsList = $workflowService.cloneData(unlinkBots);
                     $scope.myBots = $workflowService.cloneData($scope.streamsList).filter(function (bot) {
                        bot['trainingData']= {};
                        bot['trainingData']['invocationNames'] = [];
                        bot['trainingData']['invocationNames'].push(bot.name);
                        if ($scope.linkedBots && $scope.linkedBots.length) {
                            if (_.pluck($scope.linkedBots, '_id').indexOf(bot._id) !== -1) {
                                bot.linked = true;
                            }
                        }
                        
                        return (bot.type !== 'universalbot' && !bot.linked && !bot.onMessageEnabled &&
                               (bot.purpose === $scope.selectedStream.purpose));
                    });
                }else{
                    $scope.selectedStream = $workflowService.selectedStream();
                    $scope.streamsList = $workflowService.streamsAll();
                    $scope.myBots = $workflowService.cloneData($scope.streamsList).filter(function (bot) {
                        bot['trainingData']= {};
                        bot['trainingData']['invocationNames'] = [];
                        bot['trainingData']['invocationNames'].push(bot.name);
                        if ($scope.linkedBots && $scope.linkedBots.length) {
                            if (_.pluck($scope.linkedBots, '_id').indexOf(bot._id) !== -1) {
                                bot.linked = true;
                            }
                        }
                        
                        return (bot.type !== 'universalbot' && !bot.linked && !bot.onMessageEnabled &&
                               (bot.purpose === $scope.selectedStream.purpose));
                    });
                }
                
                $workflowService.linkableBots = $scope.myBots.length ? true : false;

            }

             $scope.fetchUnlinkBots = fetchUnlinkBots;



            function getAccountForStream() {
                BTStreamsService.getAccounts($workflowService.selectedStream()._id, "true", "true")
                    .then(function (res) {
                        $scope.account1 = res.data;
                        updateIDPData();
                    }, function (err) {

                    });

            }

            function trainStatus(){
                BTStreamsService.autoTrainStatus($workflowService.selectedStream()._id).then(function(res) {
                    if (res && res.data && res.data.hasOwnProperty('isMlInSyncWithUBTraining') && !res.data.isMlInSyncWithUBTraining) {
                            $scope.trainShow = true;
                        } else{
                            $scope.trainShow = false;
                        }
                        if(res.data.trainingStatus === 'Finished'){
                            $scope.showTrainSavingSyn = false;
                            $scope.trainStatus.saving = false;
                        } else if(res.data.trainingStatus === 'Failed'){
                            $scope.showTrainSavingSyn = false;
                            $scope.trainStatus.saving = false;
                        }
                      
                },function(err){
                    $scope.showTrainSavingSyn = false;
                    $scope.trainStatus.saving = false;
                    if(accessControlService.getAccessRight("BOTBUILDER_NATURAL_LANGUAGE") !== 'NO'){
                        var _msg = i18n.i18nString('err_on_fetching_msg');
                        NotificationService.notify(_msg, "error");
                    }
                });    
            }

            var updateIDPData = function (accountDetails) {
                var idpDetails = $workflowService.cloneData($scope.idpConfigs);

                if (accountDetails) {
                    $.each(idpDetails, function (j, idpData) {
                        if (idpData.name === accountDetails.idp) {
                            idpDetails[j].account = [];
                        }
                    });
                } else {
                    $.each($scope.account1, function (i, accountData) {
                        $.each(idpDetails, function (j, idpData) {
                            if (idpData.name === accountData.idp) {
                                idpDetails[j].account = [accountData];
                            }
                        });
                    });

                }


                $scope.idpConfigs = $workflowService.cloneData(idpDetails);
            };

            function appendCategory(stream) {
                var i, j, k;
                stream.categoryname = [];
                if (stream.categoryIds) {
                    for (j = 0; j < stream.categoryIds.length; j++) {
                        for (i = 0; i < $scope.categories.length; i++) {
                            if (stream.categoryIds[j] === $scope.categories[i]._id) {
                                stream.categoryname.push($scope.categories[i].name);
                            }
                            var subC = $scope.categories[i].subCategories;
                            if (subC && subC.length) {
                                for (k = 0; k < subC.length; k++) {
                                    if (stream.categoryIds[j] === subC[k]._id) {
                                        stream.categoryname.push(subC[k].name);
                                    }
                                }
                            }
                        }
                    }
                    stream.categoryname = stream.categoryname.map(function (category, index) {
                        if (index !== 0) {
                            return ' ' + category;
                        } else {
                            return category;
                        }
                    });
                    stream.categoryname = stream.categoryname.join(',');
                } else {
                    stream.categoryname = '';
                }

            }

            function loadAutoTrainMLStatus() {
                $scope.autotrainData = {};
                if ($scope.stream.hasOwnProperty("enableAutoUtteranceAddition")) {
                    $scope.autotrainData.enableAutoUtteranceAddition = $scope.stream.enableAutoUtteranceAddition;
                }
                else {
                    $scope.autotrainData.enableAutoUtteranceAddition = false;
                }
            }

            function getStream(stream) {
                var id = stream._id;
                var deferred = $q.defer();
                $scope.loadingStream = true;
                $scope.stream = {};
                $scope.authInfo = null;
                $scope.account1 = null;

                var _reqStreamID = (stream.state && stream.state === 'setup') ? stream.sbStreamId : id;
                var requests = [BTStreamsService.getBTStream(id), BTStreamsService.getMPStream(id)];

                $q.all(requests).then(function (res) {

                    $scope.stream = angular.extend($scope.stream, res[0].data);
                    loadAutoTrainMLStatus();
                    delete res[1].data.visibility;
                    $scope.stream = angular.extend($scope.stream, res[1].data);
                    $scope.stream.name = $scope.stream.name ? $scope.stream.name.replace(/&lt;/g, '<').replace(/&gt;/g, '>') : '';
                    $scope.stream.description = $scope.stream.description ? $scope.stream.description.replace(/&lt;/g, '<').replace(/&gt;/g, '>') : '';
                    $scope.stream.state = res[0].data.state;
                    $scope.supportedLanguages = mapSupportedLanguages();
                    $workflowService.supportedLanguages($scope.supportedLanguages);

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
                    $workflowService.selectedStream($workflowService.cloneData($scope.stream));
                    $rootScope.currSelectedBot = $workflowService.selectedStream();
                    $scope.callbacks.botSelected($rootScope.currSelectedBot);
                    $scope.builderNavigator.prepareNavigationTree();    
                    //fetchLinkedBots();
                    getUserSessionContext();
                    prepareDefautDialogData($scope.dialogTasks);
                    BTStreamsService.getAuthinfo(id).then(function (res) {
                        if (res.data) {
                            $scope.authInfo = res.data;
                            $scope.idpConfigs = [];

                            $.each($scope.authInfo, function (i, authData) {
                                BTIdpService.getIdpByName(authData.idpName, $workflowService.selectedStream()._id)
                                    .then(function (res) {
                                        // $scope.idpConfig = res.data;
                                        $scope.idpConfigs.push(res.data);
                                    }, function (err) {
                                        // $scope.idpConfig = {};
                                        $scope.idpConfigs = $scope.idpConfigs || [];
                                    });
                            });

                            getAccountForStream();
                        }
                    }, function (err) {

                    });

                    // $scope.categories = $scope.callbacks.categories;
                    if ($scope.stream.type === "solution") {
                        $scope.stream.isSolutionBot = true;
                    }
                    $scope.stream = $workflowService.selectedStream($workflowService.cloneData($scope.stream));
                    // appendCategory($scope.stream);
                    $timeout(function () {
                        $scope.loadingStream = false;
                    });
                    deferred.resolve(res);

//                    BTStreamsService.getSolutionBotStream(_reqStreamID)
//                        .then(function (res) {
//                            if (res.data.botType === "solution" || res.data.botType === "workplacefb" || res.data.botType === "enterprise") {
//                                res.data.isSolutionBot = true;
//                            }
//                            $scope.stream = angular.extend($scope.stream, res.data);
//                            if (!$scope.stream.bBanner) {
//                                $scope.stream.bBanner = 'no-image';
//                            }
//                            $workflowService.selectedStream($workflowService.cloneData($scope.stream));
//                            appendCategory($scope.stream);
//                            $timeout(function () {
//                                $scope.loadingStream = false;
//                            });
//                            deferred.resolve(res);
//                        }, function (err) {
//                                appendCategory($scope.stream);
//                                $timeout(function () {
//                                    $scope.loadingStream = false;
//                                });
//                                deferred.resolve(res);
//                        });

                }, function (err) {

                    $timeout(function () {
                        $scope.loadingStream = false;
                    });
                    deferred.reject(err);

                });
                return deferred.promise;

            }
          $scope.callbacks.getStream=getStream;

            function mapSupportedLanguages() {
                // var seedData = $workflowService.seedData();
                // return _.compact(_.map(seedData.supportedLanguages, function (lang) {
                //     if (_.indexOf($scope.stream.supportedLanguages, lang.value) !== -1) {
                //         return lang;
                //     }
                // }));
                 var availableLanguages = $workflowService.cloneData($workflowService.seedData().supportedLanguages);
                 $scope.configuredLanguages = $workflowService.selectedStream().languageConfigurations?$workflowService.selectedStream().languageConfigurations:$workflowService.supportedLanguages;
                 if($workflowService.selectedStreamState() === 'indevelopment'){
                    $scope.languages = _.filter(availableLanguages,function(lan){
                           if($scope.configuredLanguages && $scope.configuredLanguages[lan.value] && $scope.configuredLanguages[lan.value].hasOwnProperty('enabled'))
                               {
                                   lan.enabled = $scope.configuredLanguages[lan.value]['enabled'];
                                   return lan;
                                    
                             }
                         });
                    return $scope.languages;
                 }else if($workflowService.selectedStreamState === 'published'){
                      $scope.taskApprovedLanguages = $workflowService.selectedStream().taskApprovedLanguages;
                      $scope.taskDisabledLanguages = $workflowService.selectedStream().publishedDisabledLangs;
                      $scope.languages = _.filter(availableLanguages,function(lan){
                               if($scope.taskApprovedLanguages && $scope.taskApprovedLanguages.indexOf(lan.value) !== -1)
                                   {
                                       lan.enabled = true;
                                       return lan;
                                        
                                 }
                                 if($scope.taskDisabledLanguages && $scope.taskDisabledLanguages.indexOf(lan.value) !== -1)
                                   {
                                       lan.enabled = false;
                                       return lan;
                                        
                                 }
                             });
                      return $scope.languages;
                 }
                 
            }

            // $scope.fullModalCallback = {
            //     openOntologyModel: $scope.openOntologyModel,
            //     onFlowDialogClosed: $scope.onFlowDialogClosed
            // };
            
            $scope.groupCb = $.extend(($scope.groupCb || {}),{
                getSmallTalkGroups : getGroups
            });
            function isSolutionBot() {
                return $scope.stream.state && $scope.stream.sbStreamId && ($scope.stream.state == 'setup') ? true : false;
            }

            $scope.callbacks.selectBot = $scope.selectBot;
            $scope.callbacks.fullModalCallback = $scope.fullModalCallback;
            $scope.callbacks.showSolutionBotSetup = isSolutionBot();
            $scope.callbacks.changeBotLanguage = $scope.changeBotLanguage;
            $scope.callbacks.fetchLinkedBots = fetchLinkedBots;
            $scope.callbacks.fetchUnlinkBots = fetchUnlinkBots;
            $scope.callbacks.storeUnlinkBots = fetchUnlinkBots;
            $scope.callbacks.showActivType   = $scope.showActivType;
            $scope.callbacks.navigateTo   = $scope.navigateTo;
            $scope.callbacks.updateBotStates  = updateBotStates;
            $scope.callbacks.trainStatus = trainStatus;
            $scope.editTrain.trainStatus = trainStatus;
            $scope.editTrain.canAccessService = canAccessService;
            $scope.callbacks.setSubTabToOpen = $scope.setSubTabToOpen;
            showTalkToBotIcon();

            $scope.modalSlider={};
            $scope.rightClass='right500';

            function showTalkToBotIcon() {
                $(".talkToBot").show();
            }

            $scope.linkBots = function (className) {

                if (!$workflowService.linkableBots) {
                    NotificationService.notify(i18n.i18nString('no_linkable',{stream:stream.purpose }), 'warning');
                } else {
                    //openModalByClass(className);
                  $scope.modalSlider.open('#linkedBotsList');
                }
                $scope.$broadcast('updateLinkableBots',{data:$scope.selectedStream});

            };

            $scope.linkOrUnlinkBot = function (bot) {
                var payLoad = {
                    bots: [ { "_id" : bot._id, "displayName" : bot.displayName}]
                };
                $element.find('#unlinkInfo').addClass('fade').removeClass('show');
                BTStreamsService.linkOrUnlinkBots($scope.stream._id, 'unlink', payLoad).then(function (res) {
                    $workflowService.selectedStream($scope.selectedStream);
                        if(res && res.data){
                         NotificationService.notify(i18n.i18nString('selected_Bot_unlinked_sucess'),'success');
                         $scope.selectedStream = $workflowService.selectedStream(res.data);
                         fetchLinkedBots();
                         
                     
                           
                    }
                    //$scope.$emit("loadBots",res.data);
                }, function (err) {

                });
            };

        
            $scope.linkBotsV2 = function () {
                $scope.botSelectionView = true;
                if(!$workflowService.linkableBots){
                    NotificationService.notify('There are no linkable bots for this bot, please create atleast two bots of ' + $scope.stream.purpose + ' type', 'warning');
                }else {
                   $timeout(function(){
                        $scope.linkView.fetchingUnlinkedBots = true;
                        $scope.openModalSlider('#linkBot');
                        setTimeout(function(){
                            $scope.linkView.fetchUnlinkedBots($scope.linkedBots);
                        },500);
                        
                        
                    }); 
                }    

            };

            $scope.unlinkInfo = function(bot){
                $scope.widgetStreamId = bot._id;
                BTStreamsService.getBotPanels($workflowService.selectedStream()._id).then(function (res) {
                    $scope.panels = res.data;
                    $scope.widgetNames = [];
                    if($scope.panels && $scope.panels.length){
                    $.each($scope.panels,function(i,panel){
                        if(panel.linkedBotWidgets){
                            panel.widgetNames = [];
                            if(panel.linkedBotWidgets[$scope.widgetStreamId] && panel.linkedBotWidgets[$scope.widgetStreamId].length){
                         $.each(panel.linkedBotWidgets[$scope.widgetStreamId],function(stream,widgetref){
                                    panel.widgets.push(widgetref.widgetRefId);  
                                    panel.widgetNames.push(widgetref.name);
                                    // $scope.linkedUbWidgets[widRe.widgetRefId] = stream;
                         });
                         $scope.widgetName = panel.widgetNames +" in "+ panel.name ;
                         $scope.widgetNames.push($scope.widgetName);
                        }
                         if ($scope.widgetNames.length && panel.linkedBotWidgets) {
                            $element.find('#unlinkWidgetInfo').addClass('show').removeClass('fade');
                        } else {
                            $element.find('#unlinkInfo').addClass('show').removeClass('fade');
                        }
                        }
                        else{
                            $element.find('#unlinkInfo').addClass('show').removeClass('fade');

                        }
                    });
                    }
                    else{
                        $element.find('#unlinkInfo').addClass('show').removeClass('fade');
                     }
                 }, function (error) {
                     if (error && error.data && error.data.errors) {
                         var _msg = error.data.errors[0].msg;
                         NotificationService.notify(_msg, 'error');
                     } else if (error.errors && _.isArray(error)) {
                         var msg = error.errors[0].msg;
                         NotificationService.notify(msg, 'error');
                     } else {
                         NotificationService.notify(i18n.i18nString('error_fetching_panel'), 'error');
                     }
                 });
                $scope.currentLinkBot = bot;
            };

            $scope.closeUnlinkInfo = function(){
                $element.find('#unlinkInfo').addClass('fade').removeClass('show');
            };
            $scope.closeUnlinkWidgetsInfo = function(){
                $element.find('#unlinkWidgetInfo').addClass('fade').removeClass('show');
            };
            $scope.UnlinkProceed = function(){
                $scope.rightPanel.innerRightPanel.showView("widgets");
            };
           

            $scope.linkOrUnlinkBotV2 = function (bot) {
                var payLoad = {
                    bots: [ { "_id" : bot._id, "displayName" : bot.displayName}]
                };
                 $element.find('#unlinkInfo').addClass('fade').removeClass('show');
                BTStreamsService.linkOrUnlinkBots($scope.stream._id, 'unlink', payLoad).then(function (response) {
                    $scope.selectedStream = response.data;
                    $workflowService.selectedStream($scope.selectedStream);
                    if(response && response.data){
                         NotificationService.notify(i18n.i18nString('selected_Bot_unlinked_sucess'),'success');
                         updateBotStates(response.data);
                         fetchUnlinkBots();
                     
                           
                    }
                }, function (err) {
                    if(err && err.data && err.data.errors && err.data.errors.length && err.data.errors[0].msg){
                        NotificationService.notify(err.data.errors[0].msg,'error',20000);
                    } else {
                        NotificationService.notify(i18n.i18nString('some_thing_wrong_label'),'error');
                    }
                });
            };

            $scope.upgradeLinkBot = function (bot) {
                var payLoad = {
                    bots: [ { "_id" : bot._id, "displayName" : bot.displayName}]
                };
                BTStreamsService.linkOrUnlinkBots($scope.stream._id, 'upgrade', payLoad).then(function (response) {
                    $scope.selectedStream = response.data;
                    $workflowService.selectedStream($scope.selectedStream);
                    if(response && response.data){
                         NotificationService.notify(i18n.i18nString('selected_Bot_upgraded_success'),'success');
                         updateBotStates(response.data);
                        
                           
                    }

                }, function (err) {
                    NotificationService.notify(i18n.i18nString('some_thing_wrong_label'),'error');
                });
            };

            $scope.linkUnlinkedBot  = function(bot){
                var payLoad = {
                    bots: [ { "_id" : bot._id, "displayName" : bot.displayName}]
                };
                 BTStreamsService.linkOrUnlinkBots($scope.stream._id, 'link', payLoad).then(function (response) {
                    $scope.selectedStream = response.data;
                    $workflowService.selectedStream($scope.selectedStream);
                    if(response && response.data){
                         NotificationService.notify(i18n.i18nString('selected_success'),'success');
                         updateBotStates(response.data);
                           
                    }
                }, function (err) {
                    NotificationService.notify(i18n.i18nString('some_thing_wrong_label'),'error');
                });
            };
           
            //  $scope.deleteLinkBot = function (bot) {
            //     var payLoad = {
            //         bots: [ { "_id" : bot._id, "displayName" : bot.displayName}]
            //     };
            //     var publishedBot = _.filter($scope.selectedStream.publishedBots,{_id:bot._id});
            //     if(publishedBot.length){
            //         NotificationService.notify('Cannot delete published bot without admin approval','error');
            //         return;
            //     }
            //     BTStreamsService.linkOrUnlinkBots($scope.stream._id, 'delete', payLoad).then(function (response) {
            //         //$scope.$emit("loadBots",res.data);
            //         $scope.selectedStream = response.data;
            //         $workflowService.selectedStream($scope.selectedStream);
            //         if(response && response.data){
            //              NotificationService.notify(i18n.i18nString('selected_deleted'),'success');
            //                 updateBotStates(response.data);
            //                 fetchUnlinkBots();
                           
            //         }
            //     }, function (err) {
            //         NotificationService.notify(i18n.i18nString('some_thing_wrong_label'),'error');
            //     });
            // };

            $scope.unlinkLinkedBot = function(bot,state){
                    var payLoad = {
                            bots: [ { "_id" : bot._id, "displayName" : bot.displayName}]
                        };
                BTStreamsService.linkOrUnlinkBots($scope.stream._id,state,payLoad).then(function(response){
                            $scope.selectedStream = response.data;
                            $workflowService.selectedStream($scope.selectedStream);
                            if(response && response.data){
                                 NotificationService.notify(i18n.i18nString('selected_Bot_unlinked_sucess'),'success');
                                 updateBotStates(response.data);
                                   
                            }
                });
            };

            $scope.onBotLinkingCompleted = function (botData) {
                closeModalByClass('.bots-selection-form');
               // $scope.$emit("loadBots",botData);
            };
            $scope.editTask = function (e, task) {
                task.supportedLanguages = task.supportedLanguages || [];
                var _defaultApprovedLanguages = task.supportedLanguages.filter(function (lang) {
                    return lang.disable;
                });
                _defaultApprovedLanguages = _defaultApprovedLanguages || [];
                if (task._selected && task.state !== 'published' && _defaultApprovedLanguages.length === 0) {
                    for (var i = 0; i < task.supportedLanguages.length; i++) {
                        task.supportedLanguages[i].selected = true;
                        $scope.addLanguage(e, task.supportedLanguages[i], task);
                    }
                } else if (task.state !== 'published' && _defaultApprovedLanguages.length === 0) {
                    for (var j = 0; j < task.supportedLanguages.length; j++) {
                        task.supportedLanguages[j].selected = false;
                        $scope.addLanguage(e, task.supportedLanguages[j], task);
                    }
                }
            };

            $scope.addLanguage = function (e, language, task) {
                if (!language.selected) {
                    language.selected = false;
                    task.approvedLanguagesCopy.splice(_.indexOf(task.approvedLanguagesCopy, language.value), 1);
                    if(task.approvedLanguages){
                        task.approvedLanguages.splice(_.indexOf(task.approvedLanguages, language.value), 1);
                    }
                    
                } else {
                    language.selected = true;
                    task.approvedLanguagesCopy.push(language.value);
                    (task.approvedLanguages || []).push(language.value);
                }
                task.approvedLangString = convertToString(task.approvedLanguages);
                //getting objects which are selected
                task._selected = true;
                var _selectedLanguages = task.supportedLanguages.filter(function (lang) {
                    return lang.selected;
                });
                var _defaultApprovedLanguages = task.supportedLanguages.filter(function (lang) {
                    return lang.disable;
                });
                if (_selectedLanguages && _selectedLanguages.length === 0 && task.state !== 'published' && _defaultApprovedLanguages.length === 0) {
                    if($scope.stream.visibility.namespace === 'private'){
                        language.selected=true;
                    }else{
                        task._selected = false;
                    }

                }
            };


            $scope.publishMapping = function (mapping, index) {
                    if (mapping.mapId) {
                        BTStreamsService.publishFlow(mapping.mapId)
                            .then(function (res) {
                                getMappings($workflowService.selectedStream()._id);
                                getAlertDialogMappings($workflowService.selectedStream()._id);
                                NotificationService.notify(i18n.i18nString('flow_publish'), 'success');
                            }, function (err) {
                                console.log(err);
                                NotificationService.notify(err.data.errors[0].msg, 'error');
                            });
                    }
                    else {
                        BTStreamsService.publishAlertDialogFlow(mapping._id)
                            .then(function (res) {
                                getMappings($workflowService.selectedStream()._id);
                                getAlertDialogMappings($workflowService.selectedStream()._id);
                                NotificationService.notify(i18n.i18nString('flow_publish'), 'success');
                            }, function (err) {
                                console.log(err);
                                NotificationService.notify(err.data.errors[0].msg, 'error');
                            });
                    }
                };


            function getDefaultdialogPayload() {
                var payload = {resources: []};
                var dialogs = _.uniq($scope.defaultDialogs,("refId"));
                if(dialogs){
                    
                
                dialogs.map(function (task) {

                    var parent;

                    if (task.parentId) {
                        parent = $scope.defaultDailogdata.filter(function (item) {
                            return item._id === task.parentId;
                        })[0] || {};
                    }

                    if (task.approvedLanguagesCopy) {
                        delete task.approvedLanguagesCopy;
                    }

//                                if(task.approvedLangString){
//                                    delete task.approvedLangString;
//                                }

                    var taskUpgradeInfo = {
                        namespace: 'enterprise',//task.parentId ? (parent.visibility.namespace == "enterpriseNpublic" ? "enterprise" : task.namespaceTo) : (task.namespaceTo == "enterpriseNpublic" ? "enterprise" : task.namespaceTo),
                        resourceId: task._id,
                        namespaceIds: task.parentId ? parent.visibility.namespaceIds : task.namespaceIds || [],
                        resourceType: 'dialog',
                        upgradeShortMsg: task.upgradeShortMessage,
                        upgradeLongMsg: task.upgradeLongMessage,
                        versionComment: task.upgradeVersionComment,
                        approvalRequestedLanguages: $scope.defaultDialogs[0].approvedLanguages //we can use defaultDialogs[0] as the lanaguage selelection as only one default dialog will be ther for universal bot 
                    };

//                                if (taskUpgradeInfo.namespace === "enterprise") {
//                                    taskMap[task._id] = task.name;
//                                } else {
//                                    taskMap[task.parentId ? task.parentId : task._id] = task.name;
//                                    taskMap[task._id] = task.name;//maintaining both parent task name and child task name in else now.Condition can be removed
//                                }

                    if (task.parentId) {
                        taskUpgradeInfo.versionType = task.versionType;
                        _.addProps(task.upgradeInfo && task.upgradeInfo.upgrade !== 'automatic', taskUpgradeInfo, {upgradeType: task.upgradeType});
                    }

                    payload.resources.push(taskUpgradeInfo);

                });
            }
                return payload;

            }

              $scope.fullModalCallback.isSolutionBotSetup = false;
                $scope.setupSolutionBot = function () {
                    if ($scope.showSolutionBotSetup) {
                    $workflowService.selectedSmartBot($scope.stream);
                    $scope.fullModalCallback.openFullPageModal(6, 'createBot');
                   }
                };

                $scope.setupSampleBot = function () {
                    var options = {
                        showTemplateInstalation:true,
                        initialSetup:$scope.callbacks.invokeSetUp
                    };
                    $scope.builderNavigator.showInstallationModal(null,options);
                    $scope.callbacks.invokeSetUp =  false;
                };

                $scope.callbacks.setupTheBot = function(bot) {
                    bot = bot || $workflowService.selectedStream();
                    if(bot.sbStreamId){
                        $scope.callbacks.invokeSetUp =  false;
                        $scope.setupSolutionBot();
                    } else if(bot.solutionBotSettings && (bot.type === 'default')){
                        $scope.setupSampleBot();
                    } else {
                        $scope.builderNavigator.showInstallationModal();
                    }
                };

                   $scope.unlockTask = function (task) {
                    $scope.selectedTask = task;
                    $timeout(function () {
                        openModalByClass('.unlock-sol-bot');
                    });
                };

                $scope.confirmUnlock = function () {
                    var task = $scope.selectedTask;
                    $scope.taskUnlocking = true;
                    if (task._id.substring(0, 1) === 'a') {//action
                        BTActionsService.unlockBTAction(task._id, $workflowService.selectedStream()._id)
                            .then(function (res) {
                                closeModalByClass('.unlock-sol-bot');
                                $('body').removeClass('modal-open');
                                //$('body').removeClass('bt-modal-open');
                                $rootScope.$broadcast("loadBots", $workflowService.selectedStream(),'botTasks');
                                $scope.taskUnlocking = false;
                            }, function (res) {
                                NotificationService.notify(i18n.i18nString('confirm_unlock'));
                                $scope.taskUnlocking = false;
                            });
                    } else if (task._id.substring(0, 1) === 'l') {//alert

                        BTAlertsService.unlockBTAlert(task._id, $workflowService.selectedStream()._id)
                            .then(function (res) {
                                closeModalByClass('.unlock-sol-bot');
                                $('body').removeClass('modal-open');
                                //$('body').removeClass('bt-modal-open');
                                $rootScope.$broadcast("loadBots", $workflowService.selectedStream(),'botTasks');
                                $scope.taskUnlocking = false;
                            }, function (res) {
                                NotificationService.notify(i18n.i18nString('confirm_unlock'));
                                $scope.taskUnlocking = false;
                            });
                    } else {
                        var userId = $applicationService.userInfo().userId;

                        var requestData = {
                            "resources": [
                                {
                                    "resourceType": task.taxonomy ? "knowledge" : "dialog",
                                    "resourceId": task._id
                                }
                            ]
                        };

                        BTActionsService.unlockDialog(task._id, $workflowService.selectedStream()._id, userId, requestData)
                            .then(function (res) {
                                closeModalByClass('.unlock-sol-bot');
                                $('body').removeClass('modal-open');
                                //$('body').removeClass('bt-modal-open');
                                $rootScope.$broadcast("loadBots", $workflowService.selectedStream(),'botTasks');
                                $scope.taskUnlocking = false;
                            }, function (res) {
                                NotificationService.notify(i18n.i18nString('confirm_unlock'));
                                $scope.taskUnlocking = false;
                            });
                    }

                };
            // code related to universal bot publish//
            if($scope.stream.universalBotVersion === 1 || !$scope.stream.universalBotVersion){
              $scope.allBotsSelected={
                    isSelected :false
                };   
            }else if($scope.stream.universalBotVersion === 2){
                  $scope.allBotsSelected={
                    isSelected :true
                };  
            }
           
             function prepareChannelData(){
                 $scope.stream=$workflowService.selectedStream();
                    var channels=[];
                    $scope.approvedChannels = [];
                    channelsConfig.getDynamicChannels($scope.stream);
                    $scope.allChannels = $workflowService.cloneData(channelsConfig.channelsObject);
                   
                   if($scope.stream && $scope.stream.hasOwnProperty('channelStatus')){
                       if($scope.stream.channelStatus){
                        var channelRes = Object.keys($scope.stream.channelStatus).map(function (k) {
                            if($scope.allChannels[k]){
                                var channelObj = {};
                                channelObj.name = $scope.allChannels[k].name;
                                channelObj.type = $scope.allChannels[k].id;
                                channelObj.selected = true;
                                channelObj.icon = $scope.allChannels[k].icon;
                                channelObj.status = $scope.stream.channelStatus[k].state || $scope.stream.channelStatus[k];
                                channels.push(channelObj);
                                $scope.approvedChannels.push($scope.allChannels[k].id);
                                return [{k: $scope.stream.channelStatus[k]}];
                            }
                        });   
                       }else{
                         channels=[];  
                       }
                            
                   }else{
                        $scope.stream.channels.map(function(channel){
                       var channelObj={};
                            channelObj.name = $scope.allChannels[channel.type].name;
                            channelObj.type = $scope.allChannels[channel.type].id;
                            channelObj.selected = true;
                            channelObj.icon =$scope.allChannels[channel.type].icon;
                            channels.push(channelObj);
                            $scope.approvedChannels.push($scope.allChannels[channel.type].id);
                   });
                   }
                   return channels;
                }

             function prepareLinkedBotState(){
                $scope.linkedBotStates = [];
                $scope.deletedLinkedBots = [];
                $scope.stream = $workflowService.selectedStream();
                var newPublishState = $scope.stream.configuredBots.map(function(bot){
                    bot.publishState = 'new';
                    bot.selected = true;
                    return bot;
                });
                $scope.linkedBotStates = $scope.linkedBotStates.concat(newPublishState);

                if($scope.stream.upgradedBots){
                    var updatePublishState = $scope.stream.upgradedBots.map(function(bot){
                     bot.publishState = 'update';
                    bot.selected = true;
                    return bot;
                });
                $scope.linkedBotStates = $scope.linkedBotStates.concat(updatePublishState);
                }
                
                if($scope.stream.unpublishedBots){

                    var deletePublishState = $scope.stream.unpublishedBots.filter(function(bot){
                        if(!_.filter($scope.stream.awaitingUnpublishedBots,{'_id':bot._id}).length && !bot.isDeleted){
                            bot.publishState = 'delete';
                            bot.selected = true;
                            return bot; 
                        }
                        
                    });
                    $scope.linkedBotStates = $scope.linkedBotStates.concat(deletePublishState); 
                    $scope.deletedLinkedBots = _.filter($scope.stream.unpublishedBots,{'isDeleted':true});
                     _.map($scope.deletedLinkedBots,function(linkBot){
                        linkBot.publishState = 'delete';
                        return linkBot;
                    });

                }

                

               



                
             }


             function prepareDeletedLinkedBots(){
                $scope.deletedLinkedBots = [];
                _.map($scope.stream.publishedBots,function(bot){
                    if(bot.isDeleted){
                        $scope.deletedLinkedBots.push(bot);
                    }

                });
             }

             function prepareLanguageData(){

                function getDeletedLanguages(){
                     var _totalPublishedLang = [],result = [];
                     if($scope.stream && $scope.stream.languageConfigurations && $scope.stream.languageConfigurations !== null){
                        if($scope.stream && $scope.stream.taskApprovedLanguages){
                            _totalPublishedLang = _totalPublishedLang.concat($scope.stream.taskApprovedLanguages);
                       }
                       if($scope.stream && $scope.stream.publishedDisabledLangs && $scope.stream.publishedDisabledLangs.length){
                         _totalPublishedLang = _totalPublishedLang.concat($scope.stream.publishedDisabledLangs);
                       }
                       var _configuredLangs = Object.keys($scope.stream.languageConfigurations);
                       result = _.filter(_totalPublishedLang,function(lang){
                            if(_configuredLangs.indexOf(lang) === -1){
                                return lang;
                            }
                       });
                       return result;
                    }else{
                        return result;
                    }
                }
                  
                   

                function mapValues(fn){
                    var result = fn();
                    if(result && result.length){
                        return _.filter(availableLanguages,function(lang){
                        if(result.indexOf(lang.value) !== -1){
                            return lang;
                        }
                        });
                    }else{
                        return result;
                    }
                    
                }

                var availableLanguages =$workflowService.cloneData($workflowService.seedData().nluSupportedLanguages);
                $scope.enableDisableLanguages = $scope.stream.languageConfigurations?$scope.stream.languageConfigurations:$scope.stream.supportedLanguages;
                $scope.defaultLanguage = $scope.stream.defaultLanguage;
                $scope.ubLanguages = {};
                $scope.ubLanguages.enabledLanguages = [];
                $scope.ubLanguages.disabledLanguages = [];
                $scope.ubLanguages.deletedLanguages = mapValues(getDeletedLanguages);

                $scope.ubLanguages.enabledLanguages = _.filter(availableLanguages,function(lan){
                       if($scope.enableDisableLanguages[lan.value] && $scope.enableDisableLanguages[lan.value].hasOwnProperty('enabled') && $scope.enableDisableLanguages[lan.value]['enabled']){
                              lan.enabled = $scope.enableDisableLanguages[lan.value]['enabled'];
                              lan.selected = true;
                              return lan;
                         }
                     });

                $scope.ubLanguages.disabledLanguages = _.filter(availableLanguages,function(lan){
                    if($scope.enableDisableLanguages[lan.value] && $scope.enableDisableLanguages[lan.value].hasOwnProperty('enabled') && !$scope.enableDisableLanguages[lan.value]['enabled']){
                               lan.enabled = $scope.enableDisableLanguages[lan.value]['enabled'];
                               lan.selected = true;
                               return lan;
                         }
                });


                if($scope.ubLanguages.disabledLanguages){
                    var languages = [];
                    $scope.ubLanguages.disabledLanguages = _.map($scope.ubLanguages.disabledLanguages,function(language){
                         languages.push(language.name);
                         if($scope.stream.publishedDisabledLangs && $scope.stream.publishedDisabledLangs.length && $scope.stream.publishedDisabledLangs.indexOf(language.value) >= 0){
                            language.isDisabled = true;
                        }else{
                            language.isDisabled = false;
                        }
                        return language;
                    });
                    var desc = languages.length > 1 ? 'languages' : 'language';
                    var languageStr = languages.toString().replace(/,/g, ', ');
                    $scope.msg = 'The end-users will not be able to interact with the bot in '+languageStr+ ' '+desc+ ' after the Publish request is approved.';
                }


                if($scope.ubLanguages.enabledLanguages){
                   $scope.ubLanguages.enabledLanguages =  _.map($scope.ubLanguages.enabledLanguages,function(language){
                        if($scope.stream.taskApprovedLanguages && $scope.stream.taskApprovedLanguages.length && $scope.stream.taskApprovedLanguages.indexOf(language.value) >= 0){
                            language.isDisabled = true;
                        }else{
                            language.isDisabled = false;
                        }
                        return language;
                    });

                }

                 
             }
             function getBotPanelsForPublish(){
                BTStreamsService.getBotPanels($scope.stream._id).then(function(results){
                    $scope.panels  = _.cloneDeep(results.data);
                    $scope.allTasksforPublish = $scope.allTasksforPublish.concat(results.data);
                    angular.forEach(results.data,function(task){
                    if(task && task.isDeleted) {
                        $scope.deletedTaskList = $scope.deletedTaskList.concat({'taskName':task.name,'type':'Panel','_id':'panel'});
                    }
                    });
                    $scope.panels = results.data.filter(function (panel) {
                        panel._selected = true;
                        panel.supportedLanguages = _.map(_.union($scope.stream.supportedLanguages, (panel.approvedLanguages|| [])), function (each) {
                            var slObject = {};
                            panel.approvedLanguages = panel.approvedLanguages || [];
                            if (panel.approvedLanguages.length === 0) {
                                slObject.selected = true;
                            }
                            else {
                                slObject.selected = false;
                            }
                            if (_.indexOf(panel.approvedLanguages, each) !== -1) {
                                slObject.selected = true;
                                slObject.disable = true;
                            }

                            slObject.value = each;
                            if(slObject.value==$scope.stream.defaultLanguage){
                               slObject.disable = true;
                            }
                            return slObject;
                        });

                        panel.supportedLanguages = _.sortBy(panel.supportedLanguages, 'selected');

                        panel.approvedLanguagesCopy = [];
                        _.map(panel.supportedLanguages, function (lang) {
                            if (lang.selected) {
                                panel.approvedLanguagesCopy.push(lang.value);
                            }
                        });
                        panel.approvedLanguages = angular.copy(panel.approvedLanguagesCopy);
                        panel.approvedLangString = convertToString(panel.approvedLanguagesCopy);
                        return panel.state === "configured";
                    });
                   });
           }
             function prepareUniversalBotPublishData(){
                prepareLanguageData();
                if($scope.stream.universalBotVersion === 2){
                     prepareLinkedBotState();
                }else if(($scope.stream.universalBotVersion === 1 || !$scope.stream.universalBotVersion) && $scope.stream.publishedBots){
                    prepareDeletedLinkedBots();
                }
                $scope.universalBotPublishView={
                    'currentStep':'defineDeployment',
                    'upgradeVersionComment':''
                };
                $scope.selectAllLanguage = {
                    selected :true
                };
                $scope.advancedPublishOptions = { 
                    nl: {
                    "resourceId": "NL",
                    "resourceType": "NL",
                    "allSelected": true,
                    "selectedNlpData": "full",
                    "allModules": $scope.stream.universalBotVersion === 2 ?[
                        {
                            "type":"linked_bot_training",
                            "name":"Linked Bot Training",
                            "hide":true,
                            "selected":true
                        },
                        {
                            "type":"bot_synonyms",
                            "name":"Bot Synonyms",
                             "hide":true,
                            "selected":true
                        },
                        {
                            "type":"thresholds_and_configurations",
                            "name":"Threshold & Configuration",
                             "hide":true,
                            "selected":true
                        },
                        {
                            "type": "default_dialog",
                            "name": "Default Dialog",
                            "selected": true,
                        },
                        {
                            "type": "standard_responses",
                            "name": "Standard Responses",
                            "selected": true,
                        },
                        {
                            "type":"settings",
                            "name":"Settings",
                            "selected":true
                        }
                        
                    ]:[
                        {
                            "type": "standard_responses",
                            "name": "Standard Responses",
                            "selected": true,
                        },
                        {
                            "type": "default_dialog",
                            "name": "Default Dialog",
                            "selected": true,
                        },{
                            "type":"settings",
                            "name":"Settings",
                            "selected":true
                        }
                    ],
                    "selectedModules": $scope.stream.universalBotVersion === 2 ? ["linked_bot_training","bot_synonyms","thresholds_and_configurations","standard_responses", "default_dialog","settings"]:["standard_responses", "default_dialog","settings"],
                    "approvalRequestedLanguages": [
                        "en"
                    ]
                },
                

                channels: {
                    "resourceId": "CHANNELS",
                    "resourceType": "CHANNELS",
                    "allSelected": true,
                    "allModules": prepareChannelData(),
                    "selectedModules": $scope.approvedChannels,
                    "approvalRequestedLanguages": [
                        "en"
                    ]
                },
                botLanguage : {
                             "resourceId": "BOTLANGUAGES",
                            "resourceType": "BOTLANGUAGES",
                            "modules":{}
                },
                extensions: {
                    "resourceId": "EXTENSIONS",
                    "resourceType": "EXTENSIONS",
                    "allSelected": true,
                    "allModules": [
                        {
                            "type": "events",
                            "name":"Event Handlers",
                            "selected": true
                        },
                        {
                            "type": "botkit",
                            "name": "BotKit",
                            "selected": true
                        },
                        {
                            "type": "websdk",
                            "name": "Web / Mobile SDK",
                            "selected": true
                        }
                    ],
                    "selectedModules": ["botkit", "websdk", "events"],
                    "approvalRequestedLanguages": [
                        "en"
                    ]
                },
                settings: {
                    "resourceId": "SETTINGS",
                    "resourceType": "SETTINGS",
                    "allSelected": true,
                    "allModules": [
                        {
                            "type": "general",
                            "name": "General Settings",
                            "selected": true
                        },
                        {
                            "type":"bot_variables",
                            "name": "Bot Variables",
                            "selected":true
                        },
                        {
                            "type": "pii",
                            "name": "PII Settings",
                            "selected": true
                        },
                        {
                            "type": "ivr",
                            "name": "IVR Settings",
                            "selected": true
                        },
                        {
                            "type": "hold_resume",
                            "name": "Hold & Resume",
                            "selected": true
                        },
                        {
                            "type": "custom_script",
                            "name": "Custom Script",
                            "selected": true
                        },
                        {
                            "type": "advanced",
                            "name": "Advanced Settings",
                            "selected": true
                        }
                    ],
                    "selectedModules": ["general", "pii", "ivr", "hold_resume", "custom_script", "advanced","bot_variables"],
                    "approvalRequestedLanguages": [
                        "en"
                    ]
                }
            };
               if($scope.ubLanguages.enabledLanguages.length){
                    $scope.enabledLanguages = _.pluck($scope.ubLanguages.enabledLanguages,'value');
                    $scope.advancedPublishOptions.botLanguage.modules['enabledLanguages'] = $scope.enabledLanguages;
                }

                if($scope.ubLanguages.disabledLanguages.length){
                    $scope.disabledLanguages = _.pluck($scope.ubLanguages.disabledLanguages,'value');
                    $scope.advancedPublishOptions.botLanguage.modules['disabledLanguages'] = $scope.disabledLanguages;
                }
             }
            prepareUniversalBotPublishData();
            $scope.selectAllAdvanced = function (type, value, event) {
                if (event) {
                    event.stopPropagation();
                }
                $scope.advancedPublishOptions[type].selectedModules = [];
                value.allSelected = !value.allSelected;
                $scope.advancedPublishOptions[type].allModules.map(function (module) {
                    module.selected = value.allSelected;
                    if (value.allSelected) {
                        $scope.advancedPublishOptions[type].selectedModules.push(module.type);
                    }
                });
            };

            $scope.selectAllLanguages = function(event,value,type){
                    event.stopPropagation();
                    $scope.advancedPublishOptions[type].modules = {};
                    $scope.advancedPublishOptions[type].modules['enabledLanguages'] = [];
                    $scope.advancedPublishOptions[type].modules['disabledLanguages'] = [];
                    _.map($scope.ubLanguages.enabledLanguages,function(language){
                        language.selected = value.selected;
                        if(value.selected){
                            $scope.advancedPublishOptions[type].modules['enabledLanguages'].push(language.value);
                        }
                    });
                    _.map($scope.ubLanguages.disabledLanguages,function(language){
                        language.selected = value.selected;
                        if(value.selected){
                           $scope.advancedPublishOptions[type].modules['disabledLanguages'].push(language.value); 
                        }
                    });
                };

            function getLangName(lan){
                    return _.filter($scope.languages.disabledLanguages,{value:lan})[0]['name'];
            }
             $scope.checkUncheckLanguage = function(element,parent,type){
                     $scope.advancedPublishOptions[type].modules = {};
                     $scope.advancedPublishOptions[type].modules['enabledLanguages'] = [];
                     $scope.advancedPublishOptions[type].modules['disabledLanguages'] = [];
                     if($scope.ubLanguages && $scope.ubLanguages.enabledLanguages){
                        $scope.unPublishLang = _.filter($scope.ubLanguages.enabledLanguages,{'selected':false});
                         _.map($scope.ubLanguages.enabledLanguages,function(language){
                            if(language.selected){
                                $scope.advancedPublishOptions[type].modules['enabledLanguages'].push(language.value);
                            }
                        });
                     }
                   
                    if($scope.ubLanguages && $scope.ubLanguages.disabledLanguages){
                              _.map($scope.ubLanguages.disabledLanguages,function(language){
                                if(language.selected){
                                   $scope.advancedPublishOptions[type].modules['disabledLanguages'].push(language.value); 
                                }
                        });     
                    }
              
                    if($scope.advancedPublishOptions[type].modules['disabledLanguages'].length){
                        var lang = [];
                        _.map($scope.advancedPublishOptions[type].modules['disabledLanguages'],function(lan,index){
                            var langName = getLangName(lan);
                            lang.push(langName);
                        });
                        var desc = lang.length > 1 ? 'languages' : 'language';
                        var languages = lang.toString().replace(/,/g, ', ');
                        $scope.msg = 'The end-users will not be able to interact with the bot in '+languages+ ' '+desc+ ' after the Publish request is approved.';


                     }
                     $scope.intermediateSelection(element,parent);
                     
                     
                };

            function updateNumbersQTC (q,t,c) {
                $scope.knowledgeQuestions = q;
                $scope.knowledgeTerms = t;
                $scope.knowledgeClasses = c;
                if($scope.stream.universalBotState === 'awaitingApproval') {
                    $scope.knowledgeClasses = '-';
                }
            }
            $scope.smallTalk = {};
            $scope.smallTalk._selected = $scope.stream.isSmalltalkMigrated || false;
            $scope.smallTalk.showSmallTalkComponent = $scope.stream.isSmalltalkMigrated || false;
            $scope.checkUncheckSmallTalk = function(e,smallTalk){
            if($scope.smallTalk && $scope.smallTalk._selected){
                $scope.smallTalk._selected =  false; 
            }else{
                $scope.smallTalk._selected = true;
            }
            };
            $scope.smallTalkLanguageUpdates = function(e, language, smallTalk){
                if(language.disable){
                    return;
                }
                if (!language.selected) {
                    language.selected = true;
                    (smallTalk.approvedLanguagesCopy || []).push(language.value);
                    (smallTalk.approvedLanguages || []).push(language.value);
                }else {
                    language.selected = false;
                    if(smallTalk.approvedLanguagesCopy){
                        smallTalk.approvedLanguagesCopy.splice(_.indexOf(smallTalk.approvedLanguagesCopy, language.value), 1);
                    }
                    if(smallTalk.approvedLanguages){
                        smallTalk.approvedLanguages.splice(_.indexOf(smallTalk.approvedLanguages, language.value), 1);
                    }
                    
                    
                }
            };
            $scope.smallTalk.supportedLanguages=_.map(_.union($scope.stream.supportedLanguages, ( $scope.smallTalk.approvedLanguages || [])),
                    function (each) {
                        $scope.smallTalk.approvedLanguages = $scope.smallTalk.approvedLanguages ||[];
                        var slObject = {};
                        if ($scope.smallTalk.approvedLanguages.length === 0) {
                            slObject.selected = true;
                        }
                        else {
                            slObject.selected = false;
                        }
                        if (_.indexOf($scope.smallTalk.approvedLanguages, each) !== -1) {
                            slObject.selected = true;
                            slObject.disable = true;
                        }
    
                        slObject.value = each;
                        if(slObject.value==$scope.stream.defaultLanguage){
                       slObject.disable = true;
                    }
                        return slObject;
    
                    });
                    if($scope.smallTalk.supportedLanguages){
                        _.map($scope.smallTalk.supportedLanguages, function (lang) {
                            if (lang.selected) {
                                $scope.smallTalk.approvedLanguages.push(lang.value);
                            }
    
                        });
                    }
            $scope.changeAdvPubControls = function (e, module, control, element, parent) {
                control.selectedModules = [];
                control.allModules.map(function (module) {
                    if (module.selected) {
                        control.selectedModules.push(module.type);
                    }
                });
                $scope.intermediateSelection(element,parent);
            }; 
            $scope.intermediateSelection=  function(element,parent,checkAllTasks){
                function doChecks(ele,par){
                    var checkboxes = $(ele).find('input'),
                            checkall = $(par);
                            var checkedCount = $(ele).find('input:checked').length;
                    for (var i = 0; i < checkboxes.length; i++) {
                            checkall[0].checked = checkedCount > 0;
                            checkall[0].indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
                    }
                  
                }
                  if(element && parent){
                        doChecks(element,parent);
                    }
                    if(checkAllTasks){
                        doChecks('#alltasksBodyData','#allTasksCheckUncheck');
                    }
            };
            $scope.selectAll = function (selectAll, selector) {
                    if (selectAll) {
                        $('' + selector + ' .checkbox [type="checkbox"]').each(function (e) {
                            if ($(this).is(':not(:checked)')) {
                                $(this).click();
                            }
                        });
                    } else {
                        $('' + selector + ' .checkbox [type="checkbox"]').each(function (e) {
                            if ($(this).is(':checked')) {
                                $(this).click();
                            }
                        });
                    }
                };
            $scope.checkOrUncheckAllBots = function(value,event){
                     if(event){
                        event.stopPropagation();
                    }
                    value.isSelected= !value.isSelected;
                    $scope.selectAll(value.isSelected,'.publishLinkedTask');        
            };




            $scope.startImport = function() {
                $scope.isSelectedProceed = true;
                knowledgeExNames = knowledgeExNames.map(function(val){
                    return val.toLowerCase();
                });
                $scope.totalProgress = 0;
                if($scope.extract.name === "") {
                    NotificationService.notify(i18n.i18nString('start_import_name'), "error");
                    $timeout(function(){
                        $scope.isSelectedProceed = false;
                    }, 100);
                }
                else if(knowledgeExNames.indexOf($scope.extract.name.toLowerCase()) > -1) {
                    NotificationService.notify(i18n.i18nString('start_import_duplicate'), "error");
                    $timeout(function(){
                        $scope.isSelectedProceed = false;
                    }, 100);
                }
                else if($scope.showFile.url === "url" && $scope.urlOb.extract === "") {
                    NotificationService.notify(i18n.i18nString('start_import_url'), "error");
                    $timeout(function(){
                        $scope.isSelectedProceed = false;
                    }, 100);
                }
                else {
                    knowledgeExNames.push($scope.extract.name);
                    if($scope.showFile.url === "file") {
                        startImportProgress();
                        /* Importing CSV/PDF */
                        BTStreamsService.uploadFAQFile($applicationService.userInfo().userId, $scope.data)
                            .then(function(response) {
                                var payload = {
                                    "fileId": response.data.fileId,
                                    "name": $scope.extract.name,
                                    "extractionType": "faq"
                                };
                                $scope.newFileId = response.data.fileId;
                                startImportProgress();
                                BTStreamsService.kgExtractImport(_selectedStream._id, payload)
                                    .then(function(res) {
                                        var _botInfo = {
                                            "streamId":$workflowService.selectedStream()._id,
                                            "BotName":$workflowService.selectedStream().name,
                                            "BotLanguage":$workflowService.currentLanguage(),
                                            "Category":"Engagement L1",
                                            "Sub Category":"Conversation - Knowledge",
                                            "Event Description":"When the user taps on either extract from file or extract from URL",
                                            "Level":"Engagement L1",
                                            "Extract source":"File",
                                            "Result":"Extracted Initiated Successfully"
                                         };
                                         mixPanel.postEvent('Conversation - Knowledge Extraction Initiated',_botInfo);
                                        //$scope.totalProgress = 100;
                                        if(res.data === 'failed' || (res.data && res.data.status === 'failed')) {
                                            $scope.importStep = 2;
                                            $scope.startKgPolling('File');
                                        }
                                        else {
                                            $scope.startKgPolling('File');
                                        }
                                    }, function(err) {
                                        var _botInfo = {
                                            "streamId":$workflowService.selectedStream()._id,
                                            "BotName":$workflowService.selectedStream().name,
                                            "BotLanguage":$workflowService.currentLanguage(),
                                            "Category":"Engagement L1",
                                            "Sub Category":"Conversation - Knowledge",
                                            "Event Description":"When the user taps on either extract from file or extract from URL",
                                            "Level":"Engagement L1",
                                            "Extract source":"File",
                                            "Result":"Failed to initiate extraction"
                                         };
                                         mixPanel.postEvent('Conversation - Knowledge Extraction Initiated',_botInfo);
                                        if(err && err.data && err.data.errors && err.data.errors[0] && err.data.errors[0].msg) {
                                            $scope.error.mess = err.data.errors[0].msg;
                                        }
                                        knowledgeExNames.pop();
                                        $scope.importStep = 2;
                                    });
                            }, function(err) {
                                if(err && err.data && err.data.errors && err.data.errors[0] && err.data.errors[0].msg) {
                                    $scope.error.mess = err.data.errors[0].msg;
                                }
                                knowledgeExNames.pop();
                                $scope.importStep = 2;
                            });
                    }

                    else if ($scope.showFile.url === "url") {
                        var payload = {
                            "fileUrl": $scope.urlOb.extract,
                            "name": $scope.extract.name,
                            "extractionType": "faq"
                        };
                        BTStreamsService.kgExtractImport(_selectedStream._id, payload)
                            .then(function(res) {
                                var _botInfo = {
                                    "streamId":$workflowService.selectedStream()._id,
                                    "BotName":$workflowService.selectedStream().name,
                                    "BotLanguage":$workflowService.currentLanguage(),
                                    "Category":"Engagement L1",
                                    "Sub Category":"Conversation - Knowledge",
                                    "Event Description":"When the user taps on either extract from file or extract from URL",
                                    "Level":"Engagement L1",
                                    "Extract source":"URL",
                                    "Result":"Extracted Initiated Successfully"
                                 };
                                 mixPanel.postEvent('Conversation - Knowledge Extraction Initiated',_botInfo);
                                $scope.newFileId = res.data.fileId;
                                //$scope.showFile.url = '';
                                if(res.data === 'failed' || (res.data && res.data.status === 'failed')) {
                                    $scope.importStep = 2;
                                    $scope.startKgPolling("URL");
                                }
                                else {
                                    $scope.totalProgress = 0;
                                    $scope.importStep = 3;
                                    startImportProgress();
                                    $scope.startKgPolling("URL");
                                }
                            }, function(err) {
                                var _botInfo1 = {
                                    "streamId":$workflowService.selectedStream()._id,
                                    "BotName":$workflowService.selectedStream().name,
                                    "BotLanguage":$workflowService.currentLanguage(),
                                    "Category":"Engagement L1",
                                    "Sub Category":"Conversation - Knowledge",
                                    "Event Description":"When the user taps on either extract from file or extract from URL",
                                    "Level":"Engagement L1",
                                    "Extract source":"URL",
                                    "Result":"Failed to initiate extraction"
                                 };
                                 mixPanel.postEvent('Conversation - Knowledge Extraction Initiated',_botInfo1);
                                $scope.importStep = 2;
                                if(err && err.data && err.data.errors && err.data.errors[0] && err.data.errors[0].msg) {
                                    NotificationService.notify(err.data.errors[0].msg, 'error');
                                }
                                $timeout(function(){
                                    $scope.isSelectedProceed = false;
                                });
                            });
                    }
                }
            };

                var attachPopover = function() {
                    setTimeout(function(){
                        $('.failed-block').on('mouseenter', function(){
                            $('.failed-block').not(this).popover('hide');
                        });
                        $('.kgExtractTiles').popover({
                            placement : 'top',
                            html : true,
                            delay: {
                                hide: 1500
                            },
                            trigger: "hover"
                        }).parent().on('click', '.popover-content', function(e) {                        
                            if(e.target.classList.value != 'know-more') {
                                e.preventDefault();
                            }
                            e.stopPropagation();
                            if(e.target.classList.value == 'sample-download') {
                                $scope.exportFaq(e, e.currentTarget.href); 
                            }
                        });
                        $('.kgExtractTiles').popover('disable');
                        setTimeout(function(){
                            $('.failed-block').popover('enable');
                        });
                    }, 50); 
                };

                $scope.attachPopover = attachPopover;

            $scope.startKgPolling = function(type) {
                function kgHist() {
                    BTStreamsService.kgHistory($workflowService.selectedStream()._id)
                      .then(function(res) {
                        if(res.data.metaqnas.filter(function(v){return v.status === 'inProgress';}).length === 0) {
                          if(kgHistoryPolling) {
                            $interval.cancel(kgHistoryPolling);
                            if($scope.extract.name.length !== 0) {
                                var temp = res.data.metaqnas.filter(function(val){
                                    return val.name === $scope.extract.name;
                                })[0];
                                newAddExtDetails = temp;
                                if(temp &&  temp.status === 'success') {
                                    $scope.importStep = 4;
                                    var _botInfo = {
                                        "streamId":$workflowService.selectedStream()._id,
                                        "BotName":$workflowService.selectedStream().name,
                                        "BotLanguage":$workflowService.currentLanguage(),
                                        "Category":"Engagement L1",
                                        "Sub Category":"Conversation - Knowledge",
                                        "Event Description":"When the user taps on either extract from file or extract from URL",
                                        "Level":"Engagement L1",
                                        "Extract source":type,
                                     };
                                     mixPanel.postEvent('Conversation - Knowledge Extraction Completed',_botInfo);
                                }
                                else if(temp && temp.status === 'failed') {
                                    var _botInfoKG = {
                                        "streamId":$workflowService.selectedStream()._id,
                                        "BotName":$workflowService.selectedStream().name,
                                        "BotLanguage":$workflowService.currentLanguage(),
                                        "Category":"Engagement L1",
                                        "Sub Category":"Conversation - Knowledge",
                                        "Event Description":"When the user taps on either extract from file or extract from URL",
                                        "Level":"Engagement L1",
                                        "Extract source":type,
                                     };
                                     mixPanel.postEvent('Conversation - Knowledge Extraction Failed',_botInfoKG);
                                    $scope.importStep = 2;
                                }
                                $scope.extractQnaCount = temp.qnaCount;
                            }
                            /*
                            if($scope.importStep !== 2 && $scope.importStep !== 1) {
                             $scope.importStep = 4;
                            }*/
                            $timeout(function(){
                                attachPopover();
                                $scope.totalProgress = 0;
                            }, 250);
                            //$scope.state.poll = false;
                          }
                        }
                        $scope.knowledgeExtractList = $workflowService.cloneData(res.data.metaqnas);
                        var numbOfEmptBlcks = (5 -$scope.knowledgeExtractList.length % 5) % 5;
                        $scope.emptyBlock = [];
                        if(numbOfEmptBlcks !== 0) {
                            for(var i=0; i < numbOfEmptBlcks; i++) {
                                $scope.emptyBlock[i] = {};
                            }
                        }
                      }, function(err) {
                        $interval.cancel(kgHistoryPolling);
                         $scope.importStep = 2;
                        //$scope.state.poll = false;
                      });   
                }
                $scope.totalProgress = 0;
                $scope.importStep = 3;
                kgHist();
                var kgHistoryPolling = $interval(function() {
                    kgHist();      
                }, 2000);
              };


            $scope.uploadJSONFile = function(fileObject) {
                var _ext = "";
                if (fileObject.name) {
                    $scope.extract.name = fileObject.name.slice(0, fileObject.name.lastIndexOf('.'));
                    _ext = fileObject.name.substring(fileObject.name.lastIndexOf('.'));
                    var supportingFileFormats = [".csv",".pdf",".zip"];
                    if ($.inArray(_ext.toLowerCase(), supportingFileFormats) === -1) {
                        NotificationService.notify(i18n.i18nString('upload_error'), "error");
                        $scope.fileExtensionError = true;
                        return;
                    }
                }
                var reader = new FileReader();
                reader.readAsText(fileObject);
                reader.onload = function (e) {
                    var respnoseData = reader.result;
                    var _fileLimit = 5*1000*1000;
                    if (fileObject.size > _fileLimit) {
                        NotificationService.notify(i18n.i18nString('file_size'), "warning");
                        $scope.removeFile();
                        return;
                    }
                    if(!respnoseData || respnoseData && !respnoseData.length){
                        NotificationService.notify(i18n.i18nString('please_upload_valid_err') +_ext.slice(1).toUpperCase()+" file", "error");
                        $scope.fileEmptyError = true;
                    }else{
                        $scope.fileName = fileObject.name;
                        if(!$scope.isSelectedProceed && $scope.fileName.length !==0 && $scope.extract.name.length === 0) {
                            $scope.isSelectedProceed = true;
                        }
                        else if($scope.extract.name && $scope.extract.name.length !== 0 && $scope.isSelectedProceed) {
                            $scope.isSelectedProceed = false;
                        }
                        $scope.fileExtensionError = false;
                        var data = new FormData();
                        data.append('file', fileObject);
                        data.append('fileContext', 'bulkImport');
                        data.append('fileExtension', _ext.substring(_ext.lastIndexOf('.') + 1));
                        data.append('Content-Type', fileObject.type);
                        $scope.qafileuploading = true;
                        $scope.data = data;
                        $scope.fileObject = fileObject;
                   
                    }
                };

            };

            $scope.switchTabs = function(name) {
                $scope.extract.name = '';
                $scope.extracting.urlFile = false;
                $scope.importStep = 1;
                var _botInfo = {
                    streamId:$workflowService.selectedStream()._id,
                    BotName:$workflowService.selectedStream().name,
                 };
                if(name === 'file') {
                    var _botInfoFile = {
                        "streamId":$workflowService.selectedStream()._id,
                        "BotName":$workflowService.selectedStream().name,
                        "BotLanguage":$workflowService.currentLanguage(),
                        "Category":"Engagement L1",
                        "Sub Category":"Conversation - Knowledge",
                        "Event Description":"When the user taps on either extract from file or extract from URL",
                        "Level":"Engagement L1",
                        "Extract source":"File"
                     };
                     mixPanel.postEvent('Conversation - Knowledge Extraction Start',_botInfoFile);
                    $scope.showFile.url = name;
                    $timeout(function(){
                        if($('.fileDropContainer').length !== 0) {
                            $scope.initDragDropFile();
                           // $interval.cancel(checkFileDrop);
                        }
                    },500);
                    //$scope.extract.name = '';
                    $scope.removeFile();
                }
                else if (name === 'url') {
                    var _botInfourl = {
                        "streamId":$workflowService.selectedStream()._id,
                        "BotName":$workflowService.selectedStream().name,
                        "BotLanguage":$workflowService.currentLanguage(),
                        "Category":"Engagement L1",
                        "Sub Category":"Conversation - Knowledge",
                        "Event Description":"When the user taps on either extract from file or extract from URL",
                        "Level":"Engagement L1",
                        "Extract source":"URL",
                     };
                     mixPanel.postEvent('Conversation - Knowledge Extraction Start',_botInfourl);
                    $scope.isSelectedProceed = false;
                    $scope.showFile.url = name;
                    //$scope.extract.name = '';
                    $scope.urlOb.extract = '';
                    $scope.importStep = 1;
                } 
                // else if(name === 'pdfAnno') {
                //     $scope.showFile.url = name;
                // }
            };
            // $scope.updatePdfAnno = function() {

            // };
            // Pdf Anno Tool Iframe Opens & pass fileId to iframe
            $scope.pdfAnnoIframe = function() {
                var _botInfo = {
                    streamId:$workflowService.selectedStream()._id,
                    BotName:$workflowService.selectedStream().name,
                 };
                 mixPanel.postEvent('Add Anotation',_botInfo);
                $scope.isSelectedProceed = true;
                var fileExtension = $scope.fileName.replace(/^.*\./, '');
                knowledgeExNames = knowledgeExNames.map(function(val){
                    return val.toLowerCase();
                });
                $scope.totalProgress = 0;
                if($scope.extract.name === "") {
                    NotificationService.notify(i18n.i18nString('start_import_name'), "error");
                    $timeout(function(){
                        $scope.isSelectedProceed = false;
                    }, 100);
                }
                else if(knowledgeExNames.indexOf($scope.extract.name.toLowerCase()) > -1) {
                    NotificationService.notify(i18n.i18nString('start_import_duplicate'), "error");
                    $timeout(function(){
                        $scope.isSelectedProceed = false;
                    }, 100);
                }
                else if($scope.showFile.url === "url" && $scope.urlOb.extract === "") {
                    NotificationService.notify(i18n.i18nString('start_import_url'), "error");
                    $timeout(function(){
                        $scope.isSelectedProceed = false;
                    }, 100);
                } else if(fileExtension !== "pdf") {
                    NotificationService.notify("Upload valid PDF file", "error"); // Check PDF's only
                }  else {
                    BTStreamsService.uploadFAQFile($applicationService.userInfo().userId, $scope.data)
                    .then(function(response) {
                        $scope.isSelectedProceed = false;
                        $scope.newFileId = response.data.fileId;
                        var listData = {
                            fileName: $scope.extract.name
                        };
                        NotificationService.notify("File uploaded successfully!", "success");
                        $scope.pdfTypeParams.fileId = $scope.newFileId;
                        $scope.pdfTypeParams.fileName = $scope.extract.name;
                        $scope.pdfTypeParams.type = 'pdfAnno';
                        $scope.pdfTypeParams.listData = listData;
                        $scope.pdfTypeParams.kgExtNewCallback = $scope.kgExtNewCallback;
                        if($scope.pdfTypeParams.updateIframeData) { 
                            $scope.pdfTypeParams.updateIframeData();
                        }
                        $scope.fullModalCallback.openFullPageModal(null,$scope.pdfTypeParams,null);
                        $scope.showFile.url = ""; 
                        $scope.extracting.urlFile = true;
                        if ($('.kore-chat-window') && $('.kore-chat-window').length && !$('.kore-chat-window').hasClass('minimize')) {
                            $('.kore-chat-window .minimize-btn').trigger('click');
                        }
                    }, function(err) {
                        if(err && err.data && err.data.errors && err.data.errors[0] && err.data.errors[0].msg) {
                            // $scope.error.mess = err.data.errors[0].msg;
                            NotificationService.notify(err.data.errors[0].msg, "error");
                        }
                    });
                }
            };
            $scope.failedCaseModal = function() {
                $("#create-copy-modal").modal("show");
            };
            $scope.failedCaseCloseModal = function() {
                $("#create-copy-modal").modal("hide");
            };
            $scope.failedAnnotion = function(listData) {
                var _botInfo = {
                    streamId:$workflowService.selectedStream()._id,
                    BotName:$workflowService.selectedStream().name,
                 };
                 mixPanel.postEvent('Add Anotation',_botInfo);
                $scope.kgExtNewCallback.goBackToAnnotool(listData);
            };
            $scope.pdfTypeParams.updateAnnoKgExtractTwo = function(listData) {
                $scope.openKgExtractTwo(listData); 
            };
            $scope.pdfTypeParams.goBackFromAnnoToKG = function() {
                getKnowledgeTasks();
                $scope.isKgExtractTwo = false;
            };
            $scope.kgExtNewCallback.goBackToAnnotool = function(pdfAnnoData) {
                if(pdfAnnoData) {
                    $scope.pdfTypeParams.fileId = pdfAnnoData.fileId;
                    $scope.pdfTypeParams.fileName = pdfAnnoData.name;
                    $scope.pdfTypeParams.listData = pdfAnnoData;
                    $scope.pdfTypeParams.type = 'pdfAnno';
                    $scope.pdfTypeParams.kgExtNewCallback = $scope.kgExtNewCallback;
                    $('.kg-extraction-form-two').modal('hide'); 
                    $scope.fullModalCallback.openFullPageModal(null, $scope.pdfTypeParams,null);
                    setTimeout(function() {
                        if($scope.pdfTypeParams.reAnnotateDocument) {
                            $scope.pdfTypeParams.reAnnotateDocument(pdfAnnoData);
                        }
                    }, 500);
                    // $scope.fullModalCallback.openFullPageModal(null, $scope.pdfTypeParams,null);
                } 
            };
            $scope.kgExtNewCallback.checkFileName = function(fileName) {
                if(knowledgeExNames.indexOf(fileName) > -1) {
                    NotificationService.notify(i18n.i18nString('start_import_duplicate'), "error");
                    return false;
                } else {
                    return true;
                }
            };
            // $scope.loadIframes = function() {
            //     setTimeout(function() {
            //         // $scope.pdfTypeParams.fileId = '';
            //         // $scope.pdfTypeParams.fileName = '';
            //         $scope.pdfTypeParams.type = 'pdfAnno';
            //         // $scope.pdfTypeParams.listData = 'listData';
            //         $scope.pdfTypeParams.kgExtNewCallback = $scope.kgExtNewCallback;
            //         if($scope.pdfTypeParams.loadIframe) { 
            //             $scope.pdfTypeParams.loadIframe();
            //         }
            //         // $scope.fullModalCallback.openFullPageModal(null, $scope.pdfTypeParams,null);
            //         // if ($('body').hasClass('bt-modal-open')) {
            //         //     $('body').removeClass('bt-modal-open');
            //         //     $('.modal-backdrop').remove();
            //         // }
            //         // setTimeout(function() {
            //         //     $("#btFullpageModal").modal("hide");
            //         // }, 500);
            //     }, 3000);
            // };
            // $scope.loadIframes();

/*            $scope.extractFile = function() {
                $scope.kgExtract.disp="file";
                var checkFileDrop = $interval(function(){
                    if($('.fileDropContainer').length !== 0) {
                        $scope.initDragDropFile();
                        $interval.cancel(checkFileDrop);
                    }
                }, 500)
                $timeout(function(){
                    if($('.fileDropContainer').length !== 0) {
                        $scope.initDragDropFile();
                       // $interval.cancel(checkFileDrop);
                    }
                },500);
            }*/ 
            function processAppControlList() {
                $scope.appControls = $applicationService.userInfo().appControls;
                if ($scope.appControls.isBillingEnabled && $scope.stream.type !=='sample' && $scope.stream.type !=='solution' && $scope.stream.visibility.namespace === 'private' && $scope.appControls && $scope.selectedAccount.adminPreferences && $scope.selectedAccount.adminPreferences.autoApproval && $scope.selectedAccount.accountType && $scope.selectedAccount.accountType===1) {                                    

                    $scope.publishInTrailMsg = true;
                    
                } else {
                    $scope.publishInTrailMsg = false;
                }
            }
            $scope.openUniversalBotPublishModal = function () {
                $('#universalBotErrorMsgStatus').modal({
                    backdrop: 'static',
                    show: true
                });
            };
            $scope.closeUniversalBotPublishModal = function () {
                $('#universalBotErrorMsgStatus').modal('hide');
                $timeout(function () {
                    $('body').removeClass('modal-open');
                });
                // $scope.onClose(true);
                var stream =  $workflowService.selectedStream();
                stream.visibility.namespace="enterpriseNpublic";
                $scope.$emit("loadBots",stream);
                $rootScope.$broadcast('getProgressDockStatus'); 
            };
            function getErrorMsg(message) {
                var msg = (message && message.errors && message.errors[0].msg) || i18n.i18nString('error_handle_msg');
                return msg;
            }
            function publishRequests(requests) {
                var resources = [];
                if($scope.smallTalk._selected && $scope.smallTalk.showSmallTalkComponent){
                    resources.push({
                        "resourceId": "smalltalk",
                        "resourceType": "smalltalk",
                        'approvalRequestedLanguages':$scope.smallTalk.approvedLanguages
                    });
                }
                $scope.universalBotPublishMessages = [];
                if ($scope.advancedPublishOptions.nl.selectedModules.length) {
                    resources.push({
                        "resourceId": "NL",
                        "resourceType": "NL",
                        "modules": $scope.advancedPublishOptions.nl.selectedModules
                    });
                }
                if ($scope.advancedPublishOptions.channels.selectedModules.length) {
                    resources.push({
                        "resourceId": "CHANNELS",
                        "resourceType": "CHANNELS",
                        "modules": $scope.advancedPublishOptions.channels.selectedModules
                    });
                }
                if ($scope.advancedPublishOptions.extensions.selectedModules.length) {
                    resources.push({
                        "resourceId": "EXTENSIONS",
                        "resourceType": "EXTENSIONS",
                        "modules": $scope.advancedPublishOptions.extensions.selectedModules
                    });
                }
                if ($scope.advancedPublishOptions.settings.selectedModules.length) {
                    resources.push({
                        "resourceId": "SETTINGS",
                        "resourceType": "SETTINGS",
                        "modules": $scope.advancedPublishOptions.settings.selectedModules
                    });
                }
                 if($scope.selectAllLanguage.selected && $scope.advancedPublishOptions.botLanguage.modules){
                                resources.push({
                                     "resourceId": "BOTLANGUAGES",
                                    "resourceType": "BOTLANGUAGES",
                                    "modules" : $scope.advancedPublishOptions.botLanguage.modules
                                });
                }
                if (requests && requests.length) {
                    var _requests = [];
                    var _publishReq;

                    if (requests.length > 1) {


                        var _linkReq = _.find(requests, {'service': "standardPublish"});
                        if (_linkReq) {
                             _linkReq.payload.resources = _linkReq.payload.resources.concat(resources);
                             if($scope.allComponentsSelected){
                                _linkReq.payload.publishAllComponents = true; 
                            }else{
                                _linkReq.payload.publishAllComponents = false; 
                            }
                            _linkReq.payload.versionComment = $scope.universalBotPublishView.upgradeVersionComment;
                            _linkReq.payload.linkedBotCount =  $scope.selectedLinkedBotsCount || 0;
                            _publishReq = _.find(requests, {'service': "linkOrUnlinkBots"});
                            if (_publishReq && _publishReq.payload && _publishReq.payload.bots) {
                                _linkReq.payload.bots = _publishReq.payload.bots;
                            }
                            BTStreamsService.standardPublish($scope.stream._id, _linkReq.payload).then(function (response) {
                                if(response && response.data && response.data.length){
                                response.data.map(function (message) {
                                    var _msg;
                                    if (_msg === undefined) {
                                        if (message.result && message.result.name) {
                                            _msg = message.result.name || message.result.resourceId;
                                         }else if(message.resourceType === 'smalltalk' && message.status === 'SUCCESS' && !message.result.name){
                                                    _msg = 'Small Talk'; // added since service end cannot send the required structure
                                        }
                                    }
                                    if(message.result && (message.result.name === "BotLanguages")){
                                        _msg = "Bot Languages";
                                    }
                                    if (message.status === 'SUCCESS') {
                                        $scope.universalBotPublishMessages.push({
                                            type: 'success',
                                            taskId: message.resourceId,
                                            message: _msg +' '+i18n.i18nString('published_success')
                                        });
                                    } else if (message.status === 'FAILURE') {
                                        $scope.universalBotPublishMessages.push({
                                            type: 'error',
                                            error: getErrorMsg(message.result),
                                            message: _msg +' '+i18n.i18nString('publish_Failed'),
                                        });
                                    }
                                });
                            }
                                var _publishReq = _.find(requests, {'service': "linkOrUnlinkBots"});
                               
                                if (_publishReq) {
                                    $scope.universalBotPublishMessages.push({
                                        type: 'success',
                                        message: i18n.i18nString('linked_publish')
                                    });
                                    $scope.allowRetry=true;
                                    $scope.publishInProgress = false;
                                    $scope.taskState = "";
                                    $scope.appControls = $applicationService.userInfo().appControls;
                                    if ($scope.appControls.isBillingEnabled && $scope.stream.type !=='sample' && $scope.stream.type !=='solution' && $scope.stream.visibility.namespace === 'private' && $scope.appControls && $scope.selectedAccount.adminPreferences && $scope.selectedAccount.adminPreferences.autoApproval && $scope.selectedAccount.accountType && $scope.selectedAccount.accountType===1) {                                    
                                        $scope.publishInTrailMsg = true;                                            
                                    } else {
                                        $scope.publishInTrailMsg = false;
                                    }
                                    $scope.openUniversalBotPublishModal();
                                    NotificationService.notify(i18n.i18nString('publish_success'), "success");


                                    // if($scope.allComponentsSelected){
                                    //     _publishReq.payload.publishAllComponents = true; 
                                    // }else{
                                    //     _publishReq.payload.publishAllComponents = false; 
                                    // }
                                    // _publishReq.payload.versionComment = $scope.universalBotPublishView.upgradeVersionComment;
                                    // _publishReq.payload.linkedBotCount =  $scope.selectedLinkedBotsCount || 0;
                                    // BTStreamsService.linkOrUnlinkBots($scope.stream._id, 'publish', _publishReq.payload).then(function (res) {
                                    //         $scope.universalBotPublishMessages.push({
                                    //             type: 'success',
                                    //             message: i18n.i18nString('linked_publish')
                                    //         });
                                    //     $scope.allowRetry=true;
                                    //     $scope.publishInProgress = false;
                                    //     var messages = [];
                                    //     $scope.taskState = "";
                                    //     var successMsg = [], errorMsg = [];
                                    //     function processTasks() {
                                    //         $scope.appControls = $applicationService.userInfo().appControls;
                                    //         if ($scope.appControls.isBillingEnabled && $scope.stream.type !=='sample' && $scope.stream.type !=='solution' && $scope.stream.visibility.namespace === 'private' && $scope.appControls && $scope.selectedAccount.adminPreferences && $scope.selectedAccount.adminPreferences.autoApproval && $scope.selectedAccount.accountType && $scope.selectedAccount.accountType===1) {                                    
            
                                    //             $scope.publishInTrailMsg = true;
                                                
                                    //         } else {
                                    //             $scope.publishInTrailMsg = false;
                                    //         }
                                            
                                    //         $scope.openUniversalBotPublishModal();
                                    //     }
                                    //     processTasks();
                                    //     // $scope.$emit("loadBots", $scope.stream);
                                    //     NotificationService.notify(i18n.i18nString('publish_success'), "success");
                                    // }, function () {
                                    //     NotificationService.notify(i18n.i18nString('publish_error'), "error");
                                    // });
                                }

                            }, function (error) {
                                if(error.data && error.data.errors && error.data.errors[0] && error.data.errors[0].msg) {
                                    if(error.data.errors[0].status === 403) {
                                        $("#botCannotPublish").modal("show");
                                        $("#botCannotPublishDesc").text(error.data.errors[0].msg);
                                    } else {
                                        NotificationService.notify(error.data.errors[0].msg, "error");
                                    }
                                } else {
                                    NotificationService.notify(i18n.i18nString('publish_error'), "error");
                                }
                            });

                        }

                    } else {
                        _publishReq = _.find(requests, {'service': "linkOrUnlinkBots"});
                      
                        if (_publishReq) {
                            if($scope.allComponentsSelected){
                                _publishReq.payload.publishAllComponents = true; 
                            }else{
                                _publishReq.payload.publishAllComponents = false; 
                            }
                             _publishReq.payload.linkedBotCount =  $scope.selectedLinkedBotsCount || 0;
                             _publishReq.payload.versionComment = $scope.universalBotPublishView.upgradeVersionComment;
                            // _requests.push(BTStreamsService.linkOrUnlinkBots($scope.stream._id, 'publish', _publishReq.payload));
                            _requests.push(BTStreamsService.standardPublish($scope.stream._id, _publishReq));

                        }

                        var _linkReq1 = _.find(requests, {'service': "standardPublish"});
                      
                        if (_linkReq1) {
                            if($scope.allComponentsSelected){
                                _linkReq1.payload.publishAllComponents = true; 
                            }else{
                                _linkReq1.payload.publishAllComponents = false; 
                            }
                            _linkReq1.payload.versionComment = $scope.universalBotPublishView.upgradeVersionComment;
                            _linkReq1.payload.linkedBotCount =  $scope.selectedLinkedBotsCount || 0;
                            _linkReq1.payload.resources = _linkReq1.payload.resources.concat(resources);
                            _requests.push(BTStreamsService.standardPublish($scope.stream._id, _linkReq1.payload));

                        }
                        $q.all(_requests)
                                .then(function (res) {
                                    if(_publishReq){
                                        if(res && res[0] && res[0].data){
                                            $scope.universalBotPublishMessages.push({
                                                type: 'success',
                                                message: i18n.i18nString('linked_publish')
                                            });
                                        }
                                    }
                                    var resData = _publishReq?res[1]:res[0];
                                    if(resData && resData.data && resData.data.length){
                                        resData.data.map(function (message) {
                                            var _msg;
                                            if (_msg === undefined) {
                                                if (message.result && message.result.name) {
                                                    _msg = message.result.name || message.result.resourceId;
                                                }else if(message.resourceType === 'smalltalk' && message.status === 'SUCCESS' && !message.result.name){
                                                    _msg = 'Small Talk'; // added since service end cannot send the required structure
                                                }
                                            }
                                            if (message.status === 'SUCCESS') {
                                                $scope.universalBotPublishMessages.push({
                                                    type: 'success',
                                                    taskId: message.resourceId,
                                                    message: _msg +' '+ i18n.i18nString('publish_success')
                                                });
                                            } else if (message.status === 'FAILURE') {
                                                $scope.universalBotPublishMessages.push({
                                                    type: 'error',
                                                    error: getErrorMsg(message.result),
                                                    message: _msg +' '+ i18n.i18nString('publish_error'),
                                                });
                                            }
                                        });
                                    }
                                    $scope.allowRetry=true;
                                    $scope.publishInProgress = false;
                                    var messages = [];
                                    $scope.taskState = "";
                                    var successMsg = [], errorMsg = [];
                                    function processTasks() {
                                        $scope.appControls = $applicationService.userInfo().appControls;
                                        if ($scope.appControls.isBillingEnabled && $scope.stream.type !=='sample' && $scope.stream.type !=='solution' && $scope.stream.visibility.namespace === 'private' && $scope.appControls && $scope.selectedAccount.adminPreferences && $scope.selectedAccount.adminPreferences.autoApproval && $scope.selectedAccount.accountType && $scope.selectedAccount.accountType===1) {                                    
        
                                            $scope.publishInTrailMsg = true;
                                            
                                        } else {
                                            $scope.publishInTrailMsg = false;
                                        }
                                        
                                        $scope.openUniversalBotPublishModal();
                                    }
                                    processTasks();
                                    // $scope.$emit("loadBots", $scope.stream);
                                    NotificationService.notify(i18n.i18nString('publish_success'), "success");

                                }, function (err) {
                                    NotificationService.notify(i18n.i18nString('publish_error'), "error");
                                });
                    }

                } else if( advSettSelected()) {
                    var onlyAdvPayload = {
                        resources:[]
                    };
                     onlyAdvPayload.resources =  onlyAdvPayload.resources.concat(resources);
                            BTStreamsService.standardPublish($scope.stream._id, onlyAdvPayload).then(function () {
                                        $scope.$emit("loadBots", $scope.stream);
                                        NotificationService.notify(i18n.i18nString('publish_success'), "success");

                            });
                } else{
                     NotificationService.notify(i18n.i18nString('select_one'), "error");
                }
            }
            function advSettSelected() {

                return ($scope.advancedPublishOptions.nl.selectedModules.length > 0 || $scope.advancedPublishOptions.settings.selectedModules.length > 0 || $scope.advancedPublishOptions.channels.selectedModules.length > 0 || $scope.advancedPublishOptions.extensions.selectedModules.length > 0 || (($scope.advancedPublishOptions.botLanguage.modules.enabledLanguages && $scope.advancedPublishOptions.botLanguage.modules.enabledLanguages.length > 0 ) || ($scope.advancedPublishOptions.botLanguage.modules.disabledLanguages && $scope.advancedPublishOptions.botLanguage.modules.disabledLanguages.length > 0) ));
            }
               function checkLinkedSelected(){
                var selectedBots;
                if(!$scope.stream.universalBotVersion || $scope.stream.universalBotVersion === 1){
                    if ($scope.configuredBots && $scope.configuredBots.length) { 
                       selectedBots  = $scope.configuredBots.filter(function (bot) {
                            return (bot.linked);
                        });
                        if (selectedBots && selectedBots.length) {
                          return true;
                        }
                    }
                    return false;

                }else{
                    if ($scope.linkedBotStates && $scope.linkedBotStates.length) { 
                        selectedBots = $scope.linkedBotStates.filter(function (bot) {
                            return (bot.selected);
                        });
                        if (selectedBots && selectedBots.length) {
                          return true;
                        }
                    }
                    return false;
                }


                
            }
            $scope.validateURL = (function () {
                return {
                    test: function (uri) {
                        var p = /^(http|https)\:\/\/(\w*\W*)?\w*(\.(\w)+)+(\W\d+)?(\/\w*(\W*\w)*)*/;
                        if (uri.match(p)) {
                            if(($scope.isSelectedProceed && $scope.extract.name) || ($scope.isSelectedProceed && $scope.extract.name === "")) {
                                $scope.isSelectedProceed = false;
                            }
                            return true;
                        } else {
                            $scope.isSelectedProceed = true;
                            return false;
                        }
                    }
                };
            })();

            function advsettingsFirstTimepublish() {
                      if(!checkLinkedSelected()){
                          NotificationService.notify(i18n.i18nString('select_one_linked'), 'warning');
                          return false;
                      }
                        if(!$scope.advancedPublishOptions.nl.selectedModules.length){
                             NotificationService.notify(i18n.i18nString('select_nl') , 'warning');
                        return false;
                        }
                        if(!$scope.advancedPublishOptions.channels.selectedModules.length){
                             NotificationService.notify(i18n.i18nString('select_channels') , 'warning');
                        return false;
                        }
                        if(!$scope.advancedPublishOptions.settings.selectedModules.length){
                             NotificationService.notify(i18n.i18nString('select_general') , 'warning');
                        return false;
                        }
                        if(!$scope.advancedPublishOptions.botLanguage.modules.enabledLanguages.length){
                            NotificationService.notify(i18n.i18nString('select_language'),'warning');
                            return false;
                        }
                         if($scope.advancedPublishOptions.nl.selectedModules.length){
                            var nlvalidator={};
                            $.each($scope.advancedPublishOptions.nl.selectedModules,function(i,mod){
                                if(mod=='default_dialog'){
                                    nlvalidator.settings= true;
                                }
                                if(mod==='standard_responses'){
                                    nlvalidator.standardResponses = true;
                                }
                                if(mod==='settings'){
                                    nlvalidator.nlSettings = true;
                                }
                               
                            });
                            if(!nlvalidator.settings){
                                NotificationService.notify(i18n.i18nString('select_dialog') , 'warning');
                                 return false;
                            }
                            if(!nlvalidator.standardResponses){
                                NotificationService.notify(i18n.i18nString('select_standardResponse') , 'warning');
                                return false;
                            }
                            if(!nlvalidator.nlSettings){
                            NotificationService.notify(i18n.i18nString('select_nlSettings') , 'warning');
                             return false;
                            }
                        }
                        if($scope.advancedPublishOptions.settings.selectedModules.length){
                            var validator={};
                            $.each($scope.advancedPublishOptions.settings.selectedModules,function(i,mod){
                                if(mod=='general'){
                                    validator.general= true;
                                }
                                if(mod=='hold_resume'){
                                    validator.hold_resume= true;
                                }
                                if(mod=='advanced'){
                                    validator.advanced= true;
                                }
                            });
                            if(!validator.general){
                                NotificationService.notify(i18n.i18nString('select_generalsettings') , 'warning');
                                 return false;
                            }
                            if(!validator.hold_resume){
                                NotificationService.notify(i18n.i18nString('select_holdresume'), 'warning');
                                 return false;
                            }if(!validator.advanced){
                                NotificationService.notify(i18n.i18nString('select_advancesettings') , 'warning');
                                 return false;
                            }
                         
                          
                        }
                        return true;
                }
                $scope.universalBotPublishView={
                    'currentStep':'defineDeployment',
                    'upgradeVersionComment':''
                };

                // $scope.closePublishWarn = function(){
                //     $element.find('#publishWarnUni').removeClass('show').addClass('fade');
                // };
                // $scope.checkRestore = function(step){
                //    if($scope.deletedSmallTalkNodes && $scope.deletedSmallTalkNodes.length && !$scope.smallTalk._selected ){
                //         $scope.publishWarnMsg = i18n.i18nString('publishWarnMessSmallTalk');
                //         $element.find('#publishWarnUni').removeClass('fade').addClass('show');
                //         return;
                //   }
                //    $scope.nextStep(step);
                // };

                $scope.nextStep = function(step){
                     // if($element.find('#publishWarnUni')){
                     //    $element.find('#publishWarnUni').removeClass('show').addClass('fade');
                     // }
                     $scope.stream = $workflowService.selectedStream();
                     processAppControlList();
                     var publishCommentWarnMsg = i18n.i18nString('fill_publish');
                      if($scope.stream && $scope.stream.visibility && $scope.stream.visibility.namespace !=='private'){
                      publishCommentWarnMsg =i18n.i18nString('fill_upgrade');
                       } 
                     if(step=='defineDeployment'){
                        if($scope.stream.visibility.namespace == "private"){
                            if(!advsettingsFirstTimepublish()){
                                return;
                            }
                        }
                        if(!$scope.linkedBots.length){
                            NotificationService.notify(i18n.i18nString('select_universal_publish'), 'warning');
                            return false;
                         }
                         if(!checkLinkedSelected() && !( $scope.smallTalk.showSmallTalkComponent && $scope.smallTalk._selected) &&  !$scope.advancedPublishOptions.nl.selectedModules.length && !$scope.advancedPublishOptions.channels.selectedModules.length && !$scope.advancedPublishOptions.extensions.selectedModules.length && !$scope.advancedPublishOptions.settings.selectedModules.length && !($scope.advancedPublishOptions.botLanguage.modules.enabledLanguages.length || $scope.advancedPublishOptions.botLanguage.modules.disabledLanguages.length) ){
                            NotificationService.notify(i18n.i18nString('select_universal'), 'error');
                            return false;
                         }else{
                            $scope.universalBotPublishView.currentStep = 'versionComments';
                         }
                     }else {
                         if(!$scope.universalBotPublishView.upgradeVersionComment){
                            NotificationService.notify(publishCommentWarnMsg, 'warning');
                         }else{
                            collectSelectedTasks();
                            $scope.publishUniversalBot();
                         }
                     }
                };
                $scope.previousStep = function(){
                    $scope.universalBotPublishView.currentStep = 'defineDeployment';
                };
            $scope.publishUniversalBot = function () {
                var taskMap = {};
                $scope.selectedAccount = $workflowService.selectedAccount();
                $scope.stream = $workflowService.selectedStream();
                if($scope.stream.visibility.namespace == "private"){
                            if(!advsettingsFirstTimepublish()){
                                return;
                            }
                        }
                var _rejected = _.find($scope.defaultDialogs, {state: "rejected"});

                if (_rejected) {
                    NotificationService.notify(i18n.i18nString('rejected_state'), "warning");
                    return false;
                }

                function triggerPublish() {
                    var requests = [],selectedBots=[];
                    var linkPayload = {};
                    if($scope.stream.universalBotVersion === 1 || !$scope.stream.universalBotVersion){
                        if ($scope.configuredBots && $scope.configuredBots.length) {


                            selectedBots = $scope.configuredBots.filter(function (bot) {
                            return (bot.linked);
                        });
                        if (selectedBots && selectedBots.length) {
                            if($scope.configuredBots.length===selectedBots.length){
                                $scope.allConfiguredBotsSelection = true;
                            }else{
                                $scope.allConfiguredBotsSelection = false;
                             }

                                linkPayload = {
                                bots: selectedBots.map(function (bot) {
                                    return {_id: bot._id};
                                })
                            };
                            $scope.selectedLinkedBotsCount =   linkPayload.bots.length;
                            requests.push({'service': "linkOrUnlinkBots", payload: linkPayload});

                        }else{
                            $scope.allConfiguredBotsSelection = false;
                        }
                        
                    }else{
                        $scope.allConfiguredBotsSelection = true; // ideal assumption for allcomponents publish since no linked bots we can consider is all clean/selected //
                    }
                    }else{
                         if ($scope.linkedBotStates && $scope.linkedBotStates.length || ($scope.deletedLinkedBots && $scope.deletedLinkedBots.length)) {


                        selectedBots = $scope.linkedBotStates.filter(function (bot) {
                            return (bot.selected);
                        });
                        if (selectedBots && selectedBots.length || ($scope.deletedLinkedBots && $scope.deletedLinkedBots.length)) {
                            if($scope.linkedBotStates.length===selectedBots.length){
                                $scope.allLinkedBotsSelection = true;
                            }else{
                                $scope.allLinkedBotsSelection = false;
                             }
                            if($scope.deletedLinkedBots && $scope.deletedLinkedBots.length){
                                 selectedBots = selectedBots.concat($scope.deletedLinkedBots);
                            }
                            linkPayload = {
                                bots: selectedBots.map(function (bot) {
                                    return {_id: bot._id,state:bot.publishState};
                                })
                            };
                            $scope.selectedLinkedBotsCount =   linkPayload.bots.length;
                            requests.push({'service': "linkOrUnlinkBots", payload: linkPayload});

                        }else{
                            $scope.allLinkedBotsSelection = false;
                        }
                        
                    }else{
                        $scope.allLinkedBotsSelection = true; // ideal assumption for allcomponents publish since no linked bots we can consider is all clean/selected //
                    }
                    }
                   
                          
                    if($scope.advancedPublishOptions.nl.allModules.length === $scope.advancedPublishOptions.nl.selectedModules.length ){
                        $scope.allNlSelectionEle = true;
                    }else{
                        $scope.allNlSelectionEle = false;
                    }
                    if($scope.advancedPublishOptions.channels.allModules.length === $scope.advancedPublishOptions.channels.selectedModules.length ){
                        $scope.allChennalSelectionEle = true;
                    }else{
                        $scope.allChannalSelectionEle = false;
                    }
                    if($scope.advancedPublishOptions.extensions.allModules.length === $scope.advancedPublishOptions.extensions.selectedModules.length ){
                        $scope.allApiSelectionEle = true;
                    }else{
                        $scope.allApiSelectionEle = false;
                    }
                    if($scope.advancedPublishOptions.settings.allModules.length === $scope.advancedPublishOptions.settings.selectedModules.length ){
                        $scope.allSettingsSelectionEle = true;
                    }else{
                        $scope.allSettingsSelectionEle = false;
                    }
                    if($scope.stream.universalBotVersion === 1 || !$scope.stream.universalBotVersion){
                        if($scope.allConfiguredBotsSelection && $scope.allNlSelectionEle && $scope.allApiSelectionEle && $scope.allSettingsSelectionEle && $scope.allChennalSelectionEle){
                        $scope.allComponentsSelected = true;
                        }else{
                            $scope.allComponentsSelected = false;
                        }
                    }else{
                        if($scope.allLinkedBotsSelection && $scope.allNlSelectionEle && $scope.allApiSelectionEle && $scope.allSettingsSelectionEle && $scope.allChennalSelectionEle){
                            $scope.allComponentsSelected = true;
                        }else{
                            $scope.allComponentsSelected = false;
                        } 
                    }
                    var panelResources = [];
                    $scope.tasks.map(function (task) {
                        
                        var parent;
                        if (task.parentId) {
                            parent = $scope.allTasksforPublish.filter(function (item) {
                                return item._id === task.parentId;
                            })[0] || {};
                        }
                        if (task.approvedLanguagesCopy) {
                            delete task.approvedLanguagesCopy;
                        }
                        var taskUpgradeInfo = {
                            namespace: task.parentId ? (parent.visibility.namespace == "enterpriseNpublic" ? "enterprise" : task.namespaceTo) : (task.namespaceTo == "enterpriseNpublic" ? "enterprise" : task.namespaceTo),
                            resourceId: task._id,
                            namespaceIds: task.parentId ? parent.visibility.namespaceIds : task.namespaceIds || [],
                            resourceType: getType(task._id),
                            upgradeShortMsg: task.upgradeShortMessage,
                            upgradeLongMsg: task.upgradeLongMessage,
                            versionComment: $scope.universalBotPublishView.upgradeVersionComment,
                            approvalRequestedLanguages: task.approvedLanguages
                        };
                        if (taskUpgradeInfo.namespace === "enterprise") {
                            taskMap[task._id] = task.name;
                        } else {
                            taskMap[task.parentId ? task.parentId : task._id] = task.name;
                            taskMap[task._id] = task.name;//maintaining both parent task name and child task name in else now.Condition can be removed
                        }
                        if (task.parentId) {
                            taskUpgradeInfo.versionType = task.versionType;
                            _.addProps(task.upgradeInfo && task.upgradeInfo.upgrade !== 'automatic', taskUpgradeInfo, { upgradeType: task.upgradeType });
                        }
                        panelResources.push(taskUpgradeInfo);
                    });
                    if ($scope.defaultDialogs && $scope.defaultDialogs.length  && $scope.advancedPublishOptions.nl.allModules[1].selected) {
                        if (_.find($scope.defaultDialogs, {state:"configured"})) {
                            var _defaultDialogPayload = getDefaultdialogPayload();
                            if($workflowService.selectedStream().universalBotVersion === 2){
                                if(panelResources && panelResources.length){
                                    _defaultDialogPayload.resources = _defaultDialogPayload.resources.concat(panelResources);
                                }
                             }
                           
                            requests.push({'service': "standardPublish", payload: _defaultDialogPayload});
                        }
                    } else {
                        var payload = {resources: []};
                        if($workflowService.selectedStream().universalBotVersion === 2){
                            if(panelResources && panelResources.length){
                                payload.resources = payload.resources.concat(panelResources);
                            }
                        }
                        requests.push({'service': "standardPublish", payload: payload});
                    }
                    publishRequests(requests);
                }
                checkForChannels(triggerPublish);
            };
            $scope.addLanguagetoTaskPublish = function (e, language, task, dontUpdateLang) {
                if(dontUpdateLang){
                    if(!language.selected){
                        language.selected = false;
                        task.approvedLanguagesCopy.splice(_.indexOf(task.approvedLanguagesCopy, language.value),1);
                        if(task.approvedLanguages){
                            task.approvedLanguages.splice(_.indexOf(task.approvedLanguages, language.value),1);
                        }
                    } else {
                        language.selected = true;
                        task.approvedLanguagesCopy.push(language.value);   
                        (task.approvedLanguages || []).push(language.value);   
                    }
                }
                
                if(!dontUpdateLang){
                    if(language.disable){
                        return;
                    }
                        if (!language.selected) {
                    language.selected = true;
                    task.approvedLanguagesCopy.push(language.value);
                    (task.approvedLanguages || []).push(language.value);
                    
                } else {
                    language.selected = false;
                    task.approvedLanguagesCopy.splice(_.indexOf(task.approvedLanguagesCopy, language.value), 1);
                    if(task.approvedLanguages){
                        task.approvedLanguages.splice(_.indexOf(task.approvedLanguages, language.value), 1);
                    }
                    
                    
                }
                }
                
                task.approvedLangString = convertToString(task.approvedLanguages);
                task._selected = true;
                var _selectedLanguages = task.supportedLanguages.filter(function (lang) { return lang.selected; });
                var _defaultApprovedLanguages = task.supportedLanguages.filter(function (lang) { return lang.disable; });
                if (_selectedLanguages && _selectedLanguages.length === 0 && task.state !== 'published' && _defaultApprovedLanguages.length === 0) {
                    task._selected = false;
                }
            };
            $scope.selectAllPanels = function (selectAll, selector,e) {
                if($scope.selectionInPogress){
                    return ;
                }
                $scope.selectionInPogress = true;
                var allCheckBoxes = $('' + selector + ' .checkbox [type="checkbox"]');
                if (selectAll) {
                    $.each(allCheckBoxes,function(i,element){
                        if ($(element).is(':not(:checked)')) {
                            if(selector === '.publishDialogTask'){
                                $(element)[0].checked = true;
                                var taskId = $(element)[0].id;
                                taskIndex = _.findIndex($scope.dialogs,{_id:taskId});
                                if(selector === '.publishDialogTask' && (taskIndex >-1)){
                                    $scope.dialogs[taskIndex]._selected = true;
                                    $scope.editTask(e,$scope.dialogs[taskIndex]);
                                }
                            } else {
                                    $(element).click();
                            }
                        }
                    });
                } else {
                    $.each(allCheckBoxes,function(i,element){
                        if ($(element).is(':checked')) {
                            if(selector === '.publishDialogTask'){
                                $(element)[0].checked = false;
                                var taskId = $(element)[0].id;
                                taskIndex = _.findIndex($scope.dialogs,{_id:taskId});
                                if(selector === '.publishDialogTask' && (taskIndex >-1)){
                                    $scope.dialogs[taskIndex]._selected = false;
                                    $scope.editTask(e,$scope.dialogs[taskIndex]);
                                }
                            } else {
                                    $(element).click();
                            }
                        }
                    });
                }
                $scope.selectionInPogress = false;
            };
            $scope.editPanelTask = function (e, task,element,parent ,taskId) {
                var _defaultApprovedLanguages = task.supportedLanguages.filter(function (lang) { return lang.disable; });
                if (task._selected && task.state !== 'published' && _defaultApprovedLanguages.length === 0) {
                    for (var i = 0; i < task.supportedLanguages.length; i++) {
                        task.supportedLanguages[i].selected = true;
                        $scope.addLanguagetoTaskPublish(e, task.supportedLanguages[i], task, true);
                    }
                }
                else if (task.state !== 'published' && _defaultApprovedLanguages.length === 0) {
                    for (var j = 0; j < task.supportedLanguages.length; j++) {
                        task.supportedLanguages[j].selected = false;
                        $scope.addLanguagetoTaskPublish(e, task.supportedLanguages[j], task, true);
                    }
                }
                if(!$scope.selectionInPogress && element && parent){
                    $scope.intermediateSelection(element,parent,true);
                }
            };
            $scope.getPartialLanguageTasks = function (tasks) {
                var filteredTasks = _.filter(tasks, function (task) {
                    return !task.nodeId && task.approvedLanguages && task.approvedLanguages.length !== task.supportedLanguages.length;
                });

                return filteredTasks;
            };
            function updateHasUpgradedTask(task){
                if(task.parentId){
                    $scope.hasUpgradedTasks = true;
                }
            }
            function collectSelectedTasks() {
                $scope.hasUpgradedTasks = false;
                $scope.tasks = [];
                $scope.panels = $scope.panels || [];
                $scope.panels.map(function (panel) {
                    panel.approvedLanguages = angular.copy(panel.approvedLanguagesCopy);
                    panel.approvedLangString = convertToString(panel.approvedLanguages);
                    if (panel._selected) {
                        panel.namespaceTo = 'enterprise';
                        panel.taskType = "panel";
                        updateHasUpgradedTask(panel);
                        $scope.tasks.push(angular.copy(panel));
                    }
                });
                $scope.partialLanguageTasks = $scope.getPartialLanguageTasks($scope.tasks) || [];
            }
            function getType(id) {
                if(id[0]=='p'){
                    return 'panel';
                } else if (id[0]=='w'){
                    return 'widget';
                }
                else if (id[0]=='f'){
                    return 'form';
                }
                else {
                    return id[0] == 'l' ? "alert" : id[0] == 'd' ? "dialog" : "action";
                }
                
            }
            $scope.generateRandomId = function (prefix) {
                    $scope.stIconv = prefix + '' + uuid4.generate();
                };
            var streamUpdateEvent = $scope.$on("streamUpdate", function () {
                $rootScope.currSelectedBot = $workflowService.selectedStream();
                $scope.streams = $workflowService.streamsAll();
                $scope.allBots = _.merge($scope.allBots, $workflowService.streamsAll());
                $scope.allBots = $workflowService.streamsAll();
                $rootScope.currSelectedBot = $workflowService.cloneData(_.find($scope.allBots, {_id: $workflowService.selectedStream()._id}));
                $scope.generateRandomId();
                $scope.callbacks.botSelected($rootScope.currSelectedBot);
                $scope.$broadcast("updateLinkableBots");
            });
            $scope.restrictSideHover=false;
            $scope.sideBarHoverEnter = function () {
            
                if (!$scope.restrictSideHover) {
                    $scope.sidenavhover = true;
              }
              $timeout(function(){
                $rootScope.$broadcast("hoverEvent");
              });
            };

            $scope.sideBarHoverLeave = function () {
                
                $scope.restrictSideHover=false;
                $scope.sidenavhover = false;
                  setTimeout(function(){
                    $(".scrollableSection").scrollTop(0);
                },100);
            };
            $scope.menuHoverEnter = function (e, menuItem) {
                menuItem.hoverIn = true;
                if ($scope.sidenavhover && menuItem.hasInnerLeftItems && !menuItem.showInnerMenu) {
                    $timeout(function () {
                        if ($("." + menuItem.class + ":hover")) {
                            var ele = $("." + menuItem.class);
                            if (menuItem.class === 'settingsMenu') {
                                setTimeout(function () {
                                    scrollToEle(ele);
                                }, 100);
                            }
                            if(menuItem.hoverIn){
                                menuItem.showInnerMenu = true;
                            }
                        }
                    }, 1000);
                }
            };
            var restrictSideHoverEvent = $rootScope.$on("restrictSideHover", function (evt, newValue) {
                $scope.sidenavhover=false;
                $scope.restrictSideHover = newValue || false;
            });

            $scope.createGroup = function(){
                setTimeout(function(){
                    $scope.group = {};
                    $('#groupName').focus();
                    angular.element('#create-group').modal('show');
                },1000);
                   
            };

            $scope.closeSmallTalkModal = function(group){
                 angular.element('#create-group').modal('hide');
                 $scope.group = {};

                 
            };

            $scope.proceedGroupCreation = function(group){
                var _payload = {
                    'groupName':group.groupName
                };
                BTStreamsService.createGroup(streamId,_payload).then(function(response){
                    if(response){
                        var eventInfo = {
                            "streamId":$workflowService.selectedStream()._id,
                            "BotName":$workflowService.selectedStream().name,
                            "BotLanguage":$workflowService.currentLanguage(),
                            "Level":"Engagement L2",
                            "Category":"Engagement L2",
                            "Sub Category":"Conversation - Small Talk",
                        };
                        mixPanel.postEvent('Conversation - Small Talk group created',eventInfo);
                        $scope.group = response.data;
                        $scope.createNewGroup($scope.group);
                        setTimeout(function(){
                            $scope.closeSmallTalkModal();
                        },200);
                        getGroups(streamId);
                        
                    }
                    
                },function(err){
                    $scope.closeSmallTalkModal();
                  if(err.data && err.data['errors'] && err.status === 409){
                        NotificationService.notify(err.data['errors'][0].msg,"error");
                  }else{
                    NotificationService.notify(i18n.i18nString('some_thing_wrong_label'),"error");
                  }
                  
                });

            };

            function setAccessRights(menuItem){
                $scope.accessRights = accessControlService.getAccessRight(menuItem);
                return;
            }

            function decodePattern(msg) {
                        try {
                            return msg.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                        } catch (e) {
                            return msg;
                        }
             }


            function getGroups(id,cb){
                    if (!id) {
                    return;
                }
                var deferred = $q.defer();
                setAccessRights('BOTBUILDER_TASKS');
                $scope.smallTalkTasks = $scope.smallTalkTasks || [];
                $scope.loadingSmallTalk = true;
                $scope.selectedStream = $workflowService.selectedStream();
                if($scope.selectedStream.hasOwnProperty('isSmalltalkMigrated')){
                    $scope.showNoMigrate = $scope.selectedStream['isSmalltalkMigrated'];
                }else{
                    $scope.showNoMigrate = false;
                }
                    BTStreamsService.getSmallTalkGroups(id).then(function(response){
                    $scope.groups = response.data;
                    angular.forEach($scope.groups,function(group){
                        group.userUtterance = decodePattern(group.userUtterance);
                        group.botUtterance.text =decodePattern(decodeURIComponent(group.botUtterance.text));
                        if(group.botUtterance.type === 'uxmap'){
                            group.botUtterance['uiText'] = 'JS Message </>'; 
                        }
                    });
                    $scope.fullModalCallback.loadGroups($scope.groups,cb);
                    $scope.smallTalkTasks = $workflowService.cloneData(response.data);
                    $scope.smallTalkByState = $workflowService.cloneData($scope.smallTalkTasks);
                    $scope.loadingSmallTalk = false;
                    deferred.resolve(response);
                    if($scope.callbacks && $scope.callbacks.prepareGSearchData) {
                            $scope.callbacks.prepareGSearchData();
                        }
                },function(err){
                    $scope.showNoMigrate = false;
                    $scope.loadingSmallTalk = false;
                    $scope.smallTalkByState = [];
                });
                return deferred.promise;
          
            }

            $scope.$watch('groupList',function(newValue,oldValue){
                if(newValue){
                    $('.innerRightBody').animate({scrollTop:0});
                    $scope.showNoMigrate = true;
                    $scope.groups = newValue;
                    angular.forEach($scope.groups,function(group){
                         group.userUtterance = decodePattern(group.userUtterance);
                         group.botUtterance.text = decodePattern(decodeURIComponent(group.botUtterance.text));
                        if(group.botUtterance.type === 'uxmap'){
                            group.botUtterance['uiText'] = 'JS Message </>'; 
                        } 
                    });
                    BTStreamsService.getBTStream($workflowService.selectedStream()._id).then(function(res){
                         $workflowService.selectedStream(res.data);
                         getGroups(streamId);
                    });                                
                                       
                                  
                }
            });

            $scope.deleteGroup = function(group){
                        var msg = i18n.i18nString('delete_group');
                        NotificationService.alert(msg, confirmDelete, {okText: i18n.i18nString('ok_uppercase')},'',undefined,i18n.i18nString('confirm'));
                        function confirmDelete(){
                            BTStreamsService.deleteGroup(streamId,group.groupId).then(function(response){
                            if(response.data){
                                NotificationService.notify(i18n.i18nString('delete_smalltalk_group_success'), "success");
                                $scope.groups = response.data;
                                getGroups(streamId);
                                $scope.fullModalCallback.loadGroups($scope.groups);

                            }
                            },function(err){

                            });
                        }
                
            };
            $scope.uploadJSONSmallTalk = function(fileObject) {
                var _ext = "";
                if (fileObject.name) {
                    _ext = fileObject.name.substring(fileObject.name.lastIndexOf('.'));
                     _ext.slice(1).toUpperCase();
                    var supportingFileFormats = [".json",".tsv"];
                    if ($.inArray(_ext, supportingFileFormats) === -1) {
                        NotificationService.notify(i18n.i18nString('upload_file_desc'), "error");
                        $scope.fileExtensionError = true;
                        return;
                    }
                }




                var reader = new FileReader();
                reader.readAsText(fileObject);

                reader.onload = function(e) {
                    var respnoseData = reader.result;
                    $scope.jsonData = respnoseData;
                    if (!respnoseData || respnoseData && !respnoseData.length) {
                        NotificationService.notify(i18n.i18nString('onload_file') + _ext.slice(1).toUpperCase() +  i18n.i18nString('format'), "error");
                        $scope.fileEmptyError = true;
                    } else {
                        console.log("fileobject", fileObject.name);
                        $scope.smallTalkFileName = fileObject.name;
                        $scope.fileExtensionError = false;

                        var data = new FormData();
                        data.append('file', fileObject);
                        data.append('fileContext', 'bulkImport');
                        data.append('fileExtension', _ext.substring(_ext.lastIndexOf('.') + 1));
                        data.append('Content-Type', fileObject.type);
                        $scope.fileUploadData = data;
                        $scope.fileObject = fileObject;

                    }
                };



            };

            function initDragDropFile(){
                    (function(window) {
              function triggerCallback(e, callback) {
                  if (!callback || typeof callback !== 'function') {
                      return;
                  }
                  var files;
                  if (e.dataTransfer) {
                      files = e.dataTransfer.files;
                  } else if (e.target) {
                      files = e.target.files;
                  }
                  callback.call(null, files);
              }

              function makeDroppable(ele, callback) {
                  if ($(ele).find('[type="file"]').length > 0) {
                      return;
                  }

                  var input = document.createElement('input');
                  input.setAttribute('type', 'file');
                  input.setAttribute('multiple', true);
                  input.style.display = 'none';
                  input.id = "fileInputID";

                  input.addEventListener('change', function(e) {
                      triggerCallback(e, callback);
                  });

                  ele = ele[0];

                  ele.appendChild(input);


                  ele.addEventListener('dragover', function(e) {
                      e.preventDefault();
                      e.stopPropagation();
                      ele.classList.add('dragover');
                  });

                  ele.addEventListener('dragleave', function(e) {
                      e.preventDefault();
                      e.stopPropagation();
                      ele.classList.remove('dragover');
                  });

                  ele.addEventListener('drop', function(e) {
                      e.preventDefault();
                      e.stopPropagation();
                      ele.classList.remove('dragover');
                      triggerCallback(e, callback);
                  });

                  $(ele).find(".browseBtn")[0].addEventListener('click', function() {
                      input.value = null;
                      input.click();
                  });

              }
              window.makeDroppable = makeDroppable;
              })(window);
              (function(window) {
                  window.makeDroppable($('.smallTalkFileDropLanding'), function(files) {
                      $scope.uploadJSONSmallTalk(files[0]);
                  });
              })(window);
            }

            $scope.importSmallTalk = function(){
                $scope.importing = "initial";
                $('.import-small-talk').modal('show');
                $timeout(function() {
                     initDragDropFile();
                 }, 500);
            };

            function writeAndDownload(filename, data) {
                if (navigator.msSaveBlob) {
                  var blob = new Blob([data], { type: 'data:text/plain;charset=utf-8' });
                  return window.navigator.msSaveOrOpenBlob(blob, filename);
                } else {
                  var element = document.createElement('a');
                  element.setAttribute('href', 'data:application/' + filename.split(".")[1] + ';charset=utf-8,' + encodeURIComponent(data));
                  element.setAttribute('download', filename);
                  element.style.display = 'none';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }
            }

            function trainBot(){
                   BTStreamsService.trainUtterances($workflowService.selectedStream()._id)
                    .then(function(res) {
                            $rootScope.$emit('triggerAutoTrainStatusPoll');
                            $rootScope.$broadcast('getProgressDockStatus');
                            NotificationService.notify(i18n.i18nString('bot_train'), "info");
                            
                        },
                        function(err) {
                            if(accessControlService.getAccessRight("BOTBUILDER_NATURAL_LANGUAGE") !== 'NO'){ 
                                if (err.data.errors.length > 0) {
                                    NotificationService.notify(err.data.errors[0].msg, "error");
                                } else {
                                    NotificationService.notify(i18n.i18nString('bot_train_failure'), "error");
                                }
                            }
                        });
            }



            function startPollImportStatus(timeout) {
                    return setInterval(function () {
                        BTStreamsService.statusImportingSmallTalk(userId,$scope.stream._id)
                            .then(function (res) {
                                 if (res && res.data) {
                                    $scope.statusLogs = res.data.statusLogs || [];
                                    if(res.data.status === 'success') {
                                        stopImportBotPolling();
                                        trainBot();
                                        $scope.importing = res.data.status;
                                    }
                                    else if(res.data.status === 'failed') {
                                        $scope.importmessage = res.data.message;
                                        $scope.showFailedErrors = false;
                                        stopImportBotPolling();
                                        $scope.importing = res.data.status;
                                    }
                                }
                            },
                            function (err) {
                                $scope.importing = 'failed';
                                stopImportBotPolling();
                                var _msg = i18n.i18nString('bot_import_error');
                                if (err.data && err.data.errors && err.data.errors.length > 0) {
                                    _msg = err.data.errors[0].msg;
                                }
                                NotificationService.notify(_msg, "error");
                            });
                    }, timeout);
                }
            function stopImportBotPolling() {
                             clearTimeout($scope._importStatusInit);
                            clearInterval(progressInterval);
                            $scope._importStatusInit = null;
                            progressInterval = null;
                    }

        $scope.startImportSmallTalk = function(){
              $scope.importing = 'pending';
              $scope.totalProgress = 1;
              BTStreamsService.uploadBotFunctionsFile(userId,$scope.fileUploadData).then(function(res){
              var fileUploaded = {
                fileName:res.data.fileId,
                fileType:$scope.fileObject.name.substring($scope.fileObject.name.lastIndexOf('.') + 1),
                importType:'override',
                streamId:$scope.stream._id
              }; 
              startImportProgress();
              BTStreamsService.startImporting($scope.stream._id,fileUploaded)
                .then(function(res) {
                          if (res && res.data) {
                        $scope.streamRefId = res.data._id || "";
                        $scope.statusLogs = res.data.statusLogs || [];
                        if(res.data.status === 'pending') {
                            $scope._importStatusInit = startPollImportStatus(3000);
                            $scope.importing = res.data.status;
                        }
                        else if(res.data.status === 'success') {
                            $scope.totalProgress = 100;
                            stopImportBotPolling();
                            trainBot();
                            $scope.importing = res.data.status;
                           
                       
                            
                        }else if(res.data.status === 'failed'){
                            $scope.totalProgress = 100;
                            stopImportBotPolling();
                            $scope.importing = res.data.status;
                            
                        }
                        else {
                            stopImportBotPolling();
                            clearInterval(progressInterval);
                            NotificationService.notify(i18n.i18nString('some_thing_wrong_label'),'error');
                            
                        }
                    }
                }, function(err) {
                    $scope.importing = 'failed';
                    $scope.errorMsg = err.data.errors;
                    clearInterval(progressInterval);
                    progressInterval = null;
                    NotificationService.notify(i18n.i18nString('some_thing_wrong_label'),'error');

                });

            });
        };

        function updateStreamData(){
            BTStreamsService.getBTStream($workflowService.selectedStream()._id).then(function(res){
                       $scope.update.updateStreamData(res.data); 
                        $workflowService.selectedStream(res.data);
             }); 
        }

        $scope.proceedSmallTalk = function(){
            if($scope.enableProceed){
                 $scope.enableProceed = !$scope.enableProceed;
                 BTStreamsService.migrateSmallTalk($scope.stream._id).then(function(response){
                var _groupId = Object.keys(response.data.groups)[0];
                updateStreamData();
                var migrateGroup = {
                    'groupId':_groupId,
                    'groupName':response.data.groups[_groupId].groupName
                };
                $scope.createNewGroup(migrateGroup);

            });
            }
           
        };

        $scope.removeSmallTalkFile = function(){
            $scope.smallTalkFileName = "";
        };

        $scope.manage_var_cb.close = function() {
            $scope.modalSlider.close('#manageVarNamespace');
            $scope.manageVarEnable = false;
        };

        $scope.manage_var_inf_cb.close = function() {
            $scope.modalSlider.close('#manageVarNamespaceInf');
            $scope.manageVarInfEnable = false; 
        };

        $scope.manage_var_action_cb.close = function() {
            $scope.modalSlider.close('#manageVarNamespaceAction');
            $scope.manageVarActionEnable = false; 
        };

        $scope.manage_var_alert_cb.close = function() {
            $scope.modalSlider.close('#manageVarNamespaceAlert');
            $scope.manageVarAlertEnable = false;
        };

        $scope.manage_var_small_talk_cb.close = function() {
            $scope.modalSlider.close('#manageVarNamespaceSmallTalk');
            $scope.manageVarSmallTalkEnable = false;
        };

        $scope.onCancel = function(){
            $('.import-small-talk').modal('hide');
            $scope.removeSmallTalkFile();
        };

        $scope.onDone = function(){
            $('.import-small-talk').modal('hide');
            $scope.smallTalkFileName = "";
            getGroups($workflowService.selectedStream()._id);
           
        };

        $scope.getStreamState = function(innerMenu){
            $scope.accessRights = accessControlService.getAccessRight(innerMenu);
            if($scope.accessRights !== 'VIEW'){
                $scope.botDetails.streamState = $workflowService.selectedStreamState();
                if($scope.botDetails.streamState === 'published'){
                    return true;
                }

            }else{
                return true;
            }
        };

         $scope.exportSmallTalk = function (fileType) {
                function startDownload(){
                  var payload = {
                    "exportType": fileType,
                    "streamId": $workflowService.selectedStream()._id,
                    "getFileId":true
                  };
                  BTStreamsService.exportSmallTalk($scope.stream._id, payload).then(function (res) {
                     if(res.data.status === 'IN_PROGRESS'){
                        NotificationService.notify(i18n.i18nString('small_talk_export'),"success");
                     }
                     $rootScope.$broadcast('getProgressDockStatus');
                     $scope.$broadcast('startTimer');
                  }, function (err) {
                    if (err && err.data && err.data.errors &&  err.data.errors[0]) {
                        if(err.data.errors){
                            NotificationService.notify(err.data.errors[0].msg, "error");
                        } else{
                            NotificationService.notify(i18n.i18nString('small_talk_failure'), "error");
                        }
                    }
                  });
                }
             function cancelDownload(){
                 return;
             }
             function checkBoxCb(checkValue){
               console.log(checkValue);
              $scope._constants_.updateDownloadPopUppreferance(checkValue);
             }
             if($scope._constants_.config.showDownloadPopUps){
              NotificationService.userConfirm($scope._constants_.downloadPopUpMsg, [startDownload, cancelDownload], {okText:i18n.i18nString('confirm') ,checkBox:{"enable":true,"checkBoxCb":checkBoxCb}}, "", undefined,i18n.i18nString('download_smalltalk'));  
             }else{
              startDownload();
        }
         
        };
            // forms logics starts//
            $scope.closeFormCreation = function(){
                $scope.modalSlider.close("#uiFormCreation");
                $scope.uiFormCreation = false; 
             };
             $scope.validateFormName = function(event){
                 $timeout(function(){
                    event.currentTarget.value = event.currentTarget.value.replace(/[ `!@#$%^&*()~_+\-=\[\]{};':"\\|,.<>\/?~]/gi, '');
                    $scope.uiFormCreateObj.name = event.currentTarget.value;
                 });
              };
             function getForms(id) {
                if (!id) {
                    return;
                }
                var deferred = $q.defer();
                $scope.uiForms = $scope.uiForms || [];
                $scope.loadingForms = true;
                BTStreamsService.getBotUiForms(id)
                    .then(function (res) {
                        if(typeof(res.data) === 'string') {
                            res.data = [];
                        } 
                        $scope.uiForms = res.data;
                        mapChildTaskToParentTask($scope.uiForms,'uiForms');
                        // updateBotDetailsOnTaskBasis($scope.alertTasks, "alertTasks");
                        $scope.loadingForms = false;
                        deferred.resolve(res); 
                    }, function (err) {
                        $scope.loadingForms = false;
                        if (+err.status === 403) {
                            deferred.resolve({data: []});
                        } else {
                            NotificationService.notify(i18n.i18nString('forms_loading'), "error");
                            $scope.uiForms = [];
                        }
                    });

                return deferred.promise;
            }
            var uiformIframeEvent = $rootScope.$on("uiformIframeEvent", function (e,formEvent) {
                if(formEvent && formEvent.payload && formEvent.payload.action === 'close'){
                    $rootScope.$emit("insertOrUpdateTask", "uiForms", null, false);
                    $scope.fullModalCallback.closeFullPageModal();
                }
            });
            $scope.createNewForm = function(){
                $scope.loadingFormDetails =  false;
                $scope.uiFormCreateObj = {
                    'name':'',
                    'displayName':'',
                    'description':'',
                    'type':'regular',
                    'isSecured': false,
                    // 'redactAgentBotKitData': false,
                    // 'redactSvcData': false,
                };
                $scope.uiFormCreation = true; 
                $scope.modalSlider.open("#uiFormCreation");
                var eventInfo = {
                    "streamId":$workflowService.selectedStream()._id,
                    "BotName":$workflowService.selectedStream().name,
                    "BotLanguage":$workflowService.currentLanguage(),
                    "Level":"Engagement L3",
                    "Category":"Engagement L3",
                    "Sub Category":"Digital Tasks - Digital Forms",
                };
                mixPanel.postEvent('Digital Tasks - New Digital Form initiated',eventInfo);
             };
             $scope.updateForm = function(formData){
                $scope.uiFormCreation = true; 
                $scope.loadingFormDetails =  true;
                 $scope.modalSlider.open("#uiFormCreation");
                 $scope.secureFieldArr = [];
                 BTStreamsService.getBotUiFormById($scope.stream._id,formData._id).then(function (res) {
                    formData = res.data;
                    $scope.loadingFormDetails =  false;
                    $scope.previousSecurity = formData.isSecured;
                    $scope.uiFormCreateObj = {
                        'name':formData.name,
                        'displayName':formData.displayName,
                        'description':formData.description,
                        'type':formData.type,
                        'isSecured': formData.isSecured,
                        // 'redactAgentBotKitData': formData.redactAgentBotKitData,
                        // 'redactSvcData': formData.redactSvcData,
                        "_id":formData._id
                    };
                    $scope.secureFieldArr = [];
                    if(formData.components.length > 0) {
                        $scope.secureFieldArr = [];
                        $.each(formData.components,function(field,value){
                            if(formData.components[field] && formData.components[field]["metaData"] && formData.components[field]["metaData"]["isSecured"] === true) {
                                ($scope.secureFieldArr).push(formData.components[field]["metaData"]);
                              }
                        });
                      }
                   
                    
                 },function(err){
                    $scope.loadingFormDetails =  false;
                       NotificationService.notify(i18n.i18nString('failed_to_get_form'), "error");
                 });
            
             };
             $scope.enabledSecurity = function(){
                 if($scope.uiFormCreateObj.isSecured){
                    $scope.uiFormCreateObj.redactAgentBotKitData = true;
                    $scope.uiFormCreateObj.redactSvcData = true;
                 }
             };
             $scope.closecancelSecureOverride =  function(){
                 $scope.updatingForm =  false;
                $('#formSecurityOverride').modal('hide');
             };
             $scope.saveUiForm = function(skipOverride){
                 $scope.updatingForm =  true;
                 var update = function(){
                    var payload = {
                        name:$scope.uiFormCreateObj.name,
                        type:$scope.uiFormCreateObj.type,
                        displayName:$scope.uiFormCreateObj.displayName,
                        isSecured: $scope.uiFormCreateObj.isSecured,
                       //  redactAgentBotKitData: $scope.uiFormCreateObj.redactAgentBotKitData,
                       //  redactSvcData: $scope.uiFormCreateObj.redactSvcData,
                    };
                    if($scope.uiFormCreateObj.description && $scope.uiFormCreateObj.description.trim()!==''){
                       payload.description = $scope.uiFormCreateObj.description;
                    }
                    if($scope.uiFormCreateObj._id) {
                       BTStreamsService.updateUiForm($scope.stream._id,$scope.uiFormCreateObj._id, payload).then(function (res) {
                         $scope.updatingForm =  false;
                           NotificationService.notify(i18n.i18nString('form_update_success'), "success");
                           $.each($scope.uiForms,function(i,form){
                               if(form._id === $scope.uiFormCreateObj._id){
                                   form = res;
                               }
                           });
                           mapChildTaskToParentTask($scope.uiForms,'uiForms');
                           $scope.closeFormCreation();
                           $('#formSecurityOverride').modal('hide');
                           $scope.updatingForm =  false;
                           $scope.loadingFormDetails =  false;
                    }, function (err) {
                        $scope.updatingForm =  false;
                        $scope.loadingFormDetails =  false;
                      if (err && err.data && err.data.errors && err.data.errors.length && err.data.errors[0]) {
                              NotificationService.notify(err.data.errors[0].msg, "error");
                      } else {
                          NotificationService.notify(i18n.i18nString('form_update_failure'), "error");
                      }
                    });
                   } else {
                       BTStreamsService.createUiForm($scope.stream._id, payload).then(function (res) {
                         $scope.updatingForm =  false;
                            var eventInfo = {
                                "streamId":$workflowService.selectedStream()._id,
                                "BotName":$workflowService.selectedStream().name,
                                "BotLanguage":$workflowService.currentLanguage(),
                                "Level":"Engagement L3",
                                "Category":"Engagement L3",
                                "Sub Category":"Digital Tasks - Digital Forms",
                                "Secure Form data status": payload.isSecured
                            };
                            mixPanel.postEvent('Digital Tasks - New Digital Form created',eventInfo);
                           $scope.uiForms.push(res.data);
                           mapChildTaskToParentTask($scope.uiForms,'uiForms');
                           $scope.openuiForms(res.data);
                          $scope.closeFormCreation();
                    }, function (err) {
                      $scope.updatingForm =  false;
                      if (err && err.data && err.data.errors && err.data.errors.length && err.data.errors[0]) {
                              NotificationService.notify(err.data.errors[0].msg, "error");
                      } else {
                          NotificationService.notify(i18n.i18nString('form_creation_failure'), "error");
                      }
                    }); 
                   } 
                 };
                 if(( $scope.uiFormCreateObj &&  $scope.uiFormCreateObj._id && ($scope.previousSecurity !== $scope.uiFormCreateObj.isSecured)) && !skipOverride && $scope.secureFieldArr.length && $scope.uiFormCreateObj.isSecured){
                    $('#formSecurityOverride').modal('show');
                 } else {
                    update();
                 }
             };
             
            // forms logics ends//

        $scope.fullModalCallback.smallTalkExport = function(fileType){
                 function startDownload(){
              var payload = {
                "exportType": fileType,
                "streamId": $workflowService.selectedStream()._id,
                "getFileId":true
              };
              BTStreamsService.exportSmallTalk($scope.stream._id, payload).then(function (res) {
                    if(res.data.status === "IN_PROGRESS"){
                        NotificationService.notify(i18n.i18nString('small_talk_export'),"success");
                    }
                    $rootScope.$broadcast('getProgressDockStatus');
                    $scope.$broadcast('startTimer');
              }, function (err) {
                if (err && err.data && err.data.errors[0]) {
                    if(err.data.errors[0].code == 403){
                        NotificationService.notify(err.data.errors[0].msg, "error");
                    } else{
                        NotificationService.notify(i18n.i18nString('small_talk_failure'), "error");
                    }
                }
              });
            }
         function cancelDownload(){
             return;
         }
         function checkBoxCb(checkValue){
           console.log(checkValue);
          $scope._constants_.updateDownloadPopUppreferance(checkValue);
         }
         if($scope._constants_.config.showDownloadPopUps){
          NotificationService.userConfirm($scope._constants_.downloadPopUpMsg, [startDownload, cancelDownload], {okText: i18n.i18nString('confirm'),checkBox:{"enable":true,"checkBoxCb":checkBoxCb}}, "", undefined,i18n.i18nString('download_smalltalk'));  
         }else{
          startDownload();
        }

        };

        function updateAllowNamespace() { $scope.allowNamespace = $workflowService.selectedStream().enableNameSpace; }      

            /*function customLibraryTemplates(){
                $scope.customTemplates = [];
                BTStreamsService.getAllCustomTemplate($workflowService.selectedStream()._id).then(function(res){
                    for(var i=0;i<res.data.length;i++){
                        res.data[i].name =res.data[i].name.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                        res.data[i].description = res.data[i].description.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                    }
                    $workflowService.customLibraries(res.data);
                },function(error){
                    if (error && error.data && error.data.errors) {
                        var _msg = error.data.errors[0].msg;
                        NotificationService.notify(_msg, 'error');
                    } else if (error.errors && _.isArray(error)) {
                        var msg = error.errors[0].msg;
                        NotificationService.notify(msg, 'error');
                    } else {
                        NotificationService.notify('Unexpected error occured. Please try again.', 'error');
                    }
                });
            }*/
            $scope.callbacks.editWorkflow=$scope.editWorkflow;
            $scope.callbacks.viewWorkflow = $scope.viewWorkflow;
            $scope.callbacks.editOrViewWorkflow = $scope.editOrViewWorkflow;
            $scope.callbacks.getActions = getActions;
            $scope.callbacks.getFlowTasks = getFlowTasks;
            $scope.callbacks.updateAllowNamespace = updateAllowNamespace;
            $scope.callbacks.getAlerts = getAlerts;
            $scope.callbacks.getKnowledgeTasks= getKnowledgeTasks;
            $scope.callbacks.prepareDefautDialogData=prepareDefautDialogData;
            $scope.callbacks.getMappings=getMappings;
            $scope.callbacks.getAlertDialogMappings =getAlertDialogMappings;
            $scope.callbacks.kgHistApi = $scope.kgHistApi;
            $scope.callbacks.getSmallTalkGroups = getGroups;
            $scope.callbacks.openKnowledgeCollectionTab = openKnowledgeCollectionTab;
            $scope.callbacks.openGroup = $scope.openGroup;
            $scope.callbacks.createGroup = $scope.createGroup;
            $scope.callbacks.getForms = getForms;
            $scope.callbacks.getScenes = getScenes;

            init();
            $scope.progressBridge = $scope.callbacks.progressBridge;
            var iframeLoadedREvent = $scope.$on('iframeLoadEvent', function ($event) {
                $scope.iframeLoding = false;
            });
            $(navigator).on('initiateChatBot',function(e){
                $scope.initiateChatBot();
            });


            $scope.exportFaq = function (event, targetName) {
                event.stopPropagation();
                event.preventDefault();
                function startExport() {
                    // alert('Hellol');
                    var link=document.createElement('a');
                    document.body.appendChild(link);
                    for(var i=0; i<downloadFilesList.length; i++) {
                        link.href=downloadFilesList[i];
                        link.download = downloadFilesList[i].slice(downloadFilesList[i].lastIndexOf('/')+1);
                        link.target = "_blank";
                        link.click();
                    }
                }
                function cancleExport() {
                  return;
                }
                function checkBoxCb(checkValue) {
                  console.log(checkValue);
                  $scope._constants_.updateDownloadPopUppreferance(checkValue);
                }
                if ($scope._constants_.config.showDownloadPopUps) {
                  NotificationService.userConfirm($scope._constants_.downloadPopUpMsg, [startExport, cancleExport], { okText: i18n.i18nString('confirm'), checkBox: { "enable": true, "checkBoxCb": checkBoxCb } }, "", undefined, i18n.i18nString('export_faqs'));
                } else {
                  startExport();
                }
            };

            function openKnowledgeCollectionTab(){
                if($scope.activeType === 'botTasks'){
                     $scope.openKnowledgeReport = false;
                     $scope.rightPanel.innerRightPanel.showView('knowledgeCollection');
                 }else{
                    $scope.openKnowledgeReport = true;
                    $scope.rightPanel.innerRightPanel.showView('knowledgeCollection');
                 }
               $timeout(function(){
                  $scope.botDetailsCb['openAnalysisFlag'] = true;
                  $('.leftContainer').trigger('click');
                });
            }


            $scope.trainBot = function(){
                    BTStreamsService.trainUtterances($workflowService.selectedStream()._id)
                    .then(function(res) {
                            $scope.trainShow = false;
                            $scope.showTrainSavingSyn = true;
                            $scope.trainStatus = {
                                'success': false,
                                'failed': false,
                                'saving': true
                            };
                            $rootScope.$emit('triggerAutoTrainStatusPoll');
                            $rootScope.$broadcast('getProgressDockStatus');
                            $rootScope.$broadcast('startTimer');
                            NotificationService.notify(i18n.i18nString('bot_train'), "info");
                        },
                        function(err) {
                            if(accessControlService.getAccessRight("BOTBUILDER_NATURAL_LANGUAGE") !== 'NO'){
                                if (err.data.errors.length > 0) {
                                    NotificationService.notify(err.data.errors[0].msg, "error");
                                } else {
                                    NotificationService.notify(i18n.i18nString('bot_train_failure'), "error");
                                }
                            }
                            $scope.trainStatus = {
                                'success': false,
                                'failed': true,
                                'saving': false
                            };
                        });

            };

               var linkedBotTrainingFinished =  $rootScope.$on('linkedBotTrainingFinished', function() {
                $scope.trainStatus = {
                    'success': true,
                    'failed': false,
                    'saving': false
                };

            });

            $scope.closeTrainSaveDiv = function(){
                $scope.showTrainSavingSyn = false;
            };

            $scope.linkView.updateTrainStatus = function(){
                $scope.trainShow = true;
            };
           
            $scope.progressBridge.openKnowledgeCollectionTab = openKnowledgeCollectionTab;
            $scope.botDetailsCb.startTimer = function(){
                $scope.$broadcast('startTimer');
            };
            $scope.progressBridge.callAnalysisReport = function(dockId){
                $timeout(function(){
                    $scope.botDetailsCb.callAnalysisReport(dockId);
                });
            };
            $scope.conversationUpgrade =  function(upgradeDialog,openDialog) {
                if($workflowService.selectedStreamState() === 'published') {
                    NotificationService.notify(i18n.i18nString('cannot_upgrade_dialogVersion_state'),'error');
                    return;
                }
                if(upgradeDialog && upgradeDialog.state === 'published') {
                    NotificationService.notify(i18n.i18nString('cannot_upgrade_dialogVersion'),'error');
                    return;
                }
                if(upgradeDialog){
                    $scope.selectedDialogForUpgrade =  upgradeDialog;
                    $scope.upgradeDialogCb.showDialogUpgrade = true;
                    setTimeout(function(){
                        if($scope.upgradeDialogCb.upgadeToNewDialog){
                            $scope.upgradeDialogCb.upgadeToNewDialog();
                        }
                    },500);
                } else if(openDialog){
                    $scope.editWorkflow(openDialog,'flowtaskEdit');
                } else {
                    $scope.upgradeDialogCb.showDialogUpgrade = false;
                    getFlowTasks($workflowService.selectedStream()._id);
                }
            };
            $scope.upgradeDialogCb.conversationUpgrade = $scope.conversationUpgrade;
            $scope.progressBridge.createVersionStatus = function(data){
                $timeout(function(){
                    if($scope.botVersionCb.updateVersionStatus){
                        $scope.botVersionCb.updateVersionStatus(data);
                    }
                    if($scope.upgradeDialogCb.verionStatus &&  $scope.upgradeDialogCb.showDialogUpgrade){
                        $scope.upgradeDialogCb.verionStatus(data);
                    }
                    if($scope.fullModalCallback.verionStatus){ // for dialog upgrade //
                        $scope.fullModalCallback.verionStatus(data);
                    }
                });
            };

            $scope.progressBridge.kgTrainingStatus = function(data){
                $timeout(function(){
                    if($scope.botDetailsCb && $scope.botDetailsCb.kgTrainingStatus){
                         $scope.botDetailsCb.kgTrainingStatus(data);
                     }else{
                        $rootScope.$broadcast('kgTrainingStatus',data);
                     }
                   
                });
            };

            
            $scope.botDetailsCb.reloadToBots = function(){
                $scope.callbacks.showView('botsForm');
            };

            $scope.redirectWorkbench = function() {
                window.open($rootScope.resolveWorkbenchHostUrl(), '_self');
            };



            
            // $scope.openWorkbenchRedirectmodal = function(){ // can be used when there is need for confirmation modal pop-up for redirection from builder to workbench
            //     $('#switchToWorkbench').modal('show');
            // };

            $scope.getLicenseInfo = function() {
                if($scope.selectedStream) {
                   if($scope.selectedStream.license) {
                       $scope.license = $scope.selectedStream.license;
                       if($scope.license && $scope.license.planId === 'small') {
                        $scope.notificationEnabled = true;
                       }
                   }
                }
            };

            $rootScope.planUsageUpgradeModal = function() {
                $scope.getLicenseInfo();
                $scope.openCustomModal("upDownRequired");
            };
            
            $scope.upgradePlan = function() {
                if($scope.selectedAccount.accountType === 1) {
                    $scope.closeCustomModal("upDownRequired");
                    $scope.openPlanUsage('plan');
                }
            };

           $scope.closeNotification = function() {
            $scope.notificationEnabled = false;
           };


           // Publish status modal start
           $scope.checkPublishModal = function() {
                if($scope.planSelectionCb && $scope.planSelectionCb.publishSubmitToAdmin) {
                    return "ADMIN";
                } else if($scope.planSelectionCb && $scope.planSelectionCb.publishFreeBot) {
                    return "FREE";
                } else if($scope.planSelectionCb && $scope.planSelectionCb.publishPaidBot) {
                    return "PAID";
                } else if($scope.license && $scope.license.planName && $scope.license.billingType === "paid") {
                    return "SUBSEQUENT";
                } 
                else if($scope.selectedAccount.adminPreferences && $scope.selectedAccount.adminPreferences.autoApproval === false) {
                    return "MANUAL";
                } else {
                    return 'DEFAULT';
                }
            };

            $scope.closeModal = function () {
                $('#publishStatusModal').modal('hide');
                $timeout(function () {
                    $('body').removeClass('modal-open');
                });
                $rootScope.$broadcast('getProgressDockStatus'); 
            };

            $scope.messages = [];
            var taskMap = {};
            $scope.streamPublishInfo = {
                published: false,
                visibility: $scope.stream.visibility,
                enterprise: ($scope.stream.visibility.namespace == "enterprise" || $scope.stream.visibility.namespace == "enterpriseNpublic")
            };
            $scope.streamPublishInfo.published = $rootScope.hasPublishedAlerts || $rootScope.hasPublishedActions || $rootScope.hasPublishedFlowtasks;
            $scope.dataIsInProgress =false;
            var checkTimeoutModalTimer =null;

            var botPublishStatus = $rootScope.$on("publishBotStatus", function ($event, data) {
                if(data && data.status) {
                    $scope.checkTimeoutModal(data);
                }
            });
            $scope.checkTimeoutModal = function(data) {
                if(data && (data.status === 'IN_PROGRESS') && !$scope.dataIsInProgress) {
                    $scope.dataIsInProgress =true;
                    checkTimeoutModalTimer=setTimeout(function(){
                        $scope.openCustomModal("publishRequestTimeout");
                    },20000); // check after 20 secs (20000)
                } else if(data && (data.status === 'FAILURE' || data.status === 'SUCCESS')) {
                    $scope.dataIsInProgress =false;
                    clearTimeout(checkTimeoutModalTimer);
                    $scope.closeCustomModal("publishRequestTimeout");
                }
            };

           $scope.openPublishStatusModal = function(data) {
            if($scope.stream.type !== "default" || $scope.selectedAccount.accountType !== 1){
                $scope.license = null;
            }
            $scope.messages =[];
            function processTasks() {
                var messages = [];
                if(data.store && data.store && data.store.length){
                    data.store.map(function (message) {
                    var _msg = taskMap[message.resourceId];
                    if (_msg === undefined) {
                        if (message.result && message.result.name) {
                            _msg = message.result.name || message.result.resourceId;
                         }else if(message.resourceType === 'smalltalk'){
                            _msg = 'Small Talk';
                         }
                    }
                    if (message.status === 'SUCCESS') {
                        messages.push({
                            type: 'success',
                            state: "published" || message.result.state,
                            message: $scope.streamPublishInfo.enterprise ? _msg : _msg 
                        });
                    } else {
                        messages.push({
                            type: 'error',
                            error: getErrorMsg(message.result),
                            message: _msg,
                            context: getResource(data.store, message.resourceId),
                            taskId: message.resourceId
                        });
                    }
                });    
                }
                
                $scope.messages = messages;
                if ($scope.appControls.isBillingEnabled && $scope.stream.type !=='sample' && $scope.stream.type !=='solution' && $scope.stream.visibility.namespace === 'private' && $scope.appControls && $scope.selectedAccount.adminPreferences && $scope.selectedAccount.adminPreferences.autoApproval && $scope.selectedAccount.accountType && $scope.selectedAccount.accountType===1) {                                    
                    $scope.publishInTrailMsg = true;                        
                } else {
                    $scope.publishInTrailMsg = false;
                }                    
            }
            processTasks();
            $("#publishStatusModal").modal("show");
           };

           $rootScope.publishStatusModal = $scope.openPublishStatusModal;

           function getResource(publishInfo, id) {
            var payload = {};
            var resource = publishInfo.filter(function (resource) {
                return resource.resourceId === id;
            });
            if ($scope.stream.publishType == "smartbot") {
                payload = {
                    botDesc: publishInfo.botDesc,
                    configInst: publishInfo.configInst,
                    configInstURL: publishInfo.configInstURL
                };
            }
            payload = resource;
            return payload;

        }

        $scope.$on('$destroy', function () {
            $scope.showNavPopover.hovered =  null;
            $scope.clearPopOversforNav();
            if(btstreamUpdatelistener){
              btstreamUpdatelistener();  
            }
            if(selectBotDestroy){
                selectBotDestroy();
            }
            if(insertOrUpdateTaskDestroy){
                insertOrUpdateTaskDestroy();
            }
            if(loggerInstance){
                loggerInstance();
            }
            if(updateBotDataEvent){
                updateBotDataEvent();
            }
            if(containmentMetricsIframeEvent){
                containmentMetricsIframeEvent();
            }
            if(performanceMetricsIframeEvent){
                performanceMetricsIframeEvent();
            }
            if(updateInterruptsStepevent){
                updateInterruptsStepevent();
            }
            if(upadteTaskDataEvent){
                upadteTaskDataEvent();
            }
            if(reloadAppsEvent){
                reloadAppsEvent();
            }
            if(onTaskEditEvent){
                onTaskEditEvent();
            }
            if(botPublishStatus){
                botPublishStatus();
            }
            if(switchDialogTaskEditEvent){
                switchDialogTaskEditEvent();
            }
            if(appCreatedEvent){
                appCreatedEvent();
            }
            if(appUpdatedEvent){
                appUpdatedEvent();
            }
            if(validateScriptEvent) {
                validateScriptEvent();
            }
            if(lockTaskEvent){
                lockTaskEvent();
            }
            if(triggerHelpLinkUpdateEvent){
                triggerHelpLinkUpdateEvent();
            }
            if(streamUpdateEvent){
                streamUpdateEvent();
            }
            if(restrictSideHoverEvent){
                restrictSideHoverEvent();
            }
            if(uiformIframeEvent){
                uiformIframeEvent();
            }
            if(linkedBotTrainingFinished){
                linkedBotTrainingFinished();
            }
            if(iframeLoadedREvent){
                iframeLoadedREvent();
            }
        });
        $scope.exportFile = function(scene){
            var payload = {
                lang: "en" //for now
            };
            BTStreamsService.exportScene($workflowService.selectedStream()._id,scene._id, payload).then(function (res) {
                NotificationService.notify( i18n.i18nString('scene_export_inprogress'), 'success');
                $rootScope.$broadcast('getProgressDockStatus');
            }, function (err) {
                           NotificationService.notify(err.data.errors[0].msg, "error");
                       });
            
        
        };
           $scope.openCustomModal = function(targetId) {
                if(targetId) {
                    $("#" + targetId).modal("show");
                }
            };
            $scope.closeCustomModal = function(targetId) {
                if(targetId) {
                    $("#" + targetId).modal("hide");
                }
            };

           // Publish status modal end
 
            setTimeout(function(){
                $rootScope.$broadcast('getProgressDockStatus');
                $scope.firstTimeLoad = false;
            },1000);
        }]);

        _botsForm.filter('extensionFilter', function(){
            return function(input) {
                if(input) {
                    if(input.indexOf('https://') === 0) {
                        return 'web';
                    }
                    else if (input.slice(input.length - 4) === '.csv') {
                        return 'csv';
                    }
                    else if (input.slice(input.length - 4) === '.pdf') {
                        return 'pdf';
                    }
                    else if (input.slice(input.length - 4) === '.zip') {
                        return 'zip';
                    }
                    else {
                        return 'NA';
                    }
                }
            };
        });

        _botsForm.filter('shortenFileFilter', function(){
            return function(input) {
                if(input) {
                    return input.slice(0, 14) + '...';
                }
            };
        });

        _botsForm.filter('fileNameFilter', function(){
            return function(input) {
                if(input) {
                    return input.slice(0, input.lastIndexOf('.'));
                }
            };
        });

          _botsForm.filter('formatNameFilter', function(){
            return function(input) {
              return input.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            };
          });
          _botsForm.filter('dialogFilter', function(){
            return function(dialogs,scope) {
               if(scope.rightPanel &&  scope.rightPanel.innerRightPanel && (scope.rightPanel.innerRightPanel.view === 'storyboard')){
                 return  _.filter(dialogs,function(dialog){
                    return ((dialog.name.toLowerCase().includes(scope.searchObj.searchDialogQuery.toLowerCase())) || !scope.searchObj.searchDialogQuery) && (dialog.sceneRefId);
                   });
               } else {
                   if(scope.searchObj && scope.searchObj.searchDialogQuery){
                    return _.filter(dialogs,function(dialog){
                        return dialog.name.toLowerCase().includes(scope.searchObj.searchDialogQuery.toLowerCase());
                    });
                   } else {
                    return dialogs;
                   }
               }
            };
          });
          _botsForm.filter('tooltipFilter', function(i18n){
            var annotateMessage = '<div><p style="margin-top:10px;">'+ 'You can either annotate the file or review supported formats. </p>' +'<div><a href="https://developer.kore.ai/docs/bots/bot-builder-tool/knowledge-task/knowledge-extraction-service/#annotate&extract" class="know-more" target="_blank">How to Annotate</a> or <a class="sample-download">Download samples</a></div></div>'; 
            var appendMessage =  '.<p style="margin-top:10px;">'+i18n.i18nString('bots_form_tooltip') +'<a class="sample-download">Download samples</a></p>';
            return function(input, scope, extType) {
                if(scope && scope.kgListVal && scope.kgListVal.status == 'failed') {
                    if(input && extType === 'pdf') {
                        return input + annotateMessage + "<p class='marginTop5 noMarginBottom'><a href='https://developer.kore.ai/docs/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/knowledge-extraction-service/#formats' class='know-more' target='_blank'>Know More</a></p>";   
                    } else if(input) {
                        return input + appendMessage + "<p class='marginTop5 noMarginBottom'><a href='https://developer.kore.ai/docs/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/knowledge-extraction-service/#formats' class='know-more' target='_blank'>Know More</a></p>";   
                    }
                } else { return ''; }
            };
          });

          _botsForm.filter('customSplit',function(){
            return function(input){
                return input.split(',');
            };
          });
})(angular);
