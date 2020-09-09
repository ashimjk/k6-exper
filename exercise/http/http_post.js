import http from 'k6/http';

export default function () {
    let url = 'http://test.k6.io/login';
    let payload = JSON.stringify({
        email: 'aaa',
        password: 'bbb'
    });

    let params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    http.post(url, payload, params);

};
