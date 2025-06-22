<script setup>
  import { RouterView } from 'vue-router'
  import LayoutsWeb from "./components/Layouts/LayoutWeb.vue";
</script>

<template>
  <LayoutsWeb>
    <router-view />
  </LayoutsWeb>
</template>