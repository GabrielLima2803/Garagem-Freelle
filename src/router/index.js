import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LayoutFull from '@/layouts/LayoutFull.vue';
import CorView from "../views/CorView.vue";
import CategoriaView from "../views/CategoriaView.vue";
import MarcaView from "../views/MarcaView.vue";
import AcessorioView from "../views/AcessorioView.vue";
import ModeloView from "../views/ModeloView.vue";
import VeiculoView from "../views/VeiculoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LayoutFull,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView,
        },
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/views/LoginView.vue'),
        },
        {
          path: "/categorias",
          name: "categorias",
          component: CategoriaView,
        },
        {
          path: "/cores",
          name: "cores",
          component: CorView,
        }, 
        {
          path: "/marcas",
          name: "marcas",
          component: MarcaView,
        },
        {
          path: "/acessorios",
          name: "acessorios",
          component: AcessorioView,
        },
        {
          path: "/modelos",
          name: "modelos",
          component: ModeloView
        },
        {
          path: "/veiculos",
          name: "veiculos",
          component: VeiculoView
        },
      ],
    },
  ],
});

export default router;