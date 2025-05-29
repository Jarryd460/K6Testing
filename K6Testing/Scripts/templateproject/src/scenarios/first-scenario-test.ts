import http from "k6/http";
import { ScenarioOptions } from "k6/options";
import { API_REVERSE_URL } from "./../utils/Config.js";
import { ExecutionType } from "./../config/ExecutionType.js";
import { generalScenarioDefinitions } from "./../utils/ScenarioDefintions.js";

export const firstScenarioDefinitions: Record<ExecutionType, ScenarioOptions> =
	{
		[ExecutionType.SMOKE]: {
			exec: "firstScenario",
			...generalScenarioDefinitions[ExecutionType.SMOKE],
		},
		[ExecutionType.LOAD]: {
			executor: "ramping-arrival-rate",
			exec: "firstScenario",
			startRate: 10,
			stages: [
				{ target: 50, duration: "5m" },
				{ target: 50, duration: "10m" },
			],
			preAllocatedVUs: 20,
			maxVUs: 100,
		},
		[ExecutionType.STRESS]: {
			executor: "ramping-vus",
			exec: "firstScenario",
			startVUs: 10,
			stages: [
				{ target: 100, duration: "3m" },
				{ target: 0, duration: "2m" },
			],
		},
		[ExecutionType.SPIKE]: {
			exec: "firstScenario",
			...generalScenarioDefinitions[ExecutionType.SPIKE],
		},
		[ExecutionType.SOAK]: {
			exec: "firstScenario",
			...generalScenarioDefinitions[ExecutionType.SOAK],
		},
	};

export function firstScenario() {
	http.get(API_REVERSE_URL + "?input=hello");
}
