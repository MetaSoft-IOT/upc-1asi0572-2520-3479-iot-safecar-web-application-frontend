<script>

import {VehicleApiService} from "@/vehicle-management/services/vehicle-api.service.js";

export default {
  name: 'vehicle-management',

  data() {
      return {
        // Servicio de API
        vehicleApiService: new VehicleApiService(),

        itemsArray: [],

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



}

</script>

<template>

</template>

<style scoped>

</style>