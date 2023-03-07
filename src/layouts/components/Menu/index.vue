<template>
  <el-scrollbar height="100vh">
    <el-menu
      :default-active="defaultActive"
      :default-openeds="defaultOpened"
      :unique-opened="uniqueOpenedFlag"
      class="el-menu-vertical"
      :class="{ 'is-black': isBlack }"
      :collapse="isCollapse"
      :background-color="menuBgColor"
      router
      :mode="mode"
      @open="handleOpen"
      @close="handleClose"
    >
      <Logo v-if="isLogo" />
      <template v-for="item in routes">
        <template v-if="!item.hidden">
          <MenuItem :item="{ ...item, isBlack }" :key="item.path" />
        </template>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  export default {
    name: 'Menu',
  };
</script>

<script setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useRouteStore } from '@/store/modules/route';
  import { useSettingStore } from '@/store/modules/setting';

  import { setting } from '@/config/setting';
  import { themeConfig } from '@/config/theme';

  const { defaultOpeneds, uniqueOpened } = setting;

  const { themeOptions } = themeConfig;

  const whiteColors = ['#fff', '#ffffff', '#FFF', '#FFF', 'rgb(255, 255, 255)'];

  defineProps({
    isCollapse: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'vertical',
    },
  });

  const uniqueOpenedFlag = ref(uniqueOpened);

  const routeStore = useRouteStore();
  const settingStore = useSettingStore();
  const router = useRouter();
  // theme2
  const theme = computed(() => {
    return settingStore.getTheme;
  });

  const menuBgColor = computed(() => {
    return themeOptions[theme.value].menuBgColor;
  });

  const isBlack = computed(() => {
    return whiteColors.indexOf(menuBgColor.value) === -1;
  });

  const routes = computed(() => {
    return routeStore.getRoutes;
  });

  const isLogo = computed(() => {
    return settingStore.getIsLogo;
  });

  const defaultOpened = computed(() => {
    return defaultOpeneds;
  });

  const defaultActive = computed(() => {
    const { fullPath } = router.currentRoute.value;
    return fullPath || '/index';
  });

  const handleOpen = (key, keyPath) => {
    console.log('open:', key, keyPath);
  };

  const handleClose = (key, keyPath) => {
    console.log('close:', key, keyPath);
  };
</script>

<style lang="scss" scoped>
  .el-menu-vertical {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    width: $base-unfold-width;
    overflow-x: hidden;
    overflow-y: auto;
    // 指定滑轮样式
    @include base-scrollbar;
    &:not(.el-menu--collapse) {
      width: $base-menu-width;
    }
  }
</style>
