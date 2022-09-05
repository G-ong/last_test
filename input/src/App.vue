<template>
  <div id="app">
    <!-- <Navigation/> -->
    <!-- <router-view name="left"></router-view>
    <router-view name="top"></router-view> -->
    <router-view :key="$route.path+$route.query.t" v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
// import Navigation from './modularization/Navigation.vue'

export default {
  created(){
    //1、全局监听，页面刷新的时候将store里state的值存到sessionStorage中，然后从sessionStorage中获取，
    //再赋值给store。然后再把session里面存的删除即可，相当于中间件的作用。
    //在页面加载时读取sessionStorage里的状态信息
    //vuex 单向数据流，推荐的commit 改变state数据
    if (sessionStorage.getItem("store")) {
        this.$store.replaceState(
            Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store")))
        );
        sessionStorage.removeItem("store")
    }
 
    //2、在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  name: 'App',
  // components: {
  //   Navigation
  // },
  // created(){
  //   Navigation    
  // }
  data() {
    return {
      isRouterAlive: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
}
</script>

<style scoped>
html, body{ margin:0; height:100vh; }
#app{
  height: 100vh;
  width: 100%;
  /* overflow: hidden; */
}
</style>
