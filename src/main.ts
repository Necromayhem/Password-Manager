import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia()).use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
			darkModeSelector: 'light',
		},
	},
})

app.mount('#app')
