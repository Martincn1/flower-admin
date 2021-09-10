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
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入课程名称" />
      </el-form-item>
      <el-form-item label="课程类型" prop="course_type_id">
        <el-radio-group v-model="addForm.course_type_id" @change="typeChange">
          <el-radio v-for="item in typeList" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="course-photo" label="课程图片" prop="img">
        <el-input
          v-model="addForm.img"
          type="text"
          placeholder="请输入课程图片"
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
import { COMMON_REQUEST_ENUM } from 'config/common'
import { mapState } from 'vuex'
import { enumFormItemMap } from 'utils/util'
import { COURSE_MODIFY_ENUM } from 'config/fields/modify'
import { isEmpty } from 'lodash-es'

export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    addData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isEdit: false,
      disabled: false,
      addForm: {
        name: '',
        img: '',
        course_type_id: ''
      }
    }
  },
  computed: {
    ...mapState('commonRequest', ['remoteData']),
    typeList() {
      const { COURSE_TYPE } = COMMON_REQUEST_ENUM
      return this.remoteData[COURSE_TYPE] ?? []
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
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
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
          this.addForm = enumFormItemMap(COURSE_MODIFY_ENUM, val)
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    typeChange(e) {
      console.log(e, 'e')
    },
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
        console.log(this.isEdit, 'this.isEdit')
        if (this.isEdit) {
          this.$emit('on-edit', this.addForm)
        } else {
          this.$emit('on-add', this.addForm)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.course-photo {
  .el-input {
    width: 379px;
    margin-right: 20px;
    margin-bottom: 10px;
  }
}
/deep/ .el-radio {
  margin-bottom: 10px;
}
</style>
