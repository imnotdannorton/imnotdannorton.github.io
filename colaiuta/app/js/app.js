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
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomepageCtrl'});
  $routeProvider.when('/products', {templateUrl: 'partials/products.html', controller: 'ProductCtrl'});
  $routeProvider.when('/product/:id', {templateUrl: 'partials/products_single.html', controller: 'ProductCtrl'});
  $routeProvider.when('/products/:category', {templateUrl: 'partials/products_category.html', controller: 'ProductCtrl'});
  $routeProvider.when('/compare?', {templateUrl: 'partials/products_compare.html', controller: 'CompareCtrl'});
  $routeProvider.when('/artists', {templateUrl: 'partials/artists.html', controller: 'artistController'});
  $routeProvider.when('/search', {templateUrl: 'partials/results.html', controller:'headerController'});
  $routeProvider.when('/artists/:id', {templateUrl: 'partials/artists_single.html', controller: 'artistController'});
  $routeProvider.when('/features', {templateUrl: 'partials/features.html', controller: 'featureController'});
  $routeProvider.when('/feature/:id', {templateUrl: 'partials/features_single.html', controller: 'featureController'});
  $routeProvider.when('/dealers', {templateUrl: 'partials/dealers.html', controller: 'dealerController'});
  $routeProvider.when('/manufacturing', {templateUrl: 'partials/manufacturing.html', controller:'staticController'});
  $routeProvider.when('/stickselect', {templateUrl: 'partials/stickselect.html'});
  $routeProvider.otherwise({redirectTo: '/', templateUrl:'partials/home.html', controller: 'HomepageCtrl'});
 
}]);
//note ns() (global string prototype),
                    //this prepends uiGmap to 'google-maps', so it is really 'uiGmapgoogle-maps'
//angular.module('vaterDotcom', ['google-maps'.ns()]);
angular.module('vaterDotcom').value('ARTIST_IMAGE_PATH', 'http://vater.s3.amazonaws.com/artists/');
angular.module('vaterDotcom').value('PRODUCT_IMAGE_PATH', 'http://vater.s3.amazonaws.com/prods_retina/');
angular.module('vaterDotcom').value('PRODUCT_IMAGE_PATH_HIRES', 'http://vater.s3.amazonaws.com/products_fullres/');
angular.module('app.ui-map', ['ui.map']);