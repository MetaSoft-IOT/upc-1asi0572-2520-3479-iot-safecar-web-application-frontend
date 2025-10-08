import axios from "axios";

const http = axios.create({baseURL: "https://my-json-server.typicode.com/MetaSoft-IOT/appointments-fake-api"});

export class AppointmentRequestApiService {

    constructor(_resourceEndpoint = '/appointments') {
        this.resourceEndpoint = _resourceEndpoint;
    }

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(appointmentData) {
        return http.post(this.resourceEndpoint, appointmentData);
    }

    update(id, appointmentData) {
        return http.put(`${this.resourceEndpoint}/${id}`, appointmentData);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    // Método para obtener mecánicos disponibles
    getAvailableMechanics() {
        return http.get('/mechanics');
    }

    // Método para actualizar solo el estado
    updateStatus(id, status) {
        return http.patch(`${this.resourceEndpoint}/${id}`, { status });
    }

    // Método para asignar mecánico
    assignMechanic(appointmentId, mechanicId) {
        return http.patch(`${this.resourceEndpoint}/${appointmentId}`, { 
            mechanicId: mechanicId 
        });
    }

}