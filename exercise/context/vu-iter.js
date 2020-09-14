import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
    http.get('http://test.k6.io');
    console.log(`VU: ${__VU}  -  ITER: ${__ITER}`);
    sleep(1);
}
