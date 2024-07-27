<script setup>
import { ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const showMenu = ref(false)
const authStore = useAuthStore()

onBeforeRouteUpdate(() => {
  showMenu.value = false
})
</script>

<template>
  <div id="footerMenu" :style="{ display: showMenu ? 'block' : 'none' }">
    <div class="links">
      <router-link to="/categorias">Categorias</router-link> 
      <router-link v-if="authStore.loggedIn" to="/logout">Logout</router-link>
      <span v-if="authStore.loggedIn">{{ authStore.user.email }}</span>
      <router-link v-else to="/login">Login</router-link> 
      <router-link to="/cores">Cores</router-link> 
      <router-link to="/acessorios">Acessório</router-link> 
      <router-link to="/marcas">Marca</router-link> 
      <router-link to="/veiculosSmall">Veículos</router-link> 
      <router-link to="/modelos">Modelos</router-link>
    </div>
  </div>
  <div class="icons">
    <router-link :to="{ name: 'home' }">
      <i class="mdi mdi-home-outline"></i>
      Home
    </router-link>
    <router-link to="/login">
      <i class="mdi mdi-account-circle-outline"></i>
      Perfil
    </router-link>
    <router-link to="/">
      <i class="mdi mdi-cart-outline"></i>
      Carrinho
    </router-link>
    <div class="hamburger" @click="showMenu = !showMenu">
      <i class="mdi mdi-menu"></i>
      Menu
    </div>
  </div>
</template>

<style scoped>
#footerMenu {
  position: fixed;
  bottom: 15%;
  right: 0;
  width: 20%;
  border-top: #eeeeee 1px solid;
  background-color: white;
  display: block;
  padding: 1rem;
}

#footerMenu .links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

#footerMenu a {
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: #282828;
  font-size: 1rem;
  transition: color 0.3s;
}

.icons {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.icons a,
.icons .hamburger {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #282828;
  font-size: 1rem;
  transition: color 0.3s;
}

.hamburger:hover {
  cursor: pointer;
}
</style>
