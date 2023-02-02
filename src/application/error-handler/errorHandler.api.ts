import {passDataToTrackerToolConfig} from '@/application/error-handler/errorHandler.config'


export const sendErrorToTrackerTool = (errorMessage: string | Error): void => {

    passDataToTrackerToolConfig(['[MOCK] maybe some prefix...', errorMessage])
}

