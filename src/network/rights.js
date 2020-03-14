import axios from "./request.js"
function getRightsList(path,type){
  return axios.get(`${path}/${type}`)
}
function getRolesList(path){
  return axios.get(path);
}
function deleteRight(roleId,rightId){
  console.log(`/roles/${roleId}/rights/${rightId}`);
  //return axios.delete(`/roles/${roleId}/rights/${rightId}`);
  
}
function getAllRights(type){
  return axios.get(`rights/${type}`)
}
function allotRights(roleId,rids){
  return axios.post(`/roles/${roleId}/rights`,{
    rids:rids
  })
}
export {getRightsList,getRolesList,deleteRight,getAllRights,allotRights}