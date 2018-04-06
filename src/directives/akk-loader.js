/*
 * Directive to display a loader
 * 
 * 
 */

'use strict';
angular.module('akkurate-design-system').directive('akkLoading', function () {
    return {
        templateUrl: 'templates/akk-loader.html',
        restrict: 'A',
        transclude: true,
        replace: true,
        scope: {
            loading: "="
        }
    };
});