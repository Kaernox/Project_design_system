'use strict';
angular.module('akkurate-design-system').directive("akkTinymceFileModel", [
    '$rootScope',
    '$parse',
    function ($rootScope, $parse) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                element.bind('change', function () {
                    $rootScope.tinymce.uploadImage(element, element[0].files[0], attrs.parent);
                });
            }
        };
    }]);