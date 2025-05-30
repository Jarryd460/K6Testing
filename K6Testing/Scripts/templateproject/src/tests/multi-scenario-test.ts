// We must export the scenarios so that they can be found when running the k6 run command
export { firstScenario } from "./../scenarios/first-scenario-test.ts";
export { secondScenario } from "./../scenarios/second-scenario-test.ts";

import { Environment } from "./../config/Environment.ts";
import { ExecutionType } from "./../config/ExecutionType.ts";
import { Options } from "./../config/Options.ts";
import { DateHelper } from "./../utils/DateHelper.ts";
import { Logger } from "./../utils/Logger.ts";

let environmentToRun = Environment.DEVELOPMENT; // default

if (__ENV.ENVIRONMENT_TO_RUN) {
	environmentToRun = Environment[__ENV.ENVIRONMENT_TO_RUN.toUpperCase()];
}

const ENVIRONMENT = environmentToRun;

let testsToRun = ExecutionType.SMOKE; // default

if (__ENV.TESTS_TO_RUN) {
	testsToRun = ExecutionType[__ENV.TESTS_TO_RUN.toUpperCase()];
}

const EXECUTIONTYPE = testsToRun;

const logger = new Logger(Date.now(), true);

export const options = Options;

export function setup() {
	logger.DebugOrLog(
		`== SETUP BEGIN ===========================================================`,
	);
	// log the date & time start of the test
	logger.DebugOrLog(`Start of test: ${DateHelper.formatDate(new Date())}`);

	// log the test type
	logger.DebugOrLog(`Test executed: ${EXECUTIONTYPE}`);

	// Log the environment
	logger.DebugOrLog(`This test will run on the ${ENVIRONMENT} environment.`);

	logger.DebugOrLog(
		`== SETUP END =============================================================`,
	);
}
