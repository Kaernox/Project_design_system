angular.module('akkurate-design-system').run(['$templateCache', function($templateCache) {$templateCache.put('templates/akk-alert.html','<div>\n    <div data-ng-show="displayed" class="alert" role="alert" data-ng-class="type ? \'alert-\' + type : \'alert-dark\'">\n        <div class="d-flex align-items-center">\n            <i class="material-icons mr-1 align-self-start" data-ng-bind="icon" data-ng-if="icon"></i>\n            <span data-ng-if="icon">&nbsp;&nbsp;&nbsp;</span>\n            <div>\n                <h4 class="alert-heading" data-ng-if="title">{{title}}</h4>\n                <div data-ng-bind-html="message"></div>\n            </div>\n            <i class="material-icons align-self-start ml-auto" ng-if="closable" data-ng-click="methods.close()">clear</i>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('templates/akk-card.html','<div class="card"> \n  <img data-ng-if="media && media != \'\'" class="card-img-top" data-ng-src="{{media}}" alt="{{title}}">\n  <div class="card-body">\n    <h5 class="card-title">{{title}}</h5>\n    <p data-ng-if="content && content != \'\'" class="card-text">{{content}}</p>\n    <button data-ng-if="options.length > 0" type="button" class="btn btn-primary" data-ng-repeat="option in options" ng-click="methods.action(option)">{{option.label}}</a>\n  </div>\n</div>');
$templateCache.put('templates/akk-checkbox-list.html','<div class="form-group form-checkbox form-checkbox-list {{!view.isValid ? \'has-error\' : \'\'}}" data-ng-class="elementclass">\n    <div class="d-flex">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i>\n        <div class="ml-1">{{label}}</div>\n        <sup ng-if="req">*</sup>\n    </div>\n    <div class="d-flex" ng-repeat="option in options track by $index" ng-click="methods.toggle(option)">\n        <i class="material-icons text-primary" data-ng-if="methods.inModel(option)">check_box</i>\n        <i class="material-icons text-muted" data-ng-if="!methods.inModel(option)">check_box_outline_blank</i>\n        <div class="ml-1">\n            {{display ? option[display] : option}}\n        </div>\n    </div>\n</div>');
$templateCache.put('templates/akk-checkbox.html','<div class="form-group form-checkbox" data-ng-class="elementclass" data-ng-click="methods.change()">\n    <span class="d-flex">\n        <i class="material-icons text-primary" data-ng-if="model[property]">check_box</i>\n        <i class="material-icons text-muted" data-ng-if="!model[property]">check_box_outline_blank</i>\n        <div class="ml-1">\n            {{label | translate}}\n        </div>\n    </span>\n</div>');
$templateCache.put('templates/akk-colorpicker.html','<div class="form-group form-colorpicker" ng-class="!view.isValid ? \'has-error\' : \'\'">\n    <label class="control-label">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup>\n    </label>\n    <div class="form-container">\n        <div class="icon">\n            <i class="material-icons md-18">color_lens</i>\n        </div>\n        <color-picker\n            ng-model="model"\n            options="view.options"\n            event-api="events"\n            ></color-picker>\n    </div>\n</div>');
$templateCache.put('templates/akk-datagrid.html','<div class="table-responsive table-datagrid">\n    <table class="table table-vertical-center" data-ng-if="items.length">\n        <caption data-ng-if="!caption">{{caption}}</caption>\n        <thead>\n            <tr>\n                <th data-ng-if="selector" class="selector">\n                    <span data-ng-click="methods.toggleAll()">\n                        <i class="material-icons text-primary" data-ng-if="selected.length == items.length">check_box</i>\n                        <i class="material-icons text-primary" data-ng-if="selected.length > 0 && selected.length < items.length">indeterminate_check_box</i>\n                        <i class="material-icons text-muted" data-ng-if="selected.length == 0">check_box_outline_blank</i>\n                    </span>\n                </th>\n                <th ng-repeat="column in columns" data-ng-click="methods.sortBy(column, methods.inverseWay(column))">\n                    <div class="d-flex align-items-center">\n                        <span>{{column| translate}}</span>\n                        <i data-ng-if="view.dimension == column && view.way == \'desc\'" class="material-icons">arrow_downward</i>\n                        <i data-ng-if="view.dimension == column && view.way == \'asc\'" class="material-icons">arrow_upward</i>\n                        <i data-ng-if="view.dimension != column" class="material-icons text-muted">arrow_drop_down</i>\n                    </div>\n                </th>\n                <th data-ng-if="options.length" class="options"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr data-ng-repeat="item in view.items| orderBy: methods.order() | limitTo: view.limitTo.limit : view.limitTo.start track by $index ">\n                <td data-ng-if="selector" class="selector">\n                    <span data-ng-click="methods.toggle(item)">\n                        <i class="material-icons text-primary" data-ng-if="item.isChecked">check_box</i>\n                        <i class="material-icons text-muted" data-ng-if="!item.isChecked">check_box_outline_blank</i>\n                    </span>\n                </td>\n                <td data-ng-repeat="column in columns" data-ng-click="methods.eventClick(item)" data-ng-mouseover="methods.eventHover(item)">{{item[column]}}</td>\n                <td data-ng-if="options.length" class="options">\n                    <span class="btn-group" uib-dropdown dropdown-append-to-body>\n                        <a href data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n                            <i class="material-icons">more_vert</i>\n                        </a>\n                        <ul class="dropdown-menu dropdown-menu-right">\n                            <a class="dropdown-item" data-ng-repeat="option in options" href="javascript:;" data-ng-click="methods.optionClick(item, option)">{{option.label}}</a>\n                        </ul>\n                    </span>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n    <akk-paginate data-ng-if="items.length && paginate" items="items" item-per-page="paginate.itemPerPage" event-update="updatePaginate" size="paginate.size" alignment="paginate.alignment"></akk-paginate>\n\n    <akk-alert title="{{\'Aucun r\xE9sultat trouv\xE9 !\'| translate}}" data-ng-if="!items.length"></akk-alert>\n</div>\n');
$templateCache.put('templates/akk-datepicker.html','<div class="form-group {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label" ng-if="label">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i>\n        {{label}}\n        <sup ng-if="req">*</sup>\n    </label>\n    <div class="form-control d-flex align-items-center justify-content-between">\n        <span class="input-search" ng-if="model != null" ng-click="methods.datepicker()">\n            {{model | dateShortFormat}}\n        </span>\n        <em ng-if="model == null" class="text-muted" ng-click="methods.datepicker()">{{\'Ind\xE9fini\' | translate}}</em>\n        <i class="material-icons md-24 ml-auto" ng-click="methods.datepicker()">event</i>\n        <i class="material-icons md-24 ml-1" ng-if="model != null" ng-click="methods.clear()">clear</i>\n    </div>\n</div>');
$templateCache.put('templates/akk-input-int.html','<div class="form-group well {{elementclass}}">\n    <div class="row">\n        <div class="col-md-6">\n            <p>{{label}}</p>\n        </div>\n        <div class="col-md-2">\n            <button type="button" class="btn btn-link" ng-click="substract()">\n                <i class="material-icons">remove</i>\n            </button>\n        </div>\n        <div class="col-md-2">  \n            <p>{{model}}/{{max}}</p>\n        </div>\n        <div class="col-md-2">\n            <button type="button" class="btn btn-link" ng-click="add()">\n                <i class="material-icons">add</i>\n            </button>\n        </div>\n    </div>\n</div>');
$templateCache.put('templates/akk-input.html','<div class="form-group form-input" ng-class="!isValid ? \'has-error\' : \'\'">\n    <label class="control-label"><i ng-if="!isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup></label>\n    <input type="{{type}}" class="form-control" ng-class="elementclass" placeholder="{{placeholder}}" step="{{step}}" ng-model="model" ng-required="{{req}}" ng-blur="checkValidity()"/>\n</div>');
$templateCache.put('templates/akk-loader.html','<div class="loader">\n    <div data-ng-show="loading" class="loader-container">\n        <div class="loader-spinner"></div>\n        <div class="loader-info">{{\'Loading...\' | translate}}</div>\n    </div>\n    <div data-ng-show="!loading" data-ng-transclude></div>\n</div>');
$templateCache.put('templates/akk-multiselect.html','<div class="form-group">\n    <label class="control-label" ng-if="view.label">{{view.label}}</label>\n    <div class="form-control d-flex align-items-center justify-content-between" ng-click="methods.open()">\n        <span ng-if="view.selected.length">\n            {{view.selected.length}} <span>selected</span>\n        </span>\n        <span ng-if="!view.selected.length" class="text-muted">{{view.placeholder}}</span>\n        <i class="material-icons md-18">arrow_drop_down</i>\n    </div>\n</div>\n');
$templateCache.put('templates/akk-paginate.html','<nav>\n    <ul class="pagination" data-ng-class="methods.setDisplay();">\n        <li class="page-item" data-ng-class="methods.isFirstPage() ? \'disabled\' : \'\'">\n            <button type="button" data-ng-click="methods.firstPage()" class="page-link">\n                <i class="material-icons">first_page</i>\n                <span class="sr-only" translate>First page</span>\n            </button>\n        </li>\n        <li class="page-item" data-ng-class="methods.isFirstPage() ? \'disabled\' : \'\'">\n            <button type="button" data-ng-click="methods.previous()" class="page-link">\n                <i class="material-icons">chevron_left</i>\n                <span class="sr-only" translate>Previous page</span>\n            </button>\n        </li>\n        <li class="page-item" data-ng-repeat="i in []| range:view.pagin.pages" data-ng-class="i == view.pagin.current ? \'active\' : \'\'">\n            <button type="button" data-ng-click="methods.goto(i)" class="page-link" data-ng-if="i != view.pagin.current">\n                {{i + 1}}\n            </button>\n            <span class="page-link" data-ng-if="i == view.pagin.current">\n                {{i + 1}}\n                <span class="sr-only" translate>(current)</span>\n            </span>\n        </li>\n        <li class="page-item" data-ng-class="methods.isLastPage() ? \'disabled\' : \'\'">\n            <button type="button" data-ng-click="methods.next()" class="page-link">\n                <i class="material-icons">chevron_right</i>\n                <span class="sr-only" translate>Next page</span>\n            </button>\n        </li>\n        <li class="page-item" data-ng-class="methods.isLastPage() ? \'disabled\' : \'\'">\n            <button type="button" data-ng-click="methods.lastPage()" class="page-link">\n                <i class="material-icons">last_page</i>\n                <span class="sr-only" translate>Last page</span>\n            </button>\n        </li>\n    </ul>\n</nav>');
$templateCache.put('templates/akk-radio.html','<div class="form-group form-radio {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label"><i data-ng-if="!view.isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup></label>\n    <div class="d-flex align-items-center {{elementclass}}" data-ng-repeat="option in options track by $index" data-ng-click="methods.select(option)">\n        <div data-ng-if="(property && model == option[property]) || (!property && methods.checkEqualsModel(option) )"><i class="material-icons text-primary">radio_button_checked</i></div>\n        <div data-ng-if="(property && model != option[property]) || (!property && !methods.checkEqualsModel(option) )"><i class="material-icons text-muted">radio_button_unchecked</i></div>\n        <div class="ml-1">{{option.name}}</div>\n    </div>\n</div>\n');
$templateCache.put('templates/akk-select.html','<div class="form-group form-select {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label d-flex">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i>\n        <div class="ml-1">{{label}}</div>\n        <sup ng-if="req">*</sup>\n    </label>\n    <select class="form-control {{elementclass}}" ng-options="option{{value != null ? \'[value]\' : \'\'}} as option{{display != null ? \'[display]\' : \'\'}} for option in options{{value == null && display != null ? \' track by option.id\' : \'\'}}" ng-model="model" ng-required="{{req}}" ng-blur="methods.checkValidity()" ng-change="methods.change()">\n        <option value="" ng-if="defaultDisplayEnabled" selected>{{defaultDisplay}}</option>\n    </select>\n</div>\n');
$templateCache.put('templates/akk-selectandsearch.html','<div class="form-group {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label" ng-if="label">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i>\n        {{label}}\n        <sup ng-if="req">*</sup>\n    </label>\n    <div class="form-control d-flex align-items-center justify-content-between">\n        <input type="hidden" ng-model="view.item.id" ng-required="{{req}}" />\n        <span class="input-search" ng-if="view.item != null" ng-click="methods.wizard()">\n            <span ng-repeat="field in fields"><span ng-if="!view.item[field]">{{field}}</span><span ng-if="view.item[field]">{{view.item[field]}}</span></span>\n        </span>\n        <em ng-if="view.item == null" class="text-muted" ng-click="methods.wizard()">{{placeholder}}</em>\n        <i class="material-icons md-24 ml-auto" ng-click="methods.wizard()" role="button">more_horiz</i>\n        <i class="material-icons md-24 ml-1" ng-if="add != null" ng-click="methods.add()">add</i>\n    </div>\n</div>');
$templateCache.put('templates/akk-selector.html','<div class="form-group {{!view.isValid ? \'has-error\' : \'\'}}">\n    <label class="control-label" ng-if="label">\n        <i ng-if="!view.isValid" class="material-icons md-14">warning</i>\n        <sup ng-if="req">*</sup>\n    </label>\n    <div class="form-control d-flex align-items-center justify-content-between">\n        <input type="hidden" ng-model="view.item.id" ng-required="{{req}}" />\n        <span class="input-search" ng-if="view.item != null" ng-click="methods.wizard()">\n            {{model[property]}}\n        </span>\n        <em ng-if="view.item == null" class="text-muted" ng-click="methods.wizard()">{{placeholder}}</em>\n        <i class="material-icons md-24 ml-auto" ng-click="methods.wizard()" role="button">keyboard_arrow_right</i>\n    </div>\n</div>');
$templateCache.put('templates/akk-switch.html','<div class="form-group form-switch {{elementclass}}" data-ng-click="methods.toggle()">\n    <div class="d-flex align-items-center" data-ng-class="alignment == \'center\' ? \'justify-content-center\' : \'justify-content-between\'">\n        <div data-ng-if="alignment == \'left\' || alignment == \'center\'" data-ng-class="size != null ? \'switch-\' + size : \'\'">\n            <div class="d-flex switch-box" data-ng-class="model[property] ? \'switch-active justify-content-end\' : \'justify-content-start\'">\n                <div class="switch-handle">\n                    <i class="material-icons text-primary" data-ng-if="model[property] && size != null">check</i>\n                </div>\n            </div>\n        </div>\n        <div data-ng-if="alignment != \'center\'" data-ng-class="alignment == \'left\' ? \'text-right\' : \'\';">\n            {{label}}\n        </div>\n        <div data-ng-if="alignment == \'right\'" data-ng-class="size != null ? \'switch-\' + size : \'\'">\n            <div class="d-flex switch-box" data-ng-class="model[property] ? \'switch-active justify-content-end\' : \'justify-content-start\'">\n                <div class="switch-handle">\n                    <i class="material-icons text-primary" data-ng-if="model[property] && size != null">check</i>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('templates/akk-textarea.html','<div class="form-group form-textarea" ng-class="!isValid ? \'has-error\' : \'\'">\n    <label class="control-label"><i ng-if="!isValid" class="material-icons md-14">warning</i> {{label}} <sup ng-if="req">*</sup></label>\n    <textarea class="form-control" ng-class="elementclass" placeholder="{{placeholder}}" ng-model="model" rows="{{size}}" ng-required="{{req}}" ng-blur="checkValidity()"></textarea>\n</div>');
$templateCache.put('templates/akk-tree-item.html','<li ng-class="view.item.childs != undefined ? \'has-child\' : \'\'" class="tree-item d-flex flex-column">\n    <div class="d-flex align-items-center">\n        <i ng-if="view.item.childs && view.item.childs.length > 0 && view.item.isShown" ng-click="methods.toggle(view.item)" class="material-icons">expand_more</i>\n        <i ng-if="view.item.childs && view.item.childs.length > 0 && !view.item.isShown" ng-click="methods.toggle(view.item)" class="material-icons">chevron_right</i>\n        <i ng-if="!view.item.childs || view.item.childs.length == 0" ng-click="methods.toggle(view.item)" class="material-icons text-muted">bookmark</i>\n        \n        <i ng-if="view.item.isChecked" ng-click="methods.check(view.item)" class="material-icons text-primary">check_box</i>\n        <i ng-if="view.item.isPartialyChecked && !view.item.isChecked" ng-click="methods.check(view.item)" class="material-icons text-muted">indeterminate_check_box</i>\n        <i ng-if="!view.item.isChecked  && !view.item.isPartialyChecked" ng-click="methods.check(view.item)" class="material-icons text-muted">check_box_outline_blank</i>\n        \n        <a href="javascript:;" ng-if="view.item.childs && view.item.childs.length > 0" ng-click="methods.toggle(view.item)">\n            {{view.item.label}}\n        </a>\n        \n        <span ng-if="view.item.childs && view.item.childs.length > 0">\n            ({{view.item.childs.length}})\n        </span>\n        \n        <span ng-if="!view.item.childs || view.item.childs.length == 0">\n            {{view.item.label}}\n        </span>\n    </diV>\n\n    <ul ng-if="view.item.childs && view.item.childs.length > 0" ng-show="view.item.isShown">\n        <akk-tree-item item="child" ng-repeat="child in view.item.childs"></akk-tree-item>\n    </ul>\n</li>');
$templateCache.put('templates/akk-tree.html','<div class="form-group form-tree">\n    <div class="pull-right">\n        <a href="javascript:;" ng-click="methods.expandAll()" translate>Tout ouvrir</a>\n        <span> | \n            <a href="javascript:;" ng-click="methods.inpandAll()" translate>Tout fermer</a>\n        </span>\n        <span> |\n            <a href="javascript:;" ng-click="methods.selectAll()" translate>Tout s\xE9lectionner</a>\n        </span>\n        <span> |\n            <a href="javascript:;" ng-click="methods.unselectAll()" translate>Tout d\xE9s\xE9lectionner</a>\n        </span>\n\n        <span ng-if="options.debug && options.debug == true"> |\n            <a href="javascript:;" ng-click="methods.debug()" translate>Debug</a>\n        </span>\n    </div>\n    <div class="h4" ng-if="view.title">\n        {{view.title}}\n    </div>\n    <ul>\n        <akk-tree-item item="item" ng-repeat="item in view.items"></akk-tree-item>\n    </ul>\n    <div ng-if="options.debug && options.debug == true">\n        Model debug\n        <div class="row">\n            <div class="col">\n                <pre>{{view.items| json}}</pre>\n            </div>\n            <div class="col">\n                <pre>{{model| json}}</pre>\n            </div>\n        </div>\n    </div>\n</div>');
$templateCache.put('templates/modals/akk-datepicker-modal-month.html','<div ng-switch="datepickerMode">\n    <div uib-daypicker ng-switch-when="day" tabindex="0" class="uib-daypicker" template-url="templates/overload/datepicker/day.html"></div>\n    <div uib-monthpicker ng-switch-when="month" tabindex="0" class="uib-monthpicker" template-url="templates/overload/datepicker/month.html"></div>\n    <div uib-yearpicker ng-switch-when="year" tabindex="0" class="uib-yearpicker" template-url="templates/overload/datepicker/year.html"></div>\n</div>');
$templateCache.put('templates/modals/akk-datepicker-modal.html','<div class="modal-header">\n    <h5 class="modal-title" id="datetimePickerModalLabel">{{view.title}}</h5>\n    <button type="button" class="close" ng-click="methods.cancel()">\n        <span aria-hidden="true">\n            <i class="material-icons md-24">clear</i>\n        </span>\n    </button>\n</div>\n<div class="modal-body">\n    <div uib-datepicker\n         ng-model="view.datetime"\n         datepicker-options="view.datepickerOptions"\n         template-url="templates/modals/akk-datepicker-modal-month.html">\n    </div>\n</div>\n<div class="modal-footer">\n    <button type="button" ng-click="methods.cancel()" class="btn btn-link" data-dismiss="modal" translate>Close</button>\n    <button type="button" ng-click="methods.valid()" class="btn btn-primary" translate>Select</button>\n</div>\n');
$templateCache.put('templates/modals/akk-multiselect-modal.html','<div class="modal-header">\n    <h4 class="modal-title">{{view.placeholder}}</h4>\n    <button type="button" class="close" data-ng-click="methods.close()" aria-label="Close">\n        <span aria-hidden="true">\n            <i class="material-icons md-24">clear</i>\n        </span>\n    </button>\n</div>\n<div class="modal-body">\n    <div class="row">\n        <div class="col-6">\n            <h5 translate>Selectable items ({{view.items.length}})</h5>\n            <div data-ng-if="view.items.length">\n                <div data-ng-repeat="item in view.items | orderBy:view.field" class="d-flex align-items-center text-secondary" data-ng-click="methods.select(item)">\n                    <i class="material-icons">keyboard_arrow_right</i>\n                    <div class="ml-1">{{item[view.field]}}</div>\n                </div>\n            </div>\n        </div>\n        <div class="col-6">\n            <h5 translate>Selected items ({{view.selected.length}})</h5>\n            <div data-ng-if="view.selected.length">\n                <div data-ng-repeat="item in view.selected | orderBy:view.field" class="d-flex align-items-center text-primary" data-ng-click="methods.unselect(item)">\n                    <i class="material-icons">clear</i>\n                    <div class="ml-1">{{item[view.field]}}</div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="modal-footer">\n    <button type="button" class="btn btn-default" data-ng-click="methods.cancel()" translate>Cancel</button>\n    <button type="button" class="btn btn-primary" data-ng-click="methods.save()" translate>Save</button>\n</div>\n');
$templateCache.put('templates/modals/akk-selectandsearch-modal-default.html','<span ng-repeat="field in view.fields">\n    <span ng-if="!option[field]">{{field}}</span><span ng-if="option[field]">{{option[field]}}</span>\n</span>');
$templateCache.put('templates/modals/akk-selectandsearch-modal.html','<div class="modal-header">\n    <h4 class="modal-title">{{view.placeholder}}</h4>\n    <button type="button" class="close" ng-click="methods.close()" aria-label="Close">\n        <span aria-hidden="true">\n            <i class="material-icons md-24">clear</i>\n        </span>\n    </button>\n</div>\n<div class="modal-body">\n    <div class="form-group" ng-show="view.options.length > 10">\n        <input type="text" placeholder="{{\'Recherchez...\'| translate}}" ng-model="keywords" akk-AutoFocus class="form-control" />\n    </div>\n    <div class="form-options">\n        <ul class="list-group list-group-flush">\n            <li class="list-group-item" ng-repeat="option in view.options| filter: keywords | orderBy:(view.orderBy) ? orderBy : view.fields[0]" ng-click="methods.select(option)" ng-class="view.item.id == option.id ? \'active\':\'\'">\n                <span ng-include="methods.template.get()"></span>\n            </li>\n        </ul>\n    </div>\n</div>\n<div class="modal-footer">\n    <button type="button" class="btn btn-primary" ng-click="methods.valid()" ng-disabled="view.item.id == null" translate>S\xE9lectionner</button>\n</div>');
$templateCache.put('templates/overload/datepicker/datepicker.html','<div ng-switch="datepickerMode">\n    <div uib-daypicker ng-switch-when="day" tabindex="0" class="uib-daypicker" template-url="/apps/brain/templates/components/datepicker/day.html"></div>\n    <div uib-monthpicker ng-switch-when="month" tabindex="0" class="uib-monthpicker" template-url="/apps/brain/templates/components/datepicker/month.html"></div>\n    <div uib-yearpicker ng-switch-when="year" tabindex="0" class="uib-yearpicker" template-url="/apps/brain/templates/components/datepicker/year.html"></div>\n</div>');
$templateCache.put('templates/overload/datepicker/day.html','<div class="d-flex align-items-center justify-content-between">\n    <div>\n        <button type="button" class="btn btn-link" ng-click="move(-1)" tabindex="-1">\n            <i class="material-icons md-18">keyboard_arrow_left</i>\n        </button>\n    </div>\n    <div id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" class="h3" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1">\n        {{title}}\n    </div>\n    <div>\n        <button type="button" class="btn btn-link" ng-click="move(1)" tabindex="-1">\n            <i class="material-icons md-18">keyboard_arrow_right</i>\n        </button>\n    </div>\n</div>\n<table class="table table-days" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n    <thead>\n        <!--        <tr>\n                    <th>\n                        <button type="button" class="btn btn-link btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1">\n                            <i class="material-icons md-18">keyboard_arrow_left</i>\n                        </button>\n                    </th>\n                    <th colspan="{{::5 + showWeeks}}" class="text-center">\n                        <button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-md uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1">\n                            <strong>{{title}}</strong>\n                            <span class="caret"></span>\n                        </button>\n                    </th>\n                    <th>\n                        <button type="button" class="btn btn-link btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1">\n                            <i class="material-icons md-18">keyboard_arrow_right</i>\n                        </button>\n                    </th>\n                </tr>-->\n        <tr>\n            <th ng-if="showWeeks" class="text-center"></th>\n            <th ng-repeat="label in ::labels track by $index" class="text-center">\n                <small aria-label="{{::label.full}}">{{::label.abbr}}</small>\n            </th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr class="uib-weeks" ng-repeat="row in rows track by $index">\n            <td ng-if="showWeeks" class="text-center h6">\n                <em>{{ weekNumbers[$index]}}</em>\n            </td>\n            <td ng-repeat="dt in row" class="uib-day text-center" role="gridcell" id="{{::dt.uid}}" ng-class="::dt.customClass">\n                <button type="button" class="btn btn-light"\n                        uib-is-class="\n                        \'btn-primary\' for selectedDt,\n                        \'active\' for activeDt\n                        on dt"\n                        ng-click="select(dt.date)"\n                        ng-disabled="::dt.disabled"\n                        tabindex="-1">\n                    <span ng-class="::{\'text-muted\': dt.secondary}">{{::dt.label}}</span>\n                </button>\n            </td>\n        </tr>\n    </tbody>\n</table>');
$templateCache.put('templates/overload/datepicker/month.html','<table class="table table-condensed" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n    <thead>\n        <tr>\n            <th>\n                <button type="button" class="btn btn-link btn-sm pull-left uib-left" ng-click="move( - 1)" tabindex="-1">\n                    <i class="material-icons">keyboard_arrow_left</i>\n                </button>\n            </th>\n            <th colspan="{{::yearHeaderColspan}}" class="text-center">\n                <button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-md uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1">\n                    <strong>{{title}}</strong>\n                    <span class="caret"></span>\n                </button>\n            </th>\n            <th>\n                <button type="button" class="btn btn-link btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1">\n                    <i class="material-icons">keyboard_arrow_right</i>\n                </button>\n            </th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr class="uib-months" ng-repeat="row in rows track by $index">\n            <td ng-repeat="dt in row" class="uib-month text-center" role="gridcell"\n                id="{{::dt.uid}}"\n                ng-class="::dt.customClass">\n                <button type="button" class="btn btn-link"\n                        uib-is-class="\n                        \'btn-info\' for selectedDt,\n                        \'active\' for activeDt\n                        on dt"\n                        ng-click="select(dt.date)"\n                        ng-disabled="::dt.disabled"\n                        tabindex="-1"><span>{{::dt.label}}</span></button>\n            </td>\n        </tr>\n    </tbody>\n</table>');
$templateCache.put('templates/overload/datepicker/year.html','<table class="table table-condensed" role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n    <thead>\n        <tr>\n            <th>\n                <button type="button" class="btn btn-link btn-sm pull-left uib-left" ng-click="move( - 1)" tabindex="-1">\n                    <i class="material-icons">keyboard_arrow_left</i>\n                </button>\n            </th>\n            <th colspan="{{::columns - 2}}" class="text-center">\n                <strong>{{title}}</strong>\n<!--                <button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1">\n                </button>-->\n            </th>\n            <th>\n                <button type="button" class="btn btn-link btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1">\n                    <i class="material-icons">keyboard_arrow_right</i>\n                </button>\n            </th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr class="uib-years" ng-repeat="row in rows track by $index">\n            <td ng-repeat="dt in row" class="uib-year text-center" role="gridcell"\n                id="{{::dt.uid}}"\n                ng-class="::dt.customClass">\n                <button type="button" class="btn btn-link"\n                        uib-is-class="\n                        \'btn-info\' for selectedDt,\n                        \'active\' for activeDt\n                        on dt"\n                        ng-click="select(dt.date)"\n                        ng-disabled="::dt.disabled"\n                        tabindex="-1"><span>{{::dt.label}}</span></button>\n            </td>\n        </tr>\n    </tbody>\n</table>');}]);