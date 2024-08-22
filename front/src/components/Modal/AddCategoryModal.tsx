import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '@store/store';
import { createCategoryAction } from '@store/sagas/actions';
import { themeColors } from '@constants/themeColors';
import { Button } from '@components/Button';
import styles from '@styles/Modal.module.css';

interface AddCategoryForm {
  title: string;
}

export const AddCategoryModal = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCategoryForm>();
  const onSubmit: SubmitHandler<AddCategoryForm> = (data) => {
    dispatch(createCategoryAction(data));
    reset();
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.addCategoryInputBlock}>
        <div className={styles.addCategoryInput}>
          <input {...register('title', { required: true })} className={styles.input}/>
          {errors.title && <p>Mandatory field</p>}
        </div>
        <Button buttonStyle={{ color: themeColors.ACTIVE, marginTop: '20px', padding: '10px 40px' }}>
         Save
        </Button>
      </form>
  );
};
