export function setup() {
    return {v: 1};
}

export default function (data) {
    console.log(JSON.stringify(data));
}

export function teardown(data) {
    if (data.v !== 1) {
        throw new Error("incorrect data: " + JSON.stringify(data));
    }
}
