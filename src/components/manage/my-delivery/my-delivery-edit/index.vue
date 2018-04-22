<template>
  <view-container>
    <view-header>{{ $route.query.from === 'list' ? '编辑快递' : '发布快递'}}</view-header>
    <view-content>
      <el-form v-model="deliveryData" label-width="100px">
        <el-form-item label="快递物品" prop="name">
          <el-input v-model="deliveryData.name" placeholder="请输入快递的物品"></el-input>
        </el-form-item>
        <el-form-item label="佣金（元）" prop="price">
          <el-input v-model="deliveryData.name" placeholder="请输入快递佣金（元）"></el-input>
        </el-form-item>
        <el-form-item label="寄送时间" prop="getDate">
          <el-date-picker
            v-model="deliveryData.getDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="寄送地址" prop="address">
          <el-input v-model="deliveryData.address" placeholder="请输入寄送地址" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="address">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="deliveryData.remark">
          </el-input>
        </el-form-item>
        <el-form-item style="float: right; margin-top: 20px;">
          <el-button>清空</el-button>          
          <el-button type="primary" @click="onSubmit">立即发布</el-button>
        </el-form-item>
      </el-form>
    </view-content>
  </view-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      deliveryData: {
        name: '',
        address: '',
        getDate: ''
      }
    }
  },
  computed: {
    ...mapState('my-delivery-data', [
      'myDeliveryData'
    ])
  },
  methods: {
    onSubmit () {

    }
  },
  created () {
    if (this.$route.query.from === 'list') {
      this.deliveryData = this.myDeliveryData
    }
  }
}
</script>

<style>
.el-input{
  width: auto;
}

.el-form-item__label {
  text-align: left;
}
</style>
