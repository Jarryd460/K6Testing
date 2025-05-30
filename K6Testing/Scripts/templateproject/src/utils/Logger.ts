export class Logger {
	debug: boolean;
	start: number;

	constructor(testStartTime: number, DebugMode: boolean) {
		this.start = testStartTime;
		this.debug = DebugMode;
	}

	DebugOrLog(textToLog) {
		if (this.debug) {
			const millis = Date.now() - this.start; // we get the ms ellapsed from the start of the test
			const time = Math.floor(millis / 1000); // in seconds
			// console.log(`${time}se: ${textToLog}`); // se = Seconds elapsed
			console.log(`${textToLog}`);
		}
	}
}
