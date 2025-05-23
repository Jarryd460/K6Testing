import http from 'k6/http';
import { sleep } from 'k6';
import * as config from './config.js';

// Normal to more than usual load over a long period of time
export const options = {
    stages: [
        { duration: '10m', target: 20 },
        { duration: '1h', target: 40 },
        { duration: '5m', target: 10 },
        { duration: '1m', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(95)<600']
    }
};

// Never actually ran this test because of it's duration but it should work if run
export default () => {
    http.get(config.API_REVERSE_URL);
    sleep(1);
}