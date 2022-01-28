<!--
 * @Description: 登录/注册页面
 * @Date: 2022-01-27 15:49:13
 * @LastEditors: meijie
 * @LastEditTime: 2022-01-28 17:25:38
 * @FilePath: \vue3_inquiry\src\views\login\index.vue
-->
<template>
  <div class="login-container" v-loading="loading">
    <el-button class="title" :disabled="!isLogin" @click="reset">注册</el-button>
    <el-button class="title" :disabled="isLogin" @click="reset">登录</el-button>
    <el-form :model="form" label-width="100px" label-suffix="：">
      <el-form-item v-show="!isLogin" label="用户名" prop="username" :rules="[{ required: !isLogin, message: '请输入用户名', trigger: 'blur'}]">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile" :rules="[{ required: true, message: '请输入手机号', trigger: 'blur'}]">
        <el-input v-model="form.mobile" />
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur'}]">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
    </el-form>
    <el-button type="primary" size="small" @click="submit">登录</el-button>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
import md5 from 'md5'
export default {
  name: 'login',
  setup () {
    let data = reactive({
      form: {
        mobile: '',
        password: '',
        username: ''
      },
      isLogin: true,
      loading: false
    })
    const { proxy: _this } = getCurrentInstance()
    const reset = () => {
      for (let key in data.form) {
        data.form[key] = ''
      }
      data.isLogin = !data.isLogin
    }
    const submit = async () => {
      try {
        data.loading = true
        const param = {
          mobile: data.form.mobile,
          password: md5(`${data.form.mobile}${md5(data.form.password)}`)
        }
        !data.isLogin && (param.username = data.form.username)
        const id = await _this.$api[data.isLogin ? 'login' : 'register'](param)
        _this.$message.success(`${data.isLogin ? '登录' : '注册'}成功！`)
        _this.$router.push({name: 'inquiry', params: {id}})
      } catch (e) {
        console.warn(e)
      } finally {
        data.loading = false
      }
    }

    console.log('env', process.env)
    

    return {
      ...toRefs(data),
      reset,
      submit
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