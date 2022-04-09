<template>
    <div class="edit-article">

        <a-form style="display: flex;justify-content: space-between;margin-bottom: 10px;align-items: center"
                name="article" layout="horizontal" :model="article" @finish="onFinish">
            <a-form-item name="title">
                <a-input v-model:value="article.title" placeholder="请输入文章标题"/>
            </a-form-item>
            <a-form-item name="category">
                <a-select v-model:value="article.category" placeholder="请选择分类">
                    <a-select-option value="0">编程知识</a-select-option>
                    <a-select-option value="1">API分享</a-select-option>
                    <a-select-option value="9">其他</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit">发表文章</a-button>
            </a-form-item>

        </a-form>
        <md-editor style="margin-bottom: 10px" v-model="article.content"/>
        <div>
            是否外部链接:
            <a-switch v-model:checked="state.externalLinkChecked"/>
            <transition name="fade">

                <a-input v-show="state.externalLinkChecked" v-model:value="article.externalLink" placeholder="请输入外部链接"/>

            </transition>
        </div>
        <div>
            是否手动输入图片链接:
            <a-switch v-model:checked="state.imageChecked"/>
            <transition name="fade">

                <a-input v-show="state.imageChecked" v-model:value="article.articleImage" placeholder="请输入图片链接"/>

            </transition>
        </div>

    </div>
</template>

<script>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
// import {ReadOutlined} from "@ant-design/icons-vue";

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
                externalLinkChecked:false
            }
        }
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
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

</style>