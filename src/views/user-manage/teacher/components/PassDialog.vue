<template>
  <el-dialog
    :visible.sync="visibleDialog"
    v-bind="$attrs"
    v-on="$listeners"
    @close="handlerClose"
  >
    <el-form
      ref="passForm"
      style="width: 60%;"
      :model="passForm"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="密码" prop="pass">
        <el-input
          ref="pass"
          v-model="passForm.pass"
          name="password"
          :type="passwordType"
          placeholder="请输入密码"
          autocomplete="off"
        />
        <span class="show-pwd" @click="showPwd('pass')">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input ref="checkPass" v-model="passForm.checkPass" name="password" placeholder="请确认密码" :type="checkPasswordType" autocomplete="off" />
        <span class="show-pwd" @click="showPwd('checkPass')">
          <svg-icon :icon-class="checkPasswordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button class="ml-8" @click="visibleDialog = false">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>

const type = 'password'
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
      passForm: {
        pass: '',
        checkPass: ''
      },
      passwordType: type,
      checkPasswordType: type
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
        pass: [
          { validator: this.validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: this.validateChechPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validatePass(rule, value, callback) {
      const reg = /^\S*(?=\S{6,10})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('密码6-10位，必须包含数字、大小写字母'))
      } else {
        if (this.passForm.checkPass !== '') {
          this.$refs.passForm.validateField('checkPass')
        }
        callback()
      }
    },
    validateChechPass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    showPwd(ref) {
      const typeEnum = {
        'pass': 'passwordType',
        'checkPass': 'checkPasswordType'
      }
      if (this[typeEnum[ref]] === 'password') {
        this[typeEnum[ref]] = ''
      } else {
        this[typeEnum[ref]] = 'password'
      }
      this.$nextTick(() => {
        this.$refs[ref].focus()
      })
    },
    handlerClose() {
      Object.assign(this.$data, this.$options.data())
      this.$refs.passForm.resetFields()
    },
    submitForm() {
      this.$refs.passForm.validate((valid) => {
        if (!valid) return
        const { pass } = this.passForm
        const { id } = this.modifyData
        this.$emit('on-add', { id, pass })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  $dark_gray: #889aa4;
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 2px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
</style>
