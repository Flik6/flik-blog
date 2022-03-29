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

    <div class="avatar" v-show="!loginState" >
      <a-button type="primary" shape="circle" @click="state.isAlertLoginWindow=!state.isAlertLoginWindow">
        <template #icon><UserOutlined /></template>
      </a-button>
      <span style="color: white"> 登录</span>
    </div>
    <div class="avatar" v-show="loginState">
      <a-dropdown>
        <!--        <a-badge dot>-->
        <a-avatar
            shape="square"
            size="large"
            :style="{ backgroundColor: '#f56a00', verticalAlign: 'middle'}"
        >
          {{ userName }}
        </a-avatar>
        <!--        </a-badge>-->
        <template #overlay>
          <a-menu @click="clickUserMenu">
            <a-menu-item key="1">个人资料</a-menu-item>
            <a-menu-item key="2">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <!--    网站登录框-->


  </div>
  <a-drawer
      v-model:visible="state.isAlertLoginWindow"
      class="custom-class"
      style="color: red"
      title="Basic Drawer"
      placement="right"
      size="large"
  >
    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
      <a-form-item
          label="账号"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="userData.username" />
      </a-form-item>

      <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="userData.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="userData.remember">Remember me</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit" @click="submitData()">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script>
import {UserOutlined} from '@ant-design/icons-vue';

export default {
  name: "Header",
  data() {
    return {
      menuKey: ['1'],  // 菜单选中的序列号
      userName: 'Flik',
      state:{
        isAlertLoginWindow:true
      },
      userData: {
        username: "",
        password: "",
        remember:false
      },  //用户数据
    }
  }, methods: {

    submitData() {
      let that = this
      that.$postRequest("/api/user/login", that.userData).then(function (response) {
        if (!response) {
          //不存在返回值
          // that.successNotice = !that.successNotice;
          console.log("登录失败")


        } else {
          const tokenStr = response.data.tokenHead + response.data.token;
          const parseList = response.data.token.split(".")
          //负载
          const payload = window.atob(parseList[1])
          //向vuex内存入token 并写入到sessionStorage
          that.$store.commit("setToken", tokenStr)
          // that.$store.commit("setUsername", payload.username)
          that.$store.commit("setPayload", payload)
          that.isAlertLoginWindow = false;
          // location.reload();
        }
      }).catch(function (error) {
        that.successNotice = true;
        that.$notify.info({
          title: "错误",
          message: error
        });
        that.resultNotice.iconStr = "error";
        that.resultNotice.titleStr = "错误";
        that.resultNotice.subTitle = error;
      })
    },
  }, components: {
    UserOutlined
  }, computed: {
    loginState() {
      //判断网页登陆状态，根据存入vuex的状态判断
      if (this.$store.state.token) {
        return true;
      } else {
        return false;
      }
    },
  }
}
</script>

<style scoped>

/*手机*/
@media screen and (max-width: 600px) {
  .logo {
    width: 13%;

  }
}

/*平板*/
@media screen and (min-width: 600px) and (max-width: 960px) {
  .logo {
    width: 8%;

  }
}

/*PC*/
@media screen and (min-width: 960px) {
  .logo {
    width: 5%;

  }
}

.logo {
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