<template>
<div style="flex: 1;display: flex;flex-direction: column">
    <n-carousel :loop="false" ref="carousel" show-arrow  :mousewheel="true" :show-dots="false" style="flex: 1;display: flex;" draggable :on-update:current-index="switchPage">

        <div v-for="item in words" @click="alertWordInfo(item)" :key="item.id">
            <a-tooltip>
                <template #title>点击查看 '{{item.word}}' 的详细信息！</template>
            <div>
                <info-circle-outlined />
                <h1 style="font-weight: bold;font-size: 250%" >{{item.word}}</h1>

            </div>


            <span>
                <p><sound-outlined /> /{{item.usPhone}}/</p>
            </span>
            </a-tooltip>
        </div>

    </n-carousel>
    <a-drawer
            :title="this.state.word.word"
            headerStyle="text-transform: capitalize;"
            placement="bottom"
            :closable="true"
            :visible="state.isAlertWordInfo"
            @close="this.state.isAlertWordInfo=!this.state.isAlertWordInfo"
            height="60vh"
    >
        <div v-if="this.state.word.cnTran">
            <h3 style="font-weight:bold">中文释义</h3>
            <p>{{this.state.word.pos}}. {{this.state.word.cnTran}}</p>
        </div>
        <div v-if="this.state.word.enTran">
            <h3 style="font-weight:bold">英文释义</h3>
            <p>{{this.state.word.enTran}}</p>
        </div>
        <div v-if="this.state.word.rememberMethod">
            <h3 style="font-weight:bold">记忆方法</h3>
            <p>{{this.state.word.rememberMethod}}</p>
        </div>
<!--        //synonyms 同义词-->
<!--        //sameRoot 同根词-->
<!--        //phrase 短语-->
<!--        //exampleSentence 例句-->
        <div v-if="state.synonyms">
            <h3 style="font-weight:bold">近义词</h3>
            <p>{{this.state.synonyms.word}}</p>
            <p>{{this.state.synonyms.pos}}. {{this.state.synonyms.translation}}</p>
        </div>
        <div v-if="state.phrase">
            <h3 style="font-weight:bold">短语</h3>
            <div v-for="(item,index) in state.phrase" :key="index">
                <p>{{index+1}}. {{item.sentence}}</p>
                <p>&emsp;{{item.translation}}</p>
            </div>
        </div>
        <div v-if="state.exampleSentence">
            <h3 style="font-weight:bold">例句</h3>
            <div v-for="(item,index) in state.exampleSentence" :key="index">
                <p>{{index+1}}. {{item.sentence}}</p>
                <p>&emsp;{{item.translation}}</p>
            </div>
        </div>
        <div v-if="state.sameRoot">
            <h3 style="font-weight:bold">短语</h3>
            <div v-for="(item,index) in state.sameRoot" :key="index">
                <p>{{index+1}}. {{item.word}}&emsp;{{item.pos}}.</p>
                <p>&emsp;{{item.translation}}</p>
            </div>
        </div>
    </a-drawer>
    <audio autoplay v-show="false" :src="state.audioSrc"></audio>
</div>
</template>

<script>
// import {LeftCircleOutlined} from "@ant-design/icons-vue";
// import {RightCircleOutlined} from "@ant-design/icons-vue";
import {SoundOutlined} from "@ant-design/icons-vue";
// import {message} from "ant-design-vue";
import {InfoCircleOutlined} from "@ant-design/icons-vue";

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
                isAlertWordInfo:false,
                word:{
                    id: '',
                    word: "单词加载中...",
                    pos: "",
                    cnTran: "",
                    enTran: "",
                    rememberMethod: null,
                    usPhone: "",
                    ukPhone: "",
                    bookId: ""
                },
                synonyms:{},
                sameRoot:{},
                phrase:{},
                exampleSentence:{},
                audioSrc:""

            }
        }
    }, methods: {
        getWords() {
            this.$getRequest("/api/word/words/" + this.$route.query.id + "/" + this.page).then(resp => {

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
                if ("synonyms"==options.toString()){
                    this.state.synonyms=resp.data
                }else if ("sameRoot"==options.toString()){
                    this.state.sameRoot=resp.data
                }else if ("phrase"==options.toString()){
                    this.state.phrase=resp.data
                }else if ("exampleSentence"==options.toString()){
                    this.state.exampleSentence=resp.data
                }

            }, error => {
                console.log(error)
            })
        },
        switchPage:function (currentIndex,lastIndex){
            this.state.synonyms=""
            this.state.sameRoot=""
            this.state.phrase=""
            this.state.exampleSentence=""
            if (currentIndex==50){
                lastIndex;
                this.$refs.carousel.to(0)
                this.getWords()
            }else {
                this.state.audioSrc="https://dict.youdao.com/dictvoice?audio="+this.words[currentIndex].word+"&type=2"
            }
        },
        alertWordInfo(item){
            this.state.word=item;
            this.state.isAlertWordInfo=!this.state.isAlertWordInfo;
            this.getWordInfo(item.id,"synonyms");
            this.getWordInfo(item.id,"sameRoot");
            this.getWordInfo(item.id,"phrase");
            this.getWordInfo(item.id,"exampleSentence");
        }
    }, mounted() {
        this.getWords();
    }, components: {
        SoundOutlined,
        InfoCircleOutlined,

        // RightCircleOutlined,
        // LeftCircleOutlined
    }
}
</script>

<style scoped>
.n-carousel >>> .n-carousel__slides{
    height:auto;

}
.n-carousel >>> .n-carousel__slide{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    /*background-color: black;*/
}
.n-carousel >>> .n-carousel__arrow-group{
    top: 80%;
    bottom: auto;
    left: 0;
    right: 0;
    color: crimson;
    justify-content: center;
    margin: 0 3vw 0 3vw;
}
.n-carousel >>> .n-carousel__arrow{
    background-color: #208ef6;
    width: 3vmax;
    height: 3vmax;

}
/*.ant-drawer >>> .ant-drawer-title{*/
/*    text-transform: capitalize;*/
/*}*/

</style>