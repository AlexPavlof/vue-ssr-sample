<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'App',
};
</script>

<style lang="less">
@import "~normalize.css/normalize.css";

* {
    box-sizing: border-box;
}

body {
    font-family: "Open Sans", sans-serif;
}

h1 {
    font-weight: 800;
    margin: 32px 0 16px;
}

h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 16px 0;
}
</style>
