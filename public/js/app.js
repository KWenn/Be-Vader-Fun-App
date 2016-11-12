'use strict';

var app = angular.module('vader',[]);

app.controller('VaderSpeaks', ['$scope',  '$http', function($scope, $http) {
	
	$scope.vaderClips   = '';
	$scope.sortType     = 'name'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	
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
			url: el.clips
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