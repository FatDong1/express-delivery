<template>
  <el-container>
    <el-header height="50px">
      <app-header id="app-header"></app-header>
    </el-header>
    <el-container>
      <el-aside id="app-aside" width="150px">
        <app-sidebar ref="sidebar"></app-sidebar>
      </el-aside>
      <el-main>
        <app-breadcrumb></app-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from './layout/header.vue'
import AppSidebar from './layout/sidebar.vue'
import AppBreadcrumb from './layout/breadcrumb.vue'

export default {
  components: {
    AppHeader,
    AppSidebar,
    AppBreadcrumb
  }
}
</script>

<style>
.el-container {
  height: 100%;
  overflow: hidden;
}
.el-header {
  padding: 0;
}

#app-aside {
  height: 100%;
  background-color: #2b3c5a;
}

.el-main {
  background-color: #f2f2f2;
  padding: 10px;
}

.el-menu--horizontal>.el-menu-item.is-active,
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
  border-bottom: 4px solid #409EFF
}
</style>

