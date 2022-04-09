<template>
  <div class="info">
    <div style="display: flex;justify-content: flex-end">
      <a-button type="link"   @click="modifyInfo">修改</a-button>
      <a-button type="link" v-show="state.isModifyInfo" @click="this.state.isModifyInfo=!this.state.isModifyInfo">取消</a-button>
    </div>

    <div>
      <img style="position:relative;padding:0;margin: 2vh auto;width: 128px;height: 128px;left:50%;border-radius: 50%;transform:translate(-50%,0);" src="https://joeschmoe.io/api/v1/random"/>
    </div>
    <a-form
        layout="vertical"
        :model="userInfo"

    >
      <a-form-item>
        <a-input v-model:value="userInfo.username" placeholder="用户名">
          <template #prefix>
            <UserOutlined style="color: rgba(0, 0, 0, 0.25)"/>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input v-model:value="userInfo.nickname" placeholder="昵称">
          <template #prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input v-model:value="userInfo.age" placeholder="年龄">
          <template #prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
          </template>
        </a-input>
      </a-form-item>

<!--      性别-->
      <a-form-item>
        <a-input v-model:value="userInfo.gender" placeholder="性别">
          <template #prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input v-model:value="userInfo.email" placeholder="邮箱">
          <template #prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input v-model:value="userInfo.registerTime" placeholder="注册时间">
          <template #prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
          </template>
        </a-input>
      </a-form-item>

<!--      <a-form-item>-->
<!--        <a-button-->
<!--            type="primary"-->
<!--            html-type="submit"-->
<!--            style="left: 50%;transform:translate(-50%,0);"-->
<!--            v-show="state.isModifyInfo"-->

<!--        >-->
<!--          确认修改-->
<!--        </a-button>-->
<!--      </a-form-item>-->
    </a-form>
  </div>
</template>

<script>
import {UserOutlined} from '@ant-design/icons-vue';
import {LockOutlined} from '@ant-design/icons-vue';
import {message} from "ant-design-vue";

export default {
  name: "userInfo",
  data() {
    return {
      userInfo: {},
      state:{
        isModifyInfo:false,
      }
    }
  },methods:{
    getInfo() {
      this.$getRequest("/api/user/users").then(response => {
        if (!response) {
          console.log("获取用户信息失败")
          console.log(response)
          message.error("获取用户信息失败")
          this.$router.push("/");
        } else {
          // console.log(response.data)
          this.userInfo = response.data;
          this.userInfo.age = parseInt(this.userInfo.age)
          this.userInfo.gender ? this.userInfo.gender = "1" : this.userInfo.gender = "0"
        }
      }, error => {
        console.log(error)
      })
    },
    modifyInfo(){
      if (this.state.isModifyInfo){
        console.log("修改成功")
        // if (typeof this.form.age == 'string') {
        //   this.form.age = parseInt(this.form.age)
        // }
        // if (typeof this.form.gender == 'string') {
        //   this.form.gender = parseInt(this.form.gender)
        // }
        // this.putRequest("/api/user/users", this.userInfo).then(resp => {
        //   if (!resp) {
        //     console.log("更新用户信息失败")
        //     this.disableInput = true;
        //   } else {
        //
        //     this.disableInput = true;
        //   }
        //   this.form.gender = this.form.gender.toString()
        // }, error => {
        //
        // })
      }else{
        this.state.isModifyInfo=!this.state.isModifyInfo
      }
    }
  },mounted() {
    this.getInfo()
  }, components: {
    UserOutlined,
    LockOutlined
  }
}
</script>

<style scoped>

/*手机*/
@media screen and (max-width: 600px) {
  .info{
    margin: 5vh auto;
    width: 95%;
    padding: 2vh 3% 10vh 3%;
    background-color: white;
    border-radius: 3%;
  }
}
/*平板*/
@media screen and (min-width: 600px) and (max-width: 960px) {
  .info{
    margin: 5vh auto;
    width: 70%;
    padding: 2vh 3% 10vh 3%;
    background-color: white;
    border-radius: 10%;
  }

}

/*PC*/
@media screen and (min-width: 960px) {
  .info{
    margin: 5vh auto;
    width: 50%;
    padding: 2vh 3% 10vh 3%;
    background-color: white;
    border-radius: 10%;
  }
}
</style>