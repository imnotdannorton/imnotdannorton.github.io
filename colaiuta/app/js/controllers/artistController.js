'use strict';

/* Controllers */
angular.module('vaterDotcom').controller('artistController', ['$scope', '$rootScope', '$location', '$routeParams', 'resourcesService', function($scope, $rootScope, $location, $routeParams, resourcesService) {
  	$scope.artistId = $routeParams.id;
    console.log($location);
    $scope.currentLocation = "";
    $scope.artist = {};
    $scope.socialLinks = {};
    console.log($scope.id);
    if(typeof $scope.artistId !== 'undefined'){
      resourcesService.fetchItem('artist', $scope.artistId);
    }else{
      resourcesService.fetchItem('artists');
    }
    $scope.artistImages = [];
    $scope.currentImage = function(index){
      console.log('activeImage is: '+ index);
      $('#artistBg').css({'background':'url('+ $scope.artistImages[index].url+') no-repeat right top, url('+ $scope.artistImages[index].url+') no-repeat left top', 'background-size':'contain'});
    }


  	//artistService.fetchArtist(1);
  	//console.log(productService.fetchProducts);
  	$scope.$on('artistsSuccess', function(event, data){
  		console.log(event);
  		$scope.artists = data;
  		console.log($scope.artists);
  	 //console.log(data);
  	});
  	$scope.$on('artistSuccess', function(event, data){
  		$scope.artist = data;
      $scope.artistImages = data.images;
      $scope.currentImage(0);
      if($scope.artist.social){
        $scope.social = $scope.artist.social.split(', ');
        $scope.prepLinks($scope.social); 
      }
      
  		
  	 //console.log(data);
  	});

    $scope.prepLinks = function(array){
      angular.forEach(array, function(value,key){
        console.log(array + ' : ' + value);
        //if(!this[value]){
        //this[value]=value;
        //}
        if(value.indexOf('instagram')>-1){
          this.instagram = value.replace('instagram.com/', '');
          console.log('added insta');
        }
        else if(value.indexOf('twitter')>-1){
          this.twitter = value.replace('twitter.com/', '');
        }
        else if(value.indexOf('youtube')>-1){
          this.youtube = value;
        }
        else if(value.indexOf('facebook')>-1){
          this.facebook = value.replace('https://www.facebook.com/', '');
        }else{
          this.web = value;
        }
      }, $scope.socialLinks);
      console.log($scope.socialLinks);
    }
    
  }]);
