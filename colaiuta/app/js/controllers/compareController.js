'use strict';

/* Controllers */

angular.module('vaterDotcom').controller('CompareCtrl', ['$scope', '$rootScope', '$location', '$routeParams',  'resourcesService', 'PRODUCT_IMAGE_PATH', function($scope, $rootScope, $location, $routeParams, resourcesService, PRODUCT_IMAGE_PATH) {
  	
    $scope.prodId = $routeParams.id;

    $scope.compareItems = [];
    $scope.compareObjects = [];
    
    $scope.imgPath = PRODUCT_IMAGE_PATH;
    $scope.imgPathLrg = PRODUCT_IMAGE_PATH + '_fullres';
    $scope.showZoom = false;
    
    /*$scope.buildComparison = function(array){
      console.log(array);
      angular.forEach(array, function(value, key){
        resourcesService.fetchItem('product', value);
      });
    }*/
    

    console.log($routeParams);
    if($routeParams){
      angular.forEach($routeParams, function(e, i){
          console.log(e);
          resourcesService.fetchItem('product', e);
        });
       // $scope.buildComparison($scope.compareItems);
    }
    $scope.$on('productSuccess', function(event, data){
        if(data.product_code.indexOf('Nylon') > -1){
            data.product_code.replace('<br>', '/');
            data.images[0].name += '_w';
          //console.log($scope.product.images[0].name); 
        }


          $scope.compareObjects.push(data);
          console.log( $scope.compareObjects.length);
      });

    // dont think i need this actually
    $rootScope.$on('artistSuccess', function(event, data){
      for (var i = 0; i < $scope.product.artists.length; i++) {
        if($scope.product.artists[i].id == data.id){
          $scope.product.artists[i] = data;
          $scope.product.artists[i].image = data.images[0].url;
          console.log($scope.product.artists[i]);
        }
      };
    });

    // compare products
    $scope.processArtists = function(array){
     for (var i = 0; i < array.length; i++) {
       resourcesService.fetchItem('artist', array[i].id);
     };
    }
    $scope.toCentimeters = function(value){
      var cm = parseFloat(value*2.54).toFixed(2);
      return cm;
    }
 }]);
