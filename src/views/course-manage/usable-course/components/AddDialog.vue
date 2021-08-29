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
      <el-form-item label="教师姓名" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入教师姓名" />
      </el-form-item>
      <el-form-item label="账号" prop="number">
        <el-input v-model="addForm.number" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          v-model="addForm.pass"
          type="password"
          placeholder="请输入密码"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="addForm.checkPass"
          type="password"
          placeholder="请确认密码"
          autocomplete="off"
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
        name: '',
        number: '',
        pass: '',
        checkPass: ''
      }
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
        ],
        checkPass: [
          { validator: this.validateCheckPass, trigger: 'blur' }
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
