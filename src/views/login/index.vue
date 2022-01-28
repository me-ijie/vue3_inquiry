<!--
 * @Description: 登录/注册页面
 * @Date: 2022-01-27 15:49:13
 * @LastEditors: meijie
 * @LastEditTime: 2022-01-27 18:17:04
 * @FilePath: \vue3_inquiry\src\views\login\index.vue
-->
<template>
  <div class="login-container">
    <p class="title">登录</p>
    <div class="input">
      <label for="mobile">手机号：</label>
      <el-input id="mobile" v-model="mobile" />
    </div>
    <div class="input">
      <label for="pwd">密码：</label>
      <el-input id="pwd" type="password" v-model="pwd" />
    </div>
    <el-button type="primary" size="small" @click="login">登录</el-button>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
export default {
  name: 'login',
  setup () {
    let data = reactive({
      mobile: '',
      pwd: ''
    })
    const { proxy: _this } = getCurrentInstance()
    const login = (data) => {
      // _this.$router.push('/inquiry')
      _this.$api.login({
        mobile: data.mobile,
        pwd: data.pwd
      })
    }
    return {
      ...toRefs(data),
      login
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 400px;
  height: 300px;
  padding: 30px 16px;
  margin: 0 auto;
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.13);
  .title {
    margin: 16px 0;
    margin-bottom: 30px;
  }
  .input {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    label {
      margin-right: 8px;
      white-space: nowrap;
    }
  }
}
</style>