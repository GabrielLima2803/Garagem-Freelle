import api from '@/plugins/axios'

export default class CoresApi {
  async buscarTodasAsCores() {
    const { data } = await api.get("/cores/");
    return data.results;
  }
  async adicionarCores(cor) {
    const { data } = await api.post("/cores/", cor);
    return data.results;
  }
  async atualizarCores(cor) {
    const { data } = await api.put(`/cores/${cor.id}/`, cor);
    return data.results;
  }
  async excluirCores(id) {
    const { data } = await api.delete(`/cores/${id}/`);
    return data.results;
  }
}