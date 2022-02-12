import { createApp } from 'vue';
import router from './router'
import store from './store'
import App from './App';

import { Button,Layout,Menu,Carousel,Card,Avatar,Alert,Badge,Dropdown } from 'ant-design-vue'


const app = createApp(App);
app.config.productionTip = false;

[Button,Layout,Menu,Carousel,Card,Avatar,Alert,Badge,Dropdown].forEach(item=>{
    app.use(item)
})
// app.use(Layout)
//     .use(Button)
//     .use(Menu)
//     .use(Carousel)
//     .use(Card)

app.use(store)
    .use(router)
    .mount('#app')
