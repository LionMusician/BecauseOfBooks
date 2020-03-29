<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="阅读指导"></header-view>
		<!-- 列表 -->
		<scroll-view
			v-if="readList && readList.length"
			:scroll-y="readList"
			:style="'height:' + scrollHeight + 'rpx;'"
			class="book-list"
		>
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
		<no-data v-else></no-data>
	</div>
</template>

<script>
import headerView from "@components/headerView.vue";
import noData from "@components/noData.vue";

export default {
	name: "",
	data() {
		let that = this;
		return {
			scrollHeight: that.getWindowHeight(66),
			readList: []
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
		headerView,
		noData
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