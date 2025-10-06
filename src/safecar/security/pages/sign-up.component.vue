<script>
export default {
  name: "sign-up",

  data() {
    return {
      // Datos del Taller
      nombreTaller: '',
      ruc: '',
      razonSocial: '',
      direccionTaller: '',
      correoTaller: '',
      telefonoTaller: '',

      // Datos del Propietario / Cuenta
      nombrePropietario: '',
      password: '',
      confirmPassword: '',
      aceptarTerminos: false,

      touched: {
        nombreTaller: false,
        ruc: false,
        razonSocial: false,
        direccionTaller: false,
        correoTaller: false,
        telefonoTaller: false,
        nombrePropietario: false,
        password: false,
        confirmPassword: false,
        aceptarTerminos: false
      }
    };
  },

  computed: {
    isFormValid() {
      return this.nombreTaller &&
             this.ruc &&
             this.razonSocial &&
             this.direccionTaller &&
             this.correoTaller &&
             this.telefonoTaller &&
             this.nombrePropietario &&
             this.password &&
             this.confirmPassword &&
             this.aceptarTerminos &&
             this.password === this.confirmPassword;
    },

    passwordsMatch() {
      return this.password === this.confirmPassword;
    }
  },

  methods: {
    onSignUp() {
      // Marcar todos los campos como tocados
      Object.keys(this.touched).forEach(key => {
        this.touched[key] = true;
      });

      // Validar campos obligatorios
      if (!this.isFormValid) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Por favor, completa todos los campos correctamente.', life: 3000 });
        return;
      }

      // Validar que las contraseñas coincidan
      if (!this.passwordsMatch) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden.', life: 3000 });
        return;
      }

      // Validar términos y condiciones
      if (!this.aceptarTerminos) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Debes aceptar los términos y condiciones.', life: 3000 });
        return;
      }

      // Simular registro exitoso
      this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Registro exitoso. Ahora puedes iniciar sesión.', life: 3000 });

      // Redirigir al login después del registro
      setTimeout(() => {
        this.$router.push({ name: 'sign-in' });
      }, 2000);
    },

    onFieldBlur(fieldName) {
      this.touched[fieldName] = true;
    },

    goToSignIn() {
      this.$router.push({ name: 'sign-in' });
    },

    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<template>
  <pv-toast></pv-toast>

  <div class="w-full h-screen overflow-auto" style="background-color: var(--color-background);">
    <!-- Header simplificado -->
    <div class="flex align-items-center py-3 px-4 shadow-2 sticky top-0 z-5" style="background-color: var(--color-white); border-bottom: 1px solid var(--color-border-cards);">
      <!-- Flecha para regresar -->
      <pv-button
          icon="pi pi-arrow-left"
          class="p-button-text p-button-rounded p-button-sm mr-3"
          @click="goBack"
          style="color: var(--color-primary);"
      />

      <!-- Título centrado -->
      <div class="flex-1 text-center">
        <h1 class="text-2xl font-bold m-0" style="color: var(--color-text-gray);">
          <span style="color: var(--color-primary);">Safe</span><span style="color: var(--color-border-cards);">Car</span>
        </h1>
      </div>
      
      <!-- Espacio para equilibrar el botón de la izquierda -->
      <div style="width: 2.5rem;"></div>
    </div>

    <!-- Formulario -->
    <div class="p-4 pb-6 md:px-6 lg:px-8 xl:px-12 max-w-6xl mx-auto">
      <form @submit.prevent="onSignUp">
        <div class="p-fluid">

          <!-- Sección: Información del Taller -->
          <div class="border-round-lg p-4 mb-5" style="background-color: var(--color-card-background); border: var(--border-width) solid var(--color-border-cards); box-shadow: var(--shadow);">
            <div class="flex align-items-center gap-3 mb-4 pb-3" style="border-bottom: 1px solid var(--color-border-cards);">
              <div class="border-circle w-3rem h-3rem flex align-items-center justify-content-center" style="background-color: var(--color-primary);">
                <i class="pi pi-building text-xl" style="color: var(--color-white);"></i>
              </div>
              <div>
                <h3 class="font-semibold m-0" style="color: var(--color-primary);">Información del Taller</h3>
                <p class="text-sm m-0" style="color: var(--color-muted);">Datos comerciales y de contacto</p>
              </div>
            </div>

            <!-- Fila principal: Nombre + RUC + Razón Social en una sola fila -->
            <div class="grid mb-3">
              <div class="col-12 lg:col-4">
                <label for="nombreTaller" class="block font-medium mb-2" style="color: var(--color-text-gray);">
                  <i class="pi pi-tag mr-2" style="color: var(--color-primary);"></i>Nombre del taller *
                </label>
                <pv-input-text
                    id="nombreTaller"
                    v-model="nombreTaller"
                    :class="{'p-invalid': touched.nombreTaller && !nombreTaller}"
                    class="w-full"
                    placeholder="Ej: Taller Mecánico Los Pinos"
                    @blur="onFieldBlur('nombreTaller')"
                />
                <small v-if="touched.nombreTaller && !nombreTaller" class="p-error block mt-1">
                  Nombre obligatorio
                </small>
              </div>
              <div class="col-12 lg:col-4">
                <label for="ruc" class="block font-medium mb-2" style="color: var(--color-text-gray);">
                  <i class="pi pi-id-card mr-2" style="color: var(--color-primary);"></i>RUC *
                </label>
                <pv-input-text
                    id="ruc"
                    v-model="ruc"
                    :class="{'p-invalid': touched.ruc && !ruc}"
                    class="w-full"
                    placeholder="20123456789"
                    maxlength="11"
                    @blur="onFieldBlur('ruc')"
                />
                <small v-if="touched.ruc && !ruc" class="p-error block mt-1">
                  RUC obligatorio
                </small>
              </div>
              <div class="col-12 lg:col-4">
                <label for="razonSocial" class="block font-medium mb-2" style="color: var(--color-text-gray);">
                  <i class="pi pi-building-columns mr-2" style="color: var(--color-primary);"></i>Razón social *
                </label>
                <pv-input-text
                    id="razonSocial"
                    v-model="razonSocial"
                    :class="{'p-invalid': touched.razonSocial && !razonSocial}"
                    class="w-full"
                    placeholder="Ej: Servicios Automotrices Los Pinos S.A.C."
                    @blur="onFieldBlur('razonSocial')"
                />
                <small v-if="touched.razonSocial && !razonSocial" class="p-error block mt-1">
                  Razón social obligatoria
                </small>
              </div>
            </div>

            <!-- Fila de contacto: Dirección + Email + Teléfono (proporciones equilibradas) -->
            <div class="grid mb-0">
              <div class="col-12 lg:col-4">
                <label for="direccionTaller" class="block font-medium mb-2" style="color: var(--color-text-gray);">
                  <i class="pi pi-map-marker mr-2" style="color: var(--color-primary);"></i>Dirección *
                </label>
                <pv-input-text
                    id="direccionTaller"
                    v-model="direccionTaller"
                    :class="{'p-invalid': touched.direccionTaller && !direccionTaller}"
                    class="w-full"
                    placeholder="Ej: Av. San Martín 254, Ica"
                    @blur="onFieldBlur('direccionTaller')"
                />
                <small v-if="touched.direccionTaller && !direccionTaller" class="p-error block mt-1">
                  La dirección es obligatoria
                </small>
              </div>
              <div class="col-12 lg:col-4">
                <label for="correoTaller" class="block font-medium mb-2" style="color: var(--color-text-gray);">
                  <i class="pi pi-envelope mr-2" style="color: var(--color-primary);"></i>Email *
                </label>
                <pv-input-text
                    id="correoTaller"
                    v-model="correoTaller"
                    :class="{'p-invalid': touched.correoTaller && !correoTaller}"
                    class="w-full"
                    placeholder="contacto@taller.com"
                    type="email"
                    @blur="onFieldBlur('correoTaller')"
                />
                <small v-if="touched.correoTaller && !correoTaller" class="p-error block mt-1">
                  Email obligatorio
                </small>
              </div>
              <div class="col-12 lg:col-4">
                <label for="telefonoTaller" class="block font-medium mb-2" style="color: var(--color-text-gray);">
                  <i class="pi pi-phone mr-2" style="color: var(--color-primary);"></i>Teléfono *
                </label>
                <pv-input-text
                    id="telefonoTaller"
                    v-model="telefonoTaller"
                    :class="{'p-invalid': touched.telefonoTaller && !telefonoTaller}"
                    class="w-full"
                    placeholder="999 888 777"
                    @blur="onFieldBlur('telefonoTaller')"
                />
                <small v-if="touched.telefonoTaller && !telefonoTaller" class="p-error block mt-1">
                  Teléfono obligatorio
                </small>
              </div>
            </div>
          </div>

          <!-- Sección: Cuenta y Seguridad -->
          <div class="border-round-lg p-4 mb-5" style="background-color: var(--color-card-background); border: var(--border-width) solid var(--color-border-cards); box-shadow: var(--shadow);">
            <div class="flex align-items-center gap-3 mb-4 pb-3" style="border-bottom: 1px solid var(--color-border-cards);">
              <div class="border-circle w-3rem h-3rem flex align-items-center justify-content-center" style="background-color: var(--color-primary);">
                <i class="pi pi-user-plus text-xl" style="color: var(--color-white);"></i>
              </div>
              <div>
                <h3 class="font-semibold m-0" style="color: var(--color-primary);">Cuenta y Seguridad</h3>
                <p class="text-sm m-0" style="color: var(--color-muted);">Credenciales de acceso y responsable</p>
              </div>
            </div>

            <!-- Fila principal: Nombre del propietario + campos adicionales -->
            <div class="grid mb-3">
              <div class="col-12 lg:col-4">
                <label for="nombrePropietario" class="block font-medium mb-2" style="color: var(--color-text-gray);">
                  <i class="pi pi-user mr-2" style="color: var(--color-primary);"></i>Propietario o responsable *
                </label>
                <pv-input-text
                    id="nombrePropietario"
                    v-model="nombrePropietario"
                    :class="{'p-invalid': touched.nombrePropietario && !nombrePropietario}"
                    class="w-full"
                    placeholder="Ej: José Ramírez Huamán"
                    @blur="onFieldBlur('nombrePropietario')"
                />
                <small v-if="touched.nombrePropietario && !nombrePropietario" class="p-error block mt-1">
                  El nombre es obligatorio
                </small>
              </div>
              <div class="col-12 lg:col-4">
                <label for="password" class="block font-medium mb-2" style="color: var(--color-text-gray);">
                  <i class="pi pi-lock mr-2" style="color: var(--color-primary);"></i>Contraseña *
                </label>
                <pv-password
                    id="password"
                    v-model="password"
                    :class="{'p-invalid': touched.password && !password}"
                    class="w-full"
                    input-class="w-full"
                    placeholder="Mínimo 8 caracteres"
                    :feedback="true"
                    toggleMask
                    @blur="onFieldBlur('password')"
                />
                <small v-if="touched.password && !password" class="p-error block mt-1">
                  Contraseña obligatoria
                </small>
              </div>
              <div class="col-12 lg:col-4">
                <label for="confirmPassword" class="block font-medium mb-2" style="color: var(--color-text-gray);">
                  <i class="pi pi-verified mr-2" style="color: var(--color-primary);"></i>Confirmar contraseña *
                </label>
                <pv-password
                    id="confirmPassword"
                    v-model="confirmPassword"
                    :class="{'p-invalid': touched.confirmPassword && (!confirmPassword || !passwordsMatch)}"
                    class="w-full"
                    input-class="w-full"
                    placeholder="Repite la contraseña"
                    :feedback="false"
                    toggleMask
                    @blur="onFieldBlur('confirmPassword')"
                />
                <small v-if="touched.confirmPassword && !confirmPassword" class="p-error block mt-1">
                  Confirma tu contraseña
                </small>
                <small v-else-if="touched.confirmPassword && !passwordsMatch" class="p-error block mt-1">
                  Las contraseñas no coinciden
                </small>
              </div>
            </div>



            <!-- Fila de aceptación: Términos con diseño destacado -->
            <div class="border-round-md p-3 mt-3" style="background-color: var(--bg-info-light); border-left: 3px solid var(--color-primary);">
              <div class="flex align-items-start gap-3">
                <pv-checkbox
                    id="aceptarTerminos"
                    v-model="aceptarTerminos"
                    :class="{'p-invalid': touched.aceptarTerminos && !aceptarTerminos}"
                    binary
                    @change="onFieldBlur('aceptarTerminos')"
                />
                <div class="flex-1">
                  <label for="aceptarTerminos" class="font-medium cursor-pointer" style="color: var(--color-text-gray);">
                    <i class="pi pi-shield mr-2" style="color: var(--color-primary);"></i>
                    Acepto los 
                    <a href="#" class="font-semibold no-underline hover:underline" style="color: var(--color-primary);">
                      términos y condiciones
                    </a> 
                    de uso *
                  </label>
                  <small v-if="touched.aceptarTerminos && !aceptarTerminos" class="block mt-1" style="color: var(--color-error);">
                    Debes aceptar los términos para continuar
                  </small>
                </div>
              </div>
            </div>
          </div>

          <!-- Botón de registro mejorado -->
          <div class="mt-5">
            <pv-button
                type="submit"
                label="Crear Cuenta de Taller"
                icon="pi pi-check-circle"
                class="w-full px-6 py-3 text-lg font-semibold p-button-primary"
                :disabled="!isFormValid"
                style="background-color: var(--color-primary); border-color: var(--color-primary);"
            />
            
            <!-- Indicador de progreso visual -->
            <div class="flex align-items-center justify-content-center gap-2 mt-3" v-if="isFormValid">
              <i class="pi pi-check-circle text-sm" style="color: var(--color-success);"></i>
              <span class="text-sm font-medium" style="color: var(--color-success);">Formulario completo</span>
            </div>
            <div class="flex align-items-center justify-content-center gap-2 mt-3" v-else>
              <i class="pi pi-info-circle text-sm" style="color: var(--color-warning);"></i>
              <span class="text-sm" style="color: var(--color-muted);">Completa todos los campos requeridos</span>
            </div>
          </div>

        
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>


