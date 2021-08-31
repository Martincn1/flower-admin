<template>
  <el-dialog
    :visible.sync="visibleDialog"
    v-bind="$attrs"
    v-on="$listeners"
    @close="handlerClose"
  >
    <el-form
      ref="modifyForm"
      style="width: 80%;"
      :model="modifyForm"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="	标题" prop="title">
        <el-input v-model.trim="modifyForm.title" />
      </el-form-item>
      <el-form-item label="回答" prop="answer">
        <el-input v-model.trim="modifyForm.answer" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button class="ml-8" @click="visibleDialog = false">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>

import { enumFormItemMap } from 'utils/util'

import { PROBLEM_MODIFY_ENUM } from 'config/fields/modify'

export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    modifyData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      modifyForm: enumFormItemMap(PROBLEM_MODIFY_ENUM)
    }
  },
  computed: {
    visibleDialog: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    rules() {
      return {}
    }
  },
  watch: {
    modifyData: {
      handler(val) {
        this.modifyForm = enumFormItemMap(PROBLEM_MODIFY_ENUM, val)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handlerClose() {
      this.$refs.modifyForm.resetFields()
    },
    submitForm() {
      this.$refs.modifyForm.validate((valid) => {
        if (!valid) return
        this.$emit('on-add', { ...this.modifyForm })
      })
    }
  }
}
</script>
