import axios from "./request"
function getReportData() {
  return axios.get("reports/type/1")
}
export{getReportData}