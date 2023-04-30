<template>
  <el-form label-width="70px" v-if="isActive" :inline="true" class="login-container" ref="form" :model="form"
    :rules="rules">
    <div class="left-area">
      <img src="./images/小猫.gif" alt="" />
    </div>
    <h1 class="login_title1">Hello!</h1>
    <h3 class="login_title2">欢迎来到后台管理系统</h3>
    <!-- 用户名登录 -->
    <el-form-item label="用户名" prop="username">
      <el-input class="input" v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input class="input" type="password" v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <!-- 登录按钮 -->
    <el-button @click="
  accountLogin();
submit();
    " style="margin-left: 105px; margin-top: 10px" @keyup.enter.native="keyDown(e)" type="primary"
      class="password_login_btn" :class="isActiveIndex === 0 ? 'isActiveTitle' : ''">登录</el-button>
    <!-- 验证码登录按钮 -->
    <el-button @click="smsLogin" style="margin-left: 105px; margin-top: 20px" type="text" class="code_login_btn"
      :class="isActiveIndex === 1 ? 'isActiveTitle' : ''">验证码登录</el-button>
  </el-form>
  <!-- 验证码登录 -->
  <el-form label-width="70px" v-else :inline="true" class="login-container" ref="form2" :model="form2" :rules="rules">
    <div class="left-area">
      <img src="./images/小猫.gif" alt="" />
    </div>
    <h1 class="login_title1">Hello!</h1>
    <h3 class="login_title2">欢迎来到后台管理系统</h3>
    <el-form-item label="手机号" prop="phone">
      <el-input class="input" v-model.number="form2.phone" placeholder="请输入手机号" @input="
        (value) => {
          form2.phone = value.replace(/[^\d]/g, '');
        }
      "></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input class="input2" type="code" v-model="form2.code" placeholder="请输入验证码" auto-complete="off" @input="
        (value) => {
          form2.code = value.replace(/[^\d]/g, '');
        }
      "></el-input>
      <el-button @click="getCaptcha" :disabled="sendCodeOnOff" style="width: 100px; padding-left: 15px">{{
          this.sendCodeBtn
      }}</el-button>
    </el-form-item>
    <!-- 登录按钮 -->
    <el-button @click="
  accountLogin();
submit();
    " style="margin-left: 105px; margin-top: 10px" @keyup.enter.native="keyDown(e)" type="primary"
      class="password_login_btn" :class="isActiveIndex === 0 ? 'isActiveTitle' : ''">登录</el-button>
    <!-- 验证码登录按钮 -->
    <el-button @click="smsLogin" style="margin-left: 105px; margin-top: 20px" type="text" class="code_login_btn"
      :class="isActiveIndex === 1 ? 'isActiveTitle' : ''">验证码登录</el-button>
  </el-form>
  <!-- 忘记密码 -->
  <!-- <el-button @click="lost_key" type="text" class="lost_key_btn"
        >忘记密码</el-button
      > -->
</template>
<script>
import { login, sendCode } from "@/api/login.js";
import Mock from "mockjs";
import Cookie from "js-cookie";
export default {
  name: "Back",
  data() {
    // // 验证手机号是否合法
    // var checkMobile = (rules, value, callback) => {
    //   const regMobile =
    //     /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    //   if (regMobile.test(value) == true) {
    //     return callback();
    //   } else {
    //     callback(new Error("请输入合法的手机号"));
    //   }
    // };
    // // 验证输入的手机号验证码是否和存储的验证码相同
    // var checkPhoneCode = (rules, value, callback) => {
    //   if (value == this.loginForm.contenttext) {
    //     return callback();
    //   } else {
    //     callback(new Error("验证码错误"));
    //   }
    // };
    return {
      isActive: true, // 用于实现切换登录，作为判断
      isActiveIndex: 0,
      form: {
        username: "tangent",
        password: "123456",
      },
      form2: {
        phone: "",
        code: "",
      },
      rules: {
        username: [
          // blur指失去焦点的时候触发  required指定必填
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
          { min: 6, message: "密码长度最少6位", trigger: "blur" },
        ],
        phone: [
          { required: true, trigger: "blur", message: "请输入您的手机号" },
          { min: 11, max: 11, message: "请输入正确手机号", trigger: "blur" },
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }],
      },
      sendCodeOnOff: false,
      sendCodeNum: 60,
      sendCodeBtn: "获取验证码",
      inTime: "",
    };
  },
  // 进入VUE时首先调用的钩子函数
  mounted() {
    document
      .querySelector("body")
      .setAttribute(
        "style",
        "background-image: url(" +
        require("./images/沙漠.jpg") +
        ");background-size: cover;" +
        "background-repeat: no-repeat"
      );
    window.addEventListener("keydown", this.keyDown);
  },
  destroyed() {
    // 销毁事件
    window.removeEventListener("keydown", this.keyDown, false);
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  created() {
    this.refreshCode();
  },
  watch: {
    identifyCode(v) {
      this.isDebugLogin && (this.form2.code = v);
    },
  },
  destroyed() {
    this.inTime && clearInterval(this.inTime);
  },
  methods: {
    // 登录
    submit() {
      // token信息
      // const token = loginreq('POST','/login/password',this.form);
      //console.log(token);
      //   将token信息存入cookie用于不同页面间的通信
      login(this.form).then((res) => {
        // console.log(token);
        console.log(res.headers.authorization);
        Cookie.set("Authorization", res.headers.authorization);
        if (res.data.code === 200) {
          this.$message.success("登录成功");
          this.$router.push("/shop");
        } else {
          this.$message.error("用户名或密码错误");
        }
      });
      //   跳转到首页
      // this.$router.push("/home");
    },
    // 点击回车键登录
    keyDown(e) {
      // 回车则执行登录方法 enter键的ASCII是13
      if (e.keyCode == 13 || e.keyCode == 100) {
        this.submit(); // 定义的登录方法
      }
    },
    // sendCode() {
    //   sendCode({ phone: this.form2.phone }).then((res) => {
    //     this.$message.success("发送成功");
    //   });
    // },
    // 获取验证码
    getCaptcha() {
      this.$refs.form2.validateField(["phone"], (error) => {
        if (!error) {
          // this.captchaNum = 5;
          const form = {
            phoneNumber: this.form2.phone,
            // type: 1,
          };
          sendCode(form).then((res) => {
            if (res && res.code === 200) {
              this.sendCodeOnOff = true;
              const fn = () => {
                this.sendCodeNum--;
                this.sendCodeBtn = this.sendCodeNum + "秒后重试";
                if (this.sendCodeNum === 0) {
                  this.sendCodeOnOff = false;
                  this.sendCodeBtn = "获取验证码";
                  clearInterval(this.inTime);
                  this.sendCodeNum = 60;
                }
              };
              fn();
              this.inTime = setInterval(fn, 1000);
            }
          });
        }
      });
    },
    accountLogin() {
      // 账号登录
      this.isActive = true;
      this.isActiveIndex = 0;
    },
    smsLogin() {
      // 短信登录
      this.isActive = false;
      this.isActiveIndex = 1;
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  width: 400px;
  height: 500px;
  margin: 130px 10px 30px 900px;
  padding: 35px 35px 15px 35px;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;
  background-image: url(./images/沙漠2.JPG);
  background-size: 380%;
  background-repeat: no-repeat;
  background-position: -925px -144px;

  .input {
    width: 240px;
    margin-bottom: -10px;
    // margin-left: 100px;
  }

  .input2 {
    width: 130px;
    margin-bottom: -10px;
    margin-right: 10px;
  }

  .input3 {
    width: 180px;
    margin-bottom: -10px;
    // margin-right: 10px;
    margin-left: 20px;
  }

  // .shapeCode {
  //   width: 50px;
  //   height: 40px;
  // }
  .login_title1 {
    // text-align: center;
    font-size: 40px;
    margin-bottom: 20px;
    margin-top: 5px;
  }

  .login_title2 {
    // text-align: center;
    font-size: 20px;
    margin-bottom: 40px;
  }

  .password_login_btn {
    // 先转换为块元素
    display: block;
    width: 120px;
    background-color: rgb(64, 158, 255);
  }

  .code_login_btn {
    // 先转换为块元素
    display: block;
    width: 120px;
    background-color: rgb(255, 255, 255);
    color: rgb(106, 106, 106);
  }

  .lost_key_btn {
    // display: block;
    margin-left: 250px;
    margin-top: -14px;
    font-size: 20px;
    font-weight: 700;
    margin-left: 250px;
    color: rgb(83, 83, 83);
    background-image: -webkit-linear-gradient(bottom,
        #000000,
        #000000,
        #ffffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .left-area {
    position: absolute;
    float: right;
    // position: absolute;
    left: 75%;
    width: 150px;
    margin-left: 85px;
    margin-top: -106px;
  }
}
</style>