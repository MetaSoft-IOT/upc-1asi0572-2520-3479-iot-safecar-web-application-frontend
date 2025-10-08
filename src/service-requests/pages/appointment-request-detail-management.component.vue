<script>

import AppointmentRequestDescription from "../components/appointment-request-description.component.vue";
import AppointmentRequestActions from "../components/appointment-request-actions.component.vue";
import {AppointmentRequestApiService} from "../services/appointment-request-api.service.js";
import {AppointmentRequest} from "../models/appointment-request.entity.js";

export default {
  name: 'appointment-request-detail-management',
  components: {AppointmentRequestActions, AppointmentRequestDescription},



  data() {
    return {

      // Servicio para obtener detalles de la cita por ID
      appointmentRequestApiService: new AppointmentRequestApiService('/appointments'),

      statusOptions: [
        { label: 'Todos', value: null },
        { label: 'Pendiente', value: 'PENDIENTE' },
        { label: 'Confirmada', value: 'CONFIRMADA' },
        { label: 'En Proceso', value: 'EN_PROCESO' },
        { label: 'Completada', value: 'COMPLETADA' },
        { label: 'Cancelada', value: 'CANCELADA' }
      ],

      mechanicsArray: [],

      // Item de la cita obtenido de la API
      item: null,

      // Estados de carga
      isLoading: true,
      hasError: false,
      errorMessage: '',
      
      // Progreso de carga
      loadingStep: 0,
      loadingSteps: [
        { icon: 'pi-file-o', label: 'Datos de la cita' },
        { icon: 'pi-users', label: 'Información del cliente' },
        { icon: 'pi-car', label: 'Detalles del vehículo' },
        { icon: 'pi-cog', label: 'Información del servicio' }
      ],

    };
  },


  methods : {

    onDownloadDocument (payload) {
      // Lógica para descargar documento
      console.log(`Descargar documento: ${payload.type} para la cita ${payload.item.id}`);
      // Aquí iría la lógica real de descarga
    },

    // Formatear fecha para mostrar
    formatDate(dateString) {
      if (!dateString) return 'No disponible';
      
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
        if (isNaN(dateToFormat.getTime())) return 'Fecha inválida';
        
        // Formatear como dd/mm/aaaa usando los métodos locales
        const day = dateToFormat.getDate().toString().padStart(2, '0');
        const month = (dateToFormat.getMonth() + 1).toString().padStart(2, '0');
        const year = dateToFormat.getFullYear();
        
        return `${day}/${month}/${year}`;
      } catch (error) {
        console.error('Error al formatear fecha:', error);
        return 'Fecha inválida';
      }
    },

    getAppointmentDetailsById(appointmentId) {
      // Lógica para obtener detalles de la cita por ID
      console.log(`Obtener detalles de la cita con ID: `, appointmentId);
      
      this.isLoading = true;
      this.hasError = false;
      this.loadingStep = 0;
      
      // Simular progreso de carga
      this.simulateLoadingProgress();
      
      this.appointmentRequestApiService.getAll().then(response => {


        // Filtrar el response para asignar el item correcto
        const appointmentData = response.data.find(app => app.appointmentId === appointmentId);

        this.item = appointmentData ? new AppointmentRequest(appointmentData) : null;
          
          // Completar todos los pasos
          this.loadingStep = this.loadingSteps.length;
          
          // Mostrar mensaje de éxito después de un breve delay
          setTimeout(() => {
            this.isLoading = false;
            console.log('Detalles de la cita obtenidos:', this.item);
          }, 300);
        })
        .catch(error => {
          console.error('Error al obtener detalles de la cita:', error);
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = 'Error al cargar los detalles de la cita. Por favor, intente nuevamente.';
        });

    },

    simulateLoadingProgress() {
      // Simular progreso paso a paso para mejor UX
      const progressInterval = setInterval(() => {
        if (this.loadingStep < this.loadingSteps.length - 1) {
          this.loadingStep++;
        } else {
          clearInterval(progressInterval);
        }
      }, 600); // Cambiar paso cada 600ms
      
      // Limpiar intervalo si la carga se completa antes
      setTimeout(() => {
        clearInterval(progressInterval);
      }, 4000);
    },

    // Obtener lista de mecánicos disponibles (mock por ahora)
    getAllMechanics() {
      // Lógica para obtener lista de mecánicos activos
      console.log('Obtener lista de mecánicos disponibles');
      
      // Mock data para mecánicos
      this.mechanicsArray = [
        {
          id: 'mech_001',
          fullName: 'Carlos Méndez',
          specialization: 'Motor y transmisión',
          contactNumber: '999-888-777',
          email: 'carlos.mendez@safecar.com',
          status: 'DISPONIBLE'
        },
        {
          id: 'mech_002', 
          fullName: 'Ana García',
          specialization: 'Frenos y suspensión',
          contactNumber: '999-777-666',
          email: 'ana.garcia@safecar.com',
          status: 'DISPONIBLE'
        },
        {
          id: 'mech_003',
          fullName: 'Luis Torres',
          specialization: 'Sistema eléctrico',
          contactNumber: '999-666-555',
          email: 'luis.torres@safecar.com',
          status: 'OCUPADO'
        }
      ];

      console.log('Lista de mecánicos obtenida:', this.mechanicsArray);
    },

    // Manejar actualizaciones de la cita desde componentes hijos
    onAppointmentUpdated(updatedAppointment) {
      this.item = updatedAppointment;
      console.log('Cita actualizada:', updatedAppointment);
      
      // Opcional: mostrar mensaje de éxito
      this.$toast?.add({
        severity: 'success',
        summary: 'Cita Actualizada',
        detail: 'Los datos de la cita han sido actualizados correctamente',
        life: 3000
      });
    },

  },



  created() {
    // Obtener ID de la cita desde la ruta
    const appointmentId = this.$route.query.id;
    
    console.log(`Cargar detalles de la cita con ID: ${appointmentId}`);

    // Inicializar servicios
    this.appointmentRequestApiService = new AppointmentRequestApiService('/appointments');

    if (appointmentId) {
      this.getAppointmentDetailsById(appointmentId);
    } else {
      this.hasError = true;
      this.errorMessage = 'ID de cita no proporcionado en la URL.';
    }

    // Cargar lista de mecánicos disponibles
    this.getAllMechanics();
  },


};


</script>

<template>

  <!-- Detalles de la cita de servicio (se divide en cards tipo grid)-->
  <div class="appointment-container flex flex-column p-4 h-full w-full overflow-auto " >

    <!-- Breadcrumb -->
    <div class="text-base">
      <router-link
          :to="{ name: 'appointment-request' }"
          class="font-bold text-gray-900 no-underline hover:underline cursor-pointer"
      >
        Solicitudes de Servicio
      </router-link>
      <span class="text-gray-500 font-bold"> / </span>
      <span class="text-blue-700 font-bold hover:underline cursor-pointer">
        detalle de cita
      </span>
    </div>

    <!-- ID de cita a la izquierda y fecha de solicitud a la derecha -->
    <div class="flex align-content-center justify-content-between  mt-4 mb-2" v-if="item">
      <!-- Izquierda -->
      <h2 class="text-2xl xl:font-bold font-extrabold text-gray-900">
        Código de cita: <span class="text-blue-700 xl:font-bold "> {{ item.appointmentId || 'No disponible' }}</span>
      </h2>

      <!-- Derecha -->
      <span class="font-medium text-gray-900">
        Fecha de solicitud: {{ formatDate(item.appointmentDetails?.requestDate) }}
      </span>
    </div>


    <!-- Estado de carga minimalista -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-content">
        <!-- Spinner elegante -->
        <pv-progress-spinner
            size="48"
            stroke-width="4"
            animation-duration="1.2s"
            class="loading-spinner"
        />

        <!-- Contenido textual simple -->
        <div class="loading-text">
          <h3 class="loading-title">Cargando cita de servicio</h3>
          <p class="loading-subtitle">{{ loadingSteps[loadingStep]?.label || 'Preparando datos...' }}</p>
        </div>
      </div>
    </div>


    <!-- Grid de detalles de la cita (con dos columnas: izquierda más ancha, derecha más estrecha) -->
    <div v-else-if="item" class="appointment-content flex gap-4 h-full w-full">

      <!-- Columna izquierda (2/3 del ancho) -->
      <div class="flex flex-column gap-4" style="flex: 2;">
        <appointment-request-description
            :item="item"
            @download-document="onDownloadDocument"
        />
      </div>

      <!-- Columna derecha (1/3 del ancho) -->
      <div class="flex flex-column gap-4" style="flex: 1;">
        <appointment-request-actions
            :item="item"
            :available-mechanics="mechanicsArray"
            @appointment-updated="onAppointmentUpdated"
        />
      </div>

    </div>

  </div>


</template>

<style scoped>

</style>