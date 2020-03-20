<template>
	<div class="search-bg">
		<div class="search-box">
			<input
				class="input"
				:type="type"
				:placeholder="placeholder"
				:value="inputValue"
				placeholder-class="placeholder"
			>
			<i class="iconfont iconsousuo icon"></i>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		placeholder: {
			type: String,
			default: "搜索"
		},
		inputValue: {
			type: String,
			default: ""
		},
		type: {
			type: String,
			default: "text"
		}
	}
};
</script>

<style lang="scss" scoped>
.search-bg {
	@include wh(750rpx, 80rpx);
	@include fj(center);
	padding: 10rpx 40rpx;
	.search-box {
		position: relative;
		@include wh(670rpx, 60rpx);
		border: 4rpx solid $--color-primary;
		border-radius: 24rpx;
		padding: 0 30rpx;
		.icon {
			position: absolute;
			right: 10px;
			top: 0;
			line-height: 50rpx;
			font-weight: 550;
			color: $--color-primary;
		}
	}
	.input {
		@include sc($--text-lg, $--color-gray-c);
		@include wh(610rpx, 52rpx);
	}
	.placeholder {
		font-size: $--text-sm;
		color: $--color-place;
	}
}
</style>