<template>
  <div class="home">
    <div class="product_search right">
      <!-- submit функция вызывается когда форма была отправлена -->
      <form @submit="searchProduct">
        <!-- keyup отвечает за событие, когда клавиша на данном элемента поднимается -->
        <input v-on:keyup="searchValue()" type="text" id="search_input" name="tag" placeholder="Введите название товара" />
        <input type="submit" value="" />
      </form>
    </div>
    <div class="products_wrapper" v-if="isSearch">
      <!-- это наш собственный компонент, с помощью v-for мы создаем цикл,
      с которым проходим по массиву продуктов и создаем точно такое же количество
      нашего компонета на экране, с передаными значениями -->
      <ProductItem v-for="product in products" :key="product.id"
        :isAuthorized="isAuthorized"
        :id="product.id"
        :product-name="product.name"
        :price="product.price"
        :productImage="product.product_image"
        :re-show-products="showProduct"
      />
    </div>
    <!-- v-else вызывается когда v-if не прошел -->
    <div v-else>Ничего не найдено</div>
    <!-- loaded для того, чтобы показать крутящий шар, пока данные не подгрузились -->
    <center><div v-if="!loaded" class="loader"><div class="box"></div></div></center>
  </div>
</template>

<script>
import { getAllProducts, searchProducts } from "@/helpers/axios.js";
import { authorization } from "@/helpers/help.js";
// @ is an alias to /src
// подключаем наш компонент
import ProductItem from "@/components/ProductItem.vue";

export default {
  name: "Home",
  // подгружаемые компоненты
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
  // метод, которые вызывается, перед созданием
  computed: {
      loaded() {
          return this.products != undefined;
      },
  },
  methods: {
    // запрос на получение товаров
    showProduct() {
      getAllProducts()
        .then(res => res.data)
        .then(data => {
          this.products = data['products'];
          this.isSearch = this.products.length > 0;
        })
    },
    // отправка слова для фильтрации
    searchProduct(e) {
      e.preventDefault();
      searchProducts(e.target.tag.value)
        .then(res => res.data)
        .then(data => {
          this.products = data['products'] == undefined ? [] : data['products'];
          this.isSearch = this.products.length > 0;
        })
    },
    // вызывается когда мы пишем текст в инпуте
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
