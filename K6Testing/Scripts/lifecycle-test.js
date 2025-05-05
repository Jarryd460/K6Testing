// 1. init code
// All code that is outside of a lifecycle function is code in the init context
import http from 'k6/http';
import { Trend } from 'k6/metrics';

console.log('Init code');

export const options = {
    vus: 1,
    iterations: 5
}

export function setup() {
    // 2. setup code
    console.log('Setup code');
    return { v: 1 };
}

export default function (data) {
    // 3. VU code
    console.log('VU code: ' + data.v);
}

export function teardown(data) {
    // 4. teardown code
    // This function is not called if setup throws an exception. Handle errors in setup in order for teardown to be called
    console.log('Teardown code: ' + data.v);
}

export function handleSummary(data) {
    // 5. handleSummary code
    // This function is called after the test has finished and is used to generate a summary report
    console.log('Summary code');
    console.log(data);
}