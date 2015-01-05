'use strict';

/* Controllers */

angular.module('vaterDotcom').controller('headerController', ['$scope', '$rootScope', '$location', '$route', 'resourcesService', 'PRODUCT_IMAGE_PATH', function($scope, $rootScope, $location, $route, resourcesService, PRODUCT_IMAGE_PATH) {
  //$scope.$on('activeNav', function(data){
  //  $scope.setActiveTab(data);
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
    $rootScope.resultsResponse = false;
    $location.path(path);
  }
  $rootScope.fields = {
    'searchField': ''
  }
  $rootScope.results = {};
  $scope.$on('$routeChangeStart', function(next, current) { 
   $rootScope.clearResults();
 });
  $scope.$on('productsSearch Success', function(event, data){
      if(data.length > 0){
        $rootScope.results.products = data;
        console.log($rootScope.results);
        $scope.results = $rootScope.results;
        $rootScope.resultsResponse = true;
        //$scope.$apply();
      }
    });
  
  $scope.$on('artistsSearch Success', function(event, data){
      if(data.length > 0){
      $rootScope.results.artists = data;
      //console.log($rootScope.results);
      $scope.results = $rootScope.results;
      $rootScope.resultsResponse = true;
      }
    });
  
  $scope.$on('featuresSearch Success', function(event, data){
      if(data.length > 0){
      $rootScope.results.features = data;
      $scope.results.features = data;
      console.log($rootScope.results);
      $scope.results = $rootScope.results;
      $rootScope.resultsResponse = true;

      }
    });

 // $scope.results = $rootScope.results;
  /*$rootScope.resultsResponse = false;
  $scope.$watch('resultsResponse', function(newVal, old){
    console.log($scope.resultsResponse);
    $scope.resultsResponse = newVal;

  });
  $rootScope.$watch('results', function(old, newVal){
    console.log(newVal, old);
    $scope.results = newVal;
  });*/
  $rootScope.clearResults = function(){
    //$scope.searchField = "";
    $rootScope.fields.searchField = "";
    $rootScope.resultsResponse = false;
    $rootScope.results = {};
    $scope.results = $rootScope.results;
    //console.log('cleared!');
  }
 $scope.searchResults = function(string){
  //$location.path('/search');
  //$location.search(string);
  //$rootScope.clearResults();
  $rootScope.resultsResponse = false;
    $rootScope.results = {};
  resourcesService.fetchByQuery('products', string,  null, true);
  resourcesService.fetchByQuery('artists', string, 'last_name', true);
  resourcesService.fetchByQuery('features', string, null, true);
}
  
}]);