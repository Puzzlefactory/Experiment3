import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: 'src/app',
  future: {
    v8_middleware: true,
    v8_passThroughRequests: true,
    v8_splitRouteModules: true,
    v8_trailingSlashAwareDataRequests: true,
    v8_viteEnvironmentApi: true,
  },
  ssr: false,
} satisfies Config
