exports.id = 784;
exports.ids = [784];
exports.modules = {

/***/ 7829:
/***/ ((module) => {

// Exports
module.exports = {
	"button": "AppComponents_button__O8NiK"
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

/***/ 2404:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TL": () => (/* binding */ useAppDispatch),
/* harmony export */   "CG": () => (/* binding */ useAppSelector),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export makeStore */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3806);
/* harmony import */ var _features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7925);
/* harmony import */ var _features_building_control_panel_controlPanelSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1014);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_2__, _features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_3__]);
([_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_2__, _features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





function makeStore() {
    return (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.configureStore)({
        reducer: {
            calculationsWorkersSlice: _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_2__/* .webWorkersSlice.reducer */ .hc.reducer,
            socketSlice: _features_background_socket_client_socketSlice__WEBPACK_IMPORTED_MODULE_3__/* .socketSlice.reducer */ .n.reducer,
            controlPanelSlice: _features_building_control_panel_controlPanelSlice__WEBPACK_IMPORTED_MODULE_4__/* .controlPanelSlice.reducer */ .Yb.reducer
        }
    });
}
const store = makeStore();
// Redux store hooks.
// Typed.
//
const useAppDispatch = ()=>(0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)()
;
const useAppSelector = react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7925:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mW": () => (/* binding */ connectSocketThunk),
/* harmony export */   "n": () => (/* binding */ socketSlice),
/* harmony export */   "kl": () => (/* binding */ selectSocketIsActive),
/* harmony export */   "PX": () => (/* binding */ selectLastReceivedClientBrowserWorkerJobsData)
/* harmony export */ });
/* unused harmony export selectLastReceivedAnyWorkerJobsData */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4612);
/* harmony import */ var _core_store_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2404);
/* harmony import */ var _features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9459);
/* harmony import */ var _features_background_socket_client_socket_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3583);
/* harmony import */ var _core_routes_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(872);
/* harmony import */ var _features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8867);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([socket_io_client__WEBPACK_IMPORTED_MODULE_1__, _core_store_core__WEBPACK_IMPORTED_MODULE_2__]);
([socket_io_client__WEBPACK_IMPORTED_MODULE_1__, _core_store_core__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const connectSocketThunk = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)('connectSocketThunk', async ()=>{
    return await new Promise((resolve)=>{
        fetch(_core_routes_core__WEBPACK_IMPORTED_MODULE_6__/* .ROUTE_API_WEB_SOCKET */ .vY).finally(async ()=>{
            const ioSocket = await (0,socket_io_client__WEBPACK_IMPORTED_MODULE_1__.io)().connect();
            ioSocket.on('connect', ()=>(0,_features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_5__/* .addConsoleVerbose */ .J)('Socket-client connected to Socket-server.')
            );
            ioSocket.on('disconnect', ()=>(0,_features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_5__/* .addConsoleVerbose */ .J)('Socket-client disconnected from Socket-server.')
            );
            // Pin socket for an App common usage
            //
            window.clientSocket = ioSocket;
            //
            //
            // Enable listening and passing the last data:
            //
            // with all calculation jobs done
            //
            (0,_features_background_socket_client_socket_api__WEBPACK_IMPORTED_MODULE_4__/* .listenToSocketEventWithDebounce */ .zB)(ioSocket, _features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_3__/* .WEB_SOCKET_EVENTS_TRIGGERS.getAllJobsDone */ .z.getAllJobsDone, (response)=>{
                _core_store_core__WEBPACK_IMPORTED_MODULE_2__/* ["default"].dispatch */ .ZP.dispatch(socketSlice.actions.handleNewAnyWorkersJobDataReceiveFromSocket(response));
            });
            // with just client's browser calculation jobs done only
            //
            (0,_features_background_socket_client_socket_api__WEBPACK_IMPORTED_MODULE_4__/* .listenToSocketEventWithDebounce */ .zB)(ioSocket, _features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_3__/* .WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserIDJobsDone */ .z.getClientBrowserIDJobsDone, (response)=>{
                _core_store_core__WEBPACK_IMPORTED_MODULE_2__/* ["default"].dispatch */ .ZP.dispatch(socketSlice.actions.handleNewClientBrowserWorkersJobDataReceiveFromSocket(response));
            });
            // with client's browser ID
            //
            (0,_features_background_socket_client_socket_api__WEBPACK_IMPORTED_MODULE_4__/* .listenToSocketEventWithDebounce */ .zB)(ioSocket, _features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_3__/* .WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID */ .z.getClientBrowserID, (response)=>{
                _core_store_core__WEBPACK_IMPORTED_MODULE_2__/* ["default"].dispatch */ .ZP.dispatch(socketSlice.actions.handleNewClientBrowserID(response));
            });
            // When listening is enabled - trigger Socket to send current browser client ID
            //
            (0,_features_background_socket_client_socket_api__WEBPACK_IMPORTED_MODULE_4__/* .sendCommandMessageToSocket */ ._g)(_features_background_socket_client_socketEventsEntities__WEBPACK_IMPORTED_MODULE_3__/* .WEB_SOCKET_EVENTS_TRIGGERS.getClientBrowserID */ .z.getClientBrowserID, undefined);
            // The end of thunk
            //
            resolve({
                isSocketActive: true
            });
        });
    });
});
const initialState = {
    active: false,
    lastReceivedAnyWorkerJobsData: {},
    lastReceivedClientBrowserWorkerJobsData: {},
    clientBrowserID: null
};
const socketSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'socketSlice',
    initialState,
    reducers: {
        handleNewAnyWorkersJobDataReceiveFromSocket: (state, action)=>{
            state.lastReceivedAnyWorkerJobsData = action.payload;
        },
        handleNewClientBrowserWorkersJobDataReceiveFromSocket: (state, action)=>{
            state.lastReceivedClientBrowserWorkerJobsData = action.payload;
        },
        handleNewClientBrowserID: (state, action)=>{
            if (typeof state.clientBrowserID === 'string') return void undefined;
            state.clientBrowserID = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(connectSocketThunk.fulfilled, (state, action)=>{
            state.active = action.payload.isSocketActive;
        });
    }
});
const selectSocketIsActive = (state)=>state.socketSlice.active
;
const selectLastReceivedAnyWorkerJobsData = (state)=>state.socketSlice.lastReceivedAnyWorkerJobsData
;
const selectLastReceivedClientBrowserWorkerJobsData = (state)=>state.socketSlice.lastReceivedClientBrowserWorkerJobsData
;
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (socketSlice.reducer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5527:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ workersKeysNames)
/* harmony export */ });
//
// To addOne new Worker:
// Add 'file-public-name.js' of worker here with friendlyName for app usage.
//
const workersKeysNames = {
    calculationWorker: {
        workerName: 'calculationsWorker',
        fileName: 'calculation-worker.js'
    }
};


/***/ }),

/***/ 309:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Uy": () => (/* binding */ constructWorkerNameByOrderIndex),
/* harmony export */   "Re": () => (/* binding */ constructCalculationWorkerKeyByName),
/* harmony export */   "Ji": () => (/* binding */ constructWorkerJobToSocketDTO),
/* harmony export */   "B5": () => (/* binding */ getWorkerInstanceAbsolutely),
/* harmony export */   "Ek": () => (/* binding */ getWorkerRealActivityStatus),
/* harmony export */   "G6": () => (/* binding */ getExistingWorkersKeys),
/* harmony export */   "R_": () => (/* binding */ queueWorkerTask),
/* harmony export */   "hi": () => (/* binding */ queueAllWorkersTask),
/* harmony export */   "OJ": () => (/* binding */ flagIfWorkerHasError),
/* harmony export */   "BE": () => (/* binding */ updateWorkerIsReadyState),
/* harmony export */   "f8": () => (/* binding */ flagIfWorkerIsWorking),
/* harmony export */   "Nx": () => (/* binding */ getValidatedPassedAmount)
/* harmony export */ });
/* harmony import */ var _app_config_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2714);
/* harmony import */ var _core_store_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2404);
/* harmony import */ var _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3806);
/* harmony import */ var _features_background_web_workers_add_new_physical_worker_here__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5527);
/* harmony import */ var _features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8867);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_store_core__WEBPACK_IMPORTED_MODULE_1__, _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_2__]);
([_core_store_core__WEBPACK_IMPORTED_MODULE_1__, _features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





// Remember: worker numbers are counted from 1, NOT FROM 0 ( building rule ;-) )
// output: calculationWorker1...
//
const constructWorkerNameByOrderIndex = (workerOrderNumber)=>`${_features_background_web_workers_add_new_physical_worker_here__WEBPACK_IMPORTED_MODULE_3__/* .workersKeysNames.calculationWorker.workerName */ .f.calculationWorker.workerName}${Number(workerOrderNumber)}`
;
const constructCalculationWorkerKeyByName = (workerName)=>({
        workerName: workerName,
        fileName: _features_background_web_workers_add_new_physical_worker_here__WEBPACK_IMPORTED_MODULE_3__/* .workersKeysNames.calculationWorker.fileName */ .f.calculationWorker.fileName
    })
;
const constructWorkerJobToSocketDTO = (event, workerKey)=>({
        keyNames: workerKey,
        unknownData: event.data
    })
;
const getWorkerInstanceAbsolutely = (workerKey)=>window[workerKey.workerName]
;
// Strict, in-action check of worker activity
//
const getWorkerRealActivityStatus = (workerName)=>{
    const LOOK_UP_STRING = 'orker';
    return String(window[workerName]).includes(LOOK_UP_STRING);
};
const getExistingWorkersKeys = ()=>{
    // Maybe-worker array of the maximum number of web-workers:
    // [Worker, undefined, Worker, Worker, undefined, ...].length === MAX_WORKERS_LIMIT
    //
    const allWorkersPossibilities = Array(_app_config_constants__WEBPACK_IMPORTED_MODULE_0__/* .MAX_WORKERS_LIMIT */ .Un).fill(undefined).reduce((accumulator, _, index)=>{
        const currentWorkerName = constructWorkerNameByOrderIndex(index + 1);
        if (typeof window[currentWorkerName] !== 'undefined' && getWorkerRealActivityStatus(currentWorkerName)) {
            return [
                ...accumulator,
                {
                    workerName: currentWorkerName
                }
            ];
        }
        return accumulator;
    }, []);
    // Filter out all undefined - leave just worker keys
    //
    return allWorkersPossibilities.filter((val)=>typeof val !== 'undefined'
    );
};
const queueWorkerTask = (workerKey, workerTask, msgForDevConsoleLog = '')=>{
    const workerWindowInstance = getWorkerInstanceAbsolutely(workerKey);
    if (!workerWindowInstance) (0,_features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_4__/* .addConsoleVerbose */ .J)(`[Bug detector]: Instance of ${workerKey.workerName} is ${typeof workerWindowInstance}`, 'error');
    const workerData = {
        keyNames: workerKey,
        unknownData: workerTask
    };
    workerWindowInstance.postMessage(workerData);
    (0,_features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_4__/* .addConsoleVerbose */ .J)(`Worker command queued: [ ${workerTask.workerTaskName} ]. ${msgForDevConsoleLog ? msgForDevConsoleLog : ''}`, 'log');
};
const queueAllWorkersTask = (workerFilename, workerTask, msgForDevConsoleLog = '')=>{
    const activeWorkersByNow = getExistingWorkersKeys();
    activeWorkersByNow.forEach((workerKey)=>{
        queueWorkerTask(workerKey, workerTask, msgForDevConsoleLog);
    });
};
const flagIfWorkerHasError = (workerKey, isError, error = {
    name: `Default error of ${workerKey.workerName}.`,
    message: 'Please pass a valid error msg.'
})=>{
    if (isError) {
        _core_store_core__WEBPACK_IMPORTED_MODULE_1__/* ["default"].dispatch */ .ZP.dispatch((0,_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_2__/* .handleWorkerErrorStateReport */ .f3)({
            workerName: workerKey.workerName,
            error: true
        }));
        (0,_features_background_verbose_logs_verboseLogs_api__WEBPACK_IMPORTED_MODULE_4__/* .addConsoleVerbose */ .J)(error, 'error');
    } else {
        _core_store_core__WEBPACK_IMPORTED_MODULE_1__/* ["default"].dispatch */ .ZP.dispatch((0,_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_2__/* .handleWorkerErrorStateReport */ .f3)({
            workerName: workerKey.workerName,
            error: false
        }));
    }
    return true;
};
const updateWorkerIsReadyState = (workerKey)=>{
    const isReady =  false && 0;
    _core_store_core__WEBPACK_IMPORTED_MODULE_1__/* ["default"].dispatch */ .ZP.dispatch((0,_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_2__/* .handleWorkerReadyStateReport */ .HU)({
        workerName: workerKey.workerName,
        ready: isReady
    }));
    return true;
};
const flagIfWorkerIsWorking = (workerKey, workingNewFlag)=>{
    const currentWorkerWorkState = _core_store_core__WEBPACK_IMPORTED_MODULE_1__/* ["default"].getState */ .ZP.getState().calculationsWorkersSlice.workStatuses[workerKey.workerName];
    if (!currentWorkerWorkState || currentWorkerWorkState.working !== workingNewFlag) {
        _core_store_core__WEBPACK_IMPORTED_MODULE_1__/* ["default"].dispatch */ .ZP.dispatch((0,_features_background_web_workers_webWorkersSlice__WEBPACK_IMPORTED_MODULE_2__/* .handleWorkerWorkStateReport */ .jb)({
            workerName: workerKey.workerName,
            working: workingNewFlag
        }));
    }
    return true;
};
// Give number or string with the range, get a number in the range.
//
const getValidatedPassedAmount = (requestedAmount, minValue, maxValue)=>{
    // Usually: a whitespace or nothing. (probably user removes everything from input by a backspace)
    if (!requestedAmount) return 0;
    // IF fulfilled, when number has more than x digits, where x is amount of digits in the passed number.
    if (typeof requestedAmount === 'string' && requestedAmount.length > String(maxValue).length) return maxValue;
    // Simple range check and making a nice iteration loop when User will use arrows to control amount
    const newAmountValue = Number(requestedAmount);
    if (newAmountValue < minValue) return minValue;
    if (newAmountValue > maxValue) return maxValue;
    // Validation passed, return actual value
    return newAmountValue;
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7257:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "uq": () => (/* binding */ WorkerAmountChangeActionEnum),
/* harmony export */   "Wk": () => (/* binding */ WorkerLifeSwitchCommandEnum),
/* harmony export */   "Nm": () => (/* binding */ WorkerTriggerMessageCommandEnum)
/* harmony export */ });
var WorkerAmountChangeActionEnum;
(function(WorkerAmountChangeActionEnum) {
    WorkerAmountChangeActionEnum['addOne'] = 'addOne';
    WorkerAmountChangeActionEnum['removeLast'] = 'removeLast';
    WorkerAmountChangeActionEnum['setAmount'] = 'setAmount';
})(WorkerAmountChangeActionEnum || (WorkerAmountChangeActionEnum = {}));
var WorkerLifeSwitchCommandEnum;
(function(WorkerLifeSwitchCommandEnum) {
    WorkerLifeSwitchCommandEnum['install'] = 'install';
    WorkerLifeSwitchCommandEnum['uninstall'] = 'uninstall';
})(WorkerLifeSwitchCommandEnum || (WorkerLifeSwitchCommandEnum = {}));
var WorkerTriggerMessageCommandEnum;
(function(WorkerTriggerMessageCommandEnum) {
    WorkerTriggerMessageCommandEnum['activate'] = 'activate';
    WorkerTriggerMessageCommandEnum['kill'] = 'kill';
})(WorkerTriggerMessageCommandEnum || (WorkerTriggerMessageCommandEnum = {}));


/***/ }),

/***/ 3923:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ WEB_WORKER_TASKS)
/* harmony export */ });
const WEB_WORKER_TASKS = (()=>Object.freeze({
        // Core tasks
        triggerActivationMessage: 'task__trigger_activation',
        killWorker: 'task__close',
        // Other building tasks
        turnOnCalculations: 'task__calculations_on',
        turnOffCalculations: 'task__calculations_off'
    })
)();


/***/ }),

/***/ 3806:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hc": () => (/* binding */ webWorkersSlice),
/* harmony export */   "Zu": () => (/* binding */ handleWorkerAmountChange),
/* harmony export */   "HU": () => (/* binding */ handleWorkerReadyStateReport),
/* harmony export */   "jb": () => (/* binding */ handleWorkerWorkStateReport),
/* harmony export */   "f3": () => (/* binding */ handleWorkerErrorStateReport),
/* harmony export */   "Yj": () => (/* binding */ handleWorkerComplexityStateReport),
/* harmony export */   "NR": () => (/* binding */ selectRequestedWorkersAmount),
/* harmony export */   "GM": () => (/* binding */ selectWholeWorkersReadyState),
/* harmony export */   "Dj": () => (/* binding */ selectWholeWorkersWorkState),
/* harmony export */   "u7": () => (/* binding */ selectActuallyWorkingWorkersAmount),
/* harmony export */   "K1": () => (/* binding */ selectWholeWorkersComplexityState),
/* harmony export */   "g4": () => (/* binding */ selectGlobalComplexityAmount),
/* harmony export */   "Hc": () => (/* binding */ selectIsAnyWorkerWorking),
/* harmony export */   "M3": () => (/* binding */ selectIsAllOfWorkersWorking)
/* harmony export */ });
/* unused harmony exports handleGlobalComplexityChange, selectWholeWorkersErrorState, selectIsNoWorkerActive */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7257);
/* harmony import */ var _features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(309);
/* harmony import */ var _app_config_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2714);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__]);
_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const initialState = {
    requestedAmount: {
        amount: 0
    },
    actuallyWorks: {
        amount: 0
    },
    globalComplexity: {
        amount: undefined
    },
    readyStatuses: {},
    workStatuses: {},
    errorStatuses: {},
    complexityStatuses: {}
};
const webWorkersSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'calculationsWorkersSlice',
    initialState,
    reducers: {
        handleWorkerAmountChange: (state, action)=>{
            switch(action.payload.amountChangeCommand){
                case _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_1__/* .WorkerAmountChangeActionEnum.setAmount */ .uq.setAmount:
                    if (typeof action.payload.amount === 'undefined') break;
                    state.requestedAmount.amount = (0,_features_background_web_workers_webWorkers_api__WEBPACK_IMPORTED_MODULE_2__/* .getValidatedPassedAmount */ .Nx)(action.payload.amount, 0, _app_config_constants__WEBPACK_IMPORTED_MODULE_3__/* .MAX_WORKERS_LIMIT */ .Un);
                    break;
                case _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_1__/* .WorkerAmountChangeActionEnum.addOne */ .uq.addOne:
                    state.requestedAmount.amount += 1;
                    break;
                case _features_background_web_workers_webWorkers_types__WEBPACK_IMPORTED_MODULE_1__/* .WorkerAmountChangeActionEnum.removeLast */ .uq.removeLast:
                    state.requestedAmount.amount -= 1;
            }
        },
        handleWorkerReadyStateReport: (state, action)=>{
            const { workerName , ready  } = action.payload;
            const namedWorkerStatus = {
                [workerName]: {
                    ready
                }
            };
            if (state.readyStatuses[workerName]) {
                state.readyStatuses[workerName].ready = ready;
            } else {
                state.readyStatuses = {
                    ...state.readyStatuses,
                    ...namedWorkerStatus
                };
            }
        },
        handleGlobalComplexityChange: (state, action)=>{
            state.globalComplexity.amount = action.payload.amount;
        },
        handleWorkerWorkStateReport: (state, action)=>{
            const { workerName , working  } = action.payload;
            const namedWorkerStatus = {
                [workerName]: {
                    working
                }
            };
            if (state.workStatuses[workerName]) {
                state.workStatuses[workerName].working = working;
            } else {
                state.workStatuses = {
                    ...state.workStatuses,
                    ...namedWorkerStatus
                };
            }
            state.actuallyWorks = {
                amount: Object.values(state.workStatuses).filter((someWorkerWorkState)=>someWorkerWorkState.working
                ).length
            };
        },
        handleWorkerErrorStateReport: (state, action)=>{
            const { workerName , error  } = action.payload;
            const namedWorkerStatus = {
                [workerName]: {
                    error
                }
            };
            if (state.errorStatuses[workerName]) {
                state.errorStatuses[workerName].error = error;
            } else {
                state.errorStatuses = {
                    ...state.errorStatuses,
                    ...namedWorkerStatus
                };
            }
        },
        handleWorkerComplexityStateReport: (state, action)=>{
            const { workerName , complexity  } = action.payload;
            const namedWorkerStatus = {
                [workerName]: {
                    complexity
                }
            };
            if (state.complexityStatuses[workerName]) {
                state.complexityStatuses[workerName].complexity = complexity;
            } else {
                state.complexityStatuses = {
                    ...state.complexityStatuses,
                    ...namedWorkerStatus
                };
            }
        }
    }
});
const { handleWorkerAmountChange , handleWorkerReadyStateReport , handleGlobalComplexityChange , handleWorkerWorkStateReport , handleWorkerErrorStateReport , handleWorkerComplexityStateReport  } = webWorkersSlice.actions;
const selectRequestedWorkersAmount = ({ calculationsWorkersSlice  })=>calculationsWorkersSlice.requestedAmount
;
const selectWholeWorkersReadyState = ({ calculationsWorkersSlice  })=>calculationsWorkersSlice.readyStatuses
;
const selectWholeWorkersWorkState = ({ calculationsWorkersSlice  })=>calculationsWorkersSlice.workStatuses
;
const selectActuallyWorkingWorkersAmount = ({ calculationsWorkersSlice  })=>calculationsWorkersSlice.actuallyWorks
;
const selectWholeWorkersErrorState = ({ calculationsWorkersSlice  })=>calculationsWorkersSlice.errorStatuses // @TODO worker error handling
;
const selectWholeWorkersComplexityState = ({ calculationsWorkersSlice  })=>calculationsWorkersSlice.complexityStatuses
;
const selectGlobalComplexityAmount = ({ calculationsWorkersSlice  })=>calculationsWorkersSlice.globalComplexity
;
const selectIsAnyWorkerWorking = ({ calculationsWorkersSlice  })=>calculationsWorkersSlice.actuallyWorks.amount > 0
;
const selectIsAllOfWorkersWorking = ({ calculationsWorkersSlice  })=>calculationsWorkersSlice.actuallyWorks.amount === calculationsWorkersSlice.requestedAmount.amount
;
const selectIsNoWorkerActive = ({ calculationsWorkersSlice  })=>calculationsWorkersSlice.requestedAmount.amount === 0
;
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (webWorkersSlice.reducer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1014:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lh": () => (/* binding */ possibleControlPanelSwitchesNames),
/* harmony export */   "Yb": () => (/* binding */ controlPanelSlice),
/* harmony export */   "an": () => (/* binding */ selectSystemComponentsVisibilities),
/* harmony export */   "SQ": () => (/* binding */ handleControlPanelSwitchVisibility)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
    visibilitySwitches: {
        FPSMonitor: true,
        scoreboard: true,
        workControl: true
    }
};
const possibleControlPanelSwitchesNames = Object.keys(initialState.visibilitySwitches);
const controlPanelSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'controlPanelSlice',
    initialState,
    reducers: {
        handleControlPanelSwitchVisibility: (state, action)=>{
            const actionSwitchName = action.payload.name;
            const newSwitchValue = action.payload.visibilitySwitchState;
            const existingSwitchValues = state.visibilitySwitches;
            state.visibilitySwitches[actionSwitchName] = typeof newSwitchValue === 'undefined' ? !existingSwitchValues[actionSwitchName] : newSwitchValue;
        }
    }
});
// Listen to changes at the visibility of whole system components
//
const selectSystemComponentsVisibilities = (state)=>state.controlPanelSlice.visibilitySwitches
;
const { handleControlPanelSwitchVisibility  } = controlPanelSlice.actions;
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (controlPanelSlice.reducer);


/***/ })

};
;