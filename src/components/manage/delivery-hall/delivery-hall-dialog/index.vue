<template>
  <el-dialog 
    title="接受订单" 
    :visible="visible"
    @close="closeDialog">
    <el-form 
      v-model="deliveryHallData"
      v-loading="loading" 
      label-width="100px"
      label-suffix="：">
      <el-form-item label="快递物品">
        <span>{{ deliveryHallData.goods }}</span>
      </el-form-item>
      <el-form-item label="快递公司">
        <span>{{ deliveryHallData.express_company }}</span>
      </el-form-item>
      <el-form-item label="重量水平">
        <span>{{ deliveryHallData.weight_level === 0 ? '较轻' : deliveryHallData.weight_level === 1 ? '较重' : '非常重' }}</span>
      </el-form-item>
      <el-form-item label="取件地址">
        <span>{{ deliveryHallData.get_address }}</span>
      </el-form-item>
      <el-form-item label="寄送地址">
        <span>{{ deliveryHallData.send_address }}</span>
      </el-form-item>
      <el-form-item label="寄送时间">
        <span>{{ deliveryHallData.send_date }}</span>
      </el-form-item>
      <el-form-item label="佣金（元）">
        <span>{{ deliveryHallData.price }}</span>
      </el-form-item>
      <el-form-item label="备注信息">
        <span>{{ deliveryHallData.express_remark }}</span>
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
      loading: false
    }
  },
  computed: {
    ...mapState('delivery-hall-data', [
      'deliveryHallData'
    ])
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },
    confirm () {
      this.loading = true
      this.$http({
        method: 'post',
        url: '/api/express/accept',
        data: {
          express_id: this.deliveryHallData.express_id
        }
      }).then((result) => {
        this.loading = false
        this.$emit('closeDialog')
        this.$message({
          type: 'success',
          message: '接受订单成功'
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
