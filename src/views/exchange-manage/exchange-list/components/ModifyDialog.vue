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
      <el-form-item label="天数" prop="day">
        <el-input v-model.trim="modifyForm.day" />
      </el-form-item>
      <el-form-item label="课程" prop="course_id">
        <base-select
          v-model="modifyForm.course_id"
          :options="courseList"
          :key-values="{value: 'id', label: 'name'}"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button class="ml-8" :disabled="disabled" @click="visibleDialog = false">取消</el-button>
      <el-button type="primary" :disabled="disabled" @click="submitForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>

import { enumFormItemMap } from 'utils/util'

import { EXCHANGE_MODIFY_ENUM } from 'config/fields/modify'

import { mapState } from 'vuex'

import { COMMON_REQUEST_ENUM } from 'config/common'

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
      modifyForm: enumFormItemMap(EXCHANGE_MODIFY_ENUM),
      disabled: false
    }
  },
  computed: {
    ...mapState('commonRequest', ['remoteData']),
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
    },
    courseList() {
      const { COUNT } = COMMON_REQUEST_ENUM
      return this.remoteData[COUNT] || []
    }
  },
  watch: {
    modifyData: {
      handler(val) {
        this.modifyForm = enumFormItemMap(EXCHANGE_MODIFY_ENUM, val)
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
