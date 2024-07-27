<script setup></script>
<template>
  <footer class="footer">
    <div class="top-section">
      <div class="links">
        <h6>Garagem Freelle</h6>
      </div>
      <div class="icons">
        <i class="mdi mdi-facebook" />
        <i class="mdi mdi-twitter" />
        <i class="mdi mdi-instagram" />
      </div>
    </div>
    <hr />
    <div class="copyright">
      <h6>© 2024 FREELLE ©Copyright 2024 FREELLE.</h6>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  background-color: #fff; /* Fundo branco */
  width: 100%;
  position: relative;
}

.top-section {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 3rem;
}

.links {
  font-size: 1.2rem;
  color: #000;
}

.icons {
  display: flex;
  gap: 1.5rem;
  font-size: 1.2rem;
}

i:hover{
  color: #333;
}

hr {
  width: 100%;
  border: 0;
  border-top: 1px solid #000;
  margin: 1rem 0;
}

.copyright {
  text-align: center;
  font-size: 1rem;
  color: #333;
  width: 100%;
  padding-bottom: 1rem;
}
</style>
