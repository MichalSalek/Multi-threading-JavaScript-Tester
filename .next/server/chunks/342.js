exports.id = 342;
exports.ids = [342];
exports.modules = {

/***/ 7829:
/***/ ((module) => {

// Exports
module.exports = {
	"button": "AppComponents_button__O8NiK"
};


/***/ }),

/***/ 3024:
/***/ ((module) => {

// Exports
module.exports = {
	"host": "NavLinks_host__h1G27"
};


/***/ }),

/***/ 4017:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AppComponents_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7829);
/* harmony import */ var _AppComponents_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_AppComponents_module_scss__WEBPACK_IMPORTED_MODULE_3__);




const AppButtonAtom = (props)=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Button, {
        color: 'primary',
        variant: 'contained',
        className: (_AppComponents_module_scss__WEBPACK_IMPORTED_MODULE_3___default().button),
        ...props
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppButtonAtom);


/***/ }),

/***/ 6342:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_routes_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(872);
/* harmony import */ var _app_components_AppButton_atom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4017);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _NavLinks_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3024);
/* harmony import */ var _NavLinks_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_NavLinks_module_scss__WEBPACK_IMPORTED_MODULE_5__);







const NavLinksMolecule = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const { 0: disableButtons , 1: setDisableButtons  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const handleClick = (appRoute)=>{
        setDisableButtons(true);
        router.push(appRoute);
    };
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("nav", {
        className: (_NavLinks_module_scss__WEBPACK_IMPORTED_MODULE_5___default().host),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_AppButton_atom__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    disabled: disableButtons || router.pathname === _core_routes_core__WEBPACK_IMPORTED_MODULE_6__/* .ROUTE_START_PAGE_SCREEN */ .tL,
                    onClick: ()=>handleClick(_core_routes_core__WEBPACK_IMPORTED_MODULE_6__/* .ROUTE_START_PAGE_SCREEN */ .tL)
                    ,
                    children: "Welcome screen"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_AppButton_atom__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    disabled: disableButtons || router.pathname === _core_routes_core__WEBPACK_IMPORTED_MODULE_6__/* .ROUTE_MAIN_APP_SCREEN */ .Z9,
                    onClick: ()=>handleClick(_core_routes_core__WEBPACK_IMPORTED_MODULE_6__/* .ROUTE_MAIN_APP_SCREEN */ .Z9)
                    ,
                    children: "Main app page"
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavLinksMolecule);


/***/ })

};
;