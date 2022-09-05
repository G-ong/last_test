<template>
  <div>
      <div class="small_navigation_box">
          <div class="triangle"></div>
          <div>
              <div class="small_box_one">
                  <img src="../assets/no_my_center.png" alt="" style="width: 100%;"></div> 
              <span class="font_one" title="点击进入" @click="push_my_center">个人中心</span> 
          </div>
          <div>
              <div class="small_box_two">
                  <img src="../assets/no_message_notice.png" alt="" style="width: 100%;"></div>
              <span class="font_two" title="点击进入" @click="push_message">消息通知</span>
          </div>
          <div class="line"></div>
          <div>
              <div class="small_box_three">
                  <img src="../assets/no_logout.png" alt="" style="width: 100%;"></div>
              <span class="font_three" title="点击退出" @click="push_logout">退出登录</span>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
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
    },
    methods:{
        push_my_center(){
            this.$router.push('/center_user')
        },
        push_message(){
            this.$router.push('/news_notification_like')
        },
        push_logout(){
            console.log("用户退出登录");
                this.$http({
                method: "post",
                url: "/user/logout",
                data: {
                },
                }).then(
                (res) => {
                    console.log("成功",res);
                    localStorage.setItem('user','');
                    localStorage.setItem('login', true);
                    localStorage.setItem('manage', '');
                    localStorage.setItem("whether_pay",'');
                    alert(res.data.msg)
                    this.$router.push({
                        path:'/homepage',
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
    }

}
</script>

<style scpoed>
.small_navigation_box{
    float: left;
    position: fixed;
    left: 80.1%;
    top: 130px;
	width: 116px;
	height: 120px;
	background-color: #ffffff;
	box-shadow: 0px 3px 6px 0px 
		rgba(0, 0, 0, 0.16);
	border: solid 1px rgba(0, 0, 0, 0.1);
}
.triangle{
    float: left;
    position: relative;
    top: -20px;
    left: 50px;
    border: 10px solid transparent;
    border-bottom-color: #ffffff;

}
.font_one{
	font-family: Microsoft YaHei;
	color: #666666;
    font-size: 14px;
    position: relative;
    top: 15px;
    left: 6px;
    cursor: pointer;
}
.font_two{
	font-family: Microsoft YaHei;
	color: #666666;
    font-size: 14px;
    position: relative;
    top: 25px;
    left: 6px;
    cursor: pointer;
}
.font_three{
	font-family: Microsoft YaHei;
	color: #666666;
    font-size: 14px;
    position: relative;
    top: 48px;
    left: 25px;
    cursor: pointer;
}
.small_box_one{
    width: 14px;
    height: 14px;
	background-color: #ffffff;
	border: solid 1px #707070;
	opacity: 0.24;
    float: left;
    position: relative;
    top: 18px;
}
.small_box_two{
    width: 14px;
    height: 14px;
	background-color: #ffffff;
	border: solid 1px #707070;
	opacity: 0.24;
    float: left;
    position: relative;
    top: 28px;
}
.small_box_three{
    width: 14px;
    height: 14px;
	background-color: #ffffff;
	border: solid 1px #707070;
	opacity: 0.24;
    float: left;
    position: relative;
    top: 50px;
    left: 20px;
}
.line{
    position: relative;
    top: 39px;
    left: 12px;
	width: 91px;
	border: solid 1px rgba(0, 0, 0, 0.1);
}
</style>