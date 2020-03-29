<template>
    <div class="main">
        <van-cell-group v-if="addrList.length">
            <van-swipe-cell v-for="(item, index) in addrList" :key="index" :right-width="100">
                <van-cell center :title="item.title" :label="item.label">
                    <van-icon
                        slot="right-icon"
                        :name="item.isDefault ? 'checked' : ''"
                        :class="item.isDefault ? 'icon-checked' : ''"
                    />
                </van-cell>
                <div slot="right" class="van-swipe-cell__right">
                    <div class="edit" @click="editAddr(item)">编辑</div>
                    <div class="delete" @click="delAddr(item)">删除</div>
                </div>
            </van-swipe-cell>
        </van-cell-group>
        <no-data v-else></no-data>
        <div class="bottom">
            <van-button type="primary" size="normal" color="#98C145" block @click="newAddress">新增地址</van-button>
        </div>
    </div>
</template>
<script>
import noData from "@components/noData.vue";
import wx from "@/utils/wx-api";
export default {
    data() {
        return {
            addrList: []
        };
    },
    components: { noData },
    onLoad() {
        wx.setNavigationBarTitle("收货地址");
        this.getReceiveAddress();
    },
    methods: {
        newAddress() {
            wx.navigateTo(`../editAddress/main`);
        },
        // 获取地址列表
        getReceiveAddress() {
            let data = {};
            this.$http.getReceiveAddress(data).then(res => {
                this.addrList = res.receiveAddressVOS.map(item => {
                    item.title = `${item.name} ${item.phone}`;
                    item.label = `${item.provinceName}${item.cityName}${
                        item.countyName
                    }${item.address}`;
                    return item;
                });
            });
        },
        // 编辑地址
        editAddr(item) {
            console.log(item);
            
        },
        // 编辑地址
        delAddr(item) {
            let data = {
                ids: [item.id]
            }
            this.$http.deleteReceiveAddress(data).then(res => {
                Tips.success("删除成功！");
                this.getReceiveAddress();
            })
        },
    }
};
</script>
<style lang="scss" scoped>
.main {
    min-height: 100vh;
    .bottom {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
    }
    .van-swipe-cell__right {
        @include fj(center);
        @include sc($--text-lg, $--color-white);
        .edit {
            background: $--color-primary;
            @include wh(100rpx, 130rpx);
            @include fc(center);
        }
        .delete {
            background: $--color-danger;
            @include wh(100rpx, 130rpx);
            @include fc(center);
        }
    }
    .icon-checked {
        @include sc($--text-xxl, $--color-primary);
    }
}
</style>