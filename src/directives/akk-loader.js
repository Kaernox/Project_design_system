/**
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: Directive to display a loader
 */

'use strict';
angular.module('akkurate-design-system').directive('akkLoader', function () {
    return {
        templateUrl: 'templates/akk-loader.html',
        restrict: 'AE',
        transclude: true,
        replace: true,
        scope: {
            loading: "="
        }
    };
});