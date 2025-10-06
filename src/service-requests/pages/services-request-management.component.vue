<script>

import DataManager from "../../shared/components/data-manager.component.vue";
import {AppointmentRequest, Customer, Vehicle, Appointment} from "../models/appointment-request.entity.js";

export default {
  name: 'services-request-management',
  components: {DataManager},

  data(){
    return {

      itemsArray:[],

      globalFilterValue: '', // Valor del filtro global de búsqueda
      selectedDate: null, // Fecha seleccionada en el filtro
      selectedStatus: null, // Estado seleccionado en el filtro

      loading: false,

    }
  },

  computed: {
    columns() {
      return [
        { field: 'customerName', header: this.$t('service_requests.columns.customer'), sortable: true, style: 'width: 200px;' },
        { field: 'customerPhone', header: this.$t('service_requests.columns.phone'), sortable: true, style: 'width: 140px;' },
        { field: 'vehiclePlate', header: this.$t('service_requests.columns.plate'), sortable: true, style: 'width: 120px;' },
        { field: 'vehicleBrand', header: this.$t('service_requests.columns.brand_model'), sortable: true, style: 'width: 180px;' },
        { field: 'appointmentDate', header: this.$t('service_requests.columns.appointment_date'), sortable: true, template: 'appointmentDate', style: 'width: 140px;' },
        { field: 'serviceReason', header: this.$t('service_requests.columns.service'), sortable: true, style: 'width: 200px;' },
        { field: 'status', header: this.$t('service_requests.columns.status'), sortable: true, template: 'status', style: 'width: 120px;' },
      ];
    },

    statusOptions() {
      return [
        { label: this.$t('service_requests.status.all'), value: null },
        { label: this.$t('service_requests.status.pending'), value: 'PENDIENTE' },
        { label: this.$t('service_requests.status.confirmed'), value: 'CONFIRMADA' },
        { label: this.$t('service_requests.status.in_progress'), value: 'EN_PROCESO' },
        { label: this.$t('service_requests.status.completed'), value: 'COMPLETADA' },
        { label: this.$t('service_requests.status.cancelled'), value: 'CANCELADA' },
      ];
    },

    title() {
      return {
        singular: this.$t('service_requests.title_singular'),
        plural: this.$t('service_requests.title_plural'),
      };
    },
    // Filtro combinado que aplica todos los filtros activos
    filteredItemsArray() {
      let filtered = [...this.itemsArray]; // Copia del array original para filtrar sin mutar el original

      // Filtro por búsqueda global (nombre de cliente, teléfono, placa, marca/modelo, servicio)
      // Solo aplicar filtro si hay contenido real (no null, no undefined, no string vacío o solo espacios)
      if (this.globalFilterValue && this.globalFilterValue.trim().length > 0) {
        // Normalizar el término de búsqueda: quitar espacios extra y convertir a minúsculas
        const searchTerm = this.globalFilterValue.toLowerCase().trim().replace(/\s+/g, ' ');
        filtered = filtered.filter(request =>
          (request.customerName && request.customerName.toLowerCase().trim().replace(/\s+/g, ' ').includes(searchTerm)) ||
          (request.customerPhone && request.customerPhone.toLowerCase().trim().replace(/\s+/g, ' ').includes(searchTerm)) ||
          (request.vehiclePlate && request.vehiclePlate.toLowerCase().trim().replace(/\s+/g, ' ').includes(searchTerm)) ||
          (request.vehicleBrand && request.vehicleBrand.toLowerCase().trim().replace(/\s+/g, ' ').includes(searchTerm)) ||
          (request.serviceReason && request.serviceReason.toLowerCase().trim().replace(/\s+/g, ' ').includes(searchTerm))
        );
      }

      // Filtro por estado seleccionado
      if (this.selectedStatus) {
        filtered = filtered.filter(request => request.status === this.selectedStatus);
      }

      // Filtro por fecha seleccionada (corregido para zona horaria)
      if (this.selectedDate) {
        const selectedDateStr = this.dateToComparableString(this.selectedDate);
        if (selectedDateStr) {
          filtered = filtered.filter(request => {
            const requestDateStr = this.normalizeDateForComparison(request.appointmentDate);
            return requestDateStr === selectedDateStr;
          });
        }
      }

      return filtered;
    }
  },

  methods: {

    onNewItemRequested() {
      console.log('Crear nueva solicitud de servicio');
      // Implementar navegación a formulario de creación
    },

    onDeleteSelectedItems(selectedItems) {
      console.log('Eliminar solicitudes seleccionadas:', selectedItems);
      // Implementar lógica de eliminación múltiple
      selectedItems.forEach(item => {
        const index = this.itemsArray.findIndex(request => request.id === item.id);
        if (index > -1) {
          this.itemsArray.splice(index, 1);
        }
      });
    },

    onDeleteItem(item) {
      console.log('Eliminar solicitud:', item);
      // Implementar lógica de eliminación individual
      const index = this.itemsArray.findIndex(request => request.id === item.id);
      if (index > -1) {
        this.itemsArray.splice(index, 1);
      }
    },

    onEditItem(item) {
      console.log('Editar solicitud:', item);
      // Implementar navegación a formulario de edición
    },

    onViewItem(item) {
      console.log('Ver detalles de solicitud:', item);
      // Navegar a vista de detalles pasando el ID de la solicitud
      this.$router.push({ 
        name: 'service-request-details', 
        query: { id: item.id } 
      });
    },

    onRowSelect(event) {
      console.log('Fila seleccionada:', event);
    },

    onRowUnselect(event) {
      console.log('Fila deseleccionada:', event);
    },

    onClearFilters() {
      this.globalFilterValue = '';
      this.selectedStatus = null;
      this.selectedDate = null;
    },

    onGlobalFilterChange(value) {
      this.globalFilterValue = value || '';
    },

    getStatusSeverity(status) {
      switch (status) {
        case 'CONFIRMADA':
          return 'success';
        case 'EN_PROCESO':
          return 'info';
        case 'COMPLETADA':
          return 'success';
        case 'PENDIENTE':
          return 'warn';
        case 'CANCELADA':
          return 'danger';
        default:
          return 'info';
      }
    },

    formatDate(dateString) {
      if (!dateString) return '';
      
      try {
        // Manejar diferentes formatos de fecha de entrada
        let dateToFormat;
        
        if (dateString.includes('T')) {
          // Si tiene formato ISO con hora, extraer solo la fecha
          const datePart = dateString.split('T')[0];
          const [year, month, day] = datePart.split('-');
          // Crear fecha usando componentes individuales para evitar zona horaria
          dateToFormat = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        } else if (dateString.includes('-')) {
          // Si es formato YYYY-MM-DD
          const [year, month, day] = dateString.split('-');
          dateToFormat = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        } else {
          // Fallback para otros formatos
          dateToFormat = new Date(dateString);
        }
        
        // Verificar que la fecha sea válida
        if (isNaN(dateToFormat.getTime())) return dateString;
        
        // Formatear como dd/mm/aaaa usando los métodos locales
        const day = dateToFormat.getDate().toString().padStart(2, '0');
        const month = (dateToFormat.getMonth() + 1).toString().padStart(2, '0');
        const year = dateToFormat.getFullYear();
        
        return `${day}/${month}/${year}`;
      } catch (error) {
        console.error('Error al formatear fecha:', error);
        return dateString;
      }
    },

    // Función para normalizar fechas y evitar problemas de zona horaria
    normalizeDateForComparison(dateString) {
      if (!dateString) return null;
      
      try {
        // Crear fecha desde string de API (formato YYYY-MM-DD)
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
        
        // Retornar solo la parte de la fecha (YYYY-MM-DD) sin hora
        return date.toISOString().split('T')[0];
      } catch (error) {
        console.error('Error al normalizar fecha:', error);
        return null;
      }
    },

    // Función para convertir Date de calendario a string comparable
    dateToComparableString(dateObject) {
      if (!dateObject) return null;
      
      try {
        // Asegurar que es un objeto Date válido
        const date = dateObject instanceof Date ? dateObject : new Date(dateObject);
        if (isNaN(date.getTime())) return null;
        
        // Usar fecha local para evitar problemas de zona horaria
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        return `${year}-${month}-${day}`;
      } catch (error) {
        console.error('Error al convertir fecha del calendario:', error);
        return null;
      }
    },

    // Función modular para manejar errores de servidor
    handleServerError(error, context = 'datos') {
      console.error(`Error al cargar ${context}:`, error);

      // Determinar si mostrar toast basado en el tipo de error
      let errorMessage = '';
      let showToast = false;

      if (error.response) {
        // Error de respuesta del servidor (4xx, 5xx)
        const status = error.response.status;
        showToast = true;
        
        if (status >= 500) {
          errorMessage = `Error interno del servidor al cargar ${context}. Por favor, contacte al administrador.`;
        } else if (status >= 400) {
          errorMessage = `Error en la solicitud de ${context}. Verifique los permisos de acceso.`;
        } else {
          errorMessage = `Error del servidor (${status}) al cargar ${context}.`;
        }
      } else if (error.request) {
        // Error de red o conexión
        showToast = true;
        errorMessage = `No se pudo conectar con el servidor para cargar ${context}. Verifique su conexión a internet.`;
      } else if (error.message && (error.message.includes('inválido') || error.message.includes('formato'))) {
        // Error de formato de datos del servidor
        showToast = true;
        errorMessage = `Error en el formato de datos del servidor: ${error.message}`;
      }
      
      if (showToast) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error del servidor',
          detail: errorMessage,
          life: 7000
        });
      }
    },

    // Función modular para validar respuesta del servidor
    validateServerResponse(response, context = 'datos') {
      if (!response || !response.hasOwnProperty('data') || !Array.isArray(response.data)) {
        throw new Error(`Formato de ${context} inválido del servidor`);
      }
      return true;
    },

    getAll() {
      this.loading = true;
      
      // Simular delay de carga real
      setTimeout(() => {
        try {
          // Datos mockeados para solicitudes de servicio
          const mockData = [
            {
              id: 'req_001',
              customer: new Customer({
                fullName: 'Carlos Rodríguez López',
                phone: '999-123-456',
                email: 'carlos.rodriguez@email.com'
              }),
              vehicle: new Vehicle({
                licensePlate: 'ABC-123',
                brand: 'Toyota',
                model: 'Corolla'
              }),
              appointment: new Appointment({
                date: '2024-11-15',
                time: '09:00',
                serviceReason: 'Mantenimiento preventivo',
                status: 'PENDIENTE'
              })
            },
            {
              id: 'req_002',
              customer: new Customer({
                fullName: 'Ana María Fernández',
                phone: '987-654-321',
                email: 'ana.fernandez@email.com'
              }),
              vehicle: new Vehicle({
                licensePlate: 'XYZ-789',
                brand: 'Honda',
                model: 'Civic'
              }),
              appointment: new Appointment({
                date: '2024-11-16',
                time: '14:30',
                serviceReason: 'Reparación de frenos',
                status: 'CONFIRMADA'
              })
            },
            {
              id: 'req_003',
              customer: new Customer({
                fullName: 'Miguel Torres Sánchez',
                phone: '955-888-777',
                email: 'miguel.torres@email.com'
              }),
              vehicle: new Vehicle({
                licensePlate: 'DEF-456',
                brand: 'Nissan',
                model: 'Sentra'
              }),
              appointment: new Appointment({
                date: '2024-11-17',
                time: '10:15',
                serviceReason: 'Cambio de aceite',
                status: 'EN_PROCESO'
              })
            },
            {
              id: 'req_004',
              customer: new Customer({
                fullName: 'Patricia Vega Cruz',
                phone: '944-555-123',
                email: 'patricia.vega@email.com'
              }),
              vehicle: new Vehicle({
                licensePlate: 'GHI-321',
                brand: 'Hyundai',
                model: 'Elantra'
              }),
              appointment: new Appointment({
                date: '2024-11-14',
                time: '16:00',
                serviceReason: 'Revisión técnica',
                status: 'COMPLETADA'
              })
            },
            {
              id: 'req_005',
              customer: new Customer({
                fullName: 'Roberto Mendoza Villa',
                phone: '933-222-444',
                email: 'roberto.mendoza@email.com'
              }),
              vehicle: new Vehicle({
                licensePlate: 'JKL-654',
                brand: 'Chevrolet',
                model: 'Spark'
              }),
              appointment: new Appointment({
                date: '2024-11-18',
                time: '11:30',
                serviceReason: 'Reparación de motor',
                status: 'CANCELADA'
              })
            },
            {
              id: 'req_006',
              customer: new Customer({
                fullName: 'Lucía Ramírez Herrera',
                phone: '966-777-888',
                email: 'lucia.ramirez@email.com'
              }),
              vehicle: new Vehicle({
                licensePlate: 'MNO-987',
                brand: 'Kia',
                model: 'Rio'
              }),
              appointment: new Appointment({
                date: '2024-11-19',
                time: '08:45',
                serviceReason: 'Alineación y balanceo',
                status: 'PENDIENTE'
              })
            },
            {
              id: 'req_007',
              customer: new Customer({
                fullName: 'Fernando García Morales',
                phone: '977-333-555',
                email: 'fernando.garcia@email.com'
              }),
              vehicle: new Vehicle({
                licensePlate: 'PQR-147',
                brand: 'Volkswagen',
                model: 'Polo'
              }),
              appointment: new Appointment({
                date: '2024-11-20',
                time: '13:15',
                serviceReason: 'Cambio de llantas',
                status: 'CONFIRMADA'
              })
            },
            {
              id: 'req_008',
              customer: new Customer({
                fullName: 'Carmen Silva Jiménez',
                phone: '988-111-999',
                email: 'carmen.silva@email.com'
              }),
              vehicle: new Vehicle({
                licensePlate: 'STU-258',
                brand: 'Ford',
                model: 'Fiesta'
              }),
              appointment: new Appointment({
                date: '2024-11-21',
                time: '15:20',
                serviceReason: 'Diagnóstico electrónico',
                status: 'EN_PROCESO'
              })
            }
          ];

          // Mapear los datos mockeados a la estructura esperada por la tabla
          this.itemsArray = mockData.map(item => {
            // Crear el objeto AppointmentRequest para mantener la estructura del modelo
            const request = new AppointmentRequest(item);
            
            // Agregar propiedades calculadas para la tabla (campos esenciales para resumen)
            return {
              ...request,
              id: item.id,
              // Campos esenciales del cliente
              customerName: item.customer?.fullName || 'Cliente no especificado',
              customerPhone: item.customer?.phone || 'N/A',
              customerEmail: item.customer?.email || 'N/A',
              
              // Campos esenciales del vehículo
              vehiclePlate: item.vehicle?.licensePlate || 'N/A',
              vehicleBrand: item.vehicle ? `${item.vehicle.brand || ''} ${item.vehicle.model || ''}`.trim() : 'N/A',
              
              // Campos esenciales de la cita
              appointmentDate: item.appointment?.date || '',
              appointmentTime: item.appointment?.time || '',
              serviceReason: item.appointment?.serviceReason || 'Servicio general',
              status: item.appointment?.status || 'PENDIENTE',
              
              // Fecha normalizada para filtros
              appointmentDateNormalized: this.normalizeDateForComparison(item.appointment?.date),
              
              // Mantener referencia al objeto completo para usar en detalles
              fullData: item
            };
          });

          console.log('Solicitudes de servicio procesadas (datos mockeados):', this.itemsArray);

        } catch (error) {
          this.itemsArray = []; // Limpiar datos en caso de error
          this.handleServerError(error, 'las solicitudes de servicio');
        } finally {
          this.loading = false;
        }
      }, 800); // Simular 800ms de delay para mostrar el loading
    }

  },

  created() {
    // Cargar datos al inicializar el componente
    this.getAll();
  }

};

</script>

<template>
  <pv-toast />

  <div class="h-full overflow-hidden flex flex-column p-4">

    <!-- Título de la página -->
    <h2 class="text-3xl font-bold mb-2">{{ $t('service_requests.title') }}</h2>
    <p>{{ $t('service_requests.subtitle') }}</p>

    <data-manager
        :items="itemsArray"
        :filtered-items="filteredItemsArray"
        :global-filter-value="globalFilterValue"
        :columns="columns"
        :title="title"
        :loading="loading"
        :dynamic="true"
        :show-new="false"
        :show-delete="true"
        :show-export="true"
        :show-selection="true"
        :show-actions="true"
        :show-action-buttons="true"
        :rows="10"
        :rows-per-page-options="[5, 10, 15, 20, 50]"
        :new-button-label="$t('service_requests.new_request')"
        :delete-button-label="$t('service_requests.delete')"
        :export-button-label="$t('service_requests.export')"
        :search-placeholder="$t('service_requests.search_placeholder')"
        @new-item-requested-manager="onNewItemRequested"
        @delete-selected-items-requested-manager="onDeleteSelectedItems"
        @delete-item-requested-manager="onDeleteItem"
        @edit-item-requested-manager="onEditItem"
        @view-item-requested-manager="onViewItem"
        @row-select="onRowSelect"
        @row-unselect="onRowUnselect"
        @global-filter-change="onGlobalFilterChange"
        @clear-filters="onClearFilters"
    >
      <!-- Filtro personalizado para el estado y fecha -->
      <template #filters="{ clearFilters }" >
        <div class="flex align-items-center gap-2">
          <pv-dropdown
              v-model="selectedStatus"
              :options="statusOptions"
              option-label="label"
              option-value="value"
              :placeholder="$t('service_requests.status_filter_placeholder')"
              class="flex-1 h-full"
          />
          <!-- Filtro por fecha -->
          <pv-calendar
              id="appointmentDate"
              v-model="selectedDate"
              :placeholder="$t('common.date_format')"
              dateFormat="dd/mm/yy"
              show-icon
              class="flex-1 h-full"
          />
          <!-- Botón para limpiar filtros específicos -->
          <pv-button
              :label="$t('service_requests.clear_filters')"
              icon="pi pi-filter-slash"
              @click="onClearFilters()"
              class="p-button-secondary flex-shrink-0 h-full"
          />
        </div>
      </template>

      <!-- Template para el campo "status" -->
      <template #status="{ data }">
        <pv-tag
            :value="data.status"
            :severity="getStatusSeverity(data.status)"
            class="text-sm"
        />
      </template>

      <!-- Template para el campo "appointmentDate" -->
      <template #appointmentDate="{ data }">
        <span>{{ formatDate(data.appointmentDate) }}</span>
      </template>

    </data-manager>

  </div>

</template>

<style scoped>
/* Estilos usando variables CSS corporativas */
.text-orange-500 {
  color: var(--color-warning) !important;
}

/* Los estilos de botones ahora son globales en style.css */

/* Los estilos de input y dropdown ahora son globales en style.css */

/* Los estilos de tags y checkboxes ahora son globales en style.css */

/* Los estilos de botones de acción, paginador, tabla y toolbar ahora son globales en style.css */

</style>