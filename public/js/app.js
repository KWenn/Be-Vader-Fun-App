'use strict';

var app = angular.module('vader',['ui.router']);


app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/main');
    
    $stateProvider
        
        .state('dashboard', {
            url: '/main',
            templateUrl: './views/partial-dashboard.html',
            controller: 'VaderSpeaks'
        })
        
        //$locationProvider.html5Mode(true);      
});


app.controller('VaderSpeaks', ['$scope',  '$http', function($scope, $http) {
	
	$scope.vaderClips   = '';
	$scope.sortType     = 'popularity'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	
	$scope.cue = [
		'username1',
		'username2',
		'username3',
		'username4',
		'username5',
		'username6',
		'username7'
	];
	
	
	$scope.facebooklogin = function(){
		console.log("facebook login");
	}
	
	$scope.twitterlogin = function(){
		console.log("twitter login");
	}
	
	
  	$scope.words = [
		{title: 'Apology', contains: "put in full text here", popularity: 5},
		{title: 'Asyouwish', contains: "text", popularity: 2},
		{title: 'Bidding', contains: "text", popularity: 2},
		{title: 'breath', contains: "text", popularity: 2},
		{title: 'Dontfailmeagain', contains: "text", popularity: 2},
		{title: 'Everypartoftheship', contains: "text", popularity: 2},
		{title: 'Force', contains: "text", popularity: 2},
		{title: 'Heishere', contains: "text", popularity: 2},
		{title: 'Ihaveyounow', contains: "text", popularity: 2},
		{title: 'Iamyourfather', contains: "text", popularity: 2}	
	];
	
	$scope.playSound = function(el){
		var sound = {
			url: el.clip.title
		};
				
		$http({
	      method  : 'POST',
	      url     : 'http://localhost:3000',
	      data    : JSON.stringify(sound),
	      contentType: "application/json",
	    })
	    .success(function(data) {
	        if (data.errors) {
	          console.log("http send request failed");
	        } else {
	          console.log("http send request succeeded");
	        }
	    });
	}
}]);