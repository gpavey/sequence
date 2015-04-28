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

  .controller('ModalCtrl', function ($scope, $modal, $log) {
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          },
          item: function(){
            return size;
          }
        }
      });
    };
  })

 .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, item) {
    $scope.item = item;
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };
    $scope.increment = function(item){
      item.count += 1;
    }



    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })

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