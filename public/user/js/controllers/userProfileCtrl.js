'use strict';

angular
  .module('hgUserApp')
  .controller('userProfileCtrl', ['$scope', '$rootScope', '$location', 'Profile', function ($scope, $rootScope, $location, Profile) {

    $scope.getProfile = function () {
      $scope.profile = Profile.get();
    };

    $scope.updateProfile = function () {
      Profile.save($scope.profile, function () {
        $rootScope.username = $scope.profile.name;
        $location.path('/profile');
      });
    }

    $scope.getProfile();

  }])