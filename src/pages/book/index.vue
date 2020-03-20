<template>
	<div class="container">
		<div class="top">
			<search placeholder="图书搜索"></search>
			<div class="menus">
				<van-dropdown-menu active-color="#8CC223">
					<van-dropdown-item
						v-for="(item, index) in menuList"
						:key="index"
						:value="item.value"
						:options="item.options"
					></van-dropdown-item>
				</van-dropdown-menu>
			</div>
		</div>
		<div class="main">
			<div class="book-list">
				<ul>
					<li v-for="(item, index) in bookList" :key="index">
						<book-item :book="item"></book-item>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import search from "@components/search.vue";
import bookItem from "@components/bookItem.vue";
export default {
	components: { search, bookItem },
	data() {
		return {
			menuList: [
				{
					value: 0,
					options: [{ text: "推荐", value: 0 }]
				},
				{
					value: 0,
					options: [
						{ text: "0-3岁", value: 0 },
						{ text: "3-6岁", value: 1 },
						{ text: "6-12岁", value: 2 }
					]
				},
				{
					value: 0,
					options: [{ text: "大奖", value: 0 }]
				},
				{
					value: 0,
					options: [{ text: "英文", value: 0 }]
				},
				{
					value: 0,
					options: [{ text: "更多分类", value: 0 }]
				}
			],
			bookList: [
				{
					img: "",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 0
				},
				{
					img: "",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				},
				{
					img: "",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				},
				{
					img: "",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				},
				{
					img: "",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				},
				{
					img: "",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				}
			]
		};
	}
};
</script>

<style lang="scss" scoped>
.main {
	.book-list {
		padding: 0 30rpx;
	}
}
</style>
