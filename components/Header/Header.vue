<!-- 整合侧边栏的抽屉、顶栏 -->
<template>
  <div>
    <NavigationDrawer :toggle-event="toggleNavigation" />
    <AppBar
      @toggleNavigation="toggleNavigation=!toggleNavigation"
      @toggleSettings="toggleSettings=!toggleSettings"
    />
    <SettingsDrawer :toggle-event="toggleSettings" />
  </div>
</template>

<script>
import AppBar from './AppBar/AppBar';
import NavigationDrawer from './NavigationDrawer';
import SettingsDrawer from './SettingsDrawer/SettingsDrawer.vue';

export default {
  components: {
    AppBar,
    NavigationDrawer,
    SettingsDrawer
  },
  data: () => ({
    // 因为事件只能向上传递，值只能向下传递
    // 这里向下传递 toggleEvent 触发下面的事件，达到“向下传递事件”的效果
    toggleNavigation: false,
    toggleSettings: false
  })
};
</script>