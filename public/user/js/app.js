'use strict';

angular
  .module('hgUserApp', ['ui.router', 'ngResource'])
  .run(['$rootScope', "$http", function($rootScope, $http){
    $http.get('/user/profile').success(function (profile) {
        $rootScope.username = profile.name;
      });
  }])
  .config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/events');
      $stateProvider
        .state('user_events', {
          url: '/events',
          templateUrl: 'user/partials/user_events.html',
          controller: 'userEventsCtrl'
        })
        .state('user_archive', {
          url: '/archive',
          templateUrl: 'user/partials/user_archive.html'
        })
        .state('create_event', {
          url: '/create_event',
          templateUrl: 'user/partials/create_event.html'
        })
        .state('user_houses', {
          url: '/houses',
          templateUrl: 'user/partials/user_houses.html',
          controller: 'userHousesCtrl'
        })
        .state('housePassport', {
          url: '/housePassport',
          templateUrl: 'user/partials/housePassport.html',
          controller: 'housePassportCtrl'
        })
        .state('user_profile', {
          url: '/profile',
          templateUrl: 'user/partials/user_profile.html',
          controller: 'userProfileCtrl'
        })
        .state('user_update_profile', {
          url: '/update_profile',
          templateUrl: 'user/partials/user_update_profile.html',
          controller: 'userProfileCtrl'
        })
    }]);
