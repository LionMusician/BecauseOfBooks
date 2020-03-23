<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="阅读排行"></header-view>
		<!-- 搜索 -->
		<div class="searchDiv">
			<search placeholder="图书搜索"></search>
		</div>
		<!-- 图书列表 -->
		<scroll-view :scroll-y="bookList" :style="'height:' + scrollHeight + 'rpx;'" class="book-list">
			<div class="bookList">
				<div v-for="(item, index) in bookList" :key="index">
					<book-item :book="item"></book-item>
				</div>
			</div>
		</scroll-view>
		<cart-btn></cart-btn>
	</div>
</template>

<script>
import headerView from "@components/headerView.vue";
import search from "@components/search.vue";
import bookItem from "@components/bookItem.vue";
import cartBtn from "@components/cartBtn.vue";

export default {
	name: "",

	data() {
		return {
			scrollHeight: 0,
			bookList: [
				{
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 0
				},
				{
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				},
				{
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				},
				{
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				},
				{
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				},
				{
					img:
						"https://hbimg.huabanimg.com/4a97f12a1b64141e8b2482e25062e8b4643bd728aa943-gg68bB_fw658",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 800220,
					count: 100
				}
			]
		};
	},
	onLoad() {
		this.getWindow();
	},
	methods: {
		// 获取窗口大小
		getWindow() {
			let windowWidth = wx.getSystemInfoSync().windowWidth;
			let windowHeight = wx.getSystemInfoSync().windowHeight;
			this.scrollHeight = windowHeight / (windowWidth / 750) - 120 - 66;
		}
	},
	components: {
		headerView,
		search,
		bookItem,
		cartBtn
	}
};
</script>

<style lang="scss" scoped>
.container {
	.searchDiv {
		padding: 30rpx 0 20rpx 0;
	}
}
</style>