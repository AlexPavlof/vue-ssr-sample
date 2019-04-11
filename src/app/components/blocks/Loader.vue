<template>
    <div class="loader">
        <div class="loader__text">
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
    name: 'Loader',
}
</script>

<style lang="less" scoped>
.loader {
    background-color: #fff;
    display: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;

    &__text {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
    }
}

.spinner {
    margin: 100px auto 0;
    width: 70px;
    text-align: center;

    > div {
        width: 18px;
        height: 18px;
        background-color: #333;

        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }
}

@-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
    0%, 80%, 100% { 
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    40% { 
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
    }
}
</style>
