<template>
	<div class="main">
		<div class="left" v-if="page === 'common'">
			<img :src="evaluate.headImage" alt>
		</div>
		<div class="right">
			<p class="name">{{evaluate.userName}}</p>
			<radio-play v-if="evaluate.audio" :audio="evaluate.audio" color="btn gray"></radio-play>
			<p class="text" v-if="evaluate.text">{{evaluate.text}}</p>
			<img class="img" v-if="evaluate.picture" :src="evaluate.picture" alt>
		</div>
		<div class="delete" v-if="page === 'user'" @click="deleteComment">
			<van-icon name="delete" size="60rpx"/>
		</div>
	</div>
</template>
<script>
import radioPlay from "@components/radioPlay.vue";
export default {
	props: {
		evaluate: {
			type: Object,
			default: () => {
				return {
					logo: "",
					type: "text",
					value: "这是一条评价"
				};
			}
		},
		page: {
			type: String,
			default: "common"
		}
	},
	components: {
		radioPlay
	},
	methods: {
		// 删除评论
		deleteComment() {
			this.$emit("deleteComment", this.evaluate);
		}
	}
};
</script>
<style lang="scss" scoped>
.main {
	@include fj(flex-start);
	align-items: flex-start;
	.left {
		@include wh(140rpx, 140rpx);
		padding: 20rpx;
		img {
			@include wh(100rpx, 100rpx);
			border-radius: 50%;
			box-shadow: 0 0 4rpx 4rpx $--color-gray-c;
		}
	}
	.right {
		width: 500rpx;
		.name {
			@include hh(140rpx);
			@include sc($--text-xl, $--color-glass);
		}
		.text {
			line-height: 40rpx;
			@include sc($--text-nm, $--color-gray-6);
			// background: $--color-gray-de;
			border-radius: 30rpx;
			letter-spacing: 2rpx;
			padding: 10rpx 20rpx 20rpx 10rpx;
			margin: 20rpx 0;
		}
		.img {
			@include wh(160rpx, 160rpx);
		}
	}
}
</style>