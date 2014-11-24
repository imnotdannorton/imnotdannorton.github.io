'use strict';

/* Controllers */

angular.module('vaterDotcom').controller('dealerController', ['$scope', '$rootScope', function($scope, $rootScope) {
  	//$scope.features = ['WOO', 'HEY NOW', 'WHATS THAT?'];
  	
  	/*$scope.mapOptions = {
      center: new google.maps.LatLng(35.784, -78.670),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };*/

    $scope.map = {
	    center: {
	        latitude: 40.8,
	        longitude: -99
	    },
    	zoom: 8,
    	icon:"img/vater_mini.svg"
	};
	$scope.locations = [
	  {
		id:1,
		city:'Braintree',
		coords: { 
		 latitude: 40.1451,
         longitude: -99.6680
      }
  	},
  	 {
		id:2,
		city:'Boston',
		coords: { 
		 latitude: 41.1451,
         longitude: -99.6680
      }
  	}]
  }]);
