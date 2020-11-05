<template>
  <div class="container">
    <meetups-view
      :view.sync="def.view"
      :search.sync="def.search"
      :date.sync="def.date"
      :participation.sync="def.participation"
      @update:search="gotoView"
      @update:date="gotoView"
      @update:view="gotoView"
      @update:participation="gotoView"
    ></meetups-view>

    {{ $route.query }} {{routQuery}}
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';
const def = {
  view: 'list',
  date: 'all',
  participation: 'all',
  search: '',
};
const cloneDef = Object.assign({}, def);
export default {
  name: 'PageWithQuery',
  components: { MeetupsView },
  data() {
    return {
      def,
      keyQuery: '',
      modelQuery: def,
    };
  },

  watch: {
    /* modelQuery: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$route.query = value;
        console.log(value);
      }
    },*/
    /*routQuery: function (value, oldvalue) {



      console.log(value, oldvalue, this.keyQuery, 'wath');

    },*/
    /* view: function () {
      this.keyQuery = 'view';
    },
    date: function () {
      this.keyQuery = 'date';

      //this.view = newv;
    },
    participation: function () {
      this.keyQuery = 'participation';
      return this.keyQuery;
    },
    search: function () {
      this.keyQuery = 'search';
    },*/
  },
  computed: {
    routQuery() {
      console.log(this.$route.query, 'cc');
      return this.$route.query;
    },
    /*getKeyQuery: {


    }*/
  },
  methods: {
    gotoView: function () {
      //console.log(value, cloneDef.view, 'mme');
      const queryObj = {};

      for (let [key, query] of Object.entries(this.def)) {
        //console.log(key, query, 'item');
        if (query !== cloneDef[key]) {
          queryObj[key] = query;
          console.log(queryObj);
        } else {
          console.log(key, 'key');
        }

        this.$router
          .replace({
            path: '',
            query: queryObj,
          })
          .catch((err) => {
            if (err.name !== 'NavigationDuplicated') {
              throw err;
            }
          });
      }
    },
  },
};
</script>

<style scoped></style>
