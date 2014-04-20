'use strict';

angular
  .module('hgAdminApp')
  .controller('adminHousesCtrl',['$scope', 'Houses', function ($scope, Houses) {

    $scope.houses = Houses.query();

  }])