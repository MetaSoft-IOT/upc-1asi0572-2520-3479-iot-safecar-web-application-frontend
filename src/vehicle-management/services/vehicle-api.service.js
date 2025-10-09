import axios from "axios";

const http = axios.create({baseURL: "https://my-json-server.typicode.com/MetaSoft-IOT/vehicles-fake-api"});

export class VehicleApiService {

    constructor(_resourceEndpoint = '/vehicles') {
        this.resourceEndpoint = _resourceEndpoint;
    }

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(vehicleData) {
        return http.post(this.resourceEndpoint, vehicleData);
    }

    update(id, vehicleData) {
        return http.put(`${this.resourceEndpoint}/${id}`, vehicleData);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    // Method to get vehicle telemetry data
    getTelemetryById(vehicleId) {
        return http.get(`${this.resourceEndpoint}/${vehicleId}/telemetry`);
    }

    // Method to get vehicle analytics
    getAnalyticsById(vehicleId) {
        return http.get(`${this.resourceEndpoint}/${vehicleId}/analytics`);
    }

    // Method to get vehicle maintenance history
    getMaintenanceById(vehicleId) {
        return http.get(`${this.resourceEndpoint}/${vehicleId}/maintenance`);
    }

    // Method to update vehicle status
    updateStatus(id, status) {
        return http.patch(`${this.resourceEndpoint}/${id}`, { 
            maintenance: { vehicleStatus: status } 
        });
    }

    // Method to update vehicle telemetry
    updateTelemetry(vehicleId, telemetryData) {
        return http.patch(`${this.resourceEndpoint}/${vehicleId}`, { 
            telemetry: telemetryData 
        });
    }

}