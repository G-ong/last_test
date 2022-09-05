<template>
  <div id="work_data_top_all">
      <div class="small">
        <div class="box">
            <div class="box_top">
                <span class="font_title_top">跑腿员工数据</span>
                <span class="font_data">接单数：{{data.receiveCnt}}</span>
                <span class="font_data">弃单数：{{data.abandonCnt}}</span>
                <span class="font_data">平均分数：{{data.score}}</span>
                <div id="line"></div>
            </div>
            <div class="box_middle">
                <div class="font_title_middle">我的接单</div>
                <div style="height:73px">
                    <div id="all" style="float: right;" :class="{bgc_white:background_color[4],bgc_gray:!background_color[4]}" @click="change(2)">已评分</div>
                    <div id="all" style="float: right;" :class="{bgc_white:background_color[3],bgc_gray:!background_color[3]}" @click="change(1)">待评分</div>
                    <div id="all" style="float: right;" :class="{bgc_white:background_color[2],bgc_gray:!background_color[2]}" @click="change(0)">待完成</div>
                    <div id="all" style="float: right;" :class="{bgc_white:background_color[5],bgc_gray:!background_color[5]}" @click="change(3)">所有接单</div>
                </div>
                <!-- <div id="line"></div> -->
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    created(){
      this.background_color[localStorage.getItem('num_1')]=false;
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
      localStorage.setItem('tradeStatus',5)//所有订单
      console.log("查询本人跑腿员工的数据");
         this.$http({
         method: "post",
         url: "/worker/findWorkerMessage",
         data: {
         },
         }).then(
         (res) => {
             console.log("成功",res);
             this.data=res.data.data;
         },
         (err) => {
             console.log("失败",err);
         }
         );
    },
    data(){
        return{
            background_color:[true,true,true,true,true,true],
            data:''
        }
    },
    methods:{
        change(num){
            if(num==0){
                localStorage.setItem("num_1",2);
            }
            if(num==1){
                localStorage.setItem("num_1",3);
            }
            if(num==2){
                localStorage.setItem("num_1",4);
            }
            if(num==3){
                localStorage.setItem("num_1",5);
            }
            //2待完成 3待评分 4已评分
            this.$router.push({
                path:'/work_data',
                query:{
                t:Date.now()
                }
            })
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
.font_data{
    display: inline-block;
    width: 100%;
    margin-left: 6%;
    margin-top: 1.5%;
	font-family: Microsoft YaHei;
	font-size: 13px;
	color: #333333;
}
#line{
    display: inline-block;
    position: relative;
    left: 2%;
    width: 96%;
    border: solid #d3d3d3;
    border-width:0 0 1px 0;
}
.font_title_middle{
    display: inline-block;
    margin-left: 6%;
    position: relative;
    top: 20px;
    width: 100%;
	font-family: Microsoft YaHei;
	font-size: 18px;
	font-weight: 700;
	color: #333333;
}
.line_bottom{
    position: relative;
    /* top: 15%; */
    left: 2%;
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
.bgc_white{
	background-color: #ffffff;
}
.bgc_gray{
	background-color: #f2f4f5;
}
</style>