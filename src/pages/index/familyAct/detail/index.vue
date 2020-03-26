<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="活动详情"></header-view>
		<div class="cover">
			<div class="logo">
				<img src alt>
			</div>
			<p class="name">{{book.name}}</p>
			<ul class="tag-list">
				<li class="tag" v-for="item in book.tags" :key="item">{{item}}</li>
			</ul>
		</div>
		<van-sticky>
			<div class="func-list">
				<ul>
					<li class="btn" v-for="(item,index) in funcList" :key="index">
						<img
							:src="'../../../../../../../../../static/images/book/' + item.pic"
							:style="'width:' + item.width + 'rpx;height:' + item.height + 'rpx;'"
						>
						<p class="func-name">{{item.name}}</p>
					</li>
				</ul>
			</div>
		</van-sticky>
		<div class="book-detial">
			<ul>
				<li class="detail">
					<p class="title">绘本详情</p>
				</li>
				<li class="radio">
					<p class="title">绘本音频</p>
					<radio-play></radio-play>
				</li>
				<li class="video">
					<p class="title">绘本视频</p>
					<video-play></video-play>
				</li>
				<li class="evalute">
					<p class="title">绘本评价</p>
					<ul>
						<li v-for="(item, index) in book.evaluateList" :key="index">
							<evaluate-item :evaluate="item"></evaluate-item>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import radioPlay from "@components/radioPlay.vue";
import videoPlay from "@components/videoPlay.vue";
import headerView from "@components/headerView.vue";
import evaluateItem from "@components/evaluateItem.vue";
export default {
	components: {
		headerView,
		radioPlay,
		videoPlay,
		evaluateItem
	},
	data() {
		return {
			book: {
				id: 1,
				img: "",
				name: "小猫头鹰",
				tags: ["3-6岁", "亲情友情"],
				readNum: 8000,
				count: 100,
				evaluateList: [
					{
						icon: "",
						type: "text",
						value:
							"是非成败转头空，青山依旧在，惯看秋月春风，一壶浊酒喜相逢。"
					},
					{
						icon: "",
						type: "radio",
						url: ""
					},
					{
						icon: "",
						type: "text",
						value:
							"是非成败转头空，青山依旧在，惯看秋月春风，一壶浊酒喜相逢。"
					}
				]
			},
			funcList: [
				{
					id: 0,
					pic: "detail.png",
					name: "详情",
					width: 80,
					height: 100
				},
				{
					id: 4,
					pic: "collect.png",
					name: "收藏",
					width: 75,
					height: 100
				},
				{
					id: 3,
					pic: "car.jpg",
					name: "购买",
					width: 75,
					height: 110
				},
				{
					id: 5,
					pic: "search.png",
					name: "评论",
					width: 80,
					height: 70
				}
			]
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.container {
	.cover {
		position: relative;
		overflow: hidden;
		@include wh(100%, 450rpx);
		border-bottom: 1rpx solid $--color-gray-c;
		@include fc(center);
		margin-top: 30rpx;
		.logo {
			padding-bottom: 20rpx;
			img {
				@include wh(450rpx, 300rpx);
				background: $--color-primary;
			}
		}
		.name {
			@include hh(60rpx);
			@include sc($--text-xl, $--color-text);
		}
		.tag-list {
			@include wh(150rpx, 300rpx);
			position: absolute;
			top: 30rpx;
			right: 0;
			padding-top: 30rpx;
			@include fc(flex-start);
			align-items: flex-end;
			.tag {
				text-align: center;
				width: 100rpx;
				box-sizing: content-box;
				@include hh(28rpx);
				border: 2rpx solid $--color-primary;
				border-left-color: transparent;
				border-radius: 10rpx;
				@include sc($--text-sm, $--color-primary);
				position: relative;
				margin-bottom: 20rpx;
				&::after {
					content: "";
					@include wh(20rpx, 20rpx);
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
	}
	.func-list > ul {
		@include wh(750rpx, 120rpx);
		@include fj;
		padding: 10rpx 40rpx;
		background: $--color-white;
		.btn {
			@include wh(100rpx, 100rpx);
			@include fc(center);
			img {
				@include wh(60rpx, 60rpx);
			}
			.func-name {
				@include sc($--text-sm, $--color-text);
			}
		}
	}
	.book-detial {
		li {
			padding: 20rpx 30rpx;
			.title {
				@include hh(60rpx);
				@include sc($--text-lg, $--color-text);
				text-align: center;
				border-top: 1rpx solid $--color-gray-c;
			}
		}
	}
}
</style>
