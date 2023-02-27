<template>
  <div class="right-panel">
    <!-- <icon-theme
      class="icon-hover theme"
      :title="t('navbar.theme')"
      theme="outline"
      :strokeWidth="4"
      size="16"
      :fill="color"
      @click="handleChangeTheme"
    /> -->
    <FullScreen :color="color" v-if="settings.fullScreen" />
    <LangChange :color="color" />
    <SkinChange :color="color" />
    <Avatar />
    <ThemeSetting />
  </div>
</template>

<script>
  export default {
    name: 'RightPanel',
  };
</script>

<script setup>

  import FullScreen from '@/components/FullScreen/index.vue';
  import LangChange from '@/components/LangChange/index.vue';
  import SkinChange from '@/components/SkinChange/index.vue';

  import { useI18n } from 'vue-i18n';
  import { useSettingStore } from '@/store/modules/setting';

  import { computed} from 'vue';
  defineProps({
    color: {
      type: String,
      default: '#666',
    },
  });

  const { t } = useI18n();
  const settingStore = useSettingStore();

  const settings = computed(() => {
    return settingStore.getSettings;
  });

  const handleChangeTheme = () => {
    settingStore.setSettingDrawer(true);
  };
</script>

<style lang="scss" scoped>
  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-bar-height;
    .msg-badge {
      :deep(.el-badge__content.is-fixed) {
        right: calc(10px + var(--el-badge-size) / 2);
      }
    }
    .refresh,
    .theme {
      padding: $base-padding-20-10;
    }
  }
  .message-box {
    padding: $base-padding-5-15;
    :deep(.el-tabs__active-bar) {
      width: $base-tab-width_active !important;
    }
  }
</style>
