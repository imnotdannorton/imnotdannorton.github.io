'use strict';

/* Controllers */

angular.module('vaterDotcom').controller('featureController', ['$scope', '$rootScope', '$location', '$routeParams',  'resourcesService', 'PRODUCT_IMAGE_PATH', function($scope, $rootScope, $location, $routeParams, resourcesService, PRODUCT_IMAGE_PATH) {
  	//$scope.features = ['WOO', 'HEY NOW', 'WHATS THAT?'];
  	
  	$scope.featureId = $routeParams.id;
  	if($scope.featureId ){
	 resourcesService.fetchItem('feature', $scope.featureId);
  	}else{
  	 resourcesService.fetchItem('features');
  	}
  	$scope.$on('featuresSuccess', function(event, data){
  		$scope.features = data;
  		console.log(data);
  	});
  	$scope.$on('featureSuccess', function(event, data){
  		$scope.feature = data;
  		console.log(data);
  	});
  	$scope.processFeature = function(object){
  		if (object.artist) {

  		};
  	}
  }]);
