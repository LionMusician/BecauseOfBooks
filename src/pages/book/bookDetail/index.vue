<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="图书详情"></header-view>
	</div>
</template>

<script>
import search from "@components/search.vue";
import headerView from "@components/headerView.vue";
export default {
	components: {
		headerView
	},
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
					id: 0,
					img: "",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 0
				},
				{
					id: 1,
					img: "",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				},
				{
					id: 2,
					img: "",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				},
				{
					id: 3,
					img: "",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				},
				{
					id: 4,
					img: "",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				},
				{
					id: 5,
					img: "",
					name: "小猫头鹰",
					tags: ["3-6岁", "亲情友情"],
					readNum: 8000,
					count: 100
				}
			]
		};
	},
	onLoad() {
		
	},
	methods:{
		
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
