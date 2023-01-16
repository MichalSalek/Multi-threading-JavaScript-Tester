import DailyRotateFile from 'winston-daily-rotate-file'
import * as winston from 'winston'



const verboseModeDefaultValue = true

export const SERVER_VERBOSE_MODE = {isEnabled: verboseModeDefaultValue}

const transport: DailyRotateFile = new DailyRotateFile({
    dirname: './logs',
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH-mm',
    zippedArchive: false,
    frequency: '24h'
})

export const logger = winston.createLogger({
    transports: [
        transport
    ]
})
