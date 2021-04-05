<template>
  <div>
    <!-- Решение -->
    <slot :item="item" v-for="item in renderItems"></slot>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    page: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      default: 0,
    },
    items: Array,
    default: [],
  },
  computed: {
    renderItems() {
      const start = (this.page - 1) * this.perPage;
      return this.items.slice(start, start + this.perPage);
    },
  },
};
</script>

<style></style>
