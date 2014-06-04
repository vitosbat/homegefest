'use strict';

angular
  .module('hgAdminApp')
  .controller('adminUserProfileCtrl',['$scope', '$stateParams', 'Users', 'Houses', function ($scope, $stateParams, Users, Houses) {

    $scope.getUserProfile = function () {
      $scope.profile = Users.get({id: $stateParams.id}, function() {
        $scope.houses = Houses.query(function () {
          $scope.filteredHousesArray = $scope.filteredHouses();
        });
      });
    }

    $scope.addUserHouse = function (house) {
      var newHouse = {
        _id: house._id,
        city: house.city,
        street: house.street,
        num_house: house.num_house
      }
      $scope.profile.houses.push(newHouse);
      $scope.profile.$save({id: $scope.id}, function () {
        $scope.getUserProfile();
      }); 
    }
    
    $scope.filteredHouses = function () {
      var result = $scope.houses;
      for (var i = 0; i < $scope.houses.length; i++) {
        for (var j = 0; j < $scope.profile.houses.length; j++ ){
          if ($scope.houses[i]._id == $scope.profile.houses[j]._id) {
            result.splice(i,1);
          } 
        }
      }
      return result;
    }

    $scope.removeUserHouse = function (house) {
      for (var i =0; i < $scope.profile.houses.length; i++)
        if ($scope.profile.houses[i]._id === house._id) {
          $scope.profile.houses.splice(i,1);
          break;
        }
      $scope.profile.$save({id: $scope.id}, function () {
        $scope.getUserProfile();
      }); 
    }

    $scope.id = $stateParams.id;
    // $scope.houses = Houses.query();

    $scope.getUserProfile();

  }])