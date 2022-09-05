<template>
  <div id="share_serve_all">
      <Navigation/>
      <Share_navigation/>
      <div class="small">
        <div>
          <Publish_post/>
          <img src="../assets/left_top.png" alt="" class="img1">
          <img src="../assets/left_bottom.png" alt="" class="img2">
          <img src="../assets/small_lower_head.png" alt="" class="img3">
          <div v-for="(post,index) in posts" :key="post.post.id">
            <div>
                <div class="top_box">
                    <img :src="'https://i5101b0918.oicp.vip'+post.posterPicture" class="icon">
                    <span class="name" title="点击查看帖子详情" @click="v_detail(post.post.id)">{{post.post.subject}}</span>
                    <span class="time">08-04 14:00</span>
                    <span class="content">{{post.post.content}}</span>
                    <span class="vertical_line" @click="change(post.post.id,index)">┋</span>
                    <div :class="{show:post.delete_is_show,no_show:post.delete_is_show}">
                       <Report_post/>
                    </div>
                </div>
                <div class="box_img" v-if="post.post.picture!=null">
                    <img :src="'https://i5101b0918.oicp.vip'+post.post.picture" class="img">
                </div>
                <div class="bottom_box">
                    <div id="small_box">
                        <img src="../assets/no_like.png" alt="" style="width: 130%;margin-left: -2px;">
                    </div>
                    <span class="like" @click="like(post.post.id)">点赞</span>
                    <div id="small_box">
                        <img src="../assets/no_collect.png" alt="" style="width: 130%;">
                    </div>
                    <span class="collect" @click="collect(post.post.id)">收藏</span>
                    <div id="small_box">
                        <img src="../assets/no_comment.png" alt="" style="width: 130%;">
                    </div>
                    <span class="comment" @click="comment(post.post.id)">评论</span>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import axios from 'axios'
import Navigation from '../modularization/Navigation.vue'
import Share_navigation from '../modularization/Share_navigation.vue'
import Publish_post from '../modularization/Publish_post.vue'
import Report_post from '../modularization/Report_post.vue'
export default {
    computed:{
        // ...mapState(['report_is_show'])
    },
  data(){
      return{
          posts:[],
          is_show:false,
          content:''
      }
  },
  components: { Navigation, Share_navigation, Publish_post, Report_post },
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
            console.log("查看帖子");
            axios.get('https://i5101b0918.oicp.vip/post/findPost',{
            params:{
                    type:0//生活类
                    },
            })
            .then((res)=>{
                console.log(res); 
                this.posts=res.data.data
           for(let i=0;i<this.posts.length;i++)
                this.$set(this.posts[i],'delete_is_show',true)
            })
            .catch((error)=>{
                console.log(error)  
            })
        },
  methods:{
      change(id,i){
            this.posts[i].delete_is_show=!this.posts[i].delete_is_show;
          localStorage.setItem("pay_code",id);
      },
      like(id){
          console.log("点赞");
          axios.get('https://i5101b0918.oicp.vip/likes/addLikes',{
          params:{
                  id:id//被点赞帖子的id
                  },
          })
          .then((res)=>{
              console.log("成功",res); 
              alert(res.data.msg)
          })
          .catch((error)=>{
              console.log(error)  
          })
      },
      v_detail(id){
          localStorage.setItem("pay_code",id)
         let new1=this.$router.resolve({name:'/', params: {id: Date.now()}});
         new1.href=new1.href+'post_detail'
         console.log(new1.href)
           window.open(new1.href,'_blank')
        //   this.$router.push("/post_detail")
      },
        collect(num){
            console.log("收藏");
                this.$http({
                method: "post",
                url: "/collect/addCollect",
                data: {
                    postId:num,//被收藏帖子的id
                },
                }).then(
                (res) => {
                    console.log("成功",res);
                    alert(res.data.msg)
                },
                (err) => {
                    console.log("失败",err);
                }
                );
        },
        comment(id){
            this.content=prompt("请输入评论")
            console.log("添加根评论");
                this.$http({
                method: "post",
                url: "/comment/addComment",
                data: {
                    postId:id,//被评论帖子的id
                    rootId:-1,//根评论
                    content:this.content,
                    toCommentId:-1//根评论
                },
                }).then(
                (res) => {
                    console.log("成功",res);
                    alert(res.data.msg)
                },
                (err) => {
                    console.log("失败",err);
                }
                );
        },
  }
}
</script>

<style scoped>
#share_serve_all{  
  width: 100%;
  /* background-image: url('../assets/part_background.jpg');
  background-repeat: repeat;
  background-size: 100%; */
  /* 固定背景图片 */
  /* background-attachment:fixed; */
}
.small{
    margin-left: 30.4%;
	width: 52%;
    height: 100%;
	background-color: #ffffff;
	border: solid 1px rgba(0, 0, 0, 0.1);
}
.img1{  
    width: 11%;
    position: fixed;
    left: 4%;
    top: 65%;
}
.img2{  
    width: 19%;
    position: fixed;
    top: 10%;
    left: 0%;
}
.img3{    
    width: 12%;
    position: fixed;
    right: 4%;
    top: 45%;
}
.top_box{
    position: relative;
    top: 20px;
    left: 51px;
    width: 90%;
    height: 110px;
}
.icon{
    width: 40px;
    height: 40px;
    position: relative;
    top: 33%;
}
.name{
    position: relative;
    left: 11px;
    top: 8%;
	font-family: Microsoft YaHei;
	font-size: 15px;
	color: #649ac1;
    font-weight: 700;
    display: inline-block;
    width: 300px;
    overflow: hidden;
    cursor: pointer;
}
.time{
    position: relative;
    left: -42.8%;
    top: 30%;
	font-family: Microsoft YaHei;
	font-size: 10px;
	font-weight: normal;
	color: #888888;
}
.no_report_show{
    display: none;
}
.vertical_line{
    position: absolute;
    left: 94%;
    top: 30%;
	font-family: Microsoft YaHei;
	font-size: 15px;
	font-weight: 700;
	color: #666666;
    cursor: pointer;
}
.content{
    position: relative;
    left: -51.5%;
    top: 59px;
	font-family: Microsoft YaHei;
	font-size: 11px;
	font-weight: normal;
	color: #333333;
}
.box_img{
    margin-top: 21px;
}
.img{   
  position: relative;
  left: 14%;
  width: 24.7%;
  object-fit: cover;
}
.bottom_box{
    width: 100%;
    height: 50px;
	border: solid rgba(0, 0, 0, 0.1);
    border-width: 0px 0px 1px 0px;
}
#small_box{
  position: relative;
  top: 15px;
  left: 68%;
  width: 12px;
  height: 12px;
  /* background-color: #ffffff;
  border: solid 1px #707070; */
  float: left;
  margin-left: 40px;
}
.like{
  position: relative;
  top: 11px;
  left: 54%;
  font-size: 12px;
  color: #888888;
  cursor: pointer;
}
.collect{
  position: relative;
  top: 11px;
  left: 58%;
  font-size: 12px;
  color: #888888;
  cursor: pointer;
}
.comment{
  position: relative;
  top: 11px;
  left: 62%;
  font-size: 12px;
  color: #888888;
  cursor: pointer;
}
.no_show{
    display: none;
}
</style>