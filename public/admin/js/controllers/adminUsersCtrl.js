'use strict';

angular
  .module('hgAdminApp')
  .controller('adminUsersCtrl',['$scope', '$http', function ($scope, $http) {

    $scope.getUsers = function () {
      $http.get('/users').success(function (users) {
        $scope.users = users;
      });
    };

    $scope.getUsers();

  }])