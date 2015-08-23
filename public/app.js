angular.module('articleApp', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode(true)

  $stateProvider

    .state('articles', {
      url: '/',
      templateUrl: './views/articles.html',
      controller: 'articleController'
    })

    .state('new', {
      url: '/new',
      templateUrl: './views/new.html',
      controller: 'newArticleController'
    });


  $urlRouterProvider.otherwise('/');

}])

.factory('apiService', ['$http', function($http) {
  return {
    index: function() {
      return $http.get('/api/articles')
      .then(function(response) {
        return response.data
      });
    },
    create: function(article) {
      $http.post('/api/articles', article)
    }
  }
}])

.controller('newArticleController', ['$http', '$scope', '$state', 'apiService', function($http, $scope, $state, apiService) {

  $scope.addArticle = function(article) {
    apiService.create(article);
    $state.go('articles');
  };

}])

.controller('articleController', ['$scope', '$http', 'apiService', function($scope, $http, apiService) {

  apiService.index()
  .then(function(response) {
    $scope.articles = response;
  });

  $scope.add = function(article) {
    console.log(article);
  };

  $http.get("http://www.omdbapi.com/?t=2001%20a%20space%20odyssey&tomatoes=true&plot=full")
  .then(function(response) {
    $scope.movie = response.data
  });
}]);
