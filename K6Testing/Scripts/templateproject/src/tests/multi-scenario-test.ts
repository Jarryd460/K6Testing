// We must export the scenarios so that they can be found when running the k6 run command
export { firstScenario } from "./../scenarios/first-scenario-test.js";
export { secondScenario } from "./../scenarios/second-scenario-test.js";

import { Environment } from "./../config/Environment.js";
import { ExecutionType } from "./../config/ExecutionType.js";
import { Options } from "./../config/Options.js";
import { formatDate } from "./../utils/DateHelper.js";
import { Logger } from "./../utils/Logger.js";

let environmentToRun = Environment.DEVELOPMENT; // default

if (__ENV.ENVIRONMENT_TO_RUN) {
	switch (__ENV.ENVIRONMENT_TO_RUN.toUpperCase()) {
		case "DEVELOPMENT":
			environmentToRun = Environment.DEVELOPMENT;
			break;
		case "LOCAL":
			environmentToRun = Environment.LOCAL;
			break;
		case "PRODUCTION":
			environmentToRun = Environment.PRODUCTION;
			break;
		case "STAGING":
			environmentToRun = Environment.STAGING;
			break;
		default:
			throw Error(`${__ENV.ENVIRONMENT_TO_RUN} environment not supported`);
	}
}

const ENVIRONMENT = environmentToRun;

let testsToRun = ExecutionType.SMOKE; // default

if (__ENV.TESTS_TO_RUN) {
	switch (__ENV.TESTS_TO_RUN.toUpperCase()) {
		case "LOAD":
			testsToRun = ExecutionType.LOAD;
			break;
		case "SMOKE":
			testsToRun = ExecutionType.SMOKE;
			break;
		case "SOAK":
			testsToRun = ExecutionType.SOAK;
			break;
		case "SPIKE":
			testsToRun = ExecutionType.SPIKE;
			break;
		case "STRESS":
			testsToRun = ExecutionType.STRESS;
			break;
		default:
			throw Error(`${__ENV.TESTS_TO_RUN} execution type not supported`);
	}
}

const EXECUTIONTYPE = testsToRun;

const logger = new Logger(Date.now(), true);

export const options = Options;

export function setup() {
	logger.DebugOrLog(
		`== SETUP BEGIN ===========================================================`,
	);
	// log the date & time start of the test
	logger.DebugOrLog(`Start of test: ${formatDate(new Date())}`);

	// log the test type
	logger.DebugOrLog(`Test executed: ${EXECUTIONTYPE}`);

	// Log the environment
	logger.DebugOrLog(`This test will run on the ${ENVIRONMENT} environment.`);

	logger.DebugOrLog(
		`== SETUP END =============================================================`,
	);
}
