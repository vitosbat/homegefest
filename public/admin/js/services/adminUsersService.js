'use strict';

angular
  .module('hgAdminApp')
  .factory('Users', ['$resource', function ($resource){
    return $resource('/users/:id');
  }])