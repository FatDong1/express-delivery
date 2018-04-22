<template>
  <div class="view-header-flex">
    <h2 class="view-header-title">
      <slot></slot>
    </h2>
    <div class="view-header-right" :style="{ width: width}" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: 'auto'
    }
  }
}
</script>

<style lang="less">
.view-header-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #dfe4ed;

  .view-header-title {
    font-size: 16px;
  }
  
  .view-header-right {
    // min-width: 350px;
    margin-left: auto;
    order: 2;
  }
}
</style>
