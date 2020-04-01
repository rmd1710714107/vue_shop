import axios from "./request.js"
function getOrderList(params) {
  return axios.get("orders",{
    params
  })
}
function getLogisticsData() {
  return axios.get("/kuaidi/1106975712662")
}
export{
  getOrderList,
  getLogisticsData
}