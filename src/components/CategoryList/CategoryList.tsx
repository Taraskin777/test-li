import React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import DataTable from 'react-data-table-component';
import { fetchCategories, deleteCategory } from '../../store/categorySlice';
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

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchCategories({ page: 0, size: categories.length || 1000 }));
  }, [dispatch, categories.length]);

  const handleRowSelected = (state: any): void => {
    const selectedId = state.selectedRows[0]?.id as number | undefined;
    setSelectedCategoryId(selectedId || null);
  };

  const handleDelete = () => {
    if (selectedCategoryId !== null) {
      dispatch(deleteCategory(selectedCategoryId)).then(() => {
        dispatch(fetchCategories({ page: 0, size: categories.length || 1000 }));
        setSelectedCategoryId(null);
      });
    }
  };

  return (
    <>
      <h3 className={styles.title}>Category List</h3>
      <button onClick={handleDelete} disabled={!selectedCategoryId}>
        Delete Selected Category
      </button>
      <DataTable
        columns={columns}
        data={categories}
        selectableRows
        selectableRowsHighlight
        selectableRowsSingle
        onSelectedRowsChange={handleRowSelected}
        pagination
        fixedHeader={true}
        pointerOnHover
      />
    </>
  );
};

export default CategoryList;
