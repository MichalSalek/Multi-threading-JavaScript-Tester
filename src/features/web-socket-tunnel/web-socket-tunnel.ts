import { io } from "socket.io-client";
import {runInDevEnvOnly} from "@/core/global-utils";


export const socket = io();

socket.on("connect", () => {
	runInDevEnvOnly(() => {
		console.log("WS client connected.")
		console.log(socket.id)
		console.log(socket.connected)
	})
});


socket.on("disconnect", () => {
	// Here SWs can stop works and wait for a new connection
	// or pre-buffer data in browser storage or just strait to a variable
	// and send bundle after re-connect.
});
