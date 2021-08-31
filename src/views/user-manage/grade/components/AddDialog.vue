<template>
  <el-dialog
    :visible.sync="visibleDialog"
    v-bind="$attrs"
    v-on="$listeners"
    @close="handlerClose"
  >
    <el-form
      ref="modifyForm"
      style="width: 60%;"
      :model="modifyForm"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="年级名称" prop="name">
        <el-input v-model="modifyForm.name" placeholder="请输入年级名称" />
      </el-form-item>
      <el-form-item label="是否禁用" prop="status">
        <el-radio-group v-model="modifyForm.status">
          <el-radio :label="commonStatusEnum.DISABLED">是</el-radio>
          <el-radio :label="commonStatusEnum.NORMAL">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button class="ml-8" @click="visibleDialog = false">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>

import { COMON_STATUS_ENUM } from 'enums/common/index.js'

import { isEmpty } from 'lodash-es'

const defaultFields = {
  id: '',
  name: '',
  status: ''
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
      modifyForm: { ...defaultFields },
      commonStatusEnum: Object.freeze(COMON_STATUS_ENUM)
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
      return {}
    }
  },
  watch: {
    modifyData: {
      handler(val) {
        if (isEmpty(val)) {
          this.modifyForm = { ...defaultFields }
        } else {
          const { id, status, name } = val
          this.modifyForm = { id, name, status }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handlerClose() {
      Object.assign(this.$data, this.$options.data())
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
