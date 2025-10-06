// Servicio para gestión de solicitudes de servicio
class SolicitudesService {
  constructor() {
    this.baseUrl = '/api/solicitudes'
  }

  async obtenerSolicitudes() {
    try {
      const response = await fetch(`${this.baseUrl}`)
      return await response.json()
    } catch (error) {
      console.error('Error al obtener solicitudes:', error)
      throw error
    }
  }

  async crearSolicitud(solicitud) {
    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(solicitud)
      })
      return await response.json()
    } catch (error) {
      console.error('Error al crear solicitud:', error)
      throw error
    }
  }

  async actualizarEstadoSolicitud(id, estado) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado })
      })
      return await response.json()
    } catch (error) {
      console.error('Error al actualizar estado:', error)
      throw error
    }
  }

  async asignarMecanico(solicitudId, mecanicoId) {
    try {
      const response = await fetch(`${this.baseUrl}/${solicitudId}/asignar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mecanicoId })
      })
      return await response.json()
    } catch (error) {
      console.error('Error al asignar mecánico:', error)
      throw error
    }
  }
}

export default new SolicitudesService()