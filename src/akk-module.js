angular.module('akkurate-design-system', [
    'ui.bootstrap',
    'ngSanitize',
    'ui-notification',
    'gettext',
    'color.picker'
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