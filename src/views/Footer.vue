<template>
  <div>
    <div>
      <div class="icon"><a href="http://www.qijishow.com/Brand/Brand5/index.htm" target="_blank" title="微信公众号">
        <wechat-outlined/>
        微信公众号</a></div>
      <div class="copyrights_certificate"><a href="https://beian.miit.gov.cn" target="_blank">豫ICP备2021012196号</a>　<a>因设计.而美丽</a>　Copyright
        © 82coco.cn. All Rights Reserved.
      </div>
    </div>
  </div>
</template>

<script>
import {WechatOutlined} from '@ant-design/icons-vue';

export default {

  name: "LayoutFooter",
  data() {
    return {}
  }, components: {
    WechatOutlined,
  },
  methods: {
    // setClientWidth(){
    //   this.clientWidth=document.body.clientWidth
    // }
  },
  mounted() {
    // let that= this;
    // window.onresize=()=>{
    //   return (()=>{
    //     that.setClientWidth()
    //   })
    // }
  }
}
</script>

<style scoped>

.copyrights_certificate {
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  padding: 0;
  list-style-image: none;
  list-style-type: none;
  height: 30px;
  font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  color: #999999;
  float: right;
}

.icon {
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  padding: 0;
  list-style-image: none;
  list-style-type: none;
  height: 37px;
  font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  color: #a5a5a5;
  float: left;
  text-align: right;
}

</style>