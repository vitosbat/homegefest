angular
  .module('hgUserApp')
  .controller('userProfileCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.getProfile = function () {
      $http.get('/user/profile').success(function (data) {
        $scope.profile = data;
      });
    };

    $scope.getProfile();

    $scope.updateProfile = function () {
      $http.post('user/profile', $scope.profile).success(function (data) {
        if (data.err) alert(data.err);
        console.log('Update and back!');
        $location.path('/profile');
      })
    }

  }])