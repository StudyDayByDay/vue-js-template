<template>
  <span
    class="icon-hover skin-wrapper"
    :title="isDark ? t('navbar.noFull') : t('navbar.full')"
  >
    <component
      theme="filled"
      size="16"
      :fill="color"
      :strokeWidth="4"
      :is="isDark ? 'icon-moon' : 'icon-sun-one'"
      @click="handleClick"
    />
  </span>
</template>

<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useI18n } from 'vue-i18n';

  const store = useStore();

  defineProps({
    color: {
      type: String,
      default: '#666',
    },
  });

  const { t } = useI18n();

  const isDark = computed(() => {
    return store.getters['setting/isDark'];
  });
  const handleClick = () => {
    store.dispatch('setting/changeSkin', !isDark.value);
  };
</script>

<style lang="scss" scoped>
  .skin-wrapper {
    padding: 20px 10px;
  }
</style>
