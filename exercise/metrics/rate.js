import {Rate} from 'k6/metrics';

let myRate = new Rate('my_rate');

export default function () {
    myRate.add(true);
    myRate.add(false);
    myRate.add(1);
    myRate.add(0);
    myRate.add(5);
    myRate.add(0);
    myRate.add(0);
}
