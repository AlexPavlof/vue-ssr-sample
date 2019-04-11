<template>
    <div>
        <loader v-if="loading"></loader>
        <div
            v-else 
            class="page main">
            <h1>Explore</h1>
            <search></search>
            <h2>Best places to visit</h2>
            <items-list></items-list>
        </div>
    </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import Search       from '../blocks/Search.vue';
import ItemsList    from '../blocks/ItemsList.vue';
import Loader       from '../blocks/Loader.vue';

export default {
    name:  'MainPage',
    components: {
        Search,
        ItemsList,
        Loader,
    },
    computed: {
        ...mapState('cities', [
            'loading',
        ]),
    },
    asyncData({ store }) {
        return store.dispatch('cities/fetchData');
    },
};
</script>

<style lang="less">
.page {
    width: 320px;
    margin: 0 auto;
}
</style>
