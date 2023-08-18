<template>
    <div>
        <Particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" :options="options" />
    </div>
    <div class="h-screen w-full flex flex-col justify-center items-center">
        <div class="w-1/4 absolute">
            <el-form class="min-w-fit" ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon>
                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" />
                </el-form-item>
                <el-form-item>
                    <el-button class="w-full" type="primary" @click="handleLoginClick(ruleFormRef)">
                        Login
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from "vue-router";
import { LoginRuleForm } from '@/types/Login'
import type { FormInstance, FormRules } from 'element-plus'
import { LOGIN } from "@/api/apis/login.api";
import { userStore } from '@/store/userStore'
import { loadFull } from "tsparticles"

const navigate = useRouter()
const user = userStore()
const ruleForm = reactive<LoginRuleForm>({
    username: '',
    password: ''
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<LoginRuleForm>>({
    username: [
        { required: true, message: 'Please input Activity username', trigger: 'blur' },
        { min: 5, max: 15, message: 'Length should be 5 to 15', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please input Activity password', trigger: 'blur' },
        { min: 6, max: 15, message: 'Length should be 6 to 15', trigger: 'blur' },
    ]
})
const handleLoginClick = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                const res = await LOGIN(ruleForm)
                if (res.code === 1) {
                    localStorage.setItem('token', JSON.stringify(res.data.token))
                    user.setUser(res.data.user)
                    navigate.push('/index')
                }
            } catch (error) {
                console.log('error', error)
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

const particlesInit = async (engine: any) => {
    await loadFull(engine)
}

const particlesLoaded = async (container: any) => {
    console.log('Particles container loaded', container)
}
const options = reactive({
    background: {
        color: {
            value: '#000' // 粒子颜色
        }
    },
    fpsLimit: 60,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push' // 可用的click模式有: "push", "remove", "repulse", "bubble"。
            },
            onHover: {
                enable: true,
                mode: 'grab' // 可用的hover模式有: "grab", "repulse", "bubble"。
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff', // '#dedede'。线条颜色。
            distance: 150, // 线条长度
            enable: true, // 是否有线条
            opacity: 0.5, // 线条透明度。
            width: 1 // 线条宽度。
        },
        collisions: {
            enable: false
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 4, // 粒子运动速度。
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80 // 粒子数量。
        },
        opacity: {
            value: 0.5 // 粒子透明度。
        },
        shape: {
            type: 'circle' // 可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
        },
        size: {
            random: true,
            value: 5
        }
    },
    detectRetina: true
})
</script>