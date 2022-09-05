
<!-- css js -->
<template>
  <div id="all">
    <Navigation/>
    <div class="box">
      <span class="font_add">添加接单</span>
       <span class="font_name" >订单名称</span>
       <input type="text" class="name" v-model="subject">
       <span class="font_total">订单总价</span>
       <input type="text" class="total" v-model="totalAmount">
       <span class="font_remark">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</span>
       <input type="text" class="remark" v-model="remark">
      <button :class="{switch:mouse_hover,no_switch:!mouse_hover}" @mouseenter = "change" @mouseleave="change">
        <span class="font_order" @click="order">确定下单</span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navigation from '../modularization/Navigation.vue';
export default {
  components: { Navigation },
    mounted(){
      if(localStorage.getItem("whether_pay")=="YES"){
      this.$router.push({
        path:'/pay',
        query:{
          t:Date.now()
        }
      })
      }
      // localStorage.setItem('login', true);
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
  data(){
    return{
      mouse_hover:true,
      subject:'',
      totalAmount:'',
      remark:'',
    }
  },
  methods:{
    change(){
      this.mouse_hover=!this.mouse_hover
    },
    order(){
      console.log("添加接单");
          this.$http({
          method: "post",
          url: "/common/addOrder",
          data: {
              subject:this.subject,
              totalAmount:this.totalAmount,
              remark:this.remark
          },
          }).then(
          (res) => {
              console.log(res);
              if(res.data.code==401){
                alert("请登录！")
                this.$router.push('/login')
              }
              else{
              alert(res.data.msg)
              this.subject='';
              this.totalAmount='',
              this.remark=''
              // localStorage.setItem('pay_code',res.data.data)
              // localStorage.setItem("whether_pay","YES");	
              // let new1=this.$router.resolve({name:'/pay', params: {id: Date.now()}});
              //   window.open(new1.href,'_blank')
              }
          },
          (err) => {
              console.log(err);
          }
          );
    }
  }
}
</script>

<style scoped>
#all{
  height: 78%;
  width: 100%;
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: 10%;
}
.box{
  position: relative;
  top: 35%;
	width: 46%;
	height: 35.5%;
  margin-left: 41%;
	background-color: #d3d3d3;
	box-shadow: 0px 3px 6px 0px 
		rgba(0, 0, 0, 0.16);
}
.font_add{
  position: relative;
  top: 2%;
  left: 3%;
	font-family: Microsoft YaHei;
	font-size: 18px;
	font-weight: 700;
	color: #ffffff;
}
.font_name{
  position: relative;
  top: 24%;
  left: 1%;
	font-family: Microsoft YaHei;
	font-size: 12px;
	font-weight: 700;
	font-stretch: normal;
	color: #ffffff;
}
.name{
  position: relative;
  top: 24%;
  left: 3%;
	width: 17%;
  background-color: #d3d3d3;
	border: solid #ffffff;
  border-width: 0px 0px 1.5px 0px;
  outline: none;
  color: #888888;
}
.font_total{
  position: relative;
  top: 24%;
  left: 13%;
	font-family: Microsoft YaHei;
	font-size: 12px;
	font-weight: 700;
	font-stretch: normal;
	color: #ffffff;
}
.total{
  position: relative;
  top: 24%;
  left: 16%;
	width: 23%;
  background-color: #d3d3d3;
	border: solid #ffffff;
  border-width: 0px 0px 1.5px 0px;
  outline: none;
  color: #888888;
}
.font_remark{
  position: relative;
  top: 52%;
  left: -54.8%;
	font-family: Microsoft YaHei;
	font-size: 12px;
	font-weight: 700;
	font-stretch: normal;
	color: #ffffff;
}
.remark{
  position: relative;
  top: 35%;
  left: 21.5%;
	width: 61%;
  background-color: #d3d3d3;
	border: solid #ffffff;
  border-width: 0px 0px 1.5px 0px;
  outline: none;
  color: #888888;
}
.switch{
  position: relative;
  top: 60%;
  left: 6%;
	width: 27%;
	height: 56px;
	background-color: #333333;
	border-radius: 4px;
  border: none;
}
.no_switch{
  position: relative;
  top: 60%;
  left: 6%;
	width: 27%;
	height: 56px;
	background-color: #5b5b5b;
	border-radius: 4px;
  border: none;
  opacity: 0.8;
}
.font_order{
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
	font-family: Microsoft YaHei;
}
</style>