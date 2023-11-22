import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import rootReducer from '../src/rootReducer.ts'; 
import { createStore } from 'redux'; 
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider defaultColorScheme="light"><App /></MantineProvider>;
  </Provider>
);
