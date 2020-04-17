<template>
    <div class="container">
        <p class="prompt">点击授权手机号登录</p>
        <button open-type="getPhoneNumber" class="btn" @getphonenumber="getPhoneNumber">微信登录</button>
    </div>
</template>
<script>
import wx from "@/utils/wx-api";
import { mapActions } from "vuex";
export default {
    props: {
        code: {
            type: String
        }
    },
    data() {
        return {};
    },
    methods: {
		...mapActions(["setLoginInfo"]),
        // 登录
        getPhoneNumber(e) {
            let params = {
                encryptedData: e.mp.detail.encryptedData,
                iv: e.mp.detail.iv,
                wxCode: this.code
            };
            this.$http.xcxLogin(params).then(res => {
                this.setLoginInfo(res);
                this.$emit("wxLogin");
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
    @include wh(320rpx, 240rpx);
    @include fj(center);
    border-radius: 20rpx;
    .prompt {
        @include hh(100rpx);
        font-size: $--text-nm;
    }
    .btn {
        @include wh(180rpx, 60rpx);
        background: $--color-primary;
        @include sc($--text-lg, $--color-white);
        @include fj(center);
        border-radius: 10rpx;
    }
}
</style>