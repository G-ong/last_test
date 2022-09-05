<template>
    <div class="small_navigation_box">
        <div class="triangle"></div>
        <span class="font" @click="report_post">举报</span>
    </div>
</template>

<script>
export default {
    data(){
        return{
            content:''

        }
    },
    methods:{
        report_post(){
            if(confirm("确认举报该贴？")){
            this.content=prompt("请输入举报原因");
            console.log("举报帖子");
                this.$http({
                method: "post",
                url: "/post/reportPost",
                data: {
                    postId:localStorage.getItem("pay_code"),//帖子id
                    content:this.content
                },
                }).then(
                (res) => {
                    console.log("成功",res);
                    alert(res.data.msg)
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
.small_navigation_box{
	width: 48px;
	height: 32px;
	background-color: #ffffff;
	box-shadow: 0px 3px 6px 0px 
		rgba(0, 0, 0, 0.16);
	border: solid 1px rgba(0, 0, 0, 0.1);
    float: left;
    position: absolute;
    left: 91.5%;
    top: 70%;
}
.triangle{
    float: left;
    position: relative;
    top: -20px;
    left: 17px;
    border: 10px solid transparent;
    border-bottom-color: #ffffff;

}
.font{
	font-family: Microsoft YaHei;
	color: #666666;
    font-size: 14px;
    position: relative;
    top: 7px;
    left: -9px;
    cursor: pointer;
}
</style>