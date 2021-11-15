const IS_ENABLED_DEV_CONSOLE_LOGS = false

const consoleLogLocal = (callback) => (IS_ENABLED_DEV_CONSOLE_LOGS && self.location.hostname === 'localhost' ? callback() : null)

const CONSOLE_LOG_PREFIX = '"/calculations-worker.js-4" -> '

let intervalID = 0
const intervalTiming = 3
const complexity = 1000

const isPrime = (nbr) => {
    for (let i = 2; i < nbr; i++)
        if (nbr % i === 0) return false;
    return nbr > 1;
}

const doCalculations = () => {

    const returnSomeCalculations = () => Math.pow(
        (Math.fround(Math.random()) * Math.random()) * Math.random(),
        (Math.random() * Math.random()) * Math.random())

    const heavyArr = Array(complexity).fill(returnSomeCalculations()).map((el) => {
        const arr1 = Array(complexity).fill(returnSomeCalculations()).reduce((prev, current) => {
            isPrime(prev + current * Math.random())
            return Math.tanh(Math.PI + prev + current) + (Math.PI + current)
        })

        const arr2 = Array(complexity).fill(returnSomeCalculations() * returnSomeCalculations() * returnSomeCalculations())

        return [arr1, ...arr2, el]
    })


    return Array(complexity).fill(heavyArr.reduce((curr, prev) => Math.tanh(curr) * prev))
}

const handleWorkerTask = (taskMessage) => {
    switch (taskMessage) {
        case 'task__calculations_on':
            intervalID = (self.setInterval(() => {
                const calculations = doCalculations();
                consoleLogLocal(() => console.log(CONSOLE_LOG_PREFIX, calculations))
            }, intervalTiming))
            self.postMessage(true);
            break
        case 'task__calculations_off':
            self.clearInterval(intervalID)
            intervalID = null;
            self.postMessage(false);
            break
        case 'task__close_trigger':
            self.close();
            break
    }
}

const onMessage = (message) => {
    consoleLogLocal(() => console.log(CONSOLE_LOG_PREFIX, message))
    if (typeof message === 'string' && message.substring(0, 6) === 'task__') {
        handleWorkerTask(message)
    } else {
        consoleLogLocal(() => console.log(CONSOLE_LOG_PREFIX, `Message is not a task: ${message}`))
    }
}

// Listeners
self.addEventListener("install", () => consoleLogLocal(() => console.log(CONSOLE_LOG_PREFIX, 'installed.')));
self.addEventListener('message', (e) => onMessage(e.data))
