'use strict';

angular
  .module('hgUserApp')
  .factory('Profile', ['$resource', function ($resource){
    return $resource('/user/profile');
  }])