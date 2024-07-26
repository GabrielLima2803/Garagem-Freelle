import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import MarcaApi from '@/services/marcas.js' 

const marcaApi = new MarcaApi()

export const useMarcaStore = defineStore('marcas', () => {
  const state = reactive({
    marcas: []
  })

  const marcas = computed(() => state.marcas)

  const getAllMarcas = async () => {
    try {
      const data = await marcaApi.buscarTodasAsMarcas()
      state.marcas = data
    } catch (error) {
      console.error('Failed to fetch marcas:', error)
    }
  }

  const createMarca = async (marcaData) => {
    try {
      const data = await marcaApi.adicionarMarca(marcaData)
      state.marcas.push(data)
    } catch (error) {
      console.error('Failed to create marca:', error)
    }
  }

  const deleteMarca = async (id) => {
    try {
      await marcaApi.excluirMarca(id)
      state.marcas = state.marcas.filter((marca) => marca.id !== id)
    } catch (error) {
      console.error('Failed to delete marca:', error)
    }
  }

  const updateMarca = async (id, marcaData) => {
    try {
      const updatedMarca = await marcaApi.atualizarMarca({ id, ...marcaData })
      const index = state.marcas.findIndex((marca) => marca.id === id)
      if (index !== -1) {
        state.marcas[index] = updatedMarca
      }
    } catch (error) {
      console.error('Failed to update marca:', error)
    }
  }

  return { marcas, getAllMarcas, createMarca, deleteMarca, updateMarca }
})