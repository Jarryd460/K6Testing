import http from "k6/http";
import { ScenarioOptions } from "k6/options";
import { API_REVERSE_URL } from "./../common/Config.ts";
import { ExecutionType } from "./../common/ExecutionType.ts";
import { generalScenarioDefinitions } from "./../common/ScenarioDefintions.ts";

export const secondScenarioDefinitions: Record<ExecutionType, ScenarioOptions> =
	{
		[ExecutionType.SMOKE]: {
			// Uses custom options instead of generalScenarioDefinitions
			executor: "shared-iterations",
			exec: "secondScenario",
			vus: 2,
			iterations: 5,
			maxDuration: "30s",
		},
		[ExecutionType.LOAD]: {
			exec: "secondScenario",
			...generalScenarioDefinitions[ExecutionType.LOAD],
		},
		[ExecutionType.STRESS]: {
			exec: "secondScenario",
			...generalScenarioDefinitions[ExecutionType.STRESS],
		},
		[ExecutionType.SPIKE]: {
			executor: "constant-arrival-rate",
			exec: "secondScenario",
			rate: 200,
			timeUnit: "1s",
			duration: "1m",
			preAllocatedVUs: 200,
			maxVUs: 400,
		},
		[ExecutionType.SOAK]: {
			executor: "constant-vus",
			exec: "secondScenario",
			vus: 25,
			duration: "2h",
		},
	};

export function secondScenario() {
	http.get(API_REVERSE_URL + "?input=hello");
}
