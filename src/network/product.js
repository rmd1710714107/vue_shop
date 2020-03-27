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
  console.log(`/categories/${id}/attributes`);
  return axios.get(`/categories/${id}/attributes`,{
    params
  })
}
function addParams(params){
  return axios.post(`/categories/${params.cat_id}/attributes`,{
    attr_name:params.attr_name,
    attr_sel:params.attr_sel,
  })
}
function queryParams(params){
  return axios.get(`categories/${params.cat_id}/attributes/${params.attr_id}`,{
    attr_sel:params.attr_sel
  })
}
function editParams(params) {
  return axios.put(`categories/${params.cat_id}/attributes/${params.attr_id}`,{
    attr_name:params.attr_name,
    attr_sel:params.attr_sel
  })
}
function deleteParams(params){
  return axios.delete(`categories/${params.cat_id}/attributes/${params.attr_id}`);
}
function submitParamsTag(params){
  return axios.put(`categories/${params.cat_id}/attributes/${params.attr_id}`,{
    attr_name:params.attr_name,
    attr_sel:params.attr_sel,
    attr_vals:params.attr_vals
  });
}
/* 以下是商品分类相关请求 */
function getGoodsList(params){
  return axios.get("goods",{
    params
  })
}
export{
  getCateList,
  addCate,
  getParentCate,
  getParamsList,
  addParams,
  queryParams,
  editParams,
  deleteParams,
  submitParamsTag,
  getGoodsList
}