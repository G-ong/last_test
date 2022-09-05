<template>
  <div>
      <Navigation/>
      <Diary_time/>
      <div class="record_server_all">
          <div class="box_top">
              <input type="text" v-model="subject" placeholder="请输入标题" class="input_title">
              <textarea class="input_content" v-model="content" placeholder="请输入内容"></textarea>
              <button :class="{button_publish:mouse_hover,no_button_publish:!mouse_hover}" @mouseenter = "change" @mouseleave="change" id="button_publish" @click="push_diary">
                  <span>发布</span> 
              </button>
          </div>
          <div v-for="(diary,index) in diarys" :key="index">
              <div class="box_diary">
                  <span class="time">{{diary.createTime}}</span>
                  <span class="set" @click="change_1(diary.id,index)">┇</span>
                  <!-- <div :class="{show:diary.report_is_show,no_show:diary.report_is_show}" style="float: left;">
                      <Diary_small_navigation/>
                  </div> -->
                    <div :class="{show:!diary.report_is_show,no_show:diary.report_is_show}">
                      <Diary_small_navigation/>
                    </div>
                  <span class="title">{{diary.subject}}</span>
                  <div class="content">{{diary.content}}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import Diary_time from '../modularization/Diary_time.vue'
import Navigation from '../modularization/Navigation.vue'
import Diary_small_navigation from '../modularization/Diary_small_navigation.vue'
export default {
    inject: ['reload'],
    computed:{
        ...mapState(['report_is_show'])
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
    },
    data(){
        return{
            mouse_hover:true,
            content:'',
            subject:'',
            diarys:[],
            data_show:this.report_is_show,
            subject_change:'',
            content_change:''
        }
    },
    methods:{
        find(){
      console.log("查找本人日记");
      axios.get('https://i5101b0918.oicp.vip/diary/findMyDiary',{
      params:{
              },
      })
      .then((res)=>{
          console.log(res); 
          this.diarys=res.data.data;
          for(let i=0;i<this.diarys.length;i++)
          this.$set(this.diarys[i],'report_is_show',true)
      })
      .catch((error)=>{
          console.log(error)  
      })
        },
        change(){
            this.mouse_hover=!this.mouse_hover
        },
        change_1(id,i){
            console.log(this.diarys[i].report_is_show)
            this.diarys[i].report_is_show=!this.diarys[i].report_is_show;
            console.log(this.diarys[i].report_is_show)
            localStorage.setItem("pay_code",id)
                // this.$router.push({
                //     path:'/record_server',
                //     query:{
                //     t:Date.now()
                //     }
                // })
        },
        push_diary(){
            console.log("添加日记");
                this.$http({
                method: "post",
                url: "/diary/addDiary",
                data: {
                    subject:this.subject,
                    content:this.content
                },
                }).then(
                (res) => {
                    console.log("成功",res);
                    alert(res.data.msg);
                    this.content='';
                    this.subject='';
                    this.find();
                    // this.reload();
                    // this.$router.push({
                    // path:'/record_server',
                    // query:{
                    //     t:Date.now()
                    // }
                    // })
                },
                (err) => {
                    console.log("失败",err);
                }
                );
        },
        change_diary(id){
            console.log("修改日记");
                this.$http({
                method: "post",
                url: "/diary/updateDiary",
                data: {
                    id:id,//日记id
                    subject:this.subject_change,
                    content:this.content_change
                },
                }).then(
                (res) => {
                    console.log(res);
                    alert(res.data.msg)
                    this.find();

                },
                (err) => {
                    console.log(err);
                }
                );
        }
    },
    components: { Diary_time, Navigation, Diary_small_navigation },

}
</script>

<style scoped>
.input_title{
    width: 94%;
    background-color: #ffffff;
    border: solid 1px #d3d3d3;
    resize: none;
    position: relative;
    left: 3%;
    top: 5%;
    outline: none;
	font-size: 13px;
	color: #888888;
}
.input_content{
    width: 94%;
    height: 57%;
    background-color: #ffffff;
    border: solid 1px #d3d3d3;
    resize: none;
    position: relative;
    left: 3%;
    top: 8%;
    outline: none;
	font-size: 13px;
	color: #888888;
}
.box_top{
    width: 48.5%;
    height: 200px;
    background-color: #ffffff;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    border: solid 1px rgba(0, 0, 0, 0.1);
    position: relative;
    left: 34.5%;
    top: 10px;
}
#button_publish{
    width: 68px;
    height: 29px;
    border-radius: 4px;
    position: relative;
    left: 88.1%;
    top: 10%;
    font-weight: 700;
    font-size: 18px;
}
.button_publish{
    background-color: #fff;
	border: solid 1px #333333;
    color: #333333;
}
.no_button_publish{
    background-color: #333333;
	border: solid 1px #333333;
    color: #ffffff;
}
.box_diary{
    width: 48.5%;
    height: 200px;
    background-color: #ffffff;
    border: solid 1px rgba(0, 0, 0, 0.1);
    position: relative;
    left: 34.5%;
    top: 5px;
    margin-top: 10px;
}
.time{
    font-family: Microsoft YaHei;
    font-size: 11px;
    color: #666666;
    position: relative;
    left: 3%;
    top: 5%;
}
.set{  
    font-family: Microsoft YaHei;
    font-size: 16px;
    color: #666666;
    position: relative;
    left: 80%;
    top: 9%;
    cursor: pointer;
}
.title{
    width: 80%;
    height: 20px;
    background-color: #ffffff;
    /* border: solid 1px rgba(0, 0, 0, 0.1); */
    border: none;
    position: relative;
    left: -12%;
    top: 40px;
    font-family: Microsoft YaHei;
    font-size: 12px;
    color: #707070;
    resize: none;
    outline: none;
    display: inline-block;
}
.content{  
    width: 80%;
    height: 100px;
    background-color: #ffffff;
    /* border: solid 1px rgba(0, 0, 0, 0.1); */
    border: none;
    position: relative;
    left: 5%;
    top: 40px;
    font-family: Microsoft YaHei;
    font-size: 12px;
    color: #707070;
    resize: none;
    outline: none;
}
.no_show{
    float: left;
    display: none;
}
.show{
    float: left;
}
</style>