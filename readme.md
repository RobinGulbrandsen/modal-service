### Install Guide

Coming soon(tm)

### Info

When you need to display a message to the user, get confirmation or register data. Modal service will provide this functionality. The modal contains three sections, a header for title, a body for content and a footer for options. Use css/less to design this to make the modals a natural part of the application. Take a look at the *.tpl.htmls in app/modal-service/*tpl.html

The service is inspirated by JOptionPane for Java.

### How to Use

Add dependancy in your controller

    angular.module('app', ['modal-service'])
    .controller( 'AppCtrl', function AppCtrl ( $scope, modalService ) {

Now you can use the modals for general messages. There are three different types: messageDialog, confirmDialog and formDialog.

#### Message Dialog

A simple message with an Ok button. It takes 3 parameters, where the third is optional:
- Window title
- Message text
- Function to trigger before the window closes (optional)

If the function is not sendt, the window closes.

##### Where to Use

This dialog would be nice to use when you need to show the user a message. i.e. when you recieve an error code from the server.

##### Code sample

    modalService.messageDialog("Window Title", "Informative text", function() {
		console.log("Ok button clicked!");
	});

#### Confirm Dialog

Takes four paramters, where the third and fourth parameter is optional:
- Window title
- Message text
- Function to trigger before the window closes on Ok button (optional)
- Function to trigger before the window closes on Cancel button (Optional)

Default action for the buttons will be to close the modal

##### Where to Use

This dialog would be nice to use when you need the user to confirm an action. i.e. when the user wants to delete an item.

##### Code sample

	modalService.confirmDialog("Delete element", "Are you sure you want to delete?", function() {
		// Do http call to server to delete selected element
	});

The fourth parameter is skiped and the window will only close on Cancel action.

#### Form Dialog

Takes four paramters, where the fourth parameter is optional:
- indow title
- URI to the form you wish to present the user in the modal-body
- Function to trigger when Ok is clicked. It returns a boolean, true will close the window. This enables you to validate formdata before an action is made. It also takes an object as parameter. This is the formdata object.
- Function to trigger before the window closes on Cancel button (Optional)

##### Where to Use

This dialog would be nice to use when you need data from the user, but it's not needed with a form on the page, or an own page for this data.

##### Code sample

    modalService.formDialog("Window Title", "modal-service/form-dialog.tpl.html", function(formData) {
    	//Resets the error messages in the form
		formData.error = {};
		//Validate data in form
		if(formData.name === undefined) {
			//If the validation don't go through. Display error message
			formData.error.name = " (Name can't be blank)";
		} else {
			//Validation is okey. Here I show a welcome message
			modalService.messageDialog("Welcome", "Hello " + formData.name);
			//Returns true to close the formdialog
			return true;
		}
	});

### Credits

Thanks to J. Miller for the boilerplate used to set up bower and grunt in this project.
https://github.com/ngbp/ngbp