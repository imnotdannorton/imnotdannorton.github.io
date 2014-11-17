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
    		elem.bind('click', function(e){
    			//scope.emit('activeNav', e.target.id);
    			//$rootScope.activeItem(e.target.id);

    			//console.log(e.target.id);
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
  .directive('toggleVideo', function($rootScope){
    return{
      restrict:'A',
      link:function(scope, elem, attrs){
        scope.toggleVideo = attrs['toggleVideo'];
        elem.bind('click', function(e){
          $('.heroImage').html('<iframe width="100%" height="480" id="player" src="//www.youtube.com/embed/'+scope.toggleVideo+'" frameborder="0" allowfullscreen></iframe>');
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
          $('.heroImage').html('<img src="'+scope.toggleImage+'">');
        });
        
      }
    }
  })
  .directive('hoverZoom', function($rootScope){
    return{
      restrict:'A',
      link: function(scope, elem, attrs){
        var visible = false;
       $(elem).on('mouseover', function(event){
        //var offsetLeft = event.pageX;
        //offsetLeft = -offsetLeft;
        if(visible == false){
          $('#zoom').show(); 
          visible = true;
        }
       // $('.bigImg').css('margin-left', offsetLeft); 
        //console.log(-offsetLeft);
       });
       $(elem).on('mousemove', function(){
        var panScale = $('.bigImg').width() / $(elem).width();
        var vertOffset = ($('#zoom').height() - $('.bigImg').height())/2;
        var offsetLeft = event.pageX - $(elem).offset().left;
        if ($(elem).width() - offsetLeft > 180) {
          $('#zoom').css({'left': offsetLeft+180});
          offsetLeft = -offsetLeft*panScale;
        }else{
          $('#zoom').css({'left': offsetLeft-180});
          offsetLeft = -offsetLeft*panScale;
          offsetLeft += 210;
        }

        $('.bigImg').css({'margin-left': offsetLeft, 'margin-top':vertOffset}); 
        //console.log();
       });
       $(elem).on('mouseleave', function(){
        if(visible){
          $('#zoom').hide(); 
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
  .directive('fbComments', function(){
   return {
     restrict: 'E',
     template: '<div class="fb-comments fb" data-href="{{trustedHref}}"  data-width="{{maxWidth}}" data-numposts="5" data-colorscheme="light"></div>',
      link: function(scope, elem, attrs){
        console.log(elem);
        if(!attrs.page || attrs.page ===''){
          scope.page=window.document.URL;
        } else {
          scope.page = attrs.page;
        }
        if (!attrs.maxwidth || attrs.maxwidth==='') {
          scope.maxWidth = $(elem).parent().width() - 20;
        }else{
          scope.maxWidth = attrs.maxwidth;
        }
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
});

