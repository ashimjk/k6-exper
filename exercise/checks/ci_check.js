import {Rate} from "k6/metrics";
import http from "k6/http";
import {check} from "k6";

export let errorRate = new Rate('errors');
export let options = {
    thresholds: {
        errors: ['rate<0.1'] // <10% errors
    }
}

export default function () {
    let res = http.get('http://httpbina.org');
    let result = check(res, {
        'status is 200': r => r.status === 200
    });

    errorRate.add(!result);
};
