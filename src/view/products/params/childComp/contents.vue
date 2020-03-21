<template>
  <div class="contents">
    <!-- 参数分类表格 -->
    <card>
      <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning"></el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            :options="catList"
            :props="cateProps"
            v-model="selectCatKeys"
            @change="getParams"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="getParams">
        <el-tab-pane v-for="(item,index) in tabPane" :key="index" :label="item.label" :name="item.name">
          <el-button
            type="primary"
            size="mini"
            :disabled="isBtnDisable"
            @click="showAddDia"
          >{{item.btnVal}}</el-button>
          <el-table :data="tableData[item.tableDataIndex]" :empty-text="emptyText" :highlight-current-row="true">
            <el-table-column type="expand">
              <template v-slot="scope">
                <el-tag closable>{{scope.row.attr_vals}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="参数操作">
              <template v-slot="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="queryParams(scope.row.attr_id)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteParams(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </card>
    <add-dia :activeName="activeName" :cateId="cateId" :dialogVisible="addDigVis" @show="showAddDia"></add-dia>
    <edit-dia :dialogVisible="editDigVis" @show="showEditDia" :editForm="editForm" ></edit-dia>
  </div>
</template>

<script>
import card from "../../../../components/card";
import { getCateList, getParamsList, queryParams,deleteParams } from "../../../../network/product";
import { message } from "../../../../components/message";
import addDia from "./addDia"
import editDia from "./editDia"
export default {
  name: "contents",
  components: {
    card,
    addDia,
    editDia
  },
  created() {
    getCateList().then(res => {
      if (res.data.meta.status !== 200) {
        message(true, "error", res.data.meta.msg);
      } else {
        this.catList = res.data.data;
      }
    });
  },
  data() {
    return {
      catList: [],
      emptyText:"请选择商品分类",
      cateProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      selectCatKeys: [],
      activeName: "many", // 被激活的页签的名称
      tableData:{
        manyTable: [], // 动态参数数据
        onlyTable: [], //静态属性数据
      },
      addDigVis: false,
      editDigVis:false,
      tabPane:[
        {label:"动态参数",name:"many",btnVal:"添加参数",tableDataIndex:"manyTable"},
        {label:"动态属性",name:"only",btnVal:"添加属性",tableDataIndex:"onlyTable"}
      ],
      attr_id:0,
      editForm:{}//要传给编辑界面的数据
    };
  },
  computed: {
    isBtnDisable() {
      if (this.selectCatKeys.length !== 3) {
        return true;
      } else {
        return false;
      }
    },
    cateId() {
      // 当前分类的三级id
      if (this.selectCatKeys.length === 3) {
        return this.selectCatKeys[2];
      } else {
        return null;
      }
    }
  },
  methods: {
    getParams() {
      // 证明选中的不是三级分类
      if (this.selectCatKeys.length !== 3) {
        this.selectCatKeys = [];
        return;
      } else {
        /* 根据所选分类的id和当前所处的面板获取对应的参数 */
        getParamsList(this.cateId, { sel: this.activeName }).then(res => {
          console.log(res);
          if (res.data.meta.status !== 200) {
            message(true, "error", res.data.meta.msg);
          } else {
            if(res.data.data.length===0){
              this.emptyText="该分类参数为空";
            }
            if (this.activeName === "many") {
              this.tableData["manyTable"] = res.data.data;
            } else {
              this.tableData["onlyTable"] = res.data.data;
            }
          }
        });
      }
    },
    showAddDia(arg){
      if(arg==="add"){
        this.getParams();//如果接收到的参数是"add"，则说明参数被修改了，需要刷新一下数据
      }
      this.addDigVis=!this.addDigVis;
    },
    showEditDia(arg){
      if(arg==="edit"){
        this.getParams();//如果接收到的参数是"edit"，则说明参数被修改了，需要刷新一下数据
      }
      this.editDigVis=!this.editDigVis;
    },
    queryParams(attr_id){
      queryParams({cateId:this.cateId,attr_id:attr_id,attr_sel:this.activeName}).then(res=>{
        if(res.data.meta.status!==200){
          message(true,"error",res.data.meta.msg);
        }else{
        this.editForm=res.data.data;
        this.showEditDia();
        }
      })
    },
    deleteParams(data) {
      console.log(data);
        this.$confirm('此操作将永久删除该参数', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteParams(data).then(res=>{
            if(res.data.meta.status!==200){
              message(true,"error",res.data.meta.msg)
            }else{
              message(true,"success",res.data.meta.msg)
              this.getParams();
            }
          })
        }).catch(() => {
            message(true,"info","已取消删除")
        });
      }
  }
};
</script>
<style scoped>
.cat_opt {
  margin-top: 0.15rem;
}
</style>