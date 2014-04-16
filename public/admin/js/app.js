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
        .state('users.userId', {
          url: '/user/:id',
          templateUrl: 'admin/partials/userProfile.html',
          controller: 'adminUserProfileCtrl'
        })
    }]);
