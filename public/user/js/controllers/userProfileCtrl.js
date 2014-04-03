'use strict';

angular
  .module('hgUserApp')
  .controller('userProfileCtrl', ['$scope', '$rootScope', '$http', '$location', 'Profile', function ($scope, $rootScope, $http, $location, Profile) {

    $scope.getProfile = function () {
      var profile = Profile.get();
      // $scope.profile = profile;
      $rootScope.profile = profile;
    };

    $scope.updateProfile = function () {
      Profile.save($scope.profile, function () {
        $location.path('/profile');
      });
    }

    $scope.getProfile();

  }])