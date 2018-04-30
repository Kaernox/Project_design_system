/** 
 * Akkurate v1.0.0 (https://ww.akkurate.io)
 * Copyright 2017-2018 Subvitamine(tm) (https://www.subvitamine.com)
 * Commercial License 
 * @description: Directives who create a tree using a model checkbox and toggle are implement you can open-closed all and check-uncheck all
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
                eventUpdate: "@"
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
                        
                        if (scope.eventUpdate != null && scope.eventUpdate != ''){
                            $rootScope.$broadcast(scope.eventUpdate, scope.model);
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