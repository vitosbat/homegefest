'use strict';

angular
  .module('hgAdminApp')
  .controller('adminCreateHouseCtrl',['$scope', '$location', 'Houses', function ($scope, $location, Houses) {

    $scope.country = "Россия";
    

    $scope.createHouse = function () {
      
      var houseData = {
        country: $scope.country,
        city: $scope.city,
        street: $scope.street,
        num_house: $scope.num_house
      };
      
      Houses.save(houseData, function () {
        $location.path('/houses');        
      });
    }
  }])