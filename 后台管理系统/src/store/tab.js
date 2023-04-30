export default {
    state:{
        isCollapse:false  //控制菜单的展开收起
    },
    mutations: {
        //修改菜单展开收起
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}