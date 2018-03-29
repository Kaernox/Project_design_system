/**
 * Manages a list of checkboxes
 * 
 */


'use strict';
angular.module('akkurate-design-system').directive('akkCheckboxList', [
    function () {
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
                scope.isValid = true;

                scope.checkValidity = function () {
                    scope.isValid = scope.model.length > 0;
                };

                // Find the index of an object in an array of objects
                function arrayObjectIndexOf(arr, obj) {
                    for (var i = 0; i < arr.length; i++) {
                        if (angular.equals(arr[i], obj)) {
                            return i;
                        }
                    }
                    ;
                    return -1;
                }

                // Init : Check the checkboxes that should be checked
                scope.optionChecked = [];
                var optionIndex = 0;
                angular.forEach(scope.options, function (value, key) {
                    if (angular.isObject(value) && scope.value == null) {   // If array of objects and result should contain objects
                        var i = arrayObjectIndexOf(scope.model, value);     // Try to find the object

                        if (i !== -1) {
                            scope.optionChecked[optionIndex] = true;        // If the item exists in the result, set checked at true
                        } else {
                            scope.optionChecked[optionIndex] = false;       // If the item doesn't exist in the result, set checked at false
                        }

                        optionIndex++;
                    } else if (angular.isObject(value) && scope.value != null) {    // If array of objects and result should contain values
                        var i = scope.model.indexOf(value[scope.value]);

                        if (i !== -1) {
                            scope.optionChecked[optionIndex] = true;
                        } else {
                            scope.optionChecked[optionIndex] = false;
                        }

                        optionIndex++;
                    } else {    // If array of primitive elements
                        var i = scope.model.indexOf(value);

                        if (i !== -1) {
                            scope.optionChecked[optionIndex] = true;
                        } else {
                            scope.optionChecked[optionIndex] = false;
                        }

                        optionIndex++;
                    }
                });

                // Save or remove an element
                scope.toggleElement = function (item) {
                    if (angular.isObject(item) && scope.value == null) {    // If array of objects and result should contain objects
                        var i = arrayObjectIndexOf(scope.model, item);      // Try to find the object

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
                };

            }
        };
    }
]);

