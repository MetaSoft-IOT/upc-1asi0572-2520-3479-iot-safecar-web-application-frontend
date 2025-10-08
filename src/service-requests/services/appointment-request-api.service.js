import axios from "axios";

const http = axios.create({baseURL: "https://my-json-server.typicode.com/MetaSoft-IOT/appointments-fake-api"});

export class AppointmentRequestApiService {

    constructor(_resourceEndpoint) {
        this.resourceEndpoint = _resourceEndpoint;
    }

    getAll() {
        return http.get(`/${this.resourceEndpoint}`);
    }

    getById(id) {
        return http.get(`/${this.resourceEndpoint}/${id}`);
    }

    create(data) {
        return http.post(`/${this.resourceEndpoint}`, data);
    }

    update(id, data) {
        return http.put(`/${this.resourceEndpoint}/${id}`, data);
    }

    delete(id) {
        return http.delete(`/${this.resourceEndpoint}/${id}`);
    }


}