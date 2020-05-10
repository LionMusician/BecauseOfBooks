<template>
    <div class="main">
        <video
            class="video-view"
            :src="videoUrl"
            enable-progress-gesture
            enable-play-gesture
            play-btn-position="center"
        ></video>
    </div>
</template>
<script>
export default {
    props: {
        videoUrl: {
            type: String
        }
    }
};
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