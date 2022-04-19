<template>
  <div class="product__item">
    <div class="product__photo product__clickable" @click="redirectToProduct">
      <img :src="picture" v-show="hasPicture"/>
      <img v-show="!hasPicture" />
    </div>
    <div class="product__id">{{ id }}</div>
    <div class="product__title product__clickable" @click="redirectToProduct">{{ productName }}</div>
    <div class="product__panel">
      <div class="product__panel-price">{{ price }}</div>
      <button class="product__panel-btn" v-if="this.isAuthorized">
        Add to cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    isAuthorized: Boolean,
    id: Number,
    productName: String,
    price: Number,
  },
  data() {
    return {
      picture: "",
      hasPicture: false,
    };
  },
  methods: {
    redirectToProduct() {
      var route = this.$router;
      localStorage.setItem("product_id", this.id);
      route.push('/product').catch(() => {});
    }
  },
  created() {},
};
</script>