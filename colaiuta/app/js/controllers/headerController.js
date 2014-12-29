'use strict';

/* Controllers */

angular.module('vaterDotcom').controller('headerController', ['$scope', '$location', '$route', 'resourcesService', function($scope, $location, $route, resourcesService) {
	//$scope.$on('activeNav', function(data){
	//	$scope.setActiveTab(data);
	//})
	//console.log($location.path());
	//console.log($route.current.params);
	$scope.setActiveTab = function(tab){
	$scope.redirect(tab);
	$location.search('');
	$('#header ul li a').removeClass('active');
	$('#'+tab).addClass('active');
	//console.log($location.path());
	$('#mobileNav.active').removeClass('active'); // move mobile nav out
  }
  $scope.redirect = function(path){
  	$location.path(path);
  }
  //$scope.results = {};
  $scope.resultsResponse = false;
  $scope.$watch('resultsResponse', function(newVal, old){
  	console.log($scope.resultsResponse);
  	$scope.resultsResponse = newVal;
  });
 $scope.searchResults = function(string){
 	//$location.path('/search');
 	//$location.search(string);
 	resourcesService.fetchByQuery('products', string);
 	$scope.$on('productsQuery Success', function(event, data){
 	  $scope.resultsResponse = true;
      $scope.results.products = data;
      //console.log($scope.results);
    });
 	resourcesService.fetchByQuery('artists', string);
 	$scope.$on('artistsQuery Success', function(event, data){
 		$scope.resultsResponse = true;
      $scope.results.artists = data;
      //console.log($scope.results);
    });
 	resourcesService.fetchByQuery('features', string);
 	$scope.$on('featuresQuery Success', function(event, data){
 		$scope.resultsResponse = true;
      $scope.results.features = data;
      //console.log($scope.results);
    });
 }
}]);
