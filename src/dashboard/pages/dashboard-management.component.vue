<script>

import ModuleUnderDevelopment from "@/public/components/module-under-development.component.vue";

export default {
  name: 'dashboard-management',
  components: {ModuleUnderDevelopment},
  data() {
    return {
      // Datos específicos del dashboard
    };
  },
  methods: {
    // Métodos específicos del dashboard
  }
};


</script>

<template>

  <div class="dashboard-management">

    <module-under-development
        :module-name="$t('dashboard.module_name')"
        :estimated-date="'26/10/2025'"
        :show-progress="true"
        :progress-percentage="15"
    />

  </div>

</template>

<style scoped>

</style>