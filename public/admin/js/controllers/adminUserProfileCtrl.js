'use strict';

angular
  .module('hgAdminApp')
  .controller('adminUserProfileCtrl',['$scope', '$stateParams',  function ($scope, $stateParams) {

    $scope.getUserHouses = function () {
      console.log($stateParams);
      // $scope.userHouses = $stateParams.user.houses;
    };
    
    $scope.getUserHouses();

  }])