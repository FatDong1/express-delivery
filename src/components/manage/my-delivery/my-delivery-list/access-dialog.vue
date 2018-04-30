<template>
  <el-dialog 
    title="评价订单" 
    :visible="visible"
    @close="closeDialog">
    <el-form 
      v-model="formData" 
      label-width="100px"
      label-suffix="："
      v-loading="loading"
      status-icon>
      <el-form-item label="寄送人">
        <span>{{ formData.sender }}</span>
      </el-form-item>
      <el-form-item label="快递物品">
        <span>{{ myDeliveryData.goods }}</span>
      </el-form-item>
      <el-form-item label="好评">
        <el-rate  v-model="stars"  show-text></el-rate>
      </el-form-item>
      <el-form-item label="服务评价">
        <el-input type="textarea" :rows="2" v-model="formData.assess_content"></el-input>
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
      stars: null
    }
  },
  computed: {
    ...mapState('my-delivery-data', [
      'myDeliveryData'
    ]),
    formData () {
      let obj = {
        sender: this.myDeliveryData.sender,
        assess_content: ''
      }
      return obj
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeAssessDialog')
    },
    confirm () {
      let result = {
        id: this.myDeliveryData.express_id,
        stars: this.stars,
        assess_content: this.formData.assess_content
      }
      this.loading = true
      this.$http({
        method: 'post',
        url: '/api/assess/add',
        data: result
      }).then((result) => {
        this.loading = false
        this.$emit('closeAssessDialog')
        this.$message({
          type: 'success',
          message: '评价成功'
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
