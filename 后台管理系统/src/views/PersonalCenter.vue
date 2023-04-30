<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/shop' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <div class="header">
      <img src="../assets/images/猫猫头像.png" alt="" class="head" />
      <div class="shop-name">{{ name }}</div>
    </div>
    <div style="margin: 20px"></div>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
    >
      <!-- 用户名 -->
      <el-form-item label="用户名" class="input">
        <el-input v-model="formLabelAlign.username" :disabled="true"></el-input>
        <a class="green" href="javascript:;" @click="dialogVisible1 = true" type="text">修改用户名</a>
        <!-- 修改用户名 -->
        <el-dialog title="修改用户名" :visible.sync="dialogVisible1">
          <el-form :model="userForm" :rules="userRules" ref="userForm">
            <el-form-item label="新用户名">
              <el-input v-model="userForm.newUsername"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="userForm.password"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="handleChangeUser">确 定</el-button>
          </div>
        </el-dialog>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password" class="input">
        <el-input v-model="formLabelAlign.psw" type="password" :disabled="true"></el-input>
        <a class="green" href="javascript:;" @click="dialogVisible2 = true">修改密码</a>
      </el-form-item>
      <!-- 修改密码 -->
      <el-dialog title="修改密码" :visible.sync="dialogVisible2">
        <el-form :model="pswForm" :rules="pswRules" ref="pswForm" status-icon class="demo-ruleForm" label-width="100px">
          <el-form-item label="输入旧密码" prop="oldPassword">
            <el-input type="password" autocomplete="off" v-model="pswForm.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认旧密码" prop="oldPassword2">
            <el-input type="password" autocomplete="off" v-model="pswForm.oldPassword2"></el-input>
          </el-form-item>
          <el-form-item label="输入新密码" prop="newPassword">
            <el-input type="password" autocomplete="off" v-model="pswForm.newPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleChangePsw">提交</el-button>
            <!-- <el-button @click="resetForm('pswForm')">重置</el-button> -->
            <el-button @click="dialogVisible2 = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 手机号 -->
      <!-- <el-form-item label="手机号" class="input">
        <el-input v-model="formLabelAlign.phone" :disabled="true"></el-input>
        <a class="green" href="javascript:;" @click="dialogVisible3 = true">修改手机号</a>
      </el-form-item> -->
      <!-- 修改手机号 -->
      <!-- <el-dialog title="修改手机号" :visible.sync="dialogVisible3">
        <el-form :model="phoneForm" :rules="phoneRules" ref="phoneForm">
          <el-form-item label="新手机号">
            <el-input v-model="phoneForm.newPhone"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input type="password" v-model="phoneForm.code"></el-input>
            <div class="el-button1" @click="send">{{ countDown }}</div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="handleChangePhone">确 定</el-button>
        </div>
      </el-dialog> -->
    </el-form>
    <el-button style="margin-left: 80px">退出登录</el-button>
  </div>
</template>

<script>
import { getUser, AlterPsw, AlterName, AlterPhone,alterPassword } from "@/api/userMG";
// import { rsaEncrypt, rsaDecrypt } from "@/utils/encryption/js/rsa";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pswForm.oldPassword2 !== "") {
          this.$refs.pswForm.validateField("oldPassword2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pswForm.oldPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      name: "佳客堡",
      labelPosition: "right",
      countDown: "发送验证码", // 倒计时
      bVerification: false, // 节流
      formLabelAlign: {
        username: "",
        psw: "",
        phone: "",
      },
      userForm: {
        newUsername: "",
        password: "",
      },
      userFormChange: {
        newUsername: "",
        password: "",
      },
      pswForm: {
        oldPassword: "",
        oldPassword2: "",
        newPassword: "",
      },
      phoneForm: {
        newPhone: "",
        code: "",
      },
      userRules: {
        password: [{ required: true, trigger: "blur" }],
      },
      pswRules: {
        oldPassword: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        oldPassword2: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        newPassword: [{ required: true, trigger: "blur" }],
      },
      phoneRules: {
        newPhone: [
          { required: true, trigger: "blur", message: "请输入您的手机号" },
          { min: 11, max: 11, message: "请输入正确手机号", trigger: "blur" },
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }],
      },
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
    };
  },
  mounted() {
    this.getUserMsg()
  },
  methods: {
    // 获取用户信息
    getUserMsg() {
      getUser().then((res) => {
        console.log(res.data);
        if (res.code === 200) {
          this.formLabelAlign.username = res.data.username;
          this.formLabelAlign.psw = res.data.password;
          this.formLabelAlign.phone = res.data.phone;
        }
      });
    },
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then((_) => {
    //       done();
    //     })
    //     .catch((_) => {});
    // },
    //加密函数
    // generateEntype(yvXin) {
    //   let words = yvXin;
    //   let publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCDcwjySP4T61/8neKRDzjXw7qU1Q1Pt7MrOSz5uu1GmIGT0sbxsc1ZY0YX7LBvSlB9EdOjVkVfvgNM/ssmBKQw/cVRhK5YzEdUGQwvvvbYl97diYfTfr52DVoeRdKlodSnuKmSBpO4jOOoEewRqPBly9HUHclmQJo0TUig9DzPbwIDAQAB";
    //   let encrypt = new JSEncrypt();
    //   encrypt.setPublicKey(publicKey);
    //   let encryptPwd = encrypt.encryptLong(words);
    //   console.log(encryptPwd)
    // },
    //修改用户名
    handleChangeUser() {
      this.dialogVisible1 = false;
      let msg = this.userForm;
      console.log(msg)
      // 加密后的密文
      // this.userFormChange.newUsername = Encrypt(msg.newUsername);
      // this.userFormChange.password = Encrypt(msg.password);
      // console.log(this.userFormChange)
      // 解密后的明文
      // let decryptMsg = rsaDecrypt(encryptMsg);
      // console.log(rsaPassWord);
      AlterName("?newUsername="+Encrypt(msg.newUsername)+"&password="+Encrypt(msg.password))
        .then(res =>{
          if(res.data.code === 200){
            console.log('成功')
          }
        })
      console.log(result);
    },
    //修改密码
    handleChangePsw() {
      this.dialogVisible1 = false;
      let msg = this.addForm;
      console.log(msg)
      // 加密后的密文
      // this.userFormChange.newUsername = Encrypt(msg.newUsername);
      // this.userFormChange.password = Encrypt(msg.password);
      // console.log(this.userFormChange)
      // 解密后的明文
      // let decryptMsg = rsaDecrypt(encryptMsg);
      // console.log(rsaPassWord);
      alterPassword("?oldPassword="+Encrypt(msg.oldPassword)+"&newPassword="+Encrypt(msg.newPassword))
        .then(res =>{
          if(res.data.code === 200){
            console.log('成功')
          }
        })
      console.log(result);
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 修改手机号
    async handleChangePhone() {
      this.dialogVisible3 = false;
      let result = await AlterPhone(this.phoneForm);
      console.log(result);
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
