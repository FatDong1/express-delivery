<template>
  <el-row class="row-layout" :gutter="gutter">
    <el-col :span="spanNum" v-if="$slots.default">
      <slot></slot>
    </el-col>
    <el-col :span="spanNum" v-if="$slots.left && column === 3">
      <slot name="left"></slot>
    </el-col>
    <el-col :span="spanNum" v-if="$slots.center && column === 3">
      <slot name="center"></slot>
    </el-col>
    <el-col :span="spanNum" v-if="$slots.right && column === 3">
      <slot name="right"></slot>
    </el-col>
    <el-col :span="spanNum" v-if="$slots.left && column === 2">
      <slot name="left"></slot>
    </el-col>
    <el-col :span="spanNum" v-if="$slots.left && column === 2">
      <slot name="right"></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    column: {
      type: Number,
      default: 1
    },
    gutter: {
      type: Number,
      default: 0
    },
    span: {
      type: Number,
      default: 24
    }
  },
  computed: {
    spanNum () {
      return this.span / this.column
    }
  }
}
</script>
