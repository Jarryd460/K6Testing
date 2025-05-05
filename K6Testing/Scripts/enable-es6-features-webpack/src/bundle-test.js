import http from 'k6/http';
import { sleep, check } from 'k6';
import { SomeService } from './some.service.js';

export default function () {
    // Set global cookies for a particular url
    const jar = http.cookieJar();
    jar.set('https://localhost:7140/string/reverse', 'my_cookie', 'hello world');

    // Override cookie jar my_cookie and add custom cookie (once_off_cookie) for single request
    const cookies = {
        my_cookie: {
            value: 'hello world 2',
            replace: true
        },
        once_off_cookie: {
            value: 'once off cookie',
            replace: false
        }
    };

    const res = http.get('https://localhost:7140/string/reverse?input=hello', {
        // Sets cookies for a single request
        cookies
    });

    let someService = new SomeService();

    // Get cookies from jar for particular url
    const cookiesJar = jar.cookiesForURL('https://localhost:7140/string/reverse');

    // Validate jar cookies
    check(cookiesJar, {
        "has cookie 'my_cookie'": (cookiesJar) => cookiesJar.my_cookie.length > 0,
        'my_cookie has correct value': (cookiesJar) => cookiesJar.my_cookie[0] === 'hello world'
    });

    // Validate response cookies
    check(res, {
        "has cookie 'my_cookie'": (r) => r.cookies.my_cookie.length > 0,
        'my_cookie has correct value': (r) => r.cookies.my_cookie[0].value === 'hello%20world%202',
        "has cookie 'once_off_cookie'": (r) => r.cookies.once_off_cookie.length > 0,
        'once_off_cookie has correct value': (r) => r.cookies.once_off_cookie[0].value === 'once%20off%20cookie',
    });

    sleep(1);
}