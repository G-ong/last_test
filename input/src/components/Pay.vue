
<!-- css -->
<template>
  <div id="work_data_all">
      <Navigation/>
      <div class="detail_work">
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
          <span class="time">2022-08-11 23:12</span>
          <button class="pay" @click="pay(good.outTradeNo)">支付</button>
          <img src="../assets/pay.png" alt="">
      </div>
  </div>
</template>

<script>
import axios from 'axios'
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
                   if(this.goods[i].outTradeNo==this.code){
                       this.good=this.goods[i];
                   }
               }
           },
           (err) => {
               console.log(err);
           }
           );
    },
    data(){
        return{
            goods:[],
            good:'',
            code:localStorage.getItem('pay_code')
        }
    },
  components: {
    Navigation,
  },
  methods:{
      pay(code){
         localStorage.setItem("whether_pay",'');
         console.log("支付订单","code="+code);
         axios.get('https://i5101b0918.oicp.vip/alipay/pay',{
         params:{
             outTradeNo:code
                 },
         })
         .then((res)=>{
             console.log(res); 
            // axios.interceptors.request.use(function (config) {
            // let token = window.localStorage.getItem("user")
            // token = eval( token );
            // if (token) {
            //     config.headers.token = token;    
            // }
            // return config;
            // }, function (error) {
            //     return Promise.reject(error);
            // });
            //  window.open('alipay/pay?/outTradeNo='+code,"_blank") 
            //  window.open('https://i5101b0918.oicp.vip/alipay/pay?outTradeNo='+code,"_blank") 
             document.write(res.data)
         })
         .catch((error)=>{
             console.log(error)  
         })
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
.pay{
    position: relative;
    top: 122px;
    left: -36%;
    width: 49px;
    border-radius: 4px;
    border: solid 1px #d3d3d3;
    font-family: Microsoft YaHei;
    font-size: 12px;
    color: #666666;
    box-shadow: 0px 3px 6px 0px rgba(211, 211, 211, 0.16);
    background-color: rgba(255, 192, 203, 0.822);
    cursor: pointer;
}
img{  
    width: 115.2%;
    margin-left: -28px;
}
</style>