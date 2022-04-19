<template>
  <div class="product">
    <div class="info__product">
      <p class="title_product">Наименование: </p> {{ name }} <br/>
      <p class="title_product">Цена: </p> {{ name }} <br/>
      <p class="title_product">Количество товара: </p> {{ name }} <br/>
      <p class="title_product">Издательство: </p> {{ name }} <br/>
    </div>
    <div class="image__product">
      <img :src="picture" v-show="hasPicture"/>
      <img v-show="!hasPicture" />
    </div>
  </div>
</template>

<script>
import { getProduct } from "../helpers/axios.js";
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Product",
  data() {
    return {
      id: 0,
      name: '',
      price: '',
      stockCount: '',
      publisher: '',
      picture: '',
      hasPicture: false,
    };
  },
  methods: {
    request() {
      getProduct(id).then((res) => {
        
      });
    },
  },
  created() {
    this.id = localStorage.getItem("product_id");
    if (this.id == undefined) {
      var route = this.$router;
      route.push("/").catch(() => {});
    }
  },
};
</script>
