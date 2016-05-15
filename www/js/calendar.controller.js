(function () {

    'use strict';
    angular
        .module('starter')
        .controller('CalendarController', CalendarController);

    /* @ngInject */
    function CalendarController($http, $scope, ENV) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Calendar';
        vm.markActivityAsDone = markActivityAsDone;

        $scope.$on("$ionicView.enter", activate);

        ////////////////

        function activate() {
            vm.isLoading = true;
            return $http.get(ENV.baseApiUrl + 'users/' + window.localStorage.userId + '/calendar')
                .then(function (response) {
                    vm.isLoading = false;
                    vm.calendar = response.data;
            });
        }

        function markActivityAsDone(activity, activities) {
            var index = activities.indexOf(activity);
            activities.splice(index, 1);

            return $http.put(ENV.baseApiUrl + 'users/' + window.localStorage.userId + '/activities/' + activity.id + '/done');
        }
    }

})();
