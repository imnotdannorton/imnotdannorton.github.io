'use strict';

/* Controllers */
angular.module('vaterDotcom').controller('artistController', ['$scope', '$rootScope', '$location', '$routeParams', 'resourcesService', function($scope, $rootScope, $location, $routeParams, resourcesService) {
  	$('body').scrollTop(0);
    $scope.artistId = $routeParams.id;
    console.log($location);
    $scope.currentLocation = "";
    $scope.artist = {};
    $scope.activeLetter = "a";
    $scope.artistFind = [];
    for (var i = 0; i <= 25; i++) {
       $scope.artistFind.push( String.fromCharCode(i+97));
    };
    console.log($scope.artistFind);
    $scope.showVid = false;
    $scope.socialLinks = {};
    console.log($scope.id);
    if(typeof $scope.artistId !== 'undefined'){
      resourcesService.fetchItem('artist', $scope.artistId);
    }else{
      resourcesService.fetchByQuery('artists', 'A', 'last_name');
    }
    $scope.artistImages = [];
    $scope.currentImage = function(index){
      if($scope.showVid == true){
        $scope.showVid = false;
      }
      console.log('activeImage is: '+ index);
      $scope.activeImage = $scope.artistImages[index].url;
      $('#artistBg').css({'background':'url('+ $scope.artistImages[index].url+') no-repeat right top, url('+ $scope.artistImages[index].url+') no-repeat left top', 'background-size':'contain'});
    }
    $scope.showVideo = function(id){
      if($scope.showVid == false){
      $scope.showVid = true; 
      }
      $scope.vidId = id;
      console.log($scope.vidId)
    }
   $scope.findArtists = function(string, params){
    $rootScope.loading = true;
    //$scope.activeLetter = string[0].toLowerCase();
    resourcesService.fetchByQuery('artists', string, params);
    $scope.clearFind();
   }
   $scope.clearFind = function(){
    $scope.find = "";
   }
   $scope.lastNameFilter = function(string){
    $scope.find = "";
    $scope.activeLetter = string;
    $scope.findArtists(string, 'last_name');
   }
  	//artistService.fetchArtist(1);
  	//console.log(productService.fetchProducts);
  	$scope.$on('artistsSuccess', function(event, data){
  		console.log(event);
  		$scope.artists = data;
  		console.log($scope.artists);
  	 //console.log(data);
  	});
    $scope.$on('artistsQuery Success', function(event, data){
      $rootScope.loading = false;
      $scope.artists = data;
      console.log(data);
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
        value = value.replace('site: ', '');
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
        else if(value.indexOf('https://www.facebook.com/')>-1){
          this.facebook = value.replace('https://www.facebook.com/', '');
        }
        else if(value.indexOf('facebook.com/')>-1){
          this.facebook = value.replace('facebook.com/', '');
        }else{
          this.web = value;
        }
      }, $scope.socialLinks);
      console.log($scope.socialLinks);
    }
    
  }]);
