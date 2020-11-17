<template>
    <button @click="counter">{{ newCount }}</button>
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
  data() {
    return {
      newCount: this.count,
    }
  },
  watch: {
    count(newValue) {
      this.newCount = newValue;
    }
  },

  methods: {
    counter() {
      this.newCount += 1;
      this.$emit('increment', this.newCount);
    },
  },
};
</script>

<style>

</style>
