<template>
  <div class="product">
    <div class="info__product">
      <p class="title_product"><b>Наименование:</b> {{ name }} </p> <br/>
      <p class="title_product"><b>Цена:</b> {{ price }} </p> <br/>
      <p class="title_product"><b>Количество товара:</b> {{ stockCount }} </p> <br/>
      <p class="title_product"><b>Издательство:</b> {{ publisher }} </p> <br/>
    </div>
    <div class="image__product">
      <img :src="linkImage" v-show="loadImage"/>
      <img v-show="!hasPicture" />
    </div>
  </div>
</template>

<script>
import { getProduct, getImage } from "../helpers/axios.js";
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
      productImage: '',
      hasPicture: true,
      linkImage: '',
    };
  },
  computed: {
    loadImage() {
      return this.linkImage != '';
    }
  },
  methods: {
    request() {
      getProduct(this.id)
        .then(res => res.data)
        .then(data => {
          if (data['code'] == 200) {
            this.name = data['product_info']['name'];
            this.price = data['product_info']['price'];
            this.stockCount = data['product_info']['stockCount'];
            this.publisher = data['product_info']['publisher'];
            this.productImage = data['product_info']['product_image'];
            this.setImage();
          }
        });
    },
    setImage() {
      this.hasPicture = this.productImage != null
      if (this.hasPicture)
        getImage(this.productImage)
          .then(res => res.data)
          .then(data => {
            this.linkImage = "http://127.0.0.1:5000" + data;
          })
    }
  },
  created() {
    this.id = localStorage.getItem("product_id");
    if (this.id == undefined) {
      var route = this.$router;
      route.push("/").catch(() => {});
      return;
    }

    this.request();
  },
};
</script>
