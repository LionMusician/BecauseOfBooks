<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="阅读指导"></header-view>
		<!-- 列表 -->
		<scroll-view :scroll-y="readList" :style="'height:' + scrollHeight + 'rpx;'" class="book-list">
			<div class="readListDiv">
				<div class="readListView" v-for="(item, index) in readList" :key="index">
					<div class="left">
						<div class="imgDiv">
							<img :src="item.picture" alt>
						</div>
					</div>
					<div class="right">
						<p class="title">【{{item.title}}】</p>
						<div class="content">{{item.introduction}}</div>
					</div>
				</div>
			</div>
		</scroll-view>
	</div>
</template>

<script>
import headerView from "@components/headerView.vue";
export default {
	name: "",
	data() {
		let that = this;
		return {
			scrollHeight: that.getWindowHeight(66),
			readList: [
				{
					title: "慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658",
					content:
						"慢鱼妈妈带你逛慢鱼妈妈带你逛童书展慢鱼妈妈慢鱼妈妈带你逛童书展慢鱼妈妈慢鱼妈妈带你逛童书展慢鱼妈妈慢鱼妈妈带你逛童书展慢鱼妈妈童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658",
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658",
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658",
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658",
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658",
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展"
				}
			]
		};
	},
	onLoad() {
		// 查询阅读指导列表
		this.queryReadGuide();
	},
	methods: {
		// 阅读指导数据
		queryReadGuide() {
			this.$http.queryReadGuide().then(res => {
				this.readList = res.readGuideVOS;
			});
		}
	},
	components: {
		headerView
	}
};
</script>

<style lang="scss" scoped>
.container {
	.readListDiv {
		padding: 30rpx 0;
	}
	.readListView {
		@include fj();
		height: 240rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
		.left {
			width: 300rpx;
			.imgDiv {
				@include fc();
				width: 100%;
				height: 240rpx;
				overflow: hidden;
				img {
					width: 100%;
					height: 240rpx;
				}
			}
		}
		.right {
			flex: 1;
			height: 240rpx;
			border-top: 1rpx solid $--color-gray-de;
			border-bottom: 1rpx solid $--color-gray-de;
			.title {
				text-align: left;
				padding: 16rpx 0 10rpx 0;
			}
			.content {
				@include ellipsisn(5);
				padding-left: 20rpx;
				color: $--color-text;
				font-size: $--text-nm;
			}
		}
	}
}
</style>