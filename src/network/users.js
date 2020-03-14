import axios from "./request.js"
//console.log(request());
function login(username,password){
  return axios.post("/login",{
    username:username,
    password:password
  })
}
function getUsersList(path,params){
  return axios.get(path,{
    params
  })
}

function changeState(path,uid,type){
  return axios.put(`${path}/${uid}/state/${type}`);
}
function addUsers(addForm){
  return axios.post("/users",{
    username:addForm.username,
    password:addForm.password,
    email:addForm.email,
    mobile:addForm.mobile
  })
}
function queryUsers(id){
  return axios.get(`/users/${id}`);
}
function editUsers(id,params){
  return axios.put(`/users/${id}`,params);
}
function deleteUsers(id){
  return axios.delete(`/users/${id}`);
}
function getRightsList(path,type){
  return axios.get(`${path}/${type}`)
}
function getRoles(){
  return axios.get("/roles")
}
function allotRoles(id,rid) {
  return axios.put(`users/${id}/role`,{
    rid:rid
  })
}
export{login,getUsersList,changeState,addUsers,queryUsers,editUsers,deleteUsers,getRightsList,getRoles,allotRoles}