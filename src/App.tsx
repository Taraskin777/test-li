import React from 'react';
import { useEffect } from 'react';


import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchCategories } from './store/categorySlice';
import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.items);

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, size: 10 }));
  }, [dispatch]);

  console.log(categories);
  return (
    <div className="App">
      <header className="App-header">Header</header>
      <main className="App-main">Test App</main>
    </div>
  );
}

export default App;
