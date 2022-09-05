<template>
  <div>
      <Navigation/>
      <My_center_manage/>
      <div style="width: 53%; margin-left: 29.7%; margin-top: -4px;">
          <div style="width: 100%;height: 48px;">
            <input type="text" placeholder="查询跑腿员工">
            <div class="small_box">
                <img src="../assets/inquiry.png" alt="">
            </div>
          </div>
          <div class="name_field">
              <div id="name_box" style="width: 10%;">头像</div>
              <div id="name_box" style="width: 22.5%;">用户名</div>
              <div id="name_box" style="width: 22.5%;">昵称</div>
              <div id="name_box" style="width: 22%;">联系方式</div>
              <div id="name_box" style="width: 11%;">账号状态</div>
              <div id="name_box" style="width: 12%;">账号操作</div>
          </div>
          <div v-for="(data,index) in datas" :key="index">
            <div class="message_field">
                <div style="height: 100%;">
                    <div id="sort_box" style="width: 10%;">
                      <div class="small_box_photo">
                        <img :src="'https://i5101b0918.oicp.vip'+data.picture">
                      </div>
                    </div>
                    <div id="sort_box" style="width: 22%;">
                        <span>{{data.userEmail}}</span>
                    </div>
                    <div id="sort_box" style="width: 22%;">
                        <span>{{data.nickName}}</span>
                    </div>
                    <div id="sort_box" style="width: 22%;">
                        <span>{{data.phoneNumber}}</span>
                    </div>
                    <div id="sort_box" style="width: 11%;">
                        <span style="height: 34%;cursor: pointer;">详细信息</span>
                    </div>
                    <div id="sort_box" style="width: 11.7%;">
                        <button @click="ban(data.workerId,index)" :class="{no_show:!is_no_show[index]}">解封</button>
                        <button :class="{no_show:is_no_show[index]}" @click="block(data.workerId,index)">封禁</button>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import My_center_manage from '../modularization/My_center_manage.vue'
import Navigation from '../modularization/Navigation.vue'
export default {
    computed:{
    ...mapState(['is_no_show'])
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
  components: { Navigation, My_center_manage },
  data(){
    return{
      datas:[],
    //   is_no_show:[]
    }
  },
  methods:{
      find(){
      console.log("查询所有跑腿员工");
          this.$http({
          method: "post",
          url: "/errandAdmin/findWorker",
          data: {
          },
          }).then(
          (res) => {
              console.log(res);
              this.datas=res.data.data;
            //   console.log(this.datas.length);
          },
          (err) => {
              console.log(err);
          }
          );

      },
    block(id,i){
        if(confirm("确认封禁该员工的账号？")){
        console.log("封禁员工账号",id);
            this.$http({
            method: "post",
            url: "/errandAdmin/ban",
            data: {
                workerId:id,
                status:0
            },
            }).then(
            (res) => {
                console.log(res);
                this.is_no_show[i]=!this.is_no_show[i];
                alert("封禁成功！")
                this.find();
                // alert(i)
                // this.$router.push({
                //     path:'/manage_errand',
                //     query:{
                //     t:Date.now()
                //     }
                // })
            },
            (err) => {
                console.log(err);
            }
            );
        }
             },
    ban(id,i){
        if(confirm("确认解封该员工的账号？")){
        console.log("解封员工账号",id);
            this.$http({
            method: "post",
            url: "/errandAdmin/ban",
            data: {
                workerId:id,
                status:1
            },
            }).then(
            (res) => {
                console.log(res);
                this.is_no_show[i]=!this.is_no_show[i];
                alert("解封成功！")
                this.find();
                // console.log("jiefeng",this.is_no_show[i])
                // this.$router.push({
                //     path:'/manage_errand',
                //     query:{
                //     t:Date.now()
                //     }
                // })
            },
            (err) => {
                console.log(err);
            }
            );
        }
        }
  }
}
</script>

<style scoped>
input{
  position: relative;
  left: 16px;
  top: 9px;
	width: 49%;
	height: 35px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #d3d3d3;
  outline: none;
}
.small_box{
    position: relative;
    left: 47.4%;
    top: -24px;
    width: 27px;
    height: 27px;
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
    width: 97.4%;
    height: 45px;
    margin-top: 10px;
    position: relative;
    top: -6px;
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
.small_box_photo{
	width: 32px;
	height: 32px;
	background-color: #ffffff;
	border: solid 1px #d3d3d3;
    position: relative;
    top: 6px;
    left: 21px;
}
.small_box_photo img{
    width: 100%;
    height: 100%;
}
#sort_box span{
    position: relative;
    top: 12px;
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
    top: 12px;
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
div{
  border-collapse: collapse;
}
.no_show{
    display: none;
}
</style>