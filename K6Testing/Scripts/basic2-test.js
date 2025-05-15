import http from 'k6/http';
import { sleep } from 'k6';

// Created this test just so that we have different endpoints to hit and results are displayed differently in Grafana when grouping different endpoints
export default function() {
    http.get('https://localhost:7140/string/returnstring?input=hello');
    sleep(1);
}