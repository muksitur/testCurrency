<template>
    <div class="container-fluid">
        <!-- if conversion rate is available -->
        <div v-if="baseSelected!=='' && targetSelected!=='' && exchangeRate!==0" :style="'font-size: '+conversionRateStyle.fontSize+'; color: '+conversionRateStyle.color+';'">
            1 {{baseSelected}} {{$t('equals')}} {{exchangeRate}} {{targetSelected}}
        </div>
        <!-- if conversion rate is not available -->
        <div v-if="baseSelected!=='' && targetSelected!=='' && exchangeRate===0" :style="'font-size: '+conversionRateStyle.fontSize+'; color: '+conversionRateStyle.color+';'">
            {{$t('no conversion rate is available')}}
        </div>

        <div class="mb-2">{{timeStamp}}</div>

        <div class="row justify-content-between mb-3">
            <div class="input-group col">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Amount Input</span>
                </div>
                <input type="number" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="inputAmount">
            </div>
            <!-- select option for base currency -->
            <select class="col form-control" v-model="baseSelected">
                <option disabled value="">Please select Base Currency</option>
                <option v-for="base in store.state.bases" :key="base">{{base}}</option>
            </select>
        </div>
        
        <div class="row justify-content-between mb-3">
            <!-- output field is readonly -->
            <div class="input-group col">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Amount Output</span>
                </div>
                <input type="number" readonly class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="outputAmount">
            </div>
            <!-- select option for the target currency -->
            <select class="col form-control" v-model="targetSelected">
                <option disabled value="">Please select Target Currency</option>
                <option v-for="target in store.state.targets" :key="target">{{target}}</option>
            </select>
        </div>
        
    </div>
</template>

<script>
import {store} from '../store/store.js'

export default {
    data: function (){
        return {
            store:store,
            baseSelected: '',
            targetSelected: '',
            inputAmount:0,
        }
    },
    computed: {
        // returns a conversion rate if available
        exchangeRate(){
            for (let index = 0; index < this.store.state.exchangeRates.length; index++) {
                const element = this.store.state.exchangeRates[index];
                if(this.baseSelected===element.baseCurrency){
                    if(this.targetSelected===element.targetCurrency){
                        return element.exchangeRate
                    }
                }
            }
            return 0;
        },
        outputAmount(){
            return this.exchangeRate*this.inputAmount;
        }
    },
    props:{
        conversionRateStyle:{
            required: false
        },
        timeStamp:{
            required: false
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style scoped>

</style>