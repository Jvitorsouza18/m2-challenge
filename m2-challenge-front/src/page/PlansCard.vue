<template>
  <div>
    <div>
      <h1>Internet</h1>
      <p>Selecione um plano de internet para continuar</p>
      <div v-for="item in internetInfo" :key="item.id">
        <button
          v-on:click="
            addToCart(item.price, item.value, item.category),
              getInternetPrice(item.price)
          "
          :disabled="buttonDisables('internet')"
        >
          {{ `${item.value} MEGA` }}
          <br />
          {{ `R$ ${item.price.toFixed(2)}` }}
        </button>
      </div>
    </div>
    <div>
      <h1>Fixo</h1>
      <p>Agora escolha seu pacote de telefone fixo</p>
      <div v-for="item in phoneInfo" :key="item.id">
        <button
          v-on:click="addToCart(item.price, item.value, item.category)"
          :disabled="internetPrice === 0 || buttonDisables('phone')"
        >
          {{ `${item.value.toUpperCase()} BRASIL` }}
          <br />
          {{ `R$ ${item.price.toFixed(2)}` }}
          +DETALHES
        </button>
      </div>
    </div>
    <div>
      <h1>TV</h1>
      <p>Selecione um plano de tv para finalizar</p>
      <div v-for="item in tvInfo" :key="item.id">
        <button
          v-on:click="addToCart(item.price, item.value, item.category)"
          :disabled="internetPrice === 0 || buttonDisables('tv')"
        >
          {{ `${item.value}` }}
          <br />
          {{ `R$ ${item.price.toFixed(2)}` }}
          +DETALHES
        </button>
      </div>
    </div>
    <div>
      <h1>Cart</h1>
      <p v-if="cart.length === 0">Carrinho está vazio</p>
      <div v-for="(item, index) in cart" :key="index">
        <button v-on:click="removeFromCart(index)">
          {{ item.itemCategory }}
          {{ `R$ ${item.itemPrice}` }}
        </button>
      </div>
      <div v-if="cart.length > 0">
        <p>Taxa de instalação Grátis</p>
        <h3>Total: {{ `R$ ${totalPrice}/mês` }}</h3>
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
      internetPrice: 0,
      cart: [],
      categoryArray: [],
    };
  },

  methods: {
    buttonDisables(type) {
      return this.categoryArray.includes(type);
    },

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
    },

    addToCart(price, name, category) {
      if (this.cart.length === 3) return;
      let categoryLabel = "";

      if (category === "internet") {
        categoryLabel = "Plano de Internet - ";
      }
      if (category === "phone") {
        categoryLabel = "Plano de Telefone - ";
      }
      if (category === "tv") {
        categoryLabel = "Plano de Televisão - ";
      }

      price = price.toFixed(2);

      const item = {
        itemPrice: price,
        itemName: name,
        itemCategory: categoryLabel,
        itemType: category,
      };
      this.cart.push(item);
      this.categoryArray.push(item.itemType);
    },

    removeFromCart(index) {
      const removedItemType = this.cart[index].itemType;
      const removeIndex = this.categoryArray.findIndex(
        (item) => item === removedItemType
      );
      this.categoryArray.splice(removeIndex, 1);

      this.cart.splice(index, 1);
    },
  },

  created() {
    this.getInternetInfo();
    this.getPhoneInfo();
    this.getTvInfo();
  },

  computed: {
    totalPrice() {
      const initialValue = 0;
      const finalPrice = this.cart.reduce(
        (acc = 0, curr) => acc + +curr.itemPrice,
        initialValue
      );
      return finalPrice.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped></style>
