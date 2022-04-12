import {createApp} from 'vue';
import router from './router'
import store from './store'
import App from './App';
import {create, NCarousel, NCarouselItem} from "naive-ui";
import {
    Button,
    Layout,
    Menu,
    Carousel,
    Card,
    Avatar,
    Alert,
    Badge,
    Dropdown,
    Image,
    Spin,
    Drawer,
    Form,
    Input,
    Affix,
    Select,
    Switch,
    Modal,
    Tag
} from 'ant-design-vue'



const app = createApp(App);
app.config.productionTip = false;

import {getRequest, postRequest, putRequest, deleteRequest, postRequestJson} from "@/util/requestApi";

app.config.globalProperties.$postRequest = postRequest; // 自定义添加
app.config.globalProperties.$getRequest = getRequest; // 自定义添加
app.config.globalProperties.$putRequest = putRequest; // 自定义添加
app.config.globalProperties.$deleteRequest = deleteRequest; // 自定义添加
app.config.globalProperties.$postRequestJson = postRequestJson; // 自定义添加

[
    Button,
    Layout,
    Menu,
    Carousel,
    Card,
    Avatar,
    Alert,
    Badge,
    Dropdown,
    Image,
    Spin,
    Drawer,
    Form,
    Input,
    Affix,
    Select,
    Switch,
    Modal,
    Tag
].forEach(item => {
    app.use(item)
})
const naive = create({
    components: [NCarousel,NCarouselItem]
})

app.use(store)
    .use(router).use(naive)
    .mount('#app')
