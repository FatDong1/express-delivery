<template>
  <view-container>
    <view-header-flex>
      <span>快递查看</span>
      <div slot="right" style="display: inline-block">
        <el-button :disabled="disabled" v-if="stage === 0" size="small" class="btn-default" @click="passWork">通过</el-button>
        <el-button :disabled="disabled" v-if="stage === 0" size="small" class="btn-default" @click="failWork">驳回</el-button>  
        <el-button :disabled="disabled" v-if="stage === 0" size="small" class="btn-default" @click="editExpress">编辑</el-button> 
      </div>
    </view-header-flex>
   <info-detail>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="快递编号">
          {{ expressData.express_number }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="快递物品">
          {{ expressData.goods }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="重量水平">
          {{ expressData.weight_level === 0 ? '较轻' : expressData.weight_level === 1 ? '较重' : '非常重'  }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="佣金（元）">
          {{ expressData.price }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="快递公司">
          {{ expressData.express_company }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="接单人">
          暂无接单人
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"        
          :label-width="labelWidth"
          label="发布时间">
          {{ expressData.publish_date | formateDate}}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="取件时间">
          {{ expressData.send_date | formateDate}}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="订单截至时间">
          {{ expressData.end_date | formateDate }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="发布者">
          {{ expressData.publisher }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="取件地址">
          {{ expressData.get_address }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="寄送地址">
          {{ expressData.send_address }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item 
          :label-width="labelWidth"
          label="备注">
           {{ expressData.express_remark }}
        </info-detail-item>
      </row-layout>
    </info-detail>
    <el-dialog title="驳回订单" :visible.sync="dialogVisible">
      <el-form :model="form" v-loading="loading">
        <el-form-item label="驳回原因：" label-width="100px">
          <el-input v-model="form.reason" type="textarea" :rows="2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmReject">确 定</el-button>
      </div>
    </el-dialog>
  </view-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      column: 2,
      labelWidth: '120px',
      loading: false,
      disabled: false,
      dialogVisible: false,
      form: {
        reason: ''
      }
    }
  },
  methods: {
    ...mapMutations('my-delivery-data', [
      'updateMyDeliveryData'
    ]),
    passWork () {
      let user = JSON.parse(sessionStorage.getItem('user'))      
      this.$confirm('确认审核通过此订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/api/express/pass.do',
          data: {
            state: 1,
            express_id: this.expressData.express_id
          }
        }).then(() => {
          this.disabled = true
          this.$message({
            type: 'success',
            message: '审核通过成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      })
    },
    failWork () {
      this.dialogVisible = true
    },
    confirmReject () {
      this.loading = true
      let user = JSON.parse(sessionStorage.getItem('user'))      
      this.$http({
        method: 'post',
        url: '/api/express/reject.do',
        data: {
          state: -1,
          express_id: this.expressData.express_id,
          reject_reason: this.form.reason
        }
      }).then(() => {
        this.loading = false
        this.disabled = true
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: '驳回成功!'
        })
      })
    },
    editExpress () {
      this.updateMyDeliveryData(this.expressData)
      this.$router.push({
        name: 'my-delivery-edit',
        query: {
          from: 'list',
          state: 'edit'
        }
      })
    }
  },
  computed: {
    ...mapState('express-data', [
      'expressData',
      'stage'
    ])
  }
}
</script>

<style>

</style>
