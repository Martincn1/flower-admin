<template>
  <el-dialog
    :visible.sync="visibleDialog"
    v-bind="$attrs"
    v-on="$listeners"
    @close="handlerClose"
  >
    <el-form
      ref="addForm"
      style="width: 80%;"
      :model="addForm"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="标题" prop="name">
        <el-input v-model="addForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="所属课程" prop="course_type_id">
        <base-select
          v-model="addForm.course_id"
          placeholder="请选择课程"
          :options="courseList"
          :key-values="{value: 'id', label: 'name'}"
        />
      </el-form-item>
      <el-form-item label="所属年级" prop="course_type_id">
        <base-select
          v-model="addForm.grade_id"
          placeholder="请选择年级"
          :options="gradeList"
          :key-values="{value: 'id', label: 'name'}"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button class="ml-8" @click="visibleDialog = false">取消</el-button>
      <el-button type="primary" @click="submitForm">确认提交</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { COMMON_REQUEST_ENUM } from 'config/common'
import { mapState } from 'vuex'
export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addForm: {
        title: '',
        course_id: '',
        grade_id: ''
      }
    }
  },
  computed: {
    ...mapState('commonRequest', ['remoteData']),
    courseList() {
      const { COUNT } = COMMON_REQUEST_ENUM
      return this.remoteData[COUNT] ?? []
    },
    gradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      return this.remoteData[GRADE] ?? []
    },
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
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  methods: {
    handlerClose() {
      this.$refs.addForm.resetFields()
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
        if (this.addForm.checkPass !== '') {
          this.$refs.addForm.validateField('checkPass')
        }
        callback()
      }
    },
    validateCheckPass(rule, value, callback) {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },

    submitForm() {
      this.$refs.addForm.validate((valid) => {
        if (!valid) return
        const { name, number, pass } = this.addForm
        this.$emit('on-add', { name, number, pass })
      })
    }
  }
}
</script>
