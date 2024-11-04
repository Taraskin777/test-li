import AddCategory from './components/AddCatForm/AddCategory';
import CategoryList from './components/CategoryList/CategoryList';

import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Test App</h1>
      </header>
      <div className="container">
        <main className="App-main">
          <CategoryList />
          <AddCategory />
        </main>
      </div>
    </div>
  );
}

export default App;
