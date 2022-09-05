<template>
  <div id="work_data_all">
      <Navigation/>
      <div class="detail_work">
          <div id="small_box">
              <span id="font_title">下单人信息</span>
              <div>
                  <span>昵称：</span>
                  <span style="margin-left: 35px;">{{bill.payee.nickName}}</span>
                  <button class="send_message" @click="message(bill.buyer.userEmail)">私信</button>
              </div>
              <div>
                  <span>联系方式：</span>
                  <span style="margin-left: 9px;">{{bill.payee.phoneNumber}}</span>
              </div>
              <div>
                  <span>支付宝:</span>
                  <span style="margin-left: 32px;">{{bill.payee.alipayAmount}}</span>
              </div>
          </div>
          <div id="small_box">
              <span id="font_title">订单信息</span>
              <div>
                  <span>订单编号：</span>
                  <span style="margin-left: 11px;">{{bill.outTradeNo}}</span>
              </div>
              <div>
                  <span>创建时间：</span>
                  <span style="margin-left: 11px;">{{bill.gmtPayment}}</span>
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
                          <span>{{bill.subject}}</span>
                      </div>
                      <div id="sort_box" style="width: 20%;">
                          <span>￥{{bill.totalAmount}}</span>
                      </div>
                      <div id="sort_box" style="width: 39%;">
                          <span>{{bill.remark}}</span>
                      </div>
                  </div>
              </div>

          </div>
      </div>
      <div>
          <span class="time">{{bill.gmtPayment}}</span>
          <img src="../assets/work_detail.png" alt="" v-if="bill.tradeStatus==2" class="img1">
          <img src="../assets/no_score.png" alt="" v-if="bill.tradeStatus==3" class="img2">
          <img src="../assets/score.png" alt="" v-if="bill.tradeStatus==4" class="img3">
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
          mybills:[],
          bill:''
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
      console.log("查询本人的接单");
         this.$http({
         method: "post",
         url: "/worker/findTakingOrder",
         data: {
         },
         }).then(
         (res) => {
             console.log("成功",res);
             this.mybills=res.data.data;
                 console.log("code",this.code)
             for(let i=0;i<this.mybills.length;i++){
                 console.log(this.mybills[i].outTradeNo)
                 if(this.code==this.mybills[i].outTradeNo){
                     this.bill=this.mybills[i];
                     console.log("yes")
                 }
             }
         },
         (err) => {
             console.log("失败",err);
         }
         );
  },
  components: {
    Navigation,
  },
  methods:{
      message(name){
          localStorage.setItem("TALK_TO",name);
          localStorage.setItem("PICTURE","no_picture")
          this.$router.push("/message_detail")
      }
  }
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
    cursor: pointer;
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
.time{
	font-family: Microsoft YaHei;
	font-size: 11px;
	color: #666666;
    position: relative;
    top: 64px;
    left: 45px;
}
.img1{  
    width: 102.3%;
    margin-left: -13px;
    margin-top: -20px;
}
.img2{  
    width: 102.5%;
    margin-left: -14px;
    margin-top: -15px;
}
.img3{
    width: 115.1%;
    margin-left: -54px;
    margin-top: -15px;
}
</style>