<template>
  <div class="lista-solicitudes">
    <h2>Solicitudes de Servicio</h2>
    <p>Lista de solicitudes de servicio del taller</p>
    <!-- Aquí irá la lista de solicitudes -->
  </div>
</template>

<script>
export default {
  name: 'ListaSolicitudes',
  data() {
    return {
      solicitudes: []
    }
  },
  methods: {
    cargarSolicitudes() {
      // Lógica para cargar solicitudes desde API
    }
  },
  mounted() {
    this.cargarSolicitudes()
  }
}
</script>

<style scoped>
.lista-solicitudes {
  padding: 20px;
}
</style>