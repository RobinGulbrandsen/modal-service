var mod = angular.module('modal-service', [
  'ui.bootstrap'
  ]);

mod.factory('modalService', ['$modal', modalService]);

function modalService($modal) {
  var template = {
    backdrop: 'static',
    windowClass: "modal-center"
  };

  return {

    /*
      title: Title of the modal
      message: Message to be displayed
      okFunction: Functionality before the window closes.
        If you only want to show a message, you can skip this parameter
    */
    messageDialog: function (title, message, okFunction) {
      template.templateUrl = 'modal-service/message-dialog.tpl.html';
      template.controller = function ($scope, $modalInstance) {
        $scope.title = title;
        $scope.message = message;

        $scope.ok = function () {
          if(okFunction !== undefined) {
            okFunction();    
          }

          $modalInstance.close();
        };
      };
      template.controller.$inject = ['$scope', '$modalInstance'];
      return $modal.open(template);
    },

    /*
      title: Title of the modal
      message: Message to be displayed
      okFunction: Functionality before the window closes with ok button.
        If you dont want functionality on the ok button, you can skip this paramter
      cancelFunction: Functionality before the window closes with cancel button.
        If you dont want functionality on the cancel button, you can skip this paramter
    */
    confirmDialog: function (title, message, okFunction, cancelFunction) {
      template.templateUrl = 'modal-service/confirm-dialog.tpl.html';
      template.controller = function ($scope, $modalInstance) {
        $scope.title = title;
        $scope.message = message;

        $scope.ok = function () {
          if(okFunction !== undefined) {
            okFunction();    
          }
          $modalInstance.close();
        };

        $scope.cancel = function() {
          if(cancelFunction !== undefined) {
            okFunction();    
          }
          $modalInstance.close();
        };
      };
      template.controller.$inject = ['$scope', '$modalInstance'];
      return $modal.open(template);
    },

    /*
      title: Title of the window
      formTemplate: URI to the form you wish to show to the user. The modal in
        in the form needs to be named 'formData' on scope to work
      okFunction: Functionality on the Ok button, this function needs to return
        true or false after the operations are done. True will close the window
      cancelFunction: Functionality before the window closes with cancel button.
        If you dont want functionality on the cancel button, you can skip this paramter 
    */
    formDialog: function (title, formTemplate, okFunction, cancelFunction) {
      template.templateUrl = formTemplate;
      template.controller = function ($scope, $modalInstance) {
        $scope.title = title;
        $scope.formData = {};

        $scope.ok = function () {
          var success = okFunction($scope.formData);    
          if(success) {
            $modalInstance.close();
          }
        };

        $scope.cancel = function() {
          if(cancelFunction !== undefined) {
            cancelFunction();    
          }
          $modalInstance.close();
        };
      };
      template.controller.$inject = ['$scope', '$modalInstance'];
      return $modal.open(template);
    }
  };
}