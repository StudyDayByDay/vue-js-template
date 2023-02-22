<template>
  <div v-if="store.getters['setting/routerView']" class="app-main-container">
    <router-view v-slot="{ Component }" class="app-main-height">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'AppMain',
  };
</script>

<script setup>
  import { useStore } from 'vuex';

  const store = useStore();
</script>

<style lang="scss" scoped>
  .app-main-container {
    position: relative;
    box-sizing: border-box;
    width: $base-width;
    overflow: hidden;
    text-align: left;
    .app-main-height {
      min-height: $app-main-min-height;
    }
  }
</style>
