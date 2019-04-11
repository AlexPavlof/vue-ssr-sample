<template>
    <div
        class="item"
        :style="getBackground(id)"
        @click="goTo(id)">
        <h3>{{ title }}</h3>
        <p>{{ desc }}</p>
    </div>
</template>

<script type="text/javascript">
export default {
    name:    'Item',
    props: {
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    methods: {
        getBackground(key) {
            return `background: url(/public/images/${key}.jpg) no-repeat center; background-size: cover;`;
        },
        goTo(city) {
            this.$router.push({ name: 'city', params: { city } });
        },
    },
};
</script>

<style lang="less" scoped>
.item {
        background-color: #f0f0f0;
        border-radius: 10px;
        height: 250px;
        margin-bottom: 15px;
        width: 150px;
        position: relative;
        transition: all .3s ease-in-out;

        &:nth-child(3n+3) {
            height: 150px;
            width: 320px;
        }

        &:hover {
            box-shadow: 0 0 10px rgba(0, 0, 0, .3);
        }

        h3 {
            color: #fff;
            font-size: 20px;
            font-weight: 600;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
            position: absolute;
            margin: 0;
            bottom: 30px;
            left: 10px;
        }

        p {
            color: #fff;
            font-size: 13px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
            position: absolute;
            margin: 0;
            bottom: 10px;
            left: 10px;
        }
    }
</style>
