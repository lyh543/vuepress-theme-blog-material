<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      代理指南
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      目前阮薇薇点名啦的前端、后端均设在日本 Azure，直连速度不错，用美国等地区的代理反而会变慢。<br>
      如需要，可在代理软件中将以下域名设为直连：<code>app.uestc-msc.com</code>
      <code>api.uestc-msc.com</code> <code>demo4c-my.sharepoint.com</code>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "ProxyGuide",
}
</script>