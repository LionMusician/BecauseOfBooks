<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="亲子活动"></header-view>
		<!-- 搜索 -->
		<div class="searchDiv">
			<search placeholder="图书搜索"></search>
		</div>
		<!-- 筛选 -->
		<div class="tabView">
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
				<div class="activityItem" v-for="(item, index) in activityList" :key="index">
					<div class="imgDiv">
						<img :src="item.img" alt>
					</div>
					<div class="infoDiv">
						<div class="titleDiv">
							<div class="left">
								<p class="title">【{{item.title}}】</p>
								<p class="num">限制人数: {{item.num}}</p>
							</div>
							<div class="right" @click="addCar(item)">
								<i class="iconfont icongouwuche rotateY"></i>
								<span>购买</span>
							</div>
						</div>
						<div class="timeDiv">
							<div class="left">
								<p>时间：{{item.time}}</p>
								<p>地址：{{item.address}}</p>
							</div>
							<div class="right">
								<span class="oldAmt">&yen;{{item.oldAmt}}</span>
								<span class="amt">&yen;{{item.amt}}</span>
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
export default {
	name: "",
	data() {
		return {
			active: 1,
			isMore: false,
			scrollHeight: 0,
			carList: [],
			tabList: [
				{ value: 1, label: "博物馆" },
				{ value: 2, label: "美术馆" },
				{ value: 3, label: "讲座" },
				{ value: 4, label: "讲座" }
			],
			moreList: [
				{ value: 5, label: "博物馆" },
				{ value: 6, label: "美术馆" },
				{ value: 7, label: "讲座" },
				{ value: 8, label: "讲座" }
			],
			activityList: [
				{
					title:
						"慢鱼妈妈带你慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展逛童书展",
					num: 5,
					id: "1",
					carNum: 0,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					oldAmt: 888,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					id: "2",
					carNum: 0,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					oldAmt: 888,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					id: "3",
					carNum: 0,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					oldAmt: 888,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					id: "4",
					carNum: 0,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					oldAmt: 888,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					id: "5",
					carNum: 0,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					oldAmt: 888,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					id: "6",
					carNum: 0,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					oldAmt: 888,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				}
			]
		};
	},
	computed: {
		carNum() {
			let num = 0;
			this.carList.forEach(item => {
				num += item.carNum;
			});
			return num;
		}
	},
	onLoad() {
		this.getWindow();
		// 查询活动列表
		this.queryActivity();
	},
	methods: {
		// 获取窗口大小
		getWindow() {
			let windowWidth = wx.getSystemInfoSync().windowWidth;
			let windowHeight = wx.getSystemInfoSync().windowHeight;
			this.scrollHeight =
				windowHeight / (windowWidth / 750) - 120 - 66 - 60;
		},
		// 查询活动列表
		queryActivity() {
			this.$http.queryActivity().then(res => {
				this.activityList = res.data.data.readGuideVOS;
			});
		},
		/**
		 * 点击tab筛选
		 **/
		tabClick(val) {
			this.active = val;
		},
		/**
		 * 加入购物车
		 */
		addCar(item) {
			if (!item.carNum) {
				item.carNum++;
				this.carList.push(item);
			} else {
				this.carList.forEach(element => {
					if (element.id === item.id) {
						element.carNum++;
					}
				});
			}
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