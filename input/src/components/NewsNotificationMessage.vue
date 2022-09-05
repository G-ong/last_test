<template>
  <div id="content_all">
      <Navigation/>
      <User_navigation/>
          <img src="../assets/left_top.png" alt="" class="img1">
          <img src="../assets/left_bottom.png" alt="" class="img2">
          <img src="../assets/small_lower_head.png" alt="" class="img3">
      <div>
          <div class="box">
              <span class="font_summary">私信</span>
              <div class="line"></div>
              <div style="margin-top: 20px;" v-for="chat in chats" :key='chat.date'>
               <div class="one_border" @click="view(chat.to,chat.toPicture)" v-if="chat.to!=user.userEmail">
                   <div style="padding-top: 10px;">
                       <img :src="'https://i5101b0918.oicp.vip'+chat.toPicture" alt="">
                       <span class="name">{{chat.to}}</span>
                   </div>
                   <span class="content">{{chat.text}}</span>
                   <span class="time">{{chat.date}}</span>
               </div>
               <div class="one_border" @click="view(chat.from,chat.toPicture)" v-if="chat.to==user.userEmail">
                   <div style="padding-top: 10px;">
                       <img :src="'https://i5101b0918.oicp.vip'+chat.toPicture" alt="">
                       <span class="name">{{chat.from}}</span>
                   </div>
                   <span class="content">{{chat.text}}</span>
                   <span class="time">{{chat.date}}</span>
               </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navigation from '../modularization/Navigation.vue'
import User_navigation from '../modularization/User_navigation.vue'
export default {
    data(){
        return{
            posts:[],
            chats:[],
            user:''
        }
    },
    mounted(){
      axios.interceptors.request.use(function (config) {
      let token = window.localStorage.getItem("user")
      token = eval( token );
      if (token) {
          config.headers.token = token;    
      }
      return config;
      }, function (error) {
          return Promise.reject(error);
      });
      console.log("查看聊天记录列表");
      axios.get('https://i5101b0918.oicp.vip/message/findList',{
      params:{
              },
      })
      .then((res)=>{
          console.log("成功",res); 
          this.chats=res.data.data;
          console.log(this.chats[0].to);
      })
      .catch((error)=>{
          console.log(error)  
      })
      console.log("查看当前用户信息");
         this.$http({
         method: "post",
         url: "/user/findUserMessage",
         data: {
         },
         }).then(
         (res) => {
             console.log("成功",res);
             this.user=res.data.data;
         },
         (err) => {
             console.log("失败",err);
         }
         );
    },
    components: { User_navigation, Navigation },
    methods:{
        view(name,picture){
            localStorage.setItem("TALK_TO",name)
            localStorage.setItem("PICTURE",picture)
            this.$router.push("/message_detail")
        }
  }
}
</script>

<style scoped>
#content_all{  
  /* height: 85%; */
  width: 100%;
  /* background-image: url('../assets/part_background.jpg');
  background-repeat: repeat;
  background-size: 100%; */
  /* 固定背景图片 */
  /* background-attachment:fixed; */
}
.img1{
    width: 13%;
    height: 200px;
    position: fixed;
    left: 4%;
    top: 65%;
}
.img2{
    width: 22%;
    height: 250px;
    position: fixed;
    top: 10%;
    left: -1%;
}
.img3{  
    width: 16%;
    height: 200px;
    position: fixed;
    right: 3%;
    top: 45%;
}
.box{
    margin-left: 30.4%;
	width: 52%;
    height: 100%;
	background-color: #ffffff;
	border: solid 1px rgba(0, 0, 0, 0.1);
    padding-bottom: 20px;
}
.font_summary{
    position: relative;
    top: 13px;
    margin-left: 7%;
	font-family: Microsoft YaHei;
	font-size: 15px;
	color: #333333;
    font-weight: 700;
}
.line{  
    position: relative;
    top: 20px;
    left: 51px;
    width: 90%;
    border: solid 1px #d02e2e;
}
.one_border{
    position: relative;
    left: 51px;
    margin-top: 20px;
    height: 60px;
    width: 90%;
	border: solid rgba(0, 0, 0, 0.1);
    border-width: 0px 0px 1px 0px;
}
img{
    width: 35px;
    height: 35px;
    position: relative;
    top: 22%;
}
.name{
    position: relative;
    left: 11px;
    top: -25px;
	font-family: Microsoft YaHei;
	font-size: 12px;
	color: #333333;
    font-weight: 700;
}
.content{
    position: relative;
    left: 45px;
    top: -26px;
	font-family: Microsoft YaHei;
	font-size: 10px;
	font-weight: normal;
	color: #888888;
}
.time{
    position: absolute;
    right: 10px;
    top: 15px;
	font-family: Microsoft YaHei;
	font-size: 10px;
	font-weight: normal;
	color: #888888;
}

</style>