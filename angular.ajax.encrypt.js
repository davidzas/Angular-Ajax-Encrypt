(function () {
    'use strict';

    angular
        .module('angular.ajax.encrypt').provider('$Ajax', function $AjaxProvider() {
            var host = "";
            var modoDebug = false;
            this.host = function (value) {
                host = value;
            };
            this.setDebbug = function (value) {
                modoDebug = value;
            }
            var encKey = '';
            this.setKey = function (value) {
                encKey = value;
            }
            this.$get = ["$http", "$q", "$Encrypt", function $AjaxFactory($http, $q, $Encrypt) {
                $Encrypt.setKey(encKey);
                var factory = {
                    post: function (ruta, datos) {
                        var deferred = $q.defer();
                        if (modoDebug) {
                            console.log('Url: ' + url, ' Sending:', datos);
                        }
                        datos = $Encrypt.encrypt(datos);
                        $http({
                            url: host + ruta,
                            method: "POST",
                            data: { data: datos },
                            headers: { 'Content-Type': 'application/json' }
                        }).success(function (data, status, headers, config) {
                            data = $Encrypt.decrypt(data.data);
                            if (modoDebug) {
                                console.log('Received:', data);
                            }
                            if (data.success) {
                                if (!data.datos) {
                                    data.datos = { msg: data.msg, error: data.error };
                                }
                                deferred.resolve(data.datos);
                            } else {
                                console.log("error", data);
                                deferred.reject(data);
                            }

                        }).error(function (data, status, headers, config) {
                            if (!data) {
                                data = { msg: 'error procesando la solicitud' };
                            } else {
                                data.msg += '. Detalle:' + JSON.stringify(data.error);
                            }
                            deferred.reject(data);
                            console.log(data);
                        });
                        return deferred.promise;
                    },
                    get: function (ruta, datos) {
                        var deferred = $q.defer();
                        if (modoDebug) {
                            console.log('Url: ' + url, ' Sending:', datos);
                        }
                        datos = $Encrypt.encrypt(datos);
                        $http({
                            url: host + ruta,
                            method: "GET",
                            params: { data: datos },
                        }).success(function (data, status, headers, config) {
                            data = $Encrypt.decrypt(data.data);
                            if (modoDebug) {
                                console.log('Received:', data);
                            }
                            if (data.success) {
                                deferred.resolve(data.datos);
                            } else {
                                deferred.reject(data);
                            }

                        }).error(function (data, status, headers, config) {
                            if (!data) {
                                data = { msg: 'error procesando la solicitud' };
                            }
                            deferred.reject(data);
                            console.log(data);
                        });
                        return deferred.promise;
                    }
                };
                return factory;
            }];
        }).factory("$Encrypt", [function () {
            // This key must match the one you used on the server
            var key = '';


            var enc = {
                setKey: function (value) {
                    key = value;
                },
                encrypt: function (data) {

                    if (data !== null && typeof data === 'object') {
                        var encrypted = GibberishAES.enc(angular.toJson(data), key);
                        return base64_encode(encrypted);
                    } else {
                        var encrypted = GibberishAES.enc((data), key);
                        return base64_encode(encrypted);
                    }

                },
                decrypt: function (data) {
                    var decrypted = GibberishAES.dec(base64_decode(data), key);
                    var cadena = decrypted;
                    try {
                        var jsonObject = angular.fromJson(cadena);
                        return jsonObject;
                    } catch (e) {
                        return cadena;
                    }
                }
            };
            function base64_encode(str) {
                if (window.btoa) // Internet Explorer 10 and above  
                    return window.btoa(unescape(encodeURIComponent(str)));
                else {
                    // Cross-Browser Method (compressed)  

                    // Create Base64 Object  
                    var Base64 = {
                        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
                            var t = "";
                            var n, r, i, s, o, u, a;
                            var f = 0;
                            e = Base64._utf8_encode(e);
                            while (f < e.length) {
                                n = e.charCodeAt(f++);
                                r = e.charCodeAt(f++);
                                i = e.charCodeAt(f++);
                                s = n >> 2;
                                o = (n & 3) << 4 | r >> 4;
                                u = (r & 15) << 2 | i >> 6;
                                a = i & 63;
                                if (isNaN(r)) {
                                    u = a = 64
                                } else if (isNaN(i)) {
                                    a = 64
                                }
                                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                            }
                            return t
                        }, decode: function (e) {
                            var t = "";
                            var n, r, i;
                            var s, o, u, a;
                            var f = 0;
                            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                            while (f < e.length) {
                                s = this._keyStr.indexOf(e.charAt(f++));
                                o = this._keyStr.indexOf(e.charAt(f++));
                                u = this._keyStr.indexOf(e.charAt(f++));
                                a = this._keyStr.indexOf(e.charAt(f++));
                                n = s << 2 | o >> 4;
                                r = (o & 15) << 4 | u >> 2;
                                i = (u & 3) << 6 | a;
                                t = t + String.fromCharCode(n);
                                if (u != 64) {
                                    t = t + String.fromCharCode(r)
                                }
                                if (a != 64) {
                                    t = t + String.fromCharCode(i)
                                }
                            }
                            t = Base64._utf8_decode(t);
                            return t
                        }, _utf8_encode: function (e) {
                            e = e.replace(/\r\n/g, "\n");
                            var t = "";
                            for (var n = 0; n < e.length; n++) {
                                var r = e.charCodeAt(n);
                                if (r < 128) {
                                    t += String.fromCharCode(r)
                                } else if (r > 127 && r < 2048) {
                                    t += String.fromCharCode(r >> 6 | 192);
                                    t += String.fromCharCode(r & 63 | 128)
                                } else {
                                    t += String.fromCharCode(r >> 12 | 224);
                                    t += String.fromCharCode(r >> 6 & 63 | 128);
                                    t += String.fromCharCode(r & 63 | 128)
                                }
                            }
                            return t
                        }, _utf8_decode: function (e) {
                            var t = "";
                            var n = 0;
                            var r = c1 = c2 = 0;
                            while (n < e.length) {
                                r = e.charCodeAt(n);
                                if (r < 128) {
                                    t += String.fromCharCode(r);
                                    n++
                                } else if (r > 191 && r < 224) {
                                    c2 = e.charCodeAt(n + 1);
                                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                                    n += 2
                                } else {
                                    c2 = e.charCodeAt(n + 1);
                                    c3 = e.charCodeAt(n + 2);
                                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                                    n += 3
                                }
                            }
                            return t
                        }
                    }
                    // Encode the String  
                    return Base64.encode(unescape(encodeURIComponent(str)));
                }
            }

            function base64_decode(str) {
                if (window.atob) // Internet Explorer 10 and above  
                    return decodeURIComponent(escape(window.atob(str)));
                else {
                    // Cross-Browser Method (compressed)  

                    // Create Base64 Object  
                    var Base64 = {
                        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
                            var t = "";
                            var n, r, i, s, o, u, a;
                            var f = 0;
                            e = Base64._utf8_encode(e);
                            while (f < e.length) {
                                n = e.charCodeAt(f++);
                                r = e.charCodeAt(f++);
                                i = e.charCodeAt(f++);
                                s = n >> 2;
                                o = (n & 3) << 4 | r >> 4;
                                u = (r & 15) << 2 | i >> 6;
                                a = i & 63;
                                if (isNaN(r)) {
                                    u = a = 64
                                } else if (isNaN(i)) {
                                    a = 64
                                }
                                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                            }
                            return t
                        }, decode: function (e) {
                            var t = "";
                            var n, r, i;
                            var s, o, u, a;
                            var f = 0;
                            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                            while (f < e.length) {
                                s = this._keyStr.indexOf(e.charAt(f++));
                                o = this._keyStr.indexOf(e.charAt(f++));
                                u = this._keyStr.indexOf(e.charAt(f++));
                                a = this._keyStr.indexOf(e.charAt(f++));
                                n = s << 2 | o >> 4;
                                r = (o & 15) << 4 | u >> 2;
                                i = (u & 3) << 6 | a;
                                t = t + String.fromCharCode(n);
                                if (u != 64) {
                                    t = t + String.fromCharCode(r)
                                }
                                if (a != 64) {
                                    t = t + String.fromCharCode(i)
                                }
                            }
                            t = Base64._utf8_decode(t);
                            return t
                        }, _utf8_encode: function (e) {
                            e = e.replace(/\r\n/g, "\n");
                            var t = "";
                            for (var n = 0; n < e.length; n++) {
                                var r = e.charCodeAt(n);
                                if (r < 128) {
                                    t += String.fromCharCode(r)
                                } else if (r > 127 && r < 2048) {
                                    t += String.fromCharCode(r >> 6 | 192);
                                    t += String.fromCharCode(r & 63 | 128)
                                } else {
                                    t += String.fromCharCode(r >> 12 | 224);
                                    t += String.fromCharCode(r >> 6 & 63 | 128);
                                    t += String.fromCharCode(r & 63 | 128)
                                }
                            }
                            return t
                        }, _utf8_decode: function (e) {
                            var t = "";
                            var n = 0;
                            var r = c1 = c2 = 0;
                            while (n < e.length) {
                                r = e.charCodeAt(n);
                                if (r < 128) {
                                    t += String.fromCharCode(r);
                                    n++
                                } else if (r > 191 && r < 224) {
                                    c2 = e.charCodeAt(n + 1);
                                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                                    n += 2
                                } else {
                                    c2 = e.charCodeAt(n + 1);
                                    c3 = e.charCodeAt(n + 2);
                                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                                    n += 3
                                }
                            }
                            return t
                        }
                    }
                    // Encode the String  
                    return decodeURIComponent(escape(Base64.decode(str)));
                }
            }
            return enc;
        }]);
})();