<template>
  <div class="admin-container">
    <el-container>
      <Menu :isCollapse="isCollapse" />
      <el-container class="container" :style="{ left: isCollapse ? '58px' : '220px' }">
        <el-header
          class="header"
          :class="{ notag: !tag }"
          height="50px"
          :style="{ left: isCollapse ? '65px' : '220px' }"
        >
          <NavBar @handleCollapse="handleCollapse" />
          <template v-if="tag">
            <TabBar />
          </template>
        </el-header>
        <el-main class="main" :class="{ notag: !tag }">
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
    <el-backtop />
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useSettingStore } from '@/store/modules/setting';
  const settingStore = useSettingStore();

  const tag = computed(() => {
    return settingStore.getTag;
  });

  const isCollapse = computed(() => {
    return settingStore.getCollapse;
  });

  const handleCollapse = () => {
    settingStore.changeCollapse();
  };
</script>

<style lang="scss" scoped>
  .admin-container {
    position: relative;
    background-color: $base-frame-bg-color;
    .container {
      position: absolute;
      right: 0;
      transition: all $base-transition-time-4;
    }
    .header {
      padding: 0;
      transition: all $base-transition-time-4;
      &.fixed {
        position: fixed;
        top: 0;
        right: 0;
        z-index: $base-z-index-999;
      }
    }
    .main {
      position: relative;
      top: $base-main-vertical-top;
      overflow-y: auto;
      padding: $base-padding-24;
      &[class='el-main main notag'] {
        top: $base-main-notag-top;
      }
      background-color: $base-content-bg-color;
    }
  }
</style>
