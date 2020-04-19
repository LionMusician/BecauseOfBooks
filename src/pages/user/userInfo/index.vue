<template>
    <div class="container">
        <!-- 头部 -->
        <header-view title="个人信息"></header-view>
        <div class="content">
            <!-- 家长信息 -->
            <div class="title">家长信息</div>
            <van-cell-group>
                <van-cell title="头像">
                    <van-uploader
                        slot="right-icon"
                        :file-list="fileList"
                        @afterRead="afterRead"
                        @delete="deleteFile"
                        max-count="1"
                    ></van-uploader>
                </van-cell>
                <van-field
                    :value="userInfo.name"
                    clearable
                    label="姓名"
                    placeholder="请填写"
                    input-align="right"
                    @change="(e)=>{return input(e, 'name')}"
                />
                <van-field
                    :value="userInfo.phone"
                    clearable
                    disabled
                    type="number"
                    label="手机号"
                    input-align="right"
                    placeholder="手机号"
                    @change="(e)=>{return input(e, 'phone')}"
                />
                <van-field
                    v-if="!smartShow"
                    :value="userInfo.address"
                    label="地区"
                    input-align="right"
                    placeholder="选择省/市/区"
                    disabled
                    is-link
                    @click="showAreaPicker"
                />
                <van-field
                    :value="userInfo.wechatNo"
                    clearable
                    label="微信号"
                    placeholder="请填写"
                    input-align="right"
                    @change="(e)=>{return input(e, 'wechatNo')}"
                />
                <!-- <van-field
                    :value="userInfo.wechatNo"
                    clearable
                    label="收货地址"
                    placeholder="请填写"
                    input-align="right"
                    @change="(e)=>{return input(e, 'wechatNo')}"
                />-->
            </van-cell-group>

            <!-- 宝宝信息 -->
            <div class="title">宝宝信息</div>
            <van-cell-group>
                <van-field
                    :value="userInfo.childName"
                    clearable
                    label="姓名"
                    placeholder="请填写"
                    input-align="right"
                    @change="(e)=>{return input(e, 'childName')}"
                />
                <van-field
                    v-if="!smartShow"
                    :value="userInfo.childSexLabel"
                    label="性别"
                    input-align="right"
                    placeholder="选择性别"
                    disabled
                    is-link
                    @click="showGenderPicker"
                />
                <van-field
                    :value="userInfo.childBirthday"
                    clearable
                    label="生日"
                    placeholder="请填写"
                    input-align="right"
                    disabled
                    is-link
                    @click="showTimePicker"
                />
            </van-cell-group>
            <div class="submit">
                <van-button block type="primary" color="#98C145" @click="submitUserInfo">保存</van-button>
            </div>
        </div>
        <!-- 选择地区 -->
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
        <!-- 选择性别 -->
        <van-popup :show="genderShow" @close="genderHide" position="bottom">
            <van-picker :columns="gender" @confirm="selectGender" value-key="label" show-toolbar />
        </van-popup>
        <!-- 选择生日 -->
        <van-popup :show="timePickerShow" @close="timePickerHide" position="bottom">
            <van-datetime-picker
                type="date"
                :value="currentDate"
                :min-date="minDate"
                :max-date="currentDate"
                :v-else="maxDate"
                @confirm="birthSelect"
            />
        </van-popup>
    </div>
</template>

<script>
import headerView from "@components/headerView.vue";
import utils from "@/utils/utils";
import wx from "@/utils/wx-api";
import Tips from "@/utils/Tips";
import { mapActions } from "vuex";
export default {
    name: "",
    data() {
        return {
            fileList: [],
            userInfo: {},
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
            ],
            genderShow: false,
            gender: [
                {
                    value: 1,
                    label: "男"
                },
                {
                    value: 2,
                    label: "女"
                }
            ],
            timePickerShow: false,
            currentDate: new Date().getTime(),
            minDate: new Date("2000-01-01").getTime(),
            formatter(type, value) {
                if (type === "year") {
                    return `${value}年`;
                } else if (type === "month") {
                    return `${value}月`;
                }
                return value;
            }
        };
    },
    onLoad() {
        // 获取个人信息
        this.getUserInfo();
    },
    methods: {
        ...mapActions(["setUserInfo"]),
        // 获取个人信息
        getUserInfo() {
            this.$http.getUserInfo().then(res => {
                this.setUserInfo(res.userVO);
                res.userVO.childSexLabel =
                    res.userVO.childSex === 1 ? "男" : "女";
                res.userVO.address = `${res.userVO.provinceName || ""} ${res
                    .userVO.cityName || ""} ${res.userVO.countyName || ""}`;
                if (res.userVO.childBirthday) {
                    res.userVO.childBirthday = utils
                        .mklog(res.userVO.childBirthday)
                        .split(" ")[0];
                }

                this.userInfo = res.userVO;
                this.fileList = [
                    {
                        url: res.userVO.headImage
                    }
                ];
            });
        },
        // 保存个人信息
        submitUserInfo() {
            let params = {
                userVO: {
                    ...this.userInfo,
                    childBirthday: this.userInfo.childBirthday + " 00:00:00"
                }
            };
            this.$http.updateUserInfo(params).then(res => {
                Tips.success("保存成功！");
                this.getUserInfo();
                // setTimeout(() => {
                //     wx.navigateBack();
                // }, 1000);
            });
        },
        // 选择文件
        afterRead(e) {
            let path = e.mp.detail.file.path;
            wx.uploadFile(path, res => {
                this.fileList = [
                    {
                        url: res.fileUrl
                    }
                ];
                this.userInfo.headImage = res.fileUrl;
            });
        },
        // 删除头像
        deleteFile(e) {
            this.fileList = [];
            this.userInfo.headImage = "";
        },
        // 输入框
        input(e, key) {
            this.$set(this.userInfo, key, e.mp.detail);
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
            this.userInfo = {
                ...this.userInfo,
                address: `${detail.value[0].name} ${detail.value[1].name} ${
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
        // 打开选择性别
        showGenderPicker() {
            this.genderShow = true;
        },
        // 选择性别
        selectGender(e) {
            let detail = e.mp.detail;
            this.userInfo.childSexLabel = detail.value.label;
            this.userInfo.childSex = detail.value.value;
            this.genderHide();
        },
        // 关闭选择性别
        genderHide() {
            this.genderShow = false;
        },
        // 打开选择生日
        showTimePicker() {
            this.timePickerShow = true;
        },
        // 选择生日
        birthSelect(e) {
            let detail = e.mp.detail;
            this.userInfo.childBirthday = utils.mklog(detail).substring(0, 10);
            this.timePickerHide();
        },
        // 关闭选择生日
        timePickerHide() {
            this.timePickerShow = false;
        },
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
        }
    },
    components: {
        headerView
    }
};
</script>

<style lang="scss" scoped>
.container {
    height: 100vh;
    padding-bottom: 40rpx;
    background: $--color-bg;
    .content {
        .title {
            font-size: $--text-l;
            color: $--color-text;
            padding: 20rpx 40rpx;
        }
        .submit {
            @include wh(690rpx, 100rpx);
            margin: 30rpx auto;
        }
    }
}
</style>