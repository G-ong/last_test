
<!-- css js-->
<template>
  <div id="all">
    <Navigation/>
    <div class="box">
      <div class="oval"></div>
      <span class="forget">忘记密码</span>
      <form>
        <input type="text" class="name" placeholder="请输入注册邮箱" v-model="username">
        <div class="small_box"></div>
        <input type="text" class="code" placeholder="输入验证码" v-model="code">
        <button class="button_code" @click="gain_code">获取验证码</button>
        <input type="password" class="psd" placeholder="设置密码" v-model="password">
        <div class="small_box"></div>
      </form>
      <div>
        <span class="login" @click="push_login">立即登录</span>
        <span class="register" @click="push_register">账号注册</span>
      </div>
      <button id="login" :class="{switch:mouse_hover,no_switch:!mouse_hover}" @mouseenter = "change" @mouseleave="change" @click="input">
        <span class="font">提交</span>
      </button>
    </div>
  </div>
</template>

<script>
import Navigation from '../modularization/Navigation.vue';
export default {
  components:{
    Navigation
  },
  data(){
    return{
    Navigationmouse_hover:true,
      username:'',
      code:'',
      password:'',
      mouse_hover:true
    }
  },
  methods:{
    change(){
      this.mouse_hover=!this.mouse_hover
    },
    gain_code(){
        console.log("①向邮箱发送追回文件");
            this.$http({
            method: "post",
            url: "/mail/recover",
            data: {
                emailAmount: this.username,
            },
            }).then(
            (res) => {
                alert("请注意查看邮箱!")
                console.log("成功",res);
            },
            (err) => {
                console.log("失败",err);
            }
            );


    },
    input(){
        console.log("重新设置密码");
            this.$http({
            method: "post",
            url: "/user/resetPassword",
            data: {
                userEmail: this.username,
                password: this.password,
                code:this.code
            },
            }).then(
            (res) => {
                console.log("成功",res);
                alert("重置成功，请重新登录!")
                this.$router.push({
                    path:'/login'
                });
            },
            (err) => {
                console.log("失败",err);
            }
            );
        },
    push_login(){
      this.$router.push('/login');
    },
    push_register(){
      this.$router.push('/register');
    },
  }
}
</script>

<style scoped>
#all{
  height: 78%;
  width: 100%;
  margin-top: -10%;
  background-image: url("../assets/part_background.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: 10%;
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
  margin-left: 37%;
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
.small_box{
    position: relative;
    left: 84%;
    top: -19px;
	width: 15px;
	height: 15px;
	background-color: #ffffff;
	border: solid 1px #707070;
}
.register{
  position: relative;
  top: 4%;
  left: 67.5%;
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
</style>