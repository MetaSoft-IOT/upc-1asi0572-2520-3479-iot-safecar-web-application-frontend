<template>
  <div class="tarjeta-solicitud">
    <div class="header-solicitud">
      <h3>{{ solicitud.cliente }}</h3>
      <span class="estado" :class="solicitud.estado">{{ solicitud.estado }}</span>
    </div>
    <div class="info-vehiculo">
      <p><strong>Vehículo:</strong> {{ solicitud.vehiculo.marca }} {{ solicitud.vehiculo.modelo }}</p>
      <p><strong>Placa:</strong> {{ solicitud.vehiculo.placa }}</p>
    </div>
    <div class="descripcion-trabajo">
      <p><strong>Trabajo solicitado:</strong> {{ solicitud.descripcion }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TarjetaSolicitud',
  props: {
    solicitud: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.tarjeta-solicitud {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.header-solicitud {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.estado {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: bold;
}

.estado.pendiente {
  background-color: #fff3cd;
  color: #856404;
}

.estado.en-proceso {
  background-color: #cce5ff;
  color: #004085;
}

.estado.completado {
  background-color: #d4edda;
  color: #155724;
}
</style>