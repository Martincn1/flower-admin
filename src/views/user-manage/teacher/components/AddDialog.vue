<template>
  <el-dialog
    :visible.sync="visibleDialog"
    v-bind="$attrs"
    v-on="$listeners"
    @close="handlerClose"
    @open="handlerOpen"
  >
    <el-form
      ref="addForm"
      style="width: 60%;"
      :model="addForm"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="教师姓名" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入教师姓名" />
      </el-form-item>
      <el-form-item label="账号" prop="number">
        <el-input v-model="addForm.number" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="头像">
        <avatar-upload :url.sync="addForm.image" />
      </el-form-item>
      <el-form-item v-if="!addForm.id" label="密码" prop="pass">
        <el-input
          v-model="addForm.pass"
          type="password"
          placeholder="请输入密码"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="经销商" prop="agent_id">
        <base-select
          v-model="addForm.agent_id"
          :options="agentList"
          :key-values="{value: 'id', label: 'name'}"
        />
      </el-form-item>
      <el-form-item label="年级组" prop="grade_id">
        <base-select
          v-model="addForm.grade_id"
          :options="gradeList"
          :key-values="{value: 'id', label: 'name'}"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button class="ml-8" @click="visibleDialog = false">取消</el-button>
      <el-button type="primary" :disabled="disabled" @click="submitForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { COMMON_REQUEST_ENUM } from 'config/common'

import { mapState, mapActions } from 'vuex'

import { isEmpty, cloneDeep } from 'lodash-es'

const defaultFields = {
  id: '',
  name: '',
  number: '',
  pass: '',
  image: '',
  agent_id: '',
  grade_id: ''
}
export default {
  components: {},
  props: {
    modifyData: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addForm: { ...defaultFields },
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
      return {
        name: [
          { required: true, message: '请输入教师姓名', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
        ],
        number: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { validator: this.letterRule, trigger: 'blur' },
          { validator: this.validatePass, trigger: 'blur' }
        ]
      }
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
        if (isEmpty(val)) {
          this.addForm = { ...defaultFields }
        } else {
          const { agent = {}, grades = {}, id, name, number, pass, image } = val
          this.addForm = cloneDeep({ id, name, number, pass, image: image ?? '', agent_id: agent.id, grade_id: grades.id })
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions('commonRequest', ['fetchSelectList']),
    handlerOpen() {
      !this.gradeList.length && this.getGradeList()
      !this.agentList.length && this.getAgentSelect()
    },
    handlerClose() {
      Object.assign(this.$data, this.$options.data())
      this.$refs.addForm.resetFields()
    },
    uploadSuccess(val) {
      this.addForm.image = val
      this.disabled = false
    },
    letterRule(rule, value, callback) {
      const reg = /^[a-zA-Z0-9_-]{4,18}$/
      if (value === '') {
        callback(new Error('输入内容不能为空'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入字母、数字、下划线'))
      } else {
        callback()
      }
    },
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    },

    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (!valid) return
        this.$emit('on-add', { ...this.addForm })
      })
    },
    async getGradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: GRADE })
    },
    async getAgentSelect() {
      const { AGENT } = COMMON_REQUEST_ENUM
      await this.fetchSelectList({ type: AGENT })
    }
  }
}
</script>
