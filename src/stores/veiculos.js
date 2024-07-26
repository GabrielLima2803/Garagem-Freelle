// stores/veiculosStore.js
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import VeiculoApi from '@/services/veiculos.js';

const veiculoApi = new VeiculoApi();

export const useVeiculoStore = defineStore('veiculos', () => {
  const state = reactive({
    veiculos: []
  });

  const veiculos = computed(() => state.veiculos);

  const getAllVeiculos = async () => {
    try {
      const data = await veiculoApi.buscarTodosOsVeiculos();
      state.veiculos = data;
    } catch (error) {
      console.error('Falha ao buscar veículos:', error);
    }
  };

  const createVeiculo = async (veiculoData) => {
    try {
      const data = await veiculoApi.adicionarVeiculo(veiculoData);
      state.veiculos.push(data);
    } catch (error) {
      console.error('Falha ao adicionar veículo:', error);
    }
  };

  const deleteVeiculo = async (id) => {
    try {
      await veiculoApi.excluirVeiculo(id);
      state.veiculos = state.veiculos.filter((veiculo) => veiculo.id !== id);
    } catch (error) {
      console.error('Falha ao excluir veículo:', error);
    }
  };

  const updateVeiculo = async (id, veiculoData) => {
    try {
      const updatedVeiculo = await veiculoApi.atualizarVeiculo({ id, ...veiculoData });
      const index = state.veiculos.findIndex((veiculo) => veiculo.id === id);
      if (index !== -1) {
        state.veiculos[index] = updatedVeiculo;
      }
    } catch (error) {
      console.error('Falha ao atualizar veículo:', error);
    }
  };

  return { veiculos, getAllVeiculos, createVeiculo, deleteVeiculo, updateVeiculo };
});