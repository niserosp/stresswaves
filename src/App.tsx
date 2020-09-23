import { Grommet, ThemeType } from 'grommet';
import React from 'react';
import ConstructionPage from './components/ConstructionPage';

const theme: ThemeType = {
  global: {
    colors: {
      "brand": '#306CA4',
      "accent-1": '#76B7B6',
      "accent-2": '#76B7B6',
      "accent-3": '#E7EED9'
    },
    font: {
      family: 'Quicksand'
    }
  }
}

function App() {
  return (
    <Grommet full theme={theme}>
      <ConstructionPage />
    </Grommet>
  );
}

export default App;
