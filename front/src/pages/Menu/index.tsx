import { useAppDispatch, useAppSelector } from '@store/store';
import { getCurrentModalType } from '@store/selectors';
import { showModal } from '@store/reducers/modalReducer';
import { Modal } from '@components/Modal';
import { themeColors } from '@constants/themeColors';
import { ModalsType } from '@/interfaces';
import styles from '@styles/Page.module.css';
import style from '@styles/MenuPage.module.css';
import { BiSolidEditAlt } from 'react-icons/bi';
import { Categories } from '@components/Categories';
import { useEffect } from 'react';
import { getCategoriesAction } from '@store/sagas/actions';
import { Products } from '@components/Products';

export const MenuPage = () => {
  const dispatch = useAppDispatch();
  const modalType = useAppSelector(getCurrentModalType);

  const onEditBtnClick = () => {
    dispatch(showModal(ModalsType.EDIT_CATEGORIES));
  };

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);

  return (
      <div className={styles.mainBlock}>
        <p className={styles.title}>Menu</p>
        <div className={style.editBlock}>
          <p className={style.categoriesTitle}>Categories</p>
          <button className={style.editBtn}>
            <BiSolidEditAlt color={themeColors.BTN_BLUE} onClick={onEditBtnClick}/>
          </button>
        </div>
        <Categories/>
        <Products/>
        {modalType === ModalsType.ADD_CATEGORY && <Modal title='Category' type={ModalsType.ADD_CATEGORY}/>}
        {modalType === ModalsType.ADD_PRODUCT && <Modal type={ModalsType.ADD_PRODUCT}/>}
        {modalType === ModalsType.EDIT_CATEGORIES &&
            <Modal title='Edit category' type={ModalsType.EDIT_CATEGORIES}/>}
      </div>
  );
};
