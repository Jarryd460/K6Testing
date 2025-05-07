import http from 'k6/http';
import { sleep } from 'k6';
import { Options } from 'k6/options/index.js';
import { SomeService } from './some.service';
import * as config from './config';

export const options: Options = {
    vus: 1,
    duration: '5s'
};

export default () => {
    let response = http.get(config.API_REVERSE_URL);

    console.log(response);

    let service = new SomeService();

    console.log(service);

    sleep(1);
}