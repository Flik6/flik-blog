<template >
  <div>
    <div>
      <a-button type="primary">Primary Button</a-button>
    </div>
  </div>
</template>

<script>

export default {

  name: "LayoutFooter",
  data() {
    return {}
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
.footer-copy-right {
  font-size: small;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.footer-link {
  font-size: small;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}


a {
  text-decoration: none;
}

a:hover {
  color: #2c3e50;
}

a:after {
  color: #475669;

}

a:before {
  color: #475669;
}


</style>