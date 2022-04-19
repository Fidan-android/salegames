<template>
  <div class="cart">
    <div class="cart_wrapper">
      <CartItem
        :id="1"
        product-name="Tennis"
        :price="124.99"
        :countProduct="3"
        :stockCount="10"
        @calculate-amount="calculateAmount"
      />
      <CartItem
        :id="2"
        product-name="Footbal"
        :price="124.99"
        :countProduct="3"
        :stockCount="10"
        @calculate-amount="calculateAmount"
      />
    </div>
    <hr/>
    <div class="cart__total">
      <p>Полная стоимость: </p>
      <p class="cart__price">{{ totalAmount.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
import { main } from "../helpers/axios.js";
import CartItem from "@/components/CartItem.vue";

export default {
  name: "Cart",
  components: {
    CartItem,
  },
  data() {
    return {
      totalAmount: 749.94,
    };
  },
  methods: {
    calculateAmount(param) {
      this.totalAmount += param
    }
  },
  created() {},
};
</script>
