(function () {

    'use strict';
    angular
        .module('starter')
        .controller('DashController', DashController);

    /* @ngInject */
    function DashController($scope, $http, ENV, $ionicModal, $state) {
        /* jshint validthis: true */

        var vm = this;
        var page = 0;
        vm.showActivityInfo = showActivityInfo;
        vm.cardDestroyed = cardDestroyed;
        vm.cardSwipedLeft = cardSwipedLeft;
        vm.cardSwipedRight = cardSwipedRight;
        vm.loadMoreCards = loadMoreCards;

        activate();

        function activate() {
            vm.isLoading = true;
            vm.cards = {
                // Master - cards that haven't been discarded
                master: [],
                // Active - cards displayed on screen
                active: [],
                // Discards - cards that have been discarded
                discards: [],
                // Liked - cards that have been liked
                liked: [],
                // Disliked - cards that have disliked
                disliked: []
            };

            if (!window.localStorage.userId) {
                // there is no user id
                // register a user
                register().then(function () {
                    getActivities(page++);
                })
            } else {
                getActivities(page++);
            }
        }

        /**
         * Create a new user
         * @returns {*}
         */
        function register() {
            return $http.post(ENV.baseApiUrl + 'users').then(function(response) {
                var user = response.data;
                window.localStorage.userId = user.id;
            });
        }

        function getActivities(page) {
            return $http.get(ENV.baseApiUrl + 'users/' + window.localStorage.userId +
            '/activities?page=' + page).then(function (response) {
                var cards = response.data.data;
                vm.cards.active = cards.concat(vm.cards.active);
                vm.isLoading = false;
            });
        }

        /**
         * Show the info for the card
         */
        function showActivityInfo(index) {
            var card = vm.cards.active[index];
            $state.go('tab.dash-detail', {activityId: card.id });
        }

        // Removes a card from cards.active
        function cardDestroyed (index) {
            console.log('card destroyed');
            vm.cards.active.splice(index, 1);
        }

        // On swipe left
        function cardSwipedLeft(index) {
            var card = vm.cards.active[index];
            console.log('card left');
            vm.cards.disliked.push(card);
            return addDecision(card.id, 0).then(askForEmail).then(loadMoreCards);
        }

        // On swipe right
        function cardSwipedRight(index) {
            console.log('card right');
            var card = vm.cards.active[index];
            vm.cards.liked.push(card);
            // ask for email
            return addDecision(card.id, 1).then(askForEmail).then(loadMoreCards);
        }

        function addDecision(activityId, decision) {
            return $http.post(ENV.baseApiUrl + 'users/' + window.localStorage.userId + '/decisions', {
                'activity_id': activityId,
                'decision': decision // like
            });
        }

        function loadMoreCards() {
            if(vm.cards.active.length != 0) {
                return;
            }
            vm.isLoading = true;
            return getActivities(0);
        }

        // Adds a card to cards.active
        $scope.addCard = function () {
            var newCard = cardTypes[0];
            vm.cards.active.push(angular.extend({}, newCard));
        };


        function askForEmail() {
            if (window.localStorage.email) {
                return;
            }
            var done = vm.cards.liked.length + vm.cards.disliked.length;
            if (done !== 0 && done % 5 == 0) {
                $ionicModal.fromTemplateUrl('templates/register.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.registerModal = modal;
                    $scope.registerModal.show();
                    $scope.register = function (credentials) {
                        window.localStorage.email = credentials.email;
                        return $http.post(ENV.baseApiUrl + 'users/' + window.localStorage.userId +
                        '/email', credentials).then(function () {
                            $scope.registerModal.hide();
                        });
                    }
                });
            }
        }

        $scope.$on('$destroy', function () {
            $scope.registerModal.remove();
        });
    }

})();
