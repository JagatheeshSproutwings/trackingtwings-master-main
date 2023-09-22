import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter  } from 'react-router-dom'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import store,{persistor} from './store';
import history from './history'
import Layouts from './layouts'
import { THEME_CONFIG } from './configs/AppConfig';
import './lang'
import { PersistGate } from 'redux-persist/integration/react'; 
import api,{setTokenInHeaders} from "configs/apiConfig"
const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

const environment = process.env.NODE_ENV


setTokenInHeaders();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      
      <PersistGate loading={null} persistor={persistor}>

        <BrowserRouter history={history}>
          <ThemeSwitcherProvider 
            themeMap={themes} 
            defaultTheme={THEME_CONFIG.currentTheme} 
            insertionPoint="styles-insertion-point"
          >
            <Layouts />
          </ThemeSwitcherProvider>
        </BrowserRouter> 
        </PersistGate>
        
      </Provider>
    </div>
  );
}

export default App;
