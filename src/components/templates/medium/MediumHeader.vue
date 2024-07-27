<script setup>
import { useAuthStore } from '@/stores/auth';
import '@mdi/font/css/materialdesignicons.css';
import LogoTitle from '@/components/templates/LogoTitle.vue';

const authStore = useAuthStore();
</script>

<template>
  <header>
    <div class="header-content">
      <div class="logo">
        <logo-title class="pl-0" />
      </div>
      <div class="links">
        <router-link :to="{ name: 'home' }"><i class="mdi mdi-home"></i></router-link> |
        <router-link to="/categorias"><i class="mdi mdi-shape-plus"></i></router-link> |
        <router-link v-if="authStore.loggedIn" to="/logout"><i class="mdi mdi-account-remove"></i></router-link>
        <span v-if="authStore.loggedIn">{{ authStore.user.email }}</span>
        <router-link v-else to="/login"><i class="mdi mdi-account"></i></router-link> |
        <router-link to="/cores"><i class="mdi mdi-format-color-fill"></i></router-link> |
        <router-link to="/acessorios"><i class="mdi mdi-key-variant"></i></router-link> |
        <router-link to="/marcas"><i class="mdi mdi-drawing-box"></i></router-link> |
        <router-link to="/veiculos"><i class="mdi mdi-car"></i></router-link> |
        <router-link to="/modelos"><i class="mdi mdi-car-wash"></i></router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #fff; 
  border-bottom: 1px solid #ddd;
  padding: 1rem 2rem; 
  display: flex;
  justify-content: center;
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%; 
  max-width: 1200px; 
}

.logo {
  flex: 0 1 auto;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-right: 1.5rem;
}

.links {
  flex: 1;
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  gap: 1rem; 
}

i:hover{
  color: #333;
}

.links a {
  text-decoration: none; 
  color: #333; 
  font-weight: 500; 
}

.links a:hover {
  color: #a0a0a0; 
}
</style>
