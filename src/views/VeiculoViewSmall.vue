<script setup>
import { ref, onMounted } from 'vue'
import { useVeiculoStore } from '@/stores/veiculos' 
import { useModeloStore } from '@/stores/modelos'
import { useCoresStore } from '@/stores/cores' 
import { useAcessorioStore } from '@/stores/acessorios' 

const veiculoStore = useVeiculoStore()
const modeloStore = useModeloStore()
const corStore = useCoresStore()
const acessorioStore = useAcessorioStore()

const veiculo = ref({ id: null, modelo: null, cor: null, ano: '', preco: '', acessorios: [] })
const veiculos = ref([])
const modelos = ref([])
const cores = ref([])
const acessorios = ref([])

const salvar = async () => {
  try {
    if (veiculo.value.id) {
      await veiculoStore.updateVeiculo(veiculo.value.id, veiculo.value)
    } else {
      await veiculoStore.createVeiculo(veiculo.value)
    }
    await atualizarInformacoes()
    limpar()
  } catch (error) {
    console.error('Erro ao salvar o veículo:', error)
  }
}

const limpar = () => {
  veiculo.value = { id: null, modelo: null, cor: null, ano: '', preco: '', acessorios: [] }
}

const excluir = async (id) => {
  try {
    await veiculoStore.deleteVeiculo(id)
    await atualizarInformacoes()
  } catch (error) {
    console.error('Erro ao excluir o veículo:', error)
  }
}

const editar = (veiculoItem) => {
  veiculo.value = { ...veiculoItem, acessorios: veiculoItem.acessorios.map(a => a.id) }
}

const atualizarInformacoes = async () => {
  try {
    await veiculoStore.getAllVeiculos()
    veiculos.value = veiculoStore.veiculos
    await modeloStore.getAllModelos()
    modelos.value = modeloStore.modelos 
    await corStore.getAllCores()
    cores.value = corStore.cores
    await acessorioStore.getAllAcessorios()
    acessorios.value = acessorioStore.acessorios
  } catch (error) {
    console.error('Erro ao atualizar as informações:', error)
  }
}

onMounted(async () => {
  await atualizarInformacoes()
})
</script>

<template>
  <h1>Veículos</h1>
  <div class="form">
    <div class="form-group">
      <label for="modelo">Modelo:</label>
      <select v-model="veiculo.modelo" required>
        <option value="" disabled>Selecione um modelo</option>
        <option v-for="modelo in modelos" :key="modelo.id" :value="modelo.id">
          {{ modelo.nome }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="cor">Cor:</label>
      <select v-model="veiculo.cor" required>
        <option value="" disabled>Selecione uma cor</option>
        <option v-for="cor in cores" :key="cor.id" :value="cor.id">
          {{ cor.nome }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="ano">Ano:</label>
      <input type="number" v-model="veiculo.ano" required />
    </div>

    <div class="form-group">
      <label for="preco">Preço:</label>
      <input type="number" v-model="veiculo.preco" step="0.01" required />
    </div>

    <div class="form-group">
      <label for="acessorios">Acessórios:</label>
      <select v-model="veiculo.acessorios" multiple class="acessorios">
        <option v-for="acessorio in acessorios" :key="acessorio.id" :value="acessorio.id">
          {{ acessorio.descricao }}
        </option>
      </select>
    </div>

    <div class="form-buttons">
      <button @click="salvar">Salvar</button>
      <button @click="limpar">Limpar</button>
    </div>
  </div>
  <ul>
    <li v-for="veiculoItem in veiculos" :key="veiculoItem.id">
      <span @click="editar(veiculoItem)">
        ({{ veiculoItem.id }}) - Modelo: {{ modelos.find(m => m.id === veiculoItem.modelo)?.nome || 'Não disponível' }} - 
        Cor: {{ cores.find(c => c.id === veiculoItem.cor)?.nome || 'Não disponível' }} - 
        Ano: {{ veiculoItem.ano }} - Preço: R$ {{ veiculoItem.preco }}
      </span>
      <button @click="excluir(veiculoItem.id)">X</button>
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

.form {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form input,
.form select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #bbb;
  background-color: #f9f9f9;
  color: #333;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form input:focus,
.form select:focus {
  border-color: #888;
  box-shadow: 0 0 5px rgba(136, 136, 136, 0.5);
  outline: none;
}

.form input::placeholder,
.form select::placeholder {
  color: #aaa;
}

.acessorios {
  height: 100px; /* Ajusta a altura conforme necessário */
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 1rem;
}

.form-buttons button {
  width: 100px;
  height: 40px;
  background-color: #888;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-buttons button:hover {
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
