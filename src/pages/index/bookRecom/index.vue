<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="绘本推荐"></header-view>
		<!-- 搜索 -->
		<div class="searchDiv">
			<search placeholder="图书搜索"></search>
		</div>
		<!-- 图书列表 -->
		<scroll-view :scroll-y="booksList" :style="'height:' + scrollHeight + 'rpx;'" class="book-list">
			<div class="bookList">
				<div v-for="(item, index) in booksList" :key="index" class="bookItem">
					<div class="imgDiv">
						<img :src="item.img" alt>
					</div>
					<p class="title">{{item.title}}</p>
					<div class="labelDiv">
						<span class="tag" v-for="(label, l) in item.label" :key="l">{{label}}</span>
					</div>
					<div class="content">
						<span class="colorLabel">推荐理由：</span>
						<span class="text">{{item.content}}</span>
					</div>
				</div>
			</div>
		</scroll-view>
	</div>
</template>

<script>
import headerView from "@components/headerView.vue";
import search from "@components/search.vue";
export default {
	name: "",
	data() {
		let that = this;
		return {
			scrollHeight: that.getWindowHeight(246),
			booksList: [
				{
					title: "走开, 绿色怪物",
					label: ["123", "优秀"],
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/39dc3a60af1dd81eaa05b18003ddcde7784194967134f-bixOvN_fw658"
				},
				{
					title: "小猫头鹰",
					label: ["123", "优秀"],
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/7caeaccf8eb19c66a00daed938c9d8bc9a4d655c5d470-Y1VD6b_fw658"
				},
				{
					title: "金猪送福",
					label: ["123", "优秀"],
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/cb524e32bb824bbd175abfd7d3f2e255aa843b795e1b1-kqgnIt_fw658"
				},
				{
					title: "金猪来啦",
					label: ["123", "优秀"],
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/66cc2965a74411e7fb457bb8aa8d47104ed4d47b720f0-RPcSGl_fw658"
				}
			]
		};
	},
	onLoad() {
		// 绘本推荐接口
		this.queryBookRecommend();
	},
	methods: {
		// 获取绘本推荐列表
		queryBookRecommend() {
			this.$http.queryBookRecommend().then(res => {
				this.booksList = res.data.data.bookVOS;
			});
		}
	},
	components: {
		headerView,
		search
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