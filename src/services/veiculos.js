import axios from "axios";

export default class VeiculoApi {
  async buscarTodosOsVeiculos() {
    const { data } = await axios.get("/veiculos/");
    return data.results;
  }
  async adicionarVeiculo(veiculo) {
    const { data } = await axios.post("/veiculos/", veiculo);
    return data.results;
  }
  async atualizarVeiculo(veiculo) {
    const { data } = await axios.put(`/veiculos/${veiculo.id}/`, veiculo);
    return data.results;
  }
  async excluirVeiculo(id) {
    const { data } = await axios.delete(`/veiculos/${id}/`);
    return data.results;
  }
}