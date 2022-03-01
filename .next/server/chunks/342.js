exports.id = 342;
exports.ids = [342];
exports.modules = {

/***/ 6279:
/***/ ((module) => {

// Exports
module.exports = {
	"host": "navLinks_host__oSSau"
};


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
/* harmony import */ var _core_routes_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(872);
/* harmony import */ var _app_components_AppButton_atom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4017);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _navLinks_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6279);
/* harmony import */ var _navLinks_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_navLinks_module_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_Zoom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1528);
/* harmony import */ var _mui_material_Zoom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Zoom__WEBPACK_IMPORTED_MODULE_5__);








const NavLinksMolecule = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const { 0: disableButtons , 1: setDisableButtons  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const handleClick = (appRoute)=>{
        setDisableButtons(true);
        router.push(appRoute);
    };
    const StyledBadge = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_mui_material__WEBPACK_IMPORTED_MODULE_4__.styled)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Badge)(()=>({
                '& .MuiBadge-badge': {
                    right: -22
                }
            })
        )
    , []);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("nav", {
        className: (_navLinks_module_scss__WEBPACK_IMPORTED_MODULE_6___default().host),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_AppButton_atom__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    size: 'small',
                    disabled: disableButtons || router.pathname === _core_routes_core__WEBPACK_IMPORTED_MODULE_7__/* .ROUTE_START_PAGE_SCREEN */ .tL,
                    onClick: ()=>handleClick(_core_routes_core__WEBPACK_IMPORTED_MODULE_7__/* .ROUTE_START_PAGE_SCREEN */ .tL)
                    ,
                    children: "Welcome screen"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_AppButton_atom__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    size: 'small',
                    disabled: disableButtons || router.pathname === _core_routes_core__WEBPACK_IMPORTED_MODULE_7__/* .ROUTE_MAIN_APP_SCREEN */ .Z9,
                    onClick: ()=>handleClick(_core_routes_core__WEBPACK_IMPORTED_MODULE_7__/* .ROUTE_MAIN_APP_SCREEN */ .Z9)
                    ,
                    children: "Main app page"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_AppButton_atom__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    size: 'small',
                    disabled: true,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledBadge, {
                        color: 'secondary',
                        badgeContent: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
                            placement: 'top-start',
                            title: "Future feature",
                            TransitionComponent: (_mui_material_Zoom__WEBPACK_IMPORTED_MODULE_5___default()),
                            arrow: true,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: " soon"
                            })
                        }),
                        children: "Scoreboard"
                    })
                })
            ]
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavLinksMolecule);


/***/ })

};
;