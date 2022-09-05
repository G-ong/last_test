
<!-- css -->
<template>
  <div id="work_data_all">
      <Navigation/>
      <div class="detail_work">
          <div id="small_box">
              <span id="font_title">跑腿员工信息</span>
              <div>
                  <span>昵称：</span>
                  <span style="margin-left: 35px;">XXX</span>
                  <button class="send_message" @click="send">私信</button>
              </div>
              <div>
                  <span>联系方式：</span>
                  <span style="margin-left: 9px;">xxxxxxxxxx</span>
              </div>
              <div>
                  <span>支付宝:</span>
                  <span style="margin-left: 32px;">*******</span>
              </div>
          </div>
          <div id="small_box">
              <span id="font_title">订单信息</span>
              <div>
                  <span>订单编号：</span>
                  <span style="margin-left: 11px;">{{good.outTradeNo}}</span>
              </div>
              <div>
                  <span>创建时间：</span>
                  <span style="margin-left: 11px;">2022-08-11 16:08</span>
              </div>
          </div>
          <div style="width: 68%;margin-left: 8.7%;margin-top: 15px;">
              <div class="name_field">
                  <div id="name_box" style="width: 40%;">订单名称</div>
                  <div id="name_box" style="width: 20%;">订单总价</div>
                  <div id="name_box" style="width: 40%;">备注</div>
              </div>
              <div class="message_field">
                  <div style="height: 100%;">
                      <div id="sort_box" style="width: 40%;">
                          <span>{{good.subject}}</span>
                      </div>
                      <div id="sort_box" style="width: 20%;">
                          <span>￥{{good.totalAmount}}</span>
                      </div>
                      <div id="sort_box" style="width: 39%;">
                          <span>{{good.remark}}</span>
                      </div>
                  </div>
              </div>

          </div>
      </div>
      <div>
          <span class="time_1" id="time">2022-08-11 23:12</span>
          <span class="time_2" id="time">2022-08-11 23:48</span>
          <span class="time_3" id="time">2022-08-11 23:49</span>
          <span class="remind" id="time">跑腿员工XXXXX已接单</span>
          <img src="../assets/bill_detail.png" alt="">
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navigation from '../modularization/Navigation.vue'
export default {
    data(){
        return{
          code:localStorage.getItem("pay_code"),
          goods:[],
          good:''
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
       console.log("查询所有本人发布的订单");
           this.$http({
           method: "post",
           url: "/common/findAllOrder",
           data: {
           },
           }).then(
           (res) => {
               console.log(res);
               this.goods=res.data.data;
               for(let i=0;i<this.goods.length;i++){
                   if(this.code==this.goods[i].outTradeNo){
                       this.good=this.goods[i]
                   }
               }
           },
           (err) => {
               console.log(err);
           }
           );
    },
    methods:{
        send(){
            alert("该功能暂未开通")
        }
    },
  components: {
    Navigation,
  },
}
</script>

<style scoped>
#work_data_all{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}
.detail_work{
    margin-left: 24%;
    width: 52%;
    background-color: #ffffff;
    border: solid 1px rgba(0, 0, 0, 0.1);
    border-width: 1px 1px 0 1px;
}
#small_box{
    padding-left: 20px;
    padding-top: 15px;
}
#font_title{
    font-family: Microsoft YaHei;
    font-size: 18px;
    font-weight: 700;
    color: #333333;
}
.send_message{
    width: 55px;
    background-color: rgba(208, 46, 46, 0.2);
    border-radius: 4px;
    border: solid 1px #d3d3d3;
    margin-left: 3px;
    font-family: Microsoft YaHei;
    font-size: 12px;
    color: #666666;
    box-shadow: 0px 3px 6px 0px rgba(211, 211, 211, 0.16);
}
#small_box div{
    margin-left: 50px;
    margin-top: 10px;
	font-family: Microsoft YaHei;
	font-size: 13px;
	color: #333333;
}
.name_field{
    position: relative;
    left: 6px;
    top: 4px;
	width: 97%;
	height: 33px;
	background-color: #f2f4f5;
	border: solid 1px #d3d3d3;
}
.message_field{
    position: relative;
    left: 6px;
    top: 3px;
	width: 97%;
	height: 70px;
	background-color: #f2f4f5;
	border: solid 1px #d3d3d3;
}
#sort_box{
    float: left;
	height: 100%;
	background-color: #ffffff;
	border: solid 1px #d3d3d3;
    border-collapse: collapse;
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
#sort_box span{
    position: relative;
    top: 10px;
	font-family: Microsoft YaHei;
	font-size: 12px;
	color: #333333;
    overflow: hidden;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;

}
#name_box{
    float: left; 
    text-align: center;
    font-size: 15px;
    line-height: 35px;
}
#time{
	font-family: Microsoft YaHei;
	font-size: 11px;
	color: #666666;
}
.time_1{
    position: relative;
    top: 88px;
    left: 45px;
}
.time_2{
    position: relative;
    top: 136px;
    left: -47px;
}
.time_3{
    position: relative;
    top: 187px;
    left: -140px;
}
.remind{
    position: relative;
    top: 213px;
    left: -709px;
    font-size: 9px !important;
}
img{  
    width: 115.15%;
    margin-left: -55px;
    margin-top: -20px;
}
</style>