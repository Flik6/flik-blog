<template>
    <div>

        <a-alert
                v-show="announcement!=''"
                :message="announcement"
                type="success"
                :banner="true"
                closable
                show-icon
        >
            <template #icon>
                <smile-outlined/>
            </template>
        </a-alert>
        <div class="card_carousel">
            <a-carousel>
                <!--      <a-carousel autoplay>-->
                <img src="http://www.qijishow.com/images/202200310.jpg?t=2">
                <img src="http://www.qijishow.com/images/20220113.jpg?t=3">
                <img src="https://api.ixiaowai.cn/gqapi/gqapi.php?t=4">
                <img src="https://api.ixiaowai.cn/gqapi/gqapi.php?t=5">
            </a-carousel>
        </div>
        <div class="card_wrap">
            <div class="card_item" v-for="(items,index) in cards" :key="index">
                <router-link :to="{ name: 'articles',query:{articleId:items.articleId}}">
                    <a-card hoverable :loading="loading">
                        <template #cover>
                            <img alt="example" :src=cardImage+index />
                        </template>
                        <a-card-meta :title=items.title>
                            <template #description>
                                {{ items.intro }}
                            </template>
                        </a-card-meta>
                    </a-card>
                </router-link>
            </div>


        </div>


    </div>
</template>

<script>
// import { EditOutlined } from '@ant-design/icons-vue';
// import { EllipsisOutlined } from '@ant-design/icons-vue';
// import { SettingOutlined } from '@ant-design/icons-vue';
import {SmileOutlined} from '@ant-design/icons-vue';
// import {postRequest} from "@/util/requestApi";
import {getRequest} from "@/util/requestApi";

export default {

    name: "Home",
    components: {
        // EditOutlined,
        // EllipsisOutlined,
        // SettingOutlined,
        SmileOutlined,
    },
    data() {
        return {
            announcement: "",
            cardImage: "https://api.ixiaowai.cn/mcapi/mcapi.php?t=",
            cards: [],
            loading: true
        }
    }, methods: {
        // eslint-disable-next-line no-unused-vars
        jumpOtherPage(item) {
            if (item.externalLink) {
                window.location.href = item.externalLink;
            } else {
                this.$router.push({name: 'articles', query: {articleId: item.articleId}});
            }

        },
        getAnnouncement() {
            let that = this
            getRequest("/api/home/announcement").then((resp) => {

                if (resp.code == 200) {
                    that.announcement = resp.data.value
                }

            }).catch((error) => {
                that.announcement = ""
                console.log(error)
            })
        },
        getCardsList() {
            let that = this
            getRequest("/api/home/getCards").then((resp) => {

                if (resp.code == 200) {
                    that.cards = resp.data;

                    that.loading = false
                }

            }).catch((error) => {
                that.announcement = ""
                console.log(error)
            })
        }
    },
    mounted() {
        this.getAnnouncement();
        this.getCardsList();
        document.title = "Flik - 让生活·更生活"
    }

}
</script>

<style scoped>

/*卡片简介 样式*/
>>> .ant-card-meta-description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/*走马灯图片内高度 样式*/
.ant-carousel {
    width: 100%;
}

.ant-carousel >>> .slick-track {
    height: 100%;
}

.ant-carousel >>> .slick-track div {
    height: 100%;
    width: 100%;
    display: inline-block;
}


.ant-carousel >>> .slick-track img {
    height: 100%;
}

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


/*多端自适应布局*/
@media (max-width: 768px) {

    .ant-carousel >>> .slick-track {
        height: 30vh;
    }

    /*设置卡片的单个长度*/
    .card_item {
        width: 50%;
        margin-bottom: 16px;
        padding: 0px 8px;
        box-sizing: border-box;
    }

}

@media screen and (max-width: 992px) and (min-width: 768px) {
    .ant-carousel >>> .slick-track {
        height: 60vh;
    }

    /*设置卡片的单个长度*/
    .card_item {
        width: 30%;
        margin-bottom: 16px;
        padding: 0px 8px;
        box-sizing: border-box;
    }
}


@media (min-width: 992px) {
    .ant-carousel >>> .slick-list {
        height: 60vh;
    }

    .ant-carousel {
        width: 95%;
        margin: 0 auto;
    }

    /*设置卡片的单个长度*/
    .card_item {
        width: 20%;
        margin-bottom: 16px;
        padding: 0px 8px;
        box-sizing: border-box;
    }

}

</style>