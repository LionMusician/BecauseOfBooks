<template>
	<div class="container">
		<!-- 头部 -->
		<header-view title="个人信息"></header-view>
		<div class="content">
			<!-- 家长信息 -->
			<div class="title">家长信息</div>
			<van-cell-group>
				<van-cell title="头像">
					
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
                <van-field
                    :value="userInfo.wechatNo"
                    clearable
                    label="收货地址"
                    placeholder="请填写"
					input-align="right"
                    @change="(e)=>{return input(e, 'wechatNo')}"
                />
			</van-cell-group>

			<!-- 宝宝信息 -->
			<div class="title">宝宝信息</div>
			<van-cell-group>
				<van-cell title="头像">
					
				</van-cell>
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
                    :value="userInfo.childSex"
                    label="性别"
					input-align="right"
                    placeholder="选择省/市/区"
                    disabled
                    is-link
                    @click="showAreaPicker"
                />
                <van-field
                    :value="userInfo.childBirthday"
                    clearable
                    label="生日"
                    placeholder="请填写"
					input-align="right"
                    @change="(e)=>{return input(e, 'childBirthday')}"
                />
			</van-cell-group>
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
import headerView from "@components/headerView.vue";
import utils from "@/utils/utils";
export default {
	name: "",
	data() {
		return {
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
            ]
		};
	},
	onLoad() {
		// 获取个人信息
		this.getUserInfo();
	},
	methods: {
		// 获取个人信息
		getUserInfo() {
			this.$http.getUserInfo().then(res => {
				res.userVO.childSex = res.userVO.childSex === 1 ? "男" : "女";
				res.userVO.address =
					res.userVO.provinceName ||
					"" + " " + res.userVO.cityName ||
					"" + " " + res.userVO.countyName ||
					"";
				if (res.userVO.childBirthday) {
					res.userVO.childBirthday = utils
						.mklog(res.userVO.childBirthday)
						.split(" ")[0];
				}

				this.userInfo = res.userVO;
			});
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
                }`
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
		.ul {
			padding: 0 20rpx;
			background: $--color-white;
			.liItem {
				@include fj();
				border-bottom: 1px solid $--color-gray-de;
				padding: 26rpx 20rpx;
				.left {
					font-size: $--text-l;
				}
				.right {
					@include fj();
					.imgDiv {
						width: 80rpx;
						height: 80rpx;
						border-radius: 80rpx;
						background: $--color-green;
						overflow: hidden;
						img {
							width: 80rpx;
							height: 80rpx;
						}
					}
					.icon {
						font-size: $--text-xl;
						color: $--color-text;
					}
					.value {
						font-size: $--text-l;
						color: $--color-text;
					}
				}
			}
			.liItem:last-child {
				border-bottom: none;
			}
		}
	}
}
</style>