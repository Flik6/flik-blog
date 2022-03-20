<template>
  <div>

    <a-image
        :src="`http://www.qqlykm.cn/api/ag/api.php?t=3?${random}`"
    >
      <template #placeholder>
        <a-image
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            :width="200"
            :preview="false"
        />
      </template>
    </a-image>
    <a-spin v-if="article=={}" />
    <div v-else class="article-content markdown-body">
      <h1 v-text="article.title"/>
      <div  v-html="article.content">
    </div>


    </div>
  </div>
</template>

<script>
import {getRequest} from "@/util/requestApi";
import 'github-markdown-css';
import { ref } from 'vue';

export default {
  name: "ArticleInfo",
  data() {
    return {
      article: {},
      random:ref()
    }
  },computed:{

  },
  methods:{
    getArticle() {
      // this.article={};
      let _this=this
      getRequest("/api/article/articles/" + this.$route.query.articleId).then(resp => {
        console.log(resp)
        if (resp.code==4102){
          console.log(resp)
          return;
        }
        this.article = resp.data;

      }, error => {

      })
    },
  },mounted() {
    this.getArticle()
  }

}
</script>

<style scoped>
.article-content{
  width: 50%;
  margin: 0 auto;
  padding: 100px 50px;
}
</style>