import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import CategoriasApi from '@/services/categorias.js' 

const categoriasApi = new CategoriasApi()

export const useCategoriasStore = defineStore('categorias', () => {
  const state = reactive({
    categorias: []
  })

  const categorias = computed(() => state.categorias)

  const getAllCategorias = async () => {
    try {
      const data = await categoriasApi.buscarTodasAsCategorias()
      state.categorias = data
    } catch (error) {
      console.error('Failed to fetch categorias:', error)
    }
  }

  const createCategoria = async (categoriaData) => {
    try {
      const data = await categoriasApi.adicionarCategoria(categoriaData)
      state.categorias.push(data)
    } catch (error) {
      console.error('Failed to create categoria:', error)
    }
  }

  const deleteCategoria = async (id) => {
    try {
      await categoriasApi.excluirCategoria(id)
      state.categorias = state.categorias.filter((categoria) => categoria.id !== id)
    } catch (error) {
      console.error('Failed to delete categoria:', error)
    }
  }

  const updateCategoria = async (id, categoriaData) => {
    try {
      const updatedCategoria = await categoriasApi.atualizarCategoria({ id, ...categoriaData })
      const index = state.categorias.findIndex((categoria) => categoria.id === id)
      if (index !== -1) {
        state.categorias[index] = updatedCategoria
      }
    } catch (error) {
      console.error('Failed to update categoria:', error)
    }
  }

  return { categorias, getAllCategorias, createCategoria, deleteCategoria, updateCategoria }
})