import api from '@/plugins/axios'


export default class ModeloApi {
  async buscarTodasAsModelos() {
    const { data } = await api.get("/modelos/");
    return data.results;
  }
  async adicionarModelo(modelo) {
    const { data } = await api.post("/modelos/", modelo);
    return data.results;
  }
  async atualizarModelo(modelo) {
    const { data } = await api.put(`/modelos/${modelo.id}/`, modelo);
    return data.results;
  }
  async excluirModelo(id) {
    const { data } = await api.delete(`/modelos/${id}/`);
    return data.results;
  }
}