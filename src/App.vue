<template>
  <router-view />
</template>

<script>
  import { defineComponent, onMounted, onUnmounted } from 'vue';
  import { App } from '@capacitor/app';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'App',
    setup() {
      const router = useRouter();

      const handleBackButton = () => {
        if (router.currentRoute.value.fullPath !== '/home') {
          $router.go(-1); // Volta para a página anterior
        } else {
          App.exitApp(); // Fecha o app se estiver na página inicial
        }
      };

      onMounted(() => {
        App.addListener('backButton', handleBackButton);
      });

      onUnmounted(() => {
        App.removeListener('backButton', handleBackButton);
      });
    }
  });
</script>
