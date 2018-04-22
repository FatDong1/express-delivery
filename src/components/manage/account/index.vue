<template>
  <view-container>
    <view-header-flex>
      <span>账户管理</span>
      <div slot="right" style="display: inline-block">
        <el-button size="small" class="btn-default" icon="el-icon-edit" @click="editInfo">修改信息</el-button>
        <el-button size="small" class="btn-default" icon="el-icon-plus" @click="postMoney">余额充值</el-button>   
      </div>
    </view-header-flex>
    <el-form class="account-form" label-suffix="：" :model="accountForm" label-width="100px" center>
      <el-form-item label="姓名" prop="name">
        <span>{{accountForm.name}}</span>
      </el-form-item>
      <el-form-item label="账户" prop="account">
        <span>{{accountForm.account}}</span>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <span>{{accountForm.sex}}</span>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <span>{{accountForm.email}}</span>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <span>{{accountForm.phone}}</span>
      </el-form-item>
      <el-form-item label="账户余额" prop="money">
        <span>{{accountForm.money}}</span>
      </el-form-item>
      <el-form-item label="个性签名" prop="special">
        <span>{{accountForm.special}}</span>
      </el-form-item>
    </el-form>
    <info-dialog
      :visible="infoVisible"
      :infoData="accountForm"
      @closeInfoDialog="closeInfoDialog"></info-dialog>
    <money-dialog
      :visible="moneyVisible"
      @closeMoneyDialog="closeMoneyDialog"></money-dialog>
  </view-container>
</template>

<script>
import InfoDialog from './info-dialog.vue'
import MoneyDialog from './money-dialog.vue'
export default {
  components: {
    InfoDialog,
    MoneyDialog
  },
  data () {
    return {
      moneyVisible: false,
      infoVisible: false,
      accountForm: {
        name: '小明',
        pass: '',
        sex: '男',
        special: 'special',
        email: '562097257@qq.com',
        phone: 15602231822,
        checkPass: '',
        account: 'xiaoming',
        money: '100元'
      },
    }
  },
  methods: {
    closeMoneyDialog () {
      this.moneyVisible = false
    },
    closeInfoDialog () {
      this.infoVisible = false
    },
    editInfo () {
      this.infoVisible = true
    },
    postMoney () {
      this.moneyVisible = true
    }
  }
}
</script>

<style>
.account-form {
  width: 30%;
  margin: 10px 0;
  padding: 10px;
}
</style>
