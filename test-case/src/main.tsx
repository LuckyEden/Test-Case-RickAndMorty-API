import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-loading-skeleton/dist/skeleton.css'
import './index.css'
import store from './libs/store/index.ts'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
