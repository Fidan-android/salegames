import Vue from 'vue'
import VueRouter from 'vue-router'
import { profile } from '../helpers/axios.js'
import { authorization } from "@/helpers/help.js";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Настольные игры',
    component: () => lazyLoadView(localStorage.getItem("access_token"))
  },
  {
    path: '/profile',
    beforeEnter: ((to, from, next) => {
      if (authorization()) {
        next();
      } else {
        next("/");
      }
    }),
    name: 'Профиль',
    component: function () {
      return import('../views/Profile.vue')
    }
  },
  {
    path: '/cart',
    beforeEnter: ((to, from, next) => {
      if (authorization()) {
        next();
      } else {
        next("/");
      }
    }),
    name: 'Корзина',
    component: function () {
      return import('../views/Cart.vue')
    }
  },
  {
    path: '/login',
    beforeEnter: ((to, from, next) => {
      if (!authorization()) {
        next();
      } else {
        next("/");
      }
    }),
    name: 'Авторизация',
    component: function () {
      return import('../views/Login.vue')
    }
  },
  {
    path: '/registration',
    beforeEnter: ((to, from, next) => {
      if (!authorization()) {
        next();
      } else {
        next("/");
      }
    }),
    name: 'Регистрация',
    component: function () {
      return import('../views/Registration.vue')
    }
  },
  {
    path: '/product',
    name: 'Продукт',
    component: function () {
      return import('../views/Product.vue')
    }
  },
  {
    path: '/orders',
    name: 'Управление заказами',
    component: function() {
      return import('../views/EditOrders.vue')
    }
  },
  {
    path: '/products',
    name: 'Управление продуктами',
    component: function() {
      return import('../views/EditProducts.vue')
    }
  },
  {
    path: '/404',
    name: 'Not Found',
    component: function () {
      return import('../views/404.vue')
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

async function lazyLoadView(token) {
  if (token == undefined) {
    return import('../views/Home.vue');
  } else {
    var permission = (await profile())['data']['profile']['admin'];
    console.log(permission)
    //проверяю доступность и показываю определенные панельки
    if (!permission) {
      return import('../views/Home.vue');
    } else {
      return import('../views/Admin.vue')
    }
  }
}

export default router
