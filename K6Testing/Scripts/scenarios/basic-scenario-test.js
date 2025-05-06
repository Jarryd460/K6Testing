import http from 'k6/http';
import { sleep } from 'k6';
import { getCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';

export const options = {
    thresholds: {        
        'http_req_duration{scenario:fourthscenario}': ['p(99)<600'],
        'dropped_iterations{scenario:fifthscenario}': ['count<1'],
    },
    discardResponseBodies: true,
    scenarios: {
        // Iterates 20 times among 5 users - iterations are not guaranteed to be shared equally among vus
        firstscenario: {
            executor: 'shared-iterations', // Other options - per-vu-iterations, constant-vus, ramping-vus, constant-arrival-rate, ramping-arrival-rate
            vus: 5,
            iterations: 20,
            startTime: '5s', // Delays start of scenario for 5 seconds
        },
        // Iterates 10 times per a user (2 users) - iterations shared equally
        secondscenario: {
            executor: 'per-vu-iterations',
            vus: 2,
            iterations: 10,
            tags: { my_custom_tag: 'secondscenario' },
        },
        // Iterates as much as possible in 5s among 3 users, allowing for users 3 seconds max to finish iteration once 5 seconds duration has elapsed
        thirdscenario: {
            executor: 'constant-vus',
            vus: 3,
            duration: '5s',
            gracefulStop: '3s', // Default is 30s but demoing graceful stop allowing 3 seconds for vu to finish which should be enough
            env: { MYVAR: 'thirdscenario' },
        },
        // Iterates as much as possible, starting with 0 users and increasing/decreasing users at various stages
        fourthscenario: {
            executor: 'ramping-vus',
            startvus: 0,
            stages: [
                { duration: '5s', target: 5 },
                { duration: '5s', target: 0}
            ],            
            gracefulRampDown: '1s' // Demonstrate vu getting interrupted and not being able to finish iteration
        },
        // Iterates 10 times every 4 seconds (iteration every 0.4 seconds) for 10 seconds with 5 users picking up those iterations to match the rate. 
        // If there are not enough pre allocated users then the rate won't be achieved and a message will be logged to the console. Depending on what logic is executed in each iteration, 
        // the amount of pre allocated users needs to be adjusted to achieve the specified rate
        fifthscenario: {
            executor: 'constant-arrival-rate',
            preAllocatedVUs: 5,
            //maxVUs: 10, // Allow increase of users up to 10 from initial 5. This does not prevent iterations from still being dropped as more users are added but does generally reduce the dropped iterations
            rate: 10,
            timeUnit: '4s', // Change to 2s to cross iterations dropped threshold defined at the top
            duration: '10s'
        },
        sixthscenario: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 5,
            startRate: 10,
            timeUnit: '4s',
            stages: [
                { duration: '10s', target: 20 },
                { duration: '10s', target: 10 }
            ],
            maxVUs: 10
        }
    }
}

// Non functioning example of how via environment variables we can run only specified scenarios
//const { SCENARIO } = __ENV;
//export const options = {
//    // if a scenario is passed via a CLI env variable, then run that scenario. Otherwise, run
//    // using the pre-configured scenarios above.
//    scenarios: SCENARIO ? { [SCENARIO]: scenarios[SCENARIO] } : scenarios,
//}

export default function () {
    //if (getCurrentStageIndex() === 0) {
    //    console.log('Running the first stage where the expected target is 20');
    //}

    http.get('https://localhost:7140/string/reverse?input=hello');
    sleep(1);
}