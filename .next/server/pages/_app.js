(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 5338:
/***/ ((module) => {

// Exports
module.exports = {
	"host": "FPSMonitor_host__WJnrH"
};


/***/ }),

/***/ 2227:
/***/ ((module) => {

// Exports
module.exports = {
	"host": "workersGlobalWorkControl_host__n_oYn"
};


/***/ }),

/***/ 4449:
/***/ ((module) => {

// Exports
module.exports = {
	"host": "workersScoreboard_host__MXgva",
	"worker": "workersScoreboard_worker__Ig6Qb",
	"labelInfo": "workersScoreboard_labelInfo__zI1Tc",
	"listGrid": "workersScoreboard_listGrid__ioY6g",
	"smallAndBoldHeading": "workersScoreboard_smallAndBoldHeading__deC1j"
};


/***/ }),

/***/ 9956:
/***/ ((module) => {

// Exports
module.exports = {
	"dragItem": "DraggableWindow_dragItem__4_z_t",
	"inactive": "DraggableWindow_inactive__ePeJY",
	"active": "DraggableWindow_active__x80Aq",
	"closeButton": "DraggableWindow_closeButton__f39Po"
};


/***/ }),

/***/ 7885:
/***/ ((module) => {

// Exports
module.exports = {
	"hostMain": "Layout_hostMain__NVKiw",
	"main": "Layout_main__QwOb6",
	"header": "Layout_header__5jVrB",
	"footer": "Layout_footer__fV_x0",
	"globalContainer": "Layout_globalContainer__B14Sc"
};


/***/ }),

/***/ 293:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ isUndefinedType)
/* harmony export */ });
// Shorthand for undefined type check.
// Don't works with guard statements. Use then conventional notation (typeof) or optional?.chaining - TypeScript purposes
//
const isUndefinedType = (somethingToCheck)=>typeof somethingToCheck === 'undefined'
;


/***/ }),

/***/ 3536:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_store_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2404);
/* harmony import */ var _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3806);
/* harmony import */ var _coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4353);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_store_core__WEBPACK_IMPORTED_MODULE_2__, _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_3__]);
([_core_store_core__WEBPACK_IMPORTED_MODULE_2__, _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const APP_BORDER_ENABLED_CLASS_NAME = 'enabled-state';
const BorderColorChangeController = ()=>{
    const allActuallyWorkWorkersAmount = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_2__/* .useAppSelector */ .CG)(_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_3__/* .selectActuallyWorkingWorkersAmount */ .u7);
    // @TODO przerobić na react refa tego queryselectora
    const bodyElement = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_4__/* .fireJustClientSide */ .o)(()=>document.querySelector('body')
        )
    , []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!bodyElement) return void undefined;
        if (allActuallyWorkWorkersAmount.amount) {
            bodyElement.classList.add(APP_BORDER_ENABLED_CLASS_NAME);
        } else {
            bodyElement.classList.remove(APP_BORDER_ENABLED_CLASS_NAME);
        }
        return ()=>undefined
        ;
    }, [
        allActuallyWorkWorkersAmount.amount,
        bodyElement
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BorderColorChangeController);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6295:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _features_background_browser_storage_browserStorage_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3698);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_features_background_browser_storage_browserStorage_hooks__WEBPACK_IMPORTED_MODULE_2__]);
_features_background_browser_storage_browserStorage_hooks__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const BrowserStoragePersistController = ()=>{
    // Persist amount of ready Workers
    (0,_features_background_browser_storage_browserStorage_hooks__WEBPACK_IMPORTED_MODULE_2__/* .useWorkersAmountStoragePersist */ .qc)();
    // Persist Control Panel switches state
    (0,_features_background_browser_storage_browserStorage_hooks__WEBPACK_IMPORTED_MODULE_2__/* .useControlPanelSwitchesStoragePersist */ .m)();
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BrowserStoragePersistController);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3698:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "qc": () => (/* binding */ useWorkersAmountStoragePersist),
/* harmony export */   "m": () => (/* binding */ useControlPanelSwitchesStoragePersist),
/* harmony export */   "$J": () => (/* binding */ usePersistedPositionByBrowserStorage)
/* harmony export */ });
/* unused harmony export useControlPanelCollapseStateStoragePersist */
/* harmony import */ var _core_store_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2404);
/* harmony import */ var _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3806);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _features_background_browser_storage_browserStorage_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5449);
/* harmony import */ var _app_config_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2714);
/* harmony import */ var _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7257);
/* harmony import */ var _features_building_control_panel_controlPanelSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1014);
/* harmony import */ var _coding_utils_typeOperations_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(293);
/* harmony import */ var _coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4353);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_store_core__WEBPACK_IMPORTED_MODULE_0__, _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_1__]);
([_core_store_core__WEBPACK_IMPORTED_MODULE_0__, _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









// WORKERS AMOUNT STATE STORAGE PERSIST
//
const useWorkersAmountStoragePersist = ()=>{
    const dispatch = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_0__/* .useAppDispatch */ .TL)();
    const workerRequestedAmount = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_0__/* .useAppSelector */ .CG)(_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_1__/* .selectRequestedWorkersAmount */ .NR);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const memorizedValue = (0,_features_background_browser_storage_browserStorage_api__WEBPACK_IMPORTED_MODULE_3__/* .getStorageItem */ .q)(_app_config_constants__WEBPACK_IMPORTED_MODULE_4__/* .STORAGE_KEY_WORKERS_AMOUNT */ .Oe);
        const memorizedAmountOfWorkers = memorizedValue ? Number(memorizedValue) : 0;
        memorizedAmountOfWorkers > 0 && dispatch((0,_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_1__/* .handleWorkerAmountChange */ .Zu)({
            amountChangeCommand: _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_5__/* .WorkerAmountChangeActionEnum.setAmount */ .uq.setAmount,
            amount: memorizedAmountOfWorkers
        }));
        return ()=>undefined
        ;
    }, [
        dispatch
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        (0,_features_background_browser_storage_browserStorage_api__WEBPACK_IMPORTED_MODULE_3__/* .setStorageItem */ .N)(_app_config_constants__WEBPACK_IMPORTED_MODULE_4__/* .STORAGE_KEY_WORKERS_AMOUNT */ .Oe, String(workerRequestedAmount.amount));
        return ()=>undefined
        ;
    }, [
        workerRequestedAmount.amount
    ]);
    return void undefined;
};
// CONTROL PANEL SWITCHES STATE STORAGE PERSIST
//
const useControlPanelSwitchesStoragePersist = ()=>{
    const dispatch = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_0__/* .useAppDispatch */ .TL)();
    const systemComponentsVisibilities = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_0__/* .useAppSelector */ .CG)(_features_building_control_panel_controlPanelSlice__WEBPACK_IMPORTED_MODULE_6__/* .selectSystemComponentsVisibilities */ .an);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const memorizedValue = (0,_features_background_browser_storage_browserStorage_api__WEBPACK_IMPORTED_MODULE_3__/* .getStorageItem */ .q)(_app_config_constants__WEBPACK_IMPORTED_MODULE_4__/* .STORAGE_KEY_CONTROL_PANEL_SWITCHES */ .LJ);
        if (typeof memorizedValue === 'string') {
            const memorizedStorageControlPanelSwitches = JSON.parse(memorizedValue);
            Object.keys(memorizedStorageControlPanelSwitches).forEach((memorizedName)=>{
                _features_building_control_panel_controlPanelSlice__WEBPACK_IMPORTED_MODULE_6__/* .possibleControlPanelSwitchesNames.forEach */ .lh.forEach((actualComponentName)=>{
                    if (memorizedName === actualComponentName) {
                        dispatch((0,_features_building_control_panel_controlPanelSlice__WEBPACK_IMPORTED_MODULE_6__/* .handleControlPanelSwitchVisibility */ .SQ)({
                            name: actualComponentName,
                            visibilitySwitchState: memorizedStorageControlPanelSwitches[actualComponentName]
                        }));
                    }
                });
            });
        }
        return ()=>undefined
        ;
    }, [
        dispatch
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        (0,_features_background_browser_storage_browserStorage_api__WEBPACK_IMPORTED_MODULE_3__/* .setStorageItem */ .N)(_app_config_constants__WEBPACK_IMPORTED_MODULE_4__/* .STORAGE_KEY_CONTROL_PANEL_SWITCHES */ .LJ, JSON.stringify(systemComponentsVisibilities));
        return ()=>undefined
        ;
    }, [
        systemComponentsVisibilities
    ]);
    return void undefined;
};
const useControlPanelCollapseStateStoragePersist = (initialBehavior)=>{
    const { 0: isListCollapsed , 1: setIsListCollapsed  } = useState(initialBehavior);
    useEffect(()=>{
        const memorizedValue = getStorageItem(STORAGE_KEY_CONTROL_PANEL_COLLAPSE_STATE);
        if (typeof memorizedValue === 'string') {
            switch(memorizedValue){
                case StorageKeyControlPanelCollapseStateEnum.false:
                    setIsListCollapsed(false);
                    break;
                case StorageKeyControlPanelCollapseStateEnum.true:
                    setIsListCollapsed(true);
                    break;
            }
        } else {
            // Default behavior
            //
            setIsListCollapsed(initialBehavior);
        }
        return ()=>undefined
        ;
    }, [
        initialBehavior
    ]);
    useEffect(()=>{
        if (!isUndefinedType(isListCollapsed)) {
            setStorageItem(STORAGE_KEY_CONTROL_PANEL_COLLAPSE_STATE, String(isListCollapsed));
        }
        return ()=>undefined
        ;
    }, [
        isListCollapsed
    ]);
    return [
        isListCollapsed,
        setIsListCollapsed
    ];
};
const usePersistedPositionByBrowserStorage = (storageSwitchName, initialPosition)=>{
    const { 0: consumerPosition , 1: setConsumerPosition  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(initialPosition);
    const browserStorageKey = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>`${_app_config_constants__WEBPACK_IMPORTED_MODULE_4__/* .STORAGE_KEY_FLOATING_COMPONENT_ON_THE_SCREEN_POSITION */ .j_}_${storageSwitchName}`
    , [
        storageSwitchName
    ]);
    // Pass value from storage to consumer on mount.
    //
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const memorizedValue = (0,_features_background_browser_storage_browserStorage_api__WEBPACK_IMPORTED_MODULE_3__/* .getStorageItem */ .q)(browserStorageKey);
        if (typeof memorizedValue === 'string') {
            // Value from storage is available.
            //
            setConsumerPosition(JSON.parse(memorizedValue));
        } else {
            // Default behavior.
            //
            setConsumerPosition(initialPosition);
        }
        return ()=>undefined
        ;
    }, [
        initialPosition,
        browserStorageKey
    ]);
    // Set value to storage on new consumer position.
    //
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (!(0,_coding_utils_typeOperations_api__WEBPACK_IMPORTED_MODULE_8__/* .isUndefinedType */ .r)(consumerPosition)) {
            (0,_features_background_browser_storage_browserStorage_api__WEBPACK_IMPORTED_MODULE_3__/* .setStorageItem */ .N)(browserStorageKey, JSON.stringify(consumerPosition));
        }
        return ()=>undefined
        ;
    }, [
        consumerPosition,
        browserStorageKey
    ]);
    const ifSingleAxisRequiresValidation = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((axisPosition, XorY)=>(0,_coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_7__/* .fireJustClientSide */ .o)(()=>{
            switch(XorY){
                case 'X':
                    return axisPosition < 0 || axisPosition > window.innerWidth;
                case 'Y':
                    return axisPosition < 0 || axisPosition > window.innerHeight;
            }
        })
    , []);
    const checkIfTheOffScreenPositionRequireValidation = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((position)=>ifSingleAxisRequiresValidation(position.x, 'X') || ifSingleAxisRequiresValidation(position.y, 'Y')
    , [
        ifSingleAxisRequiresValidation
    ]);
    const validateConsumerPosition = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((position)=>({
            x: ifSingleAxisRequiresValidation(position.x, 'X') ? 0 : position.x,
            y: ifSingleAxisRequiresValidation(position.y, 'Y') ? 0 : position.y
        })
    , [
        ifSingleAxisRequiresValidation
    ]);
    const checkIfTheOffScreenPositionRequireValidationThenValidate = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(()=>{
        if (checkIfTheOffScreenPositionRequireValidation(consumerPosition)) {
            setConsumerPosition(validateConsumerPosition(consumerPosition));
        }
    }, [
        consumerPosition,
        checkIfTheOffScreenPositionRequireValidation,
        validateConsumerPosition
    ]);
    // Validate if consumer position is off-screen,
    // every position change.
    //
    const intervalID = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        (0,_coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_7__/* .fireJustClientSide */ .o)(()=>{
            window.clearInterval(intervalID.current);
            intervalID.current = window.setInterval(()=>{
                checkIfTheOffScreenPositionRequireValidationThenValidate();
            }, 3000);
        });
        return ()=>{
            (0,_coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_7__/* .fireJustClientSide */ .o)(()=>{
                window.clearInterval(intervalID.current);
            });
        };
    }, [
        checkIfTheOffScreenPositionRequireValidationThenValidate
    ]);
    const onDragStopHandler = (event, data)=>{
        setConsumerPosition({
            x: data.x,
            y: data.y
        });
    };
    return [
        consumerPosition,
        onDragStopHandler
    ];
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2884:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const IconPackController = ()=>{
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const script1 = document.createElement('script');
        script1.src = '/icon-pack.min.js';
        script1.async = true;
        document.head.appendChild(script1);
        const script2 = document.createElement('script');
        script2.src = '/fontawesome.min.js';
        script1.async = true;
        document.head.appendChild(script2);
        return ()=>undefined
        ;
    }, []);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconPackController);


/***/ }),

/***/ 3997:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_store_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2404);
/* harmony import */ var _features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7925);
/* harmony import */ var _coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4353);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_store_core__WEBPACK_IMPORTED_MODULE_2__, _features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_3__]);
([_core_store_core__WEBPACK_IMPORTED_MODULE_2__, _features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const SocketConnectionAndListeningController = ()=>{
    const dispatch = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_2__/* .useAppDispatch */ .TL)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (0,_coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_4__/* .fireJustClientSide */ .o)(()=>{
            dispatch((0,_features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_3__/* .connectSocketThunk */ .mW)());
        });
        return ()=>undefined
        ;
    }, [
        dispatch
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocketConnectionAndListeningController);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6629:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(309);
/* harmony import */ var _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7257);
/* harmony import */ var _app_config_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2714);
/* harmony import */ var _core_store_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2404);
/* harmony import */ var _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3806);
/* harmony import */ var _features_background_web_workers_webWorkersEvents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3923);
/* harmony import */ var _features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7925);
/* harmony import */ var _features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9459);
/* harmony import */ var _coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4353);
/* harmony import */ var _coding_utils_typeOperations_api__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(293);
/* harmony import */ var _features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8867);
/* harmony import */ var _features_background_socket_client_socket_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3583);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__, _core_store_core__WEBPACK_IMPORTED_MODULE_5__, _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_6__, _features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_8__]);
([_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__, _core_store_core__WEBPACK_IMPORTED_MODULE_5__, _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_6__, _features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














const captureAndProcessPureWorkerMessage = (event, workerKey)=>{
    (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .flagIfWorkerIsWorking */ .f8)(workerKey, event.data.working);
    const dataToEmit = (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .constructWorkerJobToSocketDTO */ .Ji)(event, workerKey);
    (0,_features_background_socket_client_socket_api__WEBPACK_IMPORTED_MODULE_12__/* .sendCommandMessageToSocket */ ._g)(_features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_9__/* .WEB_SOCKET_EVENTS_TRIGGERS.reportJobDone */ .z.reportJobDone, dataToEmit);
};
const sendTriggerMessageToWorker = (workerKey, command)=>{
    const currentWorker = (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .getWorkerInstanceAbsolutely */ .B5)(workerKey);
    if (command === _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_3__/* .WorkerTriggerMessageCommandEnum.activate */ .Nm.activate) {
        currentWorker ? (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .queueWorkerTask */ .R_)(workerKey, {
            workerTaskName: _features_background_web_workers_webWorkersEvents__WEBPACK_IMPORTED_MODULE_7__/* .WEB_WORKER_TASKS.triggerActivationMessage */ .I.triggerActivationMessage
        }, `Sending an activation message to: "${workerKey.workerName}"...`) : (0,_features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_11__/* .addConsoleVerbose */ .J)(`Something is no-yes with: "${workerKey.fileName}", "${workerKey.workerName}".`, 'error');
    } else if (command === _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_3__/* .WorkerTriggerMessageCommandEnum.kill */ .Nm.kill) {
        currentWorker ? (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .queueWorkerTask */ .R_)(workerKey, {
            workerTaskName: _features_background_web_workers_webWorkersEvents__WEBPACK_IMPORTED_MODULE_7__/* .WEB_WORKER_TASKS.killWorker */ .I.killWorker
        }, `Sending a kill trigger message to: "${workerKey.workerName}"...`) : (0,_features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_11__/* .addConsoleVerbose */ .J)(`Something is no-yes with: "${workerKey.fileName}", "${workerKey.workerName}".`, 'error');
    }
};
// Absolutely addOne or removeLast selected worker.
//
const workerLifeSwitch = (workerKey, command)=>new Promise((resolve, reject)=>{
        if (command === _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_3__/* .WorkerLifeSwitchCommandEnum.install */ .Wk.install) {
            (0,_features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_11__/* .addConsoleVerbose */ .J)(`Installing worker "${workerKey.fileName}" and pinning it to "window.${workerKey.workerName}"...`);
            if (!workerKey.fileName) (0,_features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_11__/* .addConsoleVerbose */ .J)('Missing filename for installation attempt of: ' + workerKey, 'error');
            const install = ()=>{
                window[workerKey.workerName] = new Worker(`/${workerKey.fileName}`);
                sendTriggerMessageToWorker(workerKey, _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_3__/* .WorkerTriggerMessageCommandEnum.activate */ .Nm.activate);
                (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .getWorkerInstanceAbsolutely */ .B5)(workerKey).addEventListener('message', (event)=>captureAndProcessPureWorkerMessage(event, workerKey)
                );
            };
            install();
            // Finally, check the Worker's actual status to be assured, then confirm it back.
            (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .getWorkerRealActivityStatus */ .Ek)(workerKey.workerName) ? resolve() : reject({
                name: workerKey.workerName,
                message: 'Installation failed.'
            });
        } else if (command === _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_3__/* .WorkerLifeSwitchCommandEnum.uninstall */ .Wk.uninstall) {
            (0,_features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_11__/* .addConsoleVerbose */ .J)(`Deleting worker "window.${workerKey.workerName}"...`);
            const uninstall = ()=>{
                sendTriggerMessageToWorker(workerKey, _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_3__/* .WorkerTriggerMessageCommandEnum.kill */ .Nm.kill);
                (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .getWorkerInstanceAbsolutely */ .B5)(workerKey).removeEventListener('message', (event)=>captureAndProcessPureWorkerMessage(event, workerKey)
                );
                (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .getWorkerInstanceAbsolutely */ .B5)(workerKey).terminate() // To avoid memory leaks caused of a time intervals.
                ;
                delete window[workerKey.workerName];
            };
            uninstall();
            // Finally, check the Worker's actual status to be assured, then confirm it back.
            !(0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .getWorkerRealActivityStatus */ .Ek)(workerKey.workerName) ? resolve() : reject({
                name: workerKey.workerName,
                message: 'Uninstallation failed.'
            });
        }
    })
;
const controlAmountOfActiveWorkerInstances = (requestedNumberOfWorkers)=>{
    const existingWorkersKeyNames = (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .getExistingWorkersKeys */ .G6)();
    // If requested web-workers amount:
    //
    if (requestedNumberOfWorkers.amount > existingWorkersKeyNames.length) {
        // ...is higher - increase a real web-workers amount by adding more instances.
        for(let index = 0; index < requestedNumberOfWorkers.amount; index++){
            const workerKeyOfRequestedWorker = (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .constructCalculationWorkerKeyByName */ .Re)((0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .constructWorkerNameByOrderIndex */ .Uy)(index + 1));
            if (!existingWorkersKeyNames.length || !existingWorkersKeyNames.some((existingWorkerKey)=>{
                return workerKeyOfRequestedWorker.workerName === existingWorkerKey.workerName;
            })) {
                workerLifeSwitch(workerKeyOfRequestedWorker, _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_3__/* .WorkerLifeSwitchCommandEnum.install */ .Wk.install).then(()=>(0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .updateWorkerIsReadyState */ .BE)(workerKeyOfRequestedWorker) && (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .flagIfWorkerHasError */ .OJ)(workerKeyOfRequestedWorker, false)
                ).catch((error)=>(0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .flagIfWorkerHasError */ .OJ)(workerKeyOfRequestedWorker, true, error)
                );
            }
        }
    } else if (requestedNumberOfWorkers.amount < existingWorkersKeyNames.length) {
        // ...is lower - removeLast one or few last instances.
        for(let index = existingWorkersKeyNames.length; requestedNumberOfWorkers.amount < index; index--){
            const workerKeyOfRequestedWorker = (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .constructCalculationWorkerKeyByName */ .Re)((0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .constructWorkerNameByOrderIndex */ .Uy)(index));
            workerLifeSwitch(workerKeyOfRequestedWorker, _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_3__/* .WorkerLifeSwitchCommandEnum.uninstall */ .Wk.uninstall).then(()=>(0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .updateWorkerIsReadyState */ .BE)(workerKeyOfRequestedWorker) && (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .flagIfWorkerHasError */ .OJ)(workerKeyOfRequestedWorker, false) && (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .flagIfWorkerIsWorking */ .f8)(workerKeyOfRequestedWorker, false)
            ).catch((error)=>(0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .flagIfWorkerHasError */ .OJ)(workerKeyOfRequestedWorker, true, error)
            );
        }
    }
    // If both amounts (requested with a real one) are equals - nothing to do here - it's fine.
    return void undefined;
};
const setReduxDefaultValuesForWorker = (workerKey)=>{
    var ref, ref1, ref2;
    const workersSlice = _core_store_core__WEBPACK_IMPORTED_MODULE_5__/* ["default"].getState */ .ZP.getState().calculationsWorkersSlice;
    (0,_coding_utils_typeOperations_api__WEBPACK_IMPORTED_MODULE_13__/* .isUndefinedType */ .r)((ref = workersSlice.readyStatuses[workerKey.workerName]) === null || ref === void 0 ? void 0 : ref.ready) && (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .updateWorkerIsReadyState */ .BE)(workerKey);
    (0,_coding_utils_typeOperations_api__WEBPACK_IMPORTED_MODULE_13__/* .isUndefinedType */ .r)((ref1 = workersSlice.workStatuses[workerKey.workerName]) === null || ref1 === void 0 ? void 0 : ref1.working) && (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .flagIfWorkerIsWorking */ .f8)(workerKey, false);
    (0,_coding_utils_typeOperations_api__WEBPACK_IMPORTED_MODULE_13__/* .isUndefinedType */ .r)((ref2 = workersSlice.errorStatuses[workerKey.workerName]) === null || ref2 === void 0 ? void 0 : ref2.error) && (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .flagIfWorkerHasError */ .OJ)(workerKey, false);
};
// Single dependency controller - just the quantity requested.
//
const WorkersActiveInstancesAndCommunicationController = ()=>{
    // Check is socket connection is OK
    //
    const isSocketActive = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_5__/* .useAppSelector */ .CG)(_features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_8__/* .selectSocketIsActive */ .kl);
    // Requested from building, a number of web-workers
    //
    const requestedNumberOfWorkers = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_5__/* .useAppSelector */ .CG)(_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_6__/* .selectRequestedWorkersAmount */ .NR);
    // Interval ID var - for debounce
    //
    const intervalID = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isSocketActive) return ()=>undefined
        ;
        (0,_coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_10__/* .fireJustClientSide */ .o)(()=>{
            window.clearTimeout(intervalID.current);
            intervalID.current = window.setTimeout(()=>controlAmountOfActiveWorkerInstances(requestedNumberOfWorkers)
            , _app_config_constants__WEBPACK_IMPORTED_MODULE_4__/* .WAITING_TIME_FOR_BUNDLE_WORKER_ACTIONS */ ._x);
        });
        return ()=>undefined
        ;
    }, [
        isSocketActive,
        requestedNumberOfWorkers
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!isSocketActive) return ()=>undefined
        ;
        const fillReduxStoreWithDefaultMaxWorkersAmount = ()=>{
            for(let index = 1; index <= _app_config_constants__WEBPACK_IMPORTED_MODULE_4__/* .MAX_WORKERS_LIMIT */ .Un; index++){
                const workerName = (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .constructWorkerNameByOrderIndex */ .Uy)(index);
                const workerKey = (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .constructCalculationWorkerKeyByName */ .Re)(workerName);
                setReduxDefaultValuesForWorker(workerKey);
            }
        };
        fillReduxStoreWithDefaultMaxWorkersAmount();
        return ()=>undefined
        ;
    }, [
        isSocketActive
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WorkersActiveInstancesAndCommunicationController);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5285:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FPSMonitor_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5338);
/* harmony import */ var _FPSMonitor_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_FPSMonitor_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _layout_compositions_draggable_window_DraggableWindow_composition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4260);
/* harmony import */ var _layout_compositions_system_component_visibility_SystemComponentVisibility_composition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9319);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_layout_compositions_draggable_window_DraggableWindow_composition__WEBPACK_IMPORTED_MODULE_2__, _layout_compositions_system_component_visibility_SystemComponentVisibility_composition__WEBPACK_IMPORTED_MODULE_3__]);
([_layout_compositions_draggable_window_DraggableWindow_composition__WEBPACK_IMPORTED_MODULE_2__, _layout_compositions_system_component_visibility_SystemComponentVisibility_composition__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const FPSMonitorWindowMolecule = ()=>{
    const FPSMonitorRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    // Importing .min.js file from public directory to get around TypeScript processor,
    // without any ban ts-ignore comments
    //
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const script = document.createElement('script');
        script.onload = function() {
            var ref;
            const stats = new StatsRemake();
            stats.showPanel(0);
            (ref = FPSMonitorRef.current) === null || ref === void 0 ? void 0 : ref.appendChild(stats.dom);
            requestAnimationFrame(function loop() {
                stats.update();
                requestAnimationFrame(loop);
            });
        };
        script.src = '/stats.min.js';
        document.head.appendChild(script);
        return ()=>undefined
        ;
    }, []);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout_compositions_system_component_visibility_SystemComponentVisibility_composition__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
        visibilityOfSystemComponentControl: 'FPSMonitor',
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout_compositions_draggable_window_DraggableWindow_composition__WEBPACK_IMPORTED_MODULE_2__/* .DraggableWindowComposition */ .x, {
            componentUITitleBarName: 'FPS monitor',
            switchVisibilityConfiguration: {
                name: 'FPSMonitor',
                visibilitySwitchState: false
            },
            onTheScreenPosition: {
                x: 50,
                y: 10
            },
            zIndex: 1920,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("article", {
                ref: FPSMonitorRef,
                className: `${(_FPSMonitor_module_scss__WEBPACK_IMPORTED_MODULE_4___default().host)} display-inline-block`
            })
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FPSMonitorWindowMolecule);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8211:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _workersGlobalWorkControl_module_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2227);
/* harmony import */ var _workersGlobalWorkControl_module_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_workersGlobalWorkControl_module_scss__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _layout_compositions_draggable_window_DraggableWindow_composition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4260);
/* harmony import */ var _core_store_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2404);
/* harmony import */ var _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3806);
/* harmony import */ var _layout_compositions_system_component_visibility_SystemComponentVisibility_composition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9319);
/* harmony import */ var _app_components_AppButton_atom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4017);
/* harmony import */ var _features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(309);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_8__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_layout_compositions_draggable_window_DraggableWindow_composition__WEBPACK_IMPORTED_MODULE_2__, _core_store_core__WEBPACK_IMPORTED_MODULE_3__, _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_4__, _layout_compositions_system_component_visibility_SystemComponentVisibility_composition__WEBPACK_IMPORTED_MODULE_5__, _features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_7__]);
([_layout_compositions_draggable_window_DraggableWindow_composition__WEBPACK_IMPORTED_MODULE_2__, _core_store_core__WEBPACK_IMPORTED_MODULE_3__, _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_4__, _layout_compositions_system_component_visibility_SystemComponentVisibility_composition__WEBPACK_IMPORTED_MODULE_5__, _features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const WorkersGlobalWorkControlWindowMolecule = ()=>{
    const workersComplexity = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_3__/* .useAppSelector */ .CG)(_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_4__/* .selectWholeWorkersComplexityState */ .K1);
    const isAnyWorkerWorking = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_3__/* .useAppSelector */ .CG)(_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_4__/* .selectIsAnyWorkerWorking */ .Hc);
    const isAllOfWorkersWorking = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_3__/* .useAppSelector */ .CG)(_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_4__/* .selectIsAllOfWorkersWorking */ .M3);
    const handleAllWorkersWorkCommand = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const activeWorkersByNow = (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_7__/* .getExistingWorkersKeys */ .G6)();
        activeWorkersByNow.forEach((workerKey)=>{
            (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_7__/* .queueWorkerTask */ .R_)(workerKey, {
                workerTaskName: 'task__calculations_on',
                complexity: workersComplexity[workerKey.workerName].complexity
            }, `Turning on a work switch at the "${workerKey.workerName}"`);
        });
    }, [
        workersComplexity
    ]);
    const defaultOnTheScreenPosition = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            x: 50,
            y: 70
        })
    , []);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout_compositions_system_component_visibility_SystemComponentVisibility_composition__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
        visibilityOfSystemComponentControl: 'workControl',
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout_compositions_draggable_window_DraggableWindow_composition__WEBPACK_IMPORTED_MODULE_2__/* .DraggableWindowComposition */ .x, {
            componentUITitleBarName: 'All workers control',
            switchVisibilityConfiguration: {
                name: 'workControl',
                visibilitySwitchState: false
            },
            onTheScreenPosition: defaultOnTheScreenPosition,
            zIndex: 1900,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                className: `${(_workersGlobalWorkControl_module_scss__WEBPACK_IMPORTED_MODULE_9___default().host)} display-inline-block`,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_8__.ButtonGroup, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_AppButton_atom__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            onClick: handleAllWorkersWorkCommand,
                            disabled: isAllOfWorkersWorking,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: "MAKE THEM ALL WORK"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_app_components_AppButton_atom__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            onClick: ()=>(0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_7__/* .queueAllWorkersTask */ .hi)('calculation-worker.js', {
                                    workerTaskName: 'task__calculations_off'
                                })
                            ,
                            disabled: !isAnyWorkerWorking,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: "STOP ALL WORKERS"
                            })
                        })
                    ]
                })
            })
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WorkersGlobalWorkControlWindowMolecule);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1242:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _workersScoreboard_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4449);
/* harmony import */ var _workersScoreboard_module_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_workersScoreboard_module_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _layout_compositions_draggable_window_DraggableWindow_composition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4260);
/* harmony import */ var _core_store_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2404);
/* harmony import */ var _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3806);
/* harmony import */ var _features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7925);
/* harmony import */ var _app_config_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2714);
/* harmony import */ var _layout_compositions_system_component_visibility_SystemComponentVisibility_composition__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9319);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_layout_compositions_draggable_window_DraggableWindow_composition__WEBPACK_IMPORTED_MODULE_2__, _core_store_core__WEBPACK_IMPORTED_MODULE_3__, _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_4__, _features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_5__, _layout_compositions_system_component_visibility_SystemComponentVisibility_composition__WEBPACK_IMPORTED_MODULE_7__]);
([_layout_compositions_draggable_window_DraggableWindow_composition__WEBPACK_IMPORTED_MODULE_2__, _core_store_core__WEBPACK_IMPORTED_MODULE_3__, _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_4__, _features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_5__, _layout_compositions_system_component_visibility_SystemComponentVisibility_composition__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const WorkersScoreboardWindowMolecule = ()=>{
    // Instant get a requested amount of web-workers
    //
    const workerRequestedAmount = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_3__/* .useAppSelector */ .CG)(_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_4__/* .selectRequestedWorkersAmount */ .NR);
    // Listening to worker's READY state
    //
    const allWorkersReadyStatuses = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_3__/* .useAppSelector */ .CG)(_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_4__/* .selectWholeWorkersReadyState */ .GM);
    // Listening to worker's WORK state
    //
    const allWorkersWorkStatuses = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_3__/* .useAppSelector */ .CG)(_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_4__/* .selectWholeWorkersWorkState */ .Dj);
    const allActuallyWorkWorkersAmount = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_3__/* .useAppSelector */ .CG)(_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_4__/* .selectActuallyWorkingWorkersAmount */ .u7);
    // Listening to messages stream from a Socket
    //
    const receivedSocketResponse = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_3__/* .useAppSelector */ .CG)(_features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_5__/* .selectLastReceivedClientBrowserWorkerJobsData */ .PX);
    const { 0: shouldShowDeactivated , 1: setShouldShowDeactivated  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const workerHasResponseData = (workerName)=>receivedSocketResponse && receivedSocketResponse[workerName]
    ;
    const defaultOnTheScreenPosition = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>({
            x: 50,
            y: 160
        })
    , []);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout_compositions_system_component_visibility_SystemComponentVisibility_composition__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
        visibilityOfSystemComponentControl: 'scoreboard',
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout_compositions_draggable_window_DraggableWindow_composition__WEBPACK_IMPORTED_MODULE_2__/* .DraggableWindowComposition */ .x, {
            componentUITitleBarName: 'Scoreboard',
            switchVisibilityConfiguration: {
                name: 'scoreboard',
                visibilitySwitchState: false
            },
            onTheScreenPosition: defaultOnTheScreenPosition,
            zIndex: 1900,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                className: `${(_workersScoreboard_module_scss__WEBPACK_IMPORTED_MODULE_8___default().host)} display-inline-block`,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: "Calculation results:"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "Show all, even currently deactivated: "
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        type: 'checkbox',
                        checked: shouldShowDeactivated,
                        onChange: (event)=>setShouldShowDeactivated(event.currentTarget.checked)
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [
                                    _app_config_constants__WEBPACK_IMPORTED_MODULE_6__/* .MAIN_THREAD_KEY.workerName */ .Nc.workerName,
                                    ":"
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: Object.keys(receivedSocketResponse).map((workerName)=>workerName === _app_config_constants__WEBPACK_IMPORTED_MODULE_6__/* .MAIN_THREAD_KEY.workerName */ .Nc.workerName && String(receivedSocketResponse[workerName].amount)
                                )
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        children: [
                            "Required number of workers: ",
                            workerRequestedAmount.amount
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        children: [
                            "Workers who actually work: ",
                            allActuallyWorkWorkersAmount.amount
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ol", {
                        className: [
                            (_workersScoreboard_module_scss__WEBPACK_IMPORTED_MODULE_8___default().listGrid),
                            (()=>shouldShowDeactivated || workerRequestedAmount.amount > 0 ? '' : 'display-none'
                            )()
                        ].join(' '),
                        children: Object.keys(allWorkersReadyStatuses).filter((workerName)=>{
                            if (shouldShowDeactivated) {
                                return true;
                            } else {
                                return allWorkersReadyStatuses[workerName].ready;
                            }
                        }).map((workerName, index)=>{
                            /*#__PURE__*/ return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: [
                                    (_workersScoreboard_module_scss__WEBPACK_IMPORTED_MODULE_8___default().worker)
                                ].join(' '),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: (_workersScoreboard_module_scss__WEBPACK_IMPORTED_MODULE_8___default().smallAndBoldHeading),
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                            className: (_workersScoreboard_module_scss__WEBPACK_IMPORTED_MODULE_8___default().labelInfo),
                                            children: [
                                                workerName,
                                                " ",
                                                allWorkersReadyStatuses[workerName].ready ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                    children: "Ready!"
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    children: "OFF"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                            className: (()=>{
                                                var ref;
                                                return ((ref = allWorkersWorkStatuses[workerName]) === null || ref === void 0 ? void 0 : ref.working) ? '' : (_workersScoreboard_module_scss__WEBPACK_IMPORTED_MODULE_8___default().labelInfo);
                                            })(),
                                            children: [
                                                workerHasResponseData(workerName) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                                                    children: [
                                                        "[",
                                                        String(receivedSocketResponse[workerName].amount),
                                                        "] "
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    children: !workerHasResponseData(workerName) ? 'No work yet' : 'Already made'
                                                })
                                            ]
                                        })
                                    })
                                ]
                            }, index);
                        })
                    })
                ]
            })
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WorkersScoreboardWindowMolecule);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2668:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Layout_composition)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/layout/partials/Layout.module.scss
var Layout_module = __webpack_require__(7885);
var Layout_module_default = /*#__PURE__*/__webpack_require__.n(Layout_module);
;// CONCATENATED MODULE: ./src/layout/partials/Header.tsx



const Header = ()=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx("header", {
        className: (Layout_module_default()).header
    }));
};
/* harmony default export */ const partials_Header = (Header);

// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
;// CONCATENATED MODULE: ./src/layout/partials/Footer.tsx




const Footer = ()=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx("footer", {
        className: (Layout_module_default()).footer,
        children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Typography, {
            variant: 'body2',
            children: "build version 0.8"
        })
    }));
};
/* harmony default export */ const partials_Footer = (Footer);

;// CONCATENATED MODULE: ./src/layout/Layout.composition.tsx






const LayoutComposition = ({ children  })=>{
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
        className: (Layout_module_default()).hostMain,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(partials_Header, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("main", {
                className: (Layout_module_default()).main,
                children: /*#__PURE__*/ jsx_runtime_.jsx(material_.Container, {
                    className: (Layout_module_default()).globalContainer,
                    maxWidth: 'xl',
                    children: children
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(partials_Footer, {})
        ]
    }));
};
/* harmony default export */ const Layout_composition = (LayoutComposition);


/***/ }),

/***/ 4260:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ DraggableWindowComposition)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(192);
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_draggable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DraggableWindow_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9956);
/* harmony import */ var _DraggableWindow_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_DraggableWindow_module_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _features_building_control_panel_controlPanelSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1014);
/* harmony import */ var _core_store_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2404);
/* harmony import */ var _features_background_browser_storage_browserStorage_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3698);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_store_core__WEBPACK_IMPORTED_MODULE_4__, _features_background_browser_storage_browserStorage_hooks__WEBPACK_IMPORTED_MODULE_5__]);
([_core_store_core__WEBPACK_IMPORTED_MODULE_4__, _features_background_browser_storage_browserStorage_hooks__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const DraggableWindowComposition = ({ children , componentUITitleBarName , switchVisibilityConfiguration , onTheScreenPosition ={
    x: 50,
    y: 50
} , zIndex =1900 , isComponentVisible  })=>{
    const dispatch = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_4__/* .useAppDispatch */ .TL)();
    const nodeRef = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2___default().createRef();
    const handleCloseWindow = ()=>{
        dispatch((0,_features_building_control_panel_controlPanelSlice__WEBPACK_IMPORTED_MODULE_3__/* .handleControlPanelSwitchVisibility */ .SQ)(switchVisibilityConfiguration));
    };
    const { 0: clickedOutsideThisWindow , 1: setClickedOutsideThisWindow  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const handleClickOutside = (event)=>{
            if (nodeRef.current && !nodeRef.current.contains(event.target)) {
                setClickedOutsideThisWindow(true);
            } else {
                setClickedOutsideThisWindow(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside, true);
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, [
        nodeRef
    ]);
    const [memoizedOnTheScreenPosition, onDragStopHandler] = (0,_features_background_browser_storage_browserStorage_hooks__WEBPACK_IMPORTED_MODULE_5__/* .usePersistedPositionByBrowserStorage */ .$J)(switchVisibilityConfiguration.name, onTheScreenPosition);
    // Handling isComponentVisible optional prop from SystemComponentVisibility.
    // Enter in "active" visual mode on visibility on.
    //
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setClickedOutsideThisWindow(!isComponentVisible);
    }, [
        isComponentVisible
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("aside", {
        style: {
            zIndex,
            position: 'relative'
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_draggable__WEBPACK_IMPORTED_MODULE_1___default()), {
            nodeRef: nodeRef,
            handle: "strong",
            position: memoizedOnTheScreenPosition,
            onStop: onDragStopHandler,
            bounds: 'body',
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                ref: nodeRef,
                className: (_DraggableWindow_module_scss__WEBPACK_IMPORTED_MODULE_6___default().dragItem),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("strong", {
                        className: clickedOutsideThisWindow ? (_DraggableWindow_module_scss__WEBPACK_IMPORTED_MODULE_6___default().inactive) : (_DraggableWindow_module_scss__WEBPACK_IMPORTED_MODULE_6___default().active),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: componentUITitleBarName
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                onClick: handleCloseWindow,
                                className: (_DraggableWindow_module_scss__WEBPACK_IMPORTED_MODULE_6___default().closeButton),
                                "data-description": 'close-window-button'
                            })
                        ]
                    }),
                    children
                ]
            })
        })
    }));
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9319:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _features_building_control_panel_controlPanelSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1014);
/* harmony import */ var _core_store_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2404);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_store_core__WEBPACK_IMPORTED_MODULE_3__]);
_core_store_core__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const SystemComponentVisibilityComposition = ({ children , visibilityOfSystemComponentControl  })=>{
    const systemComponentsVisibilities = (0,_core_store_core__WEBPACK_IMPORTED_MODULE_3__/* .useAppSelector */ .CG)(_features_building_control_panel_controlPanelSlice__WEBPACK_IMPORTED_MODULE_2__/* .selectSystemComponentsVisibilities */ .an);
    const isComponentVisible = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>systemComponentsVisibilities[visibilityOfSystemComponentControl]
    , [
        systemComponentsVisibilities,
        visibilityOfSystemComponentControl
    ]);
    const getVisibilityClassName = ()=>isComponentVisible ? '' : 'visibility-hidden'
    ;
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("aside", {
        className: getVisibilityClassName(),
        children: /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().cloneElement(children, {
            isComponentVisible
        })
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SystemComponentVisibilityComposition);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2698:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ partials_MetaHead)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
;// CONCATENATED MODULE: ./src/layout/partials/MetaHead.tsx



const MetaHead = ()=>{
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("title", {
                children: "Multithreading JS"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                name: "viewport",
                content: "initial-scale=0.8, width=device-width"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("link", {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            })
        ]
    }));
};
/* harmony default export */ const partials_MetaHead = (MetaHead);


/***/ }),

/***/ 2957:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApplicationComposition)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core_store_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2404);
/* harmony import */ var _layout_Layout_composition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2668);
/* harmony import */ var _features_background_browser_storage_BrowserStoragePersist_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6295);
/* harmony import */ var _features_background_socket_client_SocketConnectionAndListening_controller__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3997);
/* harmony import */ var _features_background_web_workers_WorkersActiveInstancesAndCommunication_controller__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6629);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _features_building_fps_monitor_UI_FPSMonitorWindow_molecule__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5285);
/* harmony import */ var _features_background_icon_pack_IconPack_controller__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2884);
/* harmony import */ var _features_background_border_color_change_BorderColorChange_controller__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3536);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5574);
/* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_mui_material_colors__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5152);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _core_routes_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(872);
/* harmony import */ var _features_building_workers_scoreboard_UI_WorkersScoreboardWindow_molecule__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(1242);
/* harmony import */ var _features_building_workers_global_work_control_UI_WorkersGlobalWorkControlWindow_molecule__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(8211);
/* harmony import */ var _layout_partials_MetaHead__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(2698);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_store_core__WEBPACK_IMPORTED_MODULE_3__, _features_background_browser_storage_BrowserStoragePersist_controller__WEBPACK_IMPORTED_MODULE_5__, _features_background_socket_client_SocketConnectionAndListening_controller__WEBPACK_IMPORTED_MODULE_6__, _features_background_web_workers_WorkersActiveInstancesAndCommunication_controller__WEBPACK_IMPORTED_MODULE_7__, _features_building_fps_monitor_UI_FPSMonitorWindow_molecule__WEBPACK_IMPORTED_MODULE_9__, _features_background_border_color_change_BorderColorChange_controller__WEBPACK_IMPORTED_MODULE_11__, _features_building_workers_scoreboard_UI_WorkersScoreboardWindow_molecule__WEBPACK_IMPORTED_MODULE_16__, _features_building_workers_global_work_control_UI_WorkersGlobalWorkControlWindow_molecule__WEBPACK_IMPORTED_MODULE_17__]);
([_core_store_core__WEBPACK_IMPORTED_MODULE_3__, _features_background_browser_storage_BrowserStoragePersist_controller__WEBPACK_IMPORTED_MODULE_5__, _features_background_socket_client_SocketConnectionAndListening_controller__WEBPACK_IMPORTED_MODULE_6__, _features_background_web_workers_WorkersActiveInstancesAndCommunication_controller__WEBPACK_IMPORTED_MODULE_7__, _features_building_fps_monitor_UI_FPSMonitorWindow_molecule__WEBPACK_IMPORTED_MODULE_9__, _features_background_border_color_change_BorderColorChange_controller__WEBPACK_IMPORTED_MODULE_11__, _features_building_workers_scoreboard_UI_WorkersScoreboardWindow_molecule__WEBPACK_IMPORTED_MODULE_16__, _features_building_workers_global_work_control_UI_WorkersGlobalWorkControlWindow_molecule__WEBPACK_IMPORTED_MODULE_17__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






















const ControlPanelMolecule = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_14__["default"])(null, {
    loadableGenerated: {
        modules: [
            "_app.tsx -> " + "@/features/building/control-panel/UI/ControlPanel.molecule"
        ]
    },
    ssr: false
});
// Main application component.
// Includes app layout as well as realtime controllers
//
function ApplicationComposition({ Component , pageProps  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_15__.useRouter)();
    const isTheStartPageActually = ()=>router.route === _core_routes_core__WEBPACK_IMPORTED_MODULE_19__/* .ROUTE_START_PAGE_SCREEN */ .tL
    ;
    const theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_12__.createTheme)({
        palette: {
            primary: {
                main: _mui_material_colors__WEBPACK_IMPORTED_MODULE_13__.grey[900]
            },
            secondary: {
                main: _mui_material_colors__WEBPACK_IMPORTED_MODULE_13__.lightBlue[800],
                contrastText: _mui_material_colors__WEBPACK_IMPORTED_MODULE_13__.lightBlue[100]
            },
            mode: 'dark'
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        boxShadow: '0 0 1rem 0 rgba(204, 204, 204, 0.3)',
                        borderWidth: '1px',
                        borderColor: 'rgba(153, 153, 153,0.7)',
                        borderStyle: 'solid'
                    }
                }
            },
            MuiPopover: {
                styleOverrides: {
                    paper: {
                        maxWidth: '590px',
                        width: '100%',
                        backgroundColor: '#027bde',
                        color: 'white'
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: '#e0e0e0'
                    }
                }
            },
            MuiButtonGroup: {
                styleOverrides: {
                    root: {
                        borderColor: '#027bde',
                        borderWidth: '1px',
                        borderStyle: 'solid'
                    }
                }
            },
            MuiBadge: {
                styleOverrides: {
                    badge: {
                        pointerEvents: 'all'
                    }
                }
            }
        }
    });
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_8__.ThemeProvider, {
        theme: theme,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout_partials_MetaHead__WEBPACK_IMPORTED_MODULE_18__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_8__.CssBaseline, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_redux__WEBPACK_IMPORTED_MODULE_2__.Provider, {
                store: _core_store_core__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_features_background_icon_pack_IconPack_controller__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_features_background_socket_client_SocketConnectionAndListening_controller__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_features_background_web_workers_WorkersActiveInstancesAndCommunication_controller__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_features_background_browser_storage_BrowserStoragePersist_controller__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_features_background_border_color_change_BorderColorChange_controller__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {}),
                    isTheStartPageActually() ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_features_building_fps_monitor_UI_FPSMonitorWindow_molecule__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {}),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_features_building_workers_scoreboard_UI_WorkersScoreboardWindow_molecule__WEBPACK_IMPORTED_MODULE_16__/* ["default"] */ .Z, {}),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_features_building_workers_global_work_control_UI_WorkersGlobalWorkControlWindow_molecule__WEBPACK_IMPORTED_MODULE_17__/* ["default"] */ .Z, {}),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ControlPanelMolecule, {})
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout_Layout_composition__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                            ...pageProps
                        })
                    })
                ]
            })
        ]
    }));
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5692:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material");

/***/ }),

/***/ 5574:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/colors");

/***/ }),

/***/ 8442:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/styles");

/***/ }),

/***/ 5184:
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 5832:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 192:
/***/ ((module) => {

"use strict";
module.exports = require("react-draggable");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 4612:
/***/ ((module) => {

"use strict";
module.exports = import("socket.io-client");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [152,683,784], () => (__webpack_exec__(2957)));
module.exports = __webpack_exports__;

})();