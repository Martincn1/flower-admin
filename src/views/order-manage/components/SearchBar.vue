<template>
  <el-form
    ref="form"
    :model="searchObj"
    inline
    class="padding-16"
  >
    <el-form-item label="收货人姓名" prop="name">
      <el-input v-model.trim="searchObj.name" placeholder="请输入收货人姓名" clearable />
    </el-form-item>
    <el-form-item label="商品名" prop="goods_name">
      <el-input v-model.trim="searchObj.goods_name" placeholder="请输入商品名" clearable />
    </el-form-item>
    <el-form-item label="物流单号" prop="code">
      <el-input v-model.trim="searchObj.code" placeholder="请输入物流单号" clearable />
    </el-form-item>
    <el-form-item label="订单号" prop="order_no">
      <el-input v-model.trim="searchObj.order_no" placeholder="请输入订单号" clearable />
    </el-form-item>
    <el-form-item label="支付状态" prop="status">
      <base-select
        v-model="searchObj.status"
        placeholder="请选择发货状态"
        :options="statusList"
        :key-values="{value: 'code', label: 'label'}"
      />
    </el-form-item>
    <el-form-item label="发货状态" prop="is_biu">
      <base-select
        v-model="searchObj.is_biu"
        placeholder="请选择发货状态"
        :options="shipList"
        :key-values="{value: 'code', label: 'label'}"
      />
    </el-form-item>
    <el-form-item label="订单状态" prop="order_status">
      <base-select
        v-model="searchObj.order_status"
        placeholder="请选择订单状态"
        :options="orderStatusList"
        :key-values="{value: 'code', label: 'label'}"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchHandler">查询</el-button>
      <el-button type="danger" @click="resetHandler">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import searchMixins from 'mixins/search-mixins'

import { PAID_STATUS_LIST, SHIP_STATUS_LIST, ORDER_STATUS_LIST } from 'enums/order-manage/index'

export default {
  components: {},
  mixins: [searchMixins],
  props: {},
  data() {
    return {
      searchObj: {}
    }
  },
  computed: {
    statusList() {
      return PAID_STATUS_LIST
    },
    shipList() {
      return SHIP_STATUS_LIST
    },
    orderStatusList() {
      return ORDER_STATUS_LIST
    }
  }
}
</script>
