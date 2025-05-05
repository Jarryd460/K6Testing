import http from 'k6/http';
import { sleep } from 'k6';
import exec from 'k6/execution';

// Load the test configuration from a JSON file
// Hosts key - Overrides the DNS resolution for specific hosts. For example, when calling test.k6.io, the url will go to 1.2.3.4
// userAgent key - Overrides the default k6 user agent that is set
// noConnectionReuse key - Specifies whether K6 should disable keep alive connections
// discardResponseBodies key - Discard http responses when not needed (recommended). Reduces memory usage and provides more accurate results. 
// You can still return values for http requests that require it
const testConfig = JSON.parse(open('./config-test.json'));

export const options = testConfig;

export default function() {
    http.get('https://localhost:7140/string/reverse?input=hello');
    console.log(exec.test.options.scenarios.default.vus);
    sleep(1);
}

