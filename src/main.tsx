
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './redux/store.ts'
import { Provider } from 'react-redux'
import initializeUserState from './utils/initializeUserState.ts'

initializeUserState(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <Provider store={store}>
    <App />
  </Provider>
  
)
