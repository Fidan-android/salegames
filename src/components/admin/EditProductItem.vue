<template>
  <div class="product__item">
    <div class="product__photo product__clickable">
      <img :src="linkImage" v-show="hasPicture" @click="changeImage"/>
      <img v-show="!hasPicture" @click="changeImage"/>
      <form style="display:none;">
        <input type="hidden" name="product_id" :value="id"/>
        <input type="file" :id="'image' + id" accept="image/*" name="product_image"/>
        <input type="submit" class="hidden" name="submitting"/>
      </form>
    </div>
    <div class="product__id">{{ id }}</div>
    <div class="product__title product__clickable">{{ productName }}</div>
    <div class="product__panel">
      <div v-if="price" class="product__panel-price">{{ price }}</div>
      <div class="">Осталось: {{ stockCount }}</div>
      <button class="increment__btn"
          @click="incrementProduct"></button>
    </div>
  </div>
</template>

<script>
import { addStockCountProduct, getImage, editImage } from "@/helpers/axios.js";
export default {
  name: "EditProductItem",
  props: {
    isAuthorized: Boolean,
    id: Number,
    productName: String,
    price: Number,
    stockCount: Number,
    productImage: String,
  },
  data() {
    return {
      hasPicture: true,
      linkImage: '',
    };
  },
  methods: {
    changeImage(e) {
      e.preventDefault();
      var res = confirm("Вы действительно хотите поменять картинку?");
      var router = this.$router;
      if (res) {
        let input = document.querySelector('#image' + this.id);
        console.log(input);
        input.addEventListener('change', function (e) {
          editImage(e.target.form)
            .then(res => res.data)
            .then(data => {
              alert("Успешно");
              router.go();  
            })
        });

        input.click();
      }
    },
    incrementProduct(e) {
      var router = this.$router;
      e.preventDefault();
      var result = confirm("Вы действительно хотите добавить количество товара?");
      if (result) {
        addStockCountProduct(this.id)
          .then(res => res.data)
          .then(data => {
            alert("Успешно доблавено количество");
            router.go();
          })
      }
    }
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