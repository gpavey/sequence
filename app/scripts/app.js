'use strict';

/**
 * @ngdoc overview
 * @name missionBikeApp
 * @description
 * # missionBikeApp
 *
 * Main module of the application.
 */
(function(){
  angular.module('missionBikeApp', [
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])



  .controller('bikeController',function($scope,bikeService){
    $scope.myInterval = 5000;
    $scope.items = {};
    bikeService.getBikes().then(function(data){
      $scope.items = data;
    });
  })

  .service('bikeService', function($http){
    this.getBikes = function() {
    return $http
      .get('http://seq-front-end-assessment.s3-website-us-west-2.amazonaws.com/catalog.json')
      .then(function(res) {
        return res.data;
      });
    };
  });
})();