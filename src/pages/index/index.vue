<template>
	<div class="container">
		<van-row class="vanRow">
			<van-col span="6">
				<div class="imgDiv">
					<img src="../../../static/images/home/logo.png" alt>
				</div>
			</van-col>
			<van-col span="18">
				<van-dropdown-menu class="dropdownMenu">
					<van-dropdown-item v-model="shopName" :options="shopOptions"/>
				</van-dropdown-menu>
			</van-col>
		</van-row>
	</div>
</template>

<script>
import wx from "@/utils/wx-api";
import utils from "@/utils/utils";
import CONFIG from "@/config";
import { mapState, mapMutations } from "vuex";
import { TEST, MASTER_KEY } from "@/store/mutation-type";

export default {
	data() {
		return {
			shopName: 0,
			shopOptions: [
				{ text: "全部商品", value: 0 },
				{ text: "新款商品", value: 1 },
				{ text: "活动商品", value: 2 }
			]
		};
	},
	computed: {
		...mapState(["test", "master_key"])
	},
	onLoad() {},
	methods: {
		...mapMutations([TEST, MASTER_KEY])
	}
};
</script>

<style lang="scss" scoped>
.container {
	.vanRow {
		height: 50rpx;
		overflow: hidden;
		.imgDiv {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 46rpx;
			img {
				width: 85rpx;
				height: 43rpx;
			}
		}
		.selectShop {
			height: 50rpx;
			line-height: 50rpx;
			padding-left: 4rpx;
		}
		.dropdownMenu {
			display: flex;
			justify-content: flex-start;
			height: 50rpx;
			align-items: center;
			// font-size: $--text-nm;
		}
	}
}
</style>
