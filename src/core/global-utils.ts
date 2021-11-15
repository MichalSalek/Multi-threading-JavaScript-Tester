//
//
// Here you can add a global and generic utilities
//
// Remember about make a functions fully declarative in a use
// with a single responsibility
//
//
import {IS_ENABLED_DEV_CONSOLE_LOGS} from "@/core/consts-and-routes";


export const runInDevEnvOnly = (developmentEnvCallback: Function) => (IS_ENABLED_DEV_CONSOLE_LOGS && process.env.NODE_ENV === "development" ? developmentEnvCallback() : ((): void => {}))

export const fireJustClientSide = (callback: Function) => {
	if (!(typeof window === "undefined")) {
		return callback()
	} else {
		runInDevEnvOnly(() => console.error("* Window object is undefined, maybe it's Server Side *"))
	}
}
