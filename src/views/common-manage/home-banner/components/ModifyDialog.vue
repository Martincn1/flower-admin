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
      <el-form-item label="类型" prop="title">
        <base-select
          v-model="modifyForm.type"
          placeholder="请选择类型"
          :options="miniConfigList"
          :key-values="{value: 'id', label: 'name'}"
        />
      </el-form-item>
      <el-form-item label="头像">
        <avatar-upload :url.sync="modifyForm.image" :finish.sync="disabled" />
      </el-form-item>
      <el-form-item label="路由" prop="route">
        <el-input v-model.trim="modifyForm.route" />
      </el-form-item>
      <el-form-item label="是否禁用" prop="status">
        <el-radio-group v-model="modifyForm.status">
          <el-radio :label="commonStatusEnum.DISABLED">是</el-radio>
          <el-radio :label="commonStatusEnum.NORMAL">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button class="ml-8" :disabled="disabled" @click="visibleDialog = false">取消</el-button>
      <el-button type="primary" :disabled="disabled" @click="submitForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>

import { COMON_STATUS_ENUM } from 'enums/common/index.js'

import { enumFormItemMap } from 'utils/util'

import { MINI_CONFIG_MODIFY_ENUM } from 'config/fields/modify'

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
    },
    miniConfigList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      modifyForm: enumFormItemMap(MINI_CONFIG_MODIFY_ENUM),
      commonStatusEnum: Object.freeze(COMON_STATUS_ENUM),
      disabled: false
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
        this.modifyForm = enumFormItemMap(MINI_CONFIG_MODIFY_ENUM, val)
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
