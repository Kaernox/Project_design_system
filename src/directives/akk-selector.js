/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
angular.module('akkurate-design-system').directive('akkSelector', [
    function () {
        return {
            templateUrl: '/apps/brain/directives/templates/akk-selector.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@"
            }
        };
    }
]);
