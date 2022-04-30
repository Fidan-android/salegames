<template>
  <div id="app">
    <!-- включает поддержку router на сайт -->
    <router-view />
    <div class="nav">
      <!-- атрибут v-if в зависимости от значения показывает или скрывает блок -->
      <nav v-if="isAdmin">
        <ul>
          <li class="left logo">
            <!-- router-link позволяет установить переадресацию по переданному юрл -->
            <router-link to="/"> Настольные игры </router-link>
          </li>
          <li class="right" v-if="this.isAuthorized">
            <!-- @click отвечает за вызываемую функцию, при клике на объект -->
            <a @click="onExit" style="cursor: pointer"> <img src="@/assets/img/logout.png" /></a>
          </li>
          <li class="right" v-if="this.isAuthorized">
            <router-link to="/profile">
              <img src="@/assets/img/user.png"
            /></router-link>
          </li>
          <li class="right" v-if="this.isAuthorized">
            <router-link to="/orders">Заказы</router-link>
          </li>
          <li class="right" v-if="this.isAuthorized">
            <router-link to="/products">Продукты</router-link>
          </li>
          <li class="right" v-if="!this.isAuthorized">
            <router-link to="/registration"> Зарегистрироваться </router-link>
          </li>
          <li class="right" v-if="!this.isAuthorized">
            <router-link to="/login"> Войти </router-link>
          </li>
        </ul>
      </nav>
      <nav v-else>
        <ul>
          <li class="left logo">
            <router-link to="/"> Настольные игры </router-link>
          </li>
          <li class="right" v-if="this.isAuthorized">
            <a @click="onExit" style="cursor: pointer"> <img src="@/assets/img/logout.png" /></a>
          </li>
          <li class="right" v-if="this.isAuthorized">
            <router-link to="/profile">
              <img src="@/assets/img/user.png"
            /></router-link>
          </li>
          <li class="right" v-if="this.isAuthorized">
            <router-link to="/cart">
              <img src="@/assets/img/cart.png"
            /></router-link>
          </li>
          <li class="right" v-if="!this.isAuthorized">
            <router-link to="/registration"> Зарегистрироваться </router-link>
          </li>
          <li class="right" v-if="!this.isAuthorized">
            <router-link to="/login"> Войти </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// импортируем нужные функции из хелперов
import { authorization } from "@/helpers/help.js";
import { profile, signout } from "@/helpers/axios.js";

export default {
  // имя вью элемента
  name: "App",
  // данные вью элемента, используемые исключительно внутри элемента
  data() {
    return {
      isAuthorized: false,
      isAdmin: true,
    };
  },
  // методы, используемые внутри элементы
  methods: {
    onExit(e){
      e.preventDefault();
      var route = this.$router;
      // вызывается асинхронная функция и для того, чтобы не стопить сайт
      // необходимо вызывать результат данной функции с помощью промисов then
      signout()
        .then(res => res.data) // => стрелочная анонимная функция
        .then(data => {
            if (data['code'] == '200') {
                setTimeout(() => {
                    localStorage.removeItem("access_token");
                    // с помощью роутера перезагружаем текущую страницу
                    route.go();
                }, 300);
            } else {
                console.log(data);
            }
        });
    },
  },
  // функция хук - вызывается когда весь вью элемент был создан
  created() {
    this.isAuthorized = authorization();
    if (localStorage.getItem("access_token") == undefined) {
      this.isAdmin = false;
    } else {
      profile()
        .then(res => res.data)
        .then(data => {
          this.isAdmin = data['profile']['admin'];
        })
    }

  },
};
</script>