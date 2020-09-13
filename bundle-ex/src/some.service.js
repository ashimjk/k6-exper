import * as http from "k6/http";

export class SomeService {
    getData() {
        return http.get("https://loadimpact.com/");
    }
}
