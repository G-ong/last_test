
<!-- css -->
<template>
  <div id="work_data_all">
  <!-- <el-alert
    title="消息提示的文案"
    type="info"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </el-alert> -->
          <img src="../assets/left_top.png" alt="" class="img1">
          <img src="../assets/left_bottom.png" alt="" class="img2">
          <img src="../assets/small_lower_head.png" alt="" class="img3">
      <Navigation/>
      <My_center/>
      <Work_data_top/>
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
                  <div id="name_box" style="width: 11.2%;">下单人</div>
                  <div id="name_box" style="width: 11.2%;">订单状态</div>
                  <div id="name_box" style="width: 11.5%;">订单操作</div>
              </div>
              <div v-for="mybill in mybills" :key="mybill.outTradeNo">
                    <div class="message_field" v-if="mybill.tradeStatus==tradeStatus||(tradeStatus=='5'&&mybill.tradeStatus!='1')">
                        <div style="height: 40%;">
                            <span class="time">2022-08-08</span>
                            <span class="code">订单编号：{{mybill.outTradeNo}}</span>
                        </div>
                        <div style="height: 60%;">
                            <div id="sort_box" style="width: 26%;">
                                <span>{{mybill.subject}}</span>
                            </div>
                            <div id="sort_box" style="width: 11.9%;">
                                <span>￥{{mybill.totalAmount}}</span>
                            </div>
                            <div id="sort_box" style="width: 27.1%;">
                                <span>{{mybill.remark}}</span>
                            </div>
                <!-- 待完成 2-->
                            <div v-if="mybill.tradeStatus=='2'" class="loop">
                                <div id="sort_box" style="width: 33%;">
                                    <span>{{mybill.payee.nickName}}</span>
                                </div>
                                <div id="sort_box" style="width: 31%;">
                                    <span style="height: 34%;">待评分</span>
                                    <span @click="detail_page(mybill.outTradeNo)" style="cursor: pointer;">订单详情</span>
                                </div>
                                <div id="sort_box" style="width: 34%;">
                                    <!-- <button>确认完成</button> -->
                                    <span @click="abandon(mybill.outTradeNo)">放弃订单</span>
                                </div>
                            </div>
                <!-- 待评分 3-->
                            <div v-if="mybill.tradeStatus=='3'" class="loop">
                                <div id="sort_box" style="width: 33%;">
                                    <span>{{mybill.payee.nickName}}</span>
                                </div>
                                <div id="sort_box" style="width: 31%;">
                                    <span style="height: 34%;">待评分</span>
                                    <span @click="detail_page(mybill.outTradeNo)" style="cursor: pointer;">订单详情</span>
                                </div>
                                <div id="sort_box" style="width: 34%;">
                                    <!-- <button>确认完成</button> -->
                                    <!-- <span @click="abandon(mybill.outTradeNo)">放弃订单</span> -->
                                </div>
                            </div>
                <!-- 已评分 4-->
                            <div v-if="mybill.tradeStatus=='4'" class="loop">
                                <div id="sort_box" style="width: 33%;">
                                    <span>{{mybill.payee.nickName}}</span>
                                </div>
                                <div id="sort_box" style="width: 31%;">
                                    <span style="height: 34%;">已评分</span>
                                    <span @click="detail_page(mybill.outTradeNo)" style="cursor: pointer;">订单详情</span>
                                </div>
                                <div id="sort_box" style="width: 34%;">
                                    <!-- <button>确认完成</button>
                                    <span @click="abandon(mybill.outTradeNo)">放弃订单</span> -->
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
import Navigation from '../modularization/Navigation.vue'
import Work_data_top from '../modularization/Work_data_top.vue'
export default {
  components: {
    Navigation,
    Work_data_top,
    My_center
  },
  data(){
      return{
            mybills:[],
            tradeStatus:localStorage.getItem("num_1")
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
         },
         (err) => {
             console.log("失败",err);
         }
         );
  },
  methods:{
      detail_page(code){
          localStorage.setItem("pay_code",code)
          this.$router.push("/work_data_detail")
      },
      abandon(code){
          if(confirm("确认放弃这个订单吗？")){
          console.log("弃单");
          axios.get('https://i5101b0918.oicp.vip/worker/abandonOrder',{
          params:{
                  outTradeNo:code
                  },
          })
          .then((res)=>{
              console.log(res); 
              this.bills=res.data.data;
              alert("已弃单");
              this.$router.push({
                  path:'/work_data',
                  query:{
                  t:Date.now()
                  }
              })
          })
          .catch((error)=>{
              console.log(error)  
          })
          }
      }
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
    cursor: pointer;

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
</style>