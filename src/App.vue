<template>
  <el-config-provider :locale="localLanguage">
    <el-scrollbar height="100vh" ref="scroll">
      <router-view />
    </el-scrollbar>
  </el-config-provider>
</template>

<script setup>
  import { computed, ref, watch } from 'vue';

  import i18n from '@/locales';
  import { useRouter } from 'vue-router';
  const locale = i18n.global.locale;

  const localLanguage = computed(() => {
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) return i18n.global.messages.value[locale.value];
    else return i18n.global.messages[locale];
  });

  const scroll = ref(null);

  const router = useRouter();

  watch(
    () => router.currentRoute.value,
    () => {
      scroll.value.setScrollTop(0);
    }
  );
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: $base-font-size-default;
    color: #2c3e50;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
