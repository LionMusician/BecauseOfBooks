<template>
	<div class="headerView">
		<div class="back" @click="back">
			<i class="iconfont iconquit"></i>
		</div>
		<div class="title">{{title}}</div>
	</div>
</template>

<script>
import wx from "@/utils/wx-api";
export default {
	props: {
		title: {
			type: String,
			default: () => {
				return "因为书阅读馆";
			}
		}
	},
	methods: {
		back() {
			// this.$emit("back");
			wx.navigateBack();
		}
	}
};
</script>

<style lang="scss" scoped>
.headerView {
	@include wh(750rpx, 66rpx);
	// @include fj;
	padding-left: 100rpx;
	border-top: 1px solid $--color-gray-de;
	border-bottom: 1px solid $--color-gray-de;
	.back {
		width: 60rpx;
		margin-left: -60rpx;
		height: 66rpx;
		line-height: 66rpx;
		float: left;
		.iconfont {
			font-weight: 550;
			font-size: $--text-xxl;
			color: $--color-primary;
		}
	}
	.title {
		width: 90%;
		line-height: 66rpx;
		color: $--color-text;
		text-align: center;
	}
}
</style>