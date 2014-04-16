'use strict';

angular
  .module('hgAdminApp')
  .controller('adminUsersCtrl',['$scope', 'Users', function ($scope, Users) {

    $scope.users = Users.query();

  }])