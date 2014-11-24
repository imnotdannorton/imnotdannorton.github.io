'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
console.log("services");
angular.module('vaterDotcom').service('resourcesService', ['$http', '$rootScope', function($http, $rootScope) {
  	$rootScope.loading = true;
    this.fetchItem = function(type, id){
      $rootScope.loading = true;
      var urlRequest = "http://dev.beneship.com:3002/";
      
      if(id){
        var newtype = type+'s'; 
        urlRequest = urlRequest+newtype+'/'+id+'.json';
        // to broadcast proper success message
      }else{
        urlRequest = urlRequest+type+'.json';
      }
  		$http({
  		method:'GET',
  		url:urlRequest
	  	}).success(function(data){
	  		//console.log(data);
        $rootScope.loading = false;
	  		$rootScope.$broadcast(type+'Success', data);
	  	}).error(function(data, status){
        $rootScope.loading = false;
	  		//console.log("oops: "+data+"error: "+status);
	  	});	
  	};
  	/*this.fetchProduct = function(id){
      $rootScope.loading = true;
  		$http({
  		method:'GET',
  		url:'http://dev.beneship.com:3002/products/'+id+'.json'
	  	}).success(function(data){
	  		//console.log(data);
        $rootScope.loading = false;
	  		$rootScope.$broadcast('productSuccess', data);
	  	}).error(function(data, status){
        $rootScope.loading = false;
	  		console.log("Artist oops: "+data+"error: "+status);
	  	});	
  	};*/
  }])/*.service('artistService', ['$http', '$rootScope', function($http, $rootScope) {
  	this.fetchArtists = function(){
      $rootScope.loading = true;
  		$http({
  		method:'GET',
  		url:'http://dev.beneship.com:3002/artists.json'
	  	}).success(function(data){
	  		//console.log(data);
        $rootScope.loading = false;
	  		$rootScope.$broadcast('artistsSuccess', data);
	  	}).error(function(data, status){
        $rootScope.loading = false;
	  		console.log("Artist oops: "+data+"error: "+status);
	  	});	
  	};
  	this.fetchArtist = function(id){
      $rootScope.loading = true;
  		$http({
  		method:'GET',
  		url:'http://dev.beneship.com:3002/artists/'+id+'.json'
	  	}).success(function(data){
	  		//console.log(data);
        $rootScope.loading = false;
	  		$rootScope.$broadcast('artistSuccess', data);
	  	}).error(function(data, status){
        $rootScope.loading = false;
	  		console.log("Artist oops: "+data+"error: "+status);
	  	});	
  	};
  }])*/.service('instagramService', ['$http', '$rootScope', function($http, $rootScope){
  	/*
	 var endPoint = "https://api.instagram.com/v1/media/popular?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";
            
            $http.jsonp(endPoint).success(function(response){
                callback(response.data);
            });
		}
	}
  	*/


  	this.fetchInstagrams = function(){
  	$http.jsonp('https://api.instagram.com/v1/users/214340073/media/recent?access_token=11896865.1fb234f.47a3eeab0ccc448aa966bf77eda87d02&count=1&callback=JSON_CALLBACK'
  	).success(function(data){
  		$rootScope.$broadcast('instaSuccess', data);
  		console.log('IG SUCCESS');
  	}).error(function(data, status){
  		console.log('insta fail: '+ data);
  	});
  	};


  }]);
