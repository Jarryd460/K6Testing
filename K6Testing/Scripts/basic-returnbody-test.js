import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';

const requestSize = new Trend('http_write_request_bytes');
const responseSize = new Trend('http_write_response_bytes');

// Created this test just so that we have different endpoints to hit and results are displayed differently in Grafana when grouping different endpoints
export default function () {
    const payload = JSON.stringify({
        content: 'Hello World! How is everyone?',
    });

    const bytesSent = getByteLength(payload);

    // Add to custom metric
    requestSize.add(bytesSent);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post('https://localhost:7140/string/returnbody', payload, params);

    const bytesReceived = getByteLength(res.body);

    // Add to custom metric
    responseSize.add(bytesReceived);

    sleep(1);
}

function getByteLength(str) {
    let s = str.length;
    for (let i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) s++;
        else if (code > 0x7ff && code <= 0xffff) s += 2;
    }
    return s;
}
