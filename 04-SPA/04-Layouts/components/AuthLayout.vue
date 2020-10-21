<template>
  <div>
    <h2 class="page__title text-center">{{ title }}</h2>
    <slot/>
  </div>
</template>

<script>
import BaseLayout from "./BaseLayout";

export default {
  name: 'AuthLayout',
  props: {
    title: {
      type: String
    }
  },
  created() {
    this.$emit(`update: layout`, BaseLayout);
  }
};
</script>

<style scoped></style>
