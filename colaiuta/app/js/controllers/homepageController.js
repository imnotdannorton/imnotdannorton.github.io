'use strict';
angular.module('vaterDotcom').controller('HomepageCtrl', ['$scope', '$rootScope', 'instagramService', function($scope, $rootScope, instagramService) {
    console.log("whoo home");
    instagramService.fetchInstagrams();
    $rootScope.$on('instaSuccess', function(event, object){
    	console.log(object);
    	$scope.instaPic = object.data[0].images.standard_resolution.url;
    	$scope.instaLink = object.data[0].link;
    	$scope.instaText = object.data[0].caption.text;
    });
  	$scope.features = [
  		{
  			title:'Linear Sevens by James Murphy',
  			type:'artist',
  			img:'http://vater.s3.amazonaws.com/artists/jamesmurph_2014.jpg',
  			id:'123423534'
  		},
  		{
  			title:'Primus\' Tim Alexander Joins Vater',
  			type:'product',
  			img:'http://vater.s3.amazonaws.com/artists/TimAlexander_2014.jpg',
  			id:'3452345'
  		},


  	];
  }]);