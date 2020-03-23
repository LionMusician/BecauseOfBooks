<template>
    <div class="main">
        <video class="video-view" :src="videoUrl" enable-progress-gesture enable-play-gesture play-btn-position="center"></video>
    </div>
</template>
<script>
export default {
    props: {
        videoUrl: {
            type: String,
            default: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
        }
    }
}
</script>
<style lang="scss" scoped>
.main {
    padding: 10rpx;
    @include wh(690rpx, 320rpx);
    .video-view {
        @include wh(670rpx, 300rpx);
    }
}
</style>