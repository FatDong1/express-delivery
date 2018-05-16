<template>
  <el-menu
    mode="vertical"
    class="app-sidebar"
    background-color="#2b3c5a"
    text-color="#fff"
    active-text-color="#409eff"
    :router="router"
    :default-active="sidebarSelectItem">
    <el-menu-item index="/home">
      <i class="el-icon-menu"></i>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/my-delivery?relate_me=0&pageIndex=1">
      <i class="el-icon-tickets"></i>
      <span>我的快递</span>
    </el-menu-item>
    <el-menu-item index="/my-delivery/edit">
      <i class="el-icon-printer"></i>
      <span>快递帮拿</span>
    </el-menu-item>
    <el-menu-item index="/delivery-hall?&pageIndex=1">
      <i class="el-icon-news"></i>
      <span>快递大厅</span>
    </el-menu-item>
    <el-menu-item index="/credit">
      <i class="el-icon-setting"></i>
      <span>信誉排行</span>
    </el-menu-item>
    <el-menu-item index="/account">
      <i class="el-icon-sold-out"></i>
      <span>账户管理</span>
    </el-menu-item>
    <el-menu-item index="/express" v-if="isAdmin">
      <i class="el-icon-date"></i>
      <span>快递管理</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-message"></i>
      <span>用户管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    data () {
      return {
        router: true,
        sidebarSelectItem: '/home',
        isAdmin: JSON.parse(sessionStorage.getItem('user')).role === 'admin'
      }
    },
    methods: {

    },
    created () {
      this.sidebarSelectItem = '/' + this.$route.name
    }
  }
</script>

<style lang="less">
.app-sidebar {
  &.el-menu {
    width: 150px;
    border-right: none;
    font-size: 12px;
  }

  .el-menu-item,
  .el-submenu__title {
    position: relative;
    height: 40px;
    font-size: 12px;
    line-height: 40px;
  }

  .el-icon-menu {
    margin-right: 0;
  }

  .el-menu-item-group__title {
    padding-top: 0;
    padding-bottom: 0;
  }

  .sidebar-menu-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 14px 14px;
    background-position: center center;
    background-repeat: no-repeat;
    vertical-align: middle;
  }
  .is-active {
    position: relative;

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: #409eff;
    }
  }
}
</style>
