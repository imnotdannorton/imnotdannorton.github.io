'use strict';

/* Controllers */

angular.module('vaterDotcom').controller('headerController', ['$scope', '$location', '$route', function($scope, $location, $route) {
	//$scope.$on('activeNav', function(data){
	//	$scope.setActiveTab(data);
	//})
	console.log($location.path());
	console.log($route.current.params);
	$scope.setActiveTab = function(tab){
	$('#header ul li a').removeClass('active');
	$('#'+tab).addClass('active');
  }
}]);
