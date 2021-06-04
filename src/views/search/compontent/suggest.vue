<template>
    <div>
        <van-cell  :key="index" icon="search" v-for="item,index in suggest" @click="$emit('search',item)">
            <div slot="title" v-html="hightlight(item)"></div>
        </van-cell>
       
    </div>
</template>

<script>
import { getSuggestions } from '../../../api/users';
import {debounce} from 'lodash'
export default {
    name: 'Suggest',
    components: {  },
    directives: {  },
    data() {
        return {
            suggest:''
        };
    },
    props:{
        searchText:{
            type:String,
            required:true
        }
    },
    mounted() {
        
    },
    watch:{
        searchText:{
            handler:debounce (function(value){
                this.Suggestions(value)
            },200),
            immediate:true
        }
    },
    methods: {
        async Suggestions(q){
           const data =await getSuggestions(q)
           this.suggest=data.data.data.options
        },
        hightlight(text){
            const lightstr = `<span class="act">${this.searchText}</span>`
            const reg = new RegExp(this.searchText,'gi')
            return text.replace(reg,lightstr)
        }
    },
};
</script>

<style lang="less" scoped>
/deep/span.act{
    color: red;
}
</style>