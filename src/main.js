import { createApp } from 'vue'
import App from './App.vue'
import mapBoxGl from 'mapbox-gl'
const app = createApp(App)
app.config.globalProperties.$mapboxgl = mapBoxGl
app.mount('#app')
