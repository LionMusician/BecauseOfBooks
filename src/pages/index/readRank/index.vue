<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="阅读排行"></header-view>
		<!-- 搜索 -->
		<div class="searchDiv">
			<search placeholder="图书搜索"></search>
		</div>
		<!-- 图书列表 -->
		<div class="bookList">
			<div v-for="(item, index) in bookList" :key="index">
				<book-item :book="item"></book-item>
			</div>
		</div>
	</div>
</template>

<script>
import headerView from "@components/headerView.vue";
import search from "@components/search.vue";
import bookItem from "@components/bookItem.vue";

export default {
	name: "",

	data() {
		return {
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
					readNum: 8000,
					count: 100
				}
			]
		};
	},
	components: {
		headerView,
		search,
		bookItem
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