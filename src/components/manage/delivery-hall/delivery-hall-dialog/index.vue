<template>
  <el-dialog 
    title="确认订单" 
    :visible="visible"
    @close="closeDialog">
    <el-form 
      v-model="deliveryHallData" 
      label-width="100px"
      label-suffix="：">
      <el-form-item label="快递物品">
        <span>{{ deliveryHallData.name }}</span>
      </el-form-item>
      <el-form-item label="寄送地址">
        <span>{{ deliveryHallData.address }}</span>
      </el-form-item>
      <el-form-item label="寄送时间">
        <span>{{ deliveryHallData.getDate }}</span>
      </el-form-item>
      <el-form-item label="佣金（元）">
        <span>{{ deliveryHallData.price }}</span>
      </el-form-item>
      <el-form-item label="备注信息">
        <span>{{ deliveryHallData.remark }}</span>
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
      this.$emit('closeDialog')
      this.$message({
        type: 'success',
        message: '接受订单成功'
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
