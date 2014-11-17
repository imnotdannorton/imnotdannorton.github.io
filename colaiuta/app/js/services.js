'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
console.log("services");
angular.module('vaterDotcom').service('productService', ['$http', '$rootScope', function($http, $rootScope) {
  	this.fetchProducts = function(){
  		$http({
  		method:'GET',
  		url:'http://dev.beneship.com:3002/products.json'
	  	}).success(function(data){
	  		//console.log(data);
	  		$rootScope.$broadcast('productsSuccess', data);
	  	}).error(function(data, status){
	  		//console.log("oops: "+data+"error: "+status);
	  	});	
  	};
  	this.fetchProduct = function(id){
  		$http({
  		method:'GET',
  		url:'http://dev.beneship.com:3002/products/'+id+'.json'
	  	}).success(function(data){
	  		//console.log(data);
	  		$rootScope.$broadcast('productSuccess', data);
	  	}).error(function(data, status){
	  		console.log("Artist oops: "+data+"error: "+status);
	  	});	
  	};
  }]).service('artistService', ['$http', '$rootScope', function($http, $rootScope) {
  	this.fetchArtists = function(){
  		$http({
  		method:'GET',
  		url:'http://dev.beneship.com:3002/artists.json'
	  	}).success(function(data){
	  		//console.log(data);
	  		$rootScope.$broadcast('artistsSuccess', data);
	  	}).error(function(data, status){
	  		console.log("Artist oops: "+data+"error: "+status);
	  	});	
  	};
  	this.fetchArtist = function(id){
  		$http({
  		method:'GET',
  		url:'http://dev.beneship.com:3002/artists/'+id+'.json'
	  	}).success(function(data){
	  		//console.log(data);
	  		$rootScope.$broadcast('artistSuccess', data);
	  	}).error(function(data, status){
	  		console.log("Artist oops: "+data+"error: "+status);
	  	});	
  	};
  }]).service('instagramService', ['$http', '$rootScope', function($http, $rootScope){
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
