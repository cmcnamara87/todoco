// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
        'starter.controllers',
        'starter.services',
        'ionic.contrib.ui.tinderCards']
)
    .constant('ENV', {baseApiUrl: 'http://to-do.co/api/'})
    .run(function ($ionicPlatform,
                   $rootScope,
                   $ionicModal,
                   $http) {

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            //
            // check if logged in
            //if (window.localStorage.email) {
                // set up the basic auth default
            //}
            //    $ionicModal.fromTemplateUrl('templates/register.html', {
            //        scope: $rootScope,
            //        animation: 'slide-in-up'
            //    }).then(function (modal) {
            //        $rootScope.registerModal = modal;
            //        $rootScope.registerModal.show();
            //        $rootScope.register = function (credentials) {
            //            window.localStorage.email = credentials.email;
            //            return $http.post('http://localhost:8888/api/credentials', credentials).then(function () {
            //                $rootScope.registerModal.hide();
            //            });
            //        }
            //    });
                //$scope.openModal = function() {
                //    $scope.modal.show();
                //};
                //$scope.closeModal = function() {
                //    $scope.modal.hide();
                //};
                //// Cleanup the modal when we're done with it!
                //$scope.$on('$destroy', function() {
                //    $scope.modal.remove();
                //});
                //// Execute action on hide modal
                //$scope.$on('modal.hidden', function() {
                //    // Execute action
                //});
                //// Execute action on remove modal
                //$scope.$on('modal.removed', function() {
                //    // Execute action
                //});
            //}
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.tabs.position('bottom'); // other values: top


        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                cache: false,
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashController as vm'
                    }
                }
            })
            .state('tab.dash-detail', {
                url: '/dash/:activityId',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/activity-detail.html',
                        controller: 'ActivitiesShowController as vm'
                    }
                }
            })
            .state('tab.calendar', {
                url: '/calendar',
                views: {
                    'tab-calendar': {
                        templateUrl: 'templates/tab-calendar.html',
                        controller: 'CalendarController as vm'
                    }
                }
            })
            .state('tab.calendar-detail', {
                url: '/calendar/:activityId',
                views: {
                    'tab-calendar': {
                        templateUrl: 'templates/activity-detail.html',
                        controller: 'ActivitiesShowController as vm'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    });
