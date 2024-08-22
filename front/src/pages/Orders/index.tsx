import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Orders } from '@components/Orders';
import style from '@styles/Pagination.module.css';
import styles from '@styles/Page.module.css';
import { useGetOrdersQuery } from '@store/api/ordersApi';

export const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: ordersInfo } = useGetOrdersQuery(currentPage, { refetchOnFocus: true });
  const totalCount = ordersInfo && ordersInfo.totalOrders;

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1);
  };

  if (ordersInfo && !ordersInfo.orders.length) return <p className={styles.notFoundMessage}>Orders are absent</p>;

  return (
      <div className={styles.mainBlock}>
        <p className={styles.title}>Orders</p>
        {ordersInfo && <Orders orders={ordersInfo.orders}/>}
        <div className={style.paginationBlock}>
          {totalCount && (
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
          )}
        </div>
      </div>
  );
};
