<script setup>
import { ref, onMounted } from 'vue'
import { useModeloStore } from '@/stores/modelos'
import { useMarcaStore } from '@/stores/marcas'
import { useCategoriasStore } from '@/stores/categorias'

const modeloStore = useModeloStore()
const marcaStore = useMarcaStore()
const categoriaStore = useCategoriasStore()

const modelo = ref({ nome: '', marca: null, categoria: null })
const modelos = ref([])
const marcas = ref([])
const categorias = ref([])

const salvar = async () => {
  try {
    if (modelo.value.id) {
      await modeloStore.updateModelo(modelo.value.id, modelo.value)
    } else {
      await modeloStore.createModelo(modelo.value)
    }
    await AtualizarInformações()
    limpar()
  } catch (error) {
    console.error('Erro ao salvar o modelo:', error)
  }
}

const limpar = () => {
  modelo.value = { nome: '', marca: null, categoria: null }
}

const excluir = async (id) => {
  try {
    await modeloStore.deleteModelo(id)
    await AtualizarInformações()
  } catch (error) {
    console.error('Erro ao excluir o modelo:', error)
  }
}

const editar = (modeloItem) => {
  modelo.value = { ...modeloItem }
}

const AtualizarInformações = async () => {
  try {
    await modeloStore.getAllModelos()
    modelos.value = modeloStore.modelos || []
    await categoriaStore.getAllCategorias()
    categorias.value = categoriaStore.categorias || []
    await marcaStore.getAllMarcas()
    marcas.value = marcaStore.marcas || []
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error)
  }
}

onMounted(async () => {
  await AtualizarInformações()
})
</script>

<template>
  <h1>Modelo</h1>
    <div class="form">
    <input type="text" v-model="modelo.nome" placeholder="Nome" />
    <select v-model="modelo.marca">
      <option value="" disabled>Selecione uma marca</option>
      <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
        {{ marca.nome }}
      </option>
    </select>
    <select v-model="modelo.categoria">
      <option value="" disabled>Selecione uma categoria</option>
      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
        {{ categoria.descricao }}
      </option>
    </select>
    <div class="form-buttons">
      <button @click="salvar" class="gap">Salvar</button>
      <button @click="limpar">Limpar</button>
    </div>
  </div>
  <ul>
    <li v-for="modeloItem in modelos" :key="modeloItem.id">
      <span @click="editar(modeloItem)">
        ({{ modeloItem.id }}) - {{ modeloItem.nome }} - 
        Marca: {{ marcaStore.marcas.find(m => m.id === modeloItem.marca)?.nome || 'Não disponível' }} - 
        Categoria: {{ categoriaStore.categorias.find(c => c.id === modeloItem.categoria)?.descricao || 'Não disponível' }}
      </span>
      <button @click="excluir(modeloItem.id)">X</button>
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
}

.form input, select {
  padding: 12px 15px;
  margin-bottom: 12px;
  border: 1px solid #bbb;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #f9f9f9;
  color: #333;
  font-size: 16px;
}

.form input:focus, select:focus {
  border-color: #888;
  box-shadow: 0 0 5px rgba(136, 136, 136, 0.5);
  outline: none;
}

.form input::placeholder, select::placeholder {
  color: #aaa;
}

.form-buttons {
  display: flex;
  justify-content: center;
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
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

li button:hover {
  background-color: #c82333;
}
</style>