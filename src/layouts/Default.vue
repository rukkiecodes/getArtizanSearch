<template>
  <v-app class="bg-indigo-lighten-5">
    <default-bar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useAppStore } from '@/store/app'
import DefaultBar from './AppBar.vue'
import { onMounted } from "vue";

const app = useAppStore()

onMounted(() => {
  app.getCategories()
  app.getLocation()
})
</script>
