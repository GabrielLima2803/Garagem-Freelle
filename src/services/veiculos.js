import api from '@/plugins/axios'


export default class VeiculoApi {
  async buscarTodosOsVeiculos() {
    const { data } = await api.get("/veiculos/");
    return data.results;
  }
  async adicionarVeiculo(veiculo) {
    const { data } = await api.post("/veiculos/", veiculo);
    return data.results;
  }
  async atualizarVeiculo(veiculo) {
    const { data } = await api.put(`/veiculos/${veiculo.id}/`, veiculo);
    return data.results;
  }
  async excluirVeiculo(id) {
    const { data } = await api.delete(`/veiculos/${id}/`);
    return data.results;
  }
}