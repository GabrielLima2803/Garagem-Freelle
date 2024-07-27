<script setup>
  import LargeHeader from '@/components/templates/large/LargeHeader.vue';
  import LargeFooter from '@/components/templates/large/LargeFooter.vue';
</script>
<template>
  <div id="layout-large">
    <header>
      <large-header />
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <large-footer />
    </footer>
  </div>
</template>
<style scoped>
#layout-large {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  width: 100%;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem; 
  width: 100%;
}

main {
  flex-grow: 1;
  padding: 3rem 2rem; 
  width: 100%;
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  width: 100%;
}
</style>
