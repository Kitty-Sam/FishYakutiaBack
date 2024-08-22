import { useAppDispatch, useAppSelector } from '@store/store';
import { getCategories, getCategoriesError } from '@store/selectors';
import { deleteCategoryAction } from '@store/sagas/actions';
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { Switcher } from '@components/Switcher';
import { themeColors } from '@constants/themeColors';
import styles from '@styles/Modal.module.css';
import style from '@styles/MenuPage.module.css';

export const EditCategoriesModal = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getCategories);
  const error = useAppSelector(getCategoriesError);

  const onDeleteBtnClick = (id: number) => {
    dispatch(deleteCategoryAction(id));
  };

  return (
      <>
        {
          categories.map(category => {
            return (
                <div key={category.id}>
                  <div className={styles.editCategoryInputBlock}>
                    <p className={styles.editCategoryInput}>{category.title}</p>
                    <div className={styles.switcherBlock}>
                      <Switcher/>
                    </div>
                    <div className={styles.editAndDeleteBtnsBlock}>
                      <button className={style.editBtn}>
                        <BiSolidEditAlt color={themeColors.BTN_BLUE}/>
                      </button>
                      <button className={style.editBtn} onClick={() => onDeleteBtnClick(category.id)}>
                        <MdDelete color={themeColors.BTN_RED}/>
                      </button>
                    </div>
                  </div>
                  {error && <p>{error}</p>}
                </div>
            );
          })
        }
      </>
  );
};
