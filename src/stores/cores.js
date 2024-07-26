import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import CoresApi from '@/services/cores.js' 

const coresApi = new CoresApi()

export const useCoresStore = defineStore('cores', () => {
  const state = reactive({
    cores: []
  })

  const cores = computed(() => state.cores)

  const getAllCores = async () => {
    try {
      const data = await coresApi.buscarTodasAsCores()
      state.cores = data
    } catch (error) {
      console.error('Failed to fetch cores:', error)
    }
  }

  const createCor = async (corData) => {
    try {
      const data = await coresApi.adicionarCores(corData)
      state.cores.push(data)
    } catch (error) {
      console.error('Failed to create cor:', error)
    }
  }

  const deleteCor = async (id) => {
    try {
      await coresApi.excluirCores(id)
      state.cores = state.cores.filter((cor) => cor.id !== id)
    } catch (error) {
      console.error('Failed to delete cor:', error)
    }
  }

  const updateCor = async (id, corData) => {
    try {
      const updatedCor = await coresApi.atualizarCores({ id, ...corData })
      const index = state.cores.findIndex((cor) => cor.id === id)
      if (index !== -1) {
        state.cores[index] = updatedCor
      }
    } catch (error) {
      console.error('Failed to update cor:', error)
    }
  }

  return { cores, getAllCores, createCor, deleteCor, updateCor }
})