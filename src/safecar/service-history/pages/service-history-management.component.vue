<script>

import DataManager from "../../../shared/components/data-manager.component.vue";
import {MaintenanceRecord, Vehicle, PartReplaced, TelematicSnapshot} from "../models/maintenance-history.entity.js";

export default {
  name: 'service-history-management',
  components: {DataManager},

  data(){
    return {

      itemsArray:[],

      columns: [
        { field: 'vehiclePlate', header: 'Placa', sortable: true, style: 'width: 120px;' },
        { field: 'vehicleBrand', header: 'Vehículo', sortable: true, style: 'width: 180px;' },
        { field: 'ownerName', header: 'Propietario', sortable: true, style: 'width: 180px;' },
        { field: 'serviceType', header: 'Tipo de Servicio', sortable: true, style: 'width: 200px;' },
        { field: 'serviceDate', header: 'Fecha Servicio', sortable: true, template: 'serviceDate', style: 'width: 140px;' },
        { field: 'mileageKm', header: 'Kilometraje', sortable: true, template: 'mileage', style: 'width: 120px;' },
        { field: 'serviceCenter', header: 'Centro de Servicio', sortable: true, style: 'width: 200px;' },
      ],

      globalFilterValue: '', // Valor del filtro global de búsqueda
      selectedDate: null, // Fecha seleccionada en el filtro
      selectedServiceType: null, // Tipo de servicio seleccionado en el filtro
      serviceTypeOptions: [      // Opciones de tipo de servicio para el filtro
        { label: 'Todos', value: null },
        { label: 'Mantenimiento Preventivo', value: 'MANTENIMIENTO_PREVENTIVO' },
        { label: 'Reparación Mayor', value: 'REPARACION_MAYOR' },
        { label: 'Cambio de Aceite', value: 'CAMBIO_ACEITE' },
        { label: 'Revisión Técnica', value: 'REVISION_TECNICA' },
        { label: 'Diagnóstico', value: 'DIAGNOSTICO' },
        { label: 'Reparación de Frenos', value: 'REPARACION_FRENOS' },
      ],

      title: {
        singular: 'historial de servicio',
        plural: 'historiales de servicio',
      },

      loading: false,

    }
  },

  computed: {
    // Filtro combinado que aplica todos los filtros activos
    filteredItemsArray() {
      let filtered = [...this.itemsArray]; // Copia del array original para filtrar sin mutar el original

      // Filtro por búsqueda global (placa, vehículo, propietario, tipo de servicio, centro de servicio)
      // Solo aplicar filtro si hay contenido real (no null, no undefined, no string vacío o solo espacios)
      if (this.globalFilterValue && this.globalFilterValue.trim().length > 0) {
        // Normalizar el término de búsqueda: quitar espacios extra y convertir a minúsculas
        const searchTerm = this.globalFilterValue.toLowerCase().trim().replace(/\s+/g, ' ');
        filtered = filtered.filter(record =>
          (record.vehiclePlate && record.vehiclePlate.toLowerCase().trim().replace(/\s+/g, ' ').includes(searchTerm)) ||
          (record.vehicleBrand && record.vehicleBrand.toLowerCase().trim().replace(/\s+/g, ' ').includes(searchTerm)) ||
          (record.ownerName && record.ownerName.toLowerCase().trim().replace(/\s+/g, ' ').includes(searchTerm)) ||
          (record.serviceType && record.serviceType.toLowerCase().trim().replace(/\s+/g, ' ').includes(searchTerm)) ||
          (record.serviceCenter && record.serviceCenter.toLowerCase().trim().replace(/\s+/g, ' ').includes(searchTerm))
        );
      }

      // Filtro por tipo de servicio seleccionado
      if (this.selectedServiceType) {
        filtered = filtered.filter(record => record.serviceType === this.selectedServiceType);
      }

      // Filtro por fecha seleccionada (corregido para zona horaria)
      if (this.selectedDate) {
        const selectedDateStr = this.dateToComparableString(this.selectedDate);
        if (selectedDateStr) {
          filtered = filtered.filter(record => {
            const recordDateStr = this.normalizeDateForComparison(record.serviceDate);
            return recordDateStr === selectedDateStr;
          });
        }
      }

      return filtered;
    }
  },

  methods: {

    onNewItemRequested() {
      console.log('Crear nuevo historial de servicio');
      // Implementar navegación a formulario de creación
    },

    onDeleteSelectedItems(selectedItems) {
      console.log('Eliminar historiales seleccionados:', selectedItems);
      // Implementar lógica de eliminación múltiple
      selectedItems.forEach(item => {
        const index = this.itemsArray.findIndex(record => record.id === item.id);
        if (index > -1) {
          this.itemsArray.splice(index, 1);
        }
      });
    },

    onDeleteItem(item) {
      console.log('Eliminar historial:', item);
      // Implementar lógica de eliminación individual
      const index = this.itemsArray.findIndex(record => record.id === item.id);
      if (index > -1) {
        this.itemsArray.splice(index, 1);
      }
    },

    onEditItem(item) {
      console.log('Editar historial:', item);
      // Implementar navegación a formulario de edición
    },

    onViewItem(item) {
      console.log('Ver detalles de historial:', item);
      // Navegar a vista de detalles pasando el ID del historial
      this.$router.push({ 
        name: 'service-history-details', 
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
      this.selectedServiceType = null;
      this.selectedDate = null;
    },

    onGlobalFilterChange(value) {
      this.globalFilterValue = value || '';
    },

    getServiceTypeSeverity(serviceType) {
      switch (serviceType) {
        case 'MANTENIMIENTO_PREVENTIVO':
          return 'success';
        case 'REPARACION_MAYOR':
          return 'danger';
        case 'CAMBIO_ACEITE':
          return 'info';
        case 'REVISION_TECNICA':
          return 'warn';
        case 'DIAGNOSTICO':
          return 'info';
        case 'REPARACION_FRENOS':
          return 'warn';
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

    formatMileage(mileage) {
      if (!mileage) return 'N/A';
      return `${parseInt(mileage).toLocaleString()} km`;
    },

    formatCost(cost) {
      if (!cost) return 'N/A';
      return `S/ ${parseFloat(cost).toFixed(2)}`;
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
          // Datos mockeados para historiales de servicio
          const mockData = [
            {
              id: 'hist_001',
              vehicle: new Vehicle({
                licensePlate: 'ABC-123',
                brand: 'Toyota',
                model: 'Corolla',
                year: 2020,
                vin: '1HGBH41JXMN109186',
                ownerName: 'Carlos Rodríguez López'
              }),
              maintenanceHistory: [
                new MaintenanceRecord({
                  serviceId: 'SRV-001',
                  serviceType: 'MANTENIMIENTO_PREVENTIVO',
                  date: '2024-11-10',
                  mileageKm: 45000,
                  serviceCenter: 'Taller Central Lima',
                  technician: 'Juan Pérez',
                  partsReplaced: [
                    new PartReplaced({ name: 'Filtro de aceite', brand: 'Toyota', partNumber: 'TO-001', quantity: 1, unit: 'unidad' }),
                    new PartReplaced({ name: 'Aceite motor 5W30', brand: 'Mobil', partNumber: 'MB-5W30', quantity: 4, unit: 'litros' })
                  ],
                  cost: 250.00,
                  observations: 'Mantenimiento preventivo completo realizado según cronograma.',
                  telematicSnapshot: new TelematicSnapshot({
                    engineTempC: 92,
                    batteryVoltage: 12.6,
                    oilPressurePsi: 45,
                    fuelLevelPercent: 75,
                    faultCodes: []
                  })
                })
              ]
            },
            {
              id: 'hist_002',
              vehicle: new Vehicle({
                licensePlate: 'XYZ-789',
                brand: 'Honda',
                model: 'Civic',
                year: 2019,
                vin: '2HGFC2F59KH542318',
                ownerName: 'Ana María Fernández'
              }),
              maintenanceHistory: [
                new MaintenanceRecord({
                  serviceId: 'SRV-002',
                  serviceType: 'REPARACION_FRENOS',
                  date: '2024-11-08',
                  mileageKm: 62000,
                  serviceCenter: 'AutoServicio Norte',
                  technician: 'Miguel Torres',
                  partsReplaced: [
                    new PartReplaced({ name: 'Pastillas de freno delanteras', brand: 'Brembo', partNumber: 'BR-001', quantity: 1, unit: 'juego' }),
                    new PartReplaced({ name: 'Líquido de frenos DOT4', brand: 'Bosch', partNumber: 'BS-DOT4', quantity: 1, unit: 'litro' })
                  ],
                  cost: 320.00,
                  observations: 'Reemplazo de pastillas de freno por desgaste excesivo.',
                  telematicSnapshot: new TelematicSnapshot({
                    engineTempC: 88,
                    batteryVoltage: 12.4,
                    oilPressurePsi: 42,
                    fuelLevelPercent: 50,
                    faultCodes: ['P0301']
                  })
                })
              ]
            },
            {
              id: 'hist_003',
              vehicle: new Vehicle({
                licensePlate: 'DEF-456',
                brand: 'Nissan',
                model: 'Sentra',
                year: 2021,
                vin: '3N1AB7AP8KL123456',
                ownerName: 'Miguel Torres Sánchez'
              }),
              maintenanceHistory: [
                new MaintenanceRecord({
                  serviceId: 'SRV-003',
                  serviceType: 'CAMBIO_ACEITE',
                  date: '2024-11-05',
                  mileageKm: 25000,
                  serviceCenter: 'Express Lube',
                  technician: 'Roberto Silva',
                  partsReplaced: [
                    new PartReplaced({ name: 'Aceite sintético 0W20', brand: 'Castrol', partNumber: 'CT-0W20', quantity: 4.5, unit: 'litros' }),
                    new PartReplaced({ name: 'Filtro de aceite', brand: 'Nissan', partNumber: 'NS-002', quantity: 1, unit: 'unidad' })
                  ],
                  cost: 180.00,
                  observations: 'Cambio de aceite rutinario a los 25,000 km.',
                  telematicSnapshot: new TelematicSnapshot({
                    engineTempC: 90,
                    batteryVoltage: 12.8,
                    oilPressurePsi: 48,
                    fuelLevelPercent: 85,
                    faultCodes: []
                  })
                })
              ]
            },
            {
              id: 'hist_004',
              vehicle: new Vehicle({
                licensePlate: 'GHI-321',
                brand: 'Hyundai',
                model: 'Elantra',
                year: 2018,
                vin: 'KMHD14LA5JA123789',
                ownerName: 'Patricia Vega Cruz'
              }),
              maintenanceHistory: [
                new MaintenanceRecord({
                  serviceId: 'SRV-004',
                  serviceType: 'REVISION_TECNICA',
                  date: '2024-11-12',
                  mileageKm: 78000,
                  serviceCenter: 'CITV Surquillo',
                  technician: 'Carlos Mendoza',
                  partsReplaced: [],
                  cost: 45.00,
                  observations: 'Revisión técnica vehicular aprobada sin observaciones.',
                  telematicSnapshot: new TelematicSnapshot({
                    engineTempC: 85,
                    batteryVoltage: 12.3,
                    oilPressurePsi: 40,
                    fuelLevelPercent: 30,
                    faultCodes: []
                  })
                })
              ]
            },
            {
              id: 'hist_005',
              vehicle: new Vehicle({
                licensePlate: 'JKL-654',
                brand: 'Chevrolet',
                model: 'Spark',
                year: 2017,
                vin: 'KL1GM52E5HB123456',
                ownerName: 'Roberto Mendoza Villa'
              }),
              maintenanceHistory: [
                new MaintenanceRecord({
                  serviceId: 'SRV-005',
                  serviceType: 'REPARACION_MAYOR',
                  date: '2024-11-01',
                  mileageKm: 95000,
                  serviceCenter: 'Mecánica Especializada',
                  technician: 'Fernando García',
                  partsReplaced: [
                    new PartReplaced({ name: 'Bomba de agua', brand: 'Gates', partNumber: 'GT-WP001', quantity: 1, unit: 'unidad' }),
                    new PartReplaced({ name: 'Termostato', brand: 'Chevrolet', partNumber: 'CH-TH001', quantity: 1, unit: 'unidad' }),
                    new PartReplaced({ name: 'Refrigerante', brand: 'Prestone', partNumber: 'PR-RF001', quantity: 3, unit: 'litros' })
                  ],
                  cost: 850.00,
                  observations: 'Reparación del sistema de refrigeración por sobrecalentamiento.',
                  telematicSnapshot: new TelematicSnapshot({
                    engineTempC: 105,
                    batteryVoltage: 11.9,
                    oilPressurePsi: 35,
                    fuelLevelPercent: 60,
                    faultCodes: ['P0217', 'P0128']
                  })
                })
              ]
            },
            {
              id: 'hist_006',
              vehicle: new Vehicle({
                licensePlate: 'MNO-987',
                brand: 'Kia',
                model: 'Rio',
                year: 2022,
                vin: 'KNADM4A39NJ123456',
                ownerName: 'Lucía Ramírez Herrera'
              }),
              maintenanceHistory: [
                new MaintenanceRecord({
                  serviceId: 'SRV-006',
                  serviceType: 'DIAGNOSTICO',
                  date: '2024-11-14',
                  mileageKm: 18000,
                  serviceCenter: 'Diagnóstico Computarizado',
                  technician: 'Andrea López',
                  partsReplaced: [],
                  cost: 120.00,
                  observations: 'Diagnóstico completo por luz check engine intermitente.',
                  telematicSnapshot: new TelematicSnapshot({
                    engineTempC: 87,
                    batteryVoltage: 12.7,
                    oilPressurePsi: 46,
                    fuelLevelPercent: 90,
                    faultCodes: ['P0420']
                  })
                })
              ]
            }
          ];

          // Aplanar los datos para mostrar cada registro de mantenimiento como una fila
          this.itemsArray = [];
          
          mockData.forEach(historyData => {
            historyData.maintenanceHistory.forEach(record => {
              this.itemsArray.push({
                id: record.serviceId,
                // Datos del vehículo
                vehiclePlate: historyData.vehicle.licensePlate,
                vehicleBrand: `${historyData.vehicle.brand} ${historyData.vehicle.model} (${historyData.vehicle.year})`,
                ownerName: historyData.vehicle.ownerName,
                // Datos del servicio
                serviceType: record.serviceType,
                serviceDate: record.date,
                mileageKm: record.mileageKm,
                serviceCenter: record.serviceCenter,
                technician: record.technician,
                cost: record.cost,
                observations: record.observations,
                // Fecha normalizada para filtros
                serviceDateNormalized: this.normalizeDateForComparison(record.date),
                // Mantener referencia completa
                fullVehicle: historyData.vehicle,
                fullRecord: record
              });
            });
          });

          console.log('Historiales de servicio procesados (datos mockeados):', this.itemsArray);

        } catch (error) {
          this.itemsArray = []; // Limpiar datos en caso de error
          this.handleServerError(error, 'los historiales de servicio');
        } finally {
          this.loading = false;
        }
      }, 900); // Simular 900ms de delay para mostrar el loading
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
    <h2 class="text-3xl font-bold mb-2"> Historial de Servicios Vehiculares </h2>
    <p> Registro completo de mantenimientos y reparaciones realizadas a los vehículos </p>

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
        new-button-label="Nuevo Historial"
        delete-button-label="Eliminar"
        export-button-label="Exportar"
        search-placeholder="Busca por placa, vehículo, propietario, tipo de servicio, centro..."
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
      <!-- Filtro personalizado para el tipo de servicio y fecha -->
      <template #filters="{ clearFilters }" >
        <div class="flex align-items-center gap-2">
          <pv-dropdown
              v-model="selectedServiceType"
              :options="serviceTypeOptions"
              option-label="label"
              option-value="value"
              placeholder="Tipo: Todos"
              class="flex-1 h-full"
          />
          <!-- Filtro por fecha -->
          <pv-calendar
              id="serviceDate"
              v-model="selectedDate"
              placeholder="dd/mm/aaaa"
              dateFormat="dd/mm/yy"
              show-icon
              class="flex-1 h-full"
          />
          <!-- Botón para limpiar filtros específicos -->
          <pv-button
              label="Limpiar filtros"
              icon="pi pi-filter-slash"
              @click="onClearFilters()"
              class="p-button-secondary flex-shrink-0 h-full"
          />
        </div>
      </template>

      <!-- Template para el campo "serviceDate" -->
      <template #serviceDate="{ data }">
        <span>{{ formatDate(data.serviceDate) }}</span>
      </template>

      <!-- Template para el campo "mileage" -->
      <template #mileage="{ data }">
        <span>{{ formatMileage(data.mileageKm) }}</span>
      </template>

      <!-- Template para el campo "cost" -->
      <template #cost="{ data }">
        <span class="font-medium" style="color: var(--color-success);">{{ formatCost(data.cost) }}</span>
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