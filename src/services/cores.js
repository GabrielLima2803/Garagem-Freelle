import axios from "axios";

export default class CoresApi {
  async buscarTodasAsCores() {
    const { data } = await axios.get("/cores/");
    return data.results;
  }
  async adicionarCores(cor) {
    const { data } = await axios.post("/cores/", cor);
    return data.results;
  }
  async atualizarCores(cor) {
    const { data } = await axios.put(`/cores/${cor.id}/`, cor);
    return data.results;
  }
  async excluirCores(id) {
    const { data } = await axios.delete(`/cores/${id}/`);
    return data.results;
  }
}