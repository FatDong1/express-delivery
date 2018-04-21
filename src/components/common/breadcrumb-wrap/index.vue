<template>
  <el-breadcrumb separator=">">
    <div class="el-breadcrumb-head">您的位置：</div>
    <el-breadcrumb-item
      v-for="(item, index) in options"
      :key="index"
      :to="{ path: item.to }">
      {{ item.title }}
      </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: []
    }
  }
}
</script>

<style>
  .el-breadcrumb {
    height: 20px;
    padding: 8px 10px;
    font-size: 12px;
    line-height: 20px;
    color: #5a5e66;
  }

  .el-breadcrumb-head {
    float: left;
    margin-right: 10px;
  }

  .el-breadcrumb__separator {
    font-weight: 400;
  }
</style>
