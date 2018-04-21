<template>
  <div class="view-header">
    <h2 class="view-header-title">
      <slot></slot>
    </h2>
    <div class="view-header-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
.view-header {
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;

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
}

.view-header-title {
  float: left;
  font-size: 16px;
  line-height: 28px;
}

.view-header-right {
  float: right;
}
</style>
