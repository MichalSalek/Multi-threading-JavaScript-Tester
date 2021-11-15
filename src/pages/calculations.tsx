import {NextPage} from "next";
import WorkerActivation from "@/features/service-workers/WorkerActivation";
import {useEffect, useState} from "react";


const doCalculations = (complexity) => {
	const isPrime = (nbr) => {
		for (let i = 2; i < nbr; i++)
			if (nbr % i === 0) return false;
		return nbr > 1;
	}

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

	return Array(complexity).fill(heavyArr.reduce((curr, prev) => [...curr ,...prev]))
}

const CalculationsPage: NextPage = () => {

	const [intervalID, setIntervalID] = useState(0);
	const [isOn, setIsOn] = useState(false);
	const handleClick = () => setIsOn((prev) => !prev)
	useEffect(() => {
		if (!!isOn) {
			setIntervalID(window.setInterval(() => {
				doCalculations(300);
			}, 10))
		} else {
			window.clearInterval(intervalID)
			setIntervalID(0);
			}
		return () => {

		};
	}, [isOn]);


	return (
		<>
			<button onClick={handleClick}
			> Main thread ON/OFF SWITCH
			</button>
			<br/>
			<span>Main thread job is: {!!isOn ? <strong>ON</strong> : 'OFF'}</span>
			<br/>
			<br/>


			{['', '2', '3', '4'].map(e => <WorkerActivation version={e} key={e}/>)}
		</>
	)
}

export default CalculationsPage

/// tutaj można dopisać kodzik po stronie serwera,
// który użyje systemu plików by sprawdzić ile jest service workerów
// a następnie prześle to info propsami do rodzica ^ i na podstawie tej liczby
// stworzę tablicę zamiast hardcodu ['', '2', '3', '4']
