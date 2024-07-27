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
        <router-link to="/categorias">Categorias</router-link> |
        <router-link v-if="authStore.loggedIn" to="/logout">Logout</router-link>
        <span v-if="authStore.loggedIn">{{ authStore.user.email }}</span>
        <router-link v-else to="/login">Login</router-link> |
        <router-link to="/cores">Cores</router-link> |
        <router-link to="/acessorios">Acessório</router-link> |
        <router-link to="/marcas">Marca</router-link> |
        <router-link to="/veiculos">Veículos</router-link> |
        <router-link to="/modelos">Modelos</router-link>
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
  margin-right: 150px;
}

.links {
  flex: 1;
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  gap: 1rem; 
}

.links a {
  text-decoration: none; 
  color: #333; 
  font-weight: 500; 
}

.links a:hover {
  color: #a0a0a0; 
}

.icons {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.7rem;
}

.icons i {
  cursor: pointer;
  transition: color 0.3s; 
}

.icons i:hover {
  color: #007bff; 
}
</style>
