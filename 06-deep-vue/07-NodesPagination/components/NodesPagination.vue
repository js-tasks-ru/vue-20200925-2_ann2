<script>
export default {
  name: 'NodesPagination',
  render(createElement) {
    const start = (this.page - 1) * this.perPage;
    let renderArr = [];
    if (this.$slots.default) {
      renderArr = this.$slots.default.slice(start, start + this.perPage);
    }
    return createElement('div', renderArr);
  },
  props: {
    page: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped></style>
