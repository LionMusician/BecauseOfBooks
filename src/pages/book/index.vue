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
            <scroll-view
                :scroll-y="listScroll"
                :style="'height:' + scrollHeight + 'rpx;'"
                class="book-list"
            >
                <ul>
                    <li v-for="(item, index) in bookList" :key="index">
                        <book-item
                            :book="item"
                            @bookClick="bookClick"
                            @collectBook="collectBook"
                            @addBookToBag="addBookToBag"
                        ></book-item>
                    </li>
                </ul>
            </scroll-view>
        </div>
        <cart-btn @btnClick="cartBtnClick"></cart-btn>
        <van-popup :show="cartCoverShow" @close="cartBtnClick" position="bottom">
            <cart-cover @cartListBtnClick="cartListBtnClick" @deleteBag="deleteBag" :cartList="bagList"></cart-cover>
        </van-popup>
    </div>
</template>

<script>
import search from "@components/search.vue";
import bookItem from "@components/bookItem.vue";
import cartBtn from "@components/cartBtn.vue";
import cartCover from "@components/cartCover.vue";
import wx from "@/utils/wx-api";
import Tips from "@/utils/Tips";
import { mapGetters } from "vuex";
export default {
    components: { search, bookItem, cartBtn, cartCover },
    data() {
        let that = this;
        return {
            listScroll: true, // 允许列表滚动
            scrollHeight: that.getWindowHeight(140),
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
            bookList: [],
			bagList: [],
        };
    },
    computed: {
        ...mapGetters(["shopId"])
    },
    onLoad() {
        this.queryBook();
		this.queryCategory();
    },
    methods: {
		// 获取分类列表
		queryCategory() {
			let data = {
				type: 1
			}
			this.$http.queryCategory(data).then(res => {
				console.log(res);
				
			})
		},
        // 获取图书列表
        queryBook(name = '') {
            let data = {
				categoryIds: [],
				name: name,
                readingHallId: this.shopId,
                page: 1,
                size: 10
            };
            this.$http.queryBook(data).then(res => {
                this.bookList = res.bookVOS;
            });
        },
        // 点击图书
        bookClick(book) {
            wx.navigateTo(`bookDetail/main?id=${book.id}`);
        },
        // 添加收藏
        collectBook(book) {
			if(book.isCollect) {
				return Tips.toast("图书已收藏！");
			}
            let data = {
				bizId: book.id,
				type: 1, // 类型：1-图书，2-活动
			};
            this.$http.addCollection(data).then(res => {
				Tips.success("收藏成功！");
        		this.queryBook();
            });
        },
        // 加入书包
        addBookToBag(book) {
            let data = {
				bookId: book.id
			};
            this.$http.addBag(data).then(res => {
				Tips.success("加入书包成功！");
            });
        },
		// 从书包删除
		deleteBag(book) {
			let data = {
				ids: [book.id]
			}
            this.$http.deleteBag(data).then(res => {
				this.$http.queryBag().then(res => {
					this.bagList = res.bookBorrowVOS;
					Tips.success("删除成功！");
				});
            });
		},
        // 点击购物车
        cartBtnClick() {
			if(!this.cartCoverShow) {
				this.$http.queryBag().then(res => {
					this.bagList = res.bookBorrowVOS;
					this.cartCoverShow = !this.cartCoverShow;
				});
			}else {
				this.cartCoverShow = !this.cartCoverShow;
			}
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
