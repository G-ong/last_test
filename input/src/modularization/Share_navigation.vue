<template>
  <div id="all">
    <div class="border">
      <div class="box_summary">
        分享服务
      </div>
      <div :class="{box_like:switch_share_study,no_box_like:!switch_share_study}" id="box" @click="like">
            <img src="../assets/study.png" class="icon" v-show="switch_share_study">
            <img src="../assets/study_click.png" class="icon" v-show="!switch_share_study">
          <span>学习</span>
      </div>
      <div :class="{box_comment:switch_share_live,no_box_comment:!switch_share_live}" id="box" @click="comment">
            <img src="../assets/life.png" class="icon" v-show="switch_share_live">
            <img src="../assets/life_click.png" class="icon" v-show="!switch_share_live">
          <span>生活</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
export default {
  computed:{
    ...mapState(['switch_share_study','switch_share_live'])
  },
methods:{
  ...mapMutations(['share_show','share_not_show','share']),
  like(){
    this.share_not_show();
    this.$router.push('/share_study')
  },
  comment(){
    this.share_show();
    this.$router.push('/share_serve')
  },
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
	border: solid rgba(0, 0, 0, 0.1);
  border-width: 1px 0px 1px 0px;
  text-align: center;
  line-height: 6px;
	font-family: Microsoft YaHei;
	font-size: 14px;
	color: #333333;
}
.box_like{
  position: relative;
  top: 2px;
	background-color: #ffffff;
}
.no_box_like{
  position: relative;
  top: 2px;
  background-color: #f2f4f5!important;
}
.box_comment{
  position: relative;
  top: 4px;
	background-color: #ffffff;
}
.no_box_comment{
  position: relative;
  top: 4px;
  background-color: #f2f4f5!important;
}
.icon{
  position: relative;
  top: 8px;
  left: -7px;
}
span{
  margin-left: -8px;
}
.border{
	width: 175px;
  height: 100%;
	background-color: #ffffff;
	border: solid 1px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
}
</style>