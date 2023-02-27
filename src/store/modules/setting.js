import { defineStore } from 'pinia';
import { themeConfig } from '@/config/theme';
import { setting } from '@/config/setting';
import { getLanguage, setLanguage, setSettings, getSettings } from '@/utils';
import store from '@/store';

const { mode, theme, fixedHead, fullScreen, collapse, isBreadcrumb, isLogo, tag } = themeConfig;

const { lang } = setting;

export const useSettingStore = defineStore({
    id: 'setting',
    state: () => ({
        // 配合刷新路由使用
        routerView: true, // 是否显示路由
        isDrawerSetting: false, // 是否打开主题设置
        isMobile: false, // 是否为移动端
        isDrawer: false, // 是否展开移动端菜单
        isFullScreen: false, // 是否显示全屏
        isDark: false, // 是否暗色主题
        collapse,
        fullScreen,
        mode: getSettings() ? getSettings().mode : mode,
        theme,
        fixedHead,
        isBreadcrumb,
        isLogo,
        tag,
        lang: getLanguage() || lang,
    }),
    getters: {
        getRouterView: (state) => state.routerView,
        getIsMobile: (state) => state.isMobile,
        getIsDrawer: (state) => state.isDrawer,
        getIsFullScreen: (state) => state.isFullScreen,
        getIsDark: (state) => state.isDark,
        getTheme: (state) => state.theme,
        getIsDrawerSetting: (state) => state.isDrawerSetting,
        getFullScreen: (state) => state.fullScreen,
        getFixedHead: (state) => state.fixedHead,
        getIsBreadcrumb: (state) => state.isBreadcrumb,
        getIsLogo: (state) => state.isLogo,
        getTag: (state) => state.tag,
        getMode: (state) => state.mode,
        getSettings: (state) => state,
        getLang: (state) => state.lang,
        getCollapse: (state) => state.collapse,
    },
    actions: {
        // 切换展开收起
        changeCollapse() {
            this.collapse = !this.collapse;
        },
        // 切换是否全屏
        changeFullScreen(flag) {
            this.isFullScreen = flag;
        },
        // 切换皮肤
        changeSkin(flag) {
            this.isDark = flag;
            document.documentElement.className = flag? 'dark' : '';
        },
        // 是否刷新路由
        setRouterView() {
            this.routerView = !this.routerView;
        },
        // 是否展开移动端菜单
        changeDrawer(flag) {
            this.isDrawer = flag;
        },
        // 设置主题
        setTheme(theme) {
            this.theme = theme;
        },
        // 是否打开主题设置
        setSettingDrawer(flag) {
            this.isDrawerSetting = flag;
        },
        // 是否显示面包导航
        setBreadcrumb(flag) {
            this.isBreadcrumb = flag;
        },
        // 是否显示标签
        setTag(flag) {
            this.tag = flag;
        },
        // 切换布局
        setMode(mode) {
            this.mode = mode;
        },
        // 切换语言
        changeLanguage(lang) {
            setLanguage(lang);
            this.lang = lang;
        },
        // 设置主题配置信息
        setSettingOptions(options) {
            setSettings(options.value);
            Object.assign(this, { ...options.value });
        },
    }
});

export function useSettingStoreWithOut() {
    return useSettingStore(store);
}