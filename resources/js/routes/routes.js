const routes = [
  { path: '/', component: require('../components/ExampleComponent.vue').default },
  { path: '/unauthorised', component: require('../pages/401.vue').default },
  { path: '/wallet', component: require('../components/Wallet.vue').default, meta: { requiresAuth: true } },
  { path: '/login', component: require('../components/Login.vue').default, meta: { guest_only: true } },
  { path: '/logout', component: require('../components/Logout.vue').default, meta: { requiresAuth: true } },
  { path: '/profile', component: require('../pages/Profile.vue').default, meta: { requiresAuth: true } },
  { path: '/signup', component: require('../pages/Signup.vue').default, meta: { guest_only: true } },
  { path: '/password/reset', component: require('../pages/PasswordReset.vue').default, meta: { guest_only: true } },
  { path: '/password/reset/:token', component: require('../pages/PasswordChange.vue').default, meta: { guest_only: true } },
  { path: '/admin', component: require('../pages/admin/Index.vue').default, meta: { admin_only: true } },
  { path: '/admin/accounts', component: require('../pages/admin/Accounts.vue').default, meta: { admin_only: true } },
  { path: '/admin/logs', component: require('../pages/admin/Logs.vue').default, meta: { admin_only: true } },
  { path: '/admin/reports', component: require('../pages/admin/Reports.vue').default, meta: { admin_only: true } },
  { path: '/admin/reports/show/:id', component: require('../pages/admin/report/single.vue').default, meta: { admin_only: true } },
  { path: '/transactions/show/:id', component: require('../pages/Transaction.vue').default, meta: { requiresAuth: true } },
  { path: '/admin/transactions', component: require('../pages/admin/Transactions.vue').default, meta: { admin_only: true } }
]

export default routes;
