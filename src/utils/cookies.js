import { setting } from '@/config/setting';
const { langKey, themeKey } = setting;
import Cookies from 'js-cookie';

function getLanguage() {
  return Cookies.get(langKey);
}

function setLanguage(lang) {
  return Cookies.set(langKey, lang);
}

function getSettings() {
  const settings = Cookies.get(themeKey);
  return settings ? JSON.parse(settings) : null;
}

function setSettings(theme) {
  return Cookies.set(themeKey, JSON.stringify(theme));
}

export { getLanguage, setLanguage, getSettings, setSettings };
