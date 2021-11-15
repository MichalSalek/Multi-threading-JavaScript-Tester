import {queueWorkerTask, subscribeWorkerMessages} from "@/features/service-workers/service-workers-handler";
import {useEffect, useState} from "react";

const WorkerActivation = ({version = ''}) => {

	const [SWWorks, setSWWorks] = useState(false);

	useEffect(() => {
		// @ts-ignore
		const unsubscribe = subscribeWorkerMessages(`calculationsWorker${version}`, (e) => setSWWorks(e.data))

		return () => {
			unsubscribe()
		}
	}, []);

	// TODO odbierać wynik kalkulacji z serwis-workera do apki (po subskrybcji listenera),
	//  a stamtad wysylac od razu websocketem na serwer i odpalać funkcję wpychającą je gdzieś do bazy
	// i wyświetlać z powrotem na froncie jako ilość iteracji odbytych kalkulacji
	// trzeba robić to dynamicznie poprzed stan komponentu, ale równolegle wypychać do bazy, po czym

	// simple-backend (trzyma tylko dane w zmiennej o ilości kalkulacji) komunikuje się za pomocą WS z service-workerem
	// a service-worker po skończonych obliczeniach wysyła po WS dane do backendu
	// front jest połączony z SW oraz nasłuchuje jedynie obsługę switchów - on/off
	// już nie wysyła wyników jako messages na front, bo front po WS pobiera najświeższe info z simple-backendu
	// trzeba zrobić bezpiecznik, że gdyby wyjebał się WS to ma lecieć zwykły call XHR co 1000ms

	return (
		<>
			<button onClick={() => {
				// @ts-ignore
				queueWorkerTask(`calculationsWorker${version}`, !SWWorks ? "calculations_on" : "calculations_off", this, `optional message from calculationsWorker${version} - queueWorkerTask`)()
			}}
			> Worker {version} ON/OFF SWITCH
			</button>
			<br/>
			<span>Worker {version} is: {!!SWWorks ? <strong>ON</strong> : 'OFF'}</span>
			<br/>
			<br/>

		</>
	)
}

export default WorkerActivation
