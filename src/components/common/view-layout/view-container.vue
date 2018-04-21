<template>
  <div class="view-container" :style="{ 'padding': padding }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    padding: {
      type: String,
      default: '10px'
    }
  }
}
</script>

<style lang="less">
  .view-container {
    min-height: 500px;
    margin-bottom: 46px;
    box-sizing: border-box;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    background-color: #ffffff;

    & > .view-header:first-child {
      margin-top: 0;
    }
  }
</style>
