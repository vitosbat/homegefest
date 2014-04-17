'use strict';

angular
  .module('hgAdminApp')
  .controller('adminUserProfileCtrl',['$scope', '$stateParams', 'Users',  function ($scope, $stateParams, Users) {

    $scope.profile = Users.get({id: $stateParams.id});
    $scope.test = "OK";

  }])