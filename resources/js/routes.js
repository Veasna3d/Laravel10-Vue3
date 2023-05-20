import Dashboard from "./components/Dashboard.vue"
import Appointment from "./components/pages/Appointment.vue"
import User from "./components/pages/User.vue"
import Setting from "./components/pages/Setting.vue"
import Profile from "./components/pages/Profile.vue"

export default [
    {
        path: '/admin/dashboard',
        name: 'admin.dashboard',
        component: Dashboard,
    },
    {
        path: '/admin/appointment',
        name: 'admin.appointment',
        component: Appointment,
    },
    {
        path: '/admin/user',
        name: 'admin.user',
        component: User,
    },
    {
        path: '/admin/setting',
        name: 'admin.setting',
        component: Setting,
    },
    {
        path: '/admin/profile',
        name: 'admin.profile',
        component: Profile,
    }
]