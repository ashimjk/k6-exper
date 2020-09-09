import {check} from 'k6';
import http from 'k6/http';

export default function () {
    let res = http.get('http://test.k6.io/');
    let result = check(res, {
        'is status 200': (r) => r.status === 200,
        'body size is 10828 bytes': (r) => r.body.length == 10828,
    });
}
