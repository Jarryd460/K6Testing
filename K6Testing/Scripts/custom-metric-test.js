import http from 'k6/http';
import { Trend, Counter, Gauge, Rate } from 'k6/metrics';

// Calculates the average of the added values
const myTrend = new Trend('waiting_time');
// Keeps a sum of all values added
const myCounter = new Counter('my_counter');
// Keeps the max value
const myGauge = new Gauge('my_gauge');
const myRate = new Rate('my_rate');

export const options = {
    vus: 5,
    duration: '15s',

    thresholds: {
        http_req_duration: ['p(95)<1000'],
        // MyCounter const declared above must be more than 100
        my_counter: ['count>100'],
        // Submetric of MyCounter
        'my_counter{submetric:customMetricSubmetic}': [
            'count>50'
        ],
        my_gauge: ['value>1'],
        // Indicates percentage of values that meet the check pasted into the .add() method
        // Rate is between 0 and 1
        my_rate: [
            { threshold: 'rate >= 0.47', abortOnFail: true, delayAbortEval: '1m' }
        ]
    },
};

let maxValue = 0;

export default function() {
    const r = http.get('https://localhost:7140/string/reverse?input=hello');
    myTrend.add(r.timings.waiting);    

    if (r.timings.waiting > 508) {
        myCounter.add(1, { submetric: 'customMetricSubmetic' });
    } else {
        myCounter.add(1);
    }

    maxValue += 1;

    myGauge.add(maxValue, { myTag: '1' });

    myRate.add(maxValue % 2 == 0);

    console.log(myTrend.name);
}