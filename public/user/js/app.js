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
        .state('userEvents', {
          url: '/events',
          templateUrl: 'user/partials/userEvents.html',
          controller: 'userEventsCtrl'
        })
        .state('userArchive', {
          url: '/archive',
          templateUrl: 'user/partials/userArchive.html'
        })
        .state('userCreateEvent', {
          url: '/create_event',
          templateUrl: 'user/partials/userCreateEvent.html'
        })
        .state('userHouses', {
          url: '/houses',
          templateUrl: 'user/partials/userHouses.html',
          controller: 'userHousesCtrl'
        })
        // .state('housePassport', {
        //   url: '/housePassport',
        //   templateUrl: 'user/partials/housePassport.html',
        //   controller: 'housePassportCtrl'
        // })
        .state('userProfile', {
          url: '/profile',
          templateUrl: 'user/partials/userProfile.html',
          controller: 'userProfileCtrl'
        })
        .state('userUpdateProfile', {
          url: '/update_profile',
          templateUrl: 'user/partials/userUpdateProfile.html',
          controller: 'userProfileCtrl'
        })
    }]);
