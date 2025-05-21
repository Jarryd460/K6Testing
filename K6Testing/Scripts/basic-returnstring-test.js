import http from 'k6/http';
import { sleep, check } from 'k6';

// Created this test just so that we have different endpoints to hit and results are displayed differently in Grafana when grouping different endpoints
export default function() {
    let response = http.get('https://localhost:7140/string/returnstring?input=hello');

    console.log(response.status);

    check(response, {
        'is status 200': r => r.status == 200
    });

    sleep(1);
}