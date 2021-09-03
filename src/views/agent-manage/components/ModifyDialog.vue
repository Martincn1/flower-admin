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
      <el-form-item label="单位名称" prop="name">
        <el-input v-model.trim="modifyForm.name" />
      </el-form-item>
      <el-form-item label="负责人联系方式" prop="phone">
        <el-input v-model.trim="modifyForm.phone" />
      </el-form-item>
      <el-form-item label="负责人姓名" prop="user_name">
        <el-input v-model.trim="modifyForm.user_name" />
      </el-form-item>
      <el-form-item label="银行卡" prop="account">
        <el-input v-model.trim="modifyForm.account" />
      </el-form-item>
      <el-form-item label="支行" prop="branch">
        <el-input v-model.trim="modifyForm.branch" />
      </el-form-item>
      <el-form-item label="身份证" prop="id_number">
        <el-input v-model.trim="modifyForm.id_number" />
      </el-form-item>
      <el-form-item label="提成比例" prop="proportion">
        <el-input v-model.trim="modifyForm.proportion" />
      </el-form-item>
      <el-form-item label="税" prop="tax">
        <el-input v-model.trim="modifyForm.tax" />
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

import { enumFormItemMap } from 'utils/util'

import { AGENT_MODIFY_ENUM } from 'config/fields/modify'

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
      modifyForm: enumFormItemMap(AGENT_MODIFY_ENUM),
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
    gradeList() {
      const { GRADE } = COMMON_REQUEST_ENUM
      return this.remoteData[GRADE] ?? []
    }
  },
  watch: {
    modifyData: {
      handler(val) {
        this.modifyForm = enumFormItemMap(AGENT_MODIFY_ENUM, val)
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
