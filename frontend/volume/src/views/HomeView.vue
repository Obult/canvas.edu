<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';
</script>

<template>
  <div class="home">
    <main>
      <TheWelcome />
    </main>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    align-items: center;
  }
}
</style>