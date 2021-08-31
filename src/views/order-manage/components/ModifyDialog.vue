<template>
  <el-dialog
    :visible.sync="visibleDialog"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="modifyForm"
      style="width: 80%;"
      :model="modifyForm"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="	实付商品总金额" prop="real_amount">
        <el-input v-model.trim="modifyForm.real_amount" type="number" />
      </el-form-item>
      <el-form-item label="物流单号" prop="code">
        <el-input v-model.trim="modifyForm.code" />
      </el-form-item>
      <el-form-item label="发货状态" prop="is_biu">
        <base-select
          v-model="modifyForm.is_biu"
          placeholder="请选择发货状态"
          :options="shipList"
          :key-values="{value: 'code', label: 'label'}"
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

import { SHIP_STATUS_LIST } from 'enums/order-manage/index'

import { enumFormItemMap } from 'utils/util'

import { ORDER_MODIFY_ENUM } from 'config/fields/modify'

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
      modifyForm: enumFormItemMap(ORDER_MODIFY_ENUM)
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
    shipList() {
      return SHIP_STATUS_LIST
    }
  },
  watch: {
    modifyData: {
      handler(val) {
        this.modifyForm = enumFormItemMap(ORDER_MODIFY_ENUM, val)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    submitForm() {
      this.$refs.modifyForm.validate((valid) => {
        if (!valid) return
        this.$emit('on-add', { ...this.modifyForm })
      })
    }
  }
}
</script>
