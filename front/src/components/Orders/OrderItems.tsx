import { Foods } from '@/interfaces';
import styles from '@styles/Orders.module.css';

interface OrderItems {
  items: Foods[];
}

export const OrderItems = ({ items }: OrderItems) => {
  return (
      <div className={styles.orderItems}>
        <div className={styles.moreContentBlock}>
          <p className={styles.contentOrderTitle}>Order includes...</p>
          {
            items.map(item => {
              return (
                  <div key={item.id}>
                    <div className={styles.contentListTitleBlock}>
                      <p className={styles.contentListPositionTitle}>Position</p>
                      <p className={styles.contentListTitle}>Price</p>
                      <p className={styles.contentListTitle}>Amount</p>
                      <p className={styles.contentListTitle}>Total</p>
                    </div>
                    <div className={styles.orderItemBlock} key={item.food.id}>
                      <p className={styles.orderItemName}>{item.food.name}</p>
                      <p className={styles.orderItem}>{item.food.price} €</p>
                      <p className={styles.orderItem}>{item.foodCount}</p>
                      <p className={styles.orderItem}>
                        {Number(item.foodCount) * Number(item.food.price)} €
                      </p>
                    </div>
                  </div>
              );
            })
          }
        </div>
      </div>
  );
};
