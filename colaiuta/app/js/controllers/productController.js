'use strict';

/* Controllers */

angular.module('vaterDotcom').controller('ProductCtrl', ['$scope', '$rootScope', '$location', '$routeParams',  'productService', 'artistService', 'PRODUCT_IMAGE_PATH', function($scope, $rootScope, $location, $routeParams, productService, artistService, PRODUCT_IMAGE_PATH) {
  	//$scope.features = ['WOO', 'HEY NOW', 'WHATS THAT?'];
  	$scope.prodId = $routeParams.id;
    $scope.imgPath = PRODUCT_IMAGE_PATH;
    $scope.imgPathLrg = PRODUCT_IMAGE_PATH + '_fullres';
    $scope.showZoom = false;
  	if(typeof $scope.prodId !== 'undefined'){
  		productService.fetchProduct($scope.prodId);
  	}else{
  		productService.fetchProducts();
  	}
  	$rootScope.$on('productsSuccess', function(event, data){
  		$scope.products = data;
      console.log(data);
  	});
  	$rootScope.$on('productSuccess', function(event, data){
  		$scope.product = data;
      if ($scope.product.artists.length>0) {
        $scope.processArtists($scope.product.artists);
      };
  	 	console.log(data);
  	});
    /*$scope.$watch('product.artists', function(newVal, oldVal){
      console.log('artists updated');
      console.log(oldVal);
      console.log(newVal);
    }, true);*/

    $rootScope.$on('artistSuccess', function(event, data){
      for (var i = 0; i < $scope.product.artists.length; i++) {
        if($scope.product.artists[i].id == data.id){
          $scope.product.artists[i] = data;
          $scope.product.artists[i].image = data.images[0].url;
          console.log($scope.product.artists[i]);
        }
      };
    });

    $scope.processArtists = function(array){
     for (var i = 0; i < array.length; i++) {
       artistService.fetchArtist(array[i].id);
     };
    }
    $scope.toCentimeters = function(value){
      var cm = parseFloat(value*2.54).toFixed(2);
      return cm;
    }
 }]);
