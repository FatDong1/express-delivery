<template>
  <view-container>
    <view-header>新增设备</view-header>
    <el-form
      class="device-form"
      label-width="80px"
      ref="deviceForm"
      :model="deviceFormData">
      <row-layout :column="3">
        <el-form-item slot="left" prop="name" label="设备名称">
          <el-input v-model="deviceFormData.name" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item slot="center" prop="department" label="所属部门">
          <el-cascader :options="departmentOptions" v-model="deviceFormData.department">
          </el-cascader>
        </el-form-item>
        <el-form-item slot="right" prop="category" label="设备类别">
          <el-input v-model="deviceFormData.category" :disabled="disabled"></el-input>
        </el-form-item>
      </row-layout>
      <row-layout :column="3">
        <el-form-item slot="left" prop="deviceModel" label="设备型号">
          <el-input v-model="deviceFormData.deviceModel" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item slot="center" prop="serialNumber" label="出厂编号">
          <el-input v-model="deviceFormData.serialNumber" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item slot="right" prop="usePlace" label="使用地点">
          <el-input v-model="deviceFormData.usePlace" :disabled="disabled"></el-input>
        </el-form-item>
      </row-layout>
      <row-layout :span="16">
        <el-form-item prop="productionAddress" label="生产地址">
          <el-input v-model="deviceFormData.productionAddress" :disabled="disabled"></el-input>
        </el-form-item>
      </row-layout>
      <row-layout :span="16">
        <!-- 备注 -->
        <el-form-item prop="remark" label="备注">
          <el-input type="textarea" v-model="deviceFormData.remark" :min="3" :disabled="disabled"></el-input>
        </el-form-item>
      </row-layout>
      <view-content-float>
        <el-button
          slot="right"
          type="primary"
          @click="saveDevice">保存</el-button>
      </view-content-float>
    </el-form>
  </view-container>
</template>

<script>
export default {
  data () {
    return {
      regionOption: [],
      enterpriseNatureOption: [],
      taxpayerTypeOption: [],
      selectItem: null,
      disabled: false,
      inputDisabled: false,
      deviceFormData: {
        name: '',
        department: [],
        category: '',
        deviceModel: '',
        serialNumber: '',
        usePlace: '',
        productionAddress: '',
        remark: ''
      },
      departmentOptions: [{
        value: '第一工厂',
        label: '第一工厂',
        children: [{
          value: '第一车间',
          label: '第一车间'
        }, {
          value: '第二车间',
          label: '第二车间'
        }]
      }, {
        value: '第二工厂',
        label: '第二工厂',
        children: [{
          value: '第一车间',
          label: '第一车间'
        }, {
          value: '第二车间',
          label: '第二车间'
        }]
      },{
        value: '第三工厂',
        label: '第三工厂',
        children: [{
          value: '第一车间',
          label: '第一车间'
        }, {
          value: '第二车间',
          label: '第二车间'
        }]
      }]
    }
  },
  methods: {
    saveDevice () {
      this.$http({
        method: 'post',
        url: '/api/device',
        data: this.deviceFormData
      }).then((result) => {
        this.$message({
          type: 'success',
          message: result.msg
        })
        this.$router.push({
          name: 'device-list'
        })
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: error.msg
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content-header {
  font-size: 14px;
  padding: 10px 0;
}

.customer-name-wrap {
  .el-autocomplete {
    width: 100%;
  }

  .confirm-btn {
    position: absolute;
    top: 0;
    right: -66px;
  }
}

.customer-center-box {
  margin-bottom: 20px;
  text-align: center;

  & > .el-autocomplete {
    width: 300px;
  }
}

.customer-item {
  padding: 5px 0;
  border-bottom: 1px solid #f2f2f2;
  line-height: 24px;
  .info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999999;
  }
}

.device-form {
  margin-top: 20px;
  padding: 10px;
}

</style>
