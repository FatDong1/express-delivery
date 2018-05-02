<template>
  <el-menu
    class="header-menu"
    mode="horizontal"
    background-color="#2b3c5a"
    active-text-color="#409eff"
    text-color="#ffffff">
    <div class="header-logo">
    <img src="/static/logo.png" width="150px" height="50px"/>
    </div>
    <el-dropdown class="header-user-area" trigger="click">
      <div class="header-user">
        <span class="user-name">{{ name }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="userLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
export default {
  computed: {
    name: () => {
      let result = JSON.parse(sessionStorage.getItem('user'))
      return result.name
    }
  },
  methods: {
    userLogout () {
      sessionStorage.removeItem('user')
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style lang="less" scoped>
.header-menu {
  color: #ffffff;
  border-bottom: none;
}

.header-logo {
  float: left;
  width: 150px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: default;
  outline: none;

  // .logo-img {
  //   display: block;
  //   margin: 14px 29px;
  //   width: 92px;
  //   height: 22px;
  // }
}

.el-menu-item {
  height: 50px;
  margin-right: 20px;
  line-height: 50px;
}

.header-user-area {
  float: right;
  margin-right: 20px;
  outline: none;
  cursor: pointer;
}

.header-user {
  padding: 13px 10px;
  height: 50px;
  font-size: 14px;
  line-height: 20px;
  color: #c4c8d1;
  outline: none;
  box-sizing: border-box;
  overflow: hidden;

  .user-name {
    display: block;
    float: left;
    margin-top: 2px;
  }
}

</style>
