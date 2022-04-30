<template>
  <div class="cart__item">
    <div class="cart__info">
      <div class="cart__photo">
        <img :src="linkImage" v-show="hasPicture"/>
        <img v-show="!hasPicture" />
      </div>
      <div class="cart__text">
        <div class="cart__title">{{ product_name }}</div>
        <div class="cart__price">{{ product_price }}</div>
      </div>
    </div>
    <div class="cart__count">
      <p>Количество: {{ product_count }}</p>
    </div>
  </div>
</template>

<script>
import { getImage } from "@/helpers/axios.js";
export default {
  name: "AdminOrderProductItem",
  props: {
    product_name: String,
    product_image: String,
    product_price: Number,
    product_count: Number,
  },
  data() {
    return {
      linkImage: '',
    };
  },
  methods: {
    
  },
  created() {
    this.hasPicture = this.product_image != null
    if (this.hasPicture)
      getImage(this.product_image)
        .then(res => res.data)
        .then(data => {
          this.linkImage = "http://127.0.0.1:5000" + data;
        })
  },
};
</script>