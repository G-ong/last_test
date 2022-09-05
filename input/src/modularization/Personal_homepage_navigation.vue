<template>
  <div>
      <div class="user_all">
          <div class="box_top">
              <img src="../assets/top.png" alt="" style="width: 100%;">
          </div>
          <div class="user_photo">
              <img :src="'https://i5101b0918.oicp.vip'+user.picture" style="width: 100%;height: 100%;border-radius: 70px;">
          </div>
          <div class="box_bottom">
              <span class="user_name">{{user.nickName}}</span>
              <div id="small_box" :class="{bgc_white:is_change_1,bgc_gray:!is_change_1}" @click="change(1)">评论</div>
              <div id="small_box" :class="{bgc_white:is_change_2,bgc_gray:!is_change_2}" @click="change(2)">收藏</div>
              <div id="small_box" :class="{bgc_white:is_change_3,bgc_gray:!is_change_3}" @click="change(3)">动态</div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
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
    data(){
        return{
            is_change_1:true,
            is_change_2:true,
            is_change_3:true,
            user:''
        }
    },
    methods:{
        change(num){
            if(num==1){
            this.is_change_1=false,
            this.is_change_2=true,
            this.is_change_3=true,
            this.$router.push('/personal_homepage_comment')
            }
            if(num==2){
            this.is_change_2=false,
            this.is_change_1=true,
            this.is_change_3=true,
            this.$router.push('/personal_homepage_collect')
            }
            if(num==3){
            this.is_change_3=false,
            this.is_change_2=true,
            this.is_change_1=true,
            this.$router.push('/personal_homepage_dynamic')
            }
        }
    }
}
</script>

<style scoped>
.user_all{  
    width: 50%;
    height: 250px;
    margin-left: 25%;
	border: solid 1px #d2d4d5;
}
.box_top{
    width: 100%;
    height: 55%;
    /* background-color: #f6d5d5;
    background-image: url('../assets/top.png'); */
}
.user_photo{
    width: 110px;
    height: 110px;
    border: solid 1px #707070;
    position: relative;
    left: 10%;
    border-radius: 60px;
    top: -52px;
}
.user_name{
    font-family: Microsoft YaHei;
    font-size: 22px;
    color: #666666;
    position: relative;
    top: -91px;
    left: 29%;
    font-weight: 700;
}
#small_box{  
    float: right;
    width: 13.8%;
    height: 51px;
    border: solid 1px #d2d4d5;
    /* opacity: 0.51; */
    position: relative;
    top: -51px;
	font-family: Microsoft YaHei;
	font-size: 18px;
	color: #333333;
    text-align: center;
    line-height: 51px;
    cursor: pointer;
}
.bgc_white{
    background-color: #ffffff;
}
.bgc_gray{
    background-color: #d2d4d5;
}
</style>
