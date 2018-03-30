angular.module('akkurate-design-system', [
    'ui.bootstrap',
    'ngSanitize',
//    'ngScrollbar',
//    'ngTagsInput',
//    'ngclipboard',
//    'ui.sortable',
//    'ui.tinymce',
//    'ui.codemirror',
    'ui-notification',
//    'angularMoment',
//    'angular-toolbox',
//    'angular-uib-alert',
//    'angularSelectSearch',
    'gettext',
//    'imageupload',
//    'truncate',
//    'slugifier',
    'color.picker',
//    'chart.js'
]);

angular.module('akkurate-design-system').config([
    'NotificationProvider',
    function (NotificationProvider) {
        /**
         * Notification default configuration
         */
        NotificationProvider.setOptions({
            delay: 3500,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    }
]);
angular.module('akkurate-design-system')
        .filter('inArray', function () {
            return function (array, value) {
                return array.indexOf(value) !== -1;
            };
        })
        .filter('getBy', function () {
            return function (input, field, value, toReturn) {
                var i = 0, len = input.length;
                for (; i < len; i++) {
                    if (input[i][field] == value) {
                        return (toReturn) ? input[i][toReturn] : input[i];
                    }
                }
                return null;
            };
        })
        .filter('getIndexBy', function () {
            return function (input, field, value, toReturn) {
                var i = 0, len = input.length;
                for (; i < len; i++) {
                    if (input[i][field] == value) {
                        return i;
                    }
                }
                return null;
            };
        })
        .filter('range', function () {
            return function (input, total) {
                total = parseInt(total);
                for (var i = 0; i < total; i++) {
                    input.push(i);
                }
                return input;
            };
        })
        .filter('ucfirst', function () {
            return function ucFirst(str) {
                if (str.length > 0) {
                    return str[0].toUpperCase() + str.substring(1);
                } else {
                    return str;
                }
            };
        })
        .filter('dateShortFormat', function ($filter) {
            return function (input) {
                if (input) {
                    var _date = $filter('date')(new Date(input), 'mediumDate');
                    return _date;
                } else {
                    return input;
                }
            };
        })
        .filter('timeFormat', function ($filter) {
            return function (input) {
                if (input) {
                    var _date = $filter('date')(new Date(input), 'shortTime');
                    return _date;
                } else {
                    return input;
                }
            };
        })
        .filter('formatBytes', function ($filter) {
            return function (bytes, decimals) {
                if (bytes == 0)
                    return '0 Byte';
                var k = 1000; // or 1024 for binary
                var dm = decimals + 1 || 3;
                var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                var i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            };
        })
        .filter('extensionIcon', function ($filter) {
            return function (extension) {
                var unknow = ['apk', 'sql'];
                if (extension == null || unknow.indexOf(extension.toLowerCase()) >= 0) {
                    return "css";
                }
                return extension.toLowerCase();
            };
        })
        .filter('searchAndDisplay', function ($filter) {
            return function (displayKey, array, searchKey, searchValue) {
                var value = $filter('getBy')(array, searchKey, searchValue, displayKey);
                if (value == null) {
                    return null;
                }
                return value;
            };
        })
        .filter('toArray', [function () {
                return function (obj, addKey) {
                    if (!angular.isObject(obj))
                        return obj;
                    if (addKey === false) {
                        return Object.keys(obj).map(function (key) {
                            return obj[key];
                        });
                    } else {
                        return Object.keys(obj).map(function (key) {
                            var value = obj[key];
                            return angular.isObject(value) ?
                                    Object.defineProperty(value, '$key', {enumerable: false, value: key}) :
                                    {$key: key, $value: value};
                        });
                    }
                };
            }])
        /**
         * Filter credential by typeName
         * 
         * @param {Credential[]} credentials 
         * @param {String} filterName   
         */
        .filter('credentialType', [function () {
                return function (credentials, filterName) {
                    var objects = [];
                    angular.forEach(credentials, function (a, b) {
                        if (a.type != null && a.type.name == filterName) {
                            objects.push(a);
                        }
                    });
                    return objects;

                };
            }])

        .filter('truncate', function () {
            return function (value, wordwise, max, tail) {
                if (!value)
                    return '';

                max = parseInt(max, 10);
                if (!max)
                    return value;
                if (value.length <= max)
                    return value;

                value = value.substr(0, max);
                if (wordwise) {
                    var lastspace = value.lastIndexOf(' ');
                    if (lastspace != -1) {
                        //Also remove . and , so its gives a cleaner result.
                        if (value.charAt(lastspace - 1) == '.' || value.charAt(lastspace - 1) == ',') {
                            lastspace = lastspace - 1;
                        }
                        value = value.substr(0, lastspace);
                    }
                }

                return value + (tail || ' …');
            };
        })

        .filter('nl2br', function ($sce) {
            return function (msg, is_xhtml) {
                var is_xhtml = is_xhtml || true;
                var breakTag = (is_xhtml) ? '<br />' : '<br>';
                var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
                return $sce.trustAsHtml(msg);
            };
        });
/**
 * the akkAction directive is use to validate.
 * 
 *
 */

'use strict';
angular.module('akkurate-design-system').directive("akkAcceptance", [
    '$rootScope',
    '$window',
    function ($rootScope, $window) {
        return {
            restrict: "E",
            templateUrl: 'templates/akk-acceptance.html',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                alignment: "@",
                elementclass: "@",
                req: "@",
                model: "=",
                property: "@",
                event: "@"
            },
            link: function postLink(scope, element, attrs) {

                scope.methods = {
                    change: function () {
                        scope.model[scope.property] = !scope.model[scope.property];

                        if (scope.event != null && scope.event != '') {
                            $rootScope.$broadcast(scope.event, scope.model);
                        }
                    }
                };

            }
        };
    }
]);
/**
 * the akkAlert is use when you use une alert
 * 
 */

'use strict';
angular.module('akkurate-design-system').directive("akkAlert",
        [
            '$rootScope', '$window',
            function ($rootScope, $window) {
                return {
                    restrict: "E",
                    templateUrl: 'templates/akk-alert.html',
                    transclude: true,
                    replace: true,
                    scope: {
                        title: "@",
                        message: "@",
                        icon: "@",
                        event: "@",
                        type: "@",
                        isDisplayed: "=",
                        isClosable: "="
                    },
                    link: function postLink(scope, element, attrs) {
                        
                        scope.view = {
                        };
                        
                        scope.methods = {
                            init: function() {
//                                scope.isDisplayed = true;
                            },
                            close: function() {
                                scope.isDisplayed = false;
                                console.log('close', scope.isDisplayed);

                                if (scope.event != null && scope.event != '') {
                                    $rootScope.$broadcast(scope.event);
                                }
                            }
                        };
                        
                        scope.methods.init();
                    }
                };
            }
        ]);
/**
 * 
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
/* 
 * directive qui gere une check box
 */


'use strict';
angular.module('akkurate-design-system').directive('akkCheckbox', [
    function () {
        return {
            templateUrl: 'templates/akk-checkbox.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                req: "@",
                model: "=",
                truevalue: "@",
                falsevalue: "@",
                onchange: "&"
            },
            link: function postLink(scope, element, attrs, ngModel) {
            }
        };
    }
]);

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


/*
 * directive qui premet de choisir et de changé la couleur
 * 
 */


'use strict';
angular.module('akkurate-design-system').directive("akkColorpicker",
        [
            '$rootScope', '$window',
            function ($rootScope, $window) {
                return {
                    restrict: "E",
                    templateUrl: 'templates/akk-colorpicker.html',
                    transclude: true,
                    replace: true,
                    scope: {
                        label: "@",
                        req: "@",
                        model: "=",
                        options: "=",
                        event: "@"
                    },
                    link: function postLink(scope, element, attrs) {

                        scope.view = {
                            options: angular.copy(scope.options),
                            isValid: true
                        };

                        scope.methods = {
                            checkValidity: function () {
                                scope.view.isValid = scope.model.length > 0;
                            },
                            change: function () {
                                scope.model[scope.property] = !scope.model[scope.property];

                                if (scope.event != null && scope.event != '') {
                                    $rootScope.$broadcast(scope.event, scope.model);
                                }
                            }
                        };

                        scope.events = {
                            onChange: function (api, color, $event) {},
                            onBlur: function (api, color, $event) {
                                scope.methods.checkValidity();
                            },
                            onOpen: function (api, color, $event) {},
                            onClose: function (api, color, $event) {},
                            onClear: function (api, color, $event) {},
                            onReset: function (api, color, $event) {},
                            onDestroy: function (api, color) {},
                        }
                    }
                };
            }
        ]);
/*
 * UI Directive for a datagrid
 */
'use strict';
angular.module('akkurate-design-system').directive("akkDatagrid", function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/akk-datagrid.html',
        transclude: true,
        replace: true,
        scope: {
            items: "=",
            columns: "=",
            event: "@"
        },
        link: function postLink(scope, element, attrs) {
            scope.view = {
                dimension: scope.columns[0],
                way: 'asc'
            };

            scope.methods = {
                sortBy: function (dimension, way) {
                    scope.view.dimension = dimension;
                    scope.view.way = way;
                },
                inverseWay: function (dimension) {
                    if(dimension == scope.view.dimension) {
                        if(scope.view.way == 'desc') {
                            return 'asc';
                        } else {
                            return 'desc';
                        }
                    } else {
                        return 'asc';
                    }
                },
                order: function () {
                    var way = scope.view.way == 'desc' ? '-' : '';
                    return way + scope.view.dimension;
                }
            };
        }
    };
});


 
'use strict';
angular.module('akkurate-design-system').directive("akkDatepicker",
        [
            '$rootScope',
            '$window',
            '$uibModal',
            'gettextCatalog',
            function ($rootScope, $window, $uibModal, gettextCatalog) {
                return {
                    restrict: "E",
                    templateUrl: 'templates/akk-datepicker.html',
                    transclude: true,
                    replace: true,
                    scope: {
                        label: "@",
                        req: "@",
                        model: "=",
                        event: "@"
                    },
                    link: function postLink(scope, element, attrs) {

                        scope.view = {
                            isValid: true
                        };

                        scope.methods = {
                            init: function () {
//                                console.log(scope.model);
//                                scope.view.isValid = scope.model.length > 0;
                            },
                            checkValidity: function () {
//                                scope.view.isValid = scope.model.length > 0;
                            },
                            clear: function () {
                                scope.model = null;
//                                console.log(scope.model);
                            },
                            datepicker: function () {
                                var modalInstance = $uibModal.open({
                                    templateUrl: 'templates/modals/akk-datepicker-modal.html',
                                    controller: [
                                        '$scope',
                                        '$uibModalInstance',
                                        'gettextCatalog',
                                        'Notification',
                                        'params',
                                        function ($scope, $uibModalInstance, gettextCatalog, Notification, params) {
                                            $scope.view = {
                                                title: params.title,
                                                datetime: params.datetime,
                                                datepickerOptions: {
                                                    minDate: params.mindate,
                                                    maxDate: params.maxdate,
                                                    showWeeks: false
                                                }
                                            };

                                            $scope.methods = {
                                                valid: function () {
                                                    if ($scope.view.datetime == null || $scope.view.datetime == "Invalid Date") {
                                                        Notification.error({message: gettextCatalog.getString('The date entered is invalid, please check.')});
                                                        return false;
                                                    }

                                                    $uibModalInstance.close($scope.view.datetime);
                                                },
                                                cancel: function () {
                                                    console.log('DATEPICKER CANCEL');
                                                    $uibModalInstance.dismiss('cancel');
                                                }
                                            };
                                        }
                                    ],
                                    windowClass: 'show modal-datetime-picker',
                                    resolve: {
                                        params: function () {
                                            return {
                                                title: gettextCatalog.getString('Date'),
                                                datetime: scope.model
                                            };
                                        }
                                    }
                                });
                                modalInstance.result.then(function (date) {
                                    scope.model = date;
//                                    console.log(scope.model);
                                });
                            },
                            change: function () {
                                scope.model[scope.property] = !scope.model[scope.property];

                                if (scope.event != null && scope.event != '') {
                                    $rootScope.$broadcast(scope.event, scope.model);
                                }
                            }
                        };

                        scope.events = {
                            onChange: function (api, color, $event) {},
                            onBlur: function (api, color, $event) {
                                scope.methods.checkValidity();
                            },
                            onOpen: function (api, color, $event) {},
                            onClose: function (api, color, $event) {},
                            onClear: function (api, color, $event) {},
                            onReset: function (api, color, $event) {},
                            onDestroy: function (api, color) {},
                        }

                        scope.methods.init();
                    }
                };
            }
        ]);
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
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
angular.module('akkurate-design-system').directive('akkInputInt', [
    function () {
        return {
            templateUrl: '/templates/akk-input-int.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                model: "=",
                max: "@",
                min: "@",
                step: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Set the model if null at the init
                if (scope.model == null && scope.min != null) {
                    scope.model = scope.min / 1;
                } else if (scope.model == null) {
                    scope.model = 0;
                }

                // Set a step if null at the init
                if (scope.step == null) {
                    scope.step = 1;
                }

                // Add 'step' to the model if the result isn't above max
                scope.add = function () {
                    if (scope.model / 1 + scope.step / 1 <= scope.max) {
                        scope.model = scope.model / 1 + scope.step / 1;
                    }
                };

                // Substract 'step' to the model if the result isn't under min & if there's a min
                scope.substract = function () {
                    if (scope.min != null && scope.model - scope.step >= scope.min || scope.min == null) {
                        scope.model -= scope.step;
                    }
                };

            }
        };
    }
]);

/* 
 * directive qui permet de rentré du text dans uen zone limité
 */


'use strict';
angular.module('akkurate-design-system').directive('akkInput', [
    function () {
        return {
            templateUrl: 'templates/akk-input.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                type: "@",
                step: "@",
                placeholder: "@",
                req: "@",
                hasError: "=",
                model: "=",
                event: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Watch the 'hasError' attribute 
                scope.$watch('hasError', function () {
                    scope.isValid = (scope.hasError == null || scope.hasError != true);
                });

                // Check for validity after the element has lost focus
                scope.checkValidity = function () {
                    scope.isValid = element[0].children[1].validity.valid;
                };
                if (scope.event != null && scope.event != '') {
                    $rootScope.$broadcast(scope.event, scope.model);
                };
            }
        };
    }
]);
/*
 * Directive to display a loader
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
'use strict';
angular.module('akkurate-design-system').directive("akkMultiselect", function ($uibModal) {
    return {
        restrict: 'E',
        templateUrl: 'templates/akk-multiselect.html',
        transclude: true,
        replace: true,
        scope: {
            label: "@",
            model: "@",
            placeholder: "@",
            items: "=",
            selected: "=",
            field: "@"
        },
        link: function postLink(scope, element, attrs) {

            scope.view = {
                label: scope.label,
                model: scope.model,
                placeholder: scope.placeholder,
                items: scope.items,
                selected: scope.selected,
                field: scope.field
            };

            scope.methods = {
                init: function () {
                },
                open: function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'templates/modals/akk-multiselect-modal.html',
                        controller: [
                            '$scope',
                            '$filter',
                            '$uibModalInstance',
                            'params',
                            function ($scope, $filter, $uibModalInstance, params) {

                                $scope.view = {
                                };

                                $scope.methods = {
                                    init: function () {
                                        $scope.view.placeholder = params.placeholder;
                                        $scope.view.items = angular.copy(params.items);
                                        $scope.view.selected = angular.copy(params.selected);
                                        $scope.view.field = params.field;
                                    },
                                    select: function (item) {
                                        var index = $filter('getIndexBy')($scope.view.items, 'id', item.id);
                                        $scope.view.selected.push(item);
                                        $scope.view.items.splice(index, 1);
                                    },
                                    unselect: function (item) {
                                        var index = $filter('getIndexBy')($scope.view.selected, 'id', item.id);
                                        $scope.view.items.push(item);
                                        $scope.view.selected.splice(index, 1);
                                    },
                                    close: function(){
                                        $uibModalInstance.dismiss('cancel');
                                    },
                                    cancel : function(){
                                        $scope.methods.close();
                                    }, 
                                    save : function(){
                                        $uibModalInstance.close({
                                            items : $scope.view.items,
                                            selected : $scope.view.selected
                                        });
                                    }
                                };



                                var xhr = {
                                };

                                $scope.methods.init();

                            }
                        ],
                        size: 'md',
                        windowClass: 'show modal-multiselect',
                        resolve: {
                            params: function () {
                                return {
                                    placeholder: scope.view.placeholder,
                                    items: scope.view.items,
                                    selected: scope.view.selected,
                                    field: scope.view.field
                                };
                            }
                        }
                    });
                    modalInstance.result.then(function (response) {
                        scope.view.items = response.items;
                        scope.view.selected = response.selected;
                    });
                }
            };

            scope.methods.init();
        }
    };
});


 
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
angular.module('akkurate-design-system').directive('akkRadio', [
    function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'templates/akk-radio.html',
            scope: {
                label: "@",
                elementclass: "@",
                req: "@",
                name: "@",
                model: "=",
                options: "=",
                property: "@",
                event: "@"
            },
            link: function postLink(scope, element, attrs) {
                scope.view = {
                    isValid: false
                }
                
                scope.methods = {
                    init: function() {
                        scope.methods.checkValidity();
                    },
                    select: function(option) {
                        scope.model = option[scope.property];
                        scope.methods.checkValidity();
                    },
                    checkValidity : function() {
                        if(scope.req) {
                            if(scope.model != null) {
                                scope.view.isValid = true;
                            } else {
                                scope.view.isValid = false;
                            }
                        } else {
                            scope.view.isValid = true;
                        }
                    }
                }
                
                scope.methods.init();
            }
        };
    }
]);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
angular.module('akkurate-design-system').directive('akkSelect', [
    '$rootScope',
    function ($rootScope) {
        return {
            templateUrl: 'templates/akk-select.html',
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
                event: "@",
                defaultDisplayEnabled: "@",
                defaultDisplay: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Check for validity after the element has lost focus
                // Change display if not valid
                scope.isValid = true;

                scope.defaultEnabled = (scope.defaultDisplayEnabled != null && scope.defaultDisplay != null) ? true : false;

                scope.methods = {
                    checkValidity: function () {
                        scope.isValid = element[0].children[1].validity.valid;
                    },
                    change: function () {
                        if (scope.event != null && scope.event != '') {
                            $rootScope.$broadcast(scope.event);
                        }
                    }
                };
            }
        };
    }
]);
/*
 * Directive pour ouvrir une modal, rechercher un item dans une liste et le selectionner
 * @return {int}
 */
'use strict';
angular.module('akkurate-design-system').directive('akkSelectandsearch', ['$rootScope', '$window', '$filter', '$uibModal',
    function ($rootScope, $window, $filter, $uibModal) {
        return {
            templateUrl: 'templates/akk-selectandsearch.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                options: "=",
                optionsType: "@",
                fields: "=",
                filterType: "@",
                filterBy: "@",
                placeholder: "@",
                hasError: "=",
                req: "@",
                model: "=",
                event: "@",
                add: "@",
                modalSize: "@",
                templateItem: "@",
                orderBy: "@"
            },
            link: function postLink(scope, element, attrs) {

                scope.view = {
                    keywords: '',
                    item: null,
                    template: {
                        item: 'default'
                    },
                    modal: {
                        size: 'sm'
                    },
                    display: false,
                    isValid: true
                };

                scope.methods = {
                    init: function () {
                        if (scope.templateItem) {
                            scope.view.template.item = scope.templateItem;
                        }

                        if (scope.modalSize) {
                            scope.view.modal.size = scope.modalSize;
                        }

                        if (angular.isDefined(scope.filterType) && angular.isDefined(scope.filterBy)) {
                            scope.options = $filter(scope.filterType)(angular.copy(scope.options), scope.filterBy);
                        }
//                        console.log('OPTIONS', scope.options);
                        scope.view.item = $filter('getBy')(scope.options, 'id', scope.model);
                    },
                    add: function () {
                        if (scope.add != null && scope.add != '') {
                            $rootScope.$broadcast(scope.add);
                        }
                    },
                    wizard: function () {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'templates/modals/akk-selectandsearch-modal.html',
                            controller: [
                                '$scope',
                                '$uibModalInstance',
                                'view',
                                function ($scope, $uibModalInstance, view) {

                                    $scope.view = angular.copy(view);
                                    $scope.view.orderBy = scope.orderBy;

                                    $scope.methods = {
                                        init: function () {
                                            if ($scope.view.item != null) {
                                                $scope.view.selected = true;
                                            }
                                        },
                                        select: function (item) {
                                            $scope.view.item = item;
                                            $scope.view.selected = true;
                                        },
                                        template: {
                                            get: function () {
                                                return view.template;
                                            }
                                        },
                                        valid: function () {
                                            $uibModalInstance.close($scope.view.item);
                                        },
                                        close: function () {
                                            $uibModalInstance.dismiss('cancel');
                                        }
                                    };

                                    $scope.$on('modal.closing', function (event, reason, closed) {
                                        if ($scope.view.selected) {
                                            $scope.view.item = null;
                                        }
                                        if (view.item == null && scope.req === true) {
                                            scope.view.isValid = false;
                                        }
                                    });
                                }],
                            size: scope.view.modal.size,
                            windowClass: 'show modal-select',
                            backdrop: true,
                            resolve: {
                                view: function () {
                                    return {
                                        item: scope.view.item,
                                        fields: scope.fields,
                                        selected: false,
                                        options: scope.options,
                                        template: 'templates/modals/akk-selectandsearch-modal-' + scope.view.template.item + '.html',
                                        placeholder: scope.placeholder
                                    };
                                }
                            }
                        });

                        // Get the element returned by the modal
                        modalInstance.result.then(function (item) {
                            scope.view.display = false;
                            if (item != null) {
                                scope.view.isValid = true;
                                if (angular.isDefined(scope.optionsType) && scope.optionsType === 'array') {
                                    scope.model.push(item);
                                } else {
                                    scope.model = item.id;
                                }
                                scope.view.item = item;

                                if (scope.event) {
                                    $rootScope.$broadcast(scope.event, item);
                                }
                            } else {
                                scope.view.isValid = false;
                            }
                        });
                    }
                };

                scope.methods.init();
            }
        };
    }
]);

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


'use strict';
angular.module('akkurate-design-system').directive('akkSelector', [
    function () {
        return {
            templateUrl: 'templates/akk-selector.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                req: "@",
                model: "=",
                property: "@",
                event: "@"
            }
        };
    }
]);

'use strict';
angular.module('akkurate-design-system').directive("akkSwitch",
        [
            '$rootScope', '$window',
            function ($rootScope, $window) {
                return {
                    restrict: "E",
                    templateUrl: 'templates/akk-switch.html',
                    transclude: true,
                    replace: true,
                    scope: {
                        label: "@",
                        alignment: "@",
                        elementclass: "@",
                        icon: "@",
                        req: "@",
                        model: "=",
                        property: "@",
                        event: "@"
                    },
                    link: function postLink(scope, element, attrs) {

                        scope.methods = {
                            change: function () {
                                scope.model[scope.property] = !scope.model[scope.property];

                                if (scope.event != null && scope.event != '') {
                                    $rootScope.$broadcast(scope.event, scope.model);
                                }
                            }
                        };

                    }
                };
            }
        ]);
/* 
 * directive qui permet de rentré et passé des grande portion de texte
 */
'use strict';
angular.module('akkurate-design-system').directive('akkTextarea', [
    function () {
        return {
            templateUrl: 'templates/akk-textarea.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                label: "@",
                elementclass: "@",
                size: "@",
                placeholder: "@",
                req: "@",
                model: "=",
                event: "@"
            },
            link: function postLink(scope, element, attrs, ngModel) {
                // Check for validity after the element has lost focus
                // Change display if not valid
                scope.isValid = true;

                scope.checkValidity = function () {
                    scope.isValid = element[0].children[1].validity.valid;
                };
                if (scope.event != null && scope.event != '') {
                    $rootScope.$broadcast(scope.event, scope.model);
                };
            }
        };
    }
]);


/* 
 * directives who create a tree using a model 
 * checkbox and toggle are implement
 * you can open-closed all and check-uncheck all
 */
'use strict';
angular.module('akkurate-design-system').directive('akkTree', [
    '$rootScope',
    '$window',
    '$filter',
    'AkkTreeManager',
    function ($rootScope, $window, $filter, AkkTreeManager) {
        return {
            restrict: "E",
            templateUrl: 'templates/akk-tree.html',
            transclude: true,
            replace: true,
            scope: {
                title: "@",
                items: "=",
                model: "=",
                options: "=",
                event: "@"
            },
            link: function postLink(scope, element, attrs) {
                scope.view = {
                    items: null,
                    title: null
                };
                scope.methods = {
                    init: function () {
                        if (scope.items) {
                            scope.view.items = scope.items;
                        }
                        if (scope.title) {
                            scope.view.title = scope.title;
                        }

                        AkkTreeManager.setTree(scope.model, scope.items, scope.options);
                    },
                    /*
                     * verify if exist in array
                     * yes -> you remove it
                     * no -> you add it
                     * @value is use for isChecked
                     */
                    check: function (item) {
                        var value;
                        if ($filter('getBy')(scope.model, 'value', item.value)) {
                            var itemIndex = $filter('getIndexBy')(scope.model, 'value', item.value);
                            scope.model.splice(itemIndex, 1);
                            value= item.isChecked = false;
                            
                        } else {
                            scope.model.push({label: item.label, value: item.value});
                            value= item.isChecked = true;
                        }

                        AkkTreeManager.recursiveCheckVerif( [item], value, false);
                        
                        if (scope.event != null && scope.event != ''){
                            $rootScope.$broadcast(scope.event, scope.model);
                        }
                        
                        scope.model = AkkTreeManager.getValues();
                    },
                    expandAll: function () {
                        AkkTreeManager.expandAll();
                        scope.view.items = AkkTreeManager.getTree();
                    },
                    inpandAll: function () {
                        AkkTreeManager.inpandAll();
                        scope.view.items = AkkTreeManager.getTree();
                    },
                    selectAll: function () {
                        AkkTreeManager.selectAll();
                        scope.view.items = AkkTreeManager.getTree();
                        scope.model = AkkTreeManager.getValues();
                    },
                    unselectAll: function () {
                        AkkTreeManager.unselectAll();
                        scope.view.items = AkkTreeManager.getTree();
                        scope.model = AkkTreeManager.getValues();
                    },
                    debug: function () {
                        console.log(AkkTreeManager.getTree());
                        console.log(scope.view.items);
                    }
                };

                scope.methods.init();
            }
        };
    }
]);
/*
 * directive for inside the ng-foreach 
 * he have thr "akkTree" directive has parents.
 * 
 */
'use strict';
angular.module('akkurate-design-system').directive('akkTreeItem', [
    '$rootScope',
    '$window',
    '$filter',
    'AkkTreeManager',
    function ($rootScope, $window, $filter, AkkTreeManager) {

        return {
            restrict: "E",
            templateUrl: 'templates/akk-tree-item.html',
            transclude: true,
            replace: true,
            scope: {
                item: "="
            },
            link: function postLink(scope, element, attrs) {
                scope.view = {
                    item: null
                };
                scope.methods = {
                    init: function () {
                        if (scope.item) {
                            scope.view.item = scope.item;
                        }
                        if (scope.isShown) {
                            scope.view.isShown = scope.isShown;
                        }
                    },
                    check: function (item) {
                        scope.$parent.methods.check(item);
                    },
                    select: function (item) {
                        scope.$parent.methods.select(item);
                    },
                    unselect: function (item) {
                        scope.$parent.methods.unselect(item);
                    },
                    toggle: function (item) {
                        if (item.isShown == undefined) {
                            item.isShown = false;
                        }
                        item.isShown = !item.isShown;
                    }
                };

                scope.methods.init();
            }
        };
    }
]);


'use strict';
angular.module('akkurate-design-system').service('AkkTreeManager', [
    '$rootScope',
    '$window',
    '$filter',
    function ($rootScope, $window, $filter) {
        /*
         * check recursively in the scope and update mostly
         * for the toggle all and the check all
         * @data is use for isChecked and isPartialyChecked
         */
        var recursiveUpdate = function (tree, property, value, selected) {

            var nbCheck = 0;
            var data = {
                isChecked:false,
                isPartialyChecked: false
            };
            angular.forEach(tree, function (item, key) {
                var sonData = {
                    isChecked:false,
                    isPartialyChecked: false
                };
                if (item.childs != undefined && item.childs.length > 0) {
                    sonData = recursiveUpdate(item.childs, property, value, selected);
                }
                if (selected == 'all') {
                    item[property] = value;
                } else if ($filter('getBy')(selected, 'value', item.value)) {
                    item[property] = value;
                }
                if(item.isChecked || sonData.isChecked || sonData.isPartialyChecked) {
                    if(sonData.isPartialyChecked) {
                        item.isPartialyChecked = true;
                        item.isChecked = false;
                    }
                    else {
                        item.isPartialyChecked = false;
                        item.isChecked = true;
                        if(Array.isArray(selected) && !$filter('getBy')(selected, 'value', item.value)) {
                            var topush = angular.copy(item);
                            delete topush.isShown;
                            delete topush.isChecked;
                            delete topush.childs;
                            delete topush.isPartialyChecked;
                            
                            selected.push(topush);
                        }
                    } 
                    nbCheck++;
                }
            });
            
            if(nbCheck === tree.length) {
                data.isChecked = true;
            }
            else if(nbCheck > 0 && nbCheck < tree.length) {
                data.isPartialyChecked = true;
            }
            
            return data;
        };
        /*
         * check recursively in all the tree and update
         * the checkbox and update if its partialy checked
         * @data is use for isChecked and isPartialyChecked
         */
        var _recursiveCheckVerif = function (tree, selected, value, isSonOf) {

            var nbCheck = 0;
            var data = {
                isChecked:false,
                isPartialyChecked: false
            };
            angular.forEach(tree, function (item, key) {
                var sonData = {
                        isChecked:false,
                        isPartialyChecked: false
                    },
                    localIsSonOf = isSonOf;
                    
                if ($filter('getBy')(selected, 'value', item.value) || isSonOf) {
                    item.isChecked = value;
                    sonData.isChecked = value;
                    localIsSonOf = true;
                }
                if (item.childs != undefined && item.childs.length > 0) {
                    sonData = _recursiveCheckVerif(item.childs,selected, value, localIsSonOf);
                }
                if(item.isChecked || sonData.isChecked || sonData.isPartialyChecked) {
                    if(sonData.isPartialyChecked) {
                        item.isPartialyChecked = true;
                        item.isChecked = false;
                    }
                    else {
                        item.isPartialyChecked = false;
                        item.isChecked = true;
                    } 
                    nbCheck++;
                }
                else {
                    item.isPartialyChecked = false;
                    item.isChecked = false;
                }
            });

            if(nbCheck === tree.length) {
                data.isChecked = true;
            }
            else if(nbCheck > 0 && nbCheck < tree.length) {
                data.isPartialyChecked = true;
            }
            
            return data;
        };
        
        /*
         * recuperate the information of the model
         * and put it in the var collection
         * @topush is use to update the model
         */
        var recursiveGet = function (tree, collection) {
            angular.forEach(tree, function (item, key) {

                if (item.isChecked == true) {
                    var topush = angular.copy(item);
                    delete topush.isShown;
                    delete topush.isChecked;
                    delete topush.childs;
                    delete topush.isPartialyChecked;
                    collection.push(topush);
                }

                if (item.childs != undefined && item.childs.length > 0) {
                    collection = (recursiveGet(item.childs, collection));
                }
            });

            return collection;
        };

        return {
            tree: [],
            getTree: function () {
                return this.tree;
            },
            getValues: function () {
                return recursiveGet(this.tree, []);
            },
            setTree: function (selecteds, tree, options) {
                this.tree = tree;

                if (selecteds.length > 0) {
                    recursiveUpdate(tree, 'isChecked', true, selecteds);
                }
            },
            expandAll: function () {
                recursiveUpdate(this.tree, 'isShown', true, 'all');
            },
            inpandAll: function () {
                recursiveUpdate(this.tree, 'isShown', false, 'all');
            },
            selectAll: function () {
                recursiveUpdate(this.tree, 'isChecked', true, 'all');
            },
            unselectAll: function () {
                recursiveUpdate(this.tree, 'isChecked', false, 'all');
            },
            recursiveUpdate: recursiveUpdate,
            recursiveCheckVerif: function(selected, value, isSonOf) {
                _recursiveCheckVerif(this.tree, selected, value, isSonOf);
            }
        };
    }]);
angular.module('akkurate-design-system').run(['$templateCache', function($templateCache) {$templateCache.put('templates/akk-acceptance.html','<div class="form-group form-acceptance" ng-class="elementclass" ng-click="methods.change()">\n    <span class="check">\n        <i class="material-icons text-primary" ng-if="model[property]">check_box</i>\n        <i class="material-icons" ng-if="!model[property]">check_box_outline_blank</i>\n    </span>\n    <label>\n        {{label | translate}}\n    </label>\n</div>');
$templateCache.put('templates/akk-alert.html','<div data-ng-show="isDisplayed">\n    <div class="alert" role="alert" data-ng-class="type ? \'alert-\' + type : \'alert-dark\'">\n        <div class="d-flex align-items-center">\n            <i class="material-icons mr-1 align-self-start" data-ng-bind="icon" data-ng-if="icon"></i>\n            <span data-ng-if="icon">&nbsp;&nbsp;&nbsp;</span>\n            <div>\n                <h4 class="alert-heading" data-ng-if="title">{{title}}</h4>\n                <div data-ng-bind-html="message"></div>\n            </div>\n            <i class="material-icons align-self-start ml-auto" ng-if="isClosable" data-ng-click="methods.close()">clear</i>\n        </div>\n    </div>\n</div>');
$templateCache.put('templates/akk-checkbox-list.html','<div class="form-group {{!isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label"><i ng-if="!isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup></label>\n    <div class="checkbox {{elementclass}}" ng-repeat="option in options track by $index">\n        <label>\n            <input type="checkbox" id="{{option}}" ng-model="optionChecked[$index]" ng-change="toggleElement(option)" ng-required="{{req}}" ng-click="checkValidity()">\n            {{display != null ? option[display] : option}}\n        </label>\n    </div>\n</div>');
$templateCache.put('templates/akk-checkbox.html','<div class="checkbox {{elementclass}}">\n    <label>\n        <input type="checkbox" ng-model="model" ng-true-value="{{truevalue != null ? truevalue : true}}" ng-false-value="{{falsevalue != null ? falsevalue : false}}" ng-change="onchange()"> {{label}}\n    </label>\n</div>');
$templateCache.put('templates/akk-colorpicker.html','<div class="form-group form-colorpicker" ng-class="!view.isValid ? \'has-error\' : \'\'">\n    <label class="control-label">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup>\n    </label>\n    <div class="form-container">\n        <div class="icon">\n            <i class="material-icons md-18">color_lens</i>\n        </div>\n        <color-picker\n            ng-model="model"\n            options="view.options"\n            event-api="events"\n            ></color-picker>\n    </div>\n</div>');
$templateCache.put('templates/akk-datagrid.html','<div>\n    <table class="table table-vertical-center" ng-if="items.length">\n        <thead>\n            <tr>\n                <th ng-repeat="column in columns" ng-click="methods.sortBy(column, methods.inverseWay(column))">\n                    {{column | translate}}\n                    <i ng-if="view.dimension == column && view.way == \'desc\'" class="material-icons">arrow_downward</i>\n                    <i ng-if="view.dimension == column && view.way == \'asc\'" class="material-icons">arrow_upward</i>\n                    <i ng-if="view.dimension != column" class="material-icons text-muted">arrow_drop_down</i>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr ng-repeat="item in items | orderBy: methods.order()">\n                <td ng-repeat="column in columns">{{item[column]}}</td>\n            </tr>\n        </tbody>\n    </table>\n    <akk-alert title="{{\'Aucun r\xE9sultat trouv\xE9 !\' | translate}}" ng-if="!items.length"></akk-alert>\n    <hr />\n<!--     <pre>{{view | json}}</pre>\n    <pre>{{items | json}}</pre> -->\n</div>');
$templateCache.put('templates/akk-datepicker.html','<div class="form-group {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label" ng-if="label">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i>\n        {{label}}\n        <sup ng-if="req">*</sup>\n    </label>\n    <div class="form-control d-flex align-items-center justify-content-between">\n        <span class="input-search" ng-if="model != null" ng-click="methods.datepicker()">\n            {{model | dateShortFormat}}\n        </span>\n        <em ng-if="model == null" class="text-secondary" ng-click="methods.datepicker()">{{\'Ind\xE9fini\' | translate}}</em>\n        <i class="material-icons md-24 ml-auto" ng-click="methods.datepicker()">event</i>\n        <i class="material-icons md-24 ml-1" ng-if="model != null" ng-click="methods.clear()">clear</i>\n    </div>\n</div>');
$templateCache.put('templates/akk-input-int.html','<div class="form-group well {{elementclass}}">\n    <div class="row">\n        <div class="col-md-6">\n            <p>{{label}}</p>\n        </div>\n        <div class="col-md-2">\n            <button type="button" class="btn btn-link" ng-click="substract()">\n                <i class="material-icons">remove</i>\n            </button>\n        </div>\n        <div class="col-md-2">  \n            <p>{{model}}/{{max}}</p>\n        </div>\n        <div class="col-md-2">\n            <button type="button" class="btn btn-link" ng-click="add()">\n                <i class="material-icons">add</i>\n            </button>\n        </div>\n    </div>\n</div>');
$templateCache.put('templates/akk-input.html','<div class="form-group" ng-class="!isValid ? \'has-error\' : \'\'">\n    <label class="control-label"><i ng-if="!isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup></label>\n    <input type="{{type}}" class="form-control" ng-class="elementclass" placeholder="{{placeholder}}" step="{{step}}" ng-model="model" ng-required="{{req}}" ng-blur="checkValidity()"/>\n</div>');
$templateCache.put('templates/akk-loader.html','<div>\n    <div ng-show="loading" app-block="loading">\n        <div class="spinner">\n            <div class="bounce1"></div>\n            <div class="bounce2"></div>\n            <div class="bounce3"></div>\n        </div>\n        <div>{{\'Loading...\' | translate}}</div>\n    </div>\n    <div ng-show="!loading" ng-transclude></div>\n</div>');
$templateCache.put('templates/akk-multiselect.html','<div class="form-group">\n    <label class="control-label" ng-if="view.label">{{view.label}}</label>\n    <div class="form-control" ng-click="methods.open()">\n        <div class="pull-right">\n            <i class="material-icons md-18">arrow_drop_down</i>\n        </div>\n        <span ng-if="view.selected.length">\n            {{view.selected.length}} {{view.model}} <span class="translate"> selected</span>\n        </span>\n        <span ng-if="!view.selected.length" class="placeholder">{{view.placeholder}}</span>\n    </div>\n</div>');
$templateCache.put('templates/akk-radio.html','<div class="form-group form-radio {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label"><i data-ng-if="!view.isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup></label>\n    <div class="d-flex align-items-center {{elementclass}}" data-ng-repeat="option in options track by $index" data-ng-click="methods.select(option)">\n        <div data-ng-if="model == option[property]"><i class="material-icons text-primary">radio_button_checked</i></div>\n        <div data-ng-if="model != option[property]"><i class="material-icons text-muted">radio_button_unchecked</i></div>\n        <div class="ml-1">{{option.name}}</div>\n    </div>\n</div>\n');
$templateCache.put('templates/akk-select.html','<div class="form-group {{!isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label"><i ng-if="!isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup></label>\n    <select class="form-control {{elementclass}}" ng-options="option{{value != null ? \'[value]\' : \'\'}} as option{{display != null ? \'[display]\' : \'\'}} for option in options{{value == null && display != null ? \' track by option.id\' : \'\'}}" ng-model="model" ng-required="{{req}}" ng-blur="methods.checkValidity()" ng-change="methods.change()">\n        <option value="" ng-if="defaultDisplayEnabled" selected>{{defaultDisplay}}</option>\n    </select>\n</div>\n');
$templateCache.put('templates/akk-selectandsearch.html','<div class="form-group {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label" ng-if="label">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i>\n        {{label}}\n        <sup ng-if="req">*</sup>\n    </label>\n    <div class="form-control d-flex align-items-center justify-content-between">\n        <input type="hidden" ng-model="view.item.id" ng-required="{{req}}" />\n        <span class="input-search" ng-if="view.item != null" ng-click="methods.wizard()">\n            <span ng-repeat="field in fields"><span ng-if="!view.item[field]">{{field}}</span><span ng-if="view.item[field]">{{view.item[field]}}</span></span>\n        </span>\n        <em ng-if="view.item == null" class="text-secondary" ng-click="methods.wizard()">{{placeholder}}</em>\n        <i class="material-icons md-24 ml-auto" ng-click="methods.wizard()" role="button">more_horiz</i>\n        <i class="material-icons md-24 ml-1" ng-if="add != null" ng-click="methods.add()">add</i>\n    </div>\n</div>');
$templateCache.put('templates/akk-selector.html','<div class="form-group {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label" ng-if="label">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i>\n        <sup ng-if="req">*</sup>\n    </label>\n    <div class="form-control d-flex align-items-center justify-content-between">\n        <input type="hidden" ng-model="view.item.id" ng-required="{{req}}" />\n        <span class="input-search" ng-if="view.item != null" ng-click="methods.wizard()">\n            {{model[property]}}\n        </span>\n        <em ng-if="view.item == null" class="text-secondary" ng-click="methods.wizard()">{{placeholder}}</em>\n        <i class="material-icons md-24 ml-auto" ng-click="methods.wizard()" role="button">keyboard_arrow_right</i>\n    </div>\n</div>');
$templateCache.put('templates/akk-switch.html','<div class="form-group form-switch {{elementclass}}" ng-click="methods.change()">\n    <div ng-class="!alignment ? \'pull-right\' : alignment;">\n        <div class="ng-class: model[property] == true ? \'switch-active\' : \'\'; switch-box">\n            <div class="switch-handle"></div>\n        </div>\n    </div>\n    <label ng-class="!alignment ? \'\' : \'\'; alignment == \'center\' ? \'hide\' : alignment;">\n<!--        <input type="hidden" ng-model="model[property]" ng-true-value="{{truevalue != null ? truevalue : true}}" ng-false-value="{{falsevalue != null ? falsevalue : false}}" ng-required="{{req}}" />-->\n        {{label | translate}}\n    </label>\n</div>');
$templateCache.put('templates/akk-textarea.html','<div class="form-group" ng-class="!isValid ? \'has-error\' : \'\'">\n    <label class="control-label"><i ng-if="!isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup></label>\n    <textarea class="form-control" ng-class="elementclass" placeholder="{{placeholder}}" ng-model="model" rows="{{size}}" ng-required="{{req}}" ng-blur="checkValidity()"></textarea>\n</div>');
$templateCache.put('templates/akk-tree-item.html','<li ng-class="view.item.childs != undefined ? \'has-child\' : \'\'" class="tree-item d-flex flex-column">\n    <div class="d-flex align-items-center">\n        <i ng-if="view.item.childs && view.item.childs.length > 0 && view.item.isShown" ng-click="methods.toggle(view.item)" class="material-icons">expand_more</i>\n        <i ng-if="view.item.childs && view.item.childs.length > 0 && !view.item.isShown" ng-click="methods.toggle(view.item)" class="material-icons">chevron_right</i>\n        <i ng-if="!view.item.childs || view.item.childs.length == 0" ng-click="methods.toggle(view.item)" class="material-icons text-muted">bookmark</i>\n        \n        <i ng-if="view.item.isChecked" ng-click="methods.check(view.item)" class="material-icons text-primary">check_box</i>\n        <i ng-if="view.item.isPartialyChecked && !view.item.isChecked" ng-click="methods.check(view.item)" class="material-icons text-muted">indeterminate_check_box</i>\n        <i ng-if="!view.item.isChecked  && !view.item.isPartialyChecked" ng-click="methods.check(view.item)" class="material-icons text-muted">check_box_outline_blank</i>\n        \n        <a href="javascript:;" ng-if="view.item.childs && view.item.childs.length > 0" ng-click="methods.toggle(view.item)">\n            {{view.item.label}}\n        </a>\n        \n        <span ng-if="view.item.childs && view.item.childs.length > 0">\n            ({{view.item.childs.length}})\n        </span>\n        \n        <span ng-if="!view.item.childs || view.item.childs.length == 0">\n            {{view.item.label}}\n        </span>\n    </diV>\n\n    <ul ng-if="view.item.childs && view.item.childs.length > 0" ng-show="view.item.isShown">\n        <akk-tree-item item="child" ng-repeat="child in view.item.childs"></akk-tree-item>\n    </ul>\n</li>');
$templateCache.put('templates/akk-tree.html','<div class="form-group form-tree">\n    <div class="pull-right">\n        <a href="javascript:;" ng-click="methods.expandAll()" translate>Tout ouvrir</a>\n        <span> | \n            <a href="javascript:;" ng-click="methods.inpandAll()" translate>Tout fermer</a>\n        </span>\n        <span> |\n            <a href="javascript:;" ng-click="methods.selectAll()" translate>Tout s\xE9lectionner</a>\n        </span>\n        <span> |\n            <a href="javascript:;" ng-click="methods.unselectAll()" translate>Tout d\xE9s\xE9lectionner</a>\n        </span>\n\n        <span ng-if="options.debug && options.debug == true"> |\n            <a href="javascript:;" ng-click="methods.debug()" translate>Debug</a>\n        </span>\n    </div>\n    <div class="h4" ng-if="view.title">\n        {{view.title}}\n    </div>\n    <ul>\n        <akk-tree-item item="item" ng-repeat="item in view.items"></akk-tree-item>\n    </ul>\n    <div ng-if="options.debug && options.debug == true">\n        Model debug\n        <div class="row">\n            <div class="col">\n                <pre>{{view.items| json}}</pre>\n            </div>\n            <div class="col">\n                <pre>{{model| json}}</pre>\n            </div>\n        </div>\n    </div>\n</div>');
$templateCache.put('templates/modals/akk-datepicker-modal.html','<div class="modal-header">\n    <h4 class="modal-title" id="datetimePickerModalLabel">{{view.title}}</h4>\n    <button type="button" class="close" ng-click="methods.cancel()">\n        <span aria-hidden="true">\n            <i class="material-icons md-24">clear</i>\n        </span>\n    </button>\n</div>\n<div class="modal-body">\n    <div uib-datepicker\n         ng-model="view.datetime"\n         datepicker-options="view.datepickerOptions">\n    </div>\n</div>\n<div class="modal-footer">\n    <button type="button" ng-click="methods.cancel()" class="btn btn-link" data-dismiss="modal" translate>Close</button>\n    <button type="button" ng-click="methods.valid()" class="btn btn-primary" translate>Select</button>\n</div>\n');
$templateCache.put('templates/modals/akk-multiselect-modal.html','<div class="modal-header">\n    <h4 class="modal-title">{{view.placeholder}}</h4>\n    <button type="button" class="close" ng-click="methods.close()" aria-label="Close">\n        <span aria-hidden="true">\n            <i class="material-icons md-24">clear</i>\n        </span>\n    </button>\n</div>\n<div class="modal-body">\n    <div class="row">\n        <div class="col-6">\n            <h4 translate>Selectable items ({{view.items.length}})</h4>\n            <div ng-if="view.items.length">\n                <div ng-repeat="item in view.items">\n                    <a href="javascript:;"  ng-click="methods.select(item)">\n                        <span class="material-icons pull-right">keyboard_arrow_right</span>\n                    </a>\n                    <span>{{item[view.field]}}</span>\n                </div>\n            </div>\n        </div>\n        <div class="col-6">\n            <h4 translate>Selected items ({{view.selected.length}})</h4>\n            <div ng-if="view.selected.length">\n                <div ng-repeat="item in view.selected">\n                    <a href="javascript:;"  ng-click="methods.unselect(item)" class="pull-right">\n                        <span class="material-icons">clear</span>\n                    </a>\n                    <span>{{item[view.field]}}</span>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="modal-footer">\n    <button type="button" class="btn btn-default" ng-click="methods.cancel()" translate>Cancel</button>\n    <button type="button" class="btn btn-primary" ng-click="methods.save()" translate>Save</button>\n</div>');
$templateCache.put('templates/modals/akk-selectandsearch-modal-default.html','<span ng-repeat="field in view.fields">\n    <span ng-if="!option[field]">{{field}}</span><span ng-if="option[field]">{{option[field]}}</span>\n</span>');
$templateCache.put('templates/modals/akk-selectandsearch-modal.html','<div class="modal-header">\n    <h4 class="modal-title">{{view.placeholder}}</h4>\n    <button type="button" class="close" ng-click="methods.close()" aria-label="Close">\n        <span aria-hidden="true">\n            <i class="material-icons md-24">clear</i>\n        </span>\n    </button>\n</div>\n<div class="modal-body">\n    <div class="form-group" ng-show="view.options.length > 10">\n        <input type="text" placeholder="{{\'Recherchez...\'| translate}}" ng-model="keywords" akk-auto-focus class="form-control" />\n    </div>\n    <div class="form-options">\n        <ul class="list-group list-group-flush">\n            <li class="list-group-item" ng-repeat="option in view.options| filter: keywords | orderBy:(view.orderBy) ? orderBy : view.fields[0]" ng-click="methods.select(option)" ng-class="view.item.id == option.id ? \'active\':\'\'">\n                <span ng-include="methods.template.get()"></span>\n            </li>\n        </ul>\n    </div>\n</div>\n<div class="modal-footer">\n    <button type="button" class="btn btn-primary" ng-click="methods.valid()" ng-disabled="view.item.id == null" translate>S\xE9lectionner</button>\n</div>');}]);