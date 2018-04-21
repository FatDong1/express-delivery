<template>
  <el-form
    class="view-content-form"
    label-position="right"
    :rules="rules"
    :style="{ 'padding': padding }"
    :label-width="labelWidth"
    :size="size"
    :model="model">
    <el-row>
      <el-col :span="span">
        <slot></slot>
      </el-col>
      <el-col :span="24 - span">
        <slot name="right"></slot>
      </el-col>
    </el-row>
    <el-row class="form-footer" v-if="$slots.footer">
      <el-col :span="span">
        <slot name="footer"></slot>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import getComponentName from 'shared@/config/components-define'
export default {
  name: getComponentName('view-content-form'),
  props: {
    padding: {
      type: String,
      default: '10px'
    },
    span: {
      type: Number,
      default: 12
    },
    model: {
      type: Object,
      default: () => {
        return {}
      }
    },
    size: {
      type: String,
      default: 'mini'
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
