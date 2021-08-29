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
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="modifyForm.sex">
          <el-radio :label="sexNameEnum.MAN">男</el-radio>
          <el-radio :label="sexNameEnum.WOMEN">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="modifyForm.phone" />
      </el-form-item>
      <el-form-item label="是否禁用" prop="status">
        <el-radio-group v-model="modifyForm.status">
          <el-radio :label="commonStatusEnum.DISABLED">是</el-radio>
          <el-radio :label="commonStatusEnum.NORMAL">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属老师" prop="agent_id">
        <base-select
          v-model="modifyForm.teacher_id"
          :options="teacherList"
          :key-values="{value: 'id', label: 'name'}"
        />
      </el-form-item>
      <el-form-item label="所属年级" prop="grade_id">
        <base-select
          v-model="modifyForm.grade_id"
          :options="gradeList"
          :key-values="{value: 'id', label: 'name'}"
        />
      </el-form-item>
      <el-form-item label="经销商" prop="grade_id">
        <base-select
          v-model="modifyForm.agent_id"
          :options="agentList"
          :key-values="{value: 'id', label: 'name'}"
        />
      </el-form-item>
      <el-form-item label="线上/线下" prop="line">
        <base-select
          v-model="modifyForm.line"
          placeholder="请选择线上/线下"
          :options="lineList"
          :key-values="{value: 'code', label: 'label'}"
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

import { SEX_NAME_ENUM, COMON_STATUS_ENUM } from 'enums/common/index.js'

import { LINE_MODE_MAP } from 'enums/user-manage/index'

import { enumObj2CodeLabArr, enumFormItemMap } from 'utils/util'

import { COMMON_REQUEST_ENUM } from 'config/common'

import { MEMBER_MODIFY_ENUM } from 'config/fields/modify'

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
      modifyForm: enumFormItemMap(MEMBER_MODIFY_ENUM),
      sexNameEnum: Object.freeze(SEX_NAME_ENUM),
      commonStatusEnum: Object.freeze(COMON_STATUS_ENUM)
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
    lineList() {
      return enumObj2CodeLabArr(LINE_MODE_MAP)
    },
    teacherList() {
      const { TEACHER } = COMMON_REQUEST_ENUM
      return this.remoteData[TEACHER] || []
    },
    gradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      return this.remoteData[GRADE] || []
    },
    agentList() {
      const { AGENT } = COMMON_REQUEST_ENUM
      return this.remoteData[AGENT] || []
    }
  },
  watch: {
    modifyData: {
      handler(val) {
        this.modifyForm = enumFormItemMap(MEMBER_MODIFY_ENUM, val)
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
