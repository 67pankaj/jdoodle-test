import { useAuthStore } from 'stores/auth';

const routes = [
  {
    path: '/',
    component: () => import('layouts/DefaultLayout.vue'),
    beforeEnter: () => {
      const authStore = useAuthStore();
      if (!authStore.signedIn) {
        return { name: 'auth' };
      }
    },
    children: [
      { name: 'home', path: '', component: () => import('pages/HomePage.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    beforeEnter: () => {
      const authStore = useAuthStore();
      if (authStore.signedIn) {
        return { name: 'home' };
      }
    },
    children: [
      { name: 'auth', path: '', component: () => import('pages/AuthPage.vue') }
    ]
  },
  {
    path: '/solve',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: () => {
      const authStore = useAuthStore();
      if (!authStore.signedIn) {
        return { name: 'auth' };
      }
    },
    children: [
      {
        name: 'solve',
        path: '',
        component: () => import('pages/ProblemsPage.vue')
      }
    ]
  },
  {
    path: '/results',
    component: () => import('layouts/DefaultLayout.vue'),
    beforeEnter: () => {
      const authStore = useAuthStore();
      if (!authStore.signedIn) {
        return { name: 'auth' };
      }
    },
    children: [
      {
        name: 'results',
        path: '',
        component: () => import('pages/ResultsPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFoundPage.vue')
  }
];

export default routes;
