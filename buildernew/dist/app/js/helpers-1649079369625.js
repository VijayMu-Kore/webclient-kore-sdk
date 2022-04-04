(function (ng) {

    ng.module('app.helpers', [])


            .factory('_constants_', ['$sce', '$rootScope','env_conf','appVersionService','$injector', function ($sce, $rootScope,env_conf,appVersionService,$injector) {
                    var constants = {};
                    constants.load = function(){
                    var i18n=$injector.get("i18n");
                    constants.config={};
                    $rootScope.whatsNew=i18n.i18nString('ml_threshold_whats_new');
                    $rootScope.takeTour=i18n.i18nString('take_tour');
                    $rootScope.skipTour=i18n.i18nString('skip');
                    $rootScope.accountUpgrade=i18n.i18nString('account_upgrade');
                    $rootScope.upgradeLabel=i18n.i18nString('upgrade');
                    $rootScope.sessionExpired=i18n.i18nString('session_expired');
                    $rootScope.invalidAcessError=i18n.i18nString('constants.errorMessages_INVALID_ACCESS_TOKEN');
                    $rootScope.reAuthorize=i18n.i18nString('re_authorize');
                    $rootScope.updateLabel=i18n.i18nString('update');
                    $rootScope.newVersionMsg=i18n.i18nString('new_version');
                    $rootScope.reloadLabel=i18n.i18nString('reload_label');
                    window.appConfig.DISABLE_AGENT_TRANSFER = false;
                    constants.config.UTTERANCES=true;
                    constants.config.KT=true;
                    constants.config.SOLUTION_BOT=true;
                    constants.config.ENABLE_UNIVERSAL_BOT = true;
                    constants.config.supportI18N = true;
                    constants.config.hideMLEE = false;
                    constants.config.showDownloadPopUps = true; // value true enables popups
                    constants.config.showManageComponents = true;
                    constants.config.showScriptNodeError = true;
                    constants.config.ENABLE_BATCHTESTING = true;
                    constants.config.ENABLE_SPEECH_AUTHORIZATION = window.appConfig.SDK_SPEECH_URL ? true:false;
                    constants.config.showAppsAgentsTab = true;
                    constants.config.collabSegregattion = true;
                    constants.config.customLibrary = true;
                    constants.config.googleSpeechAPIKey = 'AIzaSyCagwsHmUxecD-ZR6OJoL_YAvRBFIXFArQ';
                    constants.config.autoEnableSpeechAndTTS = false;
                    constants.config.graphLib = 'd3';
                    constants.config.freeTrailSupportUrl = 'https://info.kore.ai/kore.ai-developer-signup';
                    constants.config.whatfix = {flowsMap: {}};
                    constants.config.whatfix.flowsMap = {
                        "weatherbot": 'a4b4e920-f07c-11e7-8303-04013d24cf02',
                        "createbot":"951797a0-0fc7-11e8-bdae-04013d24cf02",
                        "universalbot":"5f2a7050-0fee-11e8-bdae-04013d24cf02",
                        "kgraph":"965a2d20-0ff0-11e8-bdae-04013d24cf02",
                        "installsamplebot":"135d5cd0-0ff5-11e8-bdae-04013d24cf02",
                        "importbot":"86c0abc0-0ff8-11e8-80d5-04013d24cc02"

                    };
                    constants.replaceSpecialChar =  function changePattern(name) {
                        if (name) {
                            return name.replace(/&gt;/g, '>').replace(/&lt;/g, '<');
                        } else {
                            return name;
                        }
                    };
                    constants.isEmoji = function(str) {
                        var ranges = [
                            '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF
                        ];
                        if (str.match(ranges.join('|'))) {
                            return true;
                        } else {
                            return false;
                        }
                    };
                    constants.config.loadHistory = true;
                    constants.config.ENABLE_IVR = true;
                    $rootScope.viewTaskIcon = window.appConfig.CONTEXT_PATH+'/assets/landingImages/icons/eye.svg';
                    $rootScope.editTaskIcon = window.appConfig.CONTEXT_PATH+'/assets/landingImages/icons/edit.svg';

                    $rootScope.mandatory = window.appConfig.CONTEXT_PATH+'/assets/ontology/rectangle-red.svg';
                    $rootScope.organizer = window.appConfig.CONTEXT_PATH+'/assets/ontology/rectangle-gray.svg';
                    constants.product =  i18n.i18nString('constants_product');
                    if(window.appConfig.PFIZER){
                        constants.product = 'Chatterbox3.0';
                    }
                    constants.mainEntity =  i18n.i18nString('constants.mainEntity');
                    constants.mainEntities = i18n.i18nString('constants.mainEntities') ;
                    constants.label = i18n.i18nString('constants.label') ;
                    constants.reports =  i18n.i18nString('constants.reports');
                    constants.report = i18n.i18nString('constants.report') ;
                    constants.actions =  i18n.i18nString('constants.actions');
                    constants.action = i18n.i18nString('constants.action') ;
                    constants.alert = i18n.i18nString('constants.alert') ;
                    constants.alerts =  i18n.i18nString('constants.alerts');
                    constants.flowTask =  i18n.i18nString('constants.flowTask');
                    constants.flowTasks =  i18n.i18nString('constants.flowTasks');
                    constants.conversationBuilder =  i18n.i18nString('constants.conversationBuilder');
                    constants.knowledge =  i18n.i18nString('constants.knowledge');
                    constants.sdkconf = i18n.i18nString('constants.sdkconf') ;
                    constants.authorization = i18n.i18nString('constants.authorization') ;
                    constants.workflows =  i18n.i18nString('constants.workflows');
                    constants.flows =  i18n.i18nString('constants.flows');
                    constants.flow =  i18n.i18nString('constants.flow');
                    constants.channels =  i18n.i18nString('constants.channels');
                    constants.channel =  i18n.i18nString('constants.channel');
                    constants.zoomScaleInfo =  i18n.i18nString('constants.zoomScaleInfo');
                    constants.zoomScaleTooltip = i18n.i18nString('constants.zoomScaleTooltip') ;
                    constants.hideThresholds = false;
                    constants.preconditionTooltip = i18n.i18nString('constants.preconditionTooltip') ;
                    constants.wordSensitive = ['zh_cn','zh_tw', 'ja', 'ko'];
                    constants.downloadPopUpMsg =  i18n.i18nString('constants.downloadPopUpMsg');
                    constants.updateDownloadPopUppreferance = function(value){
                        constants.config.showDownloadPopUps = !value;
                    };
                    constants.randomColors = [ //100 random colors of choice
                        "#36ba5a",	"#2279c4",	"#fc8500",	"#ff5d5d",	"#533a71",	"#B0171F",	"#C67171",	"#8E8E38",	"#EE0000",	"#8B1A1A",	"#CDCD00",	"#F08080",	"#8B6969",	"#CD9B9B",	"#CD4F39",	"#8B5A00",	"#8B864E",	"#FFFF00",	"#7FFF00",	"#00CED1",	"#BF3EFF",	"#E3CF57",	"#BDB76B",	"#00FF00",	"#FF7256",	"#FFF68F",	"#556B2F",	"#00868B",	"#191970",	"#000000",	"#E2725B",	"#30D5C8",	"#FAD6A5",	"#FDFD96",	"#BFFF00",	"#E1A95F",	"#8B008B",	"#FF7F50",	"#5D8AA8",	"#A4C639",	"#A1CAF1",	"#92A1CF",	"#893F45",	"#5D3954",	"#013220",	"#515151",	"#6183d8",	"#50c5b7",	"#7ac74f",	"#1c77c3",	"#9f86c0",	"#52B9A1",	"#447E71",	"#157D59",	"#19676B",	"#3C4E82",	"#189C19",	"#1089D7",	"#29D867",	"#259F71",	"#581ACD",	"#312A1D",	"#419FB6",	"#305AE7",	"#39BB40",	"#5962FB",	"#2EDDDB",	"#19578A",	"#183F98",	"#4DD95C",	"#1E69A4",	"#0ACC51",	"#337512",	"#317ECB",	"#14A617",	"#33AC75",	"#149B7E",	"#24C281",	"#2995CB",	"#13A954",	"#37688B",	"#29A8BD",	"#3F879C",	"#48EE48",	"#438266",	"#189C39",	"#17842D",	"#4C3595",	"#2AA3E7",	"#429E88",	"#3635FD",	"#066197",	"#25CA68",	"#06C10D",	"#347C37",	"#48C485",	"#373C6C",	"#1B919C",	"#16A9F4",	"#5C8AAE",
                        "#209354",	"#50C6EA",	"#49A5BC",	"#1D456C",	"#4C1ECB",	"#28849C",	"#1E7428",	"#4EE349",	"#027EEF",	"#1E6C4C",	"#314AE8",	"#3A7012",	"#4734D1",	"#4EE441",	"#535C9E",	"#01A9CA",	"#48E69F",	"#311CB4",	"#5BD276",	"#13655C",	"#0B75EF",	"#08E715",	"#4C5DD8",	"#43CFCB",	"#58D75C",	"#18D018",	"#3E3632",	"#5F855D",	"#5CB772",	"#2EC6C8",	"#25DDBC",	"#3E9201",	"#372C3B",	"#1ABEED",	"#1CE6FE",	"#2E9C90",	"#421F49",	"#217334",	"#3E56CC",	"#2171D1",	"#17B6DF",	"#5B9FF1",	"#25A689",	"#18E877",	"#38B5B1",	"#1514C1",	"#285BBD",	"#1C9C8B",	"#33F352",	"#049288",	"#58EAF2",	"#04BC95",	"#133DBE",	"#1B9939",	"#19EC43",	"#2AC359",	"#468B51",	"#1591A1",	"#4E33BD",	"#411932",	"#55C441",	"#14C39E",	"#5132C4",	"#24B93A",	"#28E7E9",	"#40F1EA",	"#3D2AE6",	"#2B5CCC",	"#40166A",	"#107AD4",	"#433834",	"#3C0096",	"#58834F",	"#543AE3",	"#262F97",	"#372209",	"#42A7D7",	"#5A8060",	"#35DC10",	"#3CE010",	"#438BFC",	"#272D7D",	"#2ED847",	"#1B5583",	"#06B638",	"#369ED3",	"#337894",	"#1171E5",	"#5B5E81",	"#4F8955",	"#1DEED7",	"#28126E",	"#4F1B31",	"#2BF4E1",	"#41458B",	"#3CB491",	"#058DAD",	"#4BAC26",	"#3A6B7C",	"#1C4643",
                        "#0517FB",	"#2701AA",	"#0D4859",	"#56A449",	"#4A7AAF",	"#16AD69",	"#356792",	"#23B7F5",	"#3B7C86",	"#5B5105",	"#568168",	"#4DA365",	"#3B4B76",	"#5529AE",	"#355CA1",	"#312AE7",	"#149A9B",	"#1A404E",	"#25829D",	"#4731A2",	"#5C0BEE",	"#43CB9A",	"#384449",	"#3A7713",	"#1FF9F7",	"#2931C3",	"#2F7124",	"#2391E1",	"#27A995",	"#3FB319",	"#02696C",	"#3CA0E5",	"#4DAC2C",	"#3F7E8F",	"#1CCE92",	"#389BC4",	"#0AB3F0",	"#51E837",	"#1CE856",	"#1E39CE",	"#373EB8",	"#2A0D33",	"#3276F5",	"#3D9FEC",	"#0A59CB",	"#01936D",	"#2ABC50",	"#0D2CD9",	"#03B61D",	"#163415",	"#18CA51",	"#1713E9",	"#5C558F",	"#08D86B",	"#354366",	"#473984",	"#0D65B4",	"#274188",	"#402A6D",	"#4CB05B",	"#493DA6",	"#436415",	"#106C75",	"#085C9C",	"#286EC1",	"#2B826B",	"#2416C3",	"#575CB6",	"#268380",	"#527D26",	"#119A13",	"#144273",	"#48E0B7",	"#312372",	"#568481",	"#2E3A8E",	"#4CF89B",	"#3C5213",	"#0A4B68",	"#5275C7",	"#4953E6",	"#1EADC8",	"#1AA8A6",	"#13E7FD",	"#34A76C",	"#38B66D",	"#5CB959",	"#09663B",	"#3EC4C2",	"#0B0FA4",	"#4AE3D3",	"#3B5A11",	"#42D143",	"#2528C4",	"#4393EC",	"#4D54A9",	"#14A399",	"#490D63",	"#05AE4D",	"#3BA377",
                        "#1D82EE",	"#4FE1BA",	"#19F30A",	"#19B1B5",	"#1159D7",	"#357EC5",	"#361BBD",	"#1E2B59",	"#1BF16B",	"#0A4B93",	"#4AC5B3",	"#1C860D",	"#23E9CE",	"#52106B",	"#22F7E4",	"#58BBB8",	"#35695B",	"#28727A",	"#403302",	"#29CBFB",	"#19E8DC",	"#5B5C6B",	"#299D5F",	"#35B7D1",	"#204FD8",	"#4F6267",	"#2AEB41",	"#044585",	"#2DE707",	"#46A802",	"#4C23A3",	"#17C665",	"#13CB08",	"#2A7849",	"#0683F5",	"#287D63",	"#4B5677",	"#2B2B54",	"#42BE3F",	"#5BA83D",	"#4FAE78",	"#12C584",	"#1FC98C",	"#206876",	"#4A5EB6",	"#19697C",	"#36D6C7",	"#07ACAD",	"#2214FB",	"#0BE306",	"#5ED1E9",	"#446E7E",	"#0F42F5",	"#4DB884",	"#3AD185",	"#39945B",	"#0055C9",	"#584132",	"#4A8A1F",	"#4A1F78",	"#4BB3E6",	"#4796CE",	"#14A87B",	"#162000",	"#25D8EA",	"#3C2C6E",	"#4257B1",	"#1BA369",	"#3C6B8E",	"#06F96D",	"#13FBB8",	"#4E3CCB",	"#0DF6E9",	"#5474A4",	"#34742E",	"#2FB971",	"#33F99A",	"#12DB60",	"#2E72D6",	"#2947C9",	"#35CCE3",	"#461BD0",	"#0B5B5F",	"#466DA5",	"#325A03",	"#4FD6BF",	"#4F51B9",	"#4C44E0",	"#5C6AB7",	"#2EAD33",	"#2E439E",	"#46A6E3",	"#191825",	"#13D682",	"#4E5899",	"#2D6EBD",	"#581389",	"#5DD44D",	"#06219D",	"#0898A6",
                        "#140629",	"#2D8D43",	"#1317E1",	"#274B68",	"#4A115D",	"#3B2263",	"#248015",	"#247D41",	"#0CCB9F",	"#326E96",	"#56CDD8",	"#16399C",	"#3EEEC8",	"#5B8C57",	"#3521C3",	"#1B7376",	"#33CA31",	"#56E2E9",	"#44F5C1",	"#1AD324",	"#518A90",	"#03ECD6",	"#1517DE",	"#4CEC8B",	"#490377",	"#4757FC",	"#1D325A",	"#2C3639",	"#20AEC1",	"#52041A",	"#355ECD",	"#312C95",	"#39765B",	"#0688F3",	"#0C3832",	"#46B8D0",	"#3C519C",	"#227538",	"#2F699C",	"#3CD068",	"#487E13",	"#304726",	"#2B6DDA",	"#019D29",	"#092E55",	"#033D76",	"#325BF2",	"#27AE66",	"#46D4AD",	"#41A9BA",	"#4523DB",	"#24B1F2",	"#3BB3D5",	"#35DE4C",	"#196344",	"#07123C",	"#0C8D20",	"#08473A",	"#31276B",	"#4E9455",	"#42EFC1",	"#446629",	"#4BA875",	"#362E2B",	"#101474",	"#413937",	"#1418F3",	"#47CA2E",	"#128967",	"#18D257",	"#25191E",	"#1DB45D",	"#31C62C",	"#11EED4",	"#081EE7",	"#4731CB",	"#58DC2C",	"#514E69",	"#4CA9C2",	"#2ED8A2",	"#2B9693",	"#54DFC8",	"#4E9988",	"#22E025",	"#3A615E",	"#2DC613",	"#343C72",	"#34AD26",	"#4DC2C3",	"#56C2BA",	"#113092",	"#3197A2",	"#0262D2",	"#1E447B",	"#11D374",	"#2880D3",	"#26B337",	"#5DDD7A",	"#5D13F8",	"#2F2383",
                        "#26514D",	"#1A4A8C",	"#4DE9BB",	"#0C7F1E",	"#05DB3E",	"#49DC2B",	"#2EC5D3",	"#24ABA2",	"#54AD57",	"#37BC32",	"#04A344",	"#079277",	"#0E7C2B",	"#1B4AEE",	"#0153E2",	"#13444E",	"#217A30",	"#413F39",	"#4161B5",	"#21679E",	"#5396DD",	"#4F0B4A",	"#10E8B5",	"#212DD8",	"#55A983",	"#1DE260",	"#43FBBB",	"#368D64",	"#1794DD",	"#4BC165",	"#337DB1",	"#12D7B5",	"#107E22",	"#3E3391",	"#30BD5C",	"#5537E2",	"#11ED9F",	"#548948",	"#48E35B",	"#3241B1",	"#04CE34",	"#521535",	"#324D1D",	"#13AF18",	"#392299",	"#36535C",	"#134157",	"#321837",	"#363D64",	"#5BD47A",	"#24A9A3",	"#0C7A85",	"#5A2AC8",	"#47D922",	"#5C13CE",	"#2AF17C",	"#228138",	"#2DA647",	"#13E818",	"#26E714",	"#324367",	"#2762E2",	"#2AC5E8",	"#2BB82C",	"#128DEE",	"#2D1323",	"#1791AC",	"#225DB1",	"#49B6D8",	"#0596A5",	"#53A1AD",	"#2FCD77",	"#5D53FD",	"#3AD2F4",	"#536CA4",	"#2A9CC6",	"#235969",	"#1BFCD8",	"#276147",	"#4496D5",	"#161B44",	"#297EA5",	"#57014C",	"#545461",	"#53EC1A",	"#5FBED4",	"#24896E",	"#07CE75",	"#2AE949",	"#3C7855",	"#119A21",	"#03B311",	"#1B6E5E",	"#46DBE5",	"#45B04D",	"#55BD3C",	"#3DF367",	"#4A7CD0",	"#257EB5",	"#2549C4",
                        "#18A044",	"#2AA867",	"#2D22AA",	"#26BAD5",	"#2DBEF6",	"#39BD5C",	"#1BDBD3",	"#04ACF8",	"#24EDDD",	"#569C74",	"#461B60",	"#3896EF",	"#197131",	"#435D23",	"#1BEB99",	"#240426",	"#2C69AC",	"#282984",	"#02106C",	"#0B2A23",	"#305117",	"#4CDE85",	"#092F34",	"#41DDE8",	"#17B663",	"#3D24EA",	"#411561",	"#42C07F",	"#2C734E",	"#3C2372",	"#2AB5C7",	"#16C1A6",	"#4D9432",	"#412622",	"#5D368E",	"#0B50D6",	"#46AE77",	"#0BC519",	"#3C7539",	"#14E5BD",	"#5FFD1D",	"#3B8347",	"#3133DE",	"#26DF3E",	"#278742",	"#31C124",	"#4CA2CC",	"#2BD73A",	"#27C97C",	"#29B398",	"#24AE35",	"#5471B6",	"#3E95E7",	"#2E6D1D",	"#534B58",	"#2AFDC8",	"#308433",	"#1D94A1",	"#32C48E",	"#212CD1",	"#312463",	"#379941",	"#014676",	"#3554B6",	"#5BECA8",	"#4F1FE1",	"#249606",	"#32E5CE",	"#232324",	"#11BA11",	"#4987A5",	"#3E2D3C",	"#069A2D",	"#26D63A",	"#318EB3",	"#357AA8",	"#1D442C",	"#181364",	"#17C22A",	"#48DB26",	"#45A63A",	"#4E7D93",	"#3715C8",	"#092C9E",	"#372489",	"#4E3469",	"#154472",	"#38D9EE",	"#0B1DB3",	"#4DBB17",	"#138DDD",	"#398A33",	"#4B88B9",	"#3CC59B",	"#143D28",	"#5CAD44",	"#2E225C",	"#4B42D8",	"#2B35CC",	"#17474B",
                        "#07032E",	"#4E606E",	"#2A72E3",	"#5B7726",	"#183C13",	"#224C0E",	"#051AFC",	"#147198",	"#0963D4",	"#2B586D",	"#40427D",	"#27764E",	"#0E69DC",	"#3BA788",	"#1C9C42",	"#1C2A62",	"#49DF53",	"#478D3B",	"#18B69D",	"#02DD6A",	"#226CEB",	"#4E7A67",	"#344125",	"#23742B",	"#5BEDE5",	"#416880",	"#416B88",	"#36EE2A",	"#2B3674",	"#2AB79E",	"#436B56",	"#4A3464",	"#12A9C4",	"#4EAF3C",	"#4C2C2B",	"#2EBD17",	"#147634",	"#0392B7",	"#1CCE2F",	"#3061B4",	"#5B6FB0",	"#13EE3E",	"#435838",	"#535061",	"#3019D4",	"#561AFA",	"#1D1582",	"#02D617",	"#35E6C1",	"#4E9504",	"#2DE199",	"#5AB470",	"#1BC45D",	"#035221",	"#26FD00",	"#2623ED",	"#3995BB",	"#1CBBE5",	"#105147",	"#249A49",	"#428C28",	"#1DFE1B",	"#43C67D",	"#4856E6",	"#09AD60",	"#5313BC",	"#3C7345",	"#2F58C4",	"#042B64",	"#01C16A",	"#0FA4F4",	"#092145",	"#4EDE75",	"#2DA632",	"#57E783",	"#19A9EF",	"#3E495C",	"#1114CF",	"#48899B",	"#2C1DBC",	"#279BBE",	"#036C67",	"#4EDD18",	"#2420C7",	"#579ADD",	"#06ACDD",	"#371753",	"#3F6850",	"#131CC2",	"#1B0A0D",	"#312386",	"#4C923B",	"#5D7DB9",	"#506BC5",	"#4B94C7",	"#4B8A59",	"#488351",	"#1B58B9",	"#1E6B6D",	"#11A843",
                        "#416D4E",	"#43E83A",	"#097CDC",	"#159B1C",	"#53974B",	"#005CA9",	"#323E3C",	"#5589C8",	"#332B7C",	"#2C1E50",	"#1CB6CB",	"#1231E7",	"#4819BC",	"#11D0BA",	"#4A6C36",	"#2FA0C3",	"#38E0EE",	"#352D5F",	"#114C33",	"#1BAF3E",	"#52879E",	"#32A8E1",	"#485DE8",	"#4D80B2",	"#384053",	"#179478",	"#2A6F52",	"#07401C",	"#47D96C",	"#1AB235",	"#1E4877",	"#2C3E13",	"#14A6C8",	"#318729",	"#33B92A",	"#067225",	"#3CD942",	"#49A541",	"#11C98C",	"#2B4521",	"#346D1C",	"#155698",	"#49EE66",	"#3033EB",	"#3C3F89",	"#376D86",	"#3CD6BB",	"#3E196D",	"#51BB85",	"#223969",	"#15D794",	"#17BBC5",	"#2B1725",	"#3EC282",	"#267538",	"#099C2D",	"#223A07",	"#27DCCA",	"#565A79",	"#44CC3D",	"#3891B8",	"#30DFDC",	"#59D379",	"#229512",	"#1148F6",	"#2FAAD8",	"#162D9E",	"#166699",	"#289AF6",	"#3C2533",	"#34B431",	"#462CA1",	"#5D2F73",	"#1B63DF",	"#040DE7",	"#274535",	"#56DE7B",	"#2FC833",	"#2023D8",	"#3D992A",	"#5DAC42",	"#5DD057",	"#345A76",	"#530EFE",	"#1E8D81",	"#45F34C",	"#46EA36",	"#0C9D39",	"#159396",	"#35C019",	"#0B39C9",	"#2BEE78",	"#4652C2",	"#015F4A",	"#4BDCB9",	"#05D49E",	"#245A9F",	"#0837C6",	"#468D18",	"#4302D6",
                        "#5A64EC",	"#043D9A",	"#222B32",	"#44C009",	"#08176E",	"#4B167D",	"#109621",	"#407952",	"#3E9A95",	"#08A6D7",	"#1AF349",	"#10ABDB",	"#1043E7",	"#32DA01",	"#49C93C",	"#3C1499",	"#26E735",	"#155442",	"#17E3CE",	"#25D5FB",	"#32B431",	"#216925",	"#3B80C9",	"#03C288",	"#19EB85",	"#1B255B",	"#10970E",	"#27528A",	"#2C6244",	"#540B9E",	"#4062CE",	"#36A6ED",	"#57FB49",	"#4764BB",	"#4DA49F",	"#2AD724",	"#3D3554",	"#3A2E5D",	"#1B4DD2",	"#166C95",	"#0C374A",	"#1D52EC",	"#13AA3B",	"#4A159D",	"#4D9FB5",	"#37C2A4",	"#43EAF7",	"#1D1A4E",	"#382D85",	"#587652",	"#017E13",	"#0834DC",	"#138415",	"#39F694",	"#3E1FE4",	"#163D94",	"#12B126",	"#4482DF",	"#5144F4",	"#5C3DC5",	"#4B5254",	"#1D6341",	"#5C957D",	"#1F7913",	"#4CEB7C",	"#3B86B7",	"#4AE615",	"#131E68",	"#25ED9E",	"#2F9422",	"#22B808",	"#171C5E",	"#3C3637",	"#3B2A68",	"#27E1B2",	"#03761A",	"#4D0ADE",	"#17AC60",	"#348941",	"#52328C",	"#35C4AB",	"#3DA943",	"#5368E1",	"#3DCE28",	"#1A7A2D",	"#46641B",	"#559D5F",	"#3C9ED7",	"#3B6F26",	"#093DEB",	"#3822C7",	"#09CC94",	"#4CDB79",	"#0D5328",	"#0D6CB3",	"#467443",	"#1FB4AD",	"#5B8673",	"#5BBB65",	"#2510EE",
                        "#1D7018",	"#4122D9",	"#2C1BE6",	"#168B44",	"#1C2171",	"#4A67F4",	"#14AC40",	"#019977",	"#53CD44",	"#2931B2",	"#1E3771",	"#387258",	"#2C51F1",	"#187343",	"#3FB1A5",	"#157736",	"#36A892",	"#440586",	"#17E20C",	"#442D74",	"#0C1927",	"#380C15",	"#573162",	"#42506B",	"#2459E2",	"#238844",	"#42446A",	"#43ED14",	"#4E94CB",	"#1D3DEE",	"#3A9B31",	"#21F049",	"#3E18CC",	"#0737DE",	"#44C2DE",	"#22C482",	"#10571E",	"#26B7A7",	"#457448",	"#247763",	"#5660CA",	"#36CB64",	"#353995",	"#0164D9",	"#087EED",	"#3941AD",	"#19A2BB",	"#1FC1A6",	"#464DC4",	"#2899F5",	"#35B055",	"#55E225"																																																
                    ];
                    constants.getAlphabeticallySortedArray = function(array,sortBykey,valueKeyToSort){//used in synonyms for now,sorts both key value pairs//
                        function sortArray(valsToSort){
                            if(valsToSort && valsToSort.length){
                                return valsToSort.sort();    
                                }else{
                                    return valsToSort || [];
                                }
                        }
                        function sortArrayObj(arrayObj){
                            return arrayObj.sort(function(a, b) {
                                var x = a[sortBykey]; var y = b[sortBykey];
                                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                            });
                        }
                        if(sortBykey && array && array.length){
                         var sortedArrayObj = sortArrayObj(array);   // to sortby key in an array of object//
                            if(valueKeyToSort){                      // to sort array values in an array of object along with sort by key//
                                $.each(sortedArrayObj, function(i, arrayVals){
                                    arrayVals[valueKeyToSort]=sortArray(arrayVals[valueKeyToSort]); 
                                });
                            }
                            return sortedArrayObj;
                        }else{
                            return sortArray(array);
                        }
                    };
                    constants.checkForSecialChar = function(string,allowNegation,stringTitle){ // as of now only used for traits needs to update based on future requirment on reusability
                        stringTitle = stringTitle || '';
                        var characters = /[\=\`\~\!@#\$\%\^&\*\(\)\-\+\{\}\:"\[\];\',\.\/<>\?\|\\]+/;
                       if(allowNegation && /[!]/.test(string)){
                           if(string && string[0] !== '!'){
                            NotificationService.notify("Negations are allowed only at the beginning of the"+ stringTitle +" name", 'error');
                            return true;
                           }
                        characters = /[\=\`\~\@#\$\%\^&\*\(\)\-\+\{\}\:"\[\];\',\.\/<>\?\|\\]+/;
                        if(string && string[0] == '!'){
                          var testStringNeagtion = angular.copy(string);
                          testStringNeagtion = testStringNeagtion.slice(1, string.length);
                          if(/[!]/.test(testStringNeagtion)){
                            NotificationService.notify("Negations are allowed only at the beginning of the trait name", 'error');
                            return true;
                          }
                        }
                        if(stringTitle == "traits" ){
                            stringTitle = "Traits";
                        }
                        if(string && string[0] == '!' && string.length == 1){
                            NotificationService.notify( stringTitle +" names can only contain alphanumeric characters, spaces and underscores.", 'error');
                              return true;
                          }
                       }
                       if(characters.test(string)){
                        if(stringTitle == "traits" ){
                            stringTitle = "Traits";
                        }
                        NotificationService.notify( stringTitle + " names can only contain alphanumeric characters, spaces and underscores.", 'error');
                              return true;
                       }
                        // underscores and spaces are not included here//
                       return characters.test(string);
                    };
                    constants.getFromBetween = {
                        results: [],
                        string: "",
                        getFromBetween: function (sub1, sub2) {
                            if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0){
                                return false;
                            }
                                
                            var SP = this.string.indexOf(sub1) + sub1.length;
                            var string1 = this.string.substr(0, SP);
                            var string2 = this.string.substr(SP);
                            var TP = string1.length + string2.indexOf(sub2);
                            return this.string.substring(SP, TP);
                        },
                        removeFromBetween: function (sub1, sub2) {
                            if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0){
                                 return false;
                            }
                               
                            var removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
                            this.string = this.string.replace(removal, "");
                        },
                        getAllResults: function (sub1, sub2) {
                            // first check to see if we do have both substrings
                            if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0){
                              return;  
                            }
                                

                            // find one result
                            var result = this.getFromBetween(sub1, sub2);
                            // push it to the results array
                            this.results.push(result);
                            // remove the most recently found one from the string
                            this.removeFromBetween(sub1, sub2);

                            // if there's more substrings
                            if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
                                this.getAllResults(sub1, sub2);
                            } else{
                                return; 
                            }
                        },
                        get: function (string, sub1, sub2) {
                            this.results = [];
                            this.string = string;
                            this.getAllResults(sub1, sub2);
                            return this;
                        }
                    };
                    constants.mdToHtmlHelpers = {
                        'nl2br': function (str, runEmojiCheck) {
                            if (runEmojiCheck) {
                                str = window.emojione.shortnameToImage(str);
                            }
                            str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
                            return str;
                        },
                        'br2nl': function (str) {
                            str = str.replace(/<br \/>/g, '\n');
                            return str;
                        },
                        'initial2nl': function (str) {
                            str = str.split('↵').join('\n');
                            return str;
                        },
                        'formatAMPM': function (date) {
                            var hours = date.getHours();
                            var minutes = date.getMinutes();
                            var ampm = hours >= 12 ? 'pm' : 'am';
                            hours = hours % 12;
                            hours = hours ? hours : 12; // the hour '0' should be '12'
                            minutes = minutes < 10 ? '0' + minutes : minutes;
                            var strTime = hours + ':' + minutes + ' ' + ampm;
                            return strTime;
                        },
                        'formatDate': function (date) {
                            var d = new Date(date);
                            if (isNaN(d.getTime())) {
                                var _tmpDate = new Date().getTime();
                                d = new Date(_tmpDate);
                            }
                            return d.toDateString() + " at " + constants.mdToHtmlHelpers.formatAMPM(d);
                        },
                        'convertMDtoHTML': function (val, responseType) {
                            val = constants.mdToHtmlHelpers.initial2nl(val);
                            var mdre = {};
                            //mdre.date = new RegExp(/\\d\(\s*(.{10})\s*\)/g);
                            mdre.date = new RegExp(/\\d\(\s*(.{10})\s*(?:,\s*["'](.+?)["']\s*)?\)/g);
                            mdre.time = new RegExp(/\\t\(\s*(.{8}\.\d{0,3})\s*\)/g);
                            //mdre.datetime = new RegExp(/\\dt\(\s*(.{10})[T](.{12})([z]|[Z]|[+-]\d{4})\s*\)/g);
                            mdre.datetime = new RegExp(/\\(d|dt|t)\(\s*([-0-9]{10}[T][0-9:.]{12})([z]|[Z]|[+-]\d{4})[\s]*,[\s]*["']([a-zA-Z\W]+)["']\s*\)/g);
                            mdre.num = new RegExp(/\\#\(\s*(\d*.\d*)\s*\)/g);
                            mdre.curr = new RegExp(/\\\$\((\d*.\d*)[,](\s*[\"\']\s*\w{3}\s*[\"\']\s*)\)|\\\$\((\d*.\d*)[,](\s*\w{3}\s*)\)/g);

                            var regEx = {};
                            regEx.SPECIAL_CHARS = /[\=\`\~\!@#\$\%\^&\*\(\)_\-\+\{\}\:"\[\];\',\.\/<>\?\|\\]+/;
                            regEx.EMAIL = /^[-a-z0-9~!$%^&*_=+}{\']+(\.[-a-z0-9~!$%^&*_=+}{\']+)*@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,255})+$/i;
                            regEx.MENTION = /(^|\s|\\n|")@([^\s]*)(?:[\s]\[([^\]]*)\])?["]?/gi;
                            regEx.HASHTAG = /(^|\s|\\n)#(\S+)/g;
                            regEx.NEWLINE = /\n/g;
                            var _regExForLink = /((?:http\:\/\/|https\:\/\/|www\.)+\S*\.(?:(?:\.\S)*[^\,\s\.])*\/?)/gi;
                            var _regExForMarkdownLink = /\[([^\]]+)\](|\s)+\(([^\)])+\)/g;
                            var str = val || '';
                            var mmntns = {};
                            mmntns.sd = new RegExp(/^(d{1})[^d]|[^d](d{1})[^d]/g);
                            mmntns.dd = new RegExp(/^(d{2})[^d]|[^d](d{2})[^d]/g);
                            mmntns.fy = new RegExp(/(y{4})|y{2}/g);
                            var regexkeys = Object.keys(mdre);
                            function matchmap(regexval, stringval) {
                                var da;
                                var matches = [];
                                while ((da = regexval.exec(stringval)) !== null) {
                                    var keypair = {};
                                    keypair.index = da.index;
                                    keypair.matchexp = da[0];
                                    if (da.length > 1) {
                                        for (var n = 1; n < da.length; n++) {
                                            var mstr = "matchval" + n.toString();
                                            keypair[mstr] = da[n];
                                        }
                                    }
                                    matches.push(keypair);
                                }
                                return matches;
                            }
                            function ucreplacer(match) {
                                return match.toUpperCase();
                            }
                            for (var j = 0; j < regexkeys.length; j++) {
                                var k;
                                switch (regexkeys[j]) {
                                    case 'date':
                                        var strvald = str;
                                        var datematcharray = matchmap(mdre.date, strvald);
                                        if (datematcharray.length) {
                                            for (k = 0; k < datematcharray.length; k++) {
                                                //var fdate = moment(datematcharray[k].matchval).format('DD,dd,MM,YYY');
                                                var fdate = new Date(datematcharray[k].matchval1).toLocaleDateString();
                                                fdate = ' ' + fdate.toString() + ' ';
                                                str = str.replace(datematcharray[k].matchexp.toString(), fdate);
                                            }
                                        }
                                        break;
                                    case 'time':
                                        var strvalt = str;
                                        var timematcharray = matchmap(mdre.time, strvalt);
                                        if (timematcharray.length) {
                                            for (k = 0; k < timematcharray.length; k++) {
                                                var ftime = new Date(timematcharray[k].matchval1).toLocaleTimeString();
                                                ftime = ' ' + ftime.toString() + ' ';
                                                str = str.replace(timematcharray[k].matchexp.toString(), ftime);
                                            }
                                        }
                                        break;
                                    case 'datetime':
                                        var strvaldt = str;
                                        var dtimematcharray = matchmap(mdre.datetime, strvaldt);
                                        if (dtimematcharray.length) {
                                            for (k = 0; k < dtimematcharray.length; k++) {
                                                var ms = '';
                                                var mergekeylength = Object.keys(dtimematcharray[k]).length - 2;
                                                for (var l = 2; l < mergekeylength; l++) {
                                                    var keystr = "matchval" + l.toString();
                                                    ms += dtimematcharray[k][keystr];
                                                }
                                                var foptionstring = "matchval" + mergekeylength.toString();
                                                var fmtstr = dtimematcharray[k][foptionstring];
                                                fmtstr = fmtstr.replace(mmntns.fy, ucreplacer);
                                                fmtstr = fmtstr.replace(mmntns.dd, ucreplacer);
                                                fmtstr = fmtstr.replace(mmntns.sd, ucreplacer);
                                                //var fdtime = new Date(dtimematcharray[k].matchval).toLocaleString();
                                                var fdtime = moment(ms).format(fmtstr);
                                                fdtime = ' ' + fdtime.toString() + ' ';
                                                str = str.replace(dtimematcharray[k].matchexp.toString(), fdtime);
                                            }
                                        }
                                        break;
                                    case 'num':
                                        var strnumval = str;
                                        var nummatcharray = matchmap(mdre.num, strnumval);
                                        if (nummatcharray.length) {
                                            for (k = 0; k < nummatcharray.length; k++) {
                                                var fnum = Number(nummatcharray[k].matchval1).toLocaleString();
                                                fnum = ' ' + fnum.toString() + ' ';
                                                str = str.replace(nummatcharray[k].matchexp.toString(), fnum);
                                            }
                                        }
                                        break;
                                    case 'curr':
                                        var strcurval = str;
                                        var currmatcharray = matchmap(mdre.curr, strcurval);
                                        var browserLang = window.navigator.language || window.navigator.browserLanguage;
                                        var curcode = new RegExp(/\w{3}/);
                                        if (currmatcharray.length) {
                                            for (k = 0; k < currmatcharray.length; k++) {
                                                var currops = {}, fcode;
                                                currops.style = 'currency';
                                                if (currmatcharray[k].matchval2) {
                                                    fcode = curcode.exec(currmatcharray[k].matchval2);
                                                }
                                                currops.currency = fcode[0].toString();
                                                var fcurr = Number(currmatcharray[k].matchval1).toLocaleString(browserLang, currops);
                                                //check for browser support if browser doesnot suppor we get the same value back and we append the currency Code
                                                if (currmatcharray[k].matchval1.toString() === fcurr.toString()) {
                                                    fcurr = ' ' + fcurr.toString() + ' ' + currops.currency;
                                                } else {
                                                    fcurr = ' ' + fcurr.toString() + ' ';
                                                }
                                                str = str.replace(currmatcharray[k].matchexp.toString(), fcurr);
                                            }
                                        }
                                        break;
                                }
                            }
                            function nextLnReplacer(match, p1, offset, string) {
                                return "<br/>";
                            }
                            function ignoreWords(str) {
                                var _words = ['onclick', 'onmouse', 'onblur', 'onscroll', 'onStart'];
                                _words.forEach(function (word) {
                                    var regEx = new RegExp(word, "ig");
                                    str = str.replace(regEx, "");
                                });
                                return str;
                            }

                            var nextln = regEx.NEWLINE;
                            function linkreplacer(match, p1, offset, string) {
                                var dummyString = string.replace(_regExForMarkdownLink, '[]');
                                dummyString = ignoreWords(dummyString);
                                if (dummyString.indexOf(match) !== -1) {
                                    var _link = p1.indexOf('http') < 0 ? 'http://' + match : match, _target;
                                    //_link = encodeURIComponent(_link);
                                    _target = "target='_blank'";
                                    return "<span class='isLink'><a " + _target + " href=\"" + _link + "\">" + match + "</a></span>";
                                } else {
                                    return match;
                                }
                            }
                            //check for whether to linkify or not
                            try {
                                str = decodeURIComponent(str);
                            } catch (e) {
                                str = str || '';
                            }
                            var newStr = '', wrapper1;
                            if (responseType === 'user') {
                                str = str.replace(/onerror=/gi, 'abc-error=');
                                wrapper1 = document.createElement('div');
                                newStr = str.replace(/“/g, '\"').replace(/”/g, '\"');
                                newStr = newStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                                wrapper1.innerHTML = xssAttack(newStr);
                                if ($(wrapper1).find('a').attr('href')) {
                                    str = newStr;
                                } else {
                                    str = newStr.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(_regExForLink, linkreplacer);
                                }
                            } else {
                                wrapper1 = document.createElement('div');
                                //str = str.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                                wrapper1.innerHTML = xssAttack(str);
                                if ($(wrapper1).find('a').attr('href')) {
                                    var linkArray = str.match(/<a[^>]*>([^<]+)<\/a>/g);
                                    for (var x = 0; x < linkArray.length; x++) {
                                        var _newLA = document.createElement('div');
                                        _newLA.innerHTML = linkArray[x];
                                        $(_newLA).find('a').attr('target', '_blank');
                                        str = str.replace(linkArray[x], _newLA.innerHTML);
                                    }
                                } else {
                                    str = wrapper1.innerHTML.replace(_regExForLink, linkreplacer);
                                }
                            }
                            str = constants.mdToHtmlHelpers.checkMarkdowns(str);
                            if (responseType === 'user') {
                                str = str.replace(/abc-error=/gi, 'onerror=');
                            }
                            return constants.mdToHtmlHelpers.nl2br(str, true);
                        },
                        'checkMarkdowns': function (val) {
                            var txtArr = val.split(/\r?\n/);
                            for (var i = 0; i < txtArr.length; i++) {
                                var _lineBreakAdded = false;
                                if (txtArr[i].indexOf('#h6') === 0 || txtArr[i].indexOf('#H6') === 0) {
                                    txtArr[i] = '<h6>' + txtArr[i].substring(3) + '</h6>';
                                    _lineBreakAdded = true;
                                } else if (txtArr[i].indexOf('#h5') === 0 || txtArr[i].indexOf('#H5') === 0) {
                                    txtArr[i] = '<h5>' + txtArr[i].substring(3) + '</h5>';
                                    _lineBreakAdded = true;
                                } else if (txtArr[i].indexOf('#h4') === 0 || txtArr[i].indexOf('#H4') === 0) {
                                    txtArr[i] = '<h4>' + txtArr[i].substring(3) + '</h4>';
                                    _lineBreakAdded = true;
                                } else if (txtArr[i].indexOf('#h3') === 0 || txtArr[i].indexOf('#H3') === 0) {
                                    txtArr[i] = '<h3>' + txtArr[i].substring(3) + '</h3>';
                                    _lineBreakAdded = true;
                                } else if (txtArr[i].indexOf('#h2') === 0 || txtArr[i].indexOf('#H2') === 0) {
                                    txtArr[i] = '<h2>' + txtArr[i].substring(3) + '</h2>';
                                    _lineBreakAdded = true;
                                } else if (txtArr[i].indexOf('#h1') === 0 || txtArr[i].indexOf('#H1') === 0) {
                                    txtArr[i] = '<h1>' + txtArr[i].substring(3) + '</h1>';
                                    _lineBreakAdded = true;
                                } else if (txtArr[i].length === 0) {
                                    txtArr[i] = '\r\n';
                                    _lineBreakAdded = true;
                                } else if (txtArr[i].indexOf('*') === 0) {
                                    if (!isEven(txtArr[i].split('*').length - 1)) {
                                        txtArr[i] = '\r\n&#9679; ' + txtArr[i].substring(1);
                                        _lineBreakAdded = true;
                                    }
                                } else if (txtArr[i].indexOf('>>') === 0) {
                                    txtArr[i] = '<p class="indent">' + txtArr[i].substring(2) + '</p>';
                                    _lineBreakAdded = true;
                                } else if (txtArr[i].indexOf('&gt;&gt;') === 0) {
                                    txtArr[i] = '<p class="indent">' + txtArr[i].substring(8) + '</p>';
                                    _lineBreakAdded = true;
                                } else if (txtArr[i].indexOf('---') === 0 || txtArr[i].indexOf('___') === 0) {
                                    txtArr[i] = '<hr/>' + txtArr[i].substring(3);
                                    _lineBreakAdded = true;
                                }
                                var j;
                                // Matches Image markup ![test](http://google.com/image.png)
                                if (txtArr[i].indexOf(' ![') === -1) {// replace method trimming last'$' character, to handle this adding ' ![' extra space
                                    txtArr[i] = txtArr[i].replace('![', ' ![');
                                }
                                var _matchImage = txtArr[i].match(/\!\[([^\]]+)\](|\s)+\(([^\)])+\)/g);
                                var remainingString = '';
                                if (_matchImage && _matchImage.length > 0) {
                                    for (j = 0; j < _matchImage.length; j++) {
                                        var _imgTxt = _matchImage[j].substring(2, _matchImage[j].indexOf(']'));
                                        remainingString = _matchImage[j].substring(_matchImage[j].indexOf(']') + 1).trim();
                                        var _imgLink = remainingString.substring(1, remainingString.indexOf(')'));
                                        _imgLink = '<img src="' + _imgLink + '" alt="' + _imgTxt + '">';
                                        var _tempImg = txtArr[i].split(' ');
                                        for (var k = 0; k < _tempImg.length; k++) {
                                            if (_tempImg[k] === _matchImage[j]) {
                                                _tempImg[k] = _imgLink;
                                            }
                                        }
                                        txtArr[i] = _tempImg.join(' ');
                                        txtArr[i] = txtArr[i].replace(_matchImage[j], _imgLink);
                                    }
                                }
                                // Matches link markup [test](http://google.com/)
                                var _matchLink = txtArr[i].match(/\[([^\]]+)\](|\s)+\(([^\)])+\)/g);
                                if (_matchLink && _matchLink.length > 0) {
                                    for (j = 0; j < _matchLink.length; j++) {
                                        var _linkTxt = _matchLink[j].substring(1, _matchLink[j].indexOf(']'));
                                        remainingString = _matchLink[j].substring(_matchLink[j].indexOf(']') + 1).trim();
                                        var _linkLink = remainingString.substring(1, remainingString.indexOf(')'));
                                        _linkLink = '<span class="isLink"><a href="' + _linkLink + '" target="_blank">' + constants.mdToHtmlHelpers.checkMarkdowns(_linkTxt) + '</a></span>';
                                        txtArr[i] = txtArr[i].replace(_matchLink[j], _linkLink);
                                    }
                                }
                                // Matches bold markup *test* doesnot match * test *, * test*. If all these are required then replace \S with \s
                                var _matchAstrik = txtArr[i].match(/\*\S([^*]*?)\*/g);
                                if (_matchAstrik && _matchAstrik.length > 0) {
                                    for (j = 0; j < _matchAstrik.length; j++) {
                                        var _boldTxt = _matchAstrik[j];
                                        _boldTxt = _boldTxt.substring(1, _boldTxt.length - 1);
                                        _boldTxt = '<b>' + _boldTxt.trim() + '</b>';
                                        txtArr[i] = txtArr[i].replace(_matchAstrik[j], _boldTxt);
                                    }
                                }
                                // Matches bold markup ~test~ doesnot match ~ test ~, ~test ~, ~ test~. If all these are required then replace \S with \s
                                var _matchItalic = txtArr[i].match(/\~\S([^*]*?)\S\~/g);
                                if (_matchItalic && _matchItalic.length > 0) {
                                    for (j = 0; j < _matchItalic.length; j++) {
                                        var _italicTxt = _matchItalic[j];
                                        if (txtArr[i].indexOf(_italicTxt) === 0 || txtArr[i][txtArr[i].indexOf(_italicTxt) - 1] === ' ' || txtArr[i].indexOf(_italicTxt) !== -1) {
                                            _italicTxt = _italicTxt.substring(1, _italicTxt.length - 1);
                                            _italicTxt = '<i class="markdownItalic">' + _italicTxt + '</i>';
                                            txtArr[i] = txtArr[i].replace(_matchItalic[j], _italicTxt);
                                        }
                                    }
                                }
                                // Matches bold markup ~test~ doesnot match ~ test ~, ~test ~, ~ test~. If all these are required then replace \S with \s
                                var _matchPre = txtArr[i].match(/\`\`\`\S([^*]*?)\S\`\`\`/g);
                                var _matchPre1 = txtArr[i].match(/\'\'\'\S([^*]*?)\S\'\'\'/g);
                                var _preTxt ='';
                                if (_matchPre && _matchPre.length > 0) {
                                    for (j = 0; j < _matchPre.length; j++) {
                                        _preTxt = _matchPre[j];
                                        _preTxt = _preTxt.substring(3, _preTxt.length - 3);
                                        _preTxt = '<pre>' + _preTxt + '</pre>';
                                        txtArr[i] = txtArr[i].replace(_matchPre[j], _preTxt);
                                    }
                                    _lineBreakAdded = true;
                                }
                                if (_matchPre1 && _matchPre1.length > 0) {
                                    for (j = 0; j < _matchPre1.length; j++) {
                                        _preTxt = _matchPre1[j];
                                        _preTxt = _preTxt.substring(3, _preTxt.length - 3);
                                        _preTxt = '<pre>' + _preTxt + '</pre>';
                                        txtArr[i] = txtArr[i].replace(_matchPre1[j], _preTxt);
                                    }
                                    _lineBreakAdded = true;
                                }
                                if (!_lineBreakAdded && i > 0) {
                                    txtArr[i] = '\r\n' + txtArr[i];
                                }
                            }
                            val = txtArr.join('');
                            return val;
                        }

                    };
                    function isEven(n) {
                        n = Number(n);
                        var reminder = n % 2;
                        return n === 0 || !!(n && !reminder);
                    }
                    String.prototype.isNotAllowedHTMLTags = function () {   
                        var wrapper = document.createElement('div');
                        wrapper.innerHTML = this;

                        var setFlags = {
                            isValid: true,
                            key: ''
                        };
                        try {
                            if ($(wrapper).find('script').length || $(wrapper).find('video').length || $(wrapper).find('audio').length) {
                                setFlags.isValid = false;
                            }
                            if ($(wrapper).find('link').length && $(wrapper).find('link').attr('href').indexOf('script') !== -1) {
                                if (detectScriptTag.test($(wrapper).find('link').attr('href'))) {
                                    setFlags.isValid = false;
                                } else {
                                    setFlags.isValid = true;
                                }
                            }
                            if ($(wrapper).find('a').length && $(wrapper).find('a').attr('href').indexOf('script') !== -1) {
                                if (detectScriptTag.test($(wrapper).find('a').attr('href'))) {
                                    setFlags.isValid = false;
                                } else {
                                    setFlags.isValid = true;
                                }
                            }
                            if ($(wrapper).find('img').length && $(wrapper).find('img').attr('src').indexOf('script') !== -1) {
                                if (detectScriptTag.test($(wrapper).find('img').attr('href'))) {
                                    setFlags.isValid = false;
                                } else {
                                    setFlags.isValid = true;
                                }
                            }
                            if ($(wrapper).find('object').length) {
                                setFlags.isValid = false;
                            }

                            return setFlags;
                        } catch (e) {
                            return setFlags;
                        }
                    };

                    String.prototype.escapeHTML = function () {
                        //'&': '&amp;',
                        var escapeTokens = {
                            '<': '&lt;',
                            '>': '&gt;',
                            '"': '&quot;',
                            "'": '&#x27;'
                        };
                        var htmlTags = /[<>"']/g;
                        return ('' + this).replace(htmlTags, function (match) {
                            return escapeTokens[match];
                        });
                    };

                    function xssAttack(txtStr) {
                        //   if (compObj && compObj[0] && compObj[0].componentType === "text") {

                        var textHasXSS;
                        if (txtStr) {
                            textHasXSS = txtStr.isNotAllowedHTMLTags();
                        }
                        if (textHasXSS && !textHasXSS.isValid) {
                            txtStr = txtStr.escapeHTML();
                        }
                        return txtStr;
                        //return compObj[0].componentBody;

                    }
                    constants.pauseResumeMessages = {
                        'allowEndUser' : {
                            'condition' : i18n.i18nString('allowEndUser_condition'),
                            //'key' : 'Should we cancel current task',
                            'key' : ['ask if user would like to switch to new task'],
                            'category' : i18n.i18nString('allowEndUser_category')
                        },
                        'notifyUserWithMessage' : {
                            'condition' : i18n.i18nString('notifyUserWithMessage_condition'),
                            'key' : ['Resuming interrupted task'],
                            'category' : i18n.i18nString('notifyUserWithMessage_category')
                        },
                        'continueCurrentTask' : {
                            'condition' : i18n.i18nString('continueCurrentTask_condition'),
                            'key' : ['Interruption identified but hold is not allowed'],
                            'category' : i18n.i18nString('notifyUserWithMessage_category')
                        },
                        'getConfirmatonWithUser' : {
                            'condition' : i18n.i18nString('getConfirmatonWithUser_condition'),
                            'key' : ['Should we resume previous task','Cancelled paused task'],
                            'category' : i18n.i18nString('allowEndUser_category')
                        },
                        'discardCurrentTask' : {
                            'condition' : i18n.i18nString('discardCurrentTask_condition'),
                            'key' : ['Discarded current task to switch to new task'],
                            'category' : i18n.i18nString('notifyUserWithMessage_category')
                        },
                        'maxLimitReached' : {
                            'condition' : i18n.i18nString('maxLimitReached_condition'),
                            'key' : ['Max on hold task limit reached'],
                            'category' : i18n.i18nString('maxLimitReached_category')
                        },
                        'folloowUpTaskProvided' : {
                            'condition' : i18n.i18nString('folloowUpTaskProvided_condition'),
                            'key' : ['Select the followup task from list provided'],
                            'category' : i18n.i18nString('maxLimitReached_category')
                        },
                        'probableSearch':{
                            'condition':i18n.i18nString('probableSearch_condition'),
                            'key': ['Probable search in answer'],
                            'category': i18n.i18nString('probableSearch_category')
                        },
                        'manageSession':{
                            'condition': i18n.i18nString('manageSession_condition'),
                            'key': ['Notify the user incase of session timeout'],
                            'category': i18n.i18nString('probableSearch_category')
                        },
                        'intentNotFound':{
                            'condition' : "Show a standard message from the standard responses.",
                            'key' : ["List of FAQs menu++I couldn't understand your request","List of tasks menu++I couldn't understand your request","List of tasks menu++List of alerts menu++I couldn't understand your request","List of tasks menu++List of FAQs menu++I couldn't understand your request","List of alerts menu++I couldn't understand your request","List of alerts menu++List of FAQs menu++I couldn't understand your request","List of tasks menu++List of alerts menu++List of FAQs menu++I couldn't understand your request"],
                            'category' : i18n.i18nString('error_warnings')
                        }
                    };
                    constants.flowtasks = {
                        new: i18n.i18nString('new'),
                        label: i18n.i18nString('constants.flowtasks_label'),
                        intent: i18n.i18nString('constants.flowtasks_intent'),
                        description: i18n.i18nString('constants.flowtasks_description'),
                        message: i18n.i18nString('constants.flowtasks_message'),
                        promptMessage: i18n.i18nString('constants.flowtasks_promptMessage'),
                        nodeType: i18n.i18nString('constants.flowtasks_nodeType'),
                        serviceType: i18n.i18nString('constants.flowtasks_serviceType'),
                        nodeSubType: i18n.i18nString('constants.flowtasks_nodeSubType'),
                        callbackURL: i18n.i18nString('constants.flowtasks_callbackURL'),
                        events: i18n.i18nString('constants.flowtasks_events'),
                        msgAndHook: i18n.i18nString('constants.flowtasks_msgAndHook'),
                        onHook: i18n.i18nString('constants.flowtasks_onHook'),
                        end: i18n.i18nString('constants.flowtasks_end'),
                        //keepAlive:"Keep Alive",
                        unconnected: i18n.i18nString('constants.flowtasks_unconnected'),
                        serviceTypes : {
                            custom: i18n.i18nString('constants_serviceTypes_custom'),
                            htmlToImage: i18n.i18nString('constants_serviceTypes_htmlToImage'),
                            urlToImage: i18n.i18nString('constants_serviceTypes_urlToImage')
                        },
                        errorPrompt: {
                            errorMsg: i18n.i18nString('constants_errorPrompt_errorMsg')
                        }
                    };
                    constants.states = {
                        inProgress: i18n.i18nString('constants.states_configured'),
                        configured: i18n.i18nString('constants.states_configured'),
                        upgradeInProgress: i18n.i18nString('constants.states_upgradeInProgress'),
                        published: i18n.i18nString('constants.states_published'),
                        awaitingApproval :i18n.i18nString('constants.states_awaitingApproval'),
                        rejected : i18n.i18nString('constants.states_rejected'),
                        suspended : i18n.i18nString('constants.states_suspended'),
                        linked: i18n.i18nString('linked')
                    };
                    constants.fields = {
                        manageConnection: "Manage connections",
                        add: "+ Add",
                        goto: "GoTo"
                    };
                    constants.flowStates = {
                        configured : 'In Development',
                        inactive   : 'Upgrade In Progress',
                        active     : "Published",
                        suspended  : "Suspended"
                    };
                    constants.menuOptions = {
                        displayOpts:  i18n.i18nString('constants.menuOptions_displayOpts'),
                        zoomOpts: i18n.i18nString('constants.menuOptions_zoomOpts'),
                        import: i18n.i18nString('constants.menuOptions_import'),
                        export: i18n.i18nString('constants.menuOptions_export'),
                        hideNodeOpts: i18n.i18nString('constants.menuOptions_hideNodeOpts'),
                        resetNodeOpts: i18n.i18nString('constants.menuOptions_resetNodeOpts'),
                        hideNodeType:i18n.i18nString('constants.menuOptions_hideNodeType') ,
                        hideNodeDetails: i18n.i18nString('constants.menuOptions_hideNodeDetails'),
                        hideConnDetails: i18n.i18nString('constants.menuOptions_hideConnDetails'),
                        showNodeType: i18n.i18nString('constants.menuOptions_showNodeType'),
                        showNodeDetails: i18n.i18nString('constants.menuOptions_showNodeDetails'),
                        showConnDetails: i18n.i18nString('constants.menuOptions_showConnDetails'),
                        fitToPage: i18n.i18nString('constants.menuOptions_fitToPage'),
                        resetZoom: i18n.i18nString('constants.menuOptions_resetZoom')
                    };
                    constants.koreuxconsts = {
                        actions: ['_labels_', '_tenant_', 'request'],
                        alerts: ['_labels_', '_tenant_', '_fields_', '_last_run']
                    };
                    constants.iconsTooltips = {  //use channelconfig file for all channel related info from here on 
                        'spark':  i18n.i18nString('constants.iconsTooltips_spark'),
                        'msteams': i18n.i18nString('constants.iconsTooltips_msteams'),
                        'syniverse':i18n.i18nString('Syniverse'),
                        'rcengage':i18n.i18nString('Ring_Central_Engage') ,
                        'slack':  i18n.i18nString('constants.iconsTooltips_slack'),
                        'sms': i18n.i18nString('constants.iconsTooltips_sms') ,
                        'twilio':  i18n.i18nString('constants.iconsTooltips_twilio'),
                        'email':  i18n.i18nString('constants.iconsTooltips_email'),
                        'skype':  i18n.i18nString('constants.iconsTooltips_skype'),
                        'facebook':  i18n.i18nString('constants.iconsTooltips_facebook'),
                        'websdk':  i18n.i18nString('constants.iconsTooltips_websdk'),
                        'kore':  i18n.i18nString('constants.iconsTooltips_kore'),
                        'rtm':  i18n.i18nString('constants.iconsTooltips_rtm'),
                        'widgetsdk':  i18n.i18nString('constants.iconsTooltips_widgetsdk'),
                        'twitter':  i18n.i18nString('constants.iconsTooltips_twitter'),
                        'cisco':  i18n.i18nString('constants.iconsTooltips_cisco'),
                        'wfacebook':  i18n.i18nString('constants.iconsTooltips_wfacebook'),
                        'Workplace For Groups': i18n.i18nString('constants.iconsTooltips_Workplace For Groups'),
                        'Workplace For Chat': i18n.i18nString('constants.iconsTooltips_Workplace For Chat'),
                        'ringcentral':  i18n.i18nString('constants.iconsTooltips_ringcentral'),
                        'skypeforbusiness':  i18n.i18nString('constants.iconsTooltips_skypeforbusiness'),
                        'jabber':  i18n.i18nString('constants.iconsTooltips_jabber'),
                        'yammer': i18n.i18nString('constants.iconsTooltips_yammer'),
                        'telegram': i18n.i18nString('constants.iconsTooltips_telegram'),
                        'alexa':  i18n.i18nString('constants.iconsTooltips_alexa'),
                        'twiliovoice':  i18n.i18nString('constants.iconsTooltips_twiliovoice'),
                        'line': i18n.i18nString('constants.iconsTooltips_line'),
                        'ivr': i18n.i18nString('constants.iconsTooltips_ivr'),
                        'liveperson': i18n.i18nString('constants.iconsTooltips_liveperson'),
                        'ivrVoice': i18n.i18nString('constants.iconsTooltips_ivrVoice'),
                        'wechat': i18n.i18nString('constants.iconsTooltips_wechat'),
                        'skypeOnPrem': i18n.i18nString('bt_chnl_form_skype_on_premise_label')

                    };
                    constants.reportKeys = ["reportInfo.reportLink", "reportInfo.reportTitle"];

                    constants.nlp = [
                        {title: 'Phone Number', value: 'Phone Number'},
                        {title: 'Quantity (Number with unit of measure)', value: 'Quantity (Number with unit of measure)'},
                        {title: 'Number', value: 'Number'},
                        {title: 'From number (minimum of a range)', value: 'From-number (minimum of a range)'},
                        {title: 'To number (maximum of a range, limit)', value: 'To-number (maximum of a range, limit)'},
                        //{title: 'Password', value: 'Password'},
                        {title: 'Pincode', value: 'Pincode'},
                        {title: 'Person Name', value: 'Person Name'},
                        {title: 'Company name / Organisation name', value: 'Company name / Organisation name'},
                        {title: 'City', value: 'City'},
                        {title: 'Country', value: 'Country'},
                        {title: 'Location', value: 'Location'},
                        {title: 'Percentage', value: 'Percentage'},
                        {title: 'Currency', value: 'Currency'},
                        {title: 'Label', value: 'Label'},
                        {title: 'Description', value: 'Description'},
                        {title: 'City with co-ordinates', value: 'City with co-ordinates'},
                        {title: 'Message', value: 'Message'},
                        {title: "Item Before Move", value: "itemBeforeMove"},
                        {title: "Location After Move", value: "locationAfterMove"},
                        {title: "Activation Status", value: "activationStatus"},
                        {title: "From Date", value: "from-date"},
                        {title: "To Date", value: "to-date"},
                        {title: "@Name", value: "@name"},
                        {title: "From Location", value: "From location"},
                        {title: "To Location", value: "To location"},
                        {title:"First Name",value:"first-name"},
                        {title:"Last Name",value:"last-name"}
                    ];
                    constants.entityNlp = [
                        {"title": "Address", "value": "address", "isDepricated": false,"supportEntity":false},
                        {"title": "Airport", "value": "airport", "isDepricated": false,"supportEntity":false},
                        {"title": "Attachment(Image / File)", "value": "attachment", "isDepricated": false,"supportEntity":false},
                        {"title": "City", "value": "city", "isDepricated": false,"supportEntity":true},
                        //{"title": "City (Advanced)", "value": "cityAdv", "isDepricated": false},
                        {"title": "Country", "value": "country", "isDepricated": false,"supportEntity":true},
                        //{"title": "City with Geo Coordinates", "value": "city_coordinates"},
                        {"title": "Company Name or Organization Name", "value": "company_name", "isDepricated": false,"supportEntity":false},
                        //{"title": "City", "value": "city"},
                        {"title": "Color", "value": "color", "isDepricated": false,"supportEntity":false},
                        {"title": "Currency(Deprecated)", "value": "currency", "isDepricated": true,"supportEntity":true},
                        {"title": "Currency", "value": "currencyv2", "isDepricated": false,"supportEntity":true},
                        {"title": "Custom", "value": "regex", "isDepricated": false,"supportEntity":false},
                        {"title": "Composite", "value": "composite", "isDepricated": false,"supportEntity":false},
                        {"title": "Date", "value": "date", "isDepricated": false,"supportEntity":true},
                        {"title": "Date Period", "value": "dateperiod", "isDepricated": false,"supportEntity":true},
                        {"title": "Date Time", "value": "datetime", "isDepricated": false,"supportEntity":true},
                        {"title": "Description", "value": "description", "isDepricated": false,"supportEntity":true},
                        {"title": "Email", "value": "email", "isDepricated": false,"supportEntity":false},
                        //{"title": "JSON Object", "value": "json_object", "isDepricated": false},
                        {"title": "List of items (enumerated)", "value": "list_of_values", "isDepricated": false,"supportEntity":true},
                        {"title": "List of items (lookup)", "value": "list_of_items_lookup", "isDepricated": false,"supportEntity":false},
                        {"title": "Location", "value": "location", "isDepricated": false,"supportEntity":true},
                        {"title": "Number", "value": "number", "isDepricated": false,"supportEntity":true},
                        //{"title": "Password", "value": "password", "isDepricated": false},
                        {"title": "Person Name", "value": "person_name", "isDepricated": false,"supportEntity":true},
                        {"title": "Percentage", "value": "percentage", "isDepricated": false,"supportEntity":false},
                        {"title": "Phone Number", "value": "phone_number", "isDepricated": false,"supportEntity":false},
                        //{"title": "Quantity(Number with unit of measure)", "value": "quantity"},
                        {"title": "Quantity", "value": "quantityv2", "isDepricated": false,"supportEntity":false},
                        {"title": "String", "value": "label", "isDepricated": false,"supportEntity":true},
                        {"title": "Time", "value": "time", "isDepricated": false,"supportEntity":true},
                        {"title": "Time Zone", "value": "timezone", "isDepricated": false,"supportEntity":false},
                        {"title": "URL", "value": "url", "isDepricated": false,"supportEntity":false},
                        {"title": "Zip Code", "value": "zipcode", "isDepricated": false,"supportEntity":true},

                        {"title": "From - number(minimum of a range)(Deprecated)", "value": "from_number", "isDepricated": true,"supportEntity":false},
                        {"title": "To - number(maximum of a range, limit)(Deprecated)", "value": "to_number", "isDepricated": true,"supportEntity":false},
                        {"title": "Quantity(Deprecated)", "value": "quantity", "isDepricated": true,"supportEntity":false}
                        //{"title": "City", "value": "city"},
                    ];
                    constants.entityNlpFieldDataTypes = [
                        //{"title": "Address", "value": "address", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        {"title": "Attachment(Image / File)", "value": "attachment", "fieldType":"file","dataType":"Object", "isDepricated": false},
                        {"title": "City", "value": "city", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        {"title": "City with Geo Coordinates", "value": "city_coordinates", "isDepricated": false},
                        {"title": "Country", "value": "country", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        {"title": "Company Name or Organization Name", "value": "company_name", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        //{"title": "City", "value": "city"},
                        //{"title": "Color", "value": "color", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        {"title": "Currency(Deprecated)", "value": "currency", "fieldType":"Textbox","dataType":"String", "isDepricated": true},
                        {"title": "Currency", "value": "currencyv2", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        //{"title": "Custom", "value": "regex", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        {"title": "Date", "value": "date", "fieldType":"Date","dataType":"String", "isDepricated": false},
                        //{"title": "Date Time", "value": "datetime", "fieldType":"datetime","dataType":"String", "isDepricated": false},
                        //{"title": "Description", "value": "description", "fieldType":"Textarea","dataType":"String", "isDepricated": false},
                        {"title": "Email", "value": "email", "fieldType":"Email","dataType":"Email", "isDepricated": false},
                        {"title": "From Location", "value": "From location", "fieldType":"Location","dataType":"Object", "isDepricated": false},
                        {"title": "To Location", "value": "To location", "fieldType":"Location","dataType":"Object", "isDepricated": false},

                        //{"title": "From - number(minimum of a range)", "value": "from_number", "fieldType":"Textbox","dataType":"Number", "isDepricated": false},
                        //{"title": "List of items (enumerated)", "value": "list_of_values", "fieldType":"staticDropDown","dataType":"String", "isDepricated": false},
                        //{"title": "List of items (lookup)", "value": "list_of_items_lookup", "fieldType":"staticDropDown","dataType":"String", "isDepricated": false},
                        {"title": "Label", "value": "Label", "fieldType":"Label","dataType":"String", "isDepricated": false},
                        {"title": "Location", "value": "location", "fieldType":"Location","dataType":"Object", "isDepricated": false},
                        {"title": "Message", "value": "Message", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        {"title": "@Name", "value": "@name", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        {"title": "Number", "value": "number", "fieldType":"Textbox","dataType":"Number", "isDepricated": false},
                        //{"title": "Password", "value": "Password", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        {"title": "Person Name", "value": "person_name", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        {"title": "Percentage", "value": "percentage", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        {"title": "Phone Number", "value": "phone_number", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        //{"title": "Quantity(Deprecated)", "value": "quantity", "fieldType":"Textbox","dataType":"String", "isDepricated": true},
                        //{"title": "Quantity", "value": "quantityv2", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        {"title": "String", "value": "label", "fieldType":"Textbox","dataType":"String", "isDepricated": false}
                        //{"title": "Time", "value": "time", "fieldType":"Textbox","dataType":"String", "isDepricated": false},
                        //{"title": "Time Zone", "value": "timezone", "fieldType":"Time Zone","dataType":"String", "isDepricated": false},
                        //{"title": "To - number(maximum of a range, limit)", "value": "to_number", "fieldType":"Textbox","dataType":"Number", "isDepricated": false},
                        //{"title": "URL", "value": "url", "fieldType":"URL","dataType":"String", "isDepricated": false},
                        //{"title": "Zip Code", "value": "zipcode", "fieldType":"Textbox","dataType":"String", "isDepricated": false}
                        //{"title": "City", "value": "city"},
                    ];
                    constants.serviceSubType = [
                        {"title": "REST", "value": "rest"},
                        {"title": "SOAP", "value": "soap"}
                    ];
                    constants.channelInfo = {
                        emailPostFix: '{domain}@{emaildomain}'
                    };
                     constants.emailchannelInfo = {
                        emailPostFix: '@{emaildomain}'
                    };

                    constants.timerMsgs = {
                        warning: 'Warning ! {task} {type} edit session is about to expire.',
                        expiry: 'Oops! {task} {type} edit session is expired. Others will be able to claim access and edit this `{task}` {type} unless you extend in the next 1 min. So please extend session or save all your changes immediately'
                    };

                    constants.lockMsg = "Oops! The task is currently being edited by {user}. Until he releases access, you will not be able to edit this task.";

                    constants.timerTimeoutInMinutes = window.localStorage.timerExpiry ? +window.localStorage.timerExpiry : 30;
                    constants.entityColors = ["#0C3CDA", "#00D15F", "#FF7E00", "#9225CF", "#0C008B", "#008B56", "#A36600", "#5A038A", "#5749E6", "#5FDBAC", "#D4A351", "#A058C7"];

                    constants.messengerDomains = {
                        'https://qabots.kore.com': 'https://qa.kore.com',
                        'https://disney-bots.kore.com': 'https://disney-app.kore.com/',
                        'https://qa1-bots.kore.com': 'https://qa1.kore.com/',
                        'https://bots-int.kore.com': 'https://app-int.kore.com/',
                        'https://pilot-bots.kore.com': 'https://pilot-app.kore.com/',
                        'https://bots.kore.com': 'https://app.kore.com/',
                        'https://workflows-bots.kore.com':'https://workflows.kore.com',
                        'https://qa-bots.kore.ai': 'https://qa.kore.ai',
                        'https://qa1-bots.kore.ai': 'https://qa1.kore.ai/',
                        //'https://int-bots.kore.ai': 'https://app-int.kore.net/',
                        'https://pilot-bots.kore.ai': 'https://pilot-app.kore.com/',
                        'https://bots.kore.ai': 'https://app.kore.ai/',
                        'https://workflows-bots.kore.ai':'https://workflows.kore.com/',
                        'https://bots2.kore.ai':'https://app-int.kore.net'
                    };

                    constants.buySBEndpoints = {
                        'https://workflows-bots.kore.ai' : 'https://staging-testkore.cs50.force.com/eCommerce/Bot_Builder_Access_Request_Page',
                        'https://qa-bots.kore.ai': '',
                        'https://disney-bots.kore.com': '',
                        'https://qa1-bots.kore.ai': 'https://kore-testkore.cs23.force.com/eCommerce/Bot_Builder_Access_Request_Page',
                        'https://int-bots.kore.ai': '',
                        'https://pilot-bots.kore.com': 'https://pilot-testkore.cs51.force.com/eCommerce/Bot_Builder_Access_Request_Page',
                        'https://bots.kore.ai': 'https://testkore.secure.force.com/eCommerce/Bot_Builder_Access_Request_Page'
                    };


                    constants.errorMessages = {
                        '0':'Something went wrong! Try again later.',
                        '21': 'Account already exists',
                        '227':'Verification code is expired / not valid.',
                        'Identity exists': 'Identity already exists',
                        '52': 'New password should be different from your last five passwords',
                        SENT_FAILED: i18n.i18nString('constants.errorMessages_SENT_FAILED'),
                        ACCOUNT_LOCK: i18n.i18nString('constants.errorMessages_ACCOUNT_LOCK'),
                        INVALIDCREDS: i18n.i18nString('constants.errorMessages_INVALIDCREDS'),
                        invalidFileType: i18n.i18nString('constants.errorMessages_invalidFileType'),
                        CANT_BE_BLANK: i18n.i18nString('constants.errorMessage.error'),
                        INVALID_CREDENTIALS: i18n.i18nString('constants.errorMessages_INVALID_CREDENTIALS'),
                        ACCNTNOTACTIVE: i18n.i18nString('constants.errorMessages_ACCNTNOTACTIVE'),
                        INVALID_USER :i18n.i18nString('constants.errorMessages_INVALID_USER') ,
                        INVALID_ACCESS_TOKEN: i18n.i18nString('constants.errorMessages_INVALID_ACCESS_TOKEN'),
                        "Invalid credentials": "Invalid credentials",
                        NETWORK_NOT_FOUND: i18n.i18nString('constants.errorMessages_NETWORK_NOT_FOUND'),
                        ONLYGODKNOW: i18n.i18nString('constants.errorMessages_ONLYGODKNOW'),
                        PASSWORD_INVALID: i18n.i18nString('constants.errorMessages_PASSWORD_INVALID'),
                        iD_ALREADY_REGISTERD: i18n.i18nString('constants.errorMessages_iD_ALREADY_REGISTERD'),
                        GENERIC_ERROR: i18n.i18nString('constants.errorMessages_GENERIC_ERROR'),
                        INVALID_TOKEN: i18n.i18nString('constants.errorMessages_INVALID_TOKEN'),
                        EMPTY_RESP:i18n.i18nString('constants.errorMessages_EMPTY_RESP') ,
                        INVALID_EMAIL_PNo: i18n.i18nString('constants.errorMessages_INVALID_EMAIL_PNo'),
                        Invalid_EMAIL_DUP: i18n.i18nString('constants.errorMessages_Invalid_EMAIL_DUP'),
                        EMPTY_BODY: i18n.i18nString('constants.errorMessages_EMPTY_BODY'),
                        EMPTY_SUB_MEMO:i18n.i18nString('constants.errorMessages_EMPTY_SUB_MEMO') ,
                        'Invalid Server Error': "One or more recipients are invalid. Please remove them.",
                        PSWDS_NOT_MATCH: i18n.i18nString('constants.errorMessages_PSWDS_NOT_MATCH'),
                        SERVICE_NOT_AVAILABLE: i18n.i18nString('constants.errorMessages_SERVICE_NOT_AVAILABLE'),
                        FILES_LOADING: i18n.i18nString('constants.errorMessages_FILES_LOADING'),
                        PASSWORD_RESET_FAILED:i18n.i18nString('constants.errorMessages_PASSWORD_RESET_FAILED') ,
                        PASSWORD_LINK_EXPIRED: i18n.i18nString('constants.errorMessages_PASSWORD_LINK_EXPIRED'),
                        PASSWORD_LINK_INVALID: i18n.i18nString('constants.errorMessages_PASSWORD_LINK_INVALID'),
                        NO_USER_FOUND: i18n.i18nString('constants.errorMessages_NO_USER_FOUND'),
                        NOT_AN_ACTIVE_USER:i18n.i18nString('constants.errorMessages_NOT_AN_ACTIVE_USER') ,
                        RESET_ERROR: i18n.i18nString('constants.errorMessages_RESET_ERROR'),
                        INTERNAL_SERVER_ERROR: i18n.i18nString('constants.errorMessages_INTERNAL_SERVER_ERROR'),
                        TOKEN_EXPIRED: i18n.i18nString('constants.errorMessages_TOKEN_EXPIRED'),
                        'Account is locked': 'Account is Locked.',
                        SUSPENDED_USER: i18n.i18nString('constants.errorMessages_SUSPENDED_USER'),
                        iD_AWAITING_ACTIVATION: i18n.i18nString('constants.errorMessages_iD_AWAITING_ACTIVATION'),
                        USER_REG_ERROR: i18n.i18nString('constants.errorMessages_USER_REG_ERROR'),
                        TOKEN_NOT_VALID: i18n.i18nString('constants.errorMessages_TOKEN_NOT_VALID'),
                        TOKEN_VALIDATION_ERROR: i18n.i18nString('constants.errorMessages_TOKEN_VALIDATION_ERROR'),
                        TOKEN_ACTIVATION_ERROR: i18n.i18nString('constants.errorMessages_TOKEN_ACTIVATION_ERROR'),
                        RESEND_ERROR: i18n.i18nString('constants.errorMessages_RESEND_ERROR'),
                        PTMPLT_CANTSAVE_WITHDATE: i18n.i18nString('constants.errorMessages_PTMPLT_CANTSAVE_WITHDATE'),
                        PTMPLT_CANTSAVE_WITH_EMPTY: i18n.i18nString('constants.errorMessages_PTMPLT_CANTSAVE_WITH_EMPTY'),
                        PTMPLT_CANTSAVE_WITHPEOPLESELECTION: i18n.i18nString('constants.errorMessages_PTMPLT_CANTSAVE_WITHPEOPLESELECTION'),
                        EXPDT_LT_DDT: i18n.i18nString('constants.errorMessages_EXPDT_LT_DDT'),
                        EXPDT_LT_ACCDT: i18n.i18nString('constants.errorMessages_EXPDT_LT_ACCDT'),
                        PTMPLT_CANTSAVE_WITHPEPS: i18n.i18nString('constants.errorMessages_PTMPLT_CANTSAVE_WITHPEPS'),
                        PTMPLT_NOTENOUGHT_TOPLAY: i18n.i18nString('constants.errorMessages_PTMPLT_NOTENOUGHT_TOPLAY'),
                        SAVE_DRAFT: i18n.i18nString('constants.errorMessages_SAVE_DRAFT'),
                        SAVE_EDITED_DRFT: i18n.i18nString('constants.errorMessages_SAVE_EDITED_DRFT'),
                        PROFESSIONAL_IDENTITY_ADDED: i18n.i18nString('constants.errorMessages_PROFESSIONAL_IDENTITY_ADDED'),
                        EXIST_ACCNT_ALERT_1:i18n.i18nString('constants.errorMessages_EXIST_ACCNT_ALERT_1') ,
                        EXIST_ACCNT_ALERT_2: i18n.i18nString('constants.errorMessages_EXIST_ACCNT_ALERT_2'),
                        EXIST_ACCNT_ALERT_3: i18n.i18nString('constants.errorMessages_EXIST_ACCNT_ALERT_3'),
                        EXISTING_ACCNT_1: i18n.i18nString('constants.errorMessages_EXISTING_ACCNT_1'),
                        EXISTING_ACCNT_2: i18n.i18nString('constants.errorMessages_EXISTING_ACCNT_2'),
                        EXISTING_ACCNT_3: i18n.i18nString('constants.errorMessages_EXISTING_ACCNT_3'),
                        LEAVE_TEAM_NOTIFICATION: i18n.i18nString('constants.errorMessages_LEAVE_TEAM_NOTIFICATION'),
                        LICENSE_CHANGED: i18n.i18nString('constants.errorMessages_LICENSE_CHANGED'),
                        ADMIN_SSO_ENABLED: i18n.i18nString('constants.errorMessages_ADMIN_SSO_ENABLED'),
                        ADMIN_SSO_DISABLED: i18n.i18nString('constants.errorMessages_ADMIN_SSO_DISABLED'),
                        ADMIN_ACCOUNT_SUSPEND: i18n.i18nString('constants.errorMessages_ADMIN_ACCOUNT_SUSPEND')+'"    "'+i18n.i18nString('constants.errorMessages_INVALID_SSO_USER'),
                        INVALID_SSO_USER: i18n.i18nString('constants.errorMessages_ADMIN_ACCOUNT_SUSPEND')+'"  "'+i18n.i18nString('constants.errorMessages_INVALID_SSO_USER'),
                        ADMIN_PASSWORD_RESET: i18n.i18nString('constants.errorMessages_ADMIN_PASSWORD_RESET'),
                        PASSWORD_POLICY_CHANGED: i18n.i18nString('constants.errorMessages_PASSWORD_POLICY_CHANGED'),
                        PASSWORD_EXPIRED: i18n.i18nString('constants.errorMessages_PASSWORD_EXPIRED'),
                        SESSION_EXPIRED: i18n.i18nString('constants.errorMessages_SESSION_EXPIRED'),
                        MUTE_SETTINGS_ERROR: i18n.i18nString('constants.errorMessages_MUTE_SETTINGS_ERROR'),
                        ADMIN_KILLED_SESSION: i18n.i18nString('constants.errorMessages_ADMIN_KILLED_SESSION'),
                        USAGE_POLICY_CHANGED: i18n.i18nString('constants.errorMessages_USAGE_POLICY_CHANGED'),
                        ADMIN_ACCOUNT_DELETED: i18n.i18nString('constants.errorMessages_ADMIN_ACCOUNT_DELETED'),
                        IDENTITY_CHANGED: i18n.i18nString('constants.errorMessages_IDENTITY_CHANGED'),
                        PSWD_CHNG_FAIL: i18n.i18nString('constants.errorMessages_PSWD_CHNG_FAIL'),
                        PSWD_CHNG_POLICY_FAIL: i18n.i18nString('constants.errorMessages_PSWD_CHNG_POLICY_FAIL'),
                        delLocNonKore: i18n.i18nString('constants.errorMessages_delLocNonKore'),
                        LEAVE_THREAD_ERR: i18n.i18nString('constants.errorMessages_LEAVE_THREAD_ERR'),
                        ERROR_DELETE: i18n.i18nString('constants.errorMessages_ERROR_DELETE'),
                        ERROR_GETEMAIL: i18n.i18nString('constants.errorMessages_ERROR_GETEMAIL'),
                        CnLOGIN: i18n.i18nString('constants.errorMessages_CnLOGIN'),
                        SMTHNGWNTWRONG: i18n.i18nString('constants.errorMessages_SMTHNGWNTWRONG'),
                        ROOM_SAVE_ERROR:i18n.i18nString('constants.errorMessages_ROOM_SAVE_ERROR') ,
                        DELETE_POST_FAILED: i18n.i18nString('constants.errorMessages_DELETE_POST_FAILED'),
                        DELETE_SECUREEMAIL_FAILED: i18n.i18nString('constants.errorMessages_DELETE_SECUREEMAIL_FAILED'),
                        DATA_POST_FAIL: i18n.i18nString('constants.errorMessages_DATA_POST_FAIL') 
                    };

                    /*country codes*/
                    constants.countryCodes = [
            {name: "Albania", value: "+355"},
            {name: "Algeria", value: "+213"},
            {name: "American Samoa", value: "+1-684"},
            {name: "Andorra", value: "+376"},
            {name: "Angola", value: "+244"},
            {name: "Anguilla", value: "+1-264"},
            {name: "Antarctica", value: "+672"},
            {name: "Argentina", value: "+54"},
            {name: "Armenia", value: "+374"},
            {name: "Aruba", value: "+297"},
            {name: "Australia", value: "+61"},
            {name: "Austria", value: "+43"},
            {name: "Azerbaijan", value: "+994"},
            {name: "Bahamas", value: "+1-242"},
            {name: "Bahrain", value: "+973"},
            {name: "Bangladesh", value: "+880"},
            {name: "Barbados", value: "+1-246"},
            {name: "Belarus", value: "+375"},
            {name: "Belgium", value: "+32"},
            {name: "Belize", value: "+501"},
            {name: "Benin", value: "+229"},
            {name: "Bermuda", value: "+1-441"},
            {name: "Bhutan", value: "+975"},
            {name: "Bolivia", value: "+591"},
            {name: "Bonaire", value: "+535"},
            {name: "Botswana", value: "+267"},
            {name: "Bouvet Island", value: "+74"},
            {name: "Brazil", value: "+55"},
            {name: "Brunei Darussalam", value: "+673"},
            {name: "Bulgaria", value: "+359"},
            {name: "Burkina Faso", value: "+226"},
            {name: "Burundi", value: "+257"},
            {name: "Cambodia", value: "+855"},
            {name: "Cameroon", value: "+237"},
            {name: "Canada", value: "+1"},
            {name: "Chad", value: "+235"},
            {name: "Chile", value: "+56"},
            {name: "China", value: "+86"},
            {name: "Christmas Island", value: "+61-8"},
            {name: "Colombia", value: "+57"},
            {name: "Comoros", value: "+269"},
            {name: "Congo", value: "+242"},
            {name: "Cook Islands", value: "+682"},
            {name: "Costa Rica", value: "+506"},
            {name: "Croatia", value: "+385"},
            {name: "Cuba", value: "+53"},
            {name: "Curacao", value: "+599"},
            {name: "Cyprus", value: "+357"},
            {name: "Czech Republic", value: "+420"},
            {name: "Denmark", value: "+45"},
            {name: "Djibouti", value: "+253"},
            {name: "Dominica", value: "+1-767"},
            {name: "Dominican Republic", value: "+1-809"},
            {name: "Ecuador", value: "+593"},
            {name: "Egypt", value: "+20"},
            {name: "El Salvador", value: "+503"},
            {name: "Equatorial  Guinea", value: "+240"},
            {name: "Eritrea", value: "+291"},
            {name: "Estonia", value: "+372"},
            {name: "Ethiopia", value: "+251"},
            {name: "Falkland Islands", value: "+500"},
            {name: "Faroe Islands", value: "+298"},
            {name: "Fiji Islands", value: "+679"},
            {name: "Finland", value: "+358"},
            {name: "France", value: "+33"},
            {name: "French", value: "+260"},
            {name: "Gabon", value: "+241"},
            {name: "Gambia", value: "+220"},
            {name: "Georgia", value: "+995"},
            {name: "Germany", value: "+49"},
            {name: "Ghana", value: "+233"},
            {name: "Gibraltar", value: "+350"},
            {name: "Greece", value: "+30"},
            {name: "Greenland", value: "+299"},
            {name: "Grenada", value: "+1-473"},
            {name: "Guam", value: "+1-671"},
            {name: "Guatemala", value: "+502"},
            {name: "Guernsey", value: "+831"},
            {name: "Guinea", value: "+224"},
            {name: "Guyana", value: "+592"},
            {name: "Haiti", value: "+509"},
            {name: "Honduras", value: "+504"},
            {name: "Hong Kong", value: "+852"},
            {name: "Hungary", value: "+36"},
            {name: "Iceland", value: "+354"},
            {name: "India", value: "+91"},
            {name: "Indonesia", value: "+62"},
            {name: "Iran", value: "+98"},
            {name: "Iraq", value: "+964"},
            {name: "Ireland", value: "+353"},
            {name: "Isle of Man", value: "+44"},
            {name: "Israel", value: "+972"},
            {name: "Italy", value: "+39"},
            {name: "Jamaica", value: "+1-876"},
            {name: "Japan", value: "+81"},
            {name: "Jersey", value: "+832"},
            {name: "Jordan", value: "+962"},
            {name: "Kazakhstan", value: "+7"},
            {name: "Kenya", value: "+254"},
            {name: "Kiribati", value: "+686"},
            {name: "Korea,Republic of South", value: "+82"},
            {name: "Kuwait", value: "+965"},
            {name: "Kyrgyzstan", value: "+996"},
            {name: "Laos", value: "+856"},
            {name: "Latvia", value: "+371"},
            {name: "Lebanon", value: "+961"},
            {name: "Lesotho", value: "+266"},
            {name: "Liberia", value: "+231"},
            {name: "Libya", value: "+218"},
            {name: "Liechtenstein", value: "+423"},
            {name: "Lithuania", value: "+370"},
            {name: "Luxembourg", value: "+352"},
            {name: "Macao", value: "+853"},
            {name: "Macedonia", value: "+389"},
            {name: "Madagascar", value: "+261"},
            {name: "Malawi", value: "+265"},
            {name: "Malaysia", value: "+60"},
            {name: "Maldives", value: "+960"},
            {name: "Mali", value: "+223"},
            {name: "Malta", value: "+356"},
            {name: "Marshall Islands", value: "+692"},
            {name: "Martinique", value: "+596"},
            {name: "Mauritania", value: "+222"},
            {name: "Mauritius", value: "+230"},
            {name: "Mayotte", value: "+269"},
            {name: "Mexico", value: "+52"},
            {name: "Micronesia", value: "+691"},
            {name: "Moldova", value: "+373"},
            {name: "Monaco", value: "+377"},
            {name: "Mongolia", value: "+976"},
            {name: "Montenegro", value: "+382"},
            {name: "Montserrat", value: "+1-664"},
            {name: "Morocco", value: "+212"},
            {name: "Mozambique", value: "+258"},
            {name: "Myanmar", value: "+95"},
            {name: "Namibia", value: "+264"},
            {name: "Nauru", value: "+674"},
            {name: "Nepal", value: "+977"},
            {name: "Netherlands", value: "+31"},
            {name: "New Caledonia", value: "+687"},
            {name: "New Zealand", value: "+64"},
            {name: "Nicaragua", value: "+505"},
            {name: "Niger", value: "+227"},
            {name: "Nigeria", value: "+234"},
            {name: "Niue", value: "+683"},
            {name: "Norfolk Island", value: "+672"},
            {name: "Northern Marianas Islands", value: "+1-670"},
            {name: "Norway", value: "+47"},
            {name: "Oman", value: "+968"},
            {name: "Pakistan", value: "+92"},
            {name: "Palau", value: "+680"},
            {name: "Panama", value: "+507"},
            {name: "Papua New Guinea", value: "+675"},
            {name: "Paraguay", value: "+595"},
            {name: "Peru", value: "+51"},
            {name: "Philippines", value: "+63"},
            {name: "Poland", value: "+48"},
            {name: "Portugal", value: "+351"},
            {name: "Puerto Rico", value: "+1-787"},
            {name: "Qatar", value: "+974"},
            {name: "Reunion Island", value: "+262"},
            {name: "Romania", value: "+40"},
            {name: "Russia", value: "+7"},
            {name: "Rwanda", value: "+250"},
            {name: "Samoa", value: "+685"},
            {name: "San Marino", value: "+378"},
            {name: "Saudi Arabia", value: "+966"},
            {name: "Senegal", value: "+221"},
            {name: "Serbia", value: "+381"},
            {name: "Seychelles", value: "+248"},
            {name: "Sierra Leone", value: "+232"},
            {name: "Singapore", value: "+65"},
            {name: "Slovenia", value: "+386"},
            {name: "Solomon Islands", value: "+677"},
            {name: "Sudan", value: "+249"},
            {name: "Spain", value: "+34"},
            {name: "Sri Lanka", value: "+94"},
            {name: "Suriname", value: "+597"},
            {name: "Swaziland", value: "+268"},
            {name: "Switzerland", value: "+41"},
            {name: "Syria", value: "+963"},
            {name: "Taiwan", value: "+886"},
            {name: "Tajikistan", value: "+992"},
            {name: "Tanzania", value: "+255"},
            {name: "Thailand", value: "+66"},
            {name: "Timor-Leste", value: "+670"},
            {name: "Tokelau", value: "+690"},
            {name: "Tonga Islands", value: "+676"},
            {name: "Turkey", value: "+90"},
            {name: "Turkmenistan", value: "+993"},
            {name: "Tuvalu", value: "+688"},
            {name: "Uganda", value: "+256"},
            {name: "United Arab Emirates", value: "+971"},
            {name: "United Kingdom", value: "+44"},
            {name: "United States", value: "+1"},
            {name: "Uruguay", value: "+598"},
            {name: "Uzbekistan", value: "+998"},
            {name: "Vanuatu", value: "+678"},
            {name: "Venezuela", value: "+58"},
            {name: "VietNam", value: "+84"},
            {name: "Virgin Islands British", value: "+92"},
            {name: "U.S Virgin Islands", value: "+1-340"},
            {name: "Wallis and Futuna", value: "+681"},
            {name: "Western Sahara", value: "+732"},
            {name: "Yemen", value: "+967"},
            {name: "Zambia", value: "+260"},
            {name: "Zimbabwe", value: "+263"}];
                    /*Endof country codes*/


                    constants.twilioLanSelect = [
//                        {name: "Afrikaans (South Africa)", value: "af-ZA"},
//                        {name: "Amharic (Ethiopia)", value: "am-ET"},
//                        {name: "Armenian (Armenia)", value: "hy-AM"},
//                        {name: "Azerbaijani (Azerbaijani)", value: "az-AZ"},
//                        {name: "Indonesian (Indonesia)", value: "id-ID"},
//                        {name: "Malay (Malaysia)", value: "ms-MY"},
//                        {name: "Bengali (Bangladesh)", value: "bn-BD"},
//                        {name: "Bengali (India)", value: "bn-IN"},
//                        {name: "Catalan (Spain)", value: "ca-ES"},
//                        {name: "Czech (Czech Republic)", value: "cs-CZ"},
//                        {name: "Danish (Denmark)", value: "da-DK"},
//                        {name: "German (Germany)", value: "de-DE"},
                        {name: "English (Australia)", value: "en-AU"},
                        {name: "English (Canada)", value: "en-CA"},
                        {name: "English (Ghana)", value: "en-GH"},
                        {name: "English (United Kingdom)", value: "en-GB"},
                        {name: "English (India)", value: "en-IN"},
                        {name: "English (Ireland)", value: "en-IE"},
                        {name: "English (Kenya)", value: "en-KE"},
                        {name: "English (New Zealand)", value: "en-NZ"},
                        {name: "English (Nigeria)", value: "en-NG"},
                        {name: "English (Philippines)", value: "en-PH"},
                        {name: "English (South Africa)", value: "en-ZA"},
                        {name: "English (Tanzania)", value: "en-TZ"},
                        {name: "English (United States)", value: "en-US"}
//                        {name: "Spanish (Argentina)", value: "es-AR"},
//                        {name: "Spanish (Bolivia)", value: "es-BO"},
//                        {name: "Spanish (Chile)", value: "es-CL"},
//                        {name: "Spanish (Colombia)", value: "es-CO"},
//                        {name: "Spanish (Costa Rica)", value: "es-CR"},
//                        {name: "Spanish (Ecuador)", value: "es-EC"},
//                        {name: "Spanish (El Salvador)", value: "es-SV"},
//                        {name: "Spanish (Spain)", value: "es-ES"},
//                        {name: "Spanish (United States)", value: "es-US"},
//                        {name: "Spanish (Guatemala)", value: "es-GT"},
//                        {name: "Spanish (Honduras)", value: "es-HN"},
//                        {name: "Spanish (Mexico)", value: "es-MX"},
//                        {name: "Spanish (Nicaragua)", value: "es-NI"},
//                        {name: "Spanish (Panama)", value: "es-PA"},
//                        {name: "Spanish (Paraguay)", value: "es-PY"},
//                        {name: "Spanish (Peru)", value: "es-PE"},
//                        {name: "Spanish (Puerto Rico)", value: "es-PR"},
//                        {name: "Spanish (Dominican Republic)", value: "es-DO"},
//                        {name: "Spanish (Uruguay)", value: "es-UY"},
//                        {name: "Spanish (Venezuela)", value: "es-VE"},
//                        {name: "Basque (Spain)", value: "eu-ES"},
//                        {name: "Filipino (Philippines) f", value: "il-PH"},
//                        {name: "French (Canada)", value: "fr-CA"},
//                        {name: "French (France)", value: "fr-FR"},
//                        {name: "Galician (Spain)", value: "gl-ES"},
//                        {name: "Georgian (Georgia)", value: "ka-GE"},
//                        {name: "Gujarati (India)", value: "gu-IN"},
//                        {name: "Croatian (Croatia)", value: "hr-HR"},
//                        {name: "Zulu (South Africa)", value: "zu-ZA"},
//                        {name: "Icelandic (Iceland)", value: "is-IS"},
//                        {name: "Italian (Italy)", value: "it-IT"},
//                        {name: "Javanese (Indonesia)", value: "jv-ID"},
//                        {name: "Kannada (India)", value: "kn-IN"},
//                        {name: "Khmer (Cambodian)", value: "km-KH"},
//                        {name: "Lao (Laos)", value: "lo-LA"},
//                        {name: "Latvian (Latvia)", value: "lv-LV"},
//                        {name: "Lithuanian (Lithuania)", value: "lt-LT"},
//                        {name: "Hungarian (Hungary)", value: "hu-HU"},
//                        {name: "Malayalam (India)", value: "ml-IN"},
//                        {name: "Marathi (India)", value: "mr-IN"},
//                        {name: "Dutch (Netherlands)", value: "nl-NL"},
//                        {name: "Nepali (Nepal)", value: "ne-NP"},
//                        {name: "Norwegian Bokm氓l (Norway)", value: "nb-NO"},
//                        {name: "Polish (Poland)", value: "pl-PL"},
//                        {name: "Portuguese (Brazil)", value: "pt-BR"},
//                        {name: "Portuguese (Portugal)", value: "pt-PT"},
//                        {name: "Romanian (Romania)", value: "ro-RO"},
//                        {name: "Sinhala (Sri Lanka)", value: "si-LK"},
//                        {name: "Slovak (Slovakia)", value: "sk-SK"},
//                        {name: "Slovenian (Slovenia)", value: "sl-SI"},
//                        {name: "Sundanese (Indonesia)", value: "su-ID"},
//                        {name: "Swahili (Tanzania)", value: "sw-TZ"},
//                        {name: "Swahili (Kenya)", value: "sw-KE"},
//                        {name: "Finnish (Finland)", value: "fi-FI"},
//                        {name: "Swedish (Sweden)", value: "sv-SE"},
//                        {name: "Tamil (India)", value: "ta-IN"},
//                        {name: "Tamil (Singapore)", value: "ta-SG"},
//                        {name: "Tamil (Sri Lanka)", value: "ta-LK"},
//                        {name: "Tamil (Malaysia)", value: "ta-MY"},
//                        {name: "Telugu (India)", value: "te-IN"},
//                        {name: "Vietnamese (Vietnam)", value: "vi-VN"},
//                        {name: "Turkish (Turkey)", value: "tr-TR"},
//                        {name: "Urdu (Pakistan)", value: "ur-PK"},
//                        {name: "Urdu (India)", value: "ur-IN"},
//                        {name: "Greek (Greece)", value: "el-GR"},
//                        {name: "Bulgarian (Bulgaria)", value: "bg-BG"},
//                        {name: "Russian (Russia)", value: "ru-RU"},
//                        {name: "Serbian (Serbia)", value: "sr-RS"},
//                        {name: "Ukrainian (Ukraine)", value: "uk-UA"},
//                        {name: "Hebrew (Israel)", value: "he-IL"},
//                        {name: "Arabic (Israel)", value: "ar-IL"},
//                        {name: "Arabic (Jordan)", value: "ar-JO"},
//                        {name: "Arabic (United Arab Emirates)", value: "ar-AE"},
//                        {name: "Arabic (Bahrain)", value: "ar-BH"},
//                        {name: "Arabic (Algeria)", value: "ar-DZ"},
//                        {name: "Arabic (Saudi Arabia)", value: "ar-SA"},
//                        {name: "Arabic (Iraq)", value: "ar-IQ"},
//                        {name: "Arabic (Kuwait)", value: "ar-KW"},
//                        {name: "Arabic (Morocco)", value: "ar-MA"},
//                        {name: "Arabic (Tunisia)", value: "ar-TN"},
//                        {name: "Arabic (Oman)", value: "ar-OM"},
//                        {name: "Arabic (State of Palestine)", value: "ar-PS"},
//                        {name: "Arabic (Qatar)", value: "ar-QA"},
//                        {name: "Arabic (Lebanon)", value: "ar-LB"},
//                        {name: "Arabic (Egypt)", value: "ar-EG"},
//                        {name: "Persian (Iran)", value: "fa-IR"},
//                        {name: "Hindi (India)", value: "hi-IN"},
//                        {name: "Thai (Thailand)", value: "th-TH"},
//                        {name: "Korean (South Korea)", value: "ko-KR"},
//                        {name: "Chinese, Mandarin (Traditional, Taiwan)", value: "cmn-Hant-TW"},
//                        {name: "Chinese, Cantonese (Traditional, Hong Kong)", value: "yue-Hant-HK"},
//                        {name: "Japanese (Japan)", value: "ja-JP"},
//                        {name: "Chinese, Mandarin (Simplified, Hong Kong)", value: "cmn-Hans-HK"},
//                        {name: "Chinese, Mandarin (Simplified, China)", value: "cmn-Hans-CN"}
                    ];
                    constants.propertyPanel = {
                        instanceProperties : i18n.i18nString('constants.propertyPanel_instanceProperties'),
                        componentProperties:i18n.i18nString('constants.propertyPanel_componentProperties'),
                        instanceConnections : i18n.i18nString('constants.propertyPanel_instanceConnections'),
                        Properties : i18n.i18nString('constants.propertyPanel_Properties'),
                        node : i18n.i18nString('constants.propertyPanel_node'),
                        connRules : i18n.i18nString('constants.propertyPanel_connRules'),
                        selectExistNode : i18n.i18nString('constants.propertyPanel_selectExistNode'),
                        addIf: i18n.i18nString('constants.propertyPanel_addIf'),
                        addElse : i18n.i18nString('constants.propertyPanel_addElse'),
                        unsaved: i18n.i18nString('constants.propertyPanel_unsaved'),
                        bottomText: i18n.i18nString('constants.propertyPanel_bottomText'),
                        headerText: i18n.i18nString('constants.propertyPanel_headerText'),
                        instanceHeaderText: i18n.i18nString('constants.propertyPanel_instanceHeaderText'),
                        isOptional: i18n.i18nString('constants.propertyPanel_isOptional'),
                        callDialog: i18n.i18nString('constants.propertyPanel_callDialog'),
                        isCallDialogText: i18n.i18nString('constants.propertyPanel_isCallDialogText'),
                        isSubIntentText: i18n.i18nString('constants.propertyPanel_isSubIntentText'),
                        isRequiredText: i18n.i18nString('constants.propertyPanel_isRequiredText'),
                        isOptionalText: i18n.i18nString('constants.propertyPanel_isOptionalText'),
                        sessionData: i18n.i18nString('constants.propertyPanel_sessionData'),
                        isArray: i18n.i18nString('constants.propertyPanel_isArray'),
                        arraySize: i18n.i18nString('constants.propertyPanel_arraySize'),
                        arrayDataText: i18n.i18nString('constants.propertyPanel_arrayDataText'),
                        arrayDefaultDataText: i18n.i18nString('constants.propertyPanel_arrayDefaultDataText'),
                        sessionDataText: i18n.i18nString('constants.propertyPanel_sessionDataText'),
                        configText: i18n.i18nString('constants.propertyPanel_configText'),
                        configTextTip: i18n.i18nString('constants.propertyPanel_configTextTip'),
                        componentWarningInfo: i18n.i18nString('constants.propertyPanel_componentWarningInfo'),
                        generalSettings: i18n.i18nString('constants.propertyPanel_generalSettings'),
                        synonymDescription: i18n.i18nString('constants.propertyPanel_synonymDescription'),
                        patternsDescription: i18n.i18nString('constants.propertyPanel_patternsDescription'),
                        name: i18n.i18nString('constants.propertyPanel_name'),
                        uiForm: i18n.i18nString("constants.propertyPanel_uiForm"),
                        displayName:i18n.i18nString('constants.propertyPanel_displayName'),
                        serviceType: i18n.i18nString('constants.propertyPanel_serviceType'),
                        description: i18n.i18nString('constants.propertyPanel_description'),
                        type: i18n.i18nString('constants.propertyPanel_type'),
                        subType: i18n.i18nString('constants.propertyPanel_subType'),
                        dataType: i18n.i18nString('constants.propertyPanel_dataType'),
                        continent: i18n.i18nString('constants.propertyPanel_continent'),
                        country: i18n.i18nString('constants.propertyPanel_country'),
                        state: i18n.i18nString('constants.propertyPanel_state'),
                        userPrompt: i18n.i18nString('constants.propertyPanel_userPrompt'),
                        userMessage: i18n.i18nString('constants.propertyPanel_userMessage'),
                        errorMessage: i18n.i18nString('constants.propertyPanel_errorMessage'),
                        submitMessage: i18n.i18nString('constants.propertyPanel_submitMessage'),
                        sampleContext: i18n.i18nString('constants.propertyPanel_sampleContext'),
                        amountPaid: i18n.i18nString('constants.propertyPanel_amountPaid'),
                        default: i18n.i18nString('constants.propertyPanel_default'),
                        editPropmts: i18n.i18nString('constants.propertyPanel_editPropmts'),
                        managePropmts: i18n.i18nString('constants.propertyPanel_managePropmts'),
                        manageSubmits: i18n.i18nString('constants.propertyPanel_manageSubmits'),
                        entityPromptText: i18n.i18nString('entityPromptText'),
                        sampleUsrRes: i18n.i18nString('constants.propertyPanel_sampleUsrRes'),
                        sampleRes: i18n.i18nString('constants.propertyPanel_sampleRes'),
                        suggestSyn: i18n.i18nString('constants.propertyPanel_suggestSyn'),
                        defaultAddPattern: i18n.i18nString('constants.propertyPanel_defaultAddPattern'),
                        addPattern: i18n.i18nString('constants.propertyPanel_addPattern'),
                        entityBotton: i18n.i18nString('constants.propertyPanel_entityBotton'),
                        intentBotton: i18n.i18nString('constants.propertyPanel_intentBotton'),
                        shareAcrossIntents: i18n.i18nString('constants.propertyPanel_shareAcrossIntents'),
                        userPromptsHelp :i18n.i18nString('constants.propertyPanel_userPromptsHelp') ,
                        intent : i18n.i18nString('constants.propertyPanel_intent'),
                        msgAndHook: i18n.i18nString('constants.propertyPanel_msgAndHook'),
                        onHook: i18n.i18nString('constants.propertyPanel_onHook'),
                        context: i18n.i18nString('constants.propertyPanel_context'),
                        staticList: i18n.i18nString('constants.propertyPanel_staticList'),
                        jsonData: i18n.i18nString('constants.propertyPanel_jsonData'),
                        listOfValues: i18n.i18nString('constants.propertyPanel_listOfValues'),
                        contextLbl: i18n.i18nString('constants.propertyPanel_contextLbl'),
                        contextTitleKey: i18n.i18nString('constants.propertyPanel_contextTitleKey'),
                        contextValKey: i18n.i18nString('constants.propertyPanel_contextValKey'),
                        contextSynonymsKey: i18n.i18nString('constants.propertyPanel_contextSynonymsKey'),
                        staticDrpLbl: i18n.i18nString('constants.propertyPanel_staticDrpLbl'),
                        reqDefinition:i18n.i18nString('constants.propertyPanel_reqDefinition') ,
                        scriptDefinition: i18n.i18nString('constants.propertyPanel_scriptDefinition'),
                        reqDefinitionText: i18n.i18nString('constants.propertyPanel_reqDefinitionText'),
                        scriptDefinitionText: i18n.i18nString('constants.propertyPanel_scriptDefinitionText'),
                        noReqDefinition: i18n.i18nString('constants.propertyPanel_noReqDefinition'),
                        noScriptDefinition: i18n.i18nString('constants.propertyPanel_noScriptDefinition'),
                        sampleResponse: i18n.i18nString('constants.propertyPanel_sampleResponse'),
                        sampleResText: i18n.i18nString('constants.propertyPanel_sampleResText'),
                        sampleResponseText: i18n.i18nString('constants.propertyPanel_sampleResponseText'),
                        sampleContextText: i18n.i18nString('constants.propertyPanel_sampleContextText'),
                        machineLearningTip: i18n.i18nString('constants.propertyPanel_machineLearningTip'),
                        contextMap: i18n.i18nString('constants.propertyPanel_contextMap'),
                        contextMapHeaderText: i18n.i18nString('constants.propertyPanel_ontextMapHeaderText'),
                        contextMapLoading: i18n.i18nString('constants.propertyPanel_contextMapLoading'),
                        emptyContenxtMap: i18n.i18nString('constants.propertyPanel_emptyContenxtMap'),
                        postContextMap: i18n.i18nString('constants.propertyPanel_postContextMap'),
                        postContextMapHeaderText: i18n.i18nString('constants.propertyPanel_postContextMapHeaderText'),
                        postContextMapLoading: i18n.i18nString('constants.propertyPanel_postContextMapLoading'),
                        emptyPostContenxtMap: i18n.i18nString('constants.propertyPanel_emptyPostContenxtMap'),
                        errorPromts: i18n.i18nString('constants.propertyPanel_errorPromts'),
                        editErrors: i18n.i18nString('constants.propertyPanel_editErrors'),
                        listofValuesProtip1: i18n.i18nString('constants.propertyPanel_listofValuesProtip1'),
                        listofValuesProtip2: i18n.i18nString('constants.propertyPanel_listofValuesProtip2'),
                        listofValuesProtip3: i18n.i18nString('constants.propertyPanel_listofValuesProtip3'),
                        contextLookupProtip: i18n.i18nString('constants.propertyPanel_contextLookupProtip'),
                        contextLookupProtip2: i18n.i18nString('constants.propertyPanel_contextLookupProtip2'),
                        entityTypeTip: i18n.i18nString('constants.propertyPanel_entityTypeTip'),
                        lookupFileuploadProTip1: i18n.i18nString('constants.propertyPanel_lookupFileuploadProTip1'),
                        unitType: i18n.i18nString('constants.propertyPanel_unitType'),
                        defaultUnit: i18n.i18nString('constants.propertyPanel_defaultUnit'),
                        displayListOfvalues: i18n.i18nString('constants.propertyPanel_displayListOfvalues'),
                        dontDisplayListOfvalues: i18n.i18nString('constants.propertyPanel_dontDisplayListOfvalues'),
                        displayConfirmationOptions: i18n.i18nString('constants.propertyPanel_displayConfirmationOptions'),
                        dontDisplayConfirmationOptions: i18n.i18nString('constants.propertyPanel_dontDisplayConfirmationOptions'),
                        userPromptFromDate: i18n.i18nString('constants.propertyPanel_userPromptFromDate'),
                        userPromptToDate: i18n.i18nString('constants.propertyPanel_userPromptToDate'),
                        userErrorPromptFromDate: i18n.i18nString('constants.propertyPanel_userErrorPromptFromDate'),
                        userErrorPromptToDate: i18n.i18nString('constants.propertyPanel_userErrorPromptToDate'),
                        entityOptionMandatory : i18n.i18nString('constants.propertyPanel_entityOptionMandatory'),
                        entityOptionOptional : i18n.i18nString('constants.propertyPanel_entityOptionOptional'),
                        entityOptionHidden : i18n.i18nString('constants.propertyPanel_entityOptionHidden'),
                        noReuse : i18n.i18nString('constants.propertyPanel_noReuse'),
                        reuse : i18n.i18nString('constants.propertyPanel_reuse')
                    };
                    constants.runbotConfig = {
                        runbotConfigDesc : i18n.i18nString('constants.runbotConfig_runbotConfigDesc'),
                        chooseSampleData: i18n.i18nString('constants.runbotConfig_chooseSampleData'),
                        offlineModeNote: i18n.i18nString('constants.runbotConfig_offlineModeNote'),
                        offlineModeUnavailable : i18n.i18nString('constants.runbotConfig_offlineModeUnavailable')
                    };
                    constants.botKitSdk = {
                        botkitSDKdesc : i18n.i18nString('botkitSDKdesc'),
                        registerApp : i18n.i18nString('constants.botKitSdk_registerApp'),
                        defineCallbackURL : i18n.i18nString('constants.botKitSdk_defineCallbackURL'),
                        selectEvents : i18n.i18nString('constants.botKitSdk_selectEvents'),
                        agentTransferDesc : i18n.i18nString('constants.botKitSdk_agentTransferDesc'),
                        defineDialog : i18n.i18nString('constants.botKitSdk_defineDialog'),
                        integrateAgentSoft : i18n.i18nString('integrateAgentSoft'),
                        enableChannel : i18n.i18nString('enableChannel'),
                        webMobileSDK :i18n.i18nString('constants.botKitSdk_webMobileSDK')
                    };

                    constants.conversationFlow = {
                        //nodesToDisplay has to be greater than 4
                        'nodesToDisplay': 20,
                        'nodesToDisplayOnOthers': 8
                    };

                    /*Quantity type and values*/

                    constants.quantityTypes = [
                        {
                            key:"length",
                            values:{
                                "kilometer":"kilometer",
                                //"decameter":"decameter",
                                "meter":"meter",
                                //"decimeter":"decimeter",
                                "centimeter":"centimeter",
                                //"millimeter":"millimeter",
                                //"micrometer":"micrometer",
                                //"micron":"micron",
                                //"nanomemter":"nanomemter",
                                "inch":"inch",
                                "foot":"foot",
                                "yard":"yard",
                                "mile":"mile"
                                //"nautical mile":"nautical_mile",
                                //"fathom":"fathom"
                            },
                            defaultValue:"meter"
                        },
                        {
                            key:"area",
                            values:{
                                "square kilometer":"square_kilometer",
                                "square meter":"square_meter",
                                //"square centimeter":"square_centimeter",
                                //"square millimeter":"square_millimeter",
                                //"hectare":"hectare",
                                "square mile":"square_mile",
                                "square yard":"square_yard",
                                "square foot":"square_foot"
                                //"square inch":"square_inch",
                                //"acre":"acre"
                            },
                            defaultValue:"square_meter"
                        },
                        {
                            key:"volume",
                            values:{
                                "cubic meter":"cubic_meter",
                                "litre":"litre",
                                "millilitre":"millilitre",
                                //"cubic foot":"cubic_foot",
                                //"cubic inch":"cubic_inch",
                                "gallon":"gallon",
                                //"quart":"quart",
                                //"pint":"pint",
                                //"cap":"cap",
                                "ounce":"ounce"
                                /*"fluid ounce":"fluid_ounce",
                                "tablespoon":"tablespoon",
                                "teaspoon":"teaspoon",
                                "imperial gallon":"imperial_gallon",
                                "imperial quart":"imperial_quart",
                                "imperial pint":"imperial_pint",
                                "imperial cap":"imperial_cap",
                                "imperial fluid ounce":"imperial_fluid ounce",
                                "imperial teaspoon":"imperial_teaspoon",
                                "imperial tablespoon":"imperial_tablespoon"*/
                            },
                            defaultValue:"litre"
                        },
                        {
                            key:"time",
                            values:{
                                //"week":"week",
                                //"year":"year",
                                //"month":"month",
                                "day":"day",
                                "hour":"hour",
                                "minute":"minute",
                                "second":"second",
                                "millisecond":"millisecond"
                                //"microsecond":"microsecond",
                                //"nanosecond":"nanosecond"
                            },
                            defaultValue:"second"
                        },
                        {
                            key:"speed",
                            values:{
                                "meters per second":"meter_per_second",
                                "kilometers per hour":"kilometer_per_hour",
                                //"feet per second":"feet_per_second",
                                "miles per hour":"miles_per_hour"
                                //"knot":"knot",
                                //"speed of sound":"speed of sound",
                                //"speed of light":"speed_of_light"
                            },
                            defaultValue:"meter_per_second"
                        },
                        {
                            key:"pressure",
                            values:{
                                "pascal":"pascal",
                                "Standard atmosphere":"atmosphere",
                                "bar":"bar"
                                //"millimeter of mercury":"mmhg",
                                //"torr":"torr",
                                //"pounds per square inch":"psi"
                            },
                            defaultValue:"pascal"
                        },
                        {
                            key:"energy",
                            values:{
                                //"joule":"joule",
                                //"kilojoule":"kilojoule",
                                "calorie":"calorie",
                                "kilocalorie":"kilocalorie",
                                "watt hour":"watt_hour",
                                "kilowatt hour":"kilowatt_hour"
                                //"british thermal unit":"british_thermal_unit"
                            },
                            //defaultValue:"joule"
                            defaultValue:"calorie"
                        },
                        {
                            key:"memory",
                            values:{
                                "bit":"bit",
                                "byte":"byte",
                                "kilobyte":"kilobyte",
                                "megabyte":"megabyte",
                                "gigabyte":"gigabyte",
                                "terabyte":"terabyte"
                            },
                            defaultValue:"bit"
                        },
                        {
                            key:"weight",
                            values:{
                                //"metric ton": "metric_ton",
                                "ton": "ton",
                                "kilogram": "kilogram",
                                "gram": "gram",
                                //"milligram": "milligram",
                                //"microgram": "microgram",
                                //"us ton":"us_ton",
                                //"imperial ton":"imperial_ton",
                                //"stone":"stone",
                                "pound": "pound",
                                "ounce": "ounce"
                            },
                            defaultValue:"gram"
                        },
                        {
                            key:"angle",
                            values:{
                                "degree":"degree"
                                //"radian":"radian",
                                //"gradian":"gradian",
                                //"minute of arc":"minute_of_arc",
                                //"second of arc":"second_of_arc"
                            },
                            defaultValue:"degree"
                        },
                        {
                            key:"temperature",
                            values:{
                                "celsius":"celsius",
                                "fahrenheit":"fahrenheit"
                                //"kelvin":"kelvin"
                            },
                            defaultValue:"celsius"
                        },
                        {
                            key:"age",
                            values:{
                                "day":"day",
                                "week":"week",
                                "month":"month",
                                "year":"year",
                                "decade":"decade",
                                "century":"century"

                            },
                            defaultValue:"month"
                        }

                    ];


                     // composite entity @mentions

                    constants.compositeAtMentions = [];

                    $.each(constants.entityNlp, function(i, obj){
                        var _object = {label:obj.value};
                        constants.compositeAtMentions.push(_object);
                    });

                    $.each(constants.quantityTypes, function(i, obj){
                        var _object = {label:"quantity-"+obj.key};
                        constants.compositeAtMentions.push(_object);
                    });

                    // End of composite entity @mentions


                    /*End of Quantity type and values*/

                    constants.getNewMessage = function (mainMsg, replaceString, newMsg) {
                        newMsg = newMsg || '';
                        if (mainMsg && mainMsg.length > 0 && replaceString && replaceString.length > 0) {
                            var regex = new RegExp(replaceString, 'g');
                            return mainMsg.replace(regex, newMsg);
                        }
                    };
                    constants.languageSettings = {
                        enableLanguageTitle :i18n.i18nString('constants.languageSettings_enableLanguageTitle') ,
                        enableLanguageProtip :i18n.i18nString('constants.languageSettings_enableLanguageProtip'),
                        enableLanguageNote :i18n.i18nString('constants.languageSettings_enableLanguageNote') 
                    };
                    
                    //$rootScope.developerURL = 'http://multisite.korebots.com';
       

                   
                   //script for RAND HELP LINKS GENERATION
//                    var _helpStr="";
//                    var count=0;
//                     var _regExForLink = /((?:http\:\/\/|https\:\/\/|www\.)+\S*\.(?:(?:\.\S)*[^\,",\s\.])*\/?)/gi;
//                    function linkreplacer(match, p1, offset, string) {
//                        var found=false;
//                        Object.keys($rootScope.helpLinks).forEach(function(key){
//                            if(key==="INFORMATION_REQ_SOAP" && match=="https://developer.kore.ai/docs/bots/bot-builder/defining-bot-tasks/create-a-report-task/api-request-tab-information-task-soap/"){
//                                debugger;
//                            }
//                            if ($rootScope.helpLinks[key]===match) {
//                                found=key;
//                            } 
//                        })
//                        
//                        if (found) {
//                            //console.log("Rsound:"+match);
//                            return "{{helpLinks." + found + "}}";
//
//                        }else{
//                            count++;
//                            var x=match.substring(match.indexOf('https://developer.kore.ai/docs')+30,match.length)
//                            var y="$rootScope.helpLinks.RAND_"+count+"=helpDocsURL+'"+x+"'";
//                            //console.warn(y);
//                            
//                            _helpStr=_helpStr+'\n'+y+";";
//                        }
//
//                    }
//                    $.get('http://dev.kore.ai/js/components/help-content/help-content.js',function(str){
//                        var newStr='';
//                        newStr= str.replace(_regExForLink, linkreplacer);
//                        console.log("_helpStr:"+newStr);
//                        //console.log("_helpStr:"+_helpStr);
//                        debugger;
//                    })
                        
                    };
                    return constants;

                }])

            .filter('plaintext', function () {
                return function (input) {
                    return (input || '').replace(/<%|%>/g, '').replace(/printf/g, 'print');
                };
            })

            .filter('customDateTime',function(){
                return function(timestamp){
                    var d = moment(timestamp).format('MM-DD-YYYY');
                    var dateStr = moment(timestamp).format('MMMM Do YYYY, h:mm:ss a').split(',')[1];
                    var timeStamp = dateStr.split(':');
                   return d + ',' + timeStamp[0] + ":" + timeStamp[1] + " " + timeStamp[2].split(" ")[1];
                };
                
            })

            .filter('displayData',function(){
                return function(input,start){
                    return input.slice((start - 1) * 10,start*10);
                };
            })

            .factory('color', [function () {
                    return {
                        generate: function () {
                            /*jshint bitwise: false*/
                            return "#" + ((1 << 24) * Math.random() | 0).toString(16);
                        }
                    };
                }])
            
            .factory('botUtil', [function () {
                    function _percentageSessionsUsed(bot) {
                        if (bot && bot.license) {
                            if (bot.license.baseAllowedRequests !== undefined && bot.license.requestsUsed !== undefined) {
                                return Math.round((bot.license.requestsUsed / (bot.license.baseAllowedRequests)) * 100);
                            } else {
                                return undefined;
                            }
                        } else {
                            return undefined;
                        }
                    }
                    function isBotAboutToExpire(bot) {
                        if ((bot && bot.type) && (bot.type !== 'sample' && bot.type !== 'solution')) {
                            var percentageUsed = _percentageSessionsUsed(bot);
                            if (percentageUsed !== undefined) {
                                if (percentageUsed >= 80) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    }
                    return {
                        percentageSessionsUsed: _percentageSessionsUsed,
                        isTrialAboutToExpire: function (bot) {
                            //currently show only for online accounts
                            if (bot && bot.license && bot.license.billingType === 'free') {
                                return isBotAboutToExpire(bot);
                            } else {
                                return false;
                            }

                        },
                        isPaidAboutToExpire: function (bot) {
                            //currently show only for online accounts
                            if (bot && bot.license && bot.license.billingType === 'paid') {
                                return isBotAboutToExpire(bot);
                            } else {
                                return false;
                            }

                        },
                        
                        isExpired:function(bot){
                           //currently show only for online accounts
                            if (bot && bot.license && (bot.license.billingType === 'free' || bot.license.billingType === 'paid')) {
                                if ((bot && bot.type) && (bot.type !=='sample' && bot.type !=='solution')) {                                 
                                    if (bot.status===2) {//expired
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else {
                                    return false;
                                }
                            } else {
                                return false;
                            }
 
                        }
                    };
                }])
            
                .factory('pollFactory', ["$interval", function ($interval) {

                    var _subscribers = [];
                    var poll;

                    var initiatePolling = function(){
                        if(poll){
                            return;
                        }

                         poll = $interval(function () {
                            // every 10 second, notify all subscribers
                            console.log(_subscribers);
                            angular.forEach(_subscribers, function (pollObject) {
                                pollObject.cb(pollObject.testSuiteId, pollObject._id);
                            });
                        }, 10000);
                    };


                    return {
                        subscribe: function (pollObect) {
                            var index = _.findIndex(_subscribers, {_id : pollObect._id});
                            if(index == -1){
                                _subscribers.push(pollObect);
                            }

                            if(_subscribers.length == 1){
                                initiatePolling();
                            }

                        },
                        unSubscribe: function (testRunID) {
                            var index = _.findIndex(_subscribers, {_id : testRunID});
                            if(index !== -1){
                                _subscribers.splice(index, 1);
                            }

                            if(!_subscribers.length){
                                $interval.cancel(poll);
                                poll = "";
                            }
                        },
                        unSubscribeAll: function () {

                            _subscribers = [];

                            if(!_subscribers.length){
                                $interval.cancel(poll);
                                poll = "";
                            }
                        }
                    };
                }])

            .service('$mdParser', function MarkdownParser() {

                var regExs = [{
                        type: 'date',
                        expr: /\\d\(\s*(.{10})\s*(?:,\s*["'](.+?)["']\s*)?\)/,
                        replacer: _dateReplacer
                    }, {
                        type: 'time',
                        expr: /\\t\(\s*(.{8}\.\d{0,3})\s*\)/,
                        replacer: _timeReplacer
                    }, {
                        type: 'datetime',
                        expr: /\\dt\(\s*([-0-9]{10}[T][0-9:.]{12})([z]|[Z]|[+-]\d{4})[\s]*,[\s]*["']([a-zA-Z\W]+)["']\s*\)/,
                        replacer: _datetimeReplacer
                    }, {
                        type: 'currency',
                        expr: /\\\$\((\d*.\d*)[,](\s*[\"\']\s*\w{3}\s*[\"\']\s*)\)|\\\$\((\d*.\d*)[,](\s*\w{3}\s*)\)/,
                        replacer: _currencyReplacer
                    }, {
                        type: 'number',
                        expr: /\\#\(\s*(\d*.\d*)\s*\)/,
                        replacer: _numberReplacer
                    }];

                var formatMatchers = {
                    day: /^(d{1})[^d]|[^d](d{1})[^d]/g,
                    date: /^(d{2})[^d]|[^d](d{2})[^d]/g,
                    year: /(y{4})|y{2}/g
                };

                var locale = (window.navigator && (window.navigator.userLanguage || window.navigator.language)) || 'en-US';

                function capitaliseFormats(str) {
                    Object.keys(formatMatchers).forEach(function (key) {
                        str = str.replace(formatMatchers[key], function ($0) {
                            return $0.toUpperCase();
                        });
                    });

                    return str;
                }

                function _dateReplacer(str, options) {
                    return moment(str).local().format(capitaliseFormats(options) || 'ddd., MMM. DD, YYYY');
                }

                function _timeReplacer(str, options) {
                    return moment(str).local().format(capitaliseFormats(options) || 'hh:mm:ss A');
                }

                function _datetimeReplacer(str, options) {
                    return moment(str).local().format(capitaliseFormats(options) || 'ddd., MMM. DD, YYYY hh:mm A');
                }

                function _currencyReplacer(str, options) {
                    return str;
                }

                function _numberReplacer(str, options) {
                    return str;
                }

                this.matchAndReplace = function (str) {
                    var match;
                    regExs.forEach(function (regEx) {
                        while (!!(match = regEx.expr.exec(str))) {
                            str = str.replace(match[0], regEx.replacer(match[1], match[3]));
                        }
                    });

                    return str;
                };

            })
            .service('appVersionService',['$rootScope','env_conf','$injector',function($rootScope,env_conf,$injector){
               
                this.setVersionOnLoad = function(){
                var workflowService=$injector.get("$workflowService");
                $rootScope.helpLinks = {};
                $rootScope.developerURL = 'https://developer.kore.ai'; //'http://staging-docs.korebots.com';
                $rootScope.supportURL = 'https://support.kore.ai';

                var _helpDocVersion=parseFloat(env_conf['app-version']).toFixed(1).toString();
                _helpDocVersion='v'+_helpDocVersion.split(".").join("-");//Delimiter
                var helpDocsURL = $rootScope.developerURL + '/' + _helpDocVersion + '/docs';
                if (!window.appConfig.ON_PREMISE) {
                    helpDocsURL = $rootScope.developerURL + '/docs';
                }
                //var helpDocsURL = $rootScope.developerURL + '/docs';
                $rootScope.helpLinks.KORE_AI_TERMS = 'https://kore.ai/terms-of-service/';
                $rootScope.helpLinks.KORE_AI_TERMS_JAPANESE = 'https://kore.ai/jp/terms-of-service/';
                $rootScope.helpLinks.KORE_AI_PRIVACY_POLICY_JAPANESE = 'https://kore.ai/jp/privacy-policy/'; 
                $rootScope.helpLinks.KORE_AI_PRIVACY_POLICY = 'https://kore.ai/privacy-policy/';                    
                if (parseFloat(env_conf['app-version']) > 6) {
                    //NEW VERSION DOCS
                    $rootScope.helpLinks.HOME = helpDocsURL + '/bots/concepts/about-bots/';
                    $rootScope.helpLinks.NEW_BOT = helpDocsURL + '/bots/getting-started/getting-started-bots/';
                    $rootScope.helpLinks.EDIT_BOT = helpDocsURL + '/bots/bot-builder/getting-started-bots/editing-an-existing-bot/';
                    $rootScope.helpLinks.BOT_STORE_SETTINGS = helpDocsURL + '/bots/advanced-topics/bot-store/bot-store-settings/';
                    $rootScope.helpLinks.SHARE_BOT = helpDocsURL + '/bots/advanced-topics/collaborative-development/sharing-bots-for-development/';
                    $rootScope.helpLinks.UNIVERSAL_BOT = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/defining-universal-bots/';
                    $rootScope.helpLinks.PUBLISH_UNIVERSAL_BOT = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/defining-universal-bots/';
                    $rootScope.helpLinks.UNIVERSAL_BOT_LINKEDBOTS = helpDocsURL + '/bots/bot-builder/getting-started-bots/defining-universal-bots/creating-a-universal-bot/step-2-add-linked-bots/';
                    $rootScope.helpLinks.BOT_ADVANCED_SETTINGS = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/';
                    $rootScope.helpLinks.CREATE_APP = helpDocsURL + '/bots/bot-builder-tool/channel-enablement/adding-the-webmobile-client-channel/';
                    $rootScope.helpLinks.JWT =  "https://developer.kore.ai/tools/jwt/";
                    $rootScope.helpLinks.UI_NAVIGATON= helpDocsURL+ '/bots/chatbot-overview/where-to-find-what/';

                    
                    $rootScope.helpLinks.BOT_ANALYTICS = helpDocsURL + "/bots/bot-builder-tool/analyzing-your-bot/dashboard/";
                    $rootScope.helpLinks.NLP_DEYSTIFIED = helpDocsURL + "/bots/bot-builder-tool/test-your-bot/testing-your-bot-with-nlp/";
                    $rootScope.helpLinks.MULTI_LINGUAL_BOTS = helpDocsURL + "/bots/advanced-topics/multi-lingual/building-multi-language-bots/";
                    $rootScope.helpLinks.EXPORT_IMPORT_BOT = helpDocsURL + "/bots/advanced-topics/bot-management/bot-management-2/#Importing_and_Exporting_Bots";
                    $rootScope.helpLinks.NO_ALERTS = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/';
                    $rootScope.helpLinks.NO_ACTIONS = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/';
                    $rootScope.helpLinks.NO_INFORMATION_TASKS = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/information-tasks/create-a-report-task/';
                    $rootScope.helpLinks.NO_CHANNELS = helpDocsURL + '/bots/bot-builder-tool/channel-enablement/adding-channels-to-your-bot/';
                    $rootScope.helpLinks.NO_FLOWS = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/creatingflows/';

                    $rootScope.helpLinks.PUBLISH_ALERT = helpDocsURL + '/bots/bot-builder-tool/publish/publishing-bot/';
                    $rootScope.helpLinks.PUBLISH_ACTION = helpDocsURL + '/bots/bot-builder-tool/publish/publishing-bot/';

                    $rootScope.helpLinks.VIEW_CHANGE_LOG = helpDocsURL + '/bots/advanced-topics/bot-management/bot-management-2/#Viewing_the_Bot_Change_Log';

                    $rootScope.helpLinks.TEST_BOT = helpDocsURL + '/bots/bot-builder-tool/test-your-bot/testing-your-bot-with-nlp/';
                    $rootScope.helpLinks.INTENT_ENTITY = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/manage-intents-entities/';
                    $rootScope.helpLinks.NLP_SETTINGS = helpDocsURL;
                    $rootScope.helpLinks.SYNONYMS = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/fundamental-meaning/fundamental-meaning/#managing-synonyms';
                    $rootScope.helpLinks.PATTERNS = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/fundamental-meaning/fundamental-meaning/#managing-patterns';
                    $rootScope.helpLinks.CHAT_RESPONSE = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/custom-behavior/default-dialog/#standard-responses';
                    $rootScope.helpLinks.CHAT_HISTORY = helpDocsURL + '/bots/bot-builder/optimizing-bots/viewing-chat-history/';
                    $rootScope.helpLinks.CHAT_LOGS = helpDocsURL + '/bots/bot-builder/optimizing-bots/viewing-chat-logs/';
                    $rootScope.helpLinks.NEGATIVE_PATTERNS = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/fundamental-meaning/fundamental-meaning/#negative-patterns';
                    $rootScope.helpLinks.LINKED_BOT_TRAINING  = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#Training';
                    $rootScope.helpLinks.SETTINGS  = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#Configurations';
                    $rootScope.helpLinks.FM_MODEL_THRESHOLD_HELP = helpDocsURL + '/bots/nlp/fundamental-meaning/#Threshold_Configurations/';
                    $rootScope.helpLinks.KG_MODEL_THRESHOLD_HELP = helpDocsURL + '/bots/nlp/knowledge-graph/#Threshold_Configurations/';
                    $rootScope.helpLinks.RR_MODEL_THRESHOLD_HELP = helpDocsURL + '/bots/nlp/nlp-detection/#Thresholds_Configuration/';
                    $rootScope.helpLinks.ADV_NLP_CONFIG = helpDocsURL + '/bots/nlp/advanced-nlp-configurations/';
                    $rootScope.helpLinks.RESCORING_INTENTS_HELP = helpDocsURL + '/bots/nlp/nlp-detection/#Thresholds_Configuration';
                    $rootScope.helpLinks.FEATURE_EXTRACTION = helpDocsURL + '/bots/nlp/user-utterances/#feature_extraction';
                    $rootScope.helpLinks.SMART_UNIVERSAL_LINK = helpDocsURL + '/bots/advanced-topics/universal-bot/universal-bots/';

                    $rootScope.helpLinks.DEPRECATED_TASKS = helpDocsURL + '/bots/whats-new/deprecations/';
                    $rootScope.helpLinks.ALERTS_TASK_BASIC = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#general';
                    $rootScope.helpLinks.ALERT_AUTH = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#auth';
                    $rootScope.helpLinks.ALERT_REQ_REST = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#rest';
                    $rootScope.helpLinks.ALERT_REQ_SOAP = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#soap';
                    $rootScope.helpLinks.ALERT_REQ_WEBHOOK = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#webhook';
                    $rootScope.helpLinks.ALERT_REQ_RSS = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#rss';
                    $rootScope.helpLinks.ALERT_RES = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#response-bot';
                    $rootScope.helpLinks.ALERT_ERROR = helpDocsURL + '/bots/bot-builder/notification-tasks/error-messages-for-alert-tasks/';
                    $rootScope.helpLinks.ALERT_SETTING = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#alert-settings';
                    $rootScope.helpLinks.ALERT_REVIEW = helpDocsURL + '/bots/bot-builder/notification-tasks/reviewing-an-ale…sk-configuration/';

                    $rootScope.helpLinks.ACTIONS_TASK_BASIC = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#general';
                    $rootScope.helpLinks.ACTIONS_AUTH = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#auth';
                    $rootScope.helpLinks.ACTIONS_REQ_REST = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#rest';
                    $rootScope.helpLinks.ACTIONS_REQ_SOAP = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#apirequest-soap';
                    $rootScope.helpLinks.ACTIONS_RES = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#bot-response';
                    $rootScope.helpLinks.ACTIONS_ERROR = helpDocsURL + '/bots/bot-builder/kore-bot-action-tasks/error-messages-for-action-tasks/';
                    $rootScope.helpLinks.ACTIONS_REVIEW = helpDocsURL + '/bots/bot-builder/kore-bot-action-tasks/reviewing-an-action-task-configuration/';

                    $rootScope.helpLinks.INFORMATION_TASK_BASIC = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/information-tasks/create-a-report-task/#Step_1_General_Tab_Settings';
                    $rootScope.helpLinks.INFORMATION_AUTH = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/information-tasks/create-a-report-task/#Step_2_Authentication_Settings';
                    $rootScope.helpLinks.INFORMATION_REQ_REST = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/information-tasks/create-a-report-task/#apirequest-rest';
                    $rootScope.helpLinks.INFORMATION_REQ_SOAP = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/information-tasks/create-a-report-task/#apirequest-soap';
                    $rootScope.helpLinks.INFORMATION_RES = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/information-tasks/create-a-report-task/#Step_4_Defining_the_Bot_Response';

                    $rootScope.helpLinks.ADD_CHANNEL = helpDocsURL + '/bots/bot-builder-tool/channel-enablement/adding-channels-to-your-bot/';
                    $rootScope.helpLinks.ADD_CHANNEL_FB = helpDocsURL + '/bots/bot-builder-tool/channel-enablement/adding-the-facebook-channel/';
                    $rootScope.helpLinks.ADD_CHANNEL_SLACK = helpDocsURL + '/bots/bot-builder-tool/channel-enablement/adding-the-slack-channel/';
                    $rootScope.helpLinks.ADD_CHANNEL_WEB_MOB = helpDocsURL + '/bots/bot-builder-tool/channel-enablement/adding-the-webmobile-client-channel/';
                    $rootScope.helpLinks.ADD_CHANNEL_SMS = helpDocsURL + '/bots/bot-builder-tool/channel-enablement/adding-the-sms-channel/';
                    $rootScope.helpLinks.ADD_CHANNEL_KORE = helpDocsURL + '/bots/bot-builder-tool/channel-enablement/adding-the-kore-channel/';
                    $rootScope.helpLinks.ADD_CHANNEL_EMAIL = helpDocsURL + '/bots/bot-builder-tool/channel-enablement/adding-the-email-channel/';
                    $rootScope.helpLinks.ADD_CHANNEL_TWITTER = helpDocsURL + "/bots/bot-builder-tool/channel-enablement/adding-the-twitter-channel/";
                    $rootScope.helpLinks.ADD_CHANNEL_SKYPE = helpDocsURL + "/bots/bot-builder-tool/channel-enablement/adding-the-skype-channel/";
                    $rootScope.helpLinks.ADD_CHANNEL_TROPO = helpDocsURL + "/bots/bot-builder-tool/channel-enablement/adding-the-cisco-tropo-channel/";
                    $rootScope.helpLinks.ADD_CHANNEL_WFACEBOOK = helpDocsURL + "/bots/bot-builder-tool/channel-enablement/adding-the-facebook-workplace-channel/";
                    $rootScope.helpLinks.FLOWS_CREATE = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/creatingflows/';
                    $rootScope.helpLinks.SANDBOX_CONFIGURATION = helpDocsURL + '/bots/advanced-topics/ivr-integration/ivr-integration/#Bot_Settings/';
                    /*
                     knowledge task help links
                     */

                    $rootScope.helpLinks.KNOWLEDGE_GRAPH = helpDocsURL + '/bots/bot-builder-tool/knowledge-task/creating-a-knowledge-graph/';
                    $rootScope.helpLinks.KG_FAQS_PATTERN = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/';

                    $rootScope.helpLinks.NOKT_LEARNMORE = $rootScope.helpLinks.KNOWLEDGE_GRAPH;
                    $rootScope.helpLinks.ADDKT_LEARNMORE = $rootScope.helpLinks.KNOWLEDGE_GRAPH;

                     //ub2
                    $rootScope.helpLinks.INVOCATION_NAMES = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#Invocation_Names';
                    $rootScope.helpLinks.TRAINING_UTTERANCES = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#Utterances';
                    $rootScope.helpLinks.FALLBACK_BOTS = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#Fallback_Bots';
                    $rootScope.helpLinks.INCLUSIVE_BOTS = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#Inclusive_Bots';



                    /*View logs helplinks*/
                    $rootScope.helpLinks.VIEW_LOG = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#view-logs';
                    $rootScope.helpLinks.VIEW_LOG_ALERT = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#view-logs';


                    /*Version helplinks*/
                    $rootScope.helpLinks.VERSION_ALERT = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#ver-hist';
                    $rootScope.helpLinks.VERSION_ACTION = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#ver-hist';

                    $rootScope.helpLinks.VARIABLE_MANAGEMENT_HELP = helpDocsURL + "/bots/advanced-topics/bot-management/defining-system-variables/";
                    /*Utterances helplinks*/
                    $rootScope.helpLinks.UTTERENCES_HELP = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/machine-learning/user-utterances/';
                    $rootScope.helpLinks.ML_ADVANCED = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/machine-learning/user-utterances/';

                    $rootScope.helpLinks.CISCO_SPARK_HELP = helpDocsURL + '/bots/bot-builder-tool/channel-enablement/adding-the-cisco-spark-channel/';

                    $rootScope.helpLinks.NOT_READY_PUBLISH_HELP = helpDocsURL + '/bots/bot-builder-tool/publish/publishing-bot/';

                    $rootScope.helpLinks.DEPLOYMENTTAB_HELP = helpDocsURL + '/bots/bot-builder-tool/publish/publishing-bot/';
                    $rootScope.helpLinks.CONFIRMTAB_HELP = helpDocsURL + '/bots/bot-builder-tool/publish/publishing-bot/';

                    /*help link for smart bot*/
                    $rootScope.helpLinks.SMARTBOT = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/installing-smart-bots/';
                    $rootScope.helpLinks.ABOUTSMARTBOT = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/subscribing-to-a-smart-bot/';
                    $rootScope.helpLinks.UNLOCKSOLUTIONBOT = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/customizing-a-smart-bot/';
                    $rootScope.helpLinks.INSTALLING_SAMPLEBOT = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/sample-bots/installing-sample-bots/';
                    $rootScope.helpLinks.DEPRECATED_SMARTBOTS = helpDocsURL + '/bots/whats-new/deprecations/';

                    $rootScope.helpLinks.BOT_TASKS_HELP = helpDocsURL + '/bots/chatbot-overview/bot-tasks/';
                    $rootScope.helpLinks.DIALOG_TASK_HELP = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/dialog-tasks/';
                    $rootScope.helpLinks.DIALOG_UPGRADE_TO_NEW_HELP = helpDocsURL + '/bots/bot-builder-tool/bot-creation/storyboard/';
                    $rootScope.helpLinks.ALERT_TASK_HELP = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/';
                    $rootScope.helpLinks.ACTION_TASK_HELP = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/';
                    $rootScope.helpLinks.INFORMATION_TASK_HELP = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/information-tasks/create-a-report-task/';
                    $rootScope.helpLinks.KNOWLEDGE_TASK_HELP = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/knowledge-tasks/';
                    $rootScope.helpLinks.KNOWLEDGE_TASK_CREATE_HELP = helpDocsURL + "/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/creating-a-knowledge-graph/";
                    $rootScope.helpLinks.FLOWS_TASK_HELP = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/creatingflows/';
                    $rootScope.helpLinks.BOTS_TYPES = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/bot-types-2/';
                    $rootScope.helpLinks.UI_FORM_HELP = helpDocsURL + '/bots/bot-builder-tool/digital-forms/';
                    $rootScope.helpLinks.DIGITAL_VIEWS = helpDocsURL + '/bots/bot-builder-tool/digital-views/';

                    $rootScope.helpLinks.BOT_NL_HELP = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/optimizing-bots/';
                    $rootScope.helpLinks.TRAINING_HELP = helpDocsURL + '/bots/bot-builder-tool/test-your-bot/testing-your-bot-with-nlp/';
                    $rootScope.helpLinks.MACHINE_LEARINING_HELP = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/machine-learning/user-utterances/';
                    $rootScope.helpLinks.ML_MODEL_THRESHOLD_HELP = helpDocsURL + '/bots/nlp/user-utterances/#Threshold_Configurations';
                    $rootScope.helpLinks.RANK_CONFIGURATION      = helpDocsURL + 'bots/nlp/nlp-detection/#Configuration';
                    $rootScope.helpLinks.SYNONYMS_HELP = helpDocsURL + '/bots/nlp/fundamental-meaning/#managing-synonyms';
                    $rootScope.helpLinks.PATTERNS_HELP = helpDocsURL + '/bots/nlp/fundamental-meaning/#Managing_Patterns';
                    $rootScope.helpLinks.NEGATIVE_PATTERNS_HELP = helpDocsURL + '/bots/nlp/fundamental-meaning/#Negative_Patterns';
                    $rootScope.helpLinks.STANDARD_RESPONSE_HELP = helpDocsURL + '/bots/bot-intelligence/default-dialog/#Standard_Responses';

                    $rootScope.helpLinks.IWORDS_FMEMORY_HELP = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/manage-intents-entities/';
                    $rootScope.helpLinks.TIS_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/';
                    $rootScope.helpLinks.BOT_CHANNEL_HELP = helpDocsURL + '/bots/bot-builder-tool/channel-enablement/adding-channels-to-your-bot/';
                    $rootScope.helpLinks.DEFAULT_DAILOG_HELP = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/custom-behavior/default-dialog/';
                    $rootScope.helpLinks.DEFAULT_DAILOG_UNIVERSAL_HELP = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/custom-behavior/default-dialog/';
                    $rootScope.helpLinks.MULTI_INTENT_DETECTION_HELP = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/multi-intent-detection/';
                    $rootScope.helpLinks.AMEND_ENTITY = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/amend-entity/';
                    $rootScope.helpLinks.MANAGE_INTERRUPTIONS = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.THRESHOLDS_CONFIG_HELP = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/fundamental-meaning/fundamental-meaning/#config';
                    $rootScope.helpLinks.NL_ADVANCE_SETTINGS_HELP = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/fundamental-meaning/fundamental-meaning/#negative-patterns';


                    $rootScope.helpLinks.BOT_SETTINGS_HELP = helpDocsURL + '/bots/advanced-topics/bot-settings/general-settings/';
                    $rootScope.helpLinks.BOT_SDKCONF_HELP = helpDocsURL + '/bots/advanced-topics/sdks/sdk-configuration/';
                    $rootScope.helpLinks.BOT_CHANGELOG_HELP = helpDocsURL + '/bots/bot-settings/bot-management/bot-management-2/#Viewing_the_Bot_Change_Log';
                    $rootScope.helpLinks.BOT_VERSION_HELP   = helpDocsURL + '/bots/bot-admin/bots-management/bot-versioning/';
                    $rootScope.helpLinks.BOT_MANAGESESSION_HELP = helpDocsURL +'/bots/bot-admin/bots-management/bot-sessions/';
                    $rootScope.helpLinks.RESTORE_VERSION    = helpDocsURL + '/bots/bot-admin/bots-management/bot-versioning/#Version_Restoration';
                    $rootScope.helpLinks.BOT_AUTHENTICATION_HELP = helpDocsURL + '/bots/advanced-topics/authorization/bot-authentication/';
                    $rootScope.helpLinks.BOT_SHARE_HELP = helpDocsURL + '/bots/advanced-topics/collaborative-development/sharing-bots-for-development/';
                    $rootScope.helpLinks.BOT_DELETE_HELP = helpDocsURL + '/bots/advanced-topics/bot-management/deleting-a-bot/';
                    $rootScope.helpLinks.LANGUAGE_MANAGEMENT_HELP = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/';
                    $rootScope.helpLinks.PII_MASKING = helpDocsURL + '/bots/advanced-topics/bot-settings/pii-data-masking/';
                    $rootScope.helpLinks.BOT__HELP = helpDocsURL + '';
                    $rootScope.helpLinks.BOT__HELP = helpDocsURL + '';
                    $rootScope.helpLinks.IVR_INTEGRATION = helpDocsURL + "/bots/advanced-topics/ivr-integration/ivr-integration/";
                    $rootScope.helpLinks.BOT_FUNCTIONS_HELP = helpDocsURL + "/bots/advanced-topics/bot-functions/reusing-bot-functions-custom-script-file/";


                    $rootScope.helpLinks.BOT_PUBLISH_HELP = helpDocsURL + '/bots/publish/publishing-bot/';
                    $rootScope.helpLinks.BOT_ANALYZE_HELP = helpDocsURL + '/bots/bot-builder-tool/analyzing-your-bot/analyzing-your-bot/';
                    $rootScope.helpLinks.BOT_CHAT_HISTORY_HELP = helpDocsURL + '/bots/bot-builder-tool/analyzing-your-bot/bot-analysis/#Advanced_View_-_NLP_Analysis_and_Chat_History';
                    $rootScope.helpLinks.BOT_CHAT_LOGS_HELP = helpDocsURL + '/bots/bot-builder-tool/analyzing-your-bot/bot-analysis/';

                    $rootScope.helpLinks.BOTKIT_SDK_HELP = helpDocsURL + '/bots/sdks/using-the-botkit-sdk/';
                    $rootScope.helpLinks.WEBMOBILE_SDK_HELP = helpDocsURL + '/bots/sdks/kore-ai-web-sdk-tutorial/';
                    $rootScope.helpLinks.APISCOPES_SDK_HELP = helpDocsURL + '/bots/api-guide/apis/#Associating_API_Scopes';
                    $rootScope.helpLinks.MANAGEAPPS_HELP = helpDocsURL + '/bots/api-guide/apis/#Creating_Managing_Apps';
                    $rootScope.helpLinks.EVENTS_MANAGEMENT = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/custom-behavior/event-based-bot-actions/';
                    $rootScope.helpLinks.SENTIMENT_MANAGEMENT = helpDocsURL + '/bots/advanced-topics/sentiment-management/';
                    $rootScope.helpLinks.TONE_ANALYSIS   =  helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-tone-processing';
                    $rootScope.helpLinks.TRAITS = helpDocsURL + '/bots/nlp/traits/';
                    

                    $rootScope.helpLinks.ENTITY_RULES     = helpDocsURL + '/bots/how-tos/entity-rules/';
                    $rootScope.helpLinks.GROUP_NODE_PROPERTIES = helpDocsURL + '/bots/bot-builder-tool/dialog-task/grouping-nodes/';
                    $rootScope.helpLinks.AUTO_CORRECT      = helpDocsURL + '/bots/bot-builder-tool/dialog-task/working-with-the-entity-node/#Step_3_Configuring_the_Instance_Properties';
                    $rootScope.helpLinks.NOUTTERANCES_HELP = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/machine-learning/user-utterances/';
                    $rootScope.helpLinks.AGENT_TRANSFER_HELP = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/working-with-the-agent-transfer-node/';
                    $rootScope.helpLinks.BATCH_TESTING_HELP = helpDocsURL + '/bots/bot-builder-tool/test-your-bot/batch-testing/batch-testing/';
                    $rootScope.helpLinks.CONVERSATION_TESTING_HELP = helpDocsURL + '/bots/test-your-bot/conversation-testing';
                    $rootScope.helpLinks.MANAGE_TEST_SUITS = helpDocsURL + '/bots/bot-builder-tool/test-your-bot/batch-testing/batch-testing/';
                    $rootScope.helpLinks.WHATSNEW = helpDocsURL + '/bots/whats-new/whats-new-in-this-release-bot-builder/';
                    $rootScope.helpLinks.ROLE_BASED_ACCESS = helpDocsURL + '/bots/admin-console/user-management/role-management/#Bot_Roles';
                    $rootScope.helpLinks.FULL_VERSION_CTRL = helpDocsURL + '/bots/publish/publishing-bot/#Publishing_Tasks';
                    $rootScope.helpLinks.KNOWLEDGE_EXTRACT = helpDocsURL + '/bots/bot-builder-tool/develop/knowledge-task/knowledge-extraction-service/';
                    $rootScope.helpLinks.RAND_1 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#general';
                    $rootScope.helpLinks.RAND_2 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#rest';
                    $rootScope.helpLinks.RAND_3 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#soap';
                    $rootScope.helpLinks.RAND_4 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#webhook';
                    $rootScope.helpLinks.RAND_5 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#rss';
                    $rootScope.helpLinks.RAND_6 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#auth';
                    $rootScope.helpLinks.RAND_7 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#response-bot';
                    $rootScope.helpLinks.RAND_8 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/alert-tasks/notification-tasks/#alert-settings';
                    $rootScope.helpLinks.RAND_9 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#general';
                    $rootScope.helpLinks.RAND_10 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#rest';
                    $rootScope.helpLinks.RAND_11 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#apirequest-soap';
                    $rootScope.helpLinks.RAND_12 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#auth';
                    $rootScope.helpLinks.RAND_13 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#bot-response';
                    $rootScope.helpLinks.RAND_14 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/information-tasks/defining-a-table-report/';
                    $rootScope.helpLinks.RAND_15 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/information-tasks/defining-a-card-layout-report/';
                    $rootScope.helpLinks.RAND_16 = helpDocsURL + '/bots/getting-started/getting-started-bots/';
                    $rootScope.helpLinks.RAND_17 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/defining-universal-bots/';
                    $rootScope.helpLinks.RAND_18 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/';
                    $rootScope.helpLinks.RAND_19 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_20 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/defining-universal-bots/';
                    $rootScope.helpLinks.RAND_21 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/';
                    $rootScope.helpLinks.RAND_22 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_23 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/dialog-tasks/#Creating_a_Dialog_Task';
                    $rootScope.helpLinks.RAND_24 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/working-with-the-user-intent-dialog-node/#i';
                    $rootScope.helpLinks.RAND_25 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/managing-dialogs/#manage';
                    $rootScope.helpLinks.RAND_26 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_27 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/using-the-dialog-builder-tool/#Exporting_a_Dialog';
                    $rootScope.helpLinks.RAND_28 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/dialog-tasks/#Creating_a_Dialog_Task';
                    $rootScope.helpLinks.RAND_29 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/working-with-the-user-intent-dialog-node/#i';
                    $rootScope.helpLinks.RAND_30 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/managing-dialogs/#manage';
                    $rootScope.helpLinks.RAND_31 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_32 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/using-the-dialog-builder-tool/#Exporting_a_Dialog';
                    $rootScope.helpLinks.RAND_33 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/dialog-tasks/#Creating_a_Dialog_Task';
                    $rootScope.helpLinks.RAND_34 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/working-with-the-user-intent-dialog-node/#i';
                    $rootScope.helpLinks.RAND_35 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/managing-dialogs/#manage';
                    $rootScope.helpLinks.RAND_36 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_37 = helpDocsURL + '/bots/getting-started/getting-started-bots/';
                    $rootScope.helpLinks.RAND_38 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/dialog-tasks/#Creating_a_Dialog_Task';
                    $rootScope.helpLinks.RAND_39 = helpDocsURL + '/bots/concepts/nlp-concepts/intent-detection/';
                    $rootScope.helpLinks.RAND_40 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/nodes-transitions/#Node_Types';
                    $rootScope.helpLinks.RAND_41 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/nodes-transitions/#Component_Transitions';
                    $rootScope.helpLinks.RAND_42 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/managing-dialogs/#Prompt_Editor';
                    $rootScope.helpLinks.RAND_43 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/managing-dialogs/#manage';
                    $rootScope.helpLinks.RAND_44 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/working-with-the-web-hook-node/';
                    $rootScope.helpLinks.RAND_45 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/dialog-tasks/#Creating_a_Dialog_Task';
                    $rootScope.helpLinks.RAND_46 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/working-with-the-user-intent-dialog-node/#i';
                    $rootScope.helpLinks.RAND_47 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/managing-dialogs/#manage';
                    $rootScope.helpLinks.RAND_48 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_49 = helpDocsURL + '/bots/getting-started/getting-started-bots/';
                    $rootScope.helpLinks.RAND_50 = helpDocsURL + '/bots/bot-builder-tool/dialog-task/dialog-tasks/#creating-a-dialog-task';
                    $rootScope.helpLinks.RAND_51 = helpDocsURL + '/bots/bot-builder-tool/dialog-task/working-with-the-user-intent-node/';
                    $rootScope.helpLinks.RAND_52 = helpDocsURL + '/bots/bot-builder-tool/dialog-task/managing-dialogs/';
                    $rootScope.helpLinks.RAND_53 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_54 = helpDocsURL + '/bots/getting-started/getting-started-bots/';
                    $rootScope.helpLinks.RAND_55 = helpDocsURL + '/bots/bot-builder-tool/develop/knowledge-task/importing-the-bot-ontology-from-csv-or-json/';
                    $rootScope.helpLinks.RAND_56 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/knowledge-graph-train-nlp-optimization/knowledge-graph/#Create_Classes_and_Add_them_to_Terms';
                    $rootScope.helpLinks.RAND_57 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/knowledge-graph-train-nlp-optimization/knowledge-graph/#Enter_Synonyms';
                    $rootScope.helpLinks.RAND_58 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/knowledge-graph-train-nlp-optimization/knowledge-graph/#Build_and_Train_a_Knowledge_Graph';
                    $rootScope.helpLinks.RAND_59 = helpDocsURL + '/bots/bot-builder-tool/develop/knowledge-task/knowledge-extraction-service/#Extracting_FAQs_from_a_Website';
                    $rootScope.helpLinks.RAND_60 = helpDocsURL + '/bots/bot-builder-tool/develop/knowledge-task/knowledge-extraction-service/#Extracting_FAQs_from_a_CSV_or_PDF_Document';
                    $rootScope.helpLinks.RAND_61 = helpDocsURL + '/bots/bot-builder-tool/develop/knowledge-task/knowledge-extraction-service/#Move_Selected_Question-Answers_to_the_Knowledge_Graph';
                    $rootScope.helpLinks.RAND_62 = helpDocsURL + '/bots/bot-builder-tool/develop/knowledge-task/knowledge-extraction-service/#Supported_Formats';
                    $rootScope.helpLinks.RAND_63 = helpDocsURL + '/bots/bot-builder-tool/develop/knowledge-task/importing-the-bot-ontology-from-csv-or-json/';
                    $rootScope.helpLinks.RAND_64 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/knowledge-graph-train-nlp-optimization/knowledge-graph/#Create_Classes_and_Add_them_to_Terms';
                    $rootScope.helpLinks.RAND_65 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/knowledge-graph-train-nlp-optimization/knowledge-graph/#Enter_Synonyms';
                    $rootScope.helpLinks.RAND_66 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/knowledge-graph-train-nlp-optimization/knowledge-graph/#Build_and_Train_a_Knowledge_Graph';
                    $rootScope.helpLinks.RAND_67 = helpDocsURL + '/bots/bot-builder-tool/develop/knowledge-task/knowledge-extraction-service/#Extracting_FAQs_from_a_Website';
                    $rootScope.helpLinks.RAND_68 = helpDocsURL + '/bots/bot-builder-tool/develop/knowledge-task/knowledge-extraction-service/#Extracting_FAQs_from_a_CSV_or_PDF_Document';
                    $rootScope.helpLinks.RAND_69 = helpDocsURL + '/bots/bot-builder-tool/develop/knowledge-task/knowledge-extraction-service/#Move_Selected_Question-Answers_to_the_Knowledge_Graph';
                    //Need to update from here
                    $rootScope.helpLinks.RAND_70 = helpDocsURL + '/bots/bot-builder-tool/develop/knowledge-task/knowledge-extraction-service/#Supported_Formats';
                    $rootScope.helpLinks.RAND_71 = helpDocsURL + '/bots/bot-builder-tool/alert/notification-tasks/';
                    $rootScope.helpLinks.RAND_72 = helpDocsURL + '/bots/bot-builder-tool/alert/notification-tasks/#API_Request';
                    $rootScope.helpLinks.RAND_73 = helpDocsURL + '/bots/bot-builder-tool/alert/notification-tasks/#API_Request';
                    $rootScope.helpLinks.RAND_74 = helpDocsURL + '/bots/bot-builder-tool/alert/notification-tasks/#API_Request';
                    $rootScope.helpLinks.RAND_75 = helpDocsURL + '/bots/bot-builder-tool/alert/notification-tasks/#API_Request';
                    $rootScope.helpLinks.RAND_76 = helpDocsURL + '/bots/bot-builder-tool/alert/notification-tasks/#Authorization';             
                    $rootScope.helpLinks.RAND_77 = helpDocsURL + '/bots/bot-builder-tool/alert/notification-tasks/#Bot_Response';
                    $rootScope.helpLinks.RAND_78 = helpDocsURL + '/bots/bot-builder-tool/alert/notification-tasks/#Alert_Settings';
                    $rootScope.helpLinks.RAND_79 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#general';
                    $rootScope.helpLinks.RAND_80 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#rest';
                    $rootScope.helpLinks.RAND_81 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#apirequest-soap';
                    $rootScope.helpLinks.RAND_82 = helpDocsURL + '//bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#auth';
                    $rootScope.helpLinks.RAND_83 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/action-tasks/kore-bot-action-tasks/#bot-response';
                    $rootScope.helpLinks.RAND_84 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/information-tasks/defining-a-table-report/';
                    $rootScope.helpLinks.RAND_85 = helpDocsURL + '/bots/bot-builder-tool/develop/simple-task/information-tasks/defining-a-card-layout-report/';
                    $rootScope.helpLinks.RAND_86 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/creatingflows/#creating-a-flow';
                    $rootScope.helpLinks.RAND_87 = helpDocsURL + '/bots/nlp/user-utterances/#Exporting_and_Importing_Machine_Learning_Utterances';
                    $rootScope.helpLinks.RAND_88 = helpDocsURL + '/bots/nlp/ml-model/';
                    $rootScope.helpLinks.RAND_89 = helpDocsURL + '/bots/concepts/nlp-concepts/entity-detection/';
                    $rootScope.helpLinks.RAND_90 = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/configuring-ml-parameters/';
                    $rootScope.helpLinks.RAND_91 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_92 = helpDocsURL + '/bots/concepts/nlp-concepts/improve-bot-performance/';
                    $rootScope.helpLinks.RAND_93 = helpDocsURL + '/bots/concepts/nlp-concepts/intent-detection/';
                    $rootScope.helpLinks.RAND_94 = helpDocsURL + '/bots/concepts/nlp-concepts/entity-detection/';
                    $rootScope.helpLinks.RAND_95 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_96 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/test-train-bot/';
                    $rootScope.helpLinks.RAND_97 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/';
                    $rootScope.helpLinks.RAND_98 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/entity-detection/';
                    $rootScope.helpLinks.RAND_99 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_100 = helpDocsURL + '/bots/concepts/nlp-concepts/improve-bot-performance/';
                    $rootScope.helpLinks.RAND_101 = helpDocsURL + '/bots/concepts/nlp-concepts/intent-detection/';
                    $rootScope.helpLinks.RAND_102 = helpDocsURL + '/bots/concepts/nlp-concepts/entity-detection/';
                    $rootScope.helpLinks.RAND_103 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_104 = helpDocsURL + '/bots/concepts/nlp-concepts/improve-bot-performance/';
                    $rootScope.helpLinks.RAND_105 = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/configuring-ml-parameters/';
                    $rootScope.helpLinks.RAND_106 = helpDocsURL + '/bots/concepts/nlp-concepts/intent-detection/';
                    $rootScope.helpLinks.RAND_107 = helpDocsURL + '/bots/concepts/nlp-concepts/entity-detection/';
                    $rootScope.helpLinks.RAND_108 = helpDocsURL + '/bots/concepts/nlp-concepts/intent-detection/#Knowledge_Graph_Training';
                    $rootScope.helpLinks.RAND_109 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_110 = helpDocsURL + '/bots/concepts/nlp-concepts/improve-bot-performance/';
                    $rootScope.helpLinks.RAND_111 = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/configuring-ml-parameters/';
                    $rootScope.helpLinks.RAND_112 = helpDocsURL + '/bots/concepts/nlp-concepts/intent-detection/';
                    $rootScope.helpLinks.RAND_113 = helpDocsURL + '/bots/concepts/nlp-concepts/entity-detection/';
                    $rootScope.helpLinks.RAND_114 = helpDocsURL + '/bots/concepts/nlp-concepts/intent-detection/#Knowledge_Graph_Training';
                    $rootScope.helpLinks.RAND_115 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_116 = helpDocsURL + '/bots/concepts/nlp-concepts/improve-bot-performance/';
                    $rootScope.helpLinks.RAND_117 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_118 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_119 = helpDocsURL + '/bots/advanced-topics/universal-bot/defining-universal-bots/#Standard_Bots_vs_Universal_Bots';
                    $rootScope.helpLinks.RAND_120 = helpDocsURL + '/bots/advanced-topics/universal-bot/creating-a-universal-bot/#Step_2_Add_Linked_Bots';
                    $rootScope.helpLinks.RAND_121 = helpDocsURL + '/bots/advanced-topics/universal-bot/creating-a-universal-bot/#Step_4_Test_the_Universal_Bot';
                    $rootScope.helpLinks.RAND_122 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/universal-bot/creating-a-universal-bot/#step5';
                    $rootScope.helpLinks.RAND_123 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/managing-dialogs/#Prompt_Editor';
                    $rootScope.helpLinks.RAND_124 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/custom-behavior/event-based-bot-actions/';
                    $rootScope.helpLinks.RAND_125 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/managing-dialogs/#Prompt_Editor';
                    $rootScope.helpLinks.RAND_126 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/custom-behavior/event-based-bot-actions/';
                    $rootScope.helpLinks.RAND_127 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/managing-dialogs/#Prompt_Editor';
                    $rootScope.helpLinks.RAND_128 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/custom-behavior/event-based-bot-actions/';
                    $rootScope.helpLinks.RAND_129 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/managing-dialogs/#Prompt_Editor';
                    $rootScope.helpLinks.RAND_130 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/custom-behavior/event-based-bot-actions/';
                    $rootScope.helpLinks.RAND_131 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_132 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/managing-dialogs/#Prompt_Editor';
                    $rootScope.helpLinks.RAND_133 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_134 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/managing-dialogs/#Prompt_Editor';
                    $rootScope.helpLinks.RAND_135 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_136 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/managing-dialogs/#Prompt_Editor';
                    $rootScope.helpLinks.RAND_137 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/bot-intelligence/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_138 = helpDocsURL + '/bots/bot-builder-tool/dialog-task/prompt-editor/';
                    $rootScope.helpLinks.RAND_139 = helpDocsURL + '/bots/test-your-bot/testing-your-bot-with-nlp/';
                    $rootScope.helpLinks.RAND_140 = helpDocsURL + '/bots/concepts/nlp-concepts/intent-detection/';
                    $rootScope.helpLinks.RAND_141 = helpDocsURL + '/bots/concepts/nlp-concepts/entity-detection/';
                    $rootScope.helpLinks.RAND_142 = helpDocsURL + '/bots/concepts/nlp-concepts/intent-detection/#Knowledge_Graph_Training';
                    $rootScope.helpLinks.RAND_143 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_144 = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/configuring-ml-parameters/';
                    $rootScope.helpLinks.RAND_145 = helpDocsURL + '/bots/concepts/nlp-concepts/intent-detection/';
                    $rootScope.helpLinks.RAND_146 = helpDocsURL + '/bots/concepts/nlp-concepts/entity-detection/';
                    $rootScope.helpLinks.RAND_147 = helpDocsURL + '/bots/concepts/nlp-concepts/intent-detection/#Knowledge_Graph_Training';
                    $rootScope.helpLinks.RAND_148 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_149 = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/configuring-ml-parameters/';
                    $rootScope.helpLinks.RAND_150 = helpDocsURL + '/bots/bot-builder-tool/dialog-task/prompt-editor/#Channel-Specific_User_Prompts';
                    $rootScope.helpLinks.RAND_151 = helpDocsURL + '/bots/advanced-topics/sdks/message-templates/';
                    $rootScope.helpLinks.RAND_152 = helpDocsURL + '/bots/advanced-topics/sdks/using-the-botkit-sdk/';
                    $rootScope.helpLinks.RAND_153 = helpDocsURL + '/bots/advanced-topics/sdks/kore-ai-web-sdk-tutorial/';
                    $rootScope.helpLinks.RAND_154 = helpDocsURL + '/bots/advanced-topics/sdks/sdk-app-registration/';
                    $rootScope.helpLinks.RAND_155 = helpDocsURL + '/bots/advanced-topics/sdks/message-templates/';
                    $rootScope.helpLinks.RAND_156 = helpDocsURL + '/bots/api-guide/apis/';
                    $rootScope.helpLinks.RAND_157 = helpDocsURL + '/bots/advanced-topics/sdks/botkit-sdk-tutorial-agent-transfer/';
                    $rootScope.helpLinks.RAND_158 = helpDocsURL + '/bots/advanced-topics/sdks/using-the-botkit-sdk/';
                    $rootScope.helpLinks.RAND_159 = helpDocsURL + '/bots/advanced-topics/sdks/kore-ai-web-sdk-tutorial/';
                    $rootScope.helpLinks.RAND_160 = helpDocsURL + '/bots/advanced-topics/sdks/sdk-app-registration/';
                    $rootScope.helpLinks.RAND_161 = helpDocsURL + '/bots/advanced-topics/sdks/message-templates/';
                    $rootScope.helpLinks.RAND_162 = helpDocsURL + '/bots/api-guide/apis/';
                    $rootScope.helpLinks.RAND_163 = helpDocsURL + '/bots/advanced-topics/sdks/botkit-sdk-tutorial-agent-transfer/';
                    $rootScope.helpLinks.RAND_164 = helpDocsURL + '/bots/advanced-topics/sdks/using-the-botkit-sdk/';
                    $rootScope.helpLinks.RAND_165 = helpDocsURL + '/bots/advanced-topics/sdks/kore-ai-web-sdk-tutorial/';
                    $rootScope.helpLinks.RAND_166 = helpDocsURL + '/bots/advanced-topics/sdks/sdk-app-registration/';
                    $rootScope.helpLinks.RAND_167 = helpDocsURL + '/bots/advanced-topics/sdks/message-templates/';
                    $rootScope.helpLinks.RAND_168 = helpDocsURL + '/bots/api-guide/apis/';
                    $rootScope.helpLinks.RAND_169 = helpDocsURL + '/bots/advanced-topics/sdks/botkit-sdk-tutorial-agent-transfer/';
                    $rootScope.helpLinks.RAND_170 = helpDocsURL + '/bots/advanced-topics/sdks/using-the-botkit-sdk/';
                    $rootScope.helpLinks.RAND_171 = helpDocsURL + '/bots/advanced-topics/sdks/kore-ai-web-sdk-tutorial/';
                    $rootScope.helpLinks.RAND_172 = helpDocsURL + '/bots/advanced-topics/sdks/sdk-app-registration/';
                    $rootScope.helpLinks.RAND_173 = helpDocsURL + '/bots/advanced-topics/sdks/message-templates/';
                    $rootScope.helpLinks.RAND_174 = helpDocsURL + '/bots/api-guide/apis/';
                    $rootScope.helpLinks.RAND_175 = helpDocsURL + '/bots/advanced-topics/sdks/botkit-sdk-tutorial-agent-transfer/';

                    $rootScope.helpLinks.RAND_176 = helpDocsURL + '/bots/advanced-topics/universal-bot/creating-a-universal-bot/#Step_6_Publishing';
                    $rootScope.helpLinks.RAND_177 = helpDocsURL + '/bots/bot-builder-tool/dialog-task/managing-dialogs/#Upgrading_Tasks';
                    $rootScope.helpLinks.RAND_178 = helpDocsURL + '/bots/bot-builder-tool/dialog-task/managing-dialogs/#Deleting_and_Recalling_Tasks';
                    $rootScope.helpLinks.RAND_179 = helpDocsURL + '/bots/bot-builder-tool/analyzing-your-bot/bot-analysis/#Identified_and_Unidentified_Intents';
                    $rootScope.helpLinks.RAND_180 = helpDocsURL + '/bots/bot-builder-tool/analyzing-your-bot/bot-analysis/#Failed_Tasks';
                    $rootScope.helpLinks.RAND_181 = helpDocsURL + '/bots/bot-builder-tool/analyzing-your-bot/bot-analysis/#Performance';
                    $rootScope.helpLinks.RAND_182 = helpDocsURL + '/bots/bot-builder-tool/analyzing-your-bot/conversation-flow/';
                    $rootScope.helpLinks.RAND_183 = helpDocsURL + '/bots/concepts/nlp-concepts/intent-detection/';
                    $rootScope.helpLinks.RAND_184 = helpDocsURL + '/bots/concepts/nlp-concepts/entity-detection/';
                    $rootScope.helpLinks.RAND_185 = helpDocsURL + '/bots/concepts/nlp-concepts/intent-detection/#Knowledge_Graph_Training';
                    $rootScope.helpLinks.RAND_186 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_187 = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/configuring-ml-parameters/';
                    $rootScope.helpLinks.RAND_188 = helpDocsURL + '/bots/bot-builder-tool/analyzing-your-bot/bot-analysis/#Identified_and_Unidentified_Intents';
                    $rootScope.helpLinks.RAND_189 = helpDocsURL + '/bots/bot-builder-tool/analyzing-your-bot/bot-analysis/#Failed_Tasks';
                    $rootScope.helpLinks.RAND_190 = helpDocsURL + '/bots/bot-builder-tool/analyzing-your-bot/bot-analysis/#Performance';
                    $rootScope.helpLinks.RAND_191 = helpDocsURL + '/bots/bot-builder-tool/analyzing-your-bot/conversation-flow/';
                    $rootScope.helpLinks.RAND_192 = helpDocsURL + '/bots/chatbot-overview/nlp-guide/#Intent_Detection';
                    $rootScope.helpLinks.RAND_193 = helpDocsURL + '/bots/chatbot-overview/nlp-guide/#Entity_Detection';
                    $rootScope.helpLinks.RAND_194 = helpDocsURL + '/bots/chatbot-overview/nlp-guide/#Knowledge_Graph';
                    $rootScope.helpLinks.RAND_195 = helpDocsURL + '/bots/bot-builder-tool/train-nlp-optimization/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_196 = helpDocsURL + '/bots/nlp/user-utterances/#ml-parameters';
                    $rootScope.helpLinks.RAND_197 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_198 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Language_Detection_and_Selection';
                    $rootScope.helpLinks.RAND_199 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Enabling_an_Additional_Language';
                    $rootScope.helpLinks.RAND_200 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_201 = helpDocsURL + '/bots/advanced-topics/bot-settings/pii-data-masking/';
                    $rootScope.helpLinks.RAND_202 = helpDocsURL + '/bots/advanced-topics/bot-functions/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_203 = helpDocsURL + '/bots/advanced-topics/bot-management/defining-system-variables/';
                    $rootScope.helpLinks.RAND_204 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_205 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_206 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#inheritance';
                    $rootScope.helpLinks.RAND_207 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_208 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Language_Detection_and_Selection';
                    $rootScope.helpLinks.RAND_209 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Enabling_an_Additional_Language';
                    $rootScope.helpLinks.RAND_210 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_211 = helpDocsURL + '/bots/advanced-topics/bot-settings/pii-data-masking/';
                    $rootScope.helpLinks.RAND_212 = helpDocsURL + '/bots/advanced-topics/bot-functions/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_213 = helpDocsURL + '/bots/advanced-topics/bot-management/defining-system-variables/';
                    $rootScope.helpLinks.RAND_214 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_215 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_216 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#inheritance';
                    $rootScope.helpLinks.RAND_217 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_218 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Language_Detection_and_Selection';
                    $rootScope.helpLinks.RAND_219 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Enabling_an_Additional_Language';
                    $rootScope.helpLinks.RAND_220 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_221 = helpDocsURL + '/bots/advanced-topics/bot-settings/pii-data-masking/';
                    $rootScope.helpLinks.RAND_222 = helpDocsURL + '/bots/advanced-topics/bot-functions/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_223 = helpDocsURL + '/bots/advanced-topics/bot-management/defining-system-variables/';
                    $rootScope.helpLinks.RAND_224 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_225 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_226 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#inheritance';
                    $rootScope.helpLinks.RAND_227 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_228 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Language_Detection_and_Selection';
                    $rootScope.helpLinks.RAND_229 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Enabling_an_Additional_Language';
                    $rootScope.helpLinks.RAND_230 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_231 = helpDocsURL + '/bots/advanced-topics/bot-settings/pii-data-masking/';
                    $rootScope.helpLinks.RAND_232 = helpDocsURL + '/bots/advanced-topics/bot-functions/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_233 = helpDocsURL + '/bots/advanced-topics/bot-management/defining-system-variables/';
                    $rootScope.helpLinks.RAND_234 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_235 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_236 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#inheritance';
                    $rootScope.helpLinks.RAND_237 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_238 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Language_Detection_and_Selection';
                    $rootScope.helpLinks.RAND_239 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Enabling_an_Additional_Language';
                    $rootScope.helpLinks.RAND_240 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_241 = helpDocsURL + '/bots/advanced-topics/bot-settings/pii-data-masking/';
                    $rootScope.helpLinks.RAND_242 = helpDocsURL + '/bots/advanced-topics/bot-functions/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_243 = helpDocsURL + '/bots/advanced-topics/bot-management/defining-system-variables/';
                    $rootScope.helpLinks.RAND_244 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_245 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_246 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#inheritance';
                    $rootScope.helpLinks.RAND_247 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_248 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Language_Detection_and_Selection';
                    $rootScope.helpLinks.RAND_249 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Enabling_an_Additional_Language';
                    $rootScope.helpLinks.RAND_250 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_251 = helpDocsURL + '/bots/advanced-topics/bot-settings/pii-data-masking/';
                    $rootScope.helpLinks.RAND_252 = helpDocsURL + '/bots/advanced-topics/bot-functions/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_253 = helpDocsURL + '/bots/advanced-topics/bot-management/defining-system-variables/';
                    $rootScope.helpLinks.RAND_254 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_255 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_256 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#inheritance';
                    $rootScope.helpLinks.RAND_257 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_258 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Language_Detection_and_Selection';
                    $rootScope.helpLinks.RAND_259 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Enabling_an_Additional_Language';
                    $rootScope.helpLinks.RAND_260 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_261 = helpDocsURL + '/bots/advanced-topics/bot-settings/pii-data-masking/';
                    $rootScope.helpLinks.RAND_262 = helpDocsURL + '/bots/advanced-topics/bot-functions/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_263 = helpDocsURL + '/bots/advanced-topics/bot-management/defining-system-variables/';
                    $rootScope.helpLinks.RAND_264 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_265 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_266 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#inheritance';
                    $rootScope.helpLinks.RAND_267 = helpDocsURL + '/bots/advanced-topics/bot-management/defining-system-variables/';
                    $rootScope.helpLinks.RAND_268 = helpDocsURL + '/bots/advanced-topics/bot-management/defining-system-variables/';
                    $rootScope.helpLinks.RAND_269 = helpDocsURL + '/bots/advanced-topics/bot-management/defining-system-variables/';
                    $rootScope.helpLinks.RAND_270 = helpDocsURL + '/bots/advanced-topics/bot-management/defining-system-variables/';
                    $rootScope.helpLinks.RAND_271 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_272 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Language_Detection_and_Selection';
                    $rootScope.helpLinks.RAND_273 = helpDocsURL + '/bots/advanced-topics/multi-lingual/building-multi-language-bots/#Translatable_Components';
                    $rootScope.helpLinks.RAND_274 = helpDocsURL + '/bots/bot-builder-tool/develop/dialog-task/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_275 = helpDocsURL + '/bots/advanced-topics/bot-settings/pii-data-masking/';
                    $rootScope.helpLinks.RAND_276 = helpDocsURL + '/bots/advanced-topics/bot-functions/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_277 = helpDocsURL + '/bots/bot-admin/bots-management/using-bot-variables/';
                    $rootScope.helpLinks.RAND_278 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_279 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#Smart_Bot_Settings';
                    $rootScope.helpLinks.RAND_280 = helpDocsURL + '/bots/bot-builder-tool/develop/bot-types/smart-bot/defining-a-smart-bot/#inheritance';

                    $rootScope.helpLinks.RAND_281 = helpDocsURL + '/bots/nlp/traits/';
                    $rootScope.helpLinks.RAND_282 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/';
                    $rootScope.helpLinks.RAND_283 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/test-train-bot/';
                    $rootScope.helpLinks.RAND_284 = helpDocsURL + '/bots/bot-builder/optimizing-bots/additional-notes-nlp-settings-guidelines/';

                    $rootScope.helpLinks.RAND_285 = helpDocsURL + '/docs/bots/bot-builder/develop/dialog-tasks/working-with-tone-processing/';
                    $rootScope.helpLinks.RAND_286 = helpDocsURL + 'bots/advanced-topics/sentiment-management/';
                    $rootScope.helpLinks.RAND_287 = helpDocsURL + '/bots/kore-web-sdk/event-based-bot-actions/';
                    $rootScope.helpLinks.RAND_288 = helpDocsURL + 'bots/bot-builder/develop/dialog-tasks/context-object/';
                    //Custom Dashboard help links
                    $rootScope.helpLinks.CUSTOM_DASHBOARD = helpDocsURL + '/bots/analyzing-your-bot/custom-dashboard/';
                    $rootScope.helpLinks.RAND_289 = helpDocsURL + '/bots/analyzing-your-bot/custom-dashboard/#Analytics';
                    $rootScope.helpLinks.RAND_290 = helpDocsURL + '/bots/analyzing-your-bot/custom-dashboard/#Messages';
                    $rootScope.helpLinks.RAND_291 = helpDocsURL + '/bots/analyzing-your-bot/custom-dashboard/#Sessions';
                    $rootScope.helpLinks.RAND_292 = helpDocsURL + '/bots/analyzing-your-bot/custom-dashboard/';
                    $rootScope.helpLinks.RAND_293 = helpDocsURL + '/bots/analyzing-your-bot/custom-dashboard/';
                    $rootScope.helpLinks.RAND_294 = helpDocsURL + '/bots/analyzing-your-bot/custom-dashboard/';
                    $rootScope.helpLinks.RAND_295 = helpDocsURL + '/bots/how-tos/how-to-create-custom-dashboard/';

                    //Small Talk
                    $rootScope.helpLinks.SMALL_TALK = helpDocsURL + '/bots/bot-builder-tool/small-talk/';
                    $rootScope.helpLinks.SMALL_TALK_CREATE_HELP = helpDocsURL +'/bots/bot-builder-tool/small-talk/'; 
                    $rootScope.helpLinks.RAND_296 = helpDocsURL + '/bots/bot-builder-tool/small-talk/';
                    $rootScope.helpLinks.RAND_297 = helpDocsURL + '/bots/bot-builder-tool/small-talk/#Default_Small_Talk';
                    $rootScope.helpLinks.RAND_298 = helpDocsURL + '/bots/bot-builder-tool/small-talk/#Creation';
                    $rootScope.helpLinks.RAND_299 = helpDocsURL + '/bots/bot-builder-tool/small-talk/#Terminology';
                    $rootScope.helpLinks.RAND_300 = helpDocsURL + '/bots/nlp/additional-notes-nlp-settings-guidelines/#Patterns';
                    //Widgets & Panels
                    $rootScope.helpLinks.RAND_301 = helpDocsURL + '/bots/bot-builder-tool/digital-views/';
                    $rootScope.helpLinks.RAND_302 = helpDocsURL + '/bots/bot-builder-tool/digital-views/#Configure_Widgets';
                    $rootScope.helpLinks.RAND_303 = helpDocsURL + '/bots/bot-builder-tool/digital-views/#Setup';
                    $rootScope.helpLinks.RAND_304 = helpDocsURL + '/bots/bot-builder-tool/digital-views/#Set_up_Panels';
                    $rootScope.helpLinks.RAND_305 = helpDocsURL + '/bots/bot-builder-tool/digital-views/#Set_up_Panels';
                    $rootScope.helpLinks.RAND_306 = helpDocsURL + '/bots/bot-builder-tool/digital-views/#Hosting';
                    //Storyboard
                    $rootScope.helpLinks.STORYBOARD = helpDocsURL + '/bots/bot-builder-tool/bot-creation/storyboard/';
                    $rootScope.helpLinks.RAND_307 = helpDocsURL + '/bots/bot-builder-tool/bot-creation/storyboard/';
                    $rootScope.helpLinks.RAND_308 = helpDocsURL + '/bots/bot-builder-tool/bot-creation/storyboard/#Scenes';
                    $rootScope.helpLinks.RAND_309 = helpDocsURL + '/bots/bot-builder-tool/bot-creation/storyboard/#Bot_Messages_Templates';
                    $rootScope.helpLinks.RAND_310 = helpDocsURL + '/bots/bot-builder-tool/bot-creation/storyboard/#Scene_Options';

                    $rootScope.helpLinks.KG_ANALYSIS = helpDocsURL + 'bots/bot-builder-tool/knowledge-task/knowledge-ontology-analysis/';

                    $rootScope.helpLinks.KG_AUTO_GENERATION = helpDocsURL + 'bots/bot-builder-tool/knowledge-task/auto-generation-of-ontology/';
                    //Manage Interruptions
                    $rootScope.helpLinks.RAND_311 = helpDocsURL + '/bots/bot-intelligence/interruption-handling-context-switching-intents/#Manage_Behavior_for_FAQs';
                    $rootScope.helpLinks.RAND_312 = helpDocsURL + '/bots/bot-intelligence/interruption-handling-context-switching-intents/#Manage_Behavior_for_Small_Talk';
                    $rootScope.helpLinks.RAND_313 = helpDocsURL + '/bots/bot-intelligence/interruption-handling-context-switching-intents/#Manage_Behavior_for_Ambiguous_Intents';
                    
                    // UIForms
                    $rootScope.helpLinks.RAND_314 = helpDocsURL + '/bots/bot-builder-tool/digital-forms';
                    $rootScope.helpLinks.RAND_315 = helpDocsURL + '/bots/bot-builder-tool/digital-forms/#Form_Creation';
                    $rootScope.helpLinks.RAND_316 = helpDocsURL + '/bots/bot-builder-tool/digital-forms/#Component_Details';
                    $rootScope.helpLinks.RAND_317 = helpDocsURL + '/bots/bot-builder-tool/digital-forms/#Form_Invocation';
                    $rootScope.helpLinks.RAND_318 = helpDocsURL + '/bots/bot-builder-tool/digital-forms/#UI_Flow';
                    $rootScope.helpLinks.RAND_319 = helpDocsURL + '/bots/bot-builder-tool/digital-forms/#From_Tasks';
                    $rootScope.helpLinks.RAND_320 = helpDocsURL + '/bots/bot-builder-tool/digital-forms/#Components-Dialog_Node_Mapping';

                    //Bot Version
                    $rootScope.helpLinks.RAND_321 = helpDocsURL + '/bots/bot-admin/bots-management/bot-versioning/#Creation';
                    $rootScope.helpLinks.RAND_322 = helpDocsURL + '/bots/bot-admin/bots-management/bot-versioning/#Version_Restoration';
                    $rootScope.helpLinks.RAND_323 = helpDocsURL + '/bots/bot-admin/bots-management/bot-versioning/#Types';
                    //Data Tables
                    $rootScope.helpLinks.RAND_324 = helpDocsURL + '/bots/advanced-topics/data-as-a-service/';
                    $rootScope.helpLinks.RAND_325 = helpDocsURL + '/bots/advanced-topics/data-as-a-service/#Data_table_creation';
                    $rootScope.helpLinks.RAND_326 = helpDocsURL + '/bots/advanced-topics/data-as-a-service/#Data_Manipulation';
                    $rootScope.helpLinks.RAND_327 = helpDocsURL + '/bots/advanced-topics/data-as-a-service/#Index_Definition';
                    $rootScope.helpLinks.RAND_328 = helpDocsURL + '/bots/advanced-topics/data-as-a-service/#Assignments';
                    $rootScope.helpLinks.RAND_329 = helpDocsURL + '/bots/advanced-topics/data-as-a-service/#Table_View_Definitions';
                    $rootScope.helpLinks.RAND_330 = helpDocsURL + '/bots/advanced-topics/data-as-a-service/#Join_Rules';
                    $rootScope.helpLinks.RAND_331 = helpDocsURL + '/bots/advanced-topics/data-as-a-service/#App_Definition';
                    $rootScope.helpLinks.RAND_332 = helpDocsURL + '/bots/advanced-topics/data-as-a-service/#reserve-words';
                    //UB2.0 training
                    $rootScope.helpLinks.RAND_333 = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#';
                    $rootScope.helpLinks.RAND_334 = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#';
                    $rootScope.helpLinks.RAND_335 = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#Invocation_Names';
                    $rootScope.helpLinks.RAND_336 = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#Utterances';
                    $rootScope.helpLinks.RAND_337 = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#Fallback_Bots';
                    $rootScope.helpLinks.RAND_338 = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#Eligible_Bots';
                    $rootScope.helpLinks.RAND_339 = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#Configurations';
                    //Manage Sessions
                    $rootScope.helpLinks.RAND_340 = helpDocsURL + '/bots/bot-settings/bot-management/bot-sessions/';
                    $rootScope.helpLinks.RAND_341 = helpDocsURL + '/bots/bot-settings/bot-management/bot-sessions/#Manage_Sessions';
                    $rootScope.helpLinks.RAND_342 = helpDocsURL + '/bots/bot-settings/bot-management/bot-sessions/#Implementation';
                    $rootScope.helpLinks.KG_ANNOTATION = helpDocsURL + '/bots/bot-builder-tool/knowledge-task/knowledge-extraction-service/#annotate&extract';
                    //Usage Metrics
                    $rootScope.helpLinks.RAND_343 = helpDocsURL + '/bots/analyzing-your-bot/dashboard/#Realtime_Status';
                    $rootScope.helpLinks.RAND_344 = helpDocsURL + '/bots/analyzing-your-bot/dashboard/#Usage_Metrics';
                    $rootScope.helpLinks.RAND_345 = helpDocsURL + '/bots/analyzing-your-bot/dashboard/#Usage_Metrics';
                    $rootScope.helpLinks.RAND_346 = helpDocsURL + '/bots/analyzing-your-bot/dashboard/#Filter_Criteria';
                    //Containment Metrics
                    $rootScope.helpLinks.RAND_347 = helpDocsURL + '/bots/analyzing-your-bot/dashboard/#Realtime_Status';
                    $rootScope.helpLinks.RAND_348 = helpDocsURL + '/bots/analyzing-your-bot/dashboard/#Containment_Metrics';
                    $rootScope.helpLinks.RAND_349 = helpDocsURL + '/bots/analyzing-your-bot/dashboard/#containment-details';
                    $rootScope.helpLinks.RAND_350 = helpDocsURL + '/bots/analyzing-your-bot/dashboard/#Filter_Criteria';
                    //dialog tasks - group node
                    $rootScope.helpLinks.RAND_351 = helpDocsURL + '/bots/how-tos/intent-scoping-using-group-node/';
                    $rootScope.helpLinks.RAND_352 = helpDocsURL + '/bots/bot-builder-tool/dialog-task/grouping-nodes/';
                    $rootScope.helpLinks.RAND_353 = helpDocsURL + '/bots/how-tos/intent-scoping-using-group-node/';
                    $rootScope.helpLinks.RAND_354 = helpDocsURL + '/bots/nlp/user-utterances/';
                    //Plan & Usage
                    $rootScope.helpLinks.RAND_355 = helpDocsURL + '/bots/bot-settings/bot-management/subscription-plans/';
                    $rootScope.helpLinks.RAND_356 = helpDocsURL + '/bots/bot-settings/bot-management/plan-management/';
                    $rootScope.helpLinks.RAND_357 = helpDocsURL + '/bots/bot-settings/bot-management/plan-management/';
                    $rootScope.helpLinks.RAND_358 = helpDocsURL + '/bot-settings/bot-management/plan-management/';
                    $rootScope.helpLinks.RAND_359 = helpDocsURL + '/bot-settings/bot-management/subscription-plans/';
                    $rootScope.helpLinks.RAND_360 = helpDocsURL + '/bot-settings/bot-management/subscription-plans/#Support_Plans';
                    //Invoice
                    $rootScope.helpLinks.RAND_361 = helpDocsURL + '/bots/bot-settings/bot-management/plan-management/#Invoices';
                    //Process Apps
                    $rootScope.helpLinks.PROCESS_DOC = helpDocsURL + '/process-apps/overview/';
                    $rootScope.helpLinks.PROCESS_INTRO = helpDocsURL + '/process-apps/introduction-to-process-apps/';
                    $rootScope.helpLinks.CREATE_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-create-a-process-app/';
                    $rootScope.helpLinks.SHARE_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-share-a-process-app/';

                    $rootScope.helpLinks.PROCESS_FORMS_INTRO = helpDocsURL + '/process-apps/how-to-articles/how-to-define-a-digital-form/';

                    $rootScope.helpLinks.IMPORT_EXPORT_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-import-export-a-process-app/';
                    $rootScope.helpLinks.ANALYZE_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-analyze-performance/';
                    $rootScope.helpLinks.ADD_CHANNEL_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-add-channels-to-process-app/';
                    $rootScope.helpLinks.PUBLISH_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-publish-a-process-app/';
                    $rootScope.helpLinks.DEFINE_FLOW_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-define-a-flow/';

                    $rootScope.helpLinks.TRIGGER_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-define-trigger/';
                    $rootScope.helpLinks.STENILS_USE_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-use-stencils/';
                    $rootScope.helpLinks.USE_EVENTS_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-use-events/';
                    $rootScope.helpLinks.ACEESS_CONTROL_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-add-access-control/';
                    $rootScope.helpLinks.DEFINE_HUMANTASK_PROCESS_APP = helpDocsURL + '/process-apps/flow/tasks/human-task/';
                    $rootScope.helpLinks.CALL_SUBFLOW_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-call-a-subflow/';
                    $rootScope.helpLinks.SIMULATE_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-simulate-a-process-instance/';
                    $rootScope.helpLinks.CREATE_PUBLISH_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/create-and-publish-the-process-app/';

                    $rootScope.helpLinks.PROCESS_APP_CHANGE_LOG = helpDocsURL + '/process-apps/how-to-articles/how-to-view-changes-logs/';
                    $rootScope.helpLinks.BOT_PERMISSION_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-add-bot-p…-the-process-app/';
                    $rootScope.helpLinks.VERSION_CREATE_PROCESS_APP = helpDocsURL + '/process-apps/how-to-articles/how-to-create-or-restore-a-version/';

                    /* help links for home page for new help */
                    $rootScope.helpLinks.CHAT_OVER_VIEW = helpDocsURL + '/bots/chatbot-overview/chatbot-overview/';
                    $rootScope.helpLinks.CHAT_CONCEPT = helpDocsURL + '/bots/chatbot-overview/about-bots/';
                    $rootScope.helpLinks.GET_STARTED= helpDocsURL + '/bots/chatbot-overview/getting-started-bots/';
                    $rootScope.helpLinks.ANALYZE= helpDocsURL + '/bots/analyzing-your-bot/analyzing-your-bot/';

                } else {
                    //OLD VERSION DOCS
                    _helpDocVersion = parseFloat(env_conf['app-version']).toFixed(1);
                    if (_helpDocVersion <= 6.3) {
                        _helpDocVersion = 'v6-3';//Delimiter
                    } else {
                        _helpDocVersion = 'v6-4';
                        helpDocsURL = $rootScope.developerURL + '/' + _helpDocVersion + '/docs';
                    }
                    
                    $rootScope.helpLinks.HOME = helpDocsURL + '/bots/bot-builder/getting-started-bots/about-bots/';
                    $rootScope.helpLinks.NEW_BOT = helpDocsURL + '/bots/bot-builder/getting-started-bots/creating-a-new-bot/';
                    $rootScope.helpLinks.EDIT_BOT = helpDocsURL + '/bots/bot-builder/getting-started-bots/editing-an-existing-bot/';
                    $rootScope.helpLinks.BOT_STORE_SETTINGS = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/bot-store-settings/';
                    $rootScope.helpLinks.SHARE_BOT = helpDocsURL + '/bots/bot-builder/getting-started-bots/sharing-bots-for-development/';
                    $rootScope.helpLinks.UNIVERSAL_BOT = helpDocsURL + '/bots/bot-builder/getting-started-bots/defining-universal-bots/';
                    $rootScope.helpLinks.PUBLISH_UNIVERSAL_BOT = helpDocsURL + '/bots/bot-builder/getting-started-bots/defining-universal-bots/';
                    $rootScope.helpLinks.UNIVERSAL_BOT_LINKEDBOTS = helpDocsURL + '/bots/bot-builder/getting-started-bots/defining-universal-bots/creating-a-universal-bot/step-2-add-linked-bots/';
                    $rootScope.helpLinks.BOT_ADVANCED_SETTINGS = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/';
                    $rootScope.helpLinks.CREATE_APP = helpDocsURL + '/bots/bot-builder/adding-channels-to-your-bot/adding-the-webmobile-client-channel/';
                    $rootScope.helpLinks.JWT =  "https://developer.kore.ai/tools/jwt/";

                    $rootScope.helpLinks.BOT_ANALYTICS = helpDocsURL + "/bots/bot-builder/analyzing-your-bot/";
                    $rootScope.helpLinks.NLP_DEYSTIFIED = helpDocsURL + "/bots/bot-builder/optimizing-bots/testing-your-bot-with-nlp/";
                    $rootScope.helpLinks.MULTI_LINGUAL_BOTS = helpDocsURL + "/bots/bot-builder/getting-started-bots/building-multi-language-bots";
                    $rootScope.helpLinks.EXPORT_IMPORT_BOT = helpDocsURL + "/bots/bot-builder/exporting-and-importing-a-bot";
                    $rootScope.helpLinks.NO_ALERTS = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/about-alert-tasks/';
                    $rootScope.helpLinks.NO_ACTIONS = helpDocsURL + '/bot-builder/defining-bot-tasks/kore-bot-action-tasks/about-action-tasks/';
                    $rootScope.helpLinks.NO_INFORMATION_TASKS = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/create-a-report-task/about-information-tasks/';
                    $rootScope.helpLinks.NO_CHANNELS = helpDocsURL + '/bots/bot-builder/adding-channels-to-your-bot/';
                    $rootScope.helpLinks.NO_FLOWS = helpDocsURL + '/bots/bot-builder/creatingflows/';

                    $rootScope.helpLinks.PUBLISH_ALERT = helpDocsURL + '/bots/bot-builder/getting-started-bots/publishing-tasks/';
                    $rootScope.helpLinks.PUBLISH_ACTION = helpDocsURL + '/bots/bot-builder/getting-started-bots/publishing-tasks/';

                    $rootScope.helpLinks.VIEW_CHANGE_LOG = helpDocsURL + '/bots/bot-builder/getting-started-bots/viewing-the-bot-change-log/';

                    $rootScope.helpLinks.TEST_BOT = helpDocsURL + '/bots/bot-builder/optimizing-bots/testing-your-bot-with-nlp/';
                    $rootScope.helpLinks.INTENT_ENTITY = helpDocsURL + '/bots/bot-builder/optimizing-bots/manage-intents-entities/';
                    $rootScope.helpLinks.NLP_SETTINGS = helpDocsURL;
                    $rootScope.helpLinks.SYNONYMS = helpDocsURL + '/bots/bot-builder/optimizing-bots/managing-synonyms/';
                    $rootScope.helpLinks.PATTERNS = helpDocsURL + '/bots/bot-builder/optimizing-bots/managing-patterns/';
                    $rootScope.helpLinks.CHAT_RESPONSE = helpDocsURL + '/bots/bot-builder/optimizing-bots/managing-chat-responses/';
                    $rootScope.helpLinks.CHAT_HISTORY = helpDocsURL + '/bots/bot-builder/optimizing-bots/viewing-chat-history/';
                    $rootScope.helpLinks.CHAT_LOGS = helpDocsURL + '/bots/bot-builder/optimizing-bots/viewing-chat-logs/';
                    $rootScope.helpLinks.NEGATIVE_PATTERNS = helpDocsURL + '/bots/bot-builder/optimizing-bots/fundamental-meaning/negative-patterns/';
                    $rootScope.helpLinks.LINKED_BOT_TRAINING  = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#Training';
                    $rootScope.helpLinks.SETTINGS  = helpDocsURL + '/bots/advanced-topics/universal-bot/training-a-universal-bot/#Configurations';
                     $rootScope.helpLinks.SMART_UNIVERSAL_LINK = helpDocsURL + '/bots/advanced-topics/universal-bot/universal-bots/';

                    $rootScope.helpLinks.FM_MODEL_THRESHOLD_HELP = helpDocsURL + '/bots/nlp/fundamental-meaning/#Threshold_Configurations/';
                    $rootScope.helpLinks.KG_MODEL_THRESHOLD_HELP = helpDocsURL + '/bots/nlp/knowledge-graph/#Threshold_Configurations/';
                    $rootScope.helpLinks.RR_MODEL_THRESHOLD_HELP = helpDocsURL + '/bots/nlp/nlp-detection/#Thresholds_Configuration/';
                    $rootScope.helpLinks.ADV_NLP_CONFIG = helpDocsURL + '/bots/nlp/advanced-nlp-configurations/';
                    $rootScope.helpLinks.FEATURE_EXTRACTION = helpDocsURL + '/bots/nlp/user-utterances/#feature_extraction';

                    $rootScope.helpLinks.ALERTS_TASK_BASIC = helpDocsURL + '/bots/bot-builder/notification-tasks/alert-task-basic-settings/';
                    $rootScope.helpLinks.ALERT_AUTH = helpDocsURL + '/bots/bot-builder/notification-tasks/setting-up-authentication-for-alert-tasks/';
                    $rootScope.helpLinks.ALERT_REQ_REST = helpDocsURL + '/bots/bot-builder/notification-tasks/configuring-the-alert-task-request-object-webservice-rest/';
                    $rootScope.helpLinks.ALERT_REQ_SOAP = helpDocsURL + '/bots/bot-builder/notification-tasks/configuring-the-alert-task-request-object-webservice-soap/';
                    $rootScope.helpLinks.ALERT_REQ_WEBHOOK = helpDocsURL + '/bots/bot-builder/notification-tasks/configuring-the-alert-task-request-object-webhook/';
                    $rootScope.helpLinks.ALERT_REQ_RSS = helpDocsURL + '/bots/bot-builder/notification-tasks/configuring-the-alert-task-request-object-rss/';
                    $rootScope.helpLinks.ALERT_RES = helpDocsURL + '/bots/bot-builder/notification-tasks/configuring-the-response-object-for-an-alert-task/';
                    $rootScope.helpLinks.ALERT_ERROR = helpDocsURL + '/bots/bot-builder/notification-tasks/error-messages-for-alert-tasks/';
                    $rootScope.helpLinks.ALERT_SETTING = helpDocsURL + '/bots/bot-builder/notification-tasks/settings-for-alert-tasks/';
                    $rootScope.helpLinks.ALERT_REVIEW = helpDocsURL + '/bots/bot-builder/notification-tasks/reviewing-an-ale…sk-configuration/';

                    $rootScope.helpLinks.ACTIONS_TASK_BASIC = helpDocsURL + '/bots/bot-builder/kore-bot-action-tasks/basic-settings-for-an-action-task/';
                    $rootScope.helpLinks.ACTIONS_AUTH = helpDocsURL + '/bots/bot-builder/kore-bot-action-tasks/setting-up-authentication-for-action-tasks/';
                    $rootScope.helpLinks.ACTIONS_REQ_REST = helpDocsURL + '/bots/bot-builder/kore-bot-action-tasks/configuring-the-action-task-request-rest/';
                    $rootScope.helpLinks.ACTIONS_REQ_SOAP = helpDocsURL + '/bots/bot-builder/kore-bot-action-tasks/configuring-the-action-task-request-soap/';
                    $rootScope.helpLinks.ACTIONS_RES = helpDocsURL + '/bots/bot-builder/kore-bot-action-tasks/configuring-the-action-task-response/';
                    $rootScope.helpLinks.ACTIONS_ERROR = helpDocsURL + '/bots/bot-builder/kore-bot-action-tasks/error-messages-for-action-tasks/';
                    $rootScope.helpLinks.ACTIONS_REVIEW = helpDocsURL + '/bots/bot-builder/kore-bot-action-tasks/reviewing-an-action-task-configuration/';

                    $rootScope.helpLinks.INFORMATION_TASK_BASIC = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/create-a-report-task/general-tab-settings-for-an-information-task/';
                    $rootScope.helpLinks.INFORMATION_AUTH = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/create-a-report-task/api-request-tab-authentication-settings-for-an-information-task/';
                    $rootScope.helpLinks.INFORMATION_REQ_REST = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/create-a-report-task/api-request-tab-information-task-rest/';
                    $rootScope.helpLinks.INFORMATION_REQ_SOAP = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/create-a-report-task/api-request-tab-information-task-soap/';
                    $rootScope.helpLinks.INFORMATION_RES = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/create-a-report-task/defining-the-bot-response-for-an-information-task/';

                    $rootScope.helpLinks.ADD_CHANNEL = helpDocsURL + '/bots/bot-builder/adding-channels-to-your-bot/';
                    $rootScope.helpLinks.ADD_CHANNEL_FB = helpDocsURL + '/bots/bot-builder/adding-channels-to-your-bot/adding-the-facebook-channel/';
                    $rootScope.helpLinks.ADD_CHANNEL_SLACK = helpDocsURL + '/bots/bot-builder/adding-channels-to-your-bot/adding-the-slack-channel/';
                    $rootScope.helpLinks.ADD_CHANNEL_WEB_MOB = helpDocsURL + '/bots/bot-builder/adding-channels-to-your-bot/adding-the-webmobile-client-channel/';
                    $rootScope.helpLinks.ADD_CHANNEL_SMS = helpDocsURL + '/bots/bot-builder/adding-channels-to-your-bot/adding-the-sms-channel/';
                    $rootScope.helpLinks.ADD_CHANNEL_KORE = helpDocsURL + '/bots/bot-builder/adding-channels-to-your-bot/adding-the-kore-channel/';
                    $rootScope.helpLinks.ADD_CHANNEL_EMAIL = helpDocsURL + '/bots/bot-builder/adding-channels-to-your-bot/adding-the-email-channel/';
                    $rootScope.helpLinks.ADD_CHANNEL_TWITTER = helpDocsURL + "/bots/bot-builder/adding-channels-to-your-bot/adding-the-twitter-channel/";
                    $rootScope.helpLinks.ADD_CHANNEL_SKYPE = helpDocsURL + "/bots/bot-builder/adding-channels-to-your-bot/adding-the-skype-channel/";
                    $rootScope.helpLinks.ADD_CHANNEL_TROPO = helpDocsURL + "/bots/bot-builder/adding-channels-to-your-bot/adding-the-cisco-tropo-channel/";
                    $rootScope.helpLinks.ADD_CHANNEL_WFACEBOOK = helpDocsURL + "/bots/bot-builder/adding-channels-to-your-bot/adding-the-facebook-workplace-channel/";
                    $rootScope.helpLinks.FLOWS_CREATE = helpDocsURL + '/bots/bot-builder/creatingflows/';
                    $rootScope.helpLinks.SANDBOX_CONFIGURATION = helpDocsURL + '/bots/advanced-topics/ivr-integration/ivr-integration/#Sandbox_Configuration/';
                    /*
                     knowledge task help links
                     */

                    $rootScope.helpLinks.KNOWLEDGE_GRAPH = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/';

                    $rootScope.helpLinks.NOKT_LEARNMORE = $rootScope.helpLinks.KNOWLEDGE_GRAPH;
                    $rootScope.helpLinks.ADDKT_LEARNMORE = $rootScope.helpLinks.KNOWLEDGE_GRAPH;



                    /*View logs helplinks*/
                    $rootScope.helpLinks.VIEW_LOG = helpDocsURL + '/bots/bot-builder/kore-bot-action-tasks/view-logs-for-action-tasks/';
                    $rootScope.helpLinks.VIEW_LOG_ALERT = helpDocsURL + '/bots/bot-builder/kore-bot-action-tasks/view-logs-for-alert-tasks/';


                    /*Version helplinks*/
                    $rootScope.helpLinks.VERSION_ALERT = helpDocsURL + '/version-history-for-alert-tasks/';
                    $rootScope.helpLinks.VERSION_ACTION = helpDocsURL + '/bots/bot-builder/kore-bot-action-tasks/version-history-action-tasks/';

                    $rootScope.helpLinks.VARIABLE_MANAGEMENT_HELP = helpDocsURL + "/bot-builder/exporting-and-importing-a-bot/defining-system-variables/";
                    /*Utterances helplinks*/
                    $rootScope.helpLinks.UTTERENCES_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/user-utterances/';
                    $rootScope.helpLinks.ML_ADVANCED = helpDocsURL + '/bots/bot-builder/optimizing-bots/user-utterances/';

                    $rootScope.helpLinks.CISCO_SPARK_HELP = helpDocsURL + '/bots/bot-builder/adding-channels-to-your-bot/adding-the-cisco-spark-channel/';

                    $rootScope.helpLinks.NOT_READY_PUBLISH_HELP = helpDocsURL + '/bots/publishing-tasks/';

                    $rootScope.helpLinks.DEPLOYMENTTAB_HELP = helpDocsURL + '/bots/bot-builder/publishing-tasks/selecting-tasks-to-publish/';
                    $rootScope.helpLinks.CONFIRMTAB_HELP = helpDocsURL + '/bots/bot-builder/publishing-tasks/confirming-tasks-for-publishing/';

                    /*help link for smart bot*/
                    $rootScope.helpLinks.SMARTBOT = helpDocsURL + '/bots/bot-builderenv_conf/getting-started-bots/working-with-smart-bots/';
                    $rootScope.helpLinks.ABOUTSMARTBOT = helpDocsURL + '/bots/bot-builder/working-with-smart-bots/subscribing-to-a-smart-bot/';
                    $rootScope.helpLinks.UNLOCKSOLUTIONBOT = helpDocsURL + '/bots/bot-builder/getting-started-bots/working-with-smart-bots/customizing-a-smart-bot/';
                    $rootScope.helpLinks.INSTALLING_SAMPLEBOT = helpDocsURL + '/bots/bot-builder/getting-started-bots/installing-sample-bots/';

                    $rootScope.helpLinks.BOT_TASKS_HELP = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/';
                    $rootScope.helpLinks.DIALOG_TASK_HELP = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/';
                    $rootScope.helpLinks.ALERT_TASK_HELP = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/';
                    $rootScope.helpLinks.ACTION_TASK_HELP = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-bot-action-tasks/';
                    $rootScope.helpLinks.INFORMATION_TASK_HELP = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/create-a-report-task/';
                    $rootScope.helpLinks.KNOWLEDGE_TASK_HELP = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/knowledge-tasks/';
                    $rootScope.helpLinks.KNOWLEDGE_TASK_CREATE_HELP = helpDocsURL + "/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/creating-a-knowledge-graph/";
                    $rootScope.helpLinks.FLOWS_TASK_HELP = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/creatingflows/';
                    $rootScope.helpLinks.BOTS_TYPES = helpDocsURL + '/bots/bot-builder/bot-types/';
                   


                    $rootScope.helpLinks.BOT_NL_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/';
                    $rootScope.helpLinks.TRAINING_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/testing-your-bot-with-nlp/';
                    $rootScope.helpLinks.MACHINE_LEARINING_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/user-utterances/';
                    $rootScope.helpLinks.ML_MODEL_THRESHOLD_HELP = helpDocsURL + '/bots/nlp/user-utterances/#Threshold_Configurations';
                    $rootScope.helpLinks.SYNONYMS_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/managing-synonyms/';
                    $rootScope.helpLinks.RANK_CONFIGURATION      = helpDocsURL + 'bots/nlp/nlp-detection/#Configuration';
                    $rootScope.helpLinks.PATTERNS_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/managing-patterns/';
                    $rootScope.helpLinks.STANDARD_RESPONSE_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/managing-chat-responses/';
                    $rootScope.helpLinks.IWORDS_FMEMORY_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/manage-intents-entities/';
                    $rootScope.helpLinks.TIS_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/';
                    $rootScope.helpLinks.BOT_CHANNEL_HELP = helpDocsURL + '/bots/bot-builder/adding-channels-to-your-bot/';
                    $rootScope.helpLinks.DEFAULT_DAILOG_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/default-dialog/';
                    $rootScope.helpLinks.DEFAULT_DAILOG_UNIVERSAL_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/default-dialog/';
                    $rootScope.helpLinks.MULTI_INTENT_DETECTION_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/bot-intelligence/multi-intent-detection/';
                    $rootScope.helpLinks.AMEND_ENTITY = helpDocsURL + '/bots/bot-builder/optimizing-bots/bot-intelligence/amend-entity/';
                    $rootScope.helpLinks.MANAGE_INTERRUPTIONS = helpDocsURL + '/bots/bot-builder/optimizing-bots/bot-intelligence/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.THRESHOLDS_CONFIG_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/fundamental-meaning/threshold-configurations/';
                    $rootScope.helpLinks.NL_ADVANCE_SETTINGS_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/user-utterances/auto-training-negative-patterns/';




                    $rootScope.helpLinks.BOT_SETTINGS_HELP = helpDocsURL + '/bots/advanced-topics/general-settings/';
                    $rootScope.helpLinks.BOT_SDKCONF_HELP = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/sdk-configuration/';
                    $rootScope.helpLinks.BOT_CHANGELOG_HELP = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/viewing-the-bot-change-log/';
                    $rootScope.helpLinks.BOT_VERSION_HELP   = helpDocsURL + '/bots/bot-admin/bots-management/bot-versioning/';
                    $rootScope.helpLinks.BOT_MANAGESESSION_HELP = helpDocsURL +'/bots/bot-admin/bots-management/bot-sessions/';
                    $rootScope.helpLinks.RESTORE_VERSION    = helpDocsURL + '/bots/bot-admin/bots-management/bot-versioning/#Version_Restoration';
                    $rootScope.helpLinks.BOT_AUTHENTICATION_HELP = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/bot-authentication/';
                    $rootScope.helpLinks.BOT_SHARE_HELP = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/sharing-bots-for-development/';
                    $rootScope.helpLinks.BOT_DELETE_HELP = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/deleting-a-bot/';
                    $rootScope.helpLinks.LANGUAGE_MANAGEMENT_HELP = helpDocsURL + '/bot-builder/getting-started-bots/building-multi-language-bots/';
                    $rootScope.helpLinks.PII_MASKING = helpDocsURL + '/bot-builder/editing-an-existing-bot/pii-data-masking/';
                    $rootScope.helpLinks.BOT__HELP = helpDocsURL + '';
                    $rootScope.helpLinks.BOT__HELP = helpDocsURL + '';
                    $rootScope.helpLinks.IVR_INTEGRATION = helpDocsURL + "/bot-builder/ivr-integration";
                    $rootScope.helpLinks.BOT_FUNCTIONS_HELP = helpDocsURL + "/bots/advanced-topics/reusing-bot-functions-custom-script-file/";


                    $rootScope.helpLinks.BOT_PUBLISH_HELP = helpDocsURL + '/bots/bot-builder/publishing-tasks/';
                    $rootScope.helpLinks.BOT_ANALYZE_HELP = helpDocsURL + '/bots/bot-builder/analyzing-your-bot/';
                    $rootScope.helpLinks.BOT_CHAT_HISTORY_HELP = helpDocsURL + '/bots/bot-builder/analyzing-your-bot/viewing-chat-history/';
                    $rootScope.helpLinks.BOT_CHAT_LOGS_HELP = helpDocsURL + '/bots/bot-builder/analyzing-your-bot/viewing-chat-logs/';

                    $rootScope.helpLinks.BOTKIT_SDK_HELP = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/sdk-configuration/';
                    $rootScope.helpLinks.WEBMOBILE_SDK_HELP = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/sdk-configuration/';
                    $rootScope.helpLinks.APISCOPES_SDK_HELP = helpDocsURL + '/bots/apis/';
                    $rootScope.helpLinks.EVENTS_MANAGEMENT = helpDocsURL + '/bots/bot-builder/optimizing-bots/bot-customizations/event-based-bot-actions/';

                    $rootScope.helpLinks.ENTITY_RULES     = helpDocsURL + '/bots/how-tos/entity-rules/';
                    $rootScope.helpLinks.AUTO_CORRECT      = helpDocsURL + '/bots/bot-builder-tool/dialog-task/working-with-the-entity-node/#Step_3_Configuring_the_Instance_Properties';
                    $rootScope.helpLinks.NOUTTERANCES_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/user-utterances/';
                    $rootScope.helpLinks.AGENT_TRANSFER_HELP = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-agent-transfer-node/';
                    $rootScope.helpLinks.BATCH_TESTING_HELP = helpDocsURL + '/bots/bot-builder/optimizing-bots/batch-testing/';
                    $rootScope.helpLinks.MANAGE_TEST_SUITS = helpDocsURL + '/bots/bot-builder/optimizing-bots/batch-testing/managing-test-suites/';
                    $rootScope.helpLinks.WHATSNEW = helpDocsURL + '/bots/about-kore-bots/whats-new-in-this-release-bot-builder/';
                    $rootScope.helpLinks.ROLE_BASED_ACCESS = helpDocsURL + '/bots/adminconsole/user-and-bots-management/bot-roles/';
                    $rootScope.helpLinks.FULL_VERSION_CTRL = helpDocsURL + '/bots/bot-builder/publishing-tasks/bot-publishing-controls/';
                    $rootScope.helpLinks.KNOWLEDGE_EXTRACT = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/knowledge-extraction-service/';
                    $rootScope.helpLinks.RAND_1 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/alert-task-basic-settings/';
                    $rootScope.helpLinks.RAND_2 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/configuring-the-alert-task-request-object-webservice-rest/';
                    $rootScope.helpLinks.RAND_3 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/configuring-the-alert-task-request-object-webservice-soap/';
                    $rootScope.helpLinks.RAND_4 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/configuring-the-alert-task-request-object-webhook/';
                    $rootScope.helpLinks.RAND_5 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/configuring-the-alert-task-request-object-rss/';
                    $rootScope.helpLinks.RAND_6 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/setting-up-authentication-for-alert-tasks/';
                    $rootScope.helpLinks.RAND_7 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/configuring-the-response-object-for-an-alert-task/';
                    $rootScope.helpLinks.RAND_8 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/settings-for-alert-tasks/';
                    $rootScope.helpLinks.RAND_9 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-bot-action-tasks/basic-settings-for-an-action-task/';
                    $rootScope.helpLinks.RAND_10 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-bot-action-tasks/configuring-the-action-task-request-rest/';
                    $rootScope.helpLinks.RAND_11 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-bot-action-tasks/configuring-the-action-task-request-soap/';
                    $rootScope.helpLinks.RAND_12 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-bot-action-tasks/setting-up-authentication-for-action-tasks/';
                    $rootScope.helpLinks.RAND_13 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-bot-action-tasks/configuring-the-action-task-response/';
                    $rootScope.helpLinks.RAND_14 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/create-a-report-task/defining-a-table-report/';
                    $rootScope.helpLinks.RAND_15 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/create-a-report-task/defining-a-card-layout-report/';
                    $rootScope.helpLinks.RAND_16 = helpDocsURL + '/bots/bot-builder/getting-started-bots/';
                    $rootScope.helpLinks.RAND_17 = helpDocsURL + '/bots/bot-builder/bot-types/defining-universal-bots/';
                    $rootScope.helpLinks.RAND_18 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/';
                    $rootScope.helpLinks.RAND_19 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_20 = helpDocsURL + '/bots/bot-builder/bot-types/defining-universal-bots/';
                    $rootScope.helpLinks.RAND_21 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/';
                    $rootScope.helpLinks.RAND_22 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_23 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/#creating-a-dialog-task/';
                    $rootScope.helpLinks.RAND_24 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-intent-node/';
                    $rootScope.helpLinks.RAND_25 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/managing-task-components/';
                    $rootScope.helpLinks.RAND_26 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_27 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/using-the-dialog-builder-tool/#importing-and-exporting-dialog-tasks/';
                    $rootScope.helpLinks.RAND_28 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/#creating-a-dialog-task/';
                    $rootScope.helpLinks.RAND_29 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-intent-node/';
                    $rootScope.helpLinks.RAND_30 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/managing-task-components/';
                    $rootScope.helpLinks.RAND_31 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_32 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/using-the-dialog-builder-tool/#importing-and-exporting-dialog-tasks/';
                    $rootScope.helpLinks.RAND_33 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/#creating-a-dialog-task/';
                    $rootScope.helpLinks.RAND_34 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-intent-node/';
                    $rootScope.helpLinks.RAND_35 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/managing-task-components/';
                    $rootScope.helpLinks.RAND_36 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_37 = helpDocsURL + '/bots/bot-builder/getting-started-bots/';
                    $rootScope.helpLinks.RAND_38 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/#creating-a-dialog-task/';
                    $rootScope.helpLinks.RAND_39 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/';
                    $rootScope.helpLinks.RAND_40 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/#node-types';
                    $rootScope.helpLinks.RAND_41 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/#component-transitions/';
                    $rootScope.helpLinks.RAND_42 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/using-the-prompt-editor/';
                    $rootScope.helpLinks.RAND_43 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/managing-task-components/';
                    $rootScope.helpLinks.RAND_44 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-web-hook-node//';
                    $rootScope.helpLinks.RAND_45 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/#creating-a-dialog-task/';
                    $rootScope.helpLinks.RAND_46 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-intent-node/';
                    $rootScope.helpLinks.RAND_47 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/managing-task-components/';
                    $rootScope.helpLinks.RAND_48 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_49 = helpDocsURL + '/bots/bot-builder/getting-started-bots/';
                    $rootScope.helpLinks.RAND_50 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/#creating-a-dialog-task/';
                    $rootScope.helpLinks.RAND_51 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-intent-node/';
                    $rootScope.helpLinks.RAND_52 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/managing-task-components/';
                    $rootScope.helpLinks.RAND_53 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_54 = helpDocsURL + '/bots/bot-builder/getting-started-bots/';
                    $rootScope.helpLinks.RAND_55 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/importing-the-bot-ontology-from-csv-or-json/';
                    $rootScope.helpLinks.RAND_56 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/creating-a-knowledge-graph/#step-6-create-classes-and-add-them-to-terms/';
                    $rootScope.helpLinks.RAND_57 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/creating-a-knowledge-graph/#step-4-enter-synonyms/';
                    $rootScope.helpLinks.RAND_58 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/#bot-ontology-and-knowledge-graph-training';
                    $rootScope.helpLinks.RAND_59 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/knowledge-extraction-service/#extracting-faqs-from-a-website';
                    $rootScope.helpLinks.RAND_60 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/knowledge-extraction-service/#extracting-faqs-from-a-csv-or-pdf-document';
                    $rootScope.helpLinks.RAND_61 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/knowledge-extraction-service/#move-selected-question-answers-to-the-knowledge-graph';
                    $rootScope.helpLinks.RAND_62 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/knowledge-extraction-service/#supported-formats';
                    $rootScope.helpLinks.RAND_63 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/importing-the-bot-ontology-from-csv-or-json/';
                    $rootScope.helpLinks.RAND_64 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/creating-a-knowledge-graph/#step-6-create-classes-and-add-them-to-terms/';
                    $rootScope.helpLinks.RAND_65 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/creating-a-knowledge-graph/#step-4-enter-synonyms/';
                    $rootScope.helpLinks.RAND_66 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/#bot-ontology-and-knowledge-graph-training';
                    $rootScope.helpLinks.RAND_67 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/knowledge-extraction-service/#extracting-faqs-from-a-website';
                    $rootScope.helpLinks.RAND_68 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/knowledge-extraction-service/#extracting-faqs-from-a-csv-or-pdf-document';
                    $rootScope.helpLinks.RAND_69 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/knowledge-extraction-service/#move-selected-question-answers-to-the-knowledge-graph';
                    $rootScope.helpLinks.RAND_70 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-ai-knowledge-graph/knowledge-extraction-service/#supported-formats';
                    $rootScope.helpLinks.RAND_71 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/alert-task-basic-settings/';
                    $rootScope.helpLinks.RAND_72 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/configuring-the-alert-task-request-object-webservice-rest/';
                    $rootScope.helpLinks.RAND_73 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/configuring-the-alert-task-request-object-webservice-soap/';
                    $rootScope.helpLinks.RAND_74 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/configuring-the-alert-task-request-object-webhook/';
                    $rootScope.helpLinks.RAND_75 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/configuring-the-alert-task-request-object-rss/';
                    $rootScope.helpLinks.RAND_76 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/setting-up-authentication-for-alert-tasks/';
                    $rootScope.helpLinks.RAND_77 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/configuring-the-response-object-for-an-alert-task/';
                    $rootScope.helpLinks.RAND_78 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/notification-tasks/settings-for-alert-tasks/';
                    $rootScope.helpLinks.RAND_79 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-bot-action-tasks/basic-settings-for-an-action-task/';
                    $rootScope.helpLinks.RAND_80 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-bot-action-tasks/configuring-the-action-task-request-rest/';
                    $rootScope.helpLinks.RAND_81 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-bot-action-tasks/configuring-the-action-task-request-soap/';
                    $rootScope.helpLinks.RAND_82 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-bot-action-tasks/setting-up-authentication-for-action-tasks/';
                    $rootScope.helpLinks.RAND_83 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/kore-bot-action-tasks/configuring-the-action-task-response/';
                    $rootScope.helpLinks.RAND_84 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/create-a-report-task/defining-a-table-report/';
                    $rootScope.helpLinks.RAND_85 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/create-a-report-task/defining-a-card-layout-report/';
                    $rootScope.helpLinks.RAND_86 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/creatingflows/#creating-a-flow';
                    $rootScope.helpLinks.RAND_87 = helpDocsURL + '/bots/bot-builder/optimizing-bots/user-utterances/exporting-importing-machine-learning-utterances/';
                    $rootScope.helpLinks.RAND_88 = helpDocsURL + '/bots/bot-builder/optimizing-bots/user-utterances/ml-model-graph-evaluate-machine-learning-performance-at-a-glance/';
                    $rootScope.helpLinks.RAND_89 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/entity-detection/';
                    $rootScope.helpLinks.RAND_90 = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/configuring-ml-parameters/';
                    $rootScope.helpLinks.RAND_91 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_92 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/test-train-bot/';
                    $rootScope.helpLinks.RAND_93 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/';
                    $rootScope.helpLinks.RAND_94 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/entity-detection/';
                    $rootScope.helpLinks.RAND_95 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_96 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/test-train-bot/';
                    $rootScope.helpLinks.RAND_97 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/';
                    $rootScope.helpLinks.RAND_98 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/entity-detection/';
                    $rootScope.helpLinks.RAND_99 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_100 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/test-train-bot/';
                    $rootScope.helpLinks.RAND_101 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/';
                    $rootScope.helpLinks.RAND_102 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/entity-detection/';
                    $rootScope.helpLinks.RAND_103 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_104 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/test-train-bot/';
                    $rootScope.helpLinks.RAND_105 = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/configuring-ml-parameters/';
                    $rootScope.helpLinks.RAND_106 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/';
                    $rootScope.helpLinks.RAND_107 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/entity-detection/';
                    $rootScope.helpLinks.RAND_108 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/#bot-ontology-and-knowledge-graph-training';
                    $rootScope.helpLinks.RAND_109 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_110 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/test-train-bot/';
                    $rootScope.helpLinks.RAND_111 = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/configuring-ml-parameters/';
                    $rootScope.helpLinks.RAND_112 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/';
                    $rootScope.helpLinks.RAND_113 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/entity-detection/';
                    $rootScope.helpLinks.RAND_114 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/#bot-ontology-and-knowledge-graph-training';
                    $rootScope.helpLinks.RAND_115 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_116 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/test-train-bot/';
                    $rootScope.helpLinks.RAND_117 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_118 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_119 = helpDocsURL + '/bots/bot-builder/bot-types/defining-universal-bots/standard-bots-vs-universal-bots-a-snapshot-of-universal-bot-features/';
                    $rootScope.helpLinks.RAND_120 = helpDocsURL + '/bots/bot-builder/bot-types/defining-universal-bots/creating-a-universal-bot/step-2-add-linked-bots/';
                    $rootScope.helpLinks.RAND_121 = helpDocsURL + '/bots/bot-builder/bot-types/defining-universal-bots/creating-a-universal-bot/step-4-test-and-train-the-universal-bot/';
                    $rootScope.helpLinks.RAND_122 = helpDocsURL + '/bots/bot-builder/bot-types/defining-universal-bots/creating-a-universal-bot/step-5-publish-the-universal-bot/';
                    $rootScope.helpLinks.RAND_123 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/using-the-prompt-editor/';
                    $rootScope.helpLinks.RAND_124 = helpDocsURL + '/bots/kore-web-sdk/event-based-bot-actions/';
                    $rootScope.helpLinks.RAND_125 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/using-the-prompt-editor/';
                    $rootScope.helpLinks.RAND_126 = helpDocsURL + '/bots/kore-web-sdk/event-based-bot-actions/';
                    $rootScope.helpLinks.RAND_127 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/using-the-prompt-editor/';
                    $rootScope.helpLinks.RAND_128 = helpDocsURL + '/bots/kore-web-sdk/event-based-bot-actions/';
                    $rootScope.helpLinks.RAND_129 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/using-the-prompt-editor/';
                    $rootScope.helpLinks.RAND_130 = helpDocsURL + '/bots/kore-web-sdk/event-based-bot-actions/';
                    $rootScope.helpLinks.RAND_131 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_132 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/using-the-prompt-editor/';
                    $rootScope.helpLinks.RAND_133 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_134 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/using-the-prompt-editor/';
                    $rootScope.helpLinks.RAND_135 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_136 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/using-the-prompt-editor/';
                    $rootScope.helpLinks.RAND_137 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/interruption-handling-context-switching-intents/';
                    $rootScope.helpLinks.RAND_138 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/using-the-prompt-editor/';
                    $rootScope.helpLinks.RAND_139 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/test-train-bot/';
                    $rootScope.helpLinks.RAND_140 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/';
                    $rootScope.helpLinks.RAND_141 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/entity-detection/';
                    $rootScope.helpLinks.RAND_142 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/#bot-ontology-and-knowledge-graph-training';
                    $rootScope.helpLinks.RAND_143 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_144 = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/configuring-ml-parameters/';
                    $rootScope.helpLinks.RAND_145 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/';
                    $rootScope.helpLinks.RAND_146 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/entity-detection/';
                    $rootScope.helpLinks.RAND_147 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/#bot-ontology-and-knowledge-graph-training';
                    $rootScope.helpLinks.RAND_148 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_149 = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/configuring-ml-parameters/';
                    $rootScope.helpLinks.RAND_150 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/using-the-prompt-editor/#channel-specific-user-prompts';
                    $rootScope.helpLinks.RAND_151 = helpDocsURL + '/bots/kore-web-sdk/message-templates/';
                    $rootScope.helpLinks.RAND_152 = helpDocsURL + '/bots/kore-web-sdk/using-the-botkit-sdk/';
                    $rootScope.helpLinks.RAND_153 = helpDocsURL + '/bots/kore-web-sdk/kore-ai-web-sdk-tutorial/';
                    $rootScope.helpLinks.RAND_154 = helpDocsURL + '/bots/kore-web-sdk/sdk-app-registration/';
                    $rootScope.helpLinks.RAND_155 = helpDocsURL + '/bots/kore-web-sdk/message-templates/';
                    $rootScope.helpLinks.RAND_156 = helpDocsURL + '/bots/kore-web-sdk/apis/';
                    $rootScope.helpLinks.RAND_157 = helpDocsURL + '/bots/kore-web-sdk/using-the-botkit-sdk/botkit-sdk-tutorial-agent-transfer/';
                    $rootScope.helpLinks.RAND_158 = helpDocsURL + '/bots/kore-web-sdk/using-the-botkit-sdk/';
                    $rootScope.helpLinks.RAND_159 = helpDocsURL + '/bots/kore-web-sdk/kore-ai-web-sdk-tutorial/';
                    $rootScope.helpLinks.RAND_160 = helpDocsURL + '/bots/kore-web-sdk/sdk-app-registration/';
                    $rootScope.helpLinks.RAND_161 = helpDocsURL + '/bots/kore-web-sdk/message-templates/';
                    $rootScope.helpLinks.RAND_162 = helpDocsURL + '/bots/kore-web-sdk/apis/';
                    $rootScope.helpLinks.RAND_163 = helpDocsURL + '/bots/kore-web-sdk/using-the-botkit-sdk/botkit-sdk-tutorial-agent-transfer/';
                    $rootScope.helpLinks.RAND_164 = helpDocsURL + '/bots/kore-web-sdk/using-the-botkit-sdk/';
                    $rootScope.helpLinks.RAND_165 = helpDocsURL + '/bots/kore-web-sdk/kore-ai-web-sdk-tutorial/';
                    $rootScope.helpLinks.RAND_166 = helpDocsURL + '/bots/kore-web-sdk/sdk-app-registration/';
                    $rootScope.helpLinks.RAND_167 = helpDocsURL + '/bots/kore-web-sdk/message-templates/';
                    $rootScope.helpLinks.RAND_168 = helpDocsURL + '/bots/kore-web-sdk/apis/';
                    $rootScope.helpLinks.RAND_169 = helpDocsURL + '/bots/kore-web-sdk/using-the-botkit-sdk/botkit-sdk-tutorial-agent-transfer/';
                    $rootScope.helpLinks.RAND_170 = helpDocsURL + '/bots/kore-web-sdk/using-the-botkit-sdk/';
                    $rootScope.helpLinks.RAND_171 = helpDocsURL + '/bots/kore-web-sdk/kore-ai-web-sdk-tutorial/';
                    $rootScope.helpLinks.RAND_172 = helpDocsURL + '/bots/kore-web-sdk/sdk-app-registration/';
                    $rootScope.helpLinks.RAND_173 = helpDocsURL + '/bots/kore-web-sdk/message-templates/';
                    $rootScope.helpLinks.RAND_174 = helpDocsURL + '/bots/kore-web-sdk/apis/';
                    $rootScope.helpLinks.RAND_175 = helpDocsURL + '/bots/kore-web-sdk/using-the-botkit-sdk/botkit-sdk-tutorial-agent-transfer/';
                    $rootScope.helpLinks.RAND_176 = helpDocsURL + '/bots/bot-builder/bot-types/defining-universal-bots/creating-a-universal-bot/step-5-publish-the-universal-bot/';
                    $rootScope.helpLinks.RAND_177 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/upgrading-tasks/';
                    $rootScope.helpLinks.RAND_178 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/deleting-and-recalling-tasks/';
                    $rootScope.helpLinks.RAND_179 = helpDocsURL + '/bots/bot-builder/analyzing-your-bot/#identified-and-unidentified-intents/';
                    $rootScope.helpLinks.RAND_180 = helpDocsURL + '/bots/bot-builder/analyzing-your-bot/#failed-tasks/';
                    $rootScope.helpLinks.RAND_181 = helpDocsURL + '/bots/bot-builder/analyzing-your-bot/#performance/';
                    $rootScope.helpLinks.RAND_182 = helpDocsURL + '/bots/bot-builder/analyzing-your-bot/conversation-flow/';
                    $rootScope.helpLinks.RAND_183 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/';
                    $rootScope.helpLinks.RAND_184 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/entity-detection/';
                    $rootScope.helpLinks.RAND_185 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/#bot-ontology-and-knowledge-graph-training';
                    $rootScope.helpLinks.RAND_186 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_187 = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/configuring-ml-parameters/';
                    $rootScope.helpLinks.RAND_188 = helpDocsURL + '/bots/bot-builder/analyzing-your-bot/#identified-and-unidentified-intents/';
                    $rootScope.helpLinks.RAND_189 = helpDocsURL + '/bots/bot-builder/analyzing-your-bot/#failed-tasks/';
                    $rootScope.helpLinks.RAND_190 = helpDocsURL + '/bots/bot-builder/analyzing-your-bot/#performance/';
                    $rootScope.helpLinks.RAND_191 = helpDocsURL + '/bots/bot-builder/analyzing-your-bot/conversation-flow/';
                    $rootScope.helpLinks.RAND_192 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/';
                    $rootScope.helpLinks.RAND_193 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/entity-detection/';
                    $rootScope.helpLinks.RAND_194 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/intent-detection/#bot-ontology-and-knowledge-graph-training';
                    $rootScope.helpLinks.RAND_195 = helpDocsURL + '/bots/natural-language-processing-nlp-guide/additional-notes-nlp-settings-guidelines/';
                    $rootScope.helpLinks.RAND_196 = helpDocsURL + '/bots/bot-builder/optimizing-bots/task-identification-settings/configuring-ml-parameters/';
                    $rootScope.helpLinks.RAND_197 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_198 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/switching-language-selection/';
                    $rootScope.helpLinks.RAND_199 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/managing-enabled-languages/';
                    $rootScope.helpLinks.RAND_200 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-service-node/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_201 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/pii-data-masking/';
                    $rootScope.helpLinks.RAND_202 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_203 = helpDocsURL + '/bots/bot-builder/publishing-tasks/exporting-and-importing-a-bot/defining-system-variables/';
                    $rootScope.helpLinks.RAND_204 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_205 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_206 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#inheriting-a-smart-bot/';
                    $rootScope.helpLinks.RAND_207 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_208 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/switching-language-selection/';
                    $rootScope.helpLinks.RAND_209 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/managing-enabled-languages/';
                    $rootScope.helpLinks.RAND_210 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-service-node/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_211 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/pii-data-masking/';
                    $rootScope.helpLinks.RAND_212 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_213 = helpDocsURL + '/bots/bot-builder/publishing-tasks/exporting-and-importing-a-bot/defining-system-variables/';
                    $rootScope.helpLinks.RAND_214 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_215 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_216 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#inheriting-a-smart-bot/';
                    $rootScope.helpLinks.RAND_217 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_218 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/switching-language-selection/';
                    $rootScope.helpLinks.RAND_219 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/managing-enabled-languages/';
                    $rootScope.helpLinks.RAND_220 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-service-node/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_221 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/pii-data-masking/';
                    $rootScope.helpLinks.RAND_222 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_223 = helpDocsURL + '/bots/bot-builder/publishing-tasks/exporting-and-importing-a-bot/defining-system-variables/';
                    $rootScope.helpLinks.RAND_224 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_225 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_226 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#inheriting-a-smart-bot/';
                    $rootScope.helpLinks.RAND_227 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_228 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/switching-language-selection/';
                    $rootScope.helpLinks.RAND_229 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/managing-enabled-languages/';
                    $rootScope.helpLinks.RAND_230 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-service-node/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_231 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/pii-data-masking/';
                    $rootScope.helpLinks.RAND_232 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_233 = helpDocsURL + '/bots/bot-builder/publishing-tasks/exporting-and-importing-a-bot/defining-system-variables/';
                    $rootScope.helpLinks.RAND_234 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_235 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_236 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#inheriting-a-smart-bot/';
                    $rootScope.helpLinks.RAND_237 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_238 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/switching-language-selection/';
                    $rootScope.helpLinks.RAND_239 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/managing-enabled-languages/';
                    $rootScope.helpLinks.RAND_240 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-service-node/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_241 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/pii-data-masking/';
                    $rootScope.helpLinks.RAND_242 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_243 = helpDocsURL + '/bots/bot-builder/publishing-tasks/exporting-and-importing-a-bot/defining-system-variables/';
                    $rootScope.helpLinks.RAND_244 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_245 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_246 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#inheriting-a-smart-bot/';
                    $rootScope.helpLinks.RAND_247 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_248 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/switching-language-selection/';
                    $rootScope.helpLinks.RAND_249 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/managing-enabled-languages/';
                    $rootScope.helpLinks.RAND_250 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-service-node/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_251 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/pii-data-masking/';
                    $rootScope.helpLinks.RAND_252 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_253 = helpDocsURL + '/bots/bot-builder/publishing-tasks/exporting-and-importing-a-bot/defining-system-variables/';
                    $rootScope.helpLinks.RAND_254 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_255 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_256 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#inheriting-a-smart-bot/';
                    $rootScope.helpLinks.RAND_257 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_258 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/switching-language-selection/';
                    $rootScope.helpLinks.RAND_259 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/managing-enabled-languages/';
                    $rootScope.helpLinks.RAND_260 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-service-node/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_261 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/pii-data-masking/';
                    $rootScope.helpLinks.RAND_262 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_263 = helpDocsURL + '/bots/bot-builder/publishing-tasks/exporting-and-importing-a-bot/defining-system-variables/';
                    $rootScope.helpLinks.RAND_264 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_265 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_266 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#inheriting-a-smart-bot/';
                    $rootScope.helpLinks.RAND_267 = helpDocsURL + '/bots/bot-builder/publishing-tasks/exporting-and-importing-a-bot/defining-system-variables/';
                    $rootScope.helpLinks.RAND_268 = helpDocsURL + '/bots/bot-builder/publishing-tasks/exporting-and-importing-a-bot/defining-system-variables/';
                    $rootScope.helpLinks.RAND_269 = helpDocsURL + '/bots/bot-builder/publishing-tasks/exporting-and-importing-a-bot/defining-system-variables/';
                    $rootScope.helpLinks.RAND_270 = helpDocsURL + '/bots/bot-builder/publishing-tasks/exporting-and-importing-a-bot/defining-system-variables/';
                    $rootScope.helpLinks.RAND_271 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/';
                    $rootScope.helpLinks.RAND_272 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/switching-language-selection/';
                    $rootScope.helpLinks.RAND_273 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/building-multi-language-bots/managing-enabled-languages/';
                    $rootScope.helpLinks.RAND_274 = helpDocsURL + '/bots/bot-builder/defining-bot-tasks/dialog-tasks/working-with-the-service-node/implementing-custom-authentication/';
                    $rootScope.helpLinks.RAND_275 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/pii-data-masking/';
                    $rootScope.helpLinks.RAND_276 = helpDocsURL + '/bots/bot-builder/editing-an-existing-bot/advanced-bot-settings/reusing-bot-functions-custom-script-file/';
                    $rootScope.helpLinks.RAND_277 = helpDocsURL + '/bots/bot-builder/publishing-tasks/exporting-and-importing-a-bot/defining-system-variables/';
                    $rootScope.helpLinks.RAND_278 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_279 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#configure-bot-settings/';
                    $rootScope.helpLinks.RAND_280 = helpDocsURL + '/bots/bot-builder/bot-types/defining-a-smart-bot/#inheriting-a-smart-bot/';

                   
                }
                var lang=workflowService.i18nSelectedLanguage();
                if(lang && lang!='en'){
                    Object.keys($rootScope.helpLinks).forEach(function(helpLinkKey){
                        $rootScope.helpLinks[helpLinkKey]+='?lang='+lang;
                    });
                }

            };
            this.setVersionOnLoad();
            }])
            .factory('patternFactory', ["$workflowService", function ($workflowService) {

                function regularExpression(expressionFor, selectedLanguage){


                var selectedStream;
                function getLanguage(){
                    return $workflowService.currentLanguage() || selectedStream.defaultLanguage;
                }

                selectedStream = $workflowService.selectedStream();
                var language = selectedLanguage || getLanguage();

                var regexpObject = {};
                //
// RegEx for English,German,Spanish,French
//regexpObject.regexp = /^[a-zA-Z0-9äöüÄÖÜßâêîôûàèùçëïüéáéíóúñü§¡¿][a-zA-Z0-99äöüÄÖÜßâêîôûàèùçëïüéáéíóúñü§¡¿_<>*. ]+$/;
//regexpObject.regexp2 = /^[a-zA-Z0-9äöüÄÖÜßâêîôûàèùçëïüéáéíóúñü§¡¿]/;

                switch(expressionFor) {
                    case 'stream':
                        if(language && language === "en"){
                            regexpObject.regexp = /^[a-zA-Z0-9][a-zA-Z0-9_<>*. ]+$/;
                            regexpObject.regexp2 = /^[a-zA-Z0-9]/;
                        } else if(language){
                            regexpObject.regexp = /(?:)/;
                            regexpObject.regexp2 = /(?:)/;
                        }else{
                            regexpObject.regexp = /^[a-zA-Z0-9][a-zA-Z0-9_<>*. ]+$/;
                            regexpObject.regexp2 = /^[a-zA-Z0-9]/;
                        }
                        break;
                    case 'dialog':
                        if(language && language === "en"){
                            regexpObject.regexp = /^[a-zA-ZÀ-ÿ0-9][a-zA-ZÀ-ÿ0-9 ]+$/;
                            regexpObject.regexp2 = /^[a-zA-Z0-9]/;
                        } else if(language){
                            regexpObject.regexp = /(?:)/;
                            regexpObject.regexp2 = /(?:)/;
                        }else{
                            regexpObject.regexp = /^[a-zA-Z0-9][a-zA-Z0-9 ]+$/;
                            regexpObject.regexp2 = /^[a-zA-Z0-9]/;
                        }
                        break;
                    case 'parameter':
                        if(language && language === "en"){
                            regexpObject.regexp = /^[a-zA-Z0-9_<>*. ]*$/;
                        } else if(language){
                            regexpObject.regexp = /(?:)/;
                        }else{
                            regexpObject.regexp = /^[a-zA-Z0-9_<>*. ]*$/;
                        }
                        break;
                    case 'nameType':
                        if(language && language === "en"){
                            regexpObject.regexp = /^[a-zA-Z0-9].*$/;
                        } else if(language){
                            regexpObject.regexp = /(?:)/;
                        }else{
                            regexpObject.regexp = /^[a-zA-Z0-9].*$/;
                        }
                        break;
                    default:
                        if(language && language === "en"){
                            regexpObject.regexp = /^[a-zA-Z0-9][a-zA-Z0-9<>*. ]+$/;
                            regexpObject.regexp2 = /^[a-zA-Z0-9]/;
                        } else if(language){
                            regexpObject.regexp = /(?:)/;
                            regexpObject.regexp2 = /(?:)/;
                        }else{
                            regexpObject.regexp = /^[a-zA-Z0-9][a-zA-Z0-9_<>*. ]+$/;
                            regexpObject.regexp2 = /^[a-zA-Z0-9]/;
                        }
                }



                        return regexpObject;


                }


                return {
                    getRegularExpression: function (expressionFor, selectedLanguage) {
                        return regularExpression(expressionFor, selectedLanguage);
                    }
                };
            }])


            .factory('form_util', ['NotificationService',function (NotificationService) {

                    function touch(form) {

                        for (var key in form) {

                            if (form.hasOwnProperty(key) && key.indexOf("$") === -1) {
                                form[key].$dirty = true;
                            }

                        }

                        //scroll to required field
                        var _fieldEle = "";
                        var _container = "";
                        var _scrollHeight = "";
                       var _formutilsoffSetValue=0;
                        if (form.$error && form.$error.required && form.$error.required.length) {
                            // var _requiredFields = angular.copy(form.$error.required);
                            _fieldEle = $('[name="' + form.$name + '"] [name="' + form.$error.required[0].$name + '"]');
                            _fieldEle = _fieldEle.last();//for nested forms especially
                            if (_fieldEle) {
                                _container = _fieldEle.closest('.scroll-content');
                                if(!_container || !_container.offset()){
                                  _container = _fieldEle.closest('.ps-container');
                                  var _formutilsoffset = _container.attr("form-utils-offset");  
                                  if(_formutilsoffset){
                                    _formutilsoffSetValue = parseInt(_formutilsoffset);
                                  }
                                  
                                }
                                if (_container && _container.offset()) {
                                    _scrollHeight = _fieldEle.offset().top - _container.offset().top + _container.scrollTop();
                                    _container.scrollTop(_scrollHeight + _formutilsoffSetValue);
                                }
                            }
                        }else if(form.$error && form.$error.codeerror && form.$error.codeerror.length){
                            var _codeerrorFields = angular.copy(form.$error.codeerror);
                            _fieldEle = $('[name="' + form.$name + '"] [name="' + _codeerrorFields[0].$name + '"]');
                            _fieldEle = _fieldEle.last();//for nested forms especially
                            if (_fieldEle) {
                                _container = _fieldEle.closest('.ps-container');
                                if (_container) {
                                    _scrollHeight = _fieldEle.offset().top - _container.offset().top + _container.scrollTop();
                                    _container.scrollTop(_scrollHeight);
                                }
                            }
                        }
                        //NotificationService.notify("Please fill in all required fields", 'error');

                    }

                    function makeItClean(form) {
                        if (!form) {
                            return;
                        }
                        for (var key in form) {
                            if (form.hasOwnProperty(key) && typeof form[key] === 'object' && !(key.indexOf('$') === 0 || key.indexOf('$$') === 0)) {
                                form[key]['$dirty'] = false;
                            }
                        }
                        form.$invaild = false;
                        form.$valid   = true;
                    }

                    return {
                        touch: touch,
                        makeItClean: makeItClean
                    };

                }])

            .factory('urlutil', [function () {


                    function concat(url) {

                        var result = '';

                        if (url.host) {
                            result += url.host;
                        }


                        if (url.port) {
                            result += ':' + url.port;
                        }

                        if (url.path) {
                            result += url.path;
                        }

                        if (url.protocol) {
                            result = url.protocol + '://' + result;
                        }

                        return result;

                    }

                    return {
                        concat: concat
                    };

                }])

            .filter('tokenizer', ['$filter', function ($filter) {

                    function getRegExp(variable) {
                        var regExp = new RegExp('function\\s+' + variable, 'g');
                        return regExp;
                    }

                    function isItThere(declarations, value) {
                        for (var i = 0; i < declarations.length; i++) {
                            if (value === declarations[i]) {
                                return true;
                            }
                        }
                        return false;
                    }

                    return function (value) {
                        var result = [];

                        if (!value || typeof value.split !== 'function') {
                            return;
                        }

                        try {
                            var declarations = $filter('filter')(esprima.tokenize(value, {}), {type: 'Identifier'});
                            for (var i = 0; i < declarations.length; i++) {
                                result.push(declarations[i].value);
                            }

                            var copy = [];
                            for (var j = 0; j < result.length; j++) {
                                if (!isItThere(copy, result[j])) {
                                    copy.push(result[j]);
                                }
                            }

                            result = angular.copy(copy);

                            result = result.filter(function (variable) {
                                if (!getRegExp(variable).test(value) && !(/print/.test(variable))) {
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                        } catch (ex) {
                        }
                        return result;
                    };
                }])

            .filter('trustit', ['$sce', function ($sce) {
                    return function (value) {
                        return $sce.trustAsHtml(value);
                    };
                }])

            .filter('keyInCollection', [function () {

                    function keyInCollection(collection, key) {

                        if (collection instanceof Array) {
                            for (var i = 0; i < collection.length; i++) {
                                if (collection[i] === key) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }

                    return function (value, collection) {
                        if (value && value instanceof Array) {
                            value = value.filter(function (value) {
                                return !(keyInCollection(collection, value));
                            });
                        }
                        return value;
                    };


                }])

            .filter('styleit', [function () {
                    return function (value) {
                        if (value) {
                            return js_beautify(value, {indent_size: 2});
                        } else {
                            return value;
                        }
                    };
                }])
            .filter('orderObjectBy',[function(){
                return function(items,field,reverse){
                      var filtered = [];
                      angular.forEach(items, function(item) {
                          filtered.push(item);
                        });
                        filtered.sort(function (a, b) {
                          return (a[field] > b[field] ? 1 : -1);
                        });
                        if(reverse){
                          filtered.reverse();  
                        } 
                        return filtered;

                };

            }])

            .filter('custom', [function() {
                  return function(input, search) {
                    if (!input) {return input;}
                    if (!search) {return input;}
                    var expected = ('' + search).toLowerCase();
                    var result = {};
                    angular.forEach(input, function(value, key) {
                      var actual = ('' + value).toLowerCase();
                      if (actual.indexOf(expected) !== -1) {
                        result[key] = value;
                      }
                    });
                    return result;
                  };
            }])
    
            .factory('util', ['$timeout', function ($timeout) {

                    function pasteHtmlAtCaret(html, focusElement, selectPastedContent) {
                        var sel, range;
                        if (window.getSelection) {

                            // IE9 and non-IE
                            sel = window.getSelection();

                            if (!(sel.focusNode.id === focusElement || (sel.baseNode && sel.baseNode.parentElement && sel.baseNode.parentElement.id === focusElement))) {
                                $('#' + focusElement).focus();
                            }


                            if (sel.getRangeAt && sel.rangeCount) {

                                range = sel.getRangeAt(0);
                                range.deleteContents();

                                var el = document.createElement("div");
                                el.innerHTML = html;
                                var frag = document.createDocumentFragment(), node, lastNode;
                                while ((node = el.firstChild)) {
                                    lastNode = frag.appendChild(node);
                                }
                                var firstNode = frag.firstChild;
                                range.insertNode(frag);

                                if (lastNode) {
                                    range = range.cloneRange();
                                    range.setStartAfter(lastNode);
                                    if (selectPastedContent) {
                                        range.setStartBefore(firstNode);
                                    } else {
                                        range.collapse(true);
                                    }
                                    sel.removeAllRanges();
                                    sel.addRange(range);
                                }
                            }

                        } else if ((sel = document.selection) && sel.type !== "Control") {

                            // IE < 9
                            var originalRange = sel.createRange();
                            originalRange.collapse(true);
                            sel.createRange().pasteHTML(html);
                            if (selectPastedContent) {
                                range = sel.createRange();
                                range.setEndPoint("StartToStart", originalRange);
                                range.select();
                            }

                        }
                    }

                    function inserAtCaret() {
                        var args = arguments;
                        $timeout(function () {
                            pasteHtmlAtCaret(args[0], args[1], args[2]);
                        });
                    }

                    return {
                        insertAtCursor: inserAtCaret
                    };

                }])

            .factory('cron', ['$workflowService', function ($workflowService) {


                    var languageSpecficOptions, selectedStream, every, at, languageScheme, minutes, hours, hour;

                    function initLanguageOptions () {
                        selectedStream = $workflowService.selectedStream();
                        languageSpecficOptions = $workflowService.seedData().alertScheduleOptions[($workflowService.currentLanguage() ||selectedStream.defaultLanguage)];
                        every = languageSpecficOptions.frequency[0].value;
                        at = languageSpecficOptions.frequency[1].value;
                        languageScheme = languageSpecficOptions.scheme;
                        minutes = languageSpecficOptions.time.minutes;
                        hours = languageSpecficOptions.time.hours;
                        hour = languageSpecficOptions.time.hour;
                    }

                    function build(day, frequency, time, type) {

                        var cron;
                        initLanguageOptions();
                        switch (day) {

                            case languageScheme[0].value:
                                cron = '* * *';
                                break;
                            case languageScheme[1].value:
                                cron = '* * 1,2,3,4,5';
                                break;
                            case languageScheme[2].value:
                                cron = '* * 0,6';
                                break;
                            case languageScheme[3].value:
                                cron = '* * 1'; 
                                break; 
                            case languageScheme[4].value:
                                cron = '* * 2';
                                break;
                            case languageScheme[5].value:
                                cron = '* * 3';
                                break;
                            case languageScheme[6].value:
                                cron = '* * 4';  
                                break;
                            case languageScheme[7].value:
                                cron = '* * 5';
                                break;
                            case languageScheme[8].value:
                                cron = '* * 6'; 
                                break; 
                            case languageScheme[9].value:
                                cron = '* * 0';                                 
                                break;

                        }

                        if (frequency === every) {
                            time = time.split(' ')[0];
                            if (type === minutes) {
                                cron = '*/' + time + ' * ' + cron;
                            } else if (type === hours || type === hour) {
                                cron = '0 */' + time + ' ' + cron;
                            }
                        } else if (frequency === at) {
                            if (time.split(' ')[1] === 'am') {
                                time = (time.split(' ')[0]).split(':').reverse().join(' ');
                            } else if (time.split(' ')[1] === 'pm') {
                                time = (time.split(' ')[0]).split(':');

                                if ((+time[0] !== 12)) {
                                    time[0] = (+time[0]) + 12;
                                }
                                time = time.reverse().join(' ');
                            }
                            cron = time + ' ' + cron;
                        }

                        return cron;

                    }

                    function extract(syntax) {
                        initLanguageOptions();
                        syntax = syntax.split(' ');
                        var cron = {};
                        var cronObj = {};
                        var result;

                        cron.minute = syntax[0];
                        cron.hour = syntax[1];
                        cron.day = (syntax.reverse())[0];

                        transform('minutes', cron.minute, cronObj);
                        transform('hour', cron.hour, cronObj);
                        transform('day', cron.day, cronObj);


                        result = cronObj.day;

                        if (cronObj.min_frequency === every) {

                            result = result + ',' + every;

                            if (cronObj.minutes && cronObj.minutes !== '*') {
                                result = result + ',' + cronObj.minutes;
                            }

                        } else if (cronObj.hour_frequency === at) {

                            result = result + ',' + at;

                            if (+cronObj.hour > 12) {
                                var hour = cronObj.hour - 12;
                                if (hour < 10){
                                    hour = '0'+hour;
                                }
                                result = result + ',' + hour + ':' + cronObj.minutes + ' pm';
                            } else if (+cronObj.hour === 12) {
                                result = result + ',' + (12) + ':' + cronObj.minutes + ' pm';
                            } else if (+cronObj.hour !== '*') {
                                result = result + ',' + cronObj.hour + ':' + cronObj.minutes + ' am';
                            }

                        }

                        if (cronObj.hour_frequency === every) {

                            result = result + ',' + every;

                            if (cronObj.hour) {
                                result = result + ',' + cronObj.hour;
                            }

                        }

                        return result;

                    }

                    function transform(type, value, result) {
                        initLanguageOptions();
                        switch (type) {

                            case 'minutes':
                                if (value.indexOf('/') !== -1) {
                                    result.min_frequency = every;
                                    result.minutes = value.split('/')[1] + ' ' + minutes;
                                } else {
                                    result.hour_frequency = at;
                                    result.minutes = value;
                                }

                                break;

                            case 'hour':
                                if (value.indexOf('/') !== -1) {
                                    result.hour_frequency = every;
                                    if (+value.split('/')[1] === 1) {
                                        result.hour = value.split('/')[1] + ' ' + hour;
                                    } else {
                                        result.hour = value.split('/')[1] + ' ' + hours;
                                    }
                                } else {
                                    result.hour_frequency = at;
                                    result.hour = value;
                                }

                                break;

                            case 'day':

                                if (value.indexOf('*') !== -1) {
                                    result.day = languageScheme[0].value;
                                } else if (value === '1,2,3,4,5') {
                                    result.day = languageScheme[1].value;
                                } else if (value === '0,6') {
                                    result.day = languageScheme[2].value;
                                } else if(value !== null &&  value !== undefined){
                                    var _value = parseInt(value);
                                    if(_value > -1){
                                        _value = _value + 2;
                                        if(_value){
                                            result.day = languageScheme[_value].value;
                                        }
                                    }
                                }

                        }

                    }

                    return {
                        build: build,
                        extract: extract
                    };

                }])


            .factory('koreUxMap', ['$timeout', 'NotificationService', '$q', 'env_conf','i18n',
                function ($timeout, NotificationService, $q, env_conf,i18n) {
                    var util = {};

                    window.pq = $q;

                    util.execute = function (map) {

                        var deffered = $q.defer();

                        var worker = new Worker(env_conf['worker-url']);

                        var timeout = 1000;
                        var timer1, timer2;

                        worker.postMessage(map);

                        worker.onmessage = function (e) {

                            var data = e.data;

                            if (data.type === 'msg') {

                                timeout = 5000;

                            } else if (data.type === 'result') {

                                worker.terminate();
                                clearTimer();
                                deffered.resolve(data);
                                return;

                            }

                            if (data.type !== 'result' && data.type !== 'err') {

                                timer1 = $timeout(function () {

                                    deffered.reject({
                                        error: i18n.i18nString('deffered.reject_error') 
                                    });
                                    worker.terminate();

                                }, timeout);

                            } else {

                                clearTimer(timer1);

                                timer2 = $timeout(function () {

                                    worker.terminate();

                                }, timeout);

                                deffered.reject(data);

                            }
                        };

                        return deffered.promise;

                    };
                    util.wrapItInside = function (print, code) {
                        if (print) {
                            print = print.replace(/<p>|<\/p>/g, '');
                            print = textparser.reWrap(print);
                            print = print.replace(/<%=|%>|<%/g, '+');
                            var chunks = print.replace(/(<.*?>)/g, '+$1+').split('+').filter(function (chunk) {
                                if (chunk) {
                                    return chunk;
                                }
                            }).map(function (chunk) {
                                if (chunk && chunk.search(/<.*?>/) !== -1) {
                                    return (chunk = "'" + chunk + "'");
                                } else if (!insideTitleVars(chunk) && !insideKeys(chunk) && !insideDescVars(chunk)) {
                                    return (chunk = "'" + chunk + "'");
                                } else {
                                    return chunk;
                                }
                            }).join('+');
                            print = chunks.replace(/'\+'/g, '')
                                    .replace(/\s?class="medium-[i|b|u]"/g, '');
                        } else {
                            print = '';
                        }
                        code = code ? code : '';
                        print = print ? ('var printf=print; printf(' + print + ')') : '';
                        return ('<% ' + code + print + ' %>');
                    };
                    util.splitCodeIntoNormalAndCode = function (string) {
                        var markup = '', code = '';
                        if (string.indexOf('<% ') != -1 && string.lastIndexOf('%>') != -1) {
                            code = string.substring(string.indexOf('<% ') + 2, string.lastIndexOf('%>'));
                        }
                        markup = string.replace(code, '').replace(/<%=|%>/g, '').replace(/<%/g, '');
                        code = (code.replace(/var printf=print;/g, '') || '').trim();
                        code = code.replace(/printf/g, 'print');
                        code = (code.replace(/printf\s?[(](.+)[)]/g, '') || '').trim();
                        code = (code.replace(/<%|%>/g, '') || '').trim();
                        return code;
                    };

                    function clearTimer(timer1) {
                        if (timer1) {
                            $timeout.cancel(timer1);
                        }
                    }


                    return util;
                }])

            .factory('jsValidator', ['env_conf', '$window', function (env_conf, $window) {
                return {
                    getError : function (script, timeout) {

                                var worker = new Worker(env_conf['js-validator-worker']);

                                return new Promise(function (resolve, reject){
                                    worker.postMessage(script);

                                    // Handle result
                                    worker.onmessage = function (e, data) {
                                        worker.terminate();
                                        resolve(e.data);
                                    };

                                    worker.onerror = function (e, data) {
                                        worker.terminate();
                                        reject(e);
                                    };
                                });
                               }
                    };
            }])

            .factory('defaultValue',function(){
                function setDefaultOptionalValue(value,uid){
                    if(!this.optionalValue || !value){
                    this.optionalValue = {};
                    }
                    if(uid){
                    this.optionalValue[uid]= value;
                    }
                }
                function getDefaultOptionalValue(){
                  return this.optionalValue;
                }
                function setDefaultHiddenValue(value,uid){
                    if(!this.HiddenValue || !value){
                    this.HiddenValue = {};
                    }
                    if(uid){
                    this.HiddenValue[uid]= value;
                    }
                }
                function getDefaultHiddenValue(){
                  return this.HiddenValue;
                }
                return {
                    setDefaultOptionalValue : setDefaultOptionalValue,
                    getDefaultOptionalValue: getDefaultOptionalValue,
                    setDefaultHiddenValue : setDefaultHiddenValue,
                    getDefaultHiddenValue: getDefaultHiddenValue

                };

            });


})(angular);


;/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function IeVersion() {
    //Set defaults
    var value = {
        IsIE: false,
        TrueVersion: 0,
        ActingVersion: 0,
        CompatibilityMode: false
    };

    //Try to find the Trident version number
    var trident = navigator.userAgent.match(/Trident\/(\d+)/);
    if (trident) {
        value.IsIE = true;
        //Convert from the Trident version number to the IE version number
        value.TrueVersion = parseInt(trident[1], 10) + 4;
    }

    //Try to find the MSIE number
    var msie = navigator.userAgent.match(/MSIE (\d+)/);
    if (msie) {
        value.IsIE = true;
        //Find the IE version number from the user agent string
        value.ActingVersion = parseInt(msie[1]);
    } else {
        //Must be IE 11 in "edge" mode
        value.ActingVersion = value.TrueVersion;
    }

    //If we have both a Trident and MSIE version number, see if they're different
    if (value.IsIE && value.TrueVersion > 0 && value.ActingVersion > 0) {
        //In compatibility mode if the trident number doesn't match up with the MSIE number
        value.CompatibilityMode = value.TrueVersion != value.ActingVersion;
    }
    return value;
}
var ie = IeVersion();
if (ie && ie.IsIE && (ie.ActingVersion < 11 || ie.CompatibilityMode)) {
    if (ie.CompatibilityMode) {
        alert('Your Internet Explorer is currently running in "Compatibility Mode".\nTo use Builder Tool, we recommend switch off compatibility mode in Internet Explorer.');
    } else if(ie.ActingVersion < 11) {
        alert('Your browser is not supported.\nTo use Builder Tool, we recommend using the Internet Explorer 11 and above versions.');
    }

}

;(function (ng) {
    'use strict';
    var _module = ng.module('app.helpers');


    _module.service('jsEvents', ['$rootScope', '$timeout', '$injector', 'localstore', '$location', '$applicationService',
        function ($rootScope, $timeout, $injector, localstore, $location, $applicationService) {
            var events = this;
            this.brodcastOnRootScope = function (eName, eData) {
                eData = eData || {};
                $rootScope.$broadcast(eName, eData);
            };
            this.routeToInfo = function (path) {
                if(path === 'session_expired') {
                    $injector.get("security").isAuthenticated(false);
                }
                if (document.getElementById('secssionTimeoutCountDown')) {
                    document.getElementById('secssionTimeoutCountDown').classList.remove("active");
                }
                if (path) {
                    $location.path(window.appConfig.CONTEXT_PATH + '/info/' + path);
                } else {
                    //$location.path(window.appConfig.CONTEXT_PATH + '/login');
                    $injector.get("security").redirectToLoginPath();
                }
            };
            this.securityAuthenticationSetReset = function (setOrReset, timerValue) {
                function startTimer() {

                    var presentTime = document.getElementById('secssionTimeOutTimer').innerHTML;
                    var timeArray = presentTime.split(/[:]+/);
                    var m = parseInt(timeArray[0]);
                    var s = checkSecond(parseInt((timeArray[1]) - 1));
                    if (s == 59) { m = m - 1; }
                    if (m < 0) {
                        document.getElementById('secssionTimeoutCountDown').classList.remove("active");
                        clearTimeout(startTimer);
                        clearTimeout(events.accessTokenCountDownTimer);
                        if (events.sessionAccessPooling) {
                            clearTimeout(events.sessionAccessPooling);
                        }
                        document.getElementById('secssionTimeoutCountDown').classList.add("opened");
                        $injector.get("security").logout(true);

                    } else {
                        document.getElementById('secssionTimeOutTimer').innerHTML = "0" + m + ":" + s;
                        events.sessionTimer = setTimeout(startTimer, 1000);
                    }
                }

                function checkSecond(sec) {
                    if (sec < 10 && sec >= 0) { sec = "0" + sec; } // add zero in front of numbers < 10
                    if (sec < 0) { sec = "59"; }
                    return sec;
                }
                if (setOrReset == 'reset' && events.accessTokenCountDownTimer) {
                    clearTimeout(events.sessionTimer);
                    clearTimeout(events.accessTokenCountDownTimer);
                    if (document.getElementById('secssionTimeoutCountDown')) {
                        document.getElementById('secssionTimeoutCountDown').classList.remove("active");
                    }
                    // console.log("timerCleared");
                }
                if (!(document.getElementById('secssionTimeoutCountDown') && document.getElementById('secssionTimeoutCountDown').classList.contains('opened'))) {
                    clearTimeout(events.accessTokenCountDownTimer);
                    events.accessTokenCountDownTimer = setTimeout(function () {
                        if (document.getElementById('secssionTimeoutCountDown')) {
                            document.getElementById('secssionTimeoutCountDown').classList.add('active');
                            // console.log("timerStarted");
                            document.getElementById('secssionTimeOutTimer').innerHTML = "05:00";
                            startTimer();

                        }
                    }, timerValue - 300000);

                }
            };
            this.securityAuthenticationStatus = function (noPolling) {
                // if (! localstore.getAuthData()) {
                //     $location.path(window.appConfig.CONTEXT_PATH+'/login');
                // } 
                function startAuthorizationPooling() {
                    var url = 'mp.user.tokenExpiry';
                    var userId = userData.userInfo.id;
                    var params = {
                        userId: userId
                    };

                    return $injector.get("$translator").translate(url, params, {}).then(
                        function (response) {
                            if(!noPolling){
                                events.sessionAccessPooling = setTimeout(startAuthorizationPooling, 300000);  // 5 minuts pooling;
                            }
                        },
                        function (err) {
                            // $injector.get("security").logout(true);
                        }
                    );
                }
                var jStorage = localstore.getAuthData();
                if (jStorage && jStorage.currentAccount) {
                    var userData = jStorage.currentAccount;
                    startAuthorizationPooling();
                }

            };
            // events.securityAuthenticationStatus = setTimeout(this.securityAuthenticationStatus, 30000);

             // trigger message to child window//
             this.postMessageToChildIframes=function (action,selector,payload) {
               var iframes =  $('iframe');
               var message = {
                action: action,
                payload: payload || {},
             };
             if(selector){
                message.selector = selector;
             }
               if(iframes && iframes.length) {
                   for(var i=0; i < iframes.length; i++ ){
                    if(iframes[i] && iframes[i].contentWindow && iframes[i].contentWindow.postMessage){
                        // console.log('message Posted'+ i);
                        iframes[i].contentWindow.postMessage(
                            message, '*'
                        );
                    }
                   }
               }
            };
           // trigger message to child window//
           // IP white listing for selected account
           this.handleIpRestriction = function(error) {
            var _userInfo = $applicationService.userInfo();
            _userInfo = _userInfo.appControls.associatedAccounts;
            var authentication = $injector.get('security').isAuthenticated();
            if(_userInfo.length == 1) { // single account
                if (error.data && error.data.error && error.data.error.code === 403.503) {
                    window.bootbox.dialog({
                        message: error.data.error.msg,
                        className: "alert-modal",
                        closeButton: false,
                        buttons: {
                            main: {
                                label: "Done",
                                className: "btn-primary",
                                callback: function () {
                                    $injector.get("security").logout();   
                                }
                            }
                        }
                    });
                }
            } else if (_userInfo.length > 1) {
                if(authentication) { // muti-account form 
                    if (error.data && error.data.error && error.data.error.code === 403.503) {
                        window.bootbox.dialog({
                            message: error.data.error.msg,
                            className: "alert-modal",
                            closeButton: false,
                            buttons: {
                                success: {
                                    label: 'Switch account',
                                    className: "btn-primary",
                                callback: function () {
                                    window.location.href=window.appConfig.CONTEXT_PATH + '/login?form=accountsList';   
                                }
                                },
                                main: {
                                    label: "Go to Login",
                                    className: "btn-primary",
                                    callback: function () {
                                        $injector.get("security").logout();   
                                    }
                                }
                            }
                        });
                    }

                } else {
                    $injector.get("security").logout();   
                }
            }
           };
            // PlanUsage Plan upgrade modal
           var doubleCheck = true;
           this.planUsageLimit = function(error) {
            if(!doubleCheck) {
                return;
            } else {
                doubleCheck = false;
            }
            setTimeout(function() {
                doubleCheck = true;
            }, 5000);
            $rootScope.planUsageUpgradeModal(); // call upgrade modal
           };
        }]);


    _module.service('domEvents', ['$document', '$rootScope', '$timeout', '$anchorScroll', '$window', 'env_conf', 'jsEvents', '$injector','mixPanel',
        function ($document, $rootScope, $timeout, $anchorScroll, $window, env_conf, jsEvents, $injector,mixPanel) {
            this.register = function () {
                $document.on('click', '.help-hint-link a', function (e) {
                    if (!$(e.target).attr('href')) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        window.open($rootScope.helpLinks.HOME, '_blank');
                    }

                });
                $(document).on('click', '.ps-scrollbar-y', function (e) {
                    e.stopPropagation();
                    console.log('propagated');
                });
                $(document).on('click', '.ps-scrollbar-y-rail', function (e) {
                    e.stopPropagation();
                    console.log('propagated');
                });
                $(document).on('click', 'a[data-toggle="tab"]', function (e) {
                    if ($(this).parent('li').hasClass('disabled')) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                });
                $(document).on('scroll', function (e) {
                    $(document).scrollTop(0);
                });
                $rootScope.$on("pefectScrollUpdate", function () {
                    var _pEles = $('[perfect-scroll]');
                    if (_pEles && _pEles.length) {
                        _pEles.each(function (index, _pEle) {
                            PerfectScrollbar.update(_pEle);
                        });
                    }
                });


                $(document).on("shown.bs.collapse", ".panel-collapse", function (e) {

                    if ($(this).attr("id") === "intentPanel") {
                        return true;
                    }

                    var $panel = $(this).closest('.panel');
                    var $scrollDiv = $(this).closest("[perfect-scroll]");


                    var _PanelEle = $(this).closest('.panel');
                    if (_PanelEle) {
                        var _container = _PanelEle.closest('.ps-container');
                        if (_container && _container.offset()) {
                            var _scrollHeight = _PanelEle.offset().top - _container.offset().top + _container.scrollTop();
                            _container.animate({
                                scrollTop: _scrollHeight
                            }, 'slow');
                        }
                    }


                });

                var modalClasses = [
                    "flowtask-create-form",
                    "dialog-notification-modal",
                    "taskCreateOrEditModal",
                    "btFullpageModal",
                    "utteranceModal",
                    "utterances-form",
                    "channelsmodalclass",
                    "bot-publish-form",
                    "analyzeFilter"
                ];

                var checkIsItParentModalClass = function (event) {
                    var hasClass = false;
                    $.each(modalClasses, function (i, targetClass) {
                        if ($(event.target).hasClass(targetClass)) {
                            hasClass = true;
                            return;
                        }
                    });
                    return hasClass;
                };

                $(document).on("hidden.bs.modal", ".modal", function (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    $timeout(function () {
                        if (!$(".modal-backdrop.in").is(":visible") || checkIsItParentModalClass(evt)) {
                            $("body").removeClass("bt-modal-open");
                        } else {

                            $("body").addClass("bt-modal-open");

                        }
                    }, 300);

                    var fullPageModalEle = $("#btFullpageModal .main-content");

                    if ($(evt.target).hasClass('btFullpageModal')) {
                        $rootScope.$emit('restrictSideHover', true);
                    }
                    if (fullPageModalEle.is(":visible")) {
                        PerfectScrollbar.destroy(fullPageModalEle[0]);
                        PerfectScrollbar.initialize(fullPageModalEle[0], {
                            wheelSpeed: 2,
                            wheelPropagation: false,
                            minScrollbarLength: 25
                        });
                    }
                });
                function setModalHeight() {
                    $timeout(function () {
                        var _OFFSET_TOP = 75, _OFFSET_BOTTOM = 81;
                        var _container = $('.modal-body.modalPerfectScroll:visible').last();
                        if (_container && _container.length) {
                            var _headerHeight = _container.closest('.modal-content').find('.modal-header').outerHeight();
                            var _wrapperHeight = _headerHeight + _OFFSET_TOP + _OFFSET_BOTTOM;


                            var _contentHeight = 0;
                            var _children = _container.children();
                            for (var i = 0; i < _container.length; i++) {
                                _contentHeight = _contentHeight + _children[i].scrollHeight;
                            }
                            _contentHeight = _contentHeight + parseInt(_container.css('padding-top')) + parseInt(_container.css('padding-bottom'));

                            // _container.css("height", $(window).height() -_wrapperHeight);

                            if (_contentHeight > $(window).height() - _wrapperHeight) {
                                _container.css("height", $(window).height() - _wrapperHeight);
                            } else {
                                _container.css("height", _contentHeight);
                            }

                            PerfectScrollbar.update(_container[0]);
                        }
                    }, 50);
                }
                $(document).on('click', ".modal-body.modalPerfectScroll:visible", function () {
                    setModalHeight();
                });
                $(document).on('change', ".modal-body.modalPerfectScroll:visible", function () {
                    setModalHeight();
                });
                $(window).resize(function (event) {
                    setModalHeight();
                    $rootScope.$broadcast('windowResize', event);
                    setTimeout(function () {
                        $rootScope.$emit('pefectScrollUpdate');
                    }, 0);
                });
                $rootScope.$on('updateModalSize', function () {
                    setModalHeight();
                });

                $(document).on("shown.bs.modal", ".modal", function (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    var fullPageModalEle = $("#btFullpageModal .main-content");
                    if (!$(evt.target).hasClass("taskCreateOrEditModal") && fullPageModalEle.is(":visible")) {
                        PerfectScrollbar.destroy(fullPageModalEle[0]);
                    }
                    setModalHeight();
                    $("body").addClass("bt-modal-open");


                });


                function checkForTypeaHead(event) {
                    var _event = $(event.target);
                    if (_event && _event.parent()) {
                        var _parent = _event.parent();
                        if (!_parent.hasClass('ui-autocomplete')) {
                            var _contextRefs = $('.contextTypeaheadDropdown :visible');
                            if (_contextRefs && _contextRefs.length) {
                                var _autoEle = $('[context-typeahead]');
                                if (_autoEle && _autoEle.length) {
                                    _autoEle.each(function (index, ele) {
                                        if ($(ele).autocomplete) {
                                            $(ele).autocomplete('close');
                                        }
                                    });
                                }
                            }
                            _contextRefs = null;
                        }
                    }
                }
                $('body').bind("mousewheel", function (event) {
                    checkForTypeaHead(event);
                });
                $('body').bind("scroll", function (event) {
                    checkForTypeaHead(event);
                });
                $rootScope.$on("hoverEvent", function () {
                    if ($('iframe.iframeContainer').length) {
                        var _frame = $('iframe.iframeContainer').contents();
                        if (_frame) {
                            var _frameEvent = _frame.find("body select");
                            if (_frameEvent.length) {
                                _frameEvent.blur();
                            }
                        }
                    }
                });

                // $('.panel-collapse').off('shown.bs.collapse').on('shown.bs.collapse', function(e) {
                //             var $panel = $(this).closest('.panel');
                //             var $scrollDiv = $(this).closest("[perfect-scroll]");
                //             $($scrollDiv).animate({
                //               scrollTop: $panel.offset().top-130
                //           }, 500);
                //         });

                $window.handleimgLoad = function (e,userAvatar) {
                    if(userAvatar){
                        var avatar = env_conf['context-url'] + '/img/user-gray.svg';
                       e.src = avatar; 
                    } else{
                        var _brokenImageSmall = env_conf['context-url'] + '/assets/images/brokenImageSmall.png';
                        e.src = _brokenImageSmall;
                    }
                };
                // Create IE + others compatible event handler
                var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                var eventer = window[eventMethod];
                var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

               


                // Listen to message from child window
                eventer(messageEvent, function (e) {
                    //console.log('parent received message!:  ', e.data);
                    if (e.data && e.data.action) {
                        var data = e.data;
                        var _selector = data.selector;
                        if (!_selector) {
                            _selector = '#customDashBoardFrame';
                        }

                        var localstore=$injector.get("localstore");
                        switch (data.action) {
                            case 'iframeLoadEvent':
                                $rootScope.$broadcast('iframeLoadEvent');
                                break;
                            case 'expand':
                                $('body').attr('data-iframe-expand','true');
                                $(_selector).addClass("expanded");
                                if(data && data.payload && data.payload.hideChatWindow){
                                  $("body").addClass("hideChatWindow");
                                }
                                if(data && data.payload){
                                    $rootScope.$broadcast("setSelectedProcessApp", data.payload);
                                }
                                break;
                            case 'importAppStatus':
                                if(data && data.payload){
                                    $rootScope.$broadcast("importAppStatus", data.payload);
                                }
                                break;
                            case 'expandCustomModal':
                                $('body').attr('data-iframe-expand','true');
                                $("body").addClass("hideChatWindow");
                                $(_selector).addClass("expanded " + data.payload); // data.payload should be slider or center for iframe modals
                                $('.talkToBot').hide();
                                break;
                            case 'collapseCustomModal':
                                $('body').removeAttr('data-iframe-expand');
                                $("body").removeClass("hideChatWindow");
                                $(_selector).removeClass("expanded center slider"); // remore modalType slider, center classes
                                $('.talkToBot').show();
                                break;
                            case 'uiFormsEvent':
                                $rootScope.$broadcast("uiformIframeEvent", data);
                                break;
                            case 'pdfAnnoEvent':
                                $rootScope.$broadcast("pdfAnnoIframeEvent", data);
                                break;
                            case 'versionComparision':
                                $rootScope.$broadcast("versionComparisionEvent", data);
                                break;
                            case 'conversationTesting':
                                $rootScope.$broadcast("conversationTestingEvent", data);
                                break;
                            case 'daasEvent':
                                $rootScope.$broadcast("daasIframeEvent", data);
                                break;
                            case 'collapse':
                                $('body').removeAttr('data-iframe-expand');
                                $(_selector).removeClass("expanded");
                                    $("body").removeClass("hideChatWindow");
                                $rootScope.$broadcast("setSelectedProcessApp", '');

                                break;
                            case 'dockStatusTrigger':
                                $rootScope.$broadcast('getProgressDockStatus');
                                $rootScope.$broadcast('startTimer');  
                                break;
                            case 'openHelp':
                                $rootScope.$broadcast("showHelp", data.payload);
                                break;
                            case 'closeHelp':
                                $rootScope.$broadcast("closeHelp");
                                break;
                            case 'loadVirtualAsst':
                                $rootScope.$broadcast("loadVirtualAsst");
                                break;
                            case 'httpResponse':
                                jsEvents.securityAuthenticationSetReset('reset',localstore.getAuthData().currentAccount.authorization.webIdleTime*60000); 
                                break;
                            case 'httpErrorResponse':
                                jsEvents.securityAuthenticationStatus(true);
                                break;
                            case 'refreshTokenExpired':
                                $injector.get("security").resetlocalStoragAfterLogout();
                                jsEvents.routeToInfo("session_expired");
                                break; 
                            case 'containmentMericsEvent' :
                                $rootScope.$broadcast("containmentMetricsIframeEvent", data);
                                break;
                            case 'bodyClick' :
                                 $('body').click();
                                break; 
                            case 'refreshTokenUpdated':
                                    var tokenRes = data.payload;
                                    if (tokenRes.status === 200 && tokenRes.authorization) {
                                        $injector.get("$translator").setAuthHeaders(tokenRes.authorization);
                                        var _koreUserInfo;
                                        try {
                                            _koreUserInfo =  localstore.getAuthData();
                                        } catch (ex) {
                                            console.log("failed to get jStorage Data");
                                        }
                                        
                                        if (_koreUserInfo && _koreUserInfo.currentAccount) {
                                            ng.extend(_koreUserInfo.currentAccount.authorization, tokenRes.authorization);
                                            localstore.setAuthData(_koreUserInfo);                   
                                        }
                                    } else {
                                        deferred.reject();
                                    }
                                break; 
                            case 'iframeLoadStoreEvent':
                                $rootScope.$broadcast('iframeLoadStoreEvent');
                                break;
                            case 'triggerProfileClick':
                                $(".profile.headerActions .dropdown-toggle .avatar").trigger('click');
                                break;
                            case 'NotificationService':
                                $rootScope.$broadcast("iframeNotificationEvent",data);
                                break;  
                            case 'invokeTraining':
                                 $rootScope.$broadcast("invokeTraining");  
                                 break;
                            case 'TemplateInstallationStatus':
                                $rootScope.$broadcast("TemplateInstallationStatus",data.payload);
                                break;
                            case 'installProcessAppFromBT':
                                $rootScope.$broadcast("installProcessAppFromBT",data.payload);
                                break;
                            case 'processAppCreationStatus':
                                $rootScope.$broadcast("processAppCreationStatus",data.payload);
                                break;
                            case 'mixPanelEvent':
                                    if(data && data.payload && ((data.payload.product === 'Conversational-App') || (data.payload.product === 'Process-App'))){
                                        $rootScope.$broadcast("mixPanelEvent",data); 
                                    } else if(data.payload && (data.payload.product === 'builderx')){
                                        mixPanel.postEvent(data.payload.event,data.payload.eventPayload);
                                    }
                                 break;
                            case 'refreshCheckList':
                                $rootScope.$broadcast("refreshCheckList",data.payload);  
                            break;
                            case 'closeCancelSDKTheme':
                                $rootScope.$broadcast("rtmThemeUpdates",data);  
                            break;
                            case 'upgradeUsagePlan' :
                                $rootScope.planUsageUpgradeModal(); // call upgrade modal
                                break;
                            default:
                                var iframe = 'dialogIframeEvent';
                                if(data.iframe){
                                    iframe =   data.iframe;
                                }
                                $rootScope.$broadcast(iframe, data); // need to replace witb a case from dialog frame//
                                break;
                        }

                    }
                }, false);

            };



        }]);


})(angular);



;angular.module('app.helpers').factory("appResover", function ($q, $timeout, i18n, $workflowService) {
    return {
        resolveDependencies: function () {
            //setCurrentLanguage returns promise 
            return i18n.setCurrentLanguage($workflowService.i18nSelectedLanguage());
        }
    };
});


;(function(ng) {

	'use strict';

	var _module = ng.module('app.helpers');

	_module.factory('$applicationService', ['$window', '$rootScope', '$localstorage', '_constants_', function($window, $rootScope, $localstorage, _constants_) {

		var apiServerUrl = '';

		var	userInfo = {
			userId  : null,
			userData: {},
			authObj : {
				token_type  : null,
				accessToken : null
			}
		};

		var	teamInfo = {
			teamId  : null,
			topicId : null
		};

		var	localStorageEnabled = false;

		var	setupInfo = {
			streamId : null,
			alertId  : null
		};

		var	namespace = '';

		var appConstants = {
			RESOURCE_TYPE_ALERT  : 'alert',
			RESOURCE_TYPE_ACTION : 'action',
			RESOURCE_TYPE_STREAM : 'stream'
		};

		var authId;
                $window.ExternalAuthResponse = function(response) {
                    $rootScope.$broadcast('ExternalAuthResponseEvent', response);
                };

                $window.OnChildLoad = function(windowObj) {
                    $rootScope.$broadcast('OnChildLoadEvent', windowObj);
                };
		return {

			authId : function(id){
				if(id){
					authId = id;
				}
				return authId;
			},

			getAppConstants: function() {
				return appConstants;
			},

			namespace: function() {
				return namespace || $localstorage.get('namespace') || 'public';
			},

			apiServerUrl: function(url) {
				if(url) {
					apiServerUrl = url;
					return;
				}
				return apiServerUrl;
			},

            userInfo: function (uInfo) {
                if (uInfo) {
                    userInfo.userId = uInfo.userId;
                    userInfo.authObj = uInfo.authObj;
                    userInfo.orgId = uInfo.orgId;
                    userInfo.licenseType = uInfo.licenseType;
                    userInfo.koreUserInfo = uInfo.koreUserInfo;
                    userInfo.appControls = uInfo.appControls;
                    return;
                }
                return userInfo;
            },

			teamInfo: function(tInfo) {
				if(tInfo) {
					teamInfo.teamId = tInfo.teamId;
					teamInfo.topicId = tInfo.topicId;
					return;
				}
				return teamInfo;
			},

			localStorageEnabled: function(bool) {
				if(bool) {
					localStorageEnabled = bool;
					return;
				}
				return localStorageEnabled;
			},

			removeUserInfo: function() {
				var keys = Object.keys(userInfo);
				for (var i = 0; i < keys.length; i++) {
					userInfo[keys[i]] = null;
				}
			},

			//Get formated error messages from error code
	        getErrorMessage: function (response) {
	        	var errorMessages = _constants_.errorMessages;
	            var errorMessage = errorMessages[0];
	            
	            if(response.data && response.data.errors) {
	                var message = response.data.errors[0].msg;
	                var code = response.data.errors[0].code;

	                if (message === 'PASSWORD_POLICY_CHANGED') {
	                    // $rootScope.$broadcast('sharedData:passwordPolicyChanged', null);
	                    return errorMessage;
	                } else if (code === 'TOKEN_EXPIRED' || message === 'TOKEN_EXPIRED') {
	                    // $rootScope.$broadcast('sharedData:sessionExpired', true); // Relogin automatically
	                    return errorMessage;
	                } else if(code === 41 && message === 'INVALID_ACCESS_TOKEN' || response.status === '401') {
	                    // $rootScope.$broadcast('sharedData:sessionExpired', false); // Dont Relogin
	                    return errorMessage;
	                }

	                if (errorMessages[code]) {
	                    errorMessage = errorMessages[code];
	                }
	                else if (errorMessages[message]){
	                    errorMessage = errorMessages[message];
	                }
	                else {
	                    errorMessage = message;
	                }
	            }

	            return errorMessage;
	        }

		};

	}]);


})(angular);

;(function(ng) {

	'use strict';

	var _module = ng.module('app.helpers');

	_module.filter('camelcasebreakword', function() {

		return function(_input) {
			if(!_input) {
				return '';
			}
			return _input.charAt(0).toUpperCase() + _input.substr(1).replace(/[A-Z]/g, ' $&').toLowerCase(); 
		};

	});

})(angular);

;(function (ng) {

    angular.module('app.helpers')
            .factory('channelsConfig', ['env_conf', '$workflowService', function (env_conf, $workflowService) {
                    /*
                     Values for markdownDisable:
                     ref:markdown-editor.js $scope.markdown.controls
                     -------------------------------------------
                     style,bold,italic,link,image,ordered,unordered,indent,line,variableKeys,preview                            
                     */
                    var dynamicChannels = [];
                    var conf = {
                        "channels": [{
                                "id": "email",
                                "markdownDisable": []
                            }, {
                                "id": "sms",
                                "markdownDisable": []
                            }, {
                                "id": "kore",
                                "markdownDisable": []
                            }, {
                                "id": "facebook",
                                "markdownDisable": []
                            }, {
                                "id": "slack",
                                "markdownDisable": []
                            }, {
                                "id": "rtm",
                                "markdownDisable": []
                            }, {
                                "id": "widgetsdk",
                                "markdownDisable": []
                            },{
                                "id": "skype",
                                "markdownDisable": []
                            }, {
                                "id": "spark",
                                "markdownDisable": []
                            }, {
                                "id": "twitter",
                                "markdownDisable": []
                            }, {
                                "id": "skypeOnPrem",
                                "markdownDisable": []
                            }],
                        "channelName": function(channelType){
                            var channelObject = _.find(channelsArray, function(channel){
                                return channel.id == channelType;
                            });
                            
                            return ((channelObject && channelObject.name) || channelType);
                        },
                        "getchannel": function(channelType){
                            var channelObject = _.find(channelsArray, function(channel){
                                return channel.id == channelType;
                            });
                            
                            return channelObject;
                        }     
                    };
                    conf.channelsObject = {
                    "email":{
                        "id": "email",
                        "name": "Email",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/email.svg' 
                        },
                      "sms":{
                        "id": "sms",
                        "name": "SMS",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/twillio-red-logo.svg?v=1.1'
                    }, "kore":{
                        "id": "kore",
                        "name": "Kore.ai",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/kore.svg'
                    }, "facebook":{
                        "id": "facebook",
                        "name": "Facebook Messenger",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/facebook.svg'
                    }, "slack":{
                        "id": "slack",
                        "name": "Slack",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/slack.svg'
                    }, "rtm":{
                        "id": "rtm",
                        "name": "Web/Mobile Client",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/web-mobile.svg'
                    },"widgetsdk":{
                        "id": "widgetsdk",
                        "name": "Widget SDK",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/widgetsdk.svg'
                    }, "skype":{
                        "id": "skype",
                        "name": "Skype",
                        "enable": false,
                        "icon":env_conf['context-url'] + '/img/skypeIcon.svg'
                    }, "spark":{
                        "id": "spark",
                        "name": "Cisco Webex Teams",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/spark.svg'
                    }, "twitter":{
                        "id": "twitter",
                        "name": "Twitter",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/twitter.svg'
                    }, "msteams":{
                        "id": "msteams",
                        "name": "Microsoft Teams",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/microsoft-teams-icon.png'
                    },"rcengage":{
                        "id": "rcengage",
                        "name": "RingCentral Engage",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/ringCentralEngage.png',
                    },"syniverse":{
                        "id": "syniverse",
                        "name": "Syniverse",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/syniverse.png',
                    },
                     "wfacebook":{
                        "id": "wfacebook",
                        "name": "Workplace by Facebook",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/fb-workplace-icon.png'
                    }, "ringcentral":{
                        "id": "ringcentral",
                        "name": "RingCentral Glip",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/ringCentralIcon.png'
                    }, "skypeforbusiness":{
                        "id": "skypeforbusiness",
                        "name": "Skype for Business",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/skypebusiness.svg'
                    }, "jabber":{
                        "id": "jabber",
                        "name": "Cisco Jabber",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/jabbericon.jpg'
                    }, "wfacebookG":{
                        "id": "wfacebookG",
                        "name": "Workplace For Groups",
                        "enable": true,
                        "icon": env_conf['context-url'] + '/img/fb-workplace-icon.png'
                    }, "wfacebookC":{
                        "id": "wfacebookC",
                        "name": "Workplace For Chat",
                        "enable": true,
                        "icon": env_conf['context-url'] + '/img/fb-workplace-icon.png'
                    }, "alexa":{
                        "id": "alexa",
                        "name": "Amazon Alexa",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/amazonalexa.png'
                    }, "twiliovoice":{
                        "id": "twiliovoice",
                        "name": "Twilio Voice",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/twillio-red-logo.svg?v=1.1'
                    }, "yammer":{
                        "id": "yammer",
                        "name": "Yammer",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/yammericon.png'
                    }, "telegram":{
                        "id": "telegram",
                        "name": "Telegram",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/telegram-logo.png'
                    }, "ivr":{
                        "id": "ivr",
                        "name": "Webhook",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/webhook.png'
                    }, "line":{
                        "id": "line",
                        "name": "Line",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/line-logo.png'
                    }, "liveperson":{
                        "id": "liveperson",
                        "name": "LivePerson",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/live-person.png'
                    }, "ivrVoice":{
                        "id": "ivrVoice",
                        "name": "IVR",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/ivr-logo.png'
                    }, "googleactions":{
                        "id": "googleactions",
                        "name": "Google Assistant",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/google-home.svg'
                    }, "whatsapp":{
                        "id": "whatsapp",
                        "name": "WhatsApp Business Messaging",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/whatsapp-business.svg'
                    },"rcs":{
                        "id": "rcs",
                        "name": "RCS Business Messaging",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/rcsBusiness.png'
                    }, "wechat":{
                        "id": "wechat",
                        "name": "WeChat",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/weChat.svg'
                    }, "mattermost":{
                        "id": "mattermost",
                        "name": "Mattermost",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/matterMost.svg'
                    }, "hangoutchat":{
                        "id": "hangoutchat",
                        "name": "Hangouts Chat",
                        "enable": false,
                        "icon": env_conf['context-url'] + '/img/hangoutchat.png'
                    }, "cisco": {
                        'id': 'cisco',
                        'name': 'Cisco Tropo',
                        'enable': true,
                        'icon': env_conf['context-url'] + '/img/cisco-tropo-icon.png'
                    }, "twilio": {
                        'id': 'twilio',
                        'name': 'Twilio SMS',
                        'enable': true,
                        'icon': env_conf['context-url'] + '/img/twillio-red-logo.svg?v=1.1'
                    }, "livebank":{
                        "id": "livebank",
                        "name": "LiveBank",
                        "enable": true,
                        "icon": env_conf['context-url'] + '/img/livebank.png'
                    }, "skypeOnPrem":{
                        'id': 'skypeOnPrem',
                        'name': 'Skype on Premise',
                        'enable': false,
                        'icon': env_conf['context-url'] + '/img/skypebusiness.svg'
                    },"unblu":{
                        'id': 'unblu',
                        'name': 'Unblu',
                        'enable': false,
                        'icon': env_conf['context-url'] + '/img/unblu-logo.svg'
                    },"audiocodes": {
                        'id': 'audiocodes',
                        'name': 'IVR - AudioCodes',
                        'enable': false,
                        'icon': env_conf['context-url'] + '/img/audiocodes.png'
                    }
                };

                var staticChannel = $workflowService.cloneData(conf.channelsObject);
                var channelsArray = [];
                for(var key in staticChannel) {
                    if(staticChannel[key]) {
                        channelsArray.push(staticChannel[key]);
                    }
                }
                    
                    
                    conf.icons = {
                        'spark': env_conf['context-url'] + '/img/spark.svg',
                        'msteams': env_conf['context-url'] + '/img/microsoft-teams-icon.png',
                        'syniverse': env_conf['context-url'] + '/img/syniverse.png',
                        'rcengage': env_conf['context-url'] + '/img/ringCentralEngage.png',
                        'slack': env_conf['context-url'] + '/img/slack.svg',
                        'sms': env_conf['context-url'] + '/img/sms.svg',
                        'twilio': env_conf['context-url'] + '/img/twillio-red-logo.svg?v=1.1',
                        'email': env_conf['context-url'] + '/img/email.svg',
                        'skype': env_conf['context-url'] + '/img/skypeIcon.svg',
                        'facebook': env_conf['context-url'] + '/img/facebook.svg',
                        'websdk': env_conf['context-url'] + '/img/slack.svg',
                        'kore': env_conf['context-url'] + '/img/kore.svg',
                        'rtm': env_conf['context-url'] + '/img/web-mobile.svg',
                        'widgetsdk': env_conf['context-url'] + '/img/widgetsdk.svg',
                        'twitter': env_conf['context-url'] + '/img/twitter.svg',
                        'skypeOnPrem': env_conf['context-url'] + '/img/skypebusiness.svg',
                        'cisco': env_conf['context-url'] + '/img/cisco-tropo-icon.png',
                        'wfacebook': env_conf['context-url'] + '/img/fb-workplace-icon.png',
                        'Workplace For Groups': env_conf['context-url'] + '/img/fb-workplace-icon.png',
                        'Workplace For Chat': env_conf['context-url'] + '/img/fb-workplace-icon.png',
                        'ringcentral': env_conf['context-url'] + '/img/ringCentralIcon.png',
                        'skypeforbusiness': env_conf['context-url'] + '/img/skypebusiness.svg',
                        'jabber': env_conf['context-url'] + '/img/jabbericon.jpg',
                        'yammer': env_conf['context-url'] + '/img/yammericon.png',
                        'telegram': env_conf['context-url'] + '/img/telegram-logo.png',
                        'alexa': env_conf['context-url'] + '/img/amazonalexa.png',
                        'twiliovoice': env_conf['context-url'] + '/img/twillio-red-logo.svg?v=1.1',
                        'line': env_conf['context-url'] + '/img/line-logo.png',
                        'ivr': env_conf['context-url'] + '/img/webhook.png',
                        'liveperson': env_conf['context-url'] + '/img/live-person.png',
                        'ivrVoice': env_conf['context-url'] + '/assets/ivrIcons/ivrIcon.svg',
                        'googleactions': env_conf['context-url'] + '/img/google-home.svg',
                        'whatsapp': env_conf['context-url'] + '/img/whatsapp-business.svg',
                        'rcs': env_conf['context-url'] + '/img/rcsBusiness.png',
                        'wechat': env_conf['context-url'] + '/img/weChat.svg',
                        'mattermost':env_conf['context-url'] + '/img/matterMost.svg',
                        'hangoutchat': env_conf['context-url'] + '/img/hangoutchat.png',
                        'livebank': env_conf['context-url'] + '/img/livebank.png',
                        'unblu':env_conf['context-url'] + '/img/unblu-logo.svg',
                        'audiocodes':env_conf['context-url'] + '/img/audiocodes.png'
                    };
                    conf.iconsTooltips = {
                        'spark': 'Cisco Webex Teams',
                        'msteams': 'Microsoft Teams',
                        'slack': 'Slack',
                        'sms': 'SMS',
                        'twilio': 'Twilio',
                        'email': 'Email',
                        'skype': 'Skype',
                        'facebook': 'Facebook Messenger',
                        'websdk': 'Slack',
                        'kore': 'Kore.ai',
                        'rtm': 'Web/Mobile Client',
                        'widgetsdk': 'Widget SDK',
                        'twitter': 'Twitter',
                        'skypeOnPrem': 'Skype On Premise',
                        'cisco': 'Cisco Tropo',
                        'wfacebook': 'Workplace By Facebook',
                        'Workplace For Groups': 'Workplace For Groups',
                        'Workplace For Chat': 'Workplace For Chat',
                        'ringcentral': 'Ringcentral Glip',
                        'skypeforbusiness': 'Skype For Business',
                        'jabber': 'Jabber',
                        'yammer': 'Yammer',
                        'telegram': 'Telegram',
                        'alexa': 'Amazon Alexa',
                        'twiliovoice': 'Twilio Voice',
                        'line': 'Line',
                        'ivr': 'Webhook',
                        'liveperson': 'LivePerson',
                        'ivrVoice': 'IVR',
                        'googleactions':"Google Assistant",
                        'whatsapp':"WhatsApp Business Messaging",
                        'rcs': "RCS Business Messaging",
                        'wechat':"WeChat",
                        'mattermost':"Mattermost",
                        'hangoutchat': 'Hangouts Chat',
                        'livebank': 'LiveBank',
                        'unblu':'Unblu',
                        'audiocodes': 'IVR - AudioCodes'
                    };
                    conf.getDynamicChannels = function(stream){
                        dynamicChannels = [];
                        try {
                            $workflowService.seedData().channels.forEach(function(val){
                                if(val.type.toLowerCase() === 'sms' || val.type.toLowerCase() === 'wfacebook') {
                                    return;
                                }
                                if(staticChannel[val.type]) {
                                    staticChannel[val.type].enable = true;
                                }
                                for(var i=0; i<channelsArray.length; i++) {
                                    if(channelsArray[i].id === val.type) {
                                        channelsArray[i].enable = true;
                                    }
                                }
                            });
                        }
                        catch(e) {
                            console.error('seedData channels error');
                        }
                        conf.channelsObject = $workflowService.cloneData(staticChannel);
                        if(stream && stream.channels){
                            $.each(stream.channels,function(i,specficChannel){
                                if(specficChannel.type.startsWith('ivr') && specficChannel.type !== 'ivrVoice'){
                                    var a = {};
                                    a.id = specficChannel.type;
                                    a.name =  specficChannel.displayName;
                                    a.enable= true;
                                    a.icon= env_conf['context-url'] + '/img/webhook.png';
                                    dynamicChannels.push(a);
                                    //dynamic obj preparation
                                    conf.channelsObject[specficChannel.type] = a;
                                }
                            });
                        }
                        channelsArray.concat(dynamicChannels);
                    };
                    conf.getConfiguredChannels=function(stream){
                        return [];//yet to implement
                    };
                    //right now its been used in dialog FormExperience only, dont use in other places until we streamline this method
                    conf.getSupportedChannels=function(){
                        //yet to implement 
                        //$workflowService.seedData().botChannelsTypes;
                        var channelObjectCopy=$workflowService.cloneData(conf.channelsObject);
                        //wfacebook is not treated as a channel
                        delete channelObjectCopy.wfacebook;

                        return Object.values(channelObjectCopy); 
                    };
                    return conf;

                }]);

}(angular));

;(function(ng) {

    'use strict';

    var _module = ng.module('app.helpers');

    _module.factory('$endpoints', ['$location','env_conf', function($location,env_conf) {

            var _exports = {};

            var API_URL_PREFIX = "/api/"+env_conf['version'],
                API_SERVER_URL = env_conf['API_SERVER_URL'],
                API_SERVER_SPEECH_URL = env_conf['SDK_SPEECH_URL'],
                serviceList = {};

            var appIpWhiteList              = API_SERVER_URL + API_URL_PREFIX + "/isIpAddressRestricted";            

            var checkDirectSSOStatus        = API_SERVER_URL + API_URL_PREFIX + "/prelogin";

            var checkVersionInfo            = API_SERVER_URL + API_URL_PREFIX + "/versionInfo";

            var uxPreview                   = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/streams/:streamId/testexecute?markup=:markup&channel=:channel";

            var btStreamsTestIDP            = API_SERVER_URL + '/flow/auth?connection=:idpName&sso_type=:ssoType&userId=:userId&passphrase=:passPhrase&apiKey=:apiKey&label=:label'; //GET

            var wfAccounts                  = API_SERVER_URL + API_URL_PREFIX + '/stream/:streamId/wfaccounts?isDeveloper=:isDeveloper&isTryOutUserConnection=:isTryOutUserConnection';

            var ringCentralWfAccount        = API_SERVER_URL + API_URL_PREFIX + "/stream/:streamId/wfaccounts/idp?idp=:idpName&channel_auth=ringcentral";

            var btParamMap                  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/map'; //POST

            var btParamDialogMap            = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/mapDialog'; //POST

            var deleteAccount               = API_SERVER_URL + API_URL_PREFIX + '/wfaccounts/:accId';

            var btTestIDP                   = API_SERVER_URL + '/flow/request'; //POST

            var btTestRequestChain          = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/testrequestchain'; //POST

            var btTestTask                  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/testtask'; //POST

            var btDotKeys                   = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/dotkeys'; //POST

            var btGetCallbackURL            = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/idp/:idp/callback'; //GET

            var btUploadFile                = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/file'; //POST

            var btSignedURL                 = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/:resourceId/:fileId/signedMediaURL'; //GET

            var btLoginEndPoint             = API_SERVER_URL + API_URL_PREFIX + '/oauth/token'; //POST

            var btStreamsGetIDP             = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/idp'; //GET

            var btStreamGetIDPs             = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/idp'; //GET

            var btSeedData                  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/seed_data'; //GET

            var processAppsData             = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/processflows'; //GET

            var btSeedCategories            = API_SERVER_URL + API_URL_PREFIX + '/market/categories';

            var btStreamAlertEndpoint       = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams'; //GET

            var btStreamsEndPoint           = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams'; //GET + POST

            var mpStreamsEndPoint           = API_SERVER_URL + API_URL_PREFIX + '/market/streams'; //GET + POST

            var btAlertsEndPoint            = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/alerts'; //GET + POST

            var mpAlertsEndPoint            = API_SERVER_URL + API_URL_PREFIX + '/market/alerts'; //GET + POST

            var btActionsEndPoint           = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/actions'; //GET + POST

            var mpActionsEndPoint           = API_SERVER_URL + API_URL_PREFIX + '/market/actions'; //GET + POST

            var btFilterdefEndPoint         = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/filters'; //GET + POST

            var mpFilterdefEndPoint         = API_SERVER_URL + API_URL_PREFIX + '/market/filters'; //GET + POST

            var btAAMEndPoint               = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/flow/alertaction'; //GET + POST

            var mpAAMEndPoint               = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/market/workflows'; //GET + POST

            var btTeams                     = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/bt/teams'; //GET + POST

            var alertConfigured             = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/alerts/:alertId/markConfigured';

            var actionConfigured            = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/actions/:actionId/markConfigured';

            var btIDPGet                    = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/idp/:appId';

            var btParmaMapGet               = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/map';

            var btAlertDialogParamMapPost   = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/mapDialog';

            var btAlertPublishEndPoint      = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/alerts/:alertId/publish';

            var btActionPublishEndPoint     = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/actions/:actionId/publish';

            var koreUxMapResolve            = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/resolve_uxmap';

            var streamMappings              = API_SERVER_URL + API_URL_PREFIX +  '/users/:userId/builder/streams/:streamId/parammappings';

            var dialogStreamMappings        = API_SERVER_URL + API_URL_PREFIX +  '/users/:userId/builder/streams/:streamId/parammappingsForDialog';

            var btStreamErrorCodes          = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/pollerrorcodes';

            var btAlertErrorCodes           = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/alerts/:alertId/pollerrorcodes';

            var btActionErrorCodes          = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/actions/:actionId/pollerrorcodes';

            var dropdownTest                = API_SERVER_URL + API_URL_PREFIX + '/wfaccounts/:instanceId/fetch';

            var isUserAllowedToAccess       = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/AppControlList';

            var acceptterms                 = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/consentPolicy/accept';

            var commandGet                  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/slashcommands';

            var commandCreate               = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/slashcommands';

            var commandEdit                 = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/slashcommands';

            var subCommandGet               = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/actions/:actionId/slashcommands';

            var commandDelete               = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/slashcommands';

            var subCommandCreate            = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/actions/:actionId/slashcommands';

            var subCommandEdit              = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/actions/:actionId/slashcommands?id=:id';

            var subCommandDelete            = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/actions/:actionId/slashcommands?id=:id';

            var soapDescription             = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/soap';

            var soapOperationExec           = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/soap/execute';

            var checkAlertUpgrade           = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/alerts/:alertId/checkUpgrade';

            var checkActionUpgrade          = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/actions/:actionId/checkUpgrade';

            var checkAlertVersions          = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/alerts/:alertId/versions';

            var checkActionVersions         = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/actions/:actionId/versions';

            var connectorsGet               = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/:orgId/connectors/all?active=true';

            var getSynonymsForTaskName      = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/';

            var chatAssertions              = API_SERVER_URL + API_URL_PREFIX + '/users/sts';

            var appsUrl                     = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/streams/:streamId/sdk/apps';

            var appsListUsageURL                     = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/streams/:streamId/sdk/apps?getAppsUsage=true';

            var appCreateUrl                = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/streams/:streamId/sdk/apps';

            var appEditUrl                  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/streams/:streamId/sdk/apps/:appId?streamId=:streamId';

            var appDeleteUrl                = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/streams/:streamId/sdk/apps/:appId';

            var keyRefreshUrl               = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/streams/:streamId/sdk/apps/:appId/regeneratekey';

            var orgAppsUrl                  = API_SERVER_URL + API_URL_PREFIX + '/organization/:orgId/sdk/apps';

            var orgAppCreateUrl             = API_SERVER_URL + API_URL_PREFIX + '/organization/:orgId/sdk/apps';

            var orgAppEditUrl               = API_SERVER_URL + API_URL_PREFIX + '/organization/:orgId/sdk/apps/:appId';

            var orgAppDeleteUrl             = API_SERVER_URL + API_URL_PREFIX + '/organization/:orgId/sdk/apps/:appId';

            var orgKeyRefreshUrl            = API_SERVER_URL + API_URL_PREFIX + '/organization/:orgId/sdk/apps/:appId/regeneratekey';

            var getChannelFieldsSchema      = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/bt/smsgateways';

            var actionLogsGet               = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/actions/:actionId/logs';

            var alertLogsGet                = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/alerts/:alertId/logs';

            var getGenericMessages          = API_SERVER_URL + API_URL_PREFIX + '/streams/koraGenericResp?streamId=:streamId&isAll=true&newFormat=true';

            var editGenericMessages         = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/koraGenericResp';

            var fieldAlertsSynonyms         = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/alerts/:taskId/synonyms?fieldName=:fieldName';

            var importEmojis         = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/synonyms/addemojidata';

            var fieldActionsSynonyms        = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/actions/:taskId/synonyms?fieldName=:fieldName';

            var fbWebhookGetUrl             = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/streams/:streamId/fbhook";
            var wfbWebhookGetUrl             = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/streams/:streamId/fbhook?isWorkplace=true";

            var channelWebhookGetUrl        = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/streams/:streamId/channel/:channel/hook";

            var deleteStreamChannel         = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/channel/:channelType';

            var deleteStreamCiscoChannel    = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/channel/:channelType?gateway=:gateway';

            var authorizeIdp                = API_SERVER_URL + API_URL_PREFIX + "/stream/:streamId/authorize?idp=:idp&rurl=:rurl&label=:label&tenant=:tenant&isTryOutUserConnection=:isTryOutUserConnection&isDeveloper=:isDeveloper";

            var testChatScriptResponse      = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/findIntent';

            /*to get all train logs*/
            var getTrainLogs  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/getTrainLogs';

            /* Train bot intent logs*/
            var trainbotintentlogs          = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/logs';
            var bunchLogging  =  API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/bunchLogging';

            var removeTrainbotintentlogs    = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/logs';
            /*End of train bot intent logs*/

            var addPattern                  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/pattern';

            var patternDelete               = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/pattern?resourceId=:resourceId&patternId=:patternId';

            var actionFieldPattern          = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/actions/:actionId/pattern?fieldName=:fieldName&patternId=:patternId';

            var alertFieldPattern           = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/alerts/:alertId/pattern?fieldName=:fieldName&patternId=:patternId';

            var taskPattern                  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/pattern';

            var fieldPatternSortOrEdit      = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/fieldpattern';

            var koraURL                     = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/kora';

            var botChatScenarios            = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/logs?streamName=:streamName&result=:result&offset=:offset&limit=:limit&search=:search';

            var lockingEndpoint             = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/bt/resources/:resourceId/lock';

            var shareBot                    = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/sharebot';

            var inviteUser                  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/inviteUser';

            var contactsEndpoint            = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/sharebot/getmanagedusers/organizations/:orgId';

            var getCoDevelopers             = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/getcodevelopers';

            var getRoles                    = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/sharebot/getorgroles/organizations/:orgId';

            var getSharePermissions         = API_SERVER_URL + API_URL_PREFIX +  '/builder/getpermissions';

            var getpermissionsByRole       = API_SERVER_URL + API_URL_PREFIX +  '/builder/getpermissions/:roleId';

            var getOrg                      = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/sharebot/getmanagedgroups/organizations/:orgId'; 

            var promoteToBotOwner           = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/sharebot/updatebotowner';

            var resolveUser                 = API_SERVER_URL + API_URL_PREFIX + "/_resolve/user?id=:id";

            var getChangeLog                = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/bt/:streamId/getbtlogs';

            var getChangeLogExport          = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/bt/:streamId/getbtlogs/export?state=:status&&type=:filetype';
            
            var getSessions                 = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/sessions';

            var standardPublish             = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/standardpublish';

            var solutionPublish             = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/solutionpublish';

            var sampleBotPublish             = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/samplepublish';

            var sampleBotInstall             = API_SERVER_URL + API_URL_PREFIX + '/builder/samplebots/:botId/add';

            var sampleBotInstallFromStore    = API_SERVER_URL + API_URL_PREFIX + '/builder/samplebots/:botId/installsamplebot';

            var sampleBotpollStatus          = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/importBot/status/:statusId?installBotStatus=true';

            var smartBotInstall             = API_SERVER_URL + API_URL_PREFIX + '/solutionbots/:streamId/subscribe';

            var sessionKeys                 = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/sessions';

            var markupPreview               = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/markDownPreview?channel=:channel';

            var componentEndpoint           = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/components';

            var negativePatternEndpoint     = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/negativepattern';

            var resolveDialogEndPoint       = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/dialogs?resolveDialog=:dialogId';

            var regenerateDialogEndPoint       = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/forms/:formId/subdialog/regenerate';

            var dialogEndpoint              = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/dialogs';
            var dialogState                 = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/dialogs/?isForUtteranceTesting=true';
            // var dialogRegenerateEndpoint    = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/:formId/subdialog/regenerate';
            var dialogBotConfigEndpoint     = API_SERVER_URL + API_URL_PREFIX + '/stream/:streamId/dialogs';
            var dialogEndpointNoStream      = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/dialogs';
            var taskunlockendpoint          = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/unlocktask';

            var dialogSubscriptionEndpoint  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/sdkSubscription';
            var dialogMessagePreview        = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/bt/streams/:streamId/dialog';

            var botFunctions                 = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/botfunctions';
            var botFunctionsDownloadFile     = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/attachment/file/:fileId/url?key=botfunctions';

            /*Frequently asked questions and answers*/

            var ktGet                       = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/knowledgetasks?streamId=:streamId";
            var ktGetAllLanguage            = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/knowledgetasks?streamId=:streamId&language=:language";
            var ktCreate                    = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/knowledgetasks";
            var createTerm                  = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/knowledgetasks";
            var ktUpdate                    = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/knowledgetasks/:ktId";

            var ktDelete                    = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/knowledgetasks/:knowledgeID";

            var addFaqs                     = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/faqs";

            var getPossibleTags             = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/faqs/possibletags?ktId=:ktId";

            var faqBulkUpdate             = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/faqs/bulk";

            var removeFaqs                  = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/faqs/:faqID";

            var getfaqs                     = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/faqs?ktId=:ktId";

            var editfaqs                    = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/faqs/:faqID";

            var uploadfaqfile               = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/file";

            var importfaqsbyfileid          = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/faqs/import";
            var importfaqsbyfileidForce     = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/faqs/import?force=true";
            var exportOntology          = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/faqs/export";
             var getImportFAQStatus          = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/status?callName=:callName";
             var CUD_OntologyNode   = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/knowledgetasks/:ktId/taxonomydiff?streamId=:streamId";
            var getorsearchfaq              = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/faqs?ktId=:ktId&limit=:limit&offset=:offSet&search=:searchParam&parentId=:parentId&withallchild=:withallchild&type=:filter";
            var getNodesLockStatus          = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/builder/knowledgetasks/:ktID/nodeslockstats";
            var getKtGlobalSynonyms            = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/streams/:streamId/builder/globalsynonyms?offset=:offset&limit=:limit&search=:search&keyword=:keyword&state=:state&ktId=:ktId';
            var addKtGlobalSynonyms           = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/streams/:streamId/builder/globalsynonyms';
            var editKtGlobalSynonyms            = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/streams/:streamId/builder/globalsynonyms/:synonymsId';
            var deleteKtGlobalSynonyms                = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/streams/:streamId/builder/globalsynonyms/:synonymsId';
            /**
             *  class related endpoints
             */

            var classApi = API_SERVER_URL + API_URL_PREFIX + "/users/:userId/streams/:streamId/builder/utteranceclass";

            /* End of class related apis */

            var getutterances               = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/sentences?taskId=:taskId&offset=:offset&limit=:limit&search=:searchParam&autoTrained=:autoTrainedParam'; //get
            
            var getutterancesStream               = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/sentences?streamId=:streamId&taskId=:taskId&offset=:offset&limit=:limit&search=:searchParam&autoTrained=:autoTrainedParam'; //get

            var createutterances            = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/sentences';

            var editutterances              = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/sentences/:utteranceId';

            var importbotutterances        = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/sentences/stream/:streamId/bulk/importml';

            var trainbotutterance           = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/sentences/ml/train?streamId=:streamId';

            var autoTrainStatus           = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/bt/streams/:streamId/autoTrainStatus?sentences=true&speech=false';

            var trainbotfaq                 = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/knowledgeTasks/faq/train?streamId=:streamId&ktId=:ktId';

            var publishFlow                 = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/map/:mappingId/publish';

            var profileUpdate               =API_SERVER_URL + API_URL_PREFIX + '/users/:userId/profile';  //Put

            var changePassword              =API_SERVER_URL + API_URL_PREFIX + '/changePassword';            //put

            var changePasswordByPolicy               =API_SERVER_URL + API_URL_PREFIX + '/changePasswordByPolicy';

            var publishAlertDialogFlow      = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/mapDialog/:mappingId/publish';

            var createoreditchannel          =  API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/channels/:channelType';

            var getEmbedwebsdkDetails          =  API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/embedwebsdk/details';

            var ivrVoiceReset          =  API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/channel/ivrVoice/resetSecret';

            var importDialog                 =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/dialogs/:dialogId/importdialog';

            var getDialogIdps                 =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/dialogs/:dialogId/idps';
            
            var addFormNodeBatch                 =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/dialogs/:dialogId/addFormNode';

            var importBot               =  API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/importBotV2';
            var importBotV1               =  API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/importBot';

            var exportDialog                 =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/dialogs/:dialogId/export';

            var exportBot                =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/export';

            var streamauthinfo               = API_SERVER_URL + API_URL_PREFIX + '/stream/:streamId/authinfo?includeDialogTasks=true';

            // var dashboardCount               = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId?dimensions=:dimensions&metrics=noOfUserAlerts,noOfUserActions,noOfChatRequest,noOfChatResponse,noOfDialogSuccess1,noOfFaqSuccess,noOfAlertSuccess,noOfActionSuccess,noOfDialogFail,noOfFaqFail,noOfAlertFail,noOfActionFail&start_date=:startDate&end_date=:endDate&channels=:channels&tasks=:botTasks&languages=:languages";
            var dashboardCount               = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId?dimensions=:dimensions&metrics=noOfUserAlerts,noOfUserActions,noOfChatRequest,noOfChatResponse,noOfDialogSuccess1,noOfFaqSuccess,noOfAlertSuccess,noOfActionSuccess,noOfDialogFail,noOfFaqFail,noOfAlertFail,noOfActionFail&start_date=:startDate&end_date=:endDate&channels=:channels&tasks=:botTasks&languages=:languages&mode=async";

            // var performingBotsUniversal      = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/linkedbots?dimensions=:dimensions&metrics=noOfUserAlerts,noOfUserActions,noOfChatRequest,noOfChatResponse,noOfDialogSuccess1,noOfFaqSuccess,noOfAlertSuccess,noOfActionSuccess,noOfDialogFail,noOfFaqFail,noOfAlertFail,noOfActionFail,noOfAlertSuccess,noOfActionSuccess,noOfDialogFail,noOfFaqFail,noOfActionFail&start_date=:startDate&end_date=:endDate&channels=:channels&tasks=:botTasks&linkedbots=:linkedbots&languages=:languages";
            var performingBotsUniversal      = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/linkedbots?dimensions=:dimensions&metrics=noOfUserAlerts,noOfUserActions,noOfChatRequest,noOfChatResponse,noOfDialogSuccess1,noOfFaqSuccess,noOfAlertSuccess,noOfActionSuccess,noOfDialogFail,noOfFaqFail,noOfAlertFail,noOfActionFail,noOfAlertSuccess,noOfActionSuccess,noOfDialogFail,noOfFaqFail,noOfActionFail&start_date=:startDate&end_date=:endDate&channels=:channels&tasks=:botTasks&linkedbots=:linkedbots&languages=:languages&mode=async";

            var dashboardCountUniversal     = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId?dimensions=:dimensions&metrics=noOfUserAlerts,noOfUserActions,noOfChatRequest,noOfChatResponse,noOfDialogSuccess1,noOfFaqSuccess,noOfAlertSuccess,noOfActionSuccess,noOfDialogFail,noOfFaqFail,noOfAlertFail,noOfActionFail,noOfAlertSuccess,noOfActionSuccess,noOfDialogFail,noOfFaqFail,noOfActionFail&start_date=:startDate&end_date=:endDate&channels=:channels&tasks=:botTasks&linkedbots=:linkedbots&languages=:languages";

            var dashboardChatsUniversal     = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId?dimensions=:dimensions&metrics=noOfUserAlerts,noOfUserActions,noOfChatRequest,noOfChatResponse,noOfDialogSuccess1,noOfFaqSuccess,noOfAlertSuccess,noOfActionSuccess,noOfDialogFail,noOfFaqFail,noOfAlertFail,noOfActionFail,noOfAlertSuccess,noOfActionSuccess,noOfDialogFail,noOfFaqFail,noOfActionFail&start_date=:startDate&end_date=:endDate&channels=:channels&tasks=:botTasks&linkedbots=:linkedbots&languages=:languages&mode=async";

            var sessionsCount               = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/sessioncount?fromDate=:fromDate&toDate=:toDate&channels=:channels&languages=:languages";

            var sessionsCountUniversal      = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/sessioncount?fromDate=:fromDate&toDate=:toDate&channels=:channels&linkedBots=:linkedBots&languages=:languages";

            // var agentTransferMetrics        = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/tasks/agentTransfers?dimensions=:dimensions&metrics=noOfAgentTransfers&start_date=:fromDate&end_date=:toDate&sortType=desc&channels=:channels&tasks=:botTasks&languages=:languages";

            // var agentTransferMetricsUniversal = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/tasks/agentTransfers?dimensions=:dimensions&metrics=noOfAgentTransfers&start_date=:fromDate&end_date=:toDate&sortType=desc&channels=:channels&tasks=:botTasks&linkedbots=:linkedbots&languages=:languages";
            
            var agentTransferMetrics        = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/tasks/agentTransfers?dimensions=:dimensions&metrics=noOfAgentTransfers&start_date=:fromDate&end_date=:toDate&sortType=desc&channels=:channels&tasks=:botTasks&languages=:languages&mode=async";

            var agentTransferMetricsUniversal = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/tasks/agentTransfers?dimensions=:dimensions&metrics=noOfAgentTransfers&start_date=:fromDate&end_date=:toDate&sortType=desc&channels=:channels&tasks=:botTasks&linkedbots=:linkedbots&languages=:languages&mode=async";

            // var tasksMetrics                = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/tasks?dimensions=:dimensions&metrics=noOfUserActions,noOfDialogSuccess1,noOfFaqSuccess&start_date=:fromDate&end_date=:toDate&sortType=desc&channels=:channels&tasks=:botTasks&languages=:languages&limit=:limit";

            // var tasksMetricsUniversal       = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/tasks?dimensions=:dimensions&metrics=noOfUserActions,noOfDialogSuccess1,noOfFaqSuccess&start_date=:fromDate&end_date=:toDate&sortType=desc&channels=:channels&tasks=:botTasks&linkedbots=:linkedbots&languages=:languages&limit=:limit";

            var tasksMetrics                = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/tasks?dimensions=:dimensions&metrics=noOfUserActions,noOfDialogSuccess1,noOfFaqSuccess&start_date=:fromDate&end_date=:toDate&sortType=desc&channels=:channels&tasks=:botTasks&languages=:languages&limit=:limit&mode=async";

            var tasksMetricsUniversal       = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/tasks?dimensions=:dimensions&metrics=noOfUserActions,noOfDialogSuccess1,noOfFaqSuccess&start_date=:fromDate&end_date=:toDate&sortType=desc&channels=:channels&tasks=:botTasks&linkedbots=:linkedbots&languages=:languages&limit=:limit&mode=async";

            var tasksMetricsExport       = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/tasks?dimensions=:dimensions&metrics=noOfUserActions,noOfDialogSuccess1,noOfFaqSuccess&start_date=:fromDate&end_date=:toDate&sortType=desc&channels=:channels&tasks=:botTasks&linkedbots=:linkedbots&languages=:languages&limit=:limit";

            var sessionsGraph               = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/sessioncount/chart?fromDate=:fromDate&toDate=:toDate&axisInterval=:sessionInterval&channels=:channels&languages=:languages";

            var sessionsGraphUniversal      = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/sessioncount/chart?fromDate=:fromDate&toDate=:toDate&axisInterval=:sessionInterval&channels=:channels&linkedbots=:linkedbots&languages=:languages";

            // var channelsMetrics             = API_SERVER_URL + API_URL_PREFIX +  "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/channels?dimensions=channel&metrics=noOfChatRequest,noOfChatResponse&start_date=:fromDate&end_date=:toDate";

            // var channelsMetricsUniversal    = API_SERVER_URL + API_URL_PREFIX +  "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/channels?dimensions=channel&metrics=noOfChatRequest,noOfChatResponse&start_date=:fromDate&end_date=:toDate&linkedbots=:linkedbots";
            
            var channelsMetrics             = API_SERVER_URL + API_URL_PREFIX +  "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/channels?dimensions=channel&metrics=noOfChatRequest,noOfChatResponse&start_date=:fromDate&end_date=:toDate&mode=async";

            var channelsMetricsUniversal    = API_SERVER_URL + API_URL_PREFIX +  "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/channels?dimensions=channel&metrics=noOfChatRequest,noOfChatResponse&start_date=:fromDate&end_date=:toDate&linkedbots=:linkedbots&mode=async";

            var realTimeDashboard           =  API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/rta/stats?metrics=nUsers,aChannels,nSessions,nAgentSessions";

            var realTimeDashboardChannels   =  API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/rta?dimensions=channel&metrics=nUsers";

            // var dashboardCharts               = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/chats?dimensions=:dimensions&metrics=noOfUserAlerts,noOfUserActions,noOfChatRequest,noOfChatResponse,noOfDialogSuccess1,noOfFaqSuccess,noOfAlertSuccess,noOfActionSuccess,noOfDialogFail,noOfFaqFail,noOfAlertFail,noOfActionFail&start_date=:startDate&end_date=:endDate&channels=:channels&tasks=:botTasks&languages=:languages";    
            var dashboardCharts               = API_SERVER_URL + API_URL_PREFIX + "/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/chats?dimensions=:dimensions&metrics=noOfUserAlerts,noOfUserActions,noOfChatRequest,noOfChatResponse,noOfDialogSuccess1,noOfFaqSuccess,noOfAlertSuccess,noOfActionSuccess,noOfDialogFail,noOfFaqFail,noOfAlertFail,noOfActionFail&start_date=:startDate&end_date=:endDate&channels=:channels&tasks=:botTasks&languages=:languages&mode=async";    

            //var streamtrymode                = API_SERVER_URL + API_URL_PREFIX + "/marketplace/solutionbots/:streamId/canTryOut";
            var streamtrymode                = API_SERVER_URL + API_URL_PREFIX + "/builder/streams/:streamId/canTryOut";

            var executeInitializer            = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/testinit';

            var intentsorentities = API_SERVER_URL + API_URL_PREFIX +"/builder/streams/:streamId/:type";

            var updateThreshold = API_SERVER_URL + API_URL_PREFIX +"/builder/streams/:streamId/confidenceConfig";

            var updateMLSynonym = API_SERVER_URL + API_URL_PREFIX +"/builder/streams/:streamId/mlparams?isDeveloper=true&reset=:reset&resetkey=:resetkey";

            var linkOrUnlinkBots = API_SERVER_URL + API_URL_PREFIX +"/users/:userId/builder/streams/:streamId/universalbot/:type";

            var getBotDetails = API_SERVER_URL + API_URL_PREFIX + "/marketplace/bots/botdetails/:streamName";

            // var checkIdStatus = API_SERVER_URL + API_URL_PREFIX + '/check_id_status'; //GET

            var checkIdStatus = API_SERVER_URL + API_URL_PREFIX + '/v2/check_id_status'; //GET

            var isFreeDomain = API_SERVER_URL + API_URL_PREFIX + '/email/:email/isFreeEmail';

            var userProfile = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/profile'; // GET

            var tokenExpiry = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/isTokenExpired'; // GET

            var appControlList = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/AppControlList'; // GET

            var ssoLogin = API_SERVER_URL + API_URL_PREFIX + '/sso/login'; // POST

            var userLogin = API_SERVER_URL + API_URL_PREFIX + '/oauth/token'; // POST

            var userSignout = API_SERVER_URL + API_URL_PREFIX + '/oAuth/signout'; // DELETE

            var userSignup = API_SERVER_URL + API_URL_PREFIX + '/signup_?isFromBt=true'; // POST

            var pwdPolicy = API_SERVER_URL + API_URL_PREFIX + '/pwdPolicy/:emailId'; // GET

            var resendVerification = API_SERVER_URL + API_URL_PREFIX + '/resend'; // POST

            var verifyId = API_SERVER_URL + API_URL_PREFIX + '/verifyiD/:token'; // POST

            var btAccessRequest = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/btAccessRequest'; // POST

             var btAccessRequestPublic = API_SERVER_URL + API_URL_PREFIX + '/btAccessRequest/:userId'; // POST

            var sfbtAccessRequestPublic = API_SERVER_URL + API_URL_PREFIX + '/botBuilderAccessRequest/:userId'; // POST

            var acceptbtlicense = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/acceptbtlicense'; // POST

            var passwordReset = API_SERVER_URL + API_URL_PREFIX + '/passwordReset'; // POST

            var setNewPass = API_SERVER_URL + API_URL_PREFIX + '/passwordReset/:token'; // GET, PUT

            var twilioChannelSms = API_SERVER_URL + API_URL_PREFIX+"/users/:userId/builder/streams/:streamId/channels/sms";

            var getSampleBots = API_SERVER_URL + API_URL_PREFIX + "/builder/samplebots";

            var getSmartBots = API_SERVER_URL + API_URL_PREFIX + "/builder/solutionbots";

            var removeBotInheritance = API_SERVER_URL + API_URL_PREFIX + "/builder/streams/:streamId/removeInheritance";

            var ktNodeUnlock = API_SERVER_URL + API_URL_PREFIX+ "/users/:userId/builder/knowledgetasks/:ktid/editunlock?streamId=:streamId";

            var dailogComponentUnlock = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/unlocktask';

            var cloneDialogTask = API_SERVER_URL + API_URL_PREFIX +"/builder/streams/:streamId/dialogs/:dialogId/clone";
            
            var cloneDialogComponent = API_SERVER_URL + API_URL_PREFIX +"/builder/streams/:streamId/components/:componentId/clone";

            var botChannelAuthorize = API_SERVER_URL + API_URL_PREFIX + '/stream/:streamId/authorize/:channel';

            var addChannel = API_SERVER_URL + API_URL_PREFIX + '/bot/:botId/add';// POST

            var identities = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/identities'; // GET

            var isFreeEmail = API_SERVER_URL + API_URL_PREFIX + '/email/:emailId/isFreeEmail'; // GET

            var addIdentity = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/identities'; // POST

            var resendIdentityVerification = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/identities/resend'; // PUT

            var dialogEntityLookup = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/dialogs/:dialogId/entities/:entityId/import';

            var getLookupJson = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/lookups/:lookupId';

            var getDefaultLanguage = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:botId/downloadJson?language=:language';

            var uploadLanguageJson  =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:botId/uploadJson?language=:language';

            var addSupportedLanguage = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:botId/supportedLanguage?language=:language';

            var speechTrain = API_SERVER_SPEECH_URL + 'asr/dev/train/:streamId';

            var speechTrainStatus = API_SERVER_SPEECH_URL + 'asr/dev/train/status/:streamId';

            var addBotVariables  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/stream/:streamId/variables';

            var addBulkBotVariables  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/stream/:streamId/variables';

            var getBotVariables  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/stream/:streamId/variables?limit=-1&variableType=:variableType';

            var getAllBotVariables  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/stream/:streamId/variables?limit=-1';

            var updateBotVariables =API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/stream/:streamId/variables/:variableId';

            var smartAlertSubscription = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/components/:componentId';

            var btExportVariables = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/stream/:streamId/variables/exportVariables?format=:format&limit=-1';

            var btExportVariablesStatus = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/stream/:streamId/variables/exportVariables/status';

            var btImportVariables = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/stream/:streamId/variables/importVariables?format=:format';

            var btImportVariablesStatus = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/stream/:streamId/variables/importVariables/status/:requestId';

            var savePiiDataOptions = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/components/:componentId';

            /*starting of Collections apis*/
            var btCollections = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/stream/:streamId/collections';
            var editVariableCollection  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/stream/:streamId/collections/variables/:name';
            /*end of Collections apis*/

            /*starting of test suit apis*/
            var getAllTestSuits = API_SERVER_URL + API_URL_PREFIX + '/stream/:streamId/testsuite';
            var createTestSuit = API_SERVER_URL + API_URL_PREFIX + '/stream/:streamId/testsuite/import';
            var updateTestSuit = API_SERVER_URL + API_URL_PREFIX + '/stream/:streamId/testsuite/import/:testSuitID';
            var runTestSuit = API_SERVER_URL + API_URL_PREFIX + '/stream/:streamId/testsuite/:testSuitID/run';
            var getDetailsByTestRunID = API_SERVER_URL + API_URL_PREFIX + '/stream/:streamId/testsuite/:testSuitID/:testRunID/status';
            var viewReport = API_SERVER_URL + API_URL_PREFIX + '/stream/:streamId/testsuite/:testSuitID/history?offset=:offset&limit=:limit';
            /*end of test suit apis*/

            /* Analyze api's */
            var analyzeGetRecords  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/analysis';
            var analyzeUpdateRecord  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/analysis/:recordId';
            var analyzeDetails  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/analysis/detail/:koralogId';
            var analyzePerformanceDetails  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/analysis/detail/performance?requestTransitionRecordId=:requestTransitionRecordId&responseTransitionRecordId=:responseTransitionRecordId';
            var botChatHistory  = API_SERVER_URL + API_URL_PREFIX + '/botmessages?botId=:streamId&msgId=:msgId&direction=:direction&limit=:limit&showTimeLines=true';
            var analyzeGetRecordsExport  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/analysis/export';
            var analyzeStatus  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/analysis/export/status';
            var metaTags = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/tags';
            var channelSpecficChannelId = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/channelUIds';
            var analyzeRecordTags = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/analysis/detail/recordTags';
            var debugLogRecords  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/debugLogs/';
            var getKoreUserIdsOnSearch = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/getBotUsers';
            var getChannelsUserdIdsOnSearch = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/channelUIds';
            var getDefaultFilter = API_SERVER_URL + API_URL_PREFIX + '/builder/users/:userId/streams/:streamId/NLP/filters';
            /* End of Analyze api's*/

            /*custom Library api's*/
            var createCustomTemplate = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/customTemplates';
            var getAllCustomTemplate = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/customTemplates';
            var deleteCustomTemplate = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/customTemplates/:customTemplateId';
            var getCustomTemplateData = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/customTemplates/:customTemplateId';
            var updateCustomTemplate = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/customTemplates/:customTemplateId';
            var customTemplatePreview = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/customTemplates/:customTemplateId/preview';
            /*end of custom Library api's*/

            /*Progress Dock*/
            var getAllProgressDockNotifications = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/dockStatus';
            var updateProgressDockNotification =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/dockStatus/:notificationsId';
            var deleteProgressDockAllNotifications = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/dockStatus';
            var deleteProgressDockNotification =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/dockStatus/:notificationsId';
            var downloadProgressDockExportFile =  API_SERVER_URL + API_URL_PREFIX + '/attachment/file/:fileId/url';// used to get fresh url for any media with file id;
            var batchtestingReportLink =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/attachment/file/:fileId/url';
            var deleteRunDetails = API_SERVER_URL + API_URL_PREFIX + '/stream/:streamId/testsuite/:testSuiteId/:runDetails';
            var deleteRunDetailsAll = API_SERVER_URL + API_URL_PREFIX + '/stream/:streamId/testsuite/:testSuiteId';
            /*End of Progress Dock*/
            // api/1.1/users/u-6e60ca9f-567f-5fc3-badb-1ffa6243385a/streams/st-1a48de3b-9f2d-5548-9d8c-21a6568594f9/userconversation?from=2020-09-01T12:00:19.092Z&to=2020-09-25T12:56:19.092Z&skip=0&limit=10

            var userProfileDetails = API_SERVER_URL + API_URL_PREFIX + '/streams/:streamId/userprofile?userId=:userId&show=:show'; // GET

            var userConversation = API_SERVER_URL + API_URL_PREFIX + '/streams/:streamId/userconversation?from=:from&to=:to&userId=:userId&show=:show'; // GET

            var alexaExport = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/alexa/export?echoShow=:echoShow';

            var mlUtterencesScore = API_SERVER_URL + API_URL_PREFIX + '/streams/:streamId/ml/results?isDeveloper=true';
            var mlKfoldScore = API_SERVER_URL + API_URL_PREFIX + '/streams/:streamId/ml/crossvalidation/kfold';

            var sampleJsTamplates = API_SERVER_URL + API_URL_PREFIX + '/templates/samples';

            var utteranceImport = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/sentences/stream/:streamId/bulk/import';

            var importbotutterancestatus = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/sentences/stream/:streamId/bulk/importml/status/:requestId';

            var utteranceExport = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/sentences/stream/:streamId/bulk/export?state=:status&&type=:filetype';

            var exportStatusBot = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/export/status';

            var utteranceStatus = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/sentences/stream/:streamId/bulk/export/status';

            var newEvent = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/events';

            var botOntoBulkDel  = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/faqs/bulk';
            
            /*Start of Knowledge Extraction APIs */
            var kgExtractImport = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/qna/import';
            var kgStatusPoll =  API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/qna/:kgImportId';
            var kgHistory =  API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/qna/history';
            var kgQuesAns = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/qna/:kgExtractId/questions?offset=:offset&limit=:limit&search=:search&filter=:filter';
            var kgDragDropFaq = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/faqs/bulk';
            var kgQnADel = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/qna/:kEId/questions/:quesId';
            var kgQnAUpdate = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/qna/:kEId/questions/:quesId';
            var kgQnABulkDel  = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/qna/:kEId/questions';
            var kgKeDelete =  API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/qna/:kEId';
            var kgExportFaq = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/qna/:kEId/exportKE';
            var kgImportFaq = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/qna/:kEId/importKE';
            var kgQnAnnotation = API_SERVER_URL + API_URL_PREFIX + '/builder/:streamId/qna/annotate';
            var getKgManageWords = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/kt/:kgTId/kgparams?isDeveloper=true&reset=:reset';
            var updateKgManageWords = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/kt/:kgTId/kgparams?isDeveloper=true&reset=:reset';
            var resetKgManageWords = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/kt/kgMasterParams?keys=stopWords';
            var kgExtractIsVisited = API_SERVER_URL + API_URL_PREFIX + '/builder/stream/:streamId/qna/:kEId/update';
            /*End of Knowledge Extraction APIs */

            var hangoutChannel = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:botId/channels/hangoutchat';
            var rcsBusinessChannel = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/channels/rcs';
            var rcsLaunch = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/channels/rcs/launch';

            /*Conversation Flow APIs*/
            var rootSessionFlow = API_SERVER_URL + API_URL_PREFIX + '/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/sessionflow?view=:view&start_date=:startDate&end_date=:endDate';
            var postRootSessionFlow = API_SERVER_URL + API_URL_PREFIX + '/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/sessionflow?view=:view&mode=:mode';
            var nodeSessionFlow = API_SERVER_URL + API_URL_PREFIX + '/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/sessionflow?view=:view';
            var utterancesSessionFlow = API_SERVER_URL + API_URL_PREFIX + '/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/sessionflow/utterances';
            var extractUtterance = API_SERVER_URL + API_URL_PREFIX + '/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/sessionflow/utterances/export';
            var uttSessionOutgo =API_SERVER_URL + API_URL_PREFIX + '/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/sessionflow/utterances/outgoing';
            var dropOffs = API_SERVER_URL + API_URL_PREFIX + '/builder/metrics/usage/user/:userId/org/:orgId/stream/:streamId/sessionflow/dropoff';
            var scheduleCluster = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/clusterData';
            /*Conversation Flow APIs*/

            /*Manage Variable Namespace APIs*/
            var getAllNamespaces = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/namespace';
            var createNamespace = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/namespace';
            var updateNamespace = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/namespace/:namespaceId';
            var deleteNamespace = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/namespace/:namespaceId';
            var getNSVariables =  API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/namespace/:namespaceId/variables';
            var addNamespaceKg =  API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/KnowledgeTasks/:ktId/namespace';
            var enableNamespace =  API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/enableNameSpaces';
            /*Manage Variable Namespace APIs*/


            /* Bot Summary APIs */
            var botTasksSummary =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/allTasks';
            var botSummary =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/details';
            /* Bot Summary APIs */
            
            var livebankChannel = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/channels/livebank';
            
            /* Traits Api starts here*/
            var traitsGroupApi = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/traitgroup';
            var traitsApi = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/traitgroup';

            /*sentiment management */
            var sentimentManagement = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/sentimentEvents';
            var editSentimentManagement = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/sentimentEvents/:eventId';
            var deleteSentimentManagement = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/sentimentEvents/';
            var reorderSentimentManagement = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/sentimentEvents/reorder';

            var createGroup           = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/smalltalk/groups';
            var getSmallTalkGroups    = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/smalltalk/groups';
            var getSmallTalk          = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/smalltalk';
            var updateSmallTalkGroup  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/smalltalk/groups/:groupId';
            var creteNewNode          = API_SERVER_URL  + API_URL_PREFIX + '/builder/streams/:streamId/smalltalk/groups/:groupId';
            var currentGroupNodes     = API_SERVER_URL  + API_URL_PREFIX + '/builder/streams/:streamId/smalltalk/groups/:groupId';
            var updateNode            = API_SERVER_URL  + API_URL_PREFIX + '/builder/streams/:streamId/smalltalk/groups/:groupId/nodes/:nodeId';
            var deleteNode            = API_SERVER_URL  + API_URL_PREFIX + '/builder/streams/:streamId/smalltalk/groups/:groupId/nodes/:nodeId';
            var deleteGroup           = API_SERVER_URL  + API_URL_PREFIX + '/builder/streams/:streamId/smalltalk/groups/:groupId';
            var paginateSmallTalk     = API_SERVER_URL  + API_URL_PREFIX +  '/builder/streams/:streamId/smalltalk/groups/:groupId?skip=:skip&limit=:limit';
            var searchSmallTalk       = API_SERVER_URL  + API_URL_PREFIX +  '/builder/streams/:streamId/smalltalk/groups/:groupId/search?utterance=:userSays';
            var exportSmallTalk       = API_SERVER_URL  + API_URL_PREFIX +  '/builder/streams/:streamId/smalltalk/export';
            var statusSmallTalk       = API_SERVER_URL  + API_URL_PREFIX +  '/users/:userId/builder/status?callName=streams/:streamId/smallTalk/importsmalltalk';
            var importSmallTalkFile   = API_SERVER_URL  + API_URL_PREFIX +  '/builder/streams/:streamId/smalltalk/import';
            var migrateSmallTalk      = API_SERVER_URL  + API_URL_PREFIX +  '/builder/streams/:streamId/smalltalk/migratestandardresponses';
            var reOrderSmallTalk      = API_SERVER_URL  + API_URL_PREFIX +  '/builder/streams/:streamId/smalltalk/regroup';
            var reOrderQuestions      = API_SERVER_URL  + API_URL_PREFIX +  '/builder/streams/:streamId/smalltalk/groups/:groupId/nodes/:nodeId/reorder';
            var ontologyAnalyzer      = API_SERVER_URL  + '/ont_analyzer/analyze';
            var ontologyReport        = API_SERVER_URL  + API_URL_PREFIX +  '/users/:userId/builder/knowledgeTasks/faq/inspect?streamId=:streamId&ktId=:ktId&lang=:lang';
            var analysisReport        = API_SERVER_URL  + API_URL_PREFIX +  '/users/:userId/builder/knowledgeTasks/faq/ontology/report?streamId=:streamId&ktId=:ktId&lang=:lang';
            var exportOntologyReport  = API_SERVER_URL  + API_URL_PREFIX +  '/users/:userId/builder/knowledgeTasks/faq/ontology/report/export?streamId=:streamId&ktId=:ktId&lang=:lang';
            /*panels & Widgets apis starts here*/
            var createPanel           = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/panels';
            var getPannelById         = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/panels/:panelId';
            var deletePanel         = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/panels/:panelId';
            var updatePannelById         = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/panels/:panelId';
            var intigrateFormToPanel        = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/panels/:panelId/addForm';
            var getBotPanels           = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/panels';
            var createWidget           = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/widgets';
            var getWidgetById         = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/widgets/:widgetId';
            var deleteWidget         = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/widgets/:widgetId';
            var updateWidgetById         = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/widgets/:widgetId';
            var getBotWidgets           = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/widgets';
            /*panels & Widgets apis ends here*/

            /* universal */
             var upgradeUniversalBot   = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/updateUniversalBotVersion';
             var getLinkBot            = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/triggerPhrase/?linkedBotId=:botId';
             var addTrainingData       = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/triggerPhrase';
             var searchText            = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/triggerPhrase/?offset=:offset&limit=:limit&search=:search&type=:type&linkedBotId=:botId'; 
             var paginateTrainingData  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/triggerPhrase/?offset=:offset&limit=:limit&search=:search&type=:type&linkedBotId=:botId';
             var updateTriggerPhaseSetting = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId';
            /* universal 2.0 end */

            /* Ui Forms start */
            var createUiForm          = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/forms';
            var updateUiForm          = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/forms/:formId';
            var getBotUiFormById       = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/forms/:formId';
            var deleteBotUiFormById       = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/forms/:formId';
            var getBotUiForms        = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/forms';
            /* Ui Forms end */

            var fbInstallApp = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/channels/wfacebook/appinstallauth';
            var getbotSpecficUsers    = API_SERVER_URL  + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/getBotUsers';
             
             /*language management */

             var disableLanguage     = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/disableLanguage?language=:language';
             var defaultLanguage     = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/defaultLanguage?language=:language';
             var reEnableLanguage    = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/enableLanguage?language=:language';

             /* langauge management end */

             /*bot version */

             var createVersion       = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/versions';
             var getVersion          = API_SERVER_URL + API_URL_PREFIX +  '/users/:userId/builder/streams/:streamId/versions?sortByCreatedOn=:sortBy';
             var getVersionDateRange = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/versions?startDate=:startDate&endDate=:endDate&sortByCreatedOn=:sortBy';
             var deleteBotVersion    = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/versions';
             var exportBotVersion    = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/versions/export';
             var restoreBotVersion   = API_SERVER_URL + API_URL_PREFIX +  '/users/:userId/builder/streams/:streamId/versions/restore';
             var versionStatus       = API_SERVER_URL + API_URL_PREFIX +  '/builder/streams/:streamId/dockStatus/:statusId';
             var restoreStatus        = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/versions/restore/:statusId/status';
             var deleteVersion       = API_SERVER_URL  + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/versions';
             var exportStatusBotVersion = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/export/status/?exportVersion=true';
             /* bot version end */

             var loginAuditEvent    = API_SERVER_URL + API_URL_PREFIX + '/accounts/events/login';

             /* Data service - DaaS */
             var daasTables    = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/tables';
             var saveServiceNode    = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/components/:componentId';
             var daasViews    = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/builder/streams/:streamId/views';
            
             /* import publish */
             var autoPublish  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/autopublish';
             /* */

             
             /* advanced nl config */
             var advancedNlConfigs = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/getAdvancedNLSettings';
             var advancedNlConfigsByName = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/advancedNLSettingsByName?name=:configName';
             var addConfiguration  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/advancedNLSettings';
             var savedConfigurations = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/advancedNLSettings';
             var deleteConfiguration = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/advancedNLSettings/:configId';
             var editConfiguration  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/advancedNLSettings/:configId';

             /*process app*/
             var getProcessApps = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/permittedProcesses';
            
            /* Multi intent model */
             var customModel  = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/customModelParams';

            /* ** SMARTASSIST ENDPOINTS START ** */
        
            var deploymentStatus = API_SERVER_URL + API_URL_PREFIX + '/smartassist/apps/:streamId/deployments/status';

            /* ** SMARTASSIST ENDPOINTS END ** */

            /* store settings api */
            /**
             * store settings api
             * @type {[type]}
             */
             var downloadImageExportFile =  API_SERVER_URL + API_URL_PREFIX + '/attachment/file/:fileId/url';// used to get fresh url for any media with file id;
            var updateBotConfigurations = API_SERVER_URL + API_URL_PREFIX + '/streams/:streamId/botSettings';
            var getConfigurations = API_SERVER_URL + API_URL_PREFIX + '/botstore/botdetails/:streamId';

            /* ** BILLING PLANS ENDPOINTS START ** */
            var getPlans =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/billing/plans';
            var planChange =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/billing/plans/change';
            var planValidate =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/billing/plans/change/validate?streamId=:streamId&targetPlanId=:targetPlanId';
            var planCheckout =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/billing/plans/:productId/checkout';
            var paymentstatus =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/billing/plans/:reqId/status';
            var cancelPlanSub =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/billing/subscription/cancel';
            var planAutoRecharge =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/billing/plans/payasyougo/autorecharge';
            var planValidation =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/planvalidation';
            var getBillingsession =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/billingsessioncount/chart?fromDate=:startDate&toDate=:endDate&axisInterval=:type&fullDateData=true';
            var downloadBillingsession =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/billingsessioncount/download?fromDate=:startDate&toDate=:endDate&axisInterval=:type&timezone=:timezone';
            var getInvoices =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/billing/invoice?&limit=:limit&skip=:skip';
            var getSupportPlans =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/supportplans';
            var supportPlanChange =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/supportplans/:planId/change';
            var supportPlanCancel =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/supportplansubscription/cancel';
            var supportPlanValidate =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/supportplans/validate?targetPlanId=:targetPlanId';

            /* ** BILLING PLANS ENDPOINTS END ** */

            /* ** Conversation Testing APIs start ** */
            var createtestcase = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/testcases';
            var clonetestcase = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/testcases/:testCaseId/clone';
            var deletetestcase = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/testcases';
            var recentTags = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/testcases/recentTags';
            var runtestcases = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/testcases/run';
            /* ** Conversation Testing APIs end ** */


            var pinMenuComponents = API_SERVER_URL + API_URL_PREFIX + '/users/:userId/pinneditems';
            /* store settings api */

            var setupchecklist = API_SERVER_URL + API_URL_PREFIX + '/builder/users/:userId/streams/:streamId/setupchecklist';
            /* setupchecklist in quickstart (help) api */

            var scenes =  API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/scenes';
            var sceneImport = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/scenes/import';
            // Translation engine apis //
             var translationEngine = API_SERVER_URL + API_URL_PREFIX +'/users/:userId/builder/streams/:streamId/translationengines';
             var editTranslations = API_SERVER_URL + API_URL_PREFIX +'/users/:userId/builder/streams/:streamId/translationengines/:transEngineId';
             var deleteTranslations = API_SERVER_URL + API_URL_PREFIX +'/users/:userId/builder/streams/:streamId/translationengines/:transEngineId';
             var getTranslationEngineDetails = API_SERVER_URL + API_URL_PREFIX +'/users/:userId/builder/streams/:streamId/translationengines/:transEngineId';
            // Translation engine apis //

            var sceneExport = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/scenes/:sceneId/export';
            var resetShareURL = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/scenes/:sceneId/resetshareurl/:hash';
            var updateScene = API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/scenes/:sceneId/';
            _exports.SERVER_URL = API_SERVER_URL;
            serviceList['bt.post.IpWhiteList'] = {
                endpoint: appIpWhiteList,
                method: 'post'
            };

            serviceList['bt.put.updateUiForm'] = {
                endpoint: updateUiForm,
                method: 'put'
            };
            serviceList['bt.post.createUiForm'] = {
                endpoint: createUiForm,
                method: 'post'
            };
            serviceList['bt.get.getBotUiForms'] = {
                endpoint : getBotUiForms,
                method : 'get'
            };
            serviceList['bt.get.getBotUiForms.configured'] = {
                endpoint : getBotUiForms+'?isConfiguredOnly=true',
                method : 'get'
            };
            serviceList['bt.get.getBotUiFormById'] = {
                endpoint : getBotUiFormById,
                method : 'get'
            };
            serviceList['bt.delete.deleteBotUiFormById'] = {
                endpoint : deleteBotUiFormById,
                method : 'delete'
            };

            serviceList['bt.post.audit.login'] = {
                endpoint: loginAuditEvent,
                method: 'post'
            };

            serviceList['bt.post.createPanel'] = {
                endpoint: createPanel,
                method: 'post'
            };
            serviceList['bt.get.getPannelById'] = {
                endpoint : getPannelById,

                method : 'get'
            };
            serviceList['bt.delete.deletePanel'] = {
                endpoint : deletePanel,
                method : 'delete'
            };
            serviceList['bt.get.getBotPanels'] = {
                endpoint : getBotPanels,
                method : 'get'
            };
            serviceList['bt.put.updatePannelById'] = {
                endpoint: updatePannelById,
                method: 'put'
            };
            serviceList['bt.post.createWidget'] = {
                endpoint: createWidget,
                method: 'post'
            };
            serviceList['bt.post.intigrateFormToPanel'] = {
                endpoint: intigrateFormToPanel,
                method: 'post'
            };
            serviceList['bt.get.getWidgetById'] = {
                endpoint : getWidgetById,
                method : 'get'
            };
            serviceList['bt.delete.deleteWidget'] = {
                endpoint : deleteWidget,
                method : 'delete'
            };
            serviceList['bt.get.getBotWidgets'] = {
                endpoint : getBotWidgets,
                method : 'get'
            };
            serviceList['bt.put.updateWidgetById'] = {
                endpoint: updateWidgetById,
                method: 'put'
          };
            serviceList['bt.check.directSSOStatus'] = {
                endpoint: checkDirectSSOStatus,
                method: 'get'
            };

            serviceList['bt.check.versionInfo'] = {
                  endpoint : checkVersionInfo,
                  method   : 'get'
            };
            
            serviceList['bt.post.alexaExport'] = {
                endpoint : alexaExport,
                method : 'post'
            };
            serviceList['bt.get.rootSessionFlow'] = {
                endpoint : rootSessionFlow,
                method : 'get'
            };
            serviceList['bt.post.postRootSessionFlow'] = {
                  endpoint: postRootSessionFlow,
                  method: 'post'
            };
            serviceList['bt.post.nodeSessionFlow'] = {
                endpoint : nodeSessionFlow,
                method : 'post'
            };
            serviceList['bt.post.utterancesSessionFlow'] = {
                endpoint : utterancesSessionFlow,
                method : 'post'
            };
            serviceList['bt.post.uttSessionOutgo'] = {
                endpoint : uttSessionOutgo,
                method : 'post'
            };
            serviceList['bt.post.totalUtteranceCount'] = {
                endpoint : uttSessionOutgo + '/' + 'count',
                method : 'post'
            };
            serviceList['bt.post.dropOffs'] = {
                endpoint : dropOffs,
                method : 'post'
            };
            serviceList['bt.post.scheduleCluster'] = {
                  endpoint: scheduleCluster, 
                  method: 'post'
            };
            serviceList['bt.post.extractUtterance'] = {
                endpoint : extractUtterance,
                method : 'post'
            };
            serviceList['bt.post.hangoutChannel'] = {
                endpoint : hangoutChannel,
                method : 'post'
            };
            serviceList['bt.post.rcsBusinessChannel'] = {
                endpoint : rcsBusinessChannel,
                method : 'post'
            };
            serviceList['bt.post.rcsLaunch'] = {
                endpoint : rcsLaunch,
                method : 'post'
            };
            serviceList['bt.post.livebankChannel'] = {
                endpoint : livebankChannel,
                method : 'post'
            };
            serviceList['bt.delete.botOntoBulkDel'] = {
                  endpoint: botOntoBulkDel,
                  method: 'delete'
            };
            serviceList['bt.delete.kgQnABulkDel'] = {
                  endpoint: kgQnABulkDel,
                  method: 'delete'
            };
            serviceList['bt.get.kgExportFaq'] = {
                  endpoint: kgExportFaq,
                  method: 'get'
            };
            serviceList['bt.post.kgImportFaq'] = {
                  endpoint: kgImportFaq,
                  method: 'post'
            };
            serviceList['bt.post.kgQnAnnotation'] = {
                endpoint: kgQnAnnotation,
                method: 'post'
          };
            serviceList['bt.get.getKgManageWords'] = {
                  endpoint: getKgManageWords,
                  method: 'get'
            };
            serviceList['bt.put.updateKgManageWords'] = {
                  endpoint: updateKgManageWords,
                  method: 'put'
            };            
            serviceList['bt.get.resetKgManageWords'] = {
                  endpoint: resetKgManageWords,
                  method: 'get'
            };          
            serviceList['bt.put.kgExtractIsVisited'] = {
                  endpoint: kgExtractIsVisited,
                  method: 'put'
            };         
            serviceList['bt.delete.kgKeDelete'] = {
                  endpoint: kgKeDelete,
                  method: 'delete'
            };            
            serviceList['bt.post.kgDragDropFaq'] = {
                  endpoint: kgDragDropFaq,
                  method: 'post'
            };
            serviceList['bt.put.kgQnAUpdate'] = {
                  endpoint: kgQnAUpdate,
                  method: 'put'
            };
            serviceList['bt.delete.kgQnADel'] = {
                  endpoint: kgQnADel,
                  method: 'delete'
            };            
            serviceList['bt.post.kgExtractImport'] = {
                  endpoint: kgExtractImport,
                  method: 'post'
            };
            serviceList['bt.get.kgStatusPoll'] = {
                  endpoint: kgStatusPoll,
                  method: 'get'
            };  
            serviceList['bt.get.kgHistory'] = {
                  endpoint: kgHistory,
                  method: 'get'
            };         
            serviceList['bt.get.kgQuesAns'] = {
                  endpoint: kgQuesAns,
                  method: 'get'
            };
            serviceList['bt.put.newEvent'] = {
                  endpoint: newEvent,
                  method: 'put'
            };
            serviceList['bt.post.btExportVariables'] = {
                  endpoint: btExportVariables,
                  method: 'post'
            };
            serviceList['bt.get.btExportVariablesStatus'] = {
                  endpoint: btExportVariablesStatus,
                  method: 'get'
            };
            serviceList['bt.post.btImportVariables'] = {
                  endpoint: btImportVariables,
                  method: 'post'
            };
            serviceList['bt.get.btImportVariablesStatus'] = {
                  endpoint:btImportVariablesStatus,
                  method:'get'
            };
            serviceList['bt.get.btCollections'] = {
                endpoint:btCollections,
                method:'get'
            };
            serviceList['bt.post.btCollections'] = {
                endpoint:btCollections,
                method:'post'
            };
            serviceList['bt.update.btCollections'] = {
                endpoint:btCollections + '/:collectionId',
                method:'put'
            };
            serviceList['bt.delete.btCollections'] = {
                endpoint:btCollections + '/:collectionId',
                method:'delete'
            };
            serviceList['bt.editVariable.btCollection'] = {
                endpoint:editVariableCollection,
                method:'get'
            };
            serviceList['bt.put.smartAlertSubscription'] = {
                endpoint : smartAlertSubscription,
                method : 'put'
            };
            serviceList['bt.post.savePiiDataOptions'] = {
                endpoint : savePiiDataOptions,
                method : 'put'
            };

            serviceList['bt.get.smartAlertSubscription'] = {
                endpoint : smartAlertSubscription,
                method : 'get'
            };
            serviceList['bt.post.speechTrain'] = {
                endpoint : speechTrain,
                method : 'post'
            };
            serviceList['bt.post.speechTrainStatus'] = {
                endpoint : speechTrainStatus,
                method : 'post'
            };
            serviceList['bt.get.getAllTestSuits'] = {
                endpoint : getAllTestSuits,
                method   : 'get'
            };
            serviceList['bt.post.createTestSuit'] = {
                endpoint : createTestSuit,
                method   : 'post'
            };
            serviceList['bt.put.updateTestSuit'] = {
                endpoint : updateTestSuit,
                method   : 'put'
            };
            serviceList['bt.post.runTestSuit']={
                endpoint: runTestSuit,
                method: 'post'
            };
            serviceList['bt.get.getDetailsByTestRunID']={
                endpoint: getDetailsByTestRunID,
                method: 'get'
            };
            serviceList['bt.get.viewReport'] = {
                endpoint : viewReport,
                method   : 'get'
            };

            serviceList['bt.post.twilioChannel'] = {
                endpoint : twilioChannelSms,
                method   : 'post'
            };
            serviceList['bt.post.pubilshFlow'] = {
                endpoint : publishFlow,
                method   : 'post'
            };
            serviceList['bt.post.pubilshAlertDialogFlow'] = {
                endpoint : publishAlertDialogFlow,
                method   : 'put'
            };
            serviceList['bt.put.profileUpdate']={
                endpoint: profileUpdate,
                method: 'put'
            };
            serviceList['bt.put.changePassword']={
                endpoint: changePassword,
                method: 'put'
            };
            serviceList['bt.put.changePasswordByPolicy']={
                endpoint: changePasswordByPolicy,
                method:'put'
            };
            serviceList['bt.threshold.update'] = {
                endpoint : updateThreshold,
                method   : 'post'
            };
            serviceList['bt.mlSynonym.update'] = {
                endpoint : updateMLSynonym,
                method   : 'put'
            };
            serviceList['bt.mlSynonym.get'] = {
                endpoint : updateMLSynonym,
                method   : 'get'
            };
            serviceList['bt.universalbots.linkunlink'] = {
                endpoint: linkOrUnlinkBots,
                method: 'post'
            };
            serviceList['bt.post.uxPreview'] = {
                endpoint : uxPreview,
                method   : 'post'
            };

            serviceList['bt.post.uploadfaqfile'] = {
                endpoint : uploadfaqfile,
                method   : 'post'
            };

            serviceList['bt.post.uploadbotfuncfile'] = {
                endpoint : uploadfaqfile,
                method   : 'post'
            };

            serviceList['bt.post.botfunction'] = {
                endpoint: botFunctions,
                method: 'post'
            };

            serviceList['bt.get.botfunction'] = {
                endpoint: botFunctions,
                method: 'get'
            };

            serviceList['bt.delete.botfunction'] = {
                endpoint: botFunctions,
                method: 'delete'
            };

            serviceList['bt.get.botFunctionsDownloadFile'] = {
                endpoint : botFunctionsDownloadFile,
                method   : 'get'
            };

            serviceList['bt.get.url'] = {
                endpoint: ':url',
                method: 'get'
            };


            serviceList['bt.post.importfaqsbyfileid'] = {
                endpoint : importfaqsbyfileid,
                method   : 'post'
            };

            serviceList['bt.post.importfaqsbyfileidForce'] = {
                  endpoint: importfaqsbyfileidForce,
                  method: 'post'
            };

             serviceList['bt.post.exportontology'] = {
                endpoint : exportOntology,
                method   : 'post'
            };

            serviceList['bt.get.ktGet'] = {
                endpoint : ktGet,
                method   : 'get'
            };

            serviceList['bt.get.ktGetAllLanguage'] = {
                endpoint : ktGetAllLanguage,
                method   : 'get'
            };

            serviceList['bt.post.ktCreate'] = {
                endpoint : ktCreate,
                method   : 'post'
            };

            serviceList['bt.post.CUD_OntologyNode'] = {
                endpoint : CUD_OntologyNode,
                method   : 'post'
            };

            serviceList['bt.post.createTerm'] = {
                endpoint : createTerm,
                method   : 'post'
            };

            serviceList['bt.put.ktUpdate'] = {
                endpoint : ktUpdate,
                method   : 'put'
            };

            serviceList['bt.delete.ktDelete'] = {
                endpoint : ktDelete,
                method   : 'delete'
            };


            serviceList['bt.post.addFaqs'] = {
                endpoint : addFaqs,
                method   : 'post'
            };

            //Analyze API's
            serviceList['bt.post.getRecords'] = {
                endpoint : analyzeGetRecords+"?offset=:offset&limit=:limit&mode=:mode",
                method   : 'post'
            };
            serviceList['bt.post.updateRecord'] = {
                endpoint : analyzeUpdateRecord,
                method   : 'put'
            };
            serviceList['bt.get.analysisDetail'] = {
                endpoint : analyzeDetails,
                method   : 'get'
            };
            serviceList['bt.get.analysisPerformanceRecordDetail'] = {
                endpoint : analyzePerformanceDetails,
                method   : 'get'
            };
            serviceList['bt.get.chatHistory'] = {
                endpoint : botChatHistory,
                method   : 'get'
            };
            serviceList['bt.post.getRecordsExport'] = {
                endpoint : analyzeGetRecordsExport,
                method   : 'post'
            };

            serviceList['bt.post.analyzeStatus'] = {
                endpoint : analyzeStatus,
                method   : 'get'
            };

            serviceList['bt.get.metaTags'] = {
                endpoint : metaTags,
                method   : 'get'
            };
            serviceList['bt.get.channelSpecficChannelId'] = {
                endpoint : channelSpecficChannelId,
                method   : 'get'
            };
            serviceList['bt.post.analyzeRecordTags'] = {
                endpoint : analyzeRecordTags,
                method   : 'post'
            };
            serviceList['bt.post.getDebugLogRecords'] = {
                endpoint : debugLogRecords+"/fetch?offset=:offset&limit=:limit",
                method   : 'post'
            };
            serviceList['bt.post.generateDebugLogRecords'] = {
                endpoint : debugLogRecords+"/export",
                method   : 'post'
            };
            serviceList['bt.get.debugLogPolling'] = {
                endpoint : debugLogRecords+"export/status?taskId=:taskId",
                method   : 'get'
            };
            serviceList['bt.get.getKoreUserIdsOnSearch'] = {
                endpoint : getKoreUserIdsOnSearch,
                method   : 'get'
            };
            serviceList['bt.get.getChannelsUserdIdsOnSearch'] = {
                endpoint : getChannelsUserdIdsOnSearch,
                method   : 'get'
            };
            serviceList['bt.get.getDefaultFilter'] = {
                endpoint : getDefaultFilter,
                method   : 'get'
            };
            serviceList['bt.post.getDefaultFilter'] = {
                endpoint : getDefaultFilter,
                method   : 'post'
            };
            serviceList['bt.put.getDefaultFilter'] = {
                endpoint : getDefaultFilter,
                method   : 'put'
            };
            serviceList['bt.post.getRecordsCount'] = {
                endpoint : analyzeGetRecords+"/count",
                method   : 'post'
            };
            //End of Analyze API's

            //custom Library
            serviceList['bt.post.createCustomTemplate'] = {
                endpoint : createCustomTemplate,
                method   : 'post'
            };
            serviceList['bt.get.getAllCustomTemplate'] = {
                endpoint : getAllCustomTemplate,
                method   : 'get'
            };
            serviceList['bt.delete.deleteCustomTemplate'] = {
                endpoint : deleteCustomTemplate,
                method   : 'delete'
            };
            serviceList['bt.get.getCustomTemplateData'] = {
                endpoint : getCustomTemplateData,
                method   : 'get'
            };
            serviceList['bt.put.updateCustomTemplate'] = {
                endpoint : updateCustomTemplate,
                method   : 'put'
            };
            serviceList['bt.post.customTemplatePreview'] = {
                endpoint : customTemplatePreview,
                method   : 'post'
            };
            //End of custom Library

            //Progress Dock
            serviceList['bt.get.getAllProgressDockNotifications'] = {
                endpoint : getAllProgressDockNotifications,
                method   : 'get'
            };
            serviceList['bt.delete.deleteProgressDockAllNotifications'] = {
                endpoint : deleteProgressDockAllNotifications,
                method   : 'delete'
            };
            serviceList['bt.delete.deleteProgressDockNotification'] = {
                endpoint : deleteProgressDockNotification,
                method   : 'delete'
            };
            serviceList['bt.put.updateProgressDockNotification'] = {
                endpoint : updateProgressDockNotification,
                method   : 'put'
            };
            serviceList['bt.get.downloadProgressDockExportFile'] = {
                endpoint : downloadProgressDockExportFile,
                method   : 'get'
            };
            serviceList['bt.get.downloadImageExportFile'] = {
                endpoint : downloadImageExportFile,
                method   : 'get'
            };
            serviceList['bt.get.batchtestingReportLink'] = {
                endpoint : batchtestingReportLink + '?key=batchtesting',
                method   : 'get'
            };
            serviceList['bt.delete.deleteRunDetails'] = {
                  endpoint: deleteRunDetails,
                  method: 'delete'
            };
            serviceList['bt.delete.deleteRunDetailsAll'] = {
                  endpoint: deleteRunDetailsAll,
                  method: 'delete'
            };            
            //End of Progress Dock

            serviceList['bt.get.getbotSpecficUsers'] = {
                endpoint : getbotSpecficUsers,
                method   : 'get'
            };

            /**
             * start of class relted service list
             */

              serviceList['bt.post.createClass'] = {
                endpoint : classApi,
                method   : 'post'
            };

             serviceList['bt.put.updateClass'] = {
                endpoint : classApi+"/:classId",
                method   : 'put'
            };

              serviceList['bt.delete.deleteClass'] = {
                endpoint : classApi+"/:classId",
                method   : 'delete'
            };

             serviceList['bt.get.getClasses'] = {
                endpoint : classApi+"?offset=:offset&limit=:limit&state=:state",
                method   : 'get'
            };
             serviceList['bt.get.mlUtterencesScore'] = {
                endpoint : mlUtterencesScore,
                method : 'get'
            };
            serviceList['bt.get.mlKfoldScore'] = {
                endpoint : mlKfoldScore,
                method : 'post'
            };
            serviceList['bt.get.mlKfoldScoreDownload'] = {
                endpoint : mlKfoldScore+'/download',
                method : 'post'
            };
            serviceList['bt.post.mlUtterencesScore'] = {
                endpoint : mlUtterencesScore,
                method : 'post'
            };
            serviceList['bt.get.sampleJsTamplates'] = {
                endpoint : sampleJsTamplates,
                method : 'get'
            };
            /**
             * Endp of class related service list
             */

            serviceList['bt.post.getPossibleTags'] = {
                endpoint : getPossibleTags,
                method : 'post'
            };

            serviceList['bt.put.faqBulkUpdate'] = {
                endpoint : faqBulkUpdate,
                method : 'put'
            };

            serviceList['bt.delete.removeFaqs'] = {
                endpoint : removeFaqs,
                method   : 'delete'
            };

            serviceList['bt.get.getfaqs'] = {
                endpoint : getfaqs,
                method   : 'get'
            };

            serviceList['bt.get.getorsearchfaq'] = {
                endpoint : getorsearchfaq,
                method   : 'get'
            };

            serviceList['bt.get.getNodesLockStatus'] = {
                endpoint : getNodesLockStatus,
                method   : 'get'
            };

            serviceList['bt.post.addKtGlobalSynonyms'] = {
                endpoint : addKtGlobalSynonyms,
                method : 'post'
            };
            serviceList['bt.get.getKtGlobalSynonyms'] = {
                endpoint : getKtGlobalSynonyms,
                method : 'get'
            };
            serviceList['bt.delete.deleteKtGlobalSynonyms'] = {
                endpoint : deleteKtGlobalSynonyms,
                method   : 'delete'
            };
            serviceList['bt.put.editKtGlobalSynonyms'] = {
                endpoint : editKtGlobalSynonyms,
                method   : 'put'
            };
            serviceList['bt.get.getImportFAQStatus'] = {
                endpoint : getImportFAQStatus,
                method   : 'get'
            };

            serviceList['bt.put.editfaqs'] = {
                endpoint : editfaqs,
                method   : 'put'
            };

            /*End of FAQ*/
            serviceList['bt.post.markupPreview'] = {
                endpoint : markupPreview,
                method   : 'post'
            };

            serviceList['bt.get.sessionKeys'] = {
                endpoint : sessionKeys,
                method   : 'get'
            };

            serviceList['bt.post.standardPublish'] = {
                endpoint : standardPublish,
                method   : 'post'
            };

            serviceList['bt.post.solutionPublish'] = {
                endpoint : solutionPublish,
                method   : 'post'
            };

            serviceList['bt.post.sampleBotPublish'] = {
                endpoint : sampleBotPublish,
                method   : 'post'
            };

            serviceList['bt.post.sampleBotInstall'] = {
                endpoint : sampleBotInstall,
                method   : 'get'
            };

            serviceList['bt.get.sampleBotInstallFromStore'] = {
                endpoint : sampleBotInstallFromStore,
                method   : 'get'
            };

            serviceList['bt.get.sampleBotpollStatus'] = {
                endpoint : sampleBotpollStatus,
                method   : 'get'
            };

             serviceList['bt.get.smartBotInstall'] = {
                endpoint : smartBotInstall,
                method   : 'post'
            };

            serviceList['bt.get.changelog'] = {
                endpoint : getChangeLog,
                method   : 'get'
            };
            serviceList['bt.get.changelog.limit'] = {
                endpoint : getChangeLog + '?offset=:offset&limit=:limit',
                method   : 'get'
            };
            serviceList['bt.post.changelog.filter'] = {
                endpoint : getChangeLog + '?offset=:offset&limit=:limit',
                method   : 'post'
            };
            serviceList['bt.post.changelogExport'] = {
                endpoint : getChangeLogExport,
                method   : 'post'
            };
            serviceList['bt.user.resolve'] = {
                endpoint : resolveUser,
                method   : 'get'
            };

            serviceList['bot.chat.scenarios'] = {
                endpoint : botChatScenarios,
                method   : 'get'
            };

            serviceList['bt.developers.get'] = {
                endpoint : contactsEndpoint,
                method   : 'get'
            };

            serviceList['bt.get.coDevelopers'] = {
                  endpoint : getCoDevelopers,
                  method   : 'get'
            };

            serviceList['bt.get.getRoles'] = {
                  endpoint : getRoles,
                  method   : 'get'
            };

            serviceList['bt.get.PermissionByRole'] = {
                  endpoint : getpermissionsByRole,
                  method   : 'get'
            };

            serviceList['bt.get.SharePermissions'] = {
                  endpoint : getSharePermissions,
                  method   : 'get'
            };

            serviceList['bt.get.getOrg'] = {
                  endpoint : getOrg,
                  method   :  'get'
            };

            serviceList['bt.dashboardCount.get'] = {
                endpoint : dashboardCount,
                method   : 'put'
            };
            
            serviceList['bt.dashboardCharts.get'] = {
                endpoint : dashboardCharts,
                method   : 'put'
            };

            serviceList['bt.performingBotsUniversal.get'] = {
                endpoint : performingBotsUniversal,
                method   : 'put'
            };

            serviceList['bt.dashboardCountUniversal.get'] = {
                endpoint : dashboardCountUniversal,
                method   : 'put'
            };
            
            serviceList['bt.dashboardChatsUniversal.get'] = {
                endpoint : dashboardChatsUniversal,
                method   : 'put'
            };

            serviceList['bt.sessionsCount.put'] = {
                endpoint : sessionsCount,
                method   : 'put'
            };

            serviceList['bt.sessionsCountUniversal.put'] = {
                endpoint : sessionsCountUniversal,
                method   : 'put'
            };

            serviceList['bt.agentTransferMetrics.get'] = {
                endpoint : agentTransferMetrics,
                method   : 'put'
            };

            serviceList['bt.agentTransferMetricsUniversal.get'] = {
                endpoint : agentTransferMetricsUniversal,
                method   : 'put'
            };

            serviceList['bt.tasksMetrics.get'] = {
                endpoint : tasksMetrics,
                method   : 'put'
            };

            serviceList['bt.realTimeDashboard.get'] = {
                endpoint : realTimeDashboard,
                method   : 'get'
            };
            
            serviceList['bt.realTimeDashboardChannels.get'] = {
                endpoint : realTimeDashboardChannels,
                method   : 'get'
            };

            serviceList['bt.tasksMetricsUniversal.get'] = {
                  endpoint : tasksMetricsUniversal,
                  method: 'put'
            };

            serviceList['bt.tasksMetricsExport.get'] = {
                endpoint : tasksMetricsExport,
                method: 'put'
            };

            serviceList['bt.sessionsGraph.put'] = {
                endpoint : sessionsGraph,
                method   : 'put'
            };

            serviceList['bt.sessionsGraphUniversal.put'] = {
                endpoint : sessionsGraphUniversal,
                method   : 'put'
            };

            serviceList['bt.channelsMetrics.get'] = {
                endpoint : channelsMetrics,
                method   : 'put'
            };

            serviceList['bt.channelsMetricsUniversal.get'] = {
                endpoint : channelsMetricsUniversal,
                method   : 'put'
            };

            serviceList['bt.bot.share'] = {
                endpoint : shareBot,
                method   : 'put'
            };

            serviceList['bt.bot.inviteUser'] = {
                  endpoint : inviteUser,
                  method   : 'post'
            };

            serviceList['bt.bot.owner'] = {
                endpoint : promoteToBotOwner,
                method   : 'put'
            };

            serviceList['bt.lock.get'] = {
                endpoint : lockingEndpoint,
                method   : 'get'
            };

            serviceList['bt.lock.create'] = {
                endpoint : lockingEndpoint,
                method   : 'put'
            };

            serviceList['bt.lock.release'] = {
                endpoint : lockingEndpoint,
                method   : 'delete'
            };

            serviceList['bt.alert.field.pattern.get'] = {
                endpoint : alertFieldPattern,
                method : 'get'
            };

            serviceList['bt.alert.field.pattern.create'] = {
                endpoint : alertFieldPattern,
                method : 'post'
            };

            serviceList['bt.alert.field.pattern.delete'] = {
                endpoint : alertFieldPattern,
                method : 'delete'
            };

            serviceList['bt.action.field.pattern.get'] = {
                endpoint : actionFieldPattern,
                method : 'get'
            };

            serviceList['bt.action.field.pattern.create'] = {
                endpoint : actionFieldPattern,
                method : 'post'
            };

            serviceList['bt.action.field.pattern.delete'] = {
                endpoint : actionFieldPattern,
                method : 'delete'
            };

            serviceList['bt.pattern.get']  = {
                endpoint : addPattern,
                method   : 'get'
            };

            serviceList['bt.pattern.create'] = {
              endpoint : addPattern,
              method   : 'post'
            };

            serviceList['bt.taskPattern.edit'] = {
                endpoint : taskPattern,
                method   : 'put'
            };

            serviceList['bt.fieldPattern.edit'] = {
                endpoint : fieldPatternSortOrEdit,
                method   : 'put'
            };

            serviceList['bt.pattern.delete'] = {
                endpoint : patternDelete,
                method   : 'delete'
            };

            serviceList['bt.nlp.messages.get'] = {
              endpoint : getGenericMessages,
              method   : 'get'
            };

            serviceList['field.synonyms.alerts.get'] = {
                endpoint : fieldAlertsSynonyms,
                method   : 'get'
            };

            serviceList['field.synonyms.alerts.put'] = {
                endpoint : fieldAlertsSynonyms,
                method   : 'put'
            };

            serviceList['import.emojis.post'] = {
                endpoint : importEmojis,
                method   : 'POST'
            };

            serviceList['field.synonyms.actions.get'] = {
                endpoint : fieldActionsSynonyms,
                method   : 'get'
            };

            serviceList['field.synonyms.actions.put'] = {
                endpoint : fieldActionsSynonyms,
                method   : 'put'
            };

            serviceList['bt.stream.auth.test']  = {
                endpoint:authorizeIdp,
                method:'post'
            };

            serviceList['bt.stream.channel.delete']  = {
                endpoint:deleteStreamChannel,
                method:'delete'
            };

            serviceList['bt.stream.ciscoChannel.delete']  = {
                endpoint:deleteStreamCiscoChannel,
                method:'delete'
            };

            serviceList['bt.stream.channel.create'] = {
                endpoint: createoreditchannel,
                method: 'post'
            };

            serviceList['bt.stream.getEmbedwebsdkDetails'] = {
                endpoint: getEmbedwebsdkDetails,
                method: 'get'
            };

            serviceList['bt.stream.postEmbedwebsdkDetails'] = {
                endpoint: getEmbedwebsdkDetails,
                method: 'post'
            };
            
            serviceList['bt.stream.ivrVoiceReset'] = {
                endpoint: ivrVoiceReset,
                method: 'post'
            };
            
            serviceList['bt.stream.channelAuthorize'] = {
                endpoint: botChannelAuthorize+"?rurl=:rurl",
                method: 'post',
                queryParams: ['rurl']
            };
            serviceList['bt.stream.addChannel'] = {
                endpoint: addChannel,
                method: 'post'
            };
            serviceList['bt.user.isFreeEmail'] = {
                endpoint: isFreeEmail,
                method: 'get'
            };
            serviceList['bt.user.getIdentities'] = {
                endpoint: identities,
                method: 'get'
            };
            serviceList['bt.user.deleteIdentity'] = {
                endpoint: identities + '/:identity',
                method: 'delete'
            };
            serviceList['bt.user.addIdentity'] = {
                endpoint: addIdentity,
                method: 'post',
                queryParams: ['addBot', 'streamId']
            };
            serviceList['bt.user.resendIdentityVerification'] = {
                endpoint: resendIdentityVerification,
                method: 'put'
            };
            serviceList['bt.user.verifyId'] = {
                endpoint: verifyId,
                method: 'post',
                queryParams: ['phoneNo', 'emailId', 'userId']
            };
            serviceList['bt.stream.fb.webhookget']  = {
                endpoint:fbWebhookGetUrl,
                method:'get'
            };

            serviceList['bt.stream.wfb.webhookget']  = {
                endpoint:wfbWebhookGetUrl,
                method:'get'
            };

            serviceList['bt.stream.channel.webhookget'] = {
                  endpoint:channelWebhookGetUrl,
                  method: 'get'
            };

            serviceList['bt.action.logs.get']  = {
                endpoint:actionLogsGet+"?offset=:offset&limit=:limit",
                method:'get'
            };

            serviceList['bt.alert.logs.get'] = {
                endpoint: alertLogsGet + "?offset=:offset&limit=:limit",
                method: 'get'
            };

            serviceList['field.synonyms.alerts.get'] = {
                endpoint : fieldAlertsSynonyms,
                method   : 'get'
            };

            serviceList['field.synonyms.alerts.put'] = {
                endpoint : fieldAlertsSynonyms,
                method   : 'put'
            };

            serviceList['field.synonyms.actions.get'] = {
                endpoint : fieldActionsSynonyms,
                method   : 'get'
            };

            serviceList['field.synonyms.actions.put'] = {
                endpoint : fieldActionsSynonyms,
                method   : 'put'
            };

            serviceList['bt.nlp.messages.get'] = {
              endpoint : getGenericMessages,
              method   : 'get'
            };

            serviceList['bt.nlp.messages.edit'] = {
              endpoint : editGenericMessages,
              method : 'put'
            };

            serviceList['bt.nlp.messages.override'] = {
                  endpoint: editGenericMessages + '/condition',
                  method: 'put'
            };

            serviceList['bt.stream.accounts'] = {
                endpoint:wfAccounts,
                method:'get'
            };

            serviceList['bt.stream.ringcentral.accounts'] = {
                endpoint:ringCentralWfAccount,
                method:'get'
            };

            serviceList['bt.stream.authinfo'] = {
                endpoint:streamauthinfo,
                method:'get'
            };
            serviceList['bt.stream.trymode'] = {
                endpoint:streamtrymode,
                method:'put'
            };


            serviceList['bt.nlp.test'] = {
                endpoint:testChatScriptResponse,
                method:'post'
            };

            serviceList['bt.post.trainlogs'] = {
                endpoint:getTrainLogs,
                method:'post'
            };

            serviceList['bt.post.trainbotintentlogs'] = {
                endpoint: trainbotintentlogs,
                method: 'post'
            };
            serviceList['bt.post.trainbotintentBunchlogs'] = {
                endpoint: bunchLogging,
                method: 'post'
            };

            serviceList['bt.delete.removeTrainbotintentlogs'] = {
                endpoint: removeTrainbotintentlogs,
                method: 'delete'
            };


            serviceList['bt.alert.connectors'] = {
                endpoint:connectorsGet,
                method:'get'
            };

            serviceList['bt.channel.fieldschema'] = {
                endpoint:getChannelFieldsSchema,
                method:'get'
            };

            serviceList['bt.alert.getVersions'] = {
                endpoint:checkAlertVersions,
                method:'get'
            };

            serviceList['bt.action.getVersions'] = {
                endpoint:checkActionVersions,
                method:'get'
            };

            serviceList['bt.alert.checkupgrade'] = {
                endpoint:checkAlertUpgrade,
                method:'get'
            };

            serviceList['bt.action.checkupgrade'] = {
                endpoint:checkActionUpgrade,
                method:'get'
            };

            serviceList['bt.soap.desc'] = {
                endpoint:soapDescription,
                method:'post'
            };

            serviceList['bt.soap.execute'] = {
                endpoint:soapOperationExec,
                method:'post'
            };

            serviceList['bt.command.create'] = {
                endpoint:commandCreate,
                method:'post'
            };

            serviceList['bt.command.edit'] = {
                endpoint:commandEdit,
                method:'put'
            };

            serviceList['bt.command.delete'] = {
                endpoint:commandDelete,
                method:'delete'
            };

            serviceList['bt.command.get'] = {
                endpoint:commandGet,
                method:'get'
            };

            serviceList['bt.subCommand.create'] = {
                endpoint:subCommandCreate,
                method:'post'
            };

            serviceList['bt.subCommand.edit'] = {
                endpoint:subCommandEdit,
                method:'put'
            };

            serviceList['bt.subCommand.delete'] = {
                endpoint:subCommandDelete,
                method:'delete'
            };

            serviceList['bt.subCommand.get'] = {
                endpoint:subCommandGet,
                method:'get'
            };

            serviceList['bt.terms.accept'] = {
                endpoint:acceptterms,
                method:'put'
            };

            serviceList['bt.dropdown.test'] = {
                endpoint:dropdownTest,
                method:'post'
            };

            serviceList['bt.mapsin.stream']={
                endpoint:streamMappings,
                method:'get'
            };

            serviceList['bt.alertdialogmapsin.stream']={
                endpoint:dialogStreamMappings,
                method:'get'
            };

            serviceList['bt.alert.errorCodes']={
                endpoint:btAlertErrorCodes,
                method:'get'
            };

            serviceList['bt.action.errorCodes']={
                endpoint:btActionErrorCodes,
                method:'get'
            };

            serviceList['bt.stream.errorCodes']={
                endpoint:btStreamErrorCodes,
                method:'get'
            };

            serviceList['bt.alert.configured'] = {
                endpoint: alertConfigured,
                method: 'put'
            };

            serviceList['bt.action.configured'] = {
                endpoint: actionConfigured,
                method: 'put'
            };

            serviceList['bt.alert.publish'] = {
                endpoint: btAlertPublishEndPoint,
                method: 'put'
            };

            serviceList['bt.action.publish'] = {
                endpoint: btActionPublishEndPoint,
                method: 'put'
            };

            serviceList['bt.callbackurl.get'] = {
                endpoint: btGetCallbackURL,
                method: 'get'
            };

            serviceList['bt.streams.get'] = {
                endpoint: btStreamsEndPoint,
                method: 'get'
            };

            serviceList['bt.streams.post'] = {
                endpoint: btStreamsEndPoint,
                method: 'post'
            };

            serviceList['bt.streams.edit'] = {
                endpoint: btStreamsEndPoint + '/:streamId',
                method: 'put'
            };

            serviceList['bt.streams.editnl'] = {
                  endpoint:btStreamsEndPoint + '/:streamId/nlSettings',
                  method: 'put'
            };

            serviceList['bt.stream.default_dialog'] = {
                endpoint: API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/defaultDialogSettings',
                method: 'put'
            };
            /*Endpoints to get alerts for particular stream*/

            serviceList['bt.streams.alerts.get'] = {
                endpoint: btStreamAlertEndpoint + '/:streamId' + '/alerts',
                method: 'get'
            };

            /*Endpoints to get actions for particular stream*/

            serviceList['bt.streams.actions.get'] = {
                endpoint: btStreamAlertEndpoint + '/:streamId' + '/actions?from=market',
                method: 'get'
            };

            serviceList['bt.streamsId.get'] = {
                endpoint: btStreamsEndPoint + '/:streamId',
                method: 'get'
            };

            serviceList['solution.streamsId.get'] = {
                endpoint: API_SERVER_URL + API_URL_PREFIX + '/marketplace/solutionbots/:streamId',
                method: 'get'
            };

            serviceList['bt.streamsId.put'] = {
                endpoint: btStreamsEndPoint + '/:streamId',
                method: 'put'
            };


            serviceList['bt.streamsId.delete'] = {
                endpoint: btStreamsEndPoint + '/:streamId',
                method: 'delete'
            };

            serviceList['mp.streams.get'] = {
                endpoint: mpStreamsEndPoint,
                method: 'get'
            };

            serviceList['mp.streams.post'] = {
                endpoint: mpStreamsEndPoint,
                method: 'post'
            };

            serviceList['mp.streamsId.get'] = {
                endpoint: mpStreamsEndPoint + '/:streamId',
                method: 'get'
            };

            serviceList['mp.streamsId.put'] = {
                endpoint: mpStreamsEndPoint + '/:streamId',
                method: 'put'
            };

            serviceList['mp.streamsId.delete'] = {
                endpoint: mpStreamsEndPoint + '/:streamId',
                method: 'delete'
            };

            serviceList['bt.alerts.get'] = {
                endpoint: btAlertsEndPoint,
                method: 'get'
            };

            serviceList['bt.alerts.put'] = {
                endpoint: btAlertsEndPoint + '/:alertId',
                method: 'put'
            };

            serviceList['bt.alerts.post'] = {
                endpoint: btAlertsEndPoint,
                method: 'post'
            };

            serviceList['bt.alertsId.get'] = {
                endpoint: btAlertsEndPoint + '/:alertId?sendFileObj=true',
                method: 'get'
            };

            serviceList['bt.alertsId.put'] = {
                endpoint: btAlertsEndPoint + '/:alertId',
                method: 'put'
            };


            serviceList['bt.alertsId.delete'] = {
                endpoint: btAlertsEndPoint + '/:alertId',
                method: 'delete'
            };

            serviceList['bt.alertsId.unpublish'] = {
                endpoint: btAlertsEndPoint + '/:alertId?markConfigured=true',
                method: 'delete'
            };

            serviceList['bt.alertsId.clone'] = {
                endpoint: btAlertsEndPoint + '/:alertId' + '/clone',
                method: 'put'
            };

            serviceList['bt.alertsId.unlock'] = {
                endpoint: taskunlockendpoint,
                method: 'post'
            };


            /*new endpoint for unlock task */
            serviceList['bt.put.cloneDialogTask'] = {
                endpoint: cloneDialogTask,
                method: 'put'
            }; 

            serviceList['bt.put.cloneDialogComponent'] = {
                endpoint: cloneDialogComponent,
                method: 'put'
            };

             serviceList['bt.dialogsId.unlock'] = {
                endpoint: taskunlockendpoint,
                method: 'post'
            };

            serviceList['bt.alertsId.upgrade'] = {
                endpoint: btAlertsEndPoint + '/:alertId' + '/upgrade',
                method: 'put'
            };

            serviceList['mp.alerts.get'] = {
                endpoint: mpAlertsEndPoint,
                method: 'get'
            };

            serviceList['mp.alerts.post'] = {
                endpoint: mpAlertsEndPoint,
                method: 'post'
            };

            serviceList['mp.alerts.put'] = {
                endpoint: mpAlertsEndPoint + '/:alertId',
                method: 'put'
            };


            serviceList['mp.alertsId.get'] = {
                endpoint: mpAlertsEndPoint + '/:alertId?sendFileObj=true',
                method: 'get'
            };

            serviceList['mp.alertsId.put'] = {
                endpoint: mpAlertsEndPoint + '/:alertId',
                method: 'put'
            };

            serviceList['mp.alertsId.delete'] = {
                endpoint: mpAlertsEndPoint + '/:alertId',
                method: 'delete'
            };

            serviceList['mp.alertsId.upgrade'] = {
                endpoint: mpAlertsEndPoint + '/:alertId/upgrade',
                method: 'put'
            };

            serviceList['bt.actions.get'] = {
                endpoint: btActionsEndPoint,
                method: 'get'
            };

            serviceList['bt.actions.post'] = {
                endpoint: btActionsEndPoint,
                method: 'post'
            };

            serviceList['bt.actionsId.get'] = {
                endpoint: btActionsEndPoint + '/:actionId?sendFileObj=true',
                method: 'get'
            };

            serviceList['bt.actionsId.put'] = {
                endpoint: btActionsEndPoint + '/:actionId',
                method: 'put'
            };


            serviceList['bt.actionsId.delete'] = {
                endpoint: btActionsEndPoint + '/:actionId',
                method: 'delete'
            };

            serviceList['bt.actionsId.unpublish'] = {
                endpoint: btActionsEndPoint + '/:actionId?markConfigured=true',
                method: 'delete'
            };
            serviceList['bt.actionsId.clone'] = {
                endpoint: btActionsEndPoint + '/:actionId' + '/clone',
                method: 'put'
            };


            serviceList['bt.actionsId.unlock'] = {
                endpoint: taskunlockendpoint,
                method: 'post'
            };

            serviceList['bt.actionsId.upgrade'] = {
                endpoint: btActionsEndPoint + '/:actionId' + '/upgrade',
                method: 'put'
            };

            serviceList['bt.dialogsId.upgrade'] = {
                endpoint: dialogEndpoint + '/:dialogId' + '/upgrade',
                method: 'put'
            };

            serviceList['bt.dialog.migrate'] = {
                endpoint: dialogEndpoint + '/:dialogId' + '/migrate',
                method: 'get'
            };

            serviceList['bt.dialogsId.regenerate'] = {
                endpoint: regenerateDialogEndPoint,
                method: 'post'
            };

            serviceList['bt.dialogsId.addlinkedtasks'] = {
                endpoint: dialogEndpoint + '/:dialogId' + '/addlinkedtasks',
                method: 'put'
            };

            serviceList['bt.dialogsId.intentSuggestions'] = {
                endpoint: dialogEndpoint + '/:dialogId' + '/intentsuggestions',
                method: 'get'
            };

            serviceList['mp.actionsId.upgrade'] = {
                endpoint: mpActionsEndPoint + '/:actionId' + '/upgrade',
                method: 'put'
            };

            serviceList['mp.actions.get'] = {
                endpoint: mpActionsEndPoint,
                method: 'get'
            };

            serviceList['mp.actions.post'] = {
                endpoint: mpActionsEndPoint,
                method: 'post'
            };

            serviceList['mp.actionsId.get'] = {
                endpoint: mpActionsEndPoint + '/:actionId?sendFileObj=true',
                method: 'get'
            };

            serviceList['mp.actionsId.put'] = {
                endpoint: mpActionsEndPoint + '/:actionId',
                method: 'put'
            };

            serviceList['mp.actionsId.delete'] = {
                endpoint: mpActionsEndPoint + '/:actionId',
                method: 'delete'
            };

            /* Endpoints for dialog building */
            serviceList['bt.dialogs.get'] = {
                endpoint: dialogEndpoint,
                method: 'get'
            };

            serviceList['bt.dialogsByState.get'] = {
                  endpoint : dialogState,
                  method: 'get'
            };

            serviceList['bt.dialog.get'] = {
                endpoint: dialogEndpoint + '?resolveDialog=:dialogId',
                //'/:dialogId',
                method: 'get'
            };

            serviceList['bt.dialogsUB.get'] = {
                  endpoint:dialogEndpoint + '?parentBotId=:parentBotId',
                  method:'get'
            };

            serviceList['bt.dialog.post'] = {
                endpoint: dialogEndpoint,
                method: 'post'
            };
            serviceList['get.dialog'] = {
                endpoint: dialogEndpoint+'/:dialogId',
                method: 'get'
            };
            serviceList['bt.dialog.put'] = {
                endpoint: dialogEndpoint + '/:dialogId',
                method: 'put'
            };

            serviceList['bt.dialog.delete'] = {
                endpoint: dialogEndpoint + '/:dialogId',
                method: 'delete'
            };

            serviceList['bt.dialog.configure'] = {
                endpoint : dialogEndpoint + '/:dialogId/markConfigured',
                method: 'put'
            };
            serviceList['bt.dialogComponent.get'] = {
                endpoint: dialogEndpoint + '/:dialogId/components',
                method: 'get'
            };
            
            serviceList['bt.regenerateDialog.get'] = {
                endpoint: resolveDialogEndPoint,
                method: 'get'
            };

            serviceList['bt.dialogBotConfig.get'] = {
                endpoint: dialogBotConfigEndpoint + '/:dialogId/preference',
                method: 'get'
            };
            serviceList['bt.dialogBotConfig.put'] = {
                endpoint: dialogBotConfigEndpoint + '/:dialogId/preference',
                method: 'put'
            };

            serviceList['bt.dialogComponent.updateNode'] = {
                endpoint: dialogEndpoint + '/:dialogId/nodes/:nodeId',
                method: 'put'
            };

            serviceList['bt.flowtask.SDKSubscription'] = {
                endpoint: dialogSubscriptionEndpoint,
                method: 'put'
            };
            
            serviceList['bt.dialog.import'] = {
                endpoint: importDialog,
                method: 'post'
            };
            serviceList['bt.get.getDialogIdps'] = {
                endpoint: getDialogIdps,
                method: 'get'
            };
            serviceList['bt.newBot.import'] = {
                endpoint: importBot,
                method: 'post'
            };
            serviceList['bt.existingBot.import'] = {
                endpoint: importBot + '/:botId',
                method: 'post'
            };
            serviceList['bt.botImport.status'] = {
                endpoint: importBotV1 + '/status/:requestId',
                method: 'get'
            };
            serviceList['bt.dialog.export'] = {
                endpoint: exportDialog,
                method: 'get'
            };
            serviceList['bt.addFormNode.batch'] = {
                endpoint: addFormNodeBatch,
                method: 'post'
            };
            serviceList['bt.export'] = {
                endpoint: exportBot,
                method: 'post'
            };

            serviceList['bt.dialog.recall'] = {
                endpoint : dialogEndpoint + '/:dialogId/recall',
                method: 'put'
            };
            serviceList['bt.dialog.messagePreview'] = {
                endpoint : dialogMessagePreview + '/:dialogId/component/:nodeId/preview?channel=email',
                method: 'post'
            };

            serviceList['bt.dialog.unpublish'] = {
                endpoint : dialogEndpoint + '/:dialogId/unpublish',
                method: 'put'
            };

            serviceList['bt.flowtask.SDKSubscription.delete'] = {
                endpoint: dialogSubscriptionEndpoint,
                method: 'delete'
            };

            /* Endpoints for component building */
            serviceList['bt.components.get'] = {
                endpoint: componentEndpoint,
                method: 'get'
            };

            serviceList['bt.componentsByType.get'] = {
                endpoint: componentEndpoint + '?type=:type&isConfiguredOnly=:isConfiguredOnly',
                method: 'get'
            };
            
            
            serviceList['bt.componentsByTypeAndState.get'] = {
                endpoint: componentEndpoint + '?type=:type&status=:state',
                method: 'get'
            };
            serviceList['bt.componentsBySearchTypeIntent.get'] = {
                endpoint: componentEndpoint + '?type=:type&isConfiguredOnly=:isConfiguredOnly&intent=:intentName',
                method: 'get'
            };
            serviceList['bt.componentsBysearchFormType.get'] = {
                endpoint: API_SERVER_URL + API_URL_PREFIX + '/builder/streams/:streamId/forms?name=:name',
                method: 'get'
            };
            serviceList['bt.componentsBySearchType.get'] = {
                endpoint: componentEndpoint + '?type=:type&isConfiguredOnly=:isConfiguredOnly&name=:name',
                method: 'get'
            };

            serviceList['bt.component.get'] = {
                endpoint: componentEndpoint + '/:componentId',
                method: 'get'
            };

            serviceList['bt.component.post'] = {
                endpoint: componentEndpoint,
                method: 'post'
            };

            serviceList['bt.component.put'] = {
                endpoint: componentEndpoint + '/:componentId',
                method: 'put'
            };
            serviceList['bt.component.synonyms.put'] = {
                endpoint: componentEndpoint + '/:componentId/synonyms',
                method: 'put'
            };
            serviceList['bt.component.patterns.put'] = {
                endpoint: componentEndpoint + '/:componentId/patterns',
                method: 'put'
            };
            serviceList['bt.component.negativePatterns.post'] = {
                  endpoint:negativePatternEndpoint,
                  method:'post'
            };
            serviceList['bt.component.execute'] = {
                endpoint: componentEndpoint + '/:componentId/execute',
                method: 'post'
            };

            serviceList['bt.component.delete'] = {
                endpoint: componentEndpoint + '/:componentId',
                method: 'delete'
            };

            serviceList['bt.filters.get'] = {
                endpoint: btFilterdefEndPoint,
                method: 'get'
            };

            serviceList['bt.getFiltersByAlertId.get']={
                endpoint:btFilterdefEndPoint+"?alertId=:alertId"+"&alertVersion=:alertVersion",
                method:'get'
            };

            serviceList['bt.filters.post'] = {
                endpoint: btFilterdefEndPoint,
                method: 'post'
            };

            serviceList['bt.filtersId.get'] = {
                endpoint: btFilterdefEndPoint + '/:filterId',
                method: 'get'
            };

            serviceList['bt.filtersId.put'] = {
                endpoint: btFilterdefEndPoint + '/:filterId',
                method: 'put'
            };

            serviceList['bt.filtersId.delete'] = {
                endpoint: btFilterdefEndPoint + '/:filterId',
                method: 'delete'
            };

            serviceList['mp.filters.get'] = {
                endpoint: mpFilterdefEndPoint,
                method: 'get'
            };

            serviceList['mp.filters.post'] = {
                endpoint: mpFilterdefEndPoint,
                method: 'post'
            };

            serviceList['mp.filtersId.get'] = {
                endpoint: mpFilterdefEndPoint + '/:filterId',
                method: 'get'
            };

            serviceList['mp.filtersId.put'] = {
                endpoint: mpFilterdefEndPoint + '/:filterId',
                method: 'put'
            };

            serviceList['mp.filtersId.delete'] = {
                endpoint: mpFilterdefEndPoint + '/:filterId',
                method: 'delete'
            };

            serviceList['bt.workflows.get'] = {
                endpoint: btAAMEndPoint,
                method: 'get'
            };

            serviceList['bt.workflows.post'] = {
                endpoint: btAAMEndPoint,
                method: 'post'
            };

            serviceList['bt.workflowId.get'] = {
                endpoint: btAAMEndPoint + '/:AlertActionMapId',
                method: 'get'
            };

            serviceList['bt.workflowId.put'] = {
                endpoint: btAAMEndPoint + '/:AlertActionMapId',
                method: 'put'
            };

            serviceList['bt.workflowId.delete'] = {
                endpoint: btAAMEndPoint + '/:AlertActionMapId',
                method: 'delete'
            };

            serviceList['mp.workflows.get'] = {
                endpoint: mpAAMEndPoint,
                method: 'get'
            };

            serviceList['mp.workflows.post'] = {
                endpoint: mpAAMEndPoint,
                method: 'post'
            };

            serviceList['mp.workflowId.get'] = {
                endpoint: mpAAMEndPoint + '/:workflowId',
                method: 'get'
            };

            serviceList['mp.workflowId.put'] = {
                endpoint: mpAAMEndPoint + '/:workflowId',
                method: 'put'
            };

            serviceList['mp.workflowId.delete'] = {
                endpoint: mpAAMEndPoint + '/:workflowId',
                method: 'delete'
            };

            serviceList['bt.login.post'] = {
                endpoint: btLoginEndPoint,
                method: 'post'
            };
            serviceList['bt.join.accounts.get'] = {
                endpoint: API_SERVER_URL + API_URL_PREFIX + '/builder/allowedDomains',
                method: 'get'
            };
            serviceList['bt.join.accounts.post'] = {
                endpoint: API_SERVER_URL + API_URL_PREFIX + '/builder/requestToDomains?type=:type',
                method: 'post'
            };
            
            serviceList['bt.uploadFile.post'] = {
                endpoint: btUploadFile,
                method: 'post'
            };

            serviceList['bt.testAlert.post'] = {
                endpoint: btTestRequestChain,
                method: 'post'
            };

            serviceList['bt.apikey_basic.test'] = {
                endpoint:btTestIDP,
                method:'POST'
            };

            serviceList['bt.dotKeys.post'] = {
                endpoint: btDotKeys,
                method: 'post'
            };

            serviceList['bt.paramMap.post'] = {
                endpoint: btParamMap,
                method: 'post'
            };

            serviceList['bt.paramDialogMap.post'] = {
                endpoint: btParamDialogMap,
                method: 'post'
            };

            serviceList['bt.paramMap.action.get'] = {
                endpoint: btParmaMapGet + '?actionId=:actionId&version=:version',
                method: 'get'
            };

            serviceList['bt.paramMap.dialog.get'] = {
                endpoint: btAlertDialogParamMapPost + '?resourceId=:dialogId&version=:version',
                method: 'get'
            };

            serviceList['bt.paramMap.alert.get'] = {
                endpoint: btParmaMapGet + '?alertId=:alertId&version=:version',
                method: 'get'
            };

            serviceList['bt.paramMap.dialogValidate.get'] = {
                endpoint: btParamDialogMap + '/:mappingId/validate?dialogId=:dialogId',
                method: 'get'
            };

            serviceList['bt.paramMap.maping.get'] = {
                endpoint: btParmaMapGet + '/:mappingId',
                method: 'get'
            };

            serviceList['bt.paramDialogMap.maping.get'] = {
                endpoint: btParamDialogMap + '/:mappingId',
                method: 'get'
            };

            serviceList['bt.paramMap.maping.put'] = {
                endpoint: btParmaMapGet + '/:mappingId',
                method: 'put'
            };

            serviceList['bt.alertDialogParamMap.maping.put'] = {
                endpoint: btAlertDialogParamMapPost + '/:mappingId',
                method: 'put'
            };

            serviceList['bt.paramMap.maping.delete'] = {
                endpoint: btParmaMapGet + '/:mappingId',
                method: 'delete'
            };

            serviceList['bt.paramDialogMap.maping.delete'] = {
                endpoint: btParamDialogMap + '/:mappingId',
                method: 'delete'
            };

            serviceList['bt.signedUrl.get'] = {
                endpoint: btSignedURL,
                method: 'get'
            };

            serviceList['bt.streamsidp.get'] = {
                endpoint: btStreamsGetIDP,
                method: 'get'
            };

            serviceList['bt.idp.getbyname'] = {
                endpoint: btStreamsGetIDP+"/ref/:refId",
                method: 'get'
            };

            serviceList['bt.streamidps.get'] = {
                endpoint: btStreamGetIDPs,
                method: 'get'
            };
            //not using this
            serviceList['bt.streamsidp.post'] = {
                endpoint: btStreamsGetIDP,
                method: 'post'
            };

            serviceList['bt.seeddata.get'] = {
                endpoint: btSeedData,
                method: 'get'
            };

            serviceList['bt.processAppsdata.get'] = {
                endpoint: processAppsData,
                method: 'get'
            };

            serviceList['bt.seedCategories.get'] ={
                endpoint:btSeedCategories,
                method:'get'
            };

            /* Endpoint for idp */
            serviceList['bt.idp.post'] = {
                endpoint: btStreamsGetIDP,
                method: 'post'
            };

            serviceList['bt.idp.put'] ={
                endpoint:btIDPGet,
                method:'put'
            };

            serviceList['bt.idp.get'] ={
                endpoint:btIDPGet,
                method:'get'
            };

            serviceList['bt.idp.delete'] ={
                endpoint:btIDPGet,
                method:'delete'
            };

            serviceList['bt.idp.test'] = {
                endpoint: btStreamsTestIDP,
                method: 'get'
            };

            serviceList['bt.idp.account.delete'] = {
                endpoint: deleteAccount,
                method: 'delete'
            };

            serviceList['bt.teams.get'] = {
                endpoint: btTeams,
                method: 'get'
            };

            serviceList['builder.resolve_uxmap']={
                endpoint:koreUxMapResolve,
                method:'post'
            };

            serviceList['is.user.allowed.to.access']={
                endpoint:isUserAllowedToAccess,
                method:'get'
            };

            serviceList['bt.apps.get'] = {
                endpoint: appsUrl,
                method: 'get'
            };

            serviceList['bt.appsListUsage.get'] = {
                endpoint: appsListUsageURL,
                method: 'get'
            };

            serviceList['bt.apps.create'] = {
                endpoint: appCreateUrl,
                method: 'post'
            };

            serviceList['bt.apps.edit'] = {
                endpoint: appEditUrl,
                method: 'put'
            };

            serviceList['bt.apps.delete'] = {
                endpoint: appDeleteUrl,
                method: 'delete'
            };

            serviceList['bt.apps.regenerate.key'] = {
                endpoint: keyRefreshUrl,
                method: 'put'
            };

            serviceList['bt.org.apps.get'] = {
                endpoint: orgAppsUrl,
                method: 'get'
            };

            serviceList['bt.org.apps.create'] = {
                endpoint: orgAppCreateUrl,
                method: 'post'
            };

            serviceList['bt.org.apps.edit'] = {
                endpoint: orgAppEditUrl,
                method: 'put'
            };

            serviceList['bt.org.apps.delete'] = {
                endpoint: orgAppDeleteUrl,
                method: 'delete'
            };

            serviceList['bt.org.apps.regenerate.key'] = {
                endpoint: keyRefreshUrl,
                method: 'put'
            };

            // give a proper key
            serviceList['temp.synonyms.get'] = {
                endpoint: getSynonymsForTaskName + 'synonyms?taskName=:taskName',
                method: 'get'
            };

            serviceList['temp.synonyms.post'] = {
                endpoint: getSynonymsForTaskName + 'synonyms?',
                method: 'post'
            };

            // welcome message
            serviceList['bt.welcomeMessage.post'] = {
                endpoint: getSynonymsForTaskName,
                method: 'put'
            };

            serviceList['bt.apps.create'] = {
                endpoint: appCreateUrl,
                method: 'post'
            };

            serviceList['bt.kora.users.get'] = {
                endpoint: koraURL+'/users?offset=:offset&limit=:limit',
                method: 'get'
            };

            serviceList['bt.kora.logs.get'] = {
                endpoint: koraURL+'/logs?userId=:uId&offset=:offset&limit=:limit',
                method: 'get'
            };
            serviceList['bt.sessions.get'] = {
                endpoint: getSessions,
                method: 'get'
            };
                serviceList['bt.initializer.execute'] = {
                endpoint: executeInitializer,
                method: 'post'
            };
                serviceList['bt.get.intenetsOrEntities'] = {
                endpoint: intentsorentities,
                method: 'get'
            };

              serviceList['bt.utterances.get'] = {
                endpoint: getutterances,
                method: 'get'
             };
             serviceList['bt.utterancesstream.get'] = {
                endpoint: getutterancesStream,
                method: 'get'
             };
              serviceList['bt.utterances.create'] = {
                endpoint: createutterances,
                method: 'post'
            };
            serviceList['bt.bulkUtterances.create'] = {
                endpoint: createutterances+'/bulk',
                method: 'post'
            };
              serviceList['bt.utterances.edit'] = {
                endpoint: editutterances,
                method: 'put'
            };
              serviceList['bt.utterances.getbyid'] = {
                endpoint: editutterances,
                method: 'get'
            };
              serviceList['bt.utterances.trainutterance'] = {
                endpoint: trainbotutterance,
                method: 'post'
            };
            serviceList['bt.utterance.botImport']={
                  endpoint:importbotutterances,
                  method:'post'
            };
            serviceList['bt.botImportUtterance.status'] = {
                  endpoint:importbotutterancestatus,
                  method:'get'
            };
            serviceList['bt.stream.autoTrainStatus'] = {
                endpoint: autoTrainStatus,
                method: 'get'
            };
            serviceList['bt.train.faq'] = {
                endpoint: trainbotfaq,
                method: 'post'
            };


              serviceList['bt.utterances.delete'] = {
                endpoint: editutterances,
                method: 'delete'
            };

            serviceList['mp.getBotDetails'] = {
                endpoint: getBotDetails,
                method: 'get'
            };
            serviceList['bt.get.setupchecklist'] = {
                endpoint: setupchecklist,
                method: 'get'
            };
            serviceList['bt.put.updateChecklist'] = {
                endpoint: setupchecklist,
                method: 'put'
            };

            serviceList['mp.user.checkIdStatus'] = {
                endpoint: checkIdStatus,
                method: 'post',
                moreParams: ['emailId', 'phoneNo'],
                decryptFn:function(crypticRes){  
                    var _keysMap = {
                        'st': 'status',
                        'fe': 'isFreeEmail',
                        'la': 'isBTLicenseAccepted',
                        'lau': 'isBTLicenseAccepted_update',
                        'aa': 'isBTAccessAllowed',
                        'i': 'idp',
                        'pi': 'isPrimaryIdentity',
                        'ss': 'self_signup_enabled',
                        'us':'usernameSecured'
                    }, _valuesMap = {
                        1: true,
                        0: false
                    }, _statusValuesMap = {
                        '0': 'inactive',
                        '1': 'active',
                        '-1': 'unknown'
                    };
                    var crypticData= {}; 
                    if(crypticRes.data && crypticRes.data.data) {
                        crypticData = JSON.parse(window.atob(crypticRes.data.data)); // Decode API response
                    }
                    if (crypticData) {
                        Object.keys(crypticData).forEach(function (key) {
                            //for values
                            if (key === "st") {
                                if (_statusValuesMap.hasOwnProperty(crypticData[key].toString())) {
                                    crypticData[key] = _statusValuesMap[crypticData[key].toString()];
                                }
                            } else {
                                if (_valuesMap.hasOwnProperty(crypticData[key])) {
                                    crypticData[key] = _valuesMap[crypticData[key]];
                                }
                            }

                            //for keys
                            if (_keysMap.hasOwnProperty(key)) {
                                crypticData[_keysMap[key]] = crypticData[key];
                                delete crypticData[key];
                            }
                        });
                        crypticRes.data = crypticData;
                    }
                    return crypticRes;
                }
            };

            serviceList['bt.checkFreeDomain'] = {
                endpoint: isFreeDomain,
                method: 'get'
            };

            serviceList['mp.user.getUserProfile'] = {
                endpoint: userProfile,
                method: 'get'
            };
            
            serviceList['mp.user.getUserProfileDetails'] = {
                endpoint: userProfileDetails,
                method: 'get'
            };
            
            serviceList['mp.user.getUserConversation'] = {
                endpoint: userConversation,
                method: 'get'
            };

            serviceList['mp.user.tokenExpiry'] = {
                endpoint: tokenExpiry,
                method: 'get'
            };
            serviceList['mp.user.appControlList'] = {
                endpoint: appControlList,
                method: 'get'
            };

            serviceList['mp.user.ssoLogin'] = {
                endpoint: ssoLogin,
                method: 'post'
            };

            serviceList['mp.user.login'] = {
                endpoint: userLogin,
                method: 'post'
            };

            serviceList['mp.user.signout'] = {
                endpoint: userSignout,
                method: 'delete'
            };

            serviceList['mp.user.signup'] = {
                endpoint: userSignup,
                method: 'post'
            };

            serviceList['mp.user.pwdPolicy'] = {
                endpoint: pwdPolicy,
                method: 'get'
            };

            serviceList['mp.user.resendVerification'] = {
                endpoint: resendVerification,
                method: 'post'
            };

            serviceList['mp.user.verifyId'] = {
                endpoint: verifyId,
                method: 'post',
                moreParams: ['emailId', 'phoneNo', 'userId']
            };

            serviceList['mp.user.getBTAccess'] = {
                endpoint: btAccessRequestPublic,
                method: 'post'
            };

            serviceList['mp.user.getBTAccessPublic'] = {
                endpoint: btAccessRequestPublic,
                method: 'post'
            };

            serviceList['mp.user.getSFBTAccess'] = {
                endpoint: sfbtAccessRequestPublic,
                method: 'post'
            };

            serviceList['mp.user.acceptbtlicense'] = {
                endpoint: acceptbtlicense,
                method: 'put'
            };

            serviceList['mp.user.passwordReset'] = {
                endpoint: passwordReset,
                method: 'post'
            };

            serviceList['mp.user.resetPassLinkExpiry'] = {
                endpoint: setNewPass,
                method: 'get'
            };

            serviceList['mp.user.setNewPassword'] = {
                endpoint: setNewPass,
                method: 'put'
            };

            serviceList['bt.getSampleBots'] = {
                endpoint: getSampleBots,
                method: 'get'
            };

            serviceList['bt.getSmartBots'] = {
                endpoint: getSmartBots,
                method: 'get'
            };
            serviceList['bt.removeBotInheritance'] = {
                endpoint: removeBotInheritance,
                method: 'post'
            };
            serviceList['bt.put.ktNodeUnlock'] = {
                endpoint: ktNodeUnlock,
                method: 'put'
            };

            serviceList['bt.post.dailogComponentUnlock'] = {
                endpoint: dailogComponentUnlock,
                method: 'post'
            };

            serviceList['bt.entity.lookup'] = {
                endpoint: dialogEntityLookup,
                method: 'post'
            };

            serviceList['bt.getLookup.json'] = {
                endpoint: getLookupJson,
                method: 'get'
            };

            serviceList['bt.get.defaultLanguage'] = {
                endpoint : getDefaultLanguage,
                method   : 'get'
            };

            serviceList['bt.post.updateLanguageJson'] = {
                endpoint : uploadLanguageJson,
                method   : 'post'
            };

            serviceList['bt.post.addSupportedLanguage'] = {
                endpoint : addSupportedLanguage,
                method   : 'post'
            };

            serviceList['bt.post.variables']={
                endpoint: addBotVariables,
                method: 'post'
            };
            serviceList['bt.put.addBulkBotVariables']={
                endpoint: addBulkBotVariables,
                method: 'put'
            };
            serviceList['bt.put.variables'] = {
                  endpoint: updateBotVariables,
                  method: 'put'
            };

            serviceList['bt.delete.variables'] = {
                  endpoint: updateBotVariables,
                  method: 'delete'
            };


            serviceList['bt.get.variables']={
                endpoint: getBotVariables,
                method: 'get'
            };

            serviceList['bt.get.variablesByCollection']={
                endpoint: getBotVariables + '&collectionRefId=:collectionRefId',
                method: 'get'
            };

            serviceList['bt.get.allVariables']={
                endpoint: getAllBotVariables,
                method: 'get'
            };
            serviceList['bt.get.getsSampleBotAllVariables']={
                endpoint: getAllBotVariables+'&standardBotId=:standardBotId',
                method: 'get'
            };
            serviceList['bt.get.context'] = {
                endpoint: API_SERVER_URL + API_URL_PREFIX + '/stream/:streamId/context/:contextId',
                method: 'get'
            };

             serviceList['bt.post.sts'] = {
                endpoint: chatAssertions,
                method: 'post'
            };

            serviceList['bt.post.stsV2'] = { // jwt with V2 will have 24hrs validity //
                endpoint: chatAssertions+'?v2=true',
                method: 'post'
            };

            serviceList['bt.prefs.update'] = {
                endpoint: API_SERVER_URL + API_URL_PREFIX + '/users/:userId/updateprefs',
                method: 'post'
            };

            serviceList['bt.account.activate'] = {
                endpoint: API_SERVER_URL + API_URL_PREFIX + '/accounts/:accountId/activate',
                method: 'post'
            };

            serviceList['bt.post.utteranceImport'] = {
                endpoint : utteranceImport,
                method   : 'post'
            };

            serviceList['bt.post.utteranceExport'] = {
                  endpoint : utteranceExport,
                  method   : 'post'
            };

            serviceList['bt.post.utteranceStatus'] = {
                  endpoint : utteranceStatus,
                  method   : 'get'
            };

            serviceList['bt.get.exportStatusBot'] = {
                  endpoint : exportStatusBot,
                  method: 'get'
            };

            serviceList['bt.get.botTasksSummary'] = {
                  endpoint : botTasksSummary,
                  method: 'get'
            };

            serviceList['bt.get.botSummary'] = {
                  endpoint : botSummary,
                  method: 'get'
            };
            serviceList['bt.get.getTraitGroups'] = {
                endpoint : traitsGroupApi,
                method: 'get'
            };
            serviceList['bt.put.updateTraitGroup'] = {
                endpoint : traitsGroupApi+'/:traitGroupId',
                method: 'put'
            };
            serviceList['bt.post.createTraitGroup'] = {
                endpoint : traitsGroupApi,
                method: 'post'
            };
            serviceList['bt.delete.deleteTraitsGroup'] = {
                endpoint : traitsGroupApi+'/:traitGroupId',
                method: 'delete'
            };
            serviceList['bt.get.getTraitGroupById'] = {
                endpoint : traitsGroupApi+'/:traitGroupId',
                method: 'get'
            };
            serviceList['bt.get.getTraitsByGroupId'] = {
                endpoint : traitsGroupApi+'/:traitGroupId/traits',
                method: 'get'
            };
            serviceList['bt.get.getTraitsById'] = {
                endpoint : traitsGroupApi+'/:traitGroupId/traits/:traitId',
                method: 'get'
            };
            serviceList['bt.put.updateTraitsById'] = {
                endpoint : traitsGroupApi+'/:traitGroupId/traits/:traitId',
                method: 'put'
            };

            serviceList['bt.component.traits.put'] = {
                endpoint: componentEndpoint + '/:componentId/traits',
                method: 'put'
            };


            /* sentiment management */
            serviceList['bt.post.saveSentiment'] = {
                endpoint : sentimentManagement,
                method : 'post'
            };

            serviceList['bt.put.editSentiment'] = {
                  endpoint : editSentimentManagement,
                  method   : 'put'
            };

            serviceList['bt.delete.deleteSentiment'] = {
                  endpoint : deleteSentimentManagement,
                  method   : 'delete'
            };
            serviceList['bt.post.reorderSentiment'] = {
                  endpoint : reorderSentimentManagement,
                  method   : 'post'
            };

            serviceList['bt.put.createGroup'] = {
                  endpoint : createGroup,
                  method   : 'put'
            };

            serviceList['bt.get.smallTalkGroups'] = {
                  endpoint : getSmallTalkGroups,
                  method   : 'get',
            };

             serviceList['bt.get.smallTalk'] = {
                  endpoint : getSmallTalk,
                  method   : 'get',
            };

            serviceList['bt.put.smallTalkGroups'] = {
                  endpoint : updateSmallTalkGroup,
                  method   : 'put'
            };

            serviceList['bt.post.createNewNode'] = {
                  endpoint :  creteNewNode,
                  method   : 'post'
            };

            serviceList['bt.get.currentGroupNodes'] = {
                  endpoint :  currentGroupNodes,
                  method   : 'get'
            };

            serviceList['bt.put.updateNode'] = {
                  endpoint : updateNode,
                  method   : 'put'
            };

            serviceList['bt.delete.smallTalkNode'] = {
                  endpoint : deleteNode,
                  method   : 'delete'
            };

            serviceList['bt.delete.smallTalkGroup'] = {
                  endpoint : deleteGroup,
                  method   : 'delete'
            };

            serviceList['bt.get.smallTalkPaginate'] = {
                  endpoint : paginateSmallTalk,
                  method   : 'get'
            };

            serviceList['bt.get.smallTalkSearch'] = {
                  endpoint : searchSmallTalk,
                  method   : 'get'
            };

            serviceList['bt.get.allNamespaces'] = {
                endpoint: getAllNamespaces,
                method: 'get'
            };
            
            serviceList['bt.post.createNamespace'] = {
                endpoint: createNamespace,
                method: 'post'
            };
            
            serviceList['bt.put.updateNamespace'] = {
                endpoint: updateNamespace,
                method: 'put'
            };

            serviceList['bt.delete.deleteNamespace'] = {
                endpoint: deleteNamespace,
                method: 'delete'
            };

            serviceList['bt.get.getNSVariables'] = {
                endpoint: getNSVariables,
                method: 'get'
            };
            
            serviceList['bt.put.addNamespaceKg'] = {
                endpoint: addNamespaceKg,
                method: 'put'
            };

            serviceList['bt.put.enableNamespace'] = {
                endpoint: enableNamespace,
                method: 'put'
            };

            serviceList['bt.export.smallTalk'] = {
                  endpoint : exportSmallTalk,
                  method   : 'post'
            };

            serviceList['bt.get.statusImportSmallTalk'] = {
                  endpoint : statusSmallTalk,
                  method   :'get'
            };

            serviceList['bt.post.importSmallTalkFile'] = {
                  endpoint : importSmallTalkFile,
                  method   : 'post'
            };

            serviceList['bt.post.migrateSmallTalk'] = {
                  endpoint : migrateSmallTalk,
                  method   : 'post'
            };

            serviceList['bt.put.reOrderSmallTalk'] = {
                  endpoint : reOrderSmallTalk,
                  method   : 'put'
            };

            serviceList['bt.put.reOrderQuestions'] = {
                  endpoint : reOrderQuestions,
                  method   : 'put'
            };

            serviceList['bt.post.ontologyAnalyzer'] = {
                  endpoint : ontologyAnalyzer,
                  method   : 'post'
            };

            serviceList['bt.get.ontologyReport'] = {
                  endpoint : ontologyReport,
                  method   : 'get'
            };

            serviceList['bt.get.analysisReport'] = {
                  endpoint : analysisReport,
                  method   : 'get'
            };

            serviceList['bt.get.exportOntologyReport'] = {
                  endpoint : exportOntologyReport,
                  method   : 'get'
            };

            serviceList['bt.post.fbInstallApp'] = {
                  endpoint: fbInstallApp,
                  method: 'post'
            };

            serviceList['bt.post.disableLanguage'] = {
                  endpoint : disableLanguage,
                  method   : 'post'
            };

            serviceList['bt.post.defaultLanguage'] = {
                  endpoint : defaultLanguage,
                  method   : 'post'
            };

            serviceList['bt.post.reEnableLanguage'] = {
                  endpoint : reEnableLanguage,
                  method   : 'post'
            };

            serviceList['bt.put.upgradeUniversalBot'] = {
                  endpoint : upgradeUniversalBot,
                  method   : 'put'
            };

           serviceList['bt.get.linkbot'] = {
                  endpoint : getLinkBot,
                  method   : 'get'
            };

            serviceList['bt.post.addTrainingData'] = {
                  endpoint : addTrainingData,
                  method : 'post'
            };

            serviceList['bt.get.searchText'] = {
                  endpoint : searchText,
                  method   :  'get'
            };

            serviceList['bt.get.paginateTrainingData'] = {
                  endpoint : paginateTrainingData,
                  method   : 'get'
            };
            serviceList['bt.post.disableLanguage'] = {
                  endpoint : disableLanguage,
                  method   : 'post'
            };

            serviceList['bt.post.defaultLanguage'] = {
                  endpoint : defaultLanguage,
                  method   : 'post'
            };

            serviceList['bt.post.reEnableLanguage'] = {
                  endpoint : reEnableLanguage,
                  method   : 'post'
            };
            // DaaS
            serviceList['bt.get.daasTables'] = {
                endpoint : daasTables,
                method   : 'get'
            };
            serviceList['bt.get.daasViews'] = {
                endpoint : daasViews,
                method   : 'get'
            };
            serviceList['bt.saveServiceNode.insert'] = {
                endpoint : saveServiceNode,
                method   : 'put'
            };
            serviceList['bt.daasSaveServiceNode'] = {
                endpoint : saveServiceNode,
                method   : 'put'
            };
            serviceList['bt.saveServiceNode.delete'] = {
                endpoint : saveServiceNode,
                method   : 'put'
            };
            serviceList['bt.saveServiceNode.get'] = {
                endpoint : saveServiceNode,
                method   : 'put'
            };

            serviceList['bt.put.updateTriggerPhrase'] = {
                  endpoint : updateTriggerPhaseSetting,
                  method   : 'put'
            };

            serviceList['bt.post.createVersion'] = {
                  endpoint : createVersion,
                  method   : "post"
            };

            serviceList['bt.get.botVersion'] = {
                  endpoint : getVersion,
                  method   : "get"
            };

             serviceList['bt.get.botVersionDateRange'] = {
                  endpoint : getVersionDateRange,
                  method   : "get"
            };

            serviceList['bt.delete.deleteBotVersion'] = {
                  endpoint : deleteBotVersion,
                  method   : "delete"
            };

            serviceList['bt.post.exportBotVersion'] = {
                  endpoint : exportBotVersion,
                  method   : "post"
            };

            serviceList['bt.post.restoreBotVersion'] = {
                  endpoint : restoreBotVersion,
                  method   : "post"
            };

            serviceList['bt.post.versionStatus'] = {
                  endpoint : versionStatus,
                  method   : "post"
            };

            serviceList['bt.get.restoreStatus'] = {
                  endpoint : restoreStatus,
                  method   : "get"
            };

            serviceList['bt.delete.deleteVersion'] = {
                  endpoint : deleteVersion,
                  method   : "delete"
            };

            serviceList['bt.get.exportStatusBotVersion'] = {
                  endpoint : exportStatusBotVersion,
                  method   : "get"
            };
            
            serviceList['bt.put.updateTriggerPhrase'] = {
                  endpoint : updateTriggerPhaseSetting,
                  method   : 'put'
            };

            serviceList['bt.post.autoPublish'] = {
                  endpoint : autoPublish,
                  method   : 'post'
            };

            serviceList['bt.get.nlpConfigurations'] = {
                  endpoint : advancedNlConfigs,
                  method   : 'get'
            };

            serviceList['bt.get.advancedNlConfigsByName'] = {
                endpoint : advancedNlConfigsByName,
                method   : 'get'
            };

            serviceList['bt.get.savedConfigurations'] = {
                  endpoint : savedConfigurations,
                  method   : 'get'
            };

            serviceList['sa.get.deploymentStatus'] = {
                endpoint : deploymentStatus,
                method   : 'get'
            };


            serviceList['bt.post.addConfiguration'] = {
                  endpoint : addConfiguration,
                  method : 'post'
            };

            serviceList['bt.delete.deleteConfiguration'] = {
                  endpoint : deleteConfiguration,
                  method   : 'delete'
            };

            serviceList['bt.put.editConfiguration'] = {
                  endpoint : editConfiguration,
                  method   : 'put'
            };

            serviceList['bt.get.getProcessApps'] = {
            	endpoint : getProcessApps,
                method   : 'get'
            };
            serviceList['bt.post.createCustomModel'] = {
                endpoint : customModel,
                method   : 'post'
            };

            serviceList['bt.delete.deleteDialogIntentModel'] = {
                endpoint : customModel + '/:customModelParamID',
                method   : 'delete'
            };

            serviceList['bt.put.updateCustomModel'] = {
                endpoint : customModel + '/:customModelParamID',
                method   : 'put'
            };

            serviceList['bt.put.botConfigurations'] = {
                  endpoint : updateBotConfigurations,
                  method   : 'put'
            };

            serviceList['bt.get.getConfigurations'] = {
                  endpoint : getConfigurations,
                  method   : 'get'
            };

            serviceList['bt.get.plans'] = {
                endpoint : getPlans,
                method   : 'get'
            };

            serviceList['bt.put.planChange'] = {
                endpoint : planChange,
                method   : 'put'
            };

            serviceList['bt.get.planValidate'] = {
                endpoint : planValidate,
                method   : 'get'
            };
            
            serviceList['bt.publish.payment'] = {
                endpoint : planCheckout,
                method   : 'post'
            };

            serviceList['bt.plan.paymentstatus'] = {
                endpoint : paymentstatus,
                method   : 'get'
            };
            
            serviceList['bt.cancel.planSub'] = {
                endpoint : cancelPlanSub,
                method   : 'get'
            };

            serviceList['bt.autorecharge.payasyougo'] = {
                endpoint : planAutoRecharge,
                method   : 'put'
            };

            serviceList['bt.get.planvalidation'] = {
                endpoint : planValidation,
                method   : 'get'
            };
            serviceList['bt.get.billingSession'] = {
                endpoint : getBillingsession,
                method   : 'get'
            };
            serviceList['bt.download.billingSession'] = {
                endpoint : downloadBillingsession,
                method   : 'get'
            };
            serviceList['bt.get.invoices'] = {
                endpoint : getInvoices,
                method   : 'get'
            };
            serviceList['bt.get.getSupportPlans'] = {
                endpoint : getSupportPlans,
                method   : 'get'
            };
            serviceList['bt.post.supportPlanChange'] = {
                endpoint : supportPlanChange,
                method   : 'post'
            };
            serviceList['bt.post.supportPlanCancel'] = {
                endpoint : supportPlanCancel,
                method   : 'post'
            };
            serviceList['bt.get.supportPlanValidate'] = {
                endpoint : supportPlanValidate,
                method   : 'get'
            };
            serviceList['bt.put.pinmenus'] = {
                endpoint : pinMenuComponents,
                method   : 'put'
            };
            serviceList['bt.get.pinmenus'] = {
                endpoint : pinMenuComponents,
                method   : 'get'
            };
            serviceList['bt.coversationTesting.createtestcase'] = {
                endpoint : createtestcase,
                method   : 'post'
            };
            serviceList['bt.coversationTesting.clonetestcase'] = {
                endpoint : clonetestcase,
                method   : 'post'
            };
            serviceList['bt.coversationTesting.deletetestcase'] = {
                endpoint : deletetestcase,
                method   : 'delete'
            };
            serviceList['bt.coversationTesting.recentTags'] = {
                endpoint : recentTags,
                method   : 'get'
            };
            serviceList['bt.coversationTesting.runtestcases'] = {
                endpoint : runtestcases,
                method   : 'put'
            };
            serviceList['bt.getscenes'] = {
                endpoint : scenes,
                method   : 'get'
            };
            serviceList['bt.importScene'] = {
                endpoint : sceneImport,
                method   : 'post'
            };
            serviceList['bt.exportScene'] = {
                endpoint : sceneExport,
                method   : 'post'
            };
            serviceList['bt.resetShareURL']={
                endpoint :resetShareURL,
                method : 'put'
            };
            serviceList['bt.updateScene']={
                endpoint :updateScene,
                method : 'put'
            };
            serviceList['bt.createScene'] = {
                endpoint : scenes,
                method   : 'post'
            };
            serviceList['bt.deleteScene'] = {
                endpoint : scenes + "/:sceneId",
                method   : 'delete'
            };
            serviceList['bt.cloneScene'] = {
                endpoint : scenes + "/:sceneId/duplicate",
                method   : 'post'
            };
            serviceList['bt.editScene'] = {
                endpoint : scenes + "/:sceneId",
                method   : 'put'
            };

            // Translation engine apis //
             serviceList['get.allTranslationengines'] = {
                endpoint: translationEngine,
                method: 'get'
              };
          
             serviceList['create.translationEngine'] = {
                endpoint:translationEngine,
                method: 'post'
              };
             serviceList['edit.translationEngine'] = {
                endpoint: editTranslations,
                method: 'put'
              };
             serviceList['get.translationEngine'] = {
                endpoint: getTranslationEngineDetails,
                method: 'get'
              };
             serviceList['delete.translationEngine'] = {
                endpoint: deleteTranslations,
                method: 'delete'
              };
            // Translation engine apis //

            _exports.serviceList = serviceList;

            _exports.baseUrl = API_SERVER_URL;


            _exports.apiPreFix = API_URL_PREFIX;

            _exports.urlWithVersion = API_SERVER_URL + API_URL_PREFIX;

            Object.freeze(_exports);

            return _exports;

        }]);

})(angular);


;(function(ng) {

	angular.module('app.helpers')
	.factory('env_conf',['$window','$location',function($window,$location){

		var _env_ = $window.localStorage._env_ || 'prod';

		var dev_kore = {
			'API_SERVER_URL':"https://koreapps.com",
			'components-source':"http://localhost:8001/",
			'worker-url':"/js/worker/koreuxworker.js",
			'speech-worker-url': "/js/worker/recorderWorker.js",
			'js-validator-worker': "/js/worker/jsValidatorWorker.js",
			'assets-url':'/assets/',
            'context-url':'',
			'redirects' : {
				'success' : 'http://localhost:8001/views/succ-redirect.html'
			},
			'version' : '1.1',
                        'app-version':'1.0.0.0'
		};

		var dev_bots = {
			'API_SERVER_URL':window.appConfig.API_SERVER_URL,
			'components-source':"http://dev.kore.com:8001/",
			'worker-url':"/js/worker/koreuxworker.js",
			'speech-worker-url': "/js/worker/recorderWorker.js",
			'js-validator-worker': "/js/worker/jsValidatorWorker.js",
			'assets-url':'/assets/',
            'context-url':'',
			'redirects' : {
				'success' : 'http://localhost:8001/views/succ-redirect.html'
			},
			'version' : '1.1'
		};

		var qabots = {
			'API_SERVER_URL':"https://qa-bots.kore.ai",
			'components-source':"http://localhost:8001/",
			'worker-url':"/js/worker/koreuxworker.js",
			'speech-worker-url': "/js/worker/recorderWorker.js",
			'js-validator-worker': "/js/worker/jsValidatorWorker.js",
			'assets-url':'/assets/',
            'context-url':'',
			'redirects' : {
				'success' : 'http://localhost:8001/views/succ-redirect.html'
			},
			'version' : '1.1'
		};

		var qa1bots = {
			'API_SERVER_URL':"https://qa1-bots.kore.ai",
			'components-source':"http://localhost:8001/",
			'worker-url':"/js/worker/koreuxworker.js",
			'speech-worker-url': "/js/worker/recorderWorker.js",
			'js-validator-worker': "/js/worker/jsValidatorWorker.js",
			'assets-url':'/assets/',
            'context-url':'',
			'redirects' : {
				'success' : 'http://localhost:8001/views/succ-redirect.html'
			},
			'version' : '1.1'
		};

		var botsInt = {
			'API_SERVER_URL':"https://bots-int.kore.net",
			'components-source':"http://localhost:8001/",
			'worker-url':"/js/worker/koreuxworker.js",
			'speech-worker-url': "/js/worker/recorderWorker.js",
			'js-validator-worker': "/js/worker/jsValidatorWorker.js",
			'assets-url':'/assets/',
            'context-url':'',
			'redirects' : {
				'success' : 'http://localhost:8001/views/succ-redirect.html'
			},
			'version' : '1.1'
		};

		var dev_msg = {
			'API_SERVER_URL':"https://message.kore.com",
			'components-source':"https://localhost:8001/",
			'worker-url':"/js/worker/koreuxworker.js",
			'speech-worker-url': "/js/worker/recorderWorker.js",
			'js-validator-worker': "/js/worker/jsValidatorWorker.js",
			'assets-url':'/assets/',
            'context-url':'',
			'redirects' : {
				'success' : 'https://localhost:8001/views/succ-redirect.html'
			},
			'version' : '1.1'
		};

		var dev_qa = {
			'API_SERVER_URL':"https://qa.kore.com",
			'components-source':"http://localhost:8001/",
			'worker-url':"/js/worker/koreuxworker.js",
			'speech-worker-url': "/js/worker/recorderWorker.js",
			'js-validator-worker': "/js/worker/jsValidatorWorker.js",
			'assets-url':'/assets/',
            'context-url':'',
			'redirects' : {
				'success' : 'http://localhost:8001/views/succ-redirect.html'
			},
			'version' : '1.1'
		};

		var dev_qa1 = {
			'API_SERVER_URL':"https://qa1.kore.com",
			'components-source':"http://localhost:8001/",
			'worker-url':"/js/worker/koreuxworker.js",
			'speech-worker-url': "/js/worker/recorderWorker.js",
			'js-validator-worker': "/js/worker/jsValidatorWorker.js",
			'assets-url':'/assets/',
            'context-url':'',
			'redirects' : {
				'success' : 'http://localhost:8001/views/succ-redirect.html'
			},
			'version' : '1.1'
		};

		var workflows = {
			'API_SERVER_URL':"https://workflows-bots.kore.com",
			'components-source':"http://localhost:8001/",
			'worker-url':"/js/worker/koreuxworker.js",
			'speech-worker-url': "/js/worker/recorderWorker.js",
			'js-validator-worker': "/js/worker/jsValidatorWorker.js",
			'assets-url':'/assets/',
            'context-url':'',
			'redirects' : {
				'success' : 'http://localhost:8001/views/succ-redirect.html'
			},
			'version' : '1.1'
		};

		var dev_local = {
			'API_SERVER_URL':"http://localhost",
			'components-source':"http://localhost:8001/",
			'worker-url':"/js/worker/koreuxworker.js",
			'speech-worker-url': "/js/worker/recorderWorker.js",
			'js-validator-worker': "/js/worker/jsValidatorWorker.js",
			'assets-url':'/assets/',
            'context-url':'',
			'redirects' : {
				'success' : 'http://localhost:8001/views/succ-redirect.html'
			},
			'version' : '1.1'
		};
                var _contextpath= window.appConfig.CONTEXT_PATH;

        //TEAM: DON'T CHANGE BELOW PROD CONFIGURATIONS        
		var prod = {
			'API_SERVER_URL':window.appConfig.API_SERVER_URL,
			'components-source':($location.protocol() + "://" +location.host+window.appConfig.CONTEXT_PATH+'/'),
			'assets-url':_contextpath+'/assets/',
			'worker-url':_contextpath+"/js/worker/koreuxworker.js",
                        'speech-worker-url': _contextpath+"/js/worker/recorderWorker.js",
                        'SDK_SPEECH_URL':window.appConfig.SDK_SPEECH_URL,
                        'context-url': _contextpath,
			'js-validator-worker':  _contextpath+"/js/worker/jsValidatorWorker.js",
			'redirects' : {
                            'success' : ($location.protocol() + "://" +$location.host()) +window.appConfig.CONTEXT_PATH+ '/views/succ-redirect.html'
			},
			'version' : '1.1'
		};

		var conf = {
			qa1bots   : qa1bots,
			dev_kore  : dev_kore,
			dev_local : dev_local,
			dev_msg   : dev_msg,
			dev_qa    : dev_qa,
			dev_qa1   : dev_qa1,
			dev_bots  : dev_bots,
			qabots    : qabots,
			workflows : workflows,
			botsInt   : botsInt,
			prod      : prod
		};

		return conf[_env_] ? conf[_env_] : conf['prod'];

	}]);

}(angular));

;(function (ng) {

    angular.module('app.helpers')
            .factory('geoLocationIds', ['env_conf', function (env_conf) {
                    /*
                     Values for markdownDisable:
                     ref:markdown-editor.js $scope.markdown.controls
                     -------------------------------------------
                     style,bold,italic,link,image,ordered,unordered,indent,line,variableKeys,preview
                     */
                    var geoIds = {
    "continents": {
        "6255147": "Asia",
        "6255146": "Africa",
        "6255149": "North America",
        "6255150": "South America",
        "6255152": "Antarctica",
        "6255148": "Europe",
        "6255151": "Oceania / Australia"
    },
    "countries": {
        "6255146": {
            "2589581": "Algeria",
            "3351879": "Angola",
            "2395170": "Benin",
            "933860": "Botswana",
            "2361809": "Burkina Faso",
            "433561": "Burundi",
            "3374766": "Cabo Verde",
            "2233387": "Cameroon",
            "239880": "Central African Republic",
            "2434508": "Chad",
            "921929": "Comoros",
            "2260494": "Congo",
            "203312": "DR Congo",
            "223816": "Djibouti",
            "357994": "Egypt",
            "2309096": "Equatorial Guinea",
            "338010": "Eritrea",
            "337996": "Ethiopia",
            "2400553": "Gabon",
            "2413451": "Gambia",
            "2300660": "Ghana",
            "2420477": "Guinea",
            "2372248": "Guinea-Bissau",
            "2287781": "Ivory Coast",
            "192950": "Kenya",
            "932692": "Lesotho",
            "2275384": "Liberia",
            "2215636": "Libya",
            "1062947": "Madagascar",
            "927384": "Malawi",
            "2453866": "Mali",
            "2378080": "Mauritania",
            "934292": "Mauritius",
            "2542007": "Morocco",
            "1036973": "Mozambique",
            "3355338": "Namibia",
            "2440476": "Niger",
            "2328926": "Nigeria",
            "49518": "Rwanda",
            "2245662": "Senegal",
            "241170": "Seychelles",
            "2403846": "Sierra Leone",
            "51537": "Somalia",
            "953987": "South Africa",
            "7909807": "South Sudan",
            "366755": "Sudan",
            "934841": "Swaziland",
            "2410758": "São Tomé and Príncipe",
            "149590": "Tanzania",
            "2363686": "Togo",
            "2464461": "Tunisia",
            "226074": "Uganda",
            "895949": "Zambia",
            "878675": "Zimbabwe",
            "1024031": "Mayotte",
            "935317": "Réunion",
            "3370751": "Saint Helena",
            "2461445": "Western Sahara"
        },
        "6255152": {
            "3371123": "Bouvet Island",
            "1547314": "Heard Island and McDonald Islands",
            "3474415": "South Georgia and South Sandwich Islands",
            "1546748": "French Southern Territories",
            "6697173": "Antarctica"
        },
        "6255147": {
            "1149361": "Afghanistan",
            "174982": "Armenia",
            "587116": "Azerbaijan",
            "290291": "Bahrain",
            "1210997": "Bangladesh",
            "1252634": "Bhutan",
            "1820814": "Brunei",
            "1831722": "Cambodia",
            "1814991": "China",
            "614540": "Georgia",
            "1269750": "India",
            "1643084": "Indonesia",
            "130758": "Iran",
            "99237": "Iraq",
            "294640": "Israel",
            "1861060": "Japan",
            "248816": "Jordan",
            "1522867": "Kazakhstan",
            "285570": "Kuwait",
            "1527747": "Kyrgyzstan",
            "1655842": "Laos",
            "272103": "Lebanon",
            "1733045": "Malaysia",
            "1282028": "Maldives",
            "2029969": "Mongolia",
            "1327865": "Myanmar [Burma]",
            "1282988": "Nepal",
            "1873107": "North Korea",
            "286963": "Oman",
            "1168579": "Pakistan",
            "1694008": "Philippines",
            "289688": "Qatar",
            "102358": "Saudi Arabia",
            "1880251": "Singapore",
            "1835841": "South Korea",
            "1227603": "Sri Lanka",
            "163843": "Syria",
            "1668284": "Taiwan",
            "1220409": "Tajikistan",
            "1605651": "Thailand",
            "298795": "Turkey",
            "1218197": "Turkmenistan",
            "290557": "United Arab Emirates",
            "1512440": "Uzbekistan",
            "1562822": "Vietnam",
            "69543": "Yemen",
            "1282588": "British Indian Ocean Territory",
            "1547376": "Cocos [Keeling] Islands",
            "1819730": "Hong Kong",
            "1821275": "Macao",
            "6254930": "Palestine"
        },
        "6255148": {
            "783754": "Albania",
            "3041565": "Andorra",
            "2782113": "Austria",
            "630336": "Belarus",
            "2802361": "Belgium",
            "3277605": "Bosnia and Herzegovina",
            "732800": "Bulgaria",
            "3202326": "Croatia",
            "146669": "Cyprus",
            "3077311": "Czechia",
            "2623032": "Denmark",
            "453733": "Estonia",
            "660013": "Finland",
            "3017382": "France",
            "2921044": "Germany",
            "390903": "Greece",
            "719819": "Hungary",
            "2629691": "Iceland",
            "2963597": "Ireland",
            "3175395": "Italy",
            "831053": "Kosovo",
            "458258": "Latvia",
            "3042058": "Liechtenstein",
            "597427": "Lithuania",
            "2960313": "Luxembourg",
            "718075": "Macedonia",
            "2562770": "Malta",
            "617790": "Moldova",
            "2993457": "Monaco",
            "3194884": "Montenegro",
            "2750405": "Netherlands",
            "3144096": "Norway",
            "798544": "Poland",
            "2264397": "Portugal",
            "798549": "Romania",
            "2017370": "Russia",
            "3168068": "San Marino",
            "6290252": "Serbia",
            "3057568": "Slovakia",
            "3190538": "Slovenia",
            "2510769": "Spain",
            "2661886": "Sweden",
            "2658434": "Switzerland",
            "690791": "Ukraine",
            "2635167": "United Kingdom",
            "3164670": "Vatican City",
            "2622320": "Faroe Islands",
            "2411586": "Gibraltar",
            "661882": "Åland",
            "607072": "Svalbard and Jan Mayen"
        },
        "6255149": {
            "3576396": "Antigua and Barbuda",
            "3572887": "Bahamas",
            "3374084": "Barbados",
            "3582678": "Belize",
            "6251999": "Canada",
            "3624060": "Costa Rica",
            "3562981": "Cuba",
            "3575830": "Dominica",
            "3508796": "Dominican Republic",
            "3585968": "El Salvador",
            "3580239": "Grenada",
            "3595528": "Guatemala",
            "3723988": "Haiti",
            "3608932": "Honduras",
            "3489940": "Jamaica",
            "3996063": "Mexico",
            "3617476": "Nicaragua",
            "3703430": "Panama",
            "3576468": "Saint Lucia",
            "3575174": "St Kitts and Nevis",
            "3577815": "St Vincent and Grenadines",
            "3573591": "Trinidad and Tobago",
            "6252001": "United States",
            "3573511": "Anguilla",
            "3573345": "Bermuda",
            "3577718": "British Virgin Islands",
            "3580718": "Cayman Islands",
            "3425505": "Greenland",
            "3579143": "Guadeloupe",
            "3570311": "Martinique",
            "3578097": "Montserrat",
            "4566966": "Puerto Rico",
            "3424932": "Saint Pierre and Miquelon",
            "3576916": "Turks and Caicos Islands",
            "4796775": "U.S. Virgin Islands",
            "3577279": "Aruba",
            "7626844": "Bonaire, Sint Eustatius, and Saba",
            "7626836": "Curaçao",
            "3578476": "Saint Barthélemy",
            "3578421": "Saint Martin",
            "7609695": "Sint Maarten"
        },
        "6255151": {
            "2077456": "Australia",
            "2205218": "Fiji",
            "4030945": "Kiribati",
            "2110425": "Nauru",
            "2186224": "New Zealand",
            "2088628": "Papua New Guinea",
            "4034894": "Samoa",
            "2103350": "Solomon Islands",
            "1966436": "Timor-Leste",
            "4032283": "Tonga",
            "2110297": "Tuvalu",
            "2134431": "Vanuatu",
            "2078138": "Christmas Island",
            "4030656": "French Polynesia",
            "4043988": "Guam",
            "2139685": "New Caledonia",
            "2155115": "Norfolk Island",
            "4041468": "Northern Mariana Islands",
            "4030699": "Pitcairn Islands",
            "4031074": "Tokelau",
            "5854968": "U.S. Minor Outlying Islands",
            "4034749": "Wallis and Futuna",
            "2080185": "Marshall Islands",
            "2081918": "Micronesia",
            "1559582": "Palau",
            "1899402": "Cook Islands",
            "4036232": "Niue",
            "5880801": "American Samoa",
            "2170371": "Coral Sea Islands Territory",
            "8335033": "Jervis Bay Territory",
            "2077507": "Territory of Ashmore and Cartier Islands"
        },
        "6255150": {
            "3865483": "Argentina",
            "3923057": "Bolivia",
            "3469034": "Brazil",
            "3895114": "Chile",
            "3686110": "Colombia",
            "3658394": "Ecuador",
            "3378535": "Guyana",
            "3437598": "Paraguay",
            "3932488": "Peru",
            "3382998": "Suriname",
            "3439705": "Uruguay",
            "3625428": "Venezuela",
            "3474414": "Falkland Islands",
            "3381670": "French Guiana"
        }
    },
    "states": {
        "49518": {
            "6413337": "Eastern Province",
            "6413338": "Kigali",
            "6413339": "Northern Province",
            "6413340": "Western Province",
            "6413341": "Southern Province"
        },
        "51537": {
            "50360": "Woqooyi Galbeed",
            "51230": "Togdheer",
            "51966": "Lower Shabeelle",
            "51967": "Middle Shabele",
            "52187": "Sanaag",
            "53477": "Nugaal",
            "53707": "Mudug",
            "56083": "Lower Juba",
            "56084": "Middle Juba",
            "57060": "Hiiraan",
            "58802": "Gedo",
            "59362": "Galguduud",
            "64538": "Bay",
            "64661": "Bari",
            "64833": "Banaadir",
            "64982": "Bakool",
            "6268943": "Awdal",
            "6268947": "Sool"
        },
        "69543": {
            "70222": "Ta'izz",
            "70935": "Shabwah",
            "71132": "Sanaa",
            "71333": "Şa ' dah",
            "71532": "Raymah",
            "72966": "Ma'rib",
            "73200": "Al Maḩwīt",
            "74222": "Al Jawf",
            "75411": "Muḩāfaz̧at Ḩaḑramawt",
            "76183": "Dhamār",
            "78985": "Al Mahrah",
            "79416": "Al Hudaydah",
            "79838": "Al Bayda Governorate",
            "80412": "Aden",
            "80425": "Abyan",
            "6201193": "Aḑ Ḑāli",
            "6201194": "Omran",
            "6201195": "Ḩajjah",
            "6201196": "Ibb",
            "6201197": "Laḩij",
            "6940571": "Amanat Al Asimah",
            "9645387": "Soqatra"
        },
        "99237": {
            "89341": "Basra",
            "89693": "Wāsiţ",
            "91695": "Salah ad Din",
            "92877": "Nīnawá",
            "93540": "Maysan",
            "94823": "Karbalāʼ",
            "95445": "Arbīl",
            "96965": "Diyālá",
            "97019": "Dhi Qar",
            "97270": "Dahūk",
            "98180": "Baghdad",
            "98227": "Bābil",
            "98410": "Kirkuk",
            "98465": "As Sulaymānīyah",
            "98862": "An Najaf",
            "99022": "Al Qādisīyah",
            "99032": "Al Muthanná",
            "99592": "Anbar"
        },
        "102358": {
            "101627": "Tabuk",
            "103628": "Najran",
            "104514": "Makkah",
            "105298": "Jizan",
            "106280": "Ḩāʼil",
            "108179": "Asir",
            "108241": "Eastern Province",
            "108411": "Ar Riyāḑ",
            "108933": "Al-Qassim",
            "109224": "Al Madīnah al Munawwarah",
            "109470": "Al Jawf",
            "109579": "Northern Borders",
            "109954": "Al Bahah"
        },
        "130758": {
            "110791": "Tehrān",
            "111452": "Zanjan",
            "111821": "Yazd",
            "116401": "Semnān",
            "124544": "Māzandarān",
            "124763": "Markazi",
            "125605": "Lorestān",
            "126584": "Kordestān",
            "126878": "Kohgīlūyeh va Būyer Aḩmad",
            "127082": "Khuzestan",
            "128222": "Kermānshāh",
            "128231": "Kerman",
            "130801": "Īlām",
            "131222": "Hormozgan",
            "132142": "Hamadān",
            "133349": "Gīlān",
            "134766": "Fars",
            "139677": "Chaharmahal and Bakhtiari",
            "139816": "Bushehr",
            "142549": "East Azerbaijan",
            "142550": "Āz̄ārbāyjān-e Gharbī",
            "413931": "Ardabīl",
            "418862": "Isfahan",
            "443792": "Golestān",
            "443793": "Qazvīn",
            "443794": "Qom",
            "1159456": "Sistan and Baluchestan",
            "6201374": "Khorāsān-e Jonūbī",
            "6201375": "Razavi Khorasan",
            "6201376": "Khorāsān-e Shomālī",
            "7648907": "Alborz"
        },
        "146669": {
            "146213": "Pafos",
            "146267": "Nicosia",
            "146383": "Limassol",
            "146398": "Larnaka",
            "146411": "Keryneia",
            "146615": "Ammochostos"
        },
        "149590": {
            "148679": "Kagera",
            "148724": "Zanzibar Urban/West",
            "148725": "Zanzibar North",
            "148728": "Zanzibar Central/South",
            "149595": "Tanga",
            "149653": "Tabora",
            "149876": "Singida",
            "150004": "Shinyanga",
            "150442": "Rukwa",
            "150602": "Pwani",
            "150732": "Pemba South",
            "150733": "Pemba North",
            "152219": "Mwanza",
            "153214": "Morogoro",
            "154375": "Mbeya",
            "154775": "Mara",
            "155946": "Lindi",
            "157449": "Kilimanjaro",
            "157732": "Kigoma",
            "159067": "Iringa",
            "160192": "Dodoma",
            "160260": "Dar es Salaam",
            "161322": "Arusha",
            "435764": "Manyara",
            "877416": "Ruvuma",
            "877744": "Mtwara",
            "8469238": "Simiyu",
            "8469239": "Geita",
            "8469240": "Katavi",
            "8469241": "Njombe"
        },
        "163843": {
            "163342": "Tartus",
            "167541": "Dimashq",
            "169387": "Idlib",
            "169575": "Homs",
            "170015": "Hama",
            "170062": "Aleppo",
            "170652": "Rif-dimashq",
            "170792": "Deir ez-Zor",
            "170903": "Daraa",
            "172410": "As-Suwayda",
            "172957": "Ar-Raqqah",
            "173336": "Quneitra",
            "173578": "Latakia",
            "173813": "Al-Hasakah"
        },
        "174982": {
            "409313": "Ararat",
            "409314": "Syunik",
            "409315": "Vayots Dzor",
            "616051": "Yerevan",
            "828259": "Aragatsotn",
            "828260": "Armavir",
            "828261": "Gegharkunik",
            "828262": "Kotayk",
            "828263": "Lori",
            "828264": "Shirak",
            "828265": "Tavush"
        },
        "192950": {
            "178145": "West Pokot",
            "178440": "Wajir",
            "178837": "Uasin Gishu",
            "178914": "Turkana",
            "179068": "Trans Nzoia",
            "179380": "Tharaka - Nithi",
            "179585": "Tana River",
            "180320": "Siaya",
            "180782": "Samburu",
            "184742": "Nairobi Area",
            "185578": "Murang'A",
            "186298": "Mombasa",
            "186824": "Meru",
            "187583": "Marsabit",
            "187895": "Mandera",
            "189794": "Laikipia",
            "190106": "Kwale",
            "191037": "Kitui",
            "191242": "Kisumu",
            "191298": "Kisii",
            "191420": "Kirinyaga",
            "192064": "Kilifi",
            "192709": "Kiambu",
            "192898": "Kericho",
            "195271": "Kakamega",
            "196228": "Isiolo",
            "197744": "Garissa",
            "198474": "Embu",
            "199987": "Busia",
            "200066": "Bungoma",
            "200573": "Baringo",
            "7603036": "Nyandarua",
            "7667638": "Vihiga",
            "7667643": "Lamu",
            "7667644": "Machakos",
            "7667645": "Makueni",
            "7667646": "Elegeyo-Marakwet",
            "7667652": "Taita Taveta",
            "7667657": "Kajiado",
            "7667661": "Nyeri",
            "7667665": "Homa Bay",
            "7667666": "Bomet",
            "7667678": "Migori",
            "7668902": "Nakuru",
            "7668904": "Narok",
            "7806857": "Nyamira",
            "8051212": "Nandi"
        },
        "203312": {
            "204697": "Tshuapa",
            "204704": "Tshopo",
            "205253": "Tanganika",
            "205413": "South Kivu",
            "205828": "Sankuru",
            "206938": "Nord Kivu",
            "208741": "Mongala",
            "209610": "Maniema",
            "210596": "Kasaï-Central",
            "214138": "Kasaï-Oriental",
            "214140": "Kasai",
            "215709": "Ituri",
            "216140": "Haut Uele",
            "216141": "Haut-Lomani",
            "216661": "Équateur",
            "219402": "Bas Uele",
            "922727": "Lualaba",
            "2313191": "Mai Ndombe",
            "2313847": "Kwilu",
            "2313860": "Kwango",
            "2314300": "Kinshasa",
            "2317277": "Bas-Congo",
            "11288213": "Haut-Katanga",
            "11288214": "Lomami",
            "11288215": "Nord-Ubangi",
            "11288216": "Sud-Ubangi"
        },
        "223816": {
            "220781": "Tadjourah",
            "221525": "Obock",
            "223818": "Djibouti",
            "223889": "Dikhil",
            "225282": "Ali Sabieh",
            "449265": "Arta"
        },
        "226074": {
            "234594": "Central Region",
            "8260673": "Eastern Region",
            "8260674": "Northern Region",
            "8260675": "Western Region"
        },
        "239880": {
            "236178": "Vakaga",
            "236887": "Ouaka",
            "237556": "Mbomou",
            "238639": "Haut-Mbomou",
            "238640": "Haute-Kotto",
            "240396": "Basse-Kotto",
            "240591": "Bamingui-Bangoran",
            "2383204": "Sangha-Mbaéré",
            "2383650": "Ouham-Pendé",
            "2383653": "Ouham",
            "2383765": "Ombella-M'Poko",
            "2384205": "Nana-Mambéré",
            "2385105": "Lobaye",
            "2385836": "Kémo",
            "2386161": "Mambéré-Kadéï",
            "2386243": "Nana-Grébizi",
            "2596686": "Bangui"
        },
        "241170": {
            "241151": "Takamaka",
            "241181": "Saint Louis",
            "241215": "Port Glaud",
            "241221": "Pointe Larue",
            "241224": "Plaisance",
            "241251": "Mont Fleuri",
            "241252": "Mont Buxton",
            "241302": "English River",
            "241311": "Inner Islands",
            "241330": "Grand Anse Mahe",
            "241331": "Grand Anse Praslin",
            "241336": "Glacis",
            "241396": "Cascade",
            "241424": "Bel Ombre",
            "241426": "Bel Air",
            "241428": "Beau Vallon",
            "241438": "Baie Sainte Anne",
            "241439": "Baie Lazare",
            "241444": "Anse Royale",
            "241447": "Anse Etoile",
            "241449": "Anse Boileau",
            "241450": "Anse-aux-Pins",
            "448408": "Les Mamelles",
            "448409": "Roche Caiman",
            "448410": "Au Cap"
        },
        "248816": {
            "248380": "Ma'an",
            "248944": "Irbid",
            "250092": "Zarqa",
            "250199": "Tafielah",
            "250439": "Amman",
            "250583": "Mafraq",
            "250625": "Karak",
            "250751": "Balqa",
            "443120": "Ajlun",
            "443121": "Jerash",
            "443122": "Aqaba",
            "443123": "Madaba"
        },
        "272103": {
            "273607": "Mont-Liban",
            "276780": "Beyrouth",
            "278297": "Liban-Nord",
            "279894": "South Governorate",
            "280282": "Béqaa",
            "444191": "Nabatîyé",
            "6201370": "Aakkâr",
            "6201371": "Baalbek-Hermel"
        },
        "285570": {
            "285628": "Hawalli",
            "285788": "Al Asimah",
            "285798": "Al Jahrāʼ",
            "285816": "Al Farwaniyah",
            "285841": "Al Aḩmadī",
            "7733358": "Mubārak al Kabīr"
        },
        "286963": {
            "411735": "Ad Dakhiliyah",
            "411736": "Al Batinah South",
            "411737": "Al Wusţá",
            "411738": "Southeastern Governorate",
            "411739": "Az̧ Z̧āhirah",
            "411740": "Muscat",
            "411741": "Musandam",
            "411742": "Dhofar",
            "7110710": "Al Buraimi",
            "8394433": "Northeastern Governorate",
            "8394434": "Al Batinah North"
        },
        "289688": {
            "389462": "Madīnat ash Shamāl",
            "389465": "Al Khawr",
            "389467": "Baladīyat Umm Şalāl",
            "389469": "Baladīyat ar Rayyān",
            "389470": "Baladīyat ad Dawḩah",
            "389472": "Al Wakrah",
            "8030540": "Baladīyat az̧ Z̧a ' āyin"
        },
        "290291": {
            "290333": "Muharraq",
            "7090954": "Manama",
            "7090972": "Southern Governorate",
            "7090974": "Northern"
        },
        "290557": {
            "290595": "Umm al Qaywayn",
            "291075": "Raʼs al Khaymah",
            "292224": "Dubai",
            "292673": "Ash Shāriqah",
            "292879": "Al Fujayrah",
            "292933": "Ajman",
            "292969": "Abu Dhabi"
        },
        "294640": {
            "293198": "Jerusalem",
            "293396": "Tel Aviv",
            "294800": "Haifa",
            "294824": "Northern District",
            "294904": "Central District",
            "294952": "Southern District"
        },
        "298795": {
            "296560": "Yozgat",
            "298113": "Van",
            "298298": "Uşak",
            "298332": "Şanlıurfa",
            "298845": "Tunceli",
            "300617": "Sivas",
            "300821": "Siirt",
            "303826": "Niğde",
            "303830": "Nevşehir",
            "304041": "Muş",
            "304183": "Muğla",
            "304794": "Mardin",
            "304825": "Manisa",
            "304919": "Malatya",
            "305267": "Kütahya",
            "306569": "Konya",
            "307513": "Kırşehir",
            "308463": "Kayseri",
            "310858": "Kahramanmaraş",
            "311044": "İzmir",
            "311071": "Isparta",
            "311728": "Mersin",
            "312394": "Hatay",
            "312888": "Hakkâri",
            "314829": "Gaziantep",
            "315201": "Eskişehir",
            "315367": "Erzurum",
            "315372": "Erzincan",
            "315807": "Elazığ",
            "316540": "Diyarbakır",
            "317106": "Denizli",
            "320390": "Burdur",
            "321022": "Bitlis",
            "321079": "Bingöl",
            "321122": "Bilecik",
            "322164": "Balıkesir",
            "322819": "Aydın",
            "323776": "Antalya",
            "323784": "Ankara",
            "325163": "Ağrı",
            "325302": "Afyonkarahisar",
            "325329": "Adıyaman",
            "325361": "Adana",
            "443183": "Osmaniye",
            "443184": "Iğdır",
            "443185": "Aksaray",
            "443186": "Batman",
            "443187": "Karaman",
            "443188": "Kırıkkale",
            "443189": "Şırnak",
            "443213": "Kilis",
            "737021": "Zonguldak",
            "738647": "Trabzon",
            "738742": "Tokat",
            "738926": "Tekirdağ",
            "739598": "Sinop",
            "740263": "Samsun",
            "740352": "Sakarya",
            "740481": "Rize",
            "741098": "Ordu",
            "742865": "Kocaeli",
            "743165": "Kırklareli",
            "743881": "Kastamonu",
            "743942": "Kars",
            "745042": "Istanbul",
            "746423": "Gümüşhane",
            "746878": "Giresun",
            "747711": "Edirne",
            "748877": "Çorum",
            "749747": "Çankırı",
            "749778": "Canakkale",
            "750268": "Bursa",
            "750510": "Bolu",
            "751816": "Artvin",
            "752014": "Amasya",
            "862467": "Bartın",
            "862468": "Karabük",
            "862469": "Yalova",
            "862470": "Ardahan",
            "862471": "Bayburt",
            "865521": "Düzce"
        },
        "337996": {
            "444178": "Addis Ababa",
            "444179": "Āfar",
            "444180": "Amhara",
            "444181": "Bīnshangul Gumuz",
            "444182": "Dire Dawa",
            "444183": "Gambela",
            "444184": "Harari",
            "444185": "Oromiya",
            "444186": "Somali",
            "444187": "Tigray",
            "444188": "SNNPR"
        },
        "338010": {
            "448497": "Anseba",
            "448498": "Debub",
            "448499": "Southern Red Sea",
            "448500": "Gash-Barka",
            "448501": "Maekel",
            "448502": "Northern Red Sea"
        },
        "357994": {
            "347794": "Sohag",
            "349401": "North Sinai",
            "350546": "Qena",
            "352603": "Matruh",
            "354500": "Kafr el-Sheikh",
            "355182": "South Sinai",
            "358044": "Damietta",
            "358617": "Port Said",
            "359171": "Beni Suweif",
            "359781": "Asyut",
            "359787": "Aswan",
            "359797": "Suez",
            "360016": "Sharqia",
            "360483": "New Valley",
            "360621": "Qalyubia",
            "360631": "Cairo",
            "360688": "Minya",
            "360689": "Monufia",
            "360997": "Giza",
            "361056": "Ismailia",
            "361059": "Alexandria",
            "361294": "Gharbia",
            "361323": "Faiyum",
            "361370": "Beheira",
            "361468": "Red Sea",
            "361849": "Dakahlia",
            "7603259": "Luxor"
        },
        "366755": {
            "378389": "Northern State",
            "379253": "Khartoum",
            "408646": "Red Sea",
            "408648": "Al Jazīrah",
            "408649": "Al Qaḑārif",
            "408653": "White Nile",
            "408654": "Blue Nile",
            "408658": "Western Darfur",
            "408659": "West Kordofan State",
            "408660": "Southern Darfur",
            "408661": "Southern Kordofan",
            "408663": "Kassala",
            "408664": "River Nile",
            "408666": "Northern Darfur",
            "408667": "North Kordofan",
            "408669": "Sinnār",
            "8394435": "Eastern Darfur",
            "8394436": "Central Darfur"
        },
        "390903": {
            "736572": "Mount Athos",
            "6692632": "Attica",
            "6697800": "Central Greece",
            "6697801": "Central Macedonia",
            "6697802": "Crete",
            "6697803": "East Macedonia and Thrace",
            "6697804": "Epirus",
            "6697805": "Ionian Islands",
            "6697806": "North Aegean",
            "6697807": "Peloponnese",
            "6697808": "South Aegean",
            "6697809": "Thessaly",
            "6697810": "West Greece",
            "6697811": "West Macedonia"
        },
        "433561": {
            "422233": "Makamba",
            "423327": "Bururi",
            "425550": "Muramvya",
            "426271": "Gitega",
            "426699": "Ruyigi",
            "427700": "Cankuzo",
            "428218": "Karuzi",
            "428514": "Bubanza",
            "430020": "Cibitoke",
            "430567": "Ngozi",
            "430951": "Kayanza",
            "431747": "Muyinga",
            "432455": "Kirundo",
            "434147": "Rutana",
            "434386": "Mwaro",
            "7303939": "Bujumbura Mairie",
            "7303940": "Bujumbura Rural",
            "11184798": "Rumonge"
        },
        "453733": {
            "587448": "Võrumaa",
            "587590": "Viljandimaa",
            "587875": "Valgamaa",
            "588334": "Tartu",
            "588879": "Saare",
            "589115": "Raplamaa",
            "589373": "Põlvamaa",
            "589576": "Pärnumaa",
            "590854": "Lääne-Virumaa",
            "590856": "Lääne",
            "591901": "Jõgevamaa",
            "591961": "Järvamaa",
            "592075": "Ida-Virumaa",
            "592133": "Hiiumaa",
            "592170": "Harjumaa"
        },
        "458258": {
            "454307": "Ventspils Rajons",
            "454311": "Ventspils",
            "454564": "Valmieras Rajons",
            "454571": "Valkas Rajons",
            "454771": "Tukuma Rajons",
            "454968": "Talsu Rajons",
            "455888": "Saldus Rajons",
            "456173": "Riga",
            "456197": "Rēzeknes Rajons",
            "456203": "Rēzekne",
            "456528": "Preiļu Rajons",
            "457061": "Ogre",
            "457712": "Madonas Rajons",
            "457773": "Ludzas Rajons",
            "457889": "Limbažu Rajons",
            "457955": "Liepāja",
            "458459": "Kuldīgas Rajons",
            "458621": "Krāslavas Rajons",
            "459202": "Jūrmala",
            "459278": "Jelgavas Rajons",
            "459281": "Jelgava",
            "459282": "Jēkabpils Municipality",
            "459664": "Gulbenes Rajons",
            "460311": "Dobeles Rajons",
            "460410": "Daugavpils municipality",
            "460414": "Daugavpils",
            "460569": "Cēsu Rajons",
            "461112": "Bauskas Rajons",
            "461160": "Balvu Rajons",
            "461525": "Alūksnes Novads",
            "461613": "Aizkraukles Rajons",
            "7628298": "Dundaga",
            "7628299": "Alsunga",
            "7628300": "Pāvilostas",
            "7628301": "Nīca",
            "7628302": "Rucavas",
            "7628303": "Grobiņa",
            "7628304": "Durbe",
            "7628305": "Aizpute",
            "7628306": "Priekule",
            "7628307": "Vaiņode",
            "7628308": "Skrunda",
            "7628309": "Brocēni",
            "7628310": "Rojas",
            "7628311": "Kandava",
            "7628312": "Auces",
            "7628313": "Jaunpils",
            "7628314": "Engure",
            "7628315": "Tērvete",
            "7628316": "Ozolnieku",
            "7628317": "Rundāles",
            "7628318": "Babīte",
            "7628319": "Mārupe",
            "7628320": "Olaine",
            "7628321": "Lecava",
            "7628322": "Ķekava",
            "7628323": "Salaspils",
            "7628324": "Baldone",
            "7628325": "Stopiņi",
            "7628326": "Carnikava",
            "7628327": "Ādaži",
            "7628328": "Garkalne",
            "7628329": "Vecumnieki",
            "7628330": "Ķegums",
            "7628331": "Lielvārde",
            "7628332": "Skrīveri",
            "7628333": "Jaunjelgava",
            "7628334": "Nereta",
            "7628335": "Viesīte",
            "7628336": "Salas",
            "7628337": "Jēkabpils",
            "7628338": "Aknīste",
            "7628339": "Ilūkste",
            "7628340": "Vārkava",
            "7628341": "Līvāni",
            "7628342": "Varakļāni",
            "7628343": "Vilanu",
            "7628344": "Riebiņu",
            "7628345": "Aglona",
            "7628346": "Cibla",
            "7628347": "Zilupes",
            "7628348": "Viļaka",
            "7628349": "Baltinava",
            "7628350": "Dagda",
            "7628351": "Karsava",
            "7628352": "Rugāju",
            "7628353": "Cesvaine",
            "7628354": "Lubāna",
            "7628355": "Krustpils",
            "7628356": "Pļaviņu",
            "7628357": "Koknese",
            "7628358": "Ikšķile",
            "7628359": "Ropažu",
            "7628360": "Inčukalns",
            "7628361": "Krimulda",
            "7628362": "Sigulda",
            "7628363": "Līgatne",
            "7628364": "Mālpils",
            "7628365": "Sēja",
            "7628366": "Saulkrastu",
            "7628367": "Salacgrīvas",
            "7628368": "Aloja",
            "7628369": "Naukšēni",
            "7628370": "Rūjienas",
            "7628371": "Mazsalaca",
            "7628372": "Burtnieki",
            "7628373": "Pārgaujas",
            "7628374": "Kocēni",
            "7628375": "Amatas",
            "7628376": "Priekuļi",
            "7628377": "Raunas",
            "7628378": "Strenči",
            "7628379": "Beverīna",
            "7628380": "Smiltene",
            "7628381": "Jaunpiebalga",
            "7628382": "Ērgļi",
            "7628383": "Vecpiebalga",
            "7628384": "Apes",
            "8299767": "Mesraga"
        },
        "587116": {
            "146879": "Beyləqan",
            "146900": "Zǝngilan",
            "146962": "Yardımlı",
            "147163": "Şuşa",
            "147269": "Salyan",
            "147284": "Sabirabad",
            "147287": "Saatlı",
            "147310": "Bilǝsuvar",
            "147422": "Neftçala",
            "147435": "Nakhichevan",
            "147551": "Masally",
            "147610": "Lerik",
            "147613": "Lənkəran",
            "147626": "Laçın",
            "147694": "Qubadlı",
            "147983": "İmişli",
            "148107": "Füzuli",
            "148140": "Jabrayil",
            "148155": "Jalilabad",
            "148442": "Astara",
            "148449": "Xocalı",
            "148615": "Ağcabǝdi",
            "148617": "Ağdam",
            "409417": "Shirvan",
            "409418": "Lankaran Sahari",
            "409419": "Şuşa Şəhəri",
            "409420": "Tǝrtǝr",
            "409421": "Xankǝndi",
            "409423": "Khojavend",
            "584583": "Zərdab",
            "584604": "Zaqatala",
            "584650": "Yevlax",
            "584742": "Oğuz",
            "584783": "Ucar",
            "584861": "Tovuz",
            "585030": "Şamaxı",
            "585031": "Şǝki",
            "585059": "Şǝmkir",
            "585686": "Kürdǝmir",
            "585738": "Qǝbǝlǝ",
            "585749": "Qusar",
            "585786": "Quba",
            "585967": "Goygol Rayon",
            "586001": "Xaçmaz",
            "586047": "Kalbajar",
            "586087": "Qazax",
            "586112": "Goranboy",
            "586290": "Qǝx",
            "586320": "İsmayıllı",
            "586482": "Göyçay",
            "586725": "Shabran",
            "586771": "Daşkǝsǝn",
            "587010": "Balakǝn",
            "587056": "Bǝrdǝ",
            "587081": "Baki",
            "587245": "Abşeron",
            "587342": "Ağsu",
            "587376": "Ağdaş",
            "627535": "Gǝdǝbǝy",
            "828297": "Ağstafa",
            "828298": "Gǝncǝ",
            "828299": "Mingǝcevir",
            "828300": "Naftalan",
            "828301": "Qobustan",
            "828302": "Samux",
            "828303": "Shaki City",
            "828304": "Siyǝzǝn",
            "828305": "Sumqayit",
            "828306": "Xızı",
            "828307": "Yevlax City",
            "828315": "Hacıqabul",
            "8411069": "Nakhchivan"
        },
        "597427": {
            "864389": "Alytus",
            "864477": "Kaunas",
            "864478": "Klaipėda County",
            "864479": "Marijampolė County",
            "864480": "Panevėžys",
            "864481": "Siauliai",
            "864482": "Tauragė County",
            "864483": "Telsiai",
            "864484": "Utena",
            "864485": "Vilnius"
        },
        "607072": {
            "3041964": "Jan Mayen",
            "7521757": "Svalbard"
        },
        "614540": {
            "611716": "T'bilisi",
            "615929": "Ajaria",
            "865536": "Kvemo Kartli",
            "865537": "Kakheti",
            "865538": "Guria",
            "865539": "Imereti",
            "865540": "Shida Kartli",
            "865541": "Mtskheta-Mtianeti",
            "865542": "Racha-Lechkhumi and Kvemo Svaneti",
            "865543": "Samegrelo and Zemo Svaneti",
            "865544": "Samtskhe-Javakheti",
            "6643410": "Abkhazia"
        },
        "617790": {
            "617077": "Raionul Edineţ",
            "617181": "Ungheni",
            "617255": "Teleneşti",
            "617264": "Taraclia",
            "617283": "Ştefan-Vodă",
            "617301": "Strășeni",
            "617366": "Raionul Soroca",
            "617483": "Rîşcani",
            "617501": "Rezina",
            "617639": "Orhei",
            "617656": "Raionul Ocniţa",
            "617715": "Anenii Noi",
            "617754": "Nisporeni",
            "617903": "Leova",
            "617913": "Sîngerei",
            "617962": "Criuleni",
            "617991": "Ialoveni",
            "618069": "Chișinău Municipality",
            "618119": "Căuşeni",
            "618142": "Cantemir",
            "618162": "Călăraşi",
            "618164": "Cahul",
            "618260": "Glodeni",
            "618331": "Floreşti",
            "618345": "Făleşti",
            "618363": "Dubăsari",
            "618369": "Drochia",
            "618381": "Donduşeni",
            "618430": "Cimişlia",
            "618511": "Briceni",
            "618565": "Basarabeasca",
            "858803": "Hînceşti",
            "858808": "Şoldăneşti",
            "858889": "Stînga Nistrului",
            "858895": "Găgăuzia",
            "861487": "Bender Municipality",
            "873909": "Bălţi"
        },
        "630336": {
            "620134": "Vitebsk",
            "625073": "Mogilev",
            "625142": "Minsk",
            "625143": "Minsk City",
            "628035": "Grodnenskaya",
            "628281": "Gomel",
            "629631": "Brest"
        },
        "660013": {
            "830603": "Lapland",
            "830664": "Kainuu",
            "830667": "Northern Ostrobothnia",
            "830675": "Central Ostrobothnia",
            "830676": "Ostrobothnia",
            "830682": "Southern Ostrobothnia",
            "830685": "Central Finland",
            "830686": "North Karelia",
            "830690": "Northern Savo",
            "830695": "Southern Savonia",
            "830699": "South Karelia",
            "830703": "Kymenlaakso",
            "830704": "Pirkanmaa",
            "830705": "Tavastia Proper",
            "830708": "Finland Proper",
            "830709": "Uusimaa",
            "831040": "Päijänne Tavastia",
            "831041": "Satakunta"
        },
        "661882": {
            "9611689": "Mariehamns stad",
            "9611692": "Ålands landsbygd",
            "9611694": "Ålands skärgård"
        },
        "690791": {
            "686966": "Zhytomyr",
            "687699": "Zaporizhia",
            "687869": "Transcarpathia",
            "689064": "Volyn",
            "689559": "Vinnyts'ka",
            "691649": "Ternopil",
            "692196": "Sumy",
            "694422": "Gorod Sevastopol",
            "695592": "Rivne",
            "696634": "Poltava",
            "698738": "Odessa",
            "700567": "Mykolaiv",
            "702549": "Lviv",
            "702657": "Luhansk",
            "703446": "Kyiv",
            "703447": "Kyiv City",
            "703883": "Republic of Crimea",
            "705811": "Kropyvnytskyi",
            "706370": "Khmelnytskyi",
            "706442": "Kherson",
            "706482": "Kharkiv",
            "707470": "Ivano-Frankivsk",
            "709716": "Donetsk",
            "709929": "Dnipro",
            "710720": "Chernivtsi",
            "710734": "Chernihiv",
            "710802": "Cherkasy"
        },
        "718075": {
            "784732": "Valandovo",
            "786339": "Resen",
            "789090": "Kratovo",
            "862938": "Pehčevo",
            "862945": "Novo Selo",
            "862946": "Bosilovo",
            "862947": "Vasilevo",
            "862949": "Dojran",
            "862950": "Bogdanci",
            "862953": "Konče",
            "862956": "Makedonska Kamenica",
            "862958": "Zrnovci",
            "862960": "Karbinci",
            "862961": "Demir Kapija",
            "862973": "Rosoman",
            "862974": "Gradsko",
            "862975": "Lozovo",
            "862977": "Češinovo-Obleševo",
            "863468": "Novaci",
            "863485": "Berovo",
            "863486": "Bitola",
            "863488": "Mogila",
            "863831": "Aračinovo",
            "863834": "Bogovinje",
            "863835": "Brvenica",
            "863836": "Čair",
            "863838": "Čaška Municipality",
            "863840": "Centar",
            "863841": "Centar Župa",
            "863842": "Čučer-Sandevo",
            "863843": "Debar",
            "863844": "Delčevo",
            "863846": "Demir Hisar",
            "863849": "Dolneni",
            "863850": "Opstina Gjorce Petrov",
            "863851": "Drugovo",
            "863853": "Gazi Baba",
            "863854": "Gevgelija",
            "863855": "Gostivar",
            "863856": "Ilinden",
            "863858": "Jegunovce",
            "863860": "Karpoš",
            "863861": "Kavadarci",
            "863862": "Kičevo",
            "863863": "Kisela Voda",
            "863865": "Kočani",
            "863869": "Kriva Palanka",
            "863870": "Krivogaštani",
            "863871": "Kruševo",
            "863873": "Kumanovo",
            "863875": "Opstina Lipkovo",
            "863877": "Makedonski Brod",
            "863881": "Negotino",
            "863883": "Ohrid",
            "863885": "Oslomej",
            "863886": "Petrovec",
            "863887": "Plasnica",
            "863888": "Prilep",
            "863889": "Probištip",
            "863890": "Radoviš",
            "863891": "Opstina Rankovce",
            "863892": "Mavrovo and Rostuša",
            "863894": "Saraj",
            "863896": "Sopište",
            "863899": "Staro Nagoričane",
            "863900": "Štip",
            "863901": "Struga",
            "863902": "Strumica",
            "863903": "Studeničani",
            "863904": "Šuto Orizari",
            "863905": "Sveti Nikole",
            "863906": "Tearce",
            "863907": "Tetovo",
            "863909": "Veles",
            "863911": "Vevčani",
            "863912": "Vinica",
            "863913": "Vraneštica",
            "863914": "Vrapčište",
            "863917": "Zajas",
            "863918": "Zelenikovo",
            "863919": "Želino",
            "7056266": "Aerodrom",
            "7056269": "Butel",
            "7056271": "Debarca",
            "11398357": "Grad Skopje"
        },
        "719819": {
            "715593": "Szabolcs-Szatmár-Bereg",
            "719637": "Jász-Nagykun-Szolnok",
            "720002": "Heves",
            "720293": "Hajdú-Bihar",
            "721589": "Csongrád",
            "722064": "Borsod-Abaúj-Zemplén",
            "722433": "Bekes",
            "3042613": "Zala",
            "3042925": "Veszprém",
            "3043047": "Vas",
            "3043845": "Tolna",
            "3045226": "Somogy",
            "3046431": "Pest",
            "3047348": "Nógrád",
            "3049518": "Komárom-Esztergom",
            "3051977": "Győr-Moson-Sopron",
            "3053028": "Fejér",
            "3054638": "Budapest",
            "3055399": "Baranya",
            "3055744": "Bács-Kiskun"
        },
        "732800": {
            "453751": "Razgrad",
            "453753": "Montana",
            "725713": "Vratsa",
            "726051": "Varna",
            "726419": "Dobrich",
            "727012": "Sofia",
            "727524": "Ruse",
            "728194": "Plovdiv",
            "728204": "Pleven",
            "728331": "Pernik",
            "728379": "Pazardzhik",
            "729560": "Lovech",
            "730436": "Khaskovo",
            "731061": "Sofia-Capital",
            "732771": "Burgas",
            "733192": "Blagoevgrad",
            "864552": "Gabrovo",
            "864553": "Kŭrdzhali",
            "864554": "Kyustendil",
            "864555": "Shumen",
            "864556": "Silistra",
            "864557": "Sliven",
            "864558": "Smolyan",
            "864559": "Stara Zagora",
            "864560": "Tŭrgovishte",
            "864561": "Veliko Tŭrnovo",
            "864562": "Vidin",
            "864563": "Yambol"
        },
        "783754": {
            "865730": "Berat",
            "865731": "Dibër",
            "865732": "Elbasan",
            "865733": "Gjirokastër",
            "865734": "Korçë",
            "865735": "Kukës",
            "3344947": "Durrës",
            "3344948": "Fier",
            "3344949": "Lezhë",
            "3344950": "Shkodër",
            "3344951": "Tiranë",
            "3344952": "Vlorë"
        },
        "798544": {
            "858785": "Lublin",
            "858786": "Lesser Poland Voivodeship",
            "858787": "Mazovia",
            "858788": "Subcarpathian Voivodeship",
            "858789": "Podlasie",
            "858790": "Świętokrzyskie",
            "858791": "Warmia-Masuria",
            "3337492": "Lower Silesia",
            "3337493": "Łódź Voivodeship",
            "3337494": "Lubusz",
            "3337495": "Opole Voivodeship",
            "3337496": "Pomerania",
            "3337497": "Silesia",
            "3337498": "Greater Poland",
            "3337499": "West Pomerania",
            "3337500": "Kujawsko-Pomorskie"
        },
        "798549": {
            "662447": "Vrancea",
            "662892": "Vâlcea",
            "663116": "Vaslui",
            "664517": "Tulcea",
            "665091": "Timiş",
            "665283": "Teleorman",
            "665849": "Suceava",
            "667267": "Sibiu",
            "667869": "Satu Mare",
            "668248": "Sălaj",
            "669737": "Prahova",
            "671857": "Olt",
            "672460": "Neamţ",
            "672628": "Mureş",
            "673612": "Mehedinţi",
            "673887": "Maramureş",
            "675809": "Iaşi",
            "675848": "Ialomiţa",
            "675917": "Hunedoara",
            "676309": "Harghita",
            "676898": "Gorj",
            "677104": "Giurgiu",
            "677692": "Galaţi",
            "679134": "Dolj",
            "679385": "Dâmboviţa",
            "680428": "Covasna",
            "680962": "Constanța",
            "681291": "Cluj",
            "682714": "Caraş-Severin",
            "683016": "Călăraşi",
            "683121": "Buzău",
            "683504": "Bucureşti",
            "683843": "Braşov",
            "683901": "Brăila",
            "684038": "Botoşani",
            "684647": "Bistriţa-Năsăud",
            "684878": "Bihor",
            "685947": "Bacău",
            "686192": "Argeş",
            "686253": "Arad",
            "686581": "Alba",
            "865518": "Ilfov"
        },
        "831053": {
            "10096138": "Ferizaj",
            "10096859": "Gjakova",
            "10097357": "Gjilan",
            "10097358": "Mitrovica",
            "10097359": "Pec",
            "10097360": "Pristina",
            "10097361": "Prizren"
        },
        "878675": {
            "886119": "Midlands",
            "886747": "Matabeleland South",
            "886748": "Matabeleland North",
            "886761": "Masvingo",
            "886841": "Mashonaland West",
            "886842": "Mashonaland East",
            "886843": "Mashonaland Central",
            "887358": "Manicaland",
            "1105843": "Bulawayo",
            "1105844": "Harare"
        },
        "895949": {
            "896140": "Western",
            "896972": "Southern",
            "900594": "North-Western",
            "900601": "Northern",
            "909129": "Lusaka",
            "909845": "Luapula",
            "917388": "Eastern",
            "917524": "Copperbelt",
            "921064": "Central",
            "11154503": "Muchinga"
        },
        "921929": {
            "921780": "Mohéli",
            "921882": "Grande Comore",
            "922001": "Anjouan"
        },
        "927384": {
            "923817": "Southern Region",
            "924591": "Northern Region",
            "931597": "Central Region"
        },
        "932692": {
            "932011": "Thaba-Tseka",
            "932184": "Quthing",
            "932219": "Qachaʼs Nek",
            "932418": "Mokhotlong",
            "932439": "Mohaleʼs Hoek",
            "932506": "Maseru",
            "932615": "Mafeteng",
            "932700": "Leribe",
            "932888": "Butha-Buthe",
            "932932": "Berea"
        },
        "933860": {
            "933043": "Ngwaketsi",
            "933044": "South-East",
            "933210": "North-East",
            "933230": "North-West",
            "933562": "Kweneng",
            "933654": "Kgatleng",
            "933657": "Kgalagadi",
            "933758": "Ghanzi",
            "933851": "Central"
        },
        "934292": {
            "448254": "Agalega Islands",
            "934017": "Savanne",
            "934090": "Rivière du Rempart",
            "934153": "Port Louis",
            "934166": "Plaines Wilhems",
            "934212": "Pamplemousses",
            "934275": "Moka",
            "934466": "Grand Port",
            "934522": "Flacq",
            "934718": "Black River",
            "1106583": "Cargados Carajos",
            "1547449": "Rodrigues"
        },
        "934841": {
            "934867": "Shiselweni",
            "934994": "Manzini",
            "935042": "Lubombo",
            "935085": "Hhohho"
        },
        "935317": {
            "6690283": "Réunion"
        },
        "953987": {
            "967573": "Orange Free State",
            "972062": "KwaZulu-Natal",
            "1085593": "Eastern Cape",
            "1085594": "Gauteng",
            "1085595": "Mpumalanga",
            "1085596": "Northern Cape",
            "1085597": "Limpopo",
            "1085598": "North-West",
            "1085599": "Western Cape"
        },
        "1024031": {
            "7521421": "Acoua",
            "7521422": "Bandraboua",
            "7521423": "Bandrele",
            "7521424": "Bouéni",
            "7521425": "Chiconi",
            "7521426": "Chirongui",
            "7521427": "Dembeni",
            "7521428": "Dzaoudzi",
            "7521429": "Kani-Kéli",
            "7521430": "Koungou",
            "7521431": "Mamoudzou",
            "7521432": "Mtsamboro",
            "7521433": "M'Tsangamouji",
            "7521434": "Ouangani",
            "7521435": "Pamandzi",
            "7521436": "Sada",
            "7521437": "Tsingoni"
        },
        "1036973": {
            "1024312": "Zambézia",
            "1026010": "Tete",
            "1026804": "Sofala",
            "1030006": "Niassa",
            "1033354": "Nampula",
            "1040649": "Maputo",
            "1040947": "Manica",
            "1045110": "Inhambane",
            "1046058": "Gaza",
            "1051823": "Cabo Delgado",
            "1105845": "Maputo City"
        },
        "1062947": {
            "7670842": "Diana",
            "7670846": "Sava",
            "7670847": "Sofia",
            "7670848": "Analanjirofo",
            "7670849": "Boeny",
            "7670850": "Betsiboka",
            "7670851": "Alaotra Mangoro",
            "7670852": "Melaky",
            "7670853": "Bongolava",
            "7670854": "Vakinankaratra",
            "7670855": "Itasy",
            "7670856": "Analamanga",
            "7670857": "Atsinanana",
            "7670902": "Menabe",
            "7670904": "Amoron'i Mania",
            "7670905": "Upper Matsiatra",
            "7670906": "Vatovavy Fitovinany",
            "7670907": "Ihorombe",
            "7670908": "Atsimo-Atsinanana",
            "7670910": "Anosy",
            "7670911": "Androy",
            "7670913": "Atsimo-Andrefana"
        },
        "1149361": {
            "1121143": "Zabul",
            "1121863": "Vardak",
            "1123230": "Takhar",
            "1127106": "Sar-e Pol",
            "1127766": "Samangan",
            "1131054": "Parwan",
            "1131256": "Paktika",
            "1131257": "Paktia",
            "1131461": "Oruzgan",
            "1131821": "Nimroz",
            "1132366": "Nangarhar",
            "1134561": "Logar",
            "1135022": "Laghman",
            "1135690": "Kunduz",
            "1135702": "Kunar",
            "1138255": "Kapisa",
            "1138335": "Kandahar",
            "1138957": "Kabul",
            "1139049": "Jowzjan",
            "1140025": "Herat",
            "1140043": "Helmand",
            "1141103": "Ghowr",
            "1141268": "Ghazni",
            "1142226": "Faryab",
            "1142263": "Farah",
            "1147239": "Bamyan",
            "1147288": "Balkh",
            "1147537": "Baghlan",
            "1147707": "Badghis",
            "1147745": "Badakhshan",
            "1444362": "Khowst",
            "1444363": "Nuristan",
            "6957553": "Daykundi",
            "6957555": "Panjshir"
        },
        "1168579": {
            "1162015": "Islāmābād",
            "1164807": "Sindh",
            "1167710": "Punjab",
            "1168873": "Khyber Pakhtunkhwa",
            "1168878": "Gilgit-Baltistan",
            "1179245": "FATA",
            "1183606": "Balochistān",
            "1184196": "Azad Kashmir"
        },
        "1210997": {
            "1337166": "Rajshahi Division",
            "1337179": "Dhaka",
            "1337200": "Chittagong",
            "1337210": "Khulna",
            "1337229": "Barisāl",
            "1477362": "Sylhet",
            "7671048": "Rangpur Division",
            "11287936": "Mymensingh Division"
        },
        "1218197": {
            "162152": "Balkan",
            "162181": "Ahal",
            "162182": "Ashgabat",
            "601465": "Daşoguz",
            "1218666": "Mary",
            "1219651": "Lebap"
        },
        "1220409": {
            "1221092": "Viloyati Sughd",
            "1221692": "Gorno-Badakhshan",
            "1347488": "Khatlon",
            "6452615": "Republican Subordination",
            "7280679": "Dushanbe"
        },
        "1227603": {
            "1223421": "Western",
            "1225265": "Uva",
            "1227618": "Southern",
            "1228435": "Sabaragamuwa",
            "1232860": "North Western",
            "1232870": "North Central",
            "1249296": "Central",
            "7671049": "Northern Province",
            "8133521": "Eastern Province"
        },
        "1252634": {
            "1337278": "Bumthang",
            "1337279": "Chukha",
            "1337280": "Dagana",
            "1337281": "Chirang",
            "1337282": "Geylegphug",
            "1337283": "Haa",
            "1337284": "Lhuntse",
            "1337285": "Mongar",
            "1337286": "Paro",
            "1337287": "Pemagatshel",
            "1337288": "Punakha",
            "1337289": "Samchi",
            "1337290": "Samdrup Jongkhar",
            "1337291": "Shemgang",
            "1337292": "Tashigang",
            "1337293": "Thimphu",
            "1337294": "Tongsa",
            "1337295": "Wangdi Phodrang",
            "7303651": "Gasa",
            "7303653": "Trashi Yangste"
        },
        "1269750": {
            "1252881": "West Bengal",
            "1253626": "Uttar Pradesh",
            "1254169": "Tripura",
            "1254788": "Telangana",
            "1255053": "Tamil Nadu",
            "1256312": "Sikkim",
            "1258899": "Rajasthan",
            "1259223": "Punjab",
            "1259424": "Puducherry",
            "1261029": "Odisha",
            "1262271": "Nagaland",
            "1262963": "Mizoram",
            "1263207": "Meghalaya",
            "1263706": "Manipur",
            "1264418": "Maharashtra",
            "1264542": "Madhya Pradesh",
            "1265206": "Laccadives",
            "1267254": "Kerala",
            "1267701": "Karnataka",
            "1269320": "Kashmir",
            "1270101": "Himachal Pradesh",
            "1270260": "Haryana",
            "1270770": "Gujarat",
            "1271155": "Daman and Diu",
            "1271157": "Goa",
            "1273293": "NCT",
            "1273726": "Dadra and Nagar Haveli",
            "1274744": "Chandigarh",
            "1275715": "Bihar",
            "1278253": "Assam",
            "1278341": "Arunachal Pradesh",
            "1278629": "Andhra Pradesh",
            "1278647": "Andaman and Nicobar",
            "1444364": "Chhattisgarh",
            "1444365": "Jharkhand",
            "1444366": "Uttarakhand"
        },
        "1282028": {
            "1281843": "Vaavu Atholhu",
            "1281881": "Thaa Atholhu",
            "1281892": "Shaviyani Atholhu",
            "1281893": "Seenu",
            "1281918": "Raa Atoll",
            "1281937": "Noonu Atoll",
            "1281945": "Gnyaviyani Atoll",
            "1281985": "Meemu Atholhu",
            "1282096": "Lhaviyani Atholhu",
            "1282101": "Laamu",
            "1282208": "Kaafu Atoll",
            "1282293": "Haa Dhaalu Atholhu",
            "1282294": "Haa Alifu Atholhu",
            "1282328": "Gaafu Dhaalu Atholhu",
            "1282329": "Gaafu Alifu Atholhu",
            "1282393": "Faafu Atholhu",
            "1282447": "Dhaalu Atholhu",
            "1282478": "Baa Atholhu",
            "1282497": "Northern Ari Atoll",
            "10346475": "Southern Ari Atoll"
        },
        "1282988": {
            "7289705": "Far Western",
            "7289706": "Mid Western",
            "7289707": "Central Region",
            "7289708": "Eastern Region",
            "7289709": "Western Region",
            "11205571": "-"
        },
        "1327865": {
            "1293118": "Tanintharyi",
            "1297099": "Shan",
            "1298480": "Sagain",
            "1298822": "Yangon",
            "1298852": "Rakhine",
            "1300463": "Bago",
            "1308528": "Mon",
            "1311871": "Mandalay",
            "1312604": "Magway",
            "1319539": "Kayah",
            "1320233": "Kayin",
            "1321702": "Kachin",
            "1321850": "Ayeyarwady",
            "1327132": "Chin",
            "8239588": "Nay Pyi Taw"
        },
        "1512440": {
            "453752": "Karakalpakstan",
            "1114926": "Surxondaryo",
            "1114927": "Samarqand",
            "1114928": "Qashqadaryo",
            "1114929": "Bukhara",
            "1484838": "Toshkent",
            "1484839": "Toshkent Shahri",
            "1484840": "Sirdaryo",
            "1484841": "Navoiy",
            "1484842": "Namangan",
            "1484843": "Xorazm",
            "1484844": "Jizzax",
            "1484845": "Fergana",
            "1484846": "Andijon"
        },
        "1522867": {
            "607847": "Batys Qazaqstan",
            "608879": "Mangghystaū",
            "609862": "Atyraū",
            "610688": "Aqtöbe",
            "1517381": "East Kazakhstan",
            "1518003": "Aqmola",
            "1519367": "Soltüstik Qazaqstan",
            "1520239": "Pavlodar",
            "1521406": "Qyzylorda",
            "1521671": "Qostanay",
            "1523401": "Qaraghandy",
            "1524444": "Zhambyl",
            "1524787": "Ongtüstik Qazaqstan",
            "1526395": "Almaty Qalasy",
            "1537162": "Almaty Oblysy",
            "1538316": "Baikonur",
            "1538317": "Astana Qalasy"
        },
        "1527747": {
            "1346798": "Osh",
            "1463580": "Batken",
            "1527297": "Talas",
            "1527590": "Naryn",
            "1528260": "Issyk-Kul",
            "1528334": "Bishkek",
            "1529778": "Jalal-Abad",
            "1538652": "Chüy",
            "10300944": "Osh City"
        },
        "1546748": {
            "936339": "Crozet",
            "1546558": "Kerguelen",
            "1547221": "Saint-Paul-et-Amsterdam",
            "6690916": "Îles Éparses",
            "6690917": "Terre-Adélie"
        },
        "1559582": {
            "1559532": "Ngatpang",
            "1559630": "Sonsorol",
            "1559774": "Kayangel",
            "1559776": "Hatohobei",
            "1559964": "Aimeliik",
            "4037645": "Airai",
            "4037653": "Angaur",
            "4037892": "Koror",
            "4037930": "Melekeok",
            "4037962": "Ngaraard",
            "4037976": "Ngchesar",
            "4038037": "Ngarchelong",
            "4038043": "Ngardmau",
            "4038068": "Ngaremlengui",
            "4038179": "Ngiwal",
            "4038261": "Peleliu"
        },
        "1562822": {
            "1559969": "Nghßۇ An",
            "1559970": "Ninh Bình",
            "1559971": "Ninh Thuận",
            "1559972": "Sóc Trăng",
            "1559975": "Trà Vinh",
            "1559976": "Tuyên Quang",
            "1559977": "Vĩnh Long",
            "1559978": "Yên Bái",
            "1562412": "Lào Cai",
            "1564676": "Tiền Giang",
            "1565033": "Thừa Thiên-Huế",
            "1565088": "Kon Tum",
            "1566165": "Thanh Hóa",
            "1566338": "Thái Bình",
            "1566557": "Tây Ninh",
            "1567643": "Sơn La",
            "1568733": "Quảng Trị",
            "1568758": "Quảng Ninh",
            "1568769": "Quảng Ngãi",
            "1568839": "Quảng Bình",
            "1569805": "Phú Yên",
            "1572594": "Hòa Bình",
            "1575788": "Long An",
            "1576632": "Lạng Sơn",
            "1577882": "Lâm Đồng",
            "1577954": "Lai Châu",
            "1579008": "Kiến Giang",
            "1579634": "Khánh Hòa",
            "1580578": "Ho Chi Minh City",
            "1580700": "Hà Tĩnh",
            "1581030": "Hà Giang",
            "1581088": "Gia Lai",
            "1581129": "Ha Nội",
            "1581188": "Cần Thơ",
            "1581297": "Hải Phòng",
            "1581882": "Bình Thuận",
            "1582562": "Đồng Tháp",
            "1582720": "Đồng Nai",
            "1584169": "Ðắc Lắk",
            "1584534": "Bà Rịa-Vũng Tàu",
            "1586182": "Cao Bằng",
            "1587871": "Bình Định",
            "1587974": "Bến Tre",
            "1594446": "An Giang",
            "1904987": "Ðắk Nông",
            "1905099": "Tỉnh Ðiện Biên",
            "1905412": "Bắc Ninh",
            "1905419": "Bắc Giang",
            "1905468": "Đà Nẵng",
            "1905475": "Bình Dương",
            "1905480": "Bình Phước",
            "1905497": "Thái Nguyên",
            "1905516": "Quảng Nam",
            "1905577": "Phú Thọ",
            "1905626": "Nam Định",
            "1905637": "Hà Nam",
            "1905669": "Bắc Kạn",
            "1905675": "Bạc Liêu",
            "1905678": "Cà Mau",
            "1905686": "Hải Dương",
            "1905699": "Hưng Yên",
            "1905856": "Vĩnh Phúc",
            "7506719": "Hau Giang"
        },
        "1605651": {
            "1149965": "Uthai Thani",
            "1150006": "Trang",
            "1150489": "Tak",
            "1150514": "Surat Thani",
            "1150532": "Sukhothai",
            "1150953": "Ratchaburi",
            "1150964": "Ranong",
            "1151073": "Prachuap Khiri Khan",
            "1151253": "Phuket",
            "1151416": "Phetchaburi",
            "1151462": "Phangnga",
            "1152221": "Mae Hong Son",
            "1152467": "Lamphun",
            "1152472": "Lampang",
            "1152631": "Krabi",
            "1153080": "Kanchanaburi",
            "1153089": "Kamphaeng Phet",
            "1153555": "Chumphon",
            "1153668": "Chiang Rai",
            "1153670": "Chiang Mai",
            "1604767": "Yasothon",
            "1604869": "Yala",
            "1605214": "Uttaradit",
            "1605277": "Trat",
            "1606029": "Surin",
            "1606032": "Suphan Buri",
            "1606146": "Songkhla",
            "1606238": "Sisaket",
            "1606269": "Sing Buri",
            "1606375": "Satun",
            "1606417": "Sara Buri",
            "1606585": "Samut Songkhram",
            "1606587": "Samut Sakhon",
            "1606589": "Samut Prakan",
            "1606789": "Sakon Nakhon",
            "1607000": "Roi Et",
            "1607016": "Rayong",
            "1607530": "Phra Nakhon Si Ayutthaya",
            "1607551": "Phrae",
            "1607707": "Phitsanulok",
            "1607724": "Phichit",
            "1607736": "Phetchabun",
            "1607758": "Phayao",
            "1607778": "Phatthalung",
            "1607976": "Pattani",
            "1607982": "Pathum Thani",
            "1608132": "Nonthaburi",
            "1608231": "Nong Khai",
            "1608408": "Narathiwat",
            "1608451": "Nan",
            "1608525": "Nakhon Si Thammarat",
            "1608526": "Nakhon Sawan",
            "1608528": "Nakhon Ratchasima",
            "1608530": "Nakhon Phanom",
            "1608533": "Nakhon Pathom",
            "1608538": "Nakhon Nayok",
            "1608595": "Mukdahan",
            "1608899": "Maha Sarakham",
            "1609031": "Lop Buri",
            "1609070": "Loei",
            "1609348": "Bangkok",
            "1609775": "Khon Kaen",
            "1610468": "Kalasin",
            "1611108": "Chon Buri",
            "1611268": "Chanthaburi",
            "1611406": "Chaiyaphum",
            "1611415": "Chai Nat",
            "1611438": "Chachoengsao",
            "1611452": "Buriram",
            "1621034": "Ang Thong",
            "1906686": "Changwat Udon Thani",
            "1906687": "Prachin Buri",
            "1906688": "Changwat Ubon Ratchathani",
            "1906689": "Amnat Charoen",
            "1906690": "Changwat Nong Bua Lamphu",
            "1906691": "Sa Kaeo",
            "8133594": "Changwat Bueng Kan"
        },
        "1643084": {
            "1213642": "North Sumatra",
            "1215638": "Aceh",
            "1621176": "Yogyakarta",
            "1626196": "South Sumatra",
            "1626197": "West Sumatra",
            "1626229": "North Sulawesi",
            "1626230": "Southeast Sulawesi",
            "1626231": "Central Sulawesi",
            "1626232": "South Sulawesi",
            "1629652": "Riau",
            "1633791": "East Nusa Tenggara",
            "1633792": "West Nusa Tenggara",
            "1636627": "Maluku",
            "1638535": "Lampung",
            "1641897": "East Kalimantan",
            "1641898": "Central Kalimantan",
            "1641899": "South Kalimantan",
            "1641900": "West Kalimantan",
            "1642668": "East Java",
            "1642669": "Central Java",
            "1642672": "West Java",
            "1642856": "Jambi",
            "1642907": "Jakarta",
            "1643012": "Papua",
            "1649147": "Bengkulu",
            "1650535": "Bali",
            "1923045": "Banten",
            "1923046": "Gorontalo",
            "1923047": "Bangka-Belitung Islands",
            "1958070": "North Maluku",
            "1996549": "West Papua",
            "1996550": "West Sulawesi",
            "1996551": "Riau Islands",
            "8604684": "North Kalimantan"
        },
        "1655842": {
            "1652077": "Xiangkhoang",
            "1652210": "Xiagnabouli",
            "1652238": "Vientiane",
            "1653315": "Savannahkhét",
            "1653333": "Salavan",
            "1653893": "Phôngsali",
            "1654491": "Oudômxai",
            "1655558": "Louangphabang",
            "1655561": "Loungnamtha",
            "1656538": "Khammouan",
            "1657114": "Houaphan",
            "1657818": "Champasak",
            "1665045": "Attapu",
            "1904615": "Xékong",
            "1904616": "Bokeo",
            "1904617": "Bolikhamsai",
            "1904618": "Vientiane Prefecture",
            "11395958": "Xaisomboun"
        },
        "1668284": {
            "7280288": "Fukien",
            "7280289": "Takao",
            "7280290": "Taipei",
            "7280291": "Taiwan"
        },
        "1694008": {
            "7115989": "ARMM",
            "7521295": "Northern Mindanao",
            "7521296": "Mimaropa",
            "7521297": "Cagayan Valley",
            "7521298": "Soccsksargen",
            "7521299": "Caraga",
            "7521300": "Cordillera",
            "7521301": "Ilocos",
            "7521303": "Calabarzon",
            "7521304": "Western Visayas",
            "7521305": "Central Luzon",
            "7521306": "Central Visayas",
            "7521307": "Eastern Visayas",
            "7521308": "Zamboanga Peninsula",
            "7521309": "Davao",
            "7521310": "Bicol",
            "7521311": "Metro Manila",
            "11353110": "Negros Island Region"
        },
        "1733045": {
            "1733035": "Melaka",
            "1733036": "Terengganu",
            "1733037": "Selangor",
            "1733038": "Sarawak",
            "1733039": "Sabah",
            "1733040": "Perlis",
            "1733041": "Perak",
            "1733042": "Pahang",
            "1733043": "Negeri Sembilan",
            "1733044": "Kelantan",
            "1733046": "Kuala Lumpur",
            "1733047": "Penang",
            "1733048": "Kedah",
            "1733049": "Johor",
            "1734240": "Labuan",
            "1996552": "Putrajaya"
        },
        "1814991": {
            "1279685": "Tibet",
            "1280239": "Qinghai",
            "1529047": "Xinjiang",
            "1784764": "Zhejiang",
            "1785694": "Yunnan",
            "1792943": "Tianjin",
            "1794299": "Sichuan",
            "1795912": "Shanxi",
            "1796231": "Shanghai",
            "1796328": "Shandong",
            "1796480": "Shaanxi",
            "1799355": "Ningsia Hui Autonomous Region",
            "1806222": "Jiangxi",
            "1806260": "Jiangsu",
            "1806691": "Hunan",
            "1806949": "Hubei",
            "1808520": "Henan",
            "1808773": "Hebei",
            "1809054": "Hainan",
            "1809445": "Guizhou",
            "1809867": "Guangxi",
            "1809935": "Guangdong",
            "1810676": "Gansu",
            "1811017": "Fujian",
            "1814905": "Chongqing",
            "1818058": "Anhui",
            "2035607": "Inner Mongolia",
            "2036115": "Liaoning",
            "2036500": "Jilin",
            "2036965": "Heilongjiang",
            "2038349": "Beijing"
        },
        "1819730": {
            "1818224": "Yuen Long",
            "1818458": "Tsuen Wan",
            "1818672": "Tai Po",
            "1819049": "Sai Kung",
            "1819708": "Islands",
            "7533598": "Central and Western",
            "7533607": "Wanchai",
            "7533608": "Eastern",
            "7533609": "Southern",
            "7533610": "Yau Tsim Mong",
            "7533611": "Sham Shui Po",
            "7533612": "Kowloon City",
            "7533613": "Wong Tai Sin",
            "7533614": "Kwun Tong",
            "7533615": "Kwai Tsing",
            "7533616": "Tuen Mun",
            "7533617": "North",
            "7533618": "Sha Tin"
        },
        "1820814": {
            "1820068": "Tutong",
            "1820106": "Temburong",
            "1820818": "Brunei and Muara",
            "1820869": "Belait"
        },
        "1831722": {
            "1821301": "Pursat",
            "1821310": "Battambang",
            "1821939": "Takeo",
            "1821992": "Svay Rieng",
            "1822028": "Stung Treng",
            "1822210": "Ŏtâr Méanchey",
            "1822213": "Siem Reap",
            "1822449": "Ratanakiri",
            "1822609": "Prey Veng",
            "1822676": "Preah Vihear",
            "1830103": "Phnom Penh",
            "1830206": "Pailin",
            "1830306": "Mondolkiri",
            "1830563": "Kratie",
            "1830937": "Kep",
            "1831037": "Koh Kong",
            "1831095": "Kandal",
            "1831111": "Kampot",
            "1831124": "Kampong Thom",
            "1831132": "Kampong Speu",
            "1831166": "Kampong Chhnang",
            "1831172": "Kampong Cham",
            "1899262": "Preah Sihanouk",
            "1899273": "Banteay Meanchey",
            "7647525": "Tboung Khmum"
        },
        "1835841": {
            "1833742": "Ulsan",
            "1835224": "Daejeon",
            "1835327": "Daegu",
            "1835847": "Seoul",
            "1838519": "Busan",
            "1841597": "Gyeongsangbuk-do",
            "1841610": "Gyeonggi-do",
            "1841808": "Gwangju",
            "1843125": "Gangwon-do",
            "1843561": "Incheon",
            "1845105": "Chungcheongnam-do",
            "1845106": "North Chungcheong",
            "1845788": "Jeollanam-do",
            "1845789": "Jeollabuk-do",
            "1846265": "Jeju-do",
            "1902028": "Gyeongsangnam-do",
            "8394437": "Sejong-si"
        },
        "1861060": {
            "1848649": "Yamanashi",
            "1848681": "Yamaguchi",
            "1848938": "Wakayama",
            "1849872": "Toyama",
            "1849890": "Tottori",
            "1850144": "Tokyo",
            "1850157": "Tokushima",
            "1850310": "Tochigi",
            "1851715": "Shizuoka",
            "1852442": "Shimane",
            "1852553": "Shiga",
            "1853226": "Saitama",
            "1853299": "Saga",
            "1853904": "Ōsaka",
            "1854345": "Okinawa",
            "1854381": "Okayama",
            "1854484": "Oita",
            "1855429": "Niigata",
            "1855608": "Nara",
            "1856156": "Nagasaki",
            "1856210": "Nagano",
            "1856710": "Miyazaki",
            "1857352": "Mie",
            "1857907": "Kyoto",
            "1858419": "Kumamoto",
            "1859133": "Kochi",
            "1860291": "Kanagawa",
            "1860825": "Kagoshima",
            "1860834": "Kagawa",
            "1861387": "Ishikawa",
            "1862047": "Hyōgo",
            "1862413": "Hiroshima",
            "1863501": "Gunma",
            "1863640": "Gifu",
            "1863958": "Fukuoka",
            "1863983": "Fukui",
            "1864226": "Ehime",
            "1865694": "Aichi",
            "2110554": "Yamagata",
            "2111888": "Miyagi",
            "2112518": "Iwate",
            "2112669": "Ibaraki",
            "2112922": "Fukushima",
            "2113014": "Chiba",
            "2113124": "Akita",
            "2130037": "Hokkaido",
            "2130656": "Aomori"
        },
        "1873107": {
            "1871856": "Pyongyang",
            "1871952": "P'yŏngan-namdo",
            "1871954": "P'yŏngan-bukto",
            "1876101": "Kangwŏn-do",
            "1876884": "Hwanghae-namdo",
            "1876888": "Hwanghae-bukto",
            "1877450": "Hamgyŏng-namdo",
            "2039332": "Yanggang-do",
            "2044245": "Hamgyŏng-bukto",
            "2045265": "Chagang-do",
            "2054927": "Rason"
        },
        "1880251": {
            "7535954": "Central Singapore",
            "7535955": "North East",
            "7535956": "South East",
            "7535957": "South West",
            "7535958": "North West"
        },
        "1966436": {
            "1622470": "Viqueque",
            "1636309": "Manufahi",
            "1636525": "Manatuto",
            "1637729": "Liquiçá",
            "1638294": "Lautém",
            "1639462": "Cova Lima",
            "1644865": "Ermera",
            "1645456": "Díli",
            "1648513": "Bobonaro",
            "1649538": "Baucau",
            "1651539": "Oecusse",
            "1651809": "Ainaro",
            "1651815": "Aileu"
        },
        "2017370": {
            "468898": "Jaroslavl",
            "472039": "Voronezj",
            "472454": "Vologda",
            "472755": "Volgograd",
            "479119": "Ulyanovsk",
            "479613": "Udmurtiya",
            "480041": "Tverskaya",
            "480508": "Tula",
            "484048": "Tatarstan",
            "484638": "Tambov",
            "487839": "Stavropol'skiy",
            "491684": "Smolensk",
            "498671": "Saratov",
            "499068": "Samara",
            "500059": "Rjazan",
            "501165": "Rostov",
            "504338": "Pskov",
            "511180": "Perm",
            "511555": "Penza",
            "514801": "Orjol",
            "515001": "Orenburg",
            "519324": "Novgorod",
            "519969": "North Ossetia",
            "522652": "Nenets",
            "524304": "Murmansk",
            "524894": "Moscow",
            "524925": "Moscow Oblast",
            "525369": "Mordoviya",
            "529352": "Mariy-El",
            "535120": "Lipetsk",
            "536199": "Leningradskaya Oblast",
            "536203": "St.-Petersburg",
            "538555": "Kursk",
            "542415": "Krasnodarskiy",
            "543871": "Kostroma",
            "545854": "Komi",
            "548389": "Kirov",
            "552548": "Karelia",
            "552927": "Karachayevo-Cherkesiya",
            "553899": "Kaluga",
            "553972": "Kalmykiya",
            "554230": "Kaliningrad",
            "554667": "Kabardino-Balkariya",
            "555235": "Ivanovo",
            "556349": "Ingushetiya",
            "559838": "Nizjnij Novgorod",
            "567293": "Dagestan",
            "567395": "Chuvashia",
            "569665": "Chechnya",
            "571473": "Brjansk",
            "578071": "Belgorod",
            "578853": "Bashkortostan",
            "580491": "Astrakhan",
            "581043": "Arkhangelskaya",
            "584222": "Adygeya",
            "826294": "Vladimir",
            "1486462": "Yamalo-Nenets",
            "1488747": "Tyumenskaya",
            "1488873": "Republic of Tyva",
            "1489421": "Tomsk",
            "1490542": "Sverdlovsk",
            "1496152": "Omsk",
            "1496745": "Novosibirsk",
            "1501312": "Kurgan",
            "1502020": "Krasnoyarskiy",
            "1503773": "Khanty-Mansia",
            "1503834": "Khakasiya",
            "1503900": "Kemerovo",
            "1506272": "Altai",
            "1508290": "Chelyabinsk",
            "1511732": "Altai Krai",
            "2013162": "Chukot",
            "2017623": "Primorskiy",
            "2022888": "Khabarovsk",
            "2023468": "Irkutsk",
            "2026639": "Jewish Autonomous Oblast",
            "2027748": "Amur",
            "2050915": "Respublika Buryatiya",
            "2121529": "Sakhalin",
            "2123627": "Magadan",
            "2125072": "Kamtsjatka",
            "2126099": "Chukotka",
            "7779061": "Transbaikal Territory"
        },
        "2029969": {
            "1514967": "Uvs",
            "1515696": "Hovd",
            "1515917": "Govĭ-Altay",
            "1516012": "Dzabkhan",
            "1516278": "Bayan-Ölgiy",
            "1516290": "Bayanhongor",
            "2028461": "Ulaanbaatar",
            "2028849": "Central Aimak",
            "2029155": "Sühbaatar",
            "2029432": "Selenge",
            "2029546": "Övörhangay",
            "2029669": "Ömnögovĭ",
            "2030469": "Hövsgöl",
            "2030783": "Hentiy",
            "2031740": "Middle Govĭ",
            "2031798": "East Gobi Aymag",
            "2031799": "East Aimak",
            "2032199": "Bulgan",
            "2032855": "Arhangay",
            "2055111": "Darhan Uul",
            "2055112": "Govĭ-Sumber",
            "2055113": "Orhon"
        },
        "2077456": {
            "2058645": "Western Australia",
            "2061327": "South Australia",
            "2064513": "Northern Territory",
            "2145234": "Victoria",
            "2147291": "Tasmania",
            "2152274": "Queensland",
            "2155400": "New South Wales",
            "2177478": "ACT"
        },
        "2080185": {
            "7303491": "Ailinginae Atoll",
            "7303492": "Ailinglaplap Atoll",
            "7303493": "Ailuk Atoll",
            "7303494": "Arno Atoll",
            "7303495": "Aur Atoll",
            "7303496": "Bikar Atoll",
            "7303497": "Bikini Atoll",
            "7303498": "Ebon Atoll",
            "7303499": "Enewetak Atoll",
            "7303500": "Erikub Atoll",
            "7303501": "Jaluit Atoll",
            "7303502": "Kwajalein Atoll",
            "7303503": "Lae Atoll",
            "7303504": "Likiep Atoll",
            "7303505": "Majuro Atoll",
            "7303506": "Maloelap Atoll",
            "7303507": "Mili Atoll",
            "7303508": "Namdrik Atoll",
            "7303509": "Namu Atoll",
            "7303510": "Rongelap Atoll",
            "7303511": "Rongrik Atoll",
            "7303512": "Taka Atoll",
            "7303513": "Bokak Atoll",
            "7303514": "Ujae Atoll",
            "7303515": "Ujelang",
            "7303516": "Utrik Atoll",
            "7303517": "Wotho Atoll",
            "7303518": "Wotje Atoll",
            "7303519": "Jabat Island",
            "7303520": "Jemo Island",
            "7303521": "Kili Island",
            "7303522": "Lib Island",
            "7303523": "Mejit Island"
        },
        "2081918": {
            "2081175": "Yap",
            "2081550": "Pohnpei",
            "2082036": "Kosrae",
            "2082282": "Chuuk"
        },
        "2088628": {
            "2083546": "West New Britain",
            "2083549": "Western Province",
            "2083551": "Western Highlands",
            "2086331": "Southern Highlands",
            "2087246": "Sandaun",
            "2089470": "Bougainville",
            "2089478": "Northern Province",
            "2089693": "New Ireland",
            "2089856": "National Capital",
            "2090468": "Morobe",
            "2091495": "Manus",
            "2091993": "Madang",
            "2096633": "Gulf",
            "2097655": "Enga",
            "2097846": "East Sepik",
            "2097853": "East New Britain",
            "2097855": "Eastern Highlands",
            "2098593": "Chimbu",
            "2132895": "Milne Bay",
            "2133763": "Central Province",
            "8521658": "Hela",
            "8521660": "Jiwaka"
        },
        "2103350": {
            "2101556": "Western Province",
            "2106552": "Malaita",
            "2108262": "Isabel",
            "2108831": "Guadalcanal",
            "2109495": "Central Province",
            "2178472": "Temotu",
            "2178730": "Makira",
            "7280292": "Choiseul",
            "7280293": "Rennell and Bellona",
            "9259067": "Honiara"
        },
        "2110297": {
            "2110341": "Nui",
            "2110345": "Nanumea",
            "2110384": "Funafuti",
            "7601979": "Niutao",
            "7601980": "Nanumanga",
            "7601981": "Vaitupu",
            "7601982": "Nukufetau",
            "7601983": "Nukulaelae"
        },
        "2110425": {
            "2110418": "Yaren",
            "2110420": "Uaboe",
            "2110423": "Nibok",
            "2110431": "Meneng",
            "2110432": "Ijuw",
            "2110435": "Ewa",
            "2110437": "Denigomodu",
            "2110440": "Buada",
            "2110441": "Boe",
            "2110442": "Baiti",
            "2110445": "Anibare",
            "2110448": "Anetan",
            "2110449": "Anabar",
            "2110451": "Aiwo"
        },
        "2134431": {
            "2134739": "Tafea",
            "2134898": "Sanma",
            "2137421": "Torba",
            "2208265": "Malampa",
            "2208266": "Penama",
            "2208267": "Shefa"
        },
        "2139685": {
            "2140464": "South Province",
            "2140685": "North Province",
            "7521415": "Loyalty Islands"
        },
        "2186224": {
            "2179538": "Wellington",
            "2179671": "Manawatu-Wanganui",
            "2180293": "Waikato",
            "2181818": "Tasman",
            "2181872": "Taranaki",
            "2182501": "Southland",
            "2182560": "Bay of Plenty",
            "2185978": "Northland",
            "2187304": "Marlborough",
            "2190146": "Hawke's Bay",
            "2190767": "Gisborne",
            "2192628": "Canterbury",
            "2193734": "Auckland",
            "4033013": "Chatham Islands",
            "6612108": "Nelson",
            "6612109": "Otago",
            "6612113": "West Coast"
        },
        "2205218": {
            "2194371": "Western",
            "2199295": "Northern",
            "2205272": "Central",
            "4036647": "Eastern",
            "6324593": "Rotuma"
        },
        "2215636": {
            "87204": "Darnah",
            "88318": "Banghāzī",
            "88904": "Al Marj",
            "88932": "Al Kufrah",
            "443289": "Al Jabal al Akhḑar",
            "2210245": "Tripoli",
            "2210553": "Surt",
            "2212774": "Sabhā",
            "2214432": "Sha ' bīyat Nālūt",
            "2214602": "Murzuq",
            "2214845": "Mişrātah",
            "2217350": "Sha ' bīyat Ghāt",
            "2218972": "Az Zāwiyah",
            "2219413": "Ash Shāţiʼ",
            "2219944": "Al Jufrah",
            "2593778": "An Nuqāţ al Khams",
            "7602688": "Sha ' bīyat al Buţnān",
            "7602689": "Jabal al Gharbi",
            "7602690": "Sha ' bīyat al Jafārah",
            "7602691": "Al Marqab",
            "7602692": "Sha ' bīyat al Wāḩāt",
            "7602693": "Sha ' bīyat Wādī al Ḩayāt"
        },
        "2233387": {
            "2221788": "South-West",
            "2221789": "South",
            "2222934": "West",
            "2223602": "North-West",
            "2223603": "North",
            "2229336": "Littoral",
            "2231755": "Far North",
            "2231835": "East",
            "2233376": "Centre",
            "2236015": "Adamaoua"
        },
        "2245662": {
            "2243939": "Ziguinchor",
            "2244800": "Thiès",
            "2244990": "Tambacounda",
            "2246451": "Saint-Louis",
            "2248753": "Matam",
            "2249221": "Louga",
            "2249781": "Kolda",
            "2250804": "Kaolack",
            "2251910": "Fatick",
            "2252308": "Diourbel",
            "2253350": "Dakar",
            "7303935": "Kaffrine",
            "7303936": "Kédougou",
            "7303937": "Sédhiou"
        },
        "2260494": {
            "2255329": "Sangha",
            "2255404": "Pool",
            "2255422": "Plateaux",
            "2256175": "Niari",
            "2258431": "Likouala",
            "2258534": "Lékoumou",
            "2258738": "Kouilou",
            "2260487": "Cuvette",
            "2260668": "Bouenza",
            "2572183": "Brazzaville",
            "2593118": "Cuvette-Ouest",
            "7280295": "Pointe-Noire"
        },
        "2264397": {
            "2262961": "Setúbal",
            "2263478": "Santarém",
            "2264507": "Portalegre",
            "2267056": "Lisbon",
            "2267094": "Leiria",
            "2268337": "Faro",
            "2268404": "Évora",
            "2269513": "Castelo Branco",
            "2270984": "Beja",
            "2593105": "Madeira",
            "2732264": "Viseu",
            "2732437": "Vila Real",
            "2732772": "Viana do Castelo",
            "2735941": "Porto",
            "2738782": "Guarda",
            "2740636": "Coimbra",
            "2742026": "Bragança",
            "2742031": "Braga",
            "2742610": "Aveiro",
            "3411865": "Azores"
        },
        "2275384": {
            "2273898": "Sinoe",
            "2274688": "Nimba",
            "2274890": "Montserrado",
            "2275099": "Maryland",
            "2275344": "Lofa",
            "2276622": "Grand Gedeh",
            "2276627": "Grand Cape Mount",
            "2276630": "Grand Bassa",
            "2278292": "Bong",
            "2278324": "Bomi",
            "2588490": "Grand Kru",
            "2588491": "Margibi",
            "2588492": "River Cess",
            "2593119": "Gbarpolu",
            "2593120": "River Gee"
        },
        "2287781": {
            "10629377": "Yamoussoukro Autonomous District",
            "11153052": "Bas-Sassandra",
            "11153053": "Comoé",
            "11153054": "Denguélé",
            "11153055": "Gôh-Djiboua",
            "11153056": "Lacs",
            "11153057": "Lagunes",
            "11153058": "Montagnes",
            "11153059": "Sassandra-Marahoué",
            "11153060": "Savanes",
            "11153061": "Vallée du Bandama",
            "11153062": "Woroba",
            "11153063": "Zanzan",
            "11153151": "Abidjan"
        },
        "2300660": {
            "2294076": "Western",
            "2294234": "Volta",
            "2294286": "Upper West",
            "2294291": "Upper East",
            "2297169": "Northern",
            "2300569": "Greater Accra",
            "2301360": "Eastern",
            "2302353": "Central",
            "2302547": "Brong-Ahafo",
            "2304116": "Ashanti"
        },
        "2309096": {
            "2310307": "Annobon",
            "2566978": "Bioko Norte",
            "2566979": "Bioko Sur",
            "2566980": "Centro Sur",
            "2566981": "Kié-Ntem",
            "2566982": "Litoral",
            "2566983": "Wele-Nzas"
        },
        "2328926": {
            "2322907": "Sokoto",
            "2324433": "Rivers",
            "2324828": "Plateau",
            "2325190": "Oyo",
            "2326168": "Ondo",
            "2327546": "Ogun",
            "2328925": "Niger",
            "2332453": "Lagos",
            "2332785": "Kwara",
            "2334797": "Katsina",
            "2335196": "Kano",
            "2335722": "Kaduna",
            "2337542": "Imo",
            "2345891": "Cross River",
            "2346794": "Borno",
            "2347266": "Benue",
            "2347468": "Bauchi",
            "2349961": "Anambra",
            "2350813": "Akwa Ibom",
            "2352776": "FCT",
            "2565340": "Abia",
            "2565341": "Delta",
            "2565342": "Adamawa",
            "2565343": "Edo",
            "2565344": "Enugu",
            "2565345": "Jigawa",
            "2595344": "Bayelsa",
            "2595345": "Ebonyi",
            "2595346": "Ekiti",
            "2595347": "Gombe",
            "2595348": "Nassarawa",
            "2595349": "Zamfara",
            "2597363": "Kebbi",
            "2597364": "Kogi",
            "2597365": "Osun",
            "2597366": "Taraba",
            "2597367": "Yobe"
        },
        "2361809": {
            "6930701": "Boucle du Mouhoun",
            "6930703": "Cascades",
            "6930704": "Centre",
            "6930705": "Centre-Est",
            "6930706": "Centre-Nord",
            "6930707": "Centre-Ouest",
            "6930708": "Centre-Sud",
            "6930709": "Est",
            "6930710": "Hauts-Bassins",
            "6930711": "Nord",
            "6930712": "Plateau-Central",
            "6930713": "Sahel",
            "6930714": "Sud-Ouest"
        },
        "2363686": {
            "2364205": "Savanes",
            "2364370": "Plateaux",
            "2365173": "Maritime",
            "2367237": "Centrale",
            "2597439": "Kara"
        },
        "2372248": {
            "2368955": "Tombali",
            "2370360": "Quinara",
            "2371071": "Oio",
            "2372533": "Gabú",
            "2374312": "Cacheu",
            "2374689": "Bolama and Bijagos",
            "2374776": "Bissau",
            "2374820": "Biombo",
            "2375255": "Bafatá"
        },
        "2378080": {
            "2375742": "Trarza",
            "2375989": "Tiris Zemmour",
            "2376551": "Tagant",
            "2378903": "Inchiri",
            "2379024": "Hodh El Gharbi",
            "2379025": "Hodh ech Chargui",
            "2379216": "Guidimaka",
            "2379384": "Gorgol",
            "2380426": "Dakhlet Nouadhibou",
            "2380635": "Brakna",
            "2381344": "Assaba",
            "2381972": "Adrar",
            "11496391": "Nouakchott Ouest",
            "11496392": "Nouakchott Nord",
            "11496393": "Nouakchott Sud"
        },
        "2395170": {
            "2390719": "Zou",
            "2392325": "Ouémé",
            "2392716": "Mono",
            "2394992": "Borgou",
            "2395504": "Atlantique",
            "2395524": "Atakora",
            "2597271": "Alibori",
            "2597272": "Collines",
            "2597273": "Kouffo",
            "2597274": "Donga",
            "2597275": "Littoral",
            "2597277": "Plateau"
        },
        "2400553": {
            "2396076": "Woleu-Ntem",
            "2396924": "Ogooué-Maritime",
            "2396925": "Ogooué-Lolo",
            "2396926": "Ogooué-Ivindo",
            "2397141": "Nyanga",
            "2397466": "Ngouni",
            "2397842": "Moyen-Ogooué",
            "2400454": "Haut-Ogooué",
            "2400682": "Estuaire"
        },
        "2403846": {
            "2403068": "Western Area",
            "2403745": "Southern Province",
            "2404798": "Northern Province",
            "2409543": "Eastern Province"
        },
        "2410758": {
            "2410764": "São Tomé Island",
            "2410878": "Príncipe"
        },
        "2413451": {
            "2411683": "Western",
            "2411711": "Upper River",
            "2412353": "North Bank",
            "2412707": "Central River",
            "2412716": "Lower River",
            "2413875": "Banjul"
        },
        "2420477": {
            "2422464": "Conakry",
            "8335085": "Boke",
            "8335086": "Faranah",
            "8335087": "Kankan",
            "8335088": "Kindia",
            "8335089": "Labe",
            "8335090": "Mamou",
            "8335091": "Nzerekore"
        },
        "2434508": {
            "242048": "Salamat",
            "242246": "Ouadaï",
            "244877": "Wadi Fira",
            "2425287": "Tandjilé",
            "2427315": "Moyen-Chari",
            "2428132": "Mayo-Kebbi Est",
            "2429058": "Logone Oriental",
            "2429060": "Logone Occidental",
            "2429323": "Lac",
            "2430873": "Kanem",
            "2431555": "Guéra",
            "2434478": "Chari-Baguirmi",
            "2435899": "Batha",
            "7602866": "Borkou",
            "7603251": "Hadjer-Lamis",
            "7603252": "Mandoul",
            "7603253": "Mayo-Kebbi Ouest",
            "7603254": "N'Djaména",
            "7603255": "Barh el Gazel",
            "7603257": "Sila",
            "7603258": "Tibesti",
            "8604857": "Ennedi-Ouest",
            "8604858": "Ennedi-Est"
        },
        "2440476": {
            "2437797": "Zinder",
            "2439374": "Tahoua",
            "2441289": "Maradi",
            "2445486": "Dosso",
            "2445702": "Diffa",
            "2448083": "Agadez",
            "2595293": "Tillabéri",
            "2595294": "Niamey"
        },
        "2453866": {
            "2449066": "Tombouctou",
            "2451184": "Sikasso",
            "2451477": "Ségou",
            "2453347": "Mopti",
            "2454532": "Koulikoro",
            "2455517": "Kayes",
            "2457161": "Gao",
            "2460594": "Bamako",
            "2597449": "Kidal"
        },
        "2464461": {
            "2464038": "Zaghwān",
            "2464464": "Tūnis",
            "2464645": "Tawzar",
            "2464698": "Tataouine",
            "2464912": "Sūsah",
            "2465027": "Silyānah",
            "2465837": "Sīdī Bū Zayd",
            "2467450": "Şafāqis",
            "2468014": "Qibilī",
            "2468351": "Gafsa",
            "2468365": "Qābis",
            "2468576": "Nābul",
            "2469470": "Madanīn",
            "2470085": "Jundūbah",
            "2472477": "Bin ' Arūs",
            "2472699": "Banzart",
            "2472770": "Bājah",
            "2473245": "Ariana",
            "2473451": "Al Qayrawān",
            "2473460": "Al Qaşrayn",
            "2473495": "Al Munastīr",
            "2473574": "Al Mahdīyah",
            "2473637": "Kef",
            "6201192": "Manouba"
        },
        "2510769": {
            "2513413": "Murcia",
            "2519582": "Ceuta",
            "2521383": "Balearic Islands",
            "2593109": "Andalusia",
            "2593110": "Canary Islands",
            "2593111": "Castille-La Mancha",
            "2593112": "Extremadura",
            "2593113": "Valencia",
            "3114710": "Asturias",
            "3115609": "Navarre",
            "3117732": "Madrid",
            "3336897": "La Rioja",
            "3336898": "Cantabria",
            "3336899": "Aragon",
            "3336900": "Castille and León",
            "3336901": "Catalonia",
            "3336902": "Galicia",
            "3336903": "Basque Country",
            "6362988": "Melilla"
        },
        "2542007": {
            "11281874": "Tanger-Tetouan-Al Hoceima",
            "11281875": "Oriental",
            "11281876": "Fès-Meknès",
            "11281877": "Rabat-Salé-Kénitra",
            "11281878": "Béni Mellal-Khénifra",
            "11281879": "Casablanca-Settat",
            "11281880": "Marrakesh-Safi",
            "11281881": "Drâa-Tafilalet",
            "11281882": "Souss-Massa",
            "11281884": "Guelmim-Oued Noun",
            "11281885": "Laâyoune-Sakia El Hamra",
            "11281886": "Dakhla-Oued Ed-Dahab"
        },
        "2562770": {
            "8299700": "Attard",
            "8299701": "Balzan",
            "8299702": "Il-Birgu",
            "8299703": "Birkirkara",
            "8299704": "Birżebbuġa",
            "8299705": "Bormla",
            "8299706": "Dingli",
            "8299707": "Il-Fgura",
            "8299708": "Il-Furjana",
            "8299709": "Il-Fontana",
            "8299710": "Għajnsielem",
            "8299711": "L-Għarb",
            "8299712": "Ħal Għargħur",
            "8299713": "L-Għasri",
            "8299714": "Ħal Għaxaq",
            "8299715": "Il-Gudja",
            "8299716": "Il-Gżira",
            "8299717": "Il-Ħamrun",
            "8299718": "L-Iklin",
            "8299719": "L-Imdina",
            "8299720": "L-Imġarr",
            "8299721": "L-Imqabba",
            "8299722": "L-Imsida",
            "8299723": "L-Imtarfa",
            "8299724": "L-Isla",
            "8299725": "Il-Kalkara",
            "8299726": "Ta ' Kerċem",
            "8299727": "Kirkop",
            "8299728": "Lija",
            "8299729": "Luqa",
            "8299730": "Il-Marsa",
            "8299731": "Marsaskala",
            "8299732": "Marsaxlokk",
            "8299733": "Il-Mellieħa",
            "8299734": "Il-Mosta",
            "8299735": "Il-Munxar",
            "8299736": "In-Nadur",
            "8299737": "In-Naxxar",
            "8299738": "Paola",
            "8299739": "Pembroke",
            "8299740": "Tal-Pietà",
            "8299741": "Il-Qala",
            "8299742": "Qormi",
            "8299743": "Il-Qrendi",
            "8299744": "Ir-Rabat",
            "8299745": "Victoria",
            "8299746": "Safi",
            "8299747": "Saint John",
            "8299748": "Saint Julian",
            "8299749": "Saint Lawrence",
            "8299750": "Saint Lucia",
            "8299751": "Saint Paul's Bay",
            "8299752": "Saint Venera",
            "8299753": "Sannat",
            "8299754": "Is-Siġġiewi",
            "8299755": "Tas-Sliema",
            "8299756": "Is-Swieqi",
            "8299757": "Tarxien",
            "8299758": "Ta ' Xbiex",
            "8299759": "Ix-Xagħra",
            "8299760": "Ix-Xewkija",
            "8299761": "Ix-Xgħajra",
            "8299762": "Ħaż-Żabbar",
            "8299763": "Ħaż-Żebbuġ",
            "8299764": "Iż-Żebbuġ",
            "8299765": "Iż-Żejtun",
            "8299766": "Iż-Żurrieq",
            "8334638": "Il-Belt Valletta"
        },
        "2589581": {
            "2475683": "Tlemcen",
            "2475741": "Tizi Ouzou",
            "2475858": "Tissemsilt",
            "2476027": "Tipaza",
            "2476302": "Tindouf",
            "2476893": "Tiaret",
            "2477457": "Tébessa",
            "2478217": "Tamanrasset",
            "2479213": "Souk Ahras",
            "2479532": "Skikda",
            "2481001": "Sidi Bel Abbès",
            "2481696": "Sétif",
            "2482557": "Saida",
            "2483666": "Relizane",
            "2484618": "Oum el Bouaghi",
            "2485794": "Ouargla",
            "2485920": "Oran",
            "2486512": "Naama",
            "2486682": "M'Sila",
            "2487130": "Mostaganem",
            "2487449": "Mila",
            "2488831": "Medea",
            "2490095": "Mascara",
            "2491188": "Laghouat",
            "2491887": "Khenchela",
            "2492910": "Jijel",
            "2493455": "Illizi",
            "2495659": "Guelma",
            "2496045": "Ghardaia",
            "2497322": "El Tarf",
            "2497406": "El Oued",
            "2498541": "El Bayadh",
            "2500013": "Djelfa",
            "2501147": "Constantine",
            "2501296": "Chlef",
            "2502638": "Boumerdes",
            "2502951": "Bouira",
            "2503699": "Bordj Bou Arréridj",
            "2503765": "Blida",
            "2503822": "Biskra",
            "2505325": "Béjaïa",
            "2505525": "Béchar",
            "2505569": "Batna",
            "2506994": "Annaba",
            "2507475": "Algiers",
            "2507899": "Aïn Témouchent",
            "2508226": "Aïn Defla",
            "2508807": "Adrar"
        },
        "2622320": {
            "2610816": "Vágar",
            "2612137": "Suðuroy",
            "2612225": "Streymoy",
            "2614219": "Sandoy",
            "2616145": "Norðoyar",
            "2622387": "Eysturoy"
        },
        "2623032": {
            "6418538": "Capital Region",
            "6418539": "Central Jutland",
            "6418540": "North Denmark",
            "6418541": "Zealand",
            "6418542": "South Denmark"
        },
        "2629691": {
            "3337403": "Northwest",
            "3337404": "Northeast",
            "3337405": "East",
            "3337406": "South",
            "3426182": "Capital Region",
            "3426183": "Southern Peninsula",
            "3426184": "West",
            "3426185": "Westfjords"
        },
        "2635167": {
            "2634895": "Wales",
            "2638360": "Scotland",
            "2641364": "Northern Ireland",
            "6269131": "England"
        },
        "2658434": {
            "2657895": "Zurich",
            "2657907": "Zug",
            "2658182": "Vaud",
            "2658205": "Valais",
            "2658226": "Uri",
            "2658370": "Ticino",
            "2658372": "Thurgau",
            "2658563": "Solothurn",
            "2658664": "Schwyz",
            "2658760": "Schaffhausen",
            "2658821": "Saint Gallen",
            "2659315": "Obwalden",
            "2659471": "Nidwalden",
            "2659495": "Neuchâtel",
            "2659810": "Lucerne",
            "2660207": "Jura",
            "2660522": "Grisons",
            "2660593": "Glarus",
            "2660645": "Geneva",
            "2660717": "Fribourg",
            "2661551": "Bern",
            "2661602": "Basel-City",
            "2661603": "Basel-Landschaft",
            "2661739": "Appenzell Ausserrhoden",
            "2661741": "Appenzell Innerrhoden",
            "2661876": "Aargau"
        },
        "2661886": {
            "604010": "Norrbotten",
            "2664179": "Västmanland",
            "2664292": "Västernorrland",
            "2664415": "Västerbotten",
            "2664870": "Värmland",
            "2666218": "Uppsala",
            "2673722": "Stockholm",
            "2676207": "Södermanland",
            "2685867": "Östergötland",
            "2686655": "Örebro",
            "2699050": "Kronoberg",
            "2699767": "Dalarna",
            "2702259": "Kalmar",
            "2702976": "Jönköping",
            "2703330": "Jämtland",
            "2708794": "Halland",
            "2711508": "Gotland",
            "2712411": "Gävleborg",
            "2721357": "Blekinge",
            "3337385": "Skåne",
            "3337386": "Västra Götaland"
        },
        "2750405": {
            "2743698": "South Holland",
            "2744011": "Zeeland",
            "2745909": "Utrecht",
            "2748838": "Overijssel",
            "2749879": "North Holland",
            "2749990": "North Brabant",
            "2751596": "Limburg",
            "2755249": "Groningen",
            "2755634": "Gelderland",
            "2755812": "Friesland",
            "2756631": "Drenthe",
            "3319179": "Flevoland"
        },
        "2782113": {
            "2761367": "Vienna",
            "2762300": "Vorarlberg",
            "2763586": "Tyrol",
            "2764581": "Styria",
            "2766823": "Salzburg",
            "2769848": "Upper Austria",
            "2770542": "Lower Austria",
            "2774686": "Carinthia",
            "2781194": "Burgenland"
        },
        "2802361": {
            "2800867": "Brussels Capital",
            "3337387": "Wallonia",
            "3337388": "Flanders"
        },
        "2921044": {
            "2822542": "Thuringia",
            "2838632": "Schleswig-Holstein",
            "2842565": "Saxony-Anhalt",
            "2842566": "Saxony",
            "2842635": "Saarland",
            "2847618": "Rheinland-Pfalz",
            "2861876": "North Rhine-Westphalia",
            "2862926": "Lower Saxony",
            "2872567": "Mecklenburg-Vorpommern",
            "2905330": "Hesse",
            "2911297": "Hamburg",
            "2944387": "Bremen",
            "2945356": "Brandenburg",
            "2950157": "Berlin",
            "2951839": "Bavaria",
            "2953481": "Baden-Württemberg"
        },
        "2960313": {
            "2959975": "Wiltz",
            "2960020": "Vianden",
            "2960152": "Remich",
            "2960161": "Redange",
            "2960275": "Mersch",
            "2960315": "Luxembourg",
            "2960514": "Grevenmacher",
            "2960599": "Esch-sur-Alzette",
            "2960629": "Echternach",
            "2960656": "Diekirch",
            "2960683": "Clervaux",
            "2960696": "Capellen"
        },
        "2963597": {
            "7521313": "Connaught",
            "7521314": "Leinster",
            "7521315": "Munster",
            "7521316": "Ulster"
        },
        "2993457": {
            "3319178": "-"
        },
        "3017382": {
            "2985244": "Provence-Alpes-Côte d'Azur",
            "2988289": "Pays de la Loire",
            "3012874": "Île-de-France",
            "3023519": "Corsica",
            "3027939": "Centre",
            "3030293": "Brittany",
            "11071619": "Bourgogne-Franche-Comté",
            "11071620": "Nouvelle-Aquitaine",
            "11071621": "Normandy",
            "11071622": "Grand Est",
            "11071623": "Occitanie",
            "11071624": "Hauts-de-France",
            "11071625": "Auvergne-Rhône-Alpes"
        },
        "3041565": {
            "3039162": "Sant Julià de Loria",
            "3039676": "Ordino",
            "3040131": "La Massana",
            "3040684": "Encamp",
            "3041203": "Canillo",
            "3041566": "Andorra la Vella",
            "3338529": "Escaldes-Engordany"
        },
        "3042058": {
            "3042031": "Vaduz",
            "3042034": "Triesenberg",
            "3042036": "Triesen",
            "3042038": "Schellenberg",
            "3042042": "Schaan",
            "3042047": "Ruggell",
            "3042050": "Planken",
            "3042056": "Mauren",
            "3042063": "Gamprin",
            "3042069": "Eschen",
            "3042074": "Balzers"
        },
        "3042142": {
            "3237072": "St Clement",
            "3237073": "St Saviour",
            "3237200": "St. Brelade",
            "3237203": "Grouville",
            "3237212": "St Mary",
            "3237214": "St Lawrence",
            "3237221": "St Peter",
            "3237229": "St Ouen",
            "3237497": "St John",
            "3237530": "Trinity",
            "3237716": "St Martîn",
            "3237864": "St Helier"
        },
        "3042225": {
            "9782164": "Andreas",
            "9782165": "Arbory",
            "9782166": "Ballaugh",
            "9782167": "Braddan",
            "9782168": "Bride",
            "9782169": "Castletown",
            "9782170": "Douglas",
            "9782171": "German",
            "9782172": "Jurby",
            "9782173": "Laxey",
            "9782176": "Lezayre",
            "9782180": "Lonan",
            "9782182": "Malew",
            "9782183": "Marown",
            "9782184": "Maughold",
            "9782185": "Michael",
            "9782186": "Onchan",
            "9782187": "Patrick",
            "9782188": "Peel",
            "9782189": "Port Erin",
            "9782190": "Port St Mary",
            "9782191": "Ramsey",
            "9782192": "Rushen",
            "9782193": "Santon"
        },
        "3042362": {
            "6417213": "St Pierre du Bois",
            "6417214": "Torteval",
            "6417215": "Saint Saviour",
            "6417223": "Forest",
            "6417224": "St Martin",
            "6417226": "Saint Andrew",
            "6417228": "St Peter Port",
            "6417229": "Castel",
            "6417230": "Vale",
            "6417233": "St Sampson",
            "8989934": "Alderney"
        },
        "3057568": {
            "865084": "Košický",
            "865085": "Prešovský",
            "3056506": "Žilinský",
            "3343954": "Banskobystrický",
            "3343955": "Bratislavský",
            "3343956": "Nitriansky",
            "3343957": "Trenčiansky",
            "3343958": "Trnavský"
        },
        "3077311": {
            "3067695": "Praha",
            "3339536": "South Moravian",
            "3339537": "Jihočeský",
            "3339538": "Vysočina",
            "3339539": "Karlovarský",
            "3339540": "Královéhradecký",
            "3339541": "Liberecký",
            "3339542": "Olomoucký",
            "3339573": "Moravskoslezský",
            "3339574": "Pardubický",
            "3339575": "Plzeňský",
            "3339576": "Central Bohemia",
            "3339577": "Ústecký",
            "3339578": "Zlín"
        },
        "3144096": {
            "780166": "Finnmark",
            "3132015": "Vestfold",
            "3132064": "Vest-Agder",
            "3133897": "Troms",
            "3134723": "Telemark",
            "3137400": "Sør-Trøndelag",
            "3137966": "Sogn og Fjordane",
            "3141558": "Rogaland",
            "3143188": "Østfold",
            "3143242": "Oslo",
            "3143487": "Oppland",
            "3144148": "Nord-Trøndelag",
            "3144301": "Nordland",
            "3145495": "Møre og Romsdal",
            "3151864": "Hordaland",
            "3153403": "Hedmark",
            "3159665": "Buskerud",
            "3162354": "Aust-Agder",
            "3163480": "Akershus"
        },
        "3168068": {
            "3166650": "Serravalle",
            "3178807": "Chiesanuova",
            "3345302": "San Marino",
            "3345303": "Acquaviva",
            "3345304": "Borgo Maggiore",
            "3345305": "Domagnano",
            "3345306": "Faetano",
            "3345307": "Fiorentino",
            "3345308": "Montegiardino"
        },
        "3175395": {
            "2523119": "Sicily",
            "2523228": "Sardinia",
            "2525468": "Calabria",
            "3164604": "Veneto",
            "3164857": "Aosta Valley",
            "3165048": "Umbria",
            "3165244": "Trentino-Alto Adige",
            "3165361": "Tuscany",
            "3169778": "Apulia",
            "3170831": "Piedmont",
            "3173222": "Molise",
            "3174004": "The Marches",
            "3174618": "Lombardy",
            "3174725": "Liguria",
            "3174976": "Latium",
            "3176525": "Friuli Venezia Giulia",
            "3177401": "Emilia-Romagna",
            "3181042": "Campania",
            "3182306": "Basilicate",
            "3183560": "Abruzzo"
        },
        "3190538": {
            "3186843": "Žalec",
            "3186905": "Zagorje ob Savi",
            "3187213": "Vrhnika",
            "3188687": "Tržič",
            "3188885": "Trebnje",
            "3188914": "Trbovlje",
            "3189037": "Tolmin",
            "3189074": "Velenje",
            "3190509": "Šmarje pri Jelšah",
            "3190529": "Slovenska Konjice",
            "3190533": "Slovenska Bistrica",
            "3190535": "Slovenj Gradec",
            "3190716": "Škofja Loka",
            "3190944": "Sežana",
            "3190949": "Sevnica",
            "3191028": "Sentjur",
            "3191679": "Ribnica",
            "3192062": "Radovljica",
            "3192120": "Radlje ob Dravi",
            "3192240": "Ptuj",
            "3192672": "Postojna",
            "3193340": "Piran-Pirano",
            "3193964": "Ormož",
            "3194350": "Novo Mesto",
            "3194451": "Nova Gorica",
            "3194647": "Murska Sobota",
            "3194791": "Mozirje",
            "3195213": "Metlika",
            "3195505": "Maribor",
            "3196288": "Logatec",
            "3196306": "Ljutomer",
            "3196424": "Litija",
            "3196684": "Lenart",
            "3196759": "Laško",
            "3197146": "Krško",
            "3197377": "Kranj",
            "3197752": "Koper-Capodistria",
            "3197942": "Kočevje",
            "3198364": "Kamnik",
            "3198646": "Jesenice",
            "3199016": "Izola-Isola",
            "3199130": "Ilirska Bistrica",
            "3199169": "Idrija",
            "3199296": "Hrastnik",
            "3199522": "Grosuplje",
            "3200196": "Gornja Radgona",
            "3201252": "Dravograd",
            "3201729": "Domžale",
            "3202332": "Črnomelj",
            "3202707": "Cerknica",
            "3202780": "Celje",
            "3203411": "Brežice",
            "3204853": "Ajdovščina",
            "3239050": "Hrpelje-Kozina",
            "3239051": "Divača",
            "3239054": "Pivka",
            "3239056": "Loška Dolina",
            "3239059": "Loški Potok",
            "3239061": "Osilnica",
            "3239062": "Velike Lašče",
            "3239066": "Škofljica",
            "3239069": "Ig",
            "3239071": "Brezovica",
            "3239073": "Borovnica",
            "3239075": "Vipava",
            "3239078": "Komen",
            "3239080": "Miren-Kostanjevica",
            "3239083": "Brda",
            "3239086": "Kanal",
            "3239087": "Žiri",
            "3239091": "Cerkno",
            "3239093": "Železniki",
            "3239095": "Gorenja Vas-Poljane",
            "3239096": "Dobrova-Horjul-Polhov Gradec",
            "3239098": "Kobarid",
            "3239100": "Bovec",
            "3239101": "Bohinj",
            "3239103": "Bled",
            "3239104": "Naklo",
            "3239105": "Kranjska Gora",
            "3239107": "Preddvor",
            "3239110": "Cerklje na Gorenjskem",
            "3239111": "Šenčur",
            "3239112": "Vodice",
            "3239113": "Medvode",
            "3239114": "Mengeš",
            "3239115": "Dol pri Ljubljani",
            "3239132": "Moravče",
            "3239133": "Gornji Grad",
            "3239134": "Luče",
            "3239175": "Ravne na Koroškem",
            "3239177": "Mežica",
            "3239179": "Muta",
            "3239180": "Vuzenica",
            "3239181": "Črna na Koroškem",
            "3239184": "Ljubno",
            "3239185": "Šoštanj",
            "3239187": "Šmartno ob Paki",
            "3239188": "Lukovica",
            "3239189": "Radeče",
            "3239191": "Ivančna Gorica",
            "3239193": "Dobrepolje",
            "3239195": "Semič",
            "3239197": "Šentjernej",
            "3239199": "Škocjan",
            "3239200": "Štore",
            "3239202": "Vojnik",
            "3239204": "Vitanje",
            "3239205": "Zreče",
            "3239207": "Mislinja",
            "3239211": "Ruše",
            "3239213": "Kungota",
            "3239214": "Šentilj",
            "3239215": "Pesnica",
            "3239216": "Duplek",
            "3239224": "Rače-Fram",
            "3239226": "Starše",
            "3239227": "Kidričevo",
            "3239229": "Majšperk",
            "3239231": "Videm",
            "3239234": "Rogaška Slatina",
            "3239237": "Rogatec",
            "3239241": "Podčetrtek",
            "3239243": "Kozje",
            "3239245": "Gorišnica",
            "3239247": "Zavrč",
            "3239248": "Dornava",
            "3239251": "Juršinci",
            "3239259": "Sveti Jurij",
            "3239262": "Radenci",
            "3239268": "Puconci",
            "3239270": "Rogašovci",
            "3239272": "Kuzma",
            "3239275": "Gornji Petrovci",
            "3239279": "Moravske Toplice",
            "3239280": "Kobilje",
            "3239282": "Beltinci",
            "3239283": "Turnišče",
            "3239285": "Odranci",
            "3239286": "Črenšovci",
            "3239294": "Nazarje",
            "3239318": "Ljubljana",
            "3344893": "Žirovnica",
            "3344894": "Jezersko",
            "3344895": "Solčava",
            "3344896": "Komenda",
            "3344897": "Horjul",
            "3344898": "Šempeter-Vrtojba",
            "3344899": "Bloke",
            "3344900": "Sodražica",
            "3344901": "Trzin",
            "3344902": "Prevalje",
            "3344903": "Vransko",
            "3344904": "Tabor",
            "3344905": "Braslovče",
            "3344906": "Polzela",
            "3344907": "Prebold",
            "3344908": "Kostel",
            "3344909": "Žužemberk",
            "3344910": "Dolenjske Toplice",
            "3344911": "Mirna Peč",
            "3344912": "Bistrica ob Sotli",
            "3344913": "Dobje",
            "3344914": "Dobrna",
            "3344915": "Oplotnica",
            "3344916": "Podvelka",
            "3344917": "Ribnica na Pohorju",
            "3344918": "Lovrenc na Pohorju",
            "3344919": "Selnica ob Dravi",
            "3344920": "Hoče-Slivnica",
            "3344921": "Miklavž na Dravskem Polju",
            "3344922": "Hajdina",
            "3344923": "Žetale",
            "3344924": "Podlehnik",
            "3344925": "Markovci",
            "3344926": "Destrnik",
            "3344927": "Trnovska Vas",
            "3344928": "Sveti Andraž v Slovenskih Goricah",
            "3344929": "Cerkvenjak",
            "3344930": "Benedikt",
            "3344931": "Sveta Ana",
            "3344932": "Križevci",
            "3344933": "Veržej",
            "3344934": "Velika Polana",
            "3344935": "Lendava-Lendva",
            "3344936": "Dobrovnik-Dobronak",
            "3344937": "Tišina",
            "3344938": "Cankova",
            "3344939": "Grad",
            "3344940": "Hodoš-Hodos",
            "3344941": "Razkrižje",
            "3344942": "Šmartno pri Litiji",
            "3344943": "Šalovci",
            "8133579": "Apače",
            "8133580": "Cirkulane",
            "8133581": "Kostanjevica na Krki",
            "8133582": "Log-Dragomer",
            "8133583": "Makole",
            "8133584": "Mokronog-Trebelno",
            "8133585": "Poljčane",
            "8133586": "Rečica ob Savinji",
            "8133587": "Renče-Vogrsko",
            "8133588": "Središče ob Dravi",
            "8133589": "Straža",
            "8133590": "Sv. Trojica v Slov. Goricah",
            "8133591": "Sveti Tomaž",
            "8133592": "Šentrupert",
            "8133593": "Šmarješke Toplice",
            "8469236": "Sveti Jurij v Slovenskih Goricah",
            "8986279": "Gorje",
            "11288217": "Comune di Ancarano",
            "11288255": "Mirna"
        },
        "3194884": {
            "786233": "Opština Rožaje",
            "3186995": "Opština Žabljak",
            "3188514": "Ulcinj",
            "3189071": "Tivat",
            "3189077": "Podgorica",
            "3191221": "Opština Šavnik",
            "3193129": "Opština Plužine",
            "3193160": "Pljevlja",
            "3193227": "Opština Plav",
            "3194493": "Opština Nikšić",
            "3194925": "Mojkovac",
            "3197537": "Kotor",
            "3197895": "Opština Kolašin",
            "3199070": "Berane",
            "3199393": "Herceg Novi",
            "3202193": "Danilovgrad",
            "3202640": "Cetinje",
            "3203104": "Budva",
            "3204173": "Bijelo Polje",
            "3204508": "Bar",
            "3343959": "Andrijevica",
            "11497642": "Gusinje",
            "11497643": "Petnjica"
        },
        "3202326": {
            "3337511": "Bjelovarsko-Bilogorska",
            "3337512": "Slavonski Brod-Posavina",
            "3337513": "Dubrovačko-Neretvanska",
            "3337514": "Istria",
            "3337515": "Karlovačka",
            "3337518": "Koprivničko-Križevačka",
            "3337519": "Krapinsko-Zagorska",
            "3337520": "Ličko-Senjska",
            "3337521": "Međimurska",
            "3337522": "Osječko-Baranjska",
            "3337523": "Požeško-Slavonska",
            "3337524": "Primorsko-Goranska",
            "3337525": "Šibensko-Kniniska",
            "3337526": "Sisačko-Moslavačka",
            "3337527": "Split-Dalmatia",
            "3337528": "Varaždinska",
            "3337529": "Vukovar-Sirmium",
            "3337530": "Zadarska",
            "3337531": "Zagrebačka",
            "3337532": "City of Zagreb",
            "3337533": "Virovitičk-Podravska"
        },
        "3277605": {
            "3229999": "Federation of B&H",
            "3230000": "Srspka",
            "3294903": "Brčko"
        },
        "3351879": {
            "145701": "Lunda Sul",
            "145702": "Luanda Norte",
            "875996": "Moxico",
            "876337": "Cuando Cobango",
            "2236355": "Zaire",
            "2236566": "Uíge",
            "2239858": "Malanje",
            "2240444": "Luanda",
            "2241660": "Cuanza Norte",
            "2243266": "Cabinda",
            "2243598": "Bengo",
            "3347016": "Namibe",
            "3348303": "Huíla",
            "3348310": "Huambo",
            "3349096": "Cunene",
            "3349234": "Kwanza Sul",
            "3351640": "Bíe",
            "3351660": "Benguela"
        },
        "3355338": {
            "1090052": "Zambezi",
            "3352137": "Khomas",
            "3371199": "Erongo",
            "3371200": "Hardap",
            "3371201": "Karas",
            "3371202": "Kunene",
            "3371203": "Ohangwena",
            "3371205": "Omaheke",
            "3371206": "Omusati",
            "3371207": "Oshana",
            "3371208": "Oshikoto",
            "3371209": "Otjozondjupa",
            "8693188": "Kavango East",
            "8693189": "Kavango West"
        },
        "3370751": {
            "2411430": "Ascension",
            "3370684": "Tristan da Cunha",
            "6930057": "Saint Helena"
        },
        "3374084": {
            "3373551": "Saint Thomas",
            "3373553": "Saint Philip",
            "3373554": "Saint Peter",
            "3373557": "Saint Michael",
            "3373565": "Saint Lucy",
            "3373568": "Saint Joseph",
            "3373569": "Saint John",
            "3373570": "Saint James",
            "3373572": "Saint George",
            "3373580": "Saint Andrew",
            "3373988": "Christ Church"
        },
        "3374766": {
            "3374161": "Tarrafal",
            "3374198": "São Vicente",
            "3374226": "Santa Catarina",
            "3374249": "Sal",
            "3374274": "Ribeira Grande",
            "3374332": "Praia",
            "3374391": "Paul",
            "3374487": "Maio",
            "3374832": "Brava",
            "3374855": "Boa Vista",
            "3411924": "Mosteiros",
            "3411925": "Santa Cruz",
            "3411926": "São Domingos",
            "3411927": "São Filipe",
            "3411928": "São Miguel",
            "7602868": "Porto Novo",
            "7602869": "Ribeira Brava",
            "7602870": "Santa Catarina do Fogo",
            "7602871": "São Salvador do Mundo",
            "7602872": "Tarrafal de São Nicolau",
            "7602873": "São Lourenço dos Órgãos",
            "7603281": "Ribeira Grande de Santiago"
        },
        "3378535": {
            "3375463": "Upper Takutu-Upper Essequibo",
            "3375469": "Upper Demerara-Berbice",
            "3376386": "Potaro-Siparuni",
            "3376407": "Pomeroon-Supenaam",
            "3377274": "Mahaica-Berbice",
            "3378741": "Essequibo Islands-West Demerara",
            "3378840": "East Berbice-Corentyne",
            "3378950": "Demerara-Mahaica",
            "3379023": "Cuyuni-Mazaruni",
            "3379515": "Barima-Waini"
        },
        "3381670": {
            "6690605": "Guyane"
        },
        "3382998": {
            "3382761": "Wanica",
            "3383062": "Sipaliwini",
            "3383110": "Saramacca",
            "3383329": "Paramaribo",
            "3383337": "Para",
            "3383438": "Nickerie",
            "3383560": "Marowijne",
            "3384397": "Coronie",
            "3384418": "Commewijne",
            "3384481": "Brokopondo"
        },
        "3424932": {
            "3424935": "Saint-Pierre",
            "3424938": "Miquelon-Langlade"
        },
        "3425505": {
            "7602003": "Qaasuitsup",
            "7602005": "Kujalleq",
            "7602006": "Qeqqata",
            "7602007": "Sermersooq"
        },
        "3437598": {
            "3437027": "San Pedro",
            "3437443": "Presidente Hayes",
            "3437599": "Paraguarí",
            "3437677": "Ñeembucú",
            "3437727": "Misiones",
            "3437923": "Itapúa",
            "3438049": "Guairá",
            "3438827": "Cordillera",
            "3438833": "Concepción",
            "3439137": "Central",
            "3439216": "Canindeyú",
            "3439296": "Caazapá",
            "3439312": "Caaguazú",
            "3439433": "Amambay",
            "3439440": "Alto Paraná",
            "3439441": "Alto Paraguay",
            "3474570": "Asunción",
            "3867442": "Boquerón"
        },
        "3439705": {
            "3439780": "Treinta y Tres",
            "3440033": "Tacuarembó",
            "3440054": "Soriano",
            "3440645": "San José",
            "3440711": "Salto",
            "3440771": "Rocha",
            "3440780": "Rivera",
            "3440789": "Río Negro",
            "3441242": "Paysandú",
            "3441572": "Montevideo",
            "3441890": "Maldonado",
            "3442007": "Lavalleja",
            "3442584": "Florida",
            "3442587": "Flores",
            "3442720": "Durazno",
            "3443025": "Colonia",
            "3443173": "Cerro Largo",
            "3443411": "Canelones",
            "3443756": "Artigas"
        },
        "3469034": {
            "3390290": "Rio Grande do Norte",
            "3392213": "Piauí",
            "3392268": "Pernambuco",
            "3393098": "Paraíba",
            "3393129": "Pará",
            "3395443": "Maranhão",
            "3402362": "Ceará",
            "3407762": "Amapá",
            "3408096": "Alagoas",
            "3447799": "Sergipe",
            "3448433": "São Paulo",
            "3450387": "Santa Catarina",
            "3451133": "Rio Grande do Sul",
            "3451189": "Rio de Janeiro",
            "3455077": "Paraná",
            "3457153": "Minas Gerais",
            "3457415": "Mato Grosso do Sul",
            "3457419": "Mato Grosso",
            "3462372": "Goiás",
            "3463504": "Federal District",
            "3463930": "Espírito Santo",
            "3471168": "Bahia",
            "3474575": "Tocantins",
            "3662560": "Roraima",
            "3665361": "Amazonas",
            "3665474": "Acre",
            "3924825": "Rondônia"
        },
        "3489940": {
            "3488081": "Westmoreland",
            "3488222": "Trelawny",
            "3488688": "St. Thomas",
            "3488693": "St. Mary",
            "3488700": "St. James",
            "3488708": "St. Elizabeth",
            "3488711": "Saint Catherine",
            "3488715": "St Ann",
            "3488716": "St. Andrew",
            "3488997": "Portland",
            "3489586": "Manchester",
            "3489853": "Kingston",
            "3490145": "Hanover",
            "3490952": "Clarendon"
        },
        "3508796": {
            "3492112": "Valverde",
            "3492912": "Santiago Rodríguez",
            "3492918": "Santiago",
            "3493031": "San Pedro de Macorís",
            "3493091": "San Juan",
            "3493186": "San Cristóbal",
            "3493192": "Sánchez Ramírez",
            "3493232": "Samaná",
            "3493282": "Hermanas Mirabal",
            "3494267": "Puerto Plata",
            "3495015": "Peravia",
            "3495136": "Pedernales",
            "3496024": "Nacional",
            "3496132": "Monte Plata",
            "3496200": "Monte Cristi",
            "3496274": "Monseñor Nouel",
            "3496772": "María Trinidad Sánchez",
            "3499977": "La Vega",
            "3500955": "La Romana",
            "3503706": "La Altagracia",
            "3504326": "Independencia",
            "3504766": "Hato Mayor",
            "3505867": "Espaillat",
            "3506189": "El Seíbo",
            "3507269": "Elías Piña",
            "3508718": "Duarte",
            "3508951": "Dajabón",
            "3512042": "Barahona",
            "3512050": "Baoruco",
            "3512209": "Azua",
            "6201372": "San José de Ocoa",
            "6201373": "Santo Domingo"
        },
        "3562981": {
            "3534168": "Villa Clara",
            "3536725": "Santiago de Cuba",
            "3540665": "Sancti Spíritus",
            "3544088": "Pinar del Río",
            "3547394": "Matanzas",
            "3550595": "Las Tunas",
            "3556608": "Isla de la Juventud",
            "3556965": "Holguín",
            "3557685": "Guantánamo",
            "3558052": "Granma",
            "3564073": "La Habana",
            "3564120": "Cienfuegos",
            "3564175": "Ciego de Ávila",
            "3566062": "Camagüey",
            "7668824": "Artemisa",
            "7668827": "Mayabeque"
        },
        "3570311": {
            "6690603": "Martinique"
        },
        "3572887": {
            "3571493": "San Salvador",
            "3571629": "Ragged Island",
            "3571809": "Berry Islands",
            "3571815": "New Providence",
            "3571894": "Mayaguana",
            "3572005": "Long Island",
            "3572154": "Inagua",
            "3572238": "Harbour Island",
            "3572374": "Freeport",
            "3572427": "Exuma",
            "3572678": "Cat Island",
            "3572807": "Bimini",
            "3572937": "Acklins",
            "8030541": "Black Point",
            "8030542": "Central Abaco",
            "8030543": "Central Andros",
            "8030544": "Central Eleuthera",
            "8030545": "Crooked Island and Long Cay",
            "8030546": "East Grand Bahama",
            "8030547": "Grand Cay",
            "8030548": "Hope Town",
            "8030549": "Mangrove Cay",
            "8030550": "Moore's Island",
            "8030551": "North Abaco",
            "8030552": "North Andros",
            "8030553": "North Eleuthera",
            "8030554": "Rum Cay",
            "8030555": "South Abaco",
            "8030556": "South Andros",
            "8030557": "South Eleuthera",
            "8030558": "Spanish Wells",
            "8030559": "West Grand Bahama"
        },
        "3573345": {
            "3572972": "Warwick",
            "3573026": "Southampton",
            "3573031": "Smithʼs",
            "3573050": "Sandys",
            "3573057": "Saint Georgeʼs",
            "3573062": "Saint George",
            "3573095": "Pembroke",
            "3573103": "Paget",
            "3573195": "Hamilton",
            "3573198": "Hamilton city",
            "3573251": "Devonshire"
        },
        "3573511": {
            "11205389": "Blowing Point",
            "11205392": "Sandy Ground",
            "11205393": "Sandy Hill",
            "11205396": "The Valley",
            "11205433": "East End",
            "11205436": "North Hill",
            "11205437": "West End",
            "11205438": "South Hill",
            "11205439": "The Quarter",
            "11205440": "North Side",
            "11205441": "Island Harbour",
            "11205442": "George Hill",
            "11205443": "Stoney Ground",
            "11205444": "The Farrington"
        },
        "3573591": {
            "3573606": "Tobago",
            "3573739": "City of San Fernando",
            "3573891": "City of Port of Spain",
            "3574155": "Mayaro",
            "3575052": "Borough of Arima",
            "7521937": "Chaguanas",
            "7521938": "Couva-Tabaquite-Talparo",
            "7521939": "Diego Martin",
            "7521941": "Penal/Debe",
            "7521942": "Princes Town",
            "7521943": "Point Fortin",
            "7521944": "Sangre Grande",
            "7521945": "Siparia",
            "7521946": "San Juan/Laventille",
            "7521947": "Tunapuna/Piarco"
        },
        "3575174": {
            "3575114": "Trinity Palmetto Point",
            "3575164": "Middle Island",
            "3575165": "Saint Thomas Lowland",
            "3575168": "Saint Peter Basseterre",
            "3575171": "Saint Paul Charlestown",
            "3575172": "Saint Paul Capesterre",
            "3575173": "Saint Mary Cayon",
            "3575175": "Saint John Figtree",
            "3575176": "Saint John Capesterre",
            "3575177": "Saint James Windwa",
            "3575179": "Saint George Gingerland",
            "3575180": "Saint George Basseterre",
            "3575183": "Saint Anne Sandy Point",
            "3575476": "Christ Church Nichola Town"
        },
        "3575830": {
            "3575618": "Saint Peter",
            "3575619": "Saint Paul",
            "3575620": "Saint Patrick",
            "3575621": "Saint Mark",
            "3575622": "Saint Luke",
            "3575625": "Saint Joseph",
            "3575626": "Saint John",
            "3575628": "Saint George",
            "3575630": "Saint David",
            "3575632": "Saint Andrew"
        },
        "3576396": {
            "3576015": "Saint Philip",
            "3576016": "Saint Peter",
            "3576017": "Saint Paul",
            "3576018": "Saint Mary",
            "3576023": "Saint John",
            "3576024": "Saint George",
            "3576037": "Redonda",
            "3576390": "Barbuda"
        },
        "3576468": {
            "3576413": "Vieux-Fort",
            "3576441": "Soufrière",
            "3576567": "Micoud",
            "3576662": "Laborie",
            "3576685": "Gros-Islet",
            "3576764": "Dennery",
            "3576794": "Choiseul",
            "3576810": "Castries",
            "3576891": "Anse-la-Raye",
            "11351387": "Canaries"
        },
        "3577815": {
            "3577818": "Saint Patrick",
            "3577819": "Saint George",
            "3577821": "Saint David",
            "3577822": "Saint Andrew",
            "3577892": "Grenadines",
            "3577934": "Charlotte"
        },
        "3578097": {
            "3578039": "Saint Peter",
            "3578044": "Saint Georges",
            "3578045": "Saint Anthony"
        },
        "3579143": {
            "6690363": "Guadeloupe"
        },
        "3580239": {
            "3579907": "Saint Patrick",
            "3579913": "Saint Mark",
            "3579919": "Saint John",
            "3579926": "Saint George",
            "3579932": "Saint David",
            "3579938": "Saint Andrew",
            "7303836": "Carriacou and Petite Martinique"
        },
        "3580718": {
            "10346796": "George Town",
            "10375968": "West Bay",
            "10375969": "Bodden Town",
            "10375970": "North Side",
            "10375971": "East End",
            "10375972": "Sister Island"
        },
        "3582678": {
            "3580913": "Toledo",
            "3580975": "Stann Creek",
            "3581511": "Orange Walk",
            "3582302": "Corozal",
            "3582429": "Cayo",
            "3582676": "Belize"
        },
        "3585968": {
            "3582882": "Usulután",
            "3583101": "Sonsonate",
            "3583176": "San Vicente",
            "3583332": "Santa Ana",
            "3583360": "San Salvador",
            "3583462": "San Miguel",
            "3584317": "Morazán",
            "3584767": "La Unión",
            "3585087": "La Paz",
            "3585155": "La Libertad",
            "3586831": "Cuscatlán",
            "3587090": "Chalatenango",
            "3587217": "Cabañas",
            "3587425": "Ahuachapán"
        },
        "3595528": {
            "3587586": "Zacapa",
            "3588257": "Totonicapán",
            "3588668": "Suchitepeque",
            "3588697": "Sololá",
            "3589172": "Santa Rosa",
            "3589801": "San Marcos",
            "3590686": "Sacatepéquez",
            "3590857": "Retalhuleu",
            "3590964": "Quiché",
            "3590978": "Quetzaltenango",
            "3591410": "Petén",
            "3595067": "Jutiapa",
            "3595236": "Jalapa",
            "3595259": "Izabal",
            "3595415": "Huehuetenango",
            "3595530": "Guatemala",
            "3595802": "Escuintla",
            "3596416": "El Progreso",
            "3598464": "Chiquimula",
            "3598571": "Chimaltenango",
            "3599602": "Baja Verapaz",
            "3599773": "Alta Verapaz"
        },
        "3608932": {
            "3600193": "Yoro",
            "3600456": "Valle",
            "3601689": "Santa Bárbara",
            "3604249": "Olancho",
            "3604318": "Ocotepeque",
            "3606066": "Lempira",
            "3607251": "La Paz",
            "3608814": "Bay Islands",
            "3608833": "Intibucá",
            "3609583": "Gracias a Dios",
            "3609672": "Francisco Morazán",
            "3610942": "El Paraíso",
            "3613140": "Cortés",
            "3613229": "Copán",
            "3613319": "Comayagua",
            "3613358": "Colón",
            "3613527": "Choluteca",
            "3615027": "Atlántida"
        },
        "3617476": {
            "3617051": "Rivas",
            "3617056": "Río San Juan",
            "3617458": "Nueva Segovia",
            "3617707": "Matagalpa",
            "3617722": "Masaya",
            "3617762": "Managua",
            "3617796": "Madriz",
            "3618029": "León",
            "3618928": "Jinotega",
            "3619135": "Granada",
            "3619193": "Estelí",
            "3620368": "Chontales",
            "3620380": "Chinandega",
            "3620481": "Carazo",
            "3620673": "Boaco",
            "3830307": "Atlántico Norte",
            "3830308": "Atlántico Sur"
        },
        "3624060": {
            "3621837": "San José",
            "3622226": "Puntarenas",
            "3623064": "Limón",
            "3623484": "Heredia",
            "3623582": "Guanacaste",
            "3624368": "Cartago",
            "3624953": "Alajuela"
        },
        "3625428": {
            "3625035": "Zulia",
            "3625210": "Yaracuy",
            "3625974": "Trujillo",
            "3626553": "Táchira",
            "3626655": "Sucre",
            "3629941": "Portuguesa",
            "3631462": "Nueva Esparta",
            "3632100": "Monagas",
            "3632191": "Miranda",
            "3632306": "Mérida",
            "3636539": "Lara",
            "3640017": "Guárico",
            "3640846": "Dependencias Federales",
            "3640847": "Capital",
            "3640873": "Falcón",
            "3644541": "Delta Amacuro",
            "3645386": "Cojedes",
            "3646751": "Carabobo",
            "3648106": "Bolívar",
            "3648544": "Barinas",
            "3649110": "Aragua",
            "3649151": "Apure",
            "3649198": "Anzoátegui",
            "3649302": "Amazonas",
            "3830309": "Vargas"
        },
        "3658394": {
            "3649953": "Zamora-Chinchipe",
            "3650445": "Tungurahua",
            "3653224": "Pichincha",
            "3653392": "Pastaza",
            "3653890": "Napo",
            "3654005": "Morona-Santiago",
            "3654451": "Manabí",
            "3654592": "Los Ríos",
            "3654665": "Loja",
            "3655635": "Imbabura",
            "3657505": "Guayas",
            "3657879": "Galápagos",
            "3657986": "Esmeraldas",
            "3658195": "El Oro",
            "3658766": "Cotopaxi",
            "3659237": "Chimborazo",
            "3659718": "Carchi",
            "3659849": "Cañar",
            "3660130": "Bolívar",
            "3660431": "Azuay",
            "3830305": "Sucumbios",
            "3830306": "Orellana",
            "7062136": "Santo Domingo de los Tsáchilas",
            "7062138": "Santa Elena"
        },
        "3686110": {
            "3666082": "Vichada",
            "3666254": "Vaupés",
            "3666313": "Valle del Cauca",
            "3666951": "Tolima",
            "3667725": "Sucre",
            "3668578": "Santander",
            "3670205": "San Andres y Providencia",
            "3670698": "Risaralda",
            "3671087": "Quindío",
            "3671178": "Putumayo",
            "3673798": "Norte de Santander",
            "3674021": "Nariño",
            "3674810": "Meta",
            "3675686": "Magdalena",
            "3678847": "La Guajira",
            "3680692": "Huila",
            "3681344": "Guaviare",
            "3681652": "Guainía",
            "3685413": "Cundinamarca",
            "3685889": "Córdoba",
            "3686431": "Chocó",
            "3686880": "Cesar",
            "3687029": "Cauca",
            "3687173": "Casanare",
            "3687479": "Caquetá",
            "3687951": "Caldas",
            "3688536": "Boyacá",
            "3688650": "Bolívar",
            "3688685": "Bogota D.C.",
            "3689436": "Atlántico",
            "3689717": "Arauca",
            "3689815": "Antioquia",
            "3689982": "Amazonas"
        },
        "3703430": {
            "3700159": "Veraguas",
            "3701537": "Guna Yala",
            "3703433": "Panamá",
            "3704961": "Los Santos",
            "3708710": "Herrera",
            "3711671": "Darién",
            "3712073": "Colón",
            "3712162": "Coclé",
            "3712410": "Chiriquí",
            "3713954": "Bocas del Toro",
            "7303686": "Emberá",
            "7303688": "Ngöbe-Buglé",
            "11353126": "Panamá Oeste"
        },
        "3723988": {
            "3716950": "Sud-Est",
            "3716952": "Sud",
            "3719432": "Ouest",
            "3719536": "Nord-Ouest",
            "3719540": "Nord-Est",
            "3719543": "Nord",
            "3724613": "GrandʼAnse",
            "3728069": "Centre",
            "3731053": "Artibonite",
            "7115999": "Nippes"
        },
        "3865483": {
            "3430657": "Misiones",
            "3433896": "Formosa",
            "3433955": "Buenos Aires F.D.",
            "3434137": "Entre Rios",
            "3435214": "Corrientes",
            "3435907": "Buenos Aires",
            "3833578": "Tucuman",
            "3834450": "Tierra del Fuego",
            "3835868": "Santiago del Estero",
            "3836276": "Santa Fe",
            "3836350": "Santa Cruz",
            "3837029": "San Luis",
            "3837152": "San Juan",
            "3838231": "Salta",
            "3838830": "Rio Negro",
            "3843122": "Neuquen",
            "3844419": "Mendoza",
            "3848949": "La Rioja",
            "3849574": "La Pampa",
            "3853404": "Jujuy",
            "3860255": "Cordoba",
            "3861244": "Chubut",
            "3861887": "Chaco",
            "3862286": "Catamarca"
        },
        "3895114": {
            "3868621": "Valparaíso",
            "3870116": "Tarapacá",
            "3873544": "Santiago Metropolitan",
            "3880306": "Maule",
            "3881974": "Los Lagos",
            "3883281": "O'Higgins",
            "3893623": "Coquimbo",
            "3898380": "Biobío",
            "3899191": "Atacama",
            "3899463": "Araucanía",
            "3899537": "Antofagasta",
            "3900333": "Aisén",
            "4036650": "Magallanes",
            "6693562": "Arica y Parinacota",
            "6693563": "Los Ríos"
        },
        "3923057": {
            "3903319": "Tarija",
            "3904907": "Santa Cruz",
            "3907580": "Potosí",
            "3908600": "Pando",
            "3909233": "Oruro",
            "3911924": "La Paz",
            "3919966": "Cochabamba",
            "3920177": "Chuquisaca",
            "3923172": "El Beni"
        },
        "3932488": {
            "3691099": "Ucayali",
            "3691146": "Tumbes",
            "3692385": "San Martín",
            "3693525": "Piura",
            "3695238": "Loreto",
            "3695753": "Lambayeque",
            "3695781": "La Libertad",
            "3696416": "Huanuco",
            "3699087": "Cajamarca",
            "3699674": "Ancash",
            "3699699": "Amazonas",
            "3928127": "Tacna",
            "3931275": "Puno",
            "3932834": "Pasco",
            "3934607": "Moquegua",
            "3935619": "Madre de Dios",
            "3936451": "Lima",
            "3936452": "Lima region",
            "3937485": "Junin",
            "3938526": "Ica",
            "3939467": "Huancavelica",
            "3941583": "Cusco",
            "3946080": "Callao",
            "3947018": "Ayacucho",
            "3947319": "Arequipa",
            "3947421": "Apurímac"
        },
        "3996063": {
            "3514211": "Yucatán",
            "3514780": "Veracruz",
            "3515359": "Tlaxcala",
            "3516391": "Tamaulipas",
            "3516458": "Tabasco",
            "3520887": "Quintana Roo",
            "3520914": "Querétaro",
            "3521082": "Puebla",
            "3522509": "Oaxaca",
            "3522542": "Nuevo León",
            "3522961": "Morelos",
            "3523272": "México",
            "3527115": "Hidalgo",
            "3527213": "Guerrero",
            "3527646": "Mexico City",
            "3531011": "Chiapas",
            "3531730": "Campeche",
            "3979840": "Zacatecas",
            "3982846": "Sonora",
            "3983035": "Sinaloa",
            "3985605": "San Luis Potosí",
            "3995012": "Nayarit",
            "3995955": "Michoacán",
            "4004156": "Jalisco",
            "4005267": "Guanajuato",
            "4011741": "Durango",
            "4013513": "Colima",
            "4013674": "Coahuila",
            "4014336": "Chihuahua",
            "4017698": "Baja California Sur",
            "4017700": "Baja California",
            "4019231": "Aguascalientes"
        },
        "4030656": {
            "4019991": "Îles Marquises",
            "4030621": "Îles Tuamotu-Gambier",
            "4034364": "Leeward Islands",
            "4034365": "Îles du Vent",
            "4034366": "Îles Australes"
        },
        "4030945": {
            "2110215": "Gilbert Islands",
            "4030940": "Line Islands",
            "7521379": "Phoenix Islands"
        },
        "4031074": {
            "4031091": "Nukunonu",
            "4031112": "Fakaofo",
            "4031116": "Atafu"
        },
        "4032283": {
            "4032231": "Vava'u",
            "4032279": "Tongatapu",
            "4032637": "Ha ' apai",
            "7668021": "ʻEua",
            "7668055": "Niuas"
        },
        "4034749": {
            "4034759": "Uvea",
            "4034776": "Sigave",
            "4034884": "Alo"
        },
        "4034894": {
            "4034910": "Vaisigano",
            "4034943": "Va ' a-o-Fonoti",
            "4034977": "Tuamasaga",
            "4035046": "Satupa ' itea",
            "4035154": "Palauli",
            "4035313": "Gagaifomauga",
            "4035314": "Gaga ' emauga",
            "4035383": "Fa ' asaleleaga",
            "4035402": "Atua",
            "4035425": "Aiga-i-le-Tai",
            "4035434": "A'ana"
        },
        "4041468": {
            "4041530": "Rota",
            "4041552": "Saipan",
            "4041650": "Tinian",
            "7733156": "Northern Islands"
        },
        "4043988": {
            "4038478": "Piti",
            "4038555": "Santa Rita",
            "4038590": "Sinajana",
            "4038652": "Talofofo",
            "4038661": "Tamuning",
            "4038739": "Umatac",
            "4038796": "Yigo",
            "4038811": "Yona",
            "4043396": "Merizo",
            "4043416": "Mangilao",
            "4043524": "Agana Heights",
            "4043614": "Chalan Pago-Ordot",
            "4043691": "Asan",
            "4043725": "Agat",
            "4043877": "Dededo",
            "4043885": "Barrigada",
            "4044019": "Hagatna",
            "4044041": "Inarajan",
            "4044148": "Mongmong-Toto-Maite"
        },
        "4566966": {
            "4562487": "Adjuntas",
            "4562503": "Aguada",
            "4562512": "Aguadilla",
            "4562516": "Aguas Buenas",
            "4562531": "Aibonito",
            "4562605": "Añasco",
            "4562640": "Arecibo",
            "4562682": "Arroyo",
            "4562771": "Barceloneta",
            "4562779": "Barranquitas",
            "4562837": "Bayamón",
            "4562997": "Cabo Rojo",
            "4563011": "Caguas",
            "4563065": "Camuy",
            "4563169": "Canovanas",
            "4563244": "Carolina",
            "4563299": "Catano",
            "4563309": "Cayey",
            "4563380": "Ceiba",
            "4563774": "Ciales",
            "4563778": "Cidra",
            "4563812": "Coamo",
            "4563921": "Comerio",
            "4564004": "Corozal",
            "4564071": "Culebra",
            "4564134": "Dorado",
            "4564949": "Fajardo",
            "4564993": "Florida",
            "4565091": "Guanica",
            "4565107": "Guayama",
            "4565112": "Guayanilla",
            "4565120": "Guaynabo",
            "4565126": "Gurabo",
            "4565348": "Hatillo",
            "4565381": "Hormigueros",
            "4565449": "Humacao",
            "4565581": "Isabela",
            "4565684": "Municipio de Jayuya",
            "4565713": "Juana Diaz",
            "4565720": "Municipio de Juncos",
            "4565900": "Lajas",
            "4565910": "Lares",
            "4565961": "Las Marias",
            "4565981": "Las Piedras",
            "4566025": "Loiza",
            "4566106": "Luquillo",
            "4566138": "Manati",
            "4566180": "Maricao",
            "4566209": "Maunabo",
            "4566217": "Mayaguez",
            "4566272": "Moca",
            "4566334": "Morovis",
            "4566397": "Naguabo",
            "4566403": "Naranjito",
            "4566456": "Orocovis",
            "4566654": "Patillas",
            "4566689": "Penuelas",
            "4566886": "Ponce",
            "4567727": "Rincon",
            "4567734": "Quebradillas",
            "4567823": "Rio Grande",
            "4568015": "Sabana Grande",
            "4568043": "Salinas",
            "4568105": "San German",
            "4568138": "San Juan",
            "4568150": "San Lorenzo",
            "4568177": "San Sebastian",
            "4568213": "Santa Isabel Municipio",
            "4568404": "Toa Alta",
            "4568408": "Toa Baja",
            "4568452": "Trujillo Alto",
            "4568491": "Utuado",
            "4568529": "Vega Alta",
            "4568534": "Vega Baja",
            "4568684": "Villalba",
            "4568909": "Yabucoa",
            "4568918": "Yauco",
            "4568924": "Vieques"
        },
        "4796775": {
            "7267902": "Saint Croix Island",
            "7267903": "Saint John Island",
            "7267904": "Saint Thomas Island"
        },
        "5854968": {
            "4041685": "Wake Island",
            "4743755": "Navassa Island",
            "5854907": "Baker Island",
            "5854922": "Howland Island",
            "5854926": "Jarvis Island",
            "5854929": "Johnston Atoll",
            "5854936": "Kingman Reef",
            "5854943": "Midway Islands",
            "5854952": "Palmyra Atoll"
        },
        "5880801": {
            "5880873": "Western District",
            "5881199": "Swains Island",
            "5881219": "Eastern District",
            "5881436": "Manu'a",
            "7309441": "Rose Island"
        },
        "6251999": {
            "5883102": "Alberta",
            "5909050": "British Columbia",
            "6065171": "Manitoba",
            "6087430": "New Brunswick",
            "6091069": "Northwest Territories",
            "6091530": "Nova Scotia",
            "6091732": "Nunavut",
            "6093943": "Ontario",
            "6113358": "Prince Edward Island",
            "6115047": "Quebec",
            "6141242": "Saskatchewan",
            "6185811": "Yukon",
            "6354959": "Newfoundland and Labrador"
        },
        "6252001": {
            "4099753": "Arkansas",
            "4138106": "Washington",
            "4142224": "Delaware",
            "4155751": "Florida",
            "4197000": "Georgia",
            "4273857": "Kansas",
            "4331987": "Louisiana",
            "4361885": "Maryland",
            "4398678": "Missouri",
            "4436296": "Mississippi",
            "4482348": "North Carolina",
            "4544379": "Oklahoma",
            "4597040": "South Carolina",
            "4662168": "Tennessee",
            "4736286": "Texas",
            "4826850": "West Virginia",
            "4829764": "Alabama",
            "4831725": "Connecticut",
            "4862182": "Iowa",
            "4896861": "Illinois",
            "4921868": "Indiana",
            "4971068": "Maine",
            "5001836": "Michigan",
            "5037779": "Minnesota",
            "5073708": "Nebraska",
            "5090174": "New Hampshire",
            "5101760": "New Jersey",
            "5128638": "New York",
            "5165418": "Ohio",
            "5224323": "Rhode Island",
            "5242283": "Vermont",
            "5279468": "Wisconsin",
            "5332921": "California",
            "5417618": "Colorado",
            "5481136": "New Mexico",
            "5509151": "Nevada",
            "5549030": "Utah",
            "5551752": "Arizona",
            "5596512": "Idaho",
            "5667009": "Montana",
            "5690763": "North Dakota",
            "5744337": "Oregon",
            "5769223": "South Dakota",
            "5815135": "Washington",
            "5843591": "Wyoming",
            "5855797": "Hawaii",
            "5879092": "Alaska",
            "6254925": "Kentucky",
            "6254926": "Massachusetts",
            "6254927": "Pennsylvania",
            "6254928": "Virginia"
        },
        "6254930": {
            "281132": "Gaza Strip",
            "285153": "West Bank"
        },
        "6290252": {
            "784272": "Vojvodina",
            "785958": "Central Serbia"
        },
        "7626844": {
            "7609816": "Bonaire",
            "7610358": "Saba",
            "7610359": "Sint Eustatius"
        },
        "7909807": {
            "367894": "Ruweng",
            "9072661": "Maiwut",
            "9407085": "Akobo",
            "11550543": "Aweil",
            "11550544": "Eastern Lakes",
            "11550545": "Gogrial",
            "11550548": "Lol",
            "11550552": "Amadi State",
            "11550555": "Yei River",
            "11550558": "Fashoda",
            "11550562": "Gok",
            "11550563": "Tonj",
            "11550564": "Twic",
            "11550565": "Wau",
            "11550566": "Gbudwe",
            "11550567": "Imatong",
            "11550569": "Jubek",
            "11550570": "Maridi",
            "11550571": "Terekeka",
            "11550573": "Boma",
            "11550574": "Bieh",
            "11550575": "Central Upper Nile",
            "11550576": "Jonglei",
            "11550577": "Latjoor",
            "11550578": "Northern Liech",
            "11550579": "Southern Liech",
            "11550580": "Fangak",
            "11550581": "Western Lakes",
            "11550582": "Aweil East",
            "11550588": "Northern Upper Nile",
            "11550589": "Tambura",
            "11550596": "Kapoeta"
        }
    }
};
                    //};

                    return geoIds;

                }]);

}(angular));


;(function(ng) {

	'use strict';

	var _module = ng.module('app.helpers');

	// getlocator factory definition
	_module.factory('$geolocator', ['$q', function($q) {

		// geo options for Google API
		var geo_options = {
			enableHighAccuracy: true, 
			maximumAge: 30000, 
			timeout: 27000,
			requestAddress: true
		};

		// error handler
		function geo_error(error) {
			var errorDescription = i18n.i18nString('location');
			if(error) {
				switch(error.code) {
					case error.PERMISSION_DENIED:
						errorDescription =i18n.i18nString('user_geolocation') ;
					break;
					case error.POSITION_UNAVAILABLE:
						errorDescription = i18n.i18nString('no_locations');
					break;
					case error.TIMEOUT:
						errorDescription = i18n.i18nString('request_location');
					break;
					case error.UNKNOWN_ERROR:
						errorDescription = i18n.i18nString('unknown_error');
					break;
				}
			}

			return errorDescription;
		}

		// gets the location from coordinates or from address
		function getLocation(location){
			var geocoder = new google.maps.Geocoder(),
				config = {},
				locations = [];

			var deferred = $q.defer();

			if(typeof location === 'string') { // it's address
				config.address = location;
			} else { // it's coordinates
				config.latLng = new google.maps.LatLng(location.latitude, location.longitude);
			}

			geocoder.geocode(config, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					locations = results.map(function(result) {
						return {
							address: result.formatted_address,
							coords: {
								latitude: result.geometry.location.lat(),
								longitude: result.geometry.location.lng()
							}
						};
					});

					deferred.resolve({locations: locations});

				} else {
					var error = i18n.i18nString('could_location') + status;
					deferred.resolve({locations: [], error: error});
				}
			});

			return deferred.promise;
		}

		// gets current coordinates
		function getCurrentCoordinates() {
			if(typeof navigator.geolocation === 'undefined') {
    			return;
    		}

    		var deferred = $q.defer();

    		// Get client location
    		navigator.geolocation.getCurrentPosition(function(location) {
    			var currentCoords = {
					latitude: location.coords.latitude, 
					longitude: location.coords.longitude
				};
				deferred.resolve({location: currentCoords});
    		}, function(error) {
    			deferred.resolve({locations: [], error: geo_error(error)});
    		}, geo_options);

    		return deferred.promise;
		}

		return {
			getCurrentCoordinates: getCurrentCoordinates,
			getLocation: getLocation
		};

	}]);

})(angular);

;/*
 * @summary i18n helper file
 * @author Rajasekhar <rajasekhar.balla@kore.com>
 *
 * Usage:
 *   In JS files:
 *       i18n.i18nString('lang')
 *           where i18n is dependency need to be included,
 *           lang is a key in lang file located in translations folder 
 *       i18n.i18nString('lang',{dyn:"12345"})
 *            with dynamic values.In language files use "my content {{dyn}}"
 *   In HTML files  
 *  
 *       {{'lang'| i18nString}}
 *           where lang is a key in lang file located in translations folder 
 *       {{'lang'| i18nString:({dyn:"12345"})}}
 *       {{'lang'| i18nString:({dyn:botDetails.name})}}
 *           with dynamic values
 */
(function (ng) {

    'use strict';
    var _module = ng.module('app.helpers');

    function genRandQuery() {
        return 'rnd=' + Math.random().toString(36).substr(7);
    }
    _module.factory('i18n', ['$interpolate', '$http', '$q', '$timeout', 'env_conf','_constants_','$rootScope','$injector', function ($interpolate, $http, $q, $timeout, env_conf,_constants_,$rootScope,$injector) {
            var currentLanguage = 'en';
            var tables = {};
            return {
                setCurrentLanguage: function (newCurrentLanguage) {
                    var workflowService=$injector.get("$workflowService");
                    
                    var localstore=  $injector.get("localstore");
                    var jStorage = localstore.getAuthData();
                    var selectedQueryParamLanguage= localStorage.getItem('queryParamLang');
                    if (jStorage && jStorage.currentAccount) {
                        var userData = jStorage.currentAccount;
                        var lang= userData.userInfo.personalInfo.language;
                        newCurrentLanguage= lang;
                    }
                    if(selectedQueryParamLanguage){
                        newCurrentLanguage = selectedQueryParamLanguage;
                        if (jStorage && jStorage.currentAccount) {
                        var userDataValue = jStorage.currentAccount;
                        if(userDataValue  && userDataValue.userInfo && userDataValue.userInfo.personalInfo){
                            userDataValue.userInfo.personalInfo.language  =newCurrentLanguage;
                            if(jStorage && jStorage.currentAccount && jStorage.currentAccount.userInfo && jStorage.currentAccount.userInfo.personalInfo){
                                jStorage.currentAccount.userInfo.personalInfo.language = newCurrentLanguage;
                            }
                            localstore.setAuthData(jStorage);
                        }
                        }
                    }
                    var deferred = $q.defer();
                    currentLanguage = newCurrentLanguage;                    
                    if(currentLanguage == "ja"){
                    $("body").addClass("japaneseMainModule");
                    }
                    if(currentLanguage == "ko"){
                        $("body").addClass("koreanLangMainModule");
                    }
                    workflowService.i18nSelectedLanguage(currentLanguage);
                    workflowService.serveri18nLang(currentLanguage);
                    if (!tables.newCurrentLanguage) {
                        //$timeout(function(){
                        var url = env_conf['components-source'];
                      $rootScope.i18nLoading = true;
                        $http.get(url + '/translations/' + currentLanguage + '.json?' + genRandQuery())
                                .then(function (res) {
                                    tables[currentLanguage] = $.extend(true, {}, res.data);
                                    _constants_.load();
                                    $timeout(function () {
                                        $rootScope.i18nLoading = false;
                                        deferred.resolve();
                                        $rootScope.$emit('loadMainCtrl');                                       
                                    }, 200);
                                }, function (error) {
                                    deferred.reject({error: "Failed loading lang file"});
                                });
                        //},5000);
                    }
                    return deferred.promise;
                },
                getCurrentLanguage: function () {
                    return currentLanguage;
                },
                i18nString: function (label, parameters) {
                    if (!tables[currentLanguage]) {
                        return "";
                    }
                    if (parameters === null || $.isEmptyObject(parameters)) {
                        return tables[currentLanguage][label];
                    } else {
                        return $interpolate(
                                tables[currentLanguage][label])(
                                parameters);
                    }
                }
            };
        }]);

    _module.filter('i18nString', ['i18n', function (i18n) {
            return function (label, parms) {
                return i18n.i18nString(label, parms);
            };
        }]);

})(angular);

;(function (ng) {

    'use strict';

    var _module = ng.module('app.helpers');

    _module.service('interactiveHelp', ['$rootScope', '$timeout','env_conf','jsEvents',
        function ($rootScope, $timeout,env_conf,jsEvents) {
            //inline manual topic ids
            var topicHelpMap = {
                BOT_WALK_THROUGH: '90751',
                PROCESSAPP_WALK_THROUGH: '92432',
                PRODUCT_TOUR: '',
                TAKE_TOUR: "64679",//this can be overridden by version below with takeTourVersionMap//"64679", //"60493",//What's New
                BUILD_HELLO_BOT:'92368',
                CREATE_BOT_ALERT:'91362',
                CREATE_BOT_DIALOG:'91793',
                CREATE_BOT_KT:'91358',
                TRAINING_WALK_THROUGH:"91617",
                CONVERSE_DIALOG_WALK_THROUGH:"91737"
            };
            var takeTourVersionMap = {
                '7.0': '64679',
                '7.1': '69651',
                '7.2': '72280',
                '7.3': '78259',
                '8.0': '83013',
                '8.1': '86568',
                '9.0': '91278',
                '9.1': '94111',
                '9.2': '97845'
            };//make sure it supports only major and minor versions format.
            //Allowed X.X(7.0)
            //Not Allowed X.X.X or X.X.X.X or X  
            //update takTourVersionMap version in-correspondance with service version otherwise default take_tour i.e:64679 will be executed.
            
           

            var takTourVersion = function(){
                 var appVersion = env_conf['app-version'];
                 var _majorMinorVersion = parseFloat(env_conf['app-version']).toFixed(1).toString();
                 if (_majorMinorVersion && takeTourVersionMap[_majorMinorVersion]) {
                    topicHelpMap.TAKE_TOUR = takeTourVersionMap[_majorMinorVersion];
                }
            };

            
            
            this.openHelp = function (helpId) {
                if (topicHelpMap[helpId] && window.inline_manual_player) {
                    $rootScope.$broadcast('closeHelp');
                    if(helpId==='CONVERSE_DIALOG_WALK_THROUGH'){
                        jsEvents.postMessageToChildIframes('inlinemanual_topic_trigger', '#dialogIFrame',{
                            topicId:topicHelpMap[helpId]
                        });
                    } else if(helpId === 'PROCESSAPP_WALK_THROUGH') {
                        jsEvents.postMessageToChildIframes('processapp_walkthrough_trigger', '#dialogIFrame',{
                            topicId:topicHelpMap[helpId]
                        });
                    } else {
                        inline_manual_player.activateTopic(topicHelpMap[helpId]);
                    }
                }
            };
            this.topicHelpMap=topicHelpMap;
            this.takTourVersion = takTourVersion;
            this.takTourVersion();
        }]);

})(angular);



;/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (ng) {
    'use strict';
    var _module = ng.module('app.helpers');

    _module.factory('AuthInterceptor', function ($q, $injector, jsEvents,$rootScope) {
        // var jsEvents=$injector.get("jsEvents");
        var localstore=$injector.get("localstore");
        var inFlightAuthRequest = null;
        var reAuthFormOpened;
        return {
            request: function (config) {
                if (config.k_uri!=='bt.login.post'&& inFlightAuthRequest) {
                    var deferred = $q.defer();
                    $rootScope.$on('releaseHoldRequests', function($event,newTokenAuthString) {
                        config.headers.Authorization =newTokenAuthString;
                        deferred.resolve(config);
                    });
                    return deferred.promise;
                }else{
                    return config;
                }
            },
            responseError: function (response) {
                var $endpoints = $injector.get("$endpoints");
                var exceptionalUrls = ['mp.user.ssoLogin'];
                if (response.config && response.config.k_uri && exceptionalUrls.indexOf(response.config.k_uri) > -1) {
                    return $q.reject(response);
                }
                switch (response.status) {
                    case 401:
                        if (response.data && response.data.errors && (response.data.errors[0].code === 'TOKEN_EXPIRED'||response.data.errors[0].msg === 'token expired')) {

                            var deferred = $q.defer();
                            if (!inFlightAuthRequest) {
                                inFlightAuthRequest = $injector.get("AuthService").refreshToken();
                            }
                            inFlightAuthRequest.then(function (tokenRes) {
                                inFlightAuthRequest = null;
                                if (tokenRes.status === 200 && tokenRes.data.authorization) {
                                    jsEvents.postMessageToChildIframes('refreshTokenUpdated',null,tokenRes.data);
                                    $injector.get("$translator").setAuthHeaders(tokenRes.data.authorization);
                                    var _koreUserInfo;
                                    try {
                                        _koreUserInfo =  localstore.getAuthData();
                                    } catch (ex) {
                                        console.log("failed to get jStorage Data");
                                    }
                                    
                                    if (_koreUserInfo && _koreUserInfo.currentAccount) {
                                        ng.extend(_koreUserInfo.currentAccount.authorization, tokenRes.data.authorization);
                                        localstore.setAuthData(_koreUserInfo);                   
                                    }
                                    response.config.headers.Authorization = "bearer " + tokenRes.data.authorization.accessToken;
                                    $rootScope.$emit('releaseHoldRequests',response.config.headers.Authorization);
                                    $injector.get("$http")(response.config).then(function (resp) {
                                        deferred.resolve(resp);
                                    }, function (resp) {
                                        deferred.reject(resp);
                                    });
                                } else {
                                    deferred.reject();
                                }
                            }, function (response) {
                                inFlightAuthRequest = null;
                                deferred.reject(response);
                                 reAuthFormOpened = false;
                                        // $('#reAuthForm').modal({
                                        //     backdrop: 'static',
                                        //     keyboard: false
                                        // });
                                    jsEvents.routeToInfo("session_expired");
                                return;
                            });
                            return deferred.promise;
                        } else if(response.data && response.data.errors && response.data.errors[0].code === 46 ){
                           // $injector.get("AuthService").changePassword();
                           var _koreUserInfo = response.config.data;
                               jsEvents.brodcastOnRootScope('EVENT.PASSWORD_EXPIRY', _koreUserInfo );

                           break;
                        }
                        else if(response.data && response.data.errors && response.data.errors[0].code === 44 ) {
                          //reAuthFormOpened = true;
                          jsEvents.routeToInfo("session_expired");
                          return $q.reject(response);
                        }
                        else if(response.data && response.data.errors && response.data.errors[0].code === 47 && response.data.errors[0].msg === 'PASSWORD_EXPIRED' ){
                           var _koreUserInfoPwdExpiry = response.config.data;
                               jsEvents.brodcastOnRootScope('EVENT.PASSWORD_EXPIRY', _koreUserInfoPwdExpiry );

                           break;
                        } else if (+response.status === 401 && response.data.errors[0].code === "ADMIN_REMOVED_BT_ACCESS") {
                            if (!reAuthFormOpened) {
                                reAuthFormOpened = true;
                                jsEvents.routeToInfo("session_expired");  
                                break;
                            }

                        } else if (+response.status === 401 && +response.data.errors[0].code === 41 && (response.data.errors[0].msg === 'INVALID_ACCESS_TOKEN' || response.data.errors[0].msg === 'invalid access token') ) {
                            if (!reAuthFormOpened) {
                                invalidateLocalStore();
                                break;
                            }
                        }
                        else {
                            if (+response.status === 401 && !reAuthFormOpened && !(response.data.errors && response.data.errors.length && (response.data.errors[0].code === 'TOKEN_EXPIRED' || response.data.errors[0].msg === 'token expired'))) {
                                if (response.config.url.indexOf('signout') === -1) {
                                    reAuthFormOpened = true;
                                    jsEvents.routeToInfo("session_expired");
                                    return $q.reject(response);
                                }
                            }
                            return $q.reject(response);
                        }

                        break;
                        case 403:
                            if (response.data && response.data.error && response.data.error.code === 403.503) {
                                jsEvents.handleIpRestriction(response);
                            }
                        break;
                      case 429:
                        if (response && response.data && response.data.errors && response.data.errors.length && response.data.errors[0] && response.data.errors[0].code === 4291) {
                        showMaxRequestLimit(response);
                        }
                         break; 

                }

                // Check Plan usage limit exceeds in bots - Usage exceeds the allowed limit
                if(response && response.status === 400 && response.data.errors && response.data.errors[0] && response.data.errors[0].msg && response.data.errors[0].msg === 'Usage exceeds the allowed limit') {
                    jsEvents.planUsageLimit(response);
                    return;
                }
                return !reAuthFormOpened ? $q.reject(response) : {};
            },
            setReAuthFormOpened : function(flag){
                reAuthFormOpened = flag;
            }
        };
    });

    _module.factory('languageInterceptor', function ($q, $injector, $workflowService) {
        return{
            request: function (config) {
                if (!config.noLangKoreHeader) {
                    config.headers["bot-language"] = $workflowService.currentLanguage();
                }
                return config;
            }
        };
    });
    _module.factory('accountInterceptor', function ($q, $injector, $workflowService) {
        return{
            request: function (config) {
                var _account = $workflowService.selectedAccount();
                if (_account) {
                    config.headers["AccountId"] = _account.accountId;
                }
                return config;
            }
        };
    });
    _module.factory('i18nLagInterceptor', function ($q, $injector, $workflowService) {
        return{
            request: function (config) {
                var lang = $workflowService.serveri18nLang();
                if (lang) {
                    config.headers["app-language"] = lang;
                }
                return config;
            }
        };
    });
     _module.factory('timezoneInterceptor', function ($q, $injector, $workflowService) {
        return{
            request: function (config) {
                config.headers["X-Timezone-Offset"]=(new Date().getTimezoneOffset()).toString();
                return config;
            }
        };
    });
    _module.factory('stateInterceptor', function ($q, $injector, $workflowService) {
        return{
            request: function (config) {
                var _state = $workflowService.selectedStreamState();
                if(_state=='indevelopment'){
                    _state = 'configured';
                }
                if (!(config.headers && config.headers.state)) {
                    if (_state) { 
                        config.headers["state"] = _state; 
                    }
                }
                return config;
            }
        };
    });
     _module.factory('cryptoInterceptor', function ($injector) {
        var $endpoints=$injector.get("$endpoints");
        return{
            response: function (config) {
                if(config.config && config.config.k_uri && $endpoints.serviceList[config.config.k_uri].decryptFn){ 
                    $endpoints.serviceList[config.config.k_uri].decryptFn(config);
                }
                return config;
            }
        };
    });
    _module.factory('accessTokenTimerInterceptor', function ($injector,jsEvents) {
        return{
            request: function (config) {
             var localstore=$injector.get("localstore");    
              if(window.appConfig.ENABLE_SESSION_EXPIRY_TIMER && config.k_uri !== 'mp.user.tokenExpiry' && !config.url.includes("appVersion.csv") && localstore && localstore.getAuthData() && localstore.getAuthData().currentAccount && localstore.getAuthData().currentAccount.authorization && localstore.getAuthData().currentAccount.authorization.webIdleTime){
                jsEvents.securityAuthenticationSetReset('reset',localstore.getAuthData().currentAccount.authorization.webIdleTime*60000);
                }
             return config;
            }
        };
    });
})(angular);


;/*
 *	jQueryUI.Autocomplete.Match, v1.0.2
 *	(c) 2014–2017 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
 *	https://github.com/asleepwalker/jquery-ui.autocomplete.match.js
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

    $.extend($.ui.autocomplete.prototype, {
        highlight: false,
        _renderItem: function (ul, item) {
            var term = this.element.val() || this.element[0].innerText || "";
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), 'gi');
            var label = item.label;
            var matchClass = typeof this.options.highlight == 'string' ?
                    this.options.highlight
                    : 'ui-autocomplete-match';

            return $('<li>')
                    .data('item.autocomplete', item)
                    .html(this.options.highlight ?
                            label.replace(matcher, '<span class="' + matchClass + '">$&</span>')
                            : label)
                    .appendTo(ul);
        }
    });

}));


;(function (ng) {

    angular.module('app.helpers')
            .factory('languageConfig', ['env_conf','$workflowService','$rootScope', function (env_conf,$workflowService,$rootScope) {
                   
                  var conf={};
                   function prepareLanguageObj(){
                       var languageObj = {};
                       $.each($workflowService.seedData().supportedLanguages,function(i,item){
                        languageObj[item.value]=item;
                       });
                       conf={
                        languages:languageObj
                      };
                      $rootScope.seedLanguages = languageObj;
                   }
                    // function langDvalue(value){
                    // var language = _.find($workflowService.seedData().supportedLanguages,{'value':value})
                    // if(language){
                    //     return language.dvalue;
                    // }else{
                    //     return value;
                    // }
                    // }
                    // conf.langDvalue=langDvalue;
                    conf.prepareLanguage=prepareLanguageObj;
                    return conf;
                }]);

}(angular));

;(function(ng) {

	'use strict';

	var _module = ng.module('app.helpers');

	_module.factory('$localstorage', ['localStorageService', function(localStorageService){
		
		var _storage = {};

		_storage.setPrefix = function(prefix) {
			localStorageService.setPrefix(prefix);
		};

		_storage.isSupported = function(prefix) {
			return localStorageService.isSupported;
		};

		_storage.setStorageType = function(type) {
			localStorageService.setStorageType(type || 'localStorage');
		};

		_storage.getStorageType = function() {
			return localStorageService.getStorageType();
		};

		_storage.get = function(key) {
			return localStorageService.get(key);
		};

		_storage.set = function(key, value) {
			return localStorageService.set(key, value);
		};

		_storage.remove = function(key) {
			return localStorageService.remove(key);
		};

		_storage.clearAll = function(regex) {
			return localStorageService.clearAll();
		};

		return _storage;

	}]);

})(angular);

;(function(ng) {

	'use strict';

	var _module = ng.module('app.helpers');

	_module.factory('mixPanel', ['$timeout','$applicationService', function($timeout,$applicationService) {
        var userInfo = {};
        var enabled = false;
        var PLGScoresevents = {
            "Signup Successful":5,
            "VA - New Bot Initiated":5,
            "PA - New Process App Initiated":5,
            "User Onboarding - Bot project joined":5,
            "Conversation - Initiate Dialog Task":1,
            "Conversation - Initiate Storyboard":1,
            "Conversation - Knowledge Extraction Completed":5,
            "Conversation - Dialog Intent Created":5,
            "Conversation - Dialog Primary Intent Created":5,
            "Conversation - Dialog Entity Node created":1,
            "Conversation - Dialog Message Node created":1,
            "Conversation - Talk to Bot":1,
            "NLP - Intent Utterance Added":2,
            "NLP - Intent Pattern Added":2,
            "NLP - Intent Rule Added":2,
            "NLP - Entity Pattern Added":2,
            "NLP - Entity Synonym added":2,
            'NLP - Bot Synonym Added':2,
            'NLP - New Concept Added':2,
            'NLP - Concept Synonym added':2,
            'NLP - New Trait Added':2,
            'Digital Tasks - New Digital Form created':5,
            'Digital Tasks - Digital View Panel Created':5,
            'Deploy - Publish complete':10
        };
        var excludedMailDomains = [ 'mailinator.com' , 'yopmail.com' , 'abc.com' , 'xyz.com' , 'qq.com' , 'vomoto.com', '.xyz','getnada.com','dropjar.com','zetmail.com','boximail.com','givmail.com'];
        this.checkForEmailDomains = function(email) {
            var valid = true;
            if(email){
                excludedMailDomains.forEach(function (domain){
                    if(email.includes(domain)){
                        valid =  false; 
                    }
                });    
            }
            enabled = valid;
            if(window.appConfig.MIX_PANEL_DEV){
                enabled =  true;
            }
          return enabled;
        };
        this.reset =  function(){
            enabled = false;
            userInfo = {};
            try{
                if(mixpanel && mixpanel.reset){
                    mixpanel.reset();
                }
               } catch(e){
                   return;
               }
        };
        this.setAnanomus = function(email){
            this.checkForEmailDomains(email);
            if(!enabled){
                return;
            }
            try{
                if(mixpanel && mixpanel.reset){
                    mixpanel.reset();
                    // mixpanel.alias(email);
                    mixpanel.identify(email);
                }
             } catch(e){
                   return;
             }
        };
        this.setUserInfo = function (email,_userInfo) {
            this.reset();
            this.checkForEmailDomains(email);
            if(!userInfo.email){
                userInfo.email =  email;
            }
            if(userInfo.email && (email!==userInfo.email)){
                this.reset();
                mixpanel.identify(email);
            }
            if(!enabled){
                return;
            }
            if(_userInfo){
               try{
                if(mixpanel && mixpanel.people){
                    if(email){
                        mixpanel.identify(email);
                    }
                    _userInfo.Time = new Date().toISOString();
                    if(_userInfo.authObj) {
                        delete _userInfo.authObj;
                    }
                    if(_userInfo.koreUserInfo) {
                        delete _userInfo.koreUserInfo;
                    }
                    if(_userInfo.appControls) {
                        delete _userInfo.appControls;
                    }
                    mixpanel.people.set(_userInfo);
                }
               } catch(e){
                   return;
               }
            } else {
                try{
                    if(mixpanel && mixpanel.identify){
                        mixpanel.identify(email);
                    }
                   } catch(e){
                       return;
               }
            }

        };
        this.postEvent = function (event,eventPayload) {
            var _userInfo = $applicationService.userInfo() || {};
            eventPayload =  eventPayload || {};
            var userProperties = {};
            try {
                var utmDetails   = window.localStorage.getItem('utmDetails');
                if(utmDetails) {
                   var _uat = JSON.parse(utmDetails);
                    userProperties = _uat;
                    localStorage.removeItem('utmDetails');
                } 
            } catch (e){
                console.log('UAT');
            }
            if(event === 'Signup Successful') {
                userProperties['PLG'] = 5;
                userProperties['First Login'] = new Date().toISOString();
            }
            if(eventPayload.Category) {
                userProperties[eventPayload.Category] = true;
            }
            if(_userInfo && _userInfo.koreUserInfo){
                    eventPayload.$email = _userInfo.koreUserInfo.emailId;
                    eventPayload.$name = _userInfo.koreUserInfo.fName + ' ' + _userInfo.koreUserInfo.lName;
                    eventPayload.Name = _userInfo.koreUserInfo.fName + ' ' + _userInfo.koreUserInfo.lName; 
                    eventPayload.orgId = _userInfo.orgId;
                    eventPayload.accountId = _userInfo.koreUserInfo.accountId;
                    if(_userInfo.koreUserInfo.jTitle) {
                        eventPayload["User designation"]  =  _userInfo.koreUserInfo.jTitle;
                        userProperties["User designation"]= _userInfo.koreUserInfo.jTitle;
                    }
                    if(_userInfo.koreUserInfo.dept) {
                        eventPayload["User department"]  =  _userInfo.koreUserInfo.dept;
                        userProperties["User department"]  =  _userInfo.koreUserInfo.dept;
                    }
                    if(_userInfo.koreUserInfo.additionalFields && _userInfo.koreUserInfo.additionalFields.length) {
                        _userInfo.koreUserInfo.additionalFields.forEach(function(item) {
                            if(item.key === 'company') {
                                eventPayload["User Company"]  =  item.value;
                                userProperties["User Company"]  =  item.value;
                            }
                            if(item.key === 'industry') {
                                eventPayload["User Industry"]  =  item.value;
                                userProperties["User Industry"]  =  item.value;
                            }
                        });
                    }
                    if(!userInfo.email){
                        this.setUserInfo(_userInfo.koreUserInfo.emailId,eventPayload); // sets the user identity on reload or tab close events
                    }
            }
            var emailId = eventPayload.$email || eventPayload.Email || ((_userInfo.koreUserInfo && _userInfo.koreUserInfo.emailId)?_userInfo.koreUserInfo.emailId:'');
            if(userInfo.email && (emailId!==userInfo.email)){
                this.reset();
                try{
                    if(mixpanel && mixpanel.identify && emailId) {
                        mixpanel.identify(emailId);
                    }
                   } catch(e){
                       return;
                }
                this.checkForEmailDomains(emailId);
            }
            if(!this.checkForEmailDomains(emailId)){
                return;
             }
            if(eventPayload){
               try{
                if(mixpanel && event && emailId){
                    mixpanel.track(event, eventPayload);
                    this.numericCounter(event);
                    if(userProperties && Object.keys(userProperties) && Object.keys(userProperties).length) {
                        userProperties.$last_seen = new Date().toISOString();
                        if(userProperties.authObj) {
                            delete userProperties.authObj;
                        }
                        if(userProperties.koreUserInfo) {
                            delete userProperties.koreUserInfo;
                        }
                        if(userProperties.appControls) {
                            delete userProperties.appControls;
                        }
                        mixpanel.people.set(userProperties); 
                    }   
                }
               } catch(e){
                   return;
               }
            } else {
                try{
                    if(mixpanel && event){
                        mixpanel.track(event);
                        this.numericCounter(event);
                        if(userProperties && Object.keys(userProperties) && Object.keys(userProperties).length) {
                            userProperties.$last_seen = new Date().toISOString();
                            if(userProperties.authObj) {
                                delete userProperties.authObj;
                            }
                            if(userProperties.koreUserInfo) {
                                delete userProperties.koreUserInfo;
                            }
                            if(userProperties.appControls) {
                                delete userProperties.appControls;
                            }
                            mixpanel.people.set(userProperties); 
                        }
                    }
                   } catch(e){
                       return;
               }
            }

        };
        this.numericCounter = function (event) {
            var PLGScoreAddition = PLGScoresevents[event];
            if(!PLGScoreAddition){
                return;
            }
            if (userInfo.email) {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://api.mixpanel.com/engage#profile-numerical-add",
                    "method": "POST",
                    "headers": {
                        "Accept": "text/plain",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    "data": {
                        "data": "{\n    \"$token\": \"" + window.appConfig.MIX_PANEL_TOKEN + "\",\n    \"$distinct_id\": \"" + userInfo.email + "\",\n    \"$add\": { \"PLG\": "+ PLGScoreAddition +" }\n}\n"
                    }
                };
                $.ajax(settings).done(function (response) {
                    console.log(response);
                });
            }
        };
        return this;
	}]);

})(angular);

;//module for naturalSorting
(function(ng) {

	'use strict';

	var _module = ng.module('app.helpers');

	//	The core natural service
	_module.factory("naturalService", ["$locale", function($locale) {
		// the cache prevents re-creating the values every time, at the expense of
		// storing the results forever. Not recommended for highly changing data
		// on long-term applications.
		var natCache = {},
		// amount of extra zeros to padd for sorting
		padding = function(value) {
			return "00000000000000000000".slice(value.length);
		},

		// Converts a value to a string.  Null and undefined are converted to ''
		toString = function(value) {
			if(value === null || value === undefined) {return '';}
			return ''+value;
		},

		// Calculate the default out-of-order date format (dd/MM/yyyy vs MM/dd/yyyy)
		natDateMonthFirst = $locale.DATETIME_FORMATS.shortDate.charAt(0) === "M",
		// Replaces all suspected dates with a standardized yyyy-m-d, which is fixed below
		fixDates = function(value) {
			// first look for dd?-dd?-dddd, where "-" can be one of "-", "/", or "."
			return toString(value).replace(/(\d\d?)[-\/\.](\d\d?)[-\/\.](\d{4})/, function($0, $m, $d, $y) {
				// temporary holder for swapping below
				var t = $d;
				// if the month is not first, we'll swap month and day...
				if(!natDateMonthFirst) {
					// ...but only if the day value is under 13.
					if(Number($d) < 13) {
						$d = $m;
						$m = t;
					}
				} else if(Number($m) > 12) {
					// Otherwise, we might still swap the values if the month value is currently over 12.
					$d = $m;
					$m = t;
				}
				// return a standardized format.
				return $y+"-"+$m+"-"+$d;
			});
		},

		// Fix numbers to be correctly padded
		fixNumbers = function(value) {
			// First, look for anything in the form of d.d or d.d.d...
			return value.replace(/(\d+)((\.\d+)+)?/g, function ($0, integer, decimal, $3) {
				// If there's more than 2 sets of numbers...
				if (decimal !== $3) {
					// treat as a series of integers, like versioning,
					// rather than a decimal
					return $0.replace(/(\d+)/g, function ($d) {
						return padding($d) + $d;
					});
				} else {
					// add a decimal if necessary to ensure decimal sorting
					decimal = decimal || ".0";
					return padding(integer) + integer + decimal + padding(decimal);
				}
			});
		},

		// Finally, this function puts it all together.
		natValue = function (value) {
			if(natCache[value]) {
				return natCache[value];
			}
			natCache[value] = fixNumbers(fixDates(value));
			return natCache[value];
		};

		// The actual object used by this service
		return {
			naturalValue: natValue,
			naturalAscendingSort: function(a, b) {
				a = natValue(a);
				b = natValue(b);
				return (a < b) ? -1 : ((a > b) ? 1 : 0);
			},
			naturalDescendingSort: function(a, b) {
				a = natValue(a);
				b = natValue(b);
				return (b < a) ? -1 : ((b > a) ? 1 : 0);
			}
		};
	}])

	//	Attach a function to the rootScope so it can be accessed by "orderBy"
	.run(["$rootScope", "naturalService", function($rootScope, naturalService) {
		$rootScope.natural = function (field) {
			return function (item) {
				return naturalService.naturalValue(item[field]);
			};
		};
	}]);

})(angular);

;(function (ng) {
    'use strict';

    var _module = ng.module('app.helpers');


    _module.service('navigator', ['$rootScope', '$timeout', 'env_conf', 'channelsConfig','i18n', '$workflowService','$applicationService',
        function ($rootScope, $timeout, env_conf, channelsConfig,i18n,$workflowService,$applicationService) {
            var assetsBase = env_conf['assets-url'];
            var menuIconPath = assetsBase + "images/left-menu-img/";
            var assetsPath = window.appConfig.CONTEXT_PATH + '/assets/';
            var landingPath = window.appConfig.CONTEXT_PATH + '/assets/landingImages/';
            var channelsArray = [];
            var _self = this;
            this.rightPannelMenu = {};
            this.navigationTree = {};
            this.tabComponents = {};
            this.tabMenuItems = {};
            this.pinnedItems = {};
            this.quickSearchData = [];
            this.currentNavigationObj = {
                    selectedTab:'skills',
                    selectedTabMenu:'storyboard',
                    selectedMenuItem:'conversationalSkills',
            };
            for(var key in channelsConfig.channelsObject){
                if(key) {
                    channelsArray = channelsArray.concat(channelsConfig.channelsObject[key]); 
                }
            }
            function isWorkFlowAdmin() {
                var isWFAdmin = $rootScope.wfAdmin;
                return isWFAdmin;
            }
            this.preparePinnedMenu  = function(menudata, preparenavigation,update) {
               $.each(menudata.tabs,function(i,menuObj){
                   var menuoverrids= null;
                $.each(menuObj.components,function(j,menu){
                    if(menu.id) {
                        if(!menuoverrids){
                            if(menuObj && menuObj.tabId === 'skills') {
                                menuoverrids = menu.id;
                                _self.currentNavigationObj = {
                                    selectedTab:_self.currentNavigationObj.selectedTab || 'storyboard',
                                    selectedMenuItem:_self.currentNavigationObj.selectedMenuItem || menu.id,
                                };
                            }
                        }
                        _self.pinnedItems[menu.id] = true;
                    }
                });
               });
               if(preparenavigation){
                this.preparePinnedMenuData();
               }
            };
            this.showSearch = function(menu){
                var show =  true;
                if(menu && (menu.id === 'deleteBot')){
                    show =  false;
                }
                if(menu && (menu.id === 'negativePatterns')){
                    show = $workflowService.selectedStream().enableNegativePatterns;    
                }
                return show;
            };
            this.getIgnoreWordsVisisbility = function () {  
                var flag = true;
                if ($workflowService.selectedStream().type == 'universalbot') {
                    flag = false;
                }
                if ($workflowService.selectedStream().taskCounts && !$workflowService.selectedStream().taskCounts.alerts.length && $workflowService.selectedStream().taskCounts && !$workflowService.selectedStream().taskCounts.actions.length) {
                    flag = false;
                }
                return flag;
            };
            this.getChannelVisiState = function() {
                var excludeChannels=["sms","skypeOnPrem","livebank","wfacebookG","wfacebookC"];
                var filteredChannels = [];
                var channelsSeedData = [];
                var channels = [];
                var visInPubChannel = _.cloneDeep($workflowService.selectedStream().channels);
                if(Object.keys($workflowService.selectedStream()).length){
                channelsConfig.getDynamicChannels($workflowService.selectedStream());
                 channels = Object.values(channelsConfig.channelsObject);
                }
                _.forEach(channels, function(channel){
                    if(excludeChannels.indexOf(channel.id) > -1 ){
                        return ;
                    }else{
                        channelsSeedData.push(channel);
                    }
                });
                // var channels = $workflowService.seedData().botChannelsTypes;
                var streamSel = $workflowService.selectedStreamState();
                if(channels && channels.length){
                    $.each(channels,function (i,v) {
                        if(streamSel === 'published') {
                              if(_.find(visInPubChannel, {type: v.id})){
                                filteredChannels.push(v);
                              }  
                        } else {
                            if(_.find(channelsSeedData, {id: (v.id === "twilio")?"sms":v.id})){
                                filteredChannels.push(v);
                            }
                        }  
                    });
                }
                return filteredChannels || [];
            };
            // tab config obj  //
            this.tabs = {
                skills:['skills'],
                analytics:['analytics'],
                // settings:['settings'],
                deploy:['deploy'],
                manage:['manage'],
            };
            this.pinnedMenusids = {
                pinned_skills:true,
                pinned_analytics:true,
                pinned_deploy:true,
                pinned_manage:true
            };
            this.skills = {
                'pinned_skills':[], //make sure this must id must be pinned_tabName
                'botSummary':[
                    {
                        "id": "botSummary",
                        "class": "btx-left-menu-botSummary",
                        "name": i18n.i18nString('summary_name'),
                        "icon":assetsPath+"images/left-menu-img/batchTestingIconGray.svg",
                        "activeIcon": assetsPath+"images/left-menu-img/batchTestingIconWhite.svg",
                        "permissionId":"botSummary",
                        "isForUniversal":true,
                    },
                ],
                "conversationalSkills":[
                    {
                        "id": "storyboard",
                        "name": i18n.i18nString('storyboard_name'),
                        "class": "btx-storyboard",
                        "icon": getIcon("storyboard-gray.svg"),
                        "activeIcon": getIcon("storyboard-white.svg"),
                        "permissionId": "BOTBUILDER_STORYBOARD",
                        "helpLink": "STORYBOARD",
                        "tooltip":i18n.i18nString('storyboard_tooltip')
                    },
                    {
                        "id": "dialogTasks",
                        "streamsKey":'dialogs',
                        "name": i18n.i18nString('ddval_dialog'),
                        "description": i18n.i18nString('createConversationalFlows'),
                        "actionName": i18n.i18nString('newDialogTask'),
                        "icon": landingPath + "dialogIcon.svg",
                        "class":'btx-dialog-task', 
                        "helpLink": "DIALOG_TASK_HELP",
                        'permissionId': "BOTBUILDER_TASKS", // also include this item id in _accessControls.scss under for BOTBUILDER_TASKS to take effect //
                        "tooltip":i18n.i18nString('dialog_task_tooltip')
                        
                    },
                    {
                        "id": "linkedBots",
                        "streamsKey":'linkedBots',
                        "name": i18n.i18nString('linked_bots'),
                        "description":i18n.i18nString('createConversationalFlows'),
                        "actionName": i18n.i18nString('newDialogTask'),
                        "class":'btx-linked-bot', 
                        "activeIcon": landingPath + "linked-selected.svg",
                        "helpLink": "UNIVERSAL_BOT_LINKEDBOTS",
                        "tooltip":i18n.i18nString('linked_bot_tooltip'),
                        'permissionId': "BOTBUILDER_TASKS", // also include this item id in _accessControls.scss under for BOTBUILDER_TASKS to take effect //
                        // "tooltip":i18n.i18nString('dialog_task_tooltip')
                    },
                    {
                        "id": "knowledgeCollection",
                        "streamsKey":'faqCount',
                        "name": i18n.i18nString('knowledge_graph'),
                        "description": i18n.i18nString('knowledge_graph_desc'),
                        "hideCount": false,
                        "actionName": i18n.i18nString('createKnowledgeGraph'),
                        "icon": landingPath + "knowledgeCollectionIcon.svg",
                        "class":'btx-help', 
                        "helpLink": "KNOWLEDGE_TASK_HELP",
                        'permissionId': "BOTBUILDER_KNOWLEDGE_GRAPH", // also include this item id in _accessControls.scss under for BOTBUILDER_TASKS to take effect //
                        "tooltip":i18n.i18nString('knowledgeTaks_tooltip')
                    },
                    {
                        "id": "alertTasks",
                        "streamsKey":'alerts',                        
                        "name": i18n.i18nString('alert_tasks'),
                        "description": i18n.i18nString('alertTask_desc'),
                        "actionName": i18n.i18nString('newAlertTask'),
                        "icon": landingPath + "alertIcon.svg",
                        class:'btx-alert-task', 
                        "helpLink": "ALERT_TASK_HELP",
                        'permissionId': "BOTBUILDER_TASKS", // also include this item id in _accessControls.scss under for BOTBUILDER_TASKS to take effect //
                        "tooltip":i18n.i18nString('alerts_tooltip')
                    },
                    {
                        "id": "actionTasks",
                        "streamsKey":'action',                        
                        "name": i18n.i18nString('action_task'),
                        "description": i18n.i18nString('action_desc'),
                        "actionName": i18n.i18nString('newActionTask'),
                        "icon": landingPath + "alertIcon.svg",
                        "class":'btx-alert-task', 
                        "helpLink": "ACTION_TASK_HELP",
                        'permissionId': "BOTBUILDER_TASKS" // also include this item id in _accessControls.scss under for BOTBUILDER_TASKS to take effect //
                    },
                    {
                        "id": "informationTasks",
                        "streamsKey":'informationTasks',                        
                        "name": i18n.i18nString('info_task'),
                        "description": i18n.i18nString('action_desc'),
                        "actionName": i18n.i18nString('newAlertTask'),
                        "icon": landingPath + "alertIcon.svg",
                        "class":'btx-alert-task', 
                        "helpLink": "INFORMATION_TASK_HELP",
                        'permissionId': "BOTBUILDER_TASKS" // also include this item id in _accessControls.scss under for BOTBUILDER_TASKS to take effect //
                    },
                    {
                        "id":"smallTalk",
                        "name":i18n.i18nString('small_talk'),
                        "streamsKey":'smalltalks',
                        "description":"",
                        "actionName":"",
                        "icon":landingPath + "small-talk.svg",
                        'class':'btx-small-talk', 
                        "helpLink":"SMALL_TALK",
                        "permissionId":"BOTBUILDER_TASKS", // also include this item id in _accessControls.scss under for BOTBUILDER_TASKS to take effect //
                        "tooltip":i18n.i18nString('smalltalk_tooltip')
                    }, 
                    {
                        "id": "defaultDialogUniversal",
                        "name": i18n.i18nString('default_dialog'),
                        "description": i18n.i18nString('defaultDialog_universal_desc'),
                        // "icon": assetsPath + "nlIcons/defaultDialogIcon.svg",
                        class:'btx-default-dialog',
                        'permissionId': 'BOTBUILDER_TASKS',
                        "helpLink": "DEFAULT_DAILOG_UNIVERSAL_HELP", 
                        "tooltip":i18n.i18nString('default_dialog_tooltip'),
                    }
                ],
                "digitalSkills":[
                    {
                        "id":"uiForms",
                        "name":i18n.i18nString('digital_forms'),
                        "streamsKey":'uiForms',
                        "description":"",
                        "actionName":"",
                        "icon":landingPath + "ui-forms.svg",                        
                        "activeIcon":landingPath + "ui-forms-dark.svg",
                        "betaIcon": assetsPath + "icons/betaIcon.svg",
                        "class":'btx-left-menu-form',                    
                        "helpLink":"UI_FORM_HELP",
                        "permissionId":"BOTBUILDER_TASKS", // also include this item id in _accessControls.scss under for BOTBUILDER_TASKS to take effect //
                        "tooltip":i18n.i18nString('forms_tooltip')
                    },
                    {
                        "id":"widgets",
                        "name": i18n.i18nString('digital_views'),
                        "streamsKey":'widgets',
                        "description":"",
                        "actionName":"",
                        "icon":landingPath + "panels-widgets.svg",
                        // "activeIcon":landingPath + "panels-widgets-selected.svg",
                        class:'btx-left-menu-views', 
                        "helpLink":"DIGITAL_VIEWS",
                        "permissionId":"BOTBUILDER_TASKS", // also include this item id in _accessControls.scss under for BOTBUILDER_TASKS to take effect //
                        "tooltip":i18n.i18nString('digital_views_tooltip')
                    },
                ],
                "training":[
                    {
                        "id": "machineLearningUtterances",
                        "name": i18n.i18nString('training'),
                        "description":i18n.i18nString('machineLearningUtterances_desc') ,
                        // "icon": assetsPath + "nlIcons/mlUtteranceIcon.svg",
                        class:'btx-testing',   
                        "helpLink": "UTTERENCES_HELP",
                        'permissionId': 'BOTBUILDER_NATURAL_LANGUAGE', 
                        "tooltip":i18n.i18nString('training_tooltip'),
                        "children": [
                            {
                                'name': i18n.i18nString('Developer_defined'),
                                'id': 'devDefined'
                            },
                            {
                                'name': i18n.i18nString('Auto_trained_label'),
                                'id': 'trainedAuto'
                            }
                        ]
                    },
                    {
                        "id" : "linkedBotTraining",
                        "name" : i18n.i18nString('linkedBotTraining'),
                        "description" : i18n.i18nString('linkedBotTraining_desc'),
                        // "icon" : assetsPath + "nlIcons/linkedBotTraining.svg",
                        class:'btx-linked-bot-testing',
                        "helpLink" : 'LINKED_BOT_TRAINING',
                        "permissionId" : 'BOTBUILDER_NATURAL_LANGUAGE', 
                        "tooltip":i18n.i18nString('linked_bot_training_tooltip'),
                    },
                    {
                        "id": "synonyms",
                        "name":  i18n.i18nString('ddval_synonyms'),
                        "description":  i18n.i18nString('bot_synonym_desc'),
                        // "icon": assetsPath + "nlIcons/synonymsIcon.svg",
                        class:'btx-synonyms',
                        "helpLink": "SYNONYMS_HELP",
                        'permissionId': 'BOTBUILDER_NATURAL_LANGUAGE',
                        "tooltip":i18n.i18nString('synonyms_tooltip'),
                        "children": [
                            {
                                'name': i18n.i18nString('ddval_synonyms'),
                                'id': 'synonsBot'
                            },
                            {
                                'name': i18n.i18nString('ddval_entity'),
                                'id': 'synonsEntity'
                            }/*,
                            {
                                'name': 'Field Synonyms',
                                'id': 'synonsField'
                            }*/
                        ]
                    },
                    {
                        "id" : "settings",
                        "name" :i18n.i18nString('settings'),
                        "description" : i18n.i18nString('settings_desc'),
                        // "icon": assetsPath + "settingsIcons/generalSettingsIcon.svg",
                        class:'btx-settings',
                        "helpLink" : 'SETTINGS',
                        "permissionId" : 'BOTBUILDER_NATURAL_LANGUAGE', 
                        "tooltip":i18n.i18nString('linked_bots_settings_tooltip'),
                    },
                    // {
                    //     "id": "patterns",
                    //     "name":  i18n.i18nString('Patterns_and_rules_label'),
                    //     "description":  i18n.i18nString('Patterns_and_rules_label_desc'),
                    //     // "icon": assetsPath + "nlIcons/patteransIcon.svg",
                    //     class:'btx-pattern',
                    //     "helpLink": "PATTERNS_HELP",
                    //     'permissionId': 'BOTBUILDER_NATURAL_LANGUAGE',
                    //     "children":[
                    //         {
                    //             'name': i18n.i18nString('ddval_intent'),
                    //             'id': 'pattIntent'
                    //         },{
                    //             'name': i18n.i18nString('ddval_pattern'),
                    //             'id': 'pattEntity'
                    //         }/*,{
                    //             'name': 'Field Patterns',
                    //             'id': 'pattField'
                    //         }*/
                    //     ]
                    // },
                    // {
                    //     "id": "negativePatterns",
                    //     "name":  i18n.i18nString('Negative_patterns_label'),
                    //     "description":  i18n.i18nString('Negative_patterns_desc'),
                    //     // "icon": assetsPath + "nlIcons/antiPatterns.svg",
                    //     class:'btx-anti-pattern',
                    //     "helpLink": "NEGATIVE_PATTERNS",
                    //     'permissionId': 'BOTBUILDER_NATURAL_LANGUAGE'
                    // },
                    // {
                    //     "id": "traits",
                    //     "name":  i18n.i18nString('traits'),
                    //     "description":  i18n.i18nString('Traits_desc'),
                    //     // "icon": assetsPath + "nlIcons/traits.svg",
                    //     class:'btx-traits',
                    //     "helpLink": "TRAITS",
                    //     'permissionId': 'BOTBUILDER_NATURAL_LANGUAGE'
                    // },
                    {
                        "id": "mlThresholds",
                        "name":  i18n.i18nString('mlThresholds_label'),
                        "description":  i18n.i18nString('mlThresholds_label_desc'),
                        // "icon":assetsPath+"nlIcons/advancedSettingsIcon.svg",
                        class:'btx-range-slider',
                        'permissionId': 'BOTBUILDER_NATURAL_LANGUAGE',
                        "helpLink":"THRESHOLDS_CONFIG_HELP", 
                        "tooltip":i18n.i18nString('thresholds_configurations_tooltip'),
                    },
                    {
                        "id": "nlAdvancedSettings",
                        "name":  i18n.i18nString('advanced_settings'),
                        "description":  i18n.i18nString('Advanced_settings_desc'),
                        // "icon": assetsPath + "nlIcons/advancedSettingsIcon.svg",
                        // "icon": assetsPath + "settingsIcons/generalSettingsIcon.svg",
                        class:'btx-settings',
                        'permissionId': 'BOTBUILDER_NATURAL_LANGUAGE',
                        "helpLink": "NL_ADVANCE_SETTINGS_HELP", 
                        "tooltip":i18n.i18nString('nl_settings_tooltip'),
                    }
                ],
                "intelligence":[
                    // {
                    //     "id": "defaultDialog",
                    //     "name": i18n.i18nString('default_dialog'),
                    //     "description": i18n.i18nString('default_desc'),
                    //     // "icon": assetsPath + "nlIcons/defaultDialogIcon.svg",
                    //     class:'btx-default-dialog',
                    //     'permissionId': 'BOTBUILDER_NATURAL_LANGUAGE',
                    //     "helpLink": "DEFAULT_DAILOG_HELP", 
                    //     "tooltip":i18n.i18nString('default_dialog_tooltip'),
                    // },
                    {
                        "id": "eventsManage",
                        "name": i18n.i18nString('events'),
                        "description": i18n.i18nString('event_desc'),
                        class:'btx-calendar',
                        // "icon": assetsPath + "appsAndAgents/eventsCalendar.svg",
                        'permissionId': 'BOTBUILDER_EXTENSIONS',
                        "helpLink": "EVENTS_MANAGEMENT", 
                        "tooltip":i18n.i18nString('events_tooltip'),
                    },
                    {
                        "id": "advancedSettings",
                        "name":  i18n.i18nString('manage_interruptions'),
                        "description":  i18n.i18nString('Manage_interuptions_desc'),
                        // "icon": assetsPath + "nlIcons/manageInterruptions.svg",
                        class:'btx-interuptions',
                        'permissionId': 'BOTBUILDER_BOT_SETTINGS',
                        "helpLink": "MANAGE_INTERRUPTIONS", 
                        "tooltip":i18n.i18nString('interruptions_tooltip'),
                    },
                    {
                        "id":"amendEntity",
                        "name": i18n.i18nString('Amend_entity_label'),
                        "description": i18n.i18nString('Amend_entity_desc'),
                        // "icon": assetsPath + "nlIcons/amend-entity.svg",
                        class:'btx-amend-edit',
                        'permissionId': 'BOTBUILDER_NATURAL_LANGUAGE',
                        "helpLink":"AMEND_ENTITY", 
                        "tooltip":i18n.i18nString('amend_tooltip'),
                    },
                    {
                        "id": "multiIntentDetection",
                        "name":  i18n.i18nString('Multi_intent_detection_label'),
                        "description":  i18n.i18nString('Multi_intent_detection_desc'),
                        // "icon": assetsPath + "nlIcons/multi-intent.svg",
                        class:'btx-multi-intent',
                        'permissionId': "BOTBUILDER_BOT_SETTINGS",
                        "helpLink": "MULTI_INTENT_DETECTION_HELP",
                        "tooltip":i18n.i18nString('multiintent_tooltip'),
                    },
                    {
                        "id":"sentimentManagement",
                        "name":i18n.i18nString('Sentiment_management_label'),
                        "description":  i18n.i18nString('Sentiment_management_desc'),
                        // "icon": assetsPath + "appsAndAgents/apiScopes.svg",
                        class:'btx-sentiment',
                        "helpLink": "SENTIMENT_MANAGEMENT",
                        'permissionId': 'BOTBUILDER_NATURAL_LANGUAGE',
                        "tooltip":i18n.i18nString('sentimentManage_tooltip'),
                    },
                    {
                        "id": "standardResponses",
                        "name": i18n.i18nString('ddval_standard'),
                        "description": i18n.i18nString('standard_res_desc'),
                        // "icon": assetsPath + "nlIcons/standardResponseIcon.svg",
                        class:'btx-standard-response',
                        'permissionId': 'BOTBUILDER_NATURAL_LANGUAGE',
                        "helpLink": "STANDARD_RESPONSE_HELP",
                        "tooltip":i18n.i18nString('standard_response_tooltip'),
                        "children":[
                                {
                                    'name': i18n.i18nString('statements'),
                                    'id': 'statemnts'
                                },{
                                    'name': i18n.i18nString('queries'),
                                    'id': 'quries'
                                },{
                                    'name': i18n.i18nString('error_warnings'),
                                    'id': 'warnNErr'
                                },{
                                    'name': i18n.i18nString('questions'),
                                    'id': 'qustions'
                                },{
                                    'name': i18n.i18nString('choices'),
                                    'id': 'chioces'
                                },{
                                    'name': i18n.i18nString('greeting'),
                                    'id': 'greteing'
                                }
                        ]
                    },
                    {
                        "id": "ignoreWords",
                        "name": i18n.i18nString('ignore_words'),
                        "description": i18n.i18nString('ignoreWords_desc'),
                        class:'btx-ignore-words',
                        // "icon": assetsPath + "nlIcons/ignoreWordsIcon.svg",
                        'permissionId': 'BOTBUILDER_NATURAL_LANGUAGE',
                        "helpLink": "IWORDS_FMEMORY_HELP",
                        "tooltip":i18n.i18nString('ignore_words_tooltip'),
                    }
                ],
                "botTesting": [
                    {
                        "id": "testTrain",
                        "name": i18n.i18nString('utterance_testing'),
                        "icon": getIcon("testNtrain-gray.svg"),
                        "activeIcon": getIcon("testNtrain-white.svg"),
                        class:'btx-testing',
                        "parent":'botTesting',
                        "isForUniversal":true,
                        "helpLink": "TEST_BOT",
                        "tooltip":i18n.i18nString('utterance_testing_tooltip'),
                    },
                    {
                        "id": "batchTesting",
                        "name": i18n.i18nString('batch_testing'),
                        // "icon": assetsPath + "images/left-menu-img/batchTestingIconGray.svg",
                        class:'btx-left-menu-botTesting',
                        "activeIcon": assetsPath + "images/left-menu-img/batchTestingIconWhite.svg",
                        "permissionId": "BOTBUILDER_BATCH_TESTING",
                        "tooltip":i18n.i18nString('batch_testing_tooltip'),
                        "parent":'botTesting',
                        "isForUniversal":true,
                        "helpLink": "BATCH_TESTING_HELP",
                        "children": [
                            {
                                'name': i18n.i18nString('developer_defined_utterances_label'),
                                'id': 'devDefUtt'
                            },{
                                'name': i18n.i18nString('Successful_user_utterances'),
                                'id': 'succUserUtt'
                            }
                        ]
                    },
                    {
                        "id": "conversationTesting",
                        "name": i18n.i18nString( 'Conversation_Testing'),
                        "class":'btx-conversation-testing',
                        "activeIcon": assetsPath + "images/left-menu-img/batchTestingIconWhite.svg",
                        "parent":'botTesting',
                        "tooltip":i18n.i18nString("conversation_testing_tooltip"),
                        "helpLink": "CONVERSATION_TESTING_HELP",
                    },
                ],
                "configurations":[
                    {
                        "id": "generalSettings",
                        "name":  i18n.i18nString( 'generalSettings'),
                        "description":  i18n.i18nString( 'generalSettings_desc'),
                        'class': "btx-settings",
                        "helpLink": "BOT_SETTINGS_HELP",
                        'permissionId': 'BOTBUILDER_BOT_SETTINGS',
                        "tooltip":i18n.i18nString('general_settings_tooltip'),
                    },
                    {
                        "id": "languageManagement",
                        "name":  i18n.i18nString( 'languageManagement'),
                        "description":  i18n.i18nString( 'languageManagement_desc'),
                        class: "btx-language-management",
                        "helpLink": "LANGUAGE_MANAGEMENT_HELP",
                        'permissionId': 'BOTBUILDER_BOT_SETTINGS',
                        "tooltip":i18n.i18nString('language_tooltip'),
                    },
                    {
                        "id": "IIPMasking",
                        "name":  i18n.i18nString( 'pii_settings'),
                        "description": i18n.i18nString( 'pii_settings_description'),
                        class: "btx-lock",
                        "helpLink": "PII_MASKING",
                        'permissionId': 'BOTBUILDER_BOT_SETTINGS',
                        "tooltip":i18n.i18nString('pii_settings_tooltip'),
                    },
                    {
                        "id":"botFunctions",
                        "name": i18n.i18nString( 'bot_functions'),
                        "description": i18n.i18nString( 'bot_functions_desc'),
                        class: "btx-bot-functions",
                        "helpLink":"BOT_FUNCTIONS_HELP",
                        'permissionId': 'BOTBUILDER_BOT_SETTINGS',
                        "tooltip":i18n.i18nString('botfunction_tooltip'),
                    },
                    {
                        "id": "authorization",
                        "name": i18n.i18nString( 'auth_profile'),
                        "description":  i18n.i18nString( 'auth_profile_desc'),
                        class: "btx-authorization-profiles",
                        "helpLink": "BOT_AUTHENTICATION_HELP",
                        'permissionId': 'BOTBUILDER_BOT_SETTINGS',
                        "tooltip":i18n.i18nString('auth_profile_tooltip'),
                    },
                    {
                        "id": "botStoreSettings",
                        "name":  i18n.i18nString( 'bot_store_settings'),
                        "description":  i18n.i18nString( 'bot_store_settings_desc'),
                        class: "btx-bots-store",
                        "helpLink": "BOT_STORE_SETTINGS",
                        'permissionId': 'BOTBUILDER_BOT_SETTINGS'
                    },
                    {
                        "id": "smartBotSettings",
                        "name":  i18n.i18nString( 'smart_bot_settings'),
                        "description":  i18n.i18nString( 'smart_bot_settings_desc'),
                        class: "btx-smart-bot",
                        "helpLink": "SMARTBOT",
                        'permissionId': 'BOTBUILDER_BOT_SETTINGS'
                    },
                    {
                        "id": "manageSessions",
                        "name": i18n.i18nString('manage_sessions'),
                        "description": i18n.i18nString('manage_sessions_desc'),
                        class: "btx-time",
                        "helpLink": "BOT_MANAGESESSION_HELP",
                        'permissionId': "BOTBUILDER_BOT_SETTINGS",
                        "tooltip":i18n.i18nString('manage_sessions_tooltip'),
                    },
                    {
                        "id": "variableManagement",
                        "name":  i18n.i18nString( 'global_variable'),
                        "description":  i18n.i18nString( 'global_summary'),
                        class: "btx-global-variable",
                        "helpLink": "VARIABLE_MANAGEMENT_HELP",
                        'permissionId': 'BOTBUILDER_BOT_SETTINGS',
                        "tooltip":i18n.i18nString('env_variables_tooltip'),
                    },
                    {
                        "id": "variableManagementContent",
                        "name":  i18n.i18nString( 'content_variables'),
                        "description":  i18n.i18nString( 'content_variable_desc'),
                        class: "btx-content-variables",
                        "helpLink": "VARIABLE_MANAGEMENT_HELP",
                        'permissionId': 'BOTBUILDER_BOT_SETTINGS',
                        "tooltip":i18n.i18nString('content_variables_tooltip'),
                    },
                ],
            };
            this.analytics = {
                pinned_analytics:[],//make sure this must id must be pinned_tabName
                botDashboard:[{
                    "id": "botDashboard",
                    "name": i18n.i18nString('usage_name'),
                    'icon': getIcon("dashboard-gray.svg"),
                    'activeIcon': getIcon("dashboard-white.svg"),
                    "permissionId":"BOTBUILDER_DASHBOARD",
                    "isForUniversal":true,
                    "fullPanel":true,
                    "helpLink": "RAND_344",
                    "tooltip":i18n.i18nString('usage_metrics_tooltip'),
                }],
                customDashboard:[{
                    "id": "customDashboard",
                    "name": i18n.i18nString('custonDashboard'),
                    'icon': getIcon("dashboard-gray.svg"),
                    'activeIcon': getIcon("dashboard-white.svg"),
                    "permissionId":"BOTBUILDER_CUSTOM_DASHBOARDS",
                    "isForUniversal":true,
                    "fullPanel":true,
                    "helpLink": "CUSTOM_DASHBOARD",
                    "tooltip":i18n.i18nString('custom_dashboard_tooltip'),
                },],
                containmentDashboard:[{
                    "id": "containmentDashboard",
                    "name": i18n.i18nString('containmentdashboard_name'),
                    'icon': getIcon("dashboard-gray.svg"),
                    'activeIcon': getIcon("dashboard-white.svg"),
                    "permissionId":"BOTBUILDER_CUSTOM_DASHBOARDS",
                    "isForUniversal":true,
                    "fullPanel":true,
                    "helpLink": "RAND_348",
                    "tooltip":i18n.i18nString('containment_matrics_tooltip'),
                },],
                metrics:[{
                    "id": "metrics",
                    "name": i18n.i18nString('metrics'),
                    'icon': getIcon("dashboard-gray.svg"),
                    'activeIcon': getIcon("dashboard-white.svg"),
                    "permissionId":"BOTBUILDER_BOT_ANALYTICS",
                    "isForUniversal":true,
                    "fullPanel":true,
                    "helpLink": "BOT_CHAT_LOGS_HELP",
                    "tooltip":i18n.i18nString('nlp_metrics_tooltip'),
                }],
                sessionFlow:[
                    {
                        "id": "sessionFlow",
                        "name": i18n.i18nString('conversation_flow'),
                        "activeIcon": assetsPath+"images/left-menu-img/batchTestingIconWhite.svg",
                        "permissionId":"BOTBUILDER_BOT_ANALYTICS",
                        "isForUniversal":true,
                        "fullPanel":true,
                        "helpLink": "RAND_182",
                        "tooltip":i18n.i18nString('conversation_flows_tooltip'),
                    }
                ],
                conversations:[
                    {
                        "id": "conversations",
                        "name": i18n.i18nString('conversation'),
                        "activeIcon": assetsPath+"images/left-menu-img/batchTestingIconWhite.svg",
                        "permissionId":"BOTBUILDER_BOT_ANALYTICS",
                        "isForUniversal":true,
                        "fullPanel":true,
                        "helpLink": "RAND_182",
                        "tooltip":i18n.i18nString('conversation'),
                    }
                ],
                performance:[
                    {
                        "id": "performance",
                        "name": i18n.i18nString('performance'),
                        "activeIcon": assetsPath+"images/left-menu-img/batchTestingIconWhite.svg",
                        "permissionId":"BOTBUILDER_BOT_ANALYTICS",
                        "isForUniversal":true,
                        "fullPanel":true,
                        "helpLink": "RAND_182",
                        "tooltip":i18n.i18nString('performance'),
                    }
                ],
            };
            this.settings = {
                pinned_settings:[],//make sure this must id must be pinned_tabName
            };
            this.deploy = {
                pinned_deploy:[],//make sure this must id must be pinned_tabName
                "channles":[
                    {
                        type: "channels",
                        id: "channels",
                        name: i18n.i18nString('channels'), //if any name changes please update in alias obj also//
                        class: "btx-channels",
                        hide: false,
                        _id: "BOTBUILDER_CHANNELS"
                    }, 
                   
                   
                ],
                'publish':[
                    {
                        "id": "publish",
                        "name": i18n.i18nString('publish'), //if any name changes please update in alias obj also//
                        class: "btx-publish",
                        "hide": false,
                        "permissionId":"BOTBUILDER_PUBLISH_BOT"
                     },
                ],
                "apiExtensions":[
                     {
                        id: "agentTransfer",
                        name:  i18n.i18nString( 'agent_transfer'),
                        description:  i18n.i18nString( 'agentTransferDesc'),
                        class: "btx-agent-transfer",
                        helpLink: "AGENT_TRANSFER_HELP",
                        permissionId: 'BOTBUILDER_EXTENSIONS',
                        "tooltip":i18n.i18nString('agentTransfer_tooltip'),
                    },
                    {
                        "id": "botkitSDK",
                        "name":  i18n.i18nString( 'bot_kit_sdk_label'),
                        "description":  i18n.i18nString( 'botkitSDKdesc'),
                        "helpLink": "BOTKIT_SDK_HELP",
                        'permissionId': 'BOTBUILDER_EXTENSIONS',
                        class: "btx-botKit",
                        "tooltip":i18n.i18nString('bot_kit_tooltip'),
                    },
                    {
                        "id": "webMobileSDK",
                        "name":   i18n.i18nString( 'WEB_MOBILE_SDK_label'),
                        "description":  i18n.i18nString( 'WEB_MOBILE_SDK_desc'),
                        "helpLink": "WEBMOBILE_SDK_HELP",
                        'permissionId': 'BOTBUILDER_EXTENSIONS',
                        class: "btx-api-extensions",
                        "tooltip":i18n.i18nString('webmobile_sdk_tooltip'),
                    },
                    {
                        "id": "apps",
                        "name": i18n.i18nString( 'Manage_apps_label'),
                        "description":  i18n.i18nString( 'Manage_apps_desc'),
                        "helpLink": "MANAGEAPPS_HELP",
                        'permissionId': 'BOTBUILDER_APPS_AND_SCOPES',
                        class: "btx-apk",
                        "tooltip":i18n.i18nString('manage_apps_tooltip'),
                    },
                    {
                        "id": "manageApps",
                        "name": i18n.i18nString( 'api_scopes_label'),
                        "description":  i18n.i18nString( 'Api_scopes_desc'),
                        "helpLink": "APISCOPES_SDK_HELP",
                        'permissionId': 'BOTBUILDER_APPS_AND_SCOPES',
                        class: "btx-api-scopes",
                        "tooltip":i18n.i18nString('apiscopes_tooltip'),
                    }
               
                ],
               "botManagement":[
                     {
                        "id":"botVersion",
                        "name":i18n.i18nString('bot_versioning'),
                        "description":i18n.i18nString('bot_version_desc'),
                         class: "btx-bot-version",
                        "helpLink":"BOT_VERSION_HELP",
                        "permissionId":"BOTBUILDER_BOT_SETTINGS",
                        "tooltip":i18n.i18nString('bot_versions_tooltip'),
                    },
                    // {
                    //     "id": "importBot",
                    //     "name": i18n.i18nString('import_bot'),
                    //     "description": i18n.i18nString('Import_bot_desc'),
                    //     class: "btx-impExp",
                    //     "helpLink": "EXPORT_IMPORT_BOT",
                    //     'permissionId': "BOTBUILDER_BOT_IMPORT"
                    // },
                    // {
                    //     "id": "exportBot",
                    //     "name": i18n.i18nString('export_bot'),
                    //     "description": i18n.i18nString('Import_bot_desc'),
                    //     class: "btx-impExp",
                    //     "helpLink": "EXPORT_IMPORT_BOT",
                    //     'permissionId': "BOTBUILDER_BOT_SETTINGS"
                    // },
                    {
                        "id": "botImportExport",
                        "name": i18n.i18nString('import_and_export'),
                        "description": i18n.i18nString('Import_bot_desc'),
                        class: "btx-impExp",
                        "helpLink": "EXPORT_IMPORT_BOT",
                        'permissionId': "BOTBUILDER_BOT_IMPORT",
                        "tooltip":i18n.i18nString('import_export_tooltip'),
                    },
                    // {
                    //     "id": "tryMode",
                    //     "name": i18n.i18nString('try_mode_label'),
                    //     "description": i18n.i18nString('try_mode_desc'),
                    //     "helpLink": "HOME",
                    //     'permissionId': "BOTBUILDER_BOT_SETTINGS",
                    //     class: "btx-bot-version"
                    // },
                    {
                        "id": "deleteBot",
                        "name": i18n.i18nString('delete_bot'),
                        "description": i18n.i18nString('only_published_bots_can_be_deleted'),
                        "helpLink": "BOT_DELETE_HELP",
                        'permissionId': "BOTBUILDER_BOT_SETTINGS",
                        class: "btx-delete-1",
                        "tooltip":i18n.i18nString('delete_bot_tooltip'),
                    }
                ],
                "changeLogs":[{
                    "id": "changeLogs",
                    "name": i18n.i18nString('change_logs'),
                    "description": i18n.i18nString('change_logs_desc'),
                    class: "btx-change-logs",
                    "helpLink": "BOT_CHANGELOG_HELP",
                    'permissionId': "BOTBUILDER_BOT_SETTINGS"
                },],
            };
            this.manage = {
                pinned_manage:[],//make sure this must id must be pinned_tabName
                manageTeam:[
                    {
                        "id": "developerShare",
                        "name": i18n.i18nString('developerShare_nam'),
                        "description": i18n.i18nString('developerShare_desc'),
                        // "icon": assetsPath + "settingsIcons/developerShareIcon.svg",
                        class: "btx-botShare",
                        "helpLink": "BOT_SHARE_HELP",
                        'permissionId': "BOTBUILDER_BOT_DEVELOPERS"
                    },
                ],
                planUsage:[{
                    "id": "planUsage",
                    "name":  i18n.i18nString( 'planUsage'),
                    "description":  i18n.i18nString( 'planUsage_desc'),
                    'class': "btx-left-menu-planUsage",
                    "helpLink": "BOT_SETTINGS_HELP",
                    'permissionId': 'BOTBUILDER_BOT_SETTINGS'
                }],
                inVoices:[{
                    "id": "inVoices",
                    "name":  i18n.i18nString( 'inVoices'),
                    "description":  i18n.i18nString( 'inVoices_desc'),
                    'class': "btx-left-menu-inVoices",
                    "helpLink": "BOT_SETTINGS_HELP",
                    'permissionId': 'BOTBUILDER_BOT_SETTINGS'
                }],
            };
            this.getMenuVisibility = function(menu){
               var stream = $workflowService.selectedStream();
               var permissionId = _self.tabPermisionList[menu];
               var visibility = true;
               if(stream && stream.permissions && stream.permissions[permissionId] && stream.permissions[permissionId].length){
                if(menu === "botImportExport") {
                    var importPerm = _self.tabPermisionList['importBot'];
                    var exportPerm = _self.tabPermisionList['exportBot'];
                    if(stream.permissions[importPerm][0] === 'NO' && stream.permissions[exportPerm][0] === 'NO'){
                        visibility = false;
                    }
                } else if(menu==='storyboard') {
                    var storyboard = _self.tabPermisionList['storyboard'];
                    var task = _self.tabPermisionList['dialogTasks'];
                    if(stream.permissions[storyboard][0] === 'NO' && stream.permissions[task][0] === 'NO') {
                        visibility = false;
                    }
                }    else {
                    if(stream.permissions[permissionId][0] === 'NO'){
                        visibility = false;
                    }
                }
               }
                if(visibility){
                visibility = _self.getConditionalPermissions(menu);
                }
                return visibility;
             };
            this.tabPermisionList = { // moved from rigtt panal viewlist Variable assignment to here //
                IIPMasking: "BOTBUILDER_BOT_SETTINGS",
                advancedSettings: "BOTBUILDER_BOT_SETTINGS",
                agentTransfer: "BOTBUILDER_EXTENSIONS",
                alertTasks: "BOTBUILDER_TASKS",
                actionTasks: "BOTBUILDER_TASKS",
                informationTasks: "BOTBUILDER_TASKS",
                amendEntity: "BOTBUILDER_NATURAL_LANGUAGE",
                apps: "BOTBUILDER_APPS_AND_SCOPES",
                authorization: "BOTBUILDER_BOT_SETTINGS",
                batchTesting: "BOTBUILDER_BATCH_TESTING",
                // botDashboard: "BOTBUILDER_DASHBOARD",
                botFunctions: "BOTBUILDER_BOT_SETTINGS",
                botImportExport: "BOTBUILDER_BOT_IMPORT",
                botStoreSettings: "BOTBUILDER_BOT_SETTINGS",
                botSummary: "botSummary",
                botVersion: "BOTBUILDER_BOT_SETTINGS",
                botkitSDK: "BOTBUILDER_EXTENSIONS",
                changeLogs: "BOTBUILDER_BOT_SETTINGS",
                channels: "BOTBUILDER_CHANNELS",
                // containmentDashboard: "BOTBUILDER_DASHBOARD",
                customDashboard: "BOTBUILDER_CUSTOM_DASHBOARDS",
                conversations: "BOTBUILDER_DASHBOARD",
                defaultDialog: "BOTBUILDER_NATURAL_LANGUAGE",
                defaultDialogUniversal: "BOTBUILDER_TASKS",
                deleteBot: "BOTBUILDER_BOT_SETTINGS",
                developerShare: "BOTBUILDER_BOT_DEVELOPERS",
                dialogTasks: "BOTBUILDER_TASKS",
                eventsManage: "BOTBUILDER_EXTENSIONS",
                generalSettings: "BOTBUILDER_BOT_SETTINGS",
                ignoreWords: "BOTBUILDER_NATURAL_LANGUAGE",
                inVoices: "BOTBUILDER_BOT_SETTINGS",
                knowledgeCollection: "BOTBUILDER_KNOWLEDGE_GRAPH",
                languageManagement: "BOTBUILDER_BOT_SETTINGS",
                linkedBotTraining: "BOTBUILDER_NATURAL_LANGUAGE",
                linkedBots: "BOTBUILDER_TASKS",
                machineLearningUtterances: "BOTBUILDER_NATURAL_LANGUAGE",
                manageApps: "BOTBUILDER_APPS_AND_SCOPES",
                manageSessions: "BOTBUILDER_BOT_SETTINGS",
                metrics: 'BOTBUILDER_BOT_ANALYTICS',
                mlThresholds: "BOTBUILDER_NATURAL_LANGUAGE",
                multiIntentDetection: "BOTBUILDER_NATURAL_LANGUAGE",
                nlAdvancedSettings: "BOTBUILDER_NATURAL_LANGUAGE",
                planUsage: "BOTBUILDER_BOT_SETTINGS",
                publish: "BOTBUILDER_PUBLISH_BOT",
                sentimentManagement: "BOTBUILDER_NATURAL_LANGUAGE",
                sessionFlow: "BOTBUILDER_BOT_ANALYTICS",
                settings: "BOTBUILDER_NATURAL_LANGUAGE",
                smallTalk: "BOTBUILDER_TASKS",
                smartBotSettings: "BOTBUILDER_BOT_SETTINGS",
                standardResponses: "BOTBUILDER_NATURAL_LANGUAGE",
                storyboard: "BOTBUILDER_STORYBOARD",
                synonyms:"BOTBUILDER_NATURAL_LANGUAGE",
                // testTrain: undefined,
                tryMode: "BOTBUILDER_BOT_SETTINGS",
                uiForms: "BOTBUILDER_TASKS",
                variableManagement: "BOTBUILDER_BOT_SETTINGS",
                variableManagementContent: "BOTBUILDER_BOT_SETTINGS",
                webMobileSDK: "BOTBUILDER_EXTENSIONS",
                widgets: "BOTBUILDER_TASKS",
                importBot:"BOTBUILDER_BOT_IMPORT",
                exportBot:"BOTBUILDER_BOT_SETTINGS"

            };
            this.prepareMenuComponents = function(){
                var tempObj = {};
                $.each(_self.tabs,function(tabKey,tabValues){
                    $.each(tabValues,function(i,tabMenu){
                        tempObj[tabMenu] = [];
                      $.each(_self[tabMenu],function(key,menuComponents){
                        var menuObj = {
                            component:key,
                            name:i18n.i18nString('nav_tab_name_'+ key) || key,
                            limit:3 ,
                            initialLimit:3,
                            class:'btx-left-menu-'+key,
                            totalItems:menuComponents.length,
                        };
                        tempObj[tabMenu].push(menuObj);
                      });
                    });
                });
                _self.tabComponents = tempObj;
                _self.tabMenuItems = Object.assign({},_self.skills,_self.analytics, _self.settings,_self.deploy, _self.manage);
            };
            this.prepareMenuComponents();
            
            this.prepareNavigationTree = function (updatePinning) {
                this.prepareMenuComponents();
                var pinnedMenus = {};
                var channels = _self.getChannelVisiState();
                // console.log('Permissions setting...');
                _self.navigationTree.tabCatogaries = {};
                _self.navigationTree.menuCatogaries = {};
                _self.navigationTree.mainMenu = {};
                _self.navigationTree.menuItem = {};
                _self.navigationTree.permitedMenuItems = {
                    menu:{},
                    tabMenu:{},
                    tab:{}
                };
                _self.quickSearchData = {};
                $.each(_self.tabs, function (tabKey, innerMenus) {
                    var _tabName = 'nav_tab_name_'+  tabKey;
                    _self.quickSearchData[tabKey] = {
                        name: i18n.i18nString(_tabName),
                        type:'tab',
                        tabElements:[]
                    };
                    var pinnedtabMenukey = 'pinned_' + tabKey;
                    if(_self.tabMenuItems[pinnedtabMenukey]){
                        _self.tabMenuItems[pinnedtabMenukey] = [];
                    }
                    $.each(innerMenus, function (i, menu) {
                        var _menuComponents = _self.tabComponents[menu];
                        _self.navigationTree.tabCatogaries[menu] = {
                            tab: tabKey
                        };
                        $.each(_menuComponents, function (i, menuItem) {
                            _self.navigationTree.menuCatogaries[menuItem.component] = {
                                tabMenu: menu,
                                tab: tabKey,
                                tabs: JSON.parse(JSON.stringify(_self.tabComponents[menu]))
                            };
                        });
                    });
                });
                var addedItems = {};
                $.each(_self.tabMenuItems, function (key, value) {
                    _self.navigationTree.mainMenu[key] = {
                        totalItems: value.length,
                        items: [],
                        showMenu: null,
                    };
                    $.each(value, function (i, menu) {
                        var treeArray = [];
                        _self.navigationTree.menuItem[menu.id] = menu;
                        _self.navigationTree.menuItem[menu.id].parentMenu = key;
                        _self.navigationTree.menuItem[menu.id].tabMenu = _self.navigationTree.menuCatogaries[key].tabMenu;
                        _self.navigationTree.menuItem[menu.id].tab = _self.navigationTree.menuCatogaries[key].tab;
                        _self.navigationTree.menuItem[menu.id].showMenu = _self.getMenuVisibility(menu.id);
                        if (_self.navigationTree.menuItem[menu.id].showMenu) {
                            if(_self.pinnedItems[menu.id]){
                                if(!pinnedMenus[menu.id]){
                                    pinnedMenus[menu.id] = menu;
                                }
                            }
                            if(_self.showSearch(menu)){    // quick search data 
                            var tabName = 'nav_tab_name_'+  _self.navigationTree.menuCatogaries[key].tab;
                            var parentMenuName = 'nav_tab_name_'+  key;
                            var singleChild = false;
                            if(_self.navigationTree.mainMenu && _self.navigationTree.mainMenu[key] && (_self.navigationTree.mainMenu[key].totalItems === 1)){
                                singleChild = true;
                            }
                            var parentMenu = {
                                name:i18n.i18nString(parentMenuName),
                                _id:menu.id,
                                type:'menu',
                            };
                            treeArray.push(parentMenu);
                            var _menu = {
                                name:menu.name,
                                _id:menu.id,
                                type:'menu',
                            };
                            if (!singleChild) {
                                treeArray.push(_menu);
                            }
                            if(!addedItems[menu.id]){
                                addedItems[menu.id] = true;
                                var path =  i18n.i18nString(tabName) + ' > ' + i18n.i18nString(parentMenuName);
                                if (!singleChild) {
                                    path = path + ' > ' + menu.name;
                                }
                                var searchObj2 = {
                                    tab: _self.navigationTree.menuCatogaries[key].tab,
                                    elements:JSON.parse(JSON.stringify(treeArray)),
                                    searchTerm: path
                                };
                                if(_self.navigationTree.menuCatogaries[key].tab && _self.quickSearchData[_self.navigationTree.menuCatogaries[key].tab]){
                                    _self.quickSearchData[_self.navigationTree.menuCatogaries[key].tab].tabElements.push(JSON.parse(JSON.stringify(searchObj2)));
                                }
                            }
                            if(menu.id === 'channels'){
                                if(channels && channels.length){
                                    $.each(channels,function (i, chanl) {
                                        var parentList = JSON.parse(JSON.stringify(treeArray));
                                        var _chanelMenu = {
                                            name:chanl.name,
                                            _id:menu.id,
                                            type:'menu',
                                            internalMenu:chanl.id,
                                        };
                                        parentList.push(_chanelMenu);
                                        if(!addedItems[chanl.id]){
                                            addedItems[chanl.id] = true;
                                            var searchObj3 = {
                                                tab: _self.navigationTree.menuCatogaries[key].tab,
                                                elements:JSON.parse(JSON.stringify(parentList)),
                                                searchTerm: i18n.i18nString(tabName) + ' > ' + i18n.i18nString(parentMenuName) + ' > ' + menu.name + ' > ' + chanl.name,
                                            };
                                            if(_self.navigationTree.menuCatogaries[key].tab && _self.quickSearchData[_self.navigationTree.menuCatogaries[key].tab]){
                                                _self.quickSearchData[_self.navigationTree.menuCatogaries[key].tab].tabElements.push(JSON.parse(JSON.stringify(searchObj3)));
                                            }
                                        }
                                    });
                                }
                            }
                        }
                            _self.navigationTree.permitedMenuItems.menu[menu.id] = true;
                            if(!_self.navigationTree.permitedMenuItems.tabMenu[_self.navigationTree.menuCatogaries[key].tabMenu]){
                                _self.navigationTree.permitedMenuItems.tabMenu[_self.navigationTree.menuCatogaries[key].tabMenu] = menu.id;
                            }
                            _self.navigationTree.permitedMenuItems.tab[_self.navigationTree.menuCatogaries[key].tab] = true;
                            _self.navigationTree.mainMenu[key].showMenu = true;
                        }
                        _self.navigationTree.mainMenu[key].items.push(menu.id);
                    });
                });
                this.preparePinnedMenuData();
                _self.rightPannelMenu.menuItems = _self.navigationTree.menuItem;
                // console.log('Permissions set successfully...');
                // _self.testPermissions();
            };
            this.preparePinnedMenuData = function(){
                var menus =  Object.keys(_self.navigationTree.menuItem);
                var pinnedMenus ={};
                if(menus && menus.length){
                    $.each(menus,function(i,val){
                        if(_self.pinnedItems[val] && _self.getMenuVisibility(val)){
                            if(!pinnedMenus[val]){
                                pinnedMenus[val] = _self.navigationTree.menuItem[val];
                            }
                        }
                    });
                }
                var updatedPinnedMenuItems = {};
                if(pinnedMenus && Object.keys(pinnedMenus) && Object.keys(pinnedMenus).length){
                    $.each(pinnedMenus,function(key,value) {
                        var pinnedkey = 'pinned_' + _self.navigationTree.menuItem[key].tab;
                        if(!updatedPinnedMenuItems[pinnedkey]){
                            updatedPinnedMenuItems[pinnedkey] = [];
                        }
                        
                            if(_self.tabMenuItems[pinnedkey]){
                               var  _isAdded = _.findIndex(updatedPinnedMenuItems[pinnedkey], { id: key }) !== -1 ? true : false;
                                if(!_isAdded) {
                                    updatedPinnedMenuItems[pinnedkey].push(value);
                                }
                            }
                    });
                }
                $.each(_self.tabMenuItems,function(pinnedkey,value){
                     if(pinnedkey.startsWith('pinned_')) {
                        _self.tabMenuItems[pinnedkey] = updatedPinnedMenuItems[pinnedkey] || [];
                        _self.navigationTree.mainMenu[pinnedkey].totalItems = _self.tabMenuItems[pinnedkey].length;
                        _self.navigationTree.mainMenu[pinnedkey].showMenu = (_self.tabMenuItems[pinnedkey] && _self.tabMenuItems[pinnedkey].length)?true:false;
                        _self.navigationTree.mainMenu[pinnedkey].items = updatedPinnedMenuItems[pinnedkey];
                     }
                });
            };
            this.setORGetPreviousState = function(navigationObj){
                var localStore;
                var previousState;
                try {
                    localStore = window.localStorage.getItem("previousState");
                    previousState = JSON.parse(localStore);
                }
                catch (err) {
                    window.localStorage.removeItem("previousState");
                    console.log('Invalid state');
                }
                
                if(navigationObj && navigationObj.menu && previousState.selectedStream && previousState.selectedStream._id){
                    try {
                        previousState.tab = navigationObj.selectedTab;
                        previousState.selectedMenuItem = navigationObj.selectedMenuItem;
                        previousState.menu = navigationObj.menu;
                        previousState.botType =  $workflowService.selectedStream().type;
                        previousState.appLanguage = $workflowService.serveri18nLang();
                        previousState.selectedLanguage =  $workflowService.currentLanguage();
                        window.localStorage.setItem("previousState",JSON.stringify(previousState));
                    }
                    catch (err) {
                        console.log('Invalid state');
                    }
                } else {
                    if(previousState){
                        return previousState;
                    }
                }
            };
            this.resetNavigator = function(){
                _self.currentNavigationObj = {
                    selectedTab:'skills',
                    selectedTabMenu:'storyboard',
                    selectedMenuItem:'conversationalSkills',
                };
            };
            this.setNavigation = function (selectedMenuItem){
                var tabCat = _self.navigationTree.menuItem[selectedMenuItem].tab;
                var tabMenu = _self.navigationTree.menuItem[selectedMenuItem].parentMenu;
                _self.currentNavigationObj.selectedTab = tabCat  || _self.currentNavigationObj.selectedTab;
                _self.currentNavigationObj.selectedTabMenu = tabMenu  || _self.currentNavigationObj.selectedTabMenu;
                _self.currentNavigationObj.selectedMenuItem = selectedMenuItem  || _self.currentNavigationObj.selectedMenuItem;
            };
            function getIcon(iconName) {
                return menuIconPath + iconName;
            }
            var _state;
            this.setState=function(state){
                _state=state;
                $(this).trigger('stateChanged',state);
            };
            this.getState=function(state){             
                return _state || null;
                
            };
            
            this.getConditionalPermissions = function(view){
                // some of the required static conditions are added here please Refer right-panel.ks for dynaic logical conditions//
                var stream = $workflowService.selectedStream();
                switch(view){
                    case "storyboard":
                         return (stream.type === 'taskbot') || (stream.type === 'default' || stream.type === 'sample');
                    case "dialogTasks":
                        return stream.type!=='universalbot';
                    case "knowledgeCollection":
                        return stream.type!=='universalbot';
                    case "alertTasks":
                        return stream.type!=='universalbot';
                    case "informationTasks":
                        return stream.type!=='universalbot';
                    case "actionTasks":
                        return stream.type!=='universalbot';
                    case "widgets":
                        return  (stream.type!=='universalbot') || ((stream.type==='universalbot') && (stream.universalBotVersion === 2));
                    case "uiForms":
                        return ((stream.type!=='universalbot') && (stream.type !== "solution") ); 
                    case "flows":
                        return stream.type!=='universalbot';
                    case "linkedBots":
                        return stream.type==='universalbot';
                    case "smartBotSettings":
                        return stream.type === "solution";
                    // case "sampleBotSettings":
                    //     return stream.type === "sample";
                    case "botStoreSettings":
                        return isWorkFlowAdmin() && stream.type === "sample";
                    case "defaultDialogUniversal":
                        return stream.type==='universalbot';
                    case "defaultDialog":
                        return stream.type!=='universalbot';
                    case "machineLearningUtterances":
                        return stream.type!=='universalbot';
                    case "patterns":
                        return stream.type!=='universalbot';
                    case "multiIntentDetection":
                         return stream.type!=='universalbot';
                    case "advancedSettings":
                         return stream.type!=='universalbot';
                    case "nlAdvancedSettings":
                        return stream.type!=='universalbot';
                    case "negativePatterns":
                        return stream.type !== 'universalbot' && $workflowService.selectedStream().enableNegativePatterns;
                    case "amendEntity":
                         return stream.type!=='universalbot';
                    case "traits":
                          return stream.type !== 'universalbot';
                    case "mlThresholds":
                          return stream.type !== 'universalbot';
                    case "linkedBotTraining":
                        return stream.type === 'universalbot';
                    case "synonyms":
                        return stream.type === 'universalbot';
                    case "settings":
                        return (stream.type === 'universalbot') && (stream.universalBotVersion === 2);
                    case "ignoreWords":
                        return this.getIgnoreWordsVisisbility();
                    case "botVersion":
                        return stream.type !== 'solution';
                    case "planUsage":
                            return (stream.type !=='universalbot') && (stream.type !== 'solution') && (stream.type !== 'sample') && this.checkPlanUsageExist();
                    case "inVoices":
                            return (stream.type !=='universalbot') && (stream.type !== 'solution') && (stream.type !== 'sample') && this.checkInvoicesExist();
                    default:
                        return true;
                }
            };
            /*
             * to argument accept object with id of component that navigate to respective component 
               Ex: 
                navigator.navigate({id:"dialogTasks"});
                navigator.navigate({id:"nl"});
             */  
            this.testPermissions = function(){
                var tempObj = {};
                $.each(_self.navigationTree.menuItem, function(key,val) {
                    if(_self.navigationTree.menuItem[key].name === undefined){
                        console.log(key);
                    }
                    tempObj[_self.navigationTree.menuItem[key].name] = val.permissionId;
                });
                console.log(tempObj);
            };
            this.checkPlanUsageExist = function() {
                try {
                    var selectedAccount = $workflowService.selectedAccount();
                    var appControls = $applicationService.userInfo().appControls;
                    if(appControls.isBillingEnabled && (selectedAccount.accountType === 1 || selectedAccount.accountType !== 1) && (selectedAccount && selectedAccount.roles && selectedAccount.roles.length > 0)) {
                        return true;
                    }
                    return false;
                } catch (error) {
                    return false;
                }
            };
            this.checkInvoicesExist = function() {
                try {
                    var selectedAccount = $workflowService.selectedAccount();
                    var appControls = $applicationService.userInfo().appControls;
                    if(appControls.isBillingEnabled && selectedAccount.accountType === 1 && (selectedAccount && selectedAccount.roles && selectedAccount.roles.length > 0)) {
                        return true;
                    }
                    return false;
                } catch (error) {
                    return false;
                }
            };
            this.navigate = function(to){ 
                $(".sidenav").removeClass('zindex1');
                var navObj=this.getNavigationObjectById(to);
                $(this).trigger('navigateTo',navObj);
            };
            
            this.getNavigationObjectById = function (to,trigger) {
                var navObj = {id: "", level: "", data: ""};
                navObj.id = to.id;
                navObj.path = [];
                return navObj;
            };
            
            //unused till
            this.homeDirectives = [
                {
                    id: "noBotsForm"
                }, {
                    id: "botsForm"
                }, {
                    id: "botDetailsForm"
                }, {
                    id: "botsBillingForm"
                }, {
                    id: "teamForm"
                }];
            this.rightPannelMenu.channels = channelsArray;
            _self.prepareNavigationTree();
        }]);

})(angular);



;(function(ng){

	var _module = ng.module('app.helpers');

    _module.factory('textparser',function(){

        var wrappingText='&nbsp;<span class="badge">()</span>&nbsp;';
        var searchCriteria = '<span class="badge">';
        var replaceText = '()';

        function parser(input,wrapperText,srchCriteria,rplcText){

            if(!input){
                return input;
            }

            wrappingText = wrapperText || wrappingText;
            searchCriteria = srchCriteria || searchCriteria;
            replaceText = rplcText || replaceText;

            var data = input.replace(/<\/p>/g,'').replace(/<p>/g,'');
            data = data.replace(/^<br \/>/g,'').replace(/<br>/g,'');
            var result,noOfBraces,start,end;

            (function wrapIt(value){
                data=value;
                if(data.indexOf('&lt;%=')!==-1 && data.indexOf('%&gt;') !==-1){
                    data= wrapText(data);
                    wrapIt(data);    
                }else if(data.indexOf('&lt;%')!==-1 && data.indexOf('%&gt;') !==-1){
                    data= wrapText2(data);
                    wrapIt(data);
                }else if(data.indexOf('<%=')!==-1 && data.indexOf('%>') !==-1){
                    data= wrapText(data);
                    wrapIt(data);    
                }else if(data.indexOf('<%')!==-1 && data.indexOf('%>') !==-1){
                    data= wrapText2(data);
                    wrapIt(data);
                }else{
                    return;
                }
            }(data));

            return data;
        }

        function wrapText(string){
            if(!string){
                return;
            }
            return string.replace(/&lt;%=|<%=/,'&nbsp;<span class="badge">').replace(/%&gt;|%>/,'</span>&nbsp;');
        }

        function wrapText2(string){
            if(!string){
                return;
            }
            return string.replace(/&lt;%|<%/,'&nbsp;<span class="label label-warning">').replace(/%&gt;|%>/,'</span>&nbsp;');   
        }

        function reWrap(data){
            if(!data){
                return;
            }
            return data.replace(/<span class="label label-warning">/g,'<%')
                       .replace(/<span class="badge">/g,'<%=')
                       .replace(/<\/span>/g,'%>')
                       .replace(/&lt;/g,'<')
                       .replace(/&gt;/g,'>')
                       .replace(/&nbsp;|<span>/g,'');
        }

        return {
            parse:parser,
            reWrap:reWrap
        };

    });

}(angular));

;(function (ng) {
    'use strict';

    var _module = ng.module('app.helpers');
    _module.service('scriptLoader', ['$rootScope', '$timeout','$applicationService', 'env_conf',
        function ($rootScope, $timeout,$applicationService,env_conf) {
            var _self=this;
            this.loadScripts = function () {
                this.loadMixPanelScripts();
                if ( window.appConfig.ENABLE_GOOGLE_SPEECH && window.appConfig.GOOGLE_SPEECH_API_KEY) {
                    this.loadGoogleSpeechScripts();
                }

                if (window.appConfig.ENABLE_GOOGLE_MAPS && window.appConfig.GOOGLE_MAPS_API_KEY) {
                    this.loadGoogleMapsScripts();
                }

                if (!window.appConfig.ON_PREMISE && window.appConfig.GOOGLE_ANALYTICS_KEY) {
                    this.loadGoogleAnalytisScripts();
                }

                // if (!window.appConfig.ON_PREMISE) {
                //     this.loadHubSpotScripts();
                // }
               
                $rootScope.$on('security:authenticated', function () {
                    if (window.appConfig.INLINE_MANUAL_SITE_KEY) {
                        _self.loadInlineManualScripts();
                    }
                });

            };

            this.loadGoogleMapsScripts = function () {
                var _key = window.appConfig.GOOGLE_MAPS_API_KEY;
                var mapUrl = '//maps.googleapis.com/maps/api/js?key=' + _key + '&libraries=places&sensor=true&callback=angular.noop';
                loadScript(mapUrl);
            };


            this.loadGoogleSpeechScripts = function () {
                var speechUrl = '//apis.google.com/js/api.js';
                loadScript(speechUrl);
            };


            this.loadHubSpotScripts = function () {
                var hsURL = '//js.hs-scripts.com/3458671.js';
                loadScript(hsURL);
            };


            function loadScript(scriptUrl,appendTo) {
                appendTo = appendTo || 'body';
                var el = document.createElement('script');
                el.language = 'javascript';
                el.async = 'true';
                el.type = 'text/javascript';
                el.src = scriptUrl;
                $(appendTo).append(el);
            }

            this.loadGoogleAnalytisScripts = function () {

                function loadGoogleAnlyScripts() {
                    var inlineScript = document.createTextNode("(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');");
                    var el = document.createElement('script');
                    el.language = 'javascript';
                    el.async = 'true';
                    el.type = 'text/javascript';
                    el.appendChild(inlineScript);
                    $('body').append(el);
                    $timeout(function () {
                        if (window.appConfig.GOOGLE_ANALYTICS_KEY) {
                            window.ga('create', window.appConfig.GOOGLE_ANALYTICS_KEY, 'auto');
                            ga('send', 'pageview', {
                                'page': location.hostname+location.pathname+location.search+location.hash,
                                'title': 'Kore.ai Bot Builder'
                              });
                        }
                    }, 100);

                }
                loadGoogleAnlyScripts();
            };
            this.loadMixPanelScripts = function () {
                var _mixPanelScript =   env_conf['assets-url'] + 'scripts/mixpanel.js';
                loadScript(_mixPanelScript,'head');
            };
            this.loadWhatfixScripts = function () {
                var scripts = [
                    '//whatfix.com/embed/embed.nocache.js'
                ];
                function whatfix_init() {
                    window._wfx_settings = {"ent_id": "33cfd810-0ae4-11e7-9135-04013d24cc02"};
                }
                function loadWhatfixScripts(scripts) {
                    var script = scripts.shift();
                    var el = document.createElement('script');
                    el.language = 'javascript';
                    el.async = 'true';
                    el.type = 'text/javascript';
                    $('body').append(el);
                    el.onload = function (script) {
                        whatfix_init();
                    };
                    el.src = script;
                }
                if (window.appConfig.LOAD_WHATFIX) {
                    loadWhatfixScripts(scripts);
                }
            };
            
            /*          
             * Ref:  
             * https://help.inlinemanual.com/docs/single-page-app-and-people-tracking-angular-react-ember
             *
             */
            this.loadInlineManualScripts = function () {

                function inlinemanual_init() {
                    createInlineManualPlayer(window.inlineManualPlayerData);
                    $timeout(function () {
                        if (window.inline_manual_player) {
                            window.inline_manual_player.deactivate();
                        }
                    }, 200);
                }
                function loadInlineManualScripts(PLAYER_ID) {
                    var koreUID = $applicationService.userInfo().userId;
                    var koreEmail=$applicationService.userInfo().koreUserInfo.emailId;
                    koreUID = btoa(koreUID.substring(koreUID.indexOf('u-') + 2, koreUID.length));//converting to base64 by removing u-
                    window.inlineManualTracking = {
                        uid: koreUID,
                        email:koreEmail
                    };
                    var scripts = [
                        '//inlinemanual.com/embed/player.' + PLAYER_ID + '.bare.js'
                    ];
                    var script = scripts.shift();
                    var el = document.createElement('script');
                    el.language = 'javascript';
                    el.async = 'true';
                    el.charset = "UTF-8";
                    el.type = 'text/javascript';
                    $('body').append(el);
                    el.onload = function () {
                        inlinemanual_init();
                    };
                    el.src = script;
                }
                if (window.appConfig.INLINE_MANUAL_SITE_KEY) {
                    loadInlineManualScripts(window.appConfig.INLINE_MANUAL_SITE_KEY);
                }
            };

        }]);


})(angular);



;(function(ng) {

	'use strict';

	var _module = ng.module('app.helpers');

	_module.factory('security', security);

	security.$inject = ['$rootScope', '$http', '$location', '$timeout', '$q', '$translator', '$applicationService', '$endpoints','NotificationService','localstore','versionMonitor','interactiveHelp','appVersionService','$workflowService','mixPanel','i18n'];

	function security($rootScope, $http, $location, $timeout, $q, $translator, $applicationService, $endpoints,NotificationService,localstore,versionMonitor,interactiveHelp,appVersionService,$workflowService,mixPanel,i18n) {
        var userFlowObj = {
            signUpInitiated:false,
            signupEmail:''
        };
		var curUserDetails = {};
        var authenticated = false;
        var selectedAccountId = "";
		var service = {
            handleSSORedirect: handleSSORedirect,
            getPasswordPolicy: getPasswordPolicy,
            autoLogin: autoLogin,
            ssoLogin: ssoLogin,
            login: login,
            logout: logout,
            resumeOldSession: resumeOldSession,
						resetOAuth: resetOAuth,
            signUp: signUp,
						authenticateSelectedUser: authenticateSelectedUser,
            signUpUser: signUpUser,
            resendVerification: resendVerification,
            handleAccountActivation: handleAccountActivation,
            sendResetLink: sendResetLink,
            passReset: passReset,
            isAuthenticated: isAuthenticated,
                        saveUserData: saveUserData,
                        resetlocalStoragAfterLogout:resetlocalStoragAfterLogout,
                        redirectToLoginPath:redirectToLoginPath
        };

        return service;
        //////////////////////
        function resetSignUpUserDetails(){
             userFlowObj = {
                signUpInitiated:false,
                signupEmail:''
            };
        }
        resetSignUpUserDetails();
        function redirectToLoginPath(reload){
            mixPanel.reset();
            if(window.appConfig.LOGOUT_REDIRECT_TO){
                //window.location.href='https://www.google.com';
                window.location.href=window.appConfig.LOGOUT_REDIRECT_TO;                
            }else{
                $location.path(window.appConfig.CONTEXT_PATH + '/login');  // Once user logs out, redirect him to login page
                if(reload){
                    window.location.reload(true);
                }    
            }
        }

        function handleSSORedirect(dataObject, checkDirect) {

            var json = {
                ssoProvider: dataObject.idp,
								botLanding: checkDirect
            };
            var redirectValue = $location.protocol() + "://" + location.host;
            redirectValue = redirectValue + window.appConfig.CONTEXT_PATH + '/';
            redirectValue = redirectValue + encodeURIComponent('?query=' + JSON.stringify(json)+'&rnd=' + Math.random().toString(36).substr(7));

            var url = $endpoints.baseUrl + $endpoints.apiPreFix + '/sso/login?' + "connection=" + dataObject.idp + "&" + "redirect_url=" + redirectValue+'&fromBuilder=true';

            if (!window.appConfig.NO_CARRY_SSO_EMAIL) {
                if (dataObject.hasOwnProperty('usernameSecured')) {
                    url += "&username=" + dataObject.usernameSecured;
                }
            }

            window.location = url;
        }

        function getPasswordPolicy(emailId, callback) {
            var url = 'mp.user.pwdPolicy';

            var params = {
                emailId: emailId
            };

            $translator.translate(url, params, {})
                .then(function (response) {
                    if (response.data) {
                        var hintText = i18n.i18nString('yourPasswordContain');
                        var pattern = '^';
                        //var charstoAllow = '[A-Za-z\\d!@$#%^&*._-]';
												var charstoAllow = '[A-Za-z\\d=`~!@#$%^&*._:"\\(\\)\\-+{}:"\\[\\]\'\;\\\\,\\/<>?|]';
                        if (response.data.hasOwnProperty('pwdMinLength')) {
                            hintText = hintText +  i18n.i18nString('atleast_char',{dyn:response.data.pwdMinLength});
                        }
                        if (response.data.hasOwnProperty('pwdMinAlphabets') && response.data.pwdMinAlphabets > 0) {
                            hintText =  hintText + ', ' + i18n.i18nString('contain_alpha',{dyn:response.data.pwdMinAlphabets});
                            pattern = pattern + '(?=.*[A-Za-z])';
                        }
                        if (response.data.hasOwnProperty('pwdMinNumericValues') && response.data.pwdMinNumericValues > 0) {
                            hintText =  hintText + ', ' + i18n.i18nString('contain_numeric',{dyn:response.data.pwdMinNumericValues});
                            pattern = pattern + '(?=.*\\d)';
                        }
                        if (response.data.hasOwnProperty('pwdMinSpecicalChars') && response.data.pwdMinSpecicalChars > 0) {
                            hintText = hintText + ', ' + i18n.i18nString('contain_special',{dyn:response.data.pwdMinSpecicalChars});
                            //pattern = pattern + '(?=.*[!@$#%^&*._-])';
														pattern = pattern + '(?=.*[=`~!@#$%^&*._:"\\(\\)\\-+{}\\[\\]\'\;\\\\,\\/<>?|])';
                        }
                        if (response.data.hasOwnProperty('pwdMinLowercase') && response.data.pwdMinLowercase > 0) {
                            hintText =  hintText + ', ' + i18n.i18nString('contain_lower',{dyn:response.data.pwdMinLowercase});
                            pattern = pattern + '(?=.*[a-z])';
                        }
                        if (response.data.hasOwnProperty('pwdMinUppercase') && response.data.pwdMinUppercase > 0) {
                            hintText =  hintText + ', ' + i18n.i18nString('contain_upper',{dyn:response.data.pwdMinUppercase});
                            pattern = pattern + '(?=.*[A-Z])';
                        }

                        pattern = pattern + charstoAllow + '{' + response.data.pwdMinLength + ',' + response.data.pwdMaxLength + '}$';
                        hintText = hintText + '.';
                        response.data.policyInstructions = hintText;
                        response.data.pattern = pattern;
                        // updating password policy and sending to bt-login page
                        var _passwordPolicyObj = {'pattern':pattern,'hintText':hintText,'minLength':(response.data.pwdMinLength || 6),'maxLength':(response.data.pwdMaxLength || 256)};
                        if(callback) {
                            callback.updatePasswordPolicy(_passwordPolicyObj);
                        }
                    }
                    // PENDING
                    // sharedData.passwordPolicy(response.data);
                    // $rootScope.$broadcast('security:pwdPolicyUpdated', null);
                }
            );
        }


        function signUpUser(dataObject, callback){
            // Using MD5 we could pass the password to the server.
            var url = 'mp.user.signup';
            var payload = {
                firstName: dataObject.firstName,
                lastName: dataObject.lastName,
            };

            if(dataObject.accountName){
               payload.accountName=dataObject.accountName;
            }
            if (dataObject.phone) {
                payload.phoneNo = (dataObject.countryCode + dataObject.emailPhone).replace(/-/g, '');
            }
            else {
                payload.emailId = dataObject.emailPhone;
            }

            $translator.translate(url, {}, payload).then(
                function (response){
                    var userInfo = {
                        $email:dataObject.emailPhone,
                        FirstName: dataObject.firstName,
                        LastName: dataObject.lastName,
                        Category:"Onboarding",
                        "Sub Category":"Signup",
                        "Property Type":"List",
                        "Property Value":"Email",
                        "Level":'ONBOARDING AND ACTIVATION',
                        "Sign In Mode":"Email",
                    };
                    if(!userFlowObj.signUpSubmitted || (userFlowObj.signupEmail!== dataObject.emailPhone)){
                        if(userFlowObj.signupEmail!== dataObject.emailPhone){
                            mixPanel.reset();
                            mixPanel.setUserInfo(data.userInfo.emailId,userInfo);
                        }
                        userFlowObj.signUpSubmitted =  true;
                        userFlowObj.signupEmail = dataObject.emailPhone;
                        mixPanel.postEvent('Signup Submitted',userInfo);
                    }
                    callback.success(response);
                },
                function (error){
                    callback.failure(error);
                }
            );
        }

        function handleUserLoginType(response, dataObject, callback) {
            var data = response.data;
						var ssuEnabled = data.self_signup_enabled;


//# these have to come from server
            // data.status='unknown';
            // data.isBTAccessAllowed=false;
            // data.btRequestFormType='salesforce';


//            if (data.hasOwnProperty('idp')) { // status can be both active / unknown
//               dataObject.idp = data.idp;
//               handleSSORedirect(dataObject);
//           }else if (data.isBTAccessAllowed) {
//                if (data.status === 'unknown') {
//                    callback.moreRequired('sign-up');
//                } else if (data.status === 'inactive') {
//                    if (dataObject.phone === false) {
//                        callback.moreRequired('verify-email');
//                    }
//                    else {
//                        callback.moreRequired('verify-phone');
//                    }
//
//                } else if (data.status === 'active') {
//                    callback.moreRequired('credentials');
//                }
//            } else {
//                if (data.status === 'unknown') {
//                    if(data.btRequestFormType==="adminForm"){
//                        $location.path(window.appConfig.CONTEXT_PATH + '/requestbtaccess');
//                    }else if(data.btRequestFormType==="salesforce"){
//                         $location.path(window.appConfig.CONTEXT_PATH + '/requestsfbtaccess');
//                    }
//                } else if (data.status === 'inactive') {
//                    callback.moreRequired('user-inactive-btaccess');
//                } else if (data.status === 'active') {
//                    callback.moreRequired('credentials');
//                }
//            }
            if (data.hasOwnProperty('usernameSecured')) { // status can be both active / unknown
                dataObject.usernameSecured = data.usernameSecured;
            }
            if (data.hasOwnProperty('idp')) { // status can be both active / unknown
                dataObject.idp = data.idp;
                if(data.status === 'active' && dataObject.formType ==='pre-sign-up'){
                    callback.userExist();
                } else {
                    handleSSORedirect(dataObject);
                }
            }
            else if (data.status === 'active') {
                if(data.status === 'active' && dataObject.formType ==='pre-sign-up'){
                    callback.userExist();
                } else {
                    callback.moreRequired('credentials');
                }
            }
            else if (data.status === 'inactive') {
                if(dataObject.missingFields){
                     callback.moreRequired('sign-up-password');
                } else {
                    if (dataObject.phone === false) {
                        callback.moreRequired('verify-email');
                    } else {
                        callback.moreRequired('verify-phone');
                    }
                }

            }
            else { //data.status = 'unknown'
								if(ssuEnabled || ssuEnabled === undefined) {
                                        if(dataObject.formType ==='pre-sign-up'){
                                            callback.moreRequired('sign-up');
                                            var userInfo = {
                                                $email: dataObject.emailPhone,
                                                Category:"Onboarding",
                                                "Sub Category":"Signup",
                                                Level:'ONBOARDING AND ACTIVATION',
                                            };
                                            if(!userFlowObj.signUpInitiated || (userFlowObj.signupEmail!== dataObject.emailPhone)){
                                                userFlowObj.signUpInitiated =  true;
                                                userFlowObj.signupEmail = dataObject.emailPhone;
                                                mixPanel.setAnanomus(dataObject.emailPhone);
                                                mixPanel.postEvent('Signup Start Process',userInfo);
                                                mixPanel.postEvent('Signup Initiated',userInfo);
                                            }
                                            getPasswordPolicy(dataObject.emailPhone,callback);
                                        } else {
                                            callback.moreRequired('pre-sign-up');
                                        }
                                        
								}
								else {
										callback.moreRequired('disable-signup');
								}
          	}
        }
        function checkEnterpriseUser(emailId) {
            var deferred = $q.defer();
            var _isFreeDomainUrl='bt.checkFreeDomain',_isFreeDomainParams={email: emailId};
            $translator.translate(_isFreeDomainUrl, _isFreeDomainParams)
                    .then(function (res) {
                        if (res && res.data && res.data[0] === false) {
                             deferred.resolve(res);
                        } else {
                             deferred.reject({reason: "ShowError", msg: "Only enterprise domain users are allowed to access Bot Builder Tool"});
                        }
                    }, function (err) {
                         deferred.reject({reason: "ShowError", msg: "Something went wrong with domain validation"});
                    });
            return deferred.promise;
        }
        // Login functionality to allow for different users and user Ids.
        function autoLogin(dataObject, callback) {

            var url = 'mp.user.checkIdStatus', params = {};

            // Check how to proceed for phone or email.
            if (dataObject.phone === false) {
                params.emailId      = dataObject.emailPhone;
                dataObject.username = dataObject.emailPhone;
            }
            else {
                params.phoneNo = (dataObject.countryCode + dataObject.emailPhone).replace(/-/g, '');
                params.phoneNo = encodeURIComponent(params.phoneNo);
                dataObject.username = params.phoneNo;
            }
            //checkEnterpriseUser(params.emailId || params.phoneNo).then(function (res) {
                $translator.translate(url,{} ,params).then(
                        function (response) {
                            if ((response.data.isPrimaryIdentity !== 'true' && response.data.isPrimaryIdentity !== true) && response.data.status === 'active') {
                                callback.failure(null, true);
                            }
                            else {
                                handleUserLoginType(response, dataObject, callback);
                            }
                        },
                        function (response) {
                            callback.failure(response);
                        }
                );
//            }, function (errRes) {
//                 callback.stopFurther(errRes);
//            });
        }

        function ssoLogin(id_token, optionalParams, params) {
						if(optionalParams === undefined || optionalParams.botLanding === undefined) {
								localstore.removeSelectedAccount();
						}
            var url = 'mp.user.ssoLogin';
            var payload = {
                id_token: id_token,
                fromBuilder:true,
            };
            if(optionalParams && optionalParams.ssoProvider){
                payload.socialAuthType = optionalParams.ssoProvider;
            }
            if(params && params.selectedAccount) {
                selectedAccountId = params.selectedAccount;
            }
            if(params && params.appLanguage) {
                localStorage.setItem('queryParamLang',params.appLanguage);
                localStorage.setItem('currentBotLanguage', params.appLanguage);
            }
            if(params && params.selectedBotLanguage) {
                $workflowService.currentLanguage(params.selectedBotLanguage);
            }
            $translator.translate(url, {}, payload).then(
                function (response){
                    var data = response.data;

                    curUserDetails = response.data.userInfo;
                    $translator.setAuthHeaders(data.authorization);

                    // FLow: sso login => call getUserProfile to get the userInfo in correct format => save everything
                    getUserProfile(data, optionalParams,params);
                    var userId = curUserDetails.id;
                    var userInfo = {
                        "$email": curUserDetails.emailId,
                        "USER_ID":curUserDetails.id,
                        "NAME":curUserDetails.fName + ' ' +curUserDetails.lName,
                        "$name":curUserDetails.fName + ' ' +curUserDetails.lName,
                        "Sign In Mode": "Google/Microsoft",
                    };
                    if(optionalParams && optionalParams.ssoProvider){
                        userInfo["Sign In Mode"] = optionalParams.ssoProvider;
                    }
                    mixPanel.setUserInfo(curUserDetails.emailId,userInfo);
                    if(curUserDetails && curUserDetails.isFirstTimeLogin) { 
                        userInfo["Category"] = "Onboarding";
                        userInfo["Sub Category"] = "Signup";
                        mixPanel.postEvent('Signup Start Process',userInfo);
                        setTimeout(function() {
                            mixPanel.postEvent('Signup SSO Initiated',userInfo);
                            setTimeout(function() {
                                mixPanel.postEvent('Signup Submitted',userInfo);
                                setTimeout(function() {
                                    mixPanel.postEvent('Signup Successful',userInfo);
                                },200);
                            },200);
                        },200);
                    } else {
                        mixPanel.postEvent('Sign In',userInfo);
                    }
                },
                function (errRes) {
                    // Show the error message
                    console.log(errRes);
                    if(errRes.data.errors && errRes.data.errors && errRes.data.errors.length && errRes.data.errors[0].msg=="SELF_SIGNUP_DISABLED"){
                     $location.path(window.appConfig.CONTEXT_PATH + '/info/session_expired');
                    }else{
                     logout();
                    }
                    
                }
            );
        }

        // Login for when the user needs to enter a password
        function login(dataObject, callback, reAuthParams, isFromEmbedded) {
            localstore.removeSelectedAccount();
            var url = 'mp.user.login';
            var payload = {};

            if(dataObject) {
                payload = {
                    client_id: '1',
                    client_secret: '1',
                    scope: '1',
                    grant_type: 'password',
                    username: dataObject.emailPhone,
                    password: dataObject.pass
                };
                if (dataObject.phone === true) {
                    payload.username = (dataObject.countryCode + dataObject.emailPhone).replace(/-/g, '');
                }
            }

            if(reAuthParams) {
                payload = reAuthParams;
            }

            $translator.translate(url, {}, payload).then(
                function (response){
                    
                    var data = response.data;
                    $translator.setAuthHeaders(data.authorization);
                    curUserDetails = data.userInfo;
                   
                    if(isFromEmbedded) {
                        callback.success(true);
                        return;
                    }
                    if(data.userInfo.isFirstTimeLogin){
                        var userInfo = {
                            $email:dataObject.emailPhone,
                            FirstName: dataObject.firstName,
                            LastName: dataObject.lastName,
                            "Category":"Sign in Mode",
                            "Sub Category":"Signup",
                            "Property Value":"Email",
                            "Property Type":"List",
                            Level:'ONBOARDING AND ACTIVATION',
                            "Sign In Mode":"Email",
                        };
                        if(!userFlowObj.signUpSuccessful || (userFlowObj.signupEmail!== dataObject.emailPhone)){
                            mixPanel.reset();
                            mixPanel.setUserInfo(data.userInfo.emailId,userInfo);
                            userFlowObj.signUpSuccessful =  true;
                            userFlowObj.signupEmail = dataObject.emailPhone;
                            mixPanel.postEvent('Signup Successful',userInfo);
                        }
                    } else {  
                        var _userInfo = {
                            $email: curUserDetails.emailId,
                            FirstName: dataObject.firstName,
                            LastName: dataObject.lastName,
                            USER_ID:curUserDetails.id,
                            $name:curUserDetails.fName + ' ' +curUserDetails.lName,
                            NAME:curUserDetails.fName + ' ' +curUserDetails.lName,
                            "Sign In Mode":"Email",
                            // "Category":"Onboarding",
                            // "Sub Category":"Signup",
                        };
                        mixPanel.reset();
                        mixPanel.setUserInfo(curUserDetails.emailId,_userInfo);
                        setTimeout(function() {
                            mixPanel.postEvent('Sign In',_userInfo);
                        });
                    }
                    callback.success(true);
                                        getAccountsLanding(data, callback);
                   
                    //getUserProfile(data); // get userData in required format

                },
                function (response){
                    callback.failure(response);
                }
            );
        }

				function authenticateSelectedUser(item) {
            authenticated = true;
            completeAuthentication();
        }

        // Logout function to 'logout' the user.
        function resetlocalStoragAfterLogout (){
            // set everything to null.
            mixPanel.reset();
            authenticated = false;
            localstore.removeSelectedAccount();
            localstore.setAuthData({});
            $translator.setAuthHeaders();
            $applicationService.removeUserInfo(); // reset user info
        }
        function logout(dontNavigateToLogin) {
            function handleLogout(){
                var userInfo = $applicationService.userInfo();
                try{
                    mixPanel.postEvent('Sign Out',userInfo);
                } catch(e){
                    console.log(e);
                }
               if(window.appConfig.DIRECT_SSO_LOGIN && userInfo && userInfo.appControls && userInfo.appControls.directSSO && !dontNavigateToLogin){ 
                    $location.path(window.appConfig.CONTEXT_PATH + '/info/logout_success');
                    resetlocalStoragAfterLogout();
                }else{
                    resetlocalStoragAfterLogout();
                    if(!dontNavigateToLogin){
                        redirectToLoginPath(true);
                        //_wfx_close_live();
                        $rootScope.showLoginLoader = true;
                    }else if(dontNavigateToLogin){
                        $location.path(window.appConfig.CONTEXT_PATH + '/info/session_expired');
                    }
                }
              
            }
            $translator.translate('mp.user.signout',{},{eventOrigin:0}).then(handleLogout, handleLogout);

        }

        // Finish the authentication process.
        function authenticate() {
            // Let the app know it is now authenticated.
            $rootScope.$broadcast('security:authenticated', null);
        }

        // send a notice to the authentication that the login has completed.
        function completeAuthentication() {
            makeAppVersionAPI().then(function (res) {
                versionMonitor.setAppVersionData(res);
                versionMonitor.startChecking();
                appVersionService.setVersionOnLoad();
                interactiveHelp.takTourVersion();
                if (authenticated === true) {
                    authenticate();
                }
            });
        }
        
        function makeAppVersionAPI(){
            return $translator.translate('bt.check.versionInfo');        
        }

        function authenticateUser(response) {
            authenticated = true;
            completeAuthentication();
        }
				// function authenticateUsertoLand() {
        //     authenticate();
        // }

        // Check the expiry of saved auth token
        function getUserProfile(data, optional,_params) {
            var url = 'mp.user.getUserProfile';
            var userId = data.userInfo.id;
            var params = {
                userId: userId
            };
            return $translator.translate(url, params, {}).then(
                function (response) {
                    if(response && response.data && response.data.personalInfo && response.data.personalInfo.language){
                        $workflowService.serveri18nLang(response.data.personalInfo.language);
                    } else {
                        $workflowService.serveri18nLang('en'); // default in case of old users with no language set manually
                    }
                    data.userInfo = angular.merge(data.userInfo, response.data);
                    getAppControlList(data, optional,_params);
                },
                function () {
                    localstore.setAuthData({}); // clear the local login info
                    $translator.setAuthHeaders();
                    redirectToLoginPath();
                }
            );
        }

				function getAccountsLanding(data, callback) {
					var url = 'mp.user.getUserProfile';
					var userId = data.userInfo.id;
					var params = {
						userId: userId
					};
					return $translator.translate(url, params, {}).then(
						function (response) {
                            if(response && response.data && response.data.personalInfo && response.data.personalInfo.language){
                                $workflowService.serveri18nLang(response.data.personalInfo.language);
                            } else {
                                $workflowService.serveri18nLang('en'); // default in case of old users with no language set manually
                            }
							data.userInfo = angular.merge(data.userInfo, response.data);
							getAccountsList(data, callback);
						},
						function () {
							localstore.setAuthData({}); // clear the local login info
							$translator.setAuthHeaders();
                            redirectToLoginPath();
						}
					);
				}

        function getLicenseType(data) {
            var licenseType = null;
            try {
                licenseType = data.licenses[0].type;
            }
            catch (e) {
                licenseType = null;
            }
            return licenseType;
        }

        function saveUserData(data) {
            var userDetailsToSave = {
                userId: data.userInfo.id,
                authObj: data.authorization,
                orgId: data.userInfo.orgId,
                licenseType: getLicenseType(data),
                koreUserInfo: data.userInfo,
                appControls: data
            };
            $applicationService.userInfo(userDetailsToSave);
            var jStorage = {
                currentAccount: data
            };
            localstore.setAuthData(jStorage);
            var _emailJson = {'email':data.userInfo.emailId};
            window.localStorage.setItem('emailIdStorage', JSON.stringify(_emailJson));
            if(selectedAccountId) {
                var accDetails = _.findWhere(localstore.getAuthData().currentAccount.associatedAccounts, {accountId: selectedAccountId});
                localstore.setSelectedAccount(accDetails);
            }

            var wfAdmin = JSONPath({json: jStorage, path: '$..wfAdmin'})[0];
            var licenseType = JSONPath({json: jStorage, path: '$..isEnterpriseExist'})[0];
            var isManaged  = JSONPath({json: jStorage, path: '$..isManage'})[0];
            var isFreeDomain = JSONPath({json: jStorage, path: '$..isFreeDomain'})[0];
            $rootScope.licenseType  = licenseType;
            $rootScope.isManaged    = isManaged;
            $rootScope.wfAdmin      = wfAdmin;
            $rootScope.koreUserInfo = data.userInfo;
            $rootScope.isFreeDomain = isFreeDomain;
        }

				function getAppControlList(currentAccount, optional,_params) {
					var url = 'mp.user.appControlList';
					var params = {
						userId: currentAccount.userInfo.id
					};
					$translator.translate(url, params).then(function(response){
						if (response && response.data) {
							var data = response.data;
							var keys = Object.keys(data);
							for (var i = 0; i < keys.length; i++) {
								var key = keys[i];
								if (!data.hasOwnProperty(key)) {
									continue;
								}
								currentAccount[key] = data[key];
							}
							// commented isFreeDomain check as part of eCommerce changes on 26th JAN 2018
							//if(currentAccount.isFreeDomain){
							//  $location.path(window.appConfig.CONTEXT_PATH + '/requestbtaccess').search('isFreeDomain', 'true');
							//}else{
							saveUserData(currentAccount);
                                                        if (!currentAccount.associatedAccounts.length) {
                                                            authenticateUser();
                                                            return false;
                                                        }
							currentAccount.associatedAccounts = _.filter(currentAccount.associatedAccounts, function (account) {
									return (account.isDeveloper||false);
							});
							if(optional && optional.botLanding === "direct"){
								authenticateUser();
							}
							else if(optional !== undefined){

                                var options = $workflowService.kgDataFromKora();
                                if(options && options.selectedAccount){
                                    authenticateUser();
                                    return false;
                               }

								if(currentAccount.associatedAccounts.length === 1){
									authenticateUser();
								}else if(_params && _params.origin === 'botStore'){
                                    authenticateUser();
                                }
								else{
									$rootScope.favoriteId = currentAccount.defaultAccountId||'';
									if($rootScope.favoriteId !== '' && optional !== "backToLanding"){
										var _accountSelected = _.find(currentAccount.associatedAccounts, function (account) {
												return ($rootScope.favoriteId === account.accountId);
										});
										if(_accountSelected) {
											authenticateUser();
										}
										else{
											window.location.href =  window.location.origin + window.appConfig.CONTEXT_PATH +'/login?form=accountsList';
											return false;
										}
									}
									else{
										//authenticateUsertoLand();
										window.location.href =  window.location.origin + window.appConfig.CONTEXT_PATH +'/login?form=accountsList';
										return false;
									}
								}
							}
							else if(optional === undefined){
								if(currentAccount.associatedAccounts.length === 1){
									authenticateUser();
								}
								else{
									$rootScope.favoriteId = currentAccount.defaultAccountId||'';
									if($rootScope.favoriteId !== '' || currentAccount.hasSelectedAccount){
										authenticateUser();
									}
									else{
										window.location.href =  window.location.origin + window.appConfig.CONTEXT_PATH +'/login?form=accountsList';
										return false;
									}
								}
							}

						}
					});
				}

				function getAccountsList(currentAccount, callback) {
					var url = 'mp.user.appControlList';
					$rootScope.showLoginLoader = true;
					var params = {
						userId: currentAccount.userInfo.id
					};
					$translator.translate(url, params).then(function(response){
						if (response && response.data) {
							var data = response.data;
							var keys = Object.keys(data);
							for (var i = 0; i < keys.length; i++) {
								var key = keys[i];
								if (!data.hasOwnProperty(key)) {
									continue;
								}
								currentAccount[key] = data[key];
							}
							saveUserData(currentAccount);
                                                         if (!currentAccount.associatedAccounts.length) {
                                                            authenticateUser();
                                                            return false;
                                                        }
							currentAccount.associatedAccounts = _.filter(currentAccount.associatedAccounts, function (account) {
									return (account.isDeveloper||false);
							});
							if(currentAccount.associatedAccounts.length === 1){
								//callback.success(true);
								authenticateUser();
							}
							else{
								$rootScope.favoriteId = currentAccount.defaultAccountId||'';
								if($rootScope.favoriteId !== ''){
									//callback.success(true);
									var _accountSelected = _.find(currentAccount.associatedAccounts, function (account) {
										return ($rootScope.favoriteId === account.accountId);
									});
									if(_accountSelected) {
										if(_accountSelected.hasOwnProperty('idp')){
											var dataobject = {};
											dataobject.username = currentAccount.userInfo.emailId;
                                            //dataobject.idp = dataobject.username+'_'+_accountSelected.idp;
                                            dataobject.idp = _accountSelected.idp;
											//localStorage.setItem("selectedAccount",JSON.stringify(_accountSelected));
											localStorage.setItem("selectedSSOAccount",JSON.stringify(_accountSelected));
											$location.search({form:"accountsList"});
											handleSSORedirect(dataobject, 'direct');
										}
										else{
											authenticateUser();
										}
									}
									else{
										callback.moreRequired('landing-page', currentAccount);
									}
								}
								else{
									callback.moreRequired('landing-page', currentAccount);
								}

							}

						}
					});
				}

        function getJSON(string) {
            var json;
            try {
                json = JSON.parse(string);
                return json;
            }
            catch (e) {
                return false;
            }
        }

        function resumeOldSession() {
            if (! localstore.getAuthData()) {
                redirectToLoginPath();
            }
            var jStorage = localstore.getAuthData();
            if (jStorage && jStorage.currentAccount) {
                var userData = jStorage.currentAccount;
                var authObj = userData.authorization;
                $translator.setAuthHeaders(authObj);
								if(!localstore.getSelectedAccount()){
										localStorage.removeItem("selectedSSOAccount");
										getUserProfile(userData, "backToLanding");
								}
								else{
										localStorage.removeItem("selectedSSOAccount");
										userData.hasSelectedAccount = true;
										getUserProfile(userData);
								}
            }
            else {
                redirectToLoginPath();
            }
        }

				function resetOAuth() {
						var jStorage = localstore.getAuthData();
						if (jStorage && jStorage.currentAccount) {
								var userData = jStorage.currentAccount;
								var authObj = userData.authorization;
								$translator.setAuthHeaders(authObj);
						}
				}

        // Sign up the user.
        function signUp(dataObject, callback) {

            // Using MD5 we could pass the password to the server.
            var url = 'mp.user.signup';
            var payload = {
                firstName: dataObject.firstName,
                lastName: dataObject.lastName,
                password: dataObject.pass
            };

            if(dataObject.accountName){
               payload.accountName=dataObject.accountName;
            }

            if (dataObject.phone) {
                payload.phoneNo = (dataObject.countryCode + dataObject.emailPhone).replace(/-/g, '');
            }
            else {
                payload.emailId = dataObject.emailPhone;
            }

            $translator.translate(url, {}, payload).then(
                function (response){
                    var userInfo = {
                        $email:dataObject.emailPhone, // mixpanel property
                        Email: dataObject.emailPhone,
                        FirstName: dataObject.firstName,
                        LastName: dataObject.lastName,
                        Level:'ONBOARDING AND ACTIVATION',
                        "Sign in Mode":"Email"
                    };
                    mixPanel.postEvent('Signup Submitted',userInfo);
                    if (dataObject.phone) {
                        callback.success('verify-phone');
                    }
                    else {
                        callback.success('verify-email');
                    }
                },
                function (response){
                    callback.failure(response);
                }
            );
        }

        // call resend verification api
        function resendVerification(payload, isForIdentity) {
            var url, params = {};
            if (!isForIdentity) {
                url = 'mp.user.resendVerification';
            }
            else {
                url = 'mp.user.resendIdentityVerification';
                params.userId = curUserDetails.id;
            }
            return $translator.translate(url, params, payload);
        }

        function handleAccountActivation(dataObject, callback) {

            var url = 'mp.user.verifyId';
            var params = {
                token: dataObject.token
            };
            var payload = {};
            if (dataObject.emailId) {
                payload.emailId = dataObject.emailId;
                params.emailId = dataObject.emailId;
            }
            else {
                payload.phoneNo = dataObject.phoneNo;
                params.phoneNo = encodeURIComponent(dataObject.phoneNo);
            }

            if (dataObject.userId) {
                params.userId = dataObject.userId;
            }

            if (dataObject.pass) {
                payload.password = dataObject.pass;
            }

            if (dataObject.firstName) {
                payload.firstName = dataObject.firstName;
            }

            if (dataObject.lastName) {
                payload.lastName = dataObject.lastName;
            }
            if (dataObject.accountName) {
                payload.accountName = dataObject.accountName;
            }

            $translator.translate(url, params, payload).then(
                function(res){
                    var _userInfo = {
                        $email: dataObject.emailId || dataObject.phoneNo,
                        FirstName: dataObject.firstName,
                        LastName: dataObject.lastName,
                        USER_ID:dataObject.userId,
                        NAME:dataObject.firstName + ' ' +dataObject.lastName,
                        AccountName:dataObject.accountName,
                        "Sign in Mode":"Email",
                        "Category":"Onboarding",
                        "Sub Category":"Signup",
                        "Level":'ONBOARDING AND ACTIVATION',
                    };
                    mixPanel.reset();
                    mixPanel.setUserInfo(_userInfo.$email,_userInfo);
                    mixPanel.postEvent('Signup by Email - Email Verification Started',_userInfo);
                    NotificationService.notify(i18n.i18nString('email_vrified'),'success');
                    callback.success();
                },
                function(res){
                    callback.failure(res);
                }
            );
        }

        function sendResetLink(dataObject, callback) {
            var url = 'mp.user.passwordReset';
            var payload = {
                isLoginPage: true // NOTE: Check this addition
            };
            if (dataObject.phone) {
                payload.phoneNo = (dataObject.countryCode + dataObject.emailPhone).replace(/-/g, '');
            }
            else {
                payload.emailId = dataObject.emailPhone;
            }
            $translator.translate(url, {}, payload).then(
                function(){
                    callback.success();
                },
                function(response){
                    callback.failure(response);
                }
            );
        }

        function passReset(dataObject, callback) {
            var url = 'mp.user.setNewPassword';
            var params = {
                token: dataObject.token
            };
            var payload = {
                password: dataObject.pass,
                newPassword: dataObject.passConfirm
            };
            $translator.translate(url, params, payload).then(
                function(){
                    callback.success('default');
                },
                function(response){
                    callback.failure(response);
                }
            );
        }
        // Is the current user authenticated?
        function isAuthenticated(status) {
            if(typeof status === 'boolean'){
                authenticated = status;
            }
            return authenticated;
        }
	}

})(angular);


;(function (ng) {
    'use strict';

    var _module = ng.module('app.helpers');


    _module.service('shortcutKeys', ['$rootScope', '$timeout', 'navigator','$workflowService',
        function ($rootScope, $timeout, navigator,$workflowService) {
            var storedKeyStroke, STORE_KEY_DURATION = 3000;
            var stream;

//            $(navigator).on('stateChanged',function(e,data){
//                
//            });
//            hotkeys('ctrl+o', function(event,handler) {
//               event.preventDefault();//openfile  
//                debugger;
//                var _state = navigator.setORGetPreviousState();
//                if (_state && _state.path) {
//                    if(_state.path[0]==="botDetailsForm"){
//                        //navigator.navigate({id:"dialogTasks"});
//                        // navigator.navigate({id:"nl"});
//                    }
//                }
//            });
//            hotkeys('alt+ctrl', function(event,handler) {
//            });
//            hotkeys('ctrl+t', function(event,handler) {
//
//            });

              this.updateStreamData = function(streamData){
                  if(streamData){
                      stream = streamData;
                  }else{
                    return stream;
                  }
              };

               function checkForModalInstance(){
                if($('body').hasClass('modal-open bt-modal-open')){
                    return true;
                }else{
                    return false;
                }
              }


            function bindEvents() {
                var thenMap = {}, timeoutObj;
                var  _state = {};

                    thenMap.gd = function (e) {
                        _state = navigator.setORGetPreviousState();
                       if(_state.path[0] === 'botDetailsForm'){
                             navigator.navigate({id:"botDashboard"});
                       } 
                   };
                   thenMap.gb  = function(e){
                        _state = navigator.setORGetPreviousState();
                       if(_state.path[0] === 'botDetailsForm'){
                             navigator.navigate({id:'dialogTasks'});
                       } 
                        
                   };
                   thenMap.gn = function(e){
                    _state = navigator.setORGetPreviousState();
                        if(_state.path[0] === 'botDetailsForm'){
                            navigator.navigate({id:'knowledgeCollection'});
                        }
                   };
                   thenMap.gx = function(e){
                    _state = navigator.setORGetPreviousState();
                        if(_state.path[0] === 'botDetailsForm'){
                            navigator.navigate({id:'alertTasks'});
                        }
                   };
                   thenMap.gi = function(e){
                        _state = navigator.setORGetPreviousState();
                        if(_state.path[0] === 'botDetailsForm'){
                            navigator.navigate({id:"informationTasks"});
                        }
                   };
                   thenMap.gl = function(e){
                     _state = navigator.setORGetPreviousState();
                     if(_state.path[0] === 'botDetailsForm'){
                            navigator.navigate({id:'actionTasks'});
                     }
                   };
                   thenMap.gf = function(e){
                     _state = navigator.setORGetPreviousState();
                     if(_state.path[0] === 'botDetailsForm'){
                        navigator.navigate({id:'flows'});
                     }
                   };
                   thenMap.gn = function(e){
                        _state = navigator.setORGetPreviousState();
                        if(_state.path[0] === 'botDetailsForm'){
                            navigator.navigate({id:'synonyms'});
                        }
                   };
                   thenMap.gp = function(e){
                        _state = navigator.setORGetPreviousState();
                        if(_state.path[0] === 'botDetailsForm'){
                            navigator.navigate({id:'patterns'});
                        }
                   };
                   thenMap.np = function(e){
                        _state = navigator.setORGetPreviousState();
                        if(_state.path[0] === 'botDetailsForm'){
                            navigator.navigate({id:'negativePatterns'});
                        }
                   };
                    thenMap.gt = function(e){
                        _state = navigator.setORGetPreviousState();
                        if(_state.path[0] === 'botDetailsForm'){
                            navigator.navigate({id:'mlThresholds'});
                        }
                   };
                   thenMap.ad = function(e){
                        _state = navigator.setORGetPreviousState();
                        if(_state.path[0] === 'botDetailsForm'){
                            navigator.navigate({id:'nlAdvancedSettings'});
                        }
                   };
                   thenMap.gm = function(e){
                        _state = navigator.setORGetPreviousState();
                       if(_state.path[0] === 'botDetailsForm'){
                             navigator.navigate({id:'metrics'});
                       } 
                        
                   };
                   thenMap.gp = function(e){
                     _state = navigator.setORGetPreviousState();
                       if(_state.path[0] === 'botDetailsForm'){
                             navigator.navigate({id:'publish'});
                       } 
                   };
                   thenMap.gu = function(e){
                         _state = navigator.setORGetPreviousState();
                         console.log(stream);
                       if(_state.path[0] === 'botDetailsForm' && stream.type!=='universalbot'){
                             navigator.navigate({id:'machineLearningUtterances'});
                       } 
                        
                   };
                   thenMap.gt = function(e){
                    _state = navigator.setORGetPreviousState();
                       if(_state.path[0] === 'botDetailsForm'){
                             navigator.navigate({id:'testTrain'});
                       } 
                     
                   };
                   thenMap.ge = function(e){
                     _state = navigator.setORGetPreviousState();
                     if(_state.path[0] === 'botDetailsForm'){
                        navigator.navigate({id:'batchTesting'});
                     }
                   };
                   thenMap.gs = function(e){
                        _state = navigator.setORGetPreviousState();
                       if(_state.path[0] === 'botDetailsForm'){
                             navigator.navigate({id:'botSummary'});
                       } 
                        
                   };
                   thenMap.ot = function(e){
                        _state = navigator.setORGetPreviousState();
                       if(_state.path[0] === 'botDetailsForm'){
                             $('.runBotBtn').click();
                       } 
                        
                   };
                   thenMap.og = function(e){
                        $rootScope.$emit('keyBoardShortCut',{shortCutFlag:true});

                   };
                   thenMap.od = function(e){
                       $('.btnDebug').click();
                   };
                   thenMap.oi = function(e){
                      _state = navigator.setORGetPreviousState();
                      if(_state.path[0] === 'botsForm'){
                        $('.inviteBtn').trigger('click');
                      }else if(_state.path[0] === 'botDetailsForm'){
                       navigator.navigate({id:'developerShare'}); 
                      }
                      
                   };
                   thenMap.on = function(e){
                    _state = navigator.setORGetPreviousState();
                    if(_state.path[0] === 'botsForm'){
                      $('.createNewBotBtnInHome').trigger('click');
                    }else if(_state.path[0] === 'botDetailsForm'){
                      $('#createNewBotSlide').trigger('click');
                    }
                   };
                   thenMap.om = function(e){
                       _state = navigator.setORGetPreviousState();
                       if(_state.path[0] === 'botDetailsForm'){
                             navigator.navigate({id:'botImportExport'});
                       } else if(_state.path[0] === 'botsForm'){
                           $('#importbot').trigger('click');
                       }
                      
                   };
                   thenMap.Slash = function(e){
                        _state = navigator.setORGetPreviousState();
                         if(_state.path[0] ===  'botDetailsForm'){
                             $('#searchForMenu').click();
                            setTimeout(function(){
                                $('.gSearchInput').focus();
                             },200);
                       }else if(_state.path[0] === 'botsForm'){
                          setTimeout(function(){
                            $('.fsynSearchInput').focus();
                          },200);
                            
                       }
                   };
     
                    thenMap.gh = function (e) {
                         _state = navigator.setORGetPreviousState();
                        if(_state.path[0] ===  'botDetailsForm'){
                             navigator.navigate({id:'botsForm'});
                        }
                        
                    };
                    thenMap.Escape = function(e){
                        $('#keyboardShortCuts .closeCross').click();
                    };
                    thenMap.oh = function(e){
                        _state = navigator.setORGetPreviousState();
                        if((_state.path[0] ===  'botsHome') || $('.gHelpLink').length){
                           $('.gHelpLink').click();
                        }
                        
                   };

                hotkeys('*', function (event, handler) {
                    var _funKey;
                    var modalInstance = checkForModalInstance();
                    if (storedKeyStroke && event.key) {
                        _funKey = storedKeyStroke + event.key;
                        if (thenMap[_funKey]) {
                            if(modalInstance){
                              return;
                            }
                            thenMap[_funKey].call(this);
                        }
                    }else if(event.keyCode === 191 || event.keyCode === 27){
                        _funKey = event.code;
                        if(thenMap[_funKey]){
                            if(modalInstance){
                              return;
                            }
                            thenMap[_funKey].call(this);
                        }
                    }
//                    if (event.key==='h' && storedKeyStroke === 'g') {
//                        console.log('g then h with '+STORE_KEY_DURATION+'ms duration')
//                    }
                    storedKeyStroke = event.key;
                    if (timeoutObj) {
                        $timeout.cancel(timeoutObj);
                    }
                    timeoutObj = $timeout(function () {
                        storedKeyStroke = undefined;
                    }, STORE_KEY_DURATION);
                });
                $(document).keydown(function(e) {
                      //console.log(e);
                     _state = navigator.setORGetPreviousState();
                     var streammid = '';
                     if (_state && _state.selectedStream && _state.selectedStream._id) {
                        streammid = _state.selectedStream._id;
                     }
                     
                    if(e.altKey && e.ctrlKey && e.keyCode === 187) {
                        $('.zoomCtrl-plus').click();
                    }else if(e.altKey && e.ctrlKey && e.keyCode === 189 ){
                        $('.zoomCtrl-minus').click();
                    }else if(e.altKey && e.ctrlKey && e.keyCode === 48){
                            $('.zoomCtrl-restore').click();
                     }else if(e.altKey && e.ctrlKey && e.keyCode === 77){
                            $('.minimize-btn').click();
                     }else if(e.altKey && e.ctrlKey && e.keyCode === 82){
                            $('.minimized-title').click();
                     }else if(e.altKey && e.ctrlKey && e.keyCode === 80 && streammid){
                        if($('#'+ streammid +'_published') && $('#'+ streammid +'_published').length && !$('#'+ streammid +'_published').hasClass('botDisabled')){
                            angular.element('#'+ streammid +'_published').click();
                        }
                     }else if(e.altKey && e.ctrlKey && e.keyCode === 68){
                        angular.element('#'+ streammid +'_in_development').click();
                     }
                });
            }
            function init() {
                bindEvents();
            }
            init();

        }]);

})(angular);



;/**
 * {
 *     context : {
 *         -----any property
 *         task : mandatory,
 *         user : mandatory,
 *         expiry mandatory
 *     },
 *     warning : {
 *         msg : '',
 *         actions : {
 *             success : func,
 *             failure : func
 *         },
 *         arguments : {
 *             success : [],
 *             failure : []
 *         },
 *         btnText : {
 *             success : ,
 *             failure :
 *         }
 *     },
 *     expiry : {
 *         msg : '',
 *         actions : {
 *             success : func,
 *             failure : func
 *         },
 *         arguments : {
 *             success : [],
 *             failure : []
 *         },
 *         btnText : {
 *             success : ,
 *             failure :
 *         }
 *     }
 * }
 */

(function(ng) {

    ng.module('app.helpers')

    .factory('TimerNotification',['$interval','NotificationService',function($interval,NotificationService){

        var timers   = [];
        var interval = 1000;

        function registerTimer(timer){
            timer._stages = {
                warning : false,
                expiry  : false
            };
            timers.push(timer);
            return timer;
        }


        function verifyTimers(){
            var invalidEntries = [];
            if(timers.length > 0){
                for(var i=0;i < timers.length ; ++i){
                    var currentTimer = timers[i];
                    var timerStatus  = validateTime(currentTimer).status;
                    if(timerStatus == 'warning' && !currentTimer._stages.warning){
                        showNotification(currentTimer,timerStatus);
                    }else if(timerStatus == 'expiry' && !currentTimer._stages.expiry){
                        showNotification(currentTimer,timerStatus);
                    }else if(timerStatus == 'invalid' || currentTimer._stages.expiry){
                        invalidEntries.push(i);
                    }
                }
            }
            removeInvalidTimers(invalidEntries);
        }

        function removeInvalidTimers(invalidEntries){
            invalidEntries.map(function(entry){
                timers.splice(entry,1);
            });
        }

        function showNotification(timer,type){

            var inputConfig = timer[type];

            var config = {
                callbacks : {
                    success :inputConfig.actions.success,
                    failure :inputConfig.actions.failure
                },
                arguments : {
                    success :inputConfig.arguments.success,
                    failure :inputConfig.arguments.failure
                },
                btnText : {
                    success :inputConfig.btnText.success,
                    failure :inputConfig.btnText.failure
                }
            };

            timer._stages.warning = type == 'warning';
            timer._stages.expiry  = type == 'expiry';

            NotificationService.timerAlert(inputConfig.msg,config,timer);

        }

        function validateTime(timer){
            var now    = new Date();
            var expiry = timer.context.expiry;

            if(expiry.getHours() < now.getHours()){
                return {
                    status : 'invalid'
                };
            }else{
                return {
                    status : 'active'
                };
            }

            if((expiry.getMinutes()-now.getMinutes()) <= 3 && (expiry.getMinutes()-now.getMinutes()) > 0){
                return {
                    status : 'warning'
                };
            }else if((expiry.getMinutes()-now.getMinutes()) <= 0){
                return {
                    status : 'expiry'
                };
            }else{
                return {
                    status : 'active'
                };
            }

        }

        function removeTimer(timerId){
            var timer,index = -1;
            if(timers.length > 0){
                for(var i=0;i < timers.length ; ++i){
                    timer = timers[i];
                    if(timer.context.task == timerId){
                        index = i;
                        break;
                    }
                }
                console.log('stale timer removed');
                timers.splice(index,1);
            }
        }

        $interval(verifyTimers,interval);

        return{
            registerTimer : registerTimer,
            removeTimer   : removeTimer
        };

    }]);


})(angular);

;(function(ng) {

    'use strict';

    var _module = ng.module('app.helpers');

    _module.factory('$translator', ['$http', '$endpoints', '$util', '$applicationService','NotificationService','i18n', function($http, $endpoints, $util, $applicationService,NotificationService,i18n) {

            var _regExToParamName = /\:([a-zA-Z]+)/g;

            var HTTP_VERB_GET = 'get',
                HTTP_VERB_POST = 'post',
                HTTP_VERB_PUT = 'put',
                HTTP_VERB_DELETE = 'delete';

            var DEFAULT_HEADERS = {
                'Content-Type': 'application/json;charset=UTF-8'
            };

            var UPLOAD_HEADERS = {
                'Content-Type': undefined//'multipart/form-data'
            };

            var _authObj = null;

            function resolveUrl(toResolveUrl, values, deleteProp, _moreParams) {
                var url = toResolveUrl.replace(_regExToParamName, function(matchStr, valName) {
                    var r = values[valName];
                    if (typeof r === 'string' || typeof r === 'number') {
                        return r;
                    }
                    return typeof r === 'string' || typeof r === 'number' ? r : matchStr;
                });

                // Handle additional parameters
                var valueKeys = Object.keys(values);
                ng.forEach(_moreParams, function(query) {
                    if(valueKeys.indexOf(query) > -1 && typeof values[query] !== 'undefined' && values[query] !== null) {
                        url += url.indexOf('?') > -1 ? '&' : '?';
                        url += query+'='+values[query];
                    }
                });
                url = url.replace(/\n/g, '%0A');
                return url;
            }

            function genRandQuery() {
                return 'rnd=' + Math.random().toString(36).substr(7);
            }

            var _translator = {};

            _translator.setAuthHeaders = function(authObj) { // authObj = {token_type: 'bearer', accessToken: 2834843186748 ........}
                var _authToken = "";
                if (authObj) {
                    _authObj = authObj;
                    _authToken = authObj.token_type + " " + authObj.accessToken;
                    DEFAULT_HEADERS.Authorization = _authToken;
                    UPLOAD_HEADERS.Authorization = _authToken;
                } else {
                    delete DEFAULT_HEADERS.Authorization;
                }
            };

            _translator.getAuthObj = function() {
                return _authObj;
            };
            /*
             * noLangKoreHeader=true 
             * in params will skip bot-langauge header for the request which is handled in interceptors
             */
            _translator.translate = function(url, params, payload,moreParams) {
                var _reqObject = {},
                    _url,
                    _moreParams,
                    _verb,
                    _headers = $util.clone(DEFAULT_HEADERS),
                    _userid = $applicationService.userInfo().userId,
                    _orgId  = $applicationService.userInfo().orgId;
                    
                if(moreParams && moreParams._headers){
                  angular.extend(_headers,moreParams._headers);  
                }    
                params = params || {};

                if ($endpoints.serviceList && typeof $endpoints.serviceList === "object") {
                    _verb = $endpoints.serviceList[url].method;
                    _url = $endpoints.serviceList[url].endpoint;
                    _moreParams = moreParams || $endpoints.serviceList[url].moreParams || [];
                    params.userId = params.userId || _userid;
                    params.orgId  = _orgId;
                    _url = resolveUrl(_url, params, true, _moreParams); 
                } else {
                    //throw new Error("Unable to find Endpoint or method");
                    alert(i18n.i18nString('unable'));
                }

                if (url === "bt.uploadFile.post" || url === "bt.post.uploadfaqfile"|| url==='bt.post.uploadbotfuncfile'){
                    UPLOAD_HEADERS.Authorization = DEFAULT_HEADERS.Authorization;
                    _headers = $util.clone(UPLOAD_HEADERS);
                    _reqObject.transformRequest = angular.identity;
                }
                // if(url === "bt.export") {
                //     _reqObject.responseType = "arraybuffer";
                // }

                _url += _url.indexOf('?') > -1 ? '&' : '?';
                _url += genRandQuery();

                if (_verb === HTTP_VERB_DELETE || _verb === HTTP_VERB_PUT) {
                    _headers['X-HTTP-Method-Override'] = _verb;
                    _verb = HTTP_VERB_POST;
                }
                _reqObject.method = _verb;
                _reqObject.url = _url;
                _reqObject.headers = _headers || {};
                _reqObject.data = payload || {};
                if (!navigator.onLine) {
                    $("#noty_center_layout_container").empty();
                    NotificationService.notify(i18n.i18nString('check_internet'), "error");
                }
                if (params.noLangKoreHeader) {
                    _reqObject.noLangKoreHeader = true;
                }
                _reqObject.k_uri=url;
                return $http(_reqObject);
            };
              
            return _translator;

        }]);

})(angular);


;(function(ng) {

	'use strict';

	var _module = ng.module('app.helpers');

	_module.factory('$util', function($rootScope) {

        var unescapeMap = {
            '&#x27;': "'",
            '&#x60;': "`",
            '&amp;': "&",
            '&gt;': ">",
            '&lt;': "<",
            '&quot;': '"'
        };

		var objectToQString = function(obj) {
			return Object.keys(obj).reduce(function(a, k) {
				if(typeof obj[k] === 'object') {
					a.push(objectToQString(obj[k]));
				} else {
                	a.push(k+'='+encodeURIComponent(obj[k]));
                }
                return a;
            }, []).filter(function(item) { return item.length; }).join('&');
		};

		var isArray = function(obj) {
			return obj.constructor.toString().indexOf('Array') > -1;
		};

		var isEmail = function(email) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		};

		var clone = function(obj) {
            if (null === obj || "object" !== typeof obj) {
                 return obj;
                }
            var copy = obj.constructor();
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = obj[attr];
                }
            }
            return copy;
        };

        var processObject = function(jsonObj) {
            if (typeof jsonObj === 'object') {
                var keys = [];
                for (var key in jsonObj) {
                    if (jsonObj.hasOwnProperty(key)) {
                        keys.push(key);
                    }
                }
                return keys;
            }
        };

        var processJSON = function(sampleResponse, alertsPath) {
            sampleResponse = JSON.parse(sampleResponse);
            var isObject = typeof sampleResponse === "object";
            var isArray = Object.prototype.toString.call(sampleResponse) === '[object Array]';
            if (isObject && !isArray) {
                if(alertsPath) {
                    if (sampleResponse.hasOwnProperty(alertsPath)) {
                        var _resolvedAlertsPathObj = sampleResponse[alertsPath];
                        return processObject(_resolvedAlertsPathObj);
                    }
                } else {
                    return processObject(sampleResponse);
                }
            }
            else if (isObject && isArray) {
                return processJSON(sampleResponse[0], alertsPath);
            }
            else {
                return null;
            }
        };

        var processJSONForField = function(json, field) {
            var sampleResponse;
            try {
                sampleResponse = JSON.parse(json);
                return processJSON(sampleResponse, field);
            }
            catch (e) {
                return null;
            }
        };

        var createEscaper = function(map) {
            var escaper = function(match) {
              return map[match];
            };
            var source = '(?:' + Object.keys(map).join('|') + ')';
            var testRegexp = RegExp(source);
            var replaceRegexp = RegExp(source, 'g');
            return function(string) {
                string = string === null ? '' : '' + string;
                return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
            };
        };

        function swap(ele,from,to){
            var tmp;

            if(ele instanceof Array && ele[0] instanceof Array){

                ele.map(function(value){

                    tmp = value[from];
                    value[from] = value[to];
                    value[to] = tmp;

                    return value;

                });

            }else{

                tmp = ele[from];
                ele[from] = ele[to];
                ele[to] = tmp;

            }

        }

        function keyCount(json){

            try{
                return Object.keys(json).length;
            }catch(ex){
                return 0;
            }

        }

        function jsonParse(string){

            if(typeof string === 'object'){
                return string;
            }

            try {
                return JSON.parse(string);
            } catch (ex) {
                return ({});
            }

        }

        function collectOperations(description){

            var operations = [];
            var service;
            var port   ;
            var operation;

            for(var i=0;i<description.services.length;i++){

                service = description.services[i];

                for(var j=0;j<service.ports.length;j++){

                    port = service.ports[j];

                    for(var k=0;k<port.operations.length;k++){

                        operation = port.operations[k];
                        operation.port_name    = port.name;
                        operation.service_name = service.name;

                        operations.push(_.clone(operation));

                    }

                }

            }

            return operations;

        }
        function isIE11OrEarlier() {
            var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
            var msie = ua.indexOf('MSIE '); // IE 10 or older
            var trident = ua.indexOf('Trident/'); //IE 11
            return (msie > 0 || trident > 0);
        }

        function showUnSupportedBrowserWarningForDialog(){
            
            var message = '<p><i class="fa fa-exclamation-circle fa-2x" aria-hidden="true" style="color: #009dac;"></i></p>The new Dialog Builder is not supported on Internet Explorer 11 or older versions <a target="_blank" href="'+$rootScope.helpLinks.RAND_27+'">Know more</a>';
            window.bootbox.dialog({
                message: message,
                title: "",
                className: "alert-modal",
                buttons: {
                    yes: {
                        label: "OK",
                        className: "btn_md",
                        callback: function () {
      
                        }
                    }
                },
                onEscape: false,
                closeButton: false
            });

        }
        
    

        var unescape = createEscaper(unescapeMap);

		return {
			objectToQString: objectToQString,
			isArray: isArray,
			isEmail: isEmail,
			clone: clone,
            swap:swap,
			processJSONForField: processJSONForField,
            unescape: unescape,
            keyCount:keyCount,
            jsonParse:jsonParse,
            collectSoapOperations:collectOperations,
            isIE11OrEarlier:isIE11OrEarlier,
            showUnSupportedBrowserWarningForDialog:showUnSupportedBrowserWarningForDialog
		};

	});
        
        
    (function (factory) {
        if (typeof define === 'function' && define.amd) { // AMD
            define(factory);
        } else if (typeof module !== 'undefined') {      // CommonJS
            module.exports = factory();
        } else {                                         // browser globals
            window.pointInEllipse = factory();
        }
    })(function () {

        /**
         * Determines if the point lies inside or outside of ellipse
         * @param  {Array.<Number>} point
         * @param  {Array.<Number>} c  ellipse center
         * @param  {Number}         rx X radius
         * @param  {Number}         ry Y radius
         * @param  {Number}         rotation Radians
         * @return {Boolean}
         */
        function pointInEllipse(point, c, rx, ry, rotation) {
            rotation = rotation || 0;
            var cos = Math.cos(rotation),
                    sin = Math.sin(rotation);
            var dx = (point[0] - c[0]),
                    dy = (point[1] - c[1]);
            var tdx = cos * dx + sin * dy,
                    tdy = sin * dx - cos * dy;

            return (tdx * tdx) / (rx * rx) + (tdy * tdy) / (ry * ry) <= 1;
        }

        return pointInEllipse;
    });
        
        (function () {
            
            if (!String.prototype.startsWith) {
                Object.defineProperty(String.prototype, 'startsWith', {
                    value: function(search, rawPos) {
                        /*jslint bitwise: true */
                        var pos = rawPos > 0 ? rawPos|0 : 0;
                        return this.substring(pos, pos + search.length) === search;
                    }
                });
            }
            if (!String.prototype.replaceAll) {
                String.prototype.replaceAll = function (search, replacement) {
                    var target = this;
                    return target.replace(new RegExp(search, 'g'), replacement);
                };
            }
            String.prototype.endsWith = function (suffix) {
                return this.indexOf(suffix, this.length - suffix.length) !== -1;
            };
            if (!String.prototype.includes) {
                String.prototype.includes = function (search, start) {
                    if (typeof start !== 'number') {
                        start = 0;
                    }

                    if (start + search.length > this.length) {
                        return false;
                    } else {
                        return this.indexOf(search, start) !== -1;
                    }
                };
            }

            //Object.prototype.values polyfill
            /*jshint ignore:start*/
            if (!Object.values) {
                Object.values = function (b) { var c = [], d; for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]); return c };
            }
            /*jshint ignore:end*/

            //Array.prototype.includes polyfill
            /*jslint bitwise: true */
            if (!Array.prototype.includes) {
                Object.defineProperty(Array.prototype, 'includes', {
                  value: function(searchElement, fromIndex) {
              
                    if (this === null) {
                      throw new TypeError('"this" is null or not defined');
                    }
              
                    // 1. Let O be ? ToObject(this value).
                    var o = Object(this);
              
                    // 2. Let len be ? ToLength(? Get(O, "length")).
                    var len = o.length >>> 0;
              
                    // 3. If len is 0, return false.
                    if (len === 0) {
                      return false;
                    }
              
                    // 4. Let n be ? ToInteger(fromIndex).
                    //    (If fromIndex is undefined, this step produces the value 0.)
                    var n = fromIndex || 0;
              
                    // 5. If n ≥ 0, then
                    //  a. Let k be n.
                    // 6. Else n < 0,
                    //  a. Let k be len + n.
                    //  b. If k < 0, let k be 0.
                    var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
              
                    function sameValueZero(x, y) {
                      return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
                    }
              
                    // 7. Repeat, while k < len
                    while (k < len) {
                      // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                      // b. If SameValueZero(searchElement, elementK) is true, return true.
                      if (sameValueZero(o[k], searchElement)) {
                        return true;
                      }
                      // c. Increase k by 1.
                      k++;
                    }
              
                    // 8. Return false
                    return false;
                  }
                });
              }
            if (typeof Object.assign != 'function') {
            Object.assign = function(target) {
                if (target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
                }
            
                target = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== null) {
                    for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                    }
                }
                }
                return target;
            };
            }
        })();

})(angular);

;(function (ng) {
    'use strict';
    var _module = ng.module('version.manager', []);

    _module.service('versionMonitor', ['$http', '$rootScope', 'env_conf', '$interval','$translator','appVersionService','interactiveHelp', function ($http, $rootScope, env_conf, $interval,$translator,appVersionService,interactiveHelp) {
            var _self = this;
            _self.getAppVersion = function (res) {
                return env_conf['app-version'];
            };
            _self.setAppVersionData = function (res) {
                if (res.data && res.data.length) {
                    env_conf['app-version'] = res.data[0].APP_VERSION;
                }
            };
            _self.startChecking = function (period) {
                _self.interval = $interval(function () {
                    _self.checkVersion();
                }, period || 10000);
            };
            _self.stopChecking = function () {
                $interval.cancel(_self.interval);
            };

            _self.checkVersion = function () {
                $translator.translate('bt.check.versionInfo')
                .then(function successCallback(res) {
                   // var _resString=res.data;
                    if (res.data && res.data.length) {
                        //var _resArr = _resString.split(',');
                        //res.data = {};
                        // res.data.APP_VERSION = res.data[0];
                        //  res.data.RECHECK_FREQ = _resArr[1];
                        // res.data.MANDATORY_UPDATE = (_resArr[2]==='true')?true:false;
                        //  res.data.DONT_NOTIFY  = (_resArr[3]==='true')?true:false;
                        var _clientVersion;
                        if(!env_conf['app-version']){
                            env_conf['app-version'] = res.data[0].APP_VERSION;
                            _clientVersion = env_conf['app-version'];
                        }else{
                            _clientVersion = env_conf['app-version'];
                        }
                        appVersionService.setVersionOnLoad();
                        interactiveHelp.takTourVersion();
                        if (!res.data[0].DONT_NOTIFY && res.data[0].APP_VERSION && _clientVersion && (_clientVersion !== res.data[0].APP_VERSION)) {
                            _self.showUpdateAlert(_clientVersion, res.data[0]);
                        }
                       
                    }
                     _self.stopChecking();
                    _self.startChecking(res.data.length?res.data[0]['RECHECK_FREQ']:10000);

                },function(err){
                    _self.stopChecking();
                    _self.startChecking();
                });
            };

            _self.showUpdateAlert = function (clientVer, data) {
                if (!$('.bootbox').is(':visible')) {
                    window.bootbox.dialog({
                        message: i18n.i18nString('new_version_app') + '<br/><br/><span style="font-size: 12px;color: #a8a8a8;">Current Version:' + clientVer + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Version:' + data.APP_VERSION + '</span>',
                        title: i18n.i18nString('new_version_available'),
                        className: "alert-modal kore-bt-app-upgrade",
                        closeButton: data.MANDATORY_UPDATE,
                        buttons: {
                            success: {
                                label: i18n.i18nString('remind_later'),
                                className: "btn-primary" + (data.MANDATORY_UPDATE ? " hide" : ""),
                                callback: function () {
                                }
                            },
                            main: {
                                label: i18n.i18nString('reload_label'),
                                className: "btn-primary",
                                callback: function () {
                                    window.location.reload(true);
                                }
                            }
                        }
                    });

                }

            };

        }]);


})(angular);