<template>
  <div>
      <Navigation/>
      <My_center_manage/>
      <div style="width: 53%;margin-left: 29.7%;margin-top: -4px;">
          <div style="height: 60px;">
            <div id="button_box" :class="{background_color:show,no_background_color:no_show}" @click="manage_post">管理发帖</div>
            <div id="button_box" :class="{background_color:no_show,no_background_color:show}" @click="manage_comment">管理评论</div>
          </div>
          <div>
              <div class="name_field">
                  <div id="name_box" style="width: 26%;">举报用户</div>
                  <div id="name_box" style="width: 25%;">被举报id</div>
                  <div id="name_box" style="width: 28%;">举报原因</div>
                  <div id="name_box" style="width: 10.5%;">当前状态</div>
                  <div id="name_box" style="width: 10.5%;">操作</div>
              </div>
              <div v-for="comment in comments" :key="comment.commentId">
                <div class="message_field">
                    <div style="height: 100%;">
                        <div id="sort_box" style="width: 26%;">
                            <span>匿</span>
                        </div>
                        <div id="sort_box" style="width: 25%;">
                            <span>{{comment.commentId}}</span>
                        </div>
                        <div id="sort_box" style="width: 28%;">
                            <span>{{comment.content}}</span>
                        </div>
                        <div id="sort_box" style="width: 10%;">
                            <span style="height: 34%;cursor: pointer;">详细信息</span>
                        </div>
                        <div id="sort_box" style="width: 10%;">
                            <button @click="remove_comment(comment.commentId)">删除</button>
                            <span style="cursor: pointer;" @click="pass(comment.commentId)">忽略</span>
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
import My_center_manage from '../modularization/My_center_manage.vue'
import Navigation from '../modularization/Navigation.vue'
export default {
    mounted(){
        this.find();
    },
    data(){
        return{
            show:false,
            no_show:true,
            comments:[]
        }
    },
   components: { Navigation, My_center_manage },
   methods:{
       find(){
       console.log("查看举报评论信息");
       axios.get('https://i5101b0918.oicp.vip/shareAdmin/findCommentReport',{
       params:{
               },
       })
       .then((res)=>{
           console.log("成功",res); 
           this.comments=res.data.data;
       })
       .catch((error)=>{
           console.log(error)  
       })
       },
       manage_post(){
           this.show=true;
           this.no_show=false;
           this.$router.push('manage_share_post')
       },
       manage_comment(){
           this.show=false;
           this.no_show=true;
           this.$router.push('manage_share_comment')
       },
        remove_comment(id){
            console.log(id)
           if(confirm("确认删除该评论？")){
            console.log("删除违规评论");
                this.$http({
                method: "post",
                url: "/shareAdmin/deleteIllegalComment",
                data: {
                    commentId:id//被删除的评论的id
                },
                }).then(
                (res) => {
                    console.log(res);
                    alert("处理成功！");
                    this.find();
                },
                (err) => {
                    console.log(err);
                }
                );
           }
        },
        pass(id){
            if(confirm("确认忽略？")){
            console.log("删除未通过举报");
                this.$http({
                method: "post",
                url: "/shareAdmin/deleteReportInfo",
                data: {
                    id:id,
                    type:"1"
                },
                }).then(
                (res) => {
                    console.log("成功",res);
                    alert(res.data.msg);
                    this.find();
                },
                (err) => {
                    console.log("失败",err);
                }
                );
            }
        }
   }
}
</script>

<style scoped>
#button_box{  
    width: 105px;
    height: 35px;
    line-height: 35px;
    border: solid 1px #d2d4d5;
    float: left;
    text-align: center;
    font-family: Microsoft YaHei;
    font-size: 14px;
    color: #333333;
    position: relative;
    top: 15px;
    left: 24px;
    cursor: pointer;
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
#sort_box span{
    position: relative;
    top: 6px;
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
    top: 4px;
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
.background_color{
  background-color: #d3d3d3;
}
.no_background_color{
  background-color: #ffffff;
}
button{
    cursor: pointer;
}
</style>