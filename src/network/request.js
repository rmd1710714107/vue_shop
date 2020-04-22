import axios from "axios"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
axios.defaults.baseURL="http://127.0.0.1:8888/api/private/v1/";
/* 设置请求拦截器，登陆后每次请求都会携带token */
axios.interceptors.request.use(config=>{
  NProgress.start();//请求开始前添加进度条
  config.headers.Authorization=window.sessionStorage.getItem("token");
  return config;
})
axios.interceptors.response.use(config=>{
  NProgress.done();//响应结束前显示进度条
  return config;
})
export default axios;
export function getMenuList(){
  return axios.get("/menus")
}