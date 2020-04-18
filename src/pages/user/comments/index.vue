<template>
    <div class="container">
        <van-collapse :value="commentActive" @change="onChange" accordion>
            <van-collapse-item
                v-for="(item, index) in commentList"
                :key="index"
                :title="item.bizName"
                :name="item.bizId"
            ></van-collapse-item>
        </van-collapse>
    </div>
</template>
<script>
export default {
    data() {
        return {
            commentList: [],
            commentActive: null
        };
    },
    onLoad() {
        this.getMyComment();
    },
    methods: {
        // 查询我的评论
        getMyComment() {
            let params = {};
            this.$http.getMyComment(params).then(res => {
                this.commentList = res.myCommentVOS;
            });
        },
        // 点击折叠面板
        onChange(e) {
            this.commentActive = e.mp.detail;
        }
    }
};
</script>
<style lang="scss" scoped>
</style>