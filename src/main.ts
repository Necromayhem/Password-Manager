import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app
	.use(createPinia())
	.use(ToastService)
	.use(PrimeVue, {
		theme: {
			preset: Aura,
			options: {
				// darkModeSelector: 'system',
			},
		},
	})

app.mount('#app')
