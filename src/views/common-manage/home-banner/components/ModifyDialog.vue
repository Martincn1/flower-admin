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
      <el-form-item label="课程标题" prop="title">
        <el-input v-model.trim="modifyForm.title" />
      </el-form-item>
      <el-form-item label="文字标题" prop="word_title">
        <el-input v-model.trim="modifyForm.word_title" />
      </el-form-item>
      <el-form-item label="年级ID" prop="grade_id">
        <base-select
          v-model="modifyForm.grade_id"
          placeholder="请选择年级"
          :options="gradeList"
          :key-values="{value: 'id', label: 'name'}"
        />
      </el-form-item>
      <el-form-item label="推送时间" prop="push_time">
        <el-date-picker
          v-model="modifyForm.push_time"
          type="date"
          clearable
          placeholder="选择推送时间"
          value-format="timestamp"
        />
      </el-form-item>
      <el-form-item label="结素时间" prop="end_time">
        <el-date-picker
          v-model="modifyForm.end_time"
          type="date"
          clearable
          placeholder="选择结束时间"
          value-format="timestamp"
        />
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

import { PUSH_COURSE_MODIFY_ENUM } from 'config/fields/modify'

import { COMMON_REQUEST_ENUM } from 'config/common'

import { mapState } from 'vuex'

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
      modifyForm: enumFormItemMap(PUSH_COURSE_MODIFY_ENUM)
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
    gradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      return this.remoteData[GRADE] ?? []
    }
  },
  watch: {
    modifyData: {
      handler(val) {
        this.modifyForm = enumFormItemMap(PUSH_COURSE_MODIFY_ENUM, val)
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
