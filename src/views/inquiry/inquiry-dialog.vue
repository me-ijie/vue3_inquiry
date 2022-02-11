<!--
Description 询价弹窗
@authors meijie (draltracy@msn.cn)
@date    2022-01-18 03:00:33
@version 1.0.0
-->
<template>
  <div>
    <!-- <div ref="sampleRequire" class="wangeditor"></div> -->
    <el-dialog
      :model-value="visible"
      :width="814"
      @close="cancel"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="运营询价">
      <el-form ref="inquiry" :model="form" :disabled="isPreview" label-suffix="：" label-width="120px" class="form-wrapper">
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
            <el-option v-for="option in getOptionList(optionListName)" 
              :key="option.id" 
              :label="option.name"
              :value="option.id"></el-option>
          </el-select>

          <!-- <template v-if="prop === 'sample_require'">
            <div v-show="isPreview" class="el-textarea is-disabled"><p class="el-textarea__inner" style="height:200px;overflow-y:auto;" v-html="form.sample_require"></p></div>
            <div v-show="!isPreview" ref="sampleRequire" class="wangeditor"></div>
          </template> -->

        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">提交运营询价</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import { reactive, ref, toRaw, toRefs, readonly, watch, getCurrentInstance } from 'vue'
  // import WangEditor from 'wangeditor'
  export default {
    name: 'inquiry-dialog',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      isPreview: {
        type: Boolean,
        default: false
      },
      inquiry: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    emits: ['update:visible', 'updateList'],
    setup (props, ctx) {
      // ref 数据
      let sampleRequire = ref(null)

      // 响应式数据
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
        inquiryEditor: {}
      })
      
      // 只读数据
      const configData = readonly({
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
        methodList: [
          {
            id: 1,
            name: 'ezTest'
          },
          {
            id: 2,
            name: 'ezTalk'
          },
          {
            id: 4,
            name: 'ezContent'
          },
          {
            id: 7,
            name: 'SaaS全套服务使用（年单签约）'
          },
          {
            id: 3,
            name: 'SaaS体验与使用（非年单签约）'
          },
          {
            id: 8,
            name: 'vTalk'
          },
          {
            id: 6,
            name: '非调研项目'
          },
          {
            id: 5,
            name: '快速测试'
          }
        ],
        questionCount: [
          {
            id: 1,
            name: '1-10'
          },
          {
            id: 2,
            name: '11-20'
          },
          {
            id: 3,
            name: '21-40'
          },
          {
            id: 4,
            name: '41-60'
          },
          {
            id: 5,
            name: '60以上'
          }
        ]
      })
      const { proxy: _this } = getCurrentInstance()

      // watch
      watch(() => props.inquiry,(newVal) => {
        for (let key in data.form) {
          data.form[key] = newVal[key]
        }
      })

      // 方法
      const getOptionList = function (optionListName) {
        return toRaw(configData[optionListName])
      }

      const cancel = () => {
        ctx.emit('update:visible', false)
        for (let key in data.form) {
          data.form[key] = ''
        }
      }

      const submit = async () => {
        try {
          data.loading = true
          const inquiry = _this.$clone(data.form)
          inquiry.method && (inquiry.method = configData.methodList[inquiry.method].name)
          inquiry.question_num && (inquiry.question_num = configData.questionCount[inquiry.question_num].name)
          await _this.$api.add({data: JSON.stringify(inquiry)})
          _this.$message.success('操作成功！')
          ctx.emit('update:visible', false)
          ctx.emit('updateList')
        } catch (e) {
          console.warn(e)
        } finally {
          data.loading = false
        }
      }

      return {
        ...configData,
        ...toRefs(data),
        sampleRequire,
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
