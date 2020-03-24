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
			<scroll-view :scroll-y="listScroll" :style="'height:' + scrollHeight + 'rpx;'" class="book-list">
				<ul>
					<li v-for="(item, index) in bookList" :key="index">
						<book-item :book="item" @bookClick="bookClick"></book-item>
					</li>
				</ul>
			</scroll-view>
		</div>
		<cart-btn @btnClick="cartBtnClick"></cart-btn>
		<van-popup :show="cartCoverShow" @close="cartBtnClick" position="bottom">
			<cart-cover @cartListBtnClick="cartListBtnClick"></cart-cover>
		</van-popup>
	</div>
</template>

<script>
import search from "@components/search.vue";
import bookItem from "@components/bookItem.vue";
import cartBtn from "@components/cartBtn.vue";
import cartCover from "@components/cartCover.vue";
import wx from "@/utils/wx-api";
export default {
	components: { search, bookItem, cartBtn, cartCover },
	data() {
		return {
			listScroll: true, // 允许列表滚动
			scrollHeight: 0,
			cartCoverShow: false, // 默认不显示购物车
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
		this.getWindow();
		// this.queryBook();
	},
	methods:{
        // 获取窗口大小
        getWindow() {
            let windowWidth = wx.getSystemInfoSync().windowWidth;
            let windowHeight = wx.getSystemInfoSync().windowHeight;
			this.scrollHeight = windowHeight / (windowWidth / 750) - 80 -60;
        },
		// 获取图书列表
		queryBook() {
			let data = {
				page: 1,
				size: 10
			};
			this.$http.queryBook(data).then(res => {
				console.log(res);
				
			})
		},
		// 点击图书
		bookClick(book) {
			wx.navigateTo(`bookDetail/main?${book.id}`);
		},
		// 点击购物车
		cartBtnClick() {
			this.cartCoverShow = !this.cartCoverShow;
		},
		// 购物车确认
		cartListBtnClick() {
			wx.navigateTo(`confirmAppoint/main`);
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
