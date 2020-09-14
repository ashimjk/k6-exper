import http from 'k6/http';
import {sleep} from 'k6';

export default function () {
    const email = `user+${__VU}@mail.com`;
    const payload = JSON.stringify({email: email, password: 'test'});
    const params = {headers: {'Content-Type': 'application/json'}};
    http.post('http://test.k6.io/login', payload, params);
    console.log(email);
    // .. continue the user flow

    sleep(1);
}
