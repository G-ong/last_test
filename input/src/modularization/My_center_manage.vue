<template>
  <div id="all">
    <div class="border">
      <div class="box_summary">
        个人中心
      </div>
      <div :class="{background_color:switch_message,no_background_color:!switch_message}" id="box" @click="message">
          <div id="small_box"></div>
          <span>分享管理</span>
      </div>
      <div :class="{background_color:switch_bill,no_background_color:!switch_bill}" id="box" @click="bill">
          <div id="small_box"></div>
          <span>跑腿管理</span>
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
  }
},
methods:{
  message(){
    this.switch_message=!this.switch_message,
    this.switch_bill=true,
    this.$router.push('/manage_share_post')
  },
  bill(){
    this.switch_bill=!this.switch_bill,
    this.switch_message=true,
    this.$router.push('/manage_errand')
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
	background-color: #ffffff;
	border: solid 1px #707070;
}
span{
  margin-left: 25px;
}
</style>