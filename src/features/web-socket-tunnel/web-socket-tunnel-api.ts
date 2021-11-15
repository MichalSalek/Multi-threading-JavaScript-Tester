import {receiveAllWorkersMessages} from "@/features/service-workers/service-workers-handler";
import {socket} from "@/features/web-socket-tunnel/web-socket-tunnel";
import {WEB_SOCKET_EVENTS} from '@/global-contansts'


receiveAllWorkersMessages((data = null) => {

	const name = data?.name
	const calculationsAmount = data?.calculationsAmount

	if (!!name && !!calculationsAmount) {
		socket.emit(WEB_SOCKET_EVENTS.newCalculations, {name, calculationsAmount});
	}

})