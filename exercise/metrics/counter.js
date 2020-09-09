import {Counter} from 'k6/metrics';

let myCounter = new Counter('my_counter');

export default function () {
    myCounter.add(1);
    myCounter.add(2);
};
