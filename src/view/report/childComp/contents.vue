<template>
  <div class="contents">
    <main-content :content="content">
      <div id="main" style="width: 600px;height:400px;" slot="middle"></div>
      <div slot="bottom">
        <div class="left">
          <pre>{{options}}</pre>
        </div>
        <div class="right">
          <pre>{{reportData}}</pre>
        </div>
      </div>
      
    </main-content>
  </div>
</template>

<script>
import mainContent from "../../../components/mainContent";
import echarts from "echarts";
import { getReportData } from "../../../network/report";
import { message } from "../../../utils/message";
import _ from "lodash"
export default {
  name: "contents",
  components: {
    mainContent
  },
  data() {
    return {
      content: ["数据统计", "数据报表"],
      options: {//需要合并的数据
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      },
      reportData:{}
    };
  },
  created() {},
  mounted() {
    let myChart = echarts.init(document.getElementById("main"));
    getReportData().then(res => {
      console.log(res);
      if (res.data.meta.status !== 200) {
        message("error", res.data.meta.msg);
      } else {
        this.reportData=res.data.data;
        const result=_.merge(res.data.data,this.options)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(result);
      }
    });
  }
};
</script>
<style scoped>
  .left,.right{float: left;}
</style>