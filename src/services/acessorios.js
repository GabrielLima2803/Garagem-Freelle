import api from '@/plugins/axios'


export default class AcessorioService {
  async buscarTodosAcessorios() {
    const { data } = await api.get("/acessorios/");
    return data.results;
  }
  async adicionarAcessorio(acessorio) {
    const { data } = await api.post("/acessorios/", acessorio);
    return data.results;
  }
  async atualizarAcessorio(acessorio) {
    const { data } = await api.put(`/acessorios/${acessorio.id}/`, acessorio);
    return data.results;
  }
  async excluirAcessorio(id) {
    const { data } = await api.delete(`/acessorios/${id}/`);
    return data.results;
  }
}