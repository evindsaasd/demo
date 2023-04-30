/**
 * 系统管理  店长管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/shop' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>店长管理</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <!-- 搜索筛选 -->
    <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加店长</el-button>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <!-- <el-table-column align="center" type="selection" width="60">
      </el-table-column> -->
      <el-table-column style="text-align:center;" sortable prop="id" label="ID" width="200">
      </el-table-column>
      <el-table-column style="text-align:center;" sortable prop="username" label="名字" width="130">
      </el-table-column>
      <el-table-column style="text-align:center;" sortable prop="phone" label="电话" width="130">
      </el-table-column>
      <el-table-column style="text-align:center;" sortable prop="shopId" label="shopId" width="130">
      </el-table-column>
      <el-table-column style="text-align:center;" sortable prop="isForbidden" label="是否冻结" width="200">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isForbidden"  active-color="#13ce66"  inactive-color="grey"  :active-value=0  :inactive-value=1>
          </el-switch>
          <el-button size="mini" @click="hand(scope.$index, scope.row)">改变状态</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleRevise(scope.$index, scope.row)">详细信息</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 添加界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="120px" :model="addForm" ref="addForm" :rules="rules" enctype="application/json">
        <el-form-item label="店长名称" prop="name">
          <el-input size="small" v-model="addForm.username" auto-complete="off" placeholder="请输入店长名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input size="small" v-model="addForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="shopId" prop="shopId">
          <el-input size="small" v-model="addForm.shopId" placeholder="请输入shopId"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input size="small" v-model="addForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="addFormRevise" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="120px" :model="revForm" ref="revForm" :rules="rules" enctype="application/json">
        <el-form-item label="角色名称" prop="name">
          <el-input size="small" v-model="revForm.username" auto-complete="off" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="userMobile">
          <el-input size="small" v-model="revForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="shopId" prop="shopId">
          <el-input size="small" v-model="revForm.shopId" placeholder="请输入shopId"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" prop="password">
          <el-input size="small" v-model="revForm.password" placeholder="请输入密码"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeRevise()'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="reviseForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getManager,
  rolePut,
  RoleRightSave,
  roleRight,
  saveManager,
  reviseManager,
  reviseManagerState,
  managerDelete
} from '@/api/userMG'
import Pagination from '../components/Pagination'
export default {
  data() {
    return {
      listForm: {},
      testItem: {id:'',
      name: '',
      permissions: {id: '123',name: '23'}},
      flag: [],
      fruitdata: [{ i: "pg" }, { i: "xj" }, { i: "tz" }],
      checkList: [],
      fb:'',
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addFormRevise: false, //控制数据权限显示与隐藏
      title: '添加',
      editForm: {
        roleId: '',
        systemNo: '',
        roleNo: '',
        roleName: '',
        token: localStorage.getItem('logintoken')
      },
      addForm:{
        username:'',
        shopId:'',
        avatar:'lksdjahfaksdhfasodf.jpg',
        phone:'',
        password:''
      },
      revForm:{
        id:'',
        username:'',
        shopId:'',
        phone:'',
        avatar:'lksdjahfaksdhfasodf.jpg',
        password:''
      },
      // rules 表单验证
      rules: {
        systemNo: [
          { required: true, message: '请输入系统编码', trigger: 'blur' }
        ],
        roleNo: [
          { required: true, message: '请输入角色代码', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      formInline: {
        page: 1,
        limit: 10,
        machineNo: '',
        orderNo: '',
        transId: '',
        payType: 0,
        orderStatus: 0,
        token: localStorage.getItem('logintoken')
      },
      // 删除
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 数据权限
      RoleRight: [],
      RoleRightProps: {
        children: 'children',
        label: 'name'
      },
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: '',
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        query:""
      },
      form: []
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  /**
   * 数据发生改变
   */
  watch: {},

  /**
   * 创建完毕
   */

  created() {
    this.getData(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */

  methods: {
    // 获取角色列表
    getData(parameter) {
      /***
       * 调用接口
       */
      getManager(parameter)
        .then(res => {
          this.loading = false
          if (res.code != 200) {
            this.$message({
              type: 'info',
              message: res.msg
            })
          } else {
            this.listData=res.data.data;
            console.log("你猜："+this.listData[1].name);
            // 分页赋值
            this.pageparm.currentPage = this.formInline.page
            this.pageparm.pageSize = this.formInline.limit
            this.pageparm.total = res.count
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('获取角色列表失败，请稍后再试！')
        })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getData(this.formInline)
    },
    // 切换状态
    hand(index,row) {
      if (row.isForbidden === 1) {
        this.fb = 0
      } else if (row.isForbidden === 0) {
        this.fb = 1
      }
      reviseManagerState("?forbidden="+this.fb+"&id="+row.id)
        .then(res => {
          if (res.code === 200) {
            this.fb = ''
            this.getData()
            this.$message({
              type: 'success',
              message: '状态已修改！'
            })
            this.getData(this.formInline)
          }
        })
    },
    // 搜索事件
    search() {
      this.getData(this.formInline)
    },
    //显示添加界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      this.title = '添加'
      this.addForm.username = ''
      this.addForm.phone = ''
      this.addForm.shopId = ''
      this.addForm.password = ''
    },
    // 显示编辑界面
    handleRevise: function(index, row) {
      this.addFormRevise = true
      this.title = '修改'
      this.revForm.id = row.id
      this.revForm.username = row.username
      this.revForm.phone = row.phone
      this.revForm.shopId = row.shopId
      this.revForm.password = row.password
    },
    // 增加页面保存方法
    submitForm(editData) {
      // this.$refs[editData].validate(valid => {
      //   if (valid) {
      saveManager(this.addForm)
        .then(res => {
          this.editFormVisible = false
          this.loading = false
          if (res.code === 200) {
            this.getData(this.formInline)
            this.$message({
              type: 'success',
              message: '角色保存成功！'
            })
          } 
          else {
            this.$message({
              type: 'info',
              message: '角色保存成功！'
            })
          }
        })
      //   } else {
      //     return false
      //   }
      // })
    },
    // 编辑页面保存方法
    reviseForm(editData) {
      // this.$refs[editData].validate(valid => {
      //   if (valid) {
      reviseManager(this.revForm)
        .then(res => {
          this.addFormRevise = false
          this.loading = false
          if (res.code === 200) {
            this.getData(this.formInline)
            this.$message({
              type: 'success',
              message: '角色保存成功！'
            })
          } 
          else {
            this.$message({
              type: 'info',
              message: '角色保存成功！'
            })
          }
        })
      //   } else {
      //     return false
      //   }
      // })
    },
    // 删除角色
    deleteUser(index, row) {
      console.log(row)
      managerDelete(row.id)
        .then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '角色已删除！'
            })
            this.getData(this.formInline)
          } else {
            this.$message({
              type: 'info',
              message: '角色已删除！'
            })
          }
        })
    },
    // 数据权限
    menuAccess: function(index, row) {
      this.menuAccessshow = true
      roleRight(row.id).then(res=>{
        this.checkList=res.data
        console.log("checkList is:");
        console.log(this.checkList);
        // this.checkList=res.data.permissions
        // console.log(this.checkList)
        // console.log("here is permissions name"+this.checkList[0].name)
        // this.testItem.id=res.data.id;
        // this.testItem.name=res.data.name;
        // console.log("the length is:"+this.testItem.length)
        // console.log("res.id is:"+this.testItem.id)
        // console.log("res.name is:"+this.testItem.name)
      })
    },
    // 选中菜单
    changemenu(arr) {
      let change = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          change.push(arr[i].id)
        }
      }
      this.checkmenu = change
    },
    // tree 递归
    changeArr(list) {
      var temptree = [],
        tree = [],
        items = []
      for (var i in list) {
        if (!temptree[list[i].id]) {
          var trow = {
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: []
          }
          temptree[list[i].id] = trow
          items.push(trow)
        }
        if (list[i].uid > 0) {
          temptree[list[i].id]['children'].push({
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: []
          })
        }
      }

      for (var j in items) {
        if (temptree[items[j].pId]) {
          temptree[items[j].pId]['children'].push(temptree[items[j].id])
        } else {
          tree.push(temptree[items[j].id])
        }
      }
      temptree = null
      items = null
      return tree
    },
    // 菜单权限-保存
    menuPermSave() {
      let parm = {
        roleId: this.saveroleId,
        moduleIds: ''
      }
      let node = this.$refs.tree.getCheckedNodes()
      let moduleIds = []
      if (node.length != 0) {
        for (let i = 0; i < node.length; i++) {
          moduleIds.push(node[i].id)
        }
        parm.moduleIds = JSON.stringify(moduleIds)
      }
      RoleRightSave(parm)
      .then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '权限保存成功'
          })
          this.menuAccessshow = false
          this.getData(this.formInline)
        } else {
          this.$message({
            type: 'info',
            message: res.msg
          })
        }
      })
      .catch(err => {
        this.loading = false
        this.$message.error('权限保存失败，请稍后再试！')
      })
    },
    submitUser(){
      // var date = document.getElementsByTagName('input');
      //  //然后我们去得到这个多选框的长度
      //       var thisLength = date.length;
      //       console.log('长度是')
      //       console.log(thisLength);
      //       //使用字符串数组，用于存放选择好了的数据
      //       var str = new Array();
      //       for(var i = 0;i < thisLength;i++) {
      //           if (date[i].checked == true) {
      //               str.push(date[i].value);//这个是获取多选框中的值
      //           }
      //       }
      //       //循环遍历，在控制台输出我们所选择的值
      //       console.log(str);
            
      //       }
      // for(let i=0;i<this.listForm.length;i++){
      //   this.testItem.permissions[i]=this.listForm[i]
      // }
      // console.log("这是Id:"+this.testItem.id)
      // console.log("这是name:"+this.testItem.name)
      // console.log("这是name:"+this.testItem.permissions[0].name)
      console.log("checkList的类型是：");
      console.log(this.checkList)
      
      rolePut(this.checkList).then(res=>{
        if(res.data.code==200){
          console.log('修改成功')
        }
      });
      this.menuAccessshow=false;
    },
   
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.menuAccessshow = false
      }
    },
        // 关闭编辑、增加弹出框
    closeRevise() {
      this.addFormRevise = false
    }
  },
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>