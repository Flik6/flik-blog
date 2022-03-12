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
      <template #icon><smile-outlined /></template>
    </a-alert>
    <div class="card_carousel">
      <a-carousel>
<!--      <a-carousel autoplay>-->
        <div><img src="https://api.ixiaowai.cn/gqapi/gqapi.php?t=2"></div>
        <div><img src="https://api.ixiaowai.cn/gqapi/gqapi.php?t=3"></div>
        <div><img src="https://api.ixiaowai.cn/gqapi/gqapi.php?t=4"></div>
        <div><img src="https://api.ixiaowai.cn/gqapi/gqapi.php?t=5"></div>
      </a-carousel>
    </div>
    <div class="card_wrap">
      <div class="card_item" v-for="(items,index) in cards" >
        <a-card hoverable :loading="loading">
          <template #cover>
            <img alt="example" :src=cardImage+index />
          </template>
          <a-card-meta :title=items.title>
            <template #description>
              {{items.intro}}
            </template>
          </a-card-meta>
        </a-card>
      </div>


    </div>





  </div>
</template>

<script>
// import { EditOutlined } from '@ant-design/icons-vue';
// import { EllipsisOutlined } from '@ant-design/icons-vue';
// import { SettingOutlined } from '@ant-design/icons-vue';
import { SmileOutlined } from '@ant-design/icons-vue';
// import {postRequest} from "@/util/requestApi";
import {getRequest} from "@/util/requestApi";

export default {

  name: "Home",
  components:{
    // EditOutlined,
    // EllipsisOutlined,
    // SettingOutlined,
    SmileOutlined,
  },
  data(){
    return{
      announcement:"",
      cardImage:"https://api.ixiaowai.cn/mcapi/mcapi.php?t=",
      cards:[],
      loading:true
    }
  },methods:{
    getAnnouncement(){
      let that= this
      getRequest("/api/home/announcement").then((resp) => {

        if (resp.code==200) {
          that.announcement = resp.data.value
        }

      }).catch((error) => {
        that.announcement=""
        console.log(error)
      })
    },
    getCardsList(){
      let that= this
      getRequest("/api/home/getCards").then((resp) => {

        if (resp.code==200) {
          that.cards = resp.data;

          that.loading=false
        }

      }).catch((error) => {
        that.announcement=""
        console.log(error)
      })
    }
  },
  mounted() {
    this.getAnnouncement();
    this.getCardsList();

  }

}
</script>

<style scoped>

>>> .ant-card-meta-description{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.ant-carousel{
  width: 95%;
  margin: 1vh auto;

}

.ant-carousel >>> .slick-slide >>> img {

  min-width: 100%;
  min-height: 100%;
  object-fit: fill;
}


.card_wrap{
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  justify-content: space-between;
  align-content: space-between;
  margin: 0 auto;
}



@media (max-width: 768px){

  .ant-carousel >>> .slick-track{
    height: 30vh;
  }

  /*设置卡片的单个长度*/
  .card_item{
    width: 50%;
    margin-bottom: 16px;
    padding: 0px 8px;
    box-sizing: border-box;
  }

}

@media screen and (max-width: 992px) and (min-width: 768px){
  .ant-carousel >>> .slick-track{
    height: 60vh;
  }
  /*设置卡片的单个长度*/
  .card_item{
    width: 30%;
    margin-bottom: 16px;
    padding: 0px 8px;
    box-sizing: border-box;
  }
}


@media (min-width: 992px){
  .ant-carousel >>> .slick-track{
    height: 60vh;
  }

  /*设置卡片的单个长度*/
  .card_item{
    width: 20%;
    margin-bottom: 16px;
    padding: 0px 8px;
    box-sizing: border-box;
  }

}

</style>