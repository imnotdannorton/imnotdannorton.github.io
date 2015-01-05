'use strict';

/* Directives */


angular.module('vaterDotcom.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('navItem', function($rootScope) {
    return {
    	restrict:'A',
    	link:function(scope, elem, attrs){
    		//elem.bind('click', function(e){
    			//scope.emit('activeNav', e.target.id);
    			//$rootScope.activeItem(e.target.id);

    			//console.log(e.target.id);
    		//});
         $(elem).on('mouseenter', function(event){
          //console.log(event.target);
          $('ul.subnav').addClass('hidden');
          $(elem).children('ul.subnav').removeClass('hidden');
        });
         $(elem).children('ul.subnav').on('mouseleave', function(event){
          //console.log(event.target);
          $('ul.subnav').addClass('hidden');
        });
    	}
    };
  })
  .directive('product', function($rootScope){
    return{
      restrict:'C',
      link:function(scope,elem, attrs){
         // show/hide compare links
       $(elem).on('mouseenter', function(event){
        $(elem).find('.compare').fadeIn(200);
       });
       $(elem).on('mouseleave', function(event){
        $(elem).find('.compare').hide();
       });
     }
    }
   
  })
  .directive('toggleSidebar', function($rootScope) {
    return {
      restrict:'A',
      link:function(scope, elem, attrs){
        elem.bind('click', function(e){
          if( window.innerWidth <= 480){
            $('#mobileNav').toggleClass('active');
          }
        });
      }
    };
  })
  .directive('randomBg', function($rootScope){
    return{
      restrict:'A',
      link:function(scope, elem, attrs){
        var imgList = ['brushes', 'sticksbg', 'locator'];
        var randNum = Math.floor((Math.random() * imgList.length));
        var randImg = imgList[randNum];
        console.log(elem);
        console.log('rand: '+randNum);
        $(elem).css({'background':'url("img/'+randImg+'.jpg") no-repeat'});
        $(elem).css('background-size','cover');
      }
    }
  })
  .directive('fullscreenBg', function($rootScope){
    return{
      restrict:'A',
      scope:{'fullscreenBg':'='},
      link:function(scope, elem, attrs){
        scope.bg = scope.fullscreenBg;
        scope.$watch('fullscreenBg', function(){
          $(elem).css({'background':'url("'+scope.fullscreenBg+'") no-repeat'});
          $(elem).css('background-size','cover');
          $(elem).html('<div class="lightBox"></div>');
        });
        //$(elem).css({'background':'url("'+scope.fullscreenBg+'") no-repeat'});
        
      }
    }
  })
  .directive('clearWrapper', function(){
    return{
      restrict:'A',
      link: function(scope, elem, attrs){
        $('.contentWrapper').css({'background-color':'transparent', 'box-shadow':'none'});
      }
    }
  })
  .directive('toggleVideo', function($rootScope){
    return{
      restrict:'A',
      link:function(scope, elem, attrs){
       /* scope.toggleVideo = attrs['toggleVideo'];
        scope.showVid = true;*/
        elem.bind('click', function(e){
          scope.vidId = attrs['toggleVideo'];
          if(scope.showVid == false){
            scope.showVid = true;
          }
          console.log('showVid: '+scope.showVid);
         /* $('.heroImage').html('<youtube width="100%" height="480" id="'+scope.toggleVideo+'" frameborder="0" allowfullscreen></youtube>');
          $('iframe #player').on('click', function(){
            console.log('clicked vid');
            $('.artistStats').toggle();
          });*/
        });

        
      }
    }
  })
  .directive('toggleImage', function($rootScope){
    return{
      restrict:'A',
      link:function(scope, elem, attrs){
        scope.toggleImage = attrs['toggleImage'];
        elem.bind('click', function(e){
          if(scope.showVid){
            scope.showVid = false;
          }
          $('.heroImage img').attrs('<img src="'+scope.toggleImage+'">');
        });
        
      }
    }
  })
  .directive('hoverZoom', function($rootScope){
    return{
      restrict:'A',
      link: function(scope, elem, attrs){
        var visible = false;
       $(elem).on('mouseenter', function(event){
        //var offsetLeft = event.pageX;
        //offsetLeft = -offsetLeft;
        if(visible == false){
          $(elem).siblings('#zoom').show(); 
          visible = true;
        }
       // $('.bigImg').css('margin-left', offsetLeft); 
        //console.log(-offsetLeft);
       });
       $(elem).on('mousemove', function(event){
        var panScale = $(elem).siblings('#zoom').find('img').width() / $(elem).width();
        var vertOffset = ($(elem).siblings('#zoom').height() - $(elem).siblings('#zoom').find('img').height())/2;
        var offsetLeft = event.pageX - $(elem).offset().left;
        var offsetTop = event.pageY - $(elem).siblings('#zoom').height()/2;

        $(elem).siblings('#zoom').css({'top': offsetTop});
        if ($(elem).width() - offsetLeft > 180) {
          $(elem).siblings('#zoom').css({'left': offsetLeft+180});
          offsetLeft = -offsetLeft*panScale;
        }else{
          $(elem).siblings('#zoom').css({'left': offsetLeft-180});
          offsetLeft = -offsetLeft*panScale;
          offsetLeft += 210;
        }
        $(elem).siblings('#zoom').find('img').css({'margin-left': offsetLeft, 'margin-top':vertOffset}); 
        //console.log();
       });
       $(elem).on('mouseleave', function(){
        if(visible){
          $(elem).siblings('#zoom').hide(); 
          visible = false;
        }
       });

      }
    }
  })
  .directive('itemType', function($rootScope){
    return{
      restrict:'A',
      scope:{
        item:'@type'
      },
      link: function(scope, elem, attrs){
       //var item = attrs.type;
       console.log(scope.item);
        scope.myIcon = 'fa-twitter';
        scope.categories =[
          {type:'news', icon:'fa-rss'},
          {type:'education', icon:'fa-mortar-board'},
          {type:'artist', icon:'fa-user'},
          {type:'product', icon:'fa-star'},
          {type:'spotlight', icon:'fa-search'},
        ];
        for (var i = scope.categories.length - 1; i >= 0; i--) {
          if(scope.categories[i].type == scope.item){
            scope.myIcon = scope.categories[i].icon;
          }
        };
        elem.html('<i class="fa '+scope.myIcon+'"></i>');
      }

      
    }
  })
  .directive('storefooter', function(){
    return {
      restrict:'C',
      link:function(scope, elem, attrs){
        var images = ["storefooter_1.jpg", "storefooter_2.jpg", "storefooter_3.jpg"];
        $(elem).html('<a href="http://vater.com/store"><img src="http://vater.s3.amazonaws.com/assets/' + images[Math.floor(Math.random() * images.length)] + '"></a>');
      }
    }
  })
  .directive('fbComments', function(){
   return {
     restrict: 'E',
     template: '<script src="http://connect.facebook.net/en_US/all.js#xfbml=1"></script><fb:like layout="button_count" font="lucida grande"></fb:like></span>',
     //'<div class="fb-comments fb" data-href="{{trustedHref}}"  data-width="{{maxWidth}}" data-numposts="5" data-colorscheme="light"></div>',
      link: function(scope, elem, attrs){
        console.log(elem);
        if(!attrs.page || attrs.page ===''){
          scope.page=window.document.URL;
        } else {
          scope.page = attrs.page;
        }
        /*if (!attrs.maxwidth || attrs.maxwidth==='') {
          scope.maxWidth = $(elem).parent().width() - 20;
        }else{
          scope.maxWidth = $(elem).parent().width() - 20;
        }*/
        scope.maxWidth = $(elem).parent().width() - 20;
        //mobile check
        if( window.innerWidth < 400){
          scope.maxWidth = 300;
        }
        scope.trustedHref = scope.page;

        setTimeout(function(){
          FB.XFBML.parse();
        },1000);
  }


  };
})
.directive('youtube', ['youtubeEmbed', '$window', '$interval', '$rootScope', function(youtubeEmbed, $window, $interval, $rootScope){
  return {
    restrict: 'E',
    template: '<div id="player"></div>',
    scope: {
        state: '=',
        currentTime: '='
    },
    link: function(scope, element, attrs){
      //scope.playerState = 
      scope.currentTime = 0;
      console.log(youtubeEmbed);
      scope.createPlayer = function(attrs){
            if(scope.player) 
              scope.player.destroy();
            var controls = (attrs.controls) ? attrs.controls : 1;
            var autoplay = (attrs.autoplay) ? attrs.autoplay : 0;
            var player = new YT.Player('player', {
              height: attrs.height,
              width: attrs.width,
              videoId: attrs.id,
              playerVars: { 'autoplay': autoplay, 'controls': controls },
              });
            player.addEventListener("onStateChange", function(state){
              console.log("state", state);
              if(state.data==1){
                 $('.artistStats').fadeOut();
                scope.timer = $interval(function(){
                  if(scope.player)
                  scope.currentTime = scope.player.getCurrentTime();
                }, 250);
              }else{
                $('.artistStats').fadeIn();
                if(scope.timer){
                  $interval.cancel(scope.timer);
                }
              }
            });
            console.log(player);
            return player;
          }
      if($rootScope.youtubeLoaded === false){
        youtubeEmbed.yt().then(function(yt){
        console.log(yt);
        $window.onYouTubePlayerAPIReady = function(){

          $rootScope.youtubeLoaded = true;
          console.log("API Ready, creating player");
          scope.player = scope.createPlayer(attrs);

          

        }
      });
      }else{
        console.log("YT Already Loaded, not waiting for API");
         scope.player = scope.createPlayer(attrs);
      }
      scope.$watch(function(){ return attrs.id;}, function(newVal){
            var videoId = newVal;
            scope.player = scope.createPlayer(attrs);
          });

          scope.$on('$destroy', function() {
                // Make sure that the interval is destroyed too
                if(scope.timer){
                  $interval.cancel(scope.timer);
                  scope.timer = null;
                }
       });
    }
  };
}]);

