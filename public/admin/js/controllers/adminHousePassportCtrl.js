'use strict';

angular
  .module('hgAdminApp')
  .controller('adminHousePassportCtrl',['$scope', '$stateParams', '$state', 'Houses', function ($scope, $stateParams, $state, Houses) {

    $scope.isEdit = false;

    $scope.getHousePassport = function () {
      $scope.house = Houses.get({id: $stateParams.id});
    }

    $scope.postHousePassport = function () {
      $scope.house.$save({id: $stateParams.id}, function () {
        $scope.isEdit = false;
        $scope.getHousePassport();    
      });
    }

    $scope.getHousePassport();

  }])