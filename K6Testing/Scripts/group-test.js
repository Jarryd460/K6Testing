import http from 'k6/http';
import { sleep, group } from 'k6';
import * as config from './config.js';

export const options = {
    vus: 5,
    iterations: 25,
    thresholds: {
        'group_duration{group:::individualRequests}': ['avg<1600'],
        'group_duration{group:::batchRequests}': ['avg<600']
    }
};

export default () => {
    const response = http.get(config.API_REVERSE_URL);

    group('individualRequests', function () {
        http.get(config.API_REVERSE_URL);
        http.get(config.API_REVERSE_URL);
        http.get(config.API_REVERSE_URL);
    });

    group('batchRequests', function () {
        http.batch([
            ['GET', config.API_REVERSE_URL],
            ['GET', config.API_REVERSE_URL],
            ['GET', config.API_REVERSE_URL]
        ]);
    });

    sleep(1);
}