<template>
  <el-upload
    class="avatar-uploader"
    action="#"
    :show-file-list="false"
    :on-error="errorHandler"
    :before-upload="beforeAvatarUpload"
    :http-request="uploadImage"
    :disabled="disabled"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-if="!imageUrl && !disabled" class="el-icon-plus avatar-uploader-icon" />
    <div v-if="disabled" class="progress">
      <el-progress :width="100" type="circle" :percentage="percentage" />
    </div>
  </el-upload>
</template>

<script>
import { uploadFile } from 'api/common/index'

import Compressor from 'compressorjs'

export default {
  name: 'AvatarUpload',
  props: {
    url: {
      type: String,
      required: true
    },
    finish: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      percentage: 0
    }
  },
  computed: {
    imageUrl: {
      get() {
        return this.url
      },
      set(val) {
        return this.$emit('update:url', val)
      }
    },
    disabled: {
      get() {
        return this.finish
      },
      set(val) {
        return this.$emit('update:finish', val)
      }
    }
  },
  methods: {
    errorHandler(err) {
      console.error(err)
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传头像图片格式不准确!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },

    compressImg() {

    },

    uploadImage(params) {
      this.percentage = 0
      this.imageUrl = ''
      const _this = this
      // 这里需要对图片进行压缩
      new Compressor(params.file, {
        quality: 0.4,
        async success(result) {
          const formData = new FormData()
          const file = result
          formData.append('file', file)

          const { _success, data } = await uploadFile(formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: ({ loaded, total }) => {
              if (_this.percentage !== 100) {
                _this.disabled = true
                _this.percentage = (loaded / total).toFixed(2) * 100 | 0
              }
            }
          })
          if (!_success) {
            _this.$message.error(data)
            return
          }
          _this.disabled = false
          _this.imageUrl = data.url
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .avatar-uploader {
    /deep/ .el-upload {
      width: 100px;
      height: 100px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .avatar {
        width: 100px;
        height: 100px;
        display: block;
      }
      .progress {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
</style>
