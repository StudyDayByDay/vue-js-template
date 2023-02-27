<template>
  <div class="icon-hover icon-lang">
    <el-dropdown>
      <icon-translate theme="filled" size="16" :fill="color" :strokeWidth="4" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in languages"
            :key="item.value"
            :disabled="language == item.value"
          >
            <span @click="handleSetLanguage(item.value)">{{ item.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
  import { reactive, computed } from 'vue';
  import { useSettingStore } from '@/store/modules/setting';
  import { useRoute } from 'vue-router';
  import i18n from '@/locales';
  import { getPageTitle } from '@/utils';
  defineProps({
    color: {
      type: String,
      default: '#666',
    },
  });

  const route = useRoute();
  const languages = reactive([
    {
      name: '简体中文',
      value: 'zh-cn',
    },
    {
      name: 'English',
      value: 'en',
    },
  ]);

  const settingStore = useSettingStore();
  const language = computed(() => {
    return settingStore.lang;
  });
  const handleSetLanguage = (lang) => {
    settingStore.changeLanguage(lang);
    i18n.global.locale.value = lang;
    document.title = getPageTitle(i18n.global.t(route.meta.title));
  };
</script>

<style lang="scss" scoped>
  .icon-lang {
    padding: 20px 10px;
  }
</style>
