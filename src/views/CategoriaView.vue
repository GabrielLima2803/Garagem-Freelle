<script setup>
import { ref, onMounted } from 'vue'
import { useCategoriasStore } from '@/stores/categorias' 

const categoriaStore = useCategoriasStore()

const categoria = ref({ descricao: '' })
const categorias = ref([]) 

const salvar = async () => {
  try {
    if (categoria.value.id) {
      await categoriaStore.updateCategoria(categoria.value.id, categoria.value)
    } else {
      await categoriaStore.createCategoria(categoria.value)
    }
    await AtualizarInformações()  
    limpar()
  } catch (error) {
    console.error('Erro ao salvar a categoria:', error)
  }
}

const AtualizarInformações = async () => {
  try {
    await categoriaStore.getAllCategorias()
    categorias.value = categoriaStore.categorias  
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error)
  }
}

const limpar = () => {
  categoria.value = { descricao: '' }
}

const excluir = async (id) => {
  try {
    await categoriaStore.deleteCategoria(id)
    await AtualizarInformações()  
  } catch (error) {
    console.error('Erro ao excluir a categoria:', error)
  }
}

const editar = (categoriaItem) => {
  categoria.value = { ...categoriaItem }
}

onMounted(async () => {
  await AtualizarInformações()
})
</script>

<template>
  <h1>Categoria</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="categoria.descricao" placeholder="Descrição" />
    <div class="form-buttons">
      <button @click="salvar" class="gap">Salvar</button>
      <button @click="limpar">Limpar</button>
    </div>
  </div>
  <hr />
  <ul>
    <li v-for="categoriaItem in categorias" :key="categoriaItem.id">
      <span @click="editar(categoriaItem)">
        ({{ categoriaItem.id }}) - {{ categoriaItem.descricao }}
      </span>
      <button @click="excluir(categoriaItem.id)">X</button>
    </li>
  </ul>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
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
  flex-direction: row;
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