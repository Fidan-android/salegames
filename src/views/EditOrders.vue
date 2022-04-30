<template>
  <div class="container">
    <div class="edit__orders" v-if="loaded"></div>
    <div class="profile_wrapper" v-if="loaded">
      <AdminOrderItem v-for="order in orders" :key="order.id"
        :id="order.id"
        :address="order.address"
        :amount="order.amount"
        :comment="order.comment"
        :status="order.status"
        :products="order.products"/>
    </div>
    <center><div v-if="!loaded" class="loader"><div class="box"></div></div></center>
  </div>
</template>

<script>
import { getAdminOrders } from "../helpers/axios.js";
import AdminOrderItem from "@/components/admin/AdminOrderItem.vue";

export default {
  name: "EditOrders",
  components: {
      AdminOrderItem,
  },
  computed: {
    loaded() {
        return this.orders != undefined;
    }
  },
  data() {
    return {
      orders: undefined,  
    };
  },
  methods: {
    
  },
  created() {
      getAdminOrders()
        .then(res => res.data)
        .then(data => {
          this.orders = data['orders'];
        })
  },
};
</script>
