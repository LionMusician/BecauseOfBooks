<template>
    <div class="container">成长记录卡</div>
</template>

<script>
import wx from "@/utils/wx-api";
export default {
    data() {
        return {
            growthData: {}, //  成长数据
        };
    },
    onLoad() {
        this.getMyGrowthRecord();
        wx.setNavigationBarTitle("成长记录");
    },
    methods: {
        // 获取我的成长记录
        getMyGrowthRecord() {
            this.$http.getMyGrowthRecord().then((res) => {
                console.log(res);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
</style>