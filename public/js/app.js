'use strict';

var app = angular.module('vader',[]);

app.controller('VaderSpeaks', ['$scope',  '$http', function($scope, $http) {
  	$scope.words = [
		'Apology',
		'Asyouwish',
		'Bidding',
		'breath',
		'Dontfailmeagain',
		'Everypartoftheship',
		'Force',
		'Heishere',
		'Ihaveyounow',
		'Iamyourfather'		
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