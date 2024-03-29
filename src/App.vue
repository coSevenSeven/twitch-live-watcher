<script setup lang="ts">
// import './samples/node-api'
import { storeToRefs } from 'pinia'
import { ipcRenderer } from 'electron'
import useFollow from './store/follow'
import useConfig from './store/config'
import useDownload from './store/download'
import Notification from './components/Notification.vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

const route = useRoute()

const config = useConfig()

const follow = useFollow()

const download = useDownload()

const { isWatchOnline } = storeToRefs(follow)

const openDev = () => ipcRenderer.send('open:devTool')

watch(isWatchOnline, (newVal, oldVal) => {
  follow.clearTimer()

  download.clearTimer()

  if (!newVal) return

  follow.setCheckOnlineTimer()

  download.setCheckDownloadTimer()
})

onMounted(async () => {
  await Promise.all([
    config.getConfig(),
    follow.getFollowList(),
    download.getDownloadList()
  ])

  isWatchOnline.value = config.userConfig.general.autoExecuteOnStartup
})

window.onbeforeunload = (event) => {
  const haveToClearFollow =
    follow.haveToClearOnlineList || download.haveToClearLiveStreams

  const haveToClearDownload = download.haveToClearVodOnGoing

  if (haveToClearFollow && haveToClearDownload) {
    Promise.all([follow.clearTimer(), download.clearTimer()])

    return null
  }

  if (haveToClearFollow) {
    follow.clearTimer()

    return null
  }

  if (haveToClearDownload) {
    download.clearTimer()

    return null
  }
}

/**
 * TODO:
 * save config to store
 * empty event
 */
</script>

<template>
  <Layout>
    <Menu />
    <div class="pageView grow grid grid-rows-[min-content,1fr]">
      <div
        class="pageTitle select-none border-b-[9px] text-[50px] font-bold text-themeColor4 leading-[60px] mb-4 sm:text-[72px] sm:leading-[90px]"
        @click.ctrl.shift="openDev"
      >
        {{ route.meta.title }}
      </div>
      <RouterView />
    </div>
  </Layout>

  <Notification />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
</style>
