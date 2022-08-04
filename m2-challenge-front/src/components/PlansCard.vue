<template>
  <div>
    <p>Cards here</p>
    <div v-for="item in internetInfo" :key="item.id">
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
import fetchAPI from "../services/fetchAPI.service";
export default {
  data() {
    return {
      internetInfo: [],
    };
  },
  methods: {
    async getInternetInfo() {
      const plansInfo = await fetchAPI();
      this.internetInfo = plansInfo.internet;
      console.log(this.internetInfo);
    },
  },
  created() {
    this.getInternetInfo();
  },
};
</script>

<style lang="scss" scoped></style>
