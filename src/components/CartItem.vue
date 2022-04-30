<template>
  <!-- компонент заказа в корзине -->
  <div class="cart__item">
    <div class="cart__info">
      <div class="cart__photo">
        <img :src="linkImage" v-show="hasPicture"/>
        <!-- отвечает за то, показывать ли пустую картинку или нет -->
        <img v-show="!hasPicture" />
      </div>
      <div class="cart__text">
        <div class="cart__id">{{ product_id }}</div>
        <div class="cart__title" v-if="product_name">{{ product_name }}</div>
        <div class="cart__price">{{ product_price }}</div>
      </div>
    </div>
    <div class="cart__count">
      <!-- в {{ }} можно обращаться к своим переменным в js, значения автоматически
      поставятся на место -->
      <p>Количество: {{ product_countProduct }} / {{ product_stockCount }}</p>
      <p class="cart__price">Сумма: {{ (product_countProduct * product_price).toFixed(2) }}</p>
    </div>
    <div class="cart__panel">
      <button class="increment__btn" :disabled="!inc_dis" @click="this.increment"></button>
      <button class="delete__btn" :disabled="!dec_dis" @click="this.deleting"></button>
      <button class="decrement__btn" :disabled="!del_dis" @click="this.decrement"></button>
    </div>
  </div>
</template>

<script>
import { addToCart, getImage } from "../helpers/axios.js";
export default {
  name: "CartItem",
  // пропсы это такие переменные, значения которых передаются при использовани
  // компонента, указывается не значения, а типы данных этих переменных
  props: {
    id: Number,
    productName: String,
    productImage: String,
    price: Number,
    stockCount: Number,
    countProduct: Number,
  },
  // переменные внутренного использования
  data() {
    return {
      hasPicture: false,
      product_id: this.id,
      product_name: this.productName,
      product_price: this.price,
      product_stockCount: this.stockCount,
      product_countProduct: this.countProduct,
      linkImage: '',
      inc_dis: true,
      dec_dis: true,
      del_dis: true,
    };
  },
  // методы внутреннего использования
  methods: {
    // методы добавления товара в корзине
    increment() {
      if (this.product_stockCount > 0) {
        this.disabled_buttons();
        this.addCart(1);
      }
    },
    // метод удаления товара из корзине
    deleting() {
      this.disabled_buttons();
      this.addCart(-1 * this.countProduct);
    },
    // метод удаления товара в корзине
    decrement() {
      if (this.product_countProduct > 1) {
        this.disabled_buttons();
        this.addCart(-1);
      } else {
        this.deleting();
      }
    },
    addCart(count) {
      addToCart(this.id, count)
        .then(res => res.data)
        .then(data => {
          console.log(data);
          // this.$emit("re-show-cart"); 
          this.$router.go();     
        });
    },
    // метод для выключения кнопок, 
    // когда форма отправляется, чтобы случайно больше не изменить
    disabled_buttons() {
        this.inc_dis = !this.inc_dis;
        this.dec_dis = !this.dec_dis;
        this.del_dis = !this.del_dis;
    }
  },
  created() {
    // при создании считаем общую сумму товаров и отображаем в переменной
    // родителя через $emit calculate-amount
    this.$emit("calculate-amount", this.product_price * this.product_countProduct);
    this.hasPicture = this.productImage != null
    if (this.hasPicture)
      // получаем картинку товара
      getImage(this.productImage)
        .then(res => res.data)
        .then(data => {
          this.linkImage = "http://127.0.0.1:5000" + data;
        })
  },
};
</script>