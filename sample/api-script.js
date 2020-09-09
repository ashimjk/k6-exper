import {check, sleep} from "k6";
import http from "k6/http";

import jsonpath from "https://jslib.k6.io/jsonpath/1.0.2/index.js";

export const options = {
    stages: [
        {duration: "1m", target: 20},
        {duration: "3m", target: 20},
        {duration: "1m", target: 0},
    ],
    ext: {
        loadimpact: {
            distribution: {
                "amazon:us:ashburn": {loadZone: "amazon:us:ashburn", percent: 100},
            },
        },
    },
};

export default function main() {
    let response;

    const vars = {};

    // Authenticate
    response = http.post(
        "https://test-api.k6.io/auth/token/login",
        '{\n  "username": "test",\n  "password": "supersecure123!"\n}\n',
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );
    check(response, {
        "status equals 200": response => response.status.toString() === "200",
        "$.token exists": response => {
            return !!jsonpath.query(response.json(), "$.token").length;
        },
    });
    vars["userToken"] = jsonpath.query(response.json(), "$.token")[0];

    // Create a crocodile
    response = http.post(
        "https://test-api.k6.io/my/crocodiles",
        '{"name":"Bert"}',
        {
            headers: {
                Authorization: `${vars["userToken"]}`,
                "Content-Type": "application/json",
            },
        }
    );
    check(response, {
        "status equals 201": response => response.status.toString() === "201",
    });
    vars["crocodileID"] = jsonpath.query(response.json(), "$.id")[0];

    // Update crocodile
    response = http.patch(
        `https://test-api.k6.io/my/crocodiles/${vars["crocodileID"]}`,
        '{"email":"bert@loadimpact","lastName":"Bertson","phoneNumber":"+4612345654321"}',
        {
            headers: {
                Authorization: `${vars["userToken"]}`,
                "Content-Type": "application/json",
            },
        }
    );

    // Get the crocodile
    response = http.get(
        `https://test-api.k6.io/my/crocodiles/${vars["crocodileID"]}`,
        {
            headers: {
                Authorization: `${vars["userToken"]}`,
            },
        }
    );
    check(response, {
        "$.email ends with @loadimpact.com": response => {
            const values = jsonpath.query(response.json(), "$.email");
            return !!values.find(value => value.endsWith("@loadimpact.com"));
        },
        "$.lastName equals Bertson": response => {
            const values = jsonpath.query(response.json(), "$.lastName");
            return !!values.find(value => value === "Bertson");
        },
        "$.phoneNumber starts with +46": response => {
            const values = jsonpath.query(response.json(), "$.phoneNumber");
            return !!values.find(value => value.startsWith("+46"));
        },
    });

    // Delete crocodile
    response = http.del(
        `https://test-api.k6.io/my/crocodiles/${vars["crocodileID"]}`,
        null,
        {
            headers: {
                Authorization: `${vars["userToken"]}`,
            },
        }
    );
    check(response, {
        "status equals 204": response => response.status.toString() === "204",
    });

    // Automatically added sleep
    sleep(1);
}
