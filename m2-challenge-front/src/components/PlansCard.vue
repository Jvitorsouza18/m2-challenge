<template>
  <div>
    <div>
      <h1>Internet</h1>
      <p>Selecione um plano de internet para continuar</p>
      <div v-for="item in internetInfo" :key="item.id">
        <button v-on:click="getInternetPrice(item.price)">
          {{ `${item.value} MEGA` }}
          <br />
          {{ `R$ ${item.price}` }}
          +DETALHES
        </button>
      </div>
    </div>
    <div>
      <h1>Fixo</h1>
      <p>Agora escolha seu pacote de internet fixo</p>
      <div v-for="item in phoneInfo" :key="item.id">
        <button
          v-on:click="getPhonePrice(item.price)"
          :disabled="internetPrice === 0"
        >
          {{ `${item.value.toUpperCase()} BRASIL` }}
          <br />
          {{ `R$ ${item.price}` }}
          +DETALHES
        </button>
      </div>
    </div>
    <div>
      <h1>TV</h1>
      <p>Selecione um plano de tv para finalizar</p>
      <div v-for="item in tvInfo" :key="item.id">
        <button
          v-on:click="getTvPrice(item.price)"
          :disabled="internetPrice === 0"
        >
          {{ `${item.value}` }}
          <br />
          {{ `R$ ${item.price}` }}
          +DETALHES
        </button>
      </div>
    </div>
    <h1>Total: {{ totalPrice }}</h1>
  </div>
</template>

<script>
import fetchAPI from "../services/fetchAPI.service";
export default {
  data() {
    return {
      internetInfo: [],
      phoneInfo: [],
      tvInfo: [],
      internetPrice: 0,
      phonePrice: 0,
      tvPrice: 0,
      cart: [],
    };
  },

  methods: {
    async getInternetInfo() {
      const plansInfo = await fetchAPI();
      this.internetInfo = plansInfo.internet;
    },

    async getPhoneInfo() {
      const plansInfo = await fetchAPI();
      this.phoneInfo = plansInfo.phone;
    },

    async getTvInfo() {
      const plansInfo = await fetchAPI();
      this.tvInfo = plansInfo.tv;
    },

    getInternetPrice(price) {
      this.internetPrice = price;
      console.log(this.internetPrice);
    },

    getPhonePrice(price) {
      this.phonePrice = price;
      console.log(this.phonePrice);
    },

    getTvPrice(price) {
      this.tvPrice = price;
      console.log(this.tvPrice);
    },
  },

  created() {
    this.getInternetInfo();
    this.getPhoneInfo();
    this.getTvInfo();
  },

  computed: {
    totalPrice() {
      return (this.internetPrice + this.phonePrice + this.tvPrice).toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped></style>
