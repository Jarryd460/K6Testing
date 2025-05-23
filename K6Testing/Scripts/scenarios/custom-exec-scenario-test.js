import http from 'k6/http';

export const options = {
    scenarios: {
        // Iterates 20 times among 5 users - iterations are not guaranteed to be shared equally among vus
        method1scenario: {
            executor: 'shared-iterations', // Other options - per-vu-iterations, constant-vus, ramping-vus, constant-arrival-rate, ramping-arrival-rate
            vus: 5,
            iterations: 200,
            exec: 'method1'
        },
        method2scenario: {
            executor: 'constant-vus', // Other options - per-vu-iterations, constant-vus, ramping-vus, constant-arrival-rate, ramping-arrival-rate
            vus: 2,
            duration: '10s',
            exec: 'method2'
        }
    }
}

export function method1() {
    http.get('https://localhost:7140/string/reverse?input=hello');
}

export function method2() {
    http.get('https://localhost:7140/string/reverse?input=hello');
}