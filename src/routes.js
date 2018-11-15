import bodyEl from './components/body/body.vue'
import addEl from './components/cart/add.vue'
import loginyEl from './components/auth/login.vue'
import reportyEl from './components/reports/report.vue'

export default [
    {
        path: '/',
        component: bodyEl
    },
    {
        path: '/add',
        component: addEl
    },
    {
        path: '/login',
        component: loginyEl
    },
    {
        path: '/report',
        component: reportyEl
    }
]