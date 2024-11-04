import React from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createCategory } from '../../store/categorySlice';
import { useAppDispatch } from '../../store/hooks';
import { INewCategory } from '../../types/category.types';
import styles from './addCategory.module.scss';

const AddCategory: React.FC = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewCategory>();

  const onSubmit: SubmitHandler<INewCategory> = async (data: INewCategory) => {
    setLoading(true);
    try {
      const resultAction = await dispatch(createCategory(data));

      if (createCategory.fulfilled.match(resultAction)) {
        setSuccessMessage('Category created successfully');
        reset();
        setIsVisible(false);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } else {
        setSuccessMessage('Cannot create category');
      }
    } catch (error) {
      console.error('Error creating category', error);
      setSuccessMessage('The error occured while creating category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addCategory}>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Close' : 'Add Category'}
      </button>
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      {isVisible && (
        <div className={styles.modal}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <button
              className={styles.closeBtn}
              onClick={() => setIsVisible(false)}
            >
              X
            </button>
            <div className={styles.formInputs}>
              <label>Name</label>
              <input
                {...register('name', { required: 'Required field' })}
                placeholder="Name"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div className={styles.formInputs}>
              <label>Description</label>
              <textarea
                {...register('description', { required: 'Required field' })}
                placeholder="Description"
              />
              {errors.description && <p>{errors.description.message}</p>}
            </div>

            <div className={styles.formInputs}>
              <label>Slug</label>
              <input
                {...register('slug', { required: 'Required field' })}
                placeholder="Slug"
              />
              {errors.slug && <p>{errors.slug.message}</p>}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
