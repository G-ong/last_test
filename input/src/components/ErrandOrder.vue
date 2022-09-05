<template>
  <div id="all">
      <Navigation/>
      <div>
           <div id="card_search" :class="{color_card_search:isSearch,color_no_card_search:!isSearch}" @click="search">订单查询</div>
           <div id="card_bill" :class="{color_card_bill:isBill,color_no_card_bill:!isBill}" @click="bill">我要下单</div>
          <div class="big_box_middle">
              <div class="box_left">
                  <div class="box_left_top">
                      <input type="text" class="name" placeholder="订单名称" v-model="subject">
                      <input type="text" class="sum" placeholder="订单总价" v-model="totalAmount">
                  </div>
                  <div class="box_left_bottom">
                      <input type="text" class="remark" placeholder="备注" v-model="remark">
                  </div>
              </div>
              <div class="box_right">
                  <div class="box_right_bottom">
                      <button :class="{btn_inquire:mouse_hover,no_btn_inquire:!mouse_hover}" @mouseenter = "change"  id="btn_inquire" @mouseleave="change" @click="btn_bill">
                          <span class="font">确定下单</span> 
                      </button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navigation from '../modularization/Navigation.vue'
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
  components: { Navigation },
    data(){
        return{
            isSearch:true,
            isBill:true,
            mouse_hover:true,
            subject:'',
            totalAmount:'',
            remark:''
        }

    },
    methods:{
        search(){
            if(this.isSearch==false);
            else{
            this.isSearch=!this.isSearch
            this.isBill=true
            }
            this.$router.push('/errand_inquire')
        },
        bill(){
            if(this.isBill==true);
            else{
            this.isBill=!this.isBill
            this.isSearch=!this.isSearch
            }
            this.$router.push('/errand_order')
        },
        change(){
            this.mouse_hover=!this.mouse_hover
        },
        btn_bill(){
            console.log("添加接单");
                this.$http({
                method: "post",
                url: "/common/addOrder",
                data: {
                    subject:this.subject,
                    totalAmount:this.totalAmount,
                    remark:this.remark
                },
                }).then(
                (res) => {
                    console.log(res);
                    if(res.data.code==401){
                        alert("请登录！")
                        this.$router.push('/login')
                    }
                    else{
                    alert(res.data.msg)
                    this.subject='',
                    this.totalAmount='',
                    this.remark=''
                    // localStorage.setItem('pay_code',res.data.data)
                    // localStorage.setItem("whether_pay","YES");	
                    // let new1=this.$router.resolve({name:'/pay', params: {id: Date.now()}});
                    //     window.open(new1.href,'_blank')
                    }
                },
                (err) => {
                    console.log(err);
                }
                );

        }
    }
}
</script>

<style scoped>
#all{
  height: 55%;
  width: 100%;
  background-image: url('../assets/background.jpg');
  background-attachment:fixed;
}
#card_search{
    position: relative;
    top: 107px;
    width: 11.6%;
    height: 57px;
    margin-left: 18%;
    line-height: 57px;
    text-align: center;
	font-family: Microsoft YaHei;
	font-size: 18px;
	font-weight: normal;
	color: #333333;
}
.color_no_card_search{
	background-color: #ffffff;
	box-shadow: 3px 0px 0px 0px 
		rgba(0, 0, 0, 0.16);
}
.color_card_search{
	background-color: #ffffff;
	opacity: 0.51;
}
#card_bill{
    position: relative;
    top: 50px;
    left: 11.6%;
    width: 11.6%;
    height: 57px;
    margin-left: 18%;
    line-height: 57px;
    text-align: center;
	font-family: Microsoft YaHei;
	font-size: 18px;
	font-weight: normal;
	color: #333333;
}
.color_no_card_bill{
	background-color: #ffffff;
	opacity: 0.51;
}
.color_card_bill{
	background-color: #ffffff;
	box-shadow: 3px 0px 0px 0px 
		rgba(0, 0, 0, 0.16);
}
.big_box_middle{
    position: relative;
    top: 50px;
    margin-left: 18%;
	width: 65%;
	height: 240px;
	background-color: #ffffff;
	box-shadow: 3px 3px 6px 0px 
		rgba(0, 0, 0, 0.16);
}
::-moz-placeholder {
  font-size: 15px;
  color: #d3d3d3;
}
#btn_inquire{
    width: 66%;
    height: 55px;
    position: relative;
    left: 15%;
    top: 117px;
	font-family: Microsoft YaHei;
	font-size: 14px;
}
.btn_inquire{
    border-radius: 4px;
    border-style: none;
    background-color: #ffffff;
    border: solid 1px #333333;
  color: #333333;
}
.no_btn_inquire{
    border-radius: 4px;
    border-style: none;
    background-color: #333333;
    border: solid 1px #333333;
    color: #ffffff;
}
.name{
    position: relative;
    top: 31px;
    left: 73px;
	width: 407px;
	height: 54px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #d3d3d3;
    outline: none;
    color: #888888;
}
.sum{
    position: relative;
    top: 31px;
    left: 89px;
	width: 148px;
	height: 54px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #d3d3d3;
    outline: none;
    color: #888888;
}
.remark{
    position: relative;
    top: 59px;
    left: 73px;
	width: 577px;
	height: 85px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #d3d3d3;
    outline: none;
    color: #888888;
}
.box_right{
    position: relative;
    top: -114px;
    width: 30%;
    float: right;
    height: 75%;
}
.font{
  font-size: 18px;
  font-weight: 700;
  font-family: Microsoft YaHei;
}
</style>