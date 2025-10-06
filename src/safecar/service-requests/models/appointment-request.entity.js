// ---------------------
// SUBCLASES
// ---------------------

export class Customer {
    constructor({ fullName = null, phone = null, email = null } = {}) {
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
    }
}

export class Vehicle {
    constructor({ licensePlate = null, brand = null, model = null } = {}) {
        this.licensePlate = licensePlate;
        this.brand = brand;
        this.model = model;
    }
}

export class Appointment {
    constructor({ date = null, time = null, serviceReason = null, status = null } = {}) {
        this.date = date;
        this.time = time;
        this.serviceReason = serviceReason;
        this.status = status;
    }
}

// ---------------------
// CLASE PRINCIPAL
// ---------------------

export class AppointmentRequest {
    constructor({ customer = null, vehicle = null, appointment = null } = {}) {
        this.customer = customer ? new Customer(customer) : null;
        this.vehicle = vehicle ? new Vehicle(vehicle) : null;
        this.appointment = appointment ? new Appointment(appointment) : null;
    }
}
