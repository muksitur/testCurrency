<template>
  <div id="app">
      <!-- language selector -->
      <div class="d-flex flex-row-reverse mb-3">
          <select class="form-control col-3" v-model="$i18n.locale">
              <option disabled value="">Please select A Language</option>
              <option v-for="language in languages" :key="language">{{language}}</option>
          </select>
      </div>
      <!-- currency converter. send 'conversion rate style' and 'timestamp' as property -->
      <CurrencyConverter v-if="store.state.styles!==null" :conversionRateStyle="conversionRateStyle" :timeStamp="timeStamp"/>
  </div>
</template>

<script>
import CurrencyConverter from '@/components/CurrencyConverter.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import {store} from './store/store.js'
import i18n from './i18n.js'

export default {
  name: 'App',
  i18n,
  components: {
    HelloWorld,
    CurrencyConverter
  },
  data: function() {
    return {
      store:store,
      rating: 0,
      languages:['de', 'fr', 'en']
    }
  },
  methods: {

  },
  computed:{
    // extract the style of conversion rate part from /public/ToolStyle.json
    conversionRateStyle(){
      for (let index = 0; index < this.store.state.styles.length; index++) {
        const element = this.store.state.styles[index];
        if(element.item === "conversion rate"){
          return element
        }
      }
      return {"item":"conversion rate", "fontSize":"12px", "color":"#E57070"};
    },
    timeStamp(){
      return new Date();
    }
  },
  mounted() {
    let temp = this;
    // load exchange rates and other informations from /public/CurrencyRate.json
    temp.store.commit('getCurrencies', this.store.getters);
    // load the styles from /public/ToolStyle.json
    temp.store.commit('getStyles');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
