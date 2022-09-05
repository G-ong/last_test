<template>
  <div>
      <Navigation/>
      <Personal_homepage_navigation/>
          <img src="../assets/left_top.png" alt="" class="img1">
          <img src="../assets/left_bottom.png" alt="" class="img2">
          <img src="../assets/small_lower_head.png" alt="" class="img3">
      <div v-for="(post,index) in posts" :key="post.post.id">
        <div style="width: 50%; margin-left: 25%;position: relative;"> 
            <div class="top_box">
                <img :src="'https://i5101b0918.oicp.vip'+user.picture" class="icon">
                <span class="name" @click="view_detail(post.post.id)" title="点击查看帖子详情">{{post.post.subject}}</span>
                <span class="time">08-04 14:00</span>
                <span class="content">{{post.post.content}}</span>
                <span class="vertical_line" @click="change(post.post.id,index)">┋</span>
                <div :class="{show:post.delete_is_show,no_show:post.delete_is_show}">
                    <Delete_post/>
                </div>
            </div>
            <div class="box_img" v-if="post.post.picture!=null">
                <img :src="'https://i5101b0918.oicp.vip'+post.post.picture" class="img">
            </div>
            <div class="bottom_box">
                <div id="small_box">
                    <img src="../assets/no_like.png" alt="" style="width: 130%;">
                </div>
                <span class="like" @click="like(post.post.id)">点赞</span>
                <div id="small_box">
                    <img src="../assets/no_comment.png" alt="" style="width: 130%;">
                </div>
                <span class="comment" @click="comment(post.post.id)">评论</span>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import Navigation from '../modularization/Navigation.vue'
import Personal_homepage_navigation from '../modularization/Personal_homepage_navigation.vue'
import Delete_post from '../modularization/Delete_post.vue'
export default {
    computed:{
        ...mapState(['report_is_show'])
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
      console.log("查看个人收藏");
      axios.get('https://i5101b0918.oicp.vip/collect/findMyCollect',{
      params:{
              },
      })
      .then((res)=>{
          console.log(res); 
          this.posts=res.data.data;
           for(let i=0;i<this.posts.length;i++)
           this.$set(this.posts[i],'delete_is_show',true)
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
    data(){
        return{
            posts:[],
            user:'',
            contnet:''
        }
    },
    components:{
        Navigation,
        Personal_homepage_navigation,
        Delete_post
    },
    methods:{
        like(code){
            console.log("点赞");
            axios.get('https://i5101b0918.oicp.vip/likes/addLikes',{
            params:{
                    id:code//被点赞帖子的id
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
                    alert("评论成功！")
                },
                (err) => {
                    console.log("失败",err);
                }
                );
        },
        view_detail(id){
            localStorage.setItem("pay_code",id);
         let new1=this.$router.resolve({name:'/', params: {id: Date.now()}});
         new1.href=new1.href+'post_detail'
         console.log(new1.href)
           window.open(new1.href,'_blank')
        },
        change(id,i){
            this.posts[i].delete_is_show=!this.posts[i].delete_is_show;
            localStorage.setItem("pay_code",id);
        },
    }
}
</script>

<style scoped>
.top_box{
    width: 100%;
    height: 110px;
}
.img1{
    width: 13%;
    position: fixed;
    left: 7%;
    top: 65%;
}
.img2{
    width: 22%;
    position: fixed;
    top: 10%;
    left: 2%;
}
.img3{  
    width: 16%;
    position: fixed;
    right: 6%;
    top: 45%;
}
.icon{
    width: 40px;
    height: 40px;
    position: relative;
    top: 33%;
    left: 4%;
}
.name{
    position: relative;
    left: 44px;
    top: 12%;
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
    left: -36%;
    top: 30%;
	font-family: Microsoft YaHei;
	font-size: 10px;
	font-weight: normal;
	color: #888888;
}
.vertical_line{
    position: relative;
    left: 33%;
    top: -6%;
	font-family: Microsoft YaHei;
	font-size: 15px;
	font-weight: 700;
	color: #666666;
    cursor: pointer;
}
.content{
    position: relative;
    left: 12%;
    top: 39px;
	font-family: Microsoft YaHei;
	font-size: 11px;
	font-weight: normal;
	color: #333333;
    display: inline-block;
    width: 60%;
}
.box_img{
    margin-top: 21px;
}
.img{   
  position: relative;
  left: 12%;
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
  left: 73%;
  width: 12px;
  height: 12px;
  /* background-color: #ffffff; */
  /* border: solid 1px #707070; */
  float: left;
  margin-left: 40px;
}
.like{
  position: relative;
  top: 11px;
  left: 66%;
  font-size: 12px;
  color: #888888;
  cursor: pointer;
}
.comment{
  position: relative;
  top: 11px;
  left: 70.5%;
  font-size: 12px;
  color: #888888;
  cursor: pointer;
}
.no_show{
    display: none;
}
</style>