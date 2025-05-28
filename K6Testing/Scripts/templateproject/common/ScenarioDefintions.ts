import { ScenarioOptions } from 'k6/options';
import { ExecutionType } from "./ExecutionType.ts";

// Left out exec property as it will be set in the individual scenario definitions
export const generalScenarioDefinitions: Record<ExecutionType, ScenarioOptions> = {
    [ExecutionType.SMOKE]: {
        executor: 'constant-vus',
        vus: 3,
        duration: '1m',
    },
    [ExecutionType.LOAD]: {
        executor: 'ramping-vus',
        startVUs: 10,
        stages: [
            { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
            { duration: '30m', target: 100 }, // stay at 100 users for 30 minutes
            { duration: '5m', target: 0 }, // ramp-down to 0 users
        ],
    },
    [ExecutionType.STRESS]: {
        executor: 'ramping-vus',
        startVUs: 10,
        stages: [
            { duration: '10m', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
            { duration: '30m', target: 200 }, // stay at higher 200 users for 30 minutes
            { duration: '5m', target: 0 }, // ramp-down to 0 users
        ],
    },
    [ExecutionType.SPIKE]: {
        executor: 'ramping-vus',
        startVUs: 10,
        stages: [
            { duration: '2m', target: 2000 }, // fast ramp-up to a high point
            // No plateau
            { duration: '1m', target: 0 }, // quick ramp-down to 0 users
        ],
    },
    [ExecutionType.SOAK]: {
        executor: 'ramping-vus',
        startVUs: 10,
        stages: [
            { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
            { duration: '8h', target: 100 }, // stay at 100 users for 8 hours!!!
            { duration: '5m', target: 0 }, // ramp-down to 0 users
        ],
    },
};
