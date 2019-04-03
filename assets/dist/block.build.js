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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/block.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/block.js":
/*!*****************************!*\
  !*** ./assets/src/block.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var __ = wp.i18n.__;\nvar registerBlockType = wp.blocks.registerBlockType;\nvar _wp$components = wp.components,\n    ServerSideRender = _wp$components.ServerSideRender,\n    RangeControl = _wp$components.RangeControl,\n    TextControl = _wp$components.TextControl,\n    TextareaControl = _wp$components.TextareaControl,\n    PanelBody = _wp$components.PanelBody;\nvar withSelect = wp.data.withSelect;\nvar InspectorControls = wp.editor.InspectorControls;\nvar createElement = wp.element.createElement;\nvar icon = createElement('svg', {\n  width: 20,\n  height: 20\n}, createElement('path', {\n  d: 'M16,19 L16,20 C16,21.1045695 15.1045695,22 14,22 L4,22 C2.8954305,22 2,21.1045695 2,20 L2,10 C2,8.8954305 2.8954305,8 4,8 L5,8 L5,7 C5,5.8954305 5.8954305,5 7,5 L8,5 L8,4 C8,2.8954305 8.8954305,2 10,2 L20,2 C21.1045695,2 22,2.8954305 22,4 L22,14 C22,15.1045695 21.1045695,16 20,16 L19,16 L19,17 C19,18.1045695 18.1045695,19 17,19 L16,19 Z M16,17 L17,17 L17,7 L7,7 L7,8 L14,8 C15.1045695,8 16,8.8954305 16,10 L16,17 Z M19,14 L20,14 L20,4 L10,4 L10,5 L17,5 C18.1045695,5 19,5.8954305 19,7 L19,14 Z M4,10 L4,20 L14,20 L14,10 L4,10 Z M5,11 L13,11 L13,13 L5,13 L5,11 Z M5,14 L13,14 L13,16 L5,16 L5,14 Z M5,17 L13,17 L13,19 L5,19 L5,17 Z',\n  transform: 'translate(-2.000000, -2.000000)'\n}));\nregisterBlockType('curatewp/related-posts', {\n  title: __('Related Posts by CurateWP', 'cwprp'),\n  description: __('Related Posts Description', 'cwprp'),\n  icon: icon,\n  category: 'curatewp',\n  keywords: [__('CurateWP', 'cwprp'), __('Related Posts', 'cwprp'), __('Related', 'cwprp')],\n  attributes: {\n    number: {\n      type: 'number',\n      default: 5\n    },\n    title: {\n      type: 'string'\n    },\n    description: {\n      type: 'string'\n    }\n  },\n  edit: withSelect(function (select) {\n    return {\n      post_id: select('core/editor').getCurrentPostId()\n    };\n  })(function (props) {\n    var onChangeNumber = function onChangeNumber(number) {\n      return props.setAttributes({\n        number: number\n      });\n    };\n\n    var onChangeTitle = function onChangeTitle(title) {\n      return props.setAttributes({\n        title: title\n      });\n    };\n\n    var onChangeDescription = function onChangeDescription(description) {\n      return props.setAttributes({\n        description: description\n      });\n    };\n\n    return React.createElement(\"div\", null, React.createElement(InspectorControls, null, React.createElement(PanelBody, {\n      initialOpen: true\n    }, React.createElement(RangeControl, {\n      label: __('Number of posts to show', 'cwprp'),\n      value: props.attributes.number,\n      min: 1,\n      onChange: onChangeNumber\n    }), React.createElement(TextControl, {\n      label: __('Title', 'cwprp'),\n      value: props.attributes.title,\n      onChange: onChangeTitle\n    }), React.createElement(TextareaControl, {\n      label: __('Description', 'cwprp'),\n      value: props.attributes.description,\n      onChange: onChangeDescription\n    }))), React.createElement(ServerSideRender, {\n      block: \"curatewp/related-posts\",\n      attributes: props.attributes,\n      urlQueryArgs: {\n        post_id: props.post_id\n      }\n    }));\n  }),\n  save: function save() {\n    return null;\n  }\n});\n\n//# sourceURL=webpack:///./assets/src/block.js?");

/***/ })

/******/ });