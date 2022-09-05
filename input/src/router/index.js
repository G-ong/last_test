import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Homepage from '../components/Homepage.vue'
import ForgetPassword from '../components/ForgetPassword.vue'
import ErrandInquire from '../components/ErrandInquire.vue'
import MyErrandInquire from '../components/MyErrandInquire.vue'
import ErrandOrder from '../components/ErrandOrder.vue'
import ShareServe from '../components/ShareServe.vue'
import ShareStudy from '../components/ShareStudy.vue'
import WorkData from '../components/WorkData.vue'
import WorkDataDetail from '../components/WorkDataDetail.vue'
import Congratulations from '../components/Congratulations.vue'
import CenterUser from '../components/CenterUser.vue'
import Pay from '../components/Pay.vue'
import MyOrderCenter from '../components/MyOrderCenter.vue'
import MyOrderCenterDetail from '../components/MyOrderCenterDetail.vue'
import PersonalHomepageDynamic from '../components/PersonalHomepageDynamic.vue'
import PersonalHomepageCollect from '../components/PersonalHomepageCollect.vue'
import PersonalHomepageComment from '../components/PersonalHomepageComment.vue'
import RecordServer from '../components/RecordServer.vue'
import NewsNotificationLike from '../components/NewsNotificationLike.vue'
import NewsNotificationComment from '../components/NewsNotificationComment.vue'
import NewsNotificationMessage from '../components/NewsNotificationMessage.vue'
import ManageErrand from '../components/ManageErrand.vue'
import ManageSharePost from '../components/ManageSharePost.vue'
import ManageShareComment from '../components/ManageShareComment.vue'
import ManagePost from '../components/ManagePost.vue'
import PostDetail from '../components/PostDetail.vue'
import FindDiary from '../components/FindDiary.vue'
import MessageDetail from '../components/MessageDetail.vue'
import ceshi from '../components/ceshi.vue'
Vue.use(VueRouter)
export default new VueRouter({
    routes: [{
            path: '/',
            component: Homepage,
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '/center_user',
            component: CenterUser,
        },
        {
            path: '/homepage',
            component: Homepage,
        },
        {
            path: '/forget_password',
            component: ForgetPassword,
        },
        {
            path: '/errand_inquire',
            component: ErrandInquire,
        },
        {
            path: '/errand_order',
            component: ErrandOrder,
        },
        {
            path: '/my_errand_inquire',
            component: MyErrandInquire,
        },
        {
            path: '/share_serve',
            component: ShareServe,
        },
        {
            path: '/share_study',
            component: ShareStudy,
        },
        {
            path: '/work_data',
            component: WorkData,
        },
        {
            path: '/work_data_detail',
            component: WorkDataDetail,
        },
        {
            path: '/congratulations',
            component: Congratulations,
        },
        {
            path: '/my_order_center',
            component: MyOrderCenter,
        },
        {
            path: '/my_order_center_detail',
            component: MyOrderCenterDetail,
        },
        {
            path: '/personal_homepage_dynamic',
            component: PersonalHomepageDynamic,
        },
        {
            path: '/personal_homepage_collect',
            component: PersonalHomepageCollect,
        },
        {
            path: '/personal_homepage_comment',
            component: PersonalHomepageComment,
        },
        {
            path: '/pay',
            component: Pay,
        },
        {
            path: '/record_server',
            component: RecordServer,
        },
        {
            path: '/news_notification_like',
            component: NewsNotificationLike,
        },
        {
            path: '/news_notification_comment',
            component: NewsNotificationComment,
        },
        {
            path: '/news_notification_message',
            component: NewsNotificationMessage,
        },
        {
            path: '/manage_errand',
            component: ManageErrand,
        },
        {
            path: '/manage_share_post',
            component: ManageSharePost,
        },
        {
            path: '/manage_share_comment',
            component: ManageShareComment,
        },
        {
            path: '/manage_post',
            component: ManagePost,
        },
        {
            path: '/post_detail',
            component: PostDetail,
        },
        {
            path: '/find_diary',
            component: FindDiary,
        },
        {
            path: '/message_detail',
            component: MessageDetail,
        },
        {
            path: '/ceshi',
            component: ceshi,
        }
    ]
})