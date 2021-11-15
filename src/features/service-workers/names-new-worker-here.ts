//
// To add new Service Worker:
//
// 1. Add 'shortHand' key name and 'file-public-name.js' of worker here.
// Remember to keep indexes well
export const workersKeysNames = ['correctnessWorker',                       'calculationsWorker',       'calculationsWorker2', 'calculationsWorker3', 'calculationsWorker4'] as const;
export const workersFileNames = ['correctness-of-serviceability-worker.js', 'calculations-worker.js',   'calculations-worker-2.js', 'calculations-worker-3.js', 'calculations-worker-4.js'] as const;

// 2. Copy the key here to say to the Typescript about a new property:
declare global {
	interface Window {
		correctnessWorker: Worker | undefined;
		calculationsWorker: Worker | undefined;
	}
}

// that's all.
