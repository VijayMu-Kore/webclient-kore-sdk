(function(ng){

    var _nobotsForm = ng.module("bt-forms");

    _nobotsForm.directive("nobotsForm", function(){
        return {
            restrict: "EA",
            templateUrl: window.appConfig.TMPLT_PRE_PATH + "js/lazycomponents/nobots-form/nobots-form.html",
            controller: "nobotsFormCtrl"
        };
    });

    _nobotsForm.controller("nobotsFormCtrl", ["$scope", "$location", "$workflowService", "$timeout", "$rootScope", "$modal", "NotificationService", "builderUtility","$applicationService","env_conf",'i18n','mixPanel', 'patternFactory',"form_util","BTFileUploadService","BTStreamsService","$routeParams","BTSeedDataService","security", "$translator",
    function ($scope, $location, $workflowService, $timeout, $rootScope, $modal, NotificationService, builderUtility,$applicationService,env_conf,i18n,mixPanel,patternFactory,form_util,BTFileUploadService,BTStreamsService,$routeParams,BTSeedDataService,security,$translator) {
		$scope._constants_ = $rootScope._constants_;
		$scope.seedData = $workflowService.seedData();
		$scope.supportedLanguages = $scope.seedData.supportedLanguages || [{"name":"English"},{"name":"German"},{"name":"Spanish"}];
		$scope.importBot    = i18n.i18nString('import_bot');
		$scope.createNewBot = i18n.i18nString('standard_name');
		$scope.charRemaining = i18n.i18nString('char_remaining');
		$scope.savingBot     = i18n.i18nString('savingBot');
		$scope.saveBot      = i18n.i18nString('saveBot');
		$scope.showBotCreate = false;
		$scope.showBotNameHint = false;
		$scope.selectedlanguage = {
			dvalue: "en",
			name: "English",
			value: "en",
		};
		$scope.creatingBot =  false;
		$scope.commandCtx = {};
		$scope.launchBotStore = function(){
			$scope.callbacks.loadStore();
		};
		$scope.showBotCreationForm = function(show) {
			var eventInfoBots = {
				"Category":"Activation",
				"Sub Category":"Activation - VA",
				"Level":'ONBOARDING AND ACTIVATION',
			};
			mixPanel.postEvent('VA - Start from scratch',eventInfoBots);
			$scope.showBotCreate = show;
		};
		var enterpriseLicenseType = $rootScope.licenseType;
		function initializeNewStreamData() {
			$scope.isWorkProgress = false;
			$scope.streamObject = {
				name:"",
				profileRequired: 'true',
				purpose: enterpriseLicenseType ? 'customer' : 'customer',
				sbannerchoice: 'color',
				bbannerchoice: 'color',
				color: "#009dab"
			};
		}
		BTSeedDataService.getSeedCategories().then(function(res){
			$scope.categories=res.data.categories;
			$scope.streamObject.categoryIds = $scope.categories[$scope.categories.length-1]._id;
			$scope.streamObject.type = 'default';
		});
		$scope.creating_bot = i18n.i18nString('creating');
		$scope.create_bot = i18n.i18nString('create_bot_label');
        $scope.fullModalCallback = {};
        var selectedAccount = $workflowService.selectedAccount();
		var applicationControl = $applicationService.userInfo().appControls;
		$scope.currentUserInfo = $applicationService.userInfo().koreUserInfo;
        var result = _.find(applicationControl.associatedAccounts,{accountId:selectedAccount.accountId});
        $scope.canCreateBot = result.canCreateBot;
		$scope.imgTop = env_conf['context-url']+'/assets/noBots/imgTop.png';
		$scope.imgLeft = env_conf['context-url']+'/assets/noBots/imgLeft.png';
		$scope.imgRight = env_conf['context-url']+'/assets/noBots/imgRight.png';
		$scope.caretDownWhit = env_conf['context-url']+'/assets/icons/caretDownWhit.svg';
		$scope.caretDown = env_conf['context-url']+'/assets/icons/caretDown.svg';
		$scope.helpIcon = env_conf['context-url']+'/assets/icons/helpIcon.svg';
		$scope.noBotsPlaceholder = env_conf['context-url']+'/assets/images/noBotsPlaceholder.svg';
		$scope.community = env_conf['context-url']+'/assets/login/community.svg';
		$scope.documents = env_conf['context-url']+'/assets/login/documents.svg';
		$scope.organization = env_conf['context-url']+'/assets/login/organization.svg';
		$scope.nobotsPrimary = env_conf['context-url']+'/assets/noBots/nobotsPrimary.png';
		$scope.nobotsSecendary = env_conf['context-url']+'/assets/noBots/nobotsSecendary.png';
		$scope.iframeLoadingStore = true;
		$timeout(function (){
			$('[data-toggle="popover"]').popover(); 
		},100);
		$scope.dropdownClick = function() {
			setTimeout(function(){
				$('.languageDropDown').scrollTop(2);
			},100);
		};
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
                    "icon":env_conf['context-url']+'/assets/home/icon-home.svg',
                    "show":true
                },
                {
                    "id": "importbot",
                    "name": i18n.i18nString('import_name'),
                    "description": i18n.i18nString('import_desc'),
                    "path": "",
                    "icon": env_conf['context-url']+'/assets/home/icon-import.svg',
                    "type": "default",
                    "show": true
                },
                {
                    "id": "browsesmartbot",
                    "name":  i18n.i18nString('smart_name'),
                    "description":i18n.i18nString('smart_desc'),
                    "path": '',
                    "icon": env_conf['context-url']+'/assets/home/icon-document.svg',
                    "type": "browsesmartbot",
                    "show": !selectedAccount.accountType
                },
                {
                    "id": "newbot",
                    "name":i18n.i18nString('new_bot_name'),
                    "description":i18n.i18nString('new_bot_desc'),
                    "path": "",
                    "icon":env_conf['context-url']+'/assets/home/icons-robot.svg',
                    "type": "",
                    "show": true
                }
    
            ];

		$scope.isWorkProgress = false;
		$scope.footerInfoTitle = i18n.i18nString('what_option_should_i_choose');
		$scope.footerHeaderId = "bt-mode-selectorr";
		$scope.footerPanelId = "bt-mode-selector-panel";
		$rootScope.$on("showOrHideStatusLoader", function (evt, newValue) {
			$scope.isWorkProgress = newValue;
		});



		var selectedModeObject = [];

		$scope.getPath = function (selectedMode) {

			selectedModeObject = _.filter($scope.contentTypes, function (contentType) {
				return contentType.id === selectedMode;
			});

			$scope.initiateWorkflowCreation(selectedModeObject[0].type);

			return selectedModeObject[0].path;
		};

		 $scope.loadStore = function(){
                $scope.loadingStore = true;
                $scope.$emit('updateStoreIframeSrc');
                $timeout(function(){
                    $scope.iframeLoadingStore = false;
                },500);
            };
		$scope.sucessTickGreen = env_conf['context-url']+'/assets/icons/sucessTickGreen.svg';
		$scope.modeObject = {};
		$scope.modeObject.selectedMode = "";
		$scope.createAccount=function(){
			showNoSelfAccount();
		};
		var _noSelfAccountDialog;
		function showNoSelfAccount() {
			var _userInfo = $applicationService.userInfo();
			$scope.accounts=_userInfo.appControls.associatedAccounts;
			_noSelfAccountDialog = window.bootbox.dialog({
				message: '<div class="accountname-capture"><div class="col-xs-12"><label class="required-field pull-left"> '+i18n.i18nString('accountname_capture')+' </label></div><div class="col-xs-12"><input placeholder='+i18n.i18nString('accountname_placeholder')+' class="form-control  account-name"></div><div class="col-xs-12"><p class="description">'+i18n.i18nString('account_desc')+'</p></div></div>',
				title: i18n.i18nString('account_title'),
				className: "accounts-warn-modal",
				buttons: {
					main: {
						label: i18n.i18nString('account_create'),
						className: "create-account",
						callback: function () {
							createAccount();
							return false;
						}
					},
					success: {
						label: i18n.i18nString('account_cancel'),
						className: "closeCancel",
						callback: function () {
							if (!$scope.accounts.length) {
								security.logout();
							}
						}
					}
				}
			});
		}
		function getAppControls() {
		    var _userInfo = $applicationService.userInfo();
			var url = 'mp.user.appControlList';
			var params = {
				userId: _userInfo.userId
			};
			return $translator.translate(url, params);
		}
		function createAccount() {
			var _userInfo = $applicationService.userInfo();
			var _accountName = $('.accountname-capture input').val();
			if (_accountName) {
				$('.accounts-warn-modal .create-account').html("Creating....");
				$translator.translate('bt.account.activate', {accountId: _userInfo.appControls.accountId}, {accountName: _accountName})
						.then(function (res) {
							getAppControls().then(function (res) {
								var _appControlsData = res.data;
								var _selfAccount = _.find(_appControlsData.associatedAccounts, function (account) {
									return (account.self);
								});
								if (_selfAccount) {
									selfAccountCreated(_selfAccount);
									$rootScope.$emit('onAccountsUpdate',_selfAccount);
								}
							});
						});
			} else {
				NotificationService.notify( i18n.i18nString('notify_account'), "warning");
			}

		}
		    var tempSelfAccount;
			$('body').on('click', '.goto-self-account', function () {
                if(tempSelfAccount){
                    localstore.setSelectedAccount(tempSelfAccount);                    
                    // NotificationService.notify("Account created successfully.Switching to account created..", "success");

                    $timeout(function () {
                        window.location.reload();
                    }, 2000);

                }
            });
            function selfAccountCreated(selfAccount){
                tempSelfAccount=selfAccount;
                if (_noSelfAccountDialog) {
                    _noSelfAccountDialog.modal('hide');

                }
                /*jshint multistr: true */
                window.bootbox.dialog({
                    message: '<div class="accountname-capture sucessDiv">\n\
                                <img src="'+$scope.sucessTickGreen+'">\n\
                                <div class="col-xs-12">\n\
                                    <h5>'+i18n.i18nString('account_success')+'</h5>\n\
                                </div>\n\
                                <div class="col-xs-12">\n\
                                     <a class="goto-self-account">'+i18n.i18nString('ddval_goto')+' '+((selfAccount && selfAccount.displayName)?selfAccount.displayName:'')+'<a/>\n\
                                </div>\n\
                            </div>',
                    title: i18n.i18nString('success'),
                    className: "accounts-warn-modal",
                    buttons: {
                        main: {
                            label: i18n.i18nString('ok'),
                            className: "btn create-account",
                            callback: function () {
                                $scope.canCreateAccount=false;
                                $scope.accounts.push(selfAccount);
                            }
                        }
                    }
                });

            }
		$scope.selectMode = function (selectedMode, contentType) {
			if (selectedMode === 'universalbot') {
				var allStreams = $workflowService.streamsAll();
				if (allStreams.length && allStreams.length > 1) {
					var employeeBots = _.filter(allStreams, { 'purpose': 'employee' });
					var customerBots = _.filter(allStreams, { 'purpose': 'customer' });
					if (employeeBots.length < 2 && customerBots.length < 2) {
						NotificationService.notify(i18n.i18nString('standard_notify'), "warning");
						return;
					}
				} else {
					NotificationService.notify(i18n.i18nString('please_create_atleast_two_stndrd_bot'), "warning");
					return;
				}
			}

			if (selectedMode === 'browsebotsamples') {
				var eventInfoBots = {
                    "Category":"Activation",
                    "Sub Category":"Activation - VA",
                    "Level":'ONBOARDING AND ACTIVATION',
                };
                   mixPanel.postEvent('VA - Enter Explore Store',eventInfoBots);
				$scope.loadStore();
			} else if(selectedMode === 'browsesmartbot'){
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
		$rootScope.$on('createNewBot',function(e){
			$scope.modeObject.selectedMode = "";
			$scope.onModeSelected();
		});
		$scope.validateBotName = (function () {
			return {
				test: function (value) {
					var regexpObject = patternFactory.getRegularExpression("stream", $scope.getSelectedBotLanguage());
					var regexp = regexpObject.regexp;
					var regexp2 = regexpObject.regexp2;
					if (value && value.length === 1) {
						return regexp2.test(value);
					} else {
						return regexp.test(value);
					}
				}
			};
		})();
		$scope.hideNote = function () {
			setTimeout(function () {
				$scope.showBotNameHint = false;
			},20);
		};
		$scope.getSelectedBotLanguage = function(){
			var language = ($scope.selectedlanguage && $scope.selectedlanguage.value) || "";
			return language;
		};
		initializeNewStreamData();
		$scope.streamObject.purposeisRequired = true || enterpriseLicenseType;
		$scope.languageSelection =  function(language){
        $scope.selectedlanguage =  language;
		};
		$scope.createStream = function(isValid,form,event) {
			$scope.creatingBot =  true;
			
			var errors;
			$scope.botType = 'default';

			if(event && event.preventDefault){
				event.preventDefault();
			}

			if (!isValid) {
				form_util.touch(form);
				return;
			}
		   
			if (!$scope.streamObject.icon) {
				$scope.iconRequiredError = true;
				return;
			}
			
			$scope.isWorkProgress = true;
			var btPostData = {};
			var botName = $scope.streamObject.name;
			if($scope.streamObject.name){
				botName = $scope.streamObject.name.trim().replace(/\s\s+/g, ' ');
			}
			btPostData.name = botName;
			btPostData.type = 'default';
			btPostData.description = $scope.streamObject.name;//$scope.streamObject.description;
			btPostData.color = $scope.streamObject.color;
			if($scope.botType !== 'universalbot'){
			 btPostData.categoryIds = [$scope.streamObject.categoryIds];
			}
			btPostData.websiteUrl = $scope.streamObject.websiteUrl;
			btPostData.demoYoutubeLink = $scope.streamObject.demoYoutubeLink;
			btPostData.botDocLink = $scope.streamObject.botDocLink;
			btPostData.hasTenant = $scope.streamObject.hasTenant;
			btPostData.offKoraConfirmation = $scope.streamObject.offKoraConfirmation;
			btPostData.synonyms = $scope.streamObject.synonyms;
			btPostData.skipMakeEditLinks=$scope.streamObject.skipMakeEditLinks || false;
			
			_.addProps($scope.streamObject.purposeisRequired,btPostData,{purpose:$scope.streamObject.purpose});

			if (btPostData.hasTenant) {
				btPostData.tenancy = {};
				btPostData.tenancy.helpHint = $scope.streamObject.helpHint;
				btPostData.baseUrl = $scope.streamObject.defaultUrl;
			}
			errors = angular.copy($scope.streamObject.errorCodes);

			if(errors && errors instanceof Array){

				errors = errors.map(function(obj){
					delete obj.insert;
					
					return obj;
				});

			}

			errors = _.union(errors,$scope.streamObject.pollError);
			errors = _.uniq(errors,function(error){
				return +error.statusCode;
			});

			btPostData.errorCodes={
				pollError:errors
			};

			btPostData.visibility = {namespace: [], namespaceIds: []};

			if ($scope.streamObject.sharing && $scope.streamObject.sharing.enterprise) {
				btPostData.visibility.namespace.push('enterprise');
				// $scope.streamObject.sharingType=btPostData.visibility.namespace.join(',');
			}

			if ($scope.streamObject.sharing && $scope.streamObject.sharing.team) {
				btPostData.visibility.namespace.push('team');
				// $scope.streamObject.sharingType=btPostData.visibility.namespace.join(',');

				btPostData.visibility.namespaceIds=[];
				if($scope.myTeams){
					$scope.myTeams.forEach(function(team){
						if(team.selected){
							btPostData.visibility.namespaceIds.push(team.id);
						}
					});
				}
			}
			//  else {
			//     // $scope.streamObject.sharingType = btPostData.visibility.namespace.join(',');
			// }
			createBTStream(btPostData);
		};
		function createBTStream(streamData) {
			$scope.duplicateStreamName = false;

			streamData.type = $scope.botType;

			//$scope.sdkCallback.createAppCredentials(true);

			if($scope.streamId && $scope.displayMode==='edit'){
				$scope.saveInProgress=true;
				BTStreamsService.editStream($scope.streamId, streamData)
					.then(function(response) { // success
						var mpPostData = {};
						$scope.newStreamData = response.data;
						mpPostData._id = response.data._id;
						mpPostData.name = $scope.streamObject.name;
						mpPostData.class = $scope.streamObject.class;
						mpPostData.description = $scope.streamObject.name;//$scope.streamObject.description;
						mpPostData.tagline = $scope.streamObject.tagline;
						if($scope.botType !== 'universalbot'){
							mpPostData.categoryIds = [$scope.streamObject.categoryIds];
						}
						mpPostData.icon = $scope.streamObject.icon.fileId;
						mpPostData.websiteURL = $scope.streamObject.websiteUrl;
						mpPostData.demoYoutubeLink = $scope.streamObject.demoYoutubeLink;
						mpPostData.botDocLink = $scope.streamObject.botDocLink;
						mpPostData.keywords = ($scope.streamObject.keywords) ? $scope.streamObject.keywords.split(",") : [];
						mpPostData.languages = [];
						mpPostData.price = 1;
						mpPostData.screenShots = [];
						mpPostData.namespace = 'private';
						mpPostData.namespaceIds = [];
						mpPostData.userTaskListMsg = $scope.streamObject.userTaskListMsg;
						mpPostData.teamTaskListMsg = $scope.streamObject.teamTaskListMsg;
						mpPostData.bBanner = $scope.streamObject.bBanner ? $scope.streamObject.bBanner.fileId : '';
						mpPostData.sBanner = $scope.streamObject.sBanner ? $scope.streamObject.sBanner.fileId : '';
						if ($scope.streamObject.bbannerchoice === 'color') {
							mpPostData.bBannerColor = $scope.streamObject.color; //$scope.streamObject.bBannerColor =
						} else {
							if ($scope.streamObject.bBanner) {
								if ($scope.streamObject.bBanner.fileId) {
									mpPostData.bBanner = $scope.streamObject.bBanner.fileId;
								}
							}
						}
						
						if ($scope.streamObject.sbannerchoice === 'color') {
							mpPostData.sBannerColor = $scope.streamObject.color;//$scope.streamObject.sBannerColor = 

						} else {
							if ($scope.streamObject.sBanner) {
								if ($scope.streamObject.sBanner.fileId) {
									mpPostData.sBanner = $scope.streamObject.sBanner.fileId;
								}
							}
						}
						 
						mpPostData.color = $scope.streamObject.color;                             
						_.addProps($scope.streamObject.purposeisRequired,mpPostData,{purpose:$scope.streamObject.purpose});
						mpPostData.profileRequired = $scope.streamObject.profileRequired === 'true';
						mpPostData.sendVcf = $scope.streamObject.sendVcf === 'true' && mpPostData.profileRequired;
						mpPostData.isNLEnabled = $scope.streamObject.isNLEnabled == 'yes';
						$workflowService.selectedStream(response.data);
						$workflowService.currentLanguage(response.data.defaultLanguage);
						BTStreamsService.getStreams()
								.then(function(res) {
									$workflowService.streamsAll(res.data);
						});
						createMPStream(mpPostData);
					}, function(res) { // error
						$scope.creatingBot =  false;
						$scope.saveInProgress=false;
						 $scope.isWorkProgress  = false;
						if (res.data.errors[0].code === 409 && res.data.errors[0].msg === 'Stream with same name already exists') {
							$scope.duplicateStreamName = true;
							return;
						}
						NotificationService.notify(res.data.errors[0].msg, 'error');
				});

			}else{
				$scope.saveInProgress=true;
				if($scope.selectedlanguage && $scope.selectedlanguage.value){
					streamData.defaultLanguage = $scope.selectedlanguage.value;    
				}
				if ($scope.streamObject.icon.fileId) {
					streamData.icon = $scope.streamObject.icon.fileId;
				}     
				streamData.isFromBT = true;                  
				BTStreamsService.createBTStream($applicationService.userInfo().userId, streamData)
					.then(function(response) { // success
						var mpPostData = {};
						$scope.newStreamData = response.data;
						mpPostData._id = response.data._id;
						mpPostData.name = $scope.streamObject.name.trim().replace(/\s\s+/g, ' ');
						mpPostData.description = $scope.streamObject.name;//$scope.streamObject.description;
						mpPostData.class = $scope.streamObject.class;
						if($scope.botType !== 'universalbot'){
							mpPostData.categoryIds = [$scope.streamObject.categoryIds];
						}
						mpPostData.icon = $scope.streamObject.icon.fileId;
						mpPostData.keywords = ($scope.streamObject.keywords) ? $scope.streamObject.keywords.split(",") : [];
						mpPostData.languages = [];
						mpPostData.price = 1;
						mpPostData.screenShots = [];
						mpPostData.namespace = 'private';
						mpPostData.namespaceIds = [];
						mpPostData.userTaskListMsg = $scope.streamObject.userTaskListMsg;
						mpPostData.teamTaskListMsg = $scope.streamObject.teamTaskListMsg;
						mpPostData.color = $scope.streamObject.color;
						mpPostData.tagline = $scope.streamObject.tagline;
						mpPostData.bBanner = $scope.streamObject.bBanner ? $scope.streamObject.bBanner.fileId : '';
						mpPostData.sBanner = $scope.streamObject.sBanner ? $scope.streamObject.sBanner.fileId : '';
						mpPostData.bBannerColor = $scope.streamObject.bBannerColor=$scope.streamObject.color;
						mpPostData.sBannerColor = $scope.streamObject.sBannerColor=$scope.streamObject.color;
															  
						if ($scope.streamObject.bbannerchoice === 'color') {
							mpPostData.bBannerColor = $scope.streamObject.color;//$scope.streamObject.bBannerColor = 
						} else {
							if ($scope.streamObject.bBanner) {
								if ($scope.streamObject.bBanner.fileId) {
									mpPostData.bBanner = $scope.streamObject.bBanner.fileId;
								}
							}
						}
						
						if ($scope.streamObject.sbannerchoice === 'color') {
							mpPostData.sBannerColor = $scope.streamObject.color;//$scope.streamObject.sBannerColor = 

						} else {
							if ($scope.streamObject.sBanner) {
								if ($scope.streamObject.sBanner.fileId) {
									mpPostData.sBanner = $scope.streamObject.sBanner.fileId;
								}
							}
						}
						
						mpPostData.websiteURL = $scope.streamObject.websiteUrl;
						mpPostData.demoYoutubeLink = $scope.streamObject.demoYoutubeLink;
						mpPostData.botDocLink = $scope.streamObject.botDocLink;
						mpPostData.profileRequired = $scope.streamObject.profileRequired === 'true';
						mpPostData.sendVcf = $scope.streamObject.sendVcf === 'true' && mpPostData.profileRequired;
						$workflowService.selectedStream(response.data);
						$workflowService.currentLanguage(response.data.defaultLanguage);
						BTStreamsService.getStreams()
								.then(function(res) {
									$workflowService.streamsAll(res.data);
						});
						createMPStream(mpPostData);
						var eventInfoBotsCreate = {
							"Category":"Activation",
							"Sub Category":"Activation - VA",
							"Level":'ONBOARDING AND ACTIVATION',
							"VA - Inititiation Mode":"Scratch"
						};
						 mixPanel.postEvent('VA - New Bot Initiated',eventInfoBotsCreate);
					}, function(res) { // error
						$scope.creatingBot =  false;
						$scope.saveInProgress=false;
						$scope.isWorkProgress  = false;

						if (res.data.errors[0].code === 409 && res.data.errors[0].msg === 'Stream with same name already exists') {
							$scope.duplicateStreamName = true;
							return;
						}
						NotificationService.notify(res.data.errors[0].msg, 'error');
				});
			}
		}
		function getStreamIconData(){

			var url;

			url =  env_conf['components-source'];


			getFileObject(url+'/assets/botIcons/updatedIcons/icon-1.png', function (fileObject) {
			 console.log(fileObject);
			 $scope.streamObject.iconFile = fileObject;
			 $scope.uploadStreamIcon(false);
		 }); 

				// $http.get(url+'img/newBot.gif')
				// .then(function(res){
				//     $workflowService.templates(res.data);
				// });

	}
	function notifyStreamStatus(streamName,msg){
		NotificationService.notify(streamName+msg+i18n.i18nString('successfully_lowercase') ,"success");
		$workflowService.selectedStream($scope.newStreamData);
		// $scope.$emit("updateStep", 4);
		$scope.initializeCreateBot = false;
		var stream = $workflowService.selectedStream();
		$scope.$emit("loadBots", stream);
		// $rootScope.$emit('selectOrChangeBot',$scope.newStreamData);
	}
	function slashCommand(id){

		var msg = $routeParams.streamId? i18n.i18nString('updated_label') :i18n.i18nString('saved_label_lowercase');

		if($scope.commandCtx.createSlashCommand){
			var command = $scope.streamObject.command || {};

			$scope.commandCtx.streamId = $scope.streamId || id;

			if(Object.keys(command).length===0){
				notifyStreamStatus($scope.streamObject.name,msg);
				return;
			}

			return $scope.commandCtx.createSlashCommand()
			 .then(function(res){
				$scope.streamObject.command._id = res.data._id;
				notifyStreamStatus($scope.streamObject.name,msg);
			 },function(err){
				var errorMsg = err.data.errors[0].msg;
				NotificationService.notify(errorMsg,"error");
			 });

		}else{

			notifyStreamStatus($scope.streamObject.name,msg);

		}

	}
	function createMPStream(streamData) {
		if ($scope.botType === 'universalbot') {
			streamData.type = $scope.botType;
		}
		if($scope.streamId && $scope.displayMode==='edit'){
			BTStreamsService.updateMPStream($scope.streamId,streamData)
				.then(function(response) { // success
					$scope.creatingBot =  false;
					$scope.saveInProgress=false;
					slashCommand($scope.streamId);
					$workflowService.streamType('');
					$scope.streamObject = {};
					form_util.makeItClean($scope.streamForm);
					initializeNewStreamData();
				}, function(res) { // error
					$scope.saveInProgress=false;
					NotificationService.notify(res.data.errors[0].msg, 'error');
			});
		}else{
			BTStreamsService.createMPStream($applicationService.userInfo().userId, streamData)
				.then(function(response) { // success
					$scope.creatingBot =  false;
					$scope.saveInProgress=false;
					$rootScope.$emit("triggerSolutionBotSetup");
					$(".kore-chat-header .close-btn").click();
					slashCommand(streamData._id);
					$workflowService.streamType('');
					$scope.streamObject = {};
					form_util.makeItClean($scope.streamForm);
					initializeNewStreamData();
				}, function(res) { // error
					$scope.saveInProgress=false;
					NotificationService.notify(res.data.errors[0].msg, 'error');
			});
		}

	}
	var getFileBlob = function (url, cb) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.responseType = "blob";
		xhr.addEventListener('load', function() {
			cb(xhr.response);
		});
		xhr.send();
	};

	var blobToFile = function (blob, name) {
		blob.lastModifiedDate = new Date();
		blob.name = name;
		return blob;
	};
	var getFileObject = function(filePathOrUrl, cb) {
		getFileBlob(filePathOrUrl, function (blob) {
		   cb(blobToFile(blob, 'newBot.png'));
	   });
	};
	$scope.linkEvent =  function(type) {
		var event = "";
		var eventInfo = {
			"Level":"Support",
			"Category":"Support",
			"Sub Category":"Academy",
		};
		if(type === 'document'){
			event = "Enter Documentation";
			eventInfo["Sub Category"]= "Documentation";
		} else if(type === 'community') {
			event = "Enter Community";
			eventInfo["Sub Category"]= "Community";
		} else if(type === 'faq'){
			event = "Open FAQs";
			eventInfo["Sub Category"]= "FAQs";
		} else if('koreAcademy'){
			event = "Enter Academy";
			eventInfo["Sub Category"]= "Academy";
		}
		if(event){
			mixPanel.postEvent(event,eventInfo);
		}
	};
	$scope.openLinks = function(type,$event){
		if(type === 'community') {
			$scope.linkEvent('community');
			$rootScope.redirectToLink('https://community.kore.ai/',$event,true);
		} else if(type === 'koreAcademy') {
			$scope.linkEvent('koreAcademy');
			$rootScope.redirectToLink('https://info.kore.ai/online-training-schedule',$event,true);
		} else if(type === 'documents'){
			$scope.linkEvent('document');
			$rootScope.redirectToLink('https://developer.kore.ai/docs/bots/chatbot-overview/koreai-platform/',$event,true);
		}
	};
	getStreamIconData();
			$scope.uploadStreamIcon = function(showNotification) {
				if ($scope.streamObject.iconFile.name) {
					var _ext = $scope.streamObject.iconFile.name.substring($scope.streamObject.iconFile.name.lastIndexOf('.'));
					if (_ext !== '.png') {
						NotificationService.notify(i18n.i18nString('uploadfile_noty_error'), "error");
						$scope.fileExtensionError = true;
						return;
					}
				}

				$scope.fileExtensionError = false;

				var data = new FormData();
				data.append('file', $scope.streamObject.iconFile);
				data.append('fileContext', 'marketplace');
				data.append('fileExtension', 'png');

				$scope.iconUploading = true;

				BTFileUploadService.uploadFile(data)
						.then(function(response) {
							var fileUploaded = {
								fileName: $scope.streamObject.iconFile.name,
								fileId: response.data.fileId
							};

							$scope.streamObject.icon = fileUploaded;
							if(showNotification){
								NotificationService.notify(fileUploaded.fileName + i18n.i18nString('uploaded_label_spaced'), "success");
							}
							
							getBase64($scope.streamObject.iconFile);
							$scope.iconUploading = false;
						}, function(response) {
							if(showNotification){
								NotificationService.notify(i18n.i18nString('oops_label') + response.data.errors[0].msg, "error");
							}
							$scope.iconUploading = false;
						});
			};
        $scope.onModeSelected = function(botType){
           $scope.botType = botType;
            $scope.initializeCreateBot = true;
            $scope.fullModalCallback.openFullPageModal(null,botType,"standard_bot");
        };
		function getBase64(file) {
			var _reader = new FileReader();
			_reader.onloadend = function () {
				$scope.ImgString = _reader.result;
			};
			_reader.readAsDataURL(file);
		}
		$scope.closeModeSelectorModal = function () {
			$scope.modeObject.selectedMode = "";
		};
		 $scope.$on('updateStore',function(e,value){
                if(value.hasOwnProperty('loadStore')){
                    $scope.$apply(function(){
                        $scope.loadingStore = value.loadStore;
                        $scope.iframeLoadingStore = false;
                    });
                    
                    
                }
         });

        $scope.$on('iframeLoadStoreEvent',function(e){
           $scope.$apply(function(){
            $scope.iframeLoadingStore = false;
           });
           
            
        });

       $scope.fullModalCallback.loadStore = $scope.loadStore;



	}]);
           

})(angular);