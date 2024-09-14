import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, {persistor} from './lib/store';
import { CookiesProvider } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <NextUIProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CookiesProvider>
          </PersistGate>
        </Provider>
      </NextUIProvider>
  </StrictMode>,
)
