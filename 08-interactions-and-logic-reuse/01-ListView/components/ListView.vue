<template>
  <div class="meetups-list">
    <slot :meetupItem="item" v-for="item in items" />
  </div>
</template>

<script>
export default {
  name: 'ListView',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.meetups-list {
}
</style>
