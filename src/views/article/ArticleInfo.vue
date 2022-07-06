<template>
  <div>
    <div class="info">
      <a-image
          :src="`https://picsum.photos/1920/1080?t=${random}`"
          class="image-header"
      >
      </a-image>
      <video src="https://resource.meihua.info/2SxYJ5jka40dYgykSYASyV3Rrik=/lmSiyGIILwOym7MTcC8UOByxCV_i"></video>

      <a-spin v-if="article==null || article=='' ||article=={}"/>

      <div v-else class="article-content markdown-body">
        <h1 v-text="article.title"/>
        <div v-html="article.content">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getRequest} from "@/util/requestApi";
import 'github-markdown-css';
import {ref} from 'vue';

export default {
  name: "ArticleInfo",
  data() {
    return {
      article: {},
      random: ref()
    }
  }, computed: {},
  methods: {
    getArticle() {
      getRequest("/api/article/articles/" + this.$route.query.articleId).then(resp => {
        if (resp.code == 4102) {
          console.log(resp)
          return;
        }
        this.article = resp.data;
        document.title = resp.data.title + "- 让生活·更生活"

      }, error => {
        console.log(error)
      })
    },
  }, mounted() {
    this.getArticle()
  }

}
</script>

<style scoped>

@media (max-width: 768px) {
  .image-header {
    height: 50vh;
  }

  .article-content {
    width: 95%;
    margin: 0 auto;
    padding: 1vh 2vw;
  }
}

@media screen and (max-width: 992px) and (min-width: 768px) {
  .image-header {
    width: 100vw;
    height: 70vh
  }

  .article-content {
    width: 70%;
    margin: 0 auto;
    padding: 100px 50px;
  }
}

@media (min-width: 992px) {
  /deep/ .ant-image {
    width: 100%;
  }

  /deep/ .ant-image-img {
    width: 100%;
    height: 70vh
  }

  .article-content {
    width: 50%;
    margin: 0 auto;
    padding: 100px 50px;
  }
}
</style>