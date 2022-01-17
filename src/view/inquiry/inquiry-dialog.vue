<!--
Description
@authors meijie (draltracy@msn.cn)
@date    2022-01-18 03:00:33
@version 1.0.0
-->
<template>
  <el-dialog
    :model-value="visible"
    :width="814"
    title="运营询价">
    <el-form ref="form" :model="form" label-suffix="：" label-width="120px" class="form-wrapper">
      <el-form-item :class="className" :label="label" :prop="prop" :key="prop" v-for="{label, prop, type, placeholder, optionListName, className} in formConfig">
        <el-input 
          v-if="type.includes('input')"
          v-model="form[prop]"
          :type="type.slice(6)"
          style="width:100%"
          :placeholder="placeholder"
          :row="3"/>
        <el-select
          v-if="type === 'select'"
          v-model="form[prop]"
          style="width:100%"
          :placeholder="placeholder">
          <option v-for="option in getOptionList(optionListName)" 
            :key="option.id" 
            :label="option.name"
            :value="option.id"></option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit"
          >提交运营询价</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
  import { reactive, toRaw, toRefs } from 'vue'
  export default {
    name: 'inquiry-dialog',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:visible'],
    setup () {
      let data = reactive({
        form: {
          method: '',
          time_require: '',
          sample_require: '',
          sample_num: '',
          delivery_area: '',
          unit_incentive: '',
          annotation: '',
          question_num: '',
        },
        // 无需改变，设为非响应式
        formConfig: [
          {
            prop: 'method',
            label: '调研方法',
            type: 'select',
            placeholder: '请选择调研方法',
            optionListName: 'methodList',
            className: 'medium'
          },
          {
            prop: 'time_require',
            label: '时间要求',
            type: 'input_text',
            placeholder: '请输入时间要求',
            className: 'medium'
          },
          {
            prop: 'sample_require',
            label: '调研样本要求',
            type: 'input_textarea',
            placeholder: '请输入调研样本要求',
            className: 'large'
          },
          {
            prop: 'delivery_area',
            label: '投放区域',
            type: 'input_text',
            placeholder: '请输入投放区域',
            optionListName: '',
            className: 'medium'
          },
          {
            prop: 'sample_num',
            label: '项目样本量',
            type: 'input_number',
            placeholder: '请输入样本数量',
            optionListName: '',
            className: 'medium'
          },
          {
            prop: 'question_num',
            label: '预估题目数量',
            type: 'select',
            placeholder: '请选择',
            optionListName: 'questionCount',
            className: 'medium'
          },
          {
            prop: 'unit_incentive',
            label: '预估单位激励',
            type: 'input_number',
            placeholder: '请输入预估单位激励',
            className: 'medium'
          },
          {
            prop: 'annotation',
            label: '询价批注',
            type: 'input_textarea',
            placeholder: '请输入批注',
            className: 'large'
          },
        ],
        methodList: [],
        questionCount: [
          {
            id: 0,
            name: '1-10'
          },
          {
            id: 1,
            name: '11-20'
          },
          {
            id: 2,
            name: '21-40'
          },
          {
            id: 3,
            name: '41-60'
          },
          {
            id: 4,
            name: '60以上'
          }
        ]
      })
      const getOptionList = (optionListName) => {
        return toRaw(data[optionListName])
      }
      const cancel = () => {
      }
      const submit = () => {
      }
      return {
        ...toRefs(data),
        getOptionList,
        cancel,
        submit
      }
    }
  }
</script>

<style lang="less" scoped>
  .form-wrapper {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: space-between;
    .medium {
      width: calc(50% - 16px);
    }
    .large {
      width: 100%;
    }
  }
</style>
