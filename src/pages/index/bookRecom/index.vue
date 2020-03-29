<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="绘本推荐"></header-view>
		<!-- 搜索 -->
		<div class="searchDiv">
			<search placeholder="图书搜索" @search="search"></search>
		</div>
		<!-- 图书列表 -->
		<scroll-view
			v-if="booksList && booksList.length"
			:scroll-y="booksList"
			:style="'height:' + scrollHeight + 'rpx;'"
			class="book-list"
		>
			<div class="bookList">
				<div v-for="(item, index) in booksList" :key="index" class="bookItem">
					<div class="imgDiv">
						<img :src="item.frontCover" alt>
					</div>
					<p class="title">{{item.name}}</p>
					<div class="labelDiv">
						<span class="tag" v-for="(label, l) in item.labelVOS" :key="l">{{label.name}}</span>
					</div>
					<div class="content">
						<span class="colorLabel">推荐理由：</span>
						<span class="text">{{item.recommendReason}}</span>
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
import search from "@components/search.vue";
export default {
	name: "",
	data() {
		let that = this;
		return {
			scrollHeight: that.getWindowHeight(160),
			booksList: [],
			searchValue: ""
		};
	},
	onLoad() {
		// 绘本推荐接口
		this.queryBookRecommend();
	},
	methods: {
		/**
		 * 搜索
		 */
		search(val) {
			this.searchValue = val;
			this.queryBookRecommend();
		},
		// 获取绘本推荐列表
		queryBookRecommend() {
			let parmas = {
				name: this.searchValue
			};
			this.$http.queryBookRecommend(parmas).then(res => {
				this.booksList = res.bookVOS;
			});
		}
	},
	components: {
		headerView,
		search,
		noData
	}
};
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	padding-bottom: 40rpx;
	.searchDiv {
		padding: 20rpx 0;
	}
	.bookList {
		width: 100%;
		padding: 0 40rpx;
		text-align: center;
		.bookItem {
			padding: 24rpx 0;
			border-bottom: 1rpx solid $--color-primary;
		}
		.imgDiv {
			@include fj(center);
			width: 300rpx;
			height: 200rpx;
			overflow: hidden;
			margin: 0 auto;
			img {
				height: 100%;
			}
		}
		.title {
			text-align: center;
			padding-top: 10rpx;
		}
		.labelDiv {
			@include hh(60rpx);
			@include fj(center);
			padding-bottom: 10rpx;
			.tag {
				box-sizing: content-box;
				padding: 4rpx 16rpx;
				@include hh(28rpx);
				border: 2rpx solid $--color-primary;
				border-left-color: transparent;
				border-radius: 10rpx;
				@include sc($--text-nm, $--color-primary);
				margin-right: 24rpx;
				position: relative;
				&::after {
					content: "";
					@include wh(26rpx, 26rpx);
					position: absolute;
					transform: rotate(45deg);
					top: 4rpx;
					left: -10rpx;
					border-radius: 6rpx;
					border-left: 2rpx solid $--color-primary;
					border-bottom: 2rpx solid $--color-primary;
				}
			}
		}
		.content {
			.colorLabel {
				color: $--color-primary;
			}
			.text {
				color: $--color-text;
				font-size: $--text-lg;
			}
		}
	}
}
</style>