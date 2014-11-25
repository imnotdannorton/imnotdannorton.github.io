'use strict';

/* Controllers */

angular.module('vaterDotcom').controller('ProductCtrl', ['$scope', '$rootScope', '$location', '$routeParams',  'resourcesService', 'PRODUCT_IMAGE_PATH', function($scope, $rootScope, $location, $routeParams, resourcesService, PRODUCT_IMAGE_PATH) {
  	
    $scope.prodId = $routeParams.id;

    $scope.compareItems = [];
    $scope.prodLoading = $rootScope.loading;
    $scope.imgPath = PRODUCT_IMAGE_PATH;
    $scope.imgPathLrg = PRODUCT_IMAGE_PATH + '_fullres';
    $scope.showZoom = false;
    $scope.compareLink = '/app/#/compare?';
  
   
  	if(typeof $scope.prodId !== 'undefined'){
  		resourcesService.fetchItem('product', $scope.prodId);
     
    }else{
  		resourcesService.fetchItem('products');
     
  	}

    $scope.$on('productSuccess', function(event, data){
        $scope.product = data;
        if ($scope.product.artists.length>0) {
          $scope.processArtists($scope.product.artists);
        };
      });
    $scope.$on('productsSuccess', function(event, data){
        $scope.products = data;
        console.log(data);
      });

    $rootScope.$on('artistSuccess', function(event, data){
      for (var i = 0; i < $scope.product.artists.length; i++) {
        if($scope.product.artists[i].id == data.id){
          $scope.product.artists[i] = data;
          $scope.product.artists[i].image = data.images[0].url;
          console.log($scope.product.artists[i]);
        }
      };
    });
    $scope.$watch('prodLoading', function(newVal, oldVal){
      console.log('updated: '+newVal);
      console.log('from: '+oldVal);
    });
    // compare products
    $scope.compareThis = function(product){
      $scope.compareItems.push(product);
      var idString = ($scope.compareItems.length == 1) ? 'id'+$scope.compareItems.length+'=' : '&id'+$scope.compareItems.length+'=';
      $scope.compareLink = $scope.compareLink +idString+product.id;

    }
    $scope.viewComparison = function(){

    }
    $scope.processArtists = function(array){
     for (var i = 0; i < array.length; i++) {
       artistService.fetchItem('artist', array[i].id);
     };
    }
    $scope.toCentimeters = function(value){
      var cm = parseFloat(value*2.54).toFixed(2);
      return cm;
    }
 }]);
