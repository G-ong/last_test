<template>
  <div id="all">
      <div class="small">
        <Navigation/>
        <User_navigation/>
          <img src="../assets/left_top.png" alt="" class="img1">
          <img src="../assets/left_bottom.png" alt="" class="img2">
          <img src="../assets/small_lower_head.png" alt="" class="img3">
        <div class="message_all_box">
            <div>
                <span class="font" @click="back">私信</span>
                <span class="font_icon">></span>
                <span class="username">{{name}}</span>
                <div class="line"></div>
            </div>
            <div class="content">
                <div v-for="(someone_message,index) in someone_messages" :key="index" style="margin-top: 20px;">
                    <span class="time">{{someone_message.date}}</span>
                    <div class="dialog_box_left" v-if="someone_message.from==name" style="margin-top: 10px;">
                        <img :src="'https://i5101b0918.oicp.vip'+picture" alt=""  class="photo_left" v-if="picture!='no_picture'">
                        <img src="../assets/no_photo_1.png" alt=""  class="photo_left" v-if="picture=='no_picture'">
                        <div class="dialog_left">{{someone_message.text}}</div>
                    </div> 
                    <div class="dialog_box_right" v-if="someone_message.from==my_user.userEmail" style="margin-top: 10px;">
                        <img :src="'https://i5101b0918.oicp.vip'+my_user.picture" alt="" class="photo_right">
                        <div class="dialog_right">{{someone_message.text}}</div>
                    </div> 
                </div>
            <div class="white"></div>
            </div>
        </div>
        <div class="input">
                <textarea v-model="text" class="input_box"></textarea>
                 <button class="input_btn" @click="send">发送</button>
        </div>
      </div>
  </div>
</template>

<script>
let socket;
import axios from 'axios'
import Navigation from '../modularization/Navigation.vue'
import User_navigation from '../modularization/User_navigation.vue'
export default {
    inject: ['reload'],
    data(){
        return{
            circleUrl: 'wss://i5101b0918.oicp.vip/websocket',
            user: {},
            isCollapse: false,
            users: [],
            chatUser:localStorage.getItem("TALK_TO"),
            text: "",
            messages: [],
            content: '',
            name:localStorage.getItem("TALK_TO"),
            someone_messages:[],
            picture:localStorage.getItem("PICTURE"),
            my_user:'',
            temp:[]
        }
    },
    mounted(){
         console.log("查看某个聊天的所有记录");
         axios.get('https://i5101b0918.oicp.vip/message/findTalk',{
         params:{
             to:this.name
                 },
         })
         .then((res)=>{
             console.log(res); 
             this.someone_messages=res.data.data;
            //  this.temp=res.data.data;
            //  for(let i=0;i<this.temp.length;i++){
            //  this.someone_messages[this.temp.length-i-1]=this.temp[i];
            //  console.log(this.temp.length-i-1,this.someone_messages[this.temp.length-i-1])
            //  }
            //  console.log("总的",this.someone_messages);
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
             this.my_user=res.data.data;
         },
         (err) => {
             console.log("失败",err);
         }
         );
    },
    components: { User_navigation, Navigation },
    created() {
        this.init()
    },
    methods: {
        back(){
            this.$router.push("/news_notification_message")
        },
        send() {
        if (!this.text) {
            this.$message({type: 'warning', message: "请输入内容"})
        } else {
            if (typeof (WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
            } else {
            console.log("您的浏览器支持WebSocket","1");
            let message = { to: this.chatUser, text: this.text}
            socket.send(JSON.stringify(message));  // 将组装好的json发送给服务端，由服务端进行转发
            this.messages.push({user: this.user.username, text: this.text})
            // 构建消息内容，本人消息
            this.createContent(null, this.user.username, this.text)
            this.text = '';
            // this.reload();
            }
        }
        
         console.log("查看某个聊天的所有记录");
         axios.get('https://i5101b0918.oicp.vip/message/findTalk',{
         params:{
             to:this.name
                 },
         })
         .then((res)=>{
             console.log(res); 
             this.someone_messages=res.data.data;
            //  this.temp=res.data.data;
            //  for(let i=0;i<this.temp.length;i++){
            //  this.someone_messages[this.temp.length-i-1]=this.temp[i];
            //  console.log(this.temp.length-i-1,this.someone_messages[this.temp.length-i-1])
            //  }
            //  console.log("总的",this.someone_messages);
         })
         .catch((error)=>{
             console.log(error)  
         })
        },
        createContent(remoteUser, nowUser, text) {  // 这个方法是用来将 json的聊天消息数据转换成 html的。
        let html
        // 当前用户消息
        if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
            html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
                "  <div class=\"el-col el-col-22\" style=\"text-align: right; padding-right: 10px\">\n" +
                "    <div class=\"tip left\">" + text + "</div>\n" +
                "  </div>\n" +
                "  <div class=\"el-col el-col-2\">\n" +
                "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
                "    <img src=\"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png\" style=\"object-fit: cover;\">\n" +
                "  </span>\n" +
                "  </div>\n" +
                "</div>";
        } else if (remoteUser) {   // remoteUser表示远程用户聊天消息，蓝色的气泡
            html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
                "  <div class=\"el-col el-col-2\" style=\"text-align: right\">\n" +
                "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
                "    <img src=\"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png\" style=\"object-fit: cover;\">\n" +
                "  </span>\n" +
                "  </div>\n" +
                "  <div class=\"el-col el-col-22\" style=\"text-align: left; padding-left: 10px\">\n" +
                "    <div class=\"tip right\">" + text + "</div>\n" +
                "  </div>\n" +
                "</div>";
        }
        console.log(html)
        this.content += html;
        },
        init() {
        this.User = localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : {}
        if (typeof (WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
        } else {
            console.log("您的浏览器支持WebSocket","2");
            let socketUrl = "wss://i5101b0918.oicp.vip/websocket" ;
            if (socket != null) {
            socket.close();
            socket = null;
            }
            // 开启一个websocket服务
            var token=localStorage.getItem("user");
            token=token.substring(1,token.length-1);
            console.log("token",token);
            socket = new WebSocket(socketUrl,[token]);
            //打开事件
            socket.onopen = function () {
            console.log("websocket已打开");
            };
            //  浏览器端收消息，获得从服务端发送过来的文本消息
            socket.onmessage = function (msg) {
            console.log("收到数据====" + msg.data)
            };
        }
        }
    },
}
</script>

<style scoped>
.small{
    float: left;
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
    right: 3%;
    top: 45%;
}
.message_all_box{  
    /* position: fixed; */
    width: 53%;
    margin-left: 30.6%;
    height: 100%;
    background-color: #fff;
    border: solid 1px rgba(0, 0, 0, 0.1);
}
.font{  
    font-family: Microsoft YaHei;
    font-size: 15px;
    font-weight: 700;
    color: #649ac1;
    position: relative;
    left: 7%;
    top: 10px;
    cursor: pointer;
}
.font_icon{
    font-family: Microsoft YaHei;
    font-size: 15px;
    font-weight: 700;
    color: #666666;
    position: relative;
    left: 9%;
    top: 10px;
}
.username{
    font-family: Microsoft YaHei;
    font-size: 15px;
    font-weight: 700;
    color: #333333;
    position: relative;
    left: 11%;
    top: 10px;
}
.line{  
    position: relative;
    top: 20px;
    left: 51px;
    width: 90%;
    border: solid 1px #d02e2e;
}
.time{
    margin-left: 42%;
	font-family: Microsoft YaHei;
	font-size: 10px;
	color: #888888;
}
img{
    width: 40px;
    height: 40px;
}
.photo_left{
    position: absolute;
    margin-left: 3.5%;
}
.photo_right{
    position: absolute;
    margin-left: 48%;
}
.dialog_right{
    width: 35%;
    background-color: #649ac1;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    /* div文字自动换行 */
    word-wrap: break-word;
    margin-left: 53%;
    padding: 6px;
    color: #fff;
    font-size: 13px;
}
.dialog_left{
    width: 35%;
    background-color: #f2f4f5;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    /* div文字自动换行 */
    word-wrap: break-word;
    margin-left: 13%;
    padding: 6px;
    color: #666666;
    font-size: 13px;
}
.input{  
    width: 53%;
    height: 120px;
    background-color: #f7f8f8;
    border: solid 1px rgba(0, 0, 0, 0.1);
    position: fixed;
    bottom: 0px;
    margin-left: 30.6%;
}
.white{
    height: 540px;
}
.input_box{
	width: 90%;
	height: 60px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #d3d3d3;
    position: absolute;
    left: 5%;
    top: 15px;
    outline: none;
    resize: none;
}
.input_btn{
	width: 70px;
	height: 30px;
	background-color: #333333;
    outline: none;
    border-style: none;
    border-radius: 5px;
    position: absolute;
    right: 4%;
    top: 88px;
    color: #ffffff;
    font-weight: 700;
    font-size: 13px;
}
</style>