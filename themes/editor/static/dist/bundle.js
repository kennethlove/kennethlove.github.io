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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var tlite = __webpack_require__(1);

var classWhen = function classWhen(el) {
    var classes = (el.className || '').split(' ');
    return function (cssClass, opts) {
        return ~classes.indexOf(cssClass) && opts;
    };
};

var focusTooltips = function focusTooltips() {
    var posts = document.querySelectorAll('.post-nav-item');

    var _loop = function _loop(post) {
        post.addEventListener('focus', function () {
            tlite.show(post, { grav: 'e' });
        });
        post.addEventListener('blur', function () {
            tlite.hide(post);
        });
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = posts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var post = _step.value;

            _loop(post);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

tlite(function (el) {
    var when = classWhen(el);
    return when('post-nav-item', { grav: 'e' });
});
focusTooltips();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function tlite(getTooltipOpts) {
  document.addEventListener('mouseover', function (e) {
    var el = e.target;
    var opts = getTooltipOpts(el);

    if (!opts) {
      el = el.parentElement;
      opts = el && getTooltipOpts(el);
    }

    opts && tlite.show(el, opts, true);
  });
}

tlite.show = function (el, opts, isAuto) {
  var fallbackAttrib = 'data-tlite';
  opts = opts || {};

  (el.tooltip || Tooltip(el, opts)).show();

  function Tooltip(el, opts) {
    var tooltipEl;
    var showTimer;
    var text;

    el.addEventListener('mousedown', autoHide);
    el.addEventListener('mouseleave', autoHide);

    function show() {
      text = el.title || el.getAttribute(fallbackAttrib) || text;
      el.title = '';
      el.setAttribute(fallbackAttrib, '');
      text && !showTimer && (showTimer = setTimeout(fadeIn, isAuto ? 150 : 1))
    }

    function autoHide() {
      tlite.hide(el, true);
    }

    function hide(isAutoHiding) {
      if (isAuto === isAutoHiding) {
        showTimer = clearTimeout(showTimer);
        tooltipEl && el.removeChild(tooltipEl);

        tooltipEl = undefined;
      }
    }

    function fadeIn() {
      if (!tooltipEl) {
        tooltipEl = createTooltip(el, text, opts);
      }
    }

    return el.tooltip = {
      show: show,
      hide: hide
    };
  }

  function createTooltip(el, text, opts) {
    var tooltipEl = document.createElement('span');
    var grav = opts.grav || el.getAttribute('data-tlite') || 'n';

    tooltipEl.innerHTML = text;

    el.appendChild(tooltipEl);

    var vertGrav = grav[0] || '';
    var horzGrav = grav[1] || '';

    function positionTooltip() {
      tooltipEl.className = 'tlite ' + 'tlite-' + vertGrav + horzGrav;

      var arrowSize = 10;
      var top = el.offsetTop;
      var left = el.offsetLeft;

      if (tooltipEl.offsetParent === el) {
        top = left = 0;
      }

      var width = el.offsetWidth;
      var height = el.offsetHeight;
      var tooltipHeight = tooltipEl.offsetHeight;
      var tooltipWidth = tooltipEl.offsetWidth;
      var centerEl = left + (width / 2);

      tooltipEl.style.top = (
        vertGrav === 's' ? (top - tooltipHeight - arrowSize) :
        vertGrav === 'n' ? (top + height + arrowSize) :
        (top + (height / 2) - (tooltipHeight / 2))
      ) + 'px';

      tooltipEl.style.left = (
        horzGrav === 'w' ? left :
        horzGrav === 'e' ? left + width - tooltipWidth :
        vertGrav === 'w' ? (left + width + arrowSize) :
        vertGrav === 'e' ? (left - tooltipWidth - arrowSize) :
        (centerEl - tooltipWidth / 2)
      ) + 'px';
    }

    positionTooltip();

    var rect = tooltipEl.getBoundingClientRect();

    if (vertGrav === 's' && rect.top < 0) {
      vertGrav = 'n';
      positionTooltip();
    } else if (vertGrav === 'n' && rect.bottom > window.innerHeight) {
      vertGrav = 's';
      positionTooltip();
    } else if (vertGrav === 'e' && rect.left < 0) {
      vertGrav = 'w';
      positionTooltip();
    } else if (vertGrav === 'w' && rect.right > window.innerWidth) {
      vertGrav = 'e';
      positionTooltip();
    }

    tooltipEl.className += ' tlite-visible';

    return tooltipEl;
  }
};

tlite.hide = function (el, isAuto) {
  el.tooltip && el.tooltip.hide(isAuto);
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = tlite;
}


/***/ })
/******/ ]);