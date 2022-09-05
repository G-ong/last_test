<template>
  <div id="all">
    <div class="border">
      <div class="box_summary">
        消息通知
      </div>
      <div :class="{box_like:switch_like,no_box_like:!switch_like}" id="box" @click="like">
          <img src="../assets/no_like.png" alt="" style="position: relative;top: 7px;left: 12px;" v-if="switch_like">
          <img src="../assets/like.png" alt="" style="position: relative;top: 7px;left: 12px;" v-if="!switch_like">
          <span>点赞</span>
      </div>
      <div :class="{box_comment:switch_comment,no_box_comment:!switch_comment}" id="box" @click="comment">
          <img src="../assets/no_comment.png" alt="" style="position: relative;top: 7px;left: 12px;" v-if="switch_comment">
          <img src="../assets/comment.png" alt="" style="position: relative;top: 7px;left: 12px;" v-if="!switch_comment">
          <span>评论</span>
      </div>
      <div :class="{box_message:switch_message,no_box_message:!switch_message}" id="box" @click="message">
          <img src="../assets/no_collect.png" alt="" style="position: relative;top: 7px;left: 12px;" v-if="switch_message">
          <img src="../assets/collect.png" alt="" style="position: relative;top: 7px;left: 12px;" v-if="!switch_message">
          <span>私信</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data(){
  return{
    switch_like:true,
    switch_comment:true,
    switch_message:true
  }
},
methods:{
  like(){
    this.switch_like=!this.switch_like,
    this.switch_comment=true,
    this.switch_message=true,
    this.$router.push('/news_notification_like')
  },
  comment(){
    this.switch_comment=!this.switch_comment,
    this.switch_message=true,
    this.switch_like=true,
    this.$router.push('/news_notification_comment')
  },
  message(){
    this.switch_message=!this.switch_message,
    this.switch_like=true,
    this.switch_comment=true,
    this.$router.push('/news_notification_message')
  }
}
}
</script>

<style scoped>
#all{
  width: 175px;
  position: relative;
  left: 18.4%;
}
.box_summary{
	width: 175px;
	height: 40px;
	border: solid rgba(0, 0, 0, 0.1);
  border-width: 0px 0px 1px 0px ;
  text-align: center;
  line-height: 40px;
	font-family: Microsoft YaHei;
	font-size: 18px;
	color: #333333;
}
#box{
	width: 175px;
	height: 50px;
	border: solid rgba(0, 0, 0, 0.1);
  border-width: 1px 0px 1px 0px;
  text-align: center;
  line-height: 6px;
	font-family: Microsoft YaHei;
	font-size: 14px;
	color: #333333;
}
.box_like{
  position: relative;
  top: 2px;
	background-color: #ffffff;
}
.no_box_like{
  position: relative;
  top: 2px;
  background-color: #f2f4f5!important;
}
.box_comment{
  position: relative;
  top: 4px;
	background-color: #ffffff;
}
.no_box_comment{
  position: relative;
  top: 4px;
  background-color: #f2f4f5!important;
}
.box_message{
  position: relative;
  top: 6px;
	background-color: #ffffff;
}
.no_box_message{
  position: relative;
  top: 6px;
  background-color: #f2f4f5!important;
}
#small_box{
  position: relative;
  top: 15px;
  left: 35%;
	width: 20px;
	height: 20px;
	background-color: #ffffff;
	border: solid 1px #707070;
}
span{
  margin-left: 25px;
}
.border{
  position: fixed;
  top: 128px;
	width: 175px;
  height: 800px;
	background-color: #ffffff;
	border: solid 1px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
}
</style>