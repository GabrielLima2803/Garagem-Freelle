<script setup></script>

<template>
  <div class="icons">
    <i class="mdi mdi-magnify" />
    <router-link to="/login">
        <i class="icon mdi mdi-account" /> 
      </router-link>
  </div>
</template>

<style scoped>
.icons {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.7rem;
}
</style>