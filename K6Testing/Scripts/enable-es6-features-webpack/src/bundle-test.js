import http from 'k6/http';
import { sleep } from 'k6';
import { SomeService } from './some.service.js';

export default function() {
    http.get('https://localhost:7140/string/reverse?input=hello');
    let someService = new SomeService();
    sleep(1);
}