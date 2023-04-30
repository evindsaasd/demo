<template>
  <div style="position: relative">
    <div>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/shop' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>店铺信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- <el-divider></el-divider> -->
    <hr />
    <div id="main">
      <div id="left">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item class="form" label="店铺名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item class="form" label="店铺类型" prop="varietyName">
            <el-select v-model="ruleForm.varietyDto.id" placeholder="请选择店铺类别">
              <el-option v-for="Category in Categorys" :label="Category.name" :value="Category.id" :key="Category.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form" label="店铺位置" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item class="form" label="店铺电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item class="form" label="店铺简介" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div id="right">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
        <el-form-item label="店铺logo:" prop="logo">
          <el-upload
            class="avatar-uploader"
            :action="upUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            ref="upload"
          >
          <!-- <span class="teacher_el_upload_btn" @click="submitUpload">上传照片</span> -->
            <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片:" prop="swipers">
          
          <el-upload
            style="padding-left: 50px; width: 500px"
            class="upload-demo"
            :action="upUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="success"
            :limit="3"
            :file-list="ruleForm.swipers"
            list-type="picture"
          >
            <el-button
              style="width: 80px; height: 35px"
              size="small"
              type="primary"
            >点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500KB
            </div>
          </el-upload>
        </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="bottom">
      <el-button style="margin-right: 240px" type="primary" @click="submitForm">修改</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </div>
</template>
<script>
import { GetMsg,GetCategory } from "../api/payMG";
import { reviseStore } from "../api/userMG"
export default {
  data() {
    return {
      ruleForm: {
        id: "",
        name: "",
        description:'',
        address:'',
        varietyDto:{
          id:'',
          name:'你好',
          sort:3
        },
        logo:'',
        phone:"",
        swipers:[
          {
            id: "food.jpeg",
            image: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
          {
            id: "food2.jpeg",
            image: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
        ],
        tags:[
          {
            id:'3',
            name:'你好'
          },
        ]
      },
      shopId:'',
      swi:{
          id:'',
          image:'',
          placeId:''
        },
      // upheaders: {
			// 	Authorization: localStorage.getCookie('AuthorizationToken')
			// },
      upUrl:"https://624w0n2786.yicp.fun/common/upload",
      Categorys: [],
      fileList: [
      ],
      rules: {
        name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          {
            min: 3,
            max: 32,
            message: "长度在 3 到 32 个字符",
            trigger: "blur",
          },
        ],
        region: [
          { required: true, message: "请选择店铺类别", trigger: "change" },
        ],
        location: [
          { required: true, message: "请输入店铺位置", trigger: "blur" },
          { max: 256, message: "店铺地址在256个字符之内", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入店铺电话", trigger: "blur" },
          {
            type: "date",
            min: 11,
            max: 13,
            message: "请输入11位电话号码",
            trigger: "blur",
          },
        ],
        desc: [
          { required: true, message: "请填写店铺简介", trigger: "blur" },
          { max: 256, message: "店铺简介在256个字符之内", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.CreatCategory();
    this.CreatMsg();
  },
  methods: {
    submitUpload() {
			this.$refs.upload.submit()
		},
    success(res, file) {
      console.log(res);
      console.log(file);
      this.swi.image = res.data
      this.swi.id = file.name
      this.swi.placeId = this.shopId
      console.log(this.swi);
      this.fileList.push(this.swi)
      this.ruleForm.swipers = this.fileList
      console.log(this.fileList);
      console.log(this.ruleForm.swipers);
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.logo = res.data
      // this.ruleForm.logo = URL.createObjectURL(file.raw);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    CreatMsg() {
      GetMsg().then((res) => {
        console.log(res.data);
        if (res.code === 200) {
          this.shopId = res.data.id
          this.ruleForm.id = res.data.id
          this.ruleForm.name = res.data.name;
          this.ruleForm.varietyDto.id = res.data.varietyDto.id;
          this.ruleForm.address = res.data.address;
          this.ruleForm.phone = res.data.phone;
          this.ruleForm.description = res.data.description;
          this.ruleForm.logo = res.data.logo;
          this.ruleForm.swipers = res.data.swipers
          this.ruleForm.tags = res.data.tags
        }
      });
    },
    CreatCategory() {
      GetCategory().then((res) => {
        console.log(res.date);
        if (res.code === 200) {
          this.Categorys = res.data;
        }
      })
    },
    submitForm() {
      reviseStore(this.ruleForm).then((res) => {
        console.log(res.data);
        if (res.code === 200) {
          GetMsg()
        }
      });
    }
  },
};
</script>
<style scoped>
.form {
  width: 500px;
  height: 50px;
  padding-left: 50px;
}
.box {
  padding: 10px;
}
#main {
  width: auto;
  height: auto;
  position: relative;
  display: flex;
  padding-top: 30px;
}
#left {
  width: 50%;
  position: relative;
  height: auto;
  padding: 50;
  border: 30px;
  display: inline-block;
  box-sizing: border-box;
}
#right {
  width: 50%;
  position: absolute;
  left: 50%;
  height: auto;
  display: inline-block;
  box-sizing: border-box;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
#bottom {
  width: auto;
  height: 100px;
  padding-top: 100px;
  padding-left: 420px;
}
</style>