import React from 'react';
import styles from './categoryList.module.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCategories } from '../store/categorySlice';

const CategoryList: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.items);

  useEffect(() => {
    dispatch(fetchCategories({ page: 0, size: 20 }));
  }, [dispatch]);

  console.log(categories);

  return (
    <>
      <h2 className={styles.title}>Category List</h2>
      <ol>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name} {category.description} <button>Delete</button>
          </li>
        ))}
      </ol>
    </>
  );
};

export default CategoryList;
