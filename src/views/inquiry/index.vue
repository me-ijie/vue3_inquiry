<!--
 * @Author: meijie
 * @Date: 2022-01-18 18:39:56
 * @LastEditTime: 2022-02-09 15:39:06
 * @LastEditors: meijie
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue3_inquiry\src\views\inquiry\index.vue
-->
<!--
Description
@authors meijie (draltracy@msn.cn)
@date    2022-01-18 02:57:44
@version 1.0.0
-->
<template>
  <div class="inquiry">
    <el-button class="inquiry-btn" type="primary" @click="addInquiry">新增运营询价</el-button>
    <inquiry-table ref="inquiryTable" class="inquiry-table" @open="openDialog" />
    <inquiry-dialog 
      ref="inquiryDialog"
      :inquiry="inquiry"
      :visible="dialogVisible"
      @update:visible="updateDialog"
      @updateList="$refs.inquiryTable.initData()"
      :isPreview="isPreview"
      />

  </div>
</template>

<script>
  import { reactive, toRefs, ref } from 'vue'
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
        isPreview: false,
        inquiry: {}
      })
      let inquiryDialog = ref(null)

      const addInquiry = () => {
        data.isPreview = false
        data.dialogVisible = true
      }
      const updateDialog = (visible) => {
        data.isPreview = false
        data.dialogVisible = visible
      }
      const openDialog = (options = {}) => {
        const { inquiry, action } = options
        data.isPreview = action === 'view'
        data.inquiry = inquiry
        data.dialogVisible = true
      }

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

<style lang="less" scoped>
  .inquiry {
    &-btn {
      margin-bottom: 24px;
    }
    &-table {
      width: 80%;
      margin: 0 auto;
    }
  }
</style>
