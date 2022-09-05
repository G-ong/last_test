<template>
  <div id="work_data_top_all">
      <div class="small">
        <div class="box">
            <div class="box_top">
                <span class="font_title_top">我的订单</span>
            </div>
            <div class="box_middle">
                <div style="height:73px">
                    <div id="all" style="float: right;" :class="{bgc:background_color[0],no_bgc:!background_color[0]}" @click="change(4)">已评分</div>
                    <div id="all" style="float: right;" :class="{bgc:background_color[1],no_bgc:!background_color[1]}" @click="change(3)">待评分</div>
                    <div id="all" style="float: right;" :class="{bgc:background_color[2],no_bgc:!background_color[2]}" @click="change(2)">已接单</div>
                    <div id="all" style="float: right;" :class="{bgc:background_color[3],no_bgc:!background_color[3]}" @click="change(1)">待接单</div>
                    <div id="all" style="float: right;" :class="{bgc:background_color[4],no_bgc:!background_color[4]}" @click="change(0)">待支付</div>
                    <div id="all" style="float: right;" :class="{bgc:background_color[5],no_bgc:!background_color[5]}" @click="change(5)">所有订单</div>
                </div>
                <!-- <div style="height:73px">
                    <div id="all" style="float: right;" :class="{bgc:background_color_1,no_bgc:!background_color_1}" @click="change(4)">已评分</div>
                    <div id="all" style="float: right;" :class="{bgc:background_color_2,no_bgc:!background_color_2}" @click="change(3)">待评分</div>
                    <div id="all" style="float: right;" :class="{bgc:background_color_3,no_bgc:!background_color_3}" @click="change(2)">已接单</div>
                    <div id="all" style="float: right;" :class="{bgc:background_color_4,no_bgc:!background_color_4}" @click="change(1)">待接单</div>
                    <div id="all" style="float: right;" :class="{bgc:background_color_5,no_bgc:!background_color_5}" @click="change(0)">待支付</div>
                    <div id="all" style="float: right;" :class="{bgc:background_color_6,no_bgc:!background_color_6}" @click="change(5)">所有订单</div>
                </div> -->
            </div>
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
    // created是初始化data中的值,最先执行;
    created(){
      this.background_color[localStorage.getItem('num')]=false;
    },
    data(){
        return{
            background_color:[true,true,true,true,true,true]
        }
    },
    methods:{
        change(num){
            if(num==4){
                localStorage.setItem("num",0);
            }
            if(num==3){
                localStorage.setItem("num",1);
            }
            if(num==2){
                localStorage.setItem("num",2);
            }
            if(num==1){
                localStorage.setItem("num",3);
            }
            if(num==0){
                localStorage.setItem("num",4);
            }
            if(num==5){
                localStorage.setItem("num",5);
            }
            this.$router.push({
                path:'/my_order_center',
                query:{
                t:Date.now()
                }
            })
            localStorage.setItem('tradeStatus',num)//4已评分,3待评分,2已接单,1待接单,0待支付,5所有订单
        //    console.log("查询所有本人发布的订单");
        //    this.$http({
        //    method: "post",
        //    url: "/common/findAllOrder",
        //    data: {
        //    },
        //    }).then(
        //    (res) => {
        //        console.log(res);
        //        this.goods=res.data.data;
        //    },
        //    (err) => {
        //        console.log(err);
        //    }
        //    );
        }
    }
}
</script>

<style scoped>
.small{
    float: left;
    width: 100%;
    height: 30%;
}
#work_data_top_all{  
  width: 100%;
}
.box{
    margin-left: 30.4%;
	width: 52%;
    height: 100%;
	background-color: #ffffff;
	border: solid 1px rgba(0, 0, 0, 0.1);
}
.box_top{
    width: 100%;
    height: 60%;
}
.font_title_top{
    display: inline-block;
    margin-left: 6%;
    margin-top: 3%;
    width: 100%;
	font-family: Microsoft YaHei;
	font-size: 18px;
	font-weight: 700;
	color: #333333;
}
#all{
    position: relative;
    top: 38px;
	width: 11.5%;
	height: 35px;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
}
.bgc{
    background-color: #fff;
}
.no_bgc{
	background-color: #f2f4f5;
}
</style>