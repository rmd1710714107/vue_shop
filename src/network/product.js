import axios from "./request.js"
function getCateList(queryInfo) {
  return axios.get("categories",{
    params:queryInfo
  })
}
function addCate(params) {
  return axios.post("/categories",{
    cat_pid:params.cat_pid,
    cat_name:params.cat_name,
    cat_level:params.cat_level
  })
}
function getParentCate(params){
  return axios.get("/categories",{
    params
  })
}
export{
  getCateList,
  addCate,
  getParentCate
}