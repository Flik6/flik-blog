<template>
    <div>
        <div class="card_wrap">
            <div class="card_item" v-for="(items,index) in books" :key="index">
                <!--                <router-link :to="{ name: 'articles',query:{articleId:items.articleId}}">-->
                <a-card hoverable @click="showBookDetails(items.id)">
                    <template #cover>
                        <img :src=items.imageUrl alt="example"/>
                    </template>
                    <a-card-meta :title=items.name>
                        <template #description>
                            {{ items.intro }}
                        </template>
                    </a-card-meta>
                </a-card>
                <!--                </router-link>-->
            </div>
        </div>
        <a-modal
                v-model:visible="state.isAlertBookInfo"
                title="书本详情"
                width="1000px"
                okText="开始学习"
                cancelText="取消"
                @ok="this.$router.push({name: 'study', query: {id: state.viewBooks.bookId}})"
        >
            <!--            :confirm-loading="confirmLoading"-->
            <div style="display: flex;">
                <img :src="state.viewBooks.imageUrl" class="img-left"/>
                <span style="display:flex;flex: 1;flex-direction: column;justify-content: flex-start;">
                    <h1>{{ state.viewBooks.name }}</h1>
                    <p>
                        <span>来源：</span>
                          <a-tag :color="getRandomColor(state.isAlertBookInfo)">
                            <template #icon>
                              <twitter-outlined/>
                            </template>
                            {{ state.viewBooks.origin }}
                          </a-tag>
                    </p>
                    <p>
                        <span>标签：</span>
                        <span v-for="(items,index) in state.viewBooks.tag" :key="index">
                            <a-tag :color="getRandomColor(index)">{{ items }}</a-tag>
                        </span>
                    </p>
                    <p>单词数量：{{ state.viewBooks.wordNum }}</p>
                    <p >简介：{{state.viewBooks.intro}}</p>
                </span>

            </div>

        </a-modal>
    </div>
</template>
<script>
export default {
    name: "books",
    data() {
        return {
            books: [],
            state: {
                isAlertBookInfo: false,
                viewBooks: {},
            }
        }
    }, methods: {
        getBooks() {
            let that = this
            this.$getRequest("/api/word/book").then(function (response) {
                if (response.code == 5000) {
                    that.books = response.data
                }
            }).catch(function (error) {
                console.log(error)
            });
        },
        showBookDetails(id) {
            this.state.isAlertBookInfo = true;
            this.state.viewBooks = this.books[id - 1]
            this.state.viewBooks.tag = this.state.viewBooks.tag.split(";")

            // console.log(this.getRandomColor())
        }, getRandomColor(id) {
            console.log(id)
            return '#' + (Math.random() * 0xffffff << 0).toString(16);
        }
    }, mounted() {
        this.getBooks()
    }
}
</script>

<style scoped>
.card_item >>> .ant-card-meta-description {

    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
}

/*.card_item >>> .ant-card-cover{*/
/*    */
/*}*/

/*卡片布局样式*/
.card_wrap {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    width: 95%;
    justify-content: space-between;
    align-content: space-between;
    margin: 20px auto;
}

.card_item {
    width: 15%;
    margin-bottom: 16px;
    padding: 0px 8px;
    box-sizing: border-box;
    height: 100%;
}

.img-left {
    display: inline-block;
    flex: 0.5;
    margin-right: 2vw
}

/*手机*/
@media screen and (max-width: 600px) {
    /*设置卡片的单个长度*/
    .card_item {
        width: 50%;
    }

    .img-left {
        width: 25vw;
        height: 20vh;
    }
}

/*平板*/
@media screen and (min-width: 600px) and (max-width: 960px) {
    /*设置卡片的单个长度*/
    .card_item {
        width: 22%;

    }

}

/*小屏幕PC*/
@media screen and (min-width: 960px) and (max-width: 1500px) {
    /*设置卡片的单个长度*/
    .card_item {
        width: 20%;

    }
}

/*PC*/
@media screen and (min-width: 1500px) {
    /*设置卡片的单个长度*/
    .card_item {
        width: 15%;

    }
}


</style>