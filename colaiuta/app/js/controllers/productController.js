'use strict';

/* Controllers */

angular.module('vaterDotcom').controller('ProductCtrl', ['$scope', '$rootScope', '$location', '$routeParams',  'resourcesService', 'PRODUCT_IMAGE_PATH', function($scope, $rootScope, $location, $routeParams, resourcesService, PRODUCT_IMAGE_PATH) {
    
    $scope.prodId = $routeParams.id;
    $scope.category = $routeParams.category;
    $scope.sortby = 'name'
    $scope.compareItems = [];
    $scope.prodLoading = $rootScope.loading;
    $scope.imgPath = PRODUCT_IMAGE_PATH;
    $scope.imgPathLrg = PRODUCT_IMAGE_PATH + '_fullres';
    $scope.showZoom = false;
    $scope.ascending = true;
    $scope.searchQuery = {};
    $scope.categories = {};
    $scope.catDescriptions = {
      'American_Hickory':"Hickory is the most popular wood used for making drumsticks. Hickory is denser, heavier and more rigid than Maple. Hickory can also absorb a great amount of shock, which reduces hand and wrist fatigue. Dark, or \"brown\" hickory, is found closer to the tree's center and is slightly denser and heavier than \"white\" hickory.",
      'Nude':"A line of drumsticks with no finish or lacquer. The unfinished sticks leave a comfortable sanded grip that is perfect for drummers who have problems with stick slippage due to hand sweat while performing.",
      'VXD':"Working in collaboration with some of Vater's big-name, up and coming endorsing artists, Vater has come up with a new series of sticks that will fill a big gap in the drumstick market. The new Xtreme Design Series models, XD-5A, XD-5B and XD-Rock, have been designed and manufactured to meet the great demand of drummers who have been asking for stick models in between the very popular Vater Power 5A/Power 5B models and the Rock model.<br/>The results are three extremely well balanced, weighted and responsive models that are available with a rounded barrel-style wood tip with nylon tip versions to match.",
      'Eternal_Black':"Vater is excited to introduce the Eternal Black Series, a line of drumsticks finished in a black stain. Stick models included in the Eternal Black Series are Vater's popular 5A, 5B, and Power 5B as well as three brand new models: Warrior, Punisher and Destroyer all of which were designed with hard hitting, aggressive drumming in mind. All Eternal Black Series models come in both wood and nylon tip.",
      'Gospel':"Under the direction of several Vater Artists including Gorden Campbell, Nisan Stewart, Cora Coleman-Dunham and Chris Johnson, Vater is the first drumstick company to introduce a line of drumsticks geared towards the Gospel Drumming genre.<br/><br/>Vater's Gospel Series consists of three Hickory models designed to meet the feel, weight and volume needs of Gospel drummers. The Gospel Series models measure in at 16.5\" for some extra length and three diameters to suit the variety of volume, dynamic and venues size challenges these drummers face. The round tip provides great cymbal clarity and rebound from around the drumkit.",
      'Sugar_Maple':"Sugar Maple brings out a mature, soft and sweet voice from drums and cymbals. Drummers can enjoy the feel of a big stick but without the weight of a Hickory model. The \"Sugar Maple Series\" of models is perfect for drummers who often find themselves having to play in smaller venues where low-volume is key. <br/><br/>Why Sugar Maple? Because of the Sugar Maple wood species' short growth season in the Northern regions of America, it is the most solid and dense of all Maple species. In fact, Sugar Maple is one of the strongest hardwoods in the world. These Sugar Maple properties combined with Vater's unique quick vacuum drying process, makes for a drumstick that is lightweight yet durable and exceptionally responsive. Unlike the commonly used heated kiln drying process that can take up to 4 weeks at temperatures of up to 120 degrees Fahrenheit, Vater's vacuum drying takes no more than 24 hours. Vacuum drying is a much more uniform and stable procedure, which results in a much whiter and more durable wood because of the lack of heat used to dry the wood.",
      'Cymbal_Sticks':"The Cymbal Stick models, which were originally designed and hand-turned in the mid 1950's by Jack Adams (Alan & Ron Vater's grandfather), have been recreated. These Maple models feature the same distinct tip shapes and specifications that gave drummers of the great jazz and big band era that unforgettable cymbal sound. Same as the originals did decades earlier, each of these four models gives their own unique voice on cymbals.",
      'Specialty_Sticks':"Each of Vater's Specialty Sticks were conceived and designed to cover as many different sound and feel variations as possible. These models are perfect for drummers & percussionists who often find themselves having to \"tone it down\".",
      'ColorWrap':"With high demand coming from young drummers, drum lines and theater / pit drummers, Vater has developed the new Color Wrap Series. The core of the Color Wrap Series is made up of Vater's extremely popular 5A, 5B and Power 5B wood tip models. Each model is available in Blue Sparkle, Gold Sparkle, Red Sparkle, Black Optic, Silver Optic and Purple Optic finishes. The eye-catching wraps themselves are high density without compromising the feel, weight and balance of the stick. Perfect for drummers looking to add an exciting visual aspect to their playing.",
      'Wire_Tap_Brushes':"Vater's \"Wire Tap\" Brushes feature a unique hard tap surface behind the brush-spread, which helps prevent excessive wear on brushes and drumheads. This feature allows for a more solid sound when striking the drum.",
      'Players_Design':"Working in collaboration with some of the world's largest drumming icons, Vater has created the \"Player's Design\" and \"International Player's Design\" Series'. These custom models are derived from each artist's unique and individual style. Under the direction of the artists themselves, through careful and extensive design and production planning, the end results are the models that you see here..."
    }
    /*
    American Hickory
    Accessories
    American_Hickory
    Bags
    BassDrum_Mallets
    BassDrum_Mallets2
    Beaters
    ChopBuilderPads
    Clothing_Accessories
    ColorWrap
    Concert_Marimba
    Concert_Vibraphone
    Concert_Xylophone
    Cymbal_Sticks
    Educational
    Eternal_Black
    GongMallet
    Gospel
    Int_Players_Design
    Marching_Marimba
    Marching_Sticks
    Marching_Vibraphone
    Marching_Xylophone
    Multi_Tenor_Mallets
    NoiseGuard
    Nude
    Players_Design
    PracticePads
    Retail
    Specialty_Sticks
    Sugar_Maple
    Timbale_Sticks
    Timbale_Sticks2
    Timpani_Mallets
    VXD
    Wire_Tap_Brushes



    */
    if(typeof $scope.prodId !== 'undefined'){
      resourcesService.fetchItem('product', $scope.prodId);
    }
    if(typeof $scope.category){
      //console
      var catString =$scope.category;
      /*if($scope.category == 'hickory'){
        catString = 'American_Hickory';
      } 
      if($scope.category == 'maple'){
        catString = 'Sugar_Maple';
      } */
      resourcesService.fetchByTag('products', catString);
    }else{
      resourcesService.fetchItem('products');
     
    }

    $scope.$on('productSuccess', function(event, data){
        $scope.product = data;
        $scope.processLinks($scope.product.sales_links_with_vendors);
        console.log($scope.product);
        if ($scope.product.artists.length>0) {
          $scope.processArtists($scope.product.artists);
        };
        // Change image path to default to wood
        console.log($scope.product.product_code);
        if($scope.product.product_code.indexOf('Nylon') > -1){
          $scope.product.images[0].name += '_w';
          $scope.product.product_code.replace('<br>', '/');

          console.log($scope.product.images[0].name); 
        }
        window.document.title = 'Vater Percussion | ' + $scope.product.name;
      });
    $scope.$on('productsSuccess', function(event, data){
        $scope.products = data;
        window.document.title = 'Vater Percussion | Products'
        console.log(data);

      });
    $scope.processLinks = function(object){
      angular.forEach(object, function(value, key){
        var obj = {};
        obj.link = value.url;
        if(value.category == '""'){
          value.category = 'Buy Now';
        }
        obj.type = value.category;
        if($scope.product.salesLinks == undefined){
          $scope.product.salesLinks = {};
        }
        if($scope.product.salesLinks[value.vendor.name] == undefined){
         $scope.product.salesLinks[value.vendor.name] = {};
         $scope.product.salesLinks[value.vendor.name].name = value.vendor.name;
         $scope.product.salesLinks[value.vendor.name].logo = value.vendor.logo_url;
         $scope.product.salesLinks[value.vendor.name].urls = [];
        }
        $scope.product.salesLinks[value.vendor.name].urls.push(obj);
        console.log($scope.product.salesLinks);
      });
    }
    $scope.$on('productsTag Success', function(event, data){
      
      $scope.products = data;
      angular.forEach($scope.products, function(value, key){
        for (var i = 0; i < value.tags.length; i++) {
          if(value.tags[i].set == 'category'){
            if($scope.categories[value.tags[i].name] == undefined){
              $scope.categories[value.tags[i].name] = {};
              $scope.categories[value.tags[i].name].desc = $scope.catDescriptions[value.tags[0].name]
              $scope.categories[value.tags[i].name].products = [];
              $scope.categories[value.tags[i].name].products.push(value); 
            }else{
              $scope.categories[value.tags[i].name].products.push(value); 
            }
          }
        };
      });

      console.log($scope.categories);
    });
    $scope.$on('artistSuccess', function(event, data){
      for (var i = 0; i < 5; i++) {
        if($scope.product.artists[i].id == data.id){
          $scope.product.artists[i] = data;
          if(data.images[0]){
            $scope.product.artists[i].image = data.images[0].url; 
          }
          //console.log($scope.product.artists[i]);
        }
      };
    });
    $scope.$watch('prodLoading', function(newVal, oldVal){
      console.log('updated: '+newVal);
      console.log('from: '+oldVal);
    });
    /*$(window).on('scroll', function(event){
      if($('body').scrollTop() > 150){
        $('.compareHolder').css({'position':'absolute', 'top':'120px', 'background-color':'#fff'});
      }else{

      }
    });*/
    // compare products
    $scope.clean = function(string){
      var newString = string.replace(/_/g, ' ');
      return newString;
    }
    $scope.swapSort = function(string){
      if (string.indexOf('-')>-1) {
        $scope.sortby = string.replace('-', '');
        $scope.ascending = true;
        $scope.descending = false;
      }else{
        $scope.sortby = '-'+string;
        $scope.ascending = false;
        $scope.descending = true;
      };
      console.log($scope.sortby);
    }
     $scope.compareThis = function(product){
      $scope.compareItems.push(product);
      $scope.buildComparison();
    }
    $scope.buildComparison = function(){
      $scope.compareLink = '/compare';
      angular.forEach($scope.compareItems, function(value, key){
        //console.log(this)
        key = key+1;
        $scope.searchQuery['id'+key] = value.id;
      });

      /*for (var i = 0; i < $scope.compareItems.length; i++) {
      var idString = (i+1 == 1) ? 'id'+(i+1)+'=' : '&id'+(i+1)+'=';
      $scope.searchQuery = $scope.searchQuery + idString+$scope.compareItems[i].id;
      };*/
      console.log($scope.searchQuery);

    }
    $scope.viewCompare = function(){
      //$location.search() = {};
      $location.path('compare').search($scope.searchQuery);
      
    }
    $scope.removeItem = function(id){
      console.log(id);
      $scope.compareItems.splice(id, 1);

      console.log($scope.compareItems);
      $scope.buildComparison();
     // $scope.$apply();
    }
    $scope.processArtists = function(array){
     for (var i = 0; i < array.length; i++) {
       resourcesService.fetchItem('artist', array[i].id);
     };
    }
    $scope.toCentimeters = function(value){
      var cm = parseFloat(value*2.54).toFixed(2);
      return cm;
    }
 }]);
