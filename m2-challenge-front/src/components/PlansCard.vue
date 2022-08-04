<template>
  <div>
    <div>
      <h1>Internet</h1>
      <p>Selecione um plano de internet para continuar</p>
      <div v-for="item in internetInfo" :key="item.id">
        <button>
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
        <button>
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
        <button>
          {{ `${item.value}` }}
          <br />
          {{ `R$ ${item.price}` }}
          +DETALHES
        </button>
      </div>
    </div>
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
  },

  created() {
    this.getInternetInfo();
    this.getPhoneInfo();
    this.getTvInfo();
  },
};
</script>

<style lang="scss" scoped></style>
