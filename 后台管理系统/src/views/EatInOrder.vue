<template>
  <div class="manage">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/shop' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单</el-breadcrumb-item>
      <el-breadcrumb-item>堂食订单</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <!-- 订单详情 -->
    <el-dialog title="查看" :visible.sync="disappear" width="30%">
      <!-- 商品的表单信息 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="订单编号" prop="num">
          <el-input placeholder="" v-model="form.num"></el-input>
        </el-form-item>
        <el-form-item label="桌号" prop="number">
          <el-input placeholder="" v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="用餐人数" prop="count">
          <el-input placeholder="" v-model="form.count"></el-input>
        </el-form-item>
        <el-form-item label="菜品数量" prop="math">
          <el-input placeholder="" v-model="form.math"></el-input>
        </el-form-item>
        <el-form-item label="支付方式" prop="method">
          <el-input placeholder="" v-model="form.method"></el-input>
        </el-form-item>
        <el-form-item label="支付金额" prop="money">
          <el-input placeholder="" v-model="form.money"></el-input>
        </el-form-item>
        <el-form-item label="订单时间" prop="buyTime">
          <div class="block">
            <el-date-picker v-model="form.buyTime" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="买家" prop="buyName">
          <el-input placeholder="" v-model="form.buyName"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="starte">
          <el-select v-model="form.starte" placeholder="请选择">
            <el-option label="待支付" value="1"></el-option>
            <el-option label="已支付" value="2"></el-option>
            <el-option label="未支付" value="3"></el-option>
            <el-option label="已完成" value="4"></el-option>
            <el-option label="退款中" value="5"></el-option>
            <el-option label="已取消" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="book">
          <el-input placeholder="" v-model="form.book"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 所有订单页面 -->
    <div class="manage-header">
      <!-- 订单状态 -->
      <div>
        订单状态：
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- 订单时间 -->
      <el-form :inline="true" :model="goodForm">
        <div class="block">
          <div class="demonstration">
            订单时间：
            <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="select">
            <el-button type="primary" @click="onSubmit">筛选</el-button>
          </div>
          <div class="select">
            <el-button type="primary" @click="clearSubmit">清除所有筛选条件</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <div class="commom-tabel">
      <el-table height="90%" stripe :data="tableData" style="width: 100%">
        <el-table-column prop="num" label="订单编号"></el-table-column>
        <el-table-column prop="number" label="桌号"></el-table-column>
        <el-table-column prop="count" label="用餐人数"></el-table-column>
        <el-table-column prop="math" label="菜品数量"></el-table-column>
        <el-table-column prop="method" label="支付方式"></el-table-column>
        <el-table-column prop="money" label="支付金额"></el-table-column>
        <el-table-column prop="buyTime" label="订单时间"></el-table-column>
        <el-table-column prop="buyName" label="买家"></el-table-column>
        <el-table-column prop="starte" label="订单状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="book" label="备注"></el-table-column>
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
export default {
  data() {
    return {                         
      disappear: false,
      form: {
        num: "",
        number: "",
        name: "",
        count: "",
        math: "",
        method: "",
        money: "",
        starte: "",
        buyName: "",
        buyTime: "",
        book: "",
      },
      options: [
        {
          value: "选项1",
          label: "待支付",
        },
        {
          value: "选项2",
          label: "已支付",
        },
        {
          value: "选项3",
          label: "未支付",
        },
        {
          value: "选项4",
          label: "已完成",
        },
        {
          value: "选项5",
          label: "退款中",
        },
        {
          value: "选项6",
          label: "已取消",
        },
      ],
      value1: [],
      value: "",
      tableData: [
        {
          num: "127",
          number: "2号桌",
          name: "杨枝甘露",
          count: "4人",
          math: "4*汉堡+4*可乐+2*鸡米花",
          method: "微信支付",
          money: "108",
          buyTime: "2022.10.25 11:25",
          buyName: "圆圆 18520105641",
          starte: "已支付",
          book: "无",
        },
        {
          num: "128",
          number: "1号桌",
          name: "杨枝甘露",
          count: "4人",
          math: "4*汉堡+4*可乐+2*鸡米花",
          method: "微信支付",
          money: "108",
          buyTime: "2022.10.25 11:25",
          buyName: "圆圆 18520105641",
          starte: "已支付",
          book: "无",
        },
        {
          num: "135",
          number: "5号桌",
          name: "杨枝甘露",
          count: "4人",
          math: "4*汉堡+4*可乐+2*鸡米花",
          method: "微信支付",
          money: "108",
          buyTime: "2022.10.25 11:25",
          buyName: "圆圆 18520105641",
          starte: "已支付",
          book: "无",
        },
        {
          num: "137",
          number: "6号桌",
          name: "杨枝甘露",
          count: "4人",
          math: "4*汉堡+4*可乐+2*鸡米花",
          method: "微信支付",
          money: "108",
          buyTime: "2022.10.25 11:25",
          buyName: "圆圆 18520105641",
          starte: "已支付",
          book: "无",
        },
      ],
      numData: [
        {
          name: "1号餐桌",
          state: "用餐",
        },
        {
          name: "2号餐桌",
          state: "用餐",
        },
        {
          name: "3号餐桌",
          state: "空闲",
        },
        {
          name: "4号餐桌",
          state: "空闲",
        },
        {
          name: "5号餐桌",
          state: "用餐",
        },
        {
          name: "6号餐桌",
          state: "用餐",
        },
      ],
      total: 4, //请求获取当前总条数
      pageData: {
        page: 1,
        limit: 8,
      },
      goodForm: {
        name: "",
      },
    };
  },
  methods: {
    handleEdit(index, row) {
      this.disappear = true;
      //注意需要对当前数据进行深拷贝
      this.form = JSON.parse(JSON.stringify(row));
    },
    //选择页码的回调函数
    handlepage(val) {
      console.log(val, "val");
    },
    //列表的查询
    onSubmit() {
      this.getList();
    },
    //清除
    clearSubmit() { },
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

    .block {
      display: flex;

      .select {
        margin-left: 20px;
      }
    }
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