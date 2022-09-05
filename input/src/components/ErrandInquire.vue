<template>
  <div id="all">
      <Navigation/>
      <div>
           <div id="card_search" :class="{color_card_search:isSearch,color_no_card_search:!isSearch}" @click="search">订单查询</div>
           <div id="card_bill" :class="{color_card_bill:isBill,color_no_card_bill:!isBill}" @click="bill">我要下单</div>
          <div class="big_box_middle">
              <div class="box_left">
                  <input type="text" class="inquire" placeholder="关键词查询可订单" v-model="keyword">
              </div>
              <div class="box_right">
                  <div class="box_right_top">
                      <div id="circle" :class="{circle:show_circle,background_circle:!show_circle}" @click="circle"></div>
                      <span class="content_anonymity">仅显示可接的所有订单</span>
                  </div>
                  <div class="box_right_bottom">
                      <button :class="{btn_inquire:mouse_hover,no_btn_inquire:!mouse_hover}" @mouseenter = "change" @mouseleave="change" id="btn_inquire" @click="btn_inquire">
                          <span class="font">确定查询</span> 
                      </button>
                  </div>
              </div>
          </div>
      </div>
      <!-- 订单 -->
      <div class="bill_bottom">
          <div class="BOX" v-for="good in Goods" :key="good.outTradeNo" v-show="show_circle==false">
              <div class="oval"></div>
              <!-- <div class="box_top"> -->
                  <img :src="'https://i5101b0918.oicp.vip'+good.buyer.picture" class="photo">
                  <span class="name">{{good.buyer.nickName}}</span>
                  <span class="time">{{good.gmtPayment}}</span>
                  <div class="small_box">
                      <img src="../assets/time.png" alt="">
                  </div>
              <!-- </div> -->
              <!-- <div class="box_middle"> -->
                  <span class="content">{{good.subject}}</span>
                  <span class="price">￥{{good.totalAmount}}</span>
                  <span class="remark">备注:{{good.remark}}</span>
              <!-- </div> -->
              <!-- <div class="box_bottom"> -->
                  <span class="bill_number">单号:{{good.outTradeNo}}</span>
                  <button class="chat" @click="message(good.buyer.userEmail)">点我私聊</button>
                  <button class="take_orders" @click="receive(good.outTradeNo)">立即接单</button>
              <!-- </div> -->
          </div>
          <div class="BOX" v-for="bill in bills" :key="bill.outTradeNo" v-show="bill.tradeStatus==1&&show_search==true">
              <div class="oval"></div>
              <!-- <div class="box_top"> -->
                  <img :src="'https://i5101b0918.oicp.vip'+bill.buyer.picture" class="photo">
                  <span class="name">{{bill.buyer.nickName}}</span>
                  <span class="time">{{bill.gmtPayment}}</span>
                  <div class="small_box">
                      <img src="../assets/time.png" alt="">
                  </div>
              <!-- </div> -->
              <!-- <div class="box_middle"> -->
                  <span class="content">{{bill.subject}}</span>
                  <span class="price">￥{{bill.totalAmount}}</span>
                  <span class="remark">备注：{{bill.remark}}</span>
              <!-- </div> -->
              <!-- <div class="box_bottom"> -->
                  <span class="bill_number">{{bill.outTradeNo}}</span>
                  <button class="chat_button" @click="message(bill.buyer.userEmail)">点我私聊</button>
                  <button class="take_orders_button" @click="receive(bill.outTradeNo)">立即接单</button>
              <!-- </div> -->
          </div>
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
    },
  components: { Navigation },
    data(){
        return{
            isSearch:true,
            isBill:true,
            show_circle:true,
            Goods:[],
            bills:[],
            keyword:'',
            mouse_hover:true,
            show_search:true
        }

    },
    methods:{
        search(){
            if(this.isSearch==true);
            else{
            this.isSearch=!this.isSearch
            this.isBill=true
            }
            this.$router.push('/errand_inquire')
        },
        bill(){
            if(this.isBill==false);
            else{
            this.isBill=!this.isBill
            this.isSearch=!this.isSearch
            }
            this.$router.push('/errand_order')
        },
        circle(){
            this.show_circle=!this.show_circle;
            this.show_search=false;
            this.keyword='';
            if(this.show_circle==false){
            console.log("查看所有可接订单");
                this.$http({
                method: "post",
                url: "/worker/findAllUnfinished",
                data: {
                },
                }).then(
                (res) => {
                    console.log(res);
                    this.Goods=res.data.data;
                },
                (err) => {
                    console.log(err);
                }
                );
            }
        },
        change(){
            this.mouse_hover=!this.mouse_hover
        },
        btn_inquire(){
            this.show_circle=true;
            this.show_search=true;
            console.log("根据关键词查询可接的订单");
            axios.get('https://i5101b0918.oicp.vip/worker/findWanted',{
            params:{
                    keyWords:this.keyword
                    },
            })
            .then((res)=>{
                console.log(res); 
                this.bills=res.data.data;
                this.keyword=''
            })
            .catch((error)=>{
                console.log(error)  
            })
        },
        receive(code){
            console.log("接单");
            axios.get('https://i5101b0918.oicp.vip/worker/takeOrder',{
            params:{
                    outTradeNo:code
                    },
            })
            .then((res)=>{
                console.log(res); 
                alert(res.data.msg)
            })
            .catch((error)=>{
                console.log(error)  
            })
        },
        message(name){
          localStorage.setItem("TALK_TO",name);
          localStorage.setItem("PICTURE","no_picture")
          this.$router.push("/message_detail")
        }
    }
}
</script>

<style scoped>
#all{
  height: 55%;
  width: 100%;
  background-image: url('../assets/background.jpg');
  background-attachment:fixed;
}
#card_search{
    position: relative;
    top: 107px;
    width: 11.6%;
    height: 57px;
    margin-left: 18%;
    line-height: 57px;
    text-align: center;
	font-family: Microsoft YaHei;
	font-size: 18px;
	font-weight: normal;
	color: #333333;
}
.color_card_search{
	background-color: #ffffff;
	box-shadow: 3px 0px 0px 0px 
		rgba(0, 0, 0, 0.16);
}
.color_no_card_search{
	background-color: #ffffff;
	opacity: 0.51;
}
#card_bill{
    position: relative;
    top: 50px;
    left: 11.6%;
    width: 11.6%;
    height: 57px;
    margin-left: 18%;
    line-height: 57px;
    text-align: center;
	font-family: Microsoft YaHei;
	font-size: 18px;
	font-weight: normal;
	color: #333333;
}
.color_card_bill{
	background-color: #ffffff;
	opacity: 0.51;
}
.color_no_card_bill{
	background-color: #ffffff;
	box-shadow: 3px 0px 0px 0px 
		rgba(0, 0, 0, 0.16);
}
.big_box_middle{
    position: relative;
    top: 50px;
    margin-left: 18%;
	width: 65%;
	height: 240px;
	background-color: #ffffff;
	box-shadow: 3px 3px 6px 0px 
		rgba(0, 0, 0, 0.16);
}
::-moz-placeholder {
  font-size: 15px;
  color: #d3d3d3;
}
.inquire{
    position: relative;
    top: 70px;
    left: 73px;
	width: 585px;
	height: 54px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #d3d3d3;
    outline: none;
    color: #888888;
}
.box_right{
    position: relative;
    top: -32px;
    width: 30%;
    float: right;
    height: 75%;
}
#circle{
    position: relative;
    left: 23%;
    top: 59px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
}
.circle{
    background-color: #ffffff;
    border: solid 1px #707070;
}
.background_circle{
    background-color: #d3d3d3;
    border: solid 1px #d3d3d3;
}
.content_anonymity{
    position: relative;
    left: 32%;
    top: 39px;
	font-family: Microsoft YaHei;
	font-size: 14px;
	color: #666666;
}
#btn_inquire{
    width: 66%;
    height: 55px;
    position: relative;
    left: 15%;
    top: 78px;
	font-family: Microsoft YaHei;
	font-size: 14px;
}
.btn_inquire{
    border-radius: 4px;
    border-style: none;
    background-color: #ffffff;
    border: solid 1px #333333;
  color: #333333;
}
.no_btn_inquire{
    border-radius: 4px;
    border-style: none;
    background-color: #333333;
    border: solid 1px #333333;
    color: #ffffff;
}
.font{
  font-size: 18px;
  font-weight: 700;
  font-family: Microsoft YaHei;
}
.bill_bottom{
    width: 86%;
    margin-top: 10.3%;
    height: 1000px;
    margin-left: 7%;
}
.BOX{
    float: left;
    width: 24.4%;
    margin-left: 0.5%;
    margin-top: 10px;
    height: 230px;
	background-color: #f2f4f5;
	box-shadow: 0px 3px 6px 0px 
		rgba(0, 0, 0, 0.16);
}
.oval{
    position: relative;
    left: 80%;
    top: -24px;
	width: 40px;
	height: 40px;
	background-color: #8d0000;
	box-shadow: 6px 8px 5px 0px 
		rgba(80, 0, 0, 0.36);
    border-radius: 20px;
}
.photo{
    position: relative;
    top: -32px;
    left: 15px;
	width: 26px;
	height: 26px;
	background-image: linear-gradient(90deg, 
		);
	border: solid 1px #707070;
    border-radius: 13px;
}
.name{
    position: relative;
    top: -52px;
    left: 46px;
	font-family: Microsoft YaHei;
	font-size: 12px;
	font-weight: 700;
	font-stretch: normal;
	color: #649ac1;
    width: 102px;
    height: 17px;
    overflow: hidden; 
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;/*设置方向*/
    -webkit-line-clamp:1;/*设置超过为省略号的行数*/
}
.time{
    position: relative;
    top: -71px;
    left: 158px;
	font-family: Microsoft YaHei;
	font-size: 10px;
	color: #d3d3d3;
}
.small_box{
    position: relative;
    top: -88px;
    left: 90%;
    width: 18px;
    height: 18px;
    /* background-color: #ffffff;
    border: solid 1px #707070; */
}
.content{
    position: relative;
    top: -75px;
    left: 15px;
	font-family: Microsoft YaHei;
	font-size: 18px;
	font-weight: 700;
	color: #333333;
    display:-webkit-box;
    -webkit-box-orient:vertical;/*设置方向*/
    -webkit-line-clamp:1;/*设置超过为省略号的行数*/
    width: 90%;
    overflow: hidden;
}
.price{
    position: relative;
    top: -60px;
    right: 9px;
	font-family: Microsoft YaHei;
	font-size: 32px;
	font-weight: normal;
	color: #649ac1;
    display: inline-block;
    width: 100%;
    text-align: right;
}
.remark{
    position: relative;
    top: -55px;
    left: 16px;
	font-family: Microsoft YaHei;
	font-size: 10px;
	color: #888888;
    display:-webkit-box;
    -webkit-box-orient:vertical;/*设置方向*/
    -webkit-line-clamp:1;/*设置超过为省略号的行数*/
    width: 30%;
    overflow: hidden;
}
/* .box_bottom{
    position: relative;
    height: 55px;
    top: -31px;
} */
.bill_number{
    position: relative;
    /* top: -18px; */
    top: -52px;
    left: 5%;
	font-family: Microsoft YaHei;
	font-size: 10px;
	color: #d3d3d3;
}
.chat{
    position: relative;
    /* top: -20px; */
    top: -17px;
    left: -11%;
	width: 67px;
	height: 30px;
	background-color: #888888;
	border-radius: 4px;
    border-style: none;
    color: #ffffff;
    font-weight: 700;
    font-size: 12px;
    cursor: pointer;
}
.take_orders{
    /* position: relative;
    top: -50px; */
    position: relative;
    top: -17px;
    left: -9%;
	width: 67px;
	height: 30px;
	background-color: #333333;
	border-radius: 4px;
    border-style: none;
    color: #ffffff;
    font-weight: 700;
    font-size: 12px;
    cursor: pointer;
}
.chat_button{
    position: relative;
    top: -17px;
    left: -5%;
	width: 67px;
	height: 30px;
	background-color: #888888;
	border-radius: 4px;
    border-style: none;
    color: #ffffff;
    font-weight: 700;
    font-size: 12px;
    cursor: pointer;
}
.take_orders_button{
    position: relative;
    top: -17px;
    left: -3%;
	width: 67px;
	height: 30px;
	background-color: #333333;
	border-radius: 4px;
    border-style: none;
    color: #ffffff;
    font-weight: 700;
    font-size: 12px;
    cursor: pointer;
}
</style>