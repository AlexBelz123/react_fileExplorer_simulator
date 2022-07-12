import React from 'react';
import { createGlobalStyle } from 'styled-components';
import FileExplorerContainer from './containers';
import FileExplorer from './components/FileExplorer';

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: 'inherit';
}
body {
  box-sizing: 'border-box';
}
`;

function App() {
  return (
    <FileExplorerContainer>
      <GlobalStyle />
      <FileExplorer />
    </FileExplorerContainer>
  );
}

export default App;
