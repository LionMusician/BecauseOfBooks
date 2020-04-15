<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="活动详情"></header-view>
		<div class="cover">
			<div class="logo">
				<img :src="book.frontCover" alt>
			</div>
			<div class="name">{{book.name}}</div>
			<div class="price">
				<span class="color">成人：</span>
				{{book.adultPrice}}
			</div>
			<div class="price">
				<span class="color">儿童：</span>
				{{book.childPrice}}
			</div>
			<div class="progress">
				<div class="color">已报名{{book.joinNum}}人</div>
				<div class="progressItem">
					<van-progress :percentage="(book.joinNum / book.totalNum) *100" :show-pivot="false"/>
				</div>
			</div>
			<ul class="tag-list">
				<li class="tag" v-for="item in book.tags" :key="item">{{item}}</li>
			</ul>
		</div>
		<van-sticky>
			<div class="func-list">
				<ul>
					<li class="btn" v-for="(item,index) in funcList" :key="index" @click="tagsClick(item)">
						<img
							:src="'../../../../../../../../../static/images/book/' + item.pic"
							:style="'width:' + item.width + 'rpx;height:' + item.height + 'rpx;'"
						>
						<p class="func-name">{{item.name}}</p>
					</li>
				</ul>
			</div>
		</van-sticky>
		<cart-btn :num="carNum" @btnClick="carClick"></cart-btn>
		<div class="book-detial">
			<ul>
				<li class="detail">
					<p class="title">绘本详情</p>
					<div>
						<img :src="book.introduction" alt>
					</div>
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
import cartBtn from "@components/cartBtn.vue";
import { mapGetters } from "vuex";
import wx from "@/utils/wx-api";
export default {
	components: {
		headerView,
		radioPlay,
		videoPlay,
		evaluateItem,
		cartBtn
	},
	data() {
		return {
			book: {},
			carList: []
		};
	},
	computed: {
		...mapGetters(["shopId"]),
		carNum() {
			return this.carList.length || 0;
		},
		funcList() {
			return [
				{
					id: 0,
					pic: "detail.png",
					name: "详情",
					width: 80,
					height: 100
				},
				{
					id: 1,
					pic: "collect.png",
					name: "收藏",
					width: 75,
					height: 100
				},
				{
					id: 2,
					pic: "car.jpg",
					name: "购买",
					width: 75,
					height: 110
				},
				{
					id: 3,
					pic: "search.png",
					name: "评论",
					width: 80,
					height: 70
				},
				{
					id: 4,
					pic: "search.png",
					name: "分享",
					width: 80,
					height: 70
				}
			];
		}
	},
	onLoad() {
		// 查询活动详情
		this.getActivityDetail();
		// 查询购物车
		this.queryShoppingCart();
	},
	methods: {
		/**
		 * 点击操作按钮
		 */
		tagsClick(item) {
			switch (item.id) {
				case 0:
					break;
				case 1:
					break;
				case 2: // 购买
					this.addCar();
					break;
				case 3:
					break;
				case 4:
					break;
			}
		},
		/**
		 * 查询活动详情
		 */
		getActivityDetail() {
			let parmas = {
				id: this.$root.$mp.query.id
			};
			this.$http.getActivityDetail(parmas).then(res => {
				this.book = res.activityVO;
			});
		},
		/**
		 * 加入购物车
		 */
		addCar() {
			let parmas = {
				activityId: this.book.id
			};
			this.$http.addShoppingCart(parmas).then(res => {
				this.queryShoppingCart();
			});
		},
		/**
		 * 查询购物车
		 **/
		queryShoppingCart() {
			this.$http.queryShoppingCart().then(res => {
				this.carList = res.shoppingCartVOS;
			});
		},
		/**
		 * 去购物车
		 **/
		carClick() {
			console.log("carClick");
			wx.navigateTo("/pages/index/shopCar/main");
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.cover {
		position: relative;
		border-bottom: 1rpx solid $--color-gray-c;
		@include fc(center);
		margin-top: 30rpx;
		.logo {
			padding-bottom: 20rpx;
			img {
				@include wh(450rpx, 300rpx);
				// background: $--color-primary;
			}
		}
		.name {
			@include hh(60rpx);
			@include sc($--text-xl, $--color-text);
		}
		.price {
			@include sc($--text-lg, $--color-text);
			.color {
				color: $--color-danger;
			}
		}
		.progress {
			@include fj(center);
			width: 60%;
			padding: 20rpx;
			.color {
				flex: 1;
				@include sc($--text-nm, $--color-text);
			}
			.progressItem {
				flex: 2;
			}
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
