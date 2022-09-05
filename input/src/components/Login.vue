
<!-- css js-->
<template>
  <div id="all">
    <Navigation/>
    <div class="box">
      <div class="oval"></div>
      <span class="login">登录</span>
      <input type="text" class="name" placeholder="用户名/邮箱" v-model="username">
      <input type="password" class="psd" placeholder="请输入密码" v-model="password">
      <span class="register" @click="register">账号注册</span>
      <span class="forget" @click="forget">忘记密码</span>
      <button id="login" :class="{switch:mouse_hover,no_switch:!mouse_hover}" @mouseenter = "change" @mouseleave="change" @click="login">
        <span class="font">登录</span>
      </button>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Navigation from '../modularization/Navigation.vue'
export default {
  components: { Navigation },
  data(){
    return{
      mouse_hover:true,
      username:'',
      password:''
    }
  },
  methods:{
    ...mapMutations(['not_show']),
    change(){
      this.mouse_hover=!this.mouse_hover
    },
    login(){
        console.log("用户登录");
            this.$http({
            method: "post",
            url: "/user/login",
            data: {
                userEmail: this.username,
                password: this.password,
            },
            }).then(
            (res) => {
                console.log("成功",res);
                alert(res.data.msg)
                // localStorage.setItem("switch_like",true),
                // localStorage.setItem("switch_comment",true),
                // localStorage.setItem("switch_message",true)
                if(this.username=='admin'||this.username=='share'){
                localStorage.setItem('user', JSON.stringify(res.data.data.token));
                localStorage.setItem("manage",false)
                 } 
                else{
                localStorage.setItem('user', JSON.stringify(res.data.data.token));
                localStorage.setItem("manage",true)
                }
                localStorage.setItem('login', false);
                this.$router.push({
                    path:'/homepage'
                });
            },
            (err) => {
                console.log("失败",err);
            }
            );
        },
    register(){
      this.not_show();
      this.$router.push('/register')
    },
    forget(){
      this.$router.push('/forget_password')
    }
  }
}
</script>

<style scoped>
#all{
  height: 78%;
  width: 100%;
  margin-top: -10%;
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: 10%;
}
.box{
  position: relative;
  top: 13%;
	width: 30%;
	height: 355px;
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
.login{
  position: relative;
  top: -30px;
  margin-left: 44%;
	font-family: Microsoft YaHei;
	font-size: 32px;
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
  font-size: 15px;
  color: #d3d3d3;
}
input{
  padding-bottom: 5px;
  outline: none;
}
.register{
  position: relative;
  top: 4%;
  margin-left: 13%;
	font-family: Microsoft YaHei;
	font-size: 11px;
	color: #888888;
  cursor: pointer;
}
.forget{
  position: relative;
  top: 4%;
  margin-left: 55%;
	font-family: Microsoft YaHei;
	font-size: 11px;
	color: #888888;
  cursor: pointer;
}
.switch{
  position: relative;
  top: 13%;
  left: 13%;
  height: 50px;
  width: 75%;
	background-color: #333333;
	border-radius: 5px;
	border: solid 1px #707070;
}
.no_switch{
  position: relative;
  top: 13%;
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