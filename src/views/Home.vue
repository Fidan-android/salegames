<template>
  <div class="home">
    <div class="product_search right">
      <form>
        <input type="text" placeholder="Введите название товара" />
        <input type="submit" value="" />
      </form>
    </div>
    <div class="products_wrapper">
      <ProductItem
        :isAuthorized="isAuthorized"
        :id="1"
        product-name="Tennis"
        :price="124.99"
      />
      <ProductItem
        :isAuthorized="isAuthorized"
        :id="2"
        product-name="Footbal"
        :price="124.99"
      />
      <ProductItem
        :isAuthorized="isAuthorized"
        :id="3"
        product-name="Chess"
        :price="124.99"
      />
    </div>
  </div>
</template>

<script>
import { main } from "../helpers/axios.js";
import { authorization } from "@/helpers/help.js";
// @ is an alias to /src
import ProductItem from "@/components/ProductItem.vue";

export default {
  name: "Home",
  components: {
    ProductItem,
  },
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
