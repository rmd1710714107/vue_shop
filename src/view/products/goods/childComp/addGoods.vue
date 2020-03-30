<template>
  <div class="addGoods">
    <main-content :content="content">
      <el-alert title="添加商品信息" type="info" :closable="false" center show-icon slot="top"></el-alert>
      <div slot="middle">
        <el-steps :space="200" :active="active-0" finish-status="success" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="100px"
          label-position="top"
        >
          <el-tabs
            :tab-position="tabPosition"
            v-model="active"
            :before-leave="beforeTabLeave"
            @tab-click="tabClick"
          >
            <el-tab-pane label="基本信息" name="0">
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="addForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input v-model="addForm.goods_price" type="number"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input v-model="addForm.goods_weight" type="number"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input v-model="addForm.goods_number" type="number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <!--  -->
                <el-cascader
                  :options="cateList"
                  :props="cateProps"
                  v-model="addForm.goods_cat"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="1">
              <el-form-item v-for="item in manyTabData" :key="item.addr_id" :label="item.attr_name">
                <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox
                    border
                    v-for="(checkItem,index) in item.attr_vals"
                    :key="index"
                    :label="checkItem"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="2">
              <el-form-item v-for="item in onlyTabData" :key="item.attr_id" :label="item.attr_name">
                <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="3">
              <el-upload
                action="http://127.0.0.1:8888/api/private/v1/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                list-type="picture"
                :headers="headersData"
                :on-success="handleSuccess"
              >
                <!-- on-preview预览图片时执行的函数 -->
                <!--list-type 指定预览组件的呈现方式 -->
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
              <quill-editor
                ref="myQuillEditor"
                v-model="addForm.goods_introduce"
              ></quill-editor>
              <el-button type="primary" @click="addGoods">添加商品</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-form>
        <el-dialog title="图片" :visible.sync="dialogVisible" width="50%">
          <img :src="previewPath" class="previewImg" />
        </el-dialog>
      </div>
    </main-content>
  </div>
</template>

<script>
import mainContent from "../../../../components/mainContent";
import { getCateList, getParamsList,addGoods } from "../../../../network/product";
import { message } from "../../../../components/message";
import _ from "lodash"
export default {
  name: "addGoods",
  components: {
    mainContent
  },
  created() {
    this.getCateList();
  },
  data() {
    return {
      content: ["商品管理", "添加商品"],
      active: "0",
      tabPosition: "left", //控制tab的方向
      addForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce:"",
        attrs:[]
      },
      addFormRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ]
      },
      cateList: [],
      cateProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      manyTabData: [], //商品参数界面的数据
      onlyTabData: [],
      headersData: {
        Authorization: window.sessionStorage.getItem("token")
      },
      dialogVisible: false,
      previewPath: ""
    };
  },
  methods: {
    getCateList() {
      getCateList().then(res => {
        if (res.data.meta.status !== 200) {
          message(true, "error", res.data.meta.msg);
        } else {
          this.cateList = res.data.data;
        }
      });
    },
    handleChange() {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = [];
      }
    },
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === "0" && this.addForm.goods_cat.length !== 3) {
        message(true, "error", "请先选择商品分类");
        return false;
      }
    },
    tabClick() {
      if (this.active === "1") {
        //符合条件则说明访问的是动态参数面板
        getParamsList(this.addForm.goods_cat[2], { sel: "many" }).then(
          res => {
            console.log(res);
            if (res.data.meta.status !== 200) {
              message(true, "error", res.data.meta.msg);
            } else {
              res.data.data.forEach(item => {
                item.attr_vals =
                  item.attr_vals.length === 0 ? [] : item.attr_vals.split(",");
              });
              this.manyTabData = res.data.data;
            }
          }
        );
      } else if (this.active === "2") {
        getParamsList(this.addForm.goods_cat[2], { sel: "only" }).then(
          res => {
            console.log(res);
            if (res.data.meta.status !== 200) {
              message(true, "error", res.data.meta.msg);
            } else {
              // res.data.data.forEach(item => {
              //   item.attr_vals=item.attr_vals.length === 0 ? [] : item.attr_vals.split(",");
              // });
              this.onlyTabData = res.data.data;
              // console.log(this.manyTabData);
            }
          }
        );
      }
    },
    handleSuccess(response) {
      if (response.meta.status !== 200) {
        message("", "error", response.meta.msg);
      } else {
        this.addForm.pics.push(response.data.tmp_path);
        message("", "success", response.meta.msg);
      }
    },
    handlePreview(fileData) {
      this.previewPath = fileData.response.data.url;
      this.dialogVisible = true;
    },
    handleRemove(fileData) {
      const filePath = fileData.response.data.tmp_path;
      const index = this.addForm.pics.findIndex(x => x.pics === filePath);
      this.addForm.pics.splice(index, 1);
    },
    addGoods(){
      this.$refs.addFormRef.validate(valid=>{
        if(!valid){
          message("","error","请填写必要的表单项")
        }else{
         const form=_.cloneDeep(this.addForm);
         form.goods_cat=form.goods_cat.join(",");
         this.manyTabData.forEach(item=>{
           const newInfo={attr_id:item.attr_id,attr_vals:item.attr_vals.join(" ")}
           this.addForm.attrs.push(newInfo);
         })
         this.onlyTabData.forEach(item=>{
           const newInfo={attr_id:item.attr_id,attr_vals:item.attr_vals}
           this.addForm.attrs.push(newInfo);
         })
         form.attrs=this.addForm.attrs;
          addGoods(form).then(res=>{
            if(res.data.meta.status!==201){
              message("","error",res.data.meta.msg)
            }else{
              message("","success",res.data.meta.msg);
              this.$router.push("/goods")
            }
          })
        }

      })
    }
  }
};
</script>
<style scoped>
.el-steps {
  margin: 0.2rem 0;
}
.el-checkbox {
  margin: 0 0.05rem 0 0;
}
.previewImg {
  width: 100%;
  height: 100%;
}
</style>