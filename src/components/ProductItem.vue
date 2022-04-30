<template>
  <div class="product__item">
    <div class="product__photo product__clickable" @click="redirectToProduct">
      <img :src="linkImage" v-show="hasPicture"/>
      <img v-show="!hasPicture" />
    </div>
    <div class="product__id">{{ id }}</div>
    <div class="product__title product__clickable" @click="redirectToProduct">{{ productName }}</div>
    <div class="product__panel">
      <div v-if="price" class="product__panel-price">{{ price }}</div>
      <button class="product__panel-btn" v-if="this.isAuthorized" @click="addCart">
        Add to cart
      </button>
    </div>
  </div>
</template>

<script>
import { getAllProducts, addToCart, getImage } from "@/helpers/axios.js";
export default {
  name: "ProductItem",
  props: {
    isAuthorized: Boolean,
    id: Number,
    productName: String,
    price: Number,
    productImage: String,
    reShowProducts: Function,
  },
  data() {
    return {
      hasPicture: true,
      linkImage: '',
    };
  },
  methods: {
    redirectToProduct() {
      var route = this.$router;
      localStorage.setItem("product_id", this.id);
      route.push('/product').catch(() => {});
    },
    addCart(e) {
      e.preventDefault();
      addToCart(this.id, 1)
        .then(res => res.data)
        .then(data => {
          this.reShowProducts();
          alert("Товар успешно добавлен в корзину");
        });
    },
  },
  created() {
    this.hasPicture = this.productImage != null
    if (this.hasPicture)
      getImage(this.productImage)
        .then(res => res.data)
        .then(data => {
          this.linkImage = "http://127.0.0.1:5000" + data;
        })
  },
};
</script>