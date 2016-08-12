# Angular-Ajax-Encrypt
AngularJs Directives for connection with the back end php https://github.com/davidzas/Back-End-Php 

# Installation

  bower install --save angular-ajax-encrypt
  
#Implementation
``` javascript
angular.module('yourModule',['angular.ajax.encrypt']).config(function($AjaxProvider){
  $AjaxProvider.host('http://your-domain-and-back-end/controllers/');
  $AjaxProvider.setKey("your key");
  // optional
  $AjaxProvider.setDebbug(true); // true enables console logs and false disables it.
});
```

#Credits
GibberishAES https://github.com/mdp/gibberish-aes

#Licence (MIT)

Copyright (c) 2016 David Tobar alias DavidZas

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


