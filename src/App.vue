<template>

    <a-layout id="layout-ui">
        <a-affix>
            <a-layout-header>
                <Header/>
            </a-layout-header>
        </a-affix>
        <a-layout-content>
            <router-view/>
        </a-layout-content>
        <a-layout-footer>
            <Footer/>
        </a-layout-footer>
    </a-layout>

</template>
<script>
import Header from "@/views/Header";
import Footer from "@/views/Footer";


export default {
    components: {
        Header,
        Footer,
    }

}
</script>
<style>
#app{
    height: 100%;
}
#layout-ui{
    min-height: 100%;
}
.ant-layout-content{
    display: flex;
    flex-direction: column;
}
</style>
