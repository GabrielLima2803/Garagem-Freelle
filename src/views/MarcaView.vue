<script setup>
import { ref, onMounted } from 'vue'
import { useMarcaStore } from '@/stores/marcas'

const marcaStore = useMarcaStore()

const marca = ref({ nome: '', nacionalidade: '' || null })
const marcas = ref([])

const salvar = async () => {
  try {
    if (marca.value.id) {
      await marcaStore.updateMarca(marca.value.id, marca.value)
    } else {
      await marcaStore.createMarca(marca.value)
    }
    await AtualizarInformações()
    limpar()
  } catch (error) {
    console.error('Erro ao salvar a marca:', error)
  }
}

const limpar = () => {
  marca.value = { nome: '', nacionalidade: '' }
}

const excluir = async (id) => {
  try {
    await marcaStore.deleteMarca(id)
    await AtualizarInformações()
  } catch (error) {
    console.error('Erro ao excluir a marca:', error)
  }
}

const editar = (marcaItem) => {
  marca.value = { ...marcaItem }
}

const AtualizarInformações = async () => {
  try {
    await marcaStore.getAllMarcas()
    marcas.value = marcaStore.marcas
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error)
  }
}

onMounted(async () => {
  await AtualizarInformações()
})
</script>

<template>
  <h1>Marca</h1>
  <div class="form">
    <input type="text" v-model="marca.nome" placeholder="Nome" />
    <input type="text" v-model="marca.nacionalidade" placeholder="Nacionalidade" />
    <div class="form-buttons">
      <button @click="salvar" class="gap">Salvar</button>
      <button @click="limpar">Limpar</button>
    </div>
  </div>
  <ul>
    <li v-for="marcaItem in marcas" :key="marcaItem.id">
      <span @click="editar(marcaItem)">
        ({{ marcaItem.id }}) - {{ marcaItem.nome }} - {{ marcaItem.nacionalidade }}
      </span>
      <button @click="excluir(marcaItem.id)">X</button>
    </li>
  </ul>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  color: #333;
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