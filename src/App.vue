<template>
  <div id="app">
    <router-view />
    <div class="nav">
      <nav v-if="isAdmin">
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
import { authorization } from "@/helpers/help.js";
import { profile, signout } from "@/helpers/axios.js";

export default {
  name: "App",
  data() {
    return {
      isAuthorized: false,
      isAdmin: true,
    };
  },
  methods: {
    onExit(e){
      e.preventDefault();
      var route = this.$router;
      signout()
        .then(res => res.data)
        .then(data => {
            if (data['code'] == '200') {
                setTimeout(() => {
                    localStorage.removeItem("access_token");
                    route.go();
                }, 300);
            } else {
                console.log(data);
            }
        });
    },
  },
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