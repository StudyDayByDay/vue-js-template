<template>
  <div @click="handleClick" class="logo-wrapper" :class="{ unfold: collapse }">
    <svg-icon name="logo" size="35px" />
    <span class="logo-title" :style="{ color: textColor }" v-if="!collapse"> 专科数据平台 </span>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
  };
</script>

<script setup>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useSettingStore } from '@/store/modules/setting';

  import { themeConfig } from '@/config/theme';
  const { themeOptions } = themeConfig;

  const settingStore = useSettingStore();
  const router = useRouter();

  const collapse = computed(() => {
    return settingStore.getCollapse;
  });

  const textColor = computed(() => {
    const whiteColors = ['#fff', '#ffffff', '#FFF', '#FFF', 'rgb(255, 255, 255)'];
    const color = themeOptions[settingStore.getTheme].menuBgColor;
    return whiteColors.indexOf(color) !== -1 ? '#333' : '#fff';
  });

  const handleClick = () => {
    router.replace('/');
  };
</script>
<style lang="scss" scoped>
  .logo-wrapper {
    display: flex;
    align-items: center;
    // justify-content: center;
    width: $base-logo-width;
    padding-left: 11.5px;
    cursor: pointer;
    &.unfold {
      width: $base-unfold-width;
      padding: 12.5px 11.5px;
      line-height: $base-logo-height;
    }

    .logo-title {
      display: inline-block;
      max-width: calc(246px - 60px);
      padding-left: $base-padding-10;
      overflow: hidden;
      font-size: $base-font-size-big;
      font-weight: bold;
      line-height: $base-logo-height;
      color: $base-logo-color;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
  }
</style>
