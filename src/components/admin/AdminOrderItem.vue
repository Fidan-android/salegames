<template>
  <div class="order__item">
    <div class="order">
      <div class="order__info">
        <p><b>№ </b> {{ id }}</p>
        <p><b>Статус: </b>{{ status }}</p>
        <p><b>Адрес: </b> {{ address }}</p>
        <p><b>Сумма: </b> {{ amount }}</p>
        <p><b>Комментарий: </b> {{ comment }}</p>
      </div>
      Состав заказа: <br>
      <div class="products_wrapper" v-if="loaded">
        <OrderProductItem v-for="product in products" :key="product.id"
          :product_name="product.product_name"
          :product_image="product.product_image"
          :product_count="product.product_count"
          :product_price="product.product_price"
        />
      </div>
      <center><div v-if="!loaded" class="loader"><div class="box"></div></div></center>
      <div class="forms">
        <form @submit="onCancel" v-show="inWaiting">
          <input type="submit" class="btn_red" value="Отменить"/>
        </form>
        <form @submit="onConfirm" v-show="inWaiting">
          <input type="submit" class="btn_blue" value="Подтвердить"/>
        </form>
        <form @submit="onDelivery" v-show="inWorking">
          <input type="submit" class="btn_green" value="Доставлено"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { updateOrder } from "@/helpers/axios.js";
import OrderProductItem from "@/components/OrderProductItem.vue";
export default {
  name: "AdminOrderItem",
  components: {
    OrderProductItem,
  },
  computed: {
    loaded() {
      return this.products != undefined;
    }
  },
  props: {
    id: Number,
    address: String,
    amount: Number,
    comment: String,
    status: String,
    products: Array,
  },
  data() {
    return {
      inWaiting: true,
      inWorking: false,
    };
  },
  methods: {
    onCancel(e) {
      e.preventDefault();
      var result = confirm("Вы действительно хотите отменить заказ?");
      if (result) {
        updateOrder(this.id, "Отменено")
          .then(res => res.data)
          .then(data => {
            alert("Заказ отменен");
            this.$router.go();
          });
      }
    },
    onConfirm(e) {
      e.preventDefault();
      var result = confirm("Вы действительно хотите взять в работу заказ?");
      if (result) {
        updateOrder(this.id, "В работе")
          .then(res => res.data)
          .then(data => {
            alert("Заказ принят в работу");
            this.$router.go();
          });
      }
    },
    onDelivery(e) {
      e.preventDefault();
      var result = confirm("Вы действительно хотите отметить что заказ доставлен?");
      if (result) {
        updateOrder(this.id, "Доставлено")
          .then(res => res.data)
          .then(data => {
            alert("Заказ доставлен");
            this.$router.go();
          });
      }
    }
  },
  created() {
    this.inWaiting = this.status == "В ожидании";
    this.inWorking = this.status == "В работе";
  },
};
</script>