<!--
 * @Author: luyao
 * @Date: 2022-03-15 14:37:53
 * @LastEditTime: 2022-11-17 17:13:56
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/components/uploadComp.vue
-->

<template>
  <!--   :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :file-list="fileList" -->
  <el-upload
    name="upload"
    list-type="picture-card"
    ref="uploadRef"
    :data="extraData"
    :drag="drag"
    :action="fileUrl()"
    :show-file-list="true"
    :file-list="fileList"
    :limit="imgLength"
    :accept="format.toString()"
    :auto-upload="true"
    :on-exceed="handleExceed"
    :on-success="handleSuccess"
    :on-error="handleError"
    :before-upload="beforeAvatarUpload"
    :with-credentials="true"
    :multiple="multiple">
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)">
            <el-icon><zoom-in /></el-icon>
          </span>
          <!-- <span
            style="margin-left: 5px"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span> -->
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible" title="预览">
    <img style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, unref } from "vue";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import { ElMessage, UploadProps, UploadUserFile } from "element-plus";
import { computed } from "@vue/reactivity";

const props = defineProps({
  // upload 动态
  uploadObj: {
    type: Object,
    // 当为对象类型设置默认值时必须使用函数返回
    default: () => {
      // 默认参数
      return {
        defaultfilelist: [],
        // defaultfilelist: null,
      };
    },
  },
  drag: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  // 图片最大数量
  imgLength: {
    type: Number,
    default: 5,
  },
  // 文件上传地址
  fileUrl: {
    type: Function || String,
  },
  // 图片最大质量
  maxSize: {
    type: Number,
    default: 5,
  },
  // 文件格式
  format: {
    type: Array,
    default: () => ["image/jpg", "image/jpeg", "image/png"],
  },
  extraData: {
    type: Object,
    default: function () {
      // 默认参数
      return {
        region: "cn",
      };
    },
  },
});

const uploadRef: any = ref(null);
let emit = defineEmits(["fileUrlInfo"]);
let format = ref(computed(() => props.format));
let maxSize = ref(computed(() => props.maxSize));
let fileList: any = ref(computed(() => props.uploadObj.defaultfilelist));
let sendFileList: any = JSON.parse(
  JSON.stringify(props.uploadObj.defaultfilelist)
); // 发出去的数据列表
console.log(sendFileList, "sendFileList");

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile) => {
  let index = sendFileList.findIndex(
    (item) => item.url == uploadFile?.response?.url || uploadFile?.url
  );
  sendFileList.splice(index, 1);
  uploadRef.value.handleRemove(uploadFile);
  emit("fileUrlInfo", sendFileList);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const handleSuccess = (response: any, uploadFile: any, uploadFiles: any) => {
  sendFileList.push(unref(response));
  emit("fileUrlInfo", sendFileList);
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (file) => {
  const isJPG = format.value.includes(file.type);
  const isLt2M = file.size / 1024 / 1024 < maxSize.value;

  if (!isJPG) {
    ElMessage.error("上传图片格式错误!");
    return false;
  }
  if (!isLt2M) {
    ElMessage.error(`上传头像图片大小不能超过 ${maxSize.value}MB!`);
    return false;
  }

  return true;
  // if (rawFile.type !== "image/jpeg") {
  //   ElMessage.error("Avatar picture must be JPG format!");
  //   return false;
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error("Avatar picture size can not exceed 2MB!");
  //   return false;
  // }
  // return true;
};

const handleExceed = (files: string | any[], fileList: string | any[]) => {
  return ElMessage.warning(` 文件数量不得超过 ${props.imgLength} 个`);
};

const handleError = (file) => {
  console.log(file, 123456);
};
defineExpose({ clearFiles });
function clearFiles() {
  console.log("clearFiles ---");
  uploadRef.value.clearFiles();
  props.uploadObj.defaultfilelist = [];
  sendFileList = [];
}
</script>

<style lang="less" scoped>
:deep(.el-upload-list) {
  > li,
  div {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :deep(.el-upload-list--picture-card
      .el-upload-list__item-actions
      span
      + span) {
    margin-left: 5px;
  }
}
</style>
