<template>
  <el-carousel :interval="5000" height="500px">
    <el-carousel-item v-for="item in 6" :key="item" :style="'background: url(./img/' + item + '.jpg) no-repeat'">
    </el-carousel-item>
  </el-carousel>
</template>

<style>
.el-carousel {
  margin-top: 30px;
}

.el-carousel-item {
  background-repeat: no-repeat;
}
</style>
