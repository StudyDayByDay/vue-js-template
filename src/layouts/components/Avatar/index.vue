<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <svg-icon name="user" size="22px"/>
      <div class="user-name">
        {{ userName }}
      </div>
      <svg-icon name="arrowDown" size="8px"/>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="github">Github</el-dropdown-item>
        <el-dropdown-item command="logout" divided>{{ t('navbar.logOut') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
  export default {
    name: 'Avatar',
  };
</script>

<script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { ElMessageBox } from 'element-plus';
  import { setting } from '@/config/setting';
  import { useI18n } from 'vue-i18n';

  const { title, recordRoute } = setting;
  const { t } = useI18n();
  const userName = ref('hu-snail');
  const store = useStore();

  const handleCommand = (command) => {
    switch (command) {
      case 'logout':
        handleLogout();
        break;
      case 'github':
        window.open('https://github.com/hu-snail/vue3-admin-element-template');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    ElMessageBox.confirm(`${t('confirm.msg')}${title}？`, t('confirm.title'), {
      confirmButtonText: t('btn.confirm'),
      cancelButtonText: t('btn.cancel'),
      dangerouslyUseHTMLString: true,
      type: 'warning',
    })
      .then(async () => {
        await store.dispatch('user/logout');
        location.reload();
      })
      .catch(() => {});
  };
</script>

<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    // height: $base-avatar-dropdown-height;
    padding: $base-padding-10;

    .user-name {
      position: relative;
      margin-left: $base-margin-10;
      margin-right: $base-margin-10;
      cursor: pointer;
      color: #6A7787;
      font-weight: bold;
    }
  }
</style>
