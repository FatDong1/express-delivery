<template>
  <div
    class="view-content-float"
    :style="{ 'max-width': width, 'padding': padding }">
    <div
      class="view-content-left"
      :class="{ 'full': !$slots.right, 'half': half }"
      v-if="$slots.default">
      <slot></slot>
    </div>
    <div
      class="view-content-right"
      :class="{ 'half': half }"
      v-if="$slots.right">
      <slot name="right"></slot>
    </div>
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
    },
    half: {
      type: Boolean,
      default: false
    },
    narrow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">

.view-content-float {
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

.view-content-left,
.view-content-right {
  max-width: 100%;

  &.half {
    width: 50%!important;
  }
}

.view-content-left {
  float: left;

  &.full {
    width: 100%;
  }
}

.view-content-right {
  float: right;
}
</style>
