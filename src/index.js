import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import combinedReducers from './reducers'
import FirebaseProvider from './services/firebaseService'
import firebase from 'firebase'
import firebaseConfig from './services/firebaseConfig'

// (function(sa,fbc){function load(f,c){var a=document.createElement('script');
// a.async=1;a.src=f;var s=document.getElementsByTagName('script')[0];
// s.parentNode.insertBefore(a,s);}load(sa);
// window.addEventListener('load',function(){firebase.initializeApp(fbc).performance()});
// })('https://www.gstatic.com/firebasejs/7.18.0/firebase-performance-standalone.js', firebaseConfig);

const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <FirebaseProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </FirebaseProvider>
  </Provider>
  ,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
