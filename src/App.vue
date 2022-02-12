<template>

  <a-layout>
    <a-layout-header>
      <Header/>
    </a-layout-header>
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
@media screen and (max-width:1000px ){
  .ant-layout-header{
    padding: 0 1em 0 0!important;
  }
}
</style>
