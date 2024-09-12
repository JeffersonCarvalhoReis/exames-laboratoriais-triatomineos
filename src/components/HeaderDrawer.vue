<template>
  <MainHeader
    @toggle-drawer="toggleLeftDrawer"
    :title="title"
    :exame="exame"
    :excluidos="excluidos"
  />
  <MenuDrawer
    :drawer="leftDrawerOpen"
    @update:drawer="leftDrawerOpen = $event"
  />
</template>

<script>
import MainHeader from "./MainHeader.vue";
import MenuDrawer from "./MenuDrawer.vue";
export default {
  components: { MainHeader, MenuDrawer },
  props: {
    title: {
      type: String,
    },
    exame: {
      type: Boolean,
      default: false,
    },
    excluidos: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
};
</script>

<style></style>
