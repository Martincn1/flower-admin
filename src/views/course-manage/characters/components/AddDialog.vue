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
      <el-form-item label="文字" prop="title">
        <el-input v-model="addForm.title" placeholder="请输入教师姓名" />
      </el-form-item>
      <el-form-item class="course-photo" label="图片" prop="img">
        <el-input
          v-model="addForm.img"
          type="text"
          placeholder="请输入图片"
          autocomplete="off"
        />
        <avatar-upload :url.sync="addForm.img" :finish.sync="disabled" />
      </el-form-item>
      <el-form-item class="course-photo" label="动态图片" prop="gif">
        <el-input
          v-model="addForm.gif"
          type="text"
          placeholder="请输入动态图片"
          autocomplete="off"
        />
        <avatar-upload :url.sync="addForm.img" :finish.sync="disabled" />
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
import { WORD_MODIFY_ENUM } from 'config/fields/modify'
import { isEmpty } from 'lodash-es'

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
  watch: {
    addData: {
      handler(val) {
        if (!isEmpty(val)) {
          this.isEdit = true
          this.addForm = enumFormItemMap(WORD_MODIFY_ENUM, val)
        }
      },
      deep: true,
      immediate: true
    }
  },
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
