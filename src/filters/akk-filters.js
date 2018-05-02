angular.module('akkurate-design-system')

        // For getting by 
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

        // For dates
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

        // For files size
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
        .filter('formatOctets', function ($filter) {
            return function (octets, decimals) {
                if (octets == 0)
                    return '0 octet';
                var k = 8000; // 8 bytes for 1 octet
                var dm = decimals + 1 || 3;
                var sizes = ['Octets', 'KO', 'MO', 'GO', 'TO', 'PO', 'EO', 'ZO', 'YO'];
                var i = Math.floor(Math.log(octets) / Math.log(k));
                return parseFloat((octets / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            };
        })

        // For array
        .filter('inArray', function () {
            return function (array, value) {
                return array.indexOf(value) !== -1;
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

        // For Extention
        .filter('extensionIcon', function ($filter) {
            return function (extension) {
                var unknow = ['apk', 'sql'];
                if (extension == null || unknow.indexOf(extension.toLowerCase()) >= 0) {
                    return "css";
                }
                return extension.toLowerCase();
            };
        })
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

        //
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