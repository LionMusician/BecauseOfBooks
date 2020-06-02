<template>
    <div class="container">
        <van-collapse :value="commentActive" @change="onChange" accordion>
            <van-collapse-item
                v-for="(item, index) in commentList"
                :key="index"
                :title="item.bizName"
            >
                <ul v-if="item.commentVOS && item.commentVOS.length">
                    <li v-for="(tip, i) in item.commentVOS" :key="i">
                        <evaluate-item :evaluate="tip" page="user" @deleteComment="deleteComment"></evaluate-item>
                    </li>
                </ul>
            </van-collapse-item>
        </van-collapse>
        <no-data v-if="!commentList.length"></no-data>
        <!-- 删除评论弹窗 -->
        <van-dialog id="van-dialog" />
    </div>
</template>
<script>
import wx from "@/utils/wx-api";
import noData from "@components/noData.vue";
import evaluateItem from "@components/evaluateItem.vue";
import Dialog from "../../../../static/vant/dialog/dialog.js";
import Tips from "@/utils/Tips";
export default {
    data() {
        return {
            commentList: [],
            commentActive: null
        };
    },
    components: { noData, evaluateItem },
    onLoad() {
        wx.setNavigationBarTitle("我的评论");
        this.getMyComment();
    },
    methods: {
        // 查询我的评论
        getMyComment() {
            let params = {};
            this.$http.getMyComment(params).then(res => {
                this.commentList = res.myCommentVOS || [];
            });
        },
        // 点击折叠面板
        onChange(e) {
            let index = e.mp.detail;
            if (typeof index === "number") {
                this.getComment(index);
            }
            this.commentActive = index;
        },
        // 查询评论
        getComment(index) {
            let list = [...this.commentList];
            let params = {
                bizId: list[index].bizId,
                type: list[index].type
            };
            this.$http.getComment(params).then(res => {
                if(res.commentVOS && res.commentVOS.length) {
                    list[index].commentVOS = res.commentVOS;
                    this.commentList = list;
                } else {
                    this.getMyComment();
                }
            });
        },
        // 删除评论弹窗
        deleteComment(comment) {
            Dialog({
                message: `确认删除这条评论？`,
                asyncClose: true,
                showCancelButton: true
            })
                .then(() => {
                    this.deleteConfirm(comment);
                })
                .catch(() => {
                    Dialog.close();
                });
        },
        // 删除评论
        deleteConfirm(comment) {
            this.$http.deleteComment({ ids: [comment.id] }).then(res => {
                Tips.success("删除成功！");
                Dialog.close();
                this.getComment(this.commentActive);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
</style>