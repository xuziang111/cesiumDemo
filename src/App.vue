<script setup>
import cesiumeMap from './components/cesiumeMap.vue'
import sidebarMenu from './components/sidebarMenu.vue'
import * as Cesium from 'cesium';
import { onMounted } from 'vue';

</script>

<template>
  <sidebarMenu></sidebarMenu>
  <cesiumeMap></cesiumeMap>
</template>

<style scoped>

</style>
