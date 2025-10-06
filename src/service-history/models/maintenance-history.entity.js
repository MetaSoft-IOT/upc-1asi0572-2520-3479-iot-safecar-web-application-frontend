export class Vehicle {
    constructor({
                    licensePlate = null,
                    brand = null,
                    model = null,
                    year = null,
                    vin = null,
                    ownerName = null
                } = {}) {
        this.licensePlate = licensePlate;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.vin = vin;
        this.ownerName = ownerName;
    }
}

export class PartReplaced {
    constructor({
                    name = null,
                    brand = null,
                    partNumber = null,
                    quantity = null,
                    unit = null
                } = {}) {
        this.name = name;
        this.brand = brand;
        this.partNumber = partNumber;
        this.quantity = quantity;
        this.unit = unit;
    }
}

export class TelematicSnapshot {
    constructor({
                    engineTempC = null,
                    batteryVoltage = null,
                    oilPressurePsi = null,
                    fuelLevelPercent = null,
                    faultCodes = []
                } = {}) {
        this.engineTempC = engineTempC;
        this.batteryVoltage = batteryVoltage;
        this.oilPressurePsi = oilPressurePsi;
        this.fuelLevelPercent = fuelLevelPercent;
        this.faultCodes = faultCodes;
    }
}

export class MaintenanceRecord {
    constructor({
                    serviceId = null,
                    serviceType = null,
                    date = null,
                    mileageKm = null,
                    serviceCenter = null,
                    technician = null,
                    partsReplaced = [],
                    cost = null,
                    observations = null,
                    telematicSnapshot = null
                } = {}) {
        this.serviceId = serviceId;
        this.serviceType = serviceType;
        this.date = date;
        this.mileageKm = mileageKm;
        this.serviceCenter = serviceCenter;
        this.technician = technician;
        this.partsReplaced = partsReplaced.map(p => new PartReplaced(p));
        this.cost = cost;
        this.observations = observations;
        this.telematicSnapshot = telematicSnapshot ? new TelematicSnapshot(telematicSnapshot) : null;
    }
}

export class MaintenanceHistory {
    constructor({
                    vehicle = null,
                    maintenanceHistory = []
                } = {}) {
        this.vehicle = vehicle ? new Vehicle(vehicle) : null;
        this.maintenanceHistory = maintenanceHistory.map(m => new MaintenanceRecord(m));
    }
}
