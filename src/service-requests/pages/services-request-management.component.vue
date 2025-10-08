<script>

import DataManager from "../../shared/components/data-manager.component.vue";
import {AppointmentRequest, Customer, Vehicle, AppointmentRequestDetails} from "../models/appointment-request.entity.js";
import {AppointmentRequestApiService} from "@/service-requests/services/appointment-request-api.service.js";

export default {
  name: 'services-request-management',
  components: {DataManager},

  data(){
    return {

      // Servicio de API
      appointmentRequestApiService: new AppointmentRequestApiService(),

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



    getAll() {
      this.loading = true;
      
      this.appointmentRequestApiService.getAll().then(response => {

        console.log('Solicitudes de servicio cargadas desde API:', response);

        // Mapear los datos de la API a la estructura esperada por la tabla
        this.itemsArray = response.data.map(item => new AppointmentRequest(item));

        console.log('Solicitudes de servicio cargadas desde API:', this.itemsArray);

      }).catch(error => {
        this.itemsArray = []; // Limpiar datos en caso de error
        this.handleServerError(error, 'las solicitudes de servicio');
      }).finally(() => {
        this.loading = false;
      });
    }

  },

  created() {
    this.appointmentRequestApiService = new AppointmentRequestApiService('/appointments')

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