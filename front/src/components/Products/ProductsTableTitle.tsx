import { useCallback, useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useAppDispatch } from '@store/store';
import { deleteProductsAction } from '@store/sagas/actions';
import { SortField, SortOrder } from '@/interfaces';
import styles from '@styles/Products.module.css';

interface ProductsTableTitle {
  sortOrder: SortOrder;
  setSortField: (value: SortField) => void;
  setSortOrder: (value: SortOrder) => void;
  selectedProductsIds: number[];
  setSelectedProductsIds: (value: any) => void;
  allProductsId: number[];
}

export const ProductsTableTitle = ({
                                     sortOrder,
                                     setSortField,
                                     setSortOrder,
                                     selectedProductsIds,
                                     setSelectedProductsIds,
                                     allProductsId
                                   }: ProductsTableTitle) => {
  const dispatch = useAppDispatch();
  const [allCheckboxesIsChecked, setAllCheckboxesIsChecked] = useState<boolean>(false)
  const onSortBtnClick = useCallback((sortField: SortField) => {
    setSortField(sortField);
    setSortOrder(sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
  }, [setSortField, setSortOrder, sortOrder]);

  const onDeleteBtnClick = () => {
    selectedProductsIds.length && dispatch(deleteProductsAction({ userIds: selectedProductsIds }));
  };

  const onCheckboxClick = () => {
    setAllCheckboxesIsChecked(!allCheckboxesIsChecked)
    if (allCheckboxesIsChecked) {
      setSelectedProductsIds([]);
    } else {
      setSelectedProductsIds(allProductsId)
    }
  };

  return (
      <div className={styles.productsTableTitleBlock}>
        <div className={styles.nameProductBlock}>
          <input type='checkbox' checked={allCheckboxesIsChecked} onChange={onCheckboxClick}/>
          <p>Product name</p>
          <FaSort onClick={() => onSortBtnClick(SortField.NAME)}/>
        </div>
        <div className={styles.categoryProductBlock}>
          <p>Category</p>
          <FaSort onClick={() => onSortBtnClick(SortField.CATEGORYID)}/>
        </div>
        <div className={styles.priceProductBlock}>
          <p>Price</p>
          <FaSort onClick={() => onSortBtnClick(SortField.PRICE)}/>
        </div>
        <div className={styles.editBlock}>
          <MdDelete className={styles.deleteIcon} onClick={onDeleteBtnClick}/>
        </div>
      </div>
  );
};
