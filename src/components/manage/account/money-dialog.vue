<template>
  <el-dialog 
    title="充值金额" 
    :visible="visible"
    @close="closeDialog">
    <el-form 
      v-model="moneyData" 
      label-width="100px"
      v-loading="loading"
      label-suffix="：">
      <el-form-item label="充值金额">
        <el-select v-model="moneyData.money" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  data () {
    return {
      loading: false,
      moneyData: {
        money: ''
      },
      options: [{
        value: 10,
        label: '10元'
      }, {
        value: 50,
        label: '50元'
      }, {
        value: 100,
        label: '100元'
      }]
    }
  },
  computed: {

  },
  methods: {
    closeDialog () {
      this.$emit('closeMoneyDialog')
    },
    confirm () {
      let user = JSON.parse(sessionStorage.getItem('user'))      
      this.loading = true
      this.$http({
        method: 'post',
        data: {
          user_id: user.user_id, 
          money: this.moneyData.money
        },
        url: '/api/user/recharge.do'
      }).then((result) => {
        this.$emit('closeMoneyDialog', this.moneyData.money)
        this.$message({
          type: 'success',
          message: '充值成功'
        })
      })
    }
  }
}
</script>

<style>
.el-form-item__label {
  text-align: left;
}
</style>
