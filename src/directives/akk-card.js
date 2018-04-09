/**
 * directive use to manipulate the behavior of card
 * it let you choose the type and its content
 * 
 */

'use strict';
angular.module('akkurate-design-system').directive("akkCard",
        [
            '$rootScope',
            function ($rootScope) {
                return {
                    restrict: "E",
                    templateUrl: 'templates/akk-card.html',
                    transclude: true,
                    replace: true,
                    scope: {
                        title: "@",
                        content: "@",
                        media: "@",
                        options: "="
                    },
                    link: function postLink(scope, element, attrs) {
                        
                        scope.view = {
                        };
                        
                        scope.methods = {
                            init: function() {
                            },
                            action: function(option) {
                                $rootScope.$broadcast(option.event);
                            }
                        };
                        
                        scope.methods.init();
                    }
                };
            }
        ]);