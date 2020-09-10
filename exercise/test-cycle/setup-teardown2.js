import * as http from "k6/http";

export function setup() {
    let res = http.get("https://httpbin.org/get");
    return {data: res.json()};
}

export function teardown(data) {
    console.log(JSON.stringify(http.get("https://httpbin.org/get").json()));
}

export default function (data) {
    console.log(JSON.stringify(data));
}
