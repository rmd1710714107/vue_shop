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
function getParamsList(id,params){
  return axios.get(`/categories/${id}/attributes`,{
    params
  })
}
function addParams(params){
  return axios.post(`/categories/${params.cateId}/attributes`,{
    attr_name:params.attr_name,
    attr_sel:params.attr_sel,
  })
}
function queryParams(params){
  return axios.get(`categories/${params.cateId}/attributes/${params.attr_id}`,{
    attr_sel:params.attr_sel
  })
}
function editParams(params) {
  console.log(params);
  return axios.put(`categories/${params.cat_id}/attributes/${params.attr_id}`,{
    attr_name:params.attr_name,
    attr_sel:params.attr_sel
  })
}
function deleteParams(params){
  return axios.delete(`categories/${params.cat_id}/attributes/${params.attr_id}`);
}
export{
  getCateList,
  addCate,
  getParentCate,
  getParamsList,
  addParams,
  queryParams,
  editParams,
  deleteParams
}