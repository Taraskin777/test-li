import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import DataTable from 'react-data-table-component';
import { fetchCategories } from '../../store/categorySlice';
import styles from './categoryList.module.scss';

const columns = [
  {
    name: 'Name',
    selector: (row: { name: string }) => row.name,
    sortable: true,
  },
  {
    name: 'Description',
    selector: (row: { description: string }) => row.description,
  },
];

const CategoryList: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.items);

  useEffect(() => {
    dispatch(fetchCategories({ page: 0, size: categories.length || 1000 }));
  }, [dispatch, categories.length]);

  return (
    <>
      <h3 className={styles.title}>Category List</h3>

      <DataTable
        columns={columns}
        data={categories}
        selectableRows
        selectableRowsHighlight
        selectableRowsSingle
        pagination
        fixedHeader={true}
        pointerOnHover
      />
    </>
  );
};

export default CategoryList;
