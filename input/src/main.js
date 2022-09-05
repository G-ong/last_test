import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router';
import VueSocketIO from 'vue-socket.io'

// hack router push callback
// [解决 vue-router跳转相同路径报错 ]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

axios.defaults.baseURL = "https://i5101b0918.oicp.vip";
// axios.defaults.baseURL = "https://8b89-110-87-50-55.jp.ngrok.io";
axios.defaults.withCredentials = true;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios;

Vue.use(
    new VueSocketIO({
        // 生产环境建议关闭，开发环境打开(在控制台看到socket连接和事件监听的信息)
        debug: true,
        connection: 'wss://i5101b0918.oicp.vip/websocket',
        options: {
            // 创建时是否自动连接 我们这里设定为false,在指定页面再开启
            autoConnect: false,
            // 路径(默认值：/socket.io/) 
            path: "/my-app/",
            // 目前有两种传输方式：HTTP long-polling（可简称：polling）、WebSocket
            transports: ['polling'],
            // 附加请求头（在服务器端的 socket.handshake.headers 对象中找到）
            extraHeaders: {},
        },
        // 如果没有使用到 store 可不写
        vuex: {
            store,
            actionPrefix: 'SOCKET_', // vuex action 前缀
            mutationPrefix: 'SOCKET_', // vuex mutation 前缀
        },
    })
)

new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app')