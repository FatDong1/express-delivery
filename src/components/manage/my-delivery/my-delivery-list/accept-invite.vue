<template>
  <el-dialog 
    title="接受邀请" 
    :visible="visible"
    @close="closeDialog">
    <el-form 
      v-model="myDeliveryData" 
      label-width="130px"
      label-suffix="："
      v-loading="loading"
      status-icon>
      <el-form-item label="发布者">
        <span>{{ myDeliveryData.publisher }}</span>
      </el-form-item>
      <el-form-item label="快递物品">
        <span>{{ myDeliveryData.goods }}</span>
      </el-form-item>
      <el-form-item label="快递公司">
        <span>{{ myDeliveryData.express_company }}</span>
      </el-form-item>
      <el-form-item label="佣金（元）">
        <span>{{ myDeliveryData.price }}</span>
      </el-form-item>
      <el-form-item label="重量水平">
        <span>{{ myDeliveryData.weight_level === 0 ? '较轻' : myDeliveryData.weight_level === 1 ? '较重' : '非常重' }}</span>
      </el-form-item>
      <el-form-item label="取件地址">
        <span>{{ myDeliveryData.get_address }}</span>
      </el-form-item>
      <el-form-item label="寄件地址">
        <span>{{ myDeliveryData.send_address }}</span>
      </el-form-item>
      <el-form-item label="预定寄送时间">
       <span>{{ myDeliveryData.send_date | formateDate }}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirm">接受邀请</el-button>
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
    }
  },
  computed: {
    ...mapState('my-delivery-data', [
      'myDeliveryData'
    ])
  },
  methods: {
    closeDialog () {
      this.$emit('closeAcceptDialog')
    },
    confirm () {
      let user = JSON.parse(sessionStorage.getItem('user'))
      if (user.user_id === 3) {
        this.loading = true
        this.$http({
          method: 'post',
          url: '/api/express/accept.do',
          data: {
            express_id: this.myDeliveryData.express_id,
            sender_id: user.user_id
          }
        }).then((result) => {
          this.loading = false
          this.$emit('closeAcceptDialog', 1)
          this.$message({
            type: 'success',
            message: '接受订单成功'
          })
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '接受订单失败'
          })
        })
      } else {
        this.$alert('为保证快递安全，需缴纳200元保证金，才可以成为接单用户', '没有权限', {
          confirmButtonText: '前往缴纳',
          callback: action => {
            if (action === 'confirm') {
              this.$router.push({
                name: 'account',
                query: {
                  state: 'upgrade'
                }
              })
            }
          }
        })
      }
    }
  }
}
</script>

<style>
.el-form-item__label {
  text-align: left;
}
</style>
