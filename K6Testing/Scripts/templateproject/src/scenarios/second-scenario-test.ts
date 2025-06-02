import http from "k6/http";
import {
	ConstantArrivalRateScenario,
	ConstantVUsScenario,
	ExternallyControlledScenario,
	PerVUIterationsScenario,
	RampingArrivalRateScenario,
	RampingVUsScenario,
	SharedIterationsScenario,
} from "k6/options";

import { ExecutionType } from "./../config/ExecutionType.js";
import { API_REVERSE_URL } from "./../utils/Config.js";
import { generalScenarioDefinitions } from "./../utils/ScenarioDefintions.js";

export const secondScenarioDefinitions: Record<
	ExecutionType,
	| ConstantArrivalRateScenario
	| ConstantVUsScenario
	| ExternallyControlledScenario
	| PerVUIterationsScenario
	| RampingArrivalRateScenario
	| RampingVUsScenario
	| SharedIterationsScenario
> = {
	[ExecutionType.LOAD]: {
		exec: "secondScenario",
		...generalScenarioDefinitions[ExecutionType.LOAD],
	},
	[ExecutionType.SMOKE]: {
		// Uses custom options instead of generalScenarioDefinitions
		exec: "secondScenario",
		executor: "shared-iterations",
		iterations: 5,
		maxDuration: "30s",
		vus: 2,
	},
	[ExecutionType.SOAK]: {
		duration: "2h",
		exec: "secondScenario",
		executor: "constant-vus",
		vus: 25,
	},
	[ExecutionType.SPIKE]: {
		duration: "1m",
		exec: "secondScenario",
		executor: "constant-arrival-rate",
		maxVUs: 400,
		preAllocatedVUs: 200,
		rate: 200,
		timeUnit: "1s",
	},
	[ExecutionType.STRESS]: {
		exec: "secondScenario",
		...generalScenarioDefinitions[ExecutionType.STRESS],
	},
};

export function secondScenario() {
	http.get(API_REVERSE_URL + "?input=hello");
}
