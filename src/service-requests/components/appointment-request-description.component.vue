
<script>
export default {
  name: 'appointment-request-description',
  
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  

  
  methods: {
    // Obtener nombre completo del cliente
    getCustomerFullName() {
      if (!this.item.customer) return 'No disponible';
      
      const firstName = this.item.customer.firstName || '';
      const lastName = this.item.customer.lastName || '';
      
      if (firstName && lastName) {
        return `${firstName} ${lastName}`;
      } else if (firstName) {
        return firstName;
      } else if (lastName) {
        return lastName;
      } else {
        return 'No disponible';
      }
    },
    
    // Obtener marca y modelo del vehículo
    getVehicleBrandModel() {
      if (!this.item.vehicle) return 'No disponible';
      
      const brand = this.item.vehicle.brand || '';
      const model = this.item.vehicle.model || '';
      
      if (brand && model) {
        return `${brand} ${model}`;
      } else if (brand || model) {
        return brand || model;
      } else {
        return 'No disponible';
      }
    },
    
    // Formatear fecha para mostrar
    formatDate(dateString) {
      if (!dateString) return 'No disponible';
      
      try {
        let dateToFormat;
        
        if (dateString.includes('T')) {
          const datePart = dateString.split('T')[0];
          const [year, month, day] = datePart.split('-');
          dateToFormat = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        } else if (dateString.includes('-')) {
          const [year, month, day] = dateString.split('-');
          dateToFormat = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        } else {
          dateToFormat = new Date(dateString);
        }
        
        if (isNaN(dateToFormat.getTime())) return 'Fecha inválida';
        
        const day = dateToFormat.getDate().toString().padStart(2, '0');
        const month = (dateToFormat.getMonth() + 1).toString().padStart(2, '0');
        const year = dateToFormat.getFullYear();
        
        return `${day}/${month}/${year}`;
      } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'Fecha inválida';
      }
    },
    
    // Formatear kilometraje
    formatMileage(mileage) {
      if (!mileage && mileage !== 0) return 'No disponible';
      
      const numMileage = parseInt(mileage);
      if (isNaN(numMileage)) return 'No disponible';
      
      return `${numMileage.toLocaleString()} km`;
    },
    
    // Formatear moneda
    formatCurrency(amount) {
      if (!amount && amount !== 0) return '0.00';
      
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount)) return '0.00';
      
      return numAmount.toFixed(2);
    },
    
    // Obtener texto de estado para mostrar
    getStatusDisplayText(status) {
      const statusTexts = {
        'PENDING': 'Pendiente',
        'CONFIRMED': 'Confirmada',
        'IN_PROGRESS': 'En Progreso',
        'COMPLETED': 'Completada',
        'CANCELLED': 'Cancelada',
        'RESCHEDULED': 'Reprogramada'
      };
      return statusTexts[status] || status;
    },
    
    // Obtener severidad del estado para PrimeVue
    getStatusSeverity(status) {
      const severities = {
        'PENDING': 'warning',
        'CONFIRMED': 'info',
        'IN_PROGRESS': 'primary',
        'COMPLETED': 'success',
        'CANCELLED': 'danger',
        'RESCHEDULED': 'secondary'
      };
      return severities[status] || 'secondary';
    },
    
    // Obtener icono del estado
    getStatusIcon(status) {
      const icons = {
        'PENDING': 'pi-clock',
        'CONFIRMED': 'pi-check-circle',
        'IN_PROGRESS': 'pi-cog',
        'COMPLETED': 'pi-check',
        'CANCELLED': 'pi-times-circle',
        'RESCHEDULED': 'pi-calendar'
      };
      return icons[status] || 'pi-info-circle';
    },
    
    // Obtener severidad de prioridad
    getPrioritySeverity(priority) {
      const severities = {
        'HIGH': 'danger',
        'MEDIUM': 'warning',
        'LOW': 'info',
        'URGENT': 'danger'
      };
      return severities[priority] || 'info';
    },
    

  }
};
</script>

<template>
  <div class="flex flex-column pb-4 gap-4">
    
    <!-- ====================== Card -> Información de la Cita ====================== -->
    <pv-card class="w-full">
      <template #header>
        <div class="flex align-items-center gap-2 px-3 py-2" style="background-color: #4A60D0; color: white;">
          <i class="pi pi-calendar" style="color: white;"></i>
          <span class="text-lg font-bold">Información de la Cita</span>
        </div>
      </template>
      <template #content>
        <div class="formgrid grid">
          <!-- Primera fila: Fecha programada, Hora de inicio, Prioridad -->
          <div class="field col-12 md:col-4">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-calendar-times text-primary"></i>
              Fecha programada
            </label>
            <p class="font-semibold text-dark m-0">{{ formatDate(item.appointmentRequest?.scheduledDate) }}</p>
          </div>
          <div class="field col-12 md:col-4">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-clock text-primary"></i>
              Hora de inicio
            </label>
            <p class="font-semibold text-dark m-0">{{ item.appointmentRequest?.startTime || 'No especificada' }}</p>
          </div>
          <div class="field col-12 md:col-4">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-exclamation-triangle text-primary"></i>
              Prioridad
            </label>
            <pv-tag 
              :value="item.appointmentRequest?.priority || 'Normal'" 
              :severity="getPrioritySeverity(item.appointmentRequest?.priority)"
              class="mt-1">
            </pv-tag>
          </div>
          <!-- Segunda fila: Servicio solicitado, Notas del Cliente -->
          <div class="field col-12 md:col-6">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-cog text-primary"></i>
              Servicio solicitado
            </label>
            <p class="font-semibold text-dark m-0">{{ item.appointmentRequest?.requestedService || 'No especificado' }}</p>
          </div>
          <div class="field col-12 md:col-6">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-file-edit text-primary"></i>
              Notas del Cliente
            </label>
            <div class="p-3 border-1 surface-border border-round surface-50" v-if="item.appointmentRequest?.customerNotes">
              <p class="line-height-3 m-0 text-color">{{ item.appointmentRequest.customerNotes }}</p>
            </div>
            <p class="font-semibold text-dark m-0" v-else>No hay notas disponibles</p>
          </div>
        </div>
      </template>
    </pv-card>

    <!-- ====================== Card -> Información del Cliente ====================== -->
    <pv-card class="w-full">
      <template #header>
        <div class="flex align-items-center gap-2 px-3 py-2" style="background-color: #4A60D0; color: white;">
          <i class="pi pi-user" style="color: white;"></i>
          <span class="text-lg font-bold">Información del Cliente</span>
        </div>
      </template>
      <template #content>
        <div class="formgrid grid">
          <!-- Fila 1: Nombre completo, Email y Teléfono -->
          <div class="field col-12 md:col-4">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-user text-primary"></i>
              Nombre completo
            </label>
            <p class="font-semibold text-dark m-0">{{ getCustomerFullName() }}</p>
          </div>
          <div class="field col-12 md:col-4">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-envelope text-primary"></i>
              Email
            </label>
            <p class="font-semibold text-dark m-0">{{ item.customer?.email || 'No disponible' }}</p>
          </div>
          <div class="field col-12 md:col-4">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-phone text-primary"></i>
              Teléfono
            </label>
            <p class="font-semibold text-dark m-0">{{ item.customer?.phoneNumber || 'No disponible' }}</p>
          </div>
          <!-- Fila 2: Dirección -->
          <div class="field col-12">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-map-marker text-primary"></i>
              Dirección
            </label>
            <p class="font-semibold text-dark m-0">{{ item.customer?.address || 'No disponible' }}</p>
          </div>
        </div>
      </template>
    </pv-card>

    <!-- ====================== Card -> Información del Vehículo ====================== -->
    <pv-card class="w-full">
      <template #header>
        <div class="flex align-items-center gap-2 px-3 py-2" style="background-color: #4A60D0; color: white;">
          <i class="pi pi-car" style="color: white;"></i>
          <span class="text-lg font-bold">Información del Vehículo</span>
        </div>
      </template>
      <template #content>
        <div class="formgrid grid">
          <!-- Datos Básicos del Vehículo -->
          <div class="field col-12 md:col-4">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-car text-primary"></i>
              Marca y modelo
            </label>
            <p class="font-semibold text-dark m-0">{{ getVehicleBrandModel() }}</p>
          </div>
          <div class="field col-12 md:col-4">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-calendar text-primary"></i>
              Año
            </label>
            <p class="font-semibold text-dark m-0">{{ item.vehicle?.year || 'No disponible' }}</p>
          </div>
          <div class="field col-12 md:col-4">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-hashtag text-primary"></i>
              Número de placa
            </label>
            <p class="font-semibold text-dark m-0 font-mono">{{ item.vehicle?.licensePlate || 'No disponible' }}</p>
          </div>
          <!-- Segunda fila -->
          <div class="field col-12 md:col-4">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-id-card text-primary"></i>
              VIN
            </label>
            <p class="font-semibold text-dark m-0 font-mono text-sm">{{ item.vehicle?.vin || 'No disponible' }}</p>
          </div>
          <div class="field col-12 md:col-4">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-palette text-primary"></i>
              Color
            </label>
            <p class="font-semibold text-dark m-0">{{ item.vehicle?.color || 'No especificado' }}</p>
          </div>
          <div class="field col-12 md:col-4">
            <label class="font-semibold text-color-secondary flex align-items-center gap-2">
              <i class="pi pi-gauge text-primary"></i>
              Kilometraje
            </label>
            <p class="font-semibold text-dark m-0">{{ formatMileage(item.vehicle?.currentMileage) }}</p>
          </div>
        </div>




      </template>
    </pv-card>




  </div>
</template>


<style scoped>
/* Estilos mínimos necesarios para PrimeVue components */
:deep(.p-card-content) {
  padding: 0.5rem;
}

/* Header de las cards con estilo consistente */
:deep(.p-card .p-card-header) {
  background-color: #4A60D0 !important;
  color: white !important;
  border-top-left-radius: var(--border-radius) !important;
  border-top-right-radius: var(--border-radius) !important;
  padding: 0 !important;
  border-bottom: none !important;
}

:deep(.p-card) {
  border-radius: var(--border-radius) !important;
  overflow: hidden !important;
}



/* Animaciones hover para botones */
:deep(.p-button:hover) {
  transform: translateY(-1px);
  transition: all 0.2s ease;
}

:deep(.p-button:active) {
  transform: translateY(0);
}
</style>
