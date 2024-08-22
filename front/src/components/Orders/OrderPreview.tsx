import styles from '@styles/Orders.module.css';
import { timeParser } from '@utils/timeParser';

interface OrderPreview {
  id: number;
  createdAt: string;
  userPhone: string;
  userName: string;
  totalAmount: string;
}

export const OrderPreview = ({ id, userName, userPhone, totalAmount, createdAt }: OrderPreview) => {
  return (
      <>
        <p className={styles.orderPreviewTitle}>#{id}</p>
        <p className={styles.orderPreviewTitle}>{timeParser(createdAt)}</p>
        <p className={styles.orderPreviewPhoneTitle}>{userPhone}</p>
        <p className={styles.orderPreviewTitle}>{userName}</p>
        <p className={styles.orderPrice}>{totalAmount} €</p>
      </>
  );
};
