'use strict';

angular
  .module('hgUserApp')
  .controller('housePassportCtrl',['$scope', '$rootScope', '$location', 'Houses', function ($scope, $rootScope, $location, Houses) {
    
    $scope.getHouse = function () {
      if ($rootScope.userHouse){
        $scope.house = Houses.get({id: $rootScope.userHouse});
      } else {
        $location.path('/houses');
      }
    };

    $scope.getHouse();

  }])