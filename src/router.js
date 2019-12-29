import Vue from 'vue'
import Router from 'vue-router'

const Login = () =>
    import ('@/components/Login')
const Home = () =>
    import ('@/components/Home')
const CreateAccount = () =>
    import ('@/components/CreateAccount')
const ViewAccounts = () =>
    import ('@/components/ViewAccounts')
const EditAccount = () =>
    import ('@/components/EditAccount')
const EditCustomer = () =>
    import ('@/components/editcustomer/EditCustomer')

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            component: Login,
        }, {
            path: '/home',
            component: Home
        },
        {
            path: '/create-account',
            component: CreateAccount
        },
        {
            path: '/view-accounts',
            component: ViewAccounts
        },
        {
            path: '/edit-account',
            component: EditAccount
        },
        {
            path: '/customer/:id',
            component: EditCustomer
        }
    ]
})

router.beforeEach((to, from, next) => {
    // Update Meta Tags
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

    if (nearestWithTitle) document.title = nearestWithTitle.meta.title

    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

    if (!nearestWithMeta) return next()

    nearestWithMeta.meta.metaTags.map(tagDef => {
            const tag = document.createElement('meta')

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key])
            })

            // We use this to track which meta tags we create, so we don't interfere with other ones.
            tag.setAttribute('data-vue-router-controlled', '')

            return tag
        })
        .forEach(tag => document.head.appendChild(tag))

    next()
})

export default router