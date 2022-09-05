<template>
    <div id="navigation_all">
        <div class="small">
    <div class="top">
        <img src="../assets/icon.png" alt="">
        <p class="font">向生活低头</p>
    </div>
    <div :class="{navigation:show_navigtion,no_navigation:!show_navigtion}">
        <span :class="{homepage:font_color_homepage,no_homepage:!font_color_homepage}" @click="homepage">首页</span>
        <span :class="{errand:font_color_errand,no_errand:!font_color_errand}" @click="errand">跑腿服务</span>
        <span :class="{share:font_color_share,no_share:!font_color_share}" @click="share">分享服务</span>
        <span :class="{work:font_color_work,no_work:!font_color_work}" @click="work">打工人中心</span>
        <span :class="{login:show_login_color,no_login:!show_login_color}" @click="login" v-show='show_login=="true"||show_login==null'>登录</span>
        <div class="login_circle" v-show='show_login=="false"' 
         @mouseenter = "change">
         <img :src="'https://i5101b0918.oicp.vip'+user.picture" style="width: 100%;height: 100%;border-radius: 100px;margin-left: 0px;margin-top: 0px;">
         </div>
    </div>
    </div>
    <div v-show="!show_small_navigtion">
        <div v-show="manage">
        <Small_navigation/>
        </div>
        <div v-show="!manage">
        <Small_navigation_manage/>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import Small_navigation from './Small_navigation.vue'
import Small_navigation_manage from './Small_navigation_manage.vue';
export default {
    data(){
        return{
            show_small_navigtion:true,
            font_color_homepage:true,
            font_color_errand:true,
            font_color_share:true,
            font_color_work:true,
            show_login_color:true,
            show_navigtion:true,
            show_login:window.localStorage.getItem("login"),
            user:'',
            manage:(localStorage.getItem("manage"))!="false"
        }
    },
    components:{
        Small_navigation,
        // Report,
        Small_navigation_manage
    },
    mounted(){
            // alert(this.show_small_navigtion)
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
         },
         (err) => {
             console.log("失败",err);
         }
         );
            if(this.show_login=="false"){
                this.show_navigtion=false;
            console.log(this.show_navigtion,"s",this.show_login);
            }
            if(this.show_login=="true"){
                this.show_navigtion=true;
            console.log(this.show_navigtion);}
            console.log(this.show_navigtion,"s",this.show_login);
    },
    methods:{
        change(){
            this.show_small_navigtion=!this.show_small_navigtion;
            // alert(!this.manage)
            // alert((!this.show_small_navigtion)&&(!this.manage))
        },
        homepage(){
            this.font_color_homepage=!this.font_color_homepage,
            this.font_color_errand=true,
            this.font_color_share=true,
            this.font_color_work=true,
            this.show_login_color=true,
            this.$router.push('/homepage')
        },
        errand(){
            this.font_color_errand=!this.font_color_errand,
            this.font_color_homepage=true,
            this.font_color_share=true,
            this.font_color_work=true,
            this.show_login_color=true,
            this.$router.push('/errand_inquire')
        },
        share(){
            this.font_color_share=!this.font_color_share,
            this.font_color_errand=true,
            this.font_color_homepage=true,
            this.font_color_work=true,
            this.show_login_color=true
            this.$router.push('/share_serve')
        },
        work(){
            this.font_color_work=!this.font_color_work,
            this.font_color_errand=true,
            this.font_color_share=true,
            this.font_color_homepage=true,
            this.show_login_color=true
            console.log("成为跑腿服务员工");
                this.$http({
                method: "post",
                url: "/common/addWorker",
                data: {
                },
                }).then(
                (res) => {
                    console.log("成功ohno",res)
                    if((res.data.code==200&&this.user.alipayAmount!='xxx')||(res.data.code==403&&this.user.alipayAmount!='xxx'))
                    this.$router.push('/my_errand_inquire')
                    else
                    this.$router.push('/congratulations')
                },
                (err) => {
                    console.log("失败",err);
                }
                );
        },
        login(){
            this.show_login_color=!this.show_login_color,
            this.font_color_errand=true,
            this.font_color_share=true,
            this.font_color_work=true,
            this.font_color_homepage=true,
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
#navigation_all{
    position: sticky;
    top: 0;
    z-index: 10;
}
.small{
    width: 100%;
    height: 100%;
}
sapn{
    color:#d02e2e
}
.top{
    height: 9%;
    background-color: #f2f4f5;
}
.navigation{
    height: 6%;
    margin-top: -5%;
    background-color: #f2f4f5;
}
.no_navigation{
    height: 6%;
    margin-top: -6%;
    background-color: #f2f4f5;
}
img{
    width: 2%;
    height: 47%;
    margin-left: 13%;
    margin-top: 2.5%;
}
.font{
    width: 10%;
    height: 30%;
    margin-left: 16%;
    margin-top: -2.2%;
    font-size: 24px;
	font-family: Microsoft YaHei;
	font-weight: 700;
	color: #333333;
}
.homepage{
    position: relative;  
    top: 70px;
    margin-left: 60%;
	font-family: Microsoft YaHei;
	font-weight: 700;
	color: #333333;
    cursor:pointer
}
.no_homepage{
    position: relative;  
    top: 70px;
    margin-left: 60%;
	font-family: Microsoft YaHei;
	font-weight: 700;
	color: #d02e2e;
    cursor:pointer
}
.errand{
    position: relative;  
    top: 50px;
    margin-left: 64%;
	font-family: Microsoft YaHei;
	font-weight: 700;
	color: #333333;
    cursor:pointer
}
.no_errand{
    position: relative;  
    top: 50px;
    margin-left: 64%;
	font-family: Microsoft YaHei;
	font-weight: 700;
	color: #d02e2e;
    cursor:pointer
}
.share{
    position: relative;  
    top: 30px;
    margin-left: 70%;
	font-family: Microsoft YaHei;
	font-weight: 700;
	color: #333333;
    cursor:pointer
}
.no_share{
    position: relative;  
    top: 30px;
    margin-left: 70%;
	font-family: Microsoft YaHei;
	font-weight: 700;
	color: #d02e2e;
    cursor:pointer
}
.work{
    position: relative;  
    top: 10px;
    margin-left: 76%;
	font-family: Microsoft YaHei;
	font-weight: 700;
	color: #333333;
    cursor:pointer
}
.no_work{
    position: relative;  
    top: 10px;
    margin-left: 76%;
	font-family: Microsoft YaHei;
	font-weight: 700;
	color: #d02e2e;
    cursor:pointer
}
.login{
    position: relative;  
    top: -10px;
    margin-left: 83%;
	font-family: Microsoft YaHei;
	font-weight: 700;
	color: #333333;
    cursor:pointer
}
.no_login{
    position: relative;  
    top: -10px;
    margin-left: 83%;
	font-family: Microsoft YaHei;
	font-weight: 700;
	color: #d02e2e;
    cursor:pointer
}
.login_circle{  
    position: relative;
    top: -18px;
    margin-left: 83%;
    width: 35px;
    height: 35px;
    border-radius: 20px;
	border: solid 1px #707070;
    cursor: pointer;
}
</style>