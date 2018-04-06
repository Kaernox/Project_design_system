/**
 * directive use to calibrate modal when use on smartphone and 
 * other portable device.
 * 
 */

'use strict';
angular.module('akkurate-design-system').directive('akkAutoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
            }, 0);
        }
    };
});