'use strict';

angular
  .module('hgAdminApp')
  .controller('adminHousePassportCtrl',['$scope', '$stateParams', 'Houses', function ($scope, $stateParams, Houses) {

    var getHousePassport = function () {
      $scope.house = Houses.get({id: $stateParams.id});
    }

    getHousePassport();

  }])