'use strict';

angular
  .module('hgAdminApp', ['ui.router', 'ngResource'])
  
  .config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/users');
      $stateProvider
        .state('users', {
          url: '/users',
          templateUrl: 'admin/partials/users.html',
          controller: 'adminUsersCtrl'
        })
        .state('userProfile', {
          url: '/users/:id',
          templateUrl: 'admin/partials/userProfile.html',
          controller: 'adminUserProfileCtrl'
        })
        .state('userAddHouses', {
          url: '/users/:id/addHouses',
          templateUrl: 'admin/partials/userAddHouses.html',
          controller: 'adminUserProfileCtrl'
        })
        .state('houses', {
          url: '/houses',
          templateUrl: 'admin/partials/houses.html',
          controller: 'adminHousesCtrl'
        })
        .state('createHouse', {
          url: '/createHouse',
          templateUrl: 'admin/partials/createHouse.html',
          controller: 'adminCreateHouseCtrl'
        })
        .state('housePassport', {
          url: '/houses/:id',
          templateUrl: 'admin/partials/housePassport.html',
          controller: 'adminHousePassportCtrl'
        })

    }]);
