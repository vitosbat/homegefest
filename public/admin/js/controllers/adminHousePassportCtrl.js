'use strict';

angular
  .module('hgAdminApp')
  .controller('adminHousePassportCtrl',['$scope', '$stateParams', '$location','Houses', function ($scope, $stateParams, $location, Houses) {
    $scope.isEdit = false;

    var getHousePassport = function () {
      $scope.house = Houses.get({id: $stateParams.id});
    }

    var postHousePassport = function () {
      Houses.save($scope.house, function () {
        $location.path('/houses/:id');
      });
    }

    getHousePassport();

  }])