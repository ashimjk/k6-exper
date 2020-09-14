import {check, sleep} from 'k6';
import http from 'k6/http';

export default function () {
    console.log('__ENV', JSON.stringify(__ENV));

    let r = http.get(`http://${__ENV.MY_HOSTNAME}/`);
    check(r, {
        'status is 200': r => r.status === 200,
    });
    sleep(5);
}
