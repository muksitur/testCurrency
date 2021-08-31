import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";


Vue.use(Vuex);

export const store = new Vuex.Store({

    state: {
        bases:[],
        targets:[],
        exchangeRates:[],
        styles:null
    },

    getters: {
        existsInBases: (state) => (data) => {
            for (let index = 0; index < state.bases.length; index++) {
                if(data === state.bases[index]){
                    return true;
                }
            }
            return false;
        },
        existsInTargets: (state) => (data) => {
            for (let index = 0; index < state.targets.length; index++) {
                if(data === state.targets[index]){
                    return true;
                }
            }
            return false;
        }
    },

    mutations: {
        getStyles(state){
            axios.get('http://localhost:8080/ToolStyle.json').then((response) =>{
                state.styles = response.data.styles;
            });
        },
        getCurrencies(state, getters){
            axios.get('http://localhost:8080/CurrencyRate.json').then((response) =>{
                state.exchangeRates = response.data.exchangeRates;
                for (let index = 0; index < state.exchangeRates.length; index++) {
                    const element = state.exchangeRates[index];
                    // store the base currency if it is not in state.bases already
                    if(getters.existsInBases(element.baseCurrency)===false){
                        state.bases.push(element.baseCurrency);
                    }
                    // store the target currency if it is not in state.targets already
                    if(getters.existsInTargets(element.targetCurrency)===false){
                        state.targets.push(element.targetCurrency);
                    }
                }
                console.log(state.exchangeRates, state.bases, state.targets);
            });
        }
    }
});