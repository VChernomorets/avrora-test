import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/about',
            name: 'About',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ '../views/About')
        },
        {
            path: '/people',
            name: 'PeopleZone',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "peopleZone" */ '../views/PeopleZone')
        },
        {
            path: '/canvas',
            name: 'Canvas',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "canvas" */ '../views/Canvas')
        },
    ],
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})

export default router
