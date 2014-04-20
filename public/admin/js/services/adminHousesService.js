'use strict';

angular
  .module('hgAdminApp')
  .factory('Houses', ['$resource', function ($resource){
    return $resource('/houses/:id');
  }])