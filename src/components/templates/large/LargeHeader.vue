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
          <router-link :to="{ name: 'home' }"> <i class="mdi mdi-home"> </i></router-link> |
          <router-link to="/categorias">Categorias</router-link> |
          <div v-if="authStore.loggedIn">
            <router-link to="/logout">Logout</router-link> | {{ authStore.user.email }}
          </div>
          <router-link v-else to="/login">Login</router-link> |
          <router-link to="/cores">Cores</router-link> |
          <router-link to="/acessorios">Acessório</router-link> |
          <router-link to="/marcas">Marca</router-link> |
          <router-link to="/veiculos">Veículos</router-link> |
          <router-link to="/modelos">Modelos</router-link> 
        </div>
      </div>
    </header>

  <div class="icons">
    <i class="mdi mdi-magnify" />
    <i class="mdi mdi-account-circle-outline" />
    <i class="mdi mdi-cart-outline" />
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