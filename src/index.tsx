import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './app/store'
import { fetchUser } from './features/users/userSlice'

import App from './App'

import './api/server';

import './index.css';

store.dispatch(fetchUser())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
