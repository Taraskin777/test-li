import React from 'react';
import CategoryList from './components/CategoryList';

import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Test App</h1>
      </header>
      <main className="App-main">
        <CategoryList />
      </main>
    </div>
  );
}

export default App;
