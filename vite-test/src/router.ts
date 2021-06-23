import { createRouter,createWebHistory } from "vue-router";

export default createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",
            redirect:"/a"
        },
        {
            path:"/a",
            component:import("./view/a.vue")
        },
        {
            path:"/b",
            component:import("./view/b.vue")
        },
        {
            path:"/c",
            component:import("./view/c.vue")
        }
    ]
})