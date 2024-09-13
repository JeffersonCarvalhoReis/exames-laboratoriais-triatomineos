<template>
  <div>
    <q-drawer v-model="internalDrawer" side="left" overlay elevated @input="updateDrawer">
      <div class="menuLeft">
        <div class="drawer-content">
          <q-list>
            <q-item clickable v-ripple @click="updateDrawer(false)">
              <q-item-section>
                <i class="fa-solid fa-xmark"></i>
              </q-item-section>
            </q-item>
            <q-separator />

            <q-item clickable v-ripple @click=" navigate('/home')">
              <q-item-section>
                Início
              </q-item-section>
            </q-item>
            <q-separator />

            <q-item clickable v-ripple @click="navigate('/novo-exame')">
              <q-item-section>
                Novo Exame
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple @click="navigate('/verificar-exames')">
              <q-item-section>
                Verificar Exames
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple @click="navigate('/editar-perfil')">
              <q-item-section>
                Editar Perfil
              </q-item-section>
            </q-item>
            <q-separator />

          </q-list>
        </div>
        <q-separator />
        <div class="drawer-footer">
          <q-item clickable v-ripple @click="onLogout">
            <q-item-section>
              Logout
            </q-item-section>
            <q-icon class="icone" name="logout" />
          </q-item>
        </div>
      </div>
    </q-drawer>
  </div>



</template>

<script>
  import { useAuthStore } from 'src/stores/auth';
  export default {
    props: {
      drawer: {
        type: Boolean,
        Required: true
      }
    },
    data() {
      return {
        internalDrawer: this.drawer
      };
    },
    watch: {
      drawer(val) {
        this.internalDrawer = val;
      },
      internalDrawer(val) {
        this.$emit('update:drawer', val);
      }
    },
    methods: {
      async onLogout() {
        const auth = useAuthStore();
        console.log("Tentando fazer logout...");
        try {
          await auth.logout()
          console.log("Logout bem-sucedido");
        } catch (error) {
          console.error('Erro ao fazer logout', error);
        }
      },

      updateDrawer(val) {
        this.internalDrawer = val;
      },
      navigate(route) {
        this.$router.push(route);
        this.internalDrawer = false;
        this.updateDrawer(false)// Fecha o drawer após navegação
      }
    }
  };
</script>

<style scoped>

  .menuLeft {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .drawer-content {
    flex: 1;
  }

  .drawer-footer {
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
  }

  .icone {
    font-size: 2rem;
  }
</style>
