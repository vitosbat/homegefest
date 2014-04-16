'use strict';

angular
  .module('hgAdminApp')
  .controller('adminUserProfileCtrl',['$scope', '$stateParams',  function ($scope, $stateParams) {

    $scope.profile = $state.params;
    $scope.test = "OK";

  }])