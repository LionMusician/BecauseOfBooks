<template>
    <div class="main">
        <ul v-if="addrList.length" class="addr-list">
            <li></li>
        </ul>
        <no-data v-else></no-data>
        <div class="bottom">
            <van-button type="primary" size="normal" color="#98C145" block @click="newAddress">新增地址</van-button>
        </div>
    </div>
</template>
<script>
import noData from "@components/noData.vue";
import wx from "@/utils/wx-api";
export default {
    data() {
        return {
            addrList: []
        }
    },
    components: { noData },
    onLoad() {
        wx.setNavigationBarTitle("收货地址");
        this.getReceiveAddress();
    },
    methods: {
        newAddress() {
            wx.navigateTo(`../editAddress/main`);
        },
        // 获取地址列表
        getReceiveAddress() {
            let data = {};
            this.$http.getReceiveAddress(data).then(res => {
                console.log(res);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.main {
    min-height: 100vh;
    .bottom {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
    }
}
</style>