<template>
  <view-container>
    <view-header-flex>
      <span>账户管理</span>
      <div slot="right" style="display: inline-block">
        <el-button size="small" class="btn-default" icon="el-icon-plus" @click="postConfirmMoney">缴纳保证金</el-button>
        <el-button size="small" class="btn-default" icon="el-icon-edit" @click="editInfo">修改信息</el-button>
        <el-button size="small" class="btn-default" icon="el-icon-edit" @click="changePass">修改密码</el-button>
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
        <span>{{accountForm.sex === 1 ? '男' : '女'}}</span>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <span>{{accountForm.email}}</span>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <span>{{accountForm.phone}}</span>
      </el-form-item>
      <el-form-item label="接单次数" prop="order_times">
        <span>{{accountForm.order_times + '次'}}</span>
      </el-form-item>
      <el-form-item label="成单次数" prop="finish_times">
        <span>{{accountForm.finish_times + '次'}}</span>
      </el-form-item>
      <el-form-item label="账户余额" prop="money">
        <span>{{accountForm.money + '元'}}</span>
      </el-form-item>
      <el-form-item label="个性签名" prop="special">
        <span>{{accountForm.introduce}}</span>
      </el-form-item>
    </el-form>
    <el-dialog title="修改密码" :visible.sync="dialogPassVisible">
      <el-form 
        :model="passForm" 
        ref="passFormDom"
        label-width="80px"
        :rules="rule" 
        status-icon>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="passForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="passForm.checkPass"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPassVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePass">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog 
      title="缴纳保证金" 
      :visible.sync="confirmVisible">
      <el-form 
        v-model="moneyForm" 
        label-width="100px"
        label-suffix="：">
        <el-form-item label="充值金额">
          <el-select v-model="moneyForm.money" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提示">
          <span>缴纳200元保证金可以升级为接单用户</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmVisible = false">取 消</el-button>
        <el-button type="primary" @click="upgradeUser">确 定</el-button>
      </div>
    </el-dialog>
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
import { mapState } from 'vuex'
import InfoDialog from './info-dialog.vue'
import MoneyDialog from './money-dialog.vue'
export default {
  components: {
    InfoDialog,
    MoneyDialog
  },
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passForm.checkPass !== '') {
          this.$refs.passFormDom.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      moneyVisible: false,
      infoVisible: false,
      dialogPassVisible: false,
      confirmVisible: false,
      moneyForm: {
        money: 200
      },
      rule: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      options: [{
        value: 200,
        label: '200元'
      }],
      passForm: {
        pass: '',
        checkPass: ''
      },
      accountForm: JSON.parse(sessionStorage.getItem('user'))
    }
  },
  computed: {

  },
  methods: {
    postConfirmMoney () {
      this.confirmVisible = true
    },
    changePass () {
      this.passForm = {
        pass: '',
        checkPass: ''
      }
      this.dialogPassVisible = true
    },
    closeMoneyDialog (money) {
      this.moneyVisible = false
      if (money) {
        this.accountForm.money = money
      }
    },
    closeInfoDialog (data) {
      this.infoVisible = false
      if (data) {
        this.accountForm.email = data.email
        this.accountForm.phone = data.phone
        this.accountForm.introduce = data.introduce  
      }    
    },
    editInfo () {
      this.infoVisible = true
    },
    postMoney () {
      this.moneyVisible = true
    },
    upgradeUser () {
      let user = JSON.parse(sessionStorage.getItem('user'))      
      this.$http({
        method: 'post',
        data: {
          user_id: user.user_id
        },
        url: '/api/user/upgrade.do'
      }).then((result) => {
        this.confirmVisible = false
        let obj = Object.assign({}, user)
        obj['role_id'] = 3
        sessionStorage.setItem('user', JSON.stringify(obj))
        this.$message({
          type: 'success',
          message: '缴纳成功，已升级为接单用户！'
        })
      })
    },
    updatePass () {
      let user = JSON.parse(sessionStorage.getItem('user'))      
      this.$http({
        method: 'post',
        data: {
          user_id: user.user_id,
          password: this.passForm.pass
        },
        url: '/api/user/updatePass.do'
      }).then((result) => {
        this.dialogPassVisible = false
        this.$message({
          type: 'success',
          message: '密码修改成功'
        })
      })
    }
  },
  created () {
    if (this.$route.query.state === 'upgrade') {
      this.confirmVisible = true
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
