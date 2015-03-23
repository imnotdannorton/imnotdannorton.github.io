'use strict';
angular.module('vaterDotcom').controller('HomepageCtrl', ['$scope', '$rootScope', 'instagramService', 'youtubePlaylistService', function($scope, $rootScope, instagramService, youtubePlaylistService) {
    console.log("whoo home");
    instagramService.fetchInstagrams();
    youtubePlaylistService.fetchFeed('VaterPercussionUSA');
    $scope.activeBillboard = 0;
    $rootScope.$on('instaSuccess', function(event, object){
    	console.log(object);
    	$scope.instaPic = object.data[0].images.standard_resolution.url;
    	$scope.instaLink = object.data[0].link;
    	$scope.instaText = object.data[0].caption.text;
    });
    $scope.nextItem = function(){
      if ($scope.activeBillboard+1 < $scope.billboards.length){
       $scope.activeBillboard = $scope.activeBillboard+1; 
      }
    }
    $scope.prevItem = function(){
      if ($scope.activeBillboard > 0){
       $scope.activeBillboard = $scope.activeBillboard-1; 
      }
    }
    $scope.billboards = [

      {
        type:'video',
        id:'e6Oz2CQLfKA'
      },
      {
        type:'image',
        src:'http://vater.s3.amazonaws.com/assets/TimAlexanderModel.jpg'
      },
      {
        type:'image',
        src:'http://vater.s3.amazonaws.com/assets/stickmate_2014.jpg'
      }
    ];
    $scope.featuredProd = {
      name:'5A Stretch',
      img:'http://vater.s3.amazonaws.com/products_fullres/Vater_5a_s.jpg',
      id:'381'
    }
  	
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