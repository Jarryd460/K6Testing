export class Logger {
	start: number;
	debug: boolean;

	constructor(testStartTime: number, DebugMode: boolean) {
		this.start = testStartTime;
		this.debug = DebugMode;
	}

	DebugOrLog(textToLog) {
		if (this.debug) {
			var millis = Date.now() - this.start; // we get the ms ellapsed from the start of the test
			var time = Math.floor(millis / 1000); // in seconds
			// console.log(`${time}se: ${textToLog}`); // se = Seconds elapsed
			console.log(`${textToLog}`);
		}
	}
}
