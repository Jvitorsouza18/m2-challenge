<script>
import PlansCard from "./page/PlansCard.vue";
export default {
  name: "app",
  components: {
    PlansCard,
  },
};
</script>

<template>
  <div>
    <plans-card />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}
</style>
