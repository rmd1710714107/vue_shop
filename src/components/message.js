import {Message} from "element-ui"
export function message(showClose,type,message){
  Message({
    showClose: showClose,
    type: type,
    message: message
  });
}