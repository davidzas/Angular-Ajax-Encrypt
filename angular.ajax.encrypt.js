/**
 * Gibberish-AES v1.0.0 - 2013-04-15
 * A lightweight Javascript Libray for OpenSSL compatible AES CBC encryption.
 *
 * Author: Mark Percival <mark@mpercival.com>
 * Copyright: Mark Percival - http://mpercival.com 2008
 *
 * With thanks to:
 * Josh Davis - http://www.josh-davis.org/ecmaScrypt
 * Chris Veness - http://www.movable-type.co.uk/scripts/aes.html
 * Michel I. Gallant - http://www.jensign.com/
 * Jean-Luc Cooke <jlcooke@certainkey.com> 2012-07-12: added strhex + invertArr to compress G2X/G3X/G9X/GBX/GEX/SBox/SBoxInv/Rcon saving over 7KB, and added encString, decString, also made the MD5 routine more easlier compressible using yuicompressor.
 *
 * License: MIT
 *
 * Usage: GibberishAES.enc("secret", "password")
 * Outputs: AES Encrypted text encoded in Base64
 */
(function(e,r){"object"==typeof exports?module.exports=r():"function"==typeof define&&define.amd?define(r):e.GibberishAES=r()})(this,function(){"use strict";var e=14,r=8,n=!1,f=function(e){try{return unescape(encodeURIComponent(e))}catch(r){throw"Error on UTF-8 encode"}},c=function(e){try{return decodeURIComponent(escape(e))}catch(r){throw"Bad Key"}},t=function(e){var r,n,f=[];for(16>e.length&&(r=16-e.length,f=[r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r]),n=0;e.length>n;n++)f[n]=e[n];return f},a=function(e,r){var n,f,c="";if(r){if(n=e[15],n>16)throw"Decryption error: Maybe bad key";if(16===n)return"";for(f=0;16-n>f;f++)c+=String.fromCharCode(e[f])}else for(f=0;16>f;f++)c+=String.fromCharCode(e[f]);return c},o=function(e){var r,n="";for(r=0;e.length>r;r++)n+=(16>e[r]?"0":"")+e[r].toString(16);return n},d=function(e){var r=[];return e.replace(/(..)/g,function(e){r.push(parseInt(e,16))}),r},u=function(e,r){var n,c=[];for(r||(e=f(e)),n=0;e.length>n;n++)c[n]=e.charCodeAt(n);return c},i=function(n){switch(n){case 128:e=10,r=4;break;case 192:e=12,r=6;break;case 256:e=14,r=8;break;default:throw"Invalid Key Size Specified:"+n}},b=function(e){var r,n=[];for(r=0;e>r;r++)n=n.concat(Math.floor(256*Math.random()));return n},h=function(n,f){var c,t=e>=12?3:2,a=[],o=[],d=[],u=[],i=n.concat(f);for(d[0]=L(i),u=d[0],c=1;t>c;c++)d[c]=L(d[c-1].concat(i)),u=u.concat(d[c]);return a=u.slice(0,4*r),o=u.slice(4*r,4*r+16),{key:a,iv:o}},l=function(e,r,n){r=S(r);var f,c=Math.ceil(e.length/16),a=[],o=[];for(f=0;c>f;f++)a[f]=t(e.slice(16*f,16*f+16));for(0===e.length%16&&(a.push([16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16]),c++),f=0;a.length>f;f++)a[f]=0===f?x(a[f],n):x(a[f],o[f-1]),o[f]=s(a[f],r);return o},v=function(e,r,n,f){r=S(r);var t,o=e.length/16,d=[],u=[],i="";for(t=0;o>t;t++)d.push(e.slice(16*t,16*(t+1)));for(t=d.length-1;t>=0;t--)u[t]=p(d[t],r),u[t]=0===t?x(u[t],n):x(u[t],d[t-1]);for(t=0;o-1>t;t++)i+=a(u[t]);return i+=a(u[t],!0),f?i:c(i)},s=function(r,f){n=!1;var c,t=M(r,f,0);for(c=1;e+1>c;c++)t=g(t),t=y(t),e>c&&(t=k(t)),t=M(t,f,c);return t},p=function(r,f){n=!0;var c,t=M(r,f,e);for(c=e-1;c>-1;c--)t=y(t),t=g(t),t=M(t,f,c),c>0&&(t=k(t));return t},g=function(e){var r,f=n?D:B,c=[];for(r=0;16>r;r++)c[r]=f[e[r]];return c},y=function(e){var r,f=[],c=n?[0,13,10,7,4,1,14,11,8,5,2,15,12,9,6,3]:[0,5,10,15,4,9,14,3,8,13,2,7,12,1,6,11];for(r=0;16>r;r++)f[r]=e[c[r]];return f},k=function(e){var r,f=[];if(n)for(r=0;4>r;r++)f[4*r]=F[e[4*r]]^R[e[1+4*r]]^j[e[2+4*r]]^z[e[3+4*r]],f[1+4*r]=z[e[4*r]]^F[e[1+4*r]]^R[e[2+4*r]]^j[e[3+4*r]],f[2+4*r]=j[e[4*r]]^z[e[1+4*r]]^F[e[2+4*r]]^R[e[3+4*r]],f[3+4*r]=R[e[4*r]]^j[e[1+4*r]]^z[e[2+4*r]]^F[e[3+4*r]];else for(r=0;4>r;r++)f[4*r]=E[e[4*r]]^U[e[1+4*r]]^e[2+4*r]^e[3+4*r],f[1+4*r]=e[4*r]^E[e[1+4*r]]^U[e[2+4*r]]^e[3+4*r],f[2+4*r]=e[4*r]^e[1+4*r]^E[e[2+4*r]]^U[e[3+4*r]],f[3+4*r]=U[e[4*r]]^e[1+4*r]^e[2+4*r]^E[e[3+4*r]];return f},M=function(e,r,n){var f,c=[];for(f=0;16>f;f++)c[f]=e[f]^r[n][f];return c},x=function(e,r){var n,f=[];for(n=0;16>n;n++)f[n]=e[n]^r[n];return f},S=function(n){var f,c,t,a,o=[],d=[],u=[];for(f=0;r>f;f++)c=[n[4*f],n[4*f+1],n[4*f+2],n[4*f+3]],o[f]=c;for(f=r;4*(e+1)>f;f++){for(o[f]=[],t=0;4>t;t++)d[t]=o[f-1][t];for(0===f%r?(d=m(w(d)),d[0]^=K[f/r-1]):r>6&&4===f%r&&(d=m(d)),t=0;4>t;t++)o[f][t]=o[f-r][t]^d[t]}for(f=0;e+1>f;f++)for(u[f]=[],a=0;4>a;a++)u[f].push(o[4*f+a][0],o[4*f+a][1],o[4*f+a][2],o[4*f+a][3]);return u},m=function(e){for(var r=0;4>r;r++)e[r]=B[e[r]];return e},w=function(e){var r,n=e[0];for(r=0;4>r;r++)e[r]=e[r+1];return e[3]=n,e},A=function(e,r){var n,f=[];for(n=0;e.length>n;n+=r)f[n/r]=parseInt(e.substr(n,r),16);return f},C=function(e){var r,n=[];for(r=0;e.length>r;r++)n[e[r]]=r;return n},I=function(e,r){var n,f;for(f=0,n=0;8>n;n++)f=1===(1&r)?f^e:f,e=e>127?283^e<<1:e<<1,r>>>=1;return f},O=function(e){var r,n=[];for(r=0;256>r;r++)n[r]=I(e,r);return n},B=A("637c777bf26b6fc53001672bfed7ab76ca82c97dfa5947f0add4a2af9ca472c0b7fd9326363ff7cc34a5e5f171d8311504c723c31896059a071280e2eb27b27509832c1a1b6e5aa0523bd6b329e32f8453d100ed20fcb15b6acbbe394a4c58cfd0efaafb434d338545f9027f503c9fa851a3408f929d38f5bcb6da2110fff3d2cd0c13ec5f974417c4a77e3d645d197360814fdc222a908846eeb814de5e0bdbe0323a0a4906245cc2d3ac629195e479e7c8376d8dd54ea96c56f4ea657aae08ba78252e1ca6b4c6e8dd741f4bbd8b8a703eb5664803f60e613557b986c11d9ee1f8981169d98e949b1e87e9ce5528df8ca1890dbfe6426841992d0fb054bb16",2),D=C(B),K=A("01020408102040801b366cd8ab4d9a2f5ebc63c697356ad4b37dfaefc591",2),E=O(2),U=O(3),z=O(9),R=O(11),j=O(13),F=O(14),G=function(e,r,n){var f,c=b(8),t=h(u(r,n),c),a=t.key,o=t.iv,d=[[83,97,108,116,101,100,95,95].concat(c)];return e=u(e,n),f=l(e,a,o),f=d.concat(f),T.encode(f)},H=function(e,r,n){var f=T.decode(e),c=f.slice(8,16),t=h(u(r,n),c),a=t.key,o=t.iv;return f=f.slice(16,f.length),e=v(f,a,o,n)},L=function(e){function r(e,r){return e<<r|e>>>32-r}function n(e,r){var n,f,c,t,a;return c=2147483648&e,t=2147483648&r,n=1073741824&e,f=1073741824&r,a=(1073741823&e)+(1073741823&r),n&f?2147483648^a^c^t:n|f?1073741824&a?3221225472^a^c^t:1073741824^a^c^t:a^c^t}function f(e,r,n){return e&r|~e&n}function c(e,r,n){return e&n|r&~n}function t(e,r,n){return e^r^n}function a(e,r,n){return r^(e|~n)}function o(e,c,t,a,o,d,u){return e=n(e,n(n(f(c,t,a),o),u)),n(r(e,d),c)}function d(e,f,t,a,o,d,u){return e=n(e,n(n(c(f,t,a),o),u)),n(r(e,d),f)}function u(e,f,c,a,o,d,u){return e=n(e,n(n(t(f,c,a),o),u)),n(r(e,d),f)}function i(e,f,c,t,o,d,u){return e=n(e,n(n(a(f,c,t),o),u)),n(r(e,d),f)}function b(e){for(var r,n=e.length,f=n+8,c=(f-f%64)/64,t=16*(c+1),a=[],o=0,d=0;n>d;)r=(d-d%4)/4,o=8*(d%4),a[r]=a[r]|e[d]<<o,d++;return r=(d-d%4)/4,o=8*(d%4),a[r]=a[r]|128<<o,a[t-2]=n<<3,a[t-1]=n>>>29,a}function h(e){var r,n,f=[];for(n=0;3>=n;n++)r=255&e>>>8*n,f=f.concat(r);return f}var l,v,s,p,g,y,k,M,x,S=[],m=A("67452301efcdab8998badcfe10325476d76aa478e8c7b756242070dbc1bdceeef57c0faf4787c62aa8304613fd469501698098d88b44f7afffff5bb1895cd7be6b901122fd987193a679438e49b40821f61e2562c040b340265e5a51e9b6c7aad62f105d02441453d8a1e681e7d3fbc821e1cde6c33707d6f4d50d87455a14eda9e3e905fcefa3f8676f02d98d2a4c8afffa39428771f6816d9d6122fde5380ca4beea444bdecfa9f6bb4b60bebfbc70289b7ec6eaa127fad4ef308504881d05d9d4d039e6db99e51fa27cf8c4ac5665f4292244432aff97ab9423a7fc93a039655b59c38f0ccc92ffeff47d85845dd16fa87e4ffe2ce6e0a30143144e0811a1f7537e82bd3af2352ad7d2bbeb86d391",8);for(S=b(e),y=m[0],k=m[1],M=m[2],x=m[3],l=0;S.length>l;l+=16)v=y,s=k,p=M,g=x,y=o(y,k,M,x,S[l+0],7,m[4]),x=o(x,y,k,M,S[l+1],12,m[5]),M=o(M,x,y,k,S[l+2],17,m[6]),k=o(k,M,x,y,S[l+3],22,m[7]),y=o(y,k,M,x,S[l+4],7,m[8]),x=o(x,y,k,M,S[l+5],12,m[9]),M=o(M,x,y,k,S[l+6],17,m[10]),k=o(k,M,x,y,S[l+7],22,m[11]),y=o(y,k,M,x,S[l+8],7,m[12]),x=o(x,y,k,M,S[l+9],12,m[13]),M=o(M,x,y,k,S[l+10],17,m[14]),k=o(k,M,x,y,S[l+11],22,m[15]),y=o(y,k,M,x,S[l+12],7,m[16]),x=o(x,y,k,M,S[l+13],12,m[17]),M=o(M,x,y,k,S[l+14],17,m[18]),k=o(k,M,x,y,S[l+15],22,m[19]),y=d(y,k,M,x,S[l+1],5,m[20]),x=d(x,y,k,M,S[l+6],9,m[21]),M=d(M,x,y,k,S[l+11],14,m[22]),k=d(k,M,x,y,S[l+0],20,m[23]),y=d(y,k,M,x,S[l+5],5,m[24]),x=d(x,y,k,M,S[l+10],9,m[25]),M=d(M,x,y,k,S[l+15],14,m[26]),k=d(k,M,x,y,S[l+4],20,m[27]),y=d(y,k,M,x,S[l+9],5,m[28]),x=d(x,y,k,M,S[l+14],9,m[29]),M=d(M,x,y,k,S[l+3],14,m[30]),k=d(k,M,x,y,S[l+8],20,m[31]),y=d(y,k,M,x,S[l+13],5,m[32]),x=d(x,y,k,M,S[l+2],9,m[33]),M=d(M,x,y,k,S[l+7],14,m[34]),k=d(k,M,x,y,S[l+12],20,m[35]),y=u(y,k,M,x,S[l+5],4,m[36]),x=u(x,y,k,M,S[l+8],11,m[37]),M=u(M,x,y,k,S[l+11],16,m[38]),k=u(k,M,x,y,S[l+14],23,m[39]),y=u(y,k,M,x,S[l+1],4,m[40]),x=u(x,y,k,M,S[l+4],11,m[41]),M=u(M,x,y,k,S[l+7],16,m[42]),k=u(k,M,x,y,S[l+10],23,m[43]),y=u(y,k,M,x,S[l+13],4,m[44]),x=u(x,y,k,M,S[l+0],11,m[45]),M=u(M,x,y,k,S[l+3],16,m[46]),k=u(k,M,x,y,S[l+6],23,m[47]),y=u(y,k,M,x,S[l+9],4,m[48]),x=u(x,y,k,M,S[l+12],11,m[49]),M=u(M,x,y,k,S[l+15],16,m[50]),k=u(k,M,x,y,S[l+2],23,m[51]),y=i(y,k,M,x,S[l+0],6,m[52]),x=i(x,y,k,M,S[l+7],10,m[53]),M=i(M,x,y,k,S[l+14],15,m[54]),k=i(k,M,x,y,S[l+5],21,m[55]),y=i(y,k,M,x,S[l+12],6,m[56]),x=i(x,y,k,M,S[l+3],10,m[57]),M=i(M,x,y,k,S[l+10],15,m[58]),k=i(k,M,x,y,S[l+1],21,m[59]),y=i(y,k,M,x,S[l+8],6,m[60]),x=i(x,y,k,M,S[l+15],10,m[61]),M=i(M,x,y,k,S[l+6],15,m[62]),k=i(k,M,x,y,S[l+13],21,m[63]),y=i(y,k,M,x,S[l+4],6,m[64]),x=i(x,y,k,M,S[l+11],10,m[65]),M=i(M,x,y,k,S[l+2],15,m[66]),k=i(k,M,x,y,S[l+9],21,m[67]),y=n(y,v),k=n(k,s),M=n(M,p),x=n(x,g);return h(y).concat(h(k),h(M),h(x))},T=function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=e.split(""),n=function(e){var n,f,c=[],t="";for(Math.floor(16*e.length/3),n=0;16*e.length>n;n++)c.push(e[Math.floor(n/16)][n%16]);for(n=0;c.length>n;n+=3)t+=r[c[n]>>2],t+=r[(3&c[n])<<4|c[n+1]>>4],t+=void 0!==c[n+1]?r[(15&c[n+1])<<2|c[n+2]>>6]:"=",t+=void 0!==c[n+2]?r[63&c[n+2]]:"=";for(f=t.slice(0,64)+"\n",n=1;Math.ceil(t.length/64)>n;n++)f+=t.slice(64*n,64*n+64)+(Math.ceil(t.length/64)===n+1?"":"\n");return f},f=function(r){r=r.replace(/\n/g,"");var n,f=[],c=[],t=[];for(n=0;r.length>n;n+=4)c[0]=e.indexOf(r.charAt(n)),c[1]=e.indexOf(r.charAt(n+1)),c[2]=e.indexOf(r.charAt(n+2)),c[3]=e.indexOf(r.charAt(n+3)),t[0]=c[0]<<2|c[1]>>4,t[1]=(15&c[1])<<4|c[2]>>2,t[2]=(3&c[2])<<6|c[3],f.push(t[0],t[1],t[2]);return f=f.slice(0,f.length-f.length%16)};return"function"==typeof Array.indexOf&&(e=r),{encode:n,decode:f}}();return{size:i,h2a:d,expandKey:S,encryptBlock:s,decryptBlock:p,Decrypt:n,s2a:u,rawEncrypt:l,rawDecrypt:v,dec:H,openSSLKey:h,a2h:o,enc:G,Hash:{MD5:L},Base64:T}});


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