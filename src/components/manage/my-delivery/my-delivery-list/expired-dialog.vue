<template>
  <el-dialog 
    title="举报用户未完成" 
    :visible="visible"
    @close="closeDialog">
    <el-form 
      v-model="myDeliveryData" 
      label-width="130px"
      label-suffix="："
      v-loading="loading"
      status-icon>
      <el-form-item label="寄送人">
        <span>{{ myDeliveryData.sender }}</span>
      </el-form-item>
      <el-form-item label="快递物品">
        <span>{{ myDeliveryData.goods }}</span>
      </el-form-item>
      <el-form-item label="取件地址">
        <span>{{ myDeliveryData.get_address }}</span>
      </el-form-item>
      <el-form-item label="寄件地址">
        <span>{{ myDeliveryData.send_address}}</span>
      </el-form-item>
      <el-form-item label="预定寄送时间">
       <span>{{ myDeliveryData.send_date | formateDate }}</span>
      </el-form-item>
      <el-form-item label="提示">
       <span>{{ '举报成功后将寄送人的信誉分减一'}}</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirm">立即举报</el-button>
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
      this.$emit('closeExpiredDialog')
    },
    confirm () {
      this.loading = true
      this.$http({
        method: 'post',
        url: '/api/express/fail.do',
        data: {
          express_id: this.myDeliveryData.express_id         
        }
      }).then((result) => {
        this.loading = false
        this.$emit('closeExpiredDialog', 1)
        this.$message({
          type: 'success',
          message: '举报成功'
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
