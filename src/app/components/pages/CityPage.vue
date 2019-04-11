<template>
    <div>
        <loader v-if="loading"></loader>
        <div
            v-else
            class="page city">
            <div class="city__background" :style="getBackground(city.key)">
                <router-link :to="{ name: 'main' }">
                    <i class="fas fa-chevron-left"></i>
                </router-link>
                <div class="city__title">{{ city.title }}</div>
                <div class="city__description">{{ city.desc }}</div>
            </div>
            <div class="city__text" v-html="city.text"></div>
        </div>
    </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import Loader       from '../blocks/Loader.vue';

export default {
    name:       'CityPage',
    components: {
        Loader,
    },
    computed: {
        ...mapState('cities', [
            'city',
            'loading',
        ]),
    },
    methods: {
        getBackground(key) {
            return `background: url(/public/images/${key}.jpg) no-repeat center; background-size: cover;`;
        },
    },
    asyncData({ store, route }) {
        return store.dispatch('cities/getCurrent', { city: route.params.city });
    },
};
</script>

<style lang="less" scoped>
.city {
    &__background {
        height: 300px;
        margin-bottom: 15px;
        position: relative;
        width: 100%;
    }

    &__title {
        color: #fff;
        font-size: 40px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
        position: absolute;
        margin: 0;
        bottom: 40px;
        left: 10px;
    }

    &__description {
        color: #fff;
        font-size: 20px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
        position: absolute;
        margin: 0;
        bottom: 10px;
        left: 10px;
    }

    &__text {
        line-height: 1.5;
        font-size: 15px;
        font-weight: 300;
    }

    .router-link-active {
        color: #fff;
        position: absolute;
        top: 10px;
        left: 10px;
    }
}
</style>
