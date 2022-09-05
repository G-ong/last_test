<template>
  <div id="all">
      <div class="small">
          <img src="../assets/left_top.png" alt="" class="img1">
          <img src="../assets/left_bottom.png" alt="" class="img2">
          <img src="../assets/small_lower_head.png" alt="" class="img3">
        <div class="box">
          <div>
              <div class="top_box">
                  <img :src="'https://i5101b0918.oicp.vip'+user.posterPicture" class="icon">
                  <span class="name">{{user.posterName}}</span>
                  <span class="time">08-04 14:00</span>
                  <span class="content">{{user.post.subject}}</span>
              </div>
              <div class="box_img" v-if="user.post.picture!=null">
                  <img :src="'https://i5101b0918.oicp.vip'+user.post.picture" class="img">
              </div>
              <div class="bottom_box">
                <div id="small_box">
                    <img src="../assets/no_like.png" alt="" style="width: 130%;">
                </div>
                  <span class="like" @click="like(user.post.id)">点赞</span>
                <div id="small_box">
                    <img src="../assets/no_collect.png" alt="" style="width: 130%;">
                </div>
                  <span class="collect" @click="collect(user.post.id)">收藏</span>
                <div id="small_box">
                    <img src="../assets/no_comment.png" alt="" style="width: 130%;">
                </div>
                  <span class="button_comment" @click="comment_detail(user.post.id)">评论</span>
              </div>
              <div class="box_comment" style="margin-bottom: 8px;">
                <img :src="'https://i5101b0918.oicp.vip'+user_picture" class="small_icon">
                <input type="text" class="comment" placeholder="发表评论" v-model="comment">
                <button class="btn" :class="{button_publish:mouse_hover,no_button_publish:!mouse_hover}" @mouseenter = "change" @mouseleave="change" @click="publish">
                  <span>发表评论</span>
                </button>
              </div>
              <el-divider></el-divider>
          </div>
          <div  style="margin-left: 55px;" >
            <div v-for="(comment,index) in comments" :key="index">
              <!-- 根评论 -->
                <div class="comment_box" v-if="comment.rootId==-1&&comment.toCommentId==-1">
                      <img :src="'https://i5101b0918.oicp.vip'+comment.createByPicture" class="small_icon_1">
                      <span class="name_1">{{comment.createByName}}</span>
                      <div class="content_1">{{comment.content}}</div>
                      <span class="time_1">{{comment.createTime}} 回复</span>
                      <span class="comment_1" @click="comment_root_1(comment.id)">评论</span>
                      <span class="comment_1" @click="report(comment.id)">举报</span>
                </div>
                <!-- 子评论 -->
                <div class="comment_box_1" v-for="(comment_small,index) in comment.commentVoList" :key="index" >
                  <div v-if="comment_small.rootId==comment.id&&comment_small.toCommentId==comment.id" >
                      <img :src="'https://i5101b0918.oicp.vip'+comment_small.createByPicture" class="small_icon_1">
                      <span class="name_2">{{comment_small.createByName}}</span>
                      <span class="recomment">回复</span>
                      <span class="name_2_1">{{comment.createByName}}</span>
                      <div class="content_2">{{comment_small.content}}</div>
                      <span class="time_2">{{comment_small.createTime}} 回复</span>
                      <span class="comment_1" @click="comment_root_2(comment.id,comment_small.id)">评论</span>
                      <span class="comment_1" @click="report(comment_small.id)">举报</span>
                    </div>
                    <div v-for="(comment_small_small,index) in comment.commentVoList" :key="index">
                <!-- 子评论的子评论 -->
                  <div v-if="comment_small_small.rootId==comment.id&&comment_small_small.toCommentId==comment_small.id" style="margin-top: 15px;">
                      <img :src="'https://i5101b0918.oicp.vip'+comment_small_small.createByPicture" class="small_icon_1">
                      <span class="name_4">{{comment_small_small.createByName}}</span>
                      <span class="recomment_1">回复</span>
                      <span class="name_2_2">{{comment_small.createByName}}</span>
                      <div class="content_2">{{comment_small_small.content}}</div>
                      <span class="time_2">{{comment_small_small.createTime}} 回复</span>
                      <span class="comment_1" @click="report(comment_small_small.id)">举报</span>
                  </div>
                  </div>
                </div>
                <el-divider></el-divider>
            </div>
          </div>
          <div class="box_hint">
              <span class="hint">没有更多评论</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
// import Navigation from '../modularization/Navigation.vue'
export default {
    inject: ['reload'],
  data(){
    return{
      user:'',
      mouse_hover:true,
      comment:'',
      comments:[],
      comments_small:[],
      user_picture:''
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
      this.find();
  },
  methods:{
    find(){
     console.log("查看帖子详细信息");
     axios.get('https://i5101b0918.oicp.vip/post/findPostDetail',{
     params:{
             id:localStorage.getItem("pay_code")//由该帖子返回
             },
     })
     .then((res)=>{
         console.log("成功",res); 
         this.user=res.data.data;
         console.log(this.user.post);
     })
     .catch((error)=>{
         console.log(error)  
     })
      console.log("查看评论");
      axios.get('https://i5101b0918.oicp.vip/comment/findComment',{
      params:{
              postId:localStorage.getItem("pay_code")//被评论帖子的id
              },
      })
      .then((res)=>{
          console.log("成功",res); 
          this.comments=res.data.data;
          // this.comments_small=this.comments[0].commentVoList;
          // console.log(this.comments_small);
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
             this.user_picture=res.data.data.picture;
         },
         (err) => {
             console.log("失败",err);
         }
         );

    },
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
        comment_detail(id){
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
                    this.comment=''
                    this.find();
                        // this.$router.push({
                        //     path:'/post_detail',
                        //     query:{
                        //     t:Date.now()
                        //     }
                        // })
        //  let new1=this.$router.resolve({name:'/', params: {id: Date.now()}});
        //  new1.href=new1.href+'post_detail'
        //  console.log(new1.href)
        //    window.open(new1.href,'_blank')
                },
                (err) => {
                    console.log("失败",err);
                }
                );
        },
      change(){
          this.mouse_hover=!this.mouse_hover
      },
      publish(){
            console.log("添加根评论");
                this.$http({
                method: "post",
                url: "/comment/addComment",
                data: {
                    postId:localStorage.getItem("pay_code"),//被评论帖子的id
                    rootId:-1,//根评论
                    content:this.comment,
                    toCommentId:-1//根评论
                },
                }).then(
                (res) => {
                    console.log("成功",res);
                    alert(res.data.msg)
                    this.comment=''
                    this.find();
                        // location.reload() 
                        // this.$router.push({
                        //     path:'/post_detail',
                        //     query:{
                        //     t:Date.now()
                        //     }
                        // })
                },
                (err) => {
                    console.log("失败",err);
                }
                );
      },
      comment_root_1(id){
        console.log(id,localStorage.getItem("pay_code"))
         let comment=prompt("请输入评论内容")
         console.log("添加回复根评论的评论");
             this.$http({
             method: "post",
             url: "/comment/addComment",
             data: {
                 postId:localStorage.getItem("pay_code"),//被评论帖子的id
                 rootId:id,//根评论的id
                 content:comment,
                 toCommentId:id//根评论的id
             },
             }).then(
             (res) => {
                 console.log("成功",res);
                 alert(res.data.msg);
                    this.comment=''
                 this.find();
                        // this.$router.push({
                        //     path:'/post_detail',
                        //     query:{
                        //     t:Date.now()
                        //     }
                        // })
             },
             (err) => {
                 console.log("失败",err);
             }
             );
      },
      comment_root_2(id_1,id_2){
        console.log(id_1,id_2)
         let comment=prompt("请输入评论内容")
        console.log("添加回复根评论下子评论的评论（id要修改）");
            this.$http({
            method: "post",
            url: "/comment/addComment",
            data: {
                postId:localStorage.getItem("pay_code"),//被评论帖子的id
                rootId:id_1,//根评论的id
                content:comment,
                toCommentId:id_2//所回复评论的id
            },
            }).then(
            (res) => {
                console.log("成功",res);
                alert(res.data.msg)
                    this.comment=''
                this.find();
                        // this.$router.push({
                        //     path:'/post_detail',
                        //     query:{
                        //     t:Date.now()
                        //     }
                        // })
            },
            (err) => {
                console.log("失败",err);
            }
            );

      },
      report(id){
        console.log(id)
        let comment=prompt("请输入举报理由")
        console.log("举报评论");
        this.$http({
        method: "post",
        url: "/comment/reportComment",
        data: {
            commentId:id,//被举报评论的id
            content:comment,
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
      }
  }
}
</script>

<style scoped>
Navigation
.small{
    float: left;
    width: 100%;
    height: 100%;
}
#all{  
  height: 100%;
  width: 100%;
  /* background-image: url('../assets/part_background.jpg');
  background-repeat: repeat;
  background-size: 100%; */
  /* 固定背景图片 */
  /* background-attachment:fixed; */
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
.box{
    margin-left: 26%;
    margin-top: 15px;
	width: 48%;
    /* height: 97.7%; */
	background-color: #ffffff;
	border: solid 1px rgba(0, 0, 0, 0.1);
}
.top_box{
    position: relative;
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
    position: absolute;
    left: 52px;
    top: 32%;
	font-family: Microsoft YaHei;
	font-size: 15px;
	color: #649ac1;
    font-weight: 700;
}
.time{
    position: absolute;
    left: 52px;
    top: 55%;
	font-family: Microsoft YaHei;
	font-size: 10px;
	font-weight: normal;
	color: #888888;
}
.vertical_line{
    position: relative;
    left: 22%;
    top: 21%;
	font-family: Microsoft YaHei;
	font-size: 15px;
	font-weight: 700;
	color: #666666;
}
.content{
    position: absolute;
    left: 52px;
    top: 76%;
	font-family: Microsoft YaHei;
	font-size: 11px;
	font-weight: normal;
	color: #333333;
}
.img{   
  position: relative;
  left: 14%;
  width: 24.7%;
  object-fit: cover;
}
.bottom_box{
    width: 100%;
    height: 45px;
	/* border: solid rgba(0, 0, 0, 0.1);
    border-width: 0px 0px 1px 0px; */
}
#small_box{
  position: relative;
  top: 15px;
  left: 68.5%;
  width: 12px;
  height: 12px;
  background-color: #ffffff;
  /* border: solid 1px #707070; */
  float: left;
  margin-left: 40px;
  cursor: pointer;
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
.button_comment{
  position: relative;
  top: 11px;
  left: 62%;
  font-size: 12px;
  color: #888888;
  cursor: pointer;
}
.small_icon{
    width: 35px;
    height: 35px;
    position: relative;
    top: 33%;
    left: 7.5%;
}
::-moz-placeholder {
  font-size: 11px;
  color: #d3d3d3;
}
.comment{
    width: 66%;
    height: 40px;
    position: relative;
    top: -7px;
    left: 9.5%;
    outline: none;
}
.btn{
    width: 103px;
    height: 46px;
    position: relative;
    top: -7px;
    left: 11%;
    border-style: none;
    border-radius: 4px;
    border: solid 1px #333333;
    background-color: #ffffff;
}
.btn span{
    font-weight: 700;
}
.box_hint{
    width: 100%;
    height: 50px;
    /* border: solid rgba(0, 0, 0, 0.1);
    border-width: 0px 0px 1px 0px; */
}
.hint{
  position: relative;
  top: 8px;
  left: 45.5%;
  font-size: 12px;
  color: #666666;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 90%;
  margin: 24px 0;
  margin-left: 0px;
  margin-left: 5%;
}
.small_icon_1{
    width: 35px;
    height: 35px;
    position: relative;
    /* top: 33%; */
    left: 7.5%;
}
.name_1{
  position: absolute;
  left: 37%;
  font-family: Microsoft YaHei;
  font-size: 15px;
  color: #649ac1;
  font-weight: 700;
}
.content_1{
  /* position: absolute;
  left: 33%;
  top: 58%; */
  margin-left: 100px;
  margin-top: -15px;
  font-family: Microsoft YaHei;
  font-size: 11px;
  font-weight: normal;
  color: #333333;
  word-break:break-word;
}
.time_1{
  /* position: absolute;
  left: 35%;
  top: 52%; */
  margin-left: 100px;
  font-family: Microsoft YaHei;
  font-size: 10px;
  font-weight: normal;
  color: #888888;
}
.comment_1{
  margin-left: 10px;
  font-family: Microsoft YaHei;
  font-size: 10px;
  font-weight: normal;
  color: #888888;
  cursor: pointer;
}
.name_2{
  position: relative;
  left: 10%;
  top: -13px;
  font-family: Microsoft YaHei;
  font-size: 15px;
  color: #649ac1;
  font-weight: 700;
}
.name_3{
  position: relative;
  left: 10%;
  top: -13px;
  font-family: Microsoft YaHei;
  font-size: 15px;
  color: #649ac1;
  font-weight: 700;
}
.name_4{
  position: relative;
  left: 10.5%;
  top: -13px;
  font-family: Microsoft YaHei;
  font-size: 15px;
  color: #649ac1;
  font-weight: 700;
}
.content_2{
  /* position: absolute;
  left: 37%;
  top: 61%; */
  margin-left: 100px;
  margin-top: -15px;
  font-family: Microsoft YaHei;
  font-size: 11px;
  font-weight: normal;
  color: #333333;
  word-break:break-word;
}
.time_2{
  /* position: absolute;
  left: 39%;
  top: 64%; */
  margin-left: 100px;
  font-family: Microsoft YaHei;
  font-size: 10px;
  font-weight: normal;
  color: #888888;
}
.button_publish{
    position: relative;
    left: 12.2%;
    top: -3px;
	width: 83px;
	height: 35px;
	border-radius: 4px;
    background-color: #fff;
	border: solid 1px #333333;
    color: #333333;
}
.no_button_publish{
    position: relative;
    left: 12.2%;
    top: -3px;
	width: 83px;
	height: 35px;
	border-radius: 4px;
    background-color: #333333;
	border: solid 1px #333333;
    color: #ffffff;
}
.recomment{
  position: relative;
  left: 11%;
  top: -13px;
  font-family: Microsoft YaHei;
  font-size: 10px;
  font-weight: normal;
  color: #888888;
}
.recomment_1{
  position: relative;
  left: 11.5%;
  top: -13px;
  font-family: Microsoft YaHei;
  font-size: 10px;
  font-weight: normal;
  color: #888888;
}
.name_2_1{
  position: relative;
  left: 12%;
  top: -13px;
  font-family: Microsoft YaHei;
  font-size: 15px;
  color: #649ac1;
  font-weight: 700;
}
.name_2_2{
  position: relative;
  left: 12.5%;
  top: -13px;
  font-family: Microsoft YaHei;
  font-size: 15px;
  color: #649ac1;
  font-weight: 700;
}
</style>