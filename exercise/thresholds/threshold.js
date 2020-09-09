import http from "k6/http";
import {Rate} from "k6/metrics";

const myFailRate = new Rate('failed requests');

export let options = {
    thresholds: {
        'failed request': ['rate<0.1'], // fail if 10% or more of requests return other than 200 response status
        'http_req_duration': ['p(95)<500'] // 95% of requests must complete within 500ms.
    }
}

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/1');
    myFailRate.add(res.status !== 200);
};
