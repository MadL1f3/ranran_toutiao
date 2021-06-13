<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月"
    :min-date="minDate"
    :max-date="maxDate"
    @cancel="$emit('chanbirthdayder')"
    @confirm="onconfirm"
  />
</template>

<script>
import { changeusermessage } from '../../../api/users';
import dayjs from 'dayjs'
export default {

  name: "Userbirthday",
  props: {
    value: {
      type: [Number,String],
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },

  components: {},

  computed: {},

  methods: {
    async onconfirm() {
      this.$toast.loading({
        message: "保存中......",
        forbidClick: true, //静用背景点击
        duration: 0, //持续时间一直  直到有结果
      });
      try {
        const currentDate =dayjs(this.currentDate).format('YYYY-MM-DD') ;

        await changeusermessage({
          birthday: currentDate,
        });
        this.$emit("input", currentDate);
        this.$emit("chanbirthdayder");
        this.$toast("更改成功");
      } catch (err) {
        this.$toast("更改失败");
      }
    },
  },
};
</script>
<style lang='less' scoped>
</style>