<template>
  <div id="all">
    <div class="border">
      <div class="box_summary">
        个人中心
      </div>
      <div :class="{background_color:switch_message,no_background_color:!switch_message}" id="box" @click="message">
          <div id="small_box">
          <img src="../assets/no_user_message.png" alt="" style="position: relative;top: -4px;left: -3px;" v-if="switch_message">
          <img src="../assets/user_message.png" alt="" style="position: relative;top: -4px;left: -3px;" v-if="!switch_message">
          </div>
          <span>用户信息</span>
      </div>
      <div :class="{background_color:switch_bill,no_background_color:!switch_bill}" id="box" @click="bill">
          <div id="small_box">
            <img src="../assets/no_my_order.png" alt="" style="position: absolute; left: -1px; top: -1px;width: 109%;" v-if="switch_bill">
            <img src="../assets/my_order.png" alt="" style="position: absolute; left: -1px; top: -1px;width: 109%;" v-if="!switch_bill">
          </div>
          <span>我的订单</span>
      </div>
      <div :class="{background_color:switch_data,no_background_color:!switch_data}" id="box" @click="data">
          <div id="small_box">
            <img src="../assets/no_work_data.png" alt="" style="position: absolute; left: -1px; top: -2px;width: 109%;" v-if="switch_data">
            <img src="../assets/work_data.png" alt="" style="position: absolute; left: -1px; top: -2px;width: 109%;" v-if="!switch_data">
          </div>
          <span>打工数据</span>
      </div>
      <div :class="{background_color:switch_my,no_background_color:!switch_my}" id="box" @click="my">
          <div id="small_box">
            <img src="../assets/no_homepage.png" alt="" style="position: absolute; left: -1px; top: -1px;width: 109%;" v-if="switch_my">
            <img src="../assets/homepage.png" alt="" style="position: absolute; left: -1px; top: -1px;width: 109%;" v-if="!switch_my">
          </div>
          <span>个人主页</span>
      </div>
      <div :class="{background_color:switch_record,no_background_color:!switch_record}" id="box" @click="record">
          <div id="small_box">
            <img src="../assets/no_record_serve.png" alt="" style="position: absolute; left: -1px; top: -1px;width: 109%;" v-if="switch_record">
            <img src="../assets/record_serve.png" alt="" style="position: absolute; left: -1px; top: -1px;width: 109%;" v-if="!switch_record">
          </div>
          <span>记录服务</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data(){
  return{
    switch_message:true,
    switch_bill:true,
    switch_data:true,
    switch_my:true,
    switch_record:true
  }
},
methods:{
  message(){
    this.switch_message=!this.switch_message,
    this.switch_bill=true,
    this.switch_data=true,
    this.switch_my=true,
    this.switch_record=true,
    this.$router.push('/center_user')
  },
  bill(){
    this.switch_bill=!this.switch_bill,
    this.switch_message=true,
    this.switch_data=true,
    this.switch_my=true,
    this.switch_record=true,
    this.$router.push('/my_order_center')
  },
  data(){
    this.switch_data=!this.switch_data,
    this.switch_message=true,
    this.switch_bill=true
    this.switch_my=true,
    this.switch_record=true
    this.$router.push('/work_data')
  },
  my(){
    this.switch_my=!this.switch_my,
    this.switch_message=true,
    this.switch_bill=true
    this.switch_data=true,
    this.switch_record=true
    this.$router.push('/personal_homepage_dynamic')
  },
  record(){
    this.switch_record=!this.switch_record,
    this.switch_message=true,
    this.switch_bill=true
    this.switch_data=true,
    this.switch_my=true
    this.$router.push('/record_server')
  }
}
}
</script>

<style scoped>
#all{
  height: 85%; 
  width: 175px;
  position: fixed;
  top: 15.8%;
  left: 17.9%;
}
.border{
  width: 175px;
  height: 100%;
  background-color: #ffffff;
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
}
.box_summary{
	width: 175px;
	height: 40px;
	border: solid rgba(0, 0, 0, 0.1);
  border-width: 0px 0px 1px 0px ;
  text-align: center;
  line-height: 40px;
	font-family: Microsoft YaHei;
	font-size: 18px;
	color: #333333;
}
#box{
	width: 175px;
	height: 50px;
    margin-top: 2px;
	border: solid rgba(0, 0, 0, 0.1);
    border-width: 1px 0px 1px 0px;
    text-align: center;
    line-height: 6px;
	font-family: Microsoft YaHei;
	font-size: 14px;
	color: #333333;
}
.background_color{
	background-color: #ffffff;
}
.no_background_color{
  background-color: #f2f4f5!important;
}
#small_box{
  position: relative;
  top: 15px;
  left: 27%;
	width: 20px;
	height: 20px;
	/* background-color: #ffffff; */
	/* border: solid 1px #707070; */
}
span{
  margin-left: 25px;
}
</style>