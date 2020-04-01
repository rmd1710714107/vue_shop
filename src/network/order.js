import axios from "./request.js"
function getOrderList(params) {
  return axios.get("orders",{
    params
  })
}
export{
  getOrderList
}