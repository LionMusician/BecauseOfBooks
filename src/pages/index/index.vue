<template>
	<div class="container">
		<van-row class="vanRow">
			<van-col span="6">
				<div class="imgDiv">
					<img src="../../../static/images/home/logo.png" alt>
				</div>
			</van-col>
			<van-col span="18">
				<van-dropdown-menu class="dropdownMenu">
					<van-dropdown-item v-model="shopName" :options="shopOptions"/>
				</van-dropdown-menu>
			</van-col>
		</van-row>
		<swiper
			:autoplay="true"
			:indicator-dots="true"
			circular
			src="https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658"
			v-if="bannerList && bannerList.length"
		>
			<swiper-item v-for="(item, index) in bannerList" :key="index">
				<div class="bannerItem">
					<img :src="item.picture" alt>
				</div>
			</swiper-item>
		</swiper>
		<!-- 搜索 -->
		<div class="searchDiv">
			<search placeholder="图书搜索" ref="search" @search="init"></search>
		</div>
		<!-- 首页导航 -->
		<van-row class="navView">
			<van-col
				span="6"
				custom-class="navItemView"
				v-for="(item, index) in navList"
				:key="index"
				@click="navigate(index)"
			>
				<div class="imgDiv">
					<img :src="item.icon" alt>
				</div>
				<div class="title">{{item.title}}</div>
			</van-col>
		</van-row>
		<!-- 精选热点 -->
		<van-row class="titleRow">
			<van-col span="12" class="left">精选热点</van-col>
			<van-col span="12" class="right">更多</van-col>
		</van-row>
		<div class="hotRow">
			<van-row v-for="(item, index) in hotList" :key="index">
				<van-col span="14">
					<p class="title">【{{item.title}}】</p>
					<div class="content">{{item.introduction}}</div>
				</van-col>
				<van-col span="10">
					<div class="imgDiv">
						<img :src="item.picture" alt>
					</div>
				</van-col>
			</van-row>
		</div>

		<!-- 绘本推荐 -->
		<van-row class="titleRow">
			<van-col span="12" class="left">绘本推荐</van-col>
			<van-col span="12" class="right" @click="navigate(0)">更多</van-col>
		</van-row>
		<van-row class="bookDiv" :gutter="20">
			<van-col span="12" v-for="(item, index) in bookList" :key="index">
				<div class="imgDiv">
					<img :src="item.frontCover" alt>
				</div>
				<p class="title">{{item.name}}</p>
			</van-col>
		</van-row>
	</div>
</template>

<script>
import wx from "@/utils/wx-api";
import utils from "@/utils/utils";
import CONFIG from "@/config";
import { TEST, MASTER_KEY } from "@/store/mutation-type";
import search from "@components/search.vue";
import { mapActions } from "vuex";

export default {
	components: { search },
	data() {
		return {
			shopName: 0,
			// 门店数据
			shopOptions: [],
			// banner数据
			bannerList: [],
			// 首页导航
			navList: [
				{
					title: "绘本推荐",
					icon: "../../static/images/home/tab_1.png"
				},
				{
					title: "阅读指导",
					icon: "../../static/images/home/tab_2.png"
				},
				{
					title: "借阅排行",
					icon: "../../static/images/home/tab_3.png"
				},
				{
					title: "亲子活动",
					icon: "../../static/images/home/tab_4.png"
				}
			],
			// 精选热点 数据
			hotList: [],
			// 绘本推荐数据
			bookList: []
		};
	},
	computed: {},
	onLoad() {
		// 获取阅读馆列表
		this.queryReadingHall();
		// banner数据
		this.queryBanner();
		this.init();
	},
	methods: {
		...mapActions(["setShopId"]),
		// 接口
		init() {
			// 精选热点
			this.queryHotspot();
			// 绘本推荐列表
			this.queryBookRecommend();
		},
		// 获取阅读馆列表
		queryReadingHall() {
			this.$http.queryReadingHall().then(res => {
				let data = res.readingHallVOS;
				let arr = [];
				data.forEach((item, index) => {
					let obj = {
						text: item.name,
						value: item.id
					};
					arr.push(obj);
				});
				this.shopName = arr[0].value;
				this.setShopId(arr[0].value);
				this.shopOptions = arr;
			});
		},
		// 获取banner数据
		queryBanner() {
			this.$http.queryBanner().then(res => {
				this.bannerList = res.bannerVOS;
			});
		},
		// 精选热点
		queryHotspot() {
			this.$http.queryHotspot().then(res => {
				this.hotList = res.hotspotVOS;
			});
		},
		// 获取绘本推荐列表
		queryBookRecommend() {
			let parmas = {
				name: ""
			};
			this.$http.queryBookRecommend(parmas).then(res => {
				this.bookList = res.bookVOS;
			});
		},
		navigate(index) {
			switch (String(index)) {
				case "0":
					wx.navigateTo("/pages/index/bookRecom/main");
					break;
				case "1":
					wx.navigateTo("/pages/index/readGuide/main");
					break;
				case "2":
					wx.navigateTo("/pages/index/readRank/main");
					break;
				case "3":
					wx.navigateTo("/pages/index/familyAct/main");
					break;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.vanRow {
		height: 50rpx;
		overflow: hidden;
		.imgDiv {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 46rpx;
			img {
				width: 85rpx;
				height: 43rpx;
			}
		}
		.selectShop {
			height: 50rpx;
			line-height: 50rpx;
			padding-left: 4rpx;
		}
		.dropdownMenu {
			@include fj(flex-start);
			width: 400rpx !important;
			height: 50rpx;
			font-size: $--text-sm;
		}
	}
	.bannerItem {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		img {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
	}
	.searchDiv {
		padding: 30rpx 0 20rpx 0;
	}
	.navView {
		padding: 0 20rpx 20rpx 20rpx;
		.navItemView {
			@include fj(center);
			width: 100%;
		}
		.title {
			font-size: $--text-nm;
			text-align: center;
			color: #6b6869;
			padding: 10rpx 0;
		}
		.imgDiv {
			@include fj(center);
			width: 100%;
			height: 144rpx;
			img {
				// flex: 1;
				width: 130rpx;
				height: 100%;
			}
		}
	}
	.titleRow {
		border-top: 1px solid $--color-primary;
		border-bottom: 1px solid $--color-primary;
		padding: 10rpx 20rpx 10rpx 40rpx;
		.left {
			color: $--color-primary;
			font-size: $--text-nm;
		}
		.right {
			color: $--color-text;
			text-align: right;
			font-size: $--text-nm;
		}
	}
	.hotRow {
		padding: 10rpx 20rpx 20rpx 40rpx;
		.title {
			color: $--color-primary;
			text-align: left;
			padding: 14rpx 0;
		}
		.content {
			@include ellipsis3;
			overflow: hidden;
			padding-left: 4rpx;
			color: $--color-text;
			font-size: $--text-lg;
		}
		.imgDiv {
			@include fj(center);
			width: 100%;
			height: 224rpx;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	.bookDiv {
		padding: 20rpx 40rpx;
		.imgDiv {
			@include fj(center);
			width: 100%;
			height: 200rpx;
			overflow: hidden;
			img {
				height: 100%;
			}
		}
		.title {
			text-align: center;
			color: $--color-text;
			padding-top: 10rpx;
			padding-bottom: 40rpx;
			font-size: $--text-lg;
		}
	}
}
</style>

<style lang="scss">
.dropdownMenu {
	.van-dropdown-menu__item {
		max-width: 400rpx !important;
	}
}
</style>
