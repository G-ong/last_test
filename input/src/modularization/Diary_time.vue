<template>
<div>
  <!-- <Navigation/> -->
  <div style="width: 230px;margin-left: 16%;height: 75px;position: fixed;top: 129px;">
    <div class="small_box_diary" style="background-color: #e38181;"></div>
    <div class="small_box_diary" style="background-color: #ecabab;"></div>
    <div class="small_box_diary" style="background-color: #f6d5d5;"></div>
    <span class="font_number_diary">—日记—</span>
  </div>
  <div class="con_diary">
    <div class="now-data-myself_diary">
      <div class="now-data-myself-time_diary">{{ date }}</div>
      <div class="now-data-myself-week_diary">{{ week }}</div>
    </div>
    <Calendar
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
      v-on:isToday="clickToday"
    ></Calendar>
  </div>
</div>
</template>
 
<script>
import axios from 'axios'
/* eslint-disable */
import Calendar from 'vue-calendar-component';
// import Navigation from './Navigation.vue';
export default {
  components: {
    Calendar,
    // Navigation
  },
  data() {
    return {
      date: "",
      week: "",
      datee:''
    };
  },
  created() {
    var now = new Date();
    this.date = now.getDate();//得到日期
    var day = now.getDay();//得到周几
    var year = now.getFullYear(); 
    var month = now.getMonth() + 1;
    var day = now.getDate();
    month = (month > 9) ? month : ("0" + month);
    day = (day < 10) ? ("0" + day) : day;
    this.datee = year + "-" + month + "-" + day;//得到日期
    var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    this.week = arr_week[day];
  },
  methods: {
    clickDay(data) {
      console.log(data); //选中某天
      localStorage.setItem("data",data);
      this.$router.push({
        path:'/find_diary',
        query:{
          t:Date.now()
        }
      })
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); // 跳到了本月
    }
  },
};
</script>
 
<style>
.small_box_diary{
  width: 17px;
  height: 17px;
  position: relative;
  top: 10px;
  left: 10px;
  margin-left: 10px;
  float: left;
}
.font_number_diary{
	font-family: Microsoft YaHei;
	font-size: 28px;
  position: relative;
  top: 30px;
  left: -62px;
	color: #707070;
}
.now-data-myself_diary {
  width: 40%;
  position: absolute;
  border-right: 1px solid rgba(227, 227, 227, 0.6);
}
.con_diary {
  position: relative;
  max-width: 230px;
  margin: auto;
  margin-left: 16%;
  height: 100%; 
	border: solid 1px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 204px;
}
.con_diary .wh_content_all {
  background: transparent !important;
}
.wh_top_changge li {
  color: #707070 !important;
  font-size: 15px !important;
}
.wh_content_item, .wh_content_item_tag {
  color: #303133 !important;
  font-size: 13px!important;
}
.wh_content_item .wh_isToday {
  background: #e38181  !important;
  color: #fff  !important;
}
.wh_content_item .wh_chose_day {
  background: #ecabab  !important;
  color: #ffff  !important;
}
.wh_item_date{
  width: 35px!important;
  height: 35px!important;
}
.wh_item_date:hover {
    background: #f6d5d5 !important;
    border-radius: 100px !important;
    color: #ffffff  !important;
}
.wh_jiantou1[data-v-2ebcbc83] {
    border-top: 2px solid #909399;
    border-left: 2px solid #909399;
    width: 7px;
    height: 7px;
}
.wh_jiantou2[data-v-2ebcbc83] {
    border-top: 2px solid #909399;
    border-right: 2px solid #909399;
    width: 7px;
    height: 7px;
}
.wh_top_tag[data-v-2ebcbc83] {
  color: #707070;
  border-top: 1px solid rgba(227, 227, 227, 0.6);
  border-bottom: 1px solid rgba(227, 227, 227, 0.6);
}
.wh_container[data-v-2ebcbc83] {
    max-width: 280px;
}
.wh_top_changge[data-v-2ebcbc83] {
    display: flex;
    width: 50%;
    margin-left: 43%;
}
.now-data-myself-time_diary {
  color: #707070;
  font-size: 27px;
  height: 30px;
  margin-left: 32px;
  font-family: "Helvetica Neue";
}
.now-data-myself-week_diary {
  font-size: 10px;
  color: #909399;
  margin-left: 34px;
  margin-top: 3px;
}
.wh_top_changge .wh_content_li[data-v-2ebcbc83] {
  font-family: Helvetica;
  flex: 5.5;
}
</style>