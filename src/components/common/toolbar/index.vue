<template>
  <div class="toolbar">
    <div class="toolbar-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.toolbar {
  position: fixed;
  width: 100%;
  height: 56px;
  right: 0;
  bottom: 0;
  padding: 0 20px;
  border-top: 1px solid #e2e2e2e2;
  background-color: #ffffff;
  line-height: 56px;
  z-index: 2;
  
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 0;
    padding-top: 10px;
    border-bottom: 1px solid #dfe4ed;
    clear: both;
    overflow: hidden;
  }

  .toolbar-right {
    float: right;
  }
}
</style>
