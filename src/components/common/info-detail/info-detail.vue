<template>
  <div class="info-detail">
    <h3 v-if="title">{{ title }}</h3>
    <div class="info-detail-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="info-detail-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    labelWidth: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.info-detail {
  padding: 10px 0;

  h3 {
    margin-bottom: 10px;
  }

  .info-detail-header {
    padding: 5px 0;
  }

  .info-detail-wrapper {
    border-top: 1px solid #E8E8E8;
    border-right: 1px solid #E8E8E8;
  }
}
</style>
