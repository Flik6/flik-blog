<template>

    <n-carousel ref="carousel" style="flex: 1;display: flex;flex: 1" keyboard draggable mousewheel :on-update:current-index="switchPage">
        <div v-for="(item,index) in words" :key="item.id">
            <h1 v-text="item.word"></h1>
            <h1 v-text="item.pos"></h1>
        </div>
        <template #arrow="{ prev, next }">
            <div class="custom-arrow">
                <button type="button" class="curtom-arrow--left" @click="prev">
                    <LeftCircleOutlined />
                </button>
                <button type="button" class="curtom-arrow--right" @click="next">
                    <RightCircleOutlined />
                </button>
            </div>
        </template>
    </n-carousel>


</template>

<script>
import {LeftCircleOutlined} from "@ant-design/icons-vue";
import {RightCircleOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";

export default {
    name: "StudyWords",
    data() {
        return {
            page: 1,
            words: [{
                id: '',
                word: "单词加载中...",
                pos: "",
                cnTran: "",
                enTran: "",
                rememberMethod: null,
                usPhone: "",
                ukPhone: "",
                bookId: ""
            }],
            state: {
                word: []
            }
        }
    }, methods: {
        getWords() {
            this.$getRequest("/api/word/words/" + this.$route.query.id + "/" + this.page).then(resp => {
                console.log(resp)
                if (resp.code != 5001) {
                    message.error("单词列表未获取成功,请联系管理员~")
                }

                this.words = JSON.parse(JSON.stringify(resp.data))
                this.words.push({
                    id: '',
                    word: "单词加载中...",
                    pos: "",
                    cnTran: "",
                    enTran: "",
                    rememberMethod: null,
                    usPhone: "",
                    ukPhone: "",
                    bookId: ""
                })
                this.page = this.page + 1;
            }, error => {
                console.log(error)
            })
        },
        getWordInfo(id, options) {
            //synonyms 同义词
            //sameRoot 同根词
            //phrase 短语
            //exampleSentence 例句
            this.$getRequest("/api/word/wordInfo/" + id + "/" + options).then(resp => {

            }, error => {
                console.log(error)
            })
        },switchPage:function (currentIndex,lastIndex){

            if (currentIndex==50){
                this.$refs.carousel.to(0)
                this.getWords()
            }
        }
    }, mounted() {
        this.getWords();
    }, components: {
        RightCircleOutlined,
        LeftCircleOutlined
    }
}
</script>

<style scoped>
.n-carousel >>> .n-carousel__slides{
    height:auto;

}
.n-carousel >>> .n-carousel__slide{
    background-color: #a5a5a5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
}

</style>