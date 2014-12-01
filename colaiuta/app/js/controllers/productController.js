'use strict';

/* Controllers */

angular.module('vaterDotcom').controller('ProductCtrl', ['$scope', '$rootScope', '$location', '$routeParams',  'resourcesService', 'PRODUCT_IMAGE_PATH', function($scope, $rootScope, $location, $routeParams, resourcesService, PRODUCT_IMAGE_PATH) {
  	
    $scope.prodId = $routeParams.id;
    $scope.sortby = 'name'
    $scope.compareItems = [];
    $scope.prodLoading = $rootScope.loading;
    $scope.imgPath = PRODUCT_IMAGE_PATH;
    $scope.imgPathLrg = PRODUCT_IMAGE_PATH + '_fullres';
    $scope.showZoom = false;
    $scope.ascending = true;
    

  	if(typeof $scope.prodId !== 'undefined'){
  		resourcesService.fetchItem('product', $scope.prodId);
     
    }else{
  		resourcesService.fetchItem('products');
     
  	}

    $scope.$on('productSuccess', function(event, data){
        $scope.product = data;
        console.log($scope.product);
        if ($scope.product.artists.length>0) {
          $scope.processArtists($scope.product.artists);
        };
        // Change image path to default to wood

        if($scope.product.product_code.indexOf('Nylon') > -1){
          $scope.product.images[0].name += '_w';
          $scope.product.product_code.replace('<br>', '/');
          //console.log($scope.product.images[0].name); 
        }
        window.document.title = 'Vater Percussion | ' + $scope.product.name;
      });
    $scope.$on('productsSuccess', function(event, data){
        $scope.products = data;
        window.document.title = 'Vater Percussion | Products'
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
    $scope.swapSort = function(string){
      if (string.indexOf('-')>-1) {
        $scope.sortby = string.replace('-', '');
        $scope.ascending = true;
        $scope.descending = false;
      }else{
        $scope.sortby = '-'+string;
        $scope.ascending = false;
        $scope.descending = true;
      };
      console.log($scope.sortby);
    }
    $scope.compareThis = function(product){
      $scope.compareItems.push(product);
      $scope.buildComparison();
    }
    $scope.buildComparison = function(){
      $scope.compareLink = '/compare?';
      for (var i = 0; i < $scope.compareItems.length; i++) {
      var idString = (i+1 == 1) ? 'id'+(i+1)+'=' : '&id'+(i+1)+'=';
      $scope.compareLink = $scope.compareLink +idString+$scope.compareItems[i].id;
      };
      console.log( $scope.compareLink);

    }
    $scope.viewCompare = function(){
      $location.path($scope.compareLink);
    }
    $scope.removeItem = function(id){
      console.log(id);
      $scope.compareItems.splice(id, 1);

      console.log($scope.compareItems);
      $scope.buildComparison();
     // $scope.$apply();
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
