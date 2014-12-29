'use strict';

/* Controllers */

angular.module('vaterDotcom').controller('featureController', ['$scope', '$rootScope', '$location', '$routeParams',  'resourcesService', 'PRODUCT_IMAGE_PATH', function($scope, $rootScope, $location, $routeParams, resourcesService, PRODUCT_IMAGE_PATH) {
  	//$scope.features = ['WOO', 'HEY NOW', 'WHATS THAT?'];
  	resourcesService.fetchItem('features');
  	$scope.$on('featuresSuccess', function(event, data){
  		$scope.features = data;
  		console.log(data);
  	});
  }]);
