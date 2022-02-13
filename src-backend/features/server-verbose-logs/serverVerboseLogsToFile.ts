import DailyRotateFile from 'winston-daily-rotate-file'
import * as winston from 'winston'



const transport: DailyRotateFile = new DailyRotateFile({
    dirname: './logs',
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH-mm',
    zippedArchive: false,
    frequency: '24h'
})

const logger = winston.createLogger({
    transports: [
        transport
    ]
})

export const logToFile = (communicate: string, mode: 'log' | 'warn' | 'error' = 'log') => {
    switch (mode) {
    case 'log':
        logger.verbose(communicate)
        break

    case 'warn':
        logger.warn(communicate)
        break

    case 'error':
        logger.error(communicate)
    }
}
