<template>
    <div class="main">
        <div class="addr-form">
            <van-cell-group>
                <van-field
                    :value="newAddr.name"
                    clearable
                    label="姓名"
                    placeholder="收货人姓名"
                    @change="(e)=>{return input(e, 'name')}"
                />
                <van-field
                    :value="newAddr.phone"
                    clearable
                    type="number"
                    label="电话"
                    placeholder="收货人手机号"
                    @change="(e)=>{return input(e, 'phone')}"
                />
                <van-field
                    v-if="!smartShow"
                    :value="newAddr.area"
                    label="地区"
                    placeholder="选择省/市/区"
                    disabled
                    is-link
                    @click="showAreaPicker"
                />
                <van-field
                    v-if="!smartShow"
                    :value="newAddr.address"
                    clearable
                    label="详细地址"
                    placeholder="街道门牌、楼层房间号等信息"
                    @change="(e)=>{return input(e, 'address')}"
                />
                <van-field
                    v-if="smartShow"
                    :value="smartAddr"
                    label="地址"
                    type="textarea"
                    placeholder="输入或粘贴地址信息，如浙江省杭州市西湖区文一路29号"
                    autosize
                />
                <van-cell value="智能识别地址" value-class="cell-value" @click="showSmart" />
            </van-cell-group>
        </div>
        <div class="submit-btn">
            <van-button type="primary" size="normal" color="#98C145" block @click="submitAddr">保存并使用</van-button>
        </div>
        <van-popup :show="areaShow" @close="areaHide" position="bottom">
            <van-picker
                :columns="columns"
                @change="onChange"
                @confirm="selectArea"
                :loading="pickerLoading"
                value-key="name"
                show-toolbar
            />
        </van-popup>
    </div>
</template>
<script>
import wx from "@/utils/wx-api";
import Tips from "@/utils/Tips";
export default {
    data() {
        return {
            newAddr: {
                id: "",
                name: "",
                phone: "",
                area: "",
                address: "",
                provinceId: null,
                provinceName: "",
                cityId: null,
                cityName: "",
                countyId: null,
                countyName: ""
            },
            smartShow: false,
            areaShow: false,
            pickerLoading: false,
            columns: [
                {
                    values: [],
                    className: "prove"
                },
                {
                    values: [],
                    className: "city"
                },
                {
                    values: [],
                    className: "area"
                }
            ]
        };
    },
    onLoad() {
        wx.setNavigationBarTitle("编辑收货地址");
        this.getReceiveAddressById();
    },
    onUnload() {
        Object.assign(this.$data, this.$options.data());
    },
    methods: {
        // 编辑获取地址信息
        getReceiveAddressById() {
            let id = this.$root.$mp.query.id;
            if (id) {
                let params = {
                    id: id
                };
                this.$http.getReceiveAddressById(params).then(res => {
                    let addr = { ...res.receiveAddressVO };
                    addr.area = `${addr.provinceName} ${addr.cityName} ${
                        addr.countyName
                    }`;
                    this.newAddr = addr;
                });
            }
        },
        // 输入框
        input(e, key) {
            this.$set(this.newAddr, key, e.mp.detail);
        },
        // 打开选择地区
        showAreaPicker() {
            let columns = this.columns;
            if (columns[0].values.length) {
                if (columns[1].values.length) {
                    if (columns[2].values.length) {
                    } else {
                        this.pickerLoading = true;
                        this.queryArea(3);
                    }
                } else {
                    this.pickerLoading = true;
                    this.queryArea(2);
                }
            } else {
                this.pickerLoading = true;
                this.queryArea(1);
            }
            this.areaShow = true;
        },
        // 隐藏地区选择
        areaHide() {
            this.areaShow = false;
        },
        // 滑动选择
        onChange(e) {},
        // 选择确认
        selectArea(e) {
            let detail = e.mp.detail;
            this.newAddr = {
                ...this.newAddr,
                area: `${detail.value[0].name} ${detail.value[1].name} ${
                    detail.value[2].name
                }`,
                provinceId: detail.value[0].id,
                provinceName: detail.value[0].name,
                cityId: detail.value[1].id,
                cityName: detail.value[1].name,
                countyId: detail.value[2].id,
                countyName: detail.value[2].name
            };
            this.areaHide();
        },
        // 点击智能识别
        showSmart() {
            this.smartShow = true;
        },
        // 智能识别
        smartAnalysis() {},
        // 查询地区
        queryArea(type, parentId = "") {
            let params = {
                parentId,
                type
            };
            this.$http.queryArea(params).then(res => {
                let columns = this.columns;
                columns[type - 1].values = res.areaVOS;
                this.columns = columns;
                switch (type) {
                    case 1:
                        this.queryArea(2, res.areaVOS[0].id);
                        break;
                    case 2:
                        this.queryArea(3, res.areaVOS[0].id);
                        break;
                    case 3:
                        this.pickerLoading = false;
                        break;
                    default:
                        break;
                }
            });
        },
        // 保存地址
        submitAddr() {
            let addr = {
                ...this.newAddr
            };
            delete addr.area;
            let params = {
                receiveAddressVO: addr
            };
            this.$http.addReceiveAddress(params).then(res => {
                Tips.success('保存成功！');
                setTimeout(() => {
                    wx.navigateBack();
                }, 500);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.main {
    min-height: 100vh;
    background: $--color-bg;
    padding-top: 20rpx;
    .addr-form {
        margin-bottom: 30rpx;
    }
    .cell-value {
        color: $--color-blue !important;
    }
    .submit-btn {
        width: 690rpx;
        margin: 0 auto;
    }
}
</style>