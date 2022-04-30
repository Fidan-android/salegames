<template>
  <div class="home">
    <div class="product_search right">
      <form @submit="searchProduct">
        <input v-on:keyup="searchValue()" type="text" id="search_input" name="tag" placeholder="Введите название товара" />
        <input type="submit" value="" />
      </form>
    </div>
    <div class="products_wrapper" v-if="isSearch">
      <ProductItem v-for="product in products" :key="product.id"
        :isAuthorized="isAuthorized"
        :id="product.id"
        :product-name="product.name"
        :price="product.price"
        :productImage="product.product_image"
        :re-show-products="showProduct"
      />
    </div>
    <div v-else>Ничего не найдено</div>
    <center><div v-if="!loaded" class="loader"><div class="box"></div></div></center>
  </div>
</template>

<script>
import { getAllProducts, searchProducts } from "@/helpers/axios.js";
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
      products: undefined,
      isSearch: true,
      last_search_text: '',
    };
  },
  created() {
    this.isAuthorized = authorization();
    this.showProduct();
  },
  computed: {
      loaded() {
          return this.products != undefined;
      },
  },
  methods: {
    showProduct() {
      getAllProducts()
        .then(res => res.data)
        .then(data => {
          this.products = data['products'];
          this.isSearch = this.products.length > 0;
        })
    },
    searchProduct(e) {
      e.preventDefault();
      searchProducts(e.target.tag.value)
        .then(res => res.data)
        .then(data => {
          this.products = data['products'] == undefined ? [] : data['products'];
          this.isSearch = this.products.length > 0;
        })
    },
    searchValue(e) {
      var temp = document.getElementById("search_input").value;
      if (this.last_search_text !== temp) {
        this.last_search_text = temp;
        if (temp === '') {
          this.products = undefined;
          this.showProduct();
        } else {
          this.products = undefined;
          searchProducts(temp)
            .then(res => res.data)
            .then(data => {
              this.products = data['products'];
              this.isSearch = this.products.length > 0;
            })
        }
      }
    }
  },
};
</script>
