<template>
  <div class="edit__products">
    <div class="products_wrapper" v-if="loaded">
        <EditProductItem v-for="product in products" :key="product.id"
            :isAuthorized="isAuthorized"
            :id="product.id"
            :product-name="product.name"
            :price="product.price"
            :stockCount="product.stockCount"
            :productImage="product.product_image"
        />
    </div>
    <center>
      <div v-if="!loaded" class="loader">
        <div class="box"></div>
      </div>
    </center>
    <br><br>
    <div class="form__wrapper">
      <h1>Создание товара</h1>
      <br>
      <form class="form" @submit="onCreate">
          <span class="caption">Наименование</span>
          <input type="text" name="name" placeholder="Наименование" 
            class="field" maxlength="50" required>

          <span class="caption">Цена</span>
          <input type="number" step="0.01" min="0" name="price" placeholder="Цена" 
            class="field" maxlength="16" required>

          <span class="caption">Количество</span>
          <input type="text" name="stockCount" placeholder="Количество" 
            class="field" maxlength="50" required>

          <span class="caption">Издание</span>
          <input type="text" name="publisher" placeholder="Издание"
             class="field" maxlength="50" required>

          <span class="caption">Картинка</span>
          <input type="file" name="product_image" placeholder="Изображение"
               class="field"/>

          <input type="submit" class="btn_blue" value="Создать">
      </form>
      <div id="message"></div>
    </div>
  </div>
</template>

<script>
import { getAllProducts, createProduct } from "../helpers/axios.js";
import EditProductItem from "@/components/admin/EditProductItem.vue";

export default {
  name: "EditProducts",
  components: {
    EditProductItem,
  },
  computed: {
    loaded() {
        return this.products != undefined;
    }
  },
  data() {
    return {
      isAuthorized: true,
      products: undefined,
    };
  },
  methods: {
    showProduct() {
      getAllProducts()
        .then(res => res.data)
        .then(data => {
          this.products = data['products'];
        })
    },
    onCreate(e) {
      var router = this.$router;
      e.preventDefault();
      createProduct(e.target)
        .then(res => res.data)
        .then(data => {
          alert("Товар успешно добавлен");
          router.go();
        });
    }
  },
  created() {
    this.showProduct();
  },
};
</script>
