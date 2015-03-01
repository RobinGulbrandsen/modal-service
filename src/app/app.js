angular.module( 'app', [
	'templates-app',
	'templates-common',
	'modal-service',
	'ui.router'
	])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
	$urlRouterProvider.otherwise( '/' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, modalService ) {

	$scope.message = function() {
		modalService.messageDialog("Window Title", "Informative text", function() {
			console.log("Ok button clicked!");
		});
	};

	$scope.confirm = function() {
		modalService.confirmDialog("Window Title", "Are you sure?", function() {
			console.log("Ok button clicked!");
		}, function() {
			console.log("Cancel button clicked!");
		});
	};

	$scope.form = function() {
		modalService.formDialog("Window Title", "modal-service/form-dialog.tpl.html", function(formData) {
			formData.error = {};
			if(formData.name === undefined) {
				formData.error.name = " (Name can't be blank)";
			} else {
				modalService.messageDialog("Welcome", "Hello " + formData.name);
				return true;
			}
		});
	};

});