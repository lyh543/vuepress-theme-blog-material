<script>
// Extensions
import SettingsGroup from '../Template'

export default {
  name: 'ThemeSettings',

  extends: SettingsGroup,

  data() {
    return {
      title: '主题',
      items: [
        {
          value: 'light',
          text: '浅色主题',
          icon: 'mdi-white-balance-sunny',
          callback: () => this.setTheme(false, false),
        },
        {
          value: 'dark',
          text: '深色主题',
          icon: 'mdi-weather-night',
          callback: () => this.setTheme(true, false),
        },
        {
          value: 'system',
          text: '跟随系统',
          icon: 'mdi-desktop-tower-monitor',
          callback: () => this.setTheme(false, true),
        },
      ],
      dark: null,
      system: null,
      matchMedia: (window.matchMedia) ? window.matchMedia('(prefers-color-scheme: dark)') : false,
    };
  },

  computed: {
    // 完成 internalValue 和 this.system & this.dark 的双向绑定
    internalValue: {
      get() {
        return this.system ? 'system' :
          this.dark ? 'dark' : 'light';
      },
      set(val) {
        const set = this.items.find(item => item.value === val)
        set.callback();
        localStorage.setItem('darkMode', val);
      },
    },
  },

  watch: {
    dark(val) {
      this.$vuetify.theme.dark = val;
    },
    system() {
      if (this.system && this.matchMedia)
        this.dark = this.matchMedia.matches;
    },
  },

  created() {
    const val = localStorage.getItem('darkMode');
    this.internalValue = val ? val : 'system';

    if (this.matchMedia)
      this.matchMedia.onchange = ({matches}) => {
        if (this.system)
          this.dark = matches;
      }
  },

  methods: {
    setTheme(dark = false, system = false) {
      this.dark = dark;
      this.system = system;
    },
  }
}
</script>
