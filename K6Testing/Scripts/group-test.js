import http from 'k6/http';
import { sleep, group, check } from 'k6';
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
    group('individualRequests', function () {
        http.get(config.API_REVERSE_URL);
        let response1 = http.get(config.API_RETURNSTRING_URL);
        let response2 = http.get(config.API_REVERSE_URL);

        check(response1, {
            'is status 300': r => r.status == 300
        });

        check(response2, {
            'is status 200': r => r.status == 200
        });
    });

    group('batchRequests', function () {
        let responses = http.batch([
            ['GET', config.API_REVERSE_URL],
            ['GET', config.API_RETURNSTRING_URL],
            ['GET', config.API_REVERSE_URL]
        ]);

        check(responses[0], {
            'is status 300': r => r.status == 300
        });

        check(responses[1], {
            'is status 200': r => r.status == 200
        });
    });

    sleep(1);
}