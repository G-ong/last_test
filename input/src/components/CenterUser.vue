<template>
  <div id="user_all">
      <Navigation/>
      <My_center/>
          <img src="../assets/left_top.png" alt="" class="img1">
          <img src="../assets/left_bottom.png" alt="" class="img2">
          <img src="../assets/small_lower_head.png" alt="" class="img3">
      <div class="big_box">
          <div class="message_box">
              <span class="font_user">用户信息</span>
              <span class="font_name" id="font">用户名:
                  <span style="margin-left: 38px;">{{user.userEmail}}</span>
              </span>
              <span class="font_password" id="font">密码:
                  <span style="margin-left: 53px;font-family: Microsoft YaHei;font-size: 14px;color: #649ac1;cursor:pointer;" @click="change" v-show="show_password">修改密码</span>
                  <input type="text" v-model="password" placeholder="密码不能为空"  v-show="!show_password" style="margin-left: 53px;   outline: none;border-radius: 4px;border: solid 1px #d3d3d3;width: 47%;padding-left: 10px;">
              </span>
              <span class="font_nick_name" id="font">昵称:
                  <span style="margin-left: 53px;outline: none;border-radius: 4px;border: width: 47%; cursor: pointer;" @click="change_nickName" v-show="is_nickName" title="点击进行修改">{{user.nickName}}</span>
                  <input type="text" v-model="nick_name" style="margin-left: 53px;outline: none;border-radius: 4px;border: solid 1px #d3d3d3;width: 47%;padding-left: 10px;" placeholder="请勿超过十三个文字" v-show="!is_nickName">
              </span>
              <span class="font_phone_number" id="font">联系方式:
                  <span style="margin-left: 25px;outline: none;border-radius: 4px; cursor: pointer;" @click="change_phoneNumber" v-show="is_phoneNumber" title="点击进行修改">{{user.phoneNumber}}</span>
                  <input type="text" v-model="phone_number" style="margin-left: 25px;outline: none;border-radius: 4px;border: solid 1px #d3d3d3;width: 47%;padding-left: 10px;" placeholder="请输入正确联系方式" v-show="!is_phoneNumber">
              </span>
              <span class="font_alipay_numbrt" id="font">支付宝账号:
                  <span style="margin-left: 11px;outline: none;border-radius: 4px; cursor: pointer;" v-show="is_alipayAmount" @click="change_alipayAmount" title="点击进行修改">{{user.alipayAmount}}</span>
                  <input type="text" v-model="alipay" style="margin-left: 11px;outline: none;border-radius: 4px;border: solid 1px #d3d3d3;width: 47%;padding-left: 10px;" placeholder="请输入正取支付宝账号" v-show="!is_alipayAmount">
              </span>
          </div>
          <div class="line"></div>
          <div class="photo_box">
              <div class="circle_input">
              <label for="input_photo" style="width: 140px;height: 140px;background-color: #f2f4f5;border: solid 1px #d3d3d3;border-radius: 70px;text-align: center;line-height: 140px;font-family: Microsoft YaHei;font-size: 12px;color: #666666;display: inline-block;">选择本地图片</label>
              <input id="input_photo" type="file" @change="getFile($event)" style="display:none">
              </div>
              <div class="circle_photo">
                  <img :src="'https://i5101b0918.oicp.vip'+user.picture">
              </div>
          </div>
          <button @click="change_user_message">确认修改</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import My_center from '../modularization/My_center.vue'
import Navigation from '../modularization/Navigation.vue'
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
         console.log("cesih",this.user.nickName)
         if(this.user.nickName=='')this.is_nickName=false
         if(this.user.phoneNumber=='')this.is_phoneNumber=false
         if(this.user.alipayAmount=='')this.is_alipayAmount=false
         },
         (err) => {
             console.log("失败",err);
         }
         );
    },
    data(){
        return{
        password:'',
        nick_name:'',
        phone_number:'',
        alipay:'',
        show_password:true,
        user:'',
        is_nickName:true,
        is_phoneNumber:true,
        is_alipayAmount:true
        }
    },
    components: { Navigation, My_center },
    methods:{
        change(){
            this.show_password=false;
            // this.$router.push('/reset_password')
        },   
        getFile(event) {
                this.file = event.target.files[0];
                console.log(this.file);
                let reader=new FileReader();
                reader.readAsDataURL(event.target.files[0]); 
                reader.onload=()=>{
                console.log(reader);
                event.preventDefault();
                let formData = new FormData();
                formData.append('file',this.file);
                let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                }
                axios.post('https://i5101b0918.oicp.vip/user/addProfilePicture', formData, config).then(function (response) {
                    console.log(response)
                })
        }},
        change_user_message(){
            if(this.show_password==true)this.password=this.user.password
            if(this.is_nickName==true)this.nick_name=this.user.nickName
            if(this.is_phoneNumber==true)this.phone_number=this.user.phoneNumber
            if(this.is_alipayAmount==true)this.alipay=this.user.alipayAmount
            if(confirm("请确认修改")){
             console.log("修改用户信息");
                this.$http({
                method: "post",
                url: "/user/reviseUserMessage",
                data: {
                    nickName:this.nick_name,
                    phoneNumber:this.phone_number,
                    password:this.password,
                    alipayAmount:this.alipay
                },
                }).then(
                (res) => {
                    console.log("成功",res);
                    alert(res.data.msg);
                    this.is_nickName=true,
                    this.is_phoneNumber=true,
                    this.is_alipayAmount=true
                },
                (err) => {
                    console.log("失败",err);
                }
                );
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
                    this.$router.push({
                    path:'/center_user',
                    query:{
                        t:Date.now()
                    }
                    })
                },
                (err) => {
                    console.log("失败",err);
                }
                );
            }
        },
        change_nickName(){
            this.is_nickName=false;
        },
        change_phoneNumber(){
            this.is_phoneNumber=false;
        },
        change_alipayAmount(){
            this.is_alipayAmount=false;
        }
    }
}
</script>

<style scoped>
#user_all{
  width: 100%;
  height: 100%;
  /* background-image: url('../assets/part_background.jpg');
  background-repeat: repeat;
  background-size: 100%;
  background-attachment:fixed; */
}
.img1{  
    width: 13%;
    position: fixed;
    left: 4%;
    top: 67%;
    height: 200px;
}
.img2{  
    width: 22%;
    position: fixed;
    top: 10%;
    left: -1%;
    height: 279px;
}
.img3{    
    width: 20%;
    position: fixed;
    right: 14%;
    top: 60%;
    height: 250px;
}
.big_box{
    position: relative;
    left: 30.2%;
	width: 51.5%;
	height: 273px;
	background-color: #ffffff;
	border: solid 1px rgba(0, 0, 0, 0.1);
}
.message_box{
    height: 100%;
    width: 48%;
    float: left;
}
.line{
	width: 0px;
	height: 172px;
	border: solid 1px rgba(0, 0, 0, 0.1);
    position: relative;
    left: 46%;
}
.photo_box{
    height: 100%;
    width: 52%;
    float: left;
}
.font_user{
    position: relative;
    top: 24px;
    left: 46px;
	font-family: Microsoft YaHei;
	font-size: 19px;
	font-weight: 700;
	color: #333333;
    display: inline-block;
    width: 80%;
}
#font{
    width: 80%;
    height: 19px;
    display: inline-block;
	font-family: Microsoft YaHei;
	font-size: 14px;
	color: #333333;
    overflow: hidden;
}
.font_name{
    position: relative;
    top: 40px;
    left: 47px;
}
.font_password{
    position: relative;
    top: 50px;
    left: 47px;
}
.font_nick_name{
    position: relative;
    top: 60px;
    left: 47px;
}
.font_phone_number{
    position: relative;
    top: 70px;
    left: 47px;
}
.font_alipay_numbrt{
    position: relative;
    top: 80px;
    left: 47px;
}
.circle_input{
    position: relative;
    top: -115px;
    left: 8%;
	width: 140px;
	height: 140px;
	background-color: #f2f4f5;
	border: solid 1px #d3d3d3;
    border-radius: 70px;
    text-align: center;
    line-height: 140px;
	font-family: Microsoft YaHei;
	font-size: 12px;
	color: #666666;
}
.circle_photo{
    position: relative;
    top: -256px;
    left: 55%;
	width: 140px;
	height: 140px;
	background-color: #f2f4f5;
	border: solid 1px #d3d3d3;
    border-radius: 70px;
}
img{
    height: 100%;
    width: 100%;
    border-radius: 70px;
}
button{
    position: relative;
    top: -219px;
    left: 42%;
	width: 90px;
	height: 32px;
	background-color: rgba(208, 46, 46, 0.2);
	border-radius: 4px;
	border: solid 1px #d3d3d3;
    cursor: pointer;
	font-family: Microsoft YaHei;
	font-size: 14px;
	color: #666666;
	box-shadow: 0px 3px 6px 0px 
		rgba(211, 211, 211, 0.16);
}
</style>