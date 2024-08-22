import { useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getCreateProductLoading, getProductsSelector, getTotalProductsPagesCount } from '@store/selectors';
import { getProductsAction } from '@store/sagas/actions';
import { ProductsTableTitle } from '@components/Products/ProductsTableTitle';
import { Product } from '@components/Products/Product';
import { SortField, SortOrder } from '@/interfaces';
import { getAllProductsIds } from '@utils/getAllProductsIds';
import style from '@styles/Pagination.module.css';
import styles from '@styles/Page.module.css';

export const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProductsSelector);
  const totalCount = useAppSelector(getTotalProductsPagesCount);
  const loading = useAppSelector(getCreateProductLoading);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<SortField>(SortField.ID);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
  const [selectedProductsIds, setSelectedProductsIds] = useState<number[]>([]);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1);
  };

  const allProductsId = useMemo(() => getAllProductsIds(products), [products]);

  useEffect(() => {
    dispatch(getProductsAction({ page: currentPage, sortField, sortOrder }));
  }, [currentPage, sortField, sortOrder]);

  if (!products.length) return <p className={styles.notFoundMessage}>Products are absent</p>;
  if (loading) return <p className={styles.notFoundMessage}>Wait...</p>;

  return (
      <div>
        <ProductsTableTitle selectedProductsIds={selectedProductsIds}
                            setSelectedProductsIds={setSelectedProductsIds}
                            allProductsId={allProductsId}
                            sortOrder={sortOrder}
                            setSortField={setSortField}
                            setSortOrder={setSortOrder}
        />
        {
          products.map(product => {
                return <Product key={product.id}
                                id={product.id}
                                name={product.name}
                                category={product.category.title}
                                price={product.price}
                                selectedProductsIds={selectedProductsIds}
                                setSelectedProductsIds={setSelectedProductsIds}
                />;
              }
          )
        }
        <div className={style.paginationBlock}>
          <ReactPaginate
              onPageChange={handlePageClick}
              activeClassName={style.item && style.active}
              breakClassName={style.item}
              breakLabel={'...'}
              containerClassName={style.pagination}
              disabledClassName={style.disabledPage}
              marginPagesDisplayed={2}
              nextClassName={style.item}
              nextLabel='next'
              pageCount={totalCount}
              pageClassName={style.item}
              pageRangeDisplayed={2}
              previousClassName={style.item}
              previousLabel='previous'
          />
        </div>
      </div>
  );
};
