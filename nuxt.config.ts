// https://nuxt.com/docs/api/configuration/nuxt-config
import type { ElectronOptions } from 'nuxt-electron'

export default defineNuxtConfig({
  css: [
    '@/assets/css/main.css',
  ],
  modules: [
    ['nuxt-electron', <ElectronOptions>{
      include: ['electron'],
    }],
  ],
})
