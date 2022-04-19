<template>
  <div class="cart__item">
    <div class="cart__info">
      <div class="cart__photo">
        <img :src="picture" v-show="hasPicture" />
        <img v-show="!hasPicture" />
      </div>
      <div class="cart__text">
        <div class="cart__id">{{ product_id }}</div>
        <div class="cart__title">{{ product_name }}</div>
        <div class="cart__price">{{ product_price }}</div>
      </div>
    </div>
    <div class="cart__count">
      <p>Количество: {{ product_countProduct }} / {{ product_stockCount }}</p>
      <p class="cart__price">Сумма: {{ (product_countProduct * product_price).toFixed(2) }}</p>
    </div>
    <div class="cart__panel">
      <button class="increment__btn" @click="this.increment"></button>
      <button class="delete__btn" @click="this.deleting"></button>
      <button class="decrement__btn" @click="this.decrement"></button>
    </div>
  </div>
</template>

<script>
import {
  incrementProduct,
  decrementProduct,
  deleteProduct,
} from "../helpers/axios.js";
export default {
  name: "CartItem",
  props: {
    id: Number,
    productName: String,
    price: Number,
    stockCount: Number,
    countProduct: Number,
  },
  data() {
    return {
      picture: "",
      hasPicture: false,
      product_id: this.id,
      product_name: this.productName,
      product_price: this.price,
      product_stockCount: this.stockCount,
      product_countProduct: this.countProduct,
    };
  },
  methods: {
    increment(e) {
      if (this.product_countProduct < this.product_stockCount) {
        this.product_countProduct++;
        this.$emit("calculate-amount", this.product_price);
      }
    },
    deleting(e) {
      console.log("deleted");
    },
    decrement(e) {
      if (this.product_countProduct > 1) {
        this.product_countProduct--;
        this.$emit("calculate-amount", this.product_price * -1);
      } else {
        this.deleting();
      }
    },
  },
  created() {},
};
</script>