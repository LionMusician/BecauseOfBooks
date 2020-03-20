<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="阅读指导"></header-view>
		<!-- 列表 -->
		<div class="readListView" v-for="(item, index) in readList" :key="index">
			<div class="left">
				<div class="imgDiv">
					<img :src="item.img" alt>
				</div>
			</div>
			<div class="right">
				<p class="title">【{{item.title}}】</p>
				<div class="content">{{item.content}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import headerView from "@components/headerView.vue";
export default {
	name: "",
	data() {
		return {
			readList: [
				{
					title: "慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/e58469d48c46f897816252764b2d724f94706dbd120a4f-PQqVyS_fw658",
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/e58469d48c46f897816252764b2d724f94706dbd120a4f-PQqVyS_fw658",
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/e58469d48c46f897816252764b2d724f94706dbd120a4f-PQqVyS_fw658",
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/e58469d48c46f897816252764b2d724f94706dbd120a4f-PQqVyS_fw658",
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展"
				}
			]
		};
	},
	components: {
		headerView
	}
};
</script>

<style lang="scss" scoped>
.container {
	.readListView {
		@include fj();
		height: 240rpx;
		// margin-bottom: 20rpx;
		background: red;
		.left {
			width: 300rpx;
			.imgDiv {
				width: 100%;
				height: 240rpx;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.right {
			@include fc();
			flex: 1;
			border-top: 1rpx solid $--color-gray-de;
			border-bottom: 1rpx solid $--color-gray-de;
			.title {
				color: $--color-primary;
				text-align: left;
				height: 34rpx;
				line-height: 34rpx;
			}
			.content {
				@include ellipsis3;
				overflow: hidden;
				padding-left: 4rpx;
				color: $--color-text;
				font-size: $--text-lg;
			}
		}
	}
}
</style>