import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './Redux/Slices/store';

const rootItem = (document.getElementById('root'))

if(rootItem){
  const root = ReactDOM.createRoot(rootItem);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
      <Provider store={store}>  
           <App />
      </Provider>
      </BrowserRouter>
    </React.StrictMode>    
  );
}


