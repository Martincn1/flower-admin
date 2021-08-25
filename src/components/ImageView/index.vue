<template>
  <div class="img-relative img-size__inherit">
    <el-image
      v-if="!popover"
      class="img-size__inherit image-view"
      v-bind="$attrs"
      :src="usePathHandler ? pathHandler(src) : src"
      :fit="fit"
      v-on="$listeners"
    >
      <slot slot="placeholder" name="placeholder">
        <div class="placeholder-view">加载中...</div>
      </slot>
      <slot slot="error" name="error">
        <!-- 默认图 -->
        <image-view
          class="img-size__inherit"
          fit="contain"
          :use-path-handler="false"
          :src="defaultSrc"
        >
          <!-- 默认图也没加载出的占位 -->
          <div slot="error" class="placeholder-view"><i class="el-icon-picture-outline" /></div>
        </image-view>
      </slot>
    </el-image>

    <!-- Popover 鼠标悬停弹出图片框 -->
    <el-popover
      v-else
      v-model="isShowPopover"
      placement="right-start"
      trigger="manual"
    >
      <div :style="popoverStyle">
        <img :style="popoverImgStyle" :src="usePathHandler ? pathHandler(src) : src">
      </div>
      <el-image
        slot="reference"
        class="img-size__inherit image-view"
        v-bind="$attrs"
        :src="usePathHandler ? pathHandler(src) : src"
        :fit="fit"
        v-on="$listeners"
        @mouseenter="isShowPopover = true"
        @mouseleave="isShowPopover = false"
      >
        <slot slot="placeholder" name="placeholder">
          <div class="placeholder-view">加载中...</div>
        </slot>
        <slot slot="error" name="error">
          <!-- 默认图 -->
          <image-view
            class="img-size__inherit"
            fit="contain"
            :use-path-handler="false"
            :src="defaultSrc"
          >
            <!-- 默认图也没加载出的占位 -->
            <div slot="error" class="placeholder-view"><i class="el-icon-picture-outline" /></div>
          </image-view>
        </slot>
      </el-image>
    </el-popover>

    <!-- hover后的大图展示图片 -->
    <image-view
      v-if="hoverPreview"
      class="img-preview"
      :src="src"
      :style="hoverPreviewStyle"
      :use-path-handler="usePathHandler"
      :default-src="defaultSrc"
      :path-handler="pathHandler"
    />
  </div>
</template>

<script>
import ImageView from './index.vue'
import { imgPathHandler } from 'utils/filter'

/**
 * 图片视图（拥有默认占位图）
 * 本组件为对 el-image 的封装， 可传入任意 el-image 的 props 和 listener
 *
 * slot[ placeholder ]: 加载占位
 * slot[ error ]: 错误占位
 */
export default {
  name: 'ImageView',
  components: { ImageView },
  props: {
    // 图片路径
    src: {
      type: [String, undefined, null],
      default: ''
    },
    // 默认占位图
    defaultSrc: {
      type: String,
      default: ''
    },
    // 是否使用路径处理器
    usePathHandler: {
      type: Boolean,
      default: true
    },
    // 路径处理器
    pathHandler: {
      type: Function,
      default: imgPathHandler
    },
    // 是否开启hover展示大图效果
    hoverPreview: {
      type: Boolean,
      default: false
    },
    // hover后大图的样式，建议只传width
    hoverPreviewStyle: {
      type: [Object, String],
      default: ''
    },
    // popover弹出框
    popover: {
      type: Boolean,
      default: false
    },
    // popover弹出框的样式
    popoverStyle: {
      type: Object,
      default: () => ({
        width: '400px',
        height: '400px',
        display: 'table-cell',
        verticalAlign: 'middle'
      })
    },
    // popover弹出图片的样式
    popoverImgStyle: {
      type: Object,
      default: () => ({
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'block',
        margin: 'auto'
      })
    },
    fit: {
      type: String,
      default: 'contain'
    }
  },
  data() {
    return {
      isShowPopover: false
    }
  }
}
</script>

<style lang="scss" scoped>
.img-size__inherit {
  width: inherit;
  max-width: inherit;
  height: inherit;
  max-height: inherit;
}

.image-view ::v-deep .el-image__inner {
  max-width: inherit;
  max-height: inherit;
}

.img-relative {
  display: inline-block;
}

.img-relative > .img-preview {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1999; // 子应用层级起始1000，基座的层级起始2000
  display: none;
  width: auto;
  max-width: 60vw;
  height: auto;
  max-height: 60vh;
  background: #fff;
  transform: translate(-50%, -50%);
}

.img-relative:hover > .img-preview {
  display: block;
}

.placeholder-view {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #eee;
}
</style>
