﻿import http from 'k6/http';
import { sleep } from 'k6';
import * as config from './config.js';

// Normal load with slight increase in traffic
export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '30s', target: 5 },
        { duration: '5s', target: 20 },
        { duration: '30s', target: 20 },
        { duration: '5s', target: 5 },
        { duration: '30s', target: 5 },
        { duration: '5s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(95)<600']
    }
};

export default () => {
    http.get(config.API_REVERSE_URL);
    sleep(1);
}