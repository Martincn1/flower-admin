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
      <el-form-item label="奖品名称" prop="name">
        <el-input v-model.trim="modifyForm.name" />
      </el-form-item>
      <el-form-item label="奖品图片">
        <avatar-upload :url.sync="modifyForm.img" :finish.sync="disabled" />
      </el-form-item>
      <el-form-item label="数量" prop="num">
        <el-input v-model.trim="modifyForm.num" />
      </el-form-item>
      <el-form-item label="概率" prop="chance">
        <el-input v-model.trim="modifyForm.chance" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button class="ml-8" :disabled="disabled" @click="visibleDialog = false">取消</el-button>
      <el-button type="primary" :disabled="disabled" @click="submitForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>

import { enumFormItemMap } from 'utils/util'

import { PRIZE_MODIFY_ENUM } from 'config/fields/modify'

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
      modifyForm: enumFormItemMap(PRIZE_MODIFY_ENUM),
      disabled: false
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
    }
  },
  watch: {
    modifyData: {
      handler(val) {
        this.modifyForm = enumFormItemMap(PRIZE_MODIFY_ENUM, val)
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
