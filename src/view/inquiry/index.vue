<!--
 * @Author: meijie
 * @Date: 2022-01-18 18:39:56
 * @LastEditTime: 2022-01-26 18:01:50
 * @LastEditors: meijie
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue3_inquiry\src\view\inquiry\index.vue
-->
<!--
Description
@authors meijie (draltracy@msn.cn)
@date    2022-01-18 02:57:44
@version 1.0.0
-->
<template>
  <el-button type="primary" @click="addInquiry">新增运营询价</el-button>
  <inquiry-table />
  <inquiry-dialog ref="inquiryDialog" :visible="dialogVisible" @update:visible="updateDialog" />
</template>

<script>
  import { reactive, toRefs, ref, onMounted } from 'vue'
  import InquiryDialog from './inquiry-dialog' 
  import InquiryTable from './inquiry-table' 
  export default {
    name: 'inquiry',
    components: {
      InquiryDialog,
      InquiryTable
    },
    setup () {
      let data = reactive({
        dialogVisible: false,
      })
      let inquiryDialog = ref(null)
      const addInquiry = () => {
        data.dialogVisible = true
      }
      const updateDialog = (visible) => {
        data.dialogVisible = visible
      }
      onMounted (() => {
      })
      return {
        ...toRefs(data),
        addInquiry,
        updateDialog,
        inquiryDialog
      }
    }
  }
</script>

<style lang="css" scoped>
  
</style>
