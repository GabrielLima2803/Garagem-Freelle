<script setup>
import { ref, onMounted } from 'vue'
import { useCoresStore } from '@/stores/cores'

const coresStore = useCoresStore()

const cor = ref({ nome: '' })
const cores = ref([])

const salvar = async () => {
  try {
    if (cor.value.id) {
      await coresStore.updateCor(cor.value.id, cor.value)
    } else {
      await coresStore.createCor(cor.value)
    }
    await AtualizarInformações()
    limpar()
  } catch (error) {
    console.error('Erro ao salvar a cor:', error)
  }
}

const limpar = () => {
  cor.value = { nome: '' }
}

const excluir = async (id) => {
  try {
    await coresStore.deleteCor(id)
    await AtualizarInformações()
  } catch (error) {
    console.error('Erro ao excluir a cor:', error)
  }
}

const editar = (corItem) => {
  cor.value = { ...corItem }
}

const AtualizarInformações = async () => {
  try {
    await coresStore.getAllCores()
    cores.value = coresStore.cores
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error)
  }
}

onMounted(async () => {
  await AtualizarInformações()
})
</script>

<template>
  <h1>Cores</h1>
  <div class="form">
    <input type="text" v-model="cor.nome" placeholder="Nome" />
    <div class="form-buttons">
      <button @click="salvar" class="gap">Salvar</button>
      <button @click="limpar">Limpar</button>
    </div>
  </div>
  <ul>
    <li v-for="corItem in cores" :key="corItem.id">
      <span @click="editar(corItem)">
        ({{ corItem.id }}) - {{ corItem.nome }}
      </span>
      <button @click="excluir(corItem.id)">X</button>
    </li>
  </ul>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  padding: 20px;
}

.gap {
  margin-right: 10px;
  margin-left: 10px;
}

.form {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form input[type="text"] {
  padding: 12px 15px;
  margin-bottom: 12px;
  border: 1px solid #bbb;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #f9f9f9;
  color: #333;
  font-size: 16px;
}

.form input[type="text"]:focus {
  border-color: #888;
  box-shadow: 0 0 5px rgba(136, 136, 136, 0.5);
  outline: none;
}

.form input[type="text"]::placeholder {
  color: #aaa;
}

.form-buttons {
  display: flex;
  gap: 10px;
}

.form button {
  width: 70px;
  height: 35px;
  background-color: #888;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form button:hover {
  background-color: #3c3c3c;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;
}

li:hover {
  background-color: #fff;
  transform: translateY(-5px);
}

li span {
  cursor: pointer;
  margin-right: 10px;
}

li span:hover {
  text-decoration: underline;
}

li button {
  padding: 3px 6px;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

li button:hover {
  background-color: #4e4a4a;
}
</style>