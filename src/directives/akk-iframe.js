/**
 * The Wizard directive 
 * 
 * A Wizard needs to be initialized with a data model.
 * It can search for an existing item, update it if found and create a new one.
 */
'use strict';
angular.module('akkurate-design-system').directive("akkIframe", function () {

    return {
        restrict: 'E',
        scope: {
            content: '='
        },

        link: function (scope, element, attrs) {
            var iframe = document.createElement('iframe');
            var element0 = element[0];
            element0.appendChild(iframe);
            var body = iframe.contentDocument.body;
            
            var iFrameHeight = 0;

            scope.$watch('content', function () {
                body.innerHTML = scope.content;
//                console.log(body.scrollHeight);
                $(iframe).css('height', (body.scrollHeight + 100) + 'px');
//                var height = document.body.scrollHeight;
//                iframe.height(document.body.scrollHeight);
            });
        }
    };
});