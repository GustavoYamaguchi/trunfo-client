var app = angular.module('starter');

app.controller('LoginController', function ($scope, $state, $ionicModal, $ionicPopup, $ionicLoading, $firebaseAuth, $rootScope) {

	self = this;
	self.ref = new Firebase(firebaseUrl);
	self.auth = $firebaseAuth(self.ref);
	$scope.user = {};

	/**
	 * Make a modal for a new user
	 */
	$ionicModal.fromTemplateUrl("templates/signup.html", {
		scope: $scope
	}).then(function (modal) {
		$scope.modal = modal;
	});

	/**
	 * Function to login at the application
	 *
	 * @param user {Object} with user data trying to sign up
	 */
	$scope.login = function () {
		if (!_.isUndefined($scope.user.email)
			&& !_.isUndefined($scope.user.password)) {

			$ionicLoading.show({
				template: 'Signing Up...'
			});

			self.auth.$authWithPassword({
				email: $scope.user.email,
				password: $scope.user.password
			}).then(function(data) {
				$ionicLoading.hide();
				self.ref.child("users").child(data.uid).once("value", function(snapshot) {
					var val = snapshot.val();
					$scope.$apply(function() {
						$rootScope.user = val;
					});
				});
				$state.go("menu");
			}).catch(function(error) {
				showPopup("Authentication failed: " + error.message);
				$ionicLoading.hide();
			});
		} else {
			showPopup("Please enter your email and password")
		}
	};

	/**
	 * Function to create a new user
	 *
	 * @param user {Object} with user data trying to sign up
	 */
	$scope.createUser = function () {
		if (!_.isUndefined($scope.user.name)
			&& !_.isUndefined($scope.user.password) && !_.isUndefined($scope.user.name)) {
			$ionicLoading.show({
				template: 'Signing in...'
			});

			self.auth.$createUser({
				email: $scope.user.email,
				password: $scope.user.password
			}).then(function(data) {
				self.ref.child("users").child(data.uid).set({
					email: $scope.user.email,
					name: $scope.user.name
				});
				$ionicLoading.hide();
				showPopup("Welcome!").then(function(res) {
					$scope.modal.hide();
					$scope.user = {};
				});
			}).catch(function(error) {
				$ionicLoading.hide();
				showPopup(error.message);
			});
		} else {
			showPopup("Look all form");
		}
	};

	/**
	 * Show a popup for the user with a message
	 *
	 * @param message the message for the user
	 *
	 * @return {Object} ionic popup
	 */
	function showPopup(message) {
		var popup = $ionicPopup.alert({
			title: message
		});
		return popup;
	};
});