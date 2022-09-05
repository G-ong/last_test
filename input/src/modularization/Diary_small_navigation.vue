<template>
  <div>
      <div class="small_navigation_box">
          <div class="triangle"></div>
          <div style="margin-top: 7px;">
              <div class="small_box_one"></div> 
              <span class="font_one" title="点击修改" @click="modification">修改</span> 
          </div>
          <div class="line"></div>
          <div style="margin-top: 10px;">
              <div class="small_box_three"></div>
              <span class="font_three" title="点击删除" @click="delete_diary">删除</span>
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
    methods:{
    //     find(){
    //   console.log("查找本人日记");
    //   axios.get('https://i5101b0918.oicp.vip/diary/findMyDiary',{
    //   params:{
    //           },
    //   })
    //   .then((res)=>{
    //       console.log(res); 
    //       this.diarys=res.data.data;
    //       for(let i=0;i<this.diarys.length;i++)
    //       this.$set(this.diarys[i],'report_is_show',true)
    //   })
    //   .catch((error)=>{
    //       console.log(error)  
    //   })
    //     },
        modification(){
            let title=prompt("请输入要修改的题目");
            let content=prompt("请输入要修改的内容");
            console.log("修改日记");
            this.$http({
            method: "post",
            url: "/diary/updateDiary",
            data: {
                id:localStorage.getItem("pay_code"),//日记id
                subject:title,
                content:content
            },
            }).then(
            (res) => {
                console.log(res);
                alert("修改成功！");
                this.$router.push({
                    path:'/record_server',
                    query:{
                    t:Date.now()
                    }
                })
            },
            (err) => {
                console.log(err);
            }
            );
        },
        delete_diary(){
            if(confirm("确认删除?")){
                console.log("删除日记");
                    this.$http({
                    method: "post",
                    url: "/diary/deleteDiary",
                    data: {
                        id:localStorage.getItem("pay_code"),
                    },
                    }).then(
                    (res) => {
                        console.log(res);
                        alert("删除成功！");
                        this.$router.push({
                          path:'/record_server',
                          query:{
                            t:Date.now()
                          }
                        })
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
.small_navigation_box{
    float: left;
    position: absolute;
    left: 90%;
    top: 57px;
	width: 75px;
	height: 70px;
	background-color: #ffffff;
	box-shadow: 0px 3px 6px 0px 
		rgba(0, 0, 0, 0.16);
	border: solid 1px rgba(0, 0, 0, 0.1);
}
.triangle{
    float: left;
    position: relative;
    top: -20px;
    left: 32px;
    border: 10px solid transparent;
    border-bottom-color: #ffffff;

}
.font_one{
	font-family: Microsoft YaHei;
	color: #666666;
    font-size: 14px;
    position: relative;
    top: 3px;
    left: 2px;
    cursor: pointer;
}
.font_three{
	font-family: Microsoft YaHei;
	color: #666666;
    font-size: 14px;
    position: relative;
    top: 5px;
    left: 23px;
    cursor: pointer;
}
.small_box_one{
    width: 14px;
    height: 14px;
	background-color: #ffffff;
	border: solid 1px #707070;
	opacity: 0.24;
    float: left;
    position: relative;
    top: 4px;
    left: -4px;
}
.small_box_three{
    width: 14px;
    height: 14px;
	background-color: #ffffff;
	border: solid 1px #707070;
	opacity: 0.24;
    float: left;
    position: relative;
    top: 9px;
    left: 16px;
}
.line{
    position: relative;
    top: 8px;
    left: 12px;
	width: 52px;
	border: solid 1px rgba(0, 0, 0, 0.1);
}
</style>