import vue from "vue";
import Router from "vue-router"
const Login = () => import("../view/login/login.vue")
const home = () => import("../view/home/home.vue")
const welcome = () => import("../view/home/childComp/welcome.vue")
const users=()=>import("../view/users/users")
const rightsList=()=>import("../view/rights/rightsList/rights")
 const roles=()=>import("../view/rights/roles/roles")
 const categories=()=>import("../view/products/category/category.vue")
vue.use(Router);
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/home",
    component: home,
    redirect:"/welcome",
    children: [
      { path: "/welcome", component: welcome },
      {path:"/users",component:users},
      {path:"/rights",component:rightsList},
      {path:"/roles",component:roles},
      {path:"/categories",component:categories}
    ]
  }
]
const router = new Router({
  routes
});
/* 挂载路由导航守卫，防止有人直接跳转到后台管理页面 */
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个页面跳转而来
  // next 一个函数，表示放行
  if (to.path === "/login") return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) return next("/login"); // token不存在则重定向到登陆页面
  next();// 反之放行
})
export default router;  