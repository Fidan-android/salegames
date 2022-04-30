<template>
  <div class="cart">
    <div class="cart_wrapper" v-show="loaded">
      <CartItem v-for="product in products_cart" :key="product.id"
        :id="product.product_id"
        :productName="product.name"
        :price="product.price"
        :productImage="product.product_image"
        :countProduct="product.count"
        :stockCount="product.stockCount"
        @calculate-amount="calculateAmount"
        @re-show-cart="refreshCart"
      />
    </div>
    <div v-show="!loaded"> Товаров еще нет </div>
    <hr/>
    <div class="cart__total">
      <div>
        <p>Полная стоимость: </p>
        <p class="cart__price">{{ totalAmount.toFixed(2) }}</p>
      </div>
      <div>
        <form @submit="create_order">
          <input class="field" required type="text" name="address" placeholder="Адрес"/><br>
          <textarea class="field" name="comment" placeholder="Комментарий к заказу"/><br>
          <input type="submit" class="btn_blue" value="Отправить"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCart, addOrder } from "@/helpers/axios.js";
import CartItem from "@/components/CartItem.vue";

export default {
  name: "Cart",
  components: {
    CartItem,
  },
  data() {
    return {
      totalAmount: 0,
      products_cart: [],
    };
  },
  computed: {
    loaded() {
      return this.products_cart.length > 0;
    }
  },
  created() {
    this.refreshCart();
  },
  methods: {
    calculateAmount(param) {
      this.totalAmount += param
    },
    refreshCart() {
      getCart()
        .then(res => res.data)
        .then(data => {
          this.products_cart = data['products_cart'];
        })
    },
    create_order(e) {
      e.preventDefault();
      if (this.products_cart.length < 1) {
        alert("В корзине должен быть товар!");
        return;
      }
      var res = confirm("Вы действительно хотите сделать заказ?");
      if (res) {
        addOrder(e.target, this.products_cart, this.totalAmount.toFixed(2))
          .then(res => res.data)
          .then(data => {
            console.log(data);
            this.$router.go('/');
          })
      }
    }
  },
};
</script>
