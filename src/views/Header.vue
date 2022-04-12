<template>

    <div class="header">
        <div class="logo"/>
        <div class="menu">

            <a-menu
                    :selectedKeys="menuKey"
                    theme="dark"
                    mode="horizontal"
            >
                <a-menu-item @click="$router.push('/');this.menuKey=['1'];" key="1">首页
                </a-menu-item>

                <a-menu-item @click="$router.push('/books');this.menuKey=['2'];" key="2">不二单词
                </a-menu-item>
                <a-menu-item key="3">个人中心</a-menu-item>

            </a-menu>

        </div>

        <div class="avatar" v-show="!loginState">
            <a-button type="primary" shape="circle" @click="state.isAlertLoginWindow=!state.isAlertLoginWindow">
                <template #icon>
                    <UserOutlined/>
                </template>
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
                        v-if="loginState && !userInfo.avatar"
                >
                    {{ userInfo.sub }}
                </a-avatar>
                <a-avatar
                        size="large"
                        :src="'/api/user/getAvatar/'+userInfo.uuid"
                        v-else-if="loginState"
                >
                </a-avatar>
                <!--        </a-badge>-->
                <template #overlay>
                    <a-menu @click="clickUserMenu">
                        <a-menu-item v-if="loginState" key="0">发表博文</a-menu-item>
                        <a-menu-item key="1">个人资料</a-menu-item>
                        <a-menu-item key="2">退出登录</a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>

    </div>

    <!--    网站登录框-->
    <a-drawer
            :visible="!loginState"
            class="custom-class"
            style="color: red"
            title="登录账号"
            placement="right"
            size="large"
    >
        <a-form
                :model="userData"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
        >

            <a-form-item
                    label="账号"
                    name="username"
                    :rules="[{ required: true, message: '啊,你怎么没输你的账号啊(⊙o⊙)？' }]"
            >
                <a-input v-model:value="userData.username"/>
            </a-form-item>

            <a-form-item
                    label="密码"
                    name="password"
                    :rules="[{ required: true, message: '不输密码肯定登不上去啊...(*￣０￣)ノ!' }]"
            >
                <a-input-password v-model:value="userData.password"/>
            </a-form-item>

            <!--      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">-->
            <!--        <a-checkbox v-model:checked="userData.remember">Remember me</a-checkbox>-->
            <!--      </a-form-item>-->

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" :disabled="disabledLogin" html-type="submit" style="margin-right: 10px"
                          @click="submitLoginData()">登录
                </a-button>

                <a-button type="primary" html-type="submit" @click="state.isAlertRegisterWindow=true;">注册</a-button>
            </a-form-item>
        </a-form>
    </a-drawer>

    <!--    网站注册框-->
    <a-drawer
            :visible="state.isAlertRegisterWindow"
            class="custom-class"
            style="color: red"
            title="注册账号"
            placement="right"
            size="large"
    >
        <a-form
                :model="registerUserData"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
        >
            <a-form-item
                    label="账号"
                    name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }]"
            >
                <a-input v-model:value="registerUserData.username"/>
            </a-form-item>

            <a-form-item
                    label="密码"
                    name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]"
            >
                <a-input-password v-model:value="registerUserData.password"/>
            </a-form-item>

            <a-form-item
                    label="邮箱"
                    name="email"
                    :rules="[{ required: true, message: 'Please input your email!' }]"
            >
                <a-input-password v-model:value="registerUserData.email"/>
            </a-form-item>
            <!--      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">-->
            <!--        <a-checkbox v-model:checked="userData.remember">Remember me</a-checkbox>-->
            <!--      </a-form-item>-->

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" :disabled="disabledRegister" html-type="button" @click="registerUser()">注册
                </a-button>
            </a-form-item>
        </a-form>
    </a-drawer>
</template>

<script>
import {UserOutlined} from '@ant-design/icons-vue';
import {message} from "ant-design-vue";


export default {
    name: "Header",
    data() {
        return {
            menuKey: ['1'],
            userName: 'Flik',
            state: {
                isAlertRegisterWindow: false,

            },
            userData: {
                //用户数据
                username: "",
                password: "",
            },
            registerUserData: {}
        }
    }, methods: {
        clickUserMenu(e) {
            console.log(typeof e.key)
            switch (e.key) {
                case "1":
                    this.$router.push({path: '/userinfo'});
                    break;
                case '2':
                    //推出登录
                    var sessionStorage = window.sessionStorage
                    var localStorage = window.localStorage
                    Object.prototype.hasOwnProperty.call(sessionStorage, 'token') ? window.sessionStorage.removeItem("token") : null;
                    Object.prototype.hasOwnProperty.call(sessionStorage, 'payload') ? window.sessionStorage.removeItem("payload") : null;
                    Object.prototype.hasOwnProperty.call(localStorage, 'token') ? window.localStorage.removeItem("token") : null;
                    Object.prototype.hasOwnProperty.call(localStorage, 'payload') ? window.localStorage.removeItem("payload") : null;
                    window.location.reload();
                    break;
                case '0':
                    this.$router.push({path: '/publicArticle'});
                    break;
                default:
                    message.error("系统错误,请联系管理员！")
            }

        },
        //登录账号
        submitLoginData() {

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
                    that.$store.commit("setPayload", payload)

                    // that.userData = JSON.parse(payload);
                    // 关闭登录窗口
                    // that.state.isAlertLoginWindow = false;
                    // location.reload();
                }
            }).catch(function (error) {
                console.log(error)
            })
        },
        //  注册账号
        registerUser() {
            let that = this
            that.$postRequest("/api/user/register", that.registerUserData).then(function (response) {
                if (!response) {
                    //不存在返回值
                    console.log("注册失败")
                } else {
                    if (response.code == 2001) {
                        that.state.isAlertRegisterWindow = false;

                    }

                }
            }).catch(function (error) {
                console.log(error)
            });
        }

    },
    components: {
        UserOutlined
    },
    computed: {
        loginState() {
            //判断网页登陆状态，根据存入vuex的状态判断 true 登录 false 未登录
            return !!this.$store.state.payload;
        },
        userInfo() {
            if (this.$store.state.payload) {
                //用户已登录，获取用户信息
                return JSON.parse(this.$store.state.payload)
            } else {
                return null
            }
        },
        disabledLogin() {
            return !(this.userData.username && this.userData.password);
        },
        disabledRegister() {
            return !(this.registerUserData.username && this.registerUserData.password && this.registerUserData.email);
        }

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