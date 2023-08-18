<template>
    <el-upload class=" w-44 h-44 rounded-lg overflow-hidden flex items-center border-dashed border-2 justify-center"
        :auto-upload="false" :show-file-list="false" @change="handleUploadFileChange">
        <img v-if="fileForm.avatar" :src="userAvatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon" :size="28">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup lang='ts'>
import { Plus } from '@element-plus/icons-vue'
import type { UploadFile, UploadRawFile } from 'element-plus'

interface IProps {
    imageUrl: string
}

const props = withDefaults(defineProps<IProps>(), {
    imageUrl: ''
})
const fileForm = reactive({
    avatar: props.imageUrl
})
const userAvatar = computed(() => fileForm.avatar.startsWith('blob') ? fileForm.avatar : 'http://localhost:8111' + fileForm.avatar)
const emit = defineEmits<{
    (e: 'onUploadChange', url: string, file: UploadRawFile): void
}>()
const handleUploadFileChange = (uploadFile: UploadFile) => {
    fileForm.avatar = URL.createObjectURL(uploadFile.raw!)
    const file = uploadFile.raw!
    emit('onUploadChange', fileForm.avatar, file)
}
watch(() => props.imageUrl, (newVal) => {
    fileForm.avatar = newVal
})
</script>
