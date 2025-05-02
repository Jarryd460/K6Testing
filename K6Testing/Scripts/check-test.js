import http from 'k6/http';
import { sleep, check } from 'k6';
import * as config from './config.js';

export const options = {
    vus: 5,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<600'],
        checks: ['rate>0.75']
    }
};

export default () => {
    const response = http.get(config.API_REVERSE_URL);

    // This does not fail a test but only collects data on the success/fail rate of the check
    // If you want to fail the test, you need to add a threshold above
    check(response, {
        'is status 200': r => r.status = 200
    });

    check(response, {
        'body not empty': r => r.timings.waiting > 508
    });

    sleep(1);
}