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
      <form v-show="showCanceled" @submit="onCancel"><input type="submit" class="btn_red" value="Отменить"/></form>
    </div>
  </div>
</template>

<script>
import { updateOrder } from "../helpers/axios.js";
import OrderProductItem from "@/components/OrderProductItem.vue";
export default {
  name: "OrderItem",
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
      showCanceled: true,
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
            alert("Заявка успешно отменена");
            this.$router.go();
          });
      }
    }
  },
  created() {
    this.showCanceled = this.status == "В ожидании"
  },
};
</script>