<template>
    <div class="container">
        <button open-type="getUserInfo" class="btn" @getuserinfo="loginIn">微信登录</button>
    </div>
</template>
<script>
import wx from "@/utils/wx-api";
export default {
    data() {
		return {

		}
	},
	methods: {
		// 登录
		loginIn(e) {
			console.log(e);
			
			wx.login(r => {
				let params = {
					encryptedData: e.mp.detail.encryptedData,
					iv:  e.mp.detail.iv,
					wxCode: r.code
				}
				console.log(params);
				
				this.$http.xcxLogin(params).then(res => {
					
				})
			})
		}
	}
}
</script>
<style lang="scss" scoped>
    .container {
        @include wh(320rpx, 180rpx);
        @include fj(center);
		border-radius: 20rpx;
        .btn {
            @include wh(180rpx, 60rpx);
            background: $--color-primary;
            @include sc($--text-lg, $--color-white);
            @include fj(center);
			border-radius: 10rpx;
        }
    }
</style>