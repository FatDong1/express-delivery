<template>
  <el-dialog 
    title="邀请接单" 
    :visible="visible"
    @close="closeDialog">
    <el-form 
      v-model="myDeliveryData" 
      label-width="120px"
      label-suffix="："
      v-loading="loading"
      status-icon>
      <el-form-item label="快递物品">
        <span>{{ myDeliveryData.goods }}</span>
      </el-form-item>
      <el-form-item label="快递公司">
        <span>{{ myDeliveryData.express_company }}</span>
      </el-form-item>
      <el-form-item label="取件地址">
        <span>{{ myDeliveryData.get_address }}</span>
      </el-form-item>
      <el-form-item label="寄件地址">
        <span>{{ myDeliveryData.send_address }}</span>
      </el-form-item>
      <el-form-item label="预定寄送时间">
       <span>{{ myDeliveryData.send_date }}</span>
      </el-form-item>
      <el-form-item label="接单人">
       <el-input v-model="inviter" placeholder="请输入您想邀请的人"></el-input>
      </el-form-item>
      <el-form-item label="是否指定">
        <el-radio v-model="radio" :label="1">是</el-radio>
        <el-radio v-model="radio" :label="0">否</el-radio>
        <p v-if="radio === '1'" style="font-size: 14px">（在30分钟内只能由被邀请的人接受订单）</p>        
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirm">确认邀请</el-button>
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
      inviter: '',
      radio: 0,
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
      this.$emit('closeInviteDialog')
    },
    confirm () {
      if (this.radio) {
        this.assign()
      } else {
        this.invite()
      }
    },
    invite () {
      this.loading = true
      this.$http({
        method: 'post',
        url: '/api/express/invite.do',
        data: {
          express_id: this.myDeliveryData.express_id,
          inviter: this.inviter
        }
      }).then((result) => {
        this.loading = false
        this.$emit('closeInviteDialog')
        this.$message({
          type: 'success',
          message: '邀请成功'
        })
      })
    },
    assign () {
      this.loading = true
      this.$http({
        method: 'post',
        url: '/api/express/invite.do',
        data: {
          express_id: this.myDeliveryData.express_id,
          name: this.inviter
        }
      }).then((result) => {
        this.loading = false
        this.$emit('closeInviteDialog')
        this.$message({
          type: 'success',
          message: '邀请成功'
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
