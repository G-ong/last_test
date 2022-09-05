<template>
  <div id="comment_all">
    <Navigation/>
    <User_navigation/>
          <img src="../assets/left_top.png" alt="" class="img1">
          <img src="../assets/left_bottom.png" alt="" class="img2">
          <img src="../assets/small_lower_head.png" alt="" class="img3">
    <div>
        <div class="box">
            <span class="font_summary">评论</span>
            <div class="line"></div>
            <div style="margin-top: 20px;">
                <div v-for="(answer,index) in answers" :key="index" >
                    <div v-if="answer.commentVoList.length!=0" >
                        <div v-for="(comment,index) in answer.commentVoList" :key="index" class="one_border">
                                <img src="../assets/background.jpg" alt="">
                                <div class="background">
                                    <span class="name">{{comment.createByName}}</span>
                                    <span class="like">评论了你</span>
                                    <span class="content">{{comment.content}}</span>
                                    <span class="vertical_line"></span>
                                    <span class="answer">{{answer.content}}</span>
                                    <!-- <span class="comment">评论</span> -->
                                    <span class="time">{{comment.createTime}}</span>
                                    <!-- <span class="report">举报</span> -->
                                    <!-- <span class="vertical_line_second">|</span> -->
                                    <!-- <span class="reply">回复</span> -->
                                </div>
                        <!-- <el-divider></el-divider> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import User_navigation from '../modularization/User_navigation.vue'
import Navigation from '../modularization/Navigation.vue'
export default {
    data(){
        return{
        answers:[]
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
      console.log("查看本人评论及回复");
      axios.get('https://i5101b0918.oicp.vip/comment/findMyComment',{
      params:{
              },
      })
      .then((res)=>{
          console.log("成功",res); 
          this.answers=res.data.data;
      })
      .catch((error)=>{
          console.log(error)  
      })
    },
    components: { Navigation,User_navigation },
}
</script>

<style scoped>
#comment_all{  
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
    left: 81%;
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
    border-width: 0px 0px 1px 0px;
    position: relative;
    margin-top: 20px;
    left: 51px;
    height: 60px;
    width: 90%;
    border-width: 0px 0px 1px 0px;
}
img{
    width: 40px;
    height: 40px;
    position: relative;
    top: 22%;
    left: 10px;
}
.background{
    position: relative;
    top: -60%;
    left: 11%;
	width: 86%;
	height: 60px;
	background-color: #f2f4f5;
	box-shadow: 0px 3px 6px 0px 
		rgba(0, 0, 0, 0.16);
}
.name{
    position: relative;
    left: 11px;
	font-family: Microsoft YaHei;
	font-size: 11px;
	color: #649ac1;
    font-weight: 700;
}
.like{
    position: relative;
    left: 3%;
    top: 4px;
	font-family: Microsoft YaHei;
	font-size: 10px;
	font-weight: normal;
	color: #888888;
}
.vertical_line{    
    border: solid 1.5px #888;
    border-radius: 3px;
    position: absolute;
    top: 42px;
    left: 2.3%;
    height: 12px;
    display: inline-block;
}
.answer{
    position: absolute;
    left: 4%;
    top: 42px;
	font-family: Microsoft YaHei;
	font-size: 10px;
	font-weight: normal;
	color: #888888;
}
.content{  
    font-family: Microsoft YaHei;
    font-size: 11px;
    color: #333333;
    position: absolute;
    left: 2%;
    top: 38%;
}
.comment{
    position: relative;
    top: 47px;
    left: -13.7%;
	font-family: Microsoft YaHei;
	font-size: 10px;
	color: #888888;
}
.time{
    position: absolute;
    right: 10px;
    top: 3%;
	font-family: Microsoft YaHei;
	font-size: 10px;
	font-weight: normal;
	color: #888888;
}
.report{
    position: absolute;
    right: 10px;
    top: 63%;
	font-family: Microsoft YaHei;
	font-size: 10px;
	color: #d3d3d3;
}
.vertical_line_second{
    position: relative;
    right: -52.7%;
    top: 63%;
	font-family: Microsoft YaHei;
	font-size: 10px;
	color: #d3d3d3;
}
.reply{
    position: relative;
    right: -53.7%;
    top: 63%;
	font-family: Microsoft YaHei;
	font-size: 10px;
	color: #649ac1;
}
</style>