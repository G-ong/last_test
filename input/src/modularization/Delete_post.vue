<template>
    <div class="small_navigation_box">
        <div class="triangle"></div>
        <span class="font" @click="delete_post">删除</span>
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
        delete_post(){
            if(confirm("确认删除该贴？")){
            console.log("删帖");
                this.$http({
                method: "post",
                url: "/post/deletePost",
                data: {
                    id:localStorage.getItem("pay_code"),//帖子id
                },
                }).then(
                (res) => {
                    console.log("成功",res);
                    alert("删贴成功！")
                },
                (err) => {
                    console.log("失败",err);
                }
                );
        }}
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
    position: relative;
    left: 90%;
    top: 12px;
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