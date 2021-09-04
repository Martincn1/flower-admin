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
      <el-form-item label="打款状态" prop="is_pay">
        <base-select
          v-model="modifyForm.is_pay"
          placeholder="请选择是否打款"
          :options="paidStatusList"
          :key-values="{value: 'code', label: 'label'}"
        />
      </el-form-item>
      <el-form-item label="remarks" prop="备注">
        <el-input v-model.trim="modifyForm.remarks" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button class="ml-8" :disabled="disabled" @click="visibleDialog = false">取消</el-button>
      <el-button type="primary" :disabled="disabled" @click="submitForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>

import { enumFormItemMap, enumObj2CodeLabArr } from 'utils/util'

import { WITH_DRAWAL_ENUM } from 'config/fields/modify'

import { PAID_STATUS_MAP } from 'enums/exchange-manage'

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
      modifyForm: enumFormItemMap(WITH_DRAWAL_ENUM),
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
    },
    paidStatusList() {
      return enumObj2CodeLabArr(PAID_STATUS_MAP)
    }
  },
  watch: {
    modifyData: {
      handler(val) {
        this.modifyForm = enumFormItemMap(WITH_DRAWAL_ENUM, val)
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
