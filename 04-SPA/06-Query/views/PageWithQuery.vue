<template>
  <div class="container">
    <meetups-view v-model="modelQuery"
      :view.sync="def.view"
      :search.sync="def.search"
      :date.sync="def.date"
      :participation.sync="def.participation"
      @update:search="gotoView"
      @update:date="gotoView"
      @update:view="gotoView"
      @update:participation="gotoView"
    ></meetups-view>

    {{ $route.query }}
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
    modelQuery: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$route.query = value;
        console.log(value);
      }
    },
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
    clearQuery([key]) {
      const query = this.$route.query;
      console.log(query, [key], 2);

      delete query[key];

      console.log(query, this.$route.query, 3);
    },
    gotoView: function (value) {
      //this[`${value}`] = value;
      console.log(value, cloneDef.view, 'mme');
      for (let [key, query] of Object.entries(this.def)) {


        //console.log(query, value, 'query');
        /*if (value === cloneDef[key]) {
          console.log(this.$route.query, 'key');
          this.$router
            .push({
              path: '',
              query: { ...this.$route.query, [key]: value },
            })
            .catch((err) => {
              if (err.name !== 'NavigationDuplicated') {
                throw err;
              }
            });
        }*/
        if (query === value) {
          this.$router
            .replace({
              path: '',
              query: { ...this.$route.query, [key]: value },
            })
            .catch((err) => {
              if (err.name !== 'NavigationDuplicated') {
                throw err;
              }
            });
          //console.log(key);
        }
        /*if (value === cloneDef[key]) {
          this.$router
            .push({
              path: '',
              query: { ...this.$route.query},
            })
            .catch((err) => {
              if (err.name !== 'NavigationDuplicated') {
                throw err;
              }
            });
        }*/
        if (value === cloneDef[key]) {
          console.log([key, query], '1');

          this.clearQuery([key]);

        }
      }
      //this.view = value;
      //this.search = value;
      //const [key] = Object.keys(this.$route.query);
      //console.log(key, this.$route.query);
      //let objQuery = Object.assign(this.$route.query, { keyQuery: value });

      console.log(this.$route.query, 'ff');
      //if (this.keyQuery[value] === value) {
        //console.log(this.keyQuery[value], 'ff')

      //}

    },
  },
};
</script>

<style scoped></style>
