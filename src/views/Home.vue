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
      <a-carousel autoplay>
        <div><img src="https://api.ixiaowai.cn/gqapi/gqapi.php?t=2"></div>
        <div><img src="https://api.ixiaowai.cn/gqapi/gqapi.php?t=3"></div>
        <div><img src="https://api.ixiaowai.cn/gqapi/gqapi.php?t=4"></div>
        <div><img src="https://api.ixiaowai.cn/gqapi/gqapi.php?t=5"></div>
      </a-carousel>
    </div>
    <div class="card_wrap">
      <div class="card_item">
        <a-card hoverable>
          <template #cover>
            <img alt="example" src=" https://api.ixiaowai.cn/mcapi/mcapi.php?t=1" />
          </template>
          <a-card-meta title="Europe Street beat">
            <template #description>www.instagram.com</template>
          </a-card-meta>
        </a-card>
      </div>
      <div class="card_item">
        <a-card hoverable >
          <template #cover>
            <img alt="example" src=" https://api.ixiaowai.cn/mcapi/mcapi.php?t=2" />
          </template>
          <a-card-meta title="Europe Street beat">
            <template #description>www.instagram.com</template>
          </a-card-meta>
        </a-card>
      </div>
      <div class="card_item">
        <a-card hoverable >
          <template #cover>
            <img alt="example" src=" https://api.ixiaowai.cn/mcapi/mcapi.php?t=3" />
          </template>
          <a-card-meta title="Europe Street beat">
            <template #description>www.instagram.com</template>
          </a-card-meta>
        </a-card>
      </div>
      <div class="card_item">
        <a-card hoverable >
          <template #cover>
            <img alt="example" src=" https://api.ixiaowai.cn/mcapi/mcapi.php?t=4" />
          </template>
          <a-card-meta title="Europe Street beat">
            <template #description>www.instagram.com</template>
          </a-card-meta>
        </a-card>
      </div>
      <div class="card_item">
        <a-card hoverable >
          <template #cover>
            <img alt="example" src=" https://api.ixiaowai.cn/mcapi/mcapi.php?t=5" />
          </template>
          <a-card-meta title="Europe Street beat">
            <template #description>www.instagram.com</template>
          </a-card-meta>
        </a-card>
      </div>
      <div class="card_item">
        <a-card hoverable >
          <template #cover>
            <img alt="example" src=" https://api.ixiaowai.cn/mcapi/mcapi.php?t=6" />
          </template>
          <a-card-meta title="Europe Street beat">
            <template #description>www.instagram.com</template>
          </a-card-meta>
        </a-card>
      </div>
      <div class="card_item">
        <a-card hoverable >
          <template #cover>
            <img alt="example" src=" https://api.ixiaowai.cn/mcapi/mcapi.php?t=7" />
          </template>
          <a-card-meta title="Europe Street beat">
            <template #description>www.instagram.com</template>
          </a-card-meta>
        </a-card>
      </div>
      <div class="card_item">
        <a-card hoverable >
          <template #cover>
            <img alt="example" src=" https://api.ixiaowai.cn/mcapi/mcapi.php?t=8" />
          </template>
          <a-card-meta title="Europe Street beat">
            <template #description>www.instagram.com</template>
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
      announcement:""
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
    }
  },
  mounted() {
    this.getAnnouncement()
  }

}
</script>

<style scoped>

.slick-initialized{
  width: 100%;
  height: 100%;
}

.card_wrap{
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  justify-content: center;
  margin: 0 auto;
}
.card_item{
  flex-basis: 25%;
  margin-bottom: 16px;
  padding: 0px 8px;
  box-sizing: border-box;
}
@media (max-width: 768px){
  .card_carousel{
    width: 100%;
    height: 17em;
    text-align: center;
    margin: 5px auto;
  }
}

@media screen and (max-width: 992px) and (min-width: 768px){
  .card_carousel{

    width: 90%;
    height: 23em;
    text-align: center;
    margin: 5px auto;
  }
  .slick-slider .slick-initialized{
    border-radius: 10px;
  }
}


@media (min-width: 992px){
  .card_carousel{
    border-radius: 2em;
    width: 90%;
    text-align: center;
    margin: 5px auto;
    height: 50em;
  }
}

</style>