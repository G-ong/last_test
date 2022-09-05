<template>
  <div style="overflow: hidden;">
      <Navigation/>
      <Personal_homepage_navigation/>
      <div class="all">
          <img src="../assets/left_top.png" alt="" class="img1">
          <img src="../assets/left_bottom.png" alt="" class="img2">
          <img src="../assets/small_lower_head.png" alt="" class="img3">
          <span class="font">功能暂未开放</span>
      </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Navigation from '../modularization/Navigation.vue'
import Personal_homepage_navigation from '../modularization/Personal_homepage_navigation.vue'
export default {
    data(){
        return{
            answers:[],
            user:''
        }
    },
    // mounted(){
    //   axios.interceptors.request.use(function (config) {
    //   let token = window.localStorage.getItem("user")
    //  token = eval( token );
    //   if (token) {
    //       config.headers.token = token;    
    //   }
    //   return config;
    //   }, function (error) {
    //       return Promise.reject(error);
    //   });
    //   console.log("查看本人评论及回复");
    //   axios.get('https://i5101b0918.oicp.vip/comment/findMyComment',{
    //   params:{
    //           },
    //   })
    //   .then((res)=>{
    //       console.log("成功",res); 
    //       this.answers=res.data.data;
    //   })
    //   .catch((error)=>{
    //       console.log(error)  
    //   })
    //   console.log("查看当前用户信息");
    //      this.$http({
    //      method: "post",
    //      url: "/user/findUserMessage",
    //      data: {
    //      },
    //      }).then(
    //      (res) => {
    //          console.log("成功",res);
    //          this.user=res.data.data;
    //      },
    //      (err) => {
    //          console.log("失败",err);
    //      }
    //      );
    // },
    components:{
        Navigation,
        Personal_homepage_navigation
    }

}
</script>

<style scoped>
.all{
    border: solid 1px #d2d4d5;
    border-width: 0 1px 0 1px;
    width: 50%;
    height: 427px;
    margin-left: 25%;
}
.img1{
    width: 13%;
    position: absolute;
    left: 7%;
    top: 65%;
}
.img2{
    width: 22%;
    position: absolute;
    top: 10%;
    left: 2%;
}
.img3{  
    width: 16%;
    position: absolute;
    right: 6%;
    top: 45%;
}
.font{  
    font-family: Microsoft YaHei;
    font-size: 20px;
    color: #666666;
    position: relative;
    left: 41%;
    top: 100px;
}

</style>