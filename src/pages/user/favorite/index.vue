<template>
    <div class="container">
        <div class="tab">
            <div
                class="tabItem"
                :class="active === '1' ? 'tabItemActive' : ''"
                @click="tabClick('1')"
            >
                <span>书籍</span>
                <!-- <span @click="editList('1')">编辑</span> -->
            </div>
            <div class="content"></div>
            <div
                class="tabItem"
                :class="active === '2' ? 'tabItemActive' : ''"
                @click="tabClick('2')"
            >
                <span>活动</span>
                <!-- <span @click="editList('1')">编辑</span> -->
            </div>
        </div>
        <!-- 删除商品弹框 -->
        <van-dialog id="van-dialog" />
        <!-- message 提示 -->
        <van-notify id="van-notify" />
        <!-- 列表 -->
        <scroll-view
            v-if="readList && readList.length"
            :scroll-y="readList"
            :style="'height:' + scrollHeight + 'rpx;'"
            class="book-list"
        >
            <div class="readListDiv">
                <van-swipe-cell :right-width="65" v-for="(item, index) in readList" :key="index">
                    <div class="readListView" @click="readDetail(item)">
                        <div class="left">
                            <div class="imgDiv">
                                <img :src="item.frontCover" alt />
                            </div>
                        </div>
                        <div class="right">
                            <p class="title">{{item.name}}</p>
                            <div v-if="active === '1'">
                                <div class="content">库存：{{item.remainStock}}</div>
                            </div>
                            <div v-else>
                                <div class="content">时间：{{item.startDate}} - {{item.endDate}}</div>
                                <div class="content">地址：{{item.address}}</div>
                            </div>
                        </div>
                    </div>
                    <view slot="right" class="swipe-cell-right" @click="delItem(item)">删除</view>
                </van-swipe-cell>
            </div>
        </scroll-view>
        <no-data v-else></no-data>
    </div>
</template>

<script>
import utils from "@/utils/utils";
import noData from "@components/noData.vue";
import Dialog from "../../../../static/vant/dialog/dialog.js";
import Notify from "../../../../static/vant/notify/notify.js";
import wx from "@/utils/wx-api";
export default {
    name: "",
    data() {
        let that = this;
        return {
            active: "1",
            scrollHeight: that.getWindowHeight(66),
            readList: [],
        };
    },
    onLoad() {
        this.active = this.$root.$mp.query.type;
        // 查询阅读指导列表
        this.getMyCollection();
    },
    methods: {
        // 阅读指导数据
        getMyCollection() {
            let parmas = {
                type: Number(this.active),
            };
            this.$http.getMyActivity(parmas).then((res) => {
                res.activityVOS &&
                    res.activityVOS.forEach((item) => {
                        if (item.startDate) {
                            item.startDate = utils.mklog(item.startDate);
                        }
                        if (item.endDate) {
                            item.endDate = utils.mklog(item.endDate);
                        }
                    });
                this.readList = res.activityVOS || [];
            });
        },
        /**
         * 切换图书，活动
         **/
        tabClick(index) {
            console.log(index);
            this.active = index;
            this.getMyCollection();
        },
        /**
         * 查看详情
         */
        readDetail(item) {
            switch (item.type) {
                case 1:
                    wx.navigateTo(
                        `/pages/book/bookDetail/main?id=${item.bizId}`
                    );
                    break;
                case 2:
                    wx.navigateTo(
                        `/pages/index/familyAct/detail/main?id=${item.bizId}`
                    );
                    break;
            }
        },
        /**
         * 删除
         */
        delItem(item) {
            console.log(item);
            Dialog({
                message: `确认删除收藏${
                    this.active === "1" ? "书籍" : "活动"
                }【${item.name}】？`,
                asyncClose: true,
                showCancelButton: true,
            })
                .then(() => {
                    let parmas = {
                        ids: [item.id],
                    };
                    this.deleteCollection(parmas);
                })
                .catch(() => {
                    Dialog.close();
                });
        },
        /**
         * 删除收藏
         */
        deleteCollection(parmas) {
            this.$http.deleteCollection(parmas).then((res) => {
                Notify({
                    type: "success",
                    message: "删除成功",
                });
                Dialog.close();
                this.getMyCollection();
            });
        },
        /**
         * 编辑收藏
         **/
        editList() {},
    },
    components: {
        noData,
    },
};
</script>

<style lang="scss" scoped>
.container {
    height: 100vh;
    background: $--color-bg;
    padding: 20rpx;
    .tab {
        @include fj();
        padding: 10rpx 20rpx;
        .tabItem {
            flex: 1;
            @include fj();
            border-radius: 12rpx;
            padding: 20rpx;
            font-size: $--text-xl;
            background: $--color-white;
            span:last-child {
                font-size: $--text-l;
                color: $--color-text;
            }
        }
        .tabItemActive {
            background: $--color-primary;
        }
        .content {
            width: 40rpx;
        }
    }
    .readListDiv {
        padding: 30rpx 0;
        .swipe-cell-right {
            position: absolute;
            top: 0;
            @include fj(center);
            height: 100%;
            width: 65px;
            color: $--color-white;
            background: $--color-danger;
        }
    }
    .readListView {
        @include fj();
        height: 240rpx;
        overflow: hidden;
        margin-bottom: 30rpx;
        background: $--color-white;
        border-radius: 12rpx;
        .left {
            width: 300rpx;
            .imgDiv {
                @include fc(center);
                width: 300rpx;
                height: 240rpx;
                overflow: hidden;
                img {
                    width: 200rpx;
                    height: 160rpx;
                }
            }
        }
        .right {
            flex: 1;
            height: 240rpx;
            .title {
                text-align: left;
                padding: 16rpx 0 10rpx 0;
            }
            .content {
                @include ellipsisn(5);
                color: $--color-text;
                font-size: $--text-nm;
            }
        }
    }
}
</style>