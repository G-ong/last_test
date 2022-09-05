<template>
  <div id="all">
      <Navigation/>
      <img src="../assets/congratulation.png" alt="">
      <p class="font">恭喜你成为打工人</p>
      <span class="hint">请完善
          <span class="message" @click="complete">个人信息</span>
      </span>
  </div>
</template>

<script>
import axios from 'axios'
import Navigation from '../modularization/Navigation.vue'
export default {
    data(){
        return{
            user:''
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
            //  if(this.user.alipayAmount=='xxx')
            //  console.log("daiugsssssssssss")
            //  alert('请完善个人信息：联系电话与支付宝账户');
         },
         (err) => {
             console.log("失败",err);
         }
         );
      console.log("成为跑腿服务员工");
         this.$http({
         method: "post",
         url: "/common/addWorker",
         data: {
         },
         }).then(
         (res) => {
             console.log("khj",res);
            //  if(this.user.alipayAmount=='xxx')
            //  alert('请完善个人信息：联系电话与支付宝账户');
             if((res.data.code==200&&this.user.alipayAmount!='xxx')||(res.data.code==403&&this.user.alipayAmount!='xxx')){
                 console.log("axxxxxxxxxxxxx")
             this.$router.push('/my_errand_inquire')
             }
             
             else{
             alert('请完善个人信息：联系电话与支付宝账户');
                 console.log("adssssssssssss")

             }
         },
         (err) => {
             console.log("失败",err);
         }
         );
    },
    components:{
        Navigation
    },
    methods:{
        complete(){
            this.$router.push('/center_user')
        }
    }

}
</script>

<style scoped>
#all{
    background-image: url('../assets/background_work.png');
    background-size: 100%;
    width: 100%;
    height: 100%;
}
img{  
    width: 38%;
    position: absolute;
    left: 0%;
    top: 34%;
}
.font{
    margin-left: 28%;
    margin-top: 12%;
	font-family: Microsoft YaHei;
	font-size: 79px;
	font-weight: 700;
	color: #333333;
}
.hint{
    position: relative;
    top: -22px;
    left: 46%;
	font-family: Microsoft YaHei;
	font-size: 18px;
	line-height: 31px;
	color: #888888;
}
.message{
    margin-left: -5px;
    color: #649ac1;
    cursor: pointer;
}
</style>