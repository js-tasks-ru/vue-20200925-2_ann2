<template>
  <div class="wrapper bg-grey">
    <the-header />
    <main class="main">
      <div class="page page_onboarding">
        <div class="container">
          <component :is="layout">
            <router-view :layout.sync="layout"/>
          </component>
        </div>
      </div>
    </main>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";
export default {
  name: 'BaseLayout',
  components: { TheFooter, TheHeader },
  data() {
    return {
      layout: 'div',
    }
  }
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}

</style>
