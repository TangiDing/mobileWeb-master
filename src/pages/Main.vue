<template>
  <div>我是首页<router-link to="/other"></router-link></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    name: String,
  },
  mounted() {
    console.log(this.name);
  },
});
</script>

<style lang="scss">
div {
  color:red;
}
</style>