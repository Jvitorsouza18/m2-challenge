<template>
  <div class="container">
    <section class="container-left">
      <div class="plans-container">
        <div class="card card-content">
          <h1>Internet</h1>
          <p>Selecione um plano de internet para continuar</p>
          <div class="card-box">
            <button
              v-for="item in internetInfo"
              :key="item.id"
              class="internet-card"
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
        <div class="card card-content">
          <h1>Fixo</h1>
          <p>Agora escolha seu pacote de telefone fixo</p>
          <button
            v-for="item in phoneInfo"
            :key="item.id"
            class="phone-card"
            v-on:click="addToCart(item.price, item.value, item.category)"
            :disabled="internetPrice === 0 || buttonDisables('phone')"
          >
            {{ `${item.value.toUpperCase()} BRASIL` }}
            <br />
            {{ `R$ ${item.price.toFixed(2)}` }}
          </button>
        </div>
        <div class="card card-content">
          <h1>TV</h1>
          <p>Selecione um plano de tv para finalizar</p>
          <button
            v-for="item in tvInfo"
            :key="item.id"
            class="tv-card"
            v-on:click="addToCart(item.price, item.value, item.category)"
            :disabled="internetPrice === 0 || buttonDisables('tv')"
          >
            {{ `${item.value}` }}
            <br />
            {{ `R$ ${item.price.toFixed(2)}` }}
          </button>
        </div>
      </div>
    </section>
    <section class="container-right cart">
      <h1 class="cart-h1">Cart</h1>
      <p v-if="cart.length === 0">Carrinho está vazio</p>
      <button
        v-for="(item, index) in cart"
        :key="index"
        v-on:click="removeFromCart(index)"
        class="cart-card"
      >
        &#10060;
        {{ item.itemCategory }}
        {{ `R$ ${item.itemPrice}` }}
      </button>
      <div class="checkout-content" v-if="cart.length > 0">
        <p>Taxa de instalação Grátis</p>
        <h3>Total: {{ `R$ ${totalPrice}/mês` }}</h3>
      </div>
    </section>
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

<style lang="scss" scoped>
@mixin fastDisplay($x, $y, $z) {
  display: flex;
  align-items: center;
  justify-content: $x;
  flex-flow: $y $z;
}

.container {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-flow: row nowrap;
  height: 100vh;

  @media (max-width: 680px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;

    .container-left {
      @include fastDisplay(flex-start, column, nowrap);
      width: 100%;
      height: 70%;

      .plans-container {
        @include fastDisplay(flex-start, column, nowrap);
        height: 100%;
        width: 100%;
        margin: 10%;
      }
      .card {
        width: 100%;
        height: 50%;
        padding: 5%;

        &.card-content {
          @include fastDisplay(space-evenly, column, wrap);

          .card-box {
            @include fastDisplay(space-evenly, column, wrap);
            padding-top: 5%;
            height: 50%;

            .internet-card {
              padding: 2%;
              margin: 4%;
              width: 40%;

              height: 45%;
            }
          }
        }

        .phone-card {
          margin: 4%;
          width: 40%;
          padding: 10px;
          height: 45%;
        }

        .tv-card {
          margin: 4%;
          width: 40%;
          height: 30%;
          padding: 10px;
        }
      }
    }

    .container-right {
      @include fastDisplay(flex-start, column, nowrap);
      height: 100%;
      width: 100%;

      h1 {
        margin: 4.3% auto;
      }

      .cart-card {
        width: 40%;
        height: 20%;
        margin: 5%;
      }
    }
    .cart {
      width: 100%;
      @include fastDisplay(center, column, nowrap);

      .checkout-content {
        @include fastDisplay(center, column, nowrap);
        overflow: hidden;
        width: 70%;
      }
    }
  }

  h1 {
    color: purple;
  }

  .container-left {
    @include fastDisplay(flex-start, column, nowrap);
    width: 50%;

    height: 100%;

    .plans-container {
      @include fastDisplay(flex-start, column, nowrap);
      height: 100%;
      width: 100%;
    }
    .card {
      width: 100%;
      height: 30%;

      &.card-content {
        @include fastDisplay(space-evenly, column, wrap);
        .card-box {
          height: 50%;
          @include fastDisplay(space-evenly, row, wrap);
          .internet-card {
            width: 40%;

            height: 45%;
          }
        }
      }

      .phone-card {
        width: 44%;
        padding: 10px;
        height: 45%;
      }

      .tv-card {
        width: 40%;
        height: 30%;
      }
    }
  }

  .container-right {
    @include fastDisplay(flex-start, column, nowrap);
    height: 100%;
    width: 50%;
    position: relative;

    h1 {
      margin: 4.3% auto;
    }

    .cart-card {
      width: 52%;
      height: 16%;
      margin: 4%;
      padding: 4%;
    }

    .checkout-content {
      top: 84%;
      right: 20%;
      margin-bottom: 10%;
    }
  }
}
</style>
