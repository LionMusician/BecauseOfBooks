<template>
    <div>
        <web-view :src="link"></web-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            link: ""
        };
    },
    onLoad() {
        this.link = this.$root.$mp.query.link;
    }
};
</script>