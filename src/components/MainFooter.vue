<template>
  <q-footer class="bg-grey-8 text-white">
    <div class="text-center q-pa-sm">
      &copy; {{ currentYear }} Secretaria Municipal de Saúde de Itaguaçu da Bahia - BA
    </div>
  </q-footer>
</template>

<script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    }
  };
</script>
