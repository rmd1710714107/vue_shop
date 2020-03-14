import axios from "axios"
axios.defaults.baseURL="http://127.0.0.1:8888/api/private/v1/";
/* 设置请求拦截器，登陆后每次请求都会携带token */
axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.sessionStorage.getItem("token");
  return config;
})
export default axios;
export function getMenuList(){
  return axios.get("/menus")
}