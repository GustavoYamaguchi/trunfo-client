var app = angular.module('starter');

app.controller('MenuController', function($scope,$state) {

	var self = this
	self.mediaBackground = null;
	self.mediaClick = null;

	$scope.play = function() {
		self.mediaBackground = new Media("/android_asset/www/sound/menu.mp3", function () {
			   console.log("playAudio():Audio Success");
		},
		function (err) {
			console.log("playAudio():Audio Error: " );
			 console.log(err);
		}
		);
		self.mediaBackground.play();
	};

	self.playClick = function() {
		if(self.mediaClick !== null){
			self.mediaClick.stop();
		}
		self.mediaClick = new Media("/android_asset/www/sound/click.mp3", function () {
			   console.log("playAudio():Audio Success");
		},
		function (err) {
			console.log("playAudio():Audio Error: " );
			 console.log(err);
		}
		);
		self.mediaClick.play();
	};

 

	$scope.batalhar = function() {
		
		$state.go('game');
	};

	$scope.army = function() {
		self.playClick();
		console.log("ARMY");
	};

	$scope.shop = function() {
		self.playClick();
		console.log("SHOP");
	};

	$scope.credits = function() {
		self.playClick();
		console.log("CREDITS");
	};

	$scope.config = function() {
		$state.go('config');
		console.log("CONFIG");
	};

	$scope.exit = function() {
		
		$state.go('login');
	};
});