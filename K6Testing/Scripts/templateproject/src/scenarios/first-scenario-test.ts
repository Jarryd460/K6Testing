import http from "k6/http";
import { ScenarioOptions } from "k6/options";

import { ExecutionType } from "./../config/ExecutionType.ts";
import { API_REVERSE_URL } from "./../utils/Config.ts";
import { generalScenarioDefinitions } from "./../utils/ScenarioDefintions.ts";

export const firstScenarioDefinitions: Record<ExecutionType, ScenarioOptions> =
	{
		[ExecutionType.LOAD]: {
			exec: "firstScenario",
			executor: "ramping-arrival-rate",
			maxVUs: 100,
			preAllocatedVUs: 20,
			stages: [
				{ duration: "5m", target: 50 },
				{ duration: "10m", target: 50 },
			],
			startRate: 10,
		},
		[ExecutionType.SMOKE]: {
			exec: "firstScenario",
			...generalScenarioDefinitions[ExecutionType.SMOKE],
		},
		[ExecutionType.SOAK]: {
			exec: "firstScenario",
			...generalScenarioDefinitions[ExecutionType.SOAK],
		},
		[ExecutionType.SPIKE]: {
			exec: "firstScenario",
			...generalScenarioDefinitions[ExecutionType.SPIKE],
		},
		[ExecutionType.STRESS]: {
			exec: "firstScenario",
			executor: "ramping-vus",
			stages: [
				{ duration: "3m", target: 100 },
				{ duration: "2m", target: 0 },
			],
			startVUs: 10,
		},
	};

export function firstScenario() {
	http.get(API_REVERSE_URL + "?input=hello");
}
