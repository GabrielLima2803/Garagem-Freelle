import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import ModeloApi from '@/services/modelos.js' 

const modeloApi = new ModeloApi()

export const useModeloStore = defineStore('modelos', () => {
  const state = reactive({
    modelos: []
  })

  const modelos = computed(() => state.modelos)

  const getAllModelos = async () => {
    try {
      const data = await modeloApi.buscarTodasAsModelos()
      state.modelos = data
    } catch (error) {
      console.error('Failed to fetch modelos:', error)
    }
  }

  const createModelo = async (modeloData) => {
    try {
      const data = await modeloApi.adicionarModelo(modeloData)
      state.modelos.push(data)
    } catch (error) {
      console.error('Failed to create modelo:', error)
    }
  }

  const deleteModelo = async (id) => {
    try {
      await modeloApi.excluirModelo(id)
      state.modelos = state.modelos.filter((modelo) => modelo.id !== id)
    } catch (error) {
      console.error('Failed to delete modelo:', error)
    }
  }

  const updateModelo = async (id, modeloData) => {
    try {
      const updatedModelo = await modeloApi.atualizarModelo({ id, ...modeloData })
      const index = state.modelos.findIndex((modelo) => modelo.id === id)
      if (index !== -1) {
        state.modelos[index] = updatedModelo
      }
    } catch (error) {
      console.error('Failed to update modelo:', error)
    }
  }

  return { modelos, getAllModelos, createModelo, deleteModelo, updateModelo }
})