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

export default {
  name: 'AvatarUpload',
  props: {
    image: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imageUrl: this.image,
      percentage: 0,
      disabled: false
    }
  },
  methods: {
    errorHandler(err) {
      console.error(err)
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },

    async uploadImage(params) {
      this.imageUrl = ''
      this.percentage = 0
      const formData = new FormData()
      const file = params.file

      formData.append('file', file)

      const { _success, data } = await uploadFile(formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: ({ loaded, total }) => {
          if (this.percentage !== 100) {
            this.disabled = true
            this.percentage = (loaded / total).toFixed(2) * 100 | 0
          }
        }
      })
      if (!_success) {
        this.$message.error(data)
        return
      }
      this.disabled = false
      this.imageUrl = data.url
      this.$emit('upload-success', this.imageUrl)
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
