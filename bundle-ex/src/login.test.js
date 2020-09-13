import {SomeService} from './some.service.js';

const svc = new SomeService();

export default function () {
    let data = svc.getData();
    console.log(data);
};
