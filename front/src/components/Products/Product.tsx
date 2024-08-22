import { useCallback } from 'react';
import { MdDelete } from 'react-icons/md';
import { BiSolidEditAlt } from 'react-icons/bi';
import { useAppDispatch } from '@store/store';
import { deleteProductsAction } from '@store/sagas/actions';
import { Switcher } from '@components/Switcher';
import { themeColors } from '@constants/themeColors';
import styles from '@styles/Product.module.css';
import style from '@styles/MenuPage.module.css';

interface ProductProps {
  id: number;
  name: string;
  price: string;
  category: string;
  selectedProductsIds: number[];
  setSelectedProductsIds: (value: any) => void;
}

export const Product = ({ id, name, category, price, setSelectedProductsIds, selectedProductsIds }: ProductProps) => {
  const dispatch = useAppDispatch();

  const toggleCheckboxProduct = useCallback((id: number) => {
    if (selectedProductsIds.includes(id)) {
      setSelectedProductsIds((productsIds: number[]) => productsIds.filter(productId => productId !== id));
    } else {
      setSelectedProductsIds((prevState: number[]) => [...prevState, id]);
    }
  }, [selectedProductsIds, setSelectedProductsIds]);

  const onDeleteBtnClick = (id: number) => {
    dispatch(deleteProductsAction({ userIds: [id] }));
  };

  return (
      <div className={styles.productBlock}>
        <div className={styles.nameProductBlock}>
          <input type='checkbox' checked={selectedProductsIds.includes(id)} onChange={() => toggleCheckboxProduct(id)}/>
          <p>{name}</p>
        </div>
        <div className={styles.categoryProductBlock}>
          <p>{category}</p>
        </div>
        <div className={styles.priceProductBlock}>
          <p>{price}€</p>
        </div>
        <div className={styles.editBlock}>
          <Switcher/>
          <button className={style.editBtn}>
            <BiSolidEditAlt color={themeColors.BTN_BLUE}/>
          </button>
          <button className={style.editBtn}>
            <MdDelete color={themeColors.BTN_RED} onClick={() => onDeleteBtnClick(id)}/>
          </button>
        </div>
      </div>
  );
};
