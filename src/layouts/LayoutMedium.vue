<script setup>
import MediumHeader from '@/components/templates/medium/MediumHeader.vue';
import MediumFooter from '@/components/templates/medium/MediumFooter.vue';
</script>

<template>
  <div id="layout-medium">
    <header>
      <medium-header />
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <medium-footer />
    </footer>
  </div>
</template>

<style scoped>
#layout-medium {
  display: grid;
  grid-template-columns: 0.3fr 5.5fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'aside header'
    'aside main'
    'aside footer';
  min-height: 100vh;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;
  grid-area: header;
  width: 100%;
}

main {
  min-height: 80%;
  padding: 2rem;
  grid-area: main;
}

footer {
  display: flex;
  justify-content: center; 
  align-items: center; 
  padding: 1.5rem;
  grid-area: footer;
  width: 100%; 
}
</style>
