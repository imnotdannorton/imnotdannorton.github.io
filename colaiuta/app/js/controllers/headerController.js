'use strict';

/* Controllers */

angular.module('vaterDotcom').controller('headerController', ['$scope', '$location', '$route', function($scope, $location, $route) {
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
 
}]);
