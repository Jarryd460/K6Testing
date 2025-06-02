import { firstScenarioDefinitions } from "./../scenarios/first-scenario-test.js";
import { secondScenarioDefinitions } from "./../scenarios/second-scenario-test.js";
import { ExecutionType } from "./ExecutionType.js";

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

export const Options = {
	scenarios: {
		firstScenario: firstScenarioDefinitions[EXECUTIONTYPE],
		secondScenario: secondScenarioDefinitions[EXECUTIONTYPE],
	},
};
