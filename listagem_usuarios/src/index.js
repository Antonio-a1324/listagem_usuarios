import { createComponent } from 'solid-js'
import { render } from 'solid-js/web'
import App from './App'
import './index.css'

render(() => createComponent(App, {}), document.getElementById('root'))