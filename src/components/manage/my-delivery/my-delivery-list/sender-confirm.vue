<template>
  <el-dialog 
    title="寄送人确认完成" 
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
      <el-form-item label="取件地址">
        <span>{{ myDeliveryData.get_address }}</span>
      </el-form-item>
      <el-form-item label="寄件地址">
        <span>{{ myDeliveryData.send_address }}</span>
      </el-form-item>
      <el-form-item label="预定寄送时间">
       <span>{{ myDeliveryData.send_date | formateDate }}</span>
      </el-form-item>
      <el-form-item label="提示">
       <span>待发布者确认完成后将收到佣金</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirm">确认完成</el-button>
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
      this.$emit('closeSenderDialog')
    },
    confirm () {
      this.loading = true
      this.$http({
        method: 'post',
        url: '/api/express/finish.do',
        data: {
          express_id: this.myDeliveryData.express_id
        }
      }).then((result) => {
        this.loading = false
        this.$emit('closeSenderDialog', 1)
        this.$message({
          type: 'success',
          message: '确认成功'
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
