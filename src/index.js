import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, theme } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthProvider';
import App from './App'

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <AuthProvider>
   <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
