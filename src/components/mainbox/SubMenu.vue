<template>
    <template v-for="menuInfo in menuArr" :key="menuInfo.path">
        <el-menu-item :index="menuInfo.path" v-if="!menuInfo.children">
            <el-icon>
                <component :is="menuInfo.icon" />
            </el-icon>
            <template #title>{{ menuInfo.name }}</template>
        </el-menu-item>
        <el-sub-menu :index="menuInfo.path" v-else>
            <template #title>
                <el-icon>
                    <component :is="menuInfo.icon" />
                </el-icon>
                <span>{{ menuInfo.name }}</span>
            </template>
            <SubMenu :menuArr="menuInfo.children" />
        </el-sub-menu>
    </template>
</template>

<script setup lang='ts'>
interface IMenu {
    name: string;
    path: string;
    icon: Component;
    children?: IMenu[]
}
interface IProps {
    menuArr: IMenu[]
}
withDefaults(defineProps<IProps>(), {
})
defineOptions({
    name: 'SubMenu'
})
</script>

