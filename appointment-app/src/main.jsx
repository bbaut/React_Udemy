import React from 'react' //this imports the react api
import ReactDOM from 'react-dom/client' //This is the web version of react. Also exists react native.
//This has all the events related to the dom such as onclick, un submir
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


//React is the 