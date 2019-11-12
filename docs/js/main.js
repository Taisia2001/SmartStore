/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/main.scss */ \"./src/scss/main.scss\");\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);\n\nvar cart = {};\nvar data;\nvar cartGoods = 0;\n$('document').ready(function () {\n  var requestURL = 'https://nit.tron.net.ua/api/product/list';\n  var request = new XMLHttpRequest();\n  request.open('GET', requestURL);\n  request.responseType = 'json';\n  request.send();\n\n  request.onload = function () {\n    data = request.response;\n    checkCart();\n    changeCart(0);\n    $('.bFoot').html('<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button> <button type=\"button\" class=\"btn btn-primary\" onclick=\"createPost()\">Buy</button>');\n  };\n\n  initNav();\n  loadGoods('https://nit.tron.net.ua/api/product/list', 'All Products');\n});\n\nfunction createPost() {\n  $.post('https://nit.tron.net.ua/api/order/add', {\n    //products = '1:5, 2:2, 4:2'\n    token: 'x8H_i721iqlF4YP2BTAU',\n    name: null,\n    phone: '+380559865432',\n    async: false,\n    email: 'nit@gmail.com',\n    products: {\n      cart: cart\n    }\n  }, function (data, textStatus, jqXHR) {\n    alert(textStatus);\n  });\n}\n\nfunction initNav() {\n  var requestURL = 'https://nit.tron.net.ua/api/category/list';\n  var request = new XMLHttpRequest();\n  request.open('GET', requestURL);\n  request.responseType = 'json';\n  request.send();\n\n  request.onload = function () {\n    var menu = request.response;\n    var out = \"<a onclick='changeGoods(this)' data-art='1' class=\\\"categories standard_el\\\">All</a>\";\n    menu.forEach(function (item) {\n      out += \"<a onclick='changeGoods(this)' data-art='\" + item.id + \"' class=\\\"categories standard_el\\\">\";\n      out += item.name;\n      out += \"</a>\";\n    });\n    $('#navigation').html(out);\n  };\n}\n\nfunction changeGoods(item) {\n  if ($(item).attr('data-art') == 1) {\n    loadGoods('https://nit.tron.net.ua/api/product/list', item.innerHTML + ' Products');\n  } else {\n    loadGoods('https://nit.tron.net.ua/api/product/list/category/' + $(item).attr('data-art'), item.innerHTML);\n  }\n}\n\nfunction loadGoods(url, header) {\n  var requestURL = url;\n  var request = new XMLHttpRequest();\n  request.open('GET', requestURL);\n  request.responseType = 'json';\n  request.send();\n  var out = '<h2 class=\"content_header\">' + header + '</h2><div class=\"row \">';\n\n  request.onload = function () {\n    var products = request.response;\n    products.forEach(function (item) {\n      out += '<div class=\"books col-lg-3\"> <img src=\"' + item.image_url + '\" data-toggle=\"modal\" data-target=\"#productModal\" onclick=\"prodModal(this)\"  alt=\"img\" data-art=\"' + item.id + '\"><br>';\n\n      if (item.special_price != null) {\n        out += '<span class=\"price last_price\">' + item.price + '₴</span>';\n        out += '<span class=\"price\">' + item.special_price + '₴</span><br>';\n      } else {\n        out += '<span class=\"price\">' + item.price + '₴</span><br>';\n      }\n\n      out += '<a onclick=\"prodModal(this)\" data-toggle=\"modal\" data-target=\"#productModal\" data-art=\"' + item.id + '\">' + item.name + '</a> <br><button class=\"buy_button\" onclick=\"addToCart(this)\" data-art=\"' + item.id + '\" data-toggle=\"modal\" data-target=\"#cartModal\" >Buy</button></div>';\n    });\n    out += '</div>';\n    $('.container').html(out);\n  };\n}\n\nfunction prodModal(item) {\n  var el = getElementById($(item).attr('data-art'));\n  $('.product-title').html(el.name);\n  var inner = ' <img src=\"' + el.image_url + '\" alt=\"img\" data-art=\"' + item.id + '\"><br>';\n  inner += '<br><h4>' + el.name + '</h4>';\n\n  if (el.special_price != null) {\n    inner += '<span class=\"price last_price\">' + el.price + '₴ </span>';\n    inner += '<span class=\"price\"> ' + el.special_price + '₴</span><br>';\n  } else {\n    inner += '<span class=\"price\">  ' + el.price + '₴</span><br>';\n  }\n\n  inner += '<br><p class=\"description\">' + el.description + '</p>';\n  $('#product-content').html(inner);\n  inner = '<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button> <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" data-toggle=\"modal\" data-target=\"#cartModal\" onclick=\"addToCart(this)\" data-art=\"' + el.id + '\" >Buy</button>';\n  $('.prod').html(inner);\n}\n\nfunction addToCart(item) {\n  if (cart[$(item).attr('data-art')] != undefined) {\n    cart[$(item).attr('data-art')]++;\n  } else {\n    cart[$(item).attr('data-art')] = 1;\n  }\n\n  changeCart(1);\n}\n\nfunction changeCart(num) {\n  var out = '';\n  var total = 0;\n  var totalS = '';\n  cartGoods = cartGoods + num;\n\n  if (cartGoods == 0) {\n    out = '<span class=\"empty\">Your cart is empty</span>';\n  } else {\n    var el;\n\n    for (var w in cart) {\n      el = getElementById(w);\n      out += '<div class=\"book\">';\n      out += '<button class=\"delete\" data-art=\"' + w + '\">x</button>';\n      out += '<img src=\"' + el.image_url + '\"><br>';\n      out += '<span class=\"name\">' + el.name + '</span>';\n      out += '<span class=\"priceC\"> ' + el.price + '₴</span><br>';\n      out += '<span class=\"change\"><button class=\"minus_button\" data-art=\"' + w + '\"+>-</button>';\n      out += '<span class=\"num\">' + cart[w] + '</span>';\n      out += '<button class=\"plus_button\" data-art=\"' + w + '\"+>+</button>';\n      out += '<span class=\"total\">' + el.price * cart[w] + '₴</span></span>';\n      out += '</div><br>';\n      total += el.price * cart[w];\n    }\n\n    totalS = 'Total: ' + total + '₴';\n  }\n\n  $('#cart_number').html(cartGoods);\n  $('#cart_total').html(totalS);\n  $('#cart-content').html(out);\n  $('button.delete').on('click', deleteFromCart);\n  $('button.plus_button').on('click', plusBooks);\n  $('button.minus_button').on('click', minusBooks);\n  localStorage.setItem('cart', JSON.stringify(cart));\n}\n\nfunction getElementById(id) {\n  for (var k in data) {\n    if (data[k].id == id) return data[k];\n  }\n}\n\nfunction plusBooks() {\n  var articul = $(this).attr('data-art');\n  cart[articul]++;\n  changeCart(1);\n}\n\nfunction minusBooks() {\n  var articul = $(this).attr('data-art');\n\n  if (cart[articul] > 1) {\n    cart[articul]--;\n    changeCart(-1);\n  }\n}\n\nfunction deleteFromCart() {\n  var articul = $(this).attr('data-art');\n  cartGoods = cartGoods - 1 * cart[articul];\n  delete cart[articul];\n  changeCart(0);\n}\n\nfunction checkCart() {\n  if (localStorage.getItem('cart') != null) {\n    cart = JSON.parse(localStorage.getItem('cart'));\n\n    for (var i in cart) {\n      cartGoods += cart[i];\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/scss/main.scss?");

/***/ })

/******/ });