<!--
Description
@authors meijie (draltracy@msn.cn)
@date    2022-01-18 02:57:44
@version 1.0.0
-->
<template>
  <el-button type="primary" @click="addInquiry">新增运营询价</el-button>
  <inquiry-dialog ref="inquiryDialog" :visible="dialogVisible" />
</template>

<script>
  import { reactive, toRefs } from '@vue/reactivity'
  import InquiryDialog from './inquiry-dialog' 
  export default {
    name: 'inquiry',
    components: {
      InquiryDialog
    },
    setup () {
      let data = reactive({
        dialogVisible: false,
      })
      let addInquiry = () => {
        data.dialogVisible = true
      }
      return {
        ...toRefs(data),
        addInquiry
      }
    }
  }
</script>

<style lang="css" scoped>
  
</style>
