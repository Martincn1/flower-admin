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
      <el-form-item label="推送课程" prop="push_course_id">
        <base-select
          v-model="modifyForm.push_course_id"
          placeholder="请选择年级"
          :options="pushCourseList"
          :key-values="{value: 'id', label: 'title'}"
        />
      </el-form-item>
      <el-form-item label="文字" prop="word_id">
        <base-select
          v-model="modifyForm.word_id"
          placeholder="请选择年级"
          :options="pushWordList"
          :key-values="{value: 'id', label: 'title'}"
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

import { PUSH_WORD_MODIFY_ENUM } from 'config/fields/modify'

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
      modifyForm: enumFormItemMap(PUSH_WORD_MODIFY_ENUM)
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
    pushCourseList() {
      const { PUSH_COURSE } = COMMON_REQUEST_ENUM
      return this.remoteData[PUSH_COURSE] ?? []
    },
    pushWordList() {
      const { PUSH_WORD } = COMMON_REQUEST_ENUM
      return this.remoteData[PUSH_WORD] ?? []
    }
  },
  watch: {
    modifyData: {
      handler(val) {
        this.modifyForm = enumFormItemMap(PUSH_WORD_MODIFY_ENUM, val)
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
