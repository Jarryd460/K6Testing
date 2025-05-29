import { ExecutionType } from "./ExecutionType.ts";
import { firstScenarioDefinitions } from "./../scenarios/first-scenario-test.js";
import { secondScenarioDefinitions } from "./../scenarios/second-scenario-test.js";

let testsToRun = ExecutionType.SMOKE; // default
if (__ENV.TESTS_TO_RUN) {
	testsToRun = ExecutionType[__ENV.TESTS_TO_RUN.toUpperCase()];
}

const EXECUTIONTYPE = testsToRun;

export const Options = {
	scenarios: {
		firstScenario: firstScenarioDefinitions[EXECUTIONTYPE],
		secondScenario: secondScenarioDefinitions[EXECUTIONTYPE],
	},
};
