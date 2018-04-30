<template>
  <view-container>
    <view-header>{{ $route.query.from === 'list' && $route.query.state === 'edit' ? '编辑快递' : '发布快递'}}</view-header>
    <view-content>
      <el-form v-model="deliveryData" label-width="100px" v-loading="loading">
      <row-layout :column="2"> 
        <el-form-item label="快递物品" prop="goods" slot="left">
          <el-input v-model="deliveryData.goods" placeholder="请输入快递的物品"></el-input>
        </el-form-item>
        <el-form-item label="佣金（元）" prop="price" slot="right">
          <el-input v-model="deliveryData.price" placeholder="请输入快递佣金（元）"></el-input>
        </el-form-item>
      </row-layout>
      <row-layout :column="2"> 
        <el-form-item label="重量水平" prop="weight_level" slot="left">
          <el-select v-model="deliveryData.weight_level" placeholder="请选择" style="width: 50%">
            <el-option
              v-for="item in weigthOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递公司" prop="express_company" slot="right">
          <el-input v-model="deliveryData.express_company" placeholder="请输入快递公司"></el-input>
        </el-form-item>
      </row-layout>
      <row-layout :column="2"> 
        <el-form-item label="寄送时间" prop="send_date"  slot="left">
          <el-date-picker
            v-model="deliveryData.send_date"
            type="datetime"
            default-time="12:00:00"
            placeholder="选择日期和时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单截至时间" prop="end_date"  slot="right">
          <el-date-picker
            v-model="deliveryData.end_date"
            type="datetime"
            default-time="12:00:00"
            placeholder="选择日期和时间">
          </el-date-picker>
        </el-form-item>
      </row-layout>
      <row-layout :column="1"> 
        <el-form-item label="取件地址" prop="get_address">
          <el-input v-model="deliveryData.get_address" placeholder="请输入取件地址" style="width: 100%"></el-input>
        </el-form-item>
      </row-layout>
      <row-layout :column="1">    
        <el-form-item label="寄送地址" prop="send_address">
          <el-input v-model="deliveryData.send_address" placeholder="请输入寄送地址" style="width: 100%"></el-input>
        </el-form-item>
      </row-layout>
      <row-layout :column="1"> 
        <el-form-item label="备注信息" prop="address">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="deliveryData.express_remark">
          </el-input>
        </el-form-item>
      </row-layout>
        <el-form-item style="float: right; margin-top: 20px;">
          <el-button @click="clear">清空</el-button>          
          <el-button type="primary" @click="onSubmit">{{ $route.query.from === 'list' && $route.query.state === 'edit' ? '确认编辑' : '立即发布' }}</el-button>
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
      loading: false,
      deliveryData: {
        goods: '',
        price: '',
        weight_level: '',
        express_company: '',
        send_date: '',
        end_date: '',
        send_address: '',
        get_address: '',
        express_remark: '',
      },
      weigthOptions: [
        {
          value: 0,
          label: '较轻'
        },
        {
          value: 1,
          label: '较重'
        },
        {
          value: 2,
          label: '非常重'
        },
      ]
    }
  },
  computed: {
    ...mapState('my-delivery-data', [
      'myDeliveryData'
    ])
  },
  methods: {
    clear () {
      this.deliveryData = {
        goods: '',
        price: '',
        weight_level: '',
        express_company: '',
        send_date: '',
        end_date: '',
        send_address: '',
        get_address: '',
        express_remark: '',
      }
    },
    addExpress () {
      this.loading = true
      this.$http({
        method: 'post',
        url: '/api/express/add',
        data: this.deliveryData
      }).then((result) => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '发布快递成功'
        })
        this.$router.push({
          name: 'my-delivery-list'
        })
      })
    },
    updateExpress () {
      this.loading = true
      this.$http({
        method: 'post',
        url: '/api/express/update',
        data: this.deliveryData
      }).then((result) => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '编辑快递成功'
        })
        this.$router.push({
          name: 'my-delivery-list'
        })
      })
    },
    onSubmit () {
      if (this.$route.query.from === 'list' && this.$route.query.state === 'edit') {
        this.updateExpress()
      } else {
        this.addExpress()
      }
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
