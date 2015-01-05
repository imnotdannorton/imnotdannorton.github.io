'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
console.log("services");
angular.module('vaterDotcom').service('resourcesService', ['$http', '$rootScope', function($http, $rootScope) {
  	//$rootScope.loading = true;

    $rootScope.catAliases = {
<<<<<<< HEAD
          "hickory": ["American_Hickory", "Gospel", "Nude", "VXD"],
          "eternalblack": "Eternal_Black",
          "maple":["Sugar_Maple","Cymbal_Sticks"],
          "accessories":["Accessories", "Beaters"],
          "practicepads":["ChopBuilderPads", "NoiseGuard"],
          "playersdesign":["Int_Players_Design", "Players_Design"],
          "specialtysticks":"Specialty_Sticks",
          "colorwrap":"ColorWrap",
          "bags":"Bags",
          "brushes":"Wire_Tap_Brushes",
=======
          "hickory": ["American_Hickory", "Eternal_Black", "Gospel", "Nude", "VXD"],
          "eternalblack": "Eternal_Black",
          "maple":"Sugar_Maple",
          "accessories":["Accessories", "Beaters"],
          "practicepads":["ChopBuilderPads", "NoiseGuard"],
          "playersdesign":["Players_Design", "Int_Players_Design"],
          "specialtysticks":"Specialty_Sticks",
          "colorwrap":"ColorWrap",
          "bags":"Bags",
>>>>>>> 920edda3524ab20ca654b947a19a720db6e2a680
          "timbale":"Timbale_Sticks",
          "mallets":["Marching_Marimba", "Marching_Vibraphone", "Marching_Xylophone", "Concert_Marimba", "Concert_Vibraphone", "Concert_Xylophone"],
          "marching":["Marching_Sticks", "Multi_Tenor_Mallets", "BassDrum_Mallets"],
          "education":["Educational", "Bags", "ChopBuilderPads"],
          "concert":["Cymbal_Sticks"]
        },

    this.tagAlias = function(string){
      console.log(string);
      console.log($rootScope.catAliases[string]);
<<<<<<< HEAD
      if( $rootScope.catAliases[string] instanceof Array){
        return $rootScope.catAliases[string].join(',');
=======
      if( $rootScope.catAliases[string ]instanceof Array){
        return $rootScope.catAliases[string][0];
>>>>>>> 920edda3524ab20ca654b947a19a720db6e2a680
      }else{
        return $rootScope.catAliases[string];
      }
    };

    this.fetchItem = function(type, id){

      var urlRequest = "http://dev.beneship.com:3002/";
      $rootScope.loading = true;
      
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
<<<<<<< HEAD
    this.fetchByTag = function(type, tags, query, global){
      $rootScope.loading = true;
      tags = this.tagAlias(tags);
      var urlRequest = "http://dev.beneship.com:3002/";
      urlRequest = urlRequest+type+'.json'+'?tags='+tags;
      if(query){
        urlRequest = urlRequest + '&q=' + query;
      }
      console.log(tags);
      if(query){
        urlRequest = urlRequest+'&q='+query;
      }
      $http({
      method:'GET',
      url:urlRequest
      }).success(function(data){
        $rootScope.loading = false;
        if(global){
          $rootScope.$broadcast(type+'Search Success', data);
        }else{
          $rootScope.$broadcast(type+'Tag Success', data);
        }
      }).error(function(data, status){
        $rootScope.loading = false;
      }); 
    };
    this.fetchByQuery = function(type, query, params, global){
      $rootScope.loading = true;
      var urlRequest = "http://dev.beneship.com:3002/";
      if(params){
        urlRequest = urlRequest+type+'.json'+'?'+params+'='+query; 
        console.log('params')
      }else{
        urlRequest = urlRequest+type+'.json'+'?q='+query; 
      }
=======
    this.fetchByTag = function(type, tags, query){
      $rootScope.loading = true;
      tags = this.tagAlias(tags);
      var urlRequest = "http://dev.beneship.com:3002/";
      urlRequest = urlRequest+type+'.json'+'?tags='+tags;
      if(query){
        urlRequest = urlRequest + '&q=' + query;
      }
      console.log(tags);
      if(query){
        urlRequest = urlRequest+'&q='+query;
      }
      $http({
      method:'GET',
      url:urlRequest
      }).success(function(data){
        $rootScope.loading = false;
        $rootScope.$broadcast(type+'Tag Success', data);
      }).error(function(data, status){
        $rootScope.loading = false;
      }); 
    };
    this.fetchByQuery = function(type, query){
      $rootScope.loading = true;
      var urlRequest = "http://dev.beneship.com:3002/";
      urlRequest = urlRequest+type+'.json'+'?q='+query;
>>>>>>> 920edda3524ab20ca654b947a19a720db6e2a680
      
      console.log(query);
      
      $http({
      method:'GET',
      url:urlRequest
      }).success(function(data){
        $rootScope.loading = false;
<<<<<<< HEAD
        if(global){
          $rootScope.$broadcast(type+'Search Success', data);
        }else{
         $rootScope.$broadcast(type+'Query Success', data);
        }
=======
        $rootScope.$broadcast(type+'Query Success', data);
>>>>>>> 920edda3524ab20ca654b947a19a720db6e2a680
      }).error(function(data, status){
        $rootScope.loading = false;
      }); 
    };
    


    /*Accessories
    //American_Hickory
    //Bags
    //BassDrum_Mallets
    BassDrum_Mallets2
    //Beaters
    //ChopBuilderPads
    //ColorWrap
    //Concert_Marimba
    //Concert_Vibraphone
    //Concert_Xylophone
    //Cymbal_Sticks
    Educational
    //Eternal_Black
    GongMallet
    //Gospel
    Int_Players_Design
    //Marching_Marimba
    Marching_Sticks
   // Marching_Vibraphone
    //Marching_Xylophone
    Multi_Tenor_Mallets
   // NoiseGuard
   // Nude
   // Players_Design
    //PracticePads
    Retail
    Specialty_Sticks
    //Sugar_Maple
    Timbale_Sticks
    Timbale_Sticks2
    Timpani_Mallets
    //VXD
    Wire_Tap_Brushes
    };*/
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


  }]).service('youtubeEmbed', ['$document', '$q', '$rootScope', function($document, $q, $rootScope){
  var y = $q.defer();
  $rootScope.youtubeLoaded = false;
  function onScriptLoad(){
    y.resolve(window.yt);
    //console.log('YT loaded from onScriptLoad');
  }

  var scriptTag = $document[0].createElement('script');
  scriptTag.type = 'text/javascript';
  scriptTag.async = true;
  scriptTag.src = 'https://www.youtube.com/player_api';
  scriptTag.onreadystatechange = function(){
    if(this.readyState == 'complete'){
      onScriptLoad();
      $rootScope.youtubeLoaded = true;
      console.log('youtubeLoaded!!!');
    }
  }
  scriptTag.onload = onScriptLoad();

  var s = $document[0].getElementsByTagName('body')[0];
  s.appendChild(scriptTag);

  return {
    yt: function(){ return y.promise; }
  };

}]);
