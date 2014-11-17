'use strict';


// Declare app level module which depends on filters, and services
angular.module('vaterDotcom', [
  'ngRoute',
  'ngSanitize',
  'vaterDotcom.filters',
  'vaterDotcom.directives',
  'vaterDotcom.controllers',
  'google-maps'.ns()
]).
config(['$routeProvider', function($routeProvider) {
  //$routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  //$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomepageCtrl'});
  $routeProvider.when('/products', {templateUrl: 'partials/products.html', controller: 'ProductCtrl'});
  $routeProvider.when('/products/:id', {templateUrl: 'partials/products_single.html', controller: 'ProductCtrl'});
  $routeProvider.when('/artists', {templateUrl: 'partials/artists.html', controller: 'artistController'});
  $routeProvider.when('/artists/:id', {templateUrl: 'partials/artists_single.html', controller: 'artistController'});
  $routeProvider.when('/features', {templateUrl: 'partials/features.html', controller: 'featureController'});
  $routeProvider.when('/dealers', {templateUrl: 'partials/dealers.html', controller: 'dealerController'});
  $routeProvider.otherwise({redirectTo: '/', templateUrl:'partials/home.html', controller: 'HomepageCtrl'});
 
}]);
//note ns() (global string prototype),
                    //this prepends uiGmap to 'google-maps', so it is really 'uiGmapgoogle-maps'
//angular.module('vaterDotcom', ['google-maps'.ns()]);
angular.module('vaterDotcom').value('ARTIST_IMAGE_PATH', 'http://vater.s3.amazonaws.com/artists/');
angular.module('vaterDotcom').value('PRODUCT_IMAGE_PATH', 'http://vater.s3.amazonaws.com/products/');
angular.module('vaterDotcom').value('PRODUCT_IMAGE_PATH_HIRES', 'http://vater.s3.amazonaws.com/products_fullres/');
angular.module('app.ui-map', ['ui.map']);

