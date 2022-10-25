// import {StrictMode} from 'react';
import React  from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom'
import store from './redux/store';
import App from './App';
import { Provider } from "react-redux";



const rootElement = document.getElementById('root');
const root = createRoot(rootElement);



root.render(
  //<StrictMode>
  <Router>
  <Provider store={store}>
        <App />
    </Provider>
    </Router>
  //</StrictMode>,
);

// set the page as right-to-left
document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");