<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="阅读排行"></header-view>
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
							>{{item.label}}</van-col>
						</van-row>
					</div>
					<div class="right"></div>
				</div>
			</van-transition>
		</div>
		<!-- 列表 -->
		<scroll-view class="scroll-view_H" scroll-y="true" bindscroll="scroll" style="width: 100%">
			<div class="activityView" v-for="(item, index) in activityList" :key="index">
				<img :src="item.img" alt>
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
		return {
			active: 1,
			isMore: false,
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
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					lodAmt: 888,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					lodAmt: 888,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					lodAmt: 888,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					lodAmt: 888,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					lodAmt: 888,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				},
				{
					title: "慢鱼妈妈带你逛童书展",
					num: 5,
					time: "2020-03-21",
					address: "111111111111111111111111111111",
					amt: 666,
					lodAmt: 888,
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
				}
			]
		};
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
	.searchDiv {
		padding: 20rpx 0 10rpx 0;
	}
	.tabView {
		position: relative;
		.tabTop {
			@include fj;
			padding: 0 30rpx;
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
	}
}
</style>