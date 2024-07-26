import axios from "axios";

export default class ModeloApi {
  async buscarTodasAsModelos() {
    const { data } = await axios.get("/modelos/");
    return data.results;
  }
  async adicionarModelo(modelo) {
    const { data } = await axios.post("/modelos/", modelo);
    return data.results;
  }
  async atualizarModelo(modelo) {
    const { data } = await axios.put(`/modelos/${modelo.id}/`, modelo);
    return data.results;
  }
  async excluirModelo(id) {
    const { data } = await axios.delete(`/modelos/${id}/`);
    return data.results;
  }
}