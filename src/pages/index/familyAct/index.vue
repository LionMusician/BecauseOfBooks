<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="亲子活动"></header-view>
		<!-- 搜索 -->
		<div class="searchDiv">
			<search placeholder="图书搜索"></search>
		</div>
		<!-- 筛选 -->
		<div class="tabView" v-if="tabList && tabList.length">
			<div class="tabTop">
				<div class="left">
					<van-row>
						<van-col
							span="6"
							v-for="(item, index) in tabList"
							:key="index"
							:class="active === item.value ? 'active' : ''"
							@click="tabClick(item.value)"
						>{{item.label}}</van-col>
					</van-row>
				</div>
				<div class="right" @click="isMore = !isMore">
					{{isMore ? '收起' : '展开'}}
					<i class="iconfont" :class="isMore ? 'iconw-top' : 'iconxia'"></i>
				</div>
			</div>
			<van-transition :show="isMore" custom-class="slide-down">
				<div class="tabTop more" v-if="isMore">
					<div class="left">
						<van-row>
							<van-col
								span="6"
								v-for="(item, index) in moreList"
								:key="index"
								:class="active === item.value ? 'active' : ''"
								@click="tabClick(item.value)"
							>{{item.label}}</van-col>
						</van-row>
					</div>
					<div class="right"></div>
				</div>
			</van-transition>
		</div>
		<cart-btn :num="carNum" @btnClick="carClick"></cart-btn>
		<!-- 列表 -->
		<scroll-view
			:scroll-y="activityList"
			:style="'height:' + scrollHeight + 'rpx;'"
			class="book-list"
		>
			<div class="activityView">
				<div
					class="activityItem"
					v-for="(item, index) in activityList"
					:key="index"
					@click="activityDetail(item)"
				>
					<div class="imgDiv">
						<img :src="item.frontCover" alt>
					</div>
					<div class="infoDiv">
						<div class="titleDiv">
							<div class="left">
								<p class="title">【{{item.name}}】</p>
								<p class="num">限制人数: {{item.totalNum}}</p>
							</div>
							<div class="right" @click.stop="addCar(item)">
								<i class="iconfont icongouwuche rotateY"></i>
								<span>购买</span>
							</div>
						</div>
						<div class="timeDiv">
							<div class="left">
								<p>时间：{{item.startDate}} - {{item.startDate}}</p>
								<p>地址：{{item.address}}</p>
							</div>
							<div class="right">
								<span class="oldAmt">&yen;{{item.oldAmt}}</span>
								<span class="amt">&yen;{{item.adultPrice}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</scroll-view>
	</div>
</template>

<script>
import headerView from "@components/headerView.vue";
import search from "@components/search.vue";
import cartBtn from "@components/cartBtn.vue";
import wx from "@/utils/wx-api";
import { mapGetters } from "vuex";

export default {
	name: "",
	data() {
		let that = this;
		return {
			active: 1,
			isMore: false,
			scrollHeight: that.getWindowHeight(126),
			carList: [],
			tabList: [
				{ value: 1, label: "博物馆" },
				{ value: 2, label: "美术馆" },
				{ value: 3, label: "讲座" },
				{ value: 4, label: "讲座" }
			],
			moreList: [],
			activityList: []
		};
	},
	computed: {
		...mapGetters(["shopId"]),
		carNum() {
			return this.carList && this.carList.length;
		}
	},
	onLoad() {
		// 查询购物车
		this.queryShoppingCart();
		// 查询分类列表
		this.queryCategory();
		// 查询活动列表
		this.queryActivity();
	},
	methods: {
		//  查询分类列表
		queryCategory() {
			let parmas = {
				type: 2
			};
			this.$http.queryCategory(parmas).then(res => {
				this.tabList = res.categoryVOListMap;
			});
		},
		// 查询活动列表
		queryActivity() {
			let parmas = {
				readingHallId: this.shopId
			};
			this.$http.queryActivity(parmas).then(res => {
				this.activityList = res.activityVOS;
			});
		},
		/**
		 * 点击tab筛选
		 **/
		tabClick(val) {
			this.active = val;
		},
		/**
		 * 查看活动详情
		 **/
		activityDetail(item) {
			console.log(item);
			wx.navigateTo("/pages/index/familyAct/detail/main");
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
		 * 加入购物车
		 */
		addCar(item) {
			let parmas = {
				activityId: item.id
			};
			this.$http.addShoppingCart(parmas).then(res => {
				this.queryShoppingCart();
			});
		},
		/**
		 * 去购物车
		 **/
		carClick() {
			wx.navigateTo("/pages/index/shopCar/main");
		}
	},
	components: {
		headerView,
		search,
		cartBtn
	}
};
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
	.searchDiv {
		padding: 20rpx 0 10rpx 0;
	}
	.tabView {
		position: relative;
		.tabTop {
			@include fj;
			padding: 0 20rpx;
			.left {
				flex: 1;
				height: 54rpx;
				line-height: 54rpx;
				text-align: center;
				font-size: $--text-lg;
				.active {
					color: $--color-primary;
				}
			}
			.right {
				width: 60px;
				text-align: center;
				font-size: $--text-nm;
				color: $--color-gray-c;
				height: 54rpx;
				line-height: 54rpx;
				i {
					transform: translateY(4rpx);
				}
			}
		}
		.more {
			position: absolute;
			z-index: 2;
			background: #fff;
			width: 100%;
		}
	}
	.activityView {
		padding: 30rpx;
		.activityItem {
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.3);
			margin-bottom: 30rpx;
			.imgDiv {
				width: 100%;
				height: 300rpx;
				background: yellow;
				img {
					width: 100%;
					height: 300rpx;
				}
			}
			.infoDiv {
				padding: 20rpx 10rpx;
				.titleDiv {
					@include fj;
					.left {
						flex: 1;
						.title {
						}
						.num {
							padding-left: 20rpx;
							font-size: $--text-nm;
						}
					}
					.right {
						@include fc;
						width: 80rpx;
						text-align: center;
						span {
							color: $--color-text;
							font-size: $--text-sm;
						}
						.rotateY {
							font-size: 60rpx;
							color: $--color-primary;
							transform: rotateY(180deg);
						}
					}
				}
				.timeDiv {
					@include fj;
					.left {
						flex: 1;
						padding-left: 20rpx;
						font-size: $--text-nm;
					}
					.right {
						text-align: right;
						width: 200rpx;
						padding-right: 20rpx;
						.oldAmt {
							color: $--color-text;
							font-size: $--text-nm;
							margin-right: 10rpx;
							text-decoration: line-through;
						}
						.amt {
							color: $--color-danger;
							font-size: $--text-xxl;
						}
					}
				}
			}
		}
	}
}
</style>