/**
 * @fileoverview Vehicle entity model with related classes for SafeCar IoT application
 * @author SafeCar Development Team
 * @version 1.0.0
 */

// ---------------------
// SUBCLASES
// ---------------------

/**
 * Represents GPS coordinates with latitude and longitude
 * @class GPSCoordinates
 */
export class GPSCoordinates {
    /**
     * Creates a new GPSCoordinates instance
     * @param {Object} options - Configuration options
     * @param {number|null} [options.latitude=null] - Latitude coordinate in decimal degrees
     * @param {number|null} [options.longitude=null] - Longitude coordinate in decimal degrees
     */
    constructor({ latitude = null, longitude = null } = {}) {
        /**
         * Latitude coordinate in decimal degrees
         * @type {number|null}
         */
        this.latitude = latitude;
        
        /**
         * Longitude coordinate in decimal degrees
         * @type {number|null}
         */
        this.longitude = longitude;
    }
}

/**
 * Represents an IoT device installed in a vehicle
 * @class IoTDevice
 */
export class IoTDevice {
    /**
     * Creates a new IoTDevice instance
     * @param {Object} options - Configuration options
     * @param {string|null} [options.iotDeviceId=null] - Unique identifier for the IoT device
     * @param {string|null} [options.deviceModel=null] - Model name/number of the device
     * @param {string|null} [options.firmwareVersion=null] - Current firmware version
     * @param {string|null} [options.communicationProtocol=null] - Communication protocol used (e.g., 4G, WiFi, Bluetooth)
     * @param {string|Date|null} [options.installationDate=null] - Date when the device was installed
     * @param {string|Date|null} [options.lastMaintenance=null] - Date of last device maintenance
     * @param {boolean} [options.isActive=false] - Whether the device is currently active
     * @param {number|null} [options.signalStrength=null] - Signal strength percentage (0-100)
     * @param {number|null} [options.dataFrequency=null] - Data transmission frequency in seconds
     * @param {string|null} [options.installationNotes=null] - Additional notes about installation
     */
    constructor({
                    iotDeviceId = null,
                    deviceModel = null,
                    firmwareVersion = null,
                    communicationProtocol = null,
                    installationDate = null,
                    lastMaintenance = null,
                    isActive = false,
                    signalStrength = null,
                    dataFrequency = null,
                    installationNotes = null,
                } = {}) {
        /**
         * Unique identifier for the IoT device
         * @type {string|null}
         */
        this.iotDeviceId = iotDeviceId;
        
        /**
         * Model name/number of the device
         * @type {string|null}
         */
        this.deviceModel = deviceModel;
        
        /**
         * Current firmware version
         * @type {string|null}
         */
        this.firmwareVersion = firmwareVersion;
        
        /**
         * Communication protocol used (e.g., 4G, WiFi, Bluetooth)
         * @type {string|null}
         */
        this.communicationProtocol = communicationProtocol;
        
        /**
         * Date when the device was installed
         * @type {string|Date|null}
         */
        this.installationDate = installationDate;
        
        /**
         * Date of last device maintenance
         * @type {string|Date|null}
         */
        this.lastMaintenance = lastMaintenance;
        
        /**
         * Whether the device is currently active
         * @type {boolean}
         */
        this.isActive = isActive;
        
        /**
         * Signal strength percentage (0-100)
         * @type {number|null}
         */
        this.signalStrength = signalStrength;
        
        /**
         * Data transmission frequency in seconds
         * @type {number|null}
         */
        this.dataFrequency = dataFrequency;
        
        /**
         * Additional notes about installation
         * @type {string|null}
         */
        this.installationNotes = installationNotes;
    }
}

/**
 * Represents the owner of a vehicle
 * @class Owner
 */
export class Owner {
    /**
     * Creates a new Owner instance
     * @param {Object} options - Configuration options
     * @param {string|null} [options.customerId=null] - Unique customer identifier
     * @param {string|null} [options.firstName=null] - Owner's first name
     * @param {string|null} [options.lastName=null] - Owner's last name
     * @param {string|null} [options.email=null] - Owner's email address
     * @param {string|null} [options.phoneNumber=null] - Owner's phone number
     * @param {string|null} [options.address=null] - Owner's address
     * @param {string|null} [options.ownershipType=null] - Type of ownership (e.g., individual, corporate, lease)
     * @param {string|Date|null} [options.registeredAt=null] - Date when owner was registered
     * @param {string|null} [options.preferredWorkshopId=null] - ID of preferred workshop for services
     */
    constructor({
                    customerId = null,
                    firstName = null,
                    lastName = null,
                    email = null,
                    phoneNumber = null,
                    address = null,
                    ownershipType = null,
                    registeredAt = null,
                    preferredWorkshopId = null,
                } = {}) {
        /**
         * Unique customer identifier
         * @type {string|null}
         */
        this.customerId = customerId;
        
        /**
         * Owner's first name
         * @type {string|null}
         */
        this.firstName = firstName;
        
        /**
         * Owner's last name
         * @type {string|null}
         */
        this.lastName = lastName;
        
        /**
         * Owner's email address
         * @type {string|null}
         */
        this.email = email;
        
        /**
         * Owner's phone number
         * @type {string|null}
         */
        this.phoneNumber = phoneNumber;
        
        /**
         * Owner's address
         * @type {string|null}
         */
        this.address = address;
        
        /**
         * Type of ownership (e.g., individual, corporate, lease)
         * @type {string|null}
         */
        this.ownershipType = ownershipType;
        
        /**
         * Date when owner was registered
         * @type {string|Date|null}
         */
        this.registeredAt = registeredAt;
        
        /**
         * ID of preferred workshop for services
         * @type {string|null}
         */
        this.preferredWorkshopId = preferredWorkshopId;
    }
}

/**
 * Represents a workshop that performs IoT device installations
 * @class InstallationWorkshop
 */
export class InstallationWorkshop {
    /**
     * Creates a new InstallationWorkshop instance
     * @param {Object} options - Configuration options
     * @param {string|null} [options.workshopId=null] - Unique workshop identifier
     * @param {string|null} [options.name=null] - Workshop name
     * @param {string|null} [options.technician=null] - Name of the technician who performed installation
     * @param {string|null} [options.contactNumber=null] - Workshop contact phone number
     * @param {string|null} [options.email=null] - Workshop email address
     * @param {string|null} [options.address=null] - Workshop physical address
     * @param {number|null} [options.installationWarrantyMonths=null] - Warranty period in months
     * @param {boolean} [options.certifiedInstaller=false] - Whether the workshop is certified for installations
     */
    constructor({
                    workshopId = null,
                    name = null,
                    technician = null,
                    contactNumber = null,
                    email = null,
                    address = null,
                    installationWarrantyMonths = null,
                    certifiedInstaller = false,
                } = {}) {
        /**
         * Unique workshop identifier
         * @type {string|null}
         */
        this.workshopId = workshopId;
        
        /**
         * Workshop name
         * @type {string|null}
         */
        this.name = name;
        
        /**
         * Name of the technician who performed installation
         * @type {string|null}
         */
        this.technician = technician;
        
        /**
         * Workshop contact phone number
         * @type {string|null}
         */
        this.contactNumber = contactNumber;
        
        /**
         * Workshop email address
         * @type {string|null}
         */
        this.email = email;
        
        /**
         * Workshop physical address
         * @type {string|null}
         */
        this.address = address;
        
        /**
         * Warranty period in months
         * @type {number|null}
         */
        this.installationWarrantyMonths = installationWarrantyMonths;
        
        /**
         * Whether the workshop is certified for installations
         * @type {boolean}
         */
        this.certifiedInstaller = certifiedInstaller;
    }
}

/**
 * Represents real-time telemetry data from a vehicle
 * @class Telemetry
 */
export class Telemetry {
    /**
     * Creates a new Telemetry instance
     * @param {Object} options - Configuration options
     * @param {string|Date|null} [options.lastUpdate=null] - Timestamp of last telemetry update
     * @param {string|null} [options.obdCode=null] - On-Board Diagnostics trouble code
     * @param {string|null} [options.faultDescription=null] - Description of any detected fault
     * @param {number|null} [options.rpm=null] - Engine revolutions per minute
     * @param {number|null} [options.engineTemperature=null] - Engine temperature in degrees Celsius
     * @param {number|null} [options.fuelLevel=null] - Fuel level percentage (0-100)
     * @param {number|null} [options.oilPressure=null] - Oil pressure in PSI
     * @param {number|null} [options.batteryVoltage=null] - Battery voltage in volts
     * @param {number|null} [options.speed=null] - Current speed in km/h
     * @param {number|null} [options.odometer=null] - Total distance traveled in kilometers
     * @param {Object|GPSCoordinates|null} [options.gpsCoordinates=null] - Current GPS coordinates
     * @param {number|null} [options.heading=null] - Vehicle heading in degrees (0-360)
     * @param {boolean} [options.activeAlert=false] - Whether there's an active alert
     * @param {string|null} [options.alertType=null] - Type of active alert if any
     */
    constructor({
                    lastUpdate = null,
                    obdCode = null,
                    faultDescription = null,
                    rpm = null,
                    engineTemperature = null,
                    fuelLevel = null,
                    oilPressure = null,
                    batteryVoltage = null,
                    speed = null,
                    odometer = null,
                    gpsCoordinates = null,
                    heading = null,
                    activeAlert = false,
                    alertType = null,
                } = {}) {
        /**
         * Timestamp of last telemetry update
         * @type {string|Date|null}
         */
        this.lastUpdate = lastUpdate;
        
        /**
         * On-Board Diagnostics trouble code
         * @type {string|null}
         */
        this.obdCode = obdCode;
        
        /**
         * Description of any detected fault
         * @type {string|null}
         */
        this.faultDescription = faultDescription;
        
        /**
         * Engine revolutions per minute
         * @type {number|null}
         */
        this.rpm = rpm;
        
        /**
         * Engine temperature in degrees Celsius
         * @type {number|null}
         */
        this.engineTemperature = engineTemperature;
        
        /**
         * Fuel level percentage (0-100)
         * @type {number|null}
         */
        this.fuelLevel = fuelLevel;
        
        /**
         * Oil pressure in PSI
         * @type {number|null}
         */
        this.oilPressure = oilPressure;
        
        /**
         * Battery voltage in volts
         * @type {number|null}
         */
        this.batteryVoltage = batteryVoltage;
        
        /**
         * Current speed in km/h
         * @type {number|null}
         */
        this.speed = speed;
        
        /**
         * Total distance traveled in kilometers
         * @type {number|null}
         */
        this.odometer = odometer;
        
        /**
         * Current GPS coordinates
         * @type {GPSCoordinates|null}
         */
        this.gpsCoordinates = gpsCoordinates
            ? new GPSCoordinates(gpsCoordinates)
            : null;
        
        /**
         * Vehicle heading in degrees (0-360)
         * @type {number|null}
         */
        this.heading = heading;
        
        /**
         * Whether there's an active alert
         * @type {boolean}
         */
        this.activeAlert = activeAlert;
        
        /**
         * Type of active alert if any
         * @type {string|null}
         */
        this.alertType = alertType;
    }
}

/**
 * Represents maintenance information for a vehicle
 * @class Maintenance
 */
export class Maintenance {
    /**
     * Creates a new Maintenance instance
     * @param {Object} options - Configuration options
     * @param {string|null} [options.vehicleStatus=null] - Current vehicle status (e.g., active, in-service, retired)
     * @param {string|Date|null} [options.nextServiceDate=null] - Date of next scheduled service
     * @param {string|Date|null} [options.lastServiceDate=null] - Date of last completed service
     * @param {number} [options.serviceHistoryCount=0] - Total number of service records
     * @param {string|Date|null} [options.warrantyValidUntil=null] - Warranty expiration date
     * @param {string|null} [options.insurancePolicy=null] - Insurance policy number or details
     */
    constructor({
                    vehicleStatus = null,
                    nextServiceDate = null,
                    lastServiceDate = null,
                    serviceHistoryCount = 0,
                    warrantyValidUntil = null,
                    insurancePolicy = null,
                } = {}) {
        /**
         * Current vehicle status (e.g., active, in-service, retired)
         * @type {string|null}
         */
        this.vehicleStatus = vehicleStatus;
        
        /**
         * Date of next scheduled service
         * @type {string|Date|null}
         */
        this.nextServiceDate = nextServiceDate;
        
        /**
         * Date of last completed service
         * @type {string|Date|null}
         */
        this.lastServiceDate = lastServiceDate;
        
        /**
         * Total number of service records
         * @type {number}
         */
        this.serviceHistoryCount = serviceHistoryCount;
        
        /**
         * Warranty expiration date
         * @type {string|Date|null}
         */
        this.warrantyValidUntil = warrantyValidUntil;
        
        /**
         * Insurance policy number or details
         * @type {string|null}
         */
        this.insurancePolicy = insurancePolicy;
    }
}

/**
 * Represents driving behavior analytics data
 * @class DrivingBehavior
 */
export class DrivingBehavior {
    /**
     * Creates a new DrivingBehavior instance
     * @param {Object} options - Configuration options
     * @param {number} [options.harshBrakingCount=0] - Count of harsh braking events
     * @param {number} [options.rapidAccelerationCount=0] - Count of rapid acceleration events
     * @param {number} [options.averageSpeed=0] - Average speed in km/h
     */
    constructor({
                    harshBrakingCount = 0,
                    rapidAccelerationCount = 0,
                    averageSpeed = 0,
                } = {}) {
        /**
         * Count of harsh braking events
         * @type {number}
         */
        this.harshBrakingCount = harshBrakingCount;
        
        /**
         * Count of rapid acceleration events
         * @type {number}
         */
        this.rapidAccelerationCount = rapidAccelerationCount;
        
        /**
         * Average speed in km/h
         * @type {number}
         */
        this.averageSpeed = averageSpeed;
    }
}

/**
 * Represents an anomaly detected in vehicle data
 * @class Anomaly
 */
export class Anomaly {
    /**
     * Creates a new Anomaly instance
     * @param {Object} options - Configuration options
     * @param {string|null} [options.type=null] - Type of anomaly detected
     * @param {string|Date|null} [options.date=null] - Date when anomaly was detected
     */
    constructor({ type = null, date = null } = {}) {
        /**
         * Type of anomaly detected
         * @type {string|null}
         */
        this.type = type;
        
        /**
         * Date when anomaly was detected
         * @type {string|Date|null}
         */
        this.date = date;
    }
}

/**
 * Represents analytics and predictive data for a vehicle
 * @class Analytics
 */
export class Analytics {
    /**
     * Creates a new Analytics instance
     * @param {Object} options - Configuration options
     * @param {number|null} [options.averageFuelConsumption=null] - Average fuel consumption in L/100km
     * @param {Object|DrivingBehavior|null} [options.drivingBehavior=null] - Driving behavior analytics
     * @param {string|number|null} [options.predictedMaintenanceRisk=null] - Predicted maintenance risk level
     * @param {Object|Anomaly|null} [options.lastAnomalyDetected=null] - Last detected anomaly
     * @param {boolean} [options.softwareUpdateAvailable=false] - Whether a software update is available
     */
    constructor({
                    averageFuelConsumption = null,
                    drivingBehavior = null,
                    predictedMaintenanceRisk = null,
                    lastAnomalyDetected = null,
                    softwareUpdateAvailable = false,
                } = {}) {
        /**
         * Average fuel consumption in L/100km
         * @type {number|null}
         */
        this.averageFuelConsumption = averageFuelConsumption;
        
        /**
         * Driving behavior analytics
         * @type {DrivingBehavior|null}
         */
        this.drivingBehavior = drivingBehavior
            ? new DrivingBehavior(drivingBehavior)
            : null;
        
        /**
         * Predicted maintenance risk level
         * @type {string|number|null}
         */
        this.predictedMaintenanceRisk = predictedMaintenanceRisk;
        
        /**
         * Last detected anomaly
         * @type {Anomaly|null}
         */
        this.lastAnomalyDetected = lastAnomalyDetected
            ? new Anomaly(lastAnomalyDetected)
            : null;
        
        /**
         * Whether a software update is available
         * @type {boolean}
         */
        this.softwareUpdateAvailable = softwareUpdateAvailable;
    }
}

/**
 * Represents metadata about record creation and updates
 * @class Metadata
 */
export class Metadata {
    /**
     * Creates a new Metadata instance
     * @param {Object} options - Configuration options
     * @param {string|null} [options.createdBy=null] - User ID or system that created the record
     * @param {string|Date|null} [options.createdAt=null] - Timestamp when record was created
     * @param {string|Date|null} [options.updatedAt=null] - Timestamp when record was last updated
     * @param {string|null} [options.dataSource=null] - Source system or origin of the data
     */
    constructor({
                    createdBy = null,
                    createdAt = null,
                    updatedAt = null,
                    dataSource = null,
                } = {}) {
        /**
         * User ID or system that created the record
         * @type {string|null}
         */
        this.createdBy = createdBy;
        
        /**
         * Timestamp when record was created
         * @type {string|Date|null}
         */
        this.createdAt = createdAt;
        
        /**
         * Timestamp when record was last updated
         * @type {string|Date|null}
         */
        this.updatedAt = updatedAt;
        
        /**
         * Source system or origin of the data
         * @type {string|null}
         */
        this.dataSource = dataSource;
    }
}

// ---------------------
// CLASE PRINCIPAL
// ---------------------

/**
 * Main Vehicle entity class representing a complete vehicle with all its associated data
 * @class Vehicle
 * @description This class serves as the main entity for vehicle management in the SafeCar IoT application.
 * It aggregates all vehicle-related information including basic vehicle data, IoT device information,
 * owner details, telemetry data, maintenance records, analytics, and metadata.
 */
export class Vehicle {
    /**
     * Creates a new Vehicle instance
     * @param {Object} options - Configuration options
     * @param {string|null} [options.vehicleId=null] - Unique vehicle identifier
     * @param {string|null} [options.licensePlate=null] - Vehicle license plate number
     * @param {string|null} [options.brand=null] - Vehicle brand/manufacturer (e.g., Toyota, Ford)
     * @param {string|null} [options.model=null] - Vehicle model name
     * @param {string|null} [options.subModel=null] - Vehicle sub-model or trim level
     * @param {number|string|null} [options.year=null] - Manufacturing year
     * @param {string|null} [options.vin=null] - Vehicle Identification Number (VIN)
     * @param {string|null} [options.engineType=null] - Engine type (e.g., V6, I4, Electric)
     * @param {string|null} [options.fuelType=null] - Fuel type (e.g., Gasoline, Diesel, Electric, Hybrid)
     * @param {string|null} [options.transmission=null] - Transmission type (e.g., Manual, Automatic, CVT)
     * @param {string|null} [options.color=null] - Vehicle color
     * @param {string|null} [options.bodyType=null] - Body type (e.g., Sedan, SUV, Hatchback)
     * @param {number|null} [options.currentMileage=null] - Current vehicle mileage in kilometers
     * @param {string|null} [options.registrationCountry=null] - Country where vehicle is registered
     * @param {Object|IoTDevice|null} [options.iotDevice=null] - IoT device information
     * @param {Object|Owner|null} [options.owner=null] - Vehicle owner information
     * @param {Object|InstallationWorkshop|null} [options.installationWorkshop=null] - Workshop that installed IoT device
     * @param {Object|Telemetry|null} [options.telemetry=null] - Real-time telemetry data
     * @param {Object|Maintenance|null} [options.maintenance=null] - Maintenance information
     * @param {Object|Analytics|null} [options.analytics=null] - Analytics and predictive data
     * @param {Object|Metadata|null} [options.metadata=null] - Record metadata
     */
    constructor({
                    vehicleId = null,
                    licensePlate = null,
                    brand = null,
                    model = null,
                    subModel = null,
                    year = null,
                    vin = null,
                    engineType = null,
                    fuelType = null,
                    transmission = null,
                    color = null,
                    bodyType = null,
                    currentMileage = null,
                    registrationCountry = null,
                    iotDevice = null,
                    owner = null,
                    installationWorkshop = null,
                    telemetry = null,
                    maintenance = null,
                    analytics = null,
                    metadata = null,
                } = {}) {
        /**
         * Unique vehicle identifier
         * @type {string|null}
         */
        this.vehicleId = vehicleId;
        
        /**
         * Vehicle license plate number
         * @type {string|null}
         */
        this.licensePlate = licensePlate;
        
        /**
         * Vehicle brand/manufacturer (e.g., Toyota, Ford)
         * @type {string|null}
         */
        this.brand = brand;
        
        /**
         * Vehicle model name
         * @type {string|null}
         */
        this.model = model;
        
        /**
         * Vehicle sub-model or trim level
         * @type {string|null}
         */
        this.subModel = subModel;
        
        /**
         * Manufacturing year
         * @type {number|string|null}
         */
        this.year = year;
        
        /**
         * Vehicle Identification Number (VIN)
         * @type {string|null}
         */
        this.vin = vin;
        
        /**
         * Engine type (e.g., V6, I4, Electric)
         * @type {string|null}
         */
        this.engineType = engineType;
        
        /**
         * Fuel type (e.g., Gasoline, Diesel, Electric, Hybrid)
         * @type {string|null}
         */
        this.fuelType = fuelType;
        
        /**
         * Transmission type (e.g., Manual, Automatic, CVT)
         * @type {string|null}
         */
        this.transmission = transmission;
        
        /**
         * Vehicle color
         * @type {string|null}
         */
        this.color = color;
        
        /**
         * Body type (e.g., Sedan, SUV, Hatchback)
         * @type {string|null}
         */
        this.bodyType = bodyType;
        
        /**
         * Current vehicle mileage in kilometers
         * @type {number|null}
         */
        this.currentMileage = currentMileage;
        
        /**
         * Country where vehicle is registered
         * @type {string|null}
         */
        this.registrationCountry = registrationCountry;
        
        /**
         * IoT device information
         * @type {IoTDevice|null}
         */
        this.iotDevice = iotDevice ? new IoTDevice(iotDevice) : null;
        
        /**
         * Vehicle owner information
         * @type {Owner|null}
         */
        this.owner = owner ? new Owner(owner) : null;
        
        /**
         * Workshop that installed IoT device
         * @type {InstallationWorkshop|null}
         */
        this.installationWorkshop = installationWorkshop
            ? new InstallationWorkshop(installationWorkshop)
            : null;
        
        /**
         * Real-time telemetry data
         * @type {Telemetry|null}
         */
        this.telemetry = telemetry ? new Telemetry(telemetry) : null;
        
        /**
         * Maintenance information
         * @type {Maintenance|null}
         */
        this.maintenance = maintenance ? new Maintenance(maintenance) : null;
        
        /**
         * Analytics and predictive data
         * @type {Analytics|null}
         */
        this.analytics = analytics ? new Analytics(analytics) : null;
        
        /**
         * Record metadata
         * @type {Metadata|null}
         */
        this.metadata = metadata ? new Metadata(metadata) : null;
    }
}
