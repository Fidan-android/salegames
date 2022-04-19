<template>
  <div id="app">
    <router-view />
    <div class="nav">
      <nav>
        <ul>
          <li class="left logo">
            <router-link to="/"> Настольные игры </router-link>
          </li>
          <li class="right" v-if="this.isAuthorized">
            <a href="#"> <img src="@/assets/img/logout.png" /></a>
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

export default {
  name: "App",
  data() {
    return {
      isAuthorized: false,
    };
  },
  methods: {},
  created() {
    this.isAuthorized = authorization();
  },
};
</script>