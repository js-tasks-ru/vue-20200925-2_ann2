<template>
  <button @click="counter">
    {{ count }}
  </button>
</template>

<script>

export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  model: {
    event: 'increment',
    prop: 'count',
  },
  methods: {
    counter() {
      this.$emit('increment', this.count + 1);
    },
  },
};
</script>

<style></style>
