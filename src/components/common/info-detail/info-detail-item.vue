<template>
  <div class="info-detail-item">
    <div class="info-detail-item-label" :style="labelStyle">
      <label>{{ label }}</label>
    </div>
    <div class="info-detail-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    labelWidth: {
      type: String
    }
  },
  computed: {
    labelStyle () {
      let style = {}
      let labelWidth = this.labelWidth || this.$parent.labelWidth

      if (labelWidth) {
        style.width = labelWidth
      }
      return style
    }
  }
}
</script>

<style lang="less" scoped>
.info-detail-item {
  display: flex;
  box-sizing: border-box;
  border-left: 1px solid #E8E8E8;
  border-bottom: 1px solid #E8E8E8;

  &-label {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    padding: 10px 20px;
    background-color: #f2f2f2;
    border-right: 1px solid #E8E8E8;
  }

  &-content {
    padding: 10px 20px 10px 10px;
  }
}
</style>
