<template>
  <div class="manage">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/shop' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>套餐</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <!-- 新增对话框 -->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- 套餐的表单信息 -->
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="套餐编号" prop="number">
          <el-input placeholder="请输入商品编号" v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="套餐名称" prop="name">
          <el-input placeholder="请输入商品名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="套餐分类" prop="classify">
          <el-select v-model="form.classify" placeholder="请选择">
            <el-option label="店长推荐" value="0"></el-option>
            <el-option label="店长不推荐" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="套餐内容" prop="content">
          <el-input placeholder="请输入" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input placeholder="请输入" v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="套餐状态" prop="starte">
          <el-select v-model="form.starte" placeholder="请选择">
            <el-option label="未上架" value="0"></el-option>
            <el-option label="已上架" value="1"></el-option>
            <el-option label="已售空" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售总量" prop="gtotal">
          <el-input placeholder="请输入" v-model="form.gtotal"></el-input>
        </el-form-item>
        <el-form-item label="创造时间" prop="time">
          <div class="block">
            <el-date-picker v-model="form.time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="套餐图片" prop="painting">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog> -->
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑" :visible.sync="disappear" width="30%">
      <!-- 套餐的表单信息 -->
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="套餐编号" prop="number">
          <el-input placeholder="请输入商品编号" v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="套餐名称" prop="name">
          <el-input placeholder="请输入商品名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="套餐分类" prop="classify">
          <el-select v-model="form.classify" placeholder="请选择">
            <el-option label="店长推荐" value="0"></el-option>
            <el-option label="店长不推荐" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="套餐内容" prop="content">
          <el-input placeholder="请输入" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input placeholder="请输入" v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="套餐状态" prop="starte">
          <el-select v-model="form.starte" placeholder="请选择">
            <el-option label="未上架" value="0"></el-option>
            <el-option label="已上架" value="1"></el-option>
            <el-option label="已售空" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售总量" prop="gtotal">
          <el-input placeholder="请输入" v-model="form.gtotal"></el-input>
        </el-form-item>
        <el-form-item label="创造时间" prop="time">
          <div class="block">
            <el-date-picker v-model="form.time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="套餐图片" prop="painting">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog> -->
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="disappear = 'false'">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 页面信息 -->
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary"> +新增 </el-button>
      <!-- 搜索区域 -->
      <el-form :inline="true" :model="goodForm">
        <el-form-item>
          <el-input placeholder="请输入套餐名称" v-model="goodForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <div class="commom-tabel">
      <el-table height="90%" stripe :data="tableData" style="width: 100%">
        <el-table-column prop="number" label="套餐编号"></el-table-column>
        <el-table-column prop="name" label="套餐名称"></el-table-column>
        <el-table-column prop="painting" label="套餐图片">
          <img src="../assets/images/图标.png" alt="" width="40px" height="40px" />
        </el-table-column>
        <el-table-column prop="classify" label="套餐分类"></el-table-column>
        <el-table-column prop="content" label="套餐内容"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="starte" label="套餐状态"></el-table-column>
        <el-table-column prop="gtotal" label="销售总量"></el-table-column>
        <el-table-column prop="time" label="创造时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlepage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getPackageList } from "../api/index";
export default {
  data() {
    return {
      dialogVisible: false,
      disappear: false,
      form: {
        number: "",
        name: "",
        content: "",
        descript: "",
        price: "",
        starte: "",
        gtotal: "",
        time: "",
        dialogImageUrl: "",
      },
      rules: {
        number: [{ required: true, message: "请输入套餐编号" }],
        name: [{ required: true, message: "请输入套餐名称" }],
        classify: [{ required: true, message: "请选择套餐分类" }],
        descript: [{ required: true, message: "请输入套餐内容" }],
        price: [{ required: true, message: "请输入套餐价格" }],
        starte: [{ required: true, message: "请选择套餐状态" }],
        total: [{ required: true, message: "请输入销售总量" }],
        time: [{ required: true, message: "请选择创造时间" }],
      },
      input: "",
      tableData: [
        {
          number: 10045,
          name: "a套餐",
          painting: "",
          classify: "店长推荐",
          content: "可乐+汉堡",
          price: 20,
          starte: "已上架",
          gtotal: 100,
          time: "2020年10月21日",
        },
        {
          number: 10045,
          name: "a套餐",
          painting: "",
          classify: "店长推荐",
          content: "可乐+汉堡",
          price: 20,
          starte: "已上架",
          gtotal: 100,
          time: "2020年10月21日",
        },
        {
          number: 10045,
          name: "a套餐",
          painting: "",
          classify: "店长推荐",
          content: "可乐+汉堡",
          price: 20,
          starte: "已上架",
          gtotal: 100,
          time: "2020年10月21日",
        },
        {
          number: 10045,
          name: "a套餐",
          painting: "",
          classify: "店长不推荐",
          content: "可乐+汉堡",
          price: 20,
          starte: "已上架",
          gtotal: 100,
          time: "2020年10月21日",
        },
        {
          number: 10045,
          name: "a套餐",
          painting: "",
          classify: "店长推荐",
          content: "可乐+汉堡",
          price: 20,
          starte: "已上架",
          gtotal: 100,
          time: "2020年10月21日",
        },
        {
          number: 10045,
          name: "a套餐",
          painting: "",
          classify: "店长推荐",
          content: "可乐+汉堡",
          price: 20,
          starte: "已上架",
          gtotal: 100,
          time: "2020年10月21日",
        },
      ],
      modalType: 0, //0表示新增滴弹窗，1表示编辑弹窗
      total: 20, //请求获取当前总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      goodForm: {
        name: "",
      },
    };
  },
  methods: {
    async getPackageList() {
      await axios.post({ url: "api/combo" });
    },
    //提交商品表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //后续对表处理
          // if (this.modalType === 0) {
          //   addUser(this.form).then(()=>{
          //重新获取列表接口
          //     this.getList()
          //   })
          // } else {
          //   editUser(this.form).then(()=>{
          //重新获取列表接口
          //     this.getList()
          //   })
          // }
          console.log(this.form, "form");

          //清空表单数据
          this.$refs.form.resetFields();
          //关闭弹窗
          this.dialogVisible = false;
          this.disappear = false;
        }
      });
    },
    //弹窗关闭前重置
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      if (this.modalType === 0) {
        this.handleClose();
      } else {
        this.disappear = false;
      }
    },
    //编辑
    handleEdit(index, row) {
      this.modalType = 1;
      this.disappear = true;
      //注意需要对当前数据进行深拷贝
      this.form = JSON.parse(JSON.stringify(row));
    },
    //删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除此套餐, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //新增
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    //图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //选择页码的回调函数
    handlepage(val) {
      console.log(val, "val");
      this.pageData.page = val;
      // this.getList()
    },
    //列表的查询
    onSubmit() {
      this.getList();
    },
    //获取列表数据
    //   getList(){
    //     //合并对象属性{...this.goodForm,...this.pageData}
    //     get({params:{...this.goodForm,...this.pageData}}).then({(data)}=>{
    //     console.log(data)
    //     this.tableData = data.list
    //     this.total=data.count||0
    //     })
    //   }
    // },
  },
  mounted() {
    console.log(getPackageList);
    this.getPackageList();
  },
};
</script>

<style lang="less">
.manage {
  height: 90%;

  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px 0px;
  }

  .common-tabel {
    position: relative;
    height: calc(100%-62px); //动态计算方法

    .page {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>