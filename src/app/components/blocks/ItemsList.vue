<template>
    <div class="items-list">
        <item
            v-for="(item, key) in cities"
            :key="key"
            :id="key"
            :title="item.title"
            :desc="item.desc" />
    </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import Item         from './Item.vue';

export default {
    name:     'ItemsList',
    components: {
        Item,
    },
    computed: {
        ...mapState('cities', [
            'cities',
        ]),
    },
};
</script>

<style lang="less" scoped>
.items-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
</style>
