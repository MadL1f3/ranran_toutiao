<template>
    <div class="his">
        <van-cell title="搜索历史" >
            <span></span>
            <van-icon name="delete" @click="data=[]">全部删除</van-icon>
        </van-cell>
        <van-cell  :key="index" v-for="item,index in data">
            <span slot="title"  @click="$emit('search', item)" class="text">{{item}}</span>
            <van-icon name="delete" @click="Delone(index)"></van-icon>
        </van-cell>
        
    </div>
</template>

<script>
import { getItem, setItem } from '../../../utils/story';
export default {
    name: 'History',
    components: {  },
    directives: {  },
    props:{
    //     searchHistories: {
    //   type: Array,
    //   required: true
    // }
    },
    
    data() {
        return {
            data:''
        };
    },
    mounted() {
        this.data = getItem('JIARAN_SEARCH_HISTORIES') || [] 
    },

    watch:{
        data(value) {
            setItem('JIARAN_SEARCH_HISTORIES', value)
    }
  },
    

    methods: {
        Delone(index){
            
            this.data.splice(index,1)

        }
    },
};
</script>

<style lang="less" scoped>
    .text{
        display: block;
        width: 100%;
    }
</style>