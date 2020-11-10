<!-- Использование метода replace не оставит записи в истории переходов,
 т.к. по сути тут это без надобности. Ну и в тестах используется этот метод, что добавило еще один плюс к нему :)-->

<template>
  <div class="container">
     <meetups-view
      :view.sync="current.view"
      :search.sync="current.search"
      :date.sync="current.date"
      :participation.sync="current.participation"
    ></meetups-view>

  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';
const current = {
  view: 'list',
  date: 'all',
  participation: 'all',
  search: '',
};
const cloneDef = Object.assign({}, current);
export default {
  name: 'PageWithQuery',
  components: { MeetupsView },
  data() {
    return {
      current,
    };
  },

  watch: {
    routerParams: {
      handler: function (newValue) {
        const tempCurrent = {};
        //почему нельзя использовать this.current внутри цикла?
        Object.keys(this.current).forEach(function (key) {
          tempCurrent[key] = newValue[key] || cloneDef[key];
        });
        this.current = tempCurrent;
      },
      immediate: true,
    },

    'current.view': function () {
      this.addQuery();
    },
    'current.date': function () {
      this.addQuery();
    },
    'current.participation': function () {
      this.addQuery();
    },
    'current.search': function () {
      this.addQuery();
    },
  },
  computed: {
    routerParams: function () {
      return this.$route.query;
    },
  },

  methods: {
    addQuery: function () {
      const queryObj = {};
      Object.entries(this.current).forEach(function ([k, v]) {
        if (v !== cloneDef[k]) {
          queryObj[k] = v;
        }
      });

      this.$router
        .replace({
          query: queryObj,
        })
        .catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });
    },
  },
};
</script>

<style scoped></style>
