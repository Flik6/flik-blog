<template>
  <div class="header">
    <div class="logo"/>
    <div class="menu">
      <a-menu
          :selectedKeys="menuKey"
          theme="dark"
          mode="horizontal"
      >
        <a-menu-item @click="$router.push('/')" key="1">首页</a-menu-item>

        <a-menu-item key="2">公共Api</a-menu-item>
        <a-menu-item key="3">个人中心</a-menu-item>

      </a-menu>

    </div>
    <div class="avatar">
      <a-dropdown>
        <a-badge dot>
          <a-avatar
              shape="square"
              size="large"
              :style="{ backgroundColor: '#f56a00', verticalAlign: 'middle'}"
          >
            {{ userName }}
          </a-avatar>
        </a-badge>
        <template #overlay>
          <a-menu @click="clickUserMenu">
            <a-menu-item key="1">个人资料</a-menu-item>
            <a-menu-item key="2">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuKey: ['1'],
      userName: 'Flik'
    }
  },methods:{
    clickUserMenu(item_key){


    }
  }
}
</script>

<style scoped>
/*手机*/
@media screen and (max-width:600px){
  .logo {
    width: 13%;

  }
}
/*平板*/
@media screen and (min-width:600px) and (max-width:960px){
  .logo {
    width: 8%;

  }
}
/*PC*/
@media screen and (min-width:960px){
  .logo {
    width: 5%;

  }
}

.logo{
  height: 100%;
  /*float: left;*/
  background-image: url("../assets/Flik.jpg");
  background-size: auto 100%;
  background-repeat: no-repeat;
  margin-right: 1em;
}



.avatar {
  float: right;
}

.menu {
  flex: 1;
}

.header {
  white-space: nowrap;
  height: 100%;
  display: flex;
}
</style>