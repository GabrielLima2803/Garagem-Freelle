import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import AcessorioService from '@/services/acessorios.js'

const acessorioService = new AcessorioService()

export const useAcessorioStore = defineStore('acessorios', () => {
  const state = reactive({
    acessorios: []
  })

  const acessorios = computed(() => state.acessorios)

  const getAllAcessorios = async () => {
    try {
      const data = await acessorioService.buscarTodosAcessorios() 
      state.acessorios = data
    } catch (error) {
      console.error('Failed to fetch acessorios:', error)
    }
  }

  const createAcessorio = async (acessorioData) => {
    try {
      const data = await acessorioService.adicionarAcessorio(acessorioData)
      state.acessorios.push(data)
    } catch (error) {
      console.error('Failed to create acessorio:', error)
    }
  }

  const deleteAcessorio = async (id) => {
    try {
      await acessorioService.excluirAcessorio(id)
      state.acessorios = state.acessorios.filter((acessorio) => acessorio.id !== id)
    } catch (error) {
      console.error('Failed to delete acessorio:', error)
    }
  }

  const updateAcessorio = async (id, acessorioData) => {
    try {
      const updatedAcessorio = await acessorioService.atualizarAcessorio({ id, ...acessorioData })
      const index = state.acessorios.findIndex((acessorio) => acessorio.id === id)
      if (index !== -1) {
        state.acessorios[index] = updatedAcessorio
      }
    } catch (error) {
      console.error('Failed to update acessorio:', error)
    }
  }

  return { acessorios, getAllAcessorios, createAcessorio, deleteAcessorio, updateAcessorio }
})