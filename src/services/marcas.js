import api from '@/plugins/axios'


export default class MarcaApi {
  async buscarTodasAsMarcas() {
    const { data } = await api.get("/marcas/");
    return data.results;
  }
  async adicionarMarca(marca) {
    const { data } = await api.post("/marcas/", marca);
    return data.results;
  }
  async atualizarMarca(marca) {
    const { data } = await api.put(`/marcas/${marca.id}/`, marca);
    return data.results;
  }
  async excluirMarca(id) {
    const { data } = await api.delete(`/marcas/${id}/`);
    return data.results;
  }
}