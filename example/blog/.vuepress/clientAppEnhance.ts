import { defineClientAppEnhance } from '@vuepress/client';
import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';
import * as components from 'vuetify/components';

// import './styles/index.scss'

export default defineClientAppEnhance(({ app, router }) => {
  const vuetify = createVuetify({ components, directives });
  // app.use(vuetify);
});
