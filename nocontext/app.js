
var DEFAULT_SUBREDDIT = 'topgear';
var ANIMATED_IMAGES_URL = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&as_filetype=gif&imgtype=animated&tbs=itp:animated&callback=?&q=";
var STATIC_IMAGES_URL = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&callback=?&q=";

/**
 * @Author Jeff Bachand
 */

angular.module('noContext',['ngRoute'])
.config( function($routeProvider, $locationProvider) {
//$locationProvider.html5Mode(true);

$routeProvider.when('/:subReddit/:postId', {
    templateUrl: 'page.html',
    controller: 'noContextController',
    reloadOnSearch: false
  }).when('/:subReddit', {
    templateUrl: 'page.html',
    controller: 'noContextController',
    reloadOnSearch: false
  }).when('/', {
    templateUrl: 'page.html',
    controller: 'noContextController',
    reloadOnSearch: false
  });

});

var directiveModule = angular.module('noContext');

directiveModule.directive('content', function() {
  return{
     restrict: 'E',
          template: '<h1>{{posts[activePost].data.title}}</h1><a target="_blank" href="http://www.reddit.com{{posts[activePost].data.permalink}}">- {{posts[activePost].data.author}} - {{posts[activePost].data.created}}</a>',
          link: function(scope, elem, attrs) {
              elem.bind('click', function() {
                //share it!
              });
            }
  };
});

var noContextController = function($scope,$http,$timeout,$sce,$routeParams,$location){
  $scope.posts = [];
  $scope.sortBy = "new";
  $scope.activePost = null;
  if(typeof $routeParams.subReddit === 'undefined'){
    $location.path('/'+DEFAULT_SUBREDDIT);
  }
  $scope.subReddit = $routeParams.subReddit;
  $scope.postId = $routeParams.postId;
  console.log('subreddit: '+ $scope.subReddit);
  console.log('post: '+$scope.postId);

  $scope.$watch('activePost', function(newPost){
    if(typeof $scope.posts[newPost] !== 'undefined'){
      $scope.loading();
      $scope.postId = $scope.posts[newPost].data.id;
      $location.search('postId',$scope.postId);
      $scope.backgroundImage($scope.posts[$scope.activePost].data.title);
    }
  });



  $scope.getPosts = function(){
          
        $http.get(
          "http://www.reddit.com/r/"+$scope.subReddit+"/new.json?sort=new"
            ).
            success(function(subRedditPosts){
              if(typeof subRedditPosts.data.children !== 'undefined'){
                  $scope.posts = subRedditPosts.data.children;
                  if(typeof $scope.postId === 'undefined' || !$scope.postId){
                    $scope.activePost = 0;
                    $scope.postId = $scope.posts[$scope.activePost].data.id;
                    $scope.backgroundImage($scope.posts[$scope.activePost].data.title);
                  } else {
                     $.grep($scope.posts, function(e, i){
                      if(e.data.id == $scope.postId){
                        $scope.activePost = i;
                        $scope.backgroundImage($scope.posts[$scope.activePost].data.title);
                      }
                    });


                    if(typeof $scope.activePost === 'undefined' || $scope.activePost === null){
                      console.log("get a post not loaded in the subreddit, load it manually");
                      $scope.getPost($scope.postId);
                    } 

                  }
              }
              
            }).
            error(function(data){
        });
  };

  $scope.getPost = function(id){

    $http.get(
      "http://www.reddit.com/r/"+ $scope.subReddit +"/"+id+".json"
      ).
        success(function(redditPost){
              if(typeof redditPost[0].data !== 'undefined'){
                $scope.posts.push(redditPost[0].data.children[0]);
                $scope.activePost = $scope.posts.length-1;
                $scope.backgroundImage($scope.posts[$scope.activePost].data.title);
              } else {
                console.log('specific post failed to load');
              }
            }).
            error(function(data){
              console.log('Specific post failed to load because of a '+ data.error +' error.');
        });
    
  }

  $scope.getSubreddits = function(){
 
    $.getJSON("http://www.reddit.com/subreddits/mine/subscriber.json", function( postData ) { 
      if(typeof postData.data !== 'undefined'){
        var subreddits = postData.data.children; 
        console.log(subreddits);
      }
    });

  }

  $scope.backgroundImage = function(query){
  $.getJSON(
    ANIMATED_IMAGES_URL+escape(query)
    ,function(images){
      //Response back from google

      if (typeof images.responseData === 'undefined' || !images.responseData || images.responseData.results.length == 0){
        console.log('static!!!');
        $scope.staticRequest(query);
      }else{    
        $scope.doneLoading(images.responseData.results[0].unescapedUrl);
      }
    
    });
  }

  $scope.staticRequest = function(query){
    $.getJSON(
      STATIC_IMAGES_URL+escape(query)
      ,function( images ) { 
           if (typeof images.responseData === 'undefined' || images.responseData == null || images.responseData.results.length == 0) {
            $scope.doneLoading('fallback.jpg');
           }else{
            $scope.doneLoading(images.responseData.results[0].unescapedUrl);
          }           
      });

    }


  $scope.loading = function(){
    $("content").hide();
    $("div#loading").show();
    $("#wrapper").css({'background':'none'});
  }

  $scope.doneLoading = function(imgResult){
    $("content").show();
    $("div#loading").hide();
    $("#wrapper").css({'background':'url(' + imgResult + ') no-repeat top center', 'display':'none', 'background-size':'cover'}).fadeIn(300);
  }

  $scope.previous = function(){
    if($scope.activePost>0){
      $scope.activePost--;

    }
  }

  $scope.next = function(){
    if($scope.activePost<$scope.posts.length-1){
      $scope.activePost++;
    }
  }

 if(typeof $scope.subReddit !== 'undefined'){
    $scope.loading();
    $scope.getPosts();
  }

  
  $(document).keydown(function(e){
    if (e.keyCode == 39) { 
      $scope.next();
      
    }
    if (e.keyCode == 37) { 
        $scope.previous();
    }
  });


}
