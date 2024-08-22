import { useAppDispatch } from '@store/store';
import { closeModal } from '@store/reducers/modalReducer';
import { EditCategoriesModal } from '@components/Modal/EditCategoriesModal';
import { themeColors } from '@constants/themeColors';
import { AddCategoryModal } from '@components/Modal/AddCategoryModal';
import { GrClose } from 'react-icons/gr';
import { ModalsType } from '@/interfaces';
import styles from '@styles/Modal.module.css';

interface Modal {
  title?: string;
  type: ModalsType;
}

export const Modal = ({ title, type }: Modal) => {
  const dispatch = useAppDispatch();

  const onCloseClick = () => {
    dispatch(closeModal());
  };

  return (
      <div className={styles.drawer}>
        <div className={styles.mainBlock}>
          <div className={styles.headerBlock}>
            <p className={styles.title}>{title}</p>
            <GrClose color={themeColors.BLUE} size={25} onClick={onCloseClick}/>
          </div>
          {type === ModalsType.ADD_CATEGORY && <AddCategoryModal/>}
          {type === ModalsType.EDIT_CATEGORIES && <EditCategoriesModal/>}
        </div>
      </div>
  );
};
