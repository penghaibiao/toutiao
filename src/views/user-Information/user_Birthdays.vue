<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('clone')"
      @confirm="onDone"
    />
  </div>
</template>

<script>
import { Modifies_My_profile } from "@/network/user.js";

export default {
  name: "user_Birthdays",
  data() {
    return {
      minDate: new Date(1800, 0, 1),
      maxDate: new Date(2020, 12, 1),
      currentDate: new Date(this.Date_value),
      data1: null,
    };
  },
  props: {
    Date_value: {
      type: [String, Array, Object],
    },
  },
  methods: {
    async onDone() {
      const data = `${this.currentDate.getFullYear()}-${
        this.currentDate.getMonth() + 1
      }-${this.currentDate.getDate()}`;

      this.data1 = data;
      const res = await Modifies_My_profile({
        birthday: data,
      });

      this.$emit("Date_modification", this.data1);
      console.log(res);
    },
  },
};
</script>

<style scoped lang="less">
</style>