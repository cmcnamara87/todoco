(function () {

    'use strict';
    angular
        .module('starter')
        .controller('ActivitiesShowController', ActivitiesShowController);

    /* @ngInject */
    function ActivitiesShowController($http,
                                      $stateParams, ENV) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'ActivitiesShow';
        vm.openActivity = openActivity;

        activate();

        ////////////////

        function activate() {
            $http.get(ENV.baseApiUrl + 'activities/' + $stateParams.activityId).then(function (response) {
                vm.activity = response.data;
            });
        }

        function openActivity(activity) {
            cordova.InAppBrowser.open('http://to-do.co/activities/' + activity.slug, '_blank', 'location=yes');
        }
    }

})();
