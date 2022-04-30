<template>
  <div>
    <div class="profile" v-if="loaded">
      <div class="profile__info">
        <div class="form__wrapper">
            <h1>Информация об аккаунте</h1>
            <br>
            <form class="form" @submit="OnEditProfile">
                <span class="caption">Фамилия</span>
                <input type="text" name="firstname" class="field"
                 maxlength="50" placeholder="Иванов" :value="first_name" required>

                <span class="caption">Имя</span>
                <input type="text" name="name" class="field"
                 maxlength="50" placeholder="Иван" :value="name" required>

                <span class="caption">Логин</span>
                <input type="text" name="login" class="field" 
                maxlength="50" placeholder="ivanov_ivan@mail.ru" :value="login" required>

                <input type="submit" class="btn_blue" value="Сохранить изменения">
              </form>
            <div id="message"></div>
        </div>
      </div>
      <div class="profile__request" v-if="orders != []">
        <center><b>Мои заказы:</b></center>
        <div class="profile_wrapper" v-if="loaded">
          <OrderItem v-for="order in orders" :key="order.id"
            :id="order.id"
            :address="order.address"
            :amount="order.amount"
            :comment="order.comment"
            :status="order.status"
            :products="order.products"/>
        </div>
      </div>
      <div v-else>
        Заказов пока нет.
      </div>
    </div>
    <center><div v-if="!loaded" class="loader"><div class="box"></div></div></center>
  </div>
</template>

<script>
import { profile, updateProfile } from "../helpers/axios.js";
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import OrderItem from "@/components/OrderItem.vue";

export default {
  name: "Profile",
  components: {
    OrderItem,
  },
  computed: {
    loaded() {
      return this.login != '' || this.orders != undefined;
    }
  },
  data() {
    return {
      login: '',
      reg_date: '',
      first_name: '',
      name: '',
      orders: undefined,
    };
  },
  methods: {
    getProfile() {
      profile()
      .then(res => res.data)
      .then(data => {
          console.log(data);
          this.login = data['profile']['login'];
          this.reg_date = data['profile']['reg_date'];
          this.first_name = data['profile']['first_name'];
          this.name = data['profile']['name'];
          this.orders = data['orders'] == undefined ? [] : data['orders'];

      });
    },
    OnEditProfile(e) {
      e.preventDefault();
      var res = confirm("Вы действительно хотите обновить профиль?");
      if (res) {
        updateProfile(e.target)
          .then(res => res.data)
          .then( _ => {
            this.$router.go();
          })
      }
    }
  },
  created() {
    this.getProfile();
  },
};
</script>
