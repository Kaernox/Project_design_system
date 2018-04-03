/**
 * Manages a list of checkboxes
 * 
 */


'use strict';
angular.module('akkurate-design-system').directive('akkCheckboxList', [
    '$filter',
    function ($filter) {
        return {
            templateUrl: 'templates/akk-checkbox-list.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                req: "@",
                model: "=",
                options: "=",
                value: "@",
                display: "@",
                event: "@"
            },
            link: function (scope, element, attrs, ngModel) {
                scope.view = {
                    isValid: true
                };

                scope.methods = {
                    inModel: function (option) {
                        return $filter('inArray')(scope.model, option);
                    },
                    toggle: function (item) {
                        if (angular.isObject(item) && scope.value == null) {    // If array of objects and result should contain objects
                            var i = $filter('inArray')(scope.model, item);      // Try to find the object

                            if (i !== -1) {
                                scope.model.splice(i, 1);   // If the item exists in the result, remove it
                            } else {
                                scope.model.push(item);     // If the item isn't in the result, add it
                            }

                        } else if (angular.isObject(item) && scope.value != null) {   // If array of objects and result should contain values
                            var i = scope.model.indexOf(item[scope.value]);

                            if (i !== -1) {
                                scope.model.splice(i, 1);
                            } else {
                                scope.model.push(item[scope.value]);
                            }

                        } else {    // If array of values
                            var i = scope.model.indexOf(item);

                            if (i !== -1) {
                                scope.model.splice(i, 1);
                            } else {
                                scope.model.push(item);
                            }
                        }
                    },
                    checkValidity: function () {
                        scope.view.isValid = scope.model.length > 0;
                    }
                };

//                // Find the index of an object in an array of objects
//                function arrayObjectIndexOf(arr, obj) {
//                    for (var i = 0; i < arr.length; i++) {
//                        if (angular.equals(arr[i], obj)) {
//                            return i;
//                        }
//                    }
//                    ;
//                    return -1;
//                }

            }
        };
    }
]);

