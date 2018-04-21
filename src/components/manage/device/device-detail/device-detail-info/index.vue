<template>
  <info-detail>
    <row-layout :column="2">
      <info-detail-item
        slot="left"
        :label-width="labelWidth"
        label="设备名称">
        {{ deviceData.deviceName }}
      </info-detail-item>
      <info-detail-item
        slot="right"
        :label-width="labelWidth"
        label="所属部门">
        {{ deviceData.department }}
      </info-detail-item>
    </row-layout>
    <row-layout :column="2">
      <info-detail-item
        slot="left"
        :label-width="labelWidth"
        label="设备种类">
        {{ deviceData.category }}
      </info-detail-item>
      <info-detail-item
        slot="right"
        :label-width="labelWidth"
        label="设备型号">
        {{ deviceData.deviceModel }}
      </info-detail-item>
    </row-layout>
    <row-layout :column="2">
      <info-detail-item
        slot="left"
        :label-width="labelWidth"
        label="出厂编号">
        {{ deviceData.serialNumber }}
      </info-detail-item>
      <info-detail-item
        slot="right"
        :label-width="labelWidth"
        label="使用地点">
        {{ deviceData.usePlace }}
      </info-detail-item>
    </row-layout>
    <row-layout :column="1">
      <info-detail-item
        :label-width="labelWidth"
        label="生产地址">
        {{ deviceData.productionAddress }}
      </info-detail-item>
    </row-layout>
    <row-layout :column="1">
      <info-detail-item
        :label-width="labelWidth"
        label="备注">
        {{ deviceData.remark }}
      </info-detail-item>
    </row-layout>
  </info-detail>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      labelWidth: '100px'
    }
  },
  computed: {
    ...mapState('device-data', [
      'deviceData'
    ])
  }
}
</script>

<style>

</style>
