(function(ng){

    var _nobotsForm = ng.module("bt-forms");

    _nobotsForm.directive("botsBilling", function(){
        return {
            restrict: "EA",
            templateUrl: window.appConfig.TMPLT_PRE_PATH + "js/lazycomponents/bots-billing/bots-billing.html",
            controller: "botsBillingCtrl"
        };
    });

    _nobotsForm.controller("botsBillingCtrl", ["$scope", function($scope){
       
    }]);
           

})(angular);