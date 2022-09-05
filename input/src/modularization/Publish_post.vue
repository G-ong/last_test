<template>
    <div>
      <span class="font_summary">动态</span>
      <div class="line_top"></div>
      <input type="text" placeholder="请输入标题" class="input_title" v-model="subject">
      <div>
        <textarea class="input_content" placeholder="有什么想和大家分享的？" v-model="content"></textarea>
        <label for="input_photo" style="width: 57px; height: 20px; border: 1px solid rgb(211, 211, 211); position: relative; top: 80px; left: -48%; font-size: 8px; color: rgb(136, 136, 136); line-height: 20px; text-align: center; cursor: pointer;display: inline-block;  ">点击上传图片
        <input id="input_photo" type="file" style="display:none" @change=getFile($event)>
        </label>
        <img src="../assets/input_picture.png" alt="" style="position: absolute;width: 1.5%;top: 40.4%;left: 52%;">
      </div>
      <div class="line_bottom"></div>
      <div>
          <div class="small_box_study" @click="change_study">
              <img src="../assets/study.png" style="margin-left: -1px;margin-top: -1px;" v-show="switch_share_study">
              <img src="../assets/study_click.png" style="margin-left: -1px;margin-top: -1px;" v-show="!switch_share_study">
          </div>
          <div class="small_box_life" @click="change_life">
              <img src="../assets/life.png" style="margin-left: -1px;margin-top: -1px;" v-show="switch_share_life">
              <img src="../assets/life_click.png" style="margin-left: -1px;margin-top: -1px;" v-show="!switch_share_life">
          </div>
          <span class="font_choice">选择分区</span>
          <div :class="{small_circle:is_comment,no_small_circle:!is_comment}" @click="comment_change" id="small_circle"></div>
          <span class="font_ban_commit">禁止评论</span>
          <span class="font_ban_commit_hint">(学习类总是允许)</span>
          <button :class="{button_publish:mouse_hover,no_button_publish:!mouse_hover}" @mouseenter = "change" @mouseleave="change">
              <span class="font_publish" @click="push_post($event)">发布</span> 
          </button>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    inject: ['reload'],
    data(){
        return{
            mouse_hover:true,
            switch_share_study:true,
            switch_share_life:true,
            is_comment:true,
            subject:'',
            content:'',
            type:1,
            allowComment:1,
            is_file:''
        }
    },
    methods:{
        change(){
            this.mouse_hover=!this.mouse_hover
        },
        change_study(){
            this.switch_share_study=!this.switch_share_study;
            if(this.switch_share_study==false)
            {
            this.switch_share_life=true;
            this.type=1;
            }
        },
        change_life(){
            this.switch_share_life=!this.switch_share_life;
            if(this.switch_share_life==false){
            this.switch_share_study=true;
            this.type=0;
            }
        },
        comment_change(){
            this.is_comment=!this.is_comment//值为false时不允许评论
        },  
        getFile(event) { 
            console.log("确认判断有没有加入图片",event)
            this.is_file=event.target.files[0];
            console.log("1",this.is_file)
        },
        push_post(event){
            console.log("发帖",event)
            if(this.is_comment==false&&this.switch_share_life==false)
            this.allowComment=0;//不允许评论
                this.file =this.is_file;
                console.log(this.file);
                if(this.file!=''){
                    let reader=new FileReader();
                    reader.readAsDataURL(this.file); 
                    reader.onload=()=>{
                    console.log(reader);
                    event.preventDefault();
                    let formData = new FormData();
                    formData.append('picture',this.file);
                    formData.append('subject',this.subject);
                    formData.append('content',this.content);
                    formData.append('type',this.type);
                    formData.append('allowComment',this.allowComment);
                    let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                    }
                    axios.post('https://i5101b0918.oicp.vip/post/addPost', formData, config).then(function (response) {
                        console.log(response)
                        alert("发布成功！");
                        // location.reload() 
                        this.reload();
                    })
                }
                }
                else{
                    let formData = new FormData();
                    formData.append('subject',this.subject);
                    formData.append('content',this.content);
                    formData.append('type',this.type);
                    formData.append('allowComment',this.allowComment);
                    let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                    }
                    axios.post('https://i5101b0918.oicp.vip/post/addPost', formData, config).then(function (response) {
                        console.log(response)
                        alert("发布成功！");
                        this.subject='';
                        this.content='';
                        // location.reload() 
                        this.$router.push({
                            path:'/share_serve',
                            query:{
                            t:Date.now()
                            }
                        })
                    })
                }
        }
    }

}
</script>

<style scoped>
.small{
    margin-left: 30.4%;
	width: 52%;
    height: 100%;
	background-color: #ffffff;
	border: solid 1px rgba(0, 0, 0, 0.1);
}
.font_summary{
    position: relative;
    top: 16px;
    margin-left: 7%;
	font-family: Microsoft YaHei;
	font-size: 15px;
	color: #333333;
    font-weight: 700;
}
.line_top{  
    position: relative;
    top: 20px;
    left: 51px;
    width: 90%;
    border: solid 1px #d02e2e;
}
.input_title{
    width: 80%;
    height: 30px;
    background-color: #ffffff;
    border: none;
    position: relative;
    left: 12%;
    top: 43px;
    outline: none;
	font-family: Microsoft YaHei;
	font-size: 13px;
	color: #888888;
}
.input_content{
    width: 80%;
    height: 70px;
    background-color: #ffffff;
    border: solid 1px #d3d3d3;
    resize: none;
    position: relative;
    left: 12%;
    top: 43px;
    outline: none;
	font-size: 13px;
	color: #888888;
}
.small_box_study{
    position: relative;
    left: 13%;
    top: 55px;
	width: 25px;
	height: 25px;
	background-color: #ffffff;
	border: solid 1px #707070;
}
.small_box_life{
    position: relative;
    left: 18%;
    top: 28.5px;
	width: 25px;
	height: 25px;
	background-color: #ffffff;
	border: solid 1px #707070;
}
.font_choice{
    position: relative;
    left: 23%;
    top: 4px;
	font-family: Microsoft YaHei;
	font-size: 12px;
	color: #666666;
}
#small_circle{
    position: relative;
    left: 66%;
    top: -14.5px;
	width: 25px;
	height: 25px;
    border-radius: 15px;
}
.small_circle{
	border: solid 1px #707070;
	background-color: #ffffff;
}
.no_small_circle{
	border: solid 1px #d3d3d3;
	background-color: #d3d3d3;
}
.font_ban_commit{
    position: relative;
    left: 71%;
    top: -47px;
	font-family: Microsoft YaHei;
	font-size: 12px;
	color: #666666;
}
.font_ban_commit_hint{
    position: relative;
    left: 63%;
    top: -25px;
	font-family: Microsoft YaHei;
	font-size: 10px;
	color: #666666;
}
.button_publish{
    position: relative;
    left: 69.2%;
    top: -47px;
	width: 83px;
	height: 35px;
	border-radius: 4px;
    background-color: #fff;
	border: solid 1px #333333;
    color: #333333;
}
.no_button_publish{
    position: relative;
    left: 69.2%;
    top: -47px;
	width: 83px;
	height: 35px;
	border-radius: 4px;
    background-color: #333333;
	border: solid 1px #333333;
    color: #ffffff;
}
.font_publish{
    font-weight: 700;
    font-size: 18px;
}
.line_bottom{  
    position: relative;
    top: 115px;
    left: 51px;
    width: 90%;
    border: solid 1px #d02e2e;
}
</style>
