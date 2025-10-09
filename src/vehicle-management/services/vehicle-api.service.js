import axios from "axios";

const http = axios.create({baseURL: "https://my-json-server.typicode.com/MetaSoft-IOT/vehicles-fake-api"});

export class VehicleApiService {

    constructor(_resourceEndpoint) {
        this.resourceEndpoint = _resourceEndpoint;
    }

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

}