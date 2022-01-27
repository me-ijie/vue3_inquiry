<!--
 * @Author: meijie
 * @Date: 2022-01-18 18:39:56
 * @LastEditTime: 2022-01-27 14:26:28
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
  <inquiry-table @open="openDialog" />
  <inquiry-dialog 
    ref="inquiryDialog"
    :inquiry="inquiry"
    :visible="dialogVisible"
    @update:visible="updateDialog"
    v-model="preview"
    />
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
        preview: false,
        inquiry: {}
      })
      let inquiryDialog = ref(null)
      const addInquiry = () => {
        data.preview = false
        data.dialogVisible = true
      }
      const updateDialog = (visible) => {
        data.preview = false
        data.dialogVisible = visible
      }
      const openDialog = (options = {}) => {
        const { inquiry, action } = options
        data.preview = action === 'view'
        data.inquiry = inquiry
        data.dialogVisible = true
      }
      onMounted (() => {
        // console.log(inquiryDialog, 'dialog')
      })
      return {
        ...toRefs(data),
        addInquiry,
        updateDialog,
        openDialog,
        inquiryDialog
      }
    }
  }
</script>

<style lang="css" scoped>
  
</style>
