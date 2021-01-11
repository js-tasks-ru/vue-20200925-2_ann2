<template>
  <base-button class="button_danger" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </base-button>
</template>

<script>
import BaseButton from './BaseButton';

export default {
  name: 'DangerButton',
  components: { BaseButton },
};
</script>

<style scoped>
.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}
.button.button_block {
  display: block;
  width: 100%;
}
</style>
