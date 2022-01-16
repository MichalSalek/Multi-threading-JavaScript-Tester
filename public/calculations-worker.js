// Settings
//
// Turn on or off console communicates given by this Worker
const IS_ENABLED_DEV_CONSOLE_LOGS = false


// Be gently with it and control CPU cores usage.
//
const CALCULATION_INTERVAL_TIMING_IN_MS = 200

//
// End of the Settings.


const getConsolePrefix = (workerFileName) => `"${workerFileName}" -> `


// Log only during development
//
const consoleLogLocal = (callback) => {
    if (IS_ENABLED_DEV_CONSOLE_LOGS && self.location.hostname === 'localhost') {
        callback()
        return true
    } else {
        return false
    }
}


// Let's do some pointless and dumb calculations for increase a CPU usage and yours energy bills
//
const isPrime = (number) => {
    for (let i = 2; i < number; i++)
        if (number % i === 0) return false
    return number > 1
}
const doCalculations = (complexity) => { // Returns number
    const returnSomeCalculations = () => Math.pow(
        (Math.fround(Math.random()) * Math.random()) * Math.random(),
        (Math.random() * Math.random()) * Math.random())
    const heavyArr = Array(complexity).fill(returnSomeCalculations()).map((el) => {
        const arr1 = Array(complexity).fill(returnSomeCalculations()).reduce((prev, current) => {
            return Math.tanh(Math.PI + prev + current) + (Math.PI + current) +
            isPrime(prev + current * Math.random()) ? prev + current * Math.random() : Math.PI
        })
        const arr2 = Array(complexity).fill(returnSomeCalculations() * returnSomeCalculations() * returnSomeCalculations())
        return [arr1, ...arr2, el]
    })
    return Array(complexity).fill(heavyArr.reduce((curr, prev) => [...curr, prev])).reduce((prev, curr) => {
        return [prev, ...curr.reduce((p, c) => p + c).split(',')].reduce((_, curr) => {
            switch (typeof curr) {
            case 'string':
                return Number(curr)
            case 'number':
                return curr
            }
        }, 0)
    })
}


const constructMessageDTO = (working = false, lastCalculations = null) =>
    ({working, lastCalculations, timestamp: Date.now()})


let intervalID = 0

const handleWorkerTask = (messageWithTask) => {
    consoleLogLocal(() => console.log(getConsolePrefix(messageWithTask.keyNames.workerName), 'New task to do: ' + messageWithTask.unknownData.workerTaskName))

    switch (messageWithTask.unknownData.workerTaskName) {
    case 'task__trigger_activation':
        self.postMessage(constructMessageDTO(false, null))
        break

    case 'task__calculations_on':
        if (intervalID) self.clearInterval(intervalID) // Safety fuse. Turn it off before starting again.

        // Immediately send a first calculation before the Interval starts
        //
        self.postMessage(constructMessageDTO(true, doCalculations(messageWithTask.unknownData.complexity)))

        intervalID = (self.setInterval(() => {
            self.postMessage(constructMessageDTO(true, doCalculations(messageWithTask.unknownData.complexity)))
        }, CALCULATION_INTERVAL_TIMING_IN_MS))
        break

    case 'task__calculations_off':
        self.clearInterval(intervalID)
        intervalID = null
        self.postMessage(constructMessageDTO(false, null))
        break

    case 'task__close':
        self.clearInterval(intervalID)
        intervalID = null
        self.close()
        break
    }
}


// Trigger listening
//
const handleMessageAndCheckIsTask = (message) => {
    if (!!message && typeof message.unknownData?.workerTaskName === 'string' && message.unknownData.workerTaskName.substring(0, 6) === 'task__') {
        handleWorkerTask(message)
    } else {
        consoleLogLocal(() => console.log(message))
        consoleLogLocal(() => console.log(getConsolePrefix(message.keyNames.workerName), '^ New message from the app to a worker above ^'))
    }
}

self.addEventListener('message', (e) => handleMessageAndCheckIsTask(e.data))
