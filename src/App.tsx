import { Grommet, ThemeType } from 'grommet';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/routes';

const theme: ThemeType = {
  global: {
    colors: {
      "brand": '#306CA4',
      "accent-1": '#76B7B6',
      "accent-2": '#76B7B6',
      "accent-3": '#E7EED9',
      "neutral-1": '#EEEEDD',
      text: {
        dark: 'accent-1'
      },
    },
    font: {
      family: 'Quicksand',
    },
  },
}

const background = {
  dark: '#1C3645'
}

function App() {
  return (
    <Grommet background={background} themeMode='dark' full theme={theme}>
      <Router>
        <Routes />
      </Router>
    </Grommet>
  );
}

export default App;
