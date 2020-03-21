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
		<swiper :autoplay="true" :indicator-dots="true">
			<swiper-item v-for="(item, index) in bannerList" :key="index">
				<div class="bannerItem">
					<img :src="item" alt>
				</div>
			</swiper-item>
		</swiper>
		<!-- 搜索 -->
		<div class="searchDiv">
			<search placeholder="图书搜索"></search>
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
					<div class="content">{{item.content}}</div>
				</van-col>
				<van-col span="10">
					<div class="imgDiv">
						<img :src="item.img" alt>
					</div>
				</van-col>
			</van-row>
		</div>

		<!-- 绘本推荐 -->
		<van-row class="titleRow">
			<van-col span="12" class="left">绘本推荐</van-col>
			<van-col span="12" class="right">更多</van-col>
		</van-row>
		<van-row class="bookDiv" :gutter="20">
			<van-col span="12" v-for="(item, index) in bookList" :key="index">
				<div class="imgDiv">
					<img :src="item.img" alt>
				</div>
				<p class="title">{{item.title}}</p>
			</van-col>
		</van-row>
	</div>
</template>

<script>
import wx from "@/utils/wx-api";
import utils from "@/utils/utils";
import CONFIG from "@/config";
import { mapState, mapMutations } from "vuex";
import { TEST, MASTER_KEY } from "@/store/mutation-type";
import search from "@components/search.vue";

export default {
	components: { search },
	data() {
		return {
			shopName: 0,
			// 门店数据
			shopOptions: [
				{ text: "全部商品", value: 0 },
				{ text: "新款商品", value: 1 },
				{ text: "活动商品", value: 2 }
			],
			// banner数据
			bannerList: [
				"https://hbimg.huabanimg.com/226173f0f4dad9c5d732501d3f2fc93fab52d7cdbfb0-YjmhvE_fw658",
				"https://hbimg.huabanimg.com/45a56d4598f00bab44c921f42c669034d45159a929351-WWwjYO_fw658"
			],
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
			hotList: [
				{
					title: "慢鱼妈妈带你逛童书展",
					img:
						"https://hbimg.huabanimg.com/e58469d48c46f897816252764b2d724f94706dbd120a4f-PQqVyS_fw658",
					content:
						"慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展慢鱼妈妈带你逛童书展"
				}
			],
			// 绘本推荐数据
			bookList: [
				{
					title: "走开, 绿色怪物",
					img:
						"https://hbimg.huabanimg.com/39dc3a60af1dd81eaa05b18003ddcde7784194967134f-bixOvN_fw658"
				},
				{
					title: "小猫头鹰",
					img:
						"https://hbimg.huabanimg.com/7caeaccf8eb19c66a00daed938c9d8bc9a4d655c5d470-Y1VD6b_fw658"
				},
				{
					title: "金猪送福",
					img:
						"https://hbimg.huabanimg.com/cb524e32bb824bbd175abfd7d3f2e255aa843b795e1b1-kqgnIt_fw658"
				},
				{
					title: "金猪来啦",
					img:
						"https://hbimg.huabanimg.com/66cc2965a74411e7fb457bb8aa8d47104ed4d47b720f0-RPcSGl_fw658"
				}
			]
		};
	},
	computed: {
		...mapState(["test", "master_key"])
	},
	onLoad() {},
	methods: {
		...mapMutations([TEST, MASTER_KEY]),
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
