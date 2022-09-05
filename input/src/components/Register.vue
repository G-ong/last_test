<template>
<!-- css js-->
  <div id="all">
    <img src="../assets/lower_head.png" alt="" class="img1">
    <img src="../assets/flower.png" alt="" class="img2">
    <div class="box">
      <div class="oval"></div>
      <span class="forget">注册</span>
      <form>
        <input type="text" class="name" placeholder="注册邮箱" v-model="username">
          <img src="../assets/email.png" alt="" style="position: relative; top: 9px;left: -22px;">
        <input type="password" class="psd" placeholder="设置密码" v-model="password">
          <img src="../assets/set_password.png" alt="" style="position: relative; top: 8px;left: -22px;">
        <input type="text" class="code" placeholder="输入验证码" v-model="code">
        <button class="button_code" @click="gain_code">获取验证码</button>
      </form>
      <div>
        <span class="login" @click="push_login">立即登录</span>
        <span class="register" @click="push_forget">忘记密码</span>
        <span class="back_homepage" @click="push_homepage">回首页</span>
      </div>
      <button id="login" :class="{switch:mouse_hover,no_switch:!mouse_hover}" @mouseenter = "change" @mouseleave="change" @click="input">
        <span class="font">提交</span>
      </button>
    </div>
    <div class="font_why">
        <span>————为什么选择“向生活低头”————</span>
    </div>
    <div style="margin-top: 3%;">
        <div>
            <span class="big_name_left">综合性校园平台</span>
            <span class="small_name_left">集跑腿、分享、日记服务为一体，无需下载，一个网站全实现</span>
        </div>
        <div>
            <span class="big_name_middle">轻松高效</span>
            <span class="small_name_middle">明确时间导向，提高生活效率</span>
        </div>
        <div>
            <span class="big_name_right">社恐友好</span>
            <span class="small_name_right">无需斟酌许久不敢提出请求，自主选择社交与否，日记记录每一天</span>
        </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data(){
    return{
      mouse_hover:true,
      username:'',
      code:'',
      password:''
    }
  },
  methods:{
    ...mapMutations(['show']),
    change(){
      this.mouse_hover=!this.mouse_hover
    },
    gain_code(){
        console.log("向注册邮箱发送激活码");
            this.$http({
            method: "post",
            url: "/mail/activation",
            data: {
                emailAmount: this.username,
            },
            }).then(
            (res) => {
                console.log("成功",res);
                if(res.data.code==200)
                alert("请注意查看邮箱！")
                else
                alert("邮箱有错，请重新输入！")
            },
            (err) => {
                console.log("失败",err);
            }
            );
    },
    input(){
        console.log("注册");
            this.$http({
            method: "post",
            url: "user/register",
            data: {
                userEmail: this.username,
                password: this.password,
                code:this.code
            },
            }).then(
            (res) => {
                console.log("成功",res);
                alert(res.data.msg);
                this.$router.push('/login')
            },
            (err) => {
                console.log("失败",err);
            }
            );
        },
    push_login(){
      this.show();
      this.$router.push('/login');
    },
    push_forget(){
      this.show();
      this.$router.push('/forget_password');
    },
    push_homepage(){
      this.show();
      this.$router.push('/homepage');
    }
  }
}
</script>

<style scoped>
#all{
  height: 78%;
  width: 100%;
  margin-top: -10%;
  /* background-image: url("../assets/part_background.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: 10%; */
}
.img1{  
  width: 1200px;
  height: 1200px;
  position: fixed;
  top: -48%;
  left: -22%;
}
.img2{  
  width: 400px;
  height: 400px;
  position: fixed;
  right: 10%;
  top: 25%;
}
.box{
  position: relative;
  top: 13%;
  width: 30%;
  height: 433px;
  margin-left: 35%;
  margin-top: 10%;
  background-color: #ffffff;
  box-shadow: 10px 10px 36px 0px 
		rgba(65, 36, 36, 0.32);
  border: solid 1px #d3d3d3;
}
.oval{
  position: relative;
  top: -30px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-left: 50px;
  background-color: #8d0000;
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.3);
}
.forget{
  position: relative;
  top: -30px;
  margin-left: 44.5%;
	font-family: Microsoft YaHei;
	font-size: 28px;
	font-weight: 700;
	color: #d02e2e
}
.name{
  margin-left: 13%;
  margin-top: 4%;
  width: 74%;
	border: solid #d3d3d3;
  border-width: 0px 0px 1px 0px;
  color: #888888;
}
.code{
  margin-left: 13%;
  width: 74%;
  margin-top: 6%;
	border: solid #d3d3d3;
  border-width: 0px 0px 1px 0px;
  color: #888888;
}
.button_code{
    position: relative;
    left: 69%;
    top: -22px;
    width: 19%;
    height: 20px;
    line-height: 20px;
	background-color: rgba(208, 46, 46, 0.2);
	border-radius: 4px;
	border: solid 1px #d3d3d3;
    border-style: none;
	font-family: Microsoft YaHei;
	font-size: 14px;
	color: #666666;
	box-shadow: 0px 3px 6px 0px 
		rgba(211, 211, 211, 0.16);
    cursor: pointer;
}
.psd{
  margin-left: 13%;
  width: 74%;
  margin-top: 6%;
	border: solid #d3d3d3;
  border-width: 0px 0px 1px 0px;
  color: #888888;
}
/* 设置input框默认文字 */
::-moz-placeholder {
  font-size: 13px;
  color: #d3d3d3;
}
input{
  padding-bottom: 5px;
  outline: none;
}
.register{
  position: relative;
  top: 4%;
  left: 35%;
	font-family: Microsoft YaHei;
	font-size: 11px;
	color: #888888;
  cursor: pointer;
}
.back_homepage{
  position: relative;
  top: 4%;
  left: 60.3%;
	font-family: Microsoft YaHei;
	font-size: 11px;
	color: #888888;
  cursor: pointer;
}
.login{
  position: relative;
  top: 4%;
  left: 13%;
	font-family: Microsoft YaHei;
	font-size: 11px;
	color: #888888;
  cursor: pointer;
}
.switch{
  position: relative;
  top: 7%;
  left: 13%;
  height: 50px;
  width: 75%;
	background-color: #333333;
	border-radius: 5px;
	border: solid 1px #707070;
}
.no_switch{
  position: relative;
  top: 7%;
  left: 13%;
  height: 50px;
  width: 75%;
	background-color: #5b5b5b;
	border-radius: 5px;
  opacity: 0.8;
}
.font{
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
	font-family: Microsoft YaHei;
}
.font_why{
  position: relative;
  top: 25%;
  left: 41%;
  height: 50px;
  width: 30%;
  color: #888888;
  font-size: 13px;
}
.big_name_left{
    position: relative;
    top: 150px;
    left: 12%;
	font-family: Microsoft YaHei;
	font-size: 20px;
    font-weight: 700;
	color: #333333;
}
.small_name_left{
    position: relative;
    top: 180px;
    left: -3%;
	font-family: Microsoft YaHei;
	font-size: 11px;
    font-weight: 550;
	color: #333333;
}
.big_name_middle{
    position: relative;
    top: 123px;
    left: 47%;
	font-family: Microsoft YaHei;
	font-size: 20px;
    font-weight: 700;
	color: #333333;
}
.small_name_middle{
    position: relative;
    top: 154px;
    left: 39.5%;
	font-family: Microsoft YaHei;
	font-size: 11px;
    font-weight: 550;
	color: #333333;
}
.big_name_right{
    position: relative;
    top: 95px;
    left: 80%;
	font-family: Microsoft YaHei;
	font-size: 20px;
    font-weight: 700;
	color: #333333;
}
.small_name_right{
    position: relative;
    top: 127px;
    left: 66%;
	font-family: Microsoft YaHei;
	font-size: 11px;
    font-weight: 550;
	color: #333333;
}
</style>