<template>
  <div class="login-wrapper">
    <div class="login-form">
      <div class="title">单病种科研平台</div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" status-icon>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable size="large">
            <template #prefix>
              <svg-icon name="user" size="20px" color="#000000"/>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="department">
          <el-select style="width: 100%;" v-model="loginForm.department" placeholder="科室-病种" clearable size="large">
            <template #prefix>
              <svg-icon name="params" size="20px" />
            </template>
            <el-option v-for="item in departmentOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" show-password placeholder="请输入密码" clearable size="large">
            <template #prefix>
              <svg-icon name="password" size="20px" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width: 63%" v-model="loginForm.code" placeholder="请输入验证码" clearable size="large">
            <template #prefix>
              <svg-icon name="code" size="20px" />
            </template>
          </el-input>
          <div class="login-code">
            <!-- <img :src="codeUrl" @click="getCode" /> -->
            图片位置
          </div>
        </el-form-item>
        <el-form-item prop="remember">
          <div class="password">
            <el-checkbox v-model="loginForm.remember" label="记住密码"/>
            <span>忘记密码</span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button size="large" style="width: 100%;" color="#2879DA" type="primary" @click="submitForm(loginFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const loginFormRef = ref();
const loginForm = reactive({
  username: 'fc_yaan_admin',
  department: '',
  password: '123456',
  code: '',
  remember: '',
})

const departmentOptions = reactive([
  { label: 'xxx', value: 'xxx' },
  { label: 'yyy', value: 'yyy' },
]);

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  department: [
    { required: true, message: '请选择科室-病种', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ],
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      // 进行登录操作
      store.dispatch('user/login', {...loginForm}).then(() => {
        const routerPath =
          state.redirect === '/404' || state.redirect === '/401' ? '/' : state.redirect;
        router.push(routerPath).catch(() => {});
      })
      .catch(() => {
      });
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

</script>

<style lang="scss" scoped>
  .login-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('@/assets/bg.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .login-form {
      width: 400px;
      height: 470px;
      padding: 45px 28px;
      border-radius: 8px;
      background: #FFFFFF;
      .title {
        height: 20px;
        margin-bottom: 30px;
        font-size: 20px;
        font-weight: bold;
        color: #373E46;
        text-align: center;
      }
      .password {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 14px;
          font-weight: 400;
          color: #2879DA;
          cursor: pointer;
        }
      }
      .login-code {
        width: 33%;
        height: 38px;
        float: right;
        margin-left: 4%;
        img {
          cursor: pointer;
          vertical-align: middle;
          width: 100%;
        }
      }
    }
  }

  .code {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :deep(.el-checkbox__label) {
    color: #6A7787;
  }

  :deep(input::-webkit-input-placeholder) {
    color:#C7CEDD;
  }
  :deep(input::-moz-input-placeholder) {
    color:#C7CEDD;
  }
  :deep(input::-ms-input-placeholder) {
    color:#C7CEDD;
  }
  :deep(input) {
    color: #6A7787;
  }
</style>
