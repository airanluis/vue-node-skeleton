import Vue from "vue";
import Router from "vue-router";
import HelloWorld from '@/components/HelloWorld.vue'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            name: "main",
            component: HelloWorld
        }
    ]
});

export default router;