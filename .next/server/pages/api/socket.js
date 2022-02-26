"use strict";
(() => {
var exports = {};
exports.id = 31;
exports.ids = [31];
exports.modules = {

/***/ 2316:
/***/ ((module) => {

module.exports = require("request-ip");

/***/ }),

/***/ 767:
/***/ ((module) => {

module.exports = require("winston-daily-rotate-file");

/***/ }),

/***/ 9505:
/***/ ((module) => {

module.exports = import("socket.io");;

/***/ }),

/***/ 7512:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ getSecuredClientBrowserID)
/* harmony export */ });
const getSecuredClientBrowserID = (userAgent, clientIP)=>{
    const base = userAgent + clientIP;
    const slicedPart = base.slice(0, base.length - 7).split(/\D/).join('');
    return base.slice(0, base.length - 7) + slicedPart;
};


/***/ }),

/***/ 1782:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "v": () => (/* binding */ addServerConsoleVerbose)
});

// UNUSED EXPORTS: changeServerVerboseModeFlag

// EXTERNAL MODULE: external "winston-daily-rotate-file"
var external_winston_daily_rotate_file_ = __webpack_require__(767);
;// CONCATENATED MODULE: ./src-backend/features/server-verbose-logs/serverVerboseLogsEntity.ts
const verboseModeDefaultValue = true;
const serverVerboseLogsEntity_SERVER_VERBOSE_MODE = {
    isEnabled: verboseModeDefaultValue
};

// EXTERNAL MODULE: ./src-backend/features/server-verbose-logs/serverVerboseLogsToFile.ts + 1 modules
var serverVerboseLogsToFile = __webpack_require__(4945);
;// CONCATENATED MODULE: ./src-backend/features/server-verbose-logs/serverVerboseLogs.api.ts



const changeServerVerboseModeFlag = (verboseModeEnableState)=>{
    switch(verboseModeEnableState){
        case 'on':
            SERVER_VERBOSE_MODE.isEnabled = true;
            break;
        case 'off':
            SERVER_VERBOSE_MODE.isEnabled = false;
    }
};
// This little shell allows handle app logs.
// Feel free to add a new one - in critical-looks-like areas.
// Check out how this has already been used by follow the reference...
// Most commonly use e.g.: event commands verbose.
//
const addServerConsoleVerbose = (communicate, mode = 'log')=>{
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
            serverVerboseLogsEntity_SERVER_VERBOSE_MODE.isEnabled && console.log(dateString, communicate);
            (0,serverVerboseLogsToFile/* logToFile */._)(`[log] ${dateString} ${communicate}`, 'warn');
            break;
        case 'warn':
            console.warn(dateString, communicate);
            (0,serverVerboseLogsToFile/* logToFile */._)(`${dateString} ${communicate}`, 'warn');
            break;
        case 'error':
            console.error(dateString, communicate);
            (0,serverVerboseLogsToFile/* logToFile */._)(`${dateString} ${communicate}`, 'error');
    }
};


/***/ }),

/***/ 4945:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "_": () => (/* binding */ logToFile)
});

// EXTERNAL MODULE: external "winston-daily-rotate-file"
var external_winston_daily_rotate_file_ = __webpack_require__(767);
var external_winston_daily_rotate_file_default = /*#__PURE__*/__webpack_require__.n(external_winston_daily_rotate_file_);
;// CONCATENATED MODULE: external "winston"
const external_winston_namespaceObject = require("winston");
;// CONCATENATED MODULE: ./src-backend/features/server-verbose-logs/serverVerboseLogsToFile.ts


const transport = new (external_winston_daily_rotate_file_default())({
    dirname: './logs',
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH-mm',
    zippedArchive: false,
    frequency: '24h'
});
const logger = external_winston_namespaceObject.createLogger({
    transports: [
        transport
    ]
});
const logToFile = (communicate, mode = 'log')=>{
    switch(mode){
        case 'log':
            logger.verbose(communicate);
            break;
        case 'warn':
            logger.warn(communicate);
            break;
        case 'error':
            logger.error(communicate);
    }
};


/***/ }),

/***/ 652:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BB": () => (/* binding */ getAllJobsDoneResponse),
/* harmony export */   "ci": () => (/* binding */ getClientBrowserIDJobsDoneResponse),
/* harmony export */   "P_": () => (/* binding */ getClientBrowserIDResponse)
/* harmony export */ });
/* harmony import */ var _runtimeData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4049);
/* harmony import */ var _features_client_browser_id_clientBrowserID_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7512);


const getAllJobsDoneResponse = (request, clientIP)=>{
    return {
        data: _runtimeData__WEBPACK_IMPORTED_MODULE_0__/* .workersRuntimeData */ .j,
        status: 200,
        clientBrowserID: (0,_features_client_browser_id_clientBrowserID_api__WEBPACK_IMPORTED_MODULE_1__/* .getSecuredClientBrowserID */ .g)(request.userAgent, clientIP)
    };
};
const getClientBrowserIDJobsDoneResponse = (request, clientIP)=>{
    var ref;
    const clientBrowserDataOnly = (ref = _runtimeData__WEBPACK_IMPORTED_MODULE_0__/* .workersRuntimeData */ .j[(0,_features_client_browser_id_clientBrowserID_api__WEBPACK_IMPORTED_MODULE_1__/* .getSecuredClientBrowserID */ .g)(request.userAgent, clientIP)]) !== null && ref !== void 0 ? ref : {};
    return {
        data: clientBrowserDataOnly,
        status: 200,
        clientBrowserID: (0,_features_client_browser_id_clientBrowserID_api__WEBPACK_IMPORTED_MODULE_1__/* .getSecuredClientBrowserID */ .g)(request.userAgent, clientIP)
    };
};
const getClientBrowserIDResponse = (request, clientIP)=>{
    return {
        data: (0,_features_client_browser_id_clientBrowserID_api__WEBPACK_IMPORTED_MODULE_1__/* .getSecuredClientBrowserID */ .g)(request.userAgent, clientIP),
        status: 200,
        clientBrowserID: (0,_features_client_browser_id_clientBrowserID_api__WEBPACK_IMPORTED_MODULE_1__/* .getSecuredClientBrowserID */ .g)(request.userAgent, clientIP)
    };
};


/***/ }),

/***/ 671:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hJ": () => (/* binding */ setNewJobDone)
/* harmony export */ });
/* unused harmony exports getAllJobsDone, setClearRuntimeData */
/* harmony import */ var _runtimeData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4049);

const roundDecimalCalculationResultToInt = (number)=>Math.round(number * 1000000000000)
;
const cleanupWorkerResultsArray = (clientBrowserID, workerName)=>{
    _runtimeData__WEBPACK_IMPORTED_MODULE_0__/* .workersRuntimeData */ .j[clientBrowserID][workerName].results.length > 200 && (()=>_runtimeData__WEBPACK_IMPORTED_MODULE_0__/* .workersRuntimeData */ .j[clientBrowserID][workerName].results.length = 200
    )();
};
const setNewValuesToWorkerKey = ({ clientBrowserID , data  })=>{
    const { workerName , lastCalculations  } = data;
    _runtimeData__WEBPACK_IMPORTED_MODULE_0__/* .workersRuntimeData */ .j[clientBrowserID][workerName].results.unshift(roundDecimalCalculationResultToInt(lastCalculations));
    _runtimeData__WEBPACK_IMPORTED_MODULE_0__/* .workersRuntimeData */ .j[clientBrowserID][workerName].amount += 1;
};
const returnDefaultWorkerJobBody = ()=>({
        results: [],
        amount: 0
    })
;
const checkAndCreateNotExistingWorkerSchema = ({ clientBrowserID , data  })=>{
    typeof _runtimeData__WEBPACK_IMPORTED_MODULE_0__/* .workersRuntimeData */ .j[clientBrowserID] === 'undefined' && (()=>_runtimeData__WEBPACK_IMPORTED_MODULE_0__/* .workersRuntimeData */ .j[clientBrowserID] = {}
    )();
    typeof _runtimeData__WEBPACK_IMPORTED_MODULE_0__/* .workersRuntimeData */ .j[clientBrowserID][data.workerName] === 'undefined' && (()=>_runtimeData__WEBPACK_IMPORTED_MODULE_0__/* .workersRuntimeData */ .j[clientBrowserID][data.workerName] = returnDefaultWorkerJobBody()
    )();
};
// Data receive handler
//
const setNewJobDone = (newWorkersJobByIP)=>{
    checkAndCreateNotExistingWorkerSchema(newWorkersJobByIP);
    setNewValuesToWorkerKey(newWorkersJobByIP);
    cleanupWorkerResultsArray(newWorkersJobByIP.clientBrowserID, newWorkersJobByIP.data.workerName);
};
// Return current state of all jobs done by all threads
//
const getAllJobsDone = ()=>workersRuntimeData
;
// Clear _ALL_ data
//
const setClearRuntimeData = ()=>{
    const keys = Object.keys(workersRuntimeData);
    keys.forEach((key)=>delete workersRuntimeData[key]
    );
};


/***/ }),

/***/ 4049:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ workersRuntimeData)
/* harmony export */ });
//
// It's a pseudo-DB for the app presentation and fast start dev env.
// Instead of real DB -
// to avoid a boilerplate code overhead with additional configurations.
//
//////////////////////////////////////////////////////////////////
// Runtime data
// 'some-id': { worker1: {
// // 	results: [235452,253234,523434]
// // 	amount: 3
// // }, worker2: {...}}}
//
const workersRuntimeData = {} //
 //
 //////////////////////////////////////////////////////////////////
;


/***/ }),

/***/ 4824:
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

/***/ 1852:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9505);
/* harmony import */ var request_ip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2316);
/* harmony import */ var request_ip__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(request_ip__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4824);
/* harmony import */ var _src_backend_runtimeData_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(671);
/* harmony import */ var _src_backend_responsesEntities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(652);
/* harmony import */ var _src_backend_features_server_verbose_logs_serverVerboseLogs_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1782);
/* harmony import */ var _src_backend_features_client_browser_id_clientBrowserID_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7512);
/* harmony import */ var _src_backend_features_server_verbose_logs_serverVerboseLogsToFile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4945);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([socket_io__WEBPACK_IMPORTED_MODULE_0__]);
socket_io__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








const ioHandler = (req, res)=>{
    var ref, ref1, ref2;
    var ref3;
    const clientIP = (ref3 = request_ip__WEBPACK_IMPORTED_MODULE_1___default().getClientIp(req)) !== null && ref3 !== void 0 ? ref3 : '0.0.0.0';
    (0,_src_backend_features_server_verbose_logs_serverVerboseLogs_api__WEBPACK_IMPORTED_MODULE_5__/* .addServerConsoleVerbose */ .v)(`New IP connected: ${clientIP}`);
    if (!(res === null || res === void 0 ? void 0 : (ref = res.socket) === null || ref === void 0 ? void 0 : (ref1 = ref.server) === null || ref1 === void 0 ? void 0 : ref1.io) && (res === null || res === void 0 ? void 0 : (ref2 = res.socket) === null || ref2 === void 0 ? void 0 : ref2.server)) {
        const io = new socket_io__WEBPACK_IMPORTED_MODULE_0__.Server(res.socket.server);
        io.on('connection', (serverSocketClient)=>{
            (0,_src_backend_features_server_verbose_logs_serverVerboseLogs_api__WEBPACK_IMPORTED_MODULE_5__/* .addServerConsoleVerbose */ .v)(`New IO connection from ${clientIP}`);
            //
            // WRITE
            //
            serverSocketClient.on(_features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_2__/* .WEB_SOCKET_EVENTS_TRIGGERS.reportJobDone */ .z.reportJobDone, (request)=>{
                const workerKey = request.data.keyNames;
                const workerWorkAndCalculationData = request.data.unknownData;
                if (!workerWorkAndCalculationData.lastCalculations) {
                    (0,_src_backend_features_server_verbose_logs_serverVerboseLogs_api__WEBPACK_IMPORTED_MODULE_5__/* .addServerConsoleVerbose */ .v)(`The message just came in, but with no calculation data: ${workerKey.workerName} ${new Date(workerWorkAndCalculationData.timestamp)}`, 'log');
                    return void undefined;
                }
                (0,_src_backend_runtimeData_api__WEBPACK_IMPORTED_MODULE_3__/* .setNewJobDone */ .hJ)({
                    clientBrowserID: (0,_src_backend_features_client_browser_id_clientBrowserID_api__WEBPACK_IMPORTED_MODULE_7__/* .getSecuredClientBrowserID */ .g)(request.userAgent, clientIP),
                    data: {
                        workerName: workerKey.workerName,
                        lastCalculations: workerWorkAndCalculationData.lastCalculations
                    }
                });
                serverSocketClient.broadcast.emit(_features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_2__/* .WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone */ .z.getAllJobsDone, (0,_src_backend_responsesEntities__WEBPACK_IMPORTED_MODULE_4__/* .getAllJobsDoneResponse */ .BB)(request, clientIP));
                serverSocketClient.emit(_features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_2__/* .WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone */ .z.getAllJobsDone, (0,_src_backend_responsesEntities__WEBPACK_IMPORTED_MODULE_4__/* .getAllJobsDoneResponse */ .BB)(request, clientIP));
                serverSocketClient.emit(_features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_2__/* .WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserIDJobsDone */ .z.getClientBrowserIDJobsDone, (0,_src_backend_responsesEntities__WEBPACK_IMPORTED_MODULE_4__/* .getClientBrowserIDJobsDoneResponse */ .ci)(request, clientIP));
            });
            serverSocketClient.on(_features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_2__/* .WEB_SOCKET_EVENTS_TRIGGERS.reportNewLog */ .z.reportNewLog, (request)=>{
                (0,_src_backend_features_server_verbose_logs_serverVerboseLogsToFile__WEBPACK_IMPORTED_MODULE_6__/* .logToFile */ ._)(`[${clientIP}] ${request.data}`, 'warn');
            });
            //
            // READ
            //
            serverSocketClient.on(_features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_2__/* .WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone */ .z.getAllJobsDone, (request)=>{
                serverSocketClient.emit(_features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_2__/* .WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone */ .z.getAllJobsDone, (0,_src_backend_responsesEntities__WEBPACK_IMPORTED_MODULE_4__/* .getAllJobsDoneResponse */ .BB)(request, clientIP));
            });
            serverSocketClient.on(_features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_2__/* .WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID */ .z.getClientBrowserID, (request)=>{
                serverSocketClient.emit(_features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_2__/* .WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID */ .z.getClientBrowserID, (0,_src_backend_responsesEntities__WEBPACK_IMPORTED_MODULE_4__/* .getClientBrowserIDResponse */ .P_)(request, clientIP));
            });
        });
        res.socket.server.io = io;
    }
    res.end();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ioHandler);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1852));
module.exports = __webpack_exports__;

})();