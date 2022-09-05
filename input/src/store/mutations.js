export default {
    not_show(state) {
        state.switch_comment = false;
    },
    show(state) {
        state.switch_comment = true;
    },
    // 分享服务导航栏切换
    share_not_show(state) {
        state.switch_share_study = false;
        state.switch_share_live = true;
    },
    share_show(state) {
        state.switch_share_study = true;
        state.switch_share_live = false;
    },

    SAVEUSER(state, val) {
        state.user = val;
    },
    SAVESSE(state, val) {
        state.sse = val;
    },
    ADDUNREADMSGCOUNT(state) {
        state.unReadMsgCount++;
    },
    SAVESSEMESSAGE(state, val) {
        state.sseMessage = val;
    }
};