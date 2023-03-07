<template>
  <div class="nav-bar-container">
    <el-row :gutter="15">
      <!-- settings.mode是一个模式布局 -->
      <el-col :xs="4" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <svg-icon
            class="icon"
            :name="collapse ? 'sideShow' : 'sideHide'"
            size="16px"
            @click="handleCollapse"
          />
          <template v-if="isBreadcrumb">
            <Breadcrumb />
          </template>
        </div>
      </el-col>
      <el-col :xs="20" :sm="12" :md="12" :lg="12" :xl="12">
        <RightPanel />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
  };
</script>

<script setup>
  import { computed } from 'vue';
  import { useSettingStore } from '@/store/modules/setting';

  import { useI18n } from 'vue-i18n';
  // eslint-disable-next-line no-unused-vars
  const { t } = useI18n();

  const settingStore = useSettingStore();

  const collapse = computed(() => {
    return settingStore.getCollapse;
  });

  const isBreadcrumb = computed(() => {
    return settingStore.getIsBreadcrumb;
  });

  const emit = defineEmits(['handleCollapse']);

  const handleCollapse = () => {
    emit('handleCollapse');
  };
</script>

<style lang="scss" scoped>
  .nav-bar-container {
    position: relative;
    height: $base-nav-bar-height;
    padding-left: $base-padding-12;
    padding-right: $base-padding;
    overflow: hidden;
    user-select: none;
    background: $base-color-white;
    box-shadow: $base-box-shadow;
    .left-panel {
      display: flex;
      align-items: center;
      justify-items: center;
      height: $base-nav-bar-height;
      .icon {
        cursor: pointer;
      }
      :deep(.breadcrumb-container) {
        margin-left: $base-margin-16;
      }
    }
  }
</style>
