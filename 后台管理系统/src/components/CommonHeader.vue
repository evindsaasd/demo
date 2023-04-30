<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <span class="text">首页</span>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/images/猫猫头像.png" alt="" class="head" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>更换头像</el-dropdown-item>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
  },
};
</script>
<style lang="less" scoped>
.header-container {
  padding: 20px;
  background-color: #333;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // 首页文字
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content {
    // 头像
    .head {
      height: 48px;
      width: 48px;
      border-radius: 24px;
      margin-right: 12px;
    }
  }
}
</style>