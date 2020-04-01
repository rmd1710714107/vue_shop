import {Message} from "element-ui"
export function message(type,message,showClose=true){
  Message({
    type: type,
    message: message,
    showClose: showClose
  });
}