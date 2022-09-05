<template>
  <div id="work_data_all">
      <Navigation/>
      <My_center/>
      <My_order_center_top/>
          <img src="../assets/left_top.png" alt="" class="img1">
          <img src="../assets/left_bottom.png" alt="" class="img2">
          <img src="../assets/small_lower_head.png" alt="" class="img3">
      <div class="small">
          <div>
              <input type="text" placeholder="查询接单" class="input_search">
              <div class="small_box">
                  <img src="../assets/inquiry.png" alt="">
              </div>
          </div>
          <div>
              <div class="name_field">
                  <div id="name_box" style="width: 26%;">订单名称</div>
                  <div id="name_box" style="width: 11.9%;">订单总价</div>
                  <div id="name_box" style="width: 27.1%;">备注</div>
                  <div id="name_box" style="width: 11.2%;">接单人</div>
                  <div id="name_box" style="width: 11.2%;">订单状态</div>
                  <div id="name_box" style="width: 11.5%;">订单操作</div>
              </div>
              <div v-for="good in goods" :key="good.outTradeNo" >
                    <div class="message_field" v-if="good.tradeStatus==tradeStatus||tradeStatus=='5'">
                        <div style="height: 40%;">
                            <span class="time">2022-08-08</span>
                            <span class="code">订单编号：{{good.outTradeNo}}</span>
                        </div>
                        <div style="height: 60%;">
                            <div id="sort_box" style="width: 26%;">
                                <span>{{good.subject}}</span>
                            </div>
                            <div id="sort_box" style="width: 11.9%;">
                                <span>￥{{good.totalAmount}}</span>
                            </div>
                            <div id="sort_box" style="width: 27.1%;">
                                <span>{{good.remark}}</span>
                            </div>
               <!-- 已支付已接单订单 -->
                            <div v-if="good.tradeStatus=='2'" class="loop">
                                <div id="sort_box" style="width: 33%;">
                                    <span>苟到最后就是胜利</span>
                                </div>
                                <div id="sort_box" style="width: 31%;">
                                    <span style="height: 34%;">已完成</span>
                                    <span @click="push_detail(good.outTradeNo)" style="cursor: pointer;">订单详情</span>
                                </div>
                                <div id="sort_box" style="width: 34%;">
                                    <button @click="verify(good.outTradeNo)">确认完成</button>
                                </div>
                            </div>
                <!-- 已完成未评分订单 -->
                            <div v-if="good.tradeStatus=='3'" class="loop">
                                <div id="sort_box" style="width: 33%;">
                                    <span>苟到最后就是胜利</span>
                                </div>
                                <div id="sort_box" style="width: 31%;">
                                    <span style="height: 34%;">待评分</span>
                                    <!-- <span @click="push_detail(good.outTradeNo)" style="cursor: pointer;">订单详情</span> -->
                                </div>
                                <div id="sort_box" style="width: 34%;">
                                    <button @click="evaluate(good.outTradeNo)">评分</button>
                                </div>
                            </div>
                <!-- 已支付未接单订单 -->
                            <div class="loop" v-if="good.tradeStatus=='1'">
                                <div id="sort_box" style="width: 33%;">
                                    <span></span>
                                </div>
                                <div id="sort_box" style="width: 31%;">
                                    <span style="height: 34%;">待接单</span>
                                    <!-- <span @click="push_detail(good.outTradeNo)" style="cursor: pointer;">订单详情</span> -->
                                </div>
                                <div id="sort_box" style="width: 34%;">
                                </div>
                            </div>
                <!-- 暂未支付的订单 -->
                            <div class="loop" v-if="good.tradeStatus=='0'">
                                <div id="sort_box" style="width: 33%;">
                                    <span></span>
                                </div>
                                <div id="sort_box" style="width: 31%;">
                                    <span style="height: 34%;">待支付</span>
                                    <!-- <span @click="push_detail(good.outTradeNo)" style="cursor: pointer;">订单详情</span> -->
                                </div>
                                <div id="sort_box" style="width: 34%;">
                                    <button @click="pay(good.outTradeNo)">支付</button>
                                    <span @click="cancel(good.outTradeNo)">取消订单</span>
                                </div>
                            </div>
                <!-- 已完成已评分订单 -->
                        <div class="loop" v-if="good.tradeStatus=='4'">
                            <div id="sort_box" style="width: 33%;">
                                <span>苟到最后就是胜利</span>
                            </div>
                            <div id="sort_box" style="width: 31%;">
                                <span style="height: 34%;">订单完成</span>
                                <!-- <span @click="push_detail(good.outTradeNo)" style="cursor: pointer;">订单详情</span> -->
                            </div>
                            <div id="sort_box" style="width: 34%;">
                            </div>
                        </div>
                    </div>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import My_center from '../modularization/My_center.vue'
import My_order_center_top from '../modularization/My_order_center_top.vue'
import Navigation from '../modularization/Navigation.vue'
export default {
    data(){
        return{
        goods:[],
        score:'',
        tradeStatus:localStorage.getItem("tradeStatus")
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
      this.find();
    //    console.log("查询所有本人发布的订单");
    //        this.$http({
    //        method: "post",
    //        url: "/common/findAllOrder",
    //        data: {
    //        },
    //        }).then(
    //        (res) => {
    //            console.log(res);
    //            this.goods=res.data.data;
    //     console.log(this.tradeStatus==this.goods[0].tradeStatus)
    //        },
    //        (err) => {
    //            console.log(err);
    //        }
    //        );
    },
  components: { Navigation, My_center, My_order_center_top },
  methods:{
      find(){
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
        console.log(this.tradeStatus==this.goods[0].tradeStatus)
           },
           (err) => {
               console.log(err);
           }
           );
      },
      push_detail(code){
          localStorage.setItem("pay_code",code)
          this.$router.push('/my_order_center_detail')
      },
      pay(code){
         localStorage.setItem("pay_code",code);
         localStorage.setItem("whether_pay","YES");	
         let new1=this.$router.resolve({name:'/pay', params: {id: Date.now()}});
           window.open(new1.href,'_blank')
        //  this.$router.push('/pay');
      },
      cancel(code){
        console.log("取消订单");
        axios.get('https://i5101b0918.oicp.vip/common/cancelOrder',{
        params:{
            outTradeNo:code
                },
        })
        .then((res)=>{
            console.log(res); 
        })
        .catch((error)=>{
            console.log(error)  
        })
      },
      verify(code){
          if(confirm("确认该订单已完成？")){
            console.log("确认订单完成");
            axios.get('https://i5101b0918.oicp.vip/common/finishOrder',{
            params:{
                outTradeNo:code
                    },
            })
            .then((res)=>{
                console.log("成功",res); 
                alert(res.data.msg)
      this.find();
            })
            .catch((error)=>{
                console.log(error)  
            })
          }
      },
      evaluate(code){
         this.score=prompt('请输入评分（1-5）')
         console.log("评分");
             this.$http({
             method: "post",
             url: "/common/score",
             data: {
                 outTradeNo:code,
                 score:this.score
             },
             }).then(
             (res) => {
                 console.log(res);
                //  this.goods=res.data.data;
                alert(res.data.msg)
      this.find();
             },
             (err) => {
                 console.log(err);
             }
             );
      },
  }

}
</script>

<style scoped>
#work_data_all{
    width: 100%;
    /* background-image: url('../assets/part_background.jpg');
    background-repeat: repeat;
    background-size: 100%;
    background-attachment: fixed;  */
}
.img1{
    width: 13%;
    position: fixed;
    left: 4%;
    top: 65%;
}
.img2{
    width: 22%;
    position: fixed;
    top: 10%;
    left: -1%;
}
.img3{  
    width: 16%;
    position: fixed;
    right: 3%;
    top: 45%;
}
.small{
    margin-left: 30.4%;
    width: 52%;
    background-color: #ffffff;
}
.input_search{
    position: relative;
    left: 6px;
    top: 17px;
	width: 44.7%;
	height: 34px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #d3d3d3;
}
.small_box{
    position: relative;
    left: 42%;
    top: -15px;
	width: 25px;
	height: 25px;
	background-color: #ffffff;
	/* border: solid 1px #707070; */
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
    top: 4px;
	width: 97%;
	height: 90px;
	background-color: #f2f4f5;
	border: solid 1px #d3d3d3;
}
.time{
    position: relative;
    top: 7px;
    left: 30px;
	font-family: Microsoft YaHei;
	font-size: 12px;
	font-weight: 700;
	color: #333333;
}
.code{
    position: relative;
    top: 7px;
    left: 45px;
	font-family: Microsoft YaHei;
	font-size: 12px;
	color: #333333;
}
#sort_box{
    float: left;
	height: 100%;
	background-color: #ffffff;
	border: solid 1px #d3d3d3;
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
#sort_box button{
    position: relative;
    top: 9px;
	background-color: rgba(208, 46, 46, 0.2);
	border-radius: 4px;
	border: solid 1px #d3d3d3;
}
#name_box{
    float: left; 
    text-align: center;
    font-size: 15px;
    line-height: 35px;
}
.loop{
      width: 34.5%;
  height: 100%;
  margin-left: 65.5%;
}
button{
    cursor: pointer;
}
</style>