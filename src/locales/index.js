import { createI18n } from 'vue-i18n';

import { getLanguage } from '@/utils';

import elementEnLocale from 'element-plus/lib/locale/lang/en';
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn';

// User defined lang
import enLocale from './lang/en';
import zhLocale from './lang/zh-cn';

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  'zh-cn': {
    ...zhLocale,
    ...elementZhLocale,
  },
};

export const getLocale = () => {
  // 获取cookie里面的语言，有的话就用
  const cookieLanguage = getLanguage();
  if (cookieLanguage) {
    return cookieLanguage;
  }
  // 没有，就用浏览器的语言
  const language = navigator.language.toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }

  return 'zh';
};

const i18n = createI18n({
  // 设置语言
  locale: getLocale(),
  // 设置信息
  messages: messages,
});

export default i18n;
