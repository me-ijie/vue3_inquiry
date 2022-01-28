<!--
 * @Description: 询价列表
 * @Date: 2022-01-26 16:26:12
 * @LastEditors: meijie
 * @LastEditTime: 2022-01-28 16:30:01
 * @FilePath: \vue3_inquiry\src\views\inquiry\inquiry-table.vue
-->
<template>
  <el-table
    v-loading="saveLoading"
    border
    align="center"
    :data="list"
    style="border-radius: 4px;"
    :header-cell-style="{
      backgroundColor: '#E8E8E8',
      'font-weight': 600,
      color: '#000'
    }">
    <el-table-column v-for="(col, index) in tableConfig"
    :prop="col.prop"
    :label="col.label"
    align="center"
    :width="col.width"
    :show-overflow-tooltip="col.showOverflow"
    :key="col.prop">
      <template #default="scope">
        <span v-if="col.prop === 'index'">
          {{ index + 1 }}
        </span>
        <span v-else-if="col.prop === 'status'" :style="{
          color: [1, 3].includes(scope.row.status) ? '#000000':'#fff',
          background: getColor(scope.row.status)
          }">
          {{ ['待处理', '已处理', '草稿', '讨论中'][scope.row.status - 1] }}
        </span>
        <span v-else-if="col.prop === 'risk_assess'">
          {{ ['待评估', '低风险', '中风险', '高风险', '不建议执行'][scope.row.risk_assess] }}
        </span>
        <span v-else-if="col.prop === 'final_price'">{{+scope.row.status === 2 ? scope.row.final_price : ''}}</span>
        <span v-else-if="col.prop === 'annotation'">{{scope.row.annotation ? '有' : '-'}}</span>
        <span v-else-if="col.prop === 'action'">
          <el-button type="text" @click="getInquiry(scope.$index, 'view')" :disabled="saveLoading">查看</el-button>
          <el-button type="text" @click="getInquiry(scope.$index, 'copy')" :disabled="saveLoading">复制</el-button>
          <el-button type="text" @click="urge(scope.row.inquiry_id)" v-if="+scope.row.status === 1" :disabled="saveLoading">催办</el-button>
          <el-button type="text" @click="recall(scope.row.inquiry_id)" v-if="+scope.row.status === 1" :disabled="saveLoading">撤回</el-button>
        </span>
        <span v-else>{{scope.row[col.prop]}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { getCurrentInstance, onMounted, onUnmounted, reactive, readonly } from 'vue'
  export default {
    name: 'inquiry-table',
    emits: ['open'],
    setup (props, ctx) {
      let data = reactive({
        saveLoading: false,
        list: [{
          inquiry_id: 1,
          status: 2,
          risk_assess: 1,
          method: 'ezTest',
          recovery_time: '2021-01-26 10:27',
          prediction: 0.7,
          add_time: '2021-01-25 10:27',
          confirm_time: '2021-01-26 10:27',
          annotation: '111',
          final_price: 500,
          result: [{annotation: '1'}]
        }]
      })
      const configData = readonly({
        // 无需改变，设为非响应式
        tableConfig: [
          {
            prop: 'index',
            label: '序号',
            width: '96',
            showOverflow: false
          },
          {
            prop: 'status',
            label: '状态',
            width: '96',
            showOverflow: false
          },
          {
            prop: 'risk_assess',
            label: '风险评估',
            width: '96',
            showOverflow: false
          },
          {
            prop: 'method',
            label: '调研方法',
            width: '96',
            showOverflow: true
          },
          {
            prop: 'final_price',
            label: '合计',
            width: '96',
            showOverflow: false
          },
          {
            prop: 'recovery_time',
            label: '执行时间',
            width: '180',
            showOverflow: false
          },
          {
            prop: 'prediction',
            label: '渗透率',
            width: '100',
            showOverflow: false
          },
          {
            prop: 'add_time',
            label: '询价时间',
            width: '180',
            showOverflow: false
          },
          {
            prop: 'confirm_time',
            label: '处理时间',
            width: '180',
            showOverflow: false
          },
          {
            prop: 'annotation',
            label: '运营批注',
            width: '96',
            showOverflow: true
          },
          {
            prop: 'action',
            label: '操作',
            width: '200',
            showOverflow: false
          }
        ],
      })
      const { proxy:_this } = getCurrentInstance()

      const getColor = (status) => {
        switch (status) {
          case 1:
          case 3:
            return '#DCDFE6'
          case 2:
            return '#FFAC18'
          case 4:
            return '#9AC137'
        }
      }

      const getInquiry = (index, action) => {
        // console.log('this:', _this.$clone)
        const inquiry = _this.$clone(data.list[index])
        const options = { inquiry, action }
        ctx.emit('open', options)
      }

      const recall = (id) => {
        console.log(id)
      }

      const urge = (id) => {
        console.log(id)
      }

      onMounted(() => {
        console.log('挂载了')
      })

      onUnmounted(() => {
        console.log('卸载了')
      })

      
    const initData = async () => {
      try {
        data.loading = true
        const res = await _this.$api.getInquiryList()
        data.list = res
      } catch (e) {
        console.warn(e)
      } finally {
        data.loading = false
      }
    }

    initData()

      return {
        ...configData,
        ...data,
        getColor,
        getInquiry,
        recall,
        urge
      }
    }
  }
  // export default {
  //   name: 'InquiryTable',
  //   props: {
  //     inquiryList: {
  //       type: Array,
  //       default: () => ([])
  //     }
  //   },
  //   data () {
  //     return {
  //       loading: {
  //         submit: false,
  //         del: false
  //       },
  //       saveLoading: false,
  //       list: [],
  //       currentId: 0
  //     }
  //   },
  //   watch: {
  //     'inquiryList': {
  //       deep: true,
  //       immediate: true,
  //       handler (newV) {
  //         if (!newV.length) return
  //         this.list = this.$clone(newV)
  //         this.list.forEach((inquiry, index) => {
  //           inquiry.index = index + 1
  //           inquiry.prediction = ''
  //           inquiry.annotation = ''
  //           if (!inquiry.result || +inquiry.status === 4) return
  //           if (inquiry.result && +inquiry.risk_assess === 4) {
  //             inquiry.annotation = inquiry.result.result[0].annotation
  //             return
  //           }
  //           let recoveryTime = -Infinity
  //           let finalPrice = 0
  //           let annotation = []
  //           if (!inquiry.result.result || !inquiry.result.result.length) return
  //           let results = inquiry.result.result
  //           results.forEach(res => {
  //             if (res.recovery_time) recoveryTime = Math.max(recoveryTime, Number(res.recovery_time || 0))
  //             if (res.final_price) finalPrice += Number(res.final_price || 0)
  //             if (res.annotation) annotation.push(res.annotation)
  //           })
  //           inquiry.prediction = results.length === 1 ? results[0].prediction || '' : ''
  //           inquiry.recovery_time = recoveryTime === -Infinity ? '' : (+recoveryTime || 0)
  //           inquiry.final_price = finalPrice || 0
  //           if (annotation.length) inquiry.annotation = annotation.length > 1 ? annotation.join('，') : annotation[0]
  //         })
  //       }
  //     }
  //   },
  //   methods: {
  //     view (row) {
  //       this.$emit('openDialog', 'view', row)
  //     },
  //     copy (row) {
  //       let form = {
  //         annotation: row.annotation || '',
  //         delivery_area: row.delivery_area || '',
  //         method: row.method || '',
  //         question_num: row.question_num || '',
  //         sample_num: row.sample_num || '',
  //         sample_require: row.sample_require || '',
  //         time_require: row.time_require || '',
  //         unit_incentive: row.unit_incentive || '',
  //         inquiry_id: 0
  //       }
  //       this.$emit('openDialog', 'create', form)
  //     },
  //     async urge (row) {
  //       try {
  //         this.saveLoading = true
  //         await inquiryApi.urge({inquiry_id: row.inquiry_id})
  //         this.$message.success('已提醒相关处理人')
  //       } catch (e) {
  //         console.warn(e)
  //       } finally {
  //         this.saveLoading = false
  //       }
  //     },
  //     async revoke (row) {
  //       // 撤回询价表
  //       this.saveLoading = true
  //       try {
  //         let res = await inquiryApi.withdrawInquiry({
  //           inquiry_id: row.inquiry_id
  //         })
  //         if (!res) throw new Error('返回信息有误')
  //         this.$message.success('撤回成功')
  //         this.$emit('change')
  //       } catch (e) {
  //         console.warn(e)
  //       } finally {
  //         this.saveLoading = false
  //       }
  //     },

  //   }
  // }
</script>

<style lang="less" scoped>
.status {
  padding: 2px 6px;
  border-radius: 12px;
  box-sizing: border-box;
}
</style>
