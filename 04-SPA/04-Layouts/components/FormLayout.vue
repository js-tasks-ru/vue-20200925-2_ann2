<template>
  <div>
    <h2 class="page__title text-center">{{ title }}</h2>
    <slot/>
  </div>
</template>

<script>
import BaseLayout from "./BaseLayout";
export default {
  name: 'FormLayout',
  props: {
    title: {
      type: String
    }
  },
  created() {
    this.$emit(`update:layout`, BaseLayout);
  }

};
</script>

<style scoped>
  .page.page_meetup-forms {
    padding: 70px 0;
  }
  .page.page_onboarding {
    max-width: 374px;
    width: 100%;
    margin: 0 auto;
  }
  .page.page_meetup-forms {
    padding: 70px 0;
  }

  .footer {
    padding: 100px 0 60px;
    text-align: center;
  }

  @media all and (max-width: 767px) {
    .filters-panel {
      flex-direction: column;
    }

    .filters-panel__col + .filters-panel__col {
      margin-top: 16px;
    }

    .page.page_404 h1 {
      font-size: 36px;
    }

    .page.page_404 h1 > span {
      font-size: 108px;
    }
  }

  @media all and (max-width: 992px) {
    .page.page_meetup-forms {
      padding: 48px 0;
    }

    .container {
      padding: 0 16px;
    }
  }

  @media all and (max-width: 480px) {
    #filters-panel__search {
      width: calc(100% - 112px);
    }

    #filters-panel__search > .form-control {
      max-width: 100%;
    }
  }
</style>
