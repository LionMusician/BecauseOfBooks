<template>
    <div class="container">
        <div class="top">
            <search ref="search" placeholder="图书搜索" @search="searchBook"></search>
            <div class="menus">
                <van-dropdown-menu active-color="#8CC223">
                    <van-dropdown-item
                        v-for="(item, index) in menuList"
                        :key="index"
                        :title="item.title"
                        :value="item.value"
                        :options="item.options"
                        @change="(e) => { return selectMenu(e, index) }"
                    ></van-dropdown-item>
                </van-dropdown-menu>
            </div>
        </div>
        <div class="main">
            <scroll-view
                v-if="bookList.length"
                :scroll-y="listScroll"
                :style="'height:' + scrollHeight + 'rpx;'"
                class="book-list"
                @scrolltolower="scrollBottom"
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
                <div class="loading-view">
                    <van-loading v-if="total > bookList.length" size="14px">加载中…</van-loading>
                    <no-more v-else></no-more>
                </div>
            </scroll-view>
            <no-data v-else></no-data>
        </div>
        <cart-btn @btnClick="cartBtnClick" type="bag" :num="bagList.length"></cart-btn>
        <van-popup :show="cartCoverShow" @close="cartBtnClick" position="bottom">
            <cart-cover
                @cartListBtnClick="cartListBtnClick"
                @deleteBag="deleteBag"
                :cartList="bagList"
            ></cart-cover>
        </van-popup>
        <!-- 登录弹窗 -->
        <van-popup :show="loginInShow" @close="loginInHide">
            <wx-login :code="wxCode" @loginInHide="loginInHide"></wx-login>
        </van-popup>
    </div>
</template>

<script>
import search from "@components/search.vue";
import bookItem from "@components/bookItem.vue";
import cartBtn from "@components/cartBtn.vue";
import cartCover from "@components/cartCover.vue";
import noData from "@components/noData.vue";
import noMore from "@components/noMore.vue";
import wxLogin from "@components/wxLogin.vue";
import wx from "@/utils/wx-api";
import Tips from "@/utils/Tips";
import { mapGetters } from "vuex";
export default {
    components: {
        search,
        bookItem,
        cartBtn,
        cartCover,
        noData,
        wxLogin,
        noMore
    },
    data() {
        let that = this;
        return {
            loginInShow: false,
            wxCode: "",
            listScroll: true, // 允许列表滚动
            scrollHeight: that.getWindowHeight(140),
            cartCoverShow: false, // 默认不显示购物车
            menuList: [],
            bookList: [],
            bagList: [],
            searchInput: "",
            page: 1,
            size: 10,
            total: 0
        };
    },
    computed: {
        ...mapGetters(["shopId"])
    },
    onLoad() {
        this.queryCategory();
        let searchInput = this.$root.$mp.query.search;
        if (searchInput) {
            this.searchInput = searchInput;
        }
    },
    onShow() {
        this.queryBag();
    },
    methods: {
        // 显示登录按钮
        getLogin() {
            wx.login(r => {
                this.wxCode = r.code;
                this.loginInShow = true;
            });
        },
        // 隐藏登录按钮
        loginInHide() {
            this.loginInShow = false;
        },
        // 获取分类列表
        queryCategory() {
            let data = {
                type: 1
            };
            this.$http.queryCategory(data).then(res => {
                let category = [];
                res.categoryVOS.forEach((item, index) => {
                    let options = [];
                    if (item.children) {
                        options.push({
                            text: "全部",
                            value: -1
                        });
                        item.children.forEach(tip => {
                            options.push({
                                text: tip.name,
                                value: tip.id
                            });
                        });
                        category.push({
                            // value: item.children[0].id,
                            value: -1,
                            title: item.name,
                            options
                        });
                    }
                });

                this.menuList = category;
                this.queryBook();
            });
        },
        // 计算分类id列表
        calccategoryIds() {
            let ids = this.menuList.map(item => {
                return item.value;
            });
            ids = ids.filter(item => {
                return item !== -1;
            });
            return ids;
        },
        // 选择分类
        selectMenu(e, index) {
            this.menuList[index].value = e.mp.detail;
            this.refreshList();
        },
        // 获取图书列表
        queryBook() {
            let data = {
                categoryIds: this.calccategoryIds(),
                name: this.searchInput,
                readingHallId: this.shopId,
                page: this.page,
                size: this.size
            };
            this.$http.queryBook(data).then(res => {
                this.$refs.search.inputValue = this.searchInput;
                this.total = res.total;
                if (this.page === 1) {
                    this.bookList = res.bookVOS;
                } else {
                    this.bookList = [...this.bookList, ...res.bookVOS];
                }
            });
        },
        // 刷新列表
        refreshList() {
            this.page = 1;
            this.queryBook();
        },
        // 搜索
        searchBook(e) {
            this.searchInput = e;
            this.refreshList();
        },
        // 上拉加载
        scrollBottom() {
            if (this.total === this.bookList.length) {
                return;
            }
            this.page = this.page + 1;
            this.queryBook();
        },
        // 点击图书
        bookClick(book) {
            if (!this.judgeLogin()) {
                return this.getLogin();
            }
            wx.navigateTo(`bookDetail/main?id=${book.id}`);
        },
        // 添加收藏
        collectBook(book) {
            if (!this.judgeLogin()) {
                return this.getLogin();
            }
            let data = {
                bizId: book.id,
                type: 1 // 类型：1-图书，2-活动
            };
            if (book.isCollect) {
                this.$http.deleteCollection(data).then(res => {
                    Tips.success("取消收藏成功！");
                    this.refreshList();
                });
            } else {
                this.$http.addCollection(data).then(res => {
                    Tips.success("收藏成功！");
                    this.refreshList();
                });
            }
        },
        // 查询书包
        queryBag() {
            this.$http.queryBag().then(res => {
                if (!res.bookBorrowVOS) {
                    this.cartCoverShow = false;
                }
                this.bagList = res.bookBorrowVOS || [];
            });
        },
        // 加入书包
        addBookToBag(book) {
            if (!this.judgeLogin()) {
                return this.getLogin();
            }
            if (!book.remainStock) {
                return Tips.toast("库存不足！");
            }
            let data = {
                bookId: book.id
            };
            this.$http.addBag(data).then(res => {
                Tips.success("加入书包成功！");
                this.queryBag();
            });
        },
        // 从书包删除
        deleteBag(book) {
            let data = {
                ids: [book.id]
            };
            this.$http.deleteBag(data).then(res => {
                Tips.success("删除成功！");
                this.queryBag();
            });
        },
        // 点击书包
        cartBtnClick() {
            if (!this.judgeLogin()) {
                return this.getLogin();
            }
            if (!this.bagList.length) {
                return Tips.toast("书包空空如也，快去添加图书吧！");
            }
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
.container {
    .top {
        .menus {
            width: 750rpx;
            overflow-x: scroll;
            overflow-y: hidden;
            /deep/ .van-dropdown-menu {
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                float: left; // 使其脱离文档流 宽度为所有字元素的和
                min-width: 100%;
                .van-dropdown-menu__item {
                    float: left;
                    max-width: 300rpx;
                    margin-right: 10rpx;
                }
            }
        }
    }
}
</style>
