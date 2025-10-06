<script>


export default {
  name: "sign-in",

  data() {
    return {
      username: '',
      password: '',
      isAuthenticated: false,
      touched: {
        username: false,
        password: false
      }
    };
  },

  methods: {
    onSignIn() {
      // Marcar todos los campos como tocados al intentar enviar
      this.touched.username = true;
      this.touched.password = true;

      // Validar que ambos campos estén llenos
      if (!this.username || !this.password) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Por favor, completa todos los campos.', life: 3000 });
        return;
      }

      // Aquí iría la lógica real de autenticación
      // Simulación de autenticación exitosa
      this.isAuthenticated = true;
      this.$toast.add({ severity: 'success', summary: 'Éxito', detail: 'Inicio de sesión exitoso.', life: 3000 });
      this.$router.push( { name: 'dashboard' } );
    },

    onUsernameBlur() {
      this.touched.username = true;
    },

    onPasswordBlur() {
      this.touched.password = true;
    }
  }
}

</script>

<template>


  <pv-toast></pv-toast>

  <div class="login-container flex w-full h-screen p-4"  >

    <!-- ================================ PANEL 01  -->
    <div class="w-6 h-full flex flex-column justify-content-center align-items-center border-round-xl"
         style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-hover) 100%);">

      <!-- Main Content Card -->
      <pv-card class="w-full text-center bg-transparent border-none shadow-none">

        <!-- Main Content -->
        <template #content>
          <div class="flex flex-column gap-5">

            <!-- Title Section -->
            <div class="px-3">
              <h1 class="text-xl md:text-4xl font-bold text-white line-height-3 m-0 pb-3">
                "Conectamos tecnología e innovación para revolucionar tu taller"
              </h1>

              <p class="text-base text-white font-light m-0 line-height-3 ">
                Soluciones IoT inteligentes para la gestión moderna de servicios automotrices
              </p>
            </div>

            <!-- Image Section -->
            <div class="flex justify-content-center">
              <pv-card class="bg-white-alpha-10 border-none shadow-2">
                <template #content>
                  <img src="../../../assets/img/sign-in.jpg"
                       class="w-full max-w-20rem"
                       alt="SafeCar IoT Solutions" />
                </template>
              </pv-card>
            </div>

            <!-- Technology Badges -->
            <div class="flex justify-content-center flex-wrap gap-3">
              <pv-tag class="bg-white-alpha-20 text-white border-round-3xl px-4 py-2">
                <template #default>
                  <div class="flex align-items-center gap-2">
                    <i class="pi pi-wifi"></i>
                    <span class="font-semibold">IoT</span>
                  </div>
                </template>
              </pv-tag>

              <pv-tag class="bg-white-alpha-20 text-white border-round-3xl px-4 py-2">
                <template #default>
                  <div class="flex align-items-center gap-2">
                    <i class="pi pi-cloud"></i>
                    <span class="font-semibold">Cloud</span>
                  </div>
                </template>
              </pv-tag>

              <pv-tag class="bg-white-alpha-20 text-white border-round-3xl px-4 py-2">
                <template #default>
                  <div class="flex align-items-center gap-2">
                    <i class="pi pi-mobile"></i>
                    <span class="font-semibold">Smart</span>
                  </div>
                </template>
              </pv-tag>
            </div>

          </div>
        </template>
      </pv-card>
    </div >

    <!-- ================================ PANEL 02  -->
    <div class="flex flex-1 flex-column h-full justify-content-center align-items-center ">

      <div class="w-full max-w-28rem">
        <!-- Card del formulario -->
        <pv-card class="shadow-3">
          <!-- Header del formulario -->

          <template #header>
            <div class="text-center">
              <h1 class="text-4xl font-bold m-0 pt-6">
                <span style="color: var(--color-primary)">Safe</span><span style="color: var(--color-border-cards)">Car</span>
              </h1>
              <p class="text-xl text-600 m-0 pt-2">Acceso al sistema</p>
            </div>
          </template>



          <template #content>
            <form @submit.prevent="onSignIn">
              <div class="p-fluid">

                <!-- Campo de correo electrónico -->
                <div class="field pb-2">
                  <label for="username" class="block text-900 font-medium mb-2">Correo electrónico</label>
                  <pv-input-text
                      id="username"
                      v-model="username"
                      :class="{'p-invalid': touched.username && !username}"
                      class="w-full"
                      placeholder="Ingresa tu correo electrónico"
                      autocomplete="email"
                      @blur="onUsernameBlur"
                  />
                  <small v-if="touched.username && !username" class="p-error block mt-2">
                    El correo electrónico es obligatorio
                  </small>
                </div>

                <!-- Campo de contraseña -->
                <div class="field mb-4">
                  <label for="password" class="block text-900 font-medium mb-2">Contraseña</label>
                  <pv-password
                      id="password"
                      v-model="password"
                      :class="{'p-invalid': touched.password && !password}"
                      class="w-full"
                      input-class="w-full"
                      placeholder="Ingresa tu contraseña"
                      :feedback="false"
                      toggleMask
                      autocomplete="current-password"
                      @blur="onPasswordBlur"
                  />
                  <small v-if="touched.password && !password" class="p-error block mt-2">
                    La contraseña es obligatoria
                  </small>
                </div>

                <!-- Botón de inicio de sesión -->
                <pv-button
                    type="submit"
                    label="Iniciar sesión"
                    icon="pi pi-sign-in"
                    class="w-full mt-4"
                    :disabled="!username || !password"
                />

              </div>
            </form>
          </template>

          <template #footer>
            <!-- Link de registro -->
            <div class="text-center mt-4">
              <p class="text-600 mb-2">¿Aún no tienes una cuenta?</p>
              <router-link to="/elixir-line/sign-up" class="no-underline">
                <pv-button
                    label="Crear cuenta"
                    icon="pi pi-user-plus"
                    class="p-button-outlined w-full"
                />
              </router-link>
            </div>
          </template>
        </pv-card>



      </div>

    </div>

  </div>


</template>

<style scoped>
/* Sin CSS personalizado - Solo PrimeFlex y PrimeVue */
</style>