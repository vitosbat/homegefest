'use strict';

angular
  .module('hgUserApp')
  .factory('Houses', ['$resource', function ($resource){
    return $resource('/houses/:id');
  }])