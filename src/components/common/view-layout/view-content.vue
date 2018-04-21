<template>
  <div class="view-content" :style="{ 'max-width': width, 'padding': padding }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    padding: {
      type: String,
      default: '10px'
    }
  }
}
</script>

<style lang="less">

.view-content {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  &:after {
    content: '\20';
    display: block;
    height: 0;
    clear: both;
  }
}
</style>
