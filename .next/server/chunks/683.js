"use strict";
exports.id = 683;
exports.ids = [683];
exports.modules = {

/***/ 2714:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Un": () => (/* binding */ MAX_WORKERS_LIMIT),
/* harmony export */   "Nc": () => (/* binding */ MAIN_THREAD_KEY),
/* harmony export */   "_x": () => (/* binding */ WAITING_TIME_FOR_BUNDLE_WORKER_ACTIONS),
/* harmony export */   "pc": () => (/* binding */ INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES),
/* harmony export */   "wk": () => (/* binding */ STORAGE_KEY_START_PAGE_SEEN),
/* harmony export */   "Gp": () => (/* binding */ StorageKeyStartPageEnum),
/* harmony export */   "Oe": () => (/* binding */ STORAGE_KEY_WORKERS_AMOUNT),
/* harmony export */   "LJ": () => (/* binding */ STORAGE_KEY_CONTROL_PANEL_SWITCHES),
/* harmony export */   "j_": () => (/* binding */ STORAGE_KEY_FLOATING_COMPONENT_ON_THE_SCREEN_POSITION)
/* harmony export */ });
/* unused harmony exports MIN_WORKER_COMPLEXITY_POSSIBILITY, MAX_WORKER_COMPLEXITY_POSSIBILITY, STORAGE_KEY_CONTROL_PANEL_COLLAPSE_STATE, StorageKeyControlPanelCollapseStateEnum, MIN_DESKTOP_INNER_WIDTH_MEDIA_QUERY */
/* harmony import */ var _coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4353);

// Worker limit. Automatic set - window.navigator.hardwareConcurrency
const MAX_WORKERS_LIMIT = (0,_coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_0__/* .fireJustClientSide */ .o)(()=>window.navigator.hardwareConcurrency || 4
);
// WorkerKey entity for main thread. Exceptionally - it is not a Worker :-) But using the same logic and the case is singular.
const MAIN_THREAD_KEY = {
    workerName: 'mainThread'
};
// Debounce freeze time for bundle actions. Check the usage to know more.
const WAITING_TIME_FOR_BUNDLE_WORKER_ACTIONS = 390;
// Debounce - Optimal for CPU usage.
// Realtime - The most accurate way to receive data over time.
const INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES = 0 // 0 means realtime
;
// Complexity limit. So high values can just crash the browsers (event loop overload).
const MIN_WORKER_COMPLEXITY_POSSIBILITY = 2;
const MAX_WORKER_COMPLEXITY_POSSIBILITY = 200;
// Browser storage:
//
const STORAGE_KEY_START_PAGE_SEEN = 'startPageSeen';
var StorageKeyStartPageEnum;
(function(StorageKeyStartPageEnum) {
    StorageKeyStartPageEnum['true'] = 'true';
    StorageKeyStartPageEnum['false'] = 'false';
})(StorageKeyStartPageEnum || (StorageKeyStartPageEnum = {}));
const STORAGE_KEY_WORKERS_AMOUNT = 'workersAmount';
const STORAGE_KEY_CONTROL_PANEL_COLLAPSE_STATE = 'controlPanelCollapsedState';
var StorageKeyControlPanelCollapseStateEnum;
(function(StorageKeyControlPanelCollapseStateEnum) {
    StorageKeyControlPanelCollapseStateEnum['true'] = 'true';
    StorageKeyControlPanelCollapseStateEnum['false'] = 'false';
})(StorageKeyControlPanelCollapseStateEnum || (StorageKeyControlPanelCollapseStateEnum = {}));
const STORAGE_KEY_CONTROL_PANEL_SWITCHES = 'controlPanelSwitches';
const STORAGE_KEY_FLOATING_COMPONENT_ON_THE_SCREEN_POSITION = 'onTheScreenPosition';
// Mobile:
//
const MIN_DESKTOP_INNER_WIDTH_MEDIA_QUERY = '(min-width:600px)';


/***/ }),

/***/ 4353:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ fireJustClientSide)
/* harmony export */ });
/* harmony import */ var _features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8867);

// Server Side Rendering guard for browser global objects access while Next.js making a build.
//
const fireJustClientSide = (justClientSideCallback, loggerAdditionalEcho = '')=>{
    loggerAdditionalEcho && (0,_features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_0__/* .addConsoleVerbose */ .J)(`[Trying to -> ${loggerAdditionalEcho}]`);
    if (false) {} else {
        loggerAdditionalEcho && (0,_features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_0__/* .addConsoleVerbose */ .J)(`[Failed -> ${loggerAdditionalEcho}] - Probably server side.`);
        return null;
    }
};


/***/ }),

/***/ 872:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z9": () => (/* binding */ ROUTE_MAIN_APP_SCREEN),
/* harmony export */   "tL": () => (/* binding */ ROUTE_START_PAGE_SCREEN),
/* harmony export */   "vY": () => (/* binding */ ROUTE_API_WEB_SOCKET)
/* harmony export */ });
//
//
//
// Routes keeping in files.
// Single source of truth for app routing.
//
//
//
const ROUTE_MAIN_APP_SCREEN = '/';
const ROUTE_START_PAGE_SCREEN = '/start';
// API routes
//
const ROUTE_API_WEB_SOCKET = '/api/socket' //@TODO here is a field for create a script in nodejs to keeping these well automatic
;


/***/ }),

/***/ 5449:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ setStorageItem),
/* harmony export */   "q": () => (/* binding */ getStorageItem)
/* harmony export */ });
/* harmony import */ var _coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4353);

const setStorageItem = (key, value)=>{
    (0,_coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_0__/* .fireJustClientSide */ .o)(()=>window.localStorage.setItem(key, value)
    );
};
const getStorageItem = (key)=>{
    return (0,_coding_utils_environmentOperations_api__WEBPACK_IMPORTED_MODULE_0__/* .fireJustClientSide */ .o)(()=>window.localStorage.getItem(key)
    );
};


/***/ }),

/***/ 3583:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_g": () => (/* binding */ sendCommandMessageToSocket),
/* harmony export */   "zB": () => (/* binding */ listenToSocketEventWithDebounce)
/* harmony export */ });
/* unused harmony export getSocketInstanceAbsolutely */
/* harmony import */ var _app_config_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2714);
/* harmony import */ var _features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8867);


const getSocketInstanceAbsolutely = ()=>window.clientSocket
;
const sendCommandMessageToSocket = (eventName, data)=>{
    const dataToSend = {
        status: 200,
        data,
        userAgent: navigator.userAgent
    };
    getSocketInstanceAbsolutely().emit(eventName, dataToSend);
};
// Generic socket event listener, but only for a wide range of Application.
// It is strongly recommended to use it.
//
const listenToSocketEventWithDebounce = (socketClient, socketEventName, socketEventListenerCallback)=>{
    let timeoutID = 0;
    socketClient.on(socketEventName, (response)=>{
        if (response.status !== 200) (0,_features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_1__/* .addConsoleVerbose */ .J)('Response status is different than 200.', 'warn');
        if (_app_config_constants__WEBPACK_IMPORTED_MODULE_0__/* .INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES */ .pc === 0) {
            socketEventListenerCallback(response.data);
        } else {
            if (timeoutID !== 0) {
                socketEventListenerCallback(response.data);
                window.clearTimeout(timeoutID);
                timeoutID = window.setTimeout(()=>{
                    socketEventListenerCallback(response.data);
                    timeoutID = 0;
                }, _app_config_constants__WEBPACK_IMPORTED_MODULE_0__/* .INTERVAL_TIME_DEBOUNCING_SOCKET_MESSAGES */ .pc);
            }
        }
    });
};


/***/ }),

/***/ 9459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": () => (/* binding */ WEB_SOCKET_EVENTS_TRIGGERS)
/* harmony export */ });
const WEB_SOCKET_EVENTS_TRIGGERS = (()=>Object.freeze({
        reportJobDone: 'report-job-done',
        getAllJobsDone: 'get-all-jobs-done',
        getClientBrowserIDJobsDone: 'get-client-browser-id-jobs-done',
        getClientBrowserID: 'get-client-browser-id',
        reportNewLog: 'report-new-log'
    })
)();


/***/ }),

/***/ 8867:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "J": () => (/* binding */ addConsoleVerbose)
});

// UNUSED EXPORTS: changeVerboseModeFlag

;// CONCATENATED MODULE: ./src/features/background/verbose-logs/verboseLogsConfig.ts
const verboseModeDefaultValue = true;
const verboseLogsConfig_VERBOSE_MODE = {
    isEnabled: verboseModeDefaultValue
};

// EXTERNAL MODULE: ./src/features/background/socket-client/socket.api.ts
var socket_api = __webpack_require__(3583);
// EXTERNAL MODULE: ./src/features/background/socket-client/socketEventsEntities.ts
var socketEventsEntities = __webpack_require__(9459);
;// CONCATENATED MODULE: ./src/features/background/verbose-logs/verboseLogs.api.ts



const changeVerboseModeFlag = (verboseModeEnableState)=>{
    switch(verboseModeEnableState){
        case 'on':
            VERBOSE_MODE.isEnabled = true;
            break;
        case 'off':
            VERBOSE_MODE.isEnabled = false;
    }
};
const emitLogToServer = (communicate)=>{
    (0,socket_api/* sendCommandMessageToSocket */._g)(socketEventsEntities/* WEB_SOCKET_EVENTS_TRIGGERS.reportNewLog */.z.reportNewLog, communicate);
};
// This little shell allows handle app logs.
// Feel free to add a new one - in critical-looks-like areas.
// Check out how this has already been used by follow the reference...
// Most commonly use e.g.: CQS commands verbose.
//
const addConsoleVerbose = (communicate, mode = 'log')=>{
    const dateNow = new Date();
    const date = dateNow.toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
    const dateString = `[${date}]`;
    switch(mode){
        case 'log':
            verboseLogsConfig_VERBOSE_MODE.isEnabled && console.log(dateString, communicate);
            break;
        case 'warn':
            console.warn(dateString, communicate);
            break;
        case 'error':
            console.error(dateString, communicate);
    }
    emitLogToServer(`${dateString}, ${communicate}, ${mode}`);
};


/***/ })

};
;