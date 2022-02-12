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

    <a-carousel autoplay class="carousel">
      <div><img src="https://picsum.photos/1710/560?t=2"></div>
      <div><img src="https://picsum.photos/1710/560?t=3"></div>
      <div><img src="https://picsum.photos/1710/560?t=4"></div>
      <div><img src="https://picsum.photos/1710/560?t=5"></div>
    </a-carousel>
    <div style="width: 100%">
      <a-card hoverable style="width: 240px;margin: 10px 15px">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>

      <a-card hoverable style="width: 240px;margin: 10px 15px">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>

      <a-card hoverable style="width: 240px;margin: 10px 15px">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>
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

@media (max-width: 768px){
  .ant-carousel{
    width: 100%;
    height: 17em;
    text-align: center;
    margin: 5px auto;
  }
}

@media screen and (max-width: 992px) and (min-width: 768px){
  .ant-carousel{

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
  .ant-carousel{
    border-radius: 2em;
    width: 90%;
    text-align: center;
    margin: 5px auto;
    height: 40em;
  }
}

</style>