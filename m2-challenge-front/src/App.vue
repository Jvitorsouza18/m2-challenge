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
  background-color: #f4f7f5;
  font-family: Poppins, sans-serif;
}

a {
  text-decoration: none;
}

h1 {
  font-weight: 600;
}

p {
  font-weight: 600;
}

button {
  border: 1px solid black;
  font-weight: 600;
}
</style>
