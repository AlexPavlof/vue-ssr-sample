<template>
    <div class="search">
        <div class="input-group">
            <input />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Search',
}
</script>

<style lang="less" scoped>
.search {
    .input-group {
        background-color: #e0e0e0;
        border-radius: 10px;
        height: 40px;
        position: relative;
        
        input {
            background-color: transparent;
            border: 0;
            height: 40px;
            outline: 0;
            padding: 0 8px 0 32px;
            width: 100%;
        }

        &::before {
            color: #999;
            font-family: 'Font Awesome 5 Free';
            content: '\f002';
            position: absolute;
            top: 11px;
            left: 10px;
        }
    }
}
</style>
