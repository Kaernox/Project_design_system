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