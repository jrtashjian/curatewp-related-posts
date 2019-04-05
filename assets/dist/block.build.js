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

eval("function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar __ = wp.i18n.__;\nvar registerBlockType = wp.blocks.registerBlockType;\nvar _wp$components = wp.components,\n    ServerSideRender = _wp$components.ServerSideRender,\n    PanelBody = _wp$components.PanelBody,\n    ExternalLink = _wp$components.ExternalLink,\n    RangeControl = _wp$components.RangeControl,\n    ToggleControl = _wp$components.ToggleControl,\n    SelectControl = _wp$components.SelectControl;\nvar withSelect = wp.data.withSelect;\nvar _wp$editor = wp.editor,\n    InspectorControls = _wp$editor.InspectorControls,\n    RichText = _wp$editor.RichText;\nvar Fragment = wp.element.Fragment;\nvar icon = React.createElement(\"svg\", {\n  viewbox: \"0 0 24 24\"\n}, React.createElement(\"g\", {\n  fill: \"none\",\n  \"fill-rule\": \"evenodd\"\n}, React.createElement(\"rect\", {\n  fill: \"#FFD700\",\n  width: \"24\",\n  height: \"24\",\n  rx: \"2\"\n}), React.createElement(\"path\", {\n  d: \"M18 16l-2 1-7-4v-1-1l7-4a3 3 0 0 0 5-2 3 3 0 1 0-6 1l-7 4a3 3 0 0 0-5 2 3 3 0 0 0 5 2l7 4v1a3 3 0 1 0 3-3z\",\n  fill: \"#191500\",\n  \"fill-rule\": \"nonzero\"\n})));\nregisterBlockType('curatewp/related-posts', {\n  title: __('Related Posts', 'cwprp'),\n  description: React.createElement(Fragment, null, React.createElement(\"p\", null, __('Keep visitors engaged by highlighting relevant content.', 'cwprp')), React.createElement(ExternalLink, {\n    href: \"https://curatewp.com/\"\n  }, __('Get CurateWP', 'cwprp'))),\n  icon: icon,\n  category: 'curatewp',\n  keywords: [__('related', 'cwprp'), __('engagement', 'cwprp'), __('similar', 'cwprp')],\n  attributes: {\n    title: {\n      type: 'string'\n    },\n    description: {\n      type: 'string'\n    },\n    in_category: {\n      type: 'boolean',\n      default: true\n    },\n    in_tag: {\n      type: 'boolean',\n      default: false\n    },\n    number: {\n      type: 'number',\n      default: 5\n    },\n    orderby: {\n      type: 'string',\n      default: 'rand'\n    },\n    order: {\n      type: 'string',\n      default: ''\n    }\n  },\n  edit: withSelect(function (select) {\n    return {\n      post_id: select('core/editor').getCurrentPostId()\n    };\n  })(function (_ref) {\n    var post_id = _ref.post_id,\n        setAttributes = _ref.setAttributes,\n        attributes = _ref.attributes,\n        isSelected = _ref.isSelected;\n    var number = attributes.number,\n        orderby = attributes.orderby,\n        order = attributes.order,\n        title = attributes.title,\n        description = attributes.description,\n        in_category = attributes.in_category,\n        in_tag = attributes.in_tag;\n    return React.createElement(\"div\", null, React.createElement(InspectorControls, null, React.createElement(PanelBody, {\n      initialOpen: true\n    }, React.createElement(RangeControl, {\n      label: __('Number of posts to show', 'cwprp'),\n      value: number,\n      min: 1,\n      onChange: function onChange(number) {\n        return setAttributes({\n          number: number\n        });\n      }\n    }), React.createElement(SelectControl, {\n      label: __('Order by', 'cwprp'),\n      value: \"\".concat(orderby, \"/\").concat(order),\n      options: [{\n        /* translators: label for ordering posts by date in descending order. */\n        label: __('Newest to Oldest', 'cwprp'),\n        value: 'date/desc'\n      }, {\n        /* translators: label for ordering posts by date in ascending order. */\n        label: __('Oldest to Newest', 'cwprp'),\n        value: 'date/asc'\n      }, {\n        /* translators: label for ordering posts by title in ascending order. */\n        label: __('A → Z', 'cwprp'),\n        value: 'title/asc'\n      }, {\n        /* translators: label for ordering posts by title in descending order. */\n        label: __('Z → A', 'cwprp'),\n        value: 'title/desc'\n      }, {\n        /* translators: label for randomly ordering posts. */\n        label: __('Random', 'cwprp'),\n        value: 'rand/'\n      }],\n      onChange: function onChange(value) {\n        var _value$split = value.split('/'),\n            _value$split2 = _slicedToArray(_value$split, 2),\n            newOrderBy = _value$split2[0],\n            newOrder = _value$split2[1];\n\n        if (newOrder !== order) {\n          setAttributes({\n            order: newOrder\n          });\n        }\n\n        if (newOrderBy !== orderby) {\n          setAttributes({\n            orderby: newOrderBy\n          });\n        }\n      }\n    }), React.createElement(ToggleControl, {\n      label: __('In Category', 'cwprp'),\n      help: in_category ? __('Including posts from the same categories.', 'cwprp') : __('Toggle to show posts from the same categories.', 'cwprp'),\n      checked: in_category,\n      onChange: function onChange() {\n        return setAttributes({\n          in_category: !in_category\n        });\n      }\n    }), React.createElement(ToggleControl, {\n      label: __('In Tag', 'cwprp'),\n      help: in_tag ? __('Including posts from the same tags.', 'cwprp') : __('Toggle to show posts from the same tags.', 'cwprp'),\n      checked: in_tag,\n      onChange: function onChange() {\n        return setAttributes({\n          in_tag: !in_tag\n        });\n      }\n    }))), (title || isSelected) && React.createElement(RichText, {\n      tagName: \"h3\",\n      className: \"curatewp-section-header__title\",\n      placeholder: __('Title for section', 'cwprp'),\n      value: title,\n      formattingControls: [],\n      multiline: false,\n      onChange: function onChange(title) {\n        return setAttributes({\n          title: title.replace(/<br>/gi, ' ')\n        });\n      }\n    }), (description || isSelected) && React.createElement(RichText, {\n      tagName: \"p\",\n      className: \"curatewp-section-header__description\",\n      placeholder: __('Description for section...', 'cwprp'),\n      value: description,\n      formattingControls: [],\n      multiline: false,\n      onChange: function onChange(description) {\n        return setAttributes({\n          description: description.replace(/<br>/gi, ' ')\n        });\n      }\n    }), React.createElement(ServerSideRender, {\n      block: \"curatewp/related-posts\",\n      attributes: {\n        in_category: in_category,\n        in_tag: in_tag,\n        number: number,\n        orderby: orderby,\n        order: order\n      },\n      urlQueryArgs: {\n        post_id: post_id\n      }\n    }));\n  }),\n  save: function save() {\n    return null;\n  }\n});\n\n//# sourceURL=webpack:///./assets/src/block.js?");

/***/ })

/******/ });