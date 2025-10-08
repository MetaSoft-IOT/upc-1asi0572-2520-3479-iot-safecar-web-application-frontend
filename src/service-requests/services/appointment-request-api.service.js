import axios from "axios";

const http = axios.create({baseURL: "https://my-json-server.typicode.com/MetaSoft-IOT/appointments-fake-api"});

export class AppointmentRequestApiService {

    constructor(_resourceEndpoint) {
        this.resourceEndpoint = _resourceEndpoint;
    }

    getAll() {
        return http.get(this.resourceEndpoint);
    }

}