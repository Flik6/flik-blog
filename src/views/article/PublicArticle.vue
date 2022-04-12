<template>
    <div class="edit-article">

        <a-form
                name="article" layout="horizontal" :model="article" @finish="onFinish">
            <div style="display: flex;justify-content: space-between;margin-bottom: 30px;align-items: center">
                <a-form-item name="title" :rules="[{ required: true, message: '啊,没输标题怎么会行(⊙o⊙)？' }]">
                    <a-input v-model:value="article.title" placeholder="请输入文章标题"/>
                </a-form-item>
                <a-form-item name="category" :rules="[{ required: true, message: '我也想知道这个是属于什么分类的§(*￣▽￣*)§' }]">
                    <a-select v-model:value="article.category" placeholder="请选择分类">
                        <a-select-option value="0">编程知识</a-select-option>
                        <a-select-option value="1">API分享</a-select-option>
                        <a-select-option value="9">其他</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" html-type="submit" @click="submitForm">发表文章</a-button>
                </a-form-item>
            </div>

                <md-editor style="margin-bottom: 10px" v-model="article.content"/>

            <div>
                是否外部链接:
                <a-switch v-model:checked="state.externalLinkChecked"/>
                <transition name="fade">
                    <a-input v-show="state.externalLinkChecked" v-model:value="article.externalLink"
                             placeholder="请输入外部链接"/>
                </transition>
            </div>
            <div>
                是否手动输入图片链接:
                <a-switch v-model:checked="state.imageChecked"/>
                <transition name="fade">
                    <a-input v-show="state.imageChecked" v-model:value="article.articleImage" placeholder="请输入图片链接"/>
                </transition>
            </div>
        </a-form>
    </div>
</template>

<script>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
// import {ReadOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";

export default {
    name: "PublicArticle",
    data() {
        return {
            article: {
                uuid: JSON.parse(sessionStorage.getItem("payload")).uuid,
                isExternalLink: "0",
                imageType: ""
            },
            state: {
                imageChecked: false,
                externalLinkChecked: false
            }
        }
    }, methods: {
        submitForm() {
            let _this = this;
            let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            if (!arr.includes(this.article.category + '')) {
                message.error("请选择文章是什么分类的啦 uq(≧▽≦q)")
                return;
            } else if (this.state.imageChecked == true && (this.article.articleImage == null || this.article.articleImage == '')) {
                message.error("记得输入图片的链接哦~ uq(≧▽≦q)")
                return;
            } else if (this.state.externalLinkChecked == true && (this.article.externalLink == null || this.article.externalLink == '')) {
                message.error("啊  外部链接地址还没输入呢~")
                return;
            } else if (!this.article.title || !this.article.content) {
                message.error("标题还有内容哒咩为空啊~")
                return;
            }

            if (this.article.imageType == 0 || this.article.imageType == '') {
                let arr = ["http://api.btstu.cn/sjbz/?lx=dongman",
                    "https://api.yimian.xyz/img?type=moe&size=1920x1080",
                    "http://www.dmoe.cc/random.php",
                    "http://api.mtyqx.cn/api/random.php",
                    "https://api.ixiaowai.cn/api/api.php",
                ]

                this.article.articleImage = arr[Math.floor((Math.random() * arr.length))] + "?v=" + Date.now();
            }
            this.$postRequest("/api/article/articles", this.article).then(resp => {
                console.log(resp)

                if (resp.code == 4000) {
                    _this.$router.push({name: 'articles', query: {articleId: resp.data}});
                }/* else {
                    message.error("好像有点不对劲儿啊，是哪里出了问题呢？")
                    return;
                }*/

            }, error => {
                message.error("未知错误,文章发表失败")
            })

        },
    }, components: {
        MdEditor,
        // ReadOutlined

    },
}
</script>
<style scoped>
.edit-article {
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*flex-wrap: wrap;*/
    /*align-content: flex-start;*/
    width: 70%;
    height: 90vh;
    margin: 0 auto;
    padding: 2vh 3vw;
    background-color: white;
}

.ant-form-item {
    margin-bottom: 0px;
}

/*手机*/
@media screen and (max-width: 600px) {
    .edit-article {
        width: 95%;
    }
}

/*平板*/
@media screen and (min-width: 600px) and (max-width: 960px) {
    .edit-article {
        width: 80%;
    }
}

/*PC*/
@media screen and (min-width: 960px) {
    .edit-article {
        width: 70%;
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
    opacity: 0;
}

</style>